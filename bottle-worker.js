// bottle-net worker (cloudflare). bind a KV namespace as BOTTLE_KV.
// routes: POST /board, GET /board, POST /wall, GET /wall, GET /mod
const BOARDS = {
  elegant_ms: { max: 3600000, min: 1000 },
  brute_ms: { max: 300000, min: 1000 },
  fish_big: { max: 500, min: 0 },
  stars: { max: 500, min: 0 },
};
const CAPS = { tag: 140, bottle: 140, 'bottle-img': 200 };

function json(data, status) {
  return new Response(JSON.stringify(data), {
    status: status || 200,
    headers: {
      'content-type': 'application/json',
      'access-control-allow-origin': '*',
      'access-control-allow-methods': 'GET,POST,OPTIONS',
      'access-control-allow-headers': 'content-type',
    },
  });
}

async function limited(env, ip, key, secs) {
  try {
    var k = 'rl:' + key + ':' + ip;
    var last = await env.BOTTLE_KV.get(k);
    var now = Date.now();
    if (last && now - parseInt(last, 10) < secs * 1000) return false;
    await env.BOTTLE_KV.put(k, String(now), { expirationTtl: secs + 5 });
    return true;
  } catch (e) { return true; }
}

function cleanName(n) {
  n = String(n || 'intruder').slice(0, 16).replace(/[<>&"]/g, '');
  return n || 'intruder';
}

function cleanText(t, cap) {
  t = String(t || '').slice(0, cap).replace(/</g, '&lt;');
  return t;
}

function okUrl(u) {
  if (typeof u !== 'string') return false;
  if (u.length > 200) return false;
  if (u.indexOf('https://') !== 0) return false;
  return /\.(png|jpg|jpeg|gif|webp)(\?.*)?$/i.test(u);
}

export default {
  async fetch(request, env) {
    try {
      if (request.method === 'OPTIONS') return json({});
      var url = new URL(request.url);
      var ip = request.headers.get('cf-connecting-ip') || 'unknown';

      if (request.method === 'POST' && url.pathname === '/board') {
        var b = await request.json().catch(function () { return null; });
        if (!b || !BOARDS[b.board]) return json({ error: 'bad board' }, 400);
        var lim = BOARDS[b.board];
        var v = Number(b.value);
        if (!(v >= lim.min && v <= lim.max)) return json({ error: 'bad value' }, 400);
        if (!(await limited(env, ip, 'board', 10))) return json({ error: 'slow down' }, 429);
        var key = 'board:' + b.board;
        var list = [];
        try { list = JSON.parse((await env.BOTTLE_KV.get(key)) || '[]'); } catch (e) { list = []; }
        list.push({ name: cleanName(b.name), value: v, when: Date.now() });
        list.sort(function (x, y) {
          if (b.board === 'fish_big' || b.board === 'stars') return y.value - x.value;
          return x.value - y.value;
        });
        list = list.slice(0, 50);
        await env.BOTTLE_KV.put(key, JSON.stringify(list));
        var rank = -1;
        for (var i = 0; i < list.length; i++) {
          if (list[i].value === v) { rank = i + 1; break; }
        }
        return json({ rank: rank, total: list.length });
      }

      if (request.method === 'GET' && url.pathname === '/board') {
        var name = url.searchParams.get('name');
        if (!BOARDS[name]) return json({ error: 'bad board' }, 400);
        var l2 = [];
        try { l2 = JSON.parse((await env.BOTTLE_KV.get('board:' + name)) || '[]'); } catch (e) { l2 = []; }
        return json({ top: l2.slice(0, 10), total: l2.length });
      }

      if (request.method === 'POST' && url.pathname === '/wall') {
        var w = await request.json().catch(function () { return null; });
        if (!w || (w.kind !== 'tag' && w.kind !== 'bottle' && w.kind !== 'bottle-img')) {
          return json({ error: 'bad kind' }, 400);
        }
        if (!(await limited(env, ip, 'wall', 30))) return json({ error: 'slow down' }, 429);
        var text = cleanText(w.text, CAPS[w.kind] || 140);
        if (!text) return json({ error: 'empty' }, 400);
        var zone = String(w.zone || 'void').slice(0, 20).replace(/[^a-z_]/g, '');
        var item = { kind: w.kind, zone: zone, text: text, when: Date.now() };
        if (w.kind === 'bottle-img') {
          if (!okUrl(w.url)) return json({ error: 'bad url (https image only)' }, 400);
          item.url = w.url;
        }
        var id = 'm' + Date.now().toString(36) + Math.floor(Math.random() * 9999);
        await env.BOTTLE_KV.put('mod:' + id, JSON.stringify(item));
        var q = [];
        try { q = JSON.parse((await env.BOTTLE_KV.get('mod:queue')) || '[]'); } catch (e) { q = []; }
        q.push(id);
        await env.BOTTLE_KV.put('mod:queue', JSON.stringify(q));
        return json({ ok: true, note: 'held for moderation' });
      }

      if (request.method === 'GET' && url.pathname === '/wall') {
        var z = String(url.searchParams.get('zone') || 'void').slice(0, 20);
        var k2 = String(url.searchParams.get('kind') || 'bottle').slice(0, 12);
        var items = [];
        try { items = JSON.parse((await env.BOTTLE_KV.get('wall:' + z + ':' + k2)) || '[]'); } catch (e) { items = []; }
        return json({ items: items.slice(-20) });
      }

      if (request.method === 'POST' && url.pathname === '/ping') {
        try {
          var day = new Date().toISOString().slice(0, 10);
          var hbuf = await crypto.subtle.digest('SHA-256', new TextEncoder().encode(ip + ':' + day));
          var hid = Array.from(new Uint8Array(hbuf)).map(function (x) { return x.toString(16).padStart(2, '0'); }).join('');
          if (await limited(env, ip, 'ping', 60)) {
            var seen = await env.BOTTLE_KV.get('v:' + day + ':' + hid);
            if (!seen) {
              await env.BOTTLE_KV.put('v:' + day + ':' + hid, '1', { expirationTtl: 86400 * 40 });
              var tc = parseInt((await env.BOTTLE_KV.get('vd:' + day)) || '0', 10) + 1;
              await env.BOTTLE_KV.put('vd:' + day, String(tc), { expirationTtl: 86400 * 40 });
              var tt = parseInt((await env.BOTTLE_KV.get('vt')) || '0', 10) + 1;
              await env.BOTTLE_KV.put('vt', String(tt));
            }
          }
        } catch (e) {}
        return json({ ok: true });
      }

      if (request.method === 'GET' && url.pathname === '/census') {
        var day2 = new Date().toISOString().slice(0, 10);
        var t2 = '0', tt2 = '0';
        try {
          t2 = (await env.BOTTLE_KV.get('vd:' + day2)) || '0';
          tt2 = (await env.BOTTLE_KV.get('vt')) || '0';
        } catch (e) {}
        return json({ today: parseInt(t2, 10) || 0, total: parseInt(tt2, 10) || 0 });
      }

      if (request.method === 'GET' && url.pathname === '/mod') {
        if (url.searchParams.get('key') !== (env.MOD_KEY || 'changeme')) {
          return json({ error: 'no' }, 403);
        }
        var act = url.searchParams.get('action') || 'list';
        if (act === 'list') {
          var ids = [];
          try { ids = JSON.parse((await env.BOTTLE_KV.get('mod:queue')) || '[]'); } catch (e) { ids = []; }
          var out = [];
          for (var qi = 0; qi < Math.min(ids.length, 50); qi++) {
            var raw = await env.BOTTLE_KV.get('mod:' + ids[qi]);
            if (raw) { try { var it = JSON.parse(raw); it.id = ids[qi]; out.push(it); } catch (e) {} }
          }
          return json({ pending: out });
        }
        if (act === 'approve' || act === 'reject') {
          var aid = String(url.searchParams.get('id') || '');
          var araw = await env.BOTTLE_KV.get('mod:' + aid);
          if (!araw) return json({ error: 'gone' }, 404);
          var ait = JSON.parse(araw);
          if (act === 'approve') {
            var wk = 'wall:' + ait.zone + ':' + ait.kind;
            var wl = [];
            try { wl = JSON.parse((await env.BOTTLE_KV.get(wk)) || '[]'); } catch (e) { wl = []; }
            delete ait.zone;
            wl.push({ kind: ait.kind, text: ait.text, url: ait.url, when: ait.when });
            wl = wl.slice(-100);
            await env.BOTTLE_KV.put(wk, JSON.stringify(wl));
          }
          await env.BOTTLE_KV.delete('mod:' + aid);
          var q2 = [];
          try { q2 = JSON.parse((await env.BOTTLE_KV.get('mod:queue')) || '[]'); } catch (e) { q2 = []; }
          q2 = q2.filter(function (x) { return x !== aid; });
          await env.BOTTLE_KV.put('mod:queue', JSON.stringify(q2));
          return json({ ok: true, action: act });
        }
        return json({ error: 'bad action' }, 400);
      }

      return json({ ok: true, routes: ['POST /board', 'GET /board', 'POST /wall', 'GET /wall', 'POST /ping', 'GET /census'] });
    } catch (e) {
      return json({ error: 'void hiccup' }, 500);
    }
  },
};
