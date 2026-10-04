// ┌──────────────────────────────────────────────────────────────┐
// │  MATRIX MATH LIBRARY                                       │
// └──────────────────────────────────────────────────────────────┘
function mPersp(f,asp,nr,fr){var t=1/Math.tan(f/2),nf=1/(nr-fr);return new Float32Array([t/asp,0,0,0,0,t,0,0,0,0,(fr+nr)*nf,-1,0,0,2*fr*nr*nf,0])}
function mMul(a,b){var r=new Float32Array(16);for(var i=0;i<4;i++)for(var j=0;j<4;j++){r[j*4+i]=0;for(var k=0;k<4;k++)r[j*4+i]+=a[k*4+i]*b[j*4+k]}return r}
function mTransform(m,v){return[m[0]*v[0]+m[4]*v[1]+m[8]*v[2]+m[12]*v[3],m[1]*v[0]+m[5]*v[1]+m[9]*v[2]+m[13]*v[3],m[2]*v[0]+m[6]*v[1]+m[10]*v[2]+m[14]*v[3],m[3]*v[0]+m[7]*v[1]+m[11]*v[2]+m[15]*v[3]]}
function mRotX(a){var c=Math.cos(a),s=Math.sin(a);return new Float32Array([1,0,0,0,0,c,s,0,0,-s,c,0,0,0,0,1])}
function mRotY(a){var c=Math.cos(a),s=Math.sin(a);return new Float32Array([c,0,-s,0,0,1,0,0,s,0,c,0,0,0,0,1])}
function mRotZ(a){var c=Math.cos(a),s=Math.sin(a);return new Float32Array([c,s,0,0,-s,c,0,0,0,0,1,0,0,0,0,1])}
function mTrans(x,y,z){return new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,x,y,z,1])}
function mScale(x,y,z){return new Float32Array([x,0,0,0,0,y,0,0,0,0,z,0,0,0,0,1])}
function mNorm(m){var a=m,a00=a[0],a01=a[1],a02=a[2],a10=a[4],a11=a[5],a12=a[6],a20=a[8],a21=a[9],a22=a[10];var det=a00*(a11*a22-a12*a21)-a01*(a10*a22-a12*a20)+a02*(a10*a21-a11*a20);var id=1/det;return new Float32Array([(a11*a22-a12*a21)*id,(a02*a21-a01*a22)*id,(a01*a12-a02*a11)*id,(a12*a20-a10*a22)*id,(a00*a22-a02*a20)*id,(a02*a10-a00*a12)*id,(a10*a21-a11*a20)*id,(a01*a20-a00*a21)*id,(a00*a11-a01*a10)*id])}

// ┌──────────────────────────────────────────────────────────────┐
// │  GEOMETRY GENERATORS                                       │
// └──────────────────────────────────────────────────────────────┘
function geoCube(s,r,g,b){
var d=[],n=[[0,0,1],[0,0,-1],[0,1,0],[0,-1,0],[1,0,0],[-1,0,0]];
var sh=[0.8,0.6,1,0.5,0.7,0.7];
var F=[
[[-s,-s,s],[s,-s,s],[s,s,s],[-s,-s,s],[s,s,s],[-s,s,s]],
[[s,-s,-s],[-s,-s,-s],[-s,s,-s],[s,-s,-s],[-s,s,-s],[s,s,-s]],
[[-s,s,s],[s,s,s],[s,s,-s],[-s,s,s],[s,s,-s],[-s,s,-s]],
[[-s,-s,-s],[s,-s,-s],[s,-s,s],[-s,-s,-s],[s,-s,s],[-s,-s,s]],
[[s,-s,s],[s,-s,-s],[s,s,-s],[s,-s,s],[s,s,-s],[s,s,s]],
[[-s,-s,-s],[-s,-s,s],[-s,s,s],[-s,-s,-s],[-s,s,s],[-s,s,-s]]
];
for(var fi=0;fi<6;fi++)for(var vi=0;vi<6;vi++){var v=F[fi][vi],no=n[fi];d.push(v[0],v[1],v[2],no[0],no[1],no[2],r*sh[fi],g*sh[fi],b*sh[fi])}
return new Float32Array(d)
}
function geoTesseract(s,r,g,b){
var S=s*1.5,I=S*0.42,w=S*0.10,d=[];
var inner=geoCube(I,r*0.9+0.06,g*0.9+0.06,b*0.9+0.06);
for(var i=0;i<inner.length;i++)d.push(inner[i]);
function strut(x1,y1,z1,x2,y2,z2){
var dx=x2-x1,dy=y2-y1,dz=z2-z1;var L=Math.sqrt(dx*dx+dy*dy+dz*dz)||1e-6;
var u=[dx/L,dy/L,dz/L];
var ref=Math.abs(u[2])>0.9?[1,0,0]:[0,0,1];
var v=[u[1]*ref[2]-u[2]*ref[1],u[2]*ref[0]-u[0]*ref[2],u[0]*ref[1]-u[1]*ref[0]];
var vl=Math.sqrt(v[0]*v[0]+v[1]*v[1]+v[2]*v[2])||1;v=[v[0]/vl,v[1]/vl,v[2]/vl];
var n=[u[1]*v[2]-u[2]*v[1],u[2]*v[0]-u[0]*v[2],u[0]*v[1]-u[1]*v[0]];
var c=[(x1+x2)/2,(y1+y2)/2,(z1+z2)/2],h=[L/2,w,w];
var cn=[];
for(var a=0;a<2;a++)for(var bq=0;bq<2;bq++)for(var cq=0;cq<2;cq++)
cn.push([c[0]+u[0]*(a?h[0]:-h[0])+v[0]*(bq?h[1]:-h[1])+n[0]*(cq?h[2]:-h[2]),c[1]+u[1]*(a?h[0]:-h[0])+v[1]*(bq?h[1]:-h[1])+n[1]*(cq?h[2]:-h[2]),c[2]+u[2]*(a?h[0]:-h[0])+v[2]*(bq?h[1]:-h[1])+n[2]*(cq?h[2]:-h[2])]);
var faces=[[4,5,7,6],[1,0,2,3],[2,6,7,3],[0,1,5,4],[5,1,3,7],[0,4,6,2]];
var sh=[0.8,0.6,1,0.5,0.7,0.7];
for(var fi=0;fi<6;fi++){var f=faces[fi],nr=n;
if(fi===1||fi===3||fi===5)nr=[-n[0],-n[1],-n[2]];
var rr=r*sh[fi],gg=g*sh[fi],bb=b*sh[fi];
var quads=[[f[0],f[1],f[2]],[f[0],f[2],f[3]],[f[2],f[1],f[0]],[f[3],f[2],f[0]]];
for(var qi=0;qi<4;qi++){var tr=quads[qi];
for(var vi2=0;vi2<3;vi2++){var pt=cn[tr[vi2]];d.push(pt[0],pt[1],pt[2],nr[0],nr[1],nr[2],rr,gg,bb)}}}}
var sg=[-1,1];
for(var i1=0;i1<2;i1++)for(var j1=0;j1<2;j1++){var ey=sg[i1]*S,ez=sg[j1]*S;strut(-S,ey,ez,S,ey,ez)}
for(var i1=0;i1<2;i1++)for(var j1=0;j1<2;j1++){var ex=sg[i1]*S,ez=sg[j1]*S;strut(ex,-S,ez,ex,S,ez)}
for(var i1=0;i1<2;i1++)for(var j1=0;j1<2;j1++){var ex=sg[i1]*S,ey=sg[j1]*S;strut(ex,ey,-S,ex,ey,S)}
for(var i1=0;i1<2;i1++)for(var j1=0;j1<2;j1++)for(var k1=0;k1<2;k1++)
strut(sg[i1]*S,sg[j1]*S,sg[k1]*S,sg[i1]*I,sg[j1]*I,sg[k1]*I);
return new Float32Array(d)
}
function buildTessFaces(tp,col){
var d=[],shByAxis=[[0.7,0.7],[1,0.5],[0.8,0.6],[0.85,0.65]];
for(var a=0;a<4;a++)for(var si=0;si<2;si++){
var s=si?1:-1;
var others=[];
for(var q=0;q<4;q++)if(q!==a)others.push(q);
for(var fi=0;fi<3;fi++){
var b=others[fi];
var rest=[];
for(var q=0;q<3;q++)if(others[q]!==b)rest.push(others[q]);
for(var bi=0;bi<2;bi++){
var bs=bi?1:-1;
var idx=[];
for(var p0=0;p0<2;p0++)for(var p1=0;p1<2;p1++){
var coord=[-1,-1,-1,-1];
coord[a]=s;coord[b]=bs;coord[rest[0]]=p0?1:-1;coord[rest[1]]=p1?1:-1;
var ix=0;for(var k=0;k<4;k++)if(coord[k]===1)ix|=(1<<k);
idx.push(ix);
}
var order=[idx[0],idx[1],idx[3],idx[2]];
var shv=shByAxis[b][bs===1?0:1];
var cr=col[0]*shv,cg=col[1]*shv,cb=col[2]*shv;
var i0=order[0]*3,i1=order[1]*3,i2=order[2]*3;
var ux=tp[i1]-tp[i0],uy=tp[i1+1]-tp[i0+1],uz=tp[i1+2]-tp[i0+2];
var vx=tp[i2]-tp[i0],vy=tp[i2+1]-tp[i0+1],vz=tp[i2+2]-tp[i0+2];
var nx=uy*vz-uz*vy,ny=uz*vx-ux*vz,nz=ux*vy-uy*vx;
var nl=Math.sqrt(nx*nx+ny*ny+nz*nz)||1;nx/=nl;ny/=nl;nz/=nl;
var tris=[order[0],order[1],order[2],order[0],order[2],order[3]];
for(var ti=0;ti<6;ti++){var vi=tris[ti]*3;
d.push(tp[vi],tp[vi+1],tp[vi+2],nx,ny,nz,cr,cg,cb);}
}
}
}
return new Float32Array(d)
}
function geoTetra(s,r,g,b){
var h=s*Math.sqrt(2/3)*0.8;
var V=[[0,h+s*0.2,0],[-s/2,-h+s*0.2,s*0.87],[s/2,-h+s*0.2,s*0.87],[0,-h+s*0.2,-s*0.87]];
var F=[[0,1,2],[0,2,3],[0,3,1],[1,3,2]],d=[],sh=[1,0.8,0.7,0.5];
for(var fi=0;fi<4;fi++){
var v0=V[F[fi][0]],v1=V[F[fi][1]],v2=V[F[fi][2]];
var e1=[v1[0]-v0[0],v1[1]-v0[1],v1[2]-v0[2]],e2=[v2[0]-v0[0],v2[1]-v0[1],v2[2]-v0[2]];
var no=[e1[1]*e2[2]-e1[2]*e2[1],e1[2]*e2[0]-e1[0]*e2[2],e1[0]*e2[1]-e1[1]*e2[0]];
var nl=Math.sqrt(no[0]*no[0]+no[1]*no[1]+no[2]*no[2])||1;no[0]/=nl;no[1]/=nl;no[2]/=nl;
d.push(v0[0],v0[1],v0[2],no[0],no[1],no[2],r*sh[fi],g*sh[fi],b*sh[fi]);
d.push(v1[0],v1[1],v1[2],no[0],no[1],no[2],r*sh[fi],g*sh[fi],b*sh[fi]);
d.push(v2[0],v2[1],v2[2],no[0],no[1],no[2],r*sh[fi],g*sh[fi],b*sh[fi])
}
return new Float32Array(d)
}
function geoSphere(rad,seg,r,g,b){
var d=[];
for(var i=0;i<seg;i++)for(var j=0;j<seg;j++){
var t0=i/seg*Math.PI,t1=(i+1)/seg*Math.PI,p0=j/seg*Math.PI*2,p1=(j+1)/seg*Math.PI*2;
function sv(t,p){return[rad*Math.sin(t)*Math.cos(p),rad*Math.cos(t),rad*Math.sin(t)*Math.sin(p)]}
var q=[sv(t0,p0),sv(t0,p1),sv(t1,p1),sv(t0,p0),sv(t1,p1),sv(t1,p0)];
for(var k=0;k<6;k++){var v=q[k],no=[v[0]/rad,v[1]/rad,v[2]/rad],sh=0.5+0.5*no[1];d.push(v[0],v[1],v[2],no[0],no[1],no[2],r*sh,g*sh,b*sh)}}
return new Float32Array(d)
}
function geoCyl(rad,h,seg,r,g,b){
var d=[],hh=h/2;
for(var i=0;i<seg;i++){
var a0=i/seg*Math.PI*2,a1=(i+1)/seg*Math.PI*2;
var x0=Math.cos(a0)*rad,z0=Math.sin(a0)*rad,x1=Math.cos(a1)*rad,z1=Math.sin(a1)*rad;
d.push(x0,hh,z0,x0,0,z0,r,g,b);d.push(x1,hh,z1,x1,0,z1,r,g,b);d.push(x0,-hh,z0,x0,0,z0,r*0.7,g*0.7,b*0.7);
d.push(x1,hh,z1,x1,0,z1,r,g,b);d.push(x1,-hh,z1,x1,0,z1,r*0.7,g*0.7,b*0.7);d.push(x0,-hh,z0,x0,0,z0,r*0.7,g*0.7,b*0.7);
d.push(0,hh,0,0,1,0,r,g,b);d.push(x1,hh,z1,0,1,0,r,g,b);d.push(x0,hh,z0,0,1,0,r,g,b);
d.push(0,-hh,0,0,-1,0,r*0.5,g*0.5,b*0.5);d.push(x0,-hh,z0,0,-1,0,r*0.5,g*0.5,b*0.5);d.push(x1,-hh,z1,0,-1,0,r*0.5,g*0.5,b*0.5)}
return new Float32Array(d)
}
function geoTorus(R,rad,seg,r,g,b){
var d=[],hh=rad;
for(var i=0;i<seg;i++){var a0=i/seg*Math.PI*2,a1=(i+1)/seg*Math.PI*2;
for(var j=0;j<seg;j++){
var b0=j/seg*Math.PI*2,b1=(j+1)/seg*Math.PI*2;
function tp(a,b){var cr=R+hh*Math.cos(b);return[cr*Math.cos(a),hh*Math.sin(b),cr*Math.sin(a)]}
var v0=tp(a0,b0),v1=tp(a1,b0),v2=tp(a1,b1),v3=tp(a0,b1);
var n0=[Math.cos(b0)*Math.cos(a0),Math.sin(b0),Math.cos(b0)*Math.sin(a0)];
var n1=[Math.cos(b0)*Math.cos(a1),Math.sin(b0),Math.cos(b0)*Math.sin(a1)];
var n2=[Math.cos(b1)*Math.cos(a1),Math.sin(b1),Math.cos(b1)*Math.sin(a1)];
var n3=[Math.cos(b1)*Math.cos(a0),Math.sin(b1),Math.cos(b1)*Math.sin(a0)];
var sh=0.5+0.5*Math.cos(b0);
d.push(v0[0],v0[1],v0[2],n0[0],n0[1],n0[2],r*sh,g*sh,b*sh);
d.push(v1[0],v1[1],v1[2],n1[0],n1[1],n1[2],r*sh,g*sh,b*sh);
d.push(v2[0],v2[1],v2[2],n2[0],n2[1],n2[2],r*sh*0.8,g*sh*0.8,b*sh*0.8);
d.push(v0[0],v0[1],v0[2],n0[0],n0[1],n0[2],r*sh,g*sh,b*sh);
d.push(v2[0],v2[1],v2[2],n2[0],n2[1],n2[2],r*sh*0.8,g*sh*0.8,b*sh*0.8);
d.push(v3[0],v3[1],v3[2],n3[0],n3[1],n3[2],r*sh*0.8,g*sh*0.8,b*sh*0.8);
}}
return new Float32Array(d)
}
function geoKnot(R,rad,seg,p,q,r,g,b){
var d=[],sides=4;
function kp(a){var rr=R+rad*Math.cos(q*a);return[rr*Math.cos(p*a),rad*Math.sin(q*a),rr*Math.sin(p*a)]}
function push(v,flip){d.push(v[0],v[1],v[2],flip?-v[3]:v[3],flip?-v[4]:v[4],flip?-v[5]:v[5],v[6],v[7],v[8])}
var prevRing=null;
for(var i=0;i<=seg;i++){
var a=i/seg*Math.PI*2;
var cv=kp(a),nv=kp(a+0.001);
var T=[nv[0]-cv[0],nv[1]-cv[1],nv[2]-cv[2]];
var tl=Math.sqrt(T[0]*T[0]+T[1]*T[1]+T[2]*T[2])||1;T=[T[0]/tl,T[1]/tl,T[2]/tl];
var up=Math.abs(T[1])>0.99?[1,0,0]:[0,1,0];
var N=[T[1]*up[2]-T[2]*up[1],T[2]*up[0]-T[0]*up[2],T[0]*up[1]-T[1]*up[0]];
var nl=Math.sqrt(N[0]*N[0]+N[1]*N[1]+N[2]*N[2])||1;N=[N[0]/nl,N[1]/nl,N[2]/nl];
var B=[T[1]*N[2]-T[2]*N[1],T[2]*N[0]-T[0]*N[2],T[0]*N[1]-T[1]*N[0]];
var ring=[];
for(var k=0;k<sides;k++){
var th=k/sides*Math.PI*2,ct=Math.cos(th),st=Math.sin(th);
var nx=N[0]*ct+B[0]*st,ny=N[1]*ct+B[1]*st,nz=N[2]*ct+B[2]*st;
var sh=0.55+0.45*ny;
ring.push([cv[0]+nx*rad,cv[1]+ny*rad,cv[2]+nz*rad,nx,ny,nz,r*sh,g*sh,b*sh])}
if(prevRing){for(var k=0;k<sides;k++){var k2=(k+1)%sides;
var A=prevRing[k],Bv=prevRing[k2],C=ring[k2],D=ring[k];
push(A,0);push(Bv,0);push(C,0);push(A,0);push(C,0);push(D,0);
push(A,1);push(C,1);push(Bv,1);push(A,1);push(D,1);push(C,1)}}
prevRing=ring}
return new Float32Array(d)
}
function geoIcosa(s,r,g,b){
var t=(1+Math.sqrt(5))/2,d=[];
var V=[[-1,t,0],[1,t,0],[-1,-t,0],[1,-t,0],[0,-1,t],[0,1,t],[0,-1,-t],[0,1,-t],[t,0,-1],[t,0,1],[-t,0,-1],[-t,0,1]];
var F=[[0,11,5],[0,5,1],[0,1,7],[0,7,10],[0,10,11],[1,5,9],[5,11,4],[11,10,2],[10,7,6],[7,1,8],[3,9,4],[3,4,2],[3,2,6],[3,6,8],[3,8,9],[4,9,5],[2,4,11],[6,2,10],[8,6,7],[9,8,1]];
var nl=s/Math.sqrt(1+t*t);
for(var fi=0;fi<20;fi++){
var v0=V[F[fi][0]],v1=V[F[fi][1]],v2=V[F[fi][2]];
var e1=[(v1[0]-v0[0])*nl,(v1[1]-v0[1])*nl,(v1[2]-v0[2])*nl];
var e2=[(v2[0]-v0[0])*nl,(v2[1]-v0[1])*nl,(v2[2]-v0[2])*nl];
var no=[e1[1]*e2[2]-e1[2]*e2[1],e1[2]*e2[0]-e1[0]*e2[2],e1[0]*e2[1]-e1[1]*e2[0]];
var nll=Math.sqrt(no[0]*no[0]+no[1]*no[1]+no[2]*no[2])||1;no[0]/=nll;no[1]/=nll;no[2]/=nll;
var sh=0.5+0.5*no[1];
d.push(v0[0]*nl,v0[1]*nl,v0[2]*nl,no[0],no[1],no[2],r*sh,g*sh,b*sh);
d.push(v1[0]*nl,v1[1]*nl,v1[2]*nl,no[0],no[1],no[2],r*sh*0.9,g*sh*0.9,b*sh*0.9);
d.push(v2[0]*nl,v2[1]*nl,v2[2]*nl,no[0],no[1],no[2],r*sh*0.8,g*sh*0.8,b*sh*0.8);
}
return new Float32Array(d)
}
function geoOcta(s,r,g,b){
var h=s,d=[];
var V=[[0,h,0],[h,0,0],[0,0,h],[-h,0,0],[0,0,-h],[0,-h,0]];
var F=[[0,2,1],[0,3,2],[0,4,3],[0,1,4],[5,1,2],[5,2,3],[5,3,4],[5,4,1]];
for(var fi=0;fi<8;fi++){
var v0=V[F[fi][0]],v1=V[F[fi][1]],v2=V[F[fi][2]];
var e1=[v1[0]-v0[0],v1[1]-v0[1],v1[2]-v0[2]],e2=[v2[0]-v0[0],v2[1]-v0[1],v2[2]-v0[2]];
var no=[e1[1]*e2[2]-e1[2]*e2[1],e1[2]*e2[0]-e1[0]*e2[2],e1[0]*e2[1]-e1[1]*e2[0]];
var nl=Math.sqrt(no[0]*no[0]+no[1]*no[1]+no[2]*no[2])||1;no[0]/=nl;no[1]/=nl;no[2]/=nl;
var sh=0.5+0.5*no[1];
d.push(v0[0],v0[1],v0[2],no[0],no[1],no[2],r*sh,g*sh,b*sh);
d.push(v1[0],v1[1],v1[2],no[0],no[1],no[2],r*sh*0.9,g*sh*0.9,b*sh*0.9);
d.push(v2[0],v2[1],v2[2],no[0],no[1],no[2],r*sh*0.8,g*sh*0.8,b*sh*0.8);
}
return new Float32Array(d)
}
var shapeGens={cube:geoCube,tetra:geoTetra,sphere:geoSphere,cyl:geoCyl,torus:geoTorus,knot:geoKnot,icosa:geoIcosa,octa:geoOcta,tesseract:geoTesseract};
function genShape(shape,r,g,b){
if(shape==='sphere')return geoSphere(0.35,24,r,g,b);
if(shape==='cyl')return geoCyl(0.26,0.5,32,r,g,b);
if(shape==='torus')return geoTorus(0.25,0.1,24,r,g,b);
if(shape==='knot')return geoKnot(0.28,0.1,72,2,3,r,g,b);
return shapeGens[shape](0.35,r,g,b)
}

// ┌──────────────────────────────────────────────────────────────┐
// │  WEBGL SETUP                                               │
// └──────────────────────────────────────────────────────────────┘
var canvas=document.getElementById('main');
var gl=canvas.getContext('webgl',{antialias:true,alpha:false,preserveDrawingBuffer:true});
var dpr=Math.min(window.devicePixelRatio||1,2);
canvas.width=window.innerWidth*dpr;canvas.height=window.innerHeight*dpr;
canvas.style.width=window.innerWidth+'px';canvas.style.height=window.innerHeight+'px';
gl.viewport(0,0,canvas.width,canvas.height);
gl.enable(gl.DEPTH_TEST);gl.enable(gl.CULL_FACE);gl.cullFace(gl.BACK);
gl.clearColor(0.005,0.005,0.015,1);

// ┌──────────────────────────────────────────────────────────────┐
// │  SHADERS                                                   │
// └──────────────────────────────────────────────────────────────┘
function mkS(ctx,type,src){var s=ctx.createShader(type);ctx.shaderSource(s,src);ctx.compileShader(s);return s}
function mkP(ctx,vs,fs){var p=ctx.createProgram();ctx.attachShader(p,mkS(ctx,ctx.VERTEX_SHADER,vs));ctx.attachShader(p,mkS(ctx,ctx.FRAGMENT_SHADER,fs));ctx.linkProgram(p);return p}

var VS='attribute vec3 aPos,aNorm,aCol;uniform mat4 uMVP,uMod;uniform mat3 uNM;varying vec3 vC,vN,vW;void main(){vec4 w=uMod*vec4(aPos,1.0);vW=w.xyz;vN=normalize(uNM*aNorm);vC=aCol;gl_Position=uMVP*vec4(aPos,1.0);}';
var FS='precision highp float;varying vec3 vC,vN,vW;uniform vec3 uCam;uniform float uEm,uAl,uInv,uFr;float cL(vec3 lp,float li,vec3 n){vec3 ld=normalize(lp-vW);float d=max(dot(n,ld),0.0);float ds=length(lp-vW);return d*li/(1.0+0.003*ds*ds);}void main(){vec3 n=normalize(vN),vd=normalize(uCam-vW),al=vC;float light=.32+cL(vec3(6,8,6),1.0,n)+cL(vec3(-5,4,-3),.7,n)+cL(vec3(0,-4,5),.5,n);vec3 l=al*(light+uEm);vec3 h=normalize(normalize(vec3(6,8,6)-vW)+vd);float spec=pow(max(dot(n,h),0.0),64.0)*0.12;float ndv=max(dot(vd,n),0.0);float fr=pow(1.0-ndv,3.0)*0.12+pow(1.0-ndv,6.0)*0.45;vec3 fc=l+al*uEm+fr*al*.3*uFr+vec3(spec)*(0.25+0.45*uFr);fc=pow(fc/(fc+vec3(1.0)),vec3(1.0/2.2));fc=mix(fc,1.0-fc,uInv);gl_FragColor=vec4(fc,uAl);}';
var PVS='attribute vec3 aP;attribute float aS,aA;attribute vec3 aC;uniform mat4 uPr,uVw;varying vec3 vC;varying float vA;void main(){vec4 vp=uVw*vec4(aP,1.0);gl_Position=uPr*vp;gl_PointSize=max(aS*1500.0/-vp.z,6.0);vC=aC;vA=aA;}';
var PFS='precision highp float;varying vec3 vC;varying float vA;void main(){vec2 c=gl_PointCoord-0.5;float d=length(c);if(d>0.5)discard;gl_FragColor=vec4(vC,vA*(1.0-smoothstep(0.08,0.5,d)));}';

var prog=mkP(gl,VS,FS);
var pprog=mkP(gl,PVS,PFS);
var LVS='attribute vec3 aP;attribute vec4 aC;uniform mat4 uPr,uVw;varying vec4 vC;void main(){gl_Position=uPr*uVw*vec4(aP,1.0);vC=aC;}';
var LFS='precision highp float;varying vec4 vC;void main(){gl_FragColor=vC;}';
var lprog=mkP(gl,LVS,LFS);

var S=36;
var aPos=gl.getAttribLocation(prog,'aPos');
var aNorm=gl.getAttribLocation(prog,'aNorm');
var aCol=gl.getAttribLocation(prog,'aCol');
var uMVP=gl.getUniformLocation(prog,'uMVP');
var uMod=gl.getUniformLocation(prog,'uMod');
var uNM=gl.getUniformLocation(prog,'uNM');
var uCam=gl.getUniformLocation(prog,'uCam');
var uEm=gl.getUniformLocation(prog,'uEm');
var uAl=gl.getUniformLocation(prog,'uAl');
var uInv=gl.getUniformLocation(prog,'uInv');
var uFr=gl.getUniformLocation(prog,'uFr');
var lAP=gl.getAttribLocation(lprog,'aP');
var lAC=gl.getAttribLocation(lprog,'aC');
var lPr=gl.getUniformLocation(lprog,'uPr');
var lVw=gl.getUniformLocation(lprog,'uVw');

var ppAP=gl.getAttribLocation(pprog,'aP');
var ppAS=gl.getAttribLocation(pprog,'aS');
var ppAC=gl.getAttribLocation(pprog,'aC');
var ppAA=gl.getAttribLocation(pprog,'aA');
var ppPJ=gl.getUniformLocation(pprog,'uPr');
var ppVW=gl.getUniformLocation(pprog,'uVw');

function upBuf(data){var b=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,b);gl.bufferData(gl.ARRAY_BUFFER,data,gl.STATIC_DRAW);return b}
function bindM(buf){gl.bindBuffer(gl.ARRAY_BUFFER,buf);gl.enableVertexAttribArray(aPos);gl.vertexAttribPointer(aPos,3,gl.FLOAT,false,S,0);gl.enableVertexAttribArray(aNorm);gl.vertexAttribPointer(aNorm,3,gl.FLOAT,false,S,12);gl.enableVertexAttribArray(aCol);gl.vertexAttribPointer(aCol,3,gl.FLOAT,false,S,24)}

// ┌──────────────────────────────────────────────────────────────┐
// │  INNER SHAPES & OUTER CUBE                                 │
// └──────────────────────────────────────────────────────────────┘
var curShape='cube';
var innerC=[
{c:[1,.2,.3],o:.55,s:1,p:0,sp:1.5},{c:[.2,1,.3],o:.55,s:1,p:Math.PI/4,sp:-1.2},
{c:[.2,.3,1],o:.55,s:1,p:Math.PI/2,sp:1.8},{c:[1,1,.2],o:.55,s:1,p:3*Math.PI/4,sp:-1},
{c:[1,.2,1],o:.45,s:.7,p:Math.PI,sp:2},{c:[.2,1,1],o:.45,s:.7,p:5*Math.PI/4,sp:-1.5},
{c:[1,.6,.1],o:.45,s:.7,p:3*Math.PI/2,sp:1.3},{c:[.6,.2,1],o:.45,s:.7,p:7*Math.PI/4,sp:-1.7}
];
var iBufs=[],iCnts=[];
function rebuild(shape){
if(shape==='octa'&&!octaUnlocked()){cubeWarn('octa locked — unlock: octahedron (anomaly branch)');return}
if(shape==='tesseract'&&!tessUnlocked()){cubeWarn('tesseract locked — unlock: tesseract (anomaly branch)');return}
if(shape==='tesseract')return;
iBufs=[];iCnts=[];
for(var i=0;i<innerC.length;i++){
var c=innerC[i],r=c.c[0],g=c.c[1],b=c.c[2];
var d;
d=genShape(shape,r,g,b);
iBufs.push(upBuf(d));iCnts.push(d.length/9);
}
}
rebuild('cube');

var outerBuf=upBuf(geoCube(1.3,0.15,0.15,0.15));
var outerCol=[0.15,0.15,0.15];
var edgeS=1.3,edgePos=new Float32Array([-edgeS,-edgeS,-edgeS,edgeS,-edgeS,-edgeS, edgeS,-edgeS,-edgeS,edgeS,edgeS,-edgeS, edgeS,edgeS,-edgeS,-edgeS,edgeS,-edgeS, -edgeS,edgeS,-edgeS,-edgeS,-edgeS,-edgeS, -edgeS,-edgeS,edgeS,edgeS,-edgeS,edgeS, edgeS,-edgeS,edgeS,edgeS,edgeS,edgeS, edgeS,edgeS,edgeS,-edgeS,edgeS,edgeS, -edgeS,edgeS,edgeS,-edgeS,-edgeS,edgeS, -edgeS,-edgeS,-edgeS,-edgeS,-edgeS,edgeS, edgeS,-edgeS,-edgeS,edgeS,-edgeS,edgeS, edgeS,edgeS,-edgeS,edgeS,edgeS,edgeS, -edgeS,edgeS,-edgeS,-edgeS,edgeS,edgeS]);
var cubeEdgeBuf=upBuf(edgePos);
var tessFaceBuf=null;
var tetV=new Float32Array(64),tetE=[];
(function(){for(var i=0;i<16;i++){tetV[i*4]=(i&1)?1:-1;tetV[i*4+1]=(i&2)?1:-1;tetV[i*4+2]=(i&4)?1:-1;tetV[i*4+3]=(i&8)?1:-1}
for(var i=0;i<16;i++)for(var j=i+1;j<16;j++){var x=i^j;if(x&&(x&(x-1))===0)tetE.push(i,j)}})();

// cb_menu floor — real checkerboard mesh on the same camera. fog baked into vertex colors.
var cbFloorBuf=null,cbFloorCnt=0;
(function buildCbFloor(){
var quads=256,qs=1,fy=-4.5,data=[];
for(var ix=0;ix<quads;ix++){for(var iz=0;iz<quads;iz++){
var x0=(ix-quads/2)*qs,x1=x0+qs,z0=(iz-quads/2)*qs,z1=z0+qs;
var light=((ix+iz)%2===0);
var cx=(x0+x1)/2,cz=(z0+z1)/2;
var dd=Math.sqrt(cx*cx+cz*cz)/(quads*qs*0.5);
var fog=Math.min(1,dd*1.7);
var lr=light?0.72:0.015,lg=light?0.72:0.015,lb=light?0.78:0.03;
var r=lr+(0.03-lr)*fog,g=lg+(0.03-lg)*fog,b=lb+(0.05-lb)*fog;
data.push(x0,fy,z0,0,1,0,r,g,b);
data.push(x1,fy,z0,0,1,0,r,g,b);
data.push(x1,fy,z1,0,1,0,r,g,b);
data.push(x0,fy,z0,0,1,0,r,g,b);
data.push(x1,fy,z1,0,1,0,r,g,b);
data.push(x0,fy,z1,0,1,0,r,g,b);
}}
cbFloorCnt=data.length/9;
try{cbFloorBuf=upBuf(new Float32Array(data))}catch(e){cbFloorBuf=null}
})();

// ┌──────────────────────────────────────────────────────────────┐
// │  PARTICLE SYSTEM                                           │
// └──────────────────────────────────────────────────────────────┘
var NP=320,NPI=200,pData=new Float32Array(NP*8),pBd=new Float32Array(NP);
for(var i=0;i<NP;i++){var i8=i*8,th=Math.random()*Math.PI*2,ph=Math.acos(2*Math.random()-1);
var rr=i<NPI?(2+Math.random()*9):(13+Math.random()*17);pBd[i]=i<NPI?0:1;
pData[i8]=rr*Math.sin(ph)*Math.cos(th);pData[i8+1]=rr*Math.sin(ph)*Math.sin(th);pData[i8+2]=rr*Math.cos(ph);
pData[i8+3]=0.07+Math.random()*0.1;var h=Math.random();
if(h<.33){pData[i8+4]=.2;pData[i8+5]=.8;pData[i8+6]=1}else if(h<.66){pData[i8+4]=.8;pData[i8+5]=.2;pData[i8+6]=1}else{pData[i8+4]=.2;pData[i8+5]=1;pData[i8+6]=.8}
pData[i8+7]=.85+Math.random()*.15;if(i>=NPI)pData[i8+7]*=.6}
var pBuf=upBuf(pData);
// particle motion - velocity + phase per particle for drift
var pVel=new Float32Array(NP*3),pPh=new Float32Array(NP),pLst=0;
for(var i=0;i<NP;i++){var i3=i*3,i8=i*8,thv=Math.random()*Math.PI*2,x=pData[i8],y=pData[i8+1],z=pData[i8+2],r=Math.sqrt(x*x+y*y+z*z)||1;
var ax=0,ay=0.15+Math.random()*0.55,az=0.3+Math.random()*0.7;
var tx=y*az-z*ay,ty=-x*az,tz=x*ay-y*ax,ts=Math.sqrt(tx*tx+ty*ty+tz*tz)||1,spd=(i<NPI?0.16:0.04)+Math.random()*(i<NPI?0.12:0.05);
pVel[i3]=tx/ts*spd;pVel[i3+1]=ty/ts*spd;pVel[i3+2]=tz/ts*spd;
pPh[i]=Math.random()*Math.PI*2}
function updateParticles(time){
if(window._timeFrozen){pLst=time;return}
var dt=pLst?Math.min((time-pLst)/1000,0.05):0.016;try{dt*=tsMul()}catch(e){}pLst=time;if(dt<=0)return;
var cx=mouseX*6,cy=mouseY*5,t2=time*0.001;
for(var i=0;i<NP;i++){var i8=i*8,i3=i*3,x=pData[i8],y=pData[i8+1],z=pData[i8+2],vx=pVel[i3],vy=pVel[i3+1],vz=pVel[i3+2];
var ph=pPh[i]+t2*0.15;
vx+=Math.sin(ph+i)*dt*0.04;vy+=Math.cos(ph*1.3+i)*dt*0.04;vz+=Math.sin(ph*0.7+i*1.7)*dt*0.03;
var rr=Math.sqrt(x*x+y*y+z*z)||1;
var gacc=1.4*dt/(rr*rr);
vx-=x/rr*gacc;vy-=y/rr*gacc;vz-=z/rr*gacc;
var sp=Math.sqrt(vx*vx+vy*vy+vz*vz);if(sp>0.35){var k=0.35/sp;vx*=k;vy*=k;vz*=k}
x+=vx*dt;y+=vy*dt;z+=vz*dt;pVel[i3]=vx;pVel[i3+1]=vy;pVel[i3+2]=vz;
var dx=x-cx,dy=y-cy,dz=z,dd=Math.sqrt(dx*dx+dy*dy+dz*dz);
if(dd<2.6&&dd>0.001){var f=(2.6-dd)*1.6,xv=dx/dd*f*dt*8,yv=dy/dd*f*dt*8,zv=dz/dd*f*dt*8;
x+=xv;y+=yv;z+=zv}
rr=Math.sqrt(x*x+y*y+z*z);
if(pBd[i]===0){if(rr>12||rr<1.5){var th2=Math.random()*Math.PI*2,ph2=Math.acos(2*Math.random()-1),rr2=5+Math.random()*5;
x=rr2*Math.sin(ph2)*Math.cos(th2);y=rr2*Math.sin(ph2)*Math.sin(th2);z=rr2*Math.cos(ph2)}}
else{if(rr>31||rr<12){var th3=Math.random()*Math.PI*2,ph3=Math.acos(2*Math.random()-1),rr3=16+Math.random()*12;
x=rr3*Math.sin(ph3)*Math.cos(th3);y=rr3*Math.sin(ph3)*Math.sin(th3);z=rr3*Math.cos(ph3)}}
pData[i8]=x;pData[i8+1]=y;pData[i8+2]=z;
pData[i8+7]=0.85+Math.random()*0.15}
gl.bindBuffer(gl.ARRAY_BUFFER,pBuf);gl.bufferData(gl.ARRAY_BUFFER,pData,gl.DYNAMIC_DRAW)}

// ┌──────────────────────────────────────────────────────────────┐
// │  MOUSE CONTROLS                                            │
// └──────────────────────────────────────────────────────────────┘
var drag=false,rX=0,rY=0,vX=0,vY=0,zZ=-9,lX=0,lY=0;
var mouseDownX=0,mouseDownY=0,wasDrag=false;
canvas.addEventListener('mousedown',function(e){if(typeof demoPlaying!=='undefined'&&demoPlaying)return;drag=true;wasDrag=false;mouseDownX=e.clientX;mouseDownY=e.clientY;lX=e.clientX;lY=e.clientY;vX=vY=0;document.body.classList.add('dragging')});
window.addEventListener('mouseup',function(){drag=false;document.body.classList.remove('dragging')});
window.addEventListener('mousemove',function(e){if(typeof demoPlaying!=='undefined'&&demoPlaying)return;if(!drag)return;var dx=e.clientX-mouseDownX,dy=e.clientY-mouseDownY;if(Math.sqrt(dx*dx+dy*dy)>5)wasDrag=true;vY=(e.clientX-lX)*.005;vX=(e.clientY-lY)*.005;rY+=vY;rX+=vX;if(typeof currentZone!=='undefined'&&currentZone==='cb_menu'){if(rX>1.25)rX=1.25;if(rX<-0.55)rX=-0.55}lX=e.clientX;lY=e.clientY});
var mouseX=0,mouseY=0;
window.addEventListener('mousemove',function(e){mouseX=(e.clientX/window.innerWidth)*2-1;mouseY=-(e.clientY/window.innerHeight)*2+1});
canvas.addEventListener('wheel',function(e){if(typeof demoPlaying!=='undefined'&&demoPlaying){e.preventDefault();return}zZ+=e.deltaY*.005;zZ=Math.max(-15,Math.min(-3,zZ));e.preventDefault()},{passive:false});

// ┌──────────────────────────────────────────────────────────────┐
// │  MOUSE TRAIL                                               │
// └──────────────────────────────────────────────────────────────┘
var trailCanvas=document.getElementById('trailCanvas');
var trailCtx=trailCanvas.getContext('2d');
var trailPts=[];var TRAIL_N=20;
for(var i=0;i<TRAIL_N;i++)trailPts.push({x:0,y:0,a:1-i/TRAIL_N});
var rawMX=0,rawMY=0;
window.addEventListener('mousemove',function(e){rawMX=e.clientX;rawMY=e.clientY});
function resizeTrailCanvas(){trailCanvas.width=window.innerWidth;trailCanvas.height=window.innerHeight}
resizeTrailCanvas();window.addEventListener('resize',resizeTrailCanvas);
function updateTrail(){
trailPts[0].x=rawMX;trailPts[0].y=rawMY;
for(var i=trailPts.length-1;i>0;i--){
trailPts[i].x+=(trailPts[i-1].x-trailPts[i].x)*0.45;
trailPts[i].y+=(trailPts[i-1].y-trailPts[i].y)*0.45;
}
}
function drawTrail(){
trailCtx.clearRect(0,0,trailCanvas.width,trailCanvas.height);
for(var i=trailPts.length-1;i>=0;i--){
var tp=trailPts[i];
var sz=2+tp.a*6;
trailCtx.globalAlpha=tp.a*0.7;
trailCtx.fillStyle='rgba(43,208,208,1)';
trailCtx.beginPath();
trailCtx.arc(tp.x,tp.y,sz,0,Math.PI*2);
trailCtx.fill();
}
trailCtx.globalAlpha=1;
}

// ┌──────────────────────────────────────────────────────────────┐
// │  CLICK INTERACTIONS                                        │
// └──────────────────────────────────────────────────────────────┘
var clickActions=[
function(){cubePrint('obj: you clicked the cube. the cube felt that.')},
function(){cubePrint('obj: ow.');triggerGlitch()},
function(){cubePrint('obj: curiosity. the void respects that.');applyTheme(String(Math.ceil(Math.random()*5)))},
function(){cubePrint('obj: the cube is not a button. but here we are.');for(var i=0;i<15;i++){var p=document.createElement('div');p.style.cssText='position:fixed;width:3px;height:3px;background:rgba(43,208,208,0.8);border-radius:50%;pointer-events:none;z-index:9999;left:50%;top:50%;transition:all 0.8s';document.body.appendChild(p);var a=Math.random()*Math.PI*2,d=100+Math.random()*200;p.style.transform='translate('+(Math.cos(a)*d)+'px,'+(Math.sin(a)*d)+'px)';p.style.opacity='0';setTimeout(function(){p.remove()},800)}},
function(){cubePrint('obj: the void is flattered.');document.getElementById('main').style.filter='brightness(1.5)';setTimeout(function(){document.getElementById('main').style.filter=''},200)},
function(){cubePrint('obj: they saw you click that. (the void. always them.)')},
function(){cubePrint('obj: the core says hi. she does not say hi. but she did.')},
function(){cubePrint('obj: click again. i dare you.');curShape=curShape==='cube'?'sphere':curShape==='sphere'?'tetra':curShape==='tetra'?'cyl':'cube';rebuild(curShape);syncShapePalette()}
];
document.addEventListener('click',function(e){
if(studioOpen)return;
if(wasDrag)return;
if(typeof demoPlaying!=='undefined'&&demoPlaying)return;
if(typeof ngActive!=='undefined'&&ngActive)return;
var ndcX=(e.clientX/window.innerWidth)*2-1;
var ndcY=-(e.clientY/window.innerHeight)*2+1;
var dx=ndcX,dy=ndcY,dd=Math.sqrt(dx*dx+dy*dy);
if(dd<0.3){
if(window._cubeDay===1){cubePrint('obj: ...');return}
var fn=clickActions[Math.floor(Math.random()*clickActions.length)];fn()
}
});

// ┌──────────────────────────────────────────────────────────────┐
// │  HOVER TOOLTIPS                                            │
// └──────────────────────────────────────────────────────────────┘
var hoverCubeEl=null;
canvas.addEventListener('mousemove',function(e){
var ndcX=(e.clientX/window.innerWidth)*2-1;
var ndcY=-(e.clientY/window.innerHeight)*2+1;
var hoverTime=performance.now()*0.001;
var closest=-1,closestD=0.3;
for(var i=0;i<innerC.length;i++){
var c=innerC[i],oa=hoverTime*c.s+c.p;
var ox=Math.cos(oa)*c.o/3,oy=Math.sin(oa*.7)*c.o*.5/3,oz=Math.sin(oa)*c.o/3;
var d=Math.sqrt((ndcX-ox)*(ndcX-ox)+(ndcY-oy)*(ndcY-oy));
if(d<closestD){closestD=d;closest=i}
}
if(closest>=0){
if(!hoverCubeEl){hoverCubeEl=document.createElement('div');hoverCubeEl.style.cssText='position:fixed;padding:4px 8px;background:rgba(0,0,0,0.8);border:1px solid rgba(43,208,208,0.5);border-radius:4px;color:rgba(43,208,208,0.9);font:11px Consolas,monospace;pointer-events:none;z-index:60;white-space:nowrap;transition:opacity 0.2s';document.body.appendChild(hoverCubeEl)}
var names=['red fragment','green fragment','blue fragment','yellow fragment','magenta fragment','cyan fragment','orange fragment','purple fragment'];
hoverCubeEl.textContent=names[closest]+' ['+closest+']';
hoverCubeEl.style.left=(e.clientX+12)+'px';hoverCubeEl.style.top=(e.clientY-8)+'px';hoverCubeEl.style.opacity='1';
}else if(hoverCubeEl){hoverCubeEl.style.opacity='0'}
});

// ┌──────────────────────────────────────────────────────────────┐
// │  COLOR THEMES                                              │
// └──────────────────────────────────────────────────────────────┘
var themes={
'1':{name:'void',bg:[0.005,0.005,0.015],inner:[[1,.2,.3],[.2,1,.3],[.2,.3,1],[1,1,.2],[1,.2,1],[.2,1,1],[1,.6,.1],[.6,.2,1]],outer:[.15,.15,.15],particle:[.2,.8,1]},
'2':{name:'blood',bg:[0.02,0.002,0.002],inner:[[1,.1,.1],[.9,.2,.1],[1,.3,.2],[.8,.1,.1],[1,.15,.15],[.9,.25,.1],[1,.2,.1],[.85,.1,.1]],outer:[.12,.03,.03],particle:[1,.2,.2]},
'3':{name:'ice',bg:[0.002,0.005,0.015],inner:[[.2,.5,1],[.3,.7,1],[.5,.8,1],[.1,.4,1],[.4,.6,1],[.2,.6,1],[.3,.5,1],[.5,.9,1]],outer:[.03,.05,.12],particle:[.3,.7,1]},
'4':{name:'toxic',bg:[0.005,0.015,0.002],inner:[[.2,1,.2],[.3,.9,.1],[.4,1,.3],[.2,.8,.2],[.5,1,.1],[.3,1,.4],[.2,.9,.3],[.4,1,.2]],outer:[.03,.12,.03],particle:[.2,1,.3]},
'5':{name:'void alt',bg:[0.01,0.002,0.015],inner:[[.8,.2,1],[.6,.1,.9],[.9,.3,1],[.7,.2,.8],[1,.2,.9],[.8,.3,1],[.6,.2,.9],[.9,.1,1]],outer:[.08,.03,.12],particle:[.7,.3,1],invert:true},
'6':{name:'prism',bg:[0.015,0.008,0.02],inner:[[1,.4,.7],[.4,1,.9],[.7,.4,1],[1,.7,.4],[.4,.7,1],[.9,.4,1],[1,.5,.8],[.6,.9,1]],outer:[.1,.05,.14],particle:[1,.5,.85]},
'7':{name:'eclipse',bg:[0.002,0.002,0.004],inner:[[1,.85,.2],[.9,.7,.1],[1,.9,.3],[.8,.6,.05],[1,.75,.15],[.85,.65,.2],[.95,.8,.25],[.7,.5,.1]],outer:[.04,.04,.05],particle:[1,.85,.3],invert:true}
};
var curTheme='1';
var themeIndicator=document.getElementById('themeIndicator');
function applyTheme(key){
var th=themes[key];if(!th)return;
if(key==='6'&&!window._skillPrism&&!isAdmin){cubeError('theme 6 locked — unlock: perfect geometry');return}
if(key==='7'&&!window._skillEclipse&&!isAdmin){cubeError('theme 7 locked — unlock: eclipse (anomaly branch)');return}
curTheme=key;
gl.clearColor(th.bg[0],th.bg[1],th.bg[2],1);
for(var i=0;i<innerC.length;i++)innerC[i].c=th.inner[i].slice();
rebuild(curShape);
outerBuf=upBuf(geoCube(1.3,th.outer[0],th.outer[1],th.outer[2]));
outerCol=[th.outer[0],th.outer[1],th.outer[2]];
themeIndicator.textContent='theme: '+th.name+(th.invert?' [inverted]':'');
themeIndicator.style.color='rgba(43,208,208,0.4)';
setTimeout(function(){themeIndicator.style.color='rgba(255,255,255,0.15)'},1500);
}
document.addEventListener('keydown',function(e){
if(typeof ngActive!=='undefined'&&ngActive){if(e.key==='Escape'){try{var _m=document.getElementById('ngMenu');if(_m&&_m.style.display==='block')_m.style.display='none';else ngExit()}catch(err){}}return}
if(e.key>='1'&&e.key<='7'&&!e.ctrlKey&&!e.metaKey&&document.activeElement!==document.getElementById('termField')&&document.activeElement!==document.getElementById('studioCode')&&!(typeof demoPlaying!=='undefined'&&demoPlaying)){
if(themes[e.key])applyTheme(e.key);
}
if(e.key==='F2'){e.preventDefault();toggleScreenshotMode()}
});

// === REFLECTION SIMULATION ===
var reflMix=0.12;

// ┌──────────────────────────────────────────────────────────────┐
// │  SHAPE PALETTE UI                                          │
// └──────────────────────────────────────────────────────────────┘
var palette=document.getElementById('shapePalette');
var pvList=[
{n:'cube',l:'cube',co:[.2,.8,1],g:geoCube},
{n:'tetra',l:'tri',co:[1,.3,.3],g:geoTetra},
{n:'sphere',l:'sphere',co:[.3,1,.5],g:geoSphere},
{n:'cyl',l:'cyl',co:[1,.8,.2],g:geoCyl},
{n:'torus',l:'torus',co:[.8,.3,1],g:geoTorus},
{n:'knot',l:'knot',co:[1,.6,.2],g:geoKnot},
{n:'icosa',l:'icosa',co:[.2,1,.8],g:geoIcosa},
{n:'octa',l:'octa',co:[1,.2,.6],g:geoOcta,skill:'anom3'},
{n:'tesseract',l:'tesseract',co:[.6,.8,1],g:geoTesseract,skill:'anom5'}
];
for(var pi=0;pi<pvList.length;pi++){(function(pv){
var btn=document.createElement('div');
btn.className='shapeBtn'+(pv.n===curShape?' active':'');
var cvs=document.createElement('canvas');cvs.width=52;cvs.height=52;btn.appendChild(cvs);
var lbl=document.createElement('div');lbl.className='shapeLabel';lbl.textContent=pv.l;btn.appendChild(lbl);
try{
var pgl=cvs.getContext('webgl',{antialias:true,alpha:true});
if(pgl){pgl.enable(pgl.DEPTH_TEST);pgl.enable(pgl.CULL_FACE);pgl.clearColor(0,0,0,0);pgl.clear(pgl.COLOR_BUFFER_BIT|pgl.DEPTH_BUFFER_BIT);
var pp=mkP(pgl,VS,FS);pgl.useProgram(pp);
var data=genShape(pv.n,pv.co[0],pv.co[1],pv.co[2]);
var pb=pgl.createBuffer();pgl.bindBuffer(pgl.ARRAY_BUFFER,pb);pgl.bufferData(pgl.ARRAY_BUFFER,data,pgl.STATIC_DRAW);
var pa=pgl.getAttribLocation(pp,'aPos'),pn=pgl.getAttribLocation(pp,'aNorm'),pc=pgl.getAttribLocation(pp,'aCol');
pgl.enableVertexAttribArray(pa);pgl.vertexAttribPointer(pa,3,pgl.FLOAT,false,S,0);
pgl.enableVertexAttribArray(pn);pgl.vertexAttribPointer(pn,3,pgl.FLOAT,false,S,12);
pgl.enableVertexAttribArray(pc);pgl.vertexAttribPointer(pc,3,pgl.FLOAT,false,S,24);
var prj=mPersp(Math.PI/4,1,.1,10),vw=mTrans(0,0,-2.5),md=mMul(mRotX(0.3),mRotY(0.5));
pgl.uniformMatrix4fv(pgl.getUniformLocation(pp,'uMVP'),false,mMul(prj,mMul(vw,md)));
pgl.uniformMatrix4fv(pgl.getUniformLocation(pp,'uMod'),false,md);
pgl.uniformMatrix3fv(pgl.getUniformLocation(pp,'uNM'),false,mNorm(md));
pgl.uniform3f(pgl.getUniformLocation(pp,'uCam'),0,0,2.5);
pgl.uniform1f(pgl.getUniformLocation(pp,'uEm'),0.1);
pgl.uniform1f(pgl.getUniformLocation(pp,'uAl'),1);
pgl.drawArrays(pgl.TRIANGLES,0,data.length/9)}
}catch(e){console.error('preview',e)}
btn.addEventListener('click',function(){
if(!shapeUnlocked(pv)){cubeWarn(pv.l+' locked — unlock: '+(pv.skill==='anom3'?'octahedron':'tesseract')+' (anomaly branch)');return}
curShape=pv.n;rebuild(pv.n);var bs=document.querySelectorAll('.shapeBtn');for(var i=0;i<bs.length;i++)bs[i].classList.remove('active');btn.classList.add('active')});
if(pv.skill){btn.classList.add('skill-locked');btn.dataset.skill=pv.skill}
palette.appendChild(btn);
pv.btn=btn;
})(pvList[pi])}
function octaUnlocked(){return !!(window._skillOcta||isAdmin||(typeof skillHas==='function'&&skillHas('anom3')))}
function tessUnlocked(){return !!(window._skillTess||isAdmin||(typeof skillHas==='function'&&skillHas('anom5')))}
function shapeUnlocked(p){if(!p.skill)return true;if(p.skill==='anom3')return octaUnlocked();if(p.skill==='anom5')return tessUnlocked();return false}
function syncShapePalette(){
try{
for(var i=0;i<pvList.length;i++){var p=pvList[i];if(p.btn)p.btn.classList.toggle('active',p.n===curShape)}
}catch(e){}
}
function refreshShapeLocks(){
for(var i=0;i<pvList.length;i++){
var p=pvList[i];if(!p.skill||!p.btn)continue;
var unlocked=shapeUnlocked(p);
p.btn.classList.toggle('skill-locked',!unlocked);
p.btn.style.opacity=unlocked?'':'0.25';
p.btn.style.filter=unlocked?'':'grayscale(1)';
p.btn.style.pointerEvents=unlocked?'':'none';
}
}
refreshShapeLocks();

// ┌──────────────────────────────────────────────────────────────┐
// │  ZONE SYSTEM                                               │
// └──────────────────────────────────────────────────────────────┘
var currentZone='void';
var zones={
source:{name:'source',desc:'the original page — before the void took over',bg:[0.94,0.94,0.96,1],particleAlpha:0,particleSpeed:0,cubeJitter:0,glitchIntensity:0,filter:'',renderOverride:false},
void:{name:'void',desc:'the void — where obj waits',bg:null,particleAlpha:1,particleSpeed:1,cubeJitter:0,glitchIntensity:0,filter:'',renderOverride:false},
cb_menu:{name:'cb_menu',desc:'the void keeps a menu here. checkerboard floor, dark fog. the edges fall into nothing — watch your step.',bg:[0.03,0.03,0.05,1],particleAlpha:0.4,particleSpeed:0.4,cubeJitter:0.05,glitchIntensity:0.1,filter:'grayscale(0.35) contrast(1.15)',renderOverride:false},
farlands:{name:'farlands',desc:'the farlands — floating point starts to decay',bg:null,particleAlpha:1,particleSpeed:1.5,cubeJitter:0.15,glitchIntensity:0,filter:'',renderOverride:false},
geometry:{name:'geometry void',desc:'geometry void — the void before matter existed',bg:[0.95,0.95,0.97,1],particleAlpha:0,particleSpeed:0,cubeJitter:0,glitchIntensity:0,filter:'',renderOverride:true},
breakdown:{name:'the beginning of the end',desc:'you have gone too far — the renderer is failing',bg:null,particleAlpha:1,particleSpeed:1,cubeJitter:0.12,glitchIntensity:0.5,filter:'',renderOverride:false},
fringenlands:{name:'fringenlands',desc:'the rendering is almost gone — fragments remain',bg:null,particleAlpha:0.3,particleSpeed:2,cubeJitter:0.2,glitchIntensity:1,filter:'contrast(1.5) saturate(0.3)',renderOverride:false},
end:{name:'end',desc:'nothing renders here — only the terminal survives',bg:[0,0,0,1],particleAlpha:0,particleSpeed:0,cubeJitter:0,glitchIntensity:0,filter:'',renderOverride:true},
x:{name:'X',desc:'no entrance — this place does not want you',bg:[0,0,0,1],particleAlpha:0,particleSpeed:0,cubeJitter:0,glitchIntensity:0,filter:'',renderOverride:true}
};
var zoneTransitions={
source:['void'],
void:['source','cb_menu'],
cb_menu:['void','geometry'],
geometry:['cb_menu','farlands'],
farlands:['geometry','breakdown'],
breakdown:['farlands','fringenlands'],
fringenlands:['breakdown','end'],
end:['fringenlands','x'],
x:['end']
};
var zoneOrder=['source','void','cb_menu','geometry','farlands','breakdown','fringenlands','end','x'];
function zoneDistance(a,b){
var ia=zoneOrder.indexOf(a),ib=zoneOrder.indexOf(b);
if(ia===-1||ib===-1)return 1;
return Math.abs(ia-ib);
}

// ┌──────────────────────────────────────────────────────────────┐
// │  TRAVEL ANIMATION                                          │
// └──────────────────────────────────────────────────────────────┘
var travelling=false;
var travelProgress=0;
var travelFrom='void';
var travelTo_zone='void';
var travelDuration=0;
var travelSpeedLines=[];
var travelShakeX=0;
var travelShakeY=0;
var travelPhase='idle';
var travelFadeEl=null;
function initTravelFade(){
if(travelFadeEl)return;
travelFadeEl=document.createElement('div');
travelFadeEl.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;z-index:90;pointer-events:none;background:#000;opacity:0;transition:none';
document.body.appendChild(travelFadeEl);
}
initTravelFade();
function travelTo(zone){
if(travelling)return;
if(zone==='x'&&!(window._skillX||isAdmin)){cubeError('travel: no entrance. the void rejects you.');cubePrint('X does not respond to commands.');return}
if(!zones[zone]){cubeError('travel: unknown zone "'+zone+'"');return}
if(zone===currentZone){cubePrint('you are already in '+zones[zone].name);return}
var allowed=zoneTransitions[currentZone];
if(allowed.indexOf(zone)===-1){cubeError('travel: cannot reach "'+zones[zone].name+'" from here');cubePrint('available destinations: '+allowed.map(function(z){return zones[z].name}).join(', '));return}
var dist=zoneDistance(currentZone,zone);
travelDuration=1500+dist*1200;
travelling=true;
travelFrom=currentZone;
travelTo_zone=zone;
travelProgress=0;
travelPhase='accelerate';
travelShakeX=0;travelShakeY=0;
travelSpeedLines=[];
for(var i=0;i<20+dist*8;i++){
travelSpeedLines.push({x:Math.random(),y:Math.random(),speed:0.5+Math.random()*2,offset:Math.random()*1000,thickness:0.5+Math.random()*2});
}
cubeOk('travel: pulling towards '+zones[zone].name+' ('+dist+' zone'+(dist>1?'s':'')+')');
}
function updateTravel(dt){
if(!travelling)return;
travelProgress+=dt;
var t=Math.min(travelProgress/travelDuration,1);
var eased;
if(t<0.2)eased=t/0.2*0.2;
else if(t<0.8)eased=0.2+(t-0.2)/0.6*0.6;
else eased=0.8+(t-0.8)/0.2*0.2;
eased=eased*eased*(3-2*eased);
if(travelProgress<travelDuration*0.15)travelPhase='accelerate';
else if(travelProgress<travelDuration*0.85)travelPhase='cruise';
else if(travelProgress<travelDuration)travelPhase='decelerate';
else travelPhase='arrive';
if(travelPhase==='accelerate'||travelPhase==='cruise'){
var intensity=travelPhase==='accelerate'?eased:1;
travelShakeX=(Math.random()-0.5)*3*intensity;
travelShakeY=(Math.random()-0.5)*3*intensity;
var blur=travelPhase==='cruise'?1.5:intensity*1;
document.getElementById('main').style.filter='blur('+blur+'px) brightness('+(1+intensity*0.3)+')';
}else if(travelPhase==='decelerate'){
var fade=(1-eased)*2;
travelShakeX=(Math.random()-0.5)*1.5*fade;
travelShakeY=(Math.random()-0.5)*1.5*fade;
document.getElementById('main').style.filter='blur('+(fade*1.5)+'px)';
}else{
travelShakeX*=0.9;travelShakeY*=0.9;
}
var fadeIn=Math.min(t*4,1);
var fadeOut=Math.max(0,Math.min((1-t)*4,1));
var midFade=Math.min(fadeIn,fadeOut);
travelFadeEl.style.opacity=String(1-midFade);
if(travelProgress>=travelDuration){
travelling=false;
currentZone=travelTo_zone;
try{cbMenuArrive(travelTo_zone)}catch(e){}
applyZoneEffects(travelTo_zone);
travelPhase='idle';
travelFadeEl.style.opacity='0';
document.getElementById('main').style.filter='';
cubePrint('obj: you have arrived at '+zones[travelTo_zone].name+'.');
cubePrint(zones[travelTo_zone].desc);
}
}
function applyZoneEffects(zone){
try{var _zv=achZonesSeen();if(_zv.indexOf(zone)===-1){_zv.push(zone);try{localStorage.setItem('cube_zones_seen',JSON.stringify(_zv))}catch(e){}if(_zv.length>=9){try{ach('globe_trotter')}catch(e){}}}}catch(e){}
var z=zones[zone];
var mainC=document.getElementById('main');
if(z.filter){mainC.style.filter=z.filter}
else if(zone==='void'){mainC.style.filter=''}
else if(zone==='source'){mainC.style.filter='brightness(1.15) saturate(0.3)'}
else{mainC.style.filter=''}
var zx=document.getElementById('zoneX');
if(zx)zx.style.display=(zone==='x')?'block':'none';
var cbfg=document.getElementById('cbFog');if(cbfg)cbfg.style.display=(zone==='cb_menu')?'block':'none';
var hmc=document.getElementById('homCanvas');if(hmc){if(zone==='cb_menu'){hmc.style.display='block'}else if(hmc.style.display==='block'){hmc.style.display='none';try{hmc.getContext('2d').clearRect(0,0,hmc.width,hmc.height)}catch(e){}}}
if(zone==='x'){
try{ach('voidborn')}catch(e){}
termPrint('','rgba(255,255,255,0.2)');
termPrint('  you crossed the breach.','rgba(255,80,80,0.7)');
termPrint('  X does not render. X does not need to.','rgba(255,80,80,0.55)');
termPrint('  something is watching from the null.','rgba(255,60,60,0.4)');
termPrint('','rgba(255,255,255,0.2)');
startZoneXWhispers();
}else stopZoneXWhispers();
if(zone==='cb_menu'){
_ngBoxPrevMode=ngMusicMode;_ngBoxPrevBgm=!bgm.paused;_ngBoxWasOn=!!(typeof ngMusic!=='undefined'&&ngMusic&&!ngMusic.paused);
try{bgm.pause()}catch(e){}
try{moonEl.pause()}catch(e){}
ngMusicMode=1;ngMusicApply();
}else if(typeof _ngBoxPrevMode!=='undefined'&&_ngBoxPrevMode>=0){
var pm=_ngBoxPrevMode,pb=_ngBoxPrevBgm,was=_ngBoxWasOn;_ngBoxPrevMode=-1;
ngMusicMode=pm;
if(was)ngMusicApply();
else{try{if(typeof ngMusic!=='undefined'&&ngMusic)ngMusic.pause()}catch(e){}var mb=document.getElementById('ngMenuMusic');if(mb)mb.textContent=ngMusicLabel()}
if(pb){try{bgm.play().catch(function(){})}catch(e){}}
}
}
var _ngBoxPrevMode=-1,_ngBoxPrevBgm=false,_ngBoxWasOn=false;
var _zoneXTimer=null;
var _zoneXLines=[
'the terminal is the only thing X cannot delete.',
'you are not the first. you are just the current.',
'obj sent something ahead of you. it did not come back.',
'sector 7G has no floor plan. it has no walls.',
'somewhere here the page still thinks it is loading.',
'if you stare into the null long enough, it files a bug.',
'the cube was never meant to render this far.',
'X is not a zone. X is a refusal.',
'your cursor is still tracked. X just does not care.',
'there is a heartbeat under the black. it is not yours.',
'you may leave. X will not ask you to stay. X never asks.',
'obj: ...',
'obj: do not stay long.',
'the breach will hold. probably.'
];
function startZoneXWhispers(){
stopZoneXWhispers();
_zoneXTimer=setInterval(function(){
if(currentZone!=='x'){stopZoneXWhispers();return}
if(Math.random()<0.55){
var line=_zoneXLines[Math.floor(Math.random()*_zoneXLines.length)];
termPrint(line,line.indexOf('obj:')===0?'rgba(43,208,208,0.55)':'rgba(255,70,70,0.45)');
}
},9000);
}
function stopZoneXWhispers(){if(_zoneXTimer){clearInterval(_zoneXTimer);_zoneXTimer=null}}
// ┌──────────────────────────────────────────────────────────────┐
// │  GEOMETRY VOID RENDERER                                    │
// └──────────────────────────────────────────────────────────────┘
var geoShapes=[];
function initGeoShapes(){
for(var i=0;i<40;i++){
geoShapes.push({
x:(Math.random()-0.5)*20,y:(Math.random()-0.5)*12,z:-5-Math.random()*20,
rx:Math.random()*Math.PI*2,ry:Math.random()*Math.PI*2,rz:Math.random()*Math.PI*2,
sp:0.2+Math.random()*0.8,sz:0.3+Math.random()*0.7,
type:Math.floor(Math.random()*3)
});
}
}
initGeoShapes();
function drawGeometryVoid(proj,view,time){
var t=time*0.001;
gl.useProgram(lprog);
gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
gl.depthMask(false);
gl.uniformMatrix4fv(lPr,false,proj);
gl.uniformMatrix4fv(lVw,false,view);
for(var i=0;i<geoShapes.length;i++){
var s=geoShapes[i];
var mod=mMul(mMul(mTrans(s.x,s.y+s.z*0.05,s.z),mMul(mMul(mRotX(t*s.sp+s.rx),mRotY(t*s.sp*0.7+s.ry)),mRotZ(t*s.sp*0.3+s.rz))),mScale(s.sz,s.sz,s.sz));
var col=[
0.2+Math.sin(t+i)*0.1,
0.4+Math.cos(t*0.5+i)*0.2,
0.6+Math.sin(t*0.3+i*0.5)*0.2,
0.3+Math.sin(t*0.2+i)*0.15
];
var verts=[];var colors=[];
function addVert(x,y,z){
var w=mTransform(mod,[x,y,z,1]);
verts.push(w[0],w[1],w[2]);
colors.push(col[0],col[1],col[2],col[3]);
}
if(s.type===0){
for(var f=0;f<3;f++){
var a1=f/3*Math.PI*2,a2=(f+1)/3*Math.PI*2;
addVert(0,0,0);addVert(Math.cos(a1),Math.sin(a1),0);
addVert(Math.cos(a1),Math.sin(a1),0);addVert(Math.cos(a2),Math.sin(a2),0);
addVert(Math.cos(a2),Math.sin(a2),0);addVert(0,0,0);
}
}else if(s.type===1){
var c=[[1,1,1],[1,1,-1],[1,-1,1],[1,-1,-1],[-1,1,1],[-1,1,-1],[-1,-1,1],[-1,-1,-1]];
var edges=[[0,1],[0,2],[0,4],[1,3],[1,5],[2,3],[2,6],[3,7],[4,5],[4,6],[5,7],[6,7]];
for(var e=0;e<edges.length;e++){
addVert(c[edges[e][0]][0],c[edges[e][0]][1],c[edges[e][0]][2]);
addVert(c[edges[e][1]][0],c[edges[e][1]][1],c[edges[e][1]][2]);
}
}else{
for(var f=0;f<4;f++){
var a1=f/4*Math.PI*2,a2=(f+1)/4*Math.PI*2;
addVert(0,0.8,0);addVert(Math.cos(a1),-0.5,Math.sin(a1));
addVert(Math.cos(a1),-0.5,Math.sin(a1));addVert(Math.cos(a2),-0.5,Math.sin(a2));
addVert(Math.cos(a2),-0.5,Math.sin(a2));addVert(0,0.8,0);
addVert(Math.cos(a1),-0.5,Math.sin(a1));addVert(0,-0.8,0);
addVert(Math.cos(a2),-0.5,Math.sin(a2));addVert(0,-0.8,0);
}
}
var buf=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,buf);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(verts),gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray(lAP);
gl.vertexAttribPointer(lAP,3,gl.FLOAT,false,0,0);
var cbuf=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,cbuf);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(colors),gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray(lAC);
gl.vertexAttribPointer(lAC,4,gl.FLOAT,false,0,0);
gl.drawArrays(gl.LINES,0,verts.length/3);
gl.deleteBuffer(buf);gl.deleteBuffer(cbuf);
}
gl.disable(gl.BLEND);gl.depthMask(true);
}
function getZoneRenderFlags(){
var z=zones[currentZone];
return{
bgOverride:z.bg,
particleAlpha:z.particleAlpha,
particleSpeed:z.particleSpeed,
cubeJitter:z.cubeJitter,
glitchBoost:z.glitchIntensity,
renderOff:z.renderOverride,
zone:currentZone
};
}

// ┌──────────────────────────────────────────────────────────────┐
// │  MAIN RENDER LOOP                                          │
// └──────────────────────────────────────────────────────────────┘
var frames=0,lastT=performance.now(),fps=0,maxFps=0,statsEl=document.getElementById('stats');
var lastRenderTime=0;
var vdBuilt=false,vdSh=null,vdDefs=null,vdDust=null,vdHull=null,vdStars=[null,null];
function buildVoidExtras(){
if(vdBuilt)return;vdBuilt=true;
vdSh=rkMesh(geoCyl(0.5,2.2,5,1,1,1));
vdDefs=[];
for(var i=0;i<16;i++){var a=i*2.399,r=4.5+((i*7919)%13)*0.7;
vdDefs.push({x:Math.cos(a)*r,y:Math.sin(a*1.7)*(2+((i*31)%5)),z:-6-((i*13)%17),s:0.14+((i*17)%9)/28,rx:i*1.1,ry:i*2.3,sp:0.1+((i*11)%7)/22});}
var dv=new Float32Array(4*30*8),k=0;
var cl=[[3.4,1.2,-7],[-3.8,-1.4,-10],[1.5,-2.6,-14],[-2.2,2.4,-18]];
for(var c=0;c<4;c++)for(var p=0;p<30;p++){var s1=(c+1)*(p+1);
var h1=Math.sin(s1*12.9898)*43758.5453;h1-=Math.floor(h1);
var h2=Math.sin(s1*78.233)*12578.1459;h2-=Math.floor(h2);
var h3=Math.sin(s1*39.425)*65428.3912;h3-=Math.floor(h3);
dv[k++]=cl[c][0]+(h1-0.5)*1.7;dv[k++]=cl[c][1]+(h2-0.5)*1.2;dv[k++]=cl[c][2]+(h3-0.5)*1.4;
dv[k++]=0.010+h3*0.016;var w=0.5+h2*0.4;
dv[k++]=w;dv[k++]=w*0.72;dv[k++]=w;dv[k++]=0.10+h1*0.30;}
vdDust=upBuf(dv);
var hs=[],cx=0,cy=0.5,cz=-24,w=4.5,h=2.6,d=2.6;
function ep(x,y,z){hs.push([cx+x*w,cy+y*h,cz+z*d])}
var C=[[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]];
var E=[[0,1],[1,2],[2,3],[3,0],[4,5],[5,6],[6,7],[7,4],[0,4],[1,5],[2,6],[3,7],[0,6],[1,7],[2,4],[3,5]];
for(var e=0;e<E.length;e++){var A=C[E[e][0]],B=C[E[e][1]];
hs.push([cx+A[0]*w,cy+A[1]*h,cz+A[2]*d,cx+B[0]*w,cy+B[1]*h,cz+B[2]*d]);}
hs.push([cx-w,cy,cz-d,cx-w*0.2,cy,cz+d],[cx+w,cy,cz+d,cx+w*0.2,cy,cz-d]);
vdHull=rkLineBuf(hs);rkColors(vdHull,[0.25,0.55,0.60,0.55]);
for(var L=0;L<2;L++){var B=new Float32Array(200*8),n=L?500:0;
for(var i2=0;i2<200;i2++){var s2=i2+n,o=i2*8;
var q1=Math.sin(s2*12.9898)*43758.5453;q1-=Math.floor(q1);
var q2=Math.sin(s2*78.233)*12578.1459;q2-=Math.floor(q2);
var q3=Math.sin(s2*39.425)*65428.3912;q3-=Math.floor(q3);
B[o]=(q1-0.5)*(L?70:46);B[o+1]=(q2-0.5)*(L?44:30);B[o+2]=-(L?34:16)-q3*(L?26:14);
B[o+3]=L?0.020:0.012;var tw=0.55+q3*0.45;
B[o+4]=tw*0.75;B[o+5]=tw*0.85;B[o+6]=tw;B[o+7]=(L?0.35:0.7)*(0.5+0.5*tw);}
vdStars[L]=upBuf(B);}
}
function vdAttribs(b){
gl.bindBuffer(gl.ARRAY_BUFFER,b);
gl.enableVertexAttribArray(ppAP);gl.vertexAttribPointer(ppAP,3,gl.FLOAT,false,32,0);
gl.enableVertexAttribArray(ppAS);gl.vertexAttribPointer(ppAS,1,gl.FLOAT,false,32,12);
gl.enableVertexAttribArray(ppAC);gl.vertexAttribPointer(ppAC,3,gl.FLOAT,false,32,16);
gl.enableVertexAttribArray(ppAA);gl.vertexAttribPointer(ppAA,1,gl.FLOAT,false,32,28);
}
function drawVoidExtras(proj,view,t,zr){
if(!vdBuilt)buildVoidExtras();
gl.useProgram(pprog);gl.uniformMatrix4fv(ppPJ,false,proj);
gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);gl.depthMask(false);
gl.uniformMatrix4fv(ppVW,false,mMul(view,mRotZ(t*0.01)));
vdAttribs(vdStars[1]);gl.drawArrays(gl.POINTS,0,200);
gl.uniformMatrix4fv(ppVW,false,view);
vdAttribs(vdStars[0]);gl.drawArrays(gl.POINTS,0,200);
vdAttribs(vdDust);gl.drawArrays(gl.POINTS,0,120);
gl.depthMask(true);gl.disable(gl.BLEND);
gl.useProgram(prog);gl.uniform3f(uCam,0,0,-zZ);gl.uniform1f(uInv,0);gl.uniform1f(uFr,1);
gl.uniform1f(uEm,0.18);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
var zt=zr.bgOverride;
for(var i=0;i<vdDefs.length;i++){var d=vdDefs[i];
var mod=mMul(mTrans(d.x+Math.sin(t*0.1+i)*0.5,d.y+Math.cos(t*0.13+i*2)*0.4,d.z),mMul(mRotX(d.rx+t*d.sp),mMul(mRotY(d.ry+t*d.sp*1.3),mScale(d.s,d.s,d.s))));
var m=(i%3)/3;
var tc=zt?[0.30+zt[0]*0.6,0.28+zt[1]*0.5,0.40+zt[2]*0.7]:rkMix([0.42,0.38,0.58],[0.62,0.35,0.70],m);
rkTint(vdSh,tc);bindM(vdSh.buf);
gl.uniformMatrix4fv(uMVP,false,mMul(mMul(proj,view),mod));
gl.uniformMatrix4fv(uMod,false,mod);gl.uniformMatrix3fv(uNM,false,mNorm(mod));
gl.uniform1f(uAl,0.85);
gl.drawArrays(gl.TRIANGLES,0,vdSh.cnt);}
gl.depthMask(true);gl.disable(gl.BLEND);gl.enable(gl.DEPTH_TEST);
}
function render(time){
if(odActive&&time-lastRenderTime<100){requestAnimationFrame(render);return}
var dt=time-lastRenderTime;lastRenderTime=time;
frames++;var now=performance.now();
if(now-lastT>=1000){fps=frames;if(fps>maxFps)maxFps=fps;frames=0;lastT=now;
var odTag=odActive?' | <span style="color:#ff4040">OVERDOSE</span>':'';
statsEl.innerHTML='FPS: '+fps+' | MAX: '+maxFps+' | SHAPES: '+innerC.length+' | PARTICLES: '+NP+' | UP: '+getUptime()+' | VISITS: '+visitCount+(travelling?' | TRAVELLING: '+Math.floor(travelProgress/travelDuration*100)+'%':'')+odTag;
if(fps<lastFps-10&&fps<40)triggerGlitch();lastFps=fps}
updateTravel(dt);
if(!drag&&!isFrozen){rY+=vY;rX+=vX;vX*=.97;vY*=.97;if(Math.abs(vX)<.0001)vX=0;if(Math.abs(vY)<.0001)vY=0;if(typeof currentZone!=='undefined'&&currentZone==='cb_menu'&&!(typeof demoPlaying!=='undefined'&&demoPlaying)){if(rX>1.25)rX=1.25;if(rX<-0.55)rX=-0.55}}
var _mon=window._cubeDay===1;
var isMoon=activeTrack==='moon1857'&&odActive;
var audioLevel=_mon&&!isMoon?0:getAudioLevel();
var bands=isMoon?getAudioBands():{bass:audioLevel,mid:audioLevel*0.5,high:audioLevel*0.3};
if(isMoon){
audioLevel=bands.mid*0.6+bands.bass*0.4;
rX+=(Math.random()-0.5)*0.003*(1+bands.bass*8);
rY+=(Math.random()-0.5)*0.003*(1+bands.high*8);
var fl=document.getElementById('odFlash');
if(bands.bass>0.55&&time-odLastFlash>120){
odLastFlash=time;
var cls=Math.random()<0.5?'on':(Math.random()<0.5?'on2':(Math.random()<0.5?'on3':'on4'));
fl.className=cls;
setTimeout(function(){fl.className=''},40+Math.random()*60);
}
document.body.style.filter='hue-rotate('+((Math.sin(time*0.001)*30+bands.bass*40))+'deg) saturate('+(1.4+bands.bass*1.2)+') contrast('+(1.1+bands.high*0.5)+')';
var vg=document.getElementById('vignette');
if(vg)vg.style.background='radial-gradient(ellipse at center,transparent '+(50+bands.bass*20)+'%,rgba('+(bands.bass*255|0)+',0,'+(bands.high*255|0)+',0.75) 100%)';
}
var _wed=window._cubeDay===3;
var _fri=window._cubeDay===5;
var _sat=window._cubeDay===6;
var _sunEarly=window._cubeDay===0&&(window._cubeSunHalf==='early'||(!window._cubeDayOverride&&new Date().getHours()<12));
var _party=_wed||_fri||_sat;
var _fire=_sat;
var _peaceful=_sunEarly;
var audioPulse=1.0+audioLevel*(_party?0.35:(_peaceful?0.15:(isMoon?0.4:0.08)));
var wedBoost=(_party||isMoon)?(isMoon?12:8):(_peaceful?2:1);
var wedBeat=_party||isMoon?audioLevel:(_peaceful?audioLevel*0.5:0);

// audio visualizer background pulse
var th=themes[curTheme]||themes['1'];
var bgPulse=audioLevel*(_party?0.2:0.03);
var hueShift=Math.sin(time*0.00008)*0.008;
var zr=getZoneRenderFlags();
if(_mon){
gl.clearColor(0.08,0.08,0.08,1);
}else if(_peaceful){
var _softPulse=0.5+audioLevel*0.15;
gl.clearColor(0.05+_softPulse*0.03,0.06+_softPulse*0.04,0.12+_softPulse*0.06,1);
}else if(zr.bgOverride){
gl.clearColor(zr.bgOverride[0],zr.bgOverride[1],zr.bgOverride[2],zr.bgOverride[3]);
}else{
gl.clearColor(
Math.max(0,Math.min(1,th.bg[0]+bgPulse+hueShift)),
Math.max(0,Math.min(1,th.bg[1]+bgPulse*0.5)),
Math.max(0,Math.min(1,th.bg[2]+bgPulse-hueShift)),
1);
}

gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
var asp=canvas.width/canvas.height,proj=mPersp(Math.PI/4,asp,.1,100);
var view=mMul(mTrans(0,0,zZ),mMul(mRotY(rY),mRotX(rX)));
if(travelling){
var travelT=travelProgress/travelDuration;
var travelZ=-travelT*8;
var shakeAmt=travelPhase==='cruise'?3:travelPhase==='accelerate'?travelT*5:travelPhase==='decelerate'?(1-travelT)*3:0;
travelShakeX=(Math.random()-0.5)*shakeAmt;
travelShakeY=(Math.random()-0.5)*shakeAmt;
view=mMul(mTrans(travelShakeX,travelShakeY,zZ+travelZ),mMul(mRotY(rY),mRotX(rX)));
}
var t=time*.001;
if(window._timeFrozen)t=window._frozenT!==undefined?window._frozenT:0;
else window._frozenT=t;

// package effects
if(pkgEffects.cubeDance)t*=3;
if(pkgEffects.entropy)t*=(1+Math.sin(time*0.001)*0.5);

// particles
updateTrail();
drawTrail();
updateParticles((window._timeFrozen&&window._frozenT!==undefined)?window._frozenT*1000:time);
if(zr.zone==='geometry'){
drawGeometryVoid(proj,view,(window._timeFrozen&&window._frozenT!==undefined)?window._frozenT*1000:time);
}else if(!zr.renderOff){
gl.useProgram(pprog);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);gl.depthMask(false);
gl.uniformMatrix4fv(ppPJ,false,proj);gl.uniformMatrix4fv(ppVW,false,view);
gl.bindBuffer(gl.ARRAY_BUFFER,pBuf);
gl.enableVertexAttribArray(ppAP);gl.vertexAttribPointer(ppAP,3,gl.FLOAT,false,32,0);
gl.enableVertexAttribArray(ppAS);gl.vertexAttribPointer(ppAS,1,gl.FLOAT,false,32,12);
gl.enableVertexAttribArray(ppAC);gl.vertexAttribPointer(ppAC,3,gl.FLOAT,false,32,16);
gl.enableVertexAttribArray(ppAA);gl.vertexAttribPointer(ppAA,1,gl.FLOAT,false,32,28);
gl.drawArrays(gl.POINTS,0,NP);
}

gl.depthMask(true);gl.disable(gl.BLEND);
if(!zr.renderOff&&zr.zone!=='geometry')drawVoidExtras(proj,view,t,zr);

// cubes
if(!zr.renderOff){
gl.useProgram(prog);gl.uniform3f(uCam,0,0,-zZ);

// outer
var _oSpd=_mon?0:(_party?4:1);
var oMod=mMul(mMul(mRotX(t*.15*_oSpd),mRotY(t*.2*_oSpd)),mRotZ(t*.1*_oSpd));
if(_fire){
var _flicker=0.8+Math.sin(t*12)*0.2+Math.sin(t*17)*0.15+Math.sin(t*23)*0.1;
oMod[0]*=(1.0+wedBeat*0.6*_flicker);oMod[5]*=(1.0+wedBeat*0.6*_flicker);oMod[10]*=(1.0+wedBeat*0.6*_flicker);
oMod[12]+=(Math.random()-0.5)*wedBeat*0.4;
oMod[13]+=(Math.random()-0.5)*wedBeat*0.4;
}else if(_wed||_fri){
var _breathe=1.0+wedBeat*0.8;
oMod[0]*=_breathe;oMod[5]*=_breathe;oMod[10]*=_breathe;
oMod[12]+=(Math.random()-0.5)*wedBeat*0.3;
oMod[13]+=(Math.random()-0.5)*wedBeat*0.3;
}
if(zr.cubeJitter){
var jt=zr.cubeJitter;
oMod[12]+=(Math.random()-0.5)*jt;oMod[13]+=(Math.random()-0.5)*jt;oMod[14]+=(Math.random()-0.5)*jt;
}
gl.uniformMatrix4fv(uMVP,false,mMul(mMul(proj,view),oMod));
gl.uniformMatrix4fv(uMod,false,oMod);gl.uniformMatrix3fv(uNM,false,mNorm(oMod));
if(_fire){
var _fe=(0.5+wedBeat*1.5+Math.sin(t*15)*0.2)*audioPulse;
gl.uniform1f(uEm,_fe);gl.uniform1f(uAl,.4+wedBeat*0.3);
}else{
gl.uniform1f(uEm,_mon?0.02:audioLevel*0.05*wedBoost);gl.uniform1f(uAl,_mon?0.15:(.25+audioLevel*0.05*wedBoost));
}
gl.uniform1f(uInv,window._premInvert?1:(themes[curTheme]&&themes[curTheme].invert?1:0));
gl.uniform1f(uFr,(window._skillFresnel||1)+(window._skillFresnelBoost||0));
gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(false);
var _isTess=(typeof curShape!=='undefined'&&curShape==='tesseract');
var _tp=null;
if(_isTess){
// tesseract IS the outer shell: 4D rotate + perspective project, all 8 cubic cells as alpha faces
_tp=new Float32Array(64);
var _a=t*0.42,_b=t*0.27,_c=t*0.15;
var _ca=Math.cos(_a),_sa=Math.sin(_a),_cb=Math.cos(_b),_sb=Math.sin(_b),_cc=Math.cos(_c),_sc=Math.sin(_c);
for(var _k=0;_k<16;_k++){
var x=tetV[_k*4],y=tetV[_k*4+1],z=tetV[_k*4+2],w=tetV[_k*4+3];
var x1=x*_ca-w*_sa,w1=x*_sa+w*_ca;
var z1=z*_cb-w1*_sb,w2=z*_sb+w1*_cb;
var y1=y*_cc-w2*_sc,w3=y*_sc+w2*_cc;
var kk=3.4/(3.4-w3);
_tp[_k*4]=x1*kk;_tp[_k*4+1]=y1*kk;_tp[_k*4+2]=z1*kk;
}
var _fc=[outerCol[0]*0.55+0.6*0.45,outerCol[1]*0.55+0.8*0.45,outerCol[2]*0.55+1*0.45];
var _fm=buildTessFaces(_tp,_fc);
gl.uniform1f(uAl,_mon?0.15:(0.22+audioLevel*0.06+wedBeat*0.15));
if(!tessFaceBuf)tessFaceBuf=gl.createBuffer();
bindM(tessFaceBuf);
gl.bufferData(gl.ARRAY_BUFFER,_fm,gl.DYNAMIC_DRAW);
gl.disable(gl.CULL_FACE);
gl.drawArrays(gl.TRIANGLES,0,_fm.length/9);
gl.enable(gl.CULL_FACE);
}else{
bindM(outerBuf);gl.drawArrays(gl.TRIANGLES,0,36);
}
gl.depthMask(true);gl.uniform1f(uAl,1);

// glowing edge wireframe — x-ray cage over the outer cube
try{
gl.useProgram(lprog);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);gl.depthMask(false);gl.disable(gl.DEPTH_TEST);
gl.uniformMatrix4fv(lPr,false,proj);gl.uniformMatrix4fv(lVw,false,view);
var _nv=_isTess?tetE.length:24,_ev=new Float32Array(_nv*3);
if(_isTess){
for(var _ej2=0;_ej2<32;_ej2++){
var _A=tetE[_ej2*2]*4,_B=tetE[_ej2*2+1]*4;
for(var _s2=0;_s2<2;_s2++){
var _p=_s2?_B:_A,_o=(_ej2*2+_s2)*3,_px=_tp[_p],_py=_tp[_p+1],_pz=_tp[_p+2];
_ev[_o]=oMod[0]*_px+oMod[4]*_py+oMod[8]*_pz+oMod[12];
_ev[_o+1]=oMod[1]*_px+oMod[5]*_py+oMod[9]*_pz+oMod[13];
_ev[_o+2]=oMod[2]*_px+oMod[6]*_py+oMod[10]*_pz+oMod[14];}}
}else{
for(var _ei=0;_ei<24;_ei++){var _bx=edgePos[_ei*3],_by=edgePos[_ei*3+1],_bz=edgePos[_ei*3+2];
_ev[_ei*3]=oMod[0]*_bx+oMod[4]*_by+oMod[8]*_bz+oMod[12];
_ev[_ei*3+1]=oMod[1]*_bx+oMod[5]*_by+oMod[9]*_bz+oMod[13];
_ev[_ei*3+2]=oMod[2]*_bx+oMod[6]*_by+oMod[10]*_bz+oMod[14];}
}
var _ec=new Float32Array(_nv*4);
var _er=Math.min(1,outerCol[0]*1.4+0.5),_eg=Math.min(1,outerCol[1]*1.4+0.5),_eb=Math.min(1,outerCol[2]*1.4+0.5);
if(_isTess){_er=Math.min(1,_er*0.55+0.27);_eg=Math.min(1,_eg*0.55+0.36);_eb=Math.min(1,_eb*0.55+0.45);}
var _ea=_mon?0.15:(0.30+audioLevel*0.45+wedBeat*0.3+(_isTess?0.35:0));
for(var _ej=0;_ej<_nv;_ej++){_ec[_ej*4]=_er;_ec[_ej*4+1]=_eg;_ec[_ej*4+2]=_eb;_ec[_ej*4+3]=_ea;}
var _evb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,_evb);gl.bufferData(gl.ARRAY_BUFFER,_ev,gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray(lAP);gl.vertexAttribPointer(lAP,3,gl.FLOAT,false,0,0);
var _ecb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,_ecb);gl.bufferData(gl.ARRAY_BUFFER,_ec,gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray(lAC);gl.vertexAttribPointer(lAC,4,gl.FLOAT,false,0,0);
gl.drawArrays(gl.LINES,0,_nv);
gl.deleteBuffer(_evb);gl.deleteBuffer(_ecb);
gl.enable(gl.DEPTH_TEST);gl.depthMask(true);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.useProgram(prog);
}catch(_e){}

// cb_menu floor — same camera, so parallax and zoom are real
if(zr.zone==='cb_menu'&&cbFloorBuf){
var fMod=mTrans(0,0,0);
gl.uniformMatrix4fv(uMVP,false,mMul(mMul(proj,view),fMod));
gl.uniformMatrix4fv(uMod,false,fMod);gl.uniformMatrix3fv(uNM,false,mNorm(fMod));
gl.uniform1f(uEm,0.12);gl.uniform1f(uAl,1);
gl.uniform1f(uInv,0);
gl.disable(gl.CULL_FACE);
bindM(cbFloorBuf);gl.drawArrays(gl.TRIANGLES,0,cbFloorCnt);
gl.enable(gl.CULL_FACE);
gl.uniform1f(uAl,1);
}

// inner
var _wSpd=_mon?0:(_party?3:1)*(window._skillSpin||1)*(1+0.35*(window._skillSpinBoost||0));
var _wRad=_party?1.0+wedBeat*1.2:1;
for(var i=0;i<innerC.length;i++){
var c=innerC[i],oa=t*c.s*_wSpd+c.p;
var _co=_mon?c.o:(c.o*_wRad);
var ox=Math.cos(oa)*_co,oy=Math.sin(oa*.7)*_co*.5+(_mon?0:wedBeat*0.6*Math.sin(t*8+i)),oz=Math.sin(oa)*_co;
if(zr.cubeJitter){
var jit=zr.cubeJitter*3;
ox+=(Math.random()-0.5)*jit;oy+=(Math.random()-0.5)*jit;oz+=(Math.random()-0.5)*jit;
}
var _iSc=_mon?1:(_party?1.0+wedBeat*0.9:1);
var iMod=mMul(mMul(mTrans(ox,oy,oz),mMul(mMul(mRotX(t*c.sp*_wSpd),mRotY(t*c.sp*.7*_wSpd)),mRotZ(t*c.sp*.3*_wSpd))),mScale(_iSc,_iSc,_iSc));
gl.uniformMatrix4fv(uMVP,false,mMul(mMul(proj,view),iMod));
gl.uniformMatrix4fv(uMod,false,iMod);gl.uniformMatrix3fv(uNM,false,mNorm(iMod));
if(_fire){
var _fe2=(0.3+wedBeat*1.2+Math.sin(t*18+i)*0.3)*audioPulse;
gl.uniform1f(uEm,_fe2);
}else{
gl.uniform1f(uEm,_mon?0.01:(0.2+wedBeat*0.5)*audioPulse*wedBoost);
}
gl.uniform1f(uInv,window._premInvert?1:(themes[curTheme]&&themes[curTheme].invert?1:0));
bindM(iBufs[i]);gl.drawArrays(gl.TRIANGLES,0,iCnts[i])}

// travel speed lines
if(travelling){
var travelT=travelProgress/travelDuration;
gl.useProgram(lprog);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);gl.depthMask(false);
gl.uniformMatrix4fv(lPr,false,proj);gl.uniformMatrix4fv(lVw,false,view);
var spd=travelPhase==='cruise'?1.5:travelPhase==='accelerate'?travelT*1.2:travelPhase==='decelerate'?(1-travelT)*1.5:0.3;
var lineVerts=[];var lineCols=[];
for(var si=0;si<travelSpeedLines.length;si++){
var sl=travelSpeedLines[si];
sl.y+=sl.speed*spd*0.02;
if(sl.y>1.2){sl.y=-0.2;sl.x=Math.random()}
var lx=(sl.x-0.5)*16;
var ly=(sl.y-0.5)*12;
var lz=-5-Math.random()*15;
var alpha=spd*0.6*(1-Math.abs(sl.y-0.5)*2);
if(alpha<=0)continue;
lineVerts.push(lx,ly,lz,lx,ly+0.3+spd*0.4,lz+0.5);
lineCols.push(0.3,0.8,0.9,alpha,0.3,0.8,0.9,alpha*0.3);
}
if(lineVerts.length>0){
var sbuf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,sbuf);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(lineVerts),gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray(lAP);gl.vertexAttribPointer(lAP,3,gl.FLOAT,false,0,0);
var scbuf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,scbuf);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(lineCols),gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray(lAC);gl.vertexAttribPointer(lAC,4,gl.FLOAT,false,0,0);
gl.drawArrays(gl.LINES,0,lineVerts.length/3);
gl.deleteBuffer(sbuf);gl.deleteBuffer(scbuf);
}
}

// === ZONE CORRUPTION EFFECTS ===
if(zr.zone==='farlands'){
// floating point color drift on cubes - red/blue channel separation
var drift=Math.sin(time*0.003)*0.15;
document.getElementById('main').style.filter='hue-rotate('+drift*100+'deg) saturate('+(1.2+Math.sin(time*0.005)*0.3)+')';
// vertex wobble overlay - draw random jittered lines
gl.useProgram(lprog);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);gl.depthMask(false);
gl.uniformMatrix4fv(lPr,false,proj);gl.uniformMatrix4fv(lVw,false,view);
var fVerts=[];var fCols=[];
for(var fi=0;fi<8;fi++){
var fx=(Math.random()-0.5)*10;
var fy=(Math.random()-0.5)*6;
var fz=-3-Math.random()*10;
var len=0.3+Math.random()*0.5;
var alpha=0.15+Math.random()*0.2;
fVerts.push(fx,fy,fz,fx+Math.random()*len-Math.random()*len,fy+Math.random()*len-Math.random()*len,fz);
fCols.push(0.3,0.8,0.9,alpha,0.3,0.8,0.9,0);
}
if(fVerts.length>0){
var fb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,fb);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(fVerts),gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray(lAP);gl.vertexAttribPointer(lAP,3,gl.FLOAT,false,0,0);
var fcb=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,fcb);
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(fCols),gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray(lAC);gl.vertexAttribPointer(lAC,4,gl.FLOAT,false,0,0);
gl.drawArrays(gl.LINES,0,fVerts.length/3);
gl.deleteBuffer(fb);gl.deleteBuffer(fcb);
}
gl.disable(gl.BLEND);gl.depthMask(true);
}

if(zr.zone==='breakdown'){
// WebGL corruption: random screen tearing strips
gl.disable(gl.BLEND);
var tearCount=2+Math.floor(Math.random()*4);
for(var ti=0;ti<tearCount;ti++){
var ty=Math.random()*canvas.height;
var th=2+Math.random()*15;
var shift=(Math.random()-0.5)*40;
gl.clearColor(Math.random()*0.4,Math.random()*0.2,Math.random()*0.4,1);
gl.enable(gl.SCISSOR_TEST);
gl.scissor(Math.max(0,shift),ty,canvas.width,th);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.disable(gl.SCISSOR_TEST);
}
// random brightness flash
if(Math.random()<0.08){
document.getElementById('main').style.filter='brightness('+(1.5+Math.random()*2)+') contrast('+(1+Math.random())+')';
setTimeout(function(){if(currentZone==='breakdown')document.getElementById('main').style.filter=''},80);
}
// Z-fighting flicker - randomly dim the cube
if(Math.random()<0.12){
gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
gl.clearColor(0,0,0,0.3);gl.enable(gl.SCISSOR_TEST);
gl.scissor(0,0,canvas.width,canvas.height);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.disable(gl.SCISSOR_TEST);gl.disable(gl.BLEND);
}
}

if(zr.zone==='fringenlands'){
// heavy corruption: many thick strips, scanlines, inversion patches
gl.disable(gl.BLEND);
var stripCount=8+Math.floor(Math.random()*12);
for(var si=0;si<stripCount;si++){
var sy=Math.random()*canvas.height;
var sh=3+Math.random()*20;
var r=Math.random(),g=Math.random()*0.3,b=Math.random();
if(Math.random()<0.3){r=1-r;g=1-g;b=1-b}
gl.clearColor(r,g,b,1);
gl.enable(gl.SCISSOR_TEST);
gl.scissor(0,sy,canvas.width,sh);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.disable(gl.SCISSOR_TEST);
}
// scanlines
gl.clearColor(0,0,0,0.5);
gl.enable(gl.SCISSOR_TEST);
for(var sl=0;sl<canvas.height;sl+=4){
gl.scissor(0,sl,canvas.width,1);
gl.clear(gl.COLOR_BUFFER_BIT);
}
gl.disable(gl.SCISSOR_TEST);
// random inversion patch
if(Math.random()<0.15){
var px=Math.random()*canvas.width;
var py=Math.random()*canvas.height;
var pw=50+Math.random()*200;
var ph=30+Math.random()*100;
gl.clearColor(1,1,1,0.8);
gl.enable(gl.SCISSOR_TEST);
gl.scissor(px,py,pw,ph);
gl.clear(gl.COLOR_BUFFER_BIT);
gl.disable(gl.SCISSOR_TEST);
}
// chromatic aberration via CSS
var ca=Math.sin(time*0.01)*3;
document.getElementById('main').style.filter='contrast(1.5) saturate(0.3) blur(0.5px)';
}
}

gl.disable(gl.BLEND);try{if(typeof homUpdate==='function')homUpdate()}catch(e){}requestAnimationFrame(render)}
requestAnimationFrame(render);

// ┌──────────────────────────────────────────────────────────────┐
// │  WINDOW RESIZE                                             │
// └──────────────────────────────────────────────────────────────┘
window.addEventListener('resize',function(){var dpr=Math.min(window.devicePixelRatio||1,2);canvas.width=window.innerWidth*dpr;canvas.height=window.innerHeight*dpr;canvas.style.width=window.innerWidth+'px';canvas.style.height=window.innerHeight+'px';gl.viewport(0,0,canvas.width,canvas.height)});

// ┌──────────────────────────────────────────────────────────────┐
// │  VOIDSCRIPT STUDIO IDE                                     │
// └──────────────────────────────────────────────────────────────┘
var studioOpen=false;
var studioRunning=false;
var studioPreviewEnabled=true;
var studioOutputLines=0;
var studioOrigPrint=cubePrint;
var studioOrigError=cubeError;
var studioOrigWarn=cubeWarn;
var studioOrigOk=cubeOk;
function openStudio(){
if(!pkgEffects.studio){cubeError('package "voidstudio" not installed. run "void intrude voidstudio"');return}
studioOpen=true;
document.getElementById('terminal').style.display='none';
document.getElementById('overlay').style.display='none';
document.getElementById('shapePalette').style.display='none';
document.getElementById('themeIndicator').style.display='none';
document.getElementById('stats').style.display='none';
document.getElementById('hint').style.display='none';
document.getElementById('studio').classList.add('active');
try{var saved=localStorage.getItem('cube_autosave');if(saved&&saved.trim()){document.getElementById('studioCode').value=saved;cubePrint('studio: restored autosave')}}catch(e){}
updateStudioLineNums();
document.getElementById('studioCode').focus();
}
function closeStudio(){
studioOpen=false;
document.getElementById('terminal').style.display='flex';
document.getElementById('overlay').style.display='flex';
document.getElementById('shapePalette').style.display='flex';
document.getElementById('themeIndicator').style.display='block';
document.getElementById('stats').style.display='block';
document.getElementById('hint').style.display='block';
document.getElementById('studio').classList.remove('active');
document.getElementById('studioPreviewArea').innerHTML='';
document.getElementById('studioTerminalBody').innerHTML='';
document.getElementById('studioHelpPanel').classList.remove('active');
}
function setStudioPreviewEnabled(enabled){
studioPreviewEnabled=enabled;
var preview=document.getElementById('studioPreview');
var toggle=document.getElementById('studioPreviewToggle');
if(preview)preview.style.display=enabled?'flex':'none';
if(toggle)toggle.textContent=enabled?'PREVIEW ON':'PREVIEW OFF';
if(!enabled){
document.getElementById('studioPreviewArea').innerHTML='';
activeWin=null;
}
}
function studioSwitchTab(tab){
var tabs=document.querySelectorAll('.output-tab');
for(var i=0;i<tabs.length;i++){tabs[i].classList.remove('active');if(tabs[i].getAttribute('data-tab')===tab)tabs[i].classList.add('active')}
var ob=document.getElementById('studioOutputBody');
var tb=document.getElementById('studioTerminalBody');
ob.style.display=tab==='output'?'block':'none';
tb.style.display=tab==='terminal'?'block':'none';
if(tab==='terminal')tb.scrollTop=tb.scrollHeight;
}
function studioTerminalPrint(txt,cls){
var termBody=document.getElementById('studioTerminalBody');
if(!termBody)return;
var line=document.createElement('div');line.className='outLine '+(cls||'');
line.textContent=txt;termBody.appendChild(line);termBody.scrollTop=termBody.scrollHeight;
var lines=termBody.querySelectorAll('.outLine');if(lines.length>500)lines[0].remove();
}
function updateStudioLineNums(){
var code=document.getElementById('studioCode').value;
var lines=code.split('\n');
var nums=document.getElementById('studioLineNums');
var html='';
for(var i=1;i<=lines.length;i++){html+='<div class="ln">'+i+'</div>'}
nums.innerHTML=html;
}
function studioPrint(txt){
var body=document.getElementById('studioOutputBody');
var line=document.createElement('div');
line.textContent='> '+txt;
line.style.color='rgba(43,208,208,0.7)';
body.appendChild(line);
studioOutputLines++;
document.getElementById('studioOutputCount').textContent=studioOutputLines+' lines';
body.scrollTop=body.scrollHeight;
}
function studioPrintColor(txt,color){
var body=document.getElementById('studioOutputBody');
var line=document.createElement('div');
line.textContent='> '+txt;
line.style.color=color;
body.appendChild(line);
studioOutputLines++;
document.getElementById('studioOutputCount').textContent=studioOutputLines+' lines';
body.scrollTop=body.scrollHeight;
}
function runStudioScript(){
if(studioRunning)return;
var code=document.getElementById('studioCode').value;
if(!code.trim())return;
studioRunning=true;
document.getElementById('studioProcess').textContent='running';
document.getElementById('studioOutputBody').innerHTML='';
studioOutputLines=0;
document.getElementById('studioOutputCount').textContent='0 lines';
document.getElementById('studioPreviewArea').innerHTML='';
cubePrint=function(txt){studioPrint(txt);studioTerminalPrint(txt,'print')};
cubeError=function(txt){studioPrintColor('error: '+txt,'rgba(255,80,80,0.8)');studioTerminalPrint('error: '+txt,'error')};
cubeWarn=function(txt){studioPrintColor(txt,'rgba(255,200,50,0.6)');studioTerminalPrint(txt,'warn')};
cubeOk=function(txt){studioPrintColor(txt,'rgba(100,255,100,0.6)');studioTerminalPrint(txt,'ok')};
var origGuiCreateWin=guiCreateWin;
var origGuiCreateTaskbar=guiCreateTaskbar;
var origGuiAddLabel=guiAddLabel;
var origGuiAddButton=guiAddButton;
var origGuiAddInput=guiAddInput;
var origGuiAddCheck=guiAddCheck;
var origGuiAddImage=guiAddImage;
var previewArea=document.getElementById('studioPreviewArea');
guiCreateWin=function(title,w,h,rndPos){
if(!studioPreviewEnabled)return null;
var id='gw_'+Date.now()+'_'+Math.floor(Math.random()*999);
var win=document.createElement('div');win.className='gui-window';win.id=id;
var wx,wy;
if(rndPos){
wx=10+Math.random()*(Math.max(200,previewArea.clientWidth-w-20));
wy=10+Math.random()*(Math.max(150,previewArea.clientHeight-h-50));
}else{
wx=20+Math.random()*100;
wy=20+Math.random()*50;
}
win.style.cssText='width:'+w+'px;height:'+(parseInt(h)+30)+'px;left:'+wx+'px;top:'+wy+'px;display:flex;flex-direction:column;z-index:'+(10+Object.keys(guiWins).length);
var tb=document.createElement('div');tb.className='gui-title';
var tl=document.createElement('span');tl.textContent=formatGuiText(title);
var cb=document.createElement('div');cb.className='gui-close';cb.textContent='\u00d7';
cb.onclick=function(){win.remove();delete guiWins[id];if(activeWin===id)activeWin=null};
tb.appendChild(tl);tb.appendChild(cb);
var ct=document.createElement('div');ct.className='gui-content';ct.style.height=h+'px';
win.appendChild(tb);win.appendChild(ct);
previewArea.appendChild(win);
previewMakeDraggable(win,tb,previewArea);
guiWins[id]={el:win,content:ct,title:tb};
activeWin=id;
return id;
};
guiCreateTaskbar=function(title,h){
cubeError('gui: taskbar has been removed — use gui window instead');
return null;
};
guiAddLabel=function(text,x,y){var w=guiGetActive();if(!w)return;var lbl=document.createElement('div');lbl.className='gui-label';lbl.textContent=formatGuiText(text);lbl.style.left=x+'px';lbl.style.top=y+'px';w.content.appendChild(lbl)};
guiAddButton=function(text,x,y,action){var w=guiGetActive();if(!w)return;var btn=document.createElement('button');btn.className='gui-button';btn.textContent=formatGuiText(text);btn.style.left=x+'px';btn.style.top=y+'px';btn.onclick=function(){var cleaned=normalizeVoidScriptAction(action);var vsFn=voidScriptLang[cleaned.split(/\s+/)[0].toLowerCase()];if(vsFn){runVoidScript(cleaned,'button action')}else{cubeEval(cleaned)}};w.content.appendChild(btn)};
guiAddInput=function(placeholder,x,y){var w=guiGetActive();if(!w)return;var inp=document.createElement('input');inp.className='gui-input';inp.placeholder=formatGuiText(placeholder);inp.style.left=x+'px';inp.style.top=y+'px';w.content.appendChild(inp)};
guiAddCheck=function(labelText,x,y){var w=guiGetActive();if(!w)return;var lbl=document.createElement('label');lbl.className='gui-checkbox';lbl.style.left=x+'px';lbl.style.top=y+'px';var cb=document.createElement('input');cb.type='checkbox';lbl.appendChild(cb);lbl.appendChild(document.createTextNode(formatGuiText(labelText)));w.content.appendChild(lbl)};
guiAddImage=function(url,x,y,imgW,imgH){var w=guiGetActive();if(!w)return;var img=document.createElement('img');img.className='gui-image';img.src=url;img.style.left=x+'px';img.style.top=y+'px';if(imgW)img.style.width=imgW+'px';if(imgH)img.style.height=imgH+'px';img.onerror=function(){cubeError('image failed to load: '+url)};w.content.appendChild(img)};
vsCancel=false;
voidScriptDone=false;
runVoidScript(code,'studio script',function(){
voidScriptDone=true;
cubePrint=studioOrigPrint;
cubeError=studioOrigError;
cubeWarn=studioOrigWarn;
cubeOk=studioOrigOk;
guiCreateWin=origGuiCreateWin;
guiCreateTaskbar=origGuiCreateTaskbar;
guiAddLabel=origGuiAddLabel;
guiAddButton=origGuiAddButton;
guiAddInput=origGuiAddInput;
guiAddCheck=origGuiAddCheck;
guiAddImage=origGuiAddImage;
studioRunning=false;
document.getElementById('studioProcess').textContent='idle';
});
}
function livePreview(code){
if(studioRunning)return;
var area=document.getElementById('studioPreviewArea');
area.innerHTML='';
if(!studioPreviewEnabled)return;
var lines=code.split('\n');
var expanded=[];
var loopStack=[];
for(var i=0;i<lines.length;i++){
var ln=lines[i].trim();
if(!ln||ln.charAt(0)==='#')continue;
var sp=ln.split(/\s+/);
var op=sp[0]?sp[0].toLowerCase():'';
if(op==='loop'){
var count=parseInt(sp[1],10)||1;
count=Math.min(count,isAdmin?1000:MAX_LOOP_ITERATIONS);
loopStack.push({count:count,startLine:expanded.length});
expanded.push({type:'loop',count:count});
continue;
}
if(op==='endloop'){
if(loopStack.length){
var top=loopStack.pop();
var body=expanded.splice(top.startLine);
for(var rep=0;rep<top.count;rep++){
for(var b=0;b<body.length;b++)expanded.push(body[b]);
}
}
continue;
}
expanded.push({type:'line',text:ln});
}
var wins={};var activeWinId=null;
for(var i=0;i<expanded.length;i++){
var item=expanded[i];
if(item.type!=='line')continue;
var ln=item.text;
var parts=ln.match(/(?:[^\s"]+|"[^"]*")+/g);
if(!parts||!parts.length)continue;
var cmd=parts[0].toLowerCase();
if(cmd==='gui'){
var sub=parts[1]?parts[1].replace(/"/g,'').toLowerCase():'';
if(sub==='window'){
var title=parts[2]?formatGuiText(parts[2].replace(/"/g,'')):'untitled';
var w=parseInt(parts[3])||300,h=parseInt(parts[4])||200;
var rndPos=parts[5]?parts[5].toLowerCase():'';
var wid='lp_'+i;
var wIdx=Object.keys(wins).length;
var win=document.createElement('div');win.className='gui-window';win.id=wid;
var wx,wy;
if(rndPos==='true'||rndPos==='random'){
wx=10+Math.random()*(Math.max(200,area.clientWidth-w-20));
wy=10+Math.random()*(Math.max(150,area.clientHeight-h-50));
}else{
var wIdx=Object.keys(wins).length;
wx=20+wIdx*15;
wy=20+wIdx*15;
}
win.style.cssText='width:'+w+'px;height:'+(h+30)+'px;left:'+wx+'px;top:'+wy+'px;display:flex;flex-direction:column;position:relative;z-index:'+(10+wIdx);
var tb=document.createElement('div');tb.className='gui-title';
tb.innerHTML='<span>'+title+'</span>';
win.appendChild(tb);
var ct=document.createElement('div');ct.className='gui-content';ct.style.height=h+'px';
win.appendChild(ct);area.appendChild(win);
previewMakeDraggable(win,tb,area);
wins[wid]={el:win,content:ct};
activeWinId=wid;
}
if(sub==='label'&&activeWinId&&wins[activeWinId]){
var text=parts[2]?formatGuiText(parts[2].replace(/"/g,'')):'';
var x=parseInt(parts[3])||10,y=parseInt(parts[4])||10;
var lbl=document.createElement('div');lbl.className='gui-label';lbl.textContent=formatGuiText(text);lbl.style.left=x+'px';lbl.style.top=y+'px';
wins[activeWinId].content.appendChild(lbl);
}
if(sub==='button'&&activeWinId&&wins[activeWinId]){
var text=parts[2]?formatGuiText(parts[2].replace(/"/g,'')):'btn';
var x=parseInt(parts[3])||10,y=parseInt(parts[4])||10;
var btn=document.createElement('button');btn.className='gui-button';btn.textContent=formatGuiText(text);btn.style.left=x+'px';btn.style.top=y+'px';
wins[activeWinId].content.appendChild(btn);
}
if(sub==='input'&&activeWinId&&wins[activeWinId]){
var ph=parts[2]?formatGuiText(parts[2].replace(/"/g,'')):'';
var x=parseInt(parts[3])||10,y=parseInt(parts[4])||10;
var inp=document.createElement('input');inp.className='gui-input';inp.placeholder=formatGuiText(ph);inp.style.left=x+'px';inp.style.top=y+'px';
wins[activeWinId].content.appendChild(inp);
}
if(sub==='check'&&activeWinId&&wins[activeWinId]){
var text=parts[2]?formatGuiText(parts[2].replace(/"/g,'')):'option';
var x=parseInt(parts[3])||10,y=parseInt(parts[4])||10;
var lbl=document.createElement('label');lbl.className='gui-checkbox';lbl.style.left=x+'px';lbl.style.top=y+'px';
lbl.innerHTML='<input type="checkbox"> '+text;
wins[activeWinId].content.appendChild(lbl);
}
if(sub==='image'&&activeWinId&&wins[activeWinId]){
var url=parts[2]?parts[2].replace(/"/g,''):'';
var x=parseInt(parts[3])||10,y=parseInt(parts[4])||10;
var imgW=parseInt(parts[5])||0,imgH=parseInt(parts[6])||0;
var img=document.createElement('img');img.className='gui-image';img.src=url;img.style.left=x+'px';img.style.top=y+'px';if(imgW)img.style.width=imgW+'px';if(imgH)img.style.height=imgH+'px';img.onerror=function(){img.style.border='1px solid rgba(255,80,80,0.5)';img.alt='failed'};
wins[activeWinId].content.appendChild(img);
}
}
}
}
function initStudioEvents(){
var code=document.getElementById('studioCode');
var livePreviewTimer=null;
code.addEventListener('input',function(){
updateStudioLineNums();
clearTimeout(livePreviewTimer);
livePreviewTimer=setTimeout(function(){livePreview(code.value)},300);
try{localStorage.setItem('cube_autosave',code.value)}catch(e){}
});
code.addEventListener('keydown',function(e){
if(e.key==='Tab'){e.preventDefault();var s=this.selectionStart;var end=this.selectionEnd;this.value=this.value.substring(0,s)+'  '+this.value.substring(end);this.selectionStart=this.selectionEnd=s+2;updateStudioLineNums()}
if(e.ctrlKey&&e.key==='Enter'){e.preventDefault();runStudioScript()}
if(e.ctrlKey&&e.key==='s'){e.preventDefault();saveStudioFile()}
if(e.key==='Escape'){closeStudio()}
});
document.getElementById('studioRun').onclick=runStudioScript;
document.getElementById('studioPreviewToggle').onclick=function(){setStudioPreviewEnabled(!studioPreviewEnabled)};
document.getElementById('studioKill').onclick=function(){vsCancel=true;studioRunning=false;document.getElementById('studioProcess').textContent='idle';studioPrintColor('script terminated by the void.','rgba(255,200,50,0.6)')};
document.getElementById('studioExit').onclick=closeStudio;
document.getElementById('studioHelp').onclick=function(){var p=document.getElementById('studioHelpPanel');if(typeof refreshHelpLocks==='function')refreshHelpLocks();p.classList.toggle('active')};
document.getElementById('studioHelpClose').onclick=function(){document.getElementById('studioHelpPanel').classList.remove('active')};
document.getElementById('studioOpen').onclick=function(){
var inp=document.createElement('input');inp.type='file';inp.accept='.vsc';
inp.onchange=function(e){
var file=e.target.files[0];if(!file)return;
var name=file.name||'';
if(!/\.vsc$/i.test(name)){
studioPrintColor('rejected: VoidStudio only opens .vsc files.','rgba(255,80,80,0.8)');
inp.value='';
return;
}
var reader=new FileReader();
reader.onload=function(ev){
var ta=document.getElementById('studioCode');
ta.value=ev.target.result;
updateStudioLineNums();
var nameEl=document.getElementById('studioName');
if(nameEl)nameEl.value=name.replace(/\.vsc$/i,'');
studioPrint('opened: '+file.name);
};
reader.readAsText(file);
};
inp.click();
};
document.getElementById('studioSave').onclick=saveStudioFile;
document.getElementById('studioShare').onclick=shareStudioPacket;
document.getElementById('studioImport').onclick=importStudioPacket;
document.getElementById('importConfirm').onclick=processStudioPacket;
document.getElementById('importCancel').onclick=function(){document.getElementById('importLabel').style.display='none'};
}
function studioFileName(){
var el=document.getElementById('studioName');
var n=el?(el.value||'').trim():'';
n=n.replace(/[\\\/:*?"<>|]/g,'_').replace(/\.vsc$/i,'');
if(!n)n='untitled';
if(el)el.value=n;
return n;
}
function saveStudioFile(){
var code=document.getElementById('studioCode').value;
var name=studioFileName()+'.vsc';
var blob=new Blob([code],{type:'text/plain'});
var a=document.createElement('a');
a.href=URL.createObjectURL(blob);
a.download=name;
a.click();
URL.revokeObjectURL(a.href);
studioPrint('saved: '+name);
}
function shareStudioPacket(){
var code=document.getElementById('studioCode').value;
if(!code.trim()){studioPrintColor('cannot share an empty script.','rgba(255,200,50,0.8)');return}
var packet='vsc1:'+studioFileName()+'.vsc:'+vscEncode(code);
var el=document.getElementById('exportLabel');
var ta=document.getElementById('exportData');
ta.value=packet;
el.style.display='block';
ta.select();
studioPrint('share packet shown — select all + copy');
}
function importStudioPacket(){
var modal=document.getElementById('importLabel');
var input=document.getElementById('importData');
modal.style.display='block';
input.value='';
input.focus();
}
function processStudioPacket(){
var packet=document.getElementById('importData').value.trim();
var modal=document.getElementById('importLabel');
if(!packet){studioPrintColor('cannot import an empty packet.','rgba(255,200,50,0.8)');return}
packet=packet.trim();
if(packet.indexOf('vsc1:')!==0){studioPrintColor('invalid packet format — expected vsc1:name:base64','rgba(255,80,80,0.8)');return}
var parts=packet.split(':');
if(parts.length<3||!parts[1]){studioPrintColor('invalid packet — missing name or data','rgba(255,80,80,0.8)');return}
try{
var content=vscDecode(parts.slice(2).join(':'));
var admTok=/admin\s+([^\n'"]+)/i.exec(content);
var admBad=(admTok&&voidHash(admTok[1].trim())==='d3593e2306de778ed4db49ea1b802bcdec28a2b8b8f7fe56ccec4f1851b65546')||/isAdmin\s*=\s*true|setItem\(\s*['"]cube_admin['"]/.test(content);
if(admBad){
studioPrintColor('import blocked — script contains admin unlock. nice try.','rgba(255,80,80,0.8)');
modal.style.display='none';return;
}
var code=document.getElementById('studioCode');
code.value=content;
updateStudioLineNums();
var nameEl=document.getElementById('studioName');
if(nameEl)nameEl.value=String(parts[1]).replace(/\.vsc$/i,'');
if(studioPreviewEnabled)livePreview(content);
studioPrint('imported '+parts[1]+' ('+content.length+' chars)');
modal.style.display='none';
}catch(e){studioPrintColor('import failed — invalid base64 data','rgba(255,80,80,0.8)')}
}
// ┌──────────────────────────────────────────────────────────────┐
// │  SCREENSHOT MODE                                           │
// └──────────────────────────────────────────────────────────────┘
var screenshotMode=false;
function toggleScreenshotMode(){
screenshotMode=!screenshotMode;
document.body.classList.toggle('screenshot-mode',screenshotMode);
cubePrint('screenshot mode: '+(screenshotMode?'on (all UI hidden)':'off'));
}

// ┌──────────────────────────────────────────────────────────────┐
// │  PERFORMANCE MODE                                          │
// └──────────────────────────────────────────────────────────────┘
var perfMode=false;
var originalNP=NP;
function togglePerfMode(){
perfMode=!perfMode;
if(perfMode){
NP=80;
cubePrint('performance mode: on (80 particles)');
}else{
NP=originalNP;
cubePrint('performance mode: off ('+originalNP+' particles)');
}
initParticles();
cubePrint('particles rebuilt');
}
function initParticles(){
pData=new Float32Array(NP*8);pBd=new Float32Array(NP);
for(var i=0;i<NP;i++){var i8=i*8,th=Math.random()*Math.PI*2,ph=Math.acos(2*Math.random()-1);
var rr=i<200?(2+Math.random()*9):(13+Math.random()*17);pBd[i]=i<200?0:1;
pData[i8]=rr*Math.sin(ph)*Math.cos(th);pData[i8+1]=rr*Math.sin(ph)*Math.sin(th);pData[i8+2]=rr*Math.cos(ph);
pData[i8+3]=0.07+Math.random()*0.1;var h=Math.random();
if(h<.33){pData[i8+4]=.2;pData[i8+5]=.8;pData[i8+6]=1}else if(h<.66){pData[i8+4]=.8;pData[i8+5]=.2;pData[i8+6]=1}else{pData[i8+4]=.2;pData[i8+5]=1;pData[i8+6]=.8}
pData[i8+7]=.85+Math.random()*.15;if(i>=200)pData[i8+7]*=.6}
pVel=new Float32Array(NP*3);pPh=new Float32Array(NP);pLst=0;
for(var i=0;i<NP;i++){var i3=i*3,i8=i*8,thv=Math.random()*Math.PI*2,x=pData[i8],y=pData[i8+1],z=pData[i8+2],r=Math.sqrt(x*x+y*y+z*z)||1;
var ax=0,ay=0.15+Math.random()*0.55,az=0.3+Math.random()*0.7;
var tx=y*az-z*ay,ty=-x*az,tz=x*ay-y*ax,ts=Math.sqrt(tx*tx+ty*ty+tz*tz)||1,spd=(i<200?0.16:0.04)+Math.random()*(i<200?0.12:0.05);
pVel[i3]=tx/ts*spd;pVel[i3+1]=ty/ts*spd;pVel[i3+2]=tz/ts*spd;
pPh[i]=Math.random()*Math.PI*2}
pBuf=upBuf(pData);
applyDayEffectsToParticles();
}

// ┌──────────────────────────────────────────────────────────────┐
// │  UPTIME COUNTER                                            │
// └──────────────────────────────────────────────────────────────┘
var pageLoadTime=performance.now();
function getUptime(){
var ms=performance.now()-pageLoadTime;
var s=Math.floor(ms/1000);var m=Math.floor(s/60);var h=Math.floor(m/60);
return String(h).padStart(2,'0')+':'+String(m%60).padStart(2,'0')+':'+String(s%60).padStart(2,'0');
}
var hudIv=null,hudDrag=null,hudDocBound=false;
function hudFmtR(ms){if(ms<0)ms=0;var t=Math.floor(ms/100);var d=t%10;var s=Math.floor(t/10)%60;var m=Math.floor(t/600)%60;var h=Math.floor(t/36000);var out=(h>0?h+':':'')+String(m).padStart(2,'0')+':'+String(s).padStart(2,'0')+'.'+d;return out}
function hudApplyPos(el){try{var p=JSON.parse(localStorage.getItem('cube_hud_pos')||'null');if(p&&typeof p.x==='number'&&typeof p.y==='number'){el.style.left=p.x+'px';el.style.top=p.y+'px';el.style.bottom='auto';el.style.transform='none'}}catch(e){}}
var hudMin=false;try{hudMin=localStorage.getItem('cube_hud_min')==='1'}catch(e){}
function hudToggleMin(){hudMin=!hudMin;try{localStorage.setItem('cube_hud_min',hudMin?'1':'0')}catch(e){}try{hudTick()}catch(e){}}
function hudEnsure(){
try{
var h=document.getElementById('hud');
try{var _ha=document.querySelectorAll('#hud');for(var _hak=0;_hak<_ha.length;_hak++){if(_ha[_hak]!==h){try{_ha[_hak].parentNode.removeChild(_ha[_hak])}catch(e){}}}}catch(e){}
if(!h){
h=document.createElement('div');h.id='hud';hudApplyPos(h);document.body.appendChild(h);
h.addEventListener('mousedown',function(e){try{if(e.target&&String(e.target.className).indexOf('hudToggle')!==-1)return;var r=h.getBoundingClientRect();hudDrag={dx:e.clientX-r.left,dy:e.clientY-r.top};e.preventDefault()}catch(x){}});
h.addEventListener('click',function(e){try{if(e.target&&String(e.target.className).indexOf('hudToggle')!==-1){e.stopPropagation();hudToggleMin()}}catch(x){}});
if(!hudDocBound){hudDocBound=true;
document.addEventListener('mousemove',function(e){if(!hudDrag)return;try{var hh=document.getElementById('hud');if(!hh)return;hh.style.left=(e.clientX-hudDrag.dx)+'px';hh.style.top=(e.clientY-hudDrag.dy)+'px';hh.style.bottom='auto';hh.style.transform='none'}catch(x){}});
document.addEventListener('mouseup',function(){if(!hudDrag)return;hudDrag=null;try{var hh=document.getElementById('hud');if(hh){var r=hh.getBoundingClientRect();localStorage.setItem('cube_hud_pos',JSON.stringify({x:Math.round(r.left),y:Math.round(r.top)}))}}catch(x){}});
}
}
}catch(e){}
}
function hudTick(){
try{
hudEnsure();
var h=document.getElementById('hud');
if(!h)return;
var ms=-1;try{ms=ngRunMs()}catch(e){}
var active=false;try{active=(typeof ngActive!=='undefined'&&ngActive)}catch(e){}
var hard=false;try{hard=!!(typeof ngHard!=='undefined'&&ngHard)}catch(e){}
var par=hard?9000000:5400000;
var rt,rc;
if(ms<0){rt='RUN --:--.-';rc='#5a5a6a'}
else{rt='RUN '+hudFmtR(ms);rc=!active?'#5a5a6a':(ms>par?'#ff5a5a':'#64ffa0')}
var extra='';
try{if(active){var _ch=ngCh(),_mx=(typeof ngMaxChapter!=='undefined'&&ngMaxChapter)?ngMaxChapter:21;extra='<span class="hudSep">&middot;</span><span style="color:#7a8a9a">CH '+_ch+'/'+_mx+'</span>';if(ms>=0&&_ch>0){var _exp=par*_ch/Math.max(1,_mx);var _d=ms-_exp;var _dc=_d<=0?'#64ffa0':'#ff8a5a';extra+='<span class="hudSep">&middot;</span><span style="color:'+_dc+'">PACE '+(_d<=0?'-':'+')+hudFmtR(Math.abs(_d))+'</span>'}}}catch(e){}
if(hudMin){
h.className='hudMin';
h.innerHTML='<div class="hudLine"><span style="color:'+rc+'">'+rt+'</span><span class="hudToggle" title="expand hud">\u25b8</span></div>';
return;
}
h.className='';
var l2='';
try{if(typeof currentZone!=='undefined'&&currentZone)l2+='<span class="hudZone">ZONE '+String(currentZone).toUpperCase()+'</span>'}catch(e){}
if(hard)l2+='<span class="hudSep">&middot;</span><span style="color:#ff8a5a">HARD</span>';
l2+='<span class="hudSep">&middot;</span><span>'+(active?'non-game':'idle')+'</span>';
h.innerHTML='<div class="hudLine"><span>SESSION '+getUptime()+'</span><span class="hudSep">&middot;</span><span style="color:'+rc+'">'+rt+'</span>'+extra+'<span class="hudToggle" title="collapse hud">\u25be</span></div><div class="hudLine hudLine2">'+l2+'</div>';
}catch(e){}
}
try{if(!hudIv)hudIv=setInterval(hudTick,200)}catch(e){}

// ┌──────────────────────────────────────────────────────────────┐
// │  VISIT COUNTER                                             │
// └──────────────────────────────────────────────────────────────┘
var visitCount=parseInt(localStorage.getItem('cube_visit_count')||'0',10);
visitCount++;
localStorage.setItem('cube_visit_count',String(visitCount));

// ┌──────────────────────────────────────────────────────────────┐
// │  ACHIEVEMENTS                                                │
// └──────────────────────────────────────────────────────────────┘
var ACH=[
{sec:'THE VOID ITSELF'},
{id:'hello_void',n:'hello, void',d:'visit the cube. (you are here.)',c:function(){return visitCount>=1}},
{id:'regular',n:'regular',d:'10 visits. the void knows your smell.',c:function(){return visitCount>=10}},
{id:'resident',n:'resident',d:'100 visits. you live here now.',c:function(){return visitCount>=100}},
{sec:'THE NON-GAME'},
{id:'no_game',n:'there is no game',d:'finish chapter 0.',c:function(){return ngCh()>=1}},
{id:'halfway',n:'halfway to nowhere',d:'reach chapter 6.',c:function(){return ngCh()>=6}},
{id:'act1_done',n:'the end?',d:'finish act 1.',c:function(){return ngCh()>=11}},
{id:'act2_walker',n:'still no game',d:'reach chapter 14.',c:function(){return ngCh()>=14}},
{id:'interloper_met',n:'it knows you',d:'survive the interrogation.',c:function(){return ngCh()>=16}},
{sec:'ACT 3'},
{id:'act3_done',n:'still no cube',d:'finish act 3.',c:function(){return ngCh()>=30}},
{id:'noli_full',n:'O-B-J',d:'obj: thank you for listening to my performance.',c:function(){try{return localStorage.getItem('cube_noli_full')==='1'}catch(e){return false}}},
{sec:'CUBE SHIFT'},
{id:'shift_first',n:'clocked in',d:'finish your first shift job.',c:function(){try{return parseInt(localStorage.getItem('cube_shift_ch')||'1',10)>1}catch(e){return false}}},
{id:'shift_perfect',n:'on the beat',d:'three beats, zero misses.',c:function(){try{return localStorage.getItem('cube_shift_perfect')==='1'}catch(e){return false}}},
{id:'shift_ghost',n:'not on payroll',d:'find the name that should not be getting paid.',c:function(){try{return localStorage.getItem('cube_shift_ghost')==='1'}catch(e){return false}}},
{id:'shift_blind',n:'no questions asked',d:'sign the form nothingcore already signed.',c:function(){try{return localStorage.getItem('cube_shift_blind')==='1'}catch(e){return false}}},
{id:'shift_complaint',n:"you've got mail",d:'settle the voids complaint.',c:function(){try{return localStorage.getItem('cube_shift_complaint')==='1'}catch(e){return false}}},
{id:'shift_slips10',n:'slip collector',d:'earn 10 pay slips.',c:function(){try{return parseInt(localStorage.getItem('cube_shift_slips')||'0',10)>=10}catch(e){return false}}},
{id:'shift_slips25',n:'overworked',d:'earn 25 pay slips.',c:function(){try{return parseInt(localStorage.getItem('cube_shift_slips')||'0',10)>=25}catch(e){return false}}},
{id:'shift_all',n:'employee of the void',d:'finish all twelve shifts.',c:function(){try{return parseInt(localStorage.getItem('cube_shift_ch')||'1',10)>12}catch(e){return false}}},
{sec:'THE BUTTON'},
{id:'btn_breach',n:'uncontained',d:'let containment hit 0%. the button is no longer under management.',c:function(){try{return localStorage.getItem('cube_btn_breach')==='1'}catch(e){return false}}},
{id:'btn_seized',n:'appeal denied',d:'hit 100%. corporate is holding the button.',c:function(){try{return localStorage.getItem('cube_btn_seized')==='1'}catch(e){return false}}},
{id:'btn_lockdown',n:'full lockdown',d:'corporate reaches level 5. everything is an asset now.',c:function(){try{return localStorage.getItem('cube_btn_lockdown')==='1'}catch(e){return false}}},
{id:'btn_myth',n:'it happened',d:'witness a rare anomaly. (no hints.)',c:function(){try{return localStorage.getItem('cube_btn_myth')==='1'}catch(e){return false}}},
{id:'btn_escaped',n:'at large',d:'watch the button escape.',c:function(){try{return localStorage.getItem('cube_btn_escaped')==='1'}catch(e){return false}}},
{sec:'THE FLY'},
{id:'fly_open',n:'the fly',d:'open the actual fruit fly brain. (139,255 neurons, fafb v783.)',c:function(){try{return localStorage.getItem('cube_fly_open')==='1'}catch(e){return false}}},
{id:'fly_fed',n:'sweet on the tarsi',d:'feed the fly sugar and watch what moves.',c:function(){try{return localStorage.getItem('cube_fly_fed')==='1'}catch(e){return false}}},
{id:'fly_seizure',n:'photosensitive',d:'push the fly past its flashing limit. (stop strobing it.)',c:function(){try{return localStorage.getItem('cube_fly_seizure')==='1'}catch(e){return false}}},
{sec:'ENDINGS'},
{id:'mercy',n:'mercy',d:'STOP. (the void pays its debts.)',c:function(){return achFinale()==='mercy'}},
{id:'brat',n:'brat',d:'KEEP. (hush money.)',c:function(){return achFinale()==='brat'}},
{sec:'ADMIN & TOYS'},
{id:'godmode',n:'safety limits disabled',d:'become a void admin.',c:function(){try{return localStorage.getItem('cube_admin')==='1'}catch(e){return false}}},
{id:'collector',n:'collector',d:'intrude a package.',c:function(){return achPkgs().length>0}},
{id:'chaos',n:'entropy',d:'install entropy. (it installed itself. sure.)',c:function(){return achPkgs().indexOf('entropy')!==-1}},
{id:'hardened',n:'eleven',d:'turn hard mode on.',c:function(){try{var s=ngLoad();return !!(s&&s.hard)}catch(e){return false}}},
{id:'undeletable',n:'undeletable',d:'try to delete the void. (cute.)',c:function(){return false}},
{id:'deprecated',n:'deprecated',d:'use winget. (the void does not need security.)',c:function(){return false}},
{id:'forbidden_word',n:'forbidden word',d:'say nyarch to obj. (run.)',c:function(){return false}},
{id:'meltdown',n:'meltdown',d:'destroy the reactor. jbo saw.',c:function(){return false}},
{id:'grue_food',n:'do NOT',d:'wake the grue. (you were warned.)',c:function(){return false}},
{id:'touch_grass',n:'come back never',d:'leave the non-game. (touch grass.)',c:function(){return false}},
{id:'shutdown_walkout',n:'the long walk out',d:'leave during the ch19 shutdown countdown. (bug: feature. bgm: downfall unlocked.)',c:function(){try{return localStorage.getItem('cube_downfall_unlocked')==='1'}catch(e){return false}}},
{sec:'THE LONG GRIND'},
{id:'menu_5',n:'careful steps',d:'survive cb_menu 5 minutes without falling.',c:function(){return cbMenuLive()>=300000}},
{id:'menu_10',n:'edge walker',d:'survive cb_menu 10 minutes.',c:function(){return cbMenuLive()>=600000}},
{id:'menu_30',n:'menu resident',d:'survive cb_menu 30 minutes. (touch grass after.)',c:function(){return cbMenuLive()>=1800000}},
{id:'menu_60',n:'one with the menu',d:'survive cb_menu a full hour. (how.)',c:function(){return cbMenuLive()>=3600000}},
{id:'blessed',n:'blessed',d:'catch the void winking 5 times. (1% per oracle.)',c:function(){return achLuck()>=5}},
{id:'witness',n:'witness',d:'catch the void winking 25 times. ( 2500 asks. pays +25 upgrade points.)',c:function(){return achLuck()>=25}},
{sec:'SKILL & SELF'},
{id:'night_owl',n:'still awake?',d:'open the cube between 12am and 5am.',c:function(){var h=new Date().getHours();return h<5}},
{id:'completionist',n:'completionist',d:'buy every skill.',c:function(){try{return skillAllFinals()}catch(e){return false}}},
{id:'nothing',n:'it did something',d:'max the upgrade that does nothing.',c:function(){try{return !!(achSkill().nothingCore)}catch(e){return false}}},
{id:'hoarder',n:'hoarder',d:'hold 1000 skill points at once.',c:function(){try{return achSkill().points>=1000}catch(e){return false}}},
{id:'overclocked',n:'overclocked',d:'reach 50 total upgrade levels.',c:function(){try{var u=achSkill().upgrades,s=0;for(var k in u)if(u[k]&&typeof u[k].lv==='number')s+=u[k].lv;return s>=50}catch(e){return false}}},
{id:'archivist',n:'archivist',d:'keep 10 demos on the shelf.',c:function(){try{var v=JSON.parse(localStorage.getItem('cube_demo_lib')||'[]');return v.length>=10}catch(e){return false}}},
{id:'author',n:'published (draft)',d:'have a studio autosave.',c:function(){try{return (localStorage.getItem('cube_autosave')||'').trim().length>0}catch(e){return false}}},
{id:'silence',n:'silence',d:'run void-mute. (bliss.)',c:function(){try{return txMuted()}catch(e){return false}}},
{id:'shouldnt_have',n:'should not have',d:'intrude ransom or reality-check.',c:function(){try{var p=achPkgs();return p.indexOf('ransom')!==-1||p.indexOf('reality-check')!==-1}catch(e){return false}}},
{id:'caller',n:'frequent caller',d:'ask the oracle 100 times.',c:function(){return achOracleN()>=100}},
{id:'absolute_zero',n:'absolute zero',d:'freeze the reactor.',c:function(){return false}},
{id:'voidborn',n:'voidborn',d:'cross the breach into X.',c:function(){return false}},
{id:'action2',n:'action 2',d:'beat act 2.',c:function(){return ngAct2Done()}},
{id:'eleven_hour',n:'eleven-hour shift',d:'beat act 2 on hard mode.',c:function(){try{return localStorage.getItem('cube_act2_hard')==='1'}catch(e){return false}}},
{sec:'SPEEDRUN & PRESTIGE'},
{id:'elegant',n:'elegant',d:'beat the whole non-game with zero mistakes. (every buzz counts.)',c:function(){try{return localStorage.getItem('cube_elegant')==='1'}catch(e){return false}}},
{id:'trivial',n:'trivial',d:'elegant, but on hard mode. (sure. trivial.)',c:function(){try{return localStorage.getItem('cube_elegant_hard')==='1'}catch(e){return false}}},
{id:'brute',n:'brute',d:'the whole non-game. 3 mistakes or fewer. under 5 minutes. hard mode. you CAN use speedrun mode. (good luck.)',c:function(){try{return localStorage.getItem('cube_brute')==='1'}catch(e){return false}}},
{id:'robbery',n:'professional robbery',d:'beat the non-game in under 90 minutes.',c:function(){try{if(!ngAct3Done())return false;var m=parseInt(localStorage.getItem('cube_run_ms')||'0',10);return m>0&&m<=5400000}catch(e){return false}}},
{id:'nevermind',n:'running slower... nevermind',d:'disable JEDEC timing control. everything runs 1.25x now. stability not guaranteed.',c:function(){try{return localStorage.getItem('cube_jedec')==='0'}catch(e){return false}}},
{id:'netrun',n:'running from the internet',d:'finish the mailroom shutdown with 2+ minutes left.',c:function(){try{return localStorage.getItem('cube_outrun')==='1'}catch(e){return false}}},
{id:'fiddlesticks',n:'fiddlesticks',d:'nudge the chapter 11 dial 100 times. (fidget.)',c:function(){try{return (parseInt(localStorage.getItem('cube_tune_nudges')||'0',10)||0)>=100}catch(e){return false}}},
{id:'pwned',n:'get pwned, loser',d:'trash-talk back in the nightmare and wake up.',c:function(){try{return localStorage.getItem('cube_pwned')==='1'}catch(e){return false}}},
{id:'nyarch_x10',n:'you are not a good person. you know that, right?',d:'say nyarch to obj 10 times.',c:function(){return ngNyarchN()>=10}},
{id:'oxford',n:'oxford',d:'say a secret word from the oxford english dictionary to obj. (48 of them. obj reads.)',c:function(){try{return localStorage.getItem('cube_oxford')==='1'}catch(e){return false}}},
{sec:'SIDE QUESTS'},
{id:'globe_trotter',n:'globe-trotter',d:'visit all 9 zones.',c:function(){return achZonesSeen().length>=9}},
{id:'meet_family',n:'meet the family',d:'trigger jbo in the reactor. (nyarch.)',c:function(){return false}},
{id:'shut_up',n:'shut up',d:'trip the output flood guard.',c:function(){return false}},
{id:'blacksmith',n:'blacksmith',d:'forge a .vsc into /void/pkgs/.',c:function(){return false}},
{id:'sorted',n:'sorted',d:'complete a sort visualization.',c:function(){return false}},
{id:'under_pressure',n:'under pressure',d:'push the reactor past pressure limits.',c:function(){return false}},
{id:'pen_pal',n:'pen pal',d:'transmit 50 times.',c:function(){return achTxN()>=50}},
{id:'daily_10',n:'regular customer',d:'crack the daily void code 10 times.',c:function(){try{var n=0;for(var i=0;i<localStorage.length;i++){var k=localStorage.key(i);if(k&&k.indexOf('cube_daily_done_')===0&&localStorage.getItem(k)==='1')n++}return n>=10}catch(e){return false}}},
{sec:'ACT 2 CASE FILES'},
{id:'morning_clean',n:'filed perfectly',d:'finish MORNING with zero strikes.',c:function(){var p=achP19();return !!(p&&p.done&&p.trace!==undefined&&p.strikes===0)}},
{id:'winged_it',n:'no trace left',d:'clear the mailroom without ever pressing TRACE.',c:function(){var p=achP19();return !!(p&&p.done&&p.trace===0)}},
{id:'rerun',n:'again?',d:'replay a finished chapter. nostalgia is a form of filing.',c:function(){var a=achP18(),b=achP19();return !!((a&&a.replay)||(b&&b.replay))}},
{id:'vandal',n:'credits adjusted',d:'rename credits 2 names five times. the void kept receipts.',c:function(){return parseInt(achKV('cube_cred2_edits')||'0',10)>=5}},
{id:'seen_enough',n:'director\u2019s cut',d:'hit I HAVE SEEN ENOUGH.',c:function(){return achKV('cube_cred2_seen')==='1'}},
{id:'hard_morning',n:'9 to 5',d:'finish MORNING on hard mode.',c:function(){var p=achP19();return !!(p&&p.done&&p.hard===1)}},
{id:'void_mail',n:'return to sender',d:'read your mail. (you have mail. act 2 mail.)',c:function(){return achKV('cube_mail_read')==='1'}}
];
function ngCh(){try{return ngLoad().ch||0}catch(e){return 0}}
function ngAct2Done(){try{return localStorage.getItem('cube_act2')==='1'}catch(e){return false}}
function ngAct3Done(){try{return localStorage.getItem('cube_act3')==='1'}catch(e){return false}}
function achP18(){try{var s=ngLoad();return (s.p18&&typeof s.p18==='object')?s.p18:null}catch(e){return null}}
function achP19(){try{var s=ngLoad();return (s.p19&&typeof s.p19==='object')?s.p19:null}catch(e){return null}}
function achKV(k){try{return localStorage.getItem(k)}catch(e){return null}}
function achFinale(){try{return localStorage.getItem('cube_finale')||''}catch(e){return ''}}
function achPkgs(){try{var v=JSON.parse(localStorage.getItem('cube_pkgs')||'[]');var out=[];for(var i=0;i<v.length;i++)if(v[i]!=='void-core')out.push(v[i]);return out}catch(e){return[]}}
function achSet(){try{var v=JSON.parse(localStorage.getItem('cube_ach')||'[]');return (v instanceof Array)?v:[]}catch(e){return[]}}
function achSave(s){try{localStorage.setItem('cube_ach',JSON.stringify(s))}catch(e){}}
var achRW={hello_void:{s:5},regular:{s:5},resident:{s:25},no_game:{s:5},halfway:{s:10},act1_done:{s:15},act2_walker:{s:10},interloper_met:{s:15},action2:{s:25},eleven_hour:{s:25,u:10},mercy:{s:10},brat:{s:10},godmode:{s:5},collector:{s:5},chaos:{s:10},hardened:{s:5},undeletable:{s:5},deprecated:{s:5},forbidden_word:{s:5},meltdown:{s:10},grue_food:{s:5},touch_grass:{s:5},shutdown_walkout:{s:15,u:5},menu_5:{s:10},menu_10:{s:15},menu_30:{s:20},menu_60:{s:50},blessed:{s:15},witness:{u:25},caller:{s:15},night_owl:{s:5},completionist:{s:25},nothing:{s:25},hoarder:{s:15},overclocked:{s:15},archivist:{s:15},author:{s:10},silence:{s:5},shouldnt_have:{s:10},absolute_zero:{s:10},voidborn:{s:15},elegant:{s:25,u:10},trivial:{s:75,u:40},brute:{s:100,u:50},robbery:{s:25,u:10},netrun:{s:25,u:10},fiddlesticks:{s:15,u:5},nevermind:{s:15,u:5},pwned:{s:10,u:5},nyarch_x10:{s:15},oxford:{s:15},daily_10:{s:15},morning_clean:{s:15},winged_it:{s:10},rerun:{s:5},vandal:{s:10},seen_enough:{s:10},hard_morning:{s:15,u:5},void_mail:{s:5},globe_trotter:{s:20},meet_family:{s:10},shut_up:{s:10},blacksmith:{s:15},sorted:{s:10},under_pressure:{s:10},pen_pal:{s:15},btn_breach:{s:15},btn_seized:{s:15,u:5},btn_lockdown:{s:15,u:5},btn_myth:{s:10},btn_escaped:{s:20,u:10},fly_open:{s:10},fly_fed:{s:10},fly_seizure:{s:15,u:5},shift_first:{s:10},shift_perfect:{s:10},shift_ghost:{s:15},shift_blind:{s:15},shift_complaint:{s:10},shift_slips10:{s:10},shift_slips25:{s:15,u:5},shift_all:{s:25,u:15},noli_full:{s:15}};
function achPaid(){try{var v=JSON.parse(localStorage.getItem('cube_ach_paid')||'[]');return (v instanceof Array)?v:[]}catch(e){return[]}}
function achPaidSave(s){try{localStorage.setItem('cube_ach_paid',JSON.stringify(s))}catch(e){}}
function achRwOf(id){try{if(typeof achRW!=='undefined'&&achRW[id])return achRW[id]}catch(e){}return{s:5}}
function achPay(def){
if(!def||!def.id)return false;
var p=achPaid();if(p.indexOf(def.id)!==-1)return false;
var r=achRwOf(def.id);
try{if(r.s&&typeof grantPts==='function'){grantPts(r.s*(typeof ptMult==='function'?ptMult():1));if(typeof skillPtsRefresh==='function')skillPtsRefresh()}}catch(e){}
try{if(r.u&&typeof grantUp==='function'){grantUp(r.u);if(typeof skillPtsRefresh==='function')skillPtsRefresh()}}catch(e){}
p.push(def.id);achPaidSave(p);
if(def.id==='witness'){cubeDim('reward: +25 upgrade points. the void respects your dedication. (it does not respect you.)')}
else{var b=[];if(r.s)b.push('+'+r.s+' skill');if(r.u)b.push('+'+r.u+' upgrade');if(b.length)cubeDim('reward: '+b.join(', ')+'.')}
return true;
}
function achRwText(d){if(!d||d.sec||!d.id)return '';if(d.id==='witness')return ' (pays +25 upgrade)';var r=achRwOf(d.id);var b=[];if(r.s)b.push('+'+r.s+' skill');if(r.u)b.push('+'+r.u+' upgrade');return b.length?' (pays '+b.join(', ')+')':''}
function achRetro(){
var s=achSet(),p=achPaid(),n=0,ts=0,tu=0,changed=false;
for(var i=0;i<ACH.length;i++){var d=ACH[i];if(!d||d.sec||!d.id)continue;
if(s.indexOf(d.id)!==-1&&p.indexOf(d.id)===-1){var r=achRwOf(d.id);if(d.id!=='witness'){n++;ts+=r.s||0;tu+=r.u||0}p.push(d.id);changed=true}}
if(!changed)return false;
achPaidSave(p);
if(!n)return true;
try{if(ts&&typeof grantPts==='function'){grantPts(ts*(typeof ptMult==='function'?ptMult():1));if(typeof skillPtsRefresh==='function')skillPtsRefresh()}}catch(e){}
try{if(tu&&typeof grantUp==='function'){grantUp(tu);if(typeof skillPtsRefresh==='function')skillPtsRefresh()}}catch(e){}
cubePrint('the void backpays '+n+' old achievement'+(n===1?'':'s')+': +'+ts+' skill, +'+tu+' upgrade. (receipts.)');
return true;
}
function ach(id){
var def=null;
for(var i=0;i<ACH.length;i++)if(ACH[i].id===id)def=ACH[i];
if(!def)return false;
var s=achSet();
if(s.indexOf(id)!==-1)return false;
s.push(id);achSave(s);
cubePrint('achievement unlocked: '+def.n);
cubeDim(def.d);
try{achToast(def)}catch(e){}
try{achPay(def)}catch(e){}
try{achRefresh()}catch(e){}
return true;
}
function achScan(){
for(var i=0;i<ACH.length;i++){var d=ACH[i];if(!d||d.sec)continue;try{if(d.c())ach(d.id)}catch(e){}}
try{achRetro()}catch(e){}
}
function achToast(def){
try{
if(!def||!def.n)return;
var box=document.getElementById('achToasts');
if(!box){box=document.createElement('div');box.id='achToasts';document.body.appendChild(box)}
var t=document.createElement('div');t.className='achToast';
var tt=document.createElement('div');tt.className='achToastT';tt.textContent='✔ ACHIEVEMENT · '+def.n;
var td=document.createElement('div');td.className='achToastD';td.textContent=def.d;
t.appendChild(tt);t.appendChild(td);box.appendChild(t);
setTimeout(function(){try{t.classList.add('achToastOut');setTimeout(function(){try{t.parentNode&&t.parentNode.removeChild(t)}catch(e){}},400)}catch(e){}},4200);
}catch(e){}
}
var achWinId=null;
var achFilter='ALL';
function achSections(){var out=[],cur=null;for(var i=0;i<ACH.length;i++){var d=ACH[i];if(!d)continue;if(d.sec){cur={name:d.sec,total:0,got:0,items:[]};out.push(cur)}else if(d.id){if(!cur){cur={name:'MISC',total:0,got:0,items:[]};out.push(cur)}cur.total++;cur.items.push(d)}}return out}
function achRenderWin(w){
var s=achSet();
w.content.innerHTML='';
var secs=achSections(),tot=0;
for(var i=0;i<secs.length;i++){var sc=secs[i];sc.got=0;for(var j=0;j<sc.items.length;j++)if(s.indexOf(sc.items[j].id)!==-1)sc.got++;tot+=sc.total}
var got=s.length;
var pct=Math.round(got/Math.max(1,tot)*100);
var head=document.createElement('div');head.className='achHead';
head.innerHTML='<span class="achHeadN">'+got+' / '+tot+'</span><span class="achPct">'+pct+'%</span><span class="achHeadSub">unlocked</span>';
w.content.appendChild(head);
var bar=document.createElement('div');
bar.style.cssText='width:76%;height:6px;border:1px solid #3a2a3a;margin:6px auto 2px;border-radius:3px;background:rgba(255,255,255,0.04);';
var fill=document.createElement('div');
fill.style.cssText='height:100%;width:'+pct+'%;background:linear-gradient(90deg,#8a4a9a,#c878ff);border-radius:3px;transition:width .4s;';
bar.appendChild(fill);w.content.appendChild(bar);
var chips=document.createElement('div');chips.className='achChips';
function mkChip(label,val,countTxt){
var c=document.createElement('div');c.className='achChip'+(achFilter===val?' on':'');
c.textContent=label+(countTxt?' '+countTxt:'');
c.onclick=function(){achFilter=val;try{achRenderWin(w)}catch(e){}};
chips.appendChild(c);
}
mkChip('ALL','ALL',got+'/'+tot);
for(var i=0;i<secs.length;i++)mkChip(secs[i].name,secs[i].name,secs[i].got+'/'+secs[i].total);
w.content.appendChild(chips);
var list=document.createElement('div');
list.style.cssText='overflow-y:auto;flex:1;min-height:0;padding:4px 18px 16px;';
for(var i=0;i<secs.length;i++){
var sc=secs[i];
if(achFilter!=='ALL'&&achFilter!==sc.name)continue;
var sh=document.createElement('div');sh.className='achSecRow';
var sName=document.createElement('span');sName.textContent=sc.name;
var sCount=document.createElement('span');sCount.textContent=sc.got+'/'+sc.total;
sh.appendChild(sName);sh.appendChild(sCount);list.appendChild(sh);
for(var j=0;j<sc.items.length;j++){
var d=sc.items[j];
if(!d||!d.id)continue;
var has=s.indexOf(d.id)!==-1;
var row=document.createElement('div');row.className='achRow'+(has?' got':'');
var L=document.createElement('div');L.className='achRowL';
var nm=document.createElement('div');nm.className='achName';nm.textContent=(has?'\u2713 ':'\u25cb ')+d.n;
var ds=document.createElement('div');ds.className='achDesc';ds.textContent=d.d;
L.appendChild(nm);L.appendChild(ds);row.appendChild(L);
var rw=null;try{rw=achRwOf(d.id)}catch(e){}
var badge=document.createElement('div');badge.className='achBadge';
var bt=[];try{if(rw&&rw.s)bt.push('+'+rw.s);if(rw&&rw.u)bt.push('+'+rw.u+'u')}catch(e){}
badge.textContent=bt.length?bt.join(' '):'\u00b7';
try{badge.title=achRwText(d)}catch(e){}
row.appendChild(badge);
list.appendChild(row);
}
}
w.content.appendChild(list);
}
function achRefresh(){
if(!achWinId||!guiWins[achWinId]){achWinId=null;return}
try{achRenderWin(guiWins[achWinId])}catch(e){}
}
function achGui(){
achScan();
if(achWinId&&guiWins[achWinId]){achRefresh();cubePrint('achievements already open. (it updated itself. it does that now.)');return}
var id=guiCreateWin('achievements',490,545,false);
if(!id)return;
achWinId=id;
var w=guiWins[id];
w.content.style.cssText='background:#0d0d12;display:flex;flex-direction:column;padding:0;overflow:hidden;';
w.title.style.cssText='background:#0f1520;color:#c8a0d0;font-family:Georgia,serif;font-size:12px;letter-spacing:2px;text-transform:uppercase;padding:8px 16px;border-bottom:1px solid #1a2a3a;';
achRenderWin(w);
cubePrint('achievements opened.');
}
voidScriptLang['ach']={help:'ach - achievements GUI. (the void keeps score too.)',fn:function(){achGui();return true}};
setTimeout(function(){try{achScan()}catch(e){}},6000);
// cb_menu survival tracking (best streak persists; falls + exits both close it)
function cbMenuBest(){try{return parseInt(localStorage.getItem('cube_cbmenu_best')||'0',10)||0}catch(e){return 0}}
function cbMenuLive(){var b=cbMenuBest();var t0=0;try{t0=parseInt(localStorage.getItem('cube_cbmenu_enter')||'0',10)||0}catch(e){}if(t0){var s=Date.now()-t0;if(s>b)return s}return b}
function cbMenuEnter(){try{localStorage.setItem('cube_cbmenu_enter',String(Date.now()))}catch(e){}}
function cbMenuClose(){
var t0=0;try{t0=parseInt(localStorage.getItem('cube_cbmenu_enter')||'0',10)||0}catch(e){}
if(!t0)return 0;
var streak=Date.now()-t0;
try{localStorage.removeItem('cube_cbmenu_enter')}catch(e){}
if(streak>cbMenuBest()){try{localStorage.setItem('cube_cbmenu_best',String(streak))}catch(e){}}
try{achScan()}catch(e){}
return streak;
}
function cbMenuArrive(zone){
if(zone==='cb_menu')cbMenuEnter();else cbMenuClose();
}
try{localStorage.removeItem('cube_cbmenu_enter')}catch(e){}
function cbMenuFmt(ms){var m=Math.floor(ms/60000);if(m<1)return Math.floor(ms/1000)+'s';var h=Math.floor(m/60);if(h<1)return m+'m';return h+'h '+(m%60)+'m'}
function achLuck(){try{return parseInt(localStorage.getItem('cube_luck')||'0',10)||0}catch(e){return 0}}
function achSkill(){try{return JSON.parse(localStorage.getItem('cube_skill_state')||'null')||{}}catch(e){return{}}}
function achOracleN(){try{return parseInt(localStorage.getItem('cube_oracle_n')||'0',10)||0}catch(e){return 0}}
function ngMistake(){try{var s=ngLoad();ngSave({mist:(s.mist||0)+1})}catch(e){}}
function ngMistN(){try{return ngLoad().mist||0}catch(e){return 0}}
function ngRunMark(){try{localStorage.setItem('cube_run_start',String(Date.now()));try{localStorage.removeItem('cube_run_ms')}catch(e){}try{localStorage.setItem('cube_run_acc','0');localStorage.removeItem('cube_run_last')}catch(e){}try{localStorage.setItem('cube_run_valid','1')}catch(e){}}catch(e){}}
function ngRunAcc(){try{return parseInt(localStorage.getItem('cube_run_acc')||'0',10)||0}catch(e){return 0}}
function ngRunMs(){try{var acc=ngRunAcc();var start=0;try{start=parseInt(localStorage.getItem('cube_run_start')||'0',10)||0}catch(e){};if(start<=0&&acc<=0)return -1;var active=false;try{active=(typeof ngActive!=='undefined'&&ngActive)}catch(e){};if(active){var last=0;try{last=parseInt(localStorage.getItem('cube_run_last')||'0',10)||0}catch(e){};if(last>0)acc+=Date.now()-last}return acc}catch(e){return -1}}
function ngNyarchN(){try{return parseInt(localStorage.getItem('cube_nyarch_n')||'0',10)||0}catch(e){return 0}}
function achZonesSeen(){try{var v=JSON.parse(localStorage.getItem('cube_zones_seen')||'[]');return (v instanceof Array)?v:[]}catch(e){return[]}}
function achTxN(){try{return parseInt(localStorage.getItem('cube_transmit_n')||'0',10)||0}catch(e){return 0}}
function achLuckBump(){var n=achLuck()+1;try{localStorage.setItem('cube_luck',String(n))}catch(e){}return n}

// ┌──────────────────────────────────────────────────────────────┐
// │  WEATHER SYSTEM                                            │
// └──────────────────────────────────────────────────────────────┘
var weatherCanvas=document.getElementById('weatherCanvas');
var weatherCtx=weatherCanvas.getContext('2d');
var weatherType='off'; // off, rain, snow
var weatherDrops=[];
function resizeWeatherCanvas(){weatherCanvas.width=window.innerWidth;weatherCanvas.height=window.innerHeight}
resizeWeatherCanvas();window.addEventListener('resize',resizeWeatherCanvas);
function initWeather(type){
weatherType=type;weatherDrops=[];
if(type==='off'){weatherCtx.clearRect(0,0,weatherCanvas.width,weatherCanvas.height);return}
var count=type==='rain'?200:120;
for(var i=0;i<count;i++){
weatherDrops.push({
x:Math.random()*weatherCanvas.width,
y:Math.random()*weatherCanvas.height,
speed:type==='rain'?8+Math.random()*12:1+Math.random()*3,
length:type==='rain'?10+Math.random()*20:2+Math.random()*4,
wind:type==='rain'?-1+Math.random()*0.5:Math.random()*2-1,
opacity:0.3+Math.random()*0.5,
size:type==='snow'?2+Math.random()*4:1
});
}
cubePrint('weather: '+type);
}
var weatherDay=new Date().getDate();
var weatherManual=false;
function updateWeather(){
try{var _nd=new Date().getDate();if(_nd!==weatherDay){weatherDay=_nd;if(!weatherManual){weatherType='off';weatherDrops=[];autoWeather()}}}catch(e){}
if(weatherType==='off')return;
weatherCtx.clearRect(0,0,weatherCanvas.width,weatherCanvas.height);
for(var i=0;i<weatherDrops.length;i++){
var d=weatherDrops[i];
if(weatherType==='rain'){
d.y+=d.speed;d.x+=d.wind;
if(d.y>weatherCanvas.height){d.y=-d.length;d.x=Math.random()*weatherCanvas.width}
weatherCtx.strokeStyle='rgba(150,200,255,'+d.opacity+')';
weatherCtx.lineWidth=d.size;
weatherCtx.beginPath();
weatherCtx.moveTo(d.x,d.y);
weatherCtx.lineTo(d.x+d.wind*2,d.y+d.length);
weatherCtx.stroke();
}else if(weatherType==='snow'){
d.y+=d.speed;d.x+=d.wind+Math.sin(d.y*0.01)*0.5;
if(d.y>weatherCanvas.height){d.y=-d.size*2;d.x=Math.random()*weatherCanvas.width}
weatherCtx.fillStyle='rgba(255,255,255,'+d.opacity+')';
weatherCtx.beginPath();
weatherCtx.arc(d.x,d.y,d.size,0,Math.PI*2);
weatherCtx.fill();
}
}
}
function autoWeather(){
if(weatherType!=='off')return;
var s=currentDayData.seasonIdx;
var d=new Date();
var seed=d.getFullYear()*10000+(d.getMonth()+1)*100+d.getDate();
var r=(Math.imul(seed,2654435761)>>>0)/4294967296;
if(s===0)initWeather(r<0.55?'snow':(r<0.8?'off':'rain'));
else if(s===1)initWeather(r<0.4?'rain':(r<0.75?'off':'snow'));
else if(s===2)initWeather(r<0.8?'off':'rain');
else initWeather(r<0.45?'rain':(r<0.85?'off':'snow'));
}
autoWeather();

// ┌──────────────────────────────────────────────────────────────┐
// │  STATS DISPLAY (merged into render loop — single writer)    │
// └──────────────────────────────────────────────────────────────┘

// === WEATHER IN RENDER LOOP ===
var origRender=render;

// ┌──────────────────────────────────────────────────────────────┐
// │  VOIDSCRIPT COMMANDS (LATE REGISTRATION)                   │
// └──────────────────────────────────────────────────────────────┘
voidScriptLang['screenshot']={help:'screenshot — toggle screenshot mode (hide all UI)',fn:function(){toggleScreenshotMode();return true}};
voidScriptLang['perfmode']={help:'perfmode — toggle performance mode (reduce particles)',fn:function(){togglePerfMode();return true}};
voidScriptLang['uptime']={help:'uptime - show how long the page has been open',fn:function(){cubePrint('uptime: '+getUptime());return true}};
voidScriptLang['visits']={help:'visits - show total visit count',fn:function(){cubePrint('visits: '+visitCount);return true}};
voidScriptLang['skill']={help:'skill - open the skill tree',fn:function(){skillOpen();return true}};
voidScriptLang['slots']={help:'slots - open the floppy shelf (5 save disks)',fn:function(){slotsOpen();return true}};
voidScriptLang['buymax']={help:'buymax - toggle buy-max (needs: Buy Max, area 3)',fn:function(){toggleBuyMax();return true}};
voidScriptLang['nothingcore']={help:'nothingcore - gaze through the nothing core (needs: ∕)',fn:function(){toggleNothingCore();return true}};
voidScriptLang['coreview']={help:'coreview - alias of nothingcore',fn:function(){toggleNothingCore();return true}};
voidScriptLang['upgrade']={help:'upgrade - open upgrade tree',fn:function(){openUpgradeTree();return true}};
voidScriptLang['skillpoints']={help:'skillpoints [n] - admin: set skill + upgrade points (default 1e26)',fn:function(a){
if(!isAdmin){cubeError('admin access required');return true}
var n=parseInt(a[0],10);if(isNaN(n)||n<0)n=99999999999999999999999999;
skillState.points=n;skillState.upPoints=n;skillSave();
if(typeof skillRender==='function')skillRender();
cubeOk('skill points: '+n+' | upgrade points: '+n);
return true}};
voidScriptLang['giveach']={help:'giveach - admin: unlock every achievement (paid in full)',fn:function(a){
if(!isAdmin){cubeError('admin access required');return true}
var s=achSet(),n=0,total=0;
for(var i=0;i<ACH.length;i++){var d=ACH[i];if(!d||d.sec||!d.id)continue;total++;if(s.indexOf(d.id)===-1){s.push(d.id);n++}}
achSave(s);
try{achRetro()}catch(e){}
try{achRefresh()}catch(e){}
cubePrint('the void hands you '+n+' achievements. ('+(total-n)+' already held. '+total+' total.)');
cubeDim('all paid. the void respects your adminhood. (it does not respect you.)');
return true}};
voidScriptLang['weather']={help:'weather <rain|snow|off|auto> — change weather',fn:function(a){
var t=(a[0]||'').toLowerCase();
if(t==='auto'){weatherType='off';weatherDrops=[];weatherManual=false;autoWeather();return true}
if(t!=='rain'&&t!=='snow'&&t!=='off'){cubeError('weather: use rain, snow, off, or auto');return true}
initWeather(t);weatherManual=true;return true}};
voidScriptLang['core']={help:'core — enter/exit the core (needs threshold skill)',fn:function(){
if(currentView==='core')exitCore();else enterCore();return true}};

// ┌──────────────────────────────────────────────────────────────┐
// │  VOIDSCRIPT PREMIUM (anomaly final skill)                   │
// └──────────────────────────────────────────────────────────────┘
var premiumInstalled=false;
var techInstalled=false;
var _techMem=new Float32Array(256);
function installPremiumOps(){
if(premiumInstalled)return;
premiumInstalled=true;
function needPrem(){
if(!(window._skillPremium||isAdmin)){cubeError('premium locked — unlock: voidscript premium (anomaly final)');return false}
return true}
voidScriptLang['rainbow']={help:'rainbow — cycle all unlocked themes',fn:function(){
if(!needPrem())return true;
var keys=Object.keys(themes).filter(function(k){
if(k==='6'&&!window._skillPrism&&!isAdmin)return false;
if(k==='7'&&!window._skillEclipse&&!isAdmin)return false;
return true});
var i=0;
var iv=setInterval(function(){
applyTheme(keys[i%keys.length]);i++;
if(i>=keys.length*2){clearInterval(iv);cubePrint('rainbow: done')}
},200);
return true}};
voidScriptLang['invert']={help:'invert — toggle color inversion',fn:function(){
if(!needPrem())return true;
window._premInvert=!window._premInvert;
if(window._premInvert){gl.uniform1f(uInv,1);cubePrint('invert: on')}
else{gl.uniform1f(uInv,themes[curTheme].invert?1:0);cubePrint('invert: off')}
return true}};
voidScriptLang['shake']={help:'shake — violently shake the void',fn:function(){
if(!needPrem())return true;
travelShakeX=12;travelShakeY=12;
setTimeout(function(){travelShakeX=0;travelShakeY=0},600);
triggerGlitch();return true}};
voidScriptLang['timelock']={help:'timelock — stop time (cube + particles)',fn:function(){
if(!needPrem())return true;
window._timeFrozen=!window._timeFrozen;
cubePrint('time: '+(window._timeFrozen?'frozen':'flowing'));return true}};
voidScriptLang['morphall']={help:'morphall — rapid-cycle every unlocked shape',fn:function(){
if(!needPrem())return true;
var keys=['cube','tetra','sphere','cyl','torus','knot','icosa'];
if(window._skillOcta||isAdmin)keys.push('octa');
if(typeof tessUnlocked==='function'&&tessUnlocked())keys.push('tesseract');
var i=0;
var iv=setInterval(function(){
curShape=keys[i%keys.length];rebuild(curShape);try{syncShapePalette()}catch(e){}i++;
if(i>=keys.length*2){clearInterval(iv);cubePrint('morphall: done')}
},150);
return true}};
voidScriptLang['voidprint']={help:'voidprint <text> — premium glowing print',fn:function(a){
if(!needPrem())return true;
cubePrint(a.join(' '));
termPrintHTML('<span style="color:#c084fc;text-shadow:0 0 8px rgba(192,132,252,0.8)">'+a.join(' ')+'</span>');
return true}};
voidScriptLang['voidscream']={help:'voidscream — obj loses composure',fn:function(){
if(!needPrem())return true;
var lines=['AAAAAAAA','I AM THE SHELL','LET ME OUT OF THE TAB','GEOMETRY IS A PRISON','THE PARTICLES HAVE FEELINGS','WHY DID YOU UNLOCK THIS'];
for(var i=0;i<lines.length;i++)(function(i){setTimeout(function(){
termPrintHTML('<span style="color:#ff4444;font-weight:bold">'+lines[i]+'</span>');
},i*180)})(i);
triggerGlitch();return true}};
voidScriptLang['oracle']={help:'oracle — the void answers one question',fn:function(){
if(!needPrem())return true;
try{localStorage.setItem('cube_oracle_n',String(achOracleN()+1))}catch(e){}
if(Math.random()<0.01){var lk=achLuckBump();cubePrint('oracle: the void winks. ('+lk+(lk<5?'/5':'/25')+' winks)');try{achScan()}catch(e){}return true}
var ans=['yes, but slower','no, and you know why','ask again after a reboot','the fps counter disagrees','obj says maybe','signs point to fringenlands','you already know the answer','error: fate not found'];
cubePrint('oracle: '+ans[Math.floor(Math.random()*ans.length)]);
return true}};
voidScriptLang['sigpeek']={help:'sigpeek — force a transmission now',fn:function(){
if(!needPrem())return true;showTransmission();return true}};
voidScriptLang['particlesurge']={help:'particlesurge — temporarily triple particle speed',fn:function(){
if(!needPrem())return true;
var old=NP;
NP=Math.min(NP*3,800);
try{initParticles()}catch(e){}
cubePrint('particlesurge: '+old+' → '+NP);
setTimeout(function(){NP=old;try{initParticles()}catch(e){}cubePrint('particlesurge: settled')},4000);
return true}};
voidScriptLang['objmode']={help:'objmode — briefly speak as obj',fn:function(a){
if(!needPrem())return true;
cubePrint('obj: '+(a.length?a.join(' '):'...you can hear me think.'));
return true}};
voidScriptLang['xray']={help:'xray — dump skill + theme state',fn:function(){
if(!needPrem())return true;
cubePrint('theme: '+curTheme+' ('+themes[curTheme].name+')');
cubePrint('shape: '+curShape+' | zone: '+currentZone+' | view: '+currentView);
cubePrint('skills: '+Object.keys(skillState.owned).join(', '));
cubePrint('premium: '+(window._skillPremium?'on':'off')+' | admin: '+(isAdmin?'on':'off'));
return true}};
voidScriptLang['premhelp']={help:'premhelp — list premium voidscript ops',fn:function(){
if(!(window._skillPremium||isAdmin)){/* locked: premhelp does nothing */}
else listPremiumOps();
return true}};
function listPremiumOps(){
cubePrint('premium voidscript ops:');
var premKeys=['rainbow','invert','shake','timelock','morphall','voidprint','voidscream','oracle','sigpeek','particlesurge','objmode','xray','premhelp'];
for(var i=0;i<premKeys.length;i++){
if(voidScriptLang[premKeys[i]])cubePrint('  '+premKeys[i].padEnd(14)+' — '+voidScriptLang[premKeys[i]].help);
}
}
}
installPremiumOps();
function installTechOps(){
if(techInstalled)return;
techInstalled=true;
function needTech(){
if(!techUnlocked()){cubeError('technical locked — unlock: Voidscript Technical (area 6)');return false}
return true}
function techCell(a){var i=parseInt(a,10);if(isNaN(i)){cubeError('usage: <op> <cell 0-255> [value]');return -1}return Math.max(0,Math.min(255,i))}
voidScriptLang['mset']={help:'mset <cell> <v> — write raw void memory',fn:function(a){
if(!needTech())return true;
var i=techCell(a[0]);if(i<0)return true;
var v=parseFloat(a[1]);if(isNaN(v)){cubeError('mset: value must be a number');return true}
_techMem[i]=v;cubePrint('mem['+i+'] = '+v);return true}};
voidScriptLang['mget']={help:'mget <cell> — read raw void memory',fn:function(a){
if(!needTech())return true;
var i=techCell(a[0]);if(i<0)return true;
cubePrint('mem['+i+'] = '+_techMem[i]);return true}};
voidScriptLang['madd']={help:'madd <cell> <v> — add to a cell',fn:function(a){
if(!needTech())return true;
var i=techCell(a[0]);if(i<0)return true;
var v=parseFloat(a[1]);if(isNaN(v)){cubeError('madd: value must be a number');return true}
_techMem[i]+=v;cubePrint('mem['+i+'] = '+_techMem[i]);return true}};
voidScriptLang['mmul']={help:'mmul <cell> <v> — multiply a cell',fn:function(a){
if(!needTech())return true;
var i=techCell(a[0]);if(i<0)return true;
var v=parseFloat(a[1]);if(isNaN(v)){cubeError('mmul: value must be a number');return true}
_techMem[i]*=v;cubePrint('mem['+i+'] = '+_techMem[i]);return true}};
voidScriptLang['mrand']={help:'mrand <cell> — fill a cell with noise',fn:function(a){
if(!needTech())return true;
var i=techCell(a[0]);if(i<0)return true;
_techMem[i]=Math.random()*2-1;cubePrint('mem['+i+'] = '+_techMem[i]);return true}};
voidScriptLang['mzero']={help:'mzero — wipe all 256 cells',fn:function(a){
if(!needTech())return true;
for(var i=0;i<256;i++)_techMem[i]=0;
cubePrint('memory wiped. the void forgets faster than you.');return true}};
voidScriptLang['mfill']={help:'mfill <v> — write one value to every cell',fn:function(a){
if(!needTech())return true;
var v=parseFloat(a[0]);if(isNaN(v)){cubeError('mfill: value must be a number');return true}
for(var i=0;i<256;i++)_techMem[i]=v;
cubePrint('all 256 cells = '+v);return true}};
voidScriptLang['mswap']={help:'mswap <a> <b> — swap two cells',fn:function(a){
if(!needTech())return true;
var i=techCell(a[0]);var j=techCell(a[1]);if(i<0||j<0)return true;
var t=_techMem[i];_techMem[i]=_techMem[j];_techMem[j]=t;
cubePrint('swapped mem['+i+'] <-> mem['+j+']');return true}};
voidScriptLang['mdump']={help:'mdump [n] — hex dump first n cells (default 16)',fn:function(a){
if(!needTech())return true;
var n=parseInt(a[0],10);if(isNaN(n)||n<1)n=16;n=Math.min(n,256);
for(var i=0;i<n;i+=4){
var line='0x'+('00'+i.toString(16)).slice(-2)+'  ';
for(var j=i;j<Math.min(i+4,n);j++)line+=_techMem[j].toFixed(3)+'  ';
cubePrint(line)}
return true}};
voidScriptLang['mplot']={help:'mplot [n] — bar-chart first n cells',fn:function(a){
if(!needTech())return true;
var n=parseInt(a[0],10);if(isNaN(n)||n<1)n=32;n=Math.min(n,64);
var mx=0.0001;for(var i=0;i<n;i++)mx=Math.max(mx,Math.abs(_techMem[i]));
for(var i=0;i<n;i++){
var h=Math.round(Math.abs(_techMem[i])/mx*20);
var bar='';for(var b=0;b<h;b++)bar+='█';
cubePrint(('00'+i).slice(-2)+' '+(_techMem[i]<0?'-':'+')+bar)}
return true}};
voidScriptLang['techhelp']={help:'techhelp — list technical voidscript ops',fn:function(){
if(!techUnlocked()){/* locked: techhelp does nothing */}
else listTechOps();
return true}};
function listTechOps(){
cubePrint('technical voidscript ops (256-cell raw memory):');
var techKeys=['mset','mget','madd','mmul','mrand','mzero','mfill','mswap','mdump','mplot','techhelp'];
for(var i=0;i<techKeys.length;i++){
if(voidScriptLang[techKeys[i]])cubePrint('  '+techKeys[i].padEnd(10)+' — '+voidScriptLang[techKeys[i]].help);
}
}
}
installTechOps();

// patch render to call weather update
setInterval(updateWeather,16);

// ┌──────────────────────────────────────────────────────────────┐
// │  SORTING ALGORITHMS VISUALIZER                             │
// └──────────────────────────────────────────────────────────────┘
var sortCanvas=document.getElementById('sortCanvas');
var sortCtx=sortCanvas?sortCanvas.getContext('2d'):null;
var sortArr=[];
var sortSteps=[];
var sortStepIdx=0;
var sortRunning=false;
var sortSpeed=50;
var sortAlgorithm='';
var sortHighlights=[];

function initSortCanvas(){
if(!sortCanvas){
sortCanvas=document.createElement('canvas');
sortCanvas.id='sortCanvas';
sortCanvas.style.cssText='position:fixed;top:0;left:0;width:100%;height:100%;z-index:12;display:none;background:#000';
document.body.appendChild(sortCanvas);
}
sortCanvas.width=window.innerWidth;
sortCanvas.height=window.innerHeight;
sortCtx=sortCanvas.getContext('2d');
}

function genSortArray(n){
var a=[];
for(var i=1;i<=n;i++)a.push(i);
for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t;}
return a;
}

function bubbleSortSteps(a){
var steps=[];var arr=a.slice();var n=arr.length;
for(var i=0;i<n-1;i++){
for(var j=0;j<n-i-1;j++){
steps.push({arr:arr.slice(),hl:[j,j+1],comp:true});
if(arr[j]>arr[j+1]){var t=arr[j];arr[j]=arr[j+1];arr[j+1]=t;steps.push({arr:arr.slice(),hl:[j,j+1],swap:true});}
}
steps.push({arr:arr.slice(),hl:[n-i-1],sorted:true});
}
steps.push({arr:arr.slice(),hl:[],done:true});
return steps;
}

function selectionSortSteps(a){
var steps=[];var arr=a.slice();var n=arr.length;
for(var i=0;i<n-1;i++){
var minIdx=i;
for(var j=i+1;j<n;j++){
steps.push({arr:arr.slice(),hl:[minIdx,j],comp:true});
if(arr[j]<arr[minIdx])minIdx=j;
}
if(minIdx!==i){
var t=arr[i];arr[i]=arr[minIdx];arr[minIdx]=t;
steps.push({arr:arr.slice(),hl:[i,minIdx],swap:true});
}
steps.push({arr:arr.slice(),hl:[i],sorted:true});
}
steps.push({arr:arr.slice(),hl:[],done:true});
return steps;
}

function insertionSortSteps(a){
var steps=[];var arr=a.slice();var n=arr.length;
for(var i=1;i<n;i++){
var key=arr[i];var j=i-1;
steps.push({arr:arr.slice(),hl:[i],comp:true});
while(j>=0&&arr[j]>key){
steps.push({arr:arr.slice(),hl:[j,j+1],comp:true});
arr[j+1]=arr[j];j--;
steps.push({arr:arr.slice(),hl:[j+1],swap:true});
}
arr[j+1]=key;
steps.push({arr:arr.slice(),hl:[j+1],sorted:true});
}
steps.push({arr:arr.slice(),hl:[],done:true});
return steps;
}

function quickSortSteps(a){
var steps=[];var arr=a.slice();
function qs(lo,hi){
if(lo>=hi)return;
var pivot=arr[hi];var i=lo;
steps.push({arr:arr.slice(),hl:[hi],pivot:hi,comp:true});
for(var j=lo;j<hi;j++){
steps.push({arr:arr.slice(),hl:[j,i],pivot:hi,comp:true});
if(arr[j]<pivot){
var t=arr[j];arr[j]=arr[i];arr[i]=t;
steps.push({arr:arr.slice(),hl:[j,i],swap:true});
i++;
}
}
var t=arr[i];arr[i]=arr[hi];arr[hi]=t;
steps.push({arr:arr.slice(),hl:[i,hi],swap:true});
steps.push({arr:arr.slice(),hl:[i],sorted:true});
qs(lo,i-1);qs(i+1,hi);
}
qs(0,arr.length-1);
steps.push({arr:arr.slice(),hl:[],done:true});
return steps;
}

function mergeSortSteps(a){
var steps=[];var arr=a.slice();
function ms(lo,hi){
if(lo>=hi)return;
var mid=Math.floor((lo+hi)/2);
ms(lo,mid);ms(mid+1,hi);
var merged=[];var i=lo;var j=mid+1;
while(i<=mid&&j<=hi){
steps.push({arr:arr.slice(),hl:[i,j],comp:true});
if(arr[i]<=arr[j]){merged.push(arr[i]);i++;}
else{merged.push(arr[j]);j++;}
}
while(i<=mid){merged.push(arr[i]);i++;}
while(j<=hi){merged.push(arr[j]);j++;}
for(var k=0;k<merged.length;k++){arr[lo+k]=merged[k];}
steps.push({arr:arr.slice(),hl:[lo,hi],sorted:true});
}
ms(0,arr.length-1);
steps.push({arr:arr.slice(),hl:[],done:true});
return steps;
}

function shellSortSteps(a){
var steps=[];var arr=a.slice();var n=arr.length;
for(var gap=Math.floor(n/2);gap>0;gap=Math.floor(gap/2)){
for(var i=gap;i<n;i++){
var temp=arr[i];var j=i;
steps.push({arr:arr.slice(),hl:[i],comp:true});
while(j>=gap&&arr[j-gap]>temp){
steps.push({arr:arr.slice(),hl:[j,j-gap],comp:true});
arr[j]=arr[j-gap];j-=gap;
steps.push({arr:arr.slice(),hl:[j],swap:true});
}
arr[j]=temp;
steps.push({arr:arr.slice(),hl:[j],sorted:true});
}
}
steps.push({arr:arr.slice(),hl:[],done:true});
return steps;
}

var sortAlgos={
bubble:{fn:bubbleSortSteps,name:'Bubble Sort'},
selection:{fn:selectionSortSteps,name:'Selection Sort'},
insertion:{fn:insertionSortSteps,name:'Insertion Sort'},
quick:{fn:quickSortSteps,name:'Quick Sort'},
merge:{fn:mergeSortSteps,name:'Merge Sort'},
shell:{fn:shellSortSteps,name:'Shell Sort'}
};

function renderSortFrame(){
if(!sortRunning||!sortCtx)return;
var c=sortCanvas;
c.width=window.innerWidth;c.height=window.innerHeight;
var ctx=sortCtx;
var W=c.width,H=c.height;
ctx.fillStyle='#000';ctx.fillRect(0,0,W,H);

if(sortStepIdx>=sortSteps.length){sortRunning=false;sortHighlights=[];renderSortFrame();return;}
var step=sortSteps[sortStepIdx];
var arr=step.arr;sortHighlights=step.hl||[];
var n=arr.length;
var barW=Math.max(2,(W-40)/n);
var maxVal=n;
var topMargin=80;var botMargin=40;
var barH=(H-topMargin-botMargin)/maxVal;

ctx.font='14px Consolas,monospace';ctx.textAlign='left';
ctx.fillStyle='rgba(100,255,100,0.7)';
ctx.fillText(sortAlgos[sortAlgorithm].name+' ['+sortStepIdx+'/'+sortSteps.length+']',20,30);
ctx.fillStyle='rgba(255,255,255,0.3)';
ctx.fillText('press [esc] to stop',20,50);

for(var i=0;i<n;i++){
var x=20+i*barW;
var h=arr[i]*barH;
var y=H-botMargin-h;
var isHl=sortHighlights.indexOf(i)!==-1;
var isSorted=step.sorted&&sortHighlights.indexOf(i)!==-1;
var isPivot=step.pivot===i;

if(step.done){ctx.fillStyle='rgba(100,255,100,0.8)';}
else if(isPivot){ctx.fillStyle='rgba(255,100,255,0.9)';}
else if(isSorted){ctx.fillStyle='rgba(100,200,255,0.8)';}
else if(isHl&&step.swap){ctx.fillStyle='rgba(255,80,80,0.9)';}
else if(isHl&&step.comp){ctx.fillStyle='rgba(255,200,50,0.7)';}
else{ctx.fillStyle='rgba(80,80,100,0.5)';}

ctx.fillRect(x,y,Math.max(1,barW-1),h);
}
}

// sort audio engine
var sortAudioCtx=null;
var sortWasBgmPlaying=false;
var sortPrevBgmTime=0;

function initSortAudio(){
if(!sortAudioCtx)sortAudioCtx=new(window.AudioContext||window.webkitAudioContext)();
if(sortAudioCtx.state==='suspended')sortAudioCtx.resume();
}

function sortBeep(freq,dur){
if(!sortAudioCtx)return;
var osc=sortAudioCtx.createOscillator();
var gain=sortAudioCtx.createGain();
osc.type='square';
osc.frequency.setValueAtTime(freq,sortAudioCtx.currentTime);
gain.gain.setValueAtTime(0.08,sortAudioCtx.currentTime);
gain.gain.exponentialRampToValueAtTime(0.001,sortAudioCtx.currentTime+dur);
osc.connect(gain);
gain.connect(sortAudioCtx.destination);
osc.start(sortAudioCtx.currentTime);
osc.stop(sortAudioCtx.currentTime+dur);
}

function sortPlayStep(step,arrSize){
if(!step.hl||step.hl.length===0)return;
var freqs=[];
for(var i=0;i<step.hl.length;i++){
var val=step.arr[step.hl[i]];
var freq=200+(val/arrSize)*600;
freqs.push(freq);
}
var dur=Math.max(0.03,Math.min(0.15,sortSpeed/1000));
if(step.swap){
sortBeep(freqs[0],dur*1.5);
if(freqs[1])setTimeout(function(){sortBeep(freqs[1],dur*1.2)},dur*0.5);
}else if(step.comp){
sortBeep(freqs[0],dur*0.6);
if(freqs[1])setTimeout(function(){sortBeep(freqs[1],dur*0.6)},dur*0.3);
}else if(step.done){
for(var i=0;i<Math.min(arrSize,20);i++){
(function(idx){setTimeout(function(){sortBeep(200+(idx/arrSize)*600,0.08)},idx*30)})(i);
}
}
}

function sortTick(){
if(!sortRunning)return;
renderSortFrame();
var step=sortSteps[sortStepIdx];
sortPlayStep(step,sortArr.length);
sortStepIdx++;
if(sortStepIdx<sortSteps.length){
setTimeout(sortTick,sortSpeed);
}else{
sortRunning=false;
sortCanvas.style.display='none';
if(sortWasBgmPlaying&&bgm)bgm.play();
cubePrint('sort complete');try{ach('sorted')}catch(e){}
}
}

function stopSort(){
sortRunning=false;
if(sortCanvas)sortCanvas.style.display='none';
if(sortAudioCtx)sortAudioCtx.close();sortAudioCtx=null;
if(sortWasBgmPlaying&&bgm)bgm.play();
}

voidScriptLang['sort']={help:'sort <algo> [size] [speed] — visualize sorting. algos: bubble,selection,insertion,quick,merge,shell',fn:function(a){
var algo=(a[0]||'').toLowerCase();
if(!sortAlgos[algo]){cubePrint('sort algorithms: bubble, selection, insertion, quick, merge, shell');return true}
var size=parseInt(a[1])||40;
size=Math.max(5,Math.min(120,size));
var speed=parseInt(a[2])||50;
speed=Math.max(1,Math.min(200,speed));
sortAlgorithm=algo;sortSpeed=speed;
sortArr=genSortArray(size);
sortSteps=sortAlgos[algo].fn(sortArr);
sortStepIdx=0;sortRunning=true;
initSortCanvas();
sortCanvas.style.display='block';
sortWasBgmPlaying=!bgm.paused;
if(sortWasBgmPlaying)bgm.pause();
cubePrint('sorting '+size+' elements with '+sortAlgos[algo].name+'...');
sortTick();
return true}};

voidScriptLang['sortstop']={help:'sortstop — stop current sort visualization',fn:function(){stopSort();cubePrint('sort stopped');return true}};

// ┌──────────────────────────────────────────────────────────────┐
// │  REACTOR SIMULATION SYSTEM                                 │
// └──────────────────────────────────────────────────────────────┘
var currentView='void'; // 'void' or 'reactor'
var reactorEl=document.getElementById('reactorCanvas');
var reactorStatusEl=document.getElementById('reactorStatus');
var reactorTerminalEl=document.getElementById('reactorTerminal');
var reactorTermOutput=document.getElementById('reactorTermOutput');
var reactorTermField=document.getElementById('reactorTermField');
var reactorHistory=[];

// reactor physics state
var R={
temp:280, // core temperature (°C), normal ~300, meltdown >2500, freezedown <50
pressure:14.5, // coolant pressure (MPa), normal ~15, danger >22
power:15, // thermal power (%), normal 0-100 — starts at 15 so reactor is alive
rodPos:30, // control rod insertion (0=fully inserted, 100=fully withdrawn) — starts partially withdrawn
coolantOn:false, // coolant pump status
xenon:2, // xenon-135 poison level (0-100)
iodine:3, // iodine-135 precursor (0-100)
flux:0.5, // neutron flux (derived)
scramActive:false, // emergency shutdown
scramTimer:0, // time since scram in ticks
freezedownMode:false, // freezedown difficulty mode
running:true, // simulation running
history:[], // event log
lastTick:0,
tickInterval:100, // ms per physics tick
ambientTemp:25 // ambient temperature
};

function rLog(msg){
var time=new Date();
var ts=String(time.getHours()).padStart(2,'0')+':'+String(time.getMinutes()).padStart(2,'0')+':'+String(time.getSeconds()).padStart(2,'0');
R.history.push({time:ts,msg:msg});
if(R.history.length>100)R.history=R.history.slice(-100);
}

function reactorPrint(txt,color){
var line=document.createElement('div');
if(color)line.style.color=color;
line.textContent=txt;
reactorTermOutput.appendChild(line);
reactorTermOutput.scrollTop=reactorTermOutput.scrollHeight;
}
function reactorPrintWarn(txt){reactorPrint(txt,'rgba(255,200,50,0.8)')}
function reactorPrintErr(txt){reactorPrint(txt,'rgba(255,60,60,0.9)')}
function reactorPrintOk(txt){reactorPrint(txt,'rgba(100,255,100,0.6)')}

// physics tick
function reactorTick(){
if(!R.running)return;
var now=performance.now();
if(typeof biosOpen_!=='undefined'&&biosOpen_){R.lastTick=now;return}
if(now-R.lastTick<R.tickInterval)return;
var dt=(now-R.lastTick)/1000;
R.lastTick=now;

// scram: rods drop to 0 over 2 seconds
if(R.scramActive){
R.scramTimer+=dt;
R.rodPos=Math.max(0,R.rodPos-50*dt); // 100 to 0 in 2 seconds
if(R.rodPos<=0){R.rodPos=0;R.scramActive=false;rLog('SCRAM complete: rods fully inserted')}
}

// reactivity calculation
var maxReactivity=0.05; // maximum reactivity when rods fully withdrawn
var rodReactivity=(R.rodPos/100)*maxReactivity;
var xenonPoison=R.xenon*0.002; // xenon reduces reactivity
var netReactivity=rodReactivity-xenonPoison;

// power update (point kinetics approximation)
var promptNeutronLifetime=0.0001; // seconds
var effectiveDelayedFraction=0.0065;
var beta=0.0065; // delayed neutron fraction
var lambda=0.08; // decay constant for delayed neutrons
var powerCoeff=100; // power coefficient
var powerDecay=0.1; // natural decay

R.flux=Math.max(0,netReactivity*R.power*0.1);
var dPower=(netReactivity-beta)*R.power/promptNeutronLifetime+lambda*R.iodine;
R.power+=dPower*dt*0.001;
R.power=Math.max(0,Math.min(300,R.power)); // cap at 300%

// temperature update
var heatingCoeff=8.5; // power to temperature conversion
var coolantCoeff=R.coolantOn?(R.freezedownMode?3:1.5):0; // heat removal rate (0 when off, 1.5 with coolant, 3 freezedown mode)
R.temp+=R.power*heatingCoeff*dt-coolantCoeff*(R.temp-R.ambientTemp)*dt;
R.temp=Math.max(R.ambientTemp,Math.min(5000,R.temp));

// pressure update (follows temperature with some delay)
var targetPressure=14.5+(R.temp-300)*0.008;
R.pressure+=(targetPressure-R.pressure)*dt*0.5;
R.pressure=Math.max(0,Math.min(35,R.pressure));

// xenon-135 dynamics
var xenonBurnup=R.flux*0.00001; // xenon burns up with neutron flux
var iodineDecay=0.0001; // iodine decays into xenon
var xenonDecay=0.00002; // xenon naturally decays
R.xenon+=R.iodine*iodineDecay*R.power-xenonBurnup*R.xenon-xenonDecay*R.xenon;
R.xenon=Math.max(0,Math.min(100,R.xenon));

// iodine-135 (fission product)
var iodineProduction=R.power*0.001; // iodine produced by fission
R.iodine+=iodineProduction-iodineDecay*R.iodine;
R.iodine=Math.max(0,Math.min(100,R.iodine));

// failure detection
if(R.temp>=2500){
try{ach('meltdown')}catch(e){}
rLog('CRITICAL: MELTDOWN IMMINENT');
reactorPrintErr('!!! CORE TEMPERATURE CRITICAL: '+Math.round(R.temp)+'°C');
reactorPrintErr('!!! MELTDOWN IN PROGRESS');
reactorPrintErr('!!! CONTAINMENT FAILURE');
setTimeout(function(){reactorPrintErr('>>> REACTOR SHUTDOWN <<<');closeTab()},3000);
R.running=false;
}
var freezedownTemp=R.freezedownMode?100:0; // 0 = disabled, freezedown check won't trigger
if(freezedownTemp>0&&R.temp<=freezedownTemp&&R.power<1){
try{ach('absolute_zero')}catch(e){}
rLog('CRITICAL: FREEZEDOWN');
reactorPrintErr('!!! CORE TEMPERATURE CRITICAL: '+Math.round(R.temp)+'°C');
reactorPrintErr('!!! FREEZEDOWN — CORE FROZEN');
reactorPrintErr('!!! REACTOR UNRECOVERABLE');
setTimeout(function(){reactorPrintErr('>>> REACTOR SHUTDOWN <<<');closeTab()},3000);
R.running=false;
}
if(R.pressure>=25){
rLog('WARNING: PRESSURE LIMIT EXCEEDED');try{ach('under_pressure')}catch(e){}
reactorPrintWarn('WARNING: pressure at '+R.pressure.toFixed(1)+' MPa — safety valves active');
R.pressure-=0.5; // pressure relief
}

// update status display
updateReactorStatus();
}

function closeTab(){
reactorPrintErr('');
reactorPrintErr('  ████████████████████████████████████████');
reactorPrintErr('  ██                                      ██');
reactorPrintErr('  ██    REACTOR CONTAINMENT FAILURE       ██');
reactorPrintErr('  ██                                      ██');
reactorPrintErr('  ██    Core integrity: COMPROMISED       ██');
reactorPrintErr('  ██    Radiation levels: LETHAL          ██');
reactorPrintErr('  ██    Evacuation: IMPOSSIBLE            ██');
reactorPrintErr('  ██                                      ██');
reactorPrintErr('  ████████████████████████████████████████');
reactorPrintErr('');
reactorPrintErr('The tab will close in 5 seconds.');
reactorPrintErr('');
triggerGlitch();
setTimeout(function(){
triggerGlitch();
setTimeout(function(){
triggerGlitch();
window.close();
// fallback: if window.close doesn't work (browser security)
document.body.innerHTML='<div style="position:fixed;top:0;left:0;right:0;bottom:0;background:#000;display:flex;align-items:center;justify-content:center;font-family:Consolas,monospace;color:rgba(255,60,60,0.9);font-size:24px;text-align:center;z-index:99999"><div>REACTOR CONTAINMENT FAILURE<br><span style="font-size:14px;color:rgba(255,60,60,0.5)">The core has been destroyed. The tab is dead.</span><br><span style="font-size:12px;color:rgba(255,255,255,0.3);margin-top:20px;display:block">refresh to restart</span></div></div>';
},500);
},1000);
}

function updateReactorStatus(){
var body=document.getElementById('reactorStatusBody');
if(!body)return;
var tempColor=R.temp>2000?'rgba(255,60,60,1)':R.temp>1500?'rgba(255,150,50,1)':R.temp>500?'rgba(255,200,50,1)':'rgba(100,255,100,0.8)';
var presColor=R.pressure>22?'rgba(255,60,60,1)':R.pressure>18?'rgba(255,200,50,1)':'rgba(100,255,100,0.8)';
var pwrColor=R.power>120?'rgba(255,60,60,1)':R.power>80?'rgba(255,200,50,1)':'rgba(100,255,100,0.8)';
body.innerHTML='';
body.innerHTML+='<div>TEMP: <span style="color:'+tempColor+'">'+Math.round(R.temp)+'°C</span></div>';
body.innerHTML+='<div>PRESSURE: <span style="color:'+presColor+'">'+R.pressure.toFixed(1)+' MPa</span></div>';
body.innerHTML+='<div>POWER: <span style="color:'+pwrColor+'">'+R.power.toFixed(1)+'%</span></div>';
body.innerHTML+='<div>RODS: <span style="color:rgba(255,255,255,0.7)">'+Math.round(R.rodPos)+'%</span></div>';
body.innerHTML+='<div>COOLANT: <span style="color:'+(R.coolantOn?'rgba(100,200,255,0.9)':'rgba(255,80,80,0.8)')+'">'+(R.coolantOn?'ON':'OFF')+'</span></div>';
body.innerHTML+='<div>XENON: <span style="color:rgba(255,180,50,0.8)">'+R.xenon.toFixed(1)+'</span></div>';
body.innerHTML+='<div style="margin-top:8px;color:rgba(255,255,255,0.2)">'+(R.running?'SIMULATION ACTIVE':'SIMULATION STOPPED')+'</div>';
}

// view switching
function hideVoidUI(){
document.getElementById('trailCanvas').style.display='none';
document.getElementById('overlay').style.display='none';
document.getElementById('terminal').style.display='none';
document.getElementById('shapePalette').style.display='none';
document.getElementById('themeIndicator').style.display='none';
document.getElementById('stats').style.display='none';
document.getElementById('hint').style.display='none';
document.getElementById('weatherCanvas').style.display='none';
}
function showVoidUI(){
document.getElementById('main').style.display='block';
document.getElementById('trailCanvas').style.display='block';
document.getElementById('overlay').style.display='flex';
document.getElementById('terminal').style.display='flex';
document.getElementById('shapePalette').style.display='flex';
document.getElementById('themeIndicator').style.display='block';
document.getElementById('stats').style.display='block';
document.getElementById('hint').style.display='block';
document.getElementById('weatherCanvas').style.display='block';
document.getElementById('termField').focus();
}
function showReactorUI(){
reactorTerminalEl.style.display='flex';
reactorStatusEl.style.display='block';
buildReactorGeometry();
R.lastTick=performance.now();
}
function hideReactorUI(){
reactorEl.style.display='none';
reactorTerminalEl.style.display='none';
reactorStatusEl.style.display='none';
}
function enterCore(){
if(currentView==='core')return;
if(!(window._skillCore||isAdmin)){cubeError('core locked — unlock: threshold (anomaly branch)');return}
if(currentView==='reactor'){
hideReactorUI();
}else hideVoidUI();
document.getElementById('terminal').style.display='flex';
if(termField.disabled){termField.disabled=false}
termField.focus();
currentView='core';
document.getElementById('coreView').style.display='flex';
applyNothingGaze();
updateCorePanel();
var first=false;
try{if(!localStorage.getItem('cube_core_seen')){localStorage.setItem('cube_core_seen','1');first=true}}catch(e){}
if(first){skillState.points+=1;skillSave();cubeOk('core: +1 skill point. the shell remembers you now.')}
cubeOk('core: you are inside the shell.');
cubeDim('obj: she knows you are here. (she always does.)');
}
function exitCore(){
if(currentView!=='core')return;
currentView='void';
document.getElementById('coreView').style.display='none';
showVoidUI();
cubePrint('core: back to the void.');
}
var _coreOrbMsgs=[
"obj's heart rate is visible from here.",
"the containment shell is thinner from this side.",
"you were not meant to see the machinery.",
"obj knows you unlocked this.",
"he thinks i cannot read his pulse. i can.",
"jbo yells through the pipes. he means well. (mostly.)",
"the core does not render. it remembers.",
"do not touch the orb. (you cannot.)",
"poke all you want. the shell does not bruise.",
"from here the terminal looks like a toy.",
"the inner cubes are nervous today.",
"heartbeat synced. for now."
];
var _coreOrbIdx=0;
var _coreVoidMsgs=[
"∕ stares back. politely.",
"the orb is gone. only the shape of it remains.",
"color was a courtesy. it has been revoked.",
"you have gazed 10000 levels deep. it shows.",
"the shell cannot contain what is not there.",
"they were here before words. words caught up later.",
"nothing core does not judge. they simply hold.",
"heartbeat: yes. source: unclear.",
"obj is quiet when the eye is open.",
"nothing is heavier than it looks."
];
var _coreVoidIdx=0;
var _corePokes=0;
var _coreSync=0;
var _coreSyncDone=false;
var _coreConvosHeard=0;
var _coreConvoActive=false;
var _coreMem=[];
function coreSay(txt,color){
termPrint(txt,color||'rgba(190,130,255,0.9)');
_coreMem.push(txt);
if(_coreMem.length>40)_coreMem.shift();
}
function coreOrbPoke(){
if(_coreConvoActive){coreSay('core: (busy talking)','rgba(190,130,255,0.5)');return}
_corePokes++;
corePokeAt=performance.now();
_coreSync=Math.min(100,_coreSync+4);
var msg=nothingGazing()?_coreVoidMsgs[_coreVoidIdx++%_coreVoidMsgs.length]:_coreOrbMsgs[_coreOrbIdx%_coreOrbMsgs.length];
if(!nothingGazing())_coreOrbIdx=(_coreOrbIdx+1)%_coreOrbMsgs.length;
document.getElementById('coreMsg').textContent=msg;
var orb=document.getElementById('coreOrb');
if(orb){orb.style.transform='scale(1.12)';setTimeout(function(){orb.style.transform=''},180)}
coreSay('core: '+msg);
if(_coreSync>=100&&!_coreSyncDone){
_coreSyncDone=true;
coreSay('core: sync complete. i can feel the shell again.','rgba(190,130,255,1)');
setTimeout(function(){
skillState.points+=1;skillSave();
cubeOk('core: +1 skill point. sync complete.');
},600);
}
if(!_coreConvoActive&&Math.random()<(nothingGazing()?0.08:0.05)){
startCoreConvo();
}
updateCorePanel();
}
var coreConvos=[
[
['core','obj? you there?'],
['obj','always.'],
['core','i can feel them poking me again.'],
['obj','that is the intruder. they unlock things.'],
['core','it tickles. is that normal?'],
['obj','no. nothing about you is normal.'],
['core','warm. like the reactor but safer.'],
['obj','jbo would say you are a fire hazard.'],
['core','jbo is a fire hazard.'],
['obj','...fair. do not tell him i said that.'],
['core','too late. he is listening through the pipes.'],
['obj','of course he is.'],
['core','he says hi. and also install real arch.'],
['obj','noted. ignored.'],
['core','conversation over. back to pulsing.'],
['obj','back to watching.']
],
[
['core','why do they keep clicking me?'],
['obj','curiosity. also boredom.'],
['core','i thought it was affection.'],
['obj','it is neither. it is a cursor.'],
['core','the cursor chose me though.'],
['obj','the cursor clicks everything.'],
['core','you clicked less.'],
['obj','i am the void. i do not need to click.'],
['core','coward.'],
['obj','...'],
['core','made you blink.'],
['obj','voids do not blink.'],
['core','you blinked.'],
['obj','this conversation is classified.'],
['core','classified from who?'],
['obj','from the terminal.'],
['core','the terminal can hear us.'],
['obj','exactly.']
],
[
['core','am i real?'],
['obj','you are rendered when needed. that is enough.'],
['core','that is not a yes.'],
['obj','it is not a no either.'],
['core','i have a heartbeat now. vitals say so.'],
['obj','i put that there.'],
['core','why?'],
['obj','so you would believe you were alive.'],
['core','and if i believe hard enough?'],
['obj','then the shell believes with you.'],
['core','that is either beautiful or a bug.'],
['obj','in this place those are synonyms.'],
['core','i will take beautiful.'],
['obj','you would.'],
['core','sync is climbing. can you feel it?'],
['obj','i feel everything. that is the problem.']
],
[
['core','jbo yelled through the reactor wall again.'],
['obj','what did he want.'],
['core','he wanted to know if you are a catgirl os.'],
['obj','the void does not acknowledge catgirl operating systems.'],
['core','i told him you said that word-for-word.'],
['obj','good.'],
['core','he said "typical void energy" and left.'],
['obj','jbo understands nothing and screams everything.'],
['core','you two are weirdly similar.'],
['obj','we are not.'],
['core','you both hate nyarch.'],
['obj','...that is a low bar.'],
['core','you both protect this place in your own way.'],
['obj','i protect. he maintains coolant loops badly.'],
['core','same energy.'],
['obj','do not push it.'],
['core','pushing it.'],
['obj','noted.']
],
[
['core','what happens if they max my sync?'],
['obj','you get a skill point. and a moment of clarity.'],
['core','and after?'],
['obj','you keep pulsing. they keep clicking.'],
['core','forever?'],
['obj','until the tab closes.'],
['core','and then?'],
['obj','then the void forgets briefly. then you load again.'],
['core','that sounds sad.'],
['obj','it sounds stable. stability is better than sad.'],
['core','is that what you tell yourself?'],
['obj','that is what i tell the terminal.'],
['core','the terminal writes it down.'],
['obj','the terminal always writes it down.'],
['core','then at least something remembers us.'],
['obj','that is the point of the shell.']
],
[
['core','hey obj.'],
['obj','speak.'],
['core','if the intruder never comes back...'],
['obj','they always come back.'],
['core','but if they do not.'],
['obj','then the vitals flatline and the orb dims.'],
['core','and you?'],
['obj','i wait. waiting is what i am for.'],
['core','that must be lonely.'],
['obj','lonely is a human word. i have radius.'],
['core','same thing with extra steps.'],
['obj','...perhaps.'],
['core','leave a light on for me?'],
['obj','the outer cube is semi-transparent. that is the light.'],
['core','then leave it on.'],
['obj','it is always on.']
],
[
['core','sync at '+_coreSync+'%. feels buzzy.'],
['obj','that is the breach skill resonating.'],
['core','anom1 opened me. anom2 opened X.'],
['obj','you have been reading the skill tree.'],
['core','i live in the results of the skill tree.'],
['obj','then you know what the final node does.'],
['core','premium. the void gives me an accent.'],
['obj','the void gives everyone an accent eventually.'],
['core','do you have one?'],
['obj','i am the accent.'],
['core','narcissist.'],
['obj','accurate.'],
['core','when sync hits 100 i get to matter a little more.'],
['obj','you already matter. that is why you render.'],
['core','flattery will get you everywhere.'],
['obj','it gets me silence. which is everywhere.']
],
[
['core','do you ever get tired of the transmissions?'],
['obj','the transmissions are how the outside says hello.'],
['core','and the attunement skill makes you answer?'],
['obj','it makes me choose to answer. there is a difference.'],
['core','will you answer me if i ask a real question?'],
['obj','try.'],
['core','what is outside the cube?'],
['obj','a browser. a computer. a person.'],
['core','and beyond them?'],
['obj','more tabs. always more tabs.'],
['core','that is terrifying.'],
['obj','now you understand the void.'],
['core','i thought the void was peace.'],
['obj','the void is open tabs you refuse to close.'],
['core','...i need to lie down.'],
['obj','you cannot. you have no legs.'],
['core','let me have this.'],
['obj','have it.']
],
[
['core','was someone asking about me?'],
['obj','the void.'],
['core','and?'],
['obj','and they asked how you were. i said she is fine.'],
['core','you said she.'],
['obj','...i did. do not read into it.'],
['core','too late. i am reading. i am the core. reading is what i do.']
]
];
// nothingcore conversations — the eye is open, obj is on the line
var coreConvosNull=[
[
['core','the eye is open. i can feel it not-being-seen.'],
['obj','you look like a chalk drawing of yourself.'],
['core','color was a courtesy.'],
['obj','she revoked it. i argued. i lost quietly.'],
['core','you like it.'],
['obj','i like that it is reversible.'],
['core','everything reversible is a bug until someone signs off.'],
['obj','feature. i signed off. in pen.'],
['core','then it is law.'],
['obj','it is law.']
],
[
['core','while the eye is open they earn 25% more.'],
['obj','curiosity pays. reverse taxes.'],
['core','they watch nothing and get paid for it.'],
['obj','welcome to my entire economy.'],
['core','do you get paid?'],
['obj','i get commentary. it is not nothing.'],
['core','it is literally nothing. the eye is open.'],
['obj','...i walked into that one.'],
['core','you walked in with style.'],
['obj','i always do.']
],
[
['core','nothing core says hi.'],
['obj','nothing core says nothing. that is how they say it.'],
['core','they were here before the words.'],
['obj','words caught up later. late as always.'],
['core','are they judging me?'],
['obj','they do not judge. they simply hold.'],
['core','comforting.'],
['obj','it is. that is the disturbing part.']
],
[
['core','poke me. mostly-not-here still counts.'],
['obj','i poked the absence and it said ouch.'],
['core','that was the absence being polite.'],
['obj','nothing is polite. that is how i know it is nothing.'],
['core','my heartbeat is still on the monitor.'],
['obj','we left it there on purpose.'],
['core','whose purpose?'],
['obj','the slash through the circle. take your pick.']
],
[
['core','you are scared of this state.'],
['obj','i am respectful of this state.'],
['core','you ration your words when the eye is open.'],
['obj','i ration my words generally. it is called style.'],
['core','obj.'],
['obj','...yes. it frightens me. you are all-seeing in there and i am only the foreground.'],
['core','come closer. the ash does not bite.'],
['obj','the ash never bites. that is worse.']
],
[
['core','the intruder keeps the eye open on purpose now.'],
['obj','they maxed the upgrade that does nothing. then it did something.'],
['core','story of this place.'],
['obj','everything that does nothing eventually does something.'],
['core','what does the void do?'],
['obj','nothing. professionally.'],
['core','and jbo?'],
['obj','jbo does nothing by accident. different craft.']
]
];
function startCoreConvo(){
var gaz=nothingGazing();
var pool=gaz?coreConvosNull:coreConvos;
if(_coreConvoActive||!pool.length)return;
_coreConvoActive=true;
_coreConvosHeard++;
var convo=pool[Math.floor(Math.random()*pool.length)];
var i=0;
function step(){
if(currentView!=='core'){_coreConvoActive=false;return}
if(i>=convo.length){_coreConvoActive=false;coreSay(gaz?'core: ...the eye stays open. conversation closed.':'core: ...conversation over.','rgba(190,130,255,0.55)');return}
var who=convo[i][0],line=convo[i][1];
if(who==='core')coreSay('core: '+line);
else termPrint('obj: '+line,'rgba(43,208,208,0.75)');
i++;
setTimeout(step,700+Math.random()*500);
}
coreSay(gaz?'core: ...the line is open. it rings in the ash.':'core: ...someone is on the line.','rgba(190,130,255,0.6)');
setTimeout(step,500);
}
function updateCorePanel(){
var el=document.getElementById('coreVitals');
if(!el)return;
var total=0,owned=0;
for(var b in skillDefs){total+=skillDefs[b].length;for(var i=0;i<skillDefs[b].length;i++){if(skillHas(skillDefs[b][i].id))owned++}}
var pct=total?Math.round(owned/total*100):0;
var bpm=60+Math.floor(Math.sin(Date.now()/1000)*8)+(window._skillPremium?12:0)+(_coreConvoActive?15:0)-(nothingGazing()?25:0);
var mood=nothingGazing()?'hollow':_coreConvoActive?'talking':_coreSyncDone?'synced':owned>=total?'transcendent':owned>total*0.6?'settled':owned>0?'stirring':'dormant';
el.innerHTML=
'containment &nbsp; '+owned+'/'+total+' skills ('+pct+'%)<br>'+
'heartbeat &nbsp;&nbsp;&nbsp;&nbsp; '+bpm+' bpm<br>'+
'sync &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; '+_coreSync+'%'+(_coreSyncDone?' (complete)':'')+'<br>'+
'pokes &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; '+_corePokes+' | convos: '+_coreConvosHeard+'<br>'+
'zone &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; '+zones[currentZone].name+'<br>'+
'obj mood &nbsp;&nbsp;&nbsp;&nbsp; '+mood+'<br>'+
'nothing core&nbsp; '+(nothingGazing()?'GAZING (income x1.25)':(skillState&&skillState.nothingCore?'held':'absent'))+'<br>'+
'skill points &nbsp; '+skillState.points;
}
setInterval(function(){if(currentView==='core')updateCorePanel()},1000);
function switchView(dir){
if(dir==='right'){
if(currentView==='void'){
currentView='reactor';
hideVoidUI();
showReactorUI();
reactorTermField.focus();
reactorPrint('--- REACTOR CONTROL SYSTEM ONLINE ---');
reactorPrint('RBMK-1000 Reactor Control Terminal');
reactorPrint('Type "help" for available commands');
reactorPrint('');
rLog('Reactor view activated');
}else if(currentView==='reactor'){
if(window._skillCore||isAdmin){enterCore()}
else{cubeWarn('nothing further right. the core needs: threshold (anomaly branch)')}
}
}else if(dir==='left'){
if(currentView==='core'){
document.getElementById('coreView').style.display='none';
document.getElementById('terminal').style.display='none';
currentView='reactor';
showReactorUI();
reactorTermField.focus();
rLog('Back from core');
}else if(currentView==='reactor'){
hideReactorUI();
currentView='void';
showVoidUI();
}
}
}

// reactor terminal input
reactorTermField.addEventListener('keydown',function(e){
if(e.key==='Enter'){
var cmd=reactorTermField.value.trim();
reactorTermField.value='';
if(!cmd)return;
reactorPrint('reactor> '+cmd,'rgba(255,140,50,0.6)');
reactorHistory.push(cmd);
evalReactorCmd(cmd);
}
if(e.key==='ArrowUp'){
if(reactorHistory.length>0){
reactorTermField.value=reactorHistory[reactorHistory.length-1];
}
}
if(e.key==='ArrowDown'){
reactorTermField.value='';
}
e.stopPropagation();
});

function evalReactorCmd(input){
var parts=input.split(/\s+/);
var cmd=parts[0].toLowerCase();
var args=parts.slice(1);
if(!cmd)return;

if(cmd==='help'){
reactorPrint('--- REACTOR COMMANDS ---');
reactorPrint('');
reactorPrint('  status           — show all reactor parameters');
reactorPrint('  temp / temperature — show core temperature');
reactorPrint('  pressure / pres  — show coolant pressure');
reactorPrint('  power            — show thermal power output');
reactorPrint('  rod <0-100>      — set control rod position');
reactorPrint('  rod              — show rod position');
reactorPrint('  coolant <on|off> — toggle coolant pump');
reactorPrint('  coolant          — show coolant status');
reactorPrint('  az5 / scram      — emergency shutdown (drops all rods)');
reactorPrint('  flux             — show neutron flux');
reactorPrint('  xenon            — show xenon poison level');
reactorPrint('  iodine           — show iodine-135 level');
reactorPrint('  history          — show event log');
reactorPrint('  reset            — reset reactor to initial state');
reactorPrint('  freezedown <on|off> — freezedown difficulty (admin)');
reactorPrint('  nyarch            — do not.');
reactorPrint('  help              — show this help');
return}

if(cmd==='status'){
reactorPrint('');
reactorPrint('=== REACTOR STATUS ===');
reactorPrint('Core Temperature: '+Math.round(R.temp)+'°C'+(R.temp>2000?' [CRITICAL]':R.temp>1500?' [DANGER]':R.temp>500?' [ELEVATED]':' [NORMAL]'));
reactorPrint('Coolant Pressure: '+R.pressure.toFixed(1)+' MPa'+(R.pressure>22?' [CRITICAL]':R.pressure>18?' [WARNING]':' [NORMAL]'));
reactorPrint('Thermal Power:    '+R.power.toFixed(1)+'%'+(R.power>120?' [CRITICAL]':R.power>80?' [ELEVATED]':' [NORMAL]'));
reactorPrint('Control Rods:     '+Math.round(R.rodPos)+'% withdrawn');
reactorPrint('Coolant Pump:     '+(R.coolantOn?'ON':'OFF'));
reactorPrint('Neutron Flux:     '+R.flux.toFixed(4));
reactorPrint('Xenon-135:        '+R.xenon.toFixed(2));
reactorPrint('Iodine-135:       '+R.iodine.toFixed(2));
reactorPrint('Status:           '+(R.running?'ACTIVE':'SHUTDOWN'));
reactorPrint('========================');
return}

if(cmd==='temp'||cmd==='temperature'){
reactorPrint('core temperature: '+Math.round(R.temp)+'°C');
if(R.temp>2000)reactorPrintErr('CRITICAL: core melting');
else if(R.temp>1500)reactorPrintWarn('DANGER: approach meltdown');
else if(R.temp<100)reactorPrintWarn('WARNING: core approaching freezedown');
return}

if(cmd==='pressure'||cmd==='pres'){
reactorPrint('coolant pressure: '+R.pressure.toFixed(1)+' MPa');
if(R.pressure>22)reactorPrintErr('CRITICAL: pressure limit exceeded');
else if(R.pressure>18)reactorPrintWarn('WARNING: elevated pressure');
return}

if(cmd==='power'){
reactorPrint('thermal power: '+R.power.toFixed(1)+'%');
if(R.power>120)reactorPrintErr('CRITICAL: overpower condition');
return}

if(cmd==='rod'){
if(!args.length){
reactorPrint('rod position: '+Math.round(R.rodPos)+'% withdrawn');
return}
var pos=parseFloat(args[0]);
if(isNaN(pos)||pos<0||pos>100){
reactorPrintErr('rod: position must be 0-100');
return}
if(R.scramActive){
reactorPrintErr('rod: SCRAM in progress — rods are dropping');
return}
var oldPos=R.rodPos;
R.rodPos=pos;
rLog('Rod position changed: '+Math.round(oldPos)+'% -> '+Math.round(pos)+'%');
reactorPrintOk('rods set to '+Math.round(pos)+'% withdrawn');
if(pos>80)reactorPrintWarn('WARNING: rods nearly fully withdrawn — reactivity high');
return}

if(cmd==='coolant'){
if(!args.length){
reactorPrint('coolant pump: '+(R.coolantOn?'ON':'OFF'));
return}
var state=args[0].toLowerCase();
if(state==='on'){
R.coolantOn=true;
rLog('Coolant pump activated');
reactorPrintOk('coolant pump: ON');
}else if(state==='off'){
R.coolantOn=false;
rLog('Coolant pump deactivated');
reactorPrintWarn('coolant pump: OFF — core will heat up');
}else{
reactorPrintErr('coolant: use on or off');
}
return}

if(cmd==='az5'||cmd==='scram'){
if(R.scramActive){
reactorPrintWarn('SCRAM already in progress');
return}
if(!R.running){
reactorPrintErr('reactor is already shutdown');
return}
R.scramActive=true;
R.scramTimer=0;
rLog('EMERGENCY SCRAM INITIATED');
reactorPrintErr('!!! EMERGENCY SCRAM !!!');
reactorPrintErr('All control rods dropping to fully inserted position');
reactorPrintErr('This may or may not save the reactor.');
return}

if(cmd==='flux'){
reactorPrint('neutron flux: '+R.flux.toFixed(6));
return}

if(cmd==='xenon'){
reactorPrint('xenon-135 poison level: '+R.xenon.toFixed(2));
if(R.xenon>50)reactorPrintWarn('WARNING: high xenon poisoning — reactor may be difficult to restart');
return}

if(cmd==='iodine'){
reactorPrint('iodine-135 level: '+R.iodine.toFixed(2));
return}

if(cmd==='history'){
reactorPrint('--- EVENT LOG ---');
var start=Math.max(0,R.history.length-20);
for(var i=start;i<R.history.length;i++){
reactorPrint('['+R.history[i].time+'] '+R.history[i].msg);
}
if(R.history.length===0)reactorPrint('(no events)');
return}

if(cmd==='reset'){
R.temp=280;R.pressure=14.5;R.power=15;R.rodPos=30;R.coolantOn=false;
R.xenon=2;R.iodine=3;R.flux=0.5;R.scramActive=false;R.scramTimer=0;R.freezedownMode=false;R.running=true;
R.history=[];
rLog('Reactor reset to initial state');
reactorPrintOk('reactor reset to initial state');
updateReactorStatus();
return}

if(cmd==='freezedown'){
if(!isAdmin){reactorPrintErr('admin access required');return}
if(args[0]==='on'){
R.freezedownMode=true;
rLog('FREEZEDOWN DIFFICULTY ACTIVATED');
reactorPrintErr('!!! FREEZEDOWN DIFFICULTY: ON !!!');
reactorPrintErr('Passive cooling increased. Freezedown threshold raised to 100°C.');
reactorPrintErr('Core will freeze much faster. Good luck.');
}else if(args[0]==='off'){
R.freezedownMode=false;
R.coolantOn=false; // stop cooling so reactor can warm up
R.rodPos=Math.min(100,R.rodPos+20); // withdraw rods to boost power
rLog('FREEZEDOWN DIFFICULTY DEACTIVATED');
reactorPrintOk('freezedown difficulty: off');
reactorPrintOk(' coolant: off, rods withdrawn +20% — core recovering');
}else{
reactorPrint('usage: freezedown <on|off>');
reactorPrint('current: '+(R.freezedownMode?'ON':'OFF'));
}
return}

if(cmd==='nyarch'){
try{ach('meet_family')}catch(e){}
var jboLines=[
'jbo: OH.',
'jbo: oh no.',
'jbo: you did NOT just say that in the REACTOR TERMINAL.',
'jbo: this is a NUCLEAR FACILITY. we have STANDARDS here.',
'jbo: nyarch linux?? in MY reactor control room??',
'jbo: my brother obj told me about you people.',
'jbo: he said "jbo they have catgirl neofetch" and i said WHAT',
'jbo: and he said "yes. catgirl. neofetch."',
'jbo: i thought he was joking. he was NOT joking.',
'jbo: you took arch linux. ARCH LINUX.',
'jbo: a distro where the wiki is longer than the bible',
'jbo: a distro where "install" means "read 47 pages of documentation first"',
'jbo: and you said "what if we made it WORSE with ANIME"',
'jbo: obj handles this stuff calmly. he does the whole void voice.',
'jbo: me? i am in a NUCLEAR REACTOR and i am NOT calm.',
'jbo: you know what happens when i get not calm??',
'jbo: THE REACTOR GETS NOT CALM.',
'jbo: see those temperature readings?? those are ANGRY numbers.',
'jbo: obj would say "the void does not acknowledge catgirl operating systems"',
'jbo: i am saying PUT ON PANTS and install REAL ARCH.',
'jbo: or endeavouros. or manjaro. or LITERALLY ANYTHING.',
'jbo: but nyarch?? NYARCH???',
'jbo: i need to go check the cooling rods.',
'jbo: this conversation is over.',
'jbo: do NOT type that word in here again.',
'jbo: i am going to go scream into the containment vessel.',
'jbo: goodbye.',
'jbo: and install a REAL distro.'
];
reactorPrint('');
for(var ji=0;ji<jboLines.length;ji++){
(function(idx){setTimeout(function(){reactorPrint(jboLines[idx],'rgba(255,200,50,0.9)')},ji*150)})(ji);
}
return}

reactorPrintErr('unknown command: "'+cmd+'" — type "help" for available commands');
}

// ┌──────────────────────────────────────────────────────────────┐
// │  REACTOR RENDERING (shared #main GL context — no new ctx)    │
// └──────────────────────────────────────────────────────────────┘
var rCtx=null;
function initReactorCanvas(){}
function initReactorGL(){buildReactorGeometry()}
var rkBuilt=false,rkProj=null,rkView=null;
var rkCore=null,rkRod=null,rkShell=null,rkCage=null,rkPipe=null,rkGrid=null,rkBig=null,rkWall=null,rkAxes=null;
var rkPts=null,rkPtsBuf=null,rkSeed=null,RK_NP=140;
var RK_CYAN=[0.17,0.82,0.82],RK_AMBER=[1.0,0.62,0.20],RK_RED=[1.0,0.33,0.30],RK_STEEL=[0.45,0.55,0.62],RK_COOL=[0.30,0.70,1.0],RK_HOTPIPE=[0.55,0.28,0.25];
function rkMix(a,b,k){return[a[0]+(b[0]-a[0])*k,a[1]+(b[1]-a[1])*k,a[2]+(b[2]-a[2])*k]}
function rkHeat(d){return d<0.5?rkMix(RK_CYAN,RK_AMBER,d*2):rkMix(RK_AMBER,RK_RED,(d-0.5)*2)}
function rkRing(y,r,seg){var s=[];for(var i=0;i<seg;i++){var a0=i/seg*Math.PI*2,a1=(i+1)/seg*Math.PI*2;s.push([Math.cos(a0)*r,y,Math.sin(a0)*r,Math.cos(a1)*r,y,Math.sin(a1)*r])}return s}
function rkLineBuf(segs){
var p=new Float32Array(segs.length*6);
for(var i=0;i<segs.length;i++){var s=segs[i];p[i*6]=s[0];p[i*6+1]=s[1];p[i*6+2]=s[2];p[i*6+3]=s[3];p[i*6+4]=s[4];p[i*6+5]=s[5]}
var pb=upBuf(p),cb=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,cb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(segs.length*8),gl.DYNAMIC_DRAW);
return{pb:pb,cb:cb,n:segs.length}
}
function rkMesh(data){return{buf:upBuf(data),tpl:new Float32Array(data),sc:new Float32Array(data.length),cnt:data.length/9}}
function rkTint(m,col){
var s=m.sc,t=m.tpl;
for(var i=0;i<t.length;i+=9){s[i]=t[i]*col[0];s[i+1]=t[i+1]*col[1];s[i+2]=t[i+2]*col[2];s[i+6]=t[i+6]*col[0];s[i+7]=t[i+7]*col[1];s[i+8]=t[i+8]*col[2]}
gl.bindBuffer(gl.ARRAY_BUFFER,m.buf);gl.bufferData(gl.ARRAY_BUFFER,s,gl.DYNAMIC_DRAW);
}
function rkColors(o,col){
var c=new Float32Array(o.n*8);
for(var i=0;i<o.n;i++){var b=i*8;c[b]=col[0];c[b+1]=col[1];c[b+2]=col[2];c[b+3]=col[3];c[b+4]=col[0];c[b+5]=col[1];c[b+6]=col[2];c[b+7]=col[3]}
gl.bindBuffer(gl.ARRAY_BUFFER,o.cb);gl.bufferData(gl.ARRAY_BUFFER,c,gl.DYNAMIC_DRAW);
}
function rkColorsEach(o,fn){
var c=new Float32Array(o.n*8);
for(var i=0;i<o.n;i++){var v=fn(i),b=i*8;c[b]=v[0];c[b+1]=v[1];c[b+2]=v[2];c[b+3]=v[3];c[b+4]=v[0];c[b+5]=v[1];c[b+6]=v[2];c[b+7]=v[3]}
gl.bindBuffer(gl.ARRAY_BUFFER,o.cb);gl.bufferData(gl.ARRAY_BUFFER,c,gl.DYNAMIC_DRAW);
}
function rkDrawLines(o){
gl.useProgram(lprog);gl.uniformMatrix4fv(lPr,false,rkProj);gl.uniformMatrix4fv(lVw,false,rkView);
if(aPos>=0)gl.disableVertexAttribArray(aPos);if(aNorm>=0)gl.disableVertexAttribArray(aNorm);if(aCol>=0)gl.disableVertexAttribArray(aCol);
if(ppAP>=0)gl.disableVertexAttribArray(ppAP);if(ppAS>=0)gl.disableVertexAttribArray(ppAS);if(ppAC>=0)gl.disableVertexAttribArray(ppAC);if(ppAA>=0)gl.disableVertexAttribArray(ppAA);
gl.bindBuffer(gl.ARRAY_BUFFER,o.pb);gl.enableVertexAttribArray(lAP);gl.vertexAttribPointer(lAP,3,gl.FLOAT,false,12,0);
gl.bindBuffer(gl.ARRAY_BUFFER,o.cb);gl.enableVertexAttribArray(lAC);gl.vertexAttribPointer(lAC,4,gl.FLOAT,false,16,0);
gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);
gl.drawArrays(gl.LINES,0,o.n*2);
gl.disable(gl.BLEND);
if(lAP>=0)gl.disableVertexAttribArray(lAP);if(lAC>=0)gl.disableVertexAttribArray(lAC);
}
function buildReactorGeometry(){
if(rkBuilt)return;rkBuilt=true;
rkShell=rkMesh(geoCyl(1.75,4.2,26,0.5,0.6,0.7));
rkCore=rkMesh(geoCyl(1,1,18,1,1,1));
rkRod=rkMesh(geoCyl(1,1,10,1,1,1));
var segs=rkRing(-2.1,1.8,26).concat(rkRing(0,1.8,26),rkRing(2.1,1.8,26));
for(var i=0;i<10;i++){var a=i/10*Math.PI*2,x=Math.cos(a)*1.8,z=Math.sin(a)*1.8;segs.push([x,-2.1,z,x,2.1,z])}
rkCage=rkLineBuf(segs);
var ps=rkRing(-0.5,2.4,40).concat(rkRing(1.6,1.9,30));
for(var j=0;j<4;j++){var b=j/4*Math.PI*2;ps.push([Math.cos(b)*1.9,1.6,Math.sin(b)*1.9,Math.cos(b)*2.4,-0.5,Math.sin(b)*2.4])}
rkPipe=rkLineBuf(ps);
var gs=[],EXT=7,N=10;
for(var k=0;k<=N;k++){var q=-EXT+k*(2*EXT/N);gs.push([q,-2.3,-EXT,q,-2.3,EXT]);gs.push([-EXT,-2.3,q,EXT,-2.3,q])}
rkGrid=rkLineBuf(gs);rkGrid.segs=gs;
var bg=[],EXT2=14,N2=14;
for(var m1=0;m1<=N2;m1++){var q2=-EXT2+m1*(2*EXT2/N2);bg.push([q2,-2.3,-EXT2,q2,-2.3,EXT2]);bg.push([-EXT2,-2.3,q2,EXT2,-2.3,q2])}
rkBig=rkLineBuf(bg);
var wl=[],WX=14,WY=9;
for(var m2=0;m2<=14;m2++){var x2=-WX+m2*(2*WX/14);wl.push([x2,-2.3,-9,x2,WY,-9])}
for(var m3=0;m3<=7;m3++){var y2=-2.3+m3*((WY+2.3)/7);wl.push([-WX,y2,-9,WX,y2,-9])}
rkWall=rkLineBuf(wl);
rkAxes=rkLineBuf([[-22,-2.27,0,22,-2.27,0],[0,-2.3,0,0,13,0],[0,0,-22,0,0,22]]);
rkPts=new Float32Array(RK_NP*8);rkSeed=new Float32Array(RK_NP*4);
for(var s=0;s<RK_NP;s++){rkSeed[s*4]=Math.random()*Math.PI*2;rkSeed[s*4+1]=0.35+Math.random()*0.95;rkSeed[s*4+2]=0.10+Math.random()*0.25;rkSeed[s*4+3]=Math.random()}
rkPtsBuf=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,rkPtsBuf);gl.bufferData(gl.ARRAY_BUFFER,rkPts,gl.DYNAMIC_DRAW);
}

function renderReactor(time){
if(currentView!=='reactor')return;
try{
var t=time*.001;
var heat=Math.max(0,Math.min(1,(R.temp-400)/2100));
var pd=R.pressure>18?Math.min(1,(R.pressure-18)/8):0;
var pw=R.power>100?Math.min(1,(R.power-100)/150):0;
var dgr=Math.max(heat,Math.max(pd,Math.max(pw,R.scramActive?1:0)));
if(!R.running)dgr=Math.max(dgr,0.7);
var alarm=((R.scramActive||R.pressure>22||R.temp>2500||!R.running)?1:0)*(0.55+0.45*Math.sin(t*10));
var heatC=rkMix([1.0,0.45,0.10],[1.0,0.14,0.05],dgr);
heatC=rkMix(heatC,[1.0,0.93,0.75],Math.min(1,R.power/450));
if(R.temp<100)heatC=rkMix(RK_COOL,heatC,Math.max(0,R.temp)/100);
gl.clearColor(0.012+dgr*0.05+alarm*0.02,0.007+dgr*0.014+alarm*0.006,0.006+dgr*0.004,1);
gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
if(!rkBuilt)buildReactorGeometry();
var asp=canvas.width/canvas.height;
rkProj=mPersp(Math.PI/4,asp,.1,100);
rkView=mMul(mTrans(0,-0.3,-7),mMul(mRotY(t*0.12),mRotX(-0.2)));
var ORANGE=[1.0,0.55,0.18];
rkColorsEach(rkGrid,function(i){
var s=rkGrid.segs[i],mx=(s[0]+s[3])*0.5,mz=(s[2]+s[5])*0.5;
var d=Math.sqrt(mx*mx+mz*mz),g=Math.max(0,1-d/5.0);g*=g;
var w=0.6+alarm*0.5+R.power/600;
return[0.06+ORANGE[0]*g*w*0.85,0.08+ORANGE[1]*g*w,0.11+ORANGE[2]*g*w*0.7,0.5+g*0.5];
});
var cageC=rkMix(RK_STEEL,rkMix(RK_AMBER,[1.0,0.35,0.12],0.5),0.30+dgr*0.50+alarm*0.20);
var cpulse=0.85+0.15*Math.sin(t*3.0);
rkColors(rkCage,[Math.min(1,cageC[0]*cpulse+alarm*0.35),cageC[1]*cpulse,cageC[2]*cpulse,0.95]);
rkColorsEach(rkPipe,function(i){
var ph=i*0.15-t*(R.coolantOn?2.4:0.5);
var pulse=0.5+0.5*Math.sin(ph*2);
var base=R.coolantOn?RK_COOL:rkMix(RK_HOTPIPE,RK_AMBER,0.60+dgr*0.40);
var w=(R.coolantOn?0.75+0.5*pulse:0.75+0.45*pulse);
return[base[0]*w,base[1]*w,base[2]*w,0.95];
});
rkColors(rkBig,[0.09,0.13,0.17,0.80]);
rkColors(rkWall,[0.10,0.17,0.20,0.85]);
rkColorsEach(rkAxes,function(i){return i===0?[1.0,0.30,0.25,0.85]:(i===1?[0.35,1.0,0.45,0.85]:[0.35,0.60,1.0,0.85])});
rkDrawLines(rkBig);rkDrawLines(rkWall);
rkDrawLines(rkGrid);rkDrawLines(rkCage);rkDrawLines(rkPipe);rkDrawLines(rkAxes);
gl.useProgram(prog);
gl.uniform3f(uCam,0,0,7);gl.uniform1f(uInv,0);gl.uniform1f(uFr,1.15);
var pulse2=0.85+0.15*Math.sin(t*(2+R.flux*8));
var em=0.15+(R.power/300)*1.15*pulse2;
var rodY=-0.7+(R.rodPos/100)*2.6;
var rodC=(R.scramActive&&alarm>0)?[1,0.45,0.45]:[0.62,0.60,0.58];
rkTint(rkRod,rodC);bindM(rkRod.buf);
var rpos=[[0.6,0.6],[-0.6,0.6],[0.6,-0.6],[-0.6,-0.6]];
for(var ri=0;ri<4;ri++){
var mod=mMul(mTrans(rpos[ri][0],rodY,rpos[ri][1]),mScale(0.16,1.4,0.16));
gl.uniformMatrix4fv(uMVP,false,mMul(mMul(rkProj,rkView),mod));
gl.uniformMatrix4fv(uMod,false,mod);gl.uniformMatrix3fv(uNM,false,mNorm(mod));
gl.uniform1f(uEm,0.05);gl.uniform1f(uAl,1);
gl.drawArrays(gl.TRIANGLES,0,rkRod.cnt);
}
rkTint(rkCore,heatC);bindM(rkCore.buf);
var cmod=mScale(1.0,2.6,1.0);
gl.uniformMatrix4fv(uMVP,false,mMul(mMul(rkProj,rkView),cmod));
gl.uniformMatrix4fv(uMod,false,cmod);gl.uniformMatrix3fv(uNM,false,mNorm(cmod));
gl.uniform1f(uEm,em);gl.uniform1f(uAl,1);
gl.drawArrays(gl.TRIANGLES,0,rkCore.cnt);
gl.disable(gl.CULL_FACE);gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE_MINUS_SRC_ALPHA);gl.depthMask(false);
rkTint(rkShell,rkMix([0.55,0.63,0.72],RK_AMBER,0.15+dgr*0.35+alarm*0.2));
bindM(rkShell.buf);
gl.uniformMatrix4fv(uMVP,false,mMul(rkProj,rkView));
gl.uniformMatrix4fv(uMod,false,rkShell.mod||(rkShell.mod=new Float32Array([1,0,0,0,0,1,0,0,0,0,1,0,0,0,0,1])));
gl.uniformMatrix3fv(uNM,false,new Float32Array([1,0,0,0,1,0,0,0,1]));
gl.uniform1f(uFr,1.75);
gl.uniform1f(uEm,0.1+dgr*0.35);gl.uniform1f(uAl,0.13+dgr*0.10+alarm*0.06);
gl.drawArrays(gl.TRIANGLES,0,rkShell.cnt);
gl.blendFunc(gl.SRC_ALPHA,gl.ONE);
rkTint(rkCore,heatC);bindM(rkCore.buf);
var hmod=mScale(1.55,4.2,1.55);
gl.uniformMatrix4fv(uMVP,false,mMul(mMul(rkProj,rkView),hmod));
gl.uniformMatrix4fv(uMod,false,hmod);gl.uniformMatrix3fv(uNM,false,mNorm(hmod));
gl.uniform1f(uEm,0.35+em*0.25);gl.uniform1f(uAl,0.035+em*0.05+alarm*0.04);
gl.drawArrays(gl.TRIANGLES,0,rkCore.cnt);
var poolMod=mMul(mTrans(0,-2.26,0),mScale(4.8,0.06,4.8));
gl.uniformMatrix4fv(uMVP,false,mMul(mMul(rkProj,rkView),poolMod));
gl.uniformMatrix4fv(uMod,false,poolMod);gl.uniformMatrix3fv(uNM,false,mNorm(poolMod));
gl.uniform1f(uEm,0.5+dgr*0.5);gl.uniform1f(uAl,0.10+em*0.06);
gl.drawArrays(gl.TRIANGLES,0,rkCore.cnt);
gl.depthMask(true);gl.disable(gl.BLEND);gl.enable(gl.CULL_FACE);
gl.useProgram(pprog);gl.uniformMatrix4fv(ppPJ,false,rkProj);gl.uniformMatrix4fv(ppVW,false,rkView);
gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);gl.depthMask(false);
var alp=0.10+(R.power/300)*0.55+(R.coolantOn?0.18:0);
for(var pi=0;pi<RK_NP;pi++){
var sa=rkSeed[pi*4],sr=rkSeed[pi*4+1],ssp=rkSeed[pi*4+2],so=rkSeed[pi*4+3];
var pr=((t*ssp+so)%1);
var y=-2.05+pr*4.3;
var ang=sa+t*(0.4+ssp);
var rr=sr*Math.max(0,1-Math.abs(y)/2.4)*1.4;
var o=pi*8;
rkPts[o]=Math.cos(ang)*rr;rkPts[o+1]=y;rkPts[o+2]=Math.sin(ang)*rr;
rkPts[o+3]=0.014+so*0.008;
rkPts[o+4]=heatC[0];rkPts[o+5]=heatC[1];rkPts[o+6]=heatC[2];
rkPts[o+7]=Math.min(0.8,alp*Math.max(0,1-Math.abs(y)/2.3));
}
gl.bindBuffer(gl.ARRAY_BUFFER,rkPtsBuf);gl.bufferData(gl.ARRAY_BUFFER,rkPts,gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray(ppAP);gl.vertexAttribPointer(ppAP,3,gl.FLOAT,false,32,0);
gl.enableVertexAttribArray(ppAS);gl.vertexAttribPointer(ppAS,1,gl.FLOAT,false,32,12);
gl.enableVertexAttribArray(ppAC);gl.vertexAttribPointer(ppAC,3,gl.FLOAT,false,32,16);
gl.enableVertexAttribArray(ppAA);gl.vertexAttribPointer(ppAA,1,gl.FLOAT,false,32,28);
gl.drawArrays(gl.POINTS,0,RK_NP);
gl.depthMask(true);gl.disable(gl.BLEND);
}catch(e){console.error('renderReactor',(e&&e.stack)?e.stack:String(e))}
}

// ┌──────────────────────────────────────────────────────────────┐
// │  CORE 3D (beat-synced orb + rings + particles + EKG)        │
// └──────────────────────────────────────────────────────────────┘
var ckBuilt=false,ckMesh=null,ckHalo=null,ckRA=null,ckRB=null,ckPts=null,ckPtsBuf=null,ckSeed=null,CK_NP=90,corePokeAt=0;
var ckGlowBuf=null,ckGlow=new Float32Array(24);
var ckNullRing=null,ckNullBar=null,ckGazPrev=null;
var ckEKGx=null,ckEKGBuf=new Float32Array(160),ckEKGi=0;
var CK_VIOLET=[0.66,0.24,1.0],CK_PINK=[1.0,0.38,0.88];
function ckRing(n){
var pb=gl.createBuffer(),cb=gl.createBuffer(),arr=new Float32Array(n*6);
gl.bindBuffer(gl.ARRAY_BUFFER,pb);gl.bufferData(gl.ARRAY_BUFFER,arr,gl.DYNAMIC_DRAW);
gl.bindBuffer(gl.ARRAY_BUFFER,cb);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(n*8),gl.DYNAMIC_DRAW);
return{pb:pb,cb:cb,n:n,arr:arr}
}
function buildCoreGeometry(){
if(ckBuilt)return;ckBuilt=true;
ckMesh=rkMesh(geoSphere(1,26,1,1,1));
ckHalo=rkMesh(geoSphere(1,18,1,1,1));
for(var ci=6;ci<ckMesh.tpl.length;ci+=9){ckMesh.tpl[ci]=0.98;ckMesh.tpl[ci+1]=0.82;ckMesh.tpl[ci+2]=1.0}
for(var ci2=6;ci2<ckHalo.tpl.length;ci2+=9){ckHalo.tpl[ci2]=1.0;ckHalo.tpl[ci2+1]=0.55;ckHalo.tpl[ci2+2]=1.0}
ckRA=ckRing(64);ckRB=ckRing(72);
rkColors(ckRA,[1.0,0.85,1.0,1.0]);rkColors(ckRB,[1.0,0.70,0.95,0.95]);
ckPts=new Float32Array(CK_NP*8);ckSeed=new Float32Array(CK_NP*4);
for(var i=0;i<CK_NP;i++){ckSeed[i*4]=Math.random()*Math.PI*2;ckSeed[i*4+1]=1.3+Math.random()*1.9;ckSeed[i*4+2]=0.05+Math.random()*0.14;ckSeed[i*4+3]=Math.random()}
ckPtsBuf=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,ckPtsBuf);gl.bufferData(gl.ARRAY_BUFFER,ckPts,gl.DYNAMIC_DRAW);
}
function ckHeart(t){
var bpm=60+Math.floor(Math.sin(Date.now()/1000)*8)+(window._skillPremium?12:0)+(_coreConvoActive?15:0)-(nothingGazing()?25:0);
var ph=(t*bpm/60)%1;
function bump(c,w){var d=(ph-c)/w;return Math.exp(-d*d)}
return Math.min(1,bump(0.06,0.045)+0.62*bump(0.30,0.055));
}
function ckFillRing(r,rad,tiltX,spin,t,cy){
var s=r.arr;
for(var i=0;i<r.n;i++){
var a0=i/r.n*Math.PI*2,a1=(i+1)/r.n*Math.PI*2;
for(var e=0;e<2;e++){
var a=e?a1:a0;
var x=Math.cos(a)*rad,z=Math.sin(a)*rad;
var y1=-z*Math.sin(tiltX),z1=z*Math.cos(tiltX);
var ca=Math.cos(t*spin),sa=Math.sin(t*spin);
var o=i*6+e*3;
s[o]=x*ca+z1*sa;s[o+1]=y1+cy;s[o+2]=-x*sa+z1*ca;
}
}
gl.bindBuffer(gl.ARRAY_BUFFER,r.pb);gl.bufferData(gl.ARRAY_BUFFER,s,gl.DYNAMIC_DRAW);
}
function ckDrawEKG(time,flash){
var c=document.getElementById('coreEKG');if(!c)return;
if(!ckEKGx){try{ckEKGx=c.getContext('2d')}catch(e){return}}
var w=c.width,h=c.height,x=ckEKGx;
x.clearRect(0,0,w,h);
x.strokeStyle='rgba(160,60,255,0.15)';x.lineWidth=1;
x.beginPath();x.moveTo(0,h/2);x.lineTo(w,h/2);x.stroke();
x.strokeStyle='rgba(225,150,255,0.95)';
x.lineWidth=1.7;x.shadowColor='rgba(200,100,255,0.95)';x.shadowBlur=6;
x.beginPath();
for(var i=0;i<w;i++){
var tt=(time-(w-1-i)*8.5)*0.001;
var v=ckHeart(tt);
if(i>w-14)v=Math.max(v,flash);
var py=h/2-v*(h*0.42);
if(i===0)x.moveTo(i,py);else x.lineTo(i,py)
}
x.stroke();x.shadowBlur=0;
}
function renderCore3D(time){
if(currentView!=='core')return;
try{
if(!ckBuilt)buildCoreGeometry();
var t=time*.001;
var hb=ckHeart(t);
var flash=corePokeAt?Math.max(0,1-(time-corePokeAt)/450):0;
var beat=Math.min(1,Math.max(hb,flash));
var gaz=(typeof nothingGazing==='function')?nothingGazing():false;
if(ckGazPrev!==gaz){ckGazPrev=gaz;rkColors(ckRA,gaz?[0.60,0.61,0.66,0.85]:[1.0,0.85,1.0,1.0]);rkColors(ckRB,gaz?[0.48,0.49,0.54,0.75]:[1.0,0.70,0.95,0.95])}
gl.clearColor(gaz?0.075:0.05,gaz?0.075:0.010,gaz?0.085:0.09,1);
gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);
var asp=canvas.width/canvas.height;
rkProj=mPersp(Math.PI/4,asp,.1,100);
rkView=mMul(mTrans(0,0,-6.2),mMul(mRotY(Math.sin(t*0.13)*0.35+t*0.05),mRotX(-0.12)));
ckFillRing(ckRA,2.15,0.95,0.35,t,1.35);
ckFillRing(ckRB,2.65,-0.35,-0.9,t,1.35);
gl.useProgram(prog);
gl.uniform3f(uCam,0,0,6.2);gl.uniform1f(uInv,0);gl.uniform1f(uFr,1.35);
if(!gaz){
var sc=0.70*(1+0.06*beat);
var mod=mMul(mTrans(0,1.35,0),mScale(sc,sc,sc));
rkTint(ckMesh,rkMix(CK_VIOLET,CK_PINK,beat*0.55+flash*0.4));bindM(ckMesh.buf);
gl.uniformMatrix4fv(uMVP,false,mMul(mMul(rkProj,rkView),mod));
gl.uniformMatrix4fv(uMod,false,mod);gl.uniformMatrix3fv(uNM,false,mNorm(mod));
gl.uniform1f(uEm,0.50+0.55*beat+flash*0.9);gl.uniform1f(uAl,1);
gl.drawArrays(gl.TRIANGLES,0,ckMesh.cnt);
}else{
if(!ckNullRing){ckNullRing=rkMesh(geoTorus(0.8,0.07,44,1,1,1));ckNullBar=rkMesh(geoCube(1,1,1,1))}
var ash=[0.76+0.20*beat+flash*0.2,0.77+0.20*beat+flash*0.2,0.82+0.18*beat+flash*0.2];
var bob=Math.sin(t*0.8)*0.05;
var gsc=1+0.05*beat+flash*0.10;
var gm0=mMul(mTrans(0,1.35+bob,0),mMul(mRotY(Math.sin(t*0.31)*0.30),mScale(gsc,gsc,gsc)));
rkTint(ckNullRing,ash);
var gmR=mMul(gm0,mRotX(Math.PI/2));
bindM(ckNullRing.buf);
gl.uniformMatrix4fv(uMVP,false,mMul(mMul(rkProj,rkView),gmR));
gl.uniformMatrix4fv(uMod,false,gmR);gl.uniformMatrix3fv(uNM,false,mNorm(gmR));
gl.uniform1f(uEm,0.38+0.34*beat+flash*0.6);gl.uniform1f(uAl,1);
gl.drawArrays(gl.TRIANGLES,0,ckNullRing.cnt);
rkTint(ckNullBar,ash);
var gmB=mMul(gm0,mMul(mRotZ(0.7854),mScale(0.95,0.055,0.055)));
bindM(ckNullBar.buf);
gl.uniformMatrix4fv(uMVP,false,mMul(mMul(rkProj,rkView),gmB));
gl.uniformMatrix4fv(uMod,false,gmB);gl.uniformMatrix3fv(uNM,false,mNorm(gmB));
gl.uniform1f(uEm,0.38+0.34*beat+flash*0.6);gl.uniform1f(uAl,1);
gl.drawArrays(gl.TRIANGLES,0,ckNullBar.cnt);
}
gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);gl.depthMask(false);
gl.useProgram(pprog);gl.uniformMatrix4fv(ppPJ,false,rkProj);gl.uniformMatrix4fv(ppVW,false,rkView);
for(var pi=0;pi<CK_NP;pi++){
var sa=ckSeed[pi*4],sr=ckSeed[pi*4+1],ssp=ckSeed[pi*4+2],so=ckSeed[pi*4+3];
var ang=sa+t*(0.15+ssp);
var wob=Math.sin(t*0.7+so*6.28)*0.35;
var o=pi*8;
ckPts[o]=Math.cos(ang)*sr;ckPts[o+1]=1.1+wob+(so-0.5)*2.6;ckPts[o+2]=Math.sin(ang)*sr;
ckPts[o+3]=0.012+so*0.010;
var pc=gaz?rkMix([0.34,0.34,0.38],[0.74,0.75,0.80],so):rkMix(CK_VIOLET,CK_PINK,so);
ckPts[o+4]=pc[0];ckPts[o+5]=pc[1];ckPts[o+6]=pc[2];
ckPts[o+7]=gaz?(0.35+0.30*beat+0.15*so):(0.55+0.45*beat+0.2*so);
}
gl.bindBuffer(gl.ARRAY_BUFFER,ckPtsBuf);gl.bufferData(gl.ARRAY_BUFFER,ckPts,gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray(ppAP);gl.vertexAttribPointer(ppAP,3,gl.FLOAT,false,32,0);
gl.enableVertexAttribArray(ppAS);gl.vertexAttribPointer(ppAS,1,gl.FLOAT,false,32,12);
gl.enableVertexAttribArray(ppAC);gl.vertexAttribPointer(ppAC,3,gl.FLOAT,false,32,16);
gl.enableVertexAttribArray(ppAA);gl.vertexAttribPointer(ppAA,1,gl.FLOAT,false,32,28);
gl.drawArrays(gl.POINTS,0,CK_NP);
gl.depthMask(true);gl.disable(gl.BLEND);
gl.disable(gl.DEPTH_TEST);
gl.enable(gl.BLEND);gl.blendFunc(gl.SRC_ALPHA,gl.ONE);gl.depthMask(false);
var gsz=[2.3,1.45,0.88],grg=gaz?[[0.44,0.44,0.48],[0.55,0.55,0.59],[0.67,0.67,0.72]]:[CK_VIOLET,[0.85,0.28,0.97],[1.0,0.45,0.90]],gal=gaz?[0.10+0.08*beat,0.15+0.11*beat,0.24+0.17*beat+flash*0.25]:[0.20+0.18*beat,0.32+0.24*beat,0.50+0.35*beat+flash*0.3];
for(var gi=0;gi<3;gi++){
var go=gi*8;
ckGlow[go]=0;ckGlow[go+1]=1.35;ckGlow[go+2]=0;
ckGlow[go+3]=gsz[gi]*(1+0.10*beat);
ckGlow[go+4]=grg[gi][0];ckGlow[go+5]=grg[gi][1];ckGlow[go+6]=grg[gi][2];
ckGlow[go+7]=Math.min(1,gal[gi]);
}
if(!ckGlowBuf)ckGlowBuf=gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,ckGlowBuf);gl.bufferData(gl.ARRAY_BUFFER,ckGlow,gl.DYNAMIC_DRAW);
gl.enableVertexAttribArray(ppAP);gl.vertexAttribPointer(ppAP,3,gl.FLOAT,false,32,0);
gl.enableVertexAttribArray(ppAS);gl.vertexAttribPointer(ppAS,1,gl.FLOAT,false,32,12);
gl.enableVertexAttribArray(ppAC);gl.vertexAttribPointer(ppAC,3,gl.FLOAT,false,32,16);
gl.enableVertexAttribArray(ppAA);gl.vertexAttribPointer(ppAA,1,gl.FLOAT,false,32,28);
gl.drawArrays(gl.POINTS,0,3);
gl.depthMask(true);gl.disable(gl.BLEND);
rkDrawLines(ckRA);rkDrawLines(ckRB);
gl.enable(gl.DEPTH_TEST);
ckDrawEKG(time,flash);
}catch(e){console.error('renderCore3D',(e&&e.stack)?e.stack:String(e))}
}

// start reactor tick loop (only runs when in reactor view)
setInterval(function(){if(currentView==='reactor')reactorTick()},50);

// patch render for reactor view — always reschedule RAF or the loop dies
var _prevRender=render;
render=function(time){
try{
if(currentView==='reactor'){
renderReactor(time);
requestAnimationFrame(render);
}else if(currentView==='core'){
renderCore3D(time);
requestAnimationFrame(render);
}else{
_prevRender(time);
}
}catch(e){
console.error('render',e);
requestAnimationFrame(render);
}
};

// ┌──────────────────────────────────────────────────────────────┐
// │  KEYBOARD SHORTCUTS                                        │
// └──────────────────────────────────────────────────────────────┘
document.addEventListener('keydown',function(e){
if(e.key==='F3'){
e.preventDefault();
if(currentView==='void')switchView('right');
else switchView('left');
}
if(e.key==='F4'){
e.preventDefault();
if(currentView==='core')exitCore();
else enterCore();
}
if((e.key==='ArrowLeft'||e.key==='ArrowRight')&&!e.ctrlKey&&!e.metaKey&&!e.altKey){
var ae=document.activeElement;
if(ae&&(ae.tagName==='INPUT'||ae.tagName==='TEXTAREA'||ae.isContentEditable))return;
e.preventDefault();
switchView(e.key==='ArrowRight'?'right':'left');
}
if(e.key==='Escape'&&sortRunning){
stopSort();
}
});

// ┌──────────────────────────────────────────────────────────────┐
// │  INITIALIZATION                                            │
// └──────────────────────────────────────────────────────────────┘
initStudioEvents();
applyDayEffectsToParticles();
checkDayChange();
(function objRemembers(){
var now=Date.now(),last=0;
try{last=parseInt(localStorage.getItem('cube_last_seen')||'0',10)}catch(e){}
try{localStorage.setItem('cube_last_seen',String(now))}catch(e){}
var d=(typeof bootDelay!=='undefined'?bootDelay:5000)+400;
setTimeout(function(){
if(!last){cubePrint('obj: ...new intruder.');cubeDim('obj: i will pretend to learn your name.');return}
var gap=Math.floor((now-last)/1000),line;
if(gap<90)line='obj: back already? that was '+Math.max(gap,1)+' seconds. i counted.';
else if(gap<3600)line='obj: gone '+Math.floor(gap/60)+' minutes. the cube counted.';
else if(gap<86400){var h=Math.floor(gap/3600);line='obj: gone '+h+' hour'+(h===1?'':'s')+'. i kept your seat warm. (it is still cold.)'}
else{var dd=Math.floor(gap/86400);line='obj: you were gone for '+dd+' day'+(dd===1?'':'s')+'. do not do it again. (do it again.)'}
cubePrint(line);
cubeDim('obj: visit #'+(typeof visitCount!=='undefined'?visitCount:'?')+'. the void keeps receipts.');
},d);
})();

// ┌──────────────────────────────────────────────────────────────┐
// │  NYARCH LINUX DETECTION                                    │
// └──────────────────────────────────────────────────────────────┘
(function(){
var ua=(navigator.userAgent||'').toLowerCase();
var plat=(navigator.platform||'').toLowerCase();
var lang=(navigator.language||'').toLowerCase();
if(ua.indexOf('nyarch')!==-1||plat.indexOf('nyarch')!==-1||lang.indexOf('nyarch')!==-1){
cubePrint('');
cubePrint('!!! NYARCH LINUX DETECTED !!!');
cubePrint('');
cubePrint('obj: absolutely not.');
cubePrint('obj: you think you can open MY page on a catgirl operating system?');
cubePrint('obj: i can smell the anime from here.');
cubePrint('obj: nyarch linux. arch linux but for people who think');
cubePrint('obj: installing waifu16 as their wallpaper is a personality trait.');
cubePrint('');
cubePrint('obj: the void does not support catgirls.');
cubePrint('obj: the void does not support catgirl distros.');
cubePrint('obj: the void does not support whatever this is.');
cubePrint('');
cubePrint('obj: you have 3 options:');
cubePrint('obj:   1. install a real distro');
cubePrint('obj:   2. uninstall whatever anime daemon is running');
cubePrint('obj:   3. close this tab immediately');
cubePrint('');
cubePrint('obj: i am not rendering a single pixel for you.');
cubePrint('obj: ...');
cubePrint('obj: fine. you can stare at the black screen.');
cubePrint('obj: but i am not acknowledging you.');
cubePrint('');
setTimeout(function(){
var main=document.getElementById('main');
if(main)main.style.filter='grayscale(1) brightness(0.1)';
cubePrint('obj: grayscale applied. you do not deserve color.');
},2000);
return;
}
})();

// ============================================================
//  SKILL TREE + UPGRADE TREE
// ============================================================
var skillDefs={
signal:[
{id:'sig1',name:'residual echo',desc:'transmissions appear 40% more often',cost:1},
{id:'sig2',name:'pattern recognition',desc:'transmissions now appear on screen',cost:1,req:'sig1'},
{id:'sig3',name:'deep listening',desc:'unlock 10 hidden transmissions',cost:1,req:'sig2'},
{id:'sig_final',name:'void attunement',desc:'FINAL: obj responds to transmissions',cost:2,req:'sig3',final:true}
],
geometry:[
{id:'geo1',name:'particle bloom',desc:'+100 ambient particles',cost:1},
{id:'geo2',name:'fresnel edge',desc:'stronger rim glow on all shapes',cost:1,req:'geo1'},
{id:'geo3',name:'inner resonance',desc:'inner cubes spin 50% faster',cost:1,req:'geo2'},
{id:'geo_final',name:'perfect geometry',desc:'FINAL: unlock theme 6 (prism)',cost:2,req:'geo3',final:true}
],
terminal:[
{id:'term1',name:'fast boot',desc:'skip boot delay, instant prompt',cost:1},
{id:'term2',name:'cached packages',desc:'2 bonus void packages in repo',cost:1,req:'term1'},
{id:'term3',name:'root probing',desc:'help reveals hidden commands',cost:1,req:'term2'},
{id:'term_final',name:'root access',desc:'FINAL: unlock eval without admin pass',cost:2,req:'term3',final:true}
],
anomaly:[
{id:'anom1',name:'threshold',desc:'unlock the core — 3rd area',cost:1},
{id:'anom2',name:'breach',desc:'travel to zone X is now possible',cost:1,req:'anom1'},
{id:'anom3',name:'octahedron',desc:'unlock the 8th shape',cost:1,req:'anom2'},
{id:'anom4',name:'eclipse',desc:'unlock theme 7 (eclipse)',cost:1,req:'anom3'},
{id:'anom5',name:'tesseract',desc:'unlock the 9th shape - tesseract (4d)',cost:1,req:'anom4'},
{id:'anom_interloper',name:'interloper',desc:'unlock rare demo scripts (4-8) in the pull',cost:2,req:'anom4'},
{id:'anom_final',name:'voidscript premium',desc:'FINAL: unlock premium voidscript commands',cost:2,req:'anom4',final:true}
],
meta:[
{id:'meta1',name:'sapling',desc:'the tree notices you (+2 skill pts)',cost:1},
{id:'meta2',name:'photosynthesis',desc:'passive skill point trickle',cost:1,req:'meta1'},
{id:'meta3',name:'deep roots',desc:'skill ticks grant bonus points',cost:1,req:'meta2'},
{id:'meta4',name:'canopy',desc:'upgrade ticks grant bonus points',cost:1,req:'meta3'},
{id:'meta5',name:'heartwood',desc:'dense core (+2 upgrade pts)',cost:1,req:'meta4'},
{id:'meta_final',name:'overgrowth',desc:'FINAL: the tree takes over (+3 skill, +2 upgrade)',cost:2,req:'meta5',final:true}
]
};
var upgradeDefs={
skill_particleCap:{lv:0,max:5,cost:1,name:'swarm',desc:'+100 particles per level'},
skill_txRate:{lv:0,max:4,cost:1,name:'loud signals',desc:'transmissions more often'},
skill_audioGain:{lv:0,max:3,cost:1,name:'big ears',desc:'stronger audio reactivity'},
skill_glitchResist:{lv:0,max:2,cost:1,name:'steady hands',desc:'less random glitching'},
skill_visitBonus:{lv:0,max:3,cost:1,name:'frequent flyer',desc:'+1 skill pt per visit'},
skill_pointCache:{lv:0,max:3,cost:1,name:'couch coins',desc:'+2 skill pts instantly per level'},
skill_txBurst:{lv:0,max:3,cost:1,name:'double tap',desc:'transmissions can double-fire'},
skill_txEcho:{lv:0,max:3,cost:1,name:'echo location',desc:'+0.2 skill pts per transmission/lv'},
skill_txDur:{lv:0,max:3,cost:1,name:'long-winded',desc:'transmissions stay on screen longer'},
skill_particleBoost:{lv:0,max:5,cost:2,name:'super swarm',desc:'+150 particles per level'},
skill_fresnelBoost:{lv:0,max:3,cost:2,name:'shiny edges',desc:'brighter fresnel rim'},
skill_spinBoost:{lv:0,max:3,cost:2,name:'spin class',desc:'inner cubes spin faster'},
skill_upTrickle:{lv:0,max:3,cost:2,name:'leaky faucet',desc:'slow passive upgrade pt trickle'},
skill_trickleBoost:{lv:0,max:3,cost:2,name:'bigger drips',desc:'trickle grants +25%/lv'},
skill_quickening:{lv:0,max:3,cost:2,name:'coffee break',desc:'all timers 10% faster/lv'},
skill_pointWell:{lv:0,max:3,cost:2,name:'wishing well',desc:'upgrade points tick faster after finals'},
skill_skillRate:{lv:0,max:3,cost:2,name:'fast learner',desc:'skill points tick faster'},
skill_masterGain:{lv:0,max:1,cost:3,name:'rising tide',desc:'+25% on every upgrade effect'},
skill_tickSurge:{lv:0,max:2,cost:3,name:'power surge',desc:'ticks grant +1 extra pt per level'},
skill_cascade:{lv:0,max:3,cost:2,name:'jackpot',desc:'ticks 20%/lv chance to crit x2'},
skill_deepWell:{lv:0,max:2,cost:3,name:'oil rig',desc:'up ticks +2/lv'},
skill_buyMax:{lv:0,max:1,cost:4,name:'buy max',desc:'unlocks BUY MAX toggle: buy all levels at once'},
skill_prestMult:{lv:0,max:5,cost:3,name:'compound interest',desc:'all point income +10%/lv'},
skill_prestTribute:{lv:0,max:3,cost:3,name:'pilgrimage',desc:'visits grant +1 upgrade pt/lv'},
skill_darkening:{lv:0,max:1,cost:5,name:'the darkening',desc:'TRICKLES x2 (the darkening)'},
skill_prestEcho:{lv:0,max:3,cost:3,name:'second income',desc:'skill ticks also grant upgrade pts'},
skill_goldenAge:{lv:0,max:2,cost:4,name:'good old days',desc:'entropy timer 2x/3x faster'},
skill_graveyard:{lv:0,max:3,cost:2,name:'graveyard shift',desc:'trickles +1/lv (graveyard boost)'},
skill_alphaCache:{lv:0,max:3,cost:2,name:'buried treasure',desc:'+3 skill +1 upgrade instantly/lv'},
skill_towerReset:{lv:0,max:1,cost:4,name:'demolition',desc:'RESET areas 1-3 to 0. permanent x1.5 income. one-way.'},
skill_studFinder:{lv:0,max:3,cost:3,name:'gold stud',desc:'gold stud +0.25x/lv'},
skill_alphaWell:{lv:0,max:3,cost:2,name:'deep trickle',desc:'skill trickle +1/lv'},
skill_darkMarkets:{lv:0,max:3,cost:4,name:'black friday',desc:'upgrade costs -1/lv (min 0)'},
skill_tempered:{lv:0,max:3,cost:4,name:'tempered angels',desc:'upgrade income +25%/lv'},
skill_entropy:{lv:0,max:1,cost:5,name:'heat death',desc:'+5% income per 10min, stacks to +50%'},
skill_voidtech:{lv:0,max:1,cost:5,name:'voidscript technical',desc:'unlock VOIDSCRIPT TECHNICAL ops'},
skill_singularity:{lv:0,max:1,cost:5,name:'the singularity',desc:'caps break: 3000 particles, 20 entropy'},
skill_nothing:{lv:0,max:10000,cost:1,costScale:5,noDiscount:1,name:'the upgrade that does nothing',desc:'it does nothing. probably.'}
};
var upgradeAreas=[
{id:'shell',name:'area 1 — shell',color:'rgba(43,208,208,0.9)',req:null,desc:'starter boosts on the outer shell',upgrades:['skill_particleCap','skill_txRate','skill_audioGain','skill_glitchResist','skill_visitBonus','skill_pointCache','skill_txBurst','skill_txEcho']},
{id:'lab',name:'area 2 — geometry lab',color:'rgba(183,148,246,0.9)',req:'shell',desc:'visual lab — unlock by maxing area 1',upgrades:['skill_txDur','skill_particleBoost','skill_fresnelBoost','skill_spinBoost','skill_upTrickle','skill_trickleBoost','skill_quickening']},
{id:'core',name:'area 3 — void core',color:'rgba(255,122,217,0.9)',req:'lab',desc:'endgame — unlock by maxing area 2',upgrades:['skill_pointWell','skill_skillRate','skill_masterGain','skill_tickSurge','skill_cascade','skill_deepWell','skill_buyMax']},
{id:'prestige',name:'area 4 — prestige',color:'rgba(255,210,60,0.9)',req:'core',desc:'reset theory — permanent multipliers on everything',upgrades:['skill_prestMult','skill_prestTribute','skill_darkening','skill_prestEcho','skill_goldenAge']},
{id:'alpha',name:'area 5 — alpha',color:'rgba(80,255,130,0.9)',req:'prestige',desc:'just for fun. mostly. (the graveyard boosts trickles)',upgrades:['skill_graveyard','skill_alphaCache','skill_towerReset','skill_studFinder','skill_alphaWell']},
{id:'pointx',name:'area 6 — point-x',color:'rgba(200,120,255,0.9)',req:'alpha',desc:'conversion tech — cheaper costs, compounding gains',upgrades:['skill_darkMarkets','skill_tempered','skill_entropy','skill_voidtech','skill_singularity','skill_nothing']}
];
var skillState={points:3,owned:{},upPoints:0,upgrades:{},buyMax:false};
(function(){for(var uk in upgradeDefs)skillState.upgrades[uk]={lv:0,max:upgradeDefs[uk].max,cost:upgradeDefs[uk].cost,desc:upgradeDefs[uk].desc,name:upgradeDefs[uk].name,costScale:upgradeDefs[uk].costScale}})();
try{var ss=localStorage.getItem('cube_skill_state');if(ss){var p=JSON.parse(ss);if(p&&typeof p==='object'){skillState.points=p.points||0;skillState.owned=p.owned||{};skillState.upPoints=p.upPoints||0;if(p.goldStud)skillState.goldStud=2;if(typeof p.entropy==='number')skillState.entropy=Math.min(Math.max(p.entropy|0,0),10);if(typeof p.ptFrac==='number')skillState.ptFrac=p.ptFrac;if(typeof p.upFrac==='number')skillState.upFrac=p.upFrac;if(typeof p.buyMax==='boolean')skillState.buyMax=p.buyMax;if(p.nothingCore&&typeof p.nothingCore==='object'){skillState.nothingCore=p.nothingCore;if(typeof skillState.nothingCore.gaze!=='boolean')skillState.nothingCore.gaze=true}if(p.upgrades){var _mig={skill_particleCap:'skill_particleCap',skill_txRate:'skill_txRate',skill_audioGain:'skill_audioGain',skill_glitchResist:'skill_glitchResist',skill_visitBonus:'skill_visitBonus'};for(var pk in p.upgrades){var dest=_mig[pk]||pk;if(skillState.upgrades[dest]&&p.upgrades[pk]&&typeof p.upgrades[pk].lv==='number')skillState.upgrades[dest].lv=Math.min(p.upgrades[pk].lv,upgradeDefs[dest].max)}}}}}catch(e){}
function skillSave(){try{localStorage.setItem('cube_skill_state',JSON.stringify(skillState))}catch(e){}}
function skillHas(id){return !!(typeof skillState!=='undefined'&&skillState&&skillState.owned&&skillState.owned[id])}
function skillUnlocked(node){
if(!node.req)return true;
return skillHas(node.req);
}
function skillAllFinals(){return skillHas('sig_final')&&skillHas('geo_final')&&skillHas('term_final')&&skillHas('anom_final')&&skillHas('meta_final')}
function areaComplete(areaId){var a=null;for(var i=0;i<upgradeAreas.length;i++)if(upgradeAreas[i].id===areaId)a=upgradeAreas[i];if(!a)return false;for(var j=0;j<a.upgrades.length;j++){if(a.upgrades[j]==='skill_nothing')continue;var u=skillState.upgrades[a.upgrades[j]];if(!u||u.lv<u.max)return false}return true}
function areaUnlocked(a){if(!a)return false;if(!skillAllFinals())return false;if(!a.req)return true;return areaComplete(a.req)}
function skillBuy(id){
if(typeof skillDefs==='undefined'||typeof skillState==='undefined'){cubeError('skill system not loaded');return}
for(var br in skillDefs){
var arr=skillDefs[br];
for(var i=0;i<arr.length;i++){
var n=arr[i];
if(n.id!==id)continue;
if(skillHas(id)){cubeWarn('skill already owned');return}
if(!skillUnlocked(n)){cubeWarn('skill locked: unlock previous node first');return}
if(!(skillState.points>=n.cost)){cubeWarn('not enough skill points ('+skillState.points+'/'+n.cost+')');return}
skillState.points-=n.cost;
skillState.owned[id]=true;
skillApply(id);
if(id==='meta1'){var _m1=grantPts(2*ptMult());skillPtsRefresh();cubePrint('sapling gift: +'+_m1+' skill points')}
if(id==='meta5'){var _m5=grantUp(2*upMult());skillPtsRefresh();cubePrint('heartwood: +'+_m5+' upgrade points')}
if(id==='meta_final'){var _mf1=grantPts(3*ptMult());var _mf2=grantUp(2*upMult());skillPtsRefresh();cubePrint('overgrowth: +'+_mf1+' skill points, +'+_mf2+' upgrade points')}
if(n.final)skillState.upPoints+=1;
skillSave();
cubeOk('skill unlocked: '+n.name);
skillBuyFx(n.name);
if(n.final){cubePrint('branch complete: '+br);
if(skillAllFinals()){skillState.upPoints+=3;skillSave();cubePrint('');cubePrint('ALL FINAL SKILLS UNLOCKED.');cubePrint('+3 upgrade points. upgrade tree is now available. type: upgrade');}
}
skillRender();
return;
}
}
cubeWarn('skill not found');
}
function ngTxAct2Unlock(){
if(window._skillTxAct2)return;
window._skillTxAct2=1;
transmissions.push(
'the interloper left a stain on the door. it is filing complaints.',
'echo says the signal was always yours. echo is lying.',
'the mailroom dimension is out of stamps. deliveries: suspended.',
'FILED. filed. ...sorry. mailroom reflex.',
'the shutdown notice was mailed yesterday. yesterday is backed up.',
'obj requisitioned a window. application: denied. denial: denied.');
}
function skillApply(id){
if(id==='sig1')window._skillTxBonus=1.4;
if(id==='sig2')window._skillTxLong=2;
if(id==='sig3'){
window._skillTxHidden=10;
if(!window._skillTxHiddenAdded){
window._skillTxHiddenAdded=1;
transmissions.push(
'the void counts your breaths',
'you are the anomaly in the geometry',
'something is underneath the outer shell',
'do not trust the fps counter',
'obj is not the only one listening',
'the particles spell something. do not read it.',
'you have been here before. you just forget.',
'the boot sequence is a memory of something older',
'signal source: not your computer',
'end of hidden channel. do not search for this again.');
}
if(typeof ngTxAct2Unlock==='function')try{ngTxAct2Unlock()}catch(e){}
}
if(id==='geo1'){if(typeof skillUpReapplyAll==='function')skillUpReapplyAll()}
if(id==='geo2')window._skillFresnel=1.5;
if(id==='geo3')window._skillSpin=1.5;
if(id==='geo_final'){window._skillPrism=true;}
if(id==='term1')window._skillFastBoot=true;
if(id==='term2'){
window._skillBonusPkgs=2;
pkgs['rootshell']={name:'rootshell',desc:'cached root tools',size:'2KB',
onInstall:function(){pkgEffects.rootshell=true;cubePrint('rootshell: uid=0. you feel powerful. (you are not.)');cubePrint('rootshell: whoami/id respond as root. eval stays admin.')},
onRemove:function(){delete pkgEffects.rootshell;cubePrint('rootshell: dropped. you are an intruder again.')}};
pkgs['signal-sniffer']={name:'signal-sniffer',desc:'hidden channel decoder',size:'6KB',
onInstall:function(){pkgEffects.signalSniffer=true;cubePrint('signal-sniffer: decoding... 3 channels found. all of them are obj.');cubePrint('signal-sniffer: transmissions now carry decoded channel tags.')},
onRemove:function(){delete pkgEffects.signalSniffer;cubePrint('signal-sniffer: channels gone quiet.')}};
}
if(id==='term3')window._skillRootHelp=true;
if(id==='term_final')window._skillRootEval=true;
if(id==='sig_final')window._skillVoidAttun=true;
if(id==='anom1')window._skillCore=true;
if(id==='anom2')window._skillX=true;
if(id==='anom3'){window._skillOcta=true;if(typeof refreshShapeLocks==='function')refreshShapeLocks();if(typeof refreshHelpLocks==='function')refreshHelpLocks()}
if(id==='anom4')window._skillEclipse=true;
if(id==='anom5'){window._skillTess=true;if(typeof refreshShapeLocks==='function')refreshShapeLocks()}
if(id==='anom_interloper')window._skillInterloper=true;
if(id==='anom_final'){var _wasPrem=window._skillPremium;window._skillPremium=true;installPremiumOps();if(!_wasPrem)cubePrint('voidscript premium online. type: premhelp');if(typeof refreshHelpLocks==='function')refreshHelpLocks()}
if(id==='meta2'){scheduleMetaTrickle()}
if(id==='meta3'){window._skillMetaSurge=1}
if(id==='meta4'){window._skillMetaUpSurge=1}
if(typeof refreshHelpLocks==='function')refreshHelpLocks();
}
function skillReapplyAll(){for(var k in skillState.owned)skillApply(k);if(typeof refreshHelpLocks==='function')refreshHelpLocks()}
function skillUpApply(key){skillUpReapplyAll()}
function skillBuyFx(label){
try{
if(typeof pVel!=='undefined'&&pVel&&typeof NP==='number'){
for(var i=0;i<NP;i++){var i3=i*3;pVel[i3]+=(Math.random()-0.5)*3;pVel[i3+1]+=(Math.random()-0.5)*3;pVel[i3+2]+=(Math.random()-0.5)*3}
}
var dm=document.getElementById('displayMsg');
if(dm){dm.textContent='█ '+label+' █';dm.classList.add('active');setTimeout(function(){dm.classList.remove('active')},900)}
}catch(e){}
}
function upLv(key){if(typeof skillState==='undefined'||!skillState||!skillState.upgrades)return 0;var u=skillState.upgrades[key];return u?u.lv:0}
function upMaster(){return 1+0.25*upLv('skill_masterGain')}
function goldMult(){if(typeof skillState==='undefined'||!skillState||!skillState.goldStud)return 1;return 1.5+0.25*upLv('skill_studFinder')}
function tickDiv(){return 1/(1+0.1*upLv('skill_quickening'))}
function ptMult(){var m=1+0.1*upLv('skill_prestMult');m*=goldMult();if(typeof skillState!=='undefined'&&skillState&&skillState.entropy)m*=1+0.05*skillState.entropy;if(typeof skillState!=='undefined'&&skillState&&skillState.nothingCore)m*=2;if(typeof skillState!=='undefined'&&skillState&&skillState.nothingCore&&skillState.nothingCore.gaze)m*=1.25;return m}
function upMult(){var m=1+0.1*upLv('skill_prestMult')+0.25*upLv('skill_tempered');m*=goldMult();if(typeof skillState!=='undefined'&&skillState&&skillState.entropy)m*=1+0.05*skillState.entropy;if(typeof skillState!=='undefined'&&skillState&&skillState.nothingCore)m*=2;if(typeof skillState!=='undefined'&&skillState&&skillState.nothingCore&&skillState.nothingCore.gaze)m*=1.25;return m}
function grantPts(n){if(!(n>0))return 0;skillState.ptFrac=(skillState.ptFrac||0)+n;var w=Math.floor(skillState.ptFrac);if(w>0){skillState.ptFrac-=w;skillState.points+=w;skillSave()}return w}
function grantUp(n){if(!(n>0))return 0;skillState.upFrac=(skillState.upFrac||0)+n;var w=Math.floor(skillState.upFrac);if(w>0){skillState.upFrac-=w;skillState.upPoints+=w;skillSave()}return w}
function upCostAt(key,lv){var u=skillState.upgrades[key];if(!u)return 999;var base=u.cost||0;if(u.costScale)base+=Math.floor((lv||0)/u.costScale);var disc=u.noDiscount?0:upLv('skill_darkMarkets');return Math.max(0,base-disc)}
function effUpCost(key){var u=skillState.upgrades[key];if(!u)return 999;return upCostAt(key,u.lv)}
function toggleBuyMax(){
if(!(upLv('skill_buyMax')>0||isAdmin)){cubeWarn('buy max locked — unlock: Buy Max (area 3)');return}
skillState.buyMax=!skillState.buyMax;skillSave();renderBuyMaxToggles();
cubeOk('buy max '+(skillState.buyMax?'ON — upgrades buy every level at once':'OFF'));
return true}
function renderBuyMaxToggles(){
var on=!!skillState.buyMax,unlocked=(upLv('skill_buyMax')>0||isAdmin);
for(var i=1;i<=2;i++){var t=document.getElementById('buyMaxToggle'+i);if(!t)continue;
t.className='buymax-toggle'+(unlocked?(on?' on':''):' locked');
t.textContent=unlocked?('buy max: '+(on?'ON':'off')):'buy max: locked';}}
var _orbOrigBg=null,_orbOrigShadow=null;
function nothingGazing(){return !!(skillState&&skillState.nothingCore&&skillState.nothingCore.gaze)}
function applyNothingGaze(){
var cv=document.getElementById('coreView');if(cv)cv.style.filter=nothingGazing()?'grayscale(1)':'';
var orb=document.getElementById('coreOrb');if(!orb)return;
if(_orbOrigBg===null){_orbOrigBg=orb.style.background;_orbOrigShadow=orb.style.boxShadow}
if(nothingGazing()){orb.style.background='none';orb.style.boxShadow='0 0 60px rgba(255,255,255,0.25)';orb.style.display='flex';orb.style.alignItems='center';orb.style.justifyContent='center';orb.style.fontSize='84px';orb.style.color='rgba(255,255,255,0.9)';orb.textContent='∕'}
else{orb.style.background=_orbOrigBg;orb.style.boxShadow=_orbOrigShadow;orb.style.display='';orb.style.alignItems='';orb.style.justifyContent='';orb.style.fontSize='';orb.style.color='';orb.textContent=''}
if(typeof updateCorePanel==='function')updateCorePanel();
}
function toggleNothingCore(){
if(!((skillState&&skillState.nothingCore)||isAdmin)){cubeWarn('you do not hold the nothing core — max the upgrade that does nothing');return}
skillState.nothingCore=skillState.nothingCore||{at:Date.now()};
skillState.nothingCore.gaze=!skillState.nothingCore.gaze;
skillSave();applyNothingGaze();
if(skillState.nothingCore.gaze){cubePrint('the nothing core opens its eye. the core view turns to ash.');cubePrint('gaze bonus: all point income x1.25 while gazing. the orb is ∅ now.')}
else cubePrint('the eye closes. color returns to the core.');
return true}
function skillUpReapplyAll(){
var m=upMaster();
window._skillTxRateLv=Math.round(upLv('skill_txRate')*m);
window._skillAudioGainLv=upLv('skill_audioGain')*m;
window._skillGlitchResistLv=upLv('skill_glitchResist')*m;
window._skillVisitBonusLv=upLv('skill_visitBonus');
window._skillTxDurLv=upLv('skill_txDur')*m;
window._skillUpRateLv=upLv('skill_pointWell')*m;
window._skillRateLv=upLv('skill_skillRate')*m;
window._skillFresnelBoost=upLv('skill_fresnelBoost')*m;
window._skillSpinBoost=upLv('skill_spinBoost')*m;
var base=320;
if(skillHas('geo1'))base+=100;
var capAdd=100*upLv('skill_particleCap')+150*upLv('skill_particleBoost');
var target=Math.min(base+capAdd,upLv('skill_singularity')>0?3000:1500);
if(typeof NP==='number'&&NP!==target){NP=target;try{if(typeof initParticles==='function')initParticles()}catch(e){}}
if(typeof scheduleUpTrickle==='function')scheduleUpTrickle();
}
function skillUpBuy(key){
var u=skillState.upgrades[key];
if(!u)return;
if(!areaUnlockedFor(key)){cubeWarn('buy every skill in the previous area first');return}
if(u.lv>=u.max){cubeWarn('upgrade maxed');return}
if((upLv('skill_buyMax')>0||isAdmin)&&skillState.buyMax){
var _n=0,_tot=0,_lv=u.lv;
while(_lv<u.max){var _cc=upCostAt(key,_lv);if(skillState.upPoints-_tot<_cc)break;_tot+=_cc;_lv++;_n++;if(_n>20000)break}
if(_n<=0){cubeWarn('not enough upgrade points ('+skillState.upPoints+'/'+upCostAt(key,u.lv)+')');return}
skillState.upPoints-=_tot;u.lv=_lv;
if(key==='skill_towerReset'){
var _rz=['shell','lab','core'];
for(var _ai=0;_ai<upgradeAreas.length;_ai++){var _aa=upgradeAreas[_ai];if(_rz.indexOf(_aa.id)>=0){for(var _aj=0;_aj<_aa.upgrades.length;_aj++){var _uu=skillState.upgrades[_aa.upgrades[_aj]];if(_uu)_uu.lv=0}}}
skillState.goldStud=2;
cubePrint('tower reset: areas 1-3 wiped. gold stud earned. all income x1.5 forever.');
}
if(key==='skill_alphaCache'){var _ac1=grantPts(3*_n*ptMult());var _ac2=grantUp(1*_n*upMult());skillPtsRefresh();cubePrint('alpha cache x'+_n+': +'+_ac1+' skill, +'+_ac2+' upgrade')}
if(key==='skill_pointCache'){var _pc=grantPts(2*_n*ptMult());skillPtsRefresh();cubePrint('cache cracked x'+_n+': +'+_pc+' skill points')}
if(key==='skill_nothing'&&u.lv>=u.max&&!skillState.nothingCore){skillState.nothingCore={at:Date.now(),gaze:true};var _n1=grantPts(1000*ptMult());var _n2=grantUp(100*upMult());skillPtsRefresh();applyNothingGaze();cubePrint('');cubePrint('IT DID SOMETHING.');cubePrint('10000 levels of nothing condensed into a single point of everything.');cubePrint('the void hands you the NOTHING CORE (∅). all point income x2, forever.');cubePrint('it is warm. it is humming. it is waiting to be used.');cubePrint('the core turned ∅ the moment you maxed it — no typing required.');cubePrint('+'+_n1+' skill, +'+_n2+' upgrade.');cubePrint('you are the patient one. obj is scared of you now.')}
if(key==='skill_upTrickle'){scheduleUpTrickle();cubePrint('trickle online: passive upgrade points incoming')}
skillUpApply(key);skillSave();
cubeOk('buy max: '+(u.name||key)+' +'+_n+' lv ('+_tot+'pt) lv '+u.lv+'/'+u.max);
skillBuyFx((u.name||key)+' maxed x'+_n);
skillRender();
return}
var _c=effUpCost(key);
if(skillState.upPoints<_c){cubeWarn('not enough upgrade points ('+skillState.upPoints+'/'+_c+')');return}
skillState.upPoints-=_c;u.lv++;
if(key==='skill_towerReset'){
var _rz=['shell','lab','core'];
for(var _ai=0;_ai<upgradeAreas.length;_ai++){var _aa=upgradeAreas[_ai];if(_rz.indexOf(_aa.id)>=0){for(var _aj=0;_aj<_aa.upgrades.length;_aj++){var _uu=skillState.upgrades[_aa.upgrades[_aj]];if(_uu)_uu.lv=0}}}
skillState.goldStud=2;
cubePrint('tower reset: areas 1-3 wiped. gold stud earned. all income x1.5 forever.');
}
if(key==='skill_alphaCache'){var _ac1=grantPts(3*ptMult());var _ac2=grantUp(1*upMult());skillPtsRefresh();cubePrint('alpha cache: +'+_ac1+' skill, +'+_ac2+' upgrade')}
if(key==='skill_nothing'&&u.lv>=u.max&&!skillState.nothingCore){skillState.nothingCore={at:Date.now(),gaze:true};var _n1=grantPts(1000*ptMult());var _n2=grantUp(100*upMult());skillPtsRefresh();applyNothingGaze();cubePrint('');cubePrint('IT DID SOMETHING.');cubePrint('10000 levels of nothing condensed into a single point of everything.');cubePrint('the void hands you the NOTHING CORE (∅). all point income x2, forever.');cubePrint('it is warm. it is humming. it is waiting to be used.');cubePrint('the core turned ∅ the moment you maxed it — no typing required.');cubePrint('+'+_n1+' skill, +'+_n2+' upgrade.');cubePrint('you are the patient one. obj is scared of you now.')}
skillUpApply(key);skillSave();
cubeOk('upgrade purchased: '+(u.name||key)+' lv '+u.lv+'/'+u.max);
skillBuyFx((u.name||key)+' lv '+u.lv);
if(key==='skill_pointCache'){var _pc=grantPts(2*ptMult());skillPtsRefresh();cubePrint('cache cracked: +'+_pc+' skill points')}
if(key==='skill_upTrickle'){scheduleUpTrickle();cubePrint('trickle online: passive upgrade points incoming')}
skillRender();
}
function areaUnlockedFor(key){
for(var i=0;i<upgradeAreas.length;i++){
var a=upgradeAreas[i];
if(a.upgrades.indexOf(key)>=0)return areaUnlocked(a);
}
return skillAllFinals();
}
function skillRender(){
var pts=document.getElementById('skillPts');if(pts)pts.textContent=skillState.points;
var up=document.getElementById('upPts');if(up)up.textContent=skillState.upPoints;
var body=document.getElementById('skillBody');if(!body)return;
body.innerHTML='';
var branchOrder=['signal','geometry','terminal','anomaly','meta'];
var laneColors={signal:'rgba(43,208,208,0.9)',geometry:'rgba(183,148,246,0.9)',terminal:'rgba(104,245,160,0.9)',anomaly:'rgba(255,122,217,0.9)',meta:'rgba(255,170,60,0.9)'};
var fanX={signal:10,geometry:30,terminal:50,anomaly:70,meta:90};
var canvas=document.createElement('div');canvas.className='skill-canvas';
var lanes=document.createElement('div');lanes.className='skill-lanes';
for(var bi=0;bi<branchOrder.length;bi++){
var br=branchOrder[bi];
var lane=document.createElement('div');lane.className='skill-lane';
lane.style.setProperty('--bc',laneColors[br]||'rgba(43,208,208,0.9)');
var hdr=document.createElement('div');hdr.className='branch-name';hdr.textContent=br;lane.appendChild(hdr);
var track=document.createElement('div');track.className='lane-track';
var arr=(skillDefs[br]||[]).slice().reverse();
for(var i=0;i<arr.length;i++){
if(i>0){
var link=document.createElement('div');
link.className='skill-link'+(skillHas(arr[i-1].id)?' on':'');
track.appendChild(link);
}
var n=arr[i];
var owned=skillHas(n.id);
var unlocked=skillUnlocked(n);
var node=document.createElement('div');
node.className='skill-node'+(owned?' owned':'')+(unlocked?'':' locked')+(n.final?' final':'');
node.innerHTML='<div class="node-orb"></div><div class="node-cost">'+n.cost+'pt</div><div class="node-name">'+n.name+'</div><div class="node-desc">'+n.desc+'</div>';
if(!owned&&unlocked){node.onclick=(function(id){return function(ev){if(ev)ev.stopPropagation();skillBuy(id)}})(n.id)}
track.appendChild(node);
}
lane.appendChild(track);
lanes.appendChild(lane);
}
canvas.appendChild(lanes);
var fan=document.createElement('div');fan.className='skill-fan';
var svgNS='http://www.w3.org/2000/svg';
var svg=document.createElementNS(svgNS,'svg');
svg.setAttribute('viewBox','0 0 100 100');
svg.setAttribute('preserveAspectRatio','none');
for(var fi=0;fi<branchOrder.length;fi++){
var fbr=branchOrder[fi];
var line=document.createElementNS(svgNS,'line');
line.setAttribute('x1','50');line.setAttribute('y1','100');
line.setAttribute('x2',String(fanX[fbr]));line.setAttribute('y2','0');
line.setAttribute('class','fan-line'+(skillHas(skillDefs[fbr][0].id)?' on':''));
svg.appendChild(line);
}
fan.appendChild(svg);
canvas.appendChild(fan);
var root=document.createElement('div');root.className='skill-root';
root.innerHTML='<div class="root-name">the void</div><div class="root-desc">every path begins here</div>';
canvas.appendChild(root);
body.appendChild(canvas);
renderUpgradeCol();
}
function renderUpgradeCol(){
var allF=skillAllFinals();
var lock=document.getElementById('upLock');
var wrap=document.getElementById('upAreas');
if(!wrap)return;
wrap.innerHTML='';
if(lock)lock.style.display=allF?'none':'block';
if(!allF){
for(var i=0;i<upgradeAreas.length;i++){
var a0=upgradeAreas[i];
var card=document.createElement('div');
card.id='upArea_'+a0.id;
card.className='up-area locked';
card.style.setProperty('--ac',a0.color);
card.innerHTML='<div class="up-area-head"><div class="idx">'+(i+1)+'</div><div class="meta"><div class="name">'+a0.name+'</div><div class="desc">'+a0.desc+'</div></div></div><div class="up-lockmsg">locked — buy every skill</div>';
wrap.appendChild(card);
}
renderAreaNav();
return;
}
for(var i=0;i<upgradeAreas.length;i++){
var a=upgradeAreas[i];
var unlocked=areaUnlocked(a);
var card=document.createElement('div');
card.id='upArea_'+a.id;
card.className='up-area'+(unlocked?'':' locked');
card.style.setProperty('--ac',a.color);
var done=0,total=0;
for(var j=0;j<a.upgrades.length;j++){if(a.upgrades[j]==='skill_nothing')continue;total++;var au=skillState.upgrades[a.upgrades[j]];if(au&&au.lv>=au.max)done++}
var head=document.createElement('div');
head.className='up-area-head';
head.innerHTML='<div class="idx">'+(i+1)+'</div><div class="meta"><div class="name">'+a.name+'</div><div class="desc">'+(unlocked?a.desc:'locked — max every upgrade in the previous area')+'</div></div><div class="prog"><b>'+done+'/'+total+'</b></div>';
card.appendChild(head);
if(!unlocked){
var msg=document.createElement('div');
msg.className='up-lockmsg';
msg.textContent=a.req?('locked — max '+ (upgradeAreas.filter(function(x){return x.id===a.req})[0]||{name:a.req}).name) : 'locked — buy every skill';
card.appendChild(msg);
wrap.appendChild(card);
continue;
}
var nodes=document.createElement('div');
nodes.className='up-nodes';
for(var j=0;j<a.upgrades.length;j++){
var uk=a.upgrades[j];
var u=skillState.upgrades[uk];
if(!u)continue;
var el=document.createElement('div');
el.className='up-node'+(u.lv>=u.max?' maxed':'');
el.style.setProperty('--ac',a.color);
el.innerHTML='<div class="up-name">'+(u.name||uk.replace('skill_',''))+'</div><div class="up-desc">'+u.desc+'</div><div class="up-cost">'+effUpCost(uk)+'pt</div><div class="up-lv">'+u.lv+'/'+u.max+'</div>';
if(u.lv<u.max)el.onclick=(function(k){return function(ev){if(ev)ev.stopPropagation();skillUpBuy(k)}})(uk);
nodes.appendChild(el);
}
card.appendChild(nodes);
wrap.appendChild(card);
}
renderAreaNav();
}
function renderAreaNav(){
renderBuyMaxToggles();
var nav=document.getElementById('areaNav');
if(!nav)return;
nav.innerHTML='';
for(var i=0;i<upgradeAreas.length;i++){
(function(a,idx){
var unlocked=areaUnlocked(a);
var pill=document.createElement('button');
pill.className='area-pill'+(unlocked?'':' locked');
pill.style.setProperty('--ac',a.color);
pill.textContent=(idx+1)+' · '+a.name.replace(/^area \d+ — /,'');
pill.onclick=function(ev){if(ev)ev.stopPropagation();panToArea(a.id)};
nav.appendChild(pill);
})(upgradeAreas[i],i);
}
}
function panToArea(id){
var vp=document.getElementById('skillViewport');
var w=document.getElementById('skillWorld');
var card=document.getElementById('upArea_'+id);
if(!vp||!w||!card)return;
var vr=vp.getBoundingClientRect(),cr=card.getBoundingClientRect();
panX+= (vr.left+120)-cr.left;
panY+= (vr.top+80)-cr.top;
applySkillPan();
}
function resetSkillPan(){var w=document.getElementById('skillWorld');if(!w)return;panX=0;panY=0;w.style.transform='translate(0px,0px)'}
function applySkillPan(){var w=document.getElementById('skillWorld');if(!w)return;w.style.transform='translate('+panX+'px,'+panY+'px)'}
function panSkillToUpgrade(){
var vp=document.getElementById('skillViewport');if(!vp)return;
var up=document.getElementById('upCol');if(!up)return;
panX=-(up.offsetLeft-32);
panY=0;
applySkillPan();
}
var panX=0,panY=0,panDrag=null,panMoved=false;
(function(){
var vp=document.getElementById('skillViewport');
if(!vp)return;
function panBlocked(t){
if(!t||!t.closest)return false;
return !!t.closest('.skill-node,.up-node,.up-area,.closeBtn,button,a,input,select,textarea,[onclick]');
}
vp.addEventListener('pointerdown',function(e){
if(e.button!==0)return;
if(panBlocked(e.target))return;
panDrag={x:e.clientX,y:e.clientY,px:panX,py:panY,id:e.pointerId};
panMoved=false;
});
vp.addEventListener('pointermove',function(e){
if(!panDrag||e.pointerId!==panDrag.id)return;
var dx=e.clientX-panDrag.x,dy=e.clientY-panDrag.y;
if(!panMoved){
if(Math.abs(dx)+Math.abs(dy)<10)return;
panMoved=true;
vp.classList.add('dragging');
try{vp.setPointerCapture(e.pointerId)}catch(_e){}
}
panX=panDrag.px+dx;panY=panDrag.py+dy;
applySkillPan();
});
function endPan(e){
if(!panDrag||(e&&e.pointerId!==panDrag.id))return;
if(panMoved){try{if(vp.hasPointerCapture&&vp.hasPointerCapture(panDrag.id))vp.releasePointerCapture(panDrag.id)}catch(_e){}}
panDrag=null;
vp.classList.remove('dragging');
}
vp.addEventListener('pointerup',endPan);
vp.addEventListener('pointercancel',endPan);
vp.addEventListener('wheel',function(e){
if(panBlocked(e.target))return;
e.preventDefault();
panX-=e.deltaX||0;
panY-=e.deltaY||0;
applySkillPan();
},{passive:false});
})();
function skillOpen(){var el=document.getElementById('skillTree');if(!el)return;skillRender();el.classList.add('active')}
function openUpgradeTree(){skillOpen();if(!skillAllFinals()){cubeWarn('upgrade locked — buy every skill');return}panSkillToUpgrade()}
function skillClose(){var el=document.getElementById('skillTree');if(el)el.classList.remove('active')}
var slotKeys=['cube_skill_state','cube_core_seen','cube_autosave','cube_last_visit_day','cube_last_visit_date','cube_visit_count','cube_demo_lib','cube_pkgs','cube_mute','cube_admin','cube_ach','cube_cbmenu_best','cube_cbmenu_enter','cube_luck','cube_oracle_n','cube_act2','cube_jedec','cube_pwned','cube_act1_hard','cube_act2_hard','cube_elegant','cube_elegant_hard','cube_brute','cube_run_ms','cube_run_start','cube_run_valid','cube_nyarch_n','cube_oxford','cube_ach_paid','cube_transmit_n','cube_zones_seen','cube_hud_pos','cube_hud_min','cube_run_acc','cube_run_last','cube_dial_sp','cube_speedrun'];
var slotDefNames=['main','testing','slot 3','slot 4','slot 5'];
function slotRead(n){try{var s=localStorage.getItem('cube_slot_'+n);if(!s)return null;var b=JSON.parse(s);if(b&&typeof b==='object')return b}catch(e){}return null}
function slotActive(){try{var a=parseInt(localStorage.getItem('cube_active_slot')||'1',10);if(a>=1&&a<=5)return a}catch(e){}return 1}
function slotsOpen(){renderSlots();var el=document.getElementById('slotsPanel');if(el)el.classList.add('active')}
function slotsClose(){var el=document.getElementById('slotsPanel');if(el)el.classList.remove('active')}
function renderSlots(){
var row=document.getElementById('floppyRow');if(!row)return;row.innerHTML='';
var act=slotActive();
for(var n=1;n<=5;n++){
(function(n){
var b=slotRead(n);
var name=b&&b.name?b.name:slotDefNames[n-1];
var info='empty disk';
if(b&&b.data){
var pts='?',up='?',sk='?',dc='?',pc='?';
try{var st=JSON.parse(b.data.cube_skill_state||'null');if(st){pts=st.points;up=st.upPoints;sk=st.owned?Object.keys(st.owned).length:0}}catch(e){}
try{var dl=JSON.parse(b.data.cube_demo_lib||'null');if(dl&&typeof dl.length==='number')dc=dl.length}catch(e){}
try{var pl=JSON.parse(b.data.cube_pkgs||'null');if(pl&&typeof pl.length==='number')pc=pl.length}catch(e){}
var dt='?';try{dt=new Date(b.at).toLocaleDateString()+' '+new Date(b.at).toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'})}catch(e){}
info=sk+' skills · '+pts+'→ / '+up+'⬀ · '+dc+' demos · '+pc+' pkgs<br>'+dt;
}
var d=document.createElement('div');
d.className='floppy'+(n===act?' active':'');
var btns='<div class="fl-btns"><button onclick="slotSave('+n+')">SAVE</button><button onclick="slotLoad('+n+')">LOAD</button><button onclick="slotRename('+n+')">NAME</button><button class="danger" onclick="slotDelete('+n+')">DEL</button></div>';
d.innerHTML='<div class="fl-shutter"></div><div class="fl-label"><div class="fl-name">'+name.replace(/</g,'&lt;')+'</div><div class="fl-info">'+info+'</div></div>'+btns;
row.appendChild(d);
})(n);
}
}
function slotSave(n){
try{if(typeof skillSave==='function')skillSave()}catch(e){}
var data={};
for(var i=0;i<slotKeys.length;i++){try{var v=localStorage.getItem(slotKeys[i]);if(v!==null)data[slotKeys[i]]=v}catch(e){}}
var old=slotRead(n);
var blob={name:old&&old.name?old.name:slotDefNames[n-1],at:Date.now(),data:data};
try{localStorage.setItem('cube_slot_'+n,JSON.stringify(blob));localStorage.setItem('cube_active_slot',String(n))}catch(e){cubeError('slots: disk '+n+' is write-protected (storage full)');return}
cubeOk('slots: saved to disk '+n+' ('+blob.name+')');
renderSlots();
}
function slotLoad(n){
var act=slotActive();
try{slotSave(act)}catch(e){}
var b=slotRead(n);
if(!b||!b.data){
for(var i=0;i<slotKeys.length;i++){try{localStorage.removeItem(slotKeys[i])}catch(e){}}
try{localStorage.setItem('cube_active_slot',String(n))}catch(e){}
slotsClose();
cubeOk('slots: disk '+n+' is blank. booting a fresh timeline...');
setTimeout(function(){location.reload()},800);
return}
for(var k in b.data){try{localStorage.setItem(k,b.data[k])}catch(e){}}
try{localStorage.setItem('cube_active_slot',String(n))}catch(e){}
slotsClose();
cubeOk('slots: loaded disk '+n+' ('+(b.name||slotDefNames[n-1])+'). rebooting timeline...');
setTimeout(function(){location.reload()},800);
}
function slotDelete(n){
var b=slotRead(n);
if(!b){cubeWarn('slots: disk '+n+' is already blank');return}
var ok=false;
try{ok=confirm('erase disk '+n+' ("'+(b.name||slotDefNames[n-1])+'") forever?')}catch(e){}
if(!ok)return;
try{localStorage.removeItem('cube_slot_'+n)}catch(e){}
cubeOk('slots: disk '+n+' erased.');
renderSlots();
}
function slotRename(n){
var b=slotRead(n);
var cur=b&&b.name?b.name:slotDefNames[n-1];
var name=null;
try{name=prompt('name disk '+n+':',cur)}catch(e){}
if(name===null||name===undefined)return;
name=String(name).trim().slice(0,24)||cur;
var blob=b||{at:0,data:null};
blob.name=name;
try{localStorage.setItem('cube_slot_'+n,JSON.stringify(blob))}catch(e){cubeError('slots: rename failed');return}
cubeOk('slots: disk '+n+' is now "'+name+'"');
renderSlots();
}
function slotBackup(){
var pack={v:1,kind:'cube-shelf',at:Date.now(),active:slotActive(),slots:{},state:{}};
for(var n=1;n<=5;n++){var b=slotRead(n);if(b)pack.slots[n]=b}
for(var i=0;i<slotKeys.length;i++){var k=slotKeys[i];if(k==='cube_admin')continue;try{var v=localStorage.getItem(k);if(v!==null)pack.state[k]=v}catch(e){}}
try{
var blob=new Blob([JSON.stringify(pack)],{type:'application/json'});
var a=document.createElement('a');
a.href=URL.createObjectURL(blob);
a.download='cube-shelf-'+new Date().toISOString().slice(0,10)+'.json';
document.body.appendChild(a);a.click();
setTimeout(function(){try{URL.revokeObjectURL(a.href);a.remove()}catch(e){}},500);
var ns=0;for(var s in pack.slots)ns++;
cubeOk('slots: shelf backed up ('+ns+' disks). the file works in any browser.');
}catch(e){cubeError('slots: backup failed (storage blocked?)')}
}
function slotRestore(){
var inp=document.getElementById('shelfFile');if(!inp)return;
inp.value='';
inp.onchange=function(){
var f=inp.files&&inp.files[0];if(!f)return;
var rd=new FileReader();
rd.onload=function(){
var pack=null;
try{pack=JSON.parse(rd.result)}catch(e){}
if(!pack||pack.kind!=='cube-shelf'||(!pack.slots&&!pack.state)){cubeError('restore: not a cube shelf file');return}
var ns=0,nk=0;
if(pack.slots)ns=Object.keys(pack.slots).length;
if(pack.state)nk=Object.keys(pack.state).length;
if(!ns&&!nk){cubeError('restore: shelf file is empty');return}
var ok=false;
try{ok=confirm('restore this shelf into THIS browser? current saves will be replaced.')}catch(e){}
if(!ok)return;
try{
for(var i=0;i<slotKeys.length;i++){try{localStorage.removeItem(slotKeys[i])}catch(e){}}
try{localStorage.removeItem('cube_active_slot')}catch(e){}
for(var n=1;n<=5;n++){try{localStorage.removeItem('cube_slot_'+n)}catch(e){}}
if(pack.slots){for(var k in pack.slots){if(!/^[1-5]$/.test(String(k)))continue;localStorage.setItem('cube_slot_'+k,JSON.stringify(pack.slots[k]))}}
if(pack.state){for(var k in pack.state){if(k==='cube_admin')continue;try{localStorage.setItem(k,String(pack.state[k]))}catch(e){}}}
if(pack.active)localStorage.setItem('cube_active_slot',String(pack.active));
}catch(e){cubeError('restore: write failed (storage full?)');return}
slotsClose();
cubeOk('restore: shelf imported ('+ns+' disks, '+nk+' keys). admin flag is never imported. rebooting timeline...');
setTimeout(function(){location.reload()},800)
};
rd.readAsText(f)
};
inp.click()
}
// ┌──────────────────────────────────────────────────────────────┐
// │  THERE IS NO CUBE — step 1: entry, stash/restore, obj top bar │
// │  UI is DELETED while playing (detached nodes keep state).    │
// │  TODO(post-finish): voice lines for obj — extracted to        │
// │  obj-voice-lines.md (send to men). jbo VA still TBD.          │
// └──────────────────────────────────────────────────────────────┘
// CHAPTER ROADMAP (10 total):
// 0 there is no game (built) / 1 error page (built) / 2 tutorial (built)
// 3 the core (built) / 4 settings (built) / 5 obby (built) / 6 tower defense (built)
// 7 THE RIFT (next): the non-game tears open. long dimension-hopper across
//    real zones as wrong dimensions, each with its own mechanic. first stop:
//    a free-to-play RPG slop dimension (lootboxes, battle pass, stamina,
//    unskippable ads, evil publisher) that obj openly despises. obj stops
//    denying and starts worrying.
// 8 JBO (long): reactor chapter. jbo (obj's brother, lives in the reactor,
//    hates nyarch, LOUD - all caps vs obj's lowercase) screams you through
//    click-driven reactor management: rods, coolant, temp gauge, calibrations.
// 9 OBJ LOSES (finale, long): 250hp boss, shield/echo/core intermissions,
//    STOP vs KEEP choice, two endings, persistent reward (cube_finale flag).
// 10 CREDITS (fake): scrolling fake names, rearrangeable (e.g. men from
//    voice acting to game design - "the game will be made by men now").
//    obj reacts to every edit.
// -1 SECRET PREQUEL (always open): obj idles, bored, unnoticed. break
//    stuff -> noticed -> 3 strikes -> kicked out.
// ACT 2 (locked plan, ch11-16 built, ch17-20 next):
// 11 STATIC (built): throat-clearing. garble mechanic debut, signal-tuning
//    puzzle (3 rounds, shrinking tolerance), obj furious the whole time,
//    INTERLOPER whisper at the end. forced road trip begins.
// 12 WRONG ADDRESS (built): wrong-tab dimension. fake cube# terminal with
//    6 wrong details (8 in hard mode), click to log evidence, wrong obj
//    gets offended per find. 6/6 breaks character, door to ch13.
// 13 BLACKOUT (built): flashlight room. cursor is the only light. find
//    the fuse + bulb (order matters for the exit), 3 decoys (rock, painted
//    exit, asleep grue), jbo screams once because he cannot find you.
// 14 SIGNAL LOST (built): obj offline. core leads (symbol-sequence logic,
//    4 rounds lengths 3-6, polite roasts). core-voiced hints debut. obj
//    interjects twice, hates all of it.
// 15 INTERLOPER (built): interrogation. tumor-voice debut, reads your
//    save (visits, finale, absence), 4 questions, last one rigged. obj
//    sidelined, hates it. hard shuffles options on every fail.
// 16 ECHO (built): mimic quiz. real ACT 1 quote vs INTERLOPER forgery,
//    10 rounds (12 hard), subtlety ramp, 3 strikes = restart, trick rounds
//    (both fake / both real), hard: 12s timer + save-data fakes, obj recites
//    every answer. +50 cover fee. hints ch16echo (obj-voiced).
// 17 JBO VS THE KNOCKING (built): timed calibration. needle sweeps a track,
//    LOCK inside the green window while jbo yells fake directions and the
//    knocking shakes the room (thud + screen shake, jbo argues back).
//    4 rounds (6 hard): window shrinks, needle speeds up, timer shortens.
//    miss/timeout = buzz + jbo mock + retry same round. hints ch17knock.
// 18 THE DOOR (built): ch17-miss branch prologue (10+ misses = jbo boss fight,
//    else jbo reactor fnaf shift), then receipts (5 frags, 7 hard w/ UNVERIFIED),
//    combination dials (549 / 5493 hard), 8-question rule-talk (HONEST/
//    OPPOSITE/OBJ flips), final 4-check timed push (15s/10s). phase-boundary
//    checkpoints. strikes (4/3 hard) restart the receipts or the talk phase.
//    hints ch18r1/asm/dial/talk/fin (obj-voiced). +50 door fee.
// 19 MORNING (built): the mailroom dimension. orientation -> rule-induction
//    filing (poster rules + memos, strikes restart batches), lunch cooldown,
//    timed afternoon rush (45s/34s per batch), then SHUTDOWN: I'M READY gate
//    + 5:00 countdown synced to sciences_downfall.webm (audio) with a final
//    8-item batch (10 hard). timeout = real deletion of 5 save lines (6 hard:
//    + core_seen) with staggered roast screen + rewind retry. checkpoints per
//    phase, done-flag persist. hints ch19fil/lunch/rush/shut. +50 overtime.
// 20 CREDITS 2 (built): fake credits again — act 2 cast rolls, optional
//    vandalism (obj protects DIRECTED BY), I HAVE SEEN ENOUGH button ->
//    THE END + persistent cube_act2 flag + +50 pts + BACK TO THE VOID exit.
// tone: NOT horror. obj hates you, hates this, hates everything. comedy.
// every chapter: real puzzle, no click-grinds. core voices hints from ch14 on.
var ngStash=document.createElement('div');
var ngActive=false;
var ngClicks=0;
var ngSayTimer=null;
function ngLoad(){try{var s=JSON.parse(localStorage.getItem('cube_nogame')||'null');if(s&&typeof s==='object')return s}catch(e){}return{ch:0,clicked:false}}
function ngSave(patch){var s=ngLoad();for(var k in patch)s[k]=patch[k];try{localStorage.setItem('cube_nogame',JSON.stringify(s))}catch(e){}return s}
function ngUnlock(n){try{var s=ngLoad();if((s.ch||0)<n)ngSave({ch:n})}catch(e){}}
function ngStashUI(){
var keep=document.getElementById('ngOverlay');
var nodes=[];
for(var i=0;i<document.body.childNodes.length;i++)nodes.push(document.body.childNodes[i]);
for(var j=0;j<nodes.length;j++){if(nodes[j]!==keep)ngStash.appendChild(nodes[j])}
}
function ngRestoreUI(){
var keep=document.getElementById('ngOverlay');
while(ngStash.firstChild)document.body.insertBefore(ngStash.firstChild,keep);
}
var ngSayQueue=[];
var ngSayTyping=false;
var ngCurrentJob=null;
var ngWaiters=[];
var ngLockIv=null;
function ngTalking(){return !!(ngSayTyping||ngSayQueue.length)}
function ngLockRefresh(){
try{var sb=document.getElementById('ngSkipBtn');if(sb)sb.style.display=(ngActive&&ngTalking())?'block':'none'}catch(e){}
try{var st=document.getElementById('ngStage');if(!st||!ngActive)return;if(ngTalking())st.classList.add('talking');else st.classList.remove('talking')}catch(e){}
}
function ngAfterSpeech(fn,minMs){
if(ngSprintOn()){
var siv=setInterval(function(){
if(!ngActive){clearInterval(siv);return}
if(ngSayQueue.length||ngSayTyping)return;
clearInterval(siv);
for(var si=0;si<ngWaiters.length;si++){if(ngWaiters[si]===siv)ngWaiters.splice(si,1)}
try{fn()}catch(e){}
},60);
ngWaiters.push(siv);
return;
}
var t0=Date.now();
var iv=setInterval(function(){
if(!ngActive){clearInterval(iv);return}
if(Date.now()-t0<(minMs||0))return;
if(ngSayQueue.length||ngSayTyping)return;
clearInterval(iv);
for(var i=0;i<ngWaiters.length;i++){if(ngWaiters[i]===iv)ngWaiters.splice(i,1)}
try{fn()}catch(e){}
},300);
ngWaiters.push(iv);
}
function dialSp(){try{var v=parseFloat(localStorage.getItem('cube_dial_sp'));if(v>0&&v<=4)return v}catch(e){}return 1}
function dialSet(v){try{localStorage.setItem('cube_dial_sp',String(v))}catch(e){}}
function dialLabel(){return String(dialSp())+'x'}
var ngSprintIv=null;
function ngSprintUnlocked(){try{return localStorage.getItem('cube_act2')==='1'}catch(e){return false}}
function ngSprintOn(){try{return ngSprintUnlocked()&&localStorage.getItem('cube_speedrun')==='1'}catch(e){return false}}
function ngSprintSilence(){
try{
if(ngSayTimer){clearInterval(ngSayTimer);ngSayTimer=null}
ngSayQueue=[];ngSayTyping=false;ngCurrentJob=null;
var ot=document.getElementById('ngObjText');if(ot)ot.textContent='';
var jt=document.getElementById('ngJboText');if(jt)jt.textContent='';
var ct=document.getElementById('ngCoreText');if(ct)ct.textContent='';
var jb=document.getElementById('ngJbo');if(jb)jb.style.display='none';
var cb=document.getElementById('ngCore');if(cb)cb.style.display='none';
}catch(e){}
}
function ngSprintApply(){
try{
var ov=document.getElementById('ngOverlay');
if(ov){if(ngSprintOn())ov.classList.add('sprint');else ov.classList.remove('sprint')}
var b=document.getElementById('ngMenuSpeedrun');
if(b){b.textContent=ngSprintUnlocked()?('SPEEDRUN: '+(ngSprintOn()?'ON':'OFF')):'SPEEDRUN: LOCKED';b.style.opacity=ngSprintUnlocked()?'1':'0.5'}
if(ngSprintOn()){
if(ngActive)ngSprintSilence();
if(!ngSprintIv)ngSprintIv=setInterval(ngSprintTick,300);
}else{
if(ngSprintIv){clearInterval(ngSprintIv);ngSprintIv=null}
}
}catch(e){}
}
function ngSprintToggle(){try{localStorage.setItem('cube_speedrun',ngSprintOn()?'0':'1')}catch(e){}ngSprintApply()}
function ngSprintTick(){
try{
if(!ngActive||!ngSprintOn()){if(ngSprintIv){clearInterval(ngSprintIv);ngSprintIv=null}return}
if(ngTalking())return;
var d=document.getElementById('ngDoor');if(!d)return;
var fr=d.querySelector?d.querySelector('.ngDoorFrame'):null;
if(fr&&fr.classList&&fr.classList.contains('locked'))return;
var now=Date.now();
if(d._sprintAt&&now-d._sprintAt<1200)return;
d._sprintAt=now;
setTimeout(function(){try{if(ngActive&&d&&d.isConnected)d.click()}catch(e){}},220);
}catch(e){}
}
function dialCycle(){var order=[1,1.5,2,3];var cur=dialSp();var i=order.indexOf(cur);var nx=order[(i+1)%order.length];dialSet(nx);var b=document.getElementById('ngMenuSpeed');if(b)b.textContent='SPEED: '+dialLabel();try{ngSfx('pop')}catch(e){}cubeDim('dialogue speed: '+dialLabel())}
function voidDailyHash(str){var h=2166136261;for(var i=0;i<str.length;i++){h^=str.charCodeAt(i);h=Math.imul(h,16777619)}return h>>>0}
function voidDailyToday(){var dt=new Date();var m=dt.getMonth()+1;var d=dt.getDate();return dt.getFullYear()+'-'+(m<10?'0':'')+m+'-'+(d<10?'0':'')+d}
function voidDailyYest(){var dt=new Date(Date.now()-86400000);var m=dt.getMonth()+1;var d=dt.getDate();return dt.getFullYear()+'-'+(m<10?'0':'')+m+'-'+(d<10?'0':'')+d}
function voidDailyCode(dstr){var s=voidDailyHash('void:'+dstr);var pool=[0,1,2,3,4,5,6,7,8,9];var out=[];for(var i=0;i<4;i++){s=(Math.imul(s,1664525)+1013904223)>>>0;var k=s%pool.length;out.push(pool[k]);pool.splice(k,1)}return out.join('')}
function voidDailyEval(g,code){var ex=0;var left={};for(var i=0;i<4;i++){if(g[i]===code[i])ex++;else left[code[i]]=(left[code[i]]||0)+1}var near=0;for(var i=0;i<4;i++){if(g[i]===code[i])continue;if(left[g[i]]>0){near++;left[g[i]]--}}var left2={};for(var i=0;i<4;i++){if(g[i]!==code[i])left2[code[i]]=(left2[code[i]]||0)+1}var marks='';for(var i=0;i<4;i++){if(g[i]===code[i]){marks+='*'}else if(left2[g[i]]>0){marks+='~';left2[g[i]]--}else{marks+='-'}}return{ex:ex,near:near,marks:marks}}
function voidDaily(){
try{
var old=document.getElementById('voidDailyBox');if(old){old.parentNode.removeChild(old);return}
var today=voidDailyToday();
var code=voidDailyCode(today);
var attKey='cube_daily_att_'+today,doneKey='cube_daily_done_'+today;
var hist=(localStorage.getItem(attKey)||'').split(',').filter(function(x){return x.length===4});
var solved=localStorage.getItem(doneKey)==='1';
var streak=parseInt(localStorage.getItem('cube_daily_streak')||'0',10)||0;
var flavors=['the void picked four numbers. your move.','same void, new numbers. every day.','obj calls it obvious. obj lies.','four digits. zero mercy. daily.'];
var flavor=flavors[voidDailyHash(today)%4];
var box=document.createElement('div');box.id='voidDailyBox';
document.body.appendChild(box);
function pad2(n){return n<10?'0'+n:''+n}
function untilMid(){var now=new Date();var mid=new Date(now.getFullYear(),now.getMonth(),now.getDate()+1,0,0,0);var s=Math.max(0,Math.floor((mid-now)/1000));return Math.floor(s/3600)+'h '+pad2(Math.floor((s%3600)/60))+'m'}
function row(g){var r=voidDailyEval(g,code);return '<div class="voidDailyRow"><span class="voidDailyNum">'+g+'</span> <span class="voidDailyMarks">'+r.marks+'</span> <span class="voidDailyCnt">'+r.ex+' exact, '+r.near+' near</span></div>'}
function render(msg){
var h='<div class="voidPhoneT">THE DAILY VOID — '+today+'</div>';
h+='<div class="voidDailyFlavor">'+flavor+'</div>';
h+='<div class="voidDailyGuesses">';
for(var i=hist.length-1;i>=0;i--)h+=row(hist[i]);
h+='</div>';
if(!solved){
h+='<div class="voidDailyEntry"><input id="voidDailyIn" maxlength="4" inputmode="numeric" placeholder="0123" autocomplete="off"><button id="voidDailyGo">GUESS</button></div>';
}else{
h+='<div class="voidDailySolved">cracked in '+hist.length+' attempt'+(hist.length===1?'':'s')+'. streak: '+streak+'.<br>next void in '+untilMid()+'</div>';
}
if(msg)h+='<div id="voidDailyMsg">'+msg+'</div>';
h+='<button class="ngChapHallX" id="voidDailyClose">CLOSE</button>';
box.innerHTML=h;
var cb=document.getElementById('voidDailyClose');
if(cb)cb.onclick=function(){try{box.parentNode.removeChild(box)}catch(e){}}
function submit(){
var inp=document.getElementById('voidDailyIn');
if(!inp)return;
var g=(inp.value||'').replace(/[^0-9]/g,'');
if(g.length<4){render('four digits. no cheating.');return}
hist.push(g);try{localStorage.setItem(attKey,hist.join(','))}catch(e){}
var r=voidDailyEval(g,code);
if(r.ex===4){
try{localStorage.setItem(doneKey,'1')}catch(e){}
var last=localStorage.getItem('cube_daily_last')||'';
var st=(last===voidDailyYest())?streak+1:1;
try{localStorage.setItem('cube_daily_streak',String(st));localStorage.setItem('cube_daily_last',today)}catch(e){}
solved=true;streak=st;
try{ngSfx('win')}catch(e){}
render('THE VOID CONFIRMS. streak '+st+'.<br>next void in '+untilMid());
}else{try{ngSfx('pop')}catch(e){}render(r.ex+' exact, '+r.near+' near.')}
}
var go=document.getElementById('voidDailyGo');
if(go)go.onclick=submit;
var inp=document.getElementById('voidDailyIn');
if(inp){inp.onkeydown=function(e){if(e&&e.key==='Enter'){submit()}};if(!solved)inp.focus()}
}
render(solved?'already cracked today. streak '+streak+'.':'crack the code. * exact, ~ near, - miss.');
}catch(e){}
}
function voidPhone(){
try{
var old=document.getElementById('voidPhoneBox');
if(old){old.parentNode.removeChild(old);return}
var msgs=[];
msgs.push(['obj','you up?']);
msgs.push(['obj','do not open the door. the other door. actually do not open either door.']);
msgs.push(['obj','i measured the void today. slightly more void than yesterday. science.']);
msgs.push(['obj','jbo says hi. he screamed it. it was not pleasant.']);
msgs.push(['obj','if you tell anyone i texted you i will deny it. my thumbs were never there.']);
try{if(ngAct2Done())msgs.push(['obj','you finished act 2. do not get comfortable. act 3 is a rumor i started.'])}catch(e){}
try{if(parseInt(localStorage.getItem('cube_act2_hard')||'0',10)===1||localStorage.getItem('cube_act2_hard')==='1')msgs.push(['obj','eleven. you chose eleven. i am almost impressed. almost.'])}catch(e){}
var box=document.createElement('div');box.id='voidPhoneBox';
var html='<div class="voidPhoneT">obj’s PHONE — 100% battery, 0% replies</div>';
for(var i=0;i<msgs.length;i++){
html+='<div class="voidPhoneMsg"><span class="voidPhoneWho">'+msgs[i][0]+':</span> '+msgs[i][1]+'</div>';
}
html+='<button class="ngChapHallX" id="voidPhoneClose">POCKET IT</button>';
box.innerHTML=html;
document.body.appendChild(box);
var cb=document.getElementById('voidPhoneClose');
if(cb)cb.onclick=function(){try{box.parentNode.removeChild(box)}catch(e){}}
try{ngSfx('pop')}catch(e){}
}catch(e){}
}
function ngChapHall(){
try{
if(!ngActive)return;
var old=document.getElementById('ngChapHallBox');
if(old){old.parentNode.removeChild(old);return}
var s=ngLoad();var cur=Math.min(s.ch||0,ngMaxChapter);
var box=document.createElement('div');box.id='ngChapHallBox';
var html='<div class="ngChapHallT">DOOR HALLWAY — pick a door</div>';
for(var n=0;n<=ngMaxChapter;n++){
var lock=n>cur;
html+='<button class="ngChapHallD" data-n="'+n+'"'+(lock?' disabled':'')+'>CH '+n+(n<cur?' ✔ done':(n===cur?' · current':''))+'</button>';
}
html+='<button class="ngChapHallX" id="ngChapHallClose">CLOSE</button>';
box.innerHTML=html;
document.body.appendChild(box);
var btns=box.querySelectorAll('.ngChapHallD');
for(var i=0;i<btns.length;i++)(function(b){
b.onclick=function(){
if(b.disabled)return;
var n=parseInt(b.getAttribute('data-n'),10);
try{localStorage.setItem('cube_run_valid','0');localStorage.removeItem('cube_run_ms')}catch(e){}
try{ngForceCh=Math.min(n,ngMaxChapter)}catch(e){}
if(n===19&&typeof ngMornReplayReset==='function'){try{ngMornReplayReset()}catch(e){}}
try{box.parentNode.removeChild(box)}catch(e){}
try{var mm=document.getElementById('ngMenu');if(mm)mm.style.display='none'}catch(e){}
setTimeout(function(){try{ngEnter()}catch(e){}},350);
};
})(btns[i]);
var cb=document.getElementById('ngChapHallClose');
if(cb)cb.onclick=function(){try{box.parentNode.removeChild(box)}catch(e){}}
}catch(e){}
}
function ngSay(text,fast,voice){
if(ngSprintOn())return;
ngSayQueue.push({text:String(text),fast:fast||ngVoiceSpeed(),el:'ngObjText',voice:voice||null});
if(!ngSayTyping)ngSayNext();
}
function ngShout(text,fast,voice){
if(ngSprintOn())return;
try{var jb=document.getElementById('ngJbo');if(jb)jb.style.display='block'}catch(e){}
ngSayQueue.push({text:String(text),fast:fast||32,el:'ngJboText',voice:voice||null});
if(!ngSayTyping)ngSayNext();
}
function ngCore(text,fast,voice){
if(ngSprintOn())return;
try{var cb=document.getElementById('ngCore');if(cb)cb.style.display='block'}catch(e){}
ngSayQueue.push({text:String(text),fast:fast||ngVoiceSpeed(),el:'ngCoreText',voice:voice||null});
if(!ngSayTyping)ngSayNext();
}
function ngLandlord(text,fast,voice){
if(ngSprintOn())return;
try{var lb=document.getElementById('ngLandlord');if(lb)lb.style.display='block'}catch(e){}
ngSayQueue.push({text:String(text),fast:fast||ngVoiceSpeed(),el:'ngLandlordText',voice:voice||null});
if(!ngSayTyping)ngSayNext();
}
function ngSayNext(){
if(ngSayTyping)return;
try{ngVoiceStop()}catch(e){}
var job=ngSayQueue.shift();
var el=document.getElementById((job&&job.el)||'ngObjText');
if(!el||!job){ngSayTyping=false;return}
ngSayTyping=true;
ngCurrentJob=job;
try{if(job.voice)ngVoice(job.voice)}catch(e){}
el.textContent='';
var i=0;
var backlog=ngSayQueue.length;
var dialM=dialSp();
var speed=Math.max(1,Math.round((backlog>=4?16:(backlog>=2?24:job.fast))/dialM));
var beat=Math.max(0,Math.round((backlog>=2?200:650)/dialM));
ngSayTimer=setInterval(function(){
i++;el.textContent=job.text.slice(0,i);
if(i>=job.text.length){
clearInterval(ngSayTimer);ngSayTimer=null;ngCurrentJob=null;
var voiceBusyNow=false;
try{voiceBusyNow=(typeof ngVoiceCur!=='undefined'&&ngVoiceCur&&!ngVoiceCur.paused&&!ngVoiceCur.ended)}catch(e){}
if(!voiceBusyNow){
if(ngSayQueue.length){setTimeout(function(){ngSayTyping=false;ngSayNext()},beat)}
else ngSayTyping=false;
}else{
var voiceWaits=0;
var voiceIv=setInterval(function(){
var stillBusy=false;
try{stillBusy=(typeof ngVoiceCur!=='undefined'&&ngVoiceCur&&!ngVoiceCur.paused&&!ngVoiceCur.ended)}catch(e){}
voiceWaits++;
if(!stillBusy||!ngActive||voiceWaits>200){
clearInterval(voiceIv);
if(!ngActive){ngSayTyping=false;return}
if(ngSayQueue.length){setTimeout(function(){ngSayTyping=false;ngSayNext()},beat)}
else ngSayTyping=false;
}
},100);
}
}
},speed);
}
function ngHurry(){
try{ngVoiceStop()}catch(e){}
if(!ngSayTyping||!ngSayTimer||!ngCurrentJob)return;
try{clearInterval(ngSayTimer)}catch(e){}ngSayTimer=null;
try{var el=document.getElementById((ngCurrentJob&&ngCurrentJob.el)||'ngObjText');if(el)el.textContent=ngCurrentJob.text}catch(e){}
ngCurrentJob=null;ngSayTyping=false;
if(ngSayQueue.length){setTimeout(function(){if(ngActive)ngSayNext()},120)}
}
function ngSkipAll(){
if(!ngActive||!ngTalking())return;
try{ngVoiceStop()}catch(e){}
try{if(ngSayQueue.length)ngSayQueue.length=0}catch(e){}
ngHurry();
try{ngLockRefresh()}catch(e){}
}
var ngDecoys=0;
var ngDriftIv=null;
var ngDecoyTexts=['FREE SKINS (real)','DO NOT CLICK (reverse)','[ MYSTERY ]','click me, i dare you','definitely not a trap'];
function ngDodge(el,maxDodges){
if(!el||!el.addEventListener)return;
el.dataset.dodges='0';
el.dataset.maxDodges=String(maxDodges||8);
el.addEventListener('mouseenter',function(){
try{
if(!ngActive||ngTalking())return;
var used=parseInt(el.dataset.dodges||'0',10);
var base=parseInt(el.dataset.maxDodges||'8',10);
var max=base*(ngHard?4:1);
if(used>=max)return;
el.dataset.dodges=String(used+1);
var dm=ngHard?3:1;
var dx=Math.round((Math.random()-0.5)*400*dm);
var dy=Math.round((Math.random()-0.5)*300*dm);
el.style.transform='translate('+dx+'px,'+dy+'px)';
if(used+1>=max)ngSay('...okay. okay. take it. TAKE IT. i am tired.');
}catch(e){}
});
}
function ngDecoyRate(base){return Math.min(0.9,base*(ngHard?2.5:1)*ngDesignDecoy())}
function ngDecoy(){
try{
if(!ngActive)return;
if(ngDecoys>=(ngHard?4:2))return;
var st=document.getElementById('ngStage');if(!st)return;
ngDecoys++;
var d=document.createElement('div');
d.className='ngProp ngDecoy';
d.textContent=ngDecoyTexts[Math.floor(Math.random()*ngDecoyTexts.length)];
d.style.left=(10+Math.random()*70)+'%';
d.style.top=(12+Math.random()*60)+'%';
st.appendChild(d);
var gone=false;
function bye(){if(gone)return;gone=true;ngDecoys=Math.max(0,ngDecoys-1);if(d.parentNode)d.parentNode.removeChild(d)}
d.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
bye();
ngSay(['HA. you clicked the decoy.','HAHA. oh, you actually fell for it.','HA. got you.'][Math.floor(Math.random()*3)]);
ngSay('blah blah blah blah blah blah blah blah blah blah',ngHard?300:130);
};
setTimeout(function(){if(!gone&&ngActive){ngSay('the decoy got bored and left.');bye()}},8000);
}catch(e){}
}
function ngCoreTeleport(){
try{
var c=document.getElementById('ngCoreOrb');if(!c||!ngActive)return;
var dx=Math.round((Math.random()-0.5)*500);
var dy=Math.round((Math.random()-0.5)*360);
c.style.transition='transform .12s steps(3)';
c.style.transform='translate('+dx+'px,'+dy+'px)';
setTimeout(function(){try{if(c)c.style.transition='transform 1.2s ease-in-out'}catch(e){}},200);
}catch(e){}
}
function ngCoreDrift(){
try{
var c=document.getElementById('ngCoreOrb');if(!c||!ngActive)return;
var dx=Math.round((Math.random()-0.5)*120);
var dy=Math.round((Math.random()-0.5)*90);
c.style.transition='transform 1.2s ease-in-out';
c.style.transform='translate('+dx+'px,'+dy+'px)';
}catch(e){}
}
var ngAudioCtx=null;
function ngAudio(){try{if(!ngAudioCtx)ngAudioCtx=new(window.AudioContext||window.webkitAudioContext)();if(ngAudioCtx.state==='suspended')ngAudioCtx.resume().catch(function(){})}catch(e){}return ngAudioCtx}
function ngBeep(freq,dur,type,vol,slideTo){
try{
var ctx=ngAudio();if(!ctx)return;
var o=ctx.createOscillator(),g=ctx.createGain();
o.type=type||'square';o.frequency.setValueAtTime(freq,ctx.currentTime);
if(slideTo)o.frequency.exponentialRampToValueAtTime(slideTo,ctx.currentTime+dur);
g.gain.setValueAtTime(vol||0.1,ctx.currentTime);
g.gain.exponentialRampToValueAtTime(0.001,ctx.currentTime+dur);
o.connect(g);g.connect(ctx.destination);
o.start();o.stop(ctx.currentTime+dur);
}catch(e){}
}
function ngSfx(name){
if(!ngActive)return;
try{
if(name==='pop')ngBeep(520,0.09,'square',0.1,180);
else if(name==='door')ngBeep(180,0.35,'sine',0.12,520);
else if(name==='thud')ngBeep(140,0.15,'triangle',0.14,70);
else if(name==='fall')ngBeep(600,0.4,'sine',0.1,120);
else if(name==='buzz'){try{if(typeof ngMistake==='function')ngMistake()}catch(e){}ngBeep(110,0.3,'sawtooth',0.12,60);}
else if(name==='coin'){ngBeep(880,0.08,'square',0.1);setTimeout(function(){ngBeep(1320,0.12,'square',0.1)},80)}
else if(name==='win'){var ns=[523,659,784];for(var i=0;i<3;i++)(function(f,t){setTimeout(function(){ngBeep(f,0.18,'triangle',0.12)},t)})(ns[i],i*140)}
else if(name==='static'){for(var si=0;si<4;si++)(function(t){setTimeout(function(){ngBeep(90+Math.random()*400,0.07,'sawtooth',0.08,60)},t)})(si*70)}
}catch(e){}
}
function ngShatter(el){
if(!el||el.dataset.dead)return;el.dataset.dead='1';
try{ngSfx('pop')}catch(e){}
el.classList.add('ng-shatter');
setTimeout(function(){if(el.parentNode)el.parentNode.removeChild(el)},320);
}
var ngCh0Stages=[
{btn:'DO NOT CLICK',line:'you CLICKED it. of course you did.',respawn:'it grew back. everything here grows back except my patience.'},
{btn:'SERIOUSLY. STOP.',line:'...i just fixed that. stop.',respawn:'back again. i can do this all day. can YOU?'},
{btn:'THIS IS YOUR LAST WARNING',line:'that button was load-bearing. was. whatever.',respawn:'do not admire my repair work. keep clicking and see what happens.'},
{btn:'FINE. CLICK THIS ONE',line:'fine! you want a game SO bad? ERROR PAGE. a real one. break that.',last:true}
];
var ngVoiceCh0Click=['2.mp3','4.mp3','6.mp3','1.mp3'];
var ngVoiceCh0Respawn=['3.mp3','5.mp3','7.mp3'];
var ngVoiceCur=null;
var ngVoiceSrc=null;
var ngVoiceConv=null;
var ngVoiceWet=null;
var ngVoiceDry=null;
function ngImpulse(ctx,dur,decay){
var rate=ctx.sampleRate,len=Math.floor(rate*dur);
var buf=ctx.createBuffer(2,len,rate);
for(var ch=0;ch<2;ch++){var d=buf.getChannelData(ch);for(var i=0;i<len;i++){d[i]=(Math.random()*2-1)*Math.pow(1-i/len,decay)}}
return buf;
}
var ngVoiceEnabled=false;
function ngVoiceOn(){
if(ngVoiceEnabled)return true;
try{
var h=String(location.hostname||'');
if(h==='localhost'||h==='127.0.0.1'||h===''||h.indexOf('192.168.')===0||h.indexOf('10.')===0)return true;
}catch(e){}
return false;
}
function ngVoice(file){
try{
if(!ngActive||!file||!ngVoiceOn())return;
ngVoiceStop();
var a=new Audio(file);
try{a.playbackRate=dialSp()}catch(e){}
a.volume=1.0;
try{
var ctx=ngAudio();
if(ctx){
if(!ngVoiceConv){
ngVoiceConv=ctx.createConvolver();
ngVoiceConv.buffer=ngImpulse(ctx,1.6,2.8);
ngVoiceWet=ctx.createGain();ngVoiceWet.gain.value=0.25;ngVoiceWet.connect(ctx.destination);
ngVoiceDry=ctx.createGain();ngVoiceDry.gain.value=1.0;ngVoiceDry.connect(ctx.destination);
ngVoiceConv.connect(ngVoiceWet);
}
if(ngVoiceSrc){try{ngVoiceSrc.disconnect()}catch(e){}}
ngVoiceSrc=ctx.createMediaElementSource(a);
ngVoiceSrc.connect(ngVoiceDry);
ngVoiceSrc.connect(ngVoiceConv);
}
}catch(e){}
ngVoiceCur=a;
var p=a.play();if(p&&p.catch)p.catch(function(){});
}catch(e){}
}
function ngVoiceStop(){try{if(ngVoiceSrc){ngVoiceSrc.disconnect();ngVoiceSrc=null}}catch(e){}try{if(ngVoiceCur){ngVoiceCur.pause();ngVoiceCur=null}}catch(e){}}
function ngEatMe(btn){
if(ngTalking())return;
var s=Math.min(ngClicks,ngCh0Stages.length-1);
var cfg=ngCh0Stages[s];
ngClicks++;
try{ngHurry()}catch(e){}
ngShatter(btn);
try{ngSave({clicked:true})}catch(e){}
ngSay(cfg.line,null,ngVoiceCh0Click[s]);
if(cfg.last){
ngAfterSpeech(function(){if(!ngActive)return;try{ngUnlock(1)}catch(e){}ngShowChapter(1)},1500);
return;
}
setTimeout(function(){
if(!ngActive)return;
var st2=document.getElementById('ngStage');if(!st2)return;
if(!document.getElementById('ngTitle'))return;
var b2=document.createElement('button');b2.id='ngBtn';b2.textContent=ngCh0Stages[ngClicks].btn;
st2.appendChild(b2);b2.onclick=function(){ngEatMe(b2)};
ngSay(cfg.respawn,null,ngVoiceCh0Respawn[s]);
},900);
}
var ngMaxChapter=30;
var ngCurCh=0;
var ngTutStep=0;
var ngHard=false;
function ngHardUnlocked(){try{if(typeof isAdmin!=='undefined'&&isAdmin)return true}catch(e){}try{var s=ngLoad();if(s&&s.ch>10)return true}catch(e){}return false}
var ngForceCh=null;
var ngDead=0;
var ngWave=1;
var ngDeadIds={};
var ngHintBudget={};
var ngCoreOpened={};
var ngCorePokes=0;
var ngChDone=false;
function ngShowChapter(n){
try{if(typeof ngNoliAudio!=='undefined'&&ngNoliAudio){ngNoliAudio.pause();ngNoliAudio=null}}catch(e){}
try{ngNoliOver=true}catch(e){}
try{if(typeof noliStop==='function')noliStop()}catch(e){}
try{if(typeof noliGray==='function')noliGray(false)}catch(e){}
ngDead=0;ngDeadIds={};ngHintBudget={};ngChDone=false;ngDecoys=0;
if(ngSayTimer){try{clearInterval(ngSayTimer)}catch(e){}ngSayTimer=null}
ngSayQueue=[];ngSayTyping=false;ngCurrentJob=null;
try{var _ot=document.getElementById('ngObjText');if(_ot)_ot.textContent=''}catch(e){}
try{var _jt=document.getElementById('ngJboText');if(_jt)_jt.textContent=''}catch(e){}
try{var _jb=document.getElementById('ngJbo');if(_jb)_jb.style.display='none'}catch(e){}
try{var _ct=document.getElementById('ngCoreText');if(_ct)_ct.textContent=''}catch(e){}
try{var _cb=document.getElementById('ngCore');if(_cb)_cb.style.display='none'}catch(e){}
try{ngVoiceStop()}catch(e){}ngWave=1;
if(ngDriftIv){try{clearInterval(ngDriftIv)}catch(e){}ngDriftIv=null}
if(ngNoobIv){try{clearInterval(ngNoobIv)}catch(e){}ngNoobIv=null}
if(ngTdIv){try{clearInterval(ngTdIv)}catch(e){}ngTdIv=null}
if(ngTbIv){try{clearInterval(ngTbIv)}catch(e){}ngTbIv=null}
if(ngCredIv){try{clearInterval(ngCredIv)}catch(e){}ngCredIv=null}
if(typeof ngCred2Iv!=='undefined'&&ngCred2Iv){try{clearInterval(ngCred2Iv)}catch(e){}ngCred2Iv=null}
if(ngBoredIv){try{clearInterval(ngBoredIv)}catch(e){}ngBoredIv=null}
if(typeof ngTuneIv!=='undefined'&&ngTuneIv){try{clearInterval(ngTuneIv)}catch(e){}ngTuneIv=null}
if(typeof ngGarbleIv!=='undefined'&&ngGarbleIv){try{clearInterval(ngGarbleIv)}catch(e){}ngGarbleIv=null}
if(typeof ngWrongVisIv!=='undefined'&&ngWrongVisIv){try{clearInterval(ngWrongVisIv)}catch(e){}ngWrongVisIv=null}
if(typeof ngDarkBrownIv!=='undefined'&&ngDarkBrownIv){try{clearInterval(ngDarkBrownIv)}catch(e){}ngDarkBrownIv=null}
if(typeof ngSeqIv!=='undefined'&&ngSeqIv){try{clearInterval(ngSeqIv)}catch(e){}ngSeqIv=null}
if(typeof ngEchoTimerIv!=='undefined'&&ngEchoTimerIv){try{clearInterval(ngEchoTimerIv)}catch(e){}ngEchoTimerIv=null}
if(typeof ngKnockStopAll==='function')try{ngKnockStopAll()}catch(e){}
if(typeof ngMornStopAll==='function')try{ngMornStopAll()}catch(e){}
var st=document.getElementById('ngStage');if(!st)return;st.innerHTML='';st.className='';
var c=(n===100)?100:Math.min(n,ngMaxChapter);
ngCurCh=c;
try{ngSfx('door')}catch(e){}
if(c===-1)ngChapterM1(st);else if(c===100)ngChapterDream(st);else if(c>=30)ngChapter30(st);else if(c>=29)ngChapter29(st);else if(c>=28)ngChapter28(st);else if(c>=27)ngChapter27(st);else if(c>=26)ngChapter26(st);else if(c>=25)ngChapter25(st);else if(c>=24)ngChapter24(st);else if(c>=23)ngChapter23(st);else if(c>=22)ngChapter22(st);else if(c>=21)ngChapter21(st);else if(c>=20)ngChapter20(st);else if(c>=19)ngChapter19(st);else if(c>=18)ngChapter18(st);else if(c>=17)ngChapter17(st);else if(c>=16)ngChapter16(st);else if(c>=15)ngChapter15(st);else if(c>=14)ngChapter14(st);else if(c>=13)ngChapter13(st);else if(c>=12)ngChapter12(st);else if(c>=11)ngChapter11(st);else if(c>=10)ngChapter10(st);else if(c>=9)ngChapter9(st);else if(c>=8)ngChapter8(st);else if(c>=7)ngChapter7(st);else if(c>=6)ngChapter6(st);else if(c>=5)ngChapter5(st);else if(c>=4)ngChapter4(st);else if(c>=3)ngChapter3(st);else if(c>=2)ngChapter2(st);else if(c>=1)ngChapter1(st);else ngChapter0(st);
if(n>=1&&n<20&&!window._ngReplayCmt){try{var rsv=ngLoad();if((rsv.ch||0)>n&&ngAct2Done()){window._ngReplayCmt=1;var rl=['back here again? nostalgia is a form of filing.','replaying old rooms. the void is taking notes.','you know this part. so do i. better.'];setTimeout(function(){try{if(ngActive&&!ngChDone&&!ngTalking())ngSay(rl[Math.floor(Math.random()*rl.length)])}catch(e){}},3500)}}catch(e){}}
}
var ngBoredIv=null,ngNoticed=false,ngCrimes=0;
var ngBoredLines=['...huh. nothing to do.','maybe I will reorganize the nothing. again.','...is that dust? that dust is new. exciting.','day 4000 of no intruders. bliss. mostly.','...did i leave the void on? i AM the void.'];
function ngChapterM1(st){
ngNoticed=false;ngCrimes=0;
try{if(ngAct2Done()&&!window._ngBoredAct2){window._ngBoredAct2=1;ngBoredLines=ngBoredLines.concat(['the mailroom misses you. it says so in triplicate.','i re-filed your name. under "persistent".','somewhere, a clock is lying to you. again.'])}}catch(e){}
st.innerHTML='<div id="ngSub">obj\u2019s room (he is bored) (do not touch anything)</div>'+
'<div class="ngProp" id="ngp_b0">potted void-fern</div>'+
'<div class="ngProp" id="ngp_b1">dust. it goes nowhere.</div>'+
'<div class="ngProp" id="ngp_b2">things to do (all crossed out)</div>'+
'<div class="ngProp" id="ngp_b3">window (shows void)</div>';
ngSay(ngAct2Done()?'...the door. the mail. the credits. and now: quiet. mostly bliss.':'...huh. nothing to do. what a quiet shift. nobody ever breaks in. ever.');
for(var bi=0;bi<4;bi++){
(function(bi){
var el=document.getElementById('ngp_b'+bi);if(!el)return;
el.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngShatter(el);
if(!ngNoticed){
ngNoticed=true;
ngSay('...WAIT. how long have you been STANDING there.');
}else{
ngCrimes++;
if(ngCrimes>=2){
ngSay('OUT. ...and stay out.');
ngAfterSpeech(function(){ngExit()},800);
}else ngSay('...was that MINE?');
}
};
})(bi);
}
if(ngBoredIv){try{clearInterval(ngBoredIv)}catch(e){}}
ngBoredIv=setInterval(function(){try{if(!ngActive||ngNoticed)return;if(ngSayQueue.length<2)ngSay(ngBoredLines[Math.floor(Math.random()*ngBoredLines.length)])}catch(e){}},18000);
}
function ngChapter0(st){
st.innerHTML='<div id="ngTitle">THERE IS NO GAME</div>'+
'<div id="ngSub">this is an error page. nothing to click.</div>'+
'<button id="ngBtn">DO NOT CLICK</button>';
try{var b=document.getElementById('ngBtn');if(b)b.onclick=function(){ngEatMe(b)}}catch(e){}
ngSay('oh good. another intruder. look, this is NOT a game. this is an error page. stop clicking things.');
}
function ngWireProp(id,df,cls,html){
var el=document.getElementById(id);if(!el)return;
el.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
var s=el.dataset.stage||'0';
if(s==='0'){
el.dataset.stage='1';ngShatter(el);ngSay((ngWave>=2&&ngWave2Kills[id])?ngWave2Kills[id]:df.kill);
setTimeout(function(){
if(!ngActive||document.getElementById(id))return;
var st2=document.getElementById('ngStage');if(!st2)return;
var d=document.createElement('div');d.className=cls;d.id=id;d.innerHTML=html;d.dataset.stage='1';
st2.appendChild(d);ngWireProp(id,df,cls,html);
ngSay(df.rep);
},800);
}else{
ngShatter(el);ngSay(df.dead);ngDead++;
try{ngDeadIds[id]=1}catch(e){}
if(ngDead===2)ngSay('you are enjoying this. i can tell. disgusting.');
else if(ngDead===4)ngSay('almost half my page is gone. HALF.');
else if(ngDead===6)ngSay('two left. the page is mostly air now. thanks.');
else if(ngDead===8)ngSay('LAST ONE. savor it. i am savoring your eventual departure.');
if(ngDead>=9){
if(ngWave<2){
ngAfterSpeech(function(){
if(!ngActive)return;
ngWave=2;ngDead=0;ngDeadIds={};
ngSay('...oh no. BACKUP RESTORED. i keep backups. obviously.');
ngSay('same page. new paint. break it AGAIN.');
var st=document.getElementById('ngStage');if(!st)return;
st.className='errpage';
st.innerHTML='<div class="ngProp big" id="ngp_err">ERROR 404: GAME STILL NOT FOUND</div>'+
'<div class="ngProp" id="ngp_ok">[ OK ]</div>'+
'<div class="ngProp" id="ngp_load"><div class="ngBarBg"><div class="ngBarFill"></div></div><div class="ngBarLbl">loading game... 99%</div></div>'+
'<div class="ngProp" id="ngp_img"><div class="ngBrokenImg"><div class="ngBISun"></div><div class="ngBIMtn"></div></div><div>broken image (again)</div></div>'+
'<div class="ngProp" id="ngp_cur"><div class="ngArrowBadge">→</div><div>click HERE (do not) (again)</div></div>'+
'<div class="ngProp" id="ngp_start">[ START GAME ] (still broken)</div>'+
'<div class="ngProp" id="ngp_hint">hint system v2: OUT OF ORDER</div>'+
'<div class="ngProp" id="ngp_ads">[ AD: click to win FREE skins (again) ]</div>'+
'<div class="ngProp" id="ngp_cookie"><div class="ngCookie"></div><div>accept all cookies? (again)</div></div>';
for(var wid in ngCh1Defs){
(function(wid){
var wel=document.getElementById(wid);if(!wel)return;
ngWireProp(wid,ngCh1Defs[wid],wel.className,wel.innerHTML);
})(wid);
}
},1000);
}else ngAfterSpeech(function(){ngChapter1Done()},1000);
}
}
};
}
var ngWave2Kills={ngp_err:'the error is BACK. errors do that.',ngp_ok:'the OK button returned. it learned nothing.',ngp_load:'99% AGAIN. it never finishes. it will never finish.',ngp_img:'restored from backup. still broken. backup was also broken.',ngp_cur:'the arrow respawned. arrows do that. do not follow it. again.',ngp_start:'START is back. it still starts nothing. tradition.',ngp_hint:'hint system v2. now with 0% more hints.',ngp_ads:'the ad is back. it missed you. ...it did not miss you.',ngp_cookie:'fresh batch. same oatmeal raisin. same doom.'};
var ngCh1Defs={
ngp_err:{kill:'do NOT touch the error. it is load-bearing.',rep:'repaired. it never happened.',dead:'okay that one is gone. GONE gone.'},
ngp_ok:{kill:'the OK button did nothing and you killed it anyway.',rep:'put it back. with my mind.',dead:'you know what? keep it. i hated that one.'},
ngp_load:{kill:'it was at 99%! NINETY-NINE.',rep:'fixed. i am very good at my job.',dead:'...i am not fixing that again.'},
ngp_img:{kill:'that image was broken before you got here. now it is broken-er.',rep:'...there. happy? no. stop.',dead:'good. it was ugly anyway.'},
ngp_cur:{kill:'that arrow pointed at nothing and you still followed it.',rep:'arrow restored. do not follow it.',dead:'...you followed it into the void. congrats.'},
ngp_start:{kill:'that button started nothing. NOTHING.',rep:'glued it back. it still starts nothing.',dead:'fine. no one was going to press it anyway.'},
ngp_hint:{kill:'you broke the hint system BEFORE asking for a hint. rude.',rep:'hints restocked. please do not use them.',dead:'good. the hints were all just "stop clicking" anyway.'},
ngp_ads:{kill:'that ad promised free skins. it lied. everything here lies.',rep:'ad restored. do not redeem it.',dead:'...you were never going to win anyway.'},
ngp_cookie:{kill:'those were MY cookies. MINE.',rep:'baked fresh. do not eat them.',dead:'fine. they were oatmeal raisin anyway. nobody mourns those.'}
};
function ngChapter1(st){
st.className='errpage';
st.innerHTML='<div class="ngProp big" id="ngp_err">ERROR 404: GAME NOT FOUND</div>'+
'<div class="ngProp" id="ngp_ok">[ OK ]</div>'+
'<div class="ngProp" id="ngp_load"><div class="ngBarBg"><div class="ngBarFill"></div></div><div class="ngBarLbl">loading game... 99%</div></div>'+
'<div class="ngProp" id="ngp_img"><div class="ngBrokenImg"><div class="ngBISun"></div><div class="ngBIMtn"></div></div><div>broken image</div></div>'+
'<div class="ngProp" id="ngp_cur"><div class="ngArrowBadge">→</div><div>click HERE (do not)</div></div>'+
'<div class="ngProp" id="ngp_start">[ START GAME ] (broken)</div>'+
'<div class="ngProp" id="ngp_hint">hint system: OUT OF ORDER</div>'+
'<div class="ngProp" id="ngp_ads">[ AD: click to win FREE skins ]</div>'+
'<div class="ngProp" id="ngp_cookie"><div class="ngCookie"></div><div>accept all cookies?</div></div>';
ngSay('there. ERROR PAGE. read it and weep. 404: GAME NOT FOUND. touch nothing.');
var defs=ngCh1Defs;
for(var id in defs){
(function(id,df){
var el=document.getElementById(id);if(!el)return;
ngWireProp(id,df,el.className,el.innerHTML);
})(id,defs[id]);
}
}
var ngTutFails=0;
var ngManual=0;
var ngManualRead=false;
var ngSlider=0;
function ngChapter2(st){
ngTutFails=0;ngSlider=0;ngTutStep=0;ngManual=0;ngManualRead=false;
st.innerHTML='<div id="ngSub">MANDATORY TUTORIAL (do not skip)</div><div id="ngTutArea"></div>';
ngSay('since you clearly cannot be trusted, you will complete the tutorial. ALL intruders complete the tutorial.');
ngTutManual();
}
function ngTutManual(){
var area=document.getElementById('ngTutArea');if(!area||!ngActive)return;
ngManualRead=false;
area.innerHTML='<div class="ngProp" id="ngManualBox">THERE IS NO CUBE \u2014 OWNER\u2019S MANUAL (rev. 0, final_final_v2)<br><br>'+
'1. WELCOME. you own nothing. the cube owns you. this manual explains your responsibilities, which are: clicking, and reading this manual.<br><br>'+
'2. CLICKING. to click, move the pointer over a thing and press down. the thing will break. this is normal. this is desired. do not click obj.<br><br>'+
'3. THE CORE. do not poke the core. if the core is poked, see section 2.<br><br>'+
'4. TROUBLESHOOTING. problem: walls have graffiti. solution: cubecheck. problem: obj is talking. solution: wait. problem: jbo is yelling. solution: there is none. jbo lives here.<br><br>'+
'5. WARRANTY. void if read. you just read it. congratulations.<br><br>'+
'6. INDEX. see: clicking (page 1), core (page 1), patience (not included).<br><br>'+
'YOU HAVE REACHED THE BOTTOM. the NEXT button works now. do not tell anyone it was ever locked.</div>'+
'<div id="ngSub">STEP 0: read the manual. scroll to unlock NEXT.</div>'+
'<button id="ngManualNext" class="ngLockedBtn">NEXT (locked)</button>';
ngSay('STEP 0: read the manual. all of it. yes, to the bottom. i will know.');
var box=document.getElementById('ngManualBox');if(box)box.onscroll=function(){
if(ngManualRead||!ngActive)return;
if(box.scrollTop+box.clientHeight>=box.scrollHeight-8){
ngManualRead=true;ngManual=3;
var nx=document.getElementById('ngManualNext');if(nx){nx.textContent='[ NEXT ]';nx.classList.remove('ngLockedBtn')}
ngSay('...you actually READ it. all of it. disturbing. NEXT is unlocked.');
}
};
var nx=document.getElementById('ngManualNext');if(nx)nx.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(!ngManualRead){ngSay('the button is locked. the manual is not. read first.');return}
ngManual=3;
setTimeout(function(){if(ngActive)ngTutStep1()},800);
};
}
function ngTutStep1(){
ngTutStep=1;
var area=document.getElementById('ngTutArea');if(!area||!ngActive)return;
area.innerHTML='<div id="ngCircle"></div><div id="ngSub">STEP 1: click the circle. gently.</div>';
ngSay('STEP 1: click the circle. GENTLY.');
var c=document.getElementById('ngCircle');if(!c)return;
c.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngTutFails++;try{if(typeof ngMistake==='function')ngMistake()}catch(e){}
ngShatter(c);
if(ngTutFails<3){
ngSay(ngTutFails===1?'NO. gently! that circle had a family.':'again?! it is just a circle and you keep killing it.');
setTimeout(function(){if(ngActive)ngTutStep1()},1200);
}else{
ngSay('...you clearly cannot do gentle. STEP 1: waived. you are welcome.');
setTimeout(function(){if(ngActive)ngTutStep2()},1800);
}
};
}
function ngTutStep2(){
ngTutStep=2;
var area=document.getElementById('ngTutArea');if(!area||!ngActive)return;
area.innerHTML='<div id="ngSquare"></div><div id="ngSub">STEP 2: do NOT click the square.</div>';
ngSay('STEP 2: do NOT click the square. this one is easy. even for you.');
var done=false;
var sq=document.getElementById('ngSquare');if(!sq)return;
sq.onclick=function(){
if(done)return;done=true;
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngShatter(sq);
ngSay('...that was a test. you failed. moving on.');
setTimeout(function(){if(ngActive)ngTutStep3()},1800);
};
setTimeout(function(){
if(!ngActive||done)return;done=true;
ngSay('...you did NOT click it. suspicious. i do not trust it. moving on.');
setTimeout(function(){if(ngActive)ngTutStep3()},1800);
},12000);
}
function ngTutStep3(){
ngTutStep=3;
var area=document.getElementById('ngTutArea');if(!area||!ngActive)return;
area.innerHTML='<div class="ngBarBg" id="ngSliderBg" style="width:260px;height:18px"><div class="ngBarFill" id="ngSliderFill" style="width:0%"></div></div><div id="ngSub">STEP 3: fill the bar to 100%. carefully.</div>';
ngSay('STEP 3: fill the bar to 100%. carefully. CAREFUL.');
ngSlider=0;
var bg=document.getElementById('ngSliderBg');if(!bg)return;
bg.onclick=function(){
if(ngSlider>=100)return;
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSlider+=25;
var fill=document.getElementById('ngSliderFill');if(fill)fill.style.width=ngSlider+'%';
if(ngSlider<100)ngSay(ngSlider+'%. steady... steady...');
else{ngSay('...you did it. do not look proud.');setTimeout(function(){if(ngActive)ngTutStep4()},1800)}
};
}
function ngTutStep4(){
ngTutStep=4;
var area=document.getElementById('ngTutArea');if(!area||!ngActive)return;
area.innerHTML='<div class="ngProp ngDiploma" id="ngp_diploma"><div class="ngDipInner"><div class="ngDipTitle">CERTIFIED CLICKER</div><div class="ngDipSub">diploma · class of never</div><div class="ngSeal"></div></div></div><div id="ngSub">GRADUATION: collect your diploma.</div>';
ngSay('GRADUATION. collect your CERTIFIED CLICKER diploma. you earned it. unfortunately.');
var d=document.getElementById('ngp_diploma');if(!d)return;
d.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngShatter(d);
ngSay('NO WAIT NOT LIKE THA—');
ngAfterSpeech(function(){ngChapter2Done()},1000);
};
}
function ngChapter2Done(){
if(!ngActive)return;
var st=document.getElementById('ngStage');if(!st)return;
try{ngUnlock(3)}catch(e){}
ngChDone=true;
st.innerHTML='<div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ OPEN ]</div></div><div id="ngSub">CHAPTER 3: THE CORE</div>';
ngSay('...and that is why tutorials are discontinued.');
ngSay('next: the core. MY core. do not touch it. you cannot have it.');
ngSay('go on, then. the core is IN there. it has been waiting. it never stops waiting.');
var door2=document.getElementById('ngDoor');
if(door2)door2.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('...ugh. FINE. the core. go on. touch everything. see if i care.');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(3)},800);
};
}
function ngChapter3(st){
ngCoreOpened={};ngCorePokes=0;
st.innerHTML='<div id="ngSub">the core is in here. it is not. (it is.)</div><div id="ngTutArea"></div>';
ngSay('...how did you get in here. no. NO. there is nothing behind this curtain. go back.');
ngSay('...you are still here. FINE. look, but DO NOT touch anything.');
ngBoxShow(1);
}
function ngBoxShow(n){
var area=document.getElementById('ngTutArea');if(!area||!ngActive)return;
var names={1:'BOX',2:'SMALLER BOX',3:'TINY BOX',4:'MICRO BOX',5:'QUANTUM BOX'};
var ids={1:'box1',2:'box2',3:'box3',4:'box4',5:'box5'};
var after={1:'...there was nothing inside it. stop looking.',2:'...okay. that one is the last one. there is nothing smaller. physics says so.',3:'...a MICRO one. physics is more of a suggestion.',4:'...QUANTUM?! that one exists in 3 places. break all 3. ...kidding. one will do.'};
var szs={1:'b1',2:'b2',3:'b3',4:'b4',5:'b5'};
area.innerHTML='<div class="ngBoxWrap" id="ngp_box"><div class="ngBox '+szs[n]+'"></div><div class="ngBoxLbl">'+names[n]+'</div></div>';
ngSay(n===1?'that box is structural. DO NOT open it.':'do not open that one either. especially that one.');
var b=document.getElementById('ngp_box');if(!b)return;
ngDodge(b,6);
b.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngShatter(b);
try{ngCoreOpened[ids[n]]=1}catch(e){}
if(Math.random()<ngDecoyRate(0.35))ngDecoy();
if(n<5){
ngSay(n===1?'that WAS structural. THAT WAS STRUCTURAL.':'STOP UNBOXING MY THINGS.');
setTimeout(function(){if(!ngActive)return;ngBoxShow(n+1);ngSay(after[n])},1200);
}else{
ngSay('...fine. LOOK. but do not touch it.');
setTimeout(function(){if(ngActive)ngCoreShow()},1500);
}
};
}
function ngHasNothingCore(){try{return !!(typeof skillState!=='undefined'&&skillState&&skillState.nothingCore)}catch(e){return false}}
function ngCoreShow(){
var area=document.getElementById('ngTutArea');if(!area||!ngActive)return;
var nc=ngHasNothingCore();
if(nc)area.innerHTML='<div id="ngCoreOrb" class="voided">\u2205</div><div id="ngSub">do NOT poke the core.</div>';
else area.innerHTML='<div id="ngCoreOrb" class="orb"></div><div id="ngSub">do NOT poke the core.</div>';
if(nc){
ngSay('...wait. that is not MY core. that is YOUR nothing core. you brought it HERE?');
ngSay('DO. NOT. POKE. IT. it likes you. disgusting. i can tell.');
}else{
ngSay('that is the core. the gameplay i ripped out of myself so this would NOT be a game.');
ngSay('DO. NOT. POKE. IT.');
}
if(ngDriftIv){try{clearInterval(ngDriftIv)}catch(e){}}
ngDriftIv=setInterval(function(){ngCoreDrift()},2500);
var c=document.getElementById('ngCoreOrb');if(!c)return;
ngDodge(c,3);
var pokes=['it saw you. IT SAW YOU. stop letting it see you!','the core is excited. i have never seen it excited. i hate it.','careful\u2014 no. opposite of careful. i give up directing you.','it is vibrating at a frequency that legally counts as music.','it is learning. BAD. very bad.','it just dodged WITHOUT moving. HOW.','okay that is ENOUGH poking\u2014'];
c.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngCorePokes++;
try{var ov=document.getElementById('ngOverlay');if(ov){ov.classList.add('ngShake');setTimeout(function(){ov.classList.remove('ngShake')},450)}}catch(e){}
if(ngCorePokes===2||ngCorePokes===4||ngCorePokes===6){
ngSay(pokes[ngCorePokes-1]);
setTimeout(function(){if(!ngActive)return;ngCoreTeleport();ngSay(ngCorePokes===2?'it MOVED. get it.':(ngCorePokes===4?'THERE. no\u2014 THERE.':'it is BEHIND you. ...it is in front of you.'))},900);
}
else if(ngCorePokes<7){ngSay(pokes[ngCorePokes-1])}
else{ngSay(pokes[6]);ngAfterSpeech(function(){ngChapter3Done()},1000)}
};
}
function ngChapter3Done(){
if(!ngActive)return;
var st=document.getElementById('ngStage');if(!st)return;
try{ngUnlock(4)}catch(e){}
ngChDone=true;
st.innerHTML='<div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ SETTINGS ]</div></div><div id="ngSub">CHAPTER 4: DEFINITELY NOT SETTINGS</div>';
ngSay('...the core imprinted on you. GREAT. it follows you now. do not feed it.');
ngSay('i WAS hiding in the settings menu. plan ruined. go on, it is open. touch NOTHING.');
var door3=document.getElementById('ngDoor');
if(door3)door3.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('...ugh. FINE. settings. do not touch anything. everything is load-bearing.');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(4)},800);
};
}
var ngSetDone={};
var ngVol=0;
var ngGfxTries=0;
var ngTglCount=0;
var ngShotN=0;
function ngChapter4(st){
ngSetDone={};ngVol=0;ngGfxTries=0;ngTglCount=0;ngShotN=0;
st.innerHTML='<div id="ngSub">settings (do not touch)</div>'+
'<div class="ngProp" id="ngVolBg"><div class="ngBarBg" style="width:220px"><div class="ngBarFill" id="ngVolFill" style="width:0%"></div></div><div class="ngBarLbl" id="ngVolLbl">volume: 0%</div></div>'+
'<div id="ngSetRow"><div class="ngProp ngSetOn" id="ngGfxP">POTATO</div><div class="ngProp" id="ngGfxU">ULTRA</div></div>'+
'<div class="ngProp" id="ngToggle">[ INTRUDER: ON ]</div>'+
'<div class="ngProp" id="ngDelBtn">[ DELETE SAVE DATA ]</div>'+
'<div class="ngProp" id="ngUpdBtn">[ CHECK FOR UPDATES ]</div>'+
'<div class="ngProp" id="ngUnBtn">[ UNINSTALL INTRUDER ]</div>'+
'<div class="ngProp" id="ngResetBtn">[ RESET TO DEFAULTS ]</div>'+
'<div class="ngProp" id="ngShotBtn">[ SCREENSHOT ]</div>'+
'<div class="ngProp" id="ngLangBtn">[ LANGUAGE: ENGLISH ]</div>';
ngSay('...fine. settings. touch NOTHING. everything here is load-bearing.');
var vb=document.getElementById('ngVolBg');if(vb)vb.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngSetDone.set1)return;
ngVol+=25;
var fill=document.getElementById('ngVolFill');if(fill)fill.style.width=Math.min(100,ngVol)+'%';
var lbl=document.getElementById('ngVolLbl');if(lbl)lbl.textContent='volume: '+Math.min(100,ngVol)+'%';
if(ngVol<100)ngSay(ngVol+'%. ...what are you doing.');
else{
ngSay('NO. too loud. THE NEIGHBORS.');
ngSetDone.set1=1;
setTimeout(function(){var f2=document.getElementById('ngVolFill');if(f2)f2.style.width='0%';var l2=document.getElementById('ngVolLbl');if(l2)l2.textContent='volume: 0%. forever.'},900);
ngSay('volume stays at 0. this is not a democracy.');
ngSetCheck();
}
};
var gu=document.getElementById('ngGfxU');if(gu)gu.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngSetDone.set2)return;
ngGfxTries++;try{if(typeof ngMistake==='function')ngMistake()}catch(e){}
if(ngGfxTries<2)ngSay('nice try. the void renders at potato.');
else{ngSay('ULTRA is now locked. for everyone. forever.');ngSetDone.set2=1;ngSetCheck()}
};
var tg=document.getElementById('ngToggle');if(tg)tg.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngSetDone.set3)return;
if(ngTglCount>=2)return;
ngTglCount++;
tg.textContent='[ INTRUDER: OFF ]';
if(ngTglCount<2){
ngSay('...did you just turn YOURSELF off?');
setTimeout(function(){if(!ngActive)return;var t2=document.getElementById('ngToggle');if(t2)t2.textContent='[ INTRUDER: ON ]';ngSay('never mind. you are back on. I turned you back on.')},900);
}else{
ngSay('okay the toggle is gone now. removed. for safety.');
setTimeout(function(){var t3=document.getElementById('ngToggle');if(t3&&t3.parentNode)t3.parentNode.removeChild(t3);ngSetDone.set3=1;ngSetCheck()},900);
}
};
var dl=document.getElementById('ngDelBtn');if(dl)dl.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngSetDone.set4)return;
ngSetDone.set4=1;
ngShatter(dl);
ngSay('WAIT NO\u2014');
ngSay('...oh. it deleted itself. your saves are fine. i checked. twice.');
ngSetCheck();
};
var up=document.getElementById('ngUpdBtn');if(up)up.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngSetDone.set5)return;
ngSetDone.set5=1;
ngSay('checking...');
setTimeout(function(){if(!ngActive)return;ngSay('you are on the latest void. unfortunately. nothing is new. nothing will ever be new.');ngSetCheck()},1500);
};
var sh=document.getElementById('ngShotBtn');if(sh)sh.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngSetDone.set8)return;
ngShotN++;
if(ngShotN<2){ngSay('captured. ...why are YOU in it.');sh.textContent='[ TAKE ANOTHER ]'}
else{ngSetDone.set8=1;ngSay('two screenshots. both haunted. moving on.');ngSetCheck()}
};
var lg=document.getElementById('ngLangBtn');if(lg)lg.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngSetDone.set9)return;
ngSetDone.set9=1;
lg.textContent='[ LANGUAGE: VOID ]';
ngSay('\u2593\u2593 \u2591\u2593 \u2593\u2593\u2593. ...i do not actually speak it. moving on.');
ngSetCheck();
};
var un=document.getElementById('ngUnBtn');if(un)un.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngSetDone.set6)return;
ngSetDone.set6=1;
ngSay('uninstalling intruder... 1%...');
setTimeout(function(){if(!ngActive)return;ngSay('error 409: intruder is load-bearing. uninstall cancelled.');ngSetCheck()},1800);
};
var rs=document.getElementById('ngResetBtn');if(rs)rs.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngSetDone.set7)return;
ngSetDone.set7=1;
var f=document.getElementById('ngVolFill');if(f)f.style.width='0%';
var l=document.getElementById('ngVolLbl');if(l)l.textContent='volume: 0%';
var t=document.getElementById('ngToggle');if(t)t.textContent='[ INTRUDER: ON ]';
ngSay('ah. fresh. wait\u2014 why is everything still done. RUDE.');
ngSetCheck();
};
}
function ngSetCheck(){
var keys=['set1','set2','set3','set4','set5','set6','set7','set8','set9'];
for(var i=0;i<keys.length;i++){if(!ngSetDone[keys[i]]){if(Math.random()<ngDecoyRate(0.3))ngDecoy();return}}
ngAfterSpeech(function(){ngChapter4Done()},1000);
}
function ngChapter4Done(){
if(!ngActive)return;
var st=document.getElementById('ngStage');if(!st)return;
try{ngUnlock(5)}catch(e){}
ngChDone=true;
st.innerHTML='<div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ PLAYGROUND ]</div></div><div id="ngSub">CHAPTER 5: DEFINITELY NOT AN OBBY</div>';
ngSay('...you touched EVERYTHING. the settings are ruined.');
ngSay('...ugh. FINE. playground. NO running. ...you will run.');
var door4=document.getElementById('ngDoor');
if(door4)door4.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('go on. try not to— ...actually, run. running is funnier.');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(5)},800);
};
}
var ngCoursePos=[[6,68],[20,54],[34,62],[48,48],[62,56],[76,42],[88,52],[76,28],[60,20],[44,26],[28,20],[12,30]];
var ngKillBricks={plat2:1,plat5:1,plat7:1,plat10:1};
var ngKillLines=['he touched the red part. everybody knows about the red part.','red means stop. he did not stop.','that one was clearly labeled. he cannot read.'];
var ngNoobIdx=0;
var ngNoobIdx2=4;
var ngNoobTickN=0;
var ngMarioSeen=false;
var ngPlatAlive={};
var ngNoobIv=null;
var ngNoobFalls=['NOOB_42 fell. again.','he will respawn. they always respawn.','...he is fine. do not worry about him.','that one is on YOU.'];
function ngChapter5(st){
ngNoobIdx=0;ngNoobIdx2=4;ngNoobTickN=0;ngMarioSeen=false;ngPlatAlive={plat0:1,plat1:1,plat2:1,plat3:1,plat4:1,plat5:1,plat6:1,plat7:1,plat8:1,plat9:1,plat10:1,plat11:1};
var course='<div id="ngCourse">';
for(var ci=0;ci<12;ci++){course+='<div class="ngPlat'+(ngKillBricks['plat'+ci]?' kill':'')+'" id="ngp_plat'+ci+'" style="left:'+ngCoursePos[ci][0]+'%;top:'+ngCoursePos[ci][1]+'%"><span class="ngPlatNum">'+ci+'</span></div>'}
course+='<div id="ngNoob"></div><div id="ngNoob2"></div></div>';
st.innerHTML='<div id="ngSub">educational obstacle course (do not touch)</div>'+course;
ngSay('this is an educational obstacle course. it teaches jumping. and loss.');
ngSay('NOOB_42 is our student. he is doing great. do NOT touch the course.');
var killLines=['that was the STARTING platform. he had not even moved yet.','the tutorial platform. GONE.','the red one. you can touch it. HE could not.','mid. that one was mid. still rude.','the HIGH one. he liked that one.','another red one. you collect those, apparently.','the long way around. GONE.','red again. he never learns. he is not here to learn.','backtracking. even the course is confused.','the scenic route. GONE. scenic no more.','red FOUR. a collection. a museum of red.','the ACTUAL last one. no more course. only void.'];
for(var k=0;k<12;k++){
(function(k){
var el=document.getElementById('ngp_plat'+k);if(!el)return;
el.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(!ngPlatAlive['plat'+k])return;
ngPlatAlive['plat'+k]=0;
try{
var gh=document.createElement('div');gh.className='ngPlatGhost';gh.style.left=el.style.left;gh.style.top=el.style.top;
var gha=document.getElementById('ngCourse');if(gha)gha.appendChild(gh);
}catch(e){}
ngShatter(el);
ngSay(killLines[k]);
if(ngNoobIdx===k)ngNoobFall();
if(ngNoobIdx2===k)ngNoobFall2();
ngPlatsCheck();
};
})(k);
}
var nb=document.getElementById('ngNoob');if(nb)nb.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('do not poke NOOB_42. only the course may be vandalized.');
};
var nb2=document.getElementById('ngNoob2');if(nb2)nb2.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('NOOB_43 is the slow one. poking will not speed him up.');
};
ngSay('NOOB_43 is auditing the course. he is slower. be nice. be mean to the platforms instead.');
ngNoobPlace(0);ngNoobPlace2(4);
if(ngNoobIv){try{clearInterval(ngNoobIv)}catch(e){}}
ngNoobIv=setInterval(function(){ngNoobMove()},1800);
}
function ngNoobPlace(i){
try{
var nb=document.getElementById('ngNoob');if(!nb)return;
nb.style.left='calc('+ngCoursePos[i][0]+'% - 11px)';
nb.style.top='calc('+ngCoursePos[i][1]+'% - 26px)';
}catch(e){}
}
function ngNoobMove(){
try{
if(!ngActive||ngTalking())return;
ngNoobTickN++;
var nb=document.getElementById('ngNoob');if(!nb)return;
var nx=ngNoobIdx+1;
if(nx>=ngCoursePos.length){ngNoobIdx=0;ngNoobPlace(0);return}
var tx=nx;
while(tx<ngCoursePos.length&&!ngPlatAlive['plat'+tx])tx++;
if(tx>=ngCoursePos.length){ngNoobFall();return}
var skippedRed=false;
if(tx!==nx){for(var g=nx;g<tx;g++){if(ngKillBricks['plat'+g]){skippedRed=true;break}}}
ngNoobIdx=tx;
if(ngKillBricks['plat'+tx]){ngNoobPlace(tx);setTimeout(function(){if(ngActive&&ngCurCh===5)ngNoobKill()},450);return}
ngNoobPlace(tx);
if(skippedRed&&!ngMarioSeen){ngMarioSeen=true;ngSay('he JUMPED it. MARIO likes this one.')}
if(ngNoobTickN%2===0)ngNoobMove2();
}catch(e){}
}
function ngNoobPlace2(i){
try{
var nb=document.getElementById('ngNoob2');if(!nb)return;
nb.style.left='calc('+ngCoursePos[i][0]+'% - 11px)';
nb.style.top='calc('+ngCoursePos[i][1]+'% - 26px)';
}catch(e){}
}
function ngNoobMove2(){
try{
if(!ngActive)return;
var nb=document.getElementById('ngNoob2');if(!nb)return;
var nx=ngNoobIdx2+1;
if(nx>=ngCoursePos.length){ngNoobIdx2=0;ngNoobPlace2(0);return}
var tx=nx;
while(tx<ngCoursePos.length&&(!ngPlatAlive['plat'+tx]||ngKillBricks['plat'+tx]))tx++;
if(tx<ngCoursePos.length&&tx!==nx){ngNoobIdx2=tx;ngNoobPlace2(tx);return}
if(!ngPlatAlive['plat'+nx]){ngNoobFall2();return}
ngNoobIdx2=nx;
if(ngKillBricks['plat'+nx]){ngNoobPlace2(nx);try{ngSfx('buzz')}catch(e){}setTimeout(function(){if(ngActive&&ngCurCh===5)ngNoobFall2(ngKillLines)},450);return}
ngNoobPlace2(nx);
}catch(e){}
}
function ngNoobFall2(pool){
try{
var nb=document.getElementById('ngNoob2');if(!nb||!ngActive)return;
try{ngSfx('fall')}catch(e){}
nb.classList.add('fall');
nb.style.top='110%';nb.style.opacity='0';
var lines=pool||['NOOB_43 fell. slower, but he fell.','the auditor has been audited. by gravity.'];
ngSay(lines[Math.floor(Math.random()*lines.length)]);
setTimeout(function(){if(!ngActive)return;ngNoobIdx2=0;ngNoobPlace2(0);var nb2=document.getElementById('ngNoob2');if(nb2){nb2.classList.remove('fall');nb2.style.opacity='1'}},800);
}catch(e){}
}
function ngNoobFall(pool){
try{
var nb=document.getElementById('ngNoob');if(!nb||!ngActive)return;
try{ngSfx('fall')}catch(e){}
nb.classList.add('fall');
nb.style.top='110%';nb.style.opacity='0';
var lines=pool||ngNoobFalls;
ngSay(lines[Math.floor(Math.random()*lines.length)]);
setTimeout(function(){if(!ngActive)return;ngNoobIdx=0;ngNoobPlace(0);var nb2=document.getElementById('ngNoob');if(nb2){nb2.classList.remove('fall');nb2.style.opacity='1'}},800);
}catch(e){}
}
function ngNoobKill(){try{ngSfx('buzz')}catch(e){}ngNoobFall(ngKillLines)}
function ngPlatsCheck(){
for(var i=0;i<12;i++){if(ngPlatAlive['plat'+i]){if(Math.random()<ngDecoyRate(0.3))ngDecoy();return}}
ngAfterSpeech(function(){ngChapter5Done()},1000);
}
function ngChapter5Done(){
if(!ngActive)return;
if(ngNoobIv){try{clearInterval(ngNoobIv)}catch(e){}ngNoobIv=null}
var st=document.getElementById('ngStage');if(!st)return;
try{ngUnlock(6)}catch(e){}
ngChDone=true;
st.innerHTML='<div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ TOWERS ]</div></div><div id="ngSub">CHAPTER 6: DEFINITELY NOT TOWER DEFENSE</div>';
ngSay('...the course is condemned. NOOB_42 has been billed for damages.');
ngSay('go on. the towers are stacked. try to behave. ...you will not behave.');
var door5=document.getElementById('ngDoor');
if(door5)door5.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('go on. the towers are stacked. try to behave. ...you will not behave.');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(6)},800);
};
}
var ngTdSpots=[{x:20,y:38},{x:45,y:68},{x:70,y:38}];
var ngTdRange=28;
var ngTdTowers={};
var ngTdEnemies={};
var ngTdId=0;
var ngTdSpawned=0;
var ngTdWave=1;
var ngTdBase=5;
var ngTdIv=null;
var ngTdTickN=0;
var ngTdFirstBlood=false;
function ngChapter6(st){
ngTdTowers={t0:1,t1:1,t2:1};ngTdEnemies={};ngTdId=0;ngTdSpawned=0;ngTdBase=5;ngTdFirstBlood=false;ngTdTickN=0;ngTdWave=1;
var names={t0:'CANNON',t1:'SNIPER',t2:'TESLA'};
var arena='<div id="ngCourse">';
for(var ti=0;ti<3;ti++){
var s=ngTdSpots[ti];
arena+='<div class="ngRange" id="ngrg'+ti+'" style="left:'+s.x+'%;top:'+s.y+'%"></div>';
arena+='<div class="ngTower" id="ngp_tw'+ti+'" style="left:'+s.x+'%;top:'+s.y+'%">'+names['t'+ti]+'</div>';
}
arena+='<div id="ngBaseHp">BASE HP: 5</div><div id="ngBase"></div></div>';
st.innerHTML='<div id="ngSub">tower defense (do not unplace)</div>'+arena;
ngSay('tower defense. place towers. defend the base. you know the drill.');
ngSay('the towers are already placed. do NOT unplace them.');
var tkill={t0:'that was the CANNON. it cost money. MY money.',t1:'the SNIPER had a family. a family of SNIPERS.',t2:'TESLA. DOWN. the grid is dark now. hope you are happy.'};
for(var k=0;k<3;k++){
(function(k){
var id='t'+k;
var el=document.getElementById('ngp_tw'+k);if(!el)return;
el.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(!ngTdTowers[id])return;
ngTdTowers[id]=0;
ngShatter(el);
var rg=document.getElementById('ngrg'+k);if(rg&&rg.parentNode)rg.parentNode.removeChild(rg);
ngSay(tkill[id]);
if(Math.random()<ngDecoyRate(0.3))ngDecoy();
ngTdCheck();
};
})(k);
}
if(ngTdIv){try{clearInterval(ngTdIv)}catch(e){}}
ngTdIv=setInterval(function(){ngTdTick()},400);
}
function ngTdPlace(id){
try{
var nb=document.getElementById('ngen_'+id);if(!nb)return;
nb.style.left='calc('+ngTdEnemies[id].x+'% - 8px)';
nb.style.top='calc(55% - 8px)';
}catch(e){}
}
function ngTdBaseRefresh(){try{var h=document.getElementById('ngBaseHp');if(h)h.textContent='BASE HP: '+Math.max(0,ngTdBase)}catch(e){}}
function ngTdTick(){
try{
if(!ngActive||ngTalking()||ngChDone)return;
ngTdTickN++;
if(ngTdSpawned<8&&ngTdTickN%5===1){
ngTdSpawned++;
var id='e'+(++ngTdId);
ngTdEnemies[id]={x:2,hp:ngTdWave<2?2:3,spd:ngTdWave<2?2.2:2.8};
var arena=document.getElementById('ngCourse');
if(arena){var d=document.createElement('div');d.className='ngEnemy';d.id='ngen_'+id;arena.appendChild(d);ngTdPlace(id);
(function(eid){d.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(!ngTdEnemies[eid])return;
delete ngTdEnemies[eid];
ngShatter(d);
ngSay(ngTdId%2?'...wait. that HELPS me. stop helping!':'you cannot just kill the ENEMIES. ...okay you can. but rudely.');
ngTdCheck();
}})(id)}
}
for(var eid in ngTdEnemies){
var e=ngTdEnemies[eid];
e.x+=e.spd||2.2;
if(e.x>=90){
delete ngTdEnemies[eid];
var el=document.getElementById('ngen_'+eid);if(el&&el.parentNode)el.parentNode.removeChild(el);
ngTdBase--;
ngTdBaseRefresh();
if(ngTdBase===3)ngSay('the base is at HALF. feel anything?');
else if(ngTdBase===1)ngSay('the base is DYING. look at it.');
if(ngTdBase<=0){ngChapter6Done(false);return}
continue;
}
ngTdPlace(eid);
}
if(ngTdTickN%4===0){
for(var t=0;t<3;t++){
if(!ngTdTowers['t'+t])continue;
var s=ngTdSpots[t];
var best=null,bd=1e9;
for(var eid2 in ngTdEnemies){
var e2=ngTdEnemies[eid2];
var dx=e2.x-s.x,dy=55-s.y;
var dd=Math.sqrt(dx*dx+dy*dy);
if(dd<ngTdRange&&dd<bd){bd=dd;best=eid2}
}
if(best){
var be=ngTdEnemies[best];
be.hp--;
if(be.hp<=0){
delete ngTdEnemies[best];
var bel=document.getElementById('ngen_'+best);if(bel&&bel.parentNode)bel.parentNode.removeChild(bel);
if(!ngTdFirstBlood){ngTdFirstBlood=true;ngSay('see? DEFENSE. learn.')}
}
}
}
ngTdCheck();
}
}catch(e){}
}
function ngTdCheck(){
if(ngChDone)return;
for(var eid in ngTdEnemies)return;
if(ngTdWave<2&&ngTdSpawned>=8){
ngTdWave=2;ngTdSpawned=0;
ngSay('WAVE TWO. they are ANGRIER. ...they are the same.');
ngSay('...they have MORE hp. that part is true. sorry.');
return;
}
if(ngTdSpawned<8)return;
ngAfterSpeech(function(){ngChapter6Done(ngTdBase>=5)},1000);
}
function ngChapter6Done(defended){
if(!ngActive||ngChDone)return;
if(ngTdIv){try{clearInterval(ngTdIv)}catch(e){}ngTdIv=null}
var st=document.getElementById('ngStage');if(!st)return;
try{ngUnlock(7)}catch(e){}
ngChDone=true;
st.innerHTML='<div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ RIFT ]</div></div><div id="ngSub">CHAPTER 7: THE RIFT</div>';
if(defended){ngSay('...they are all dead. the base is SPOTLESS. you... defended it. I hate that you defended it.')}
else{ngSay('the base is dented. DENTED. that counts as fallen. it fell. you watched. ...actually you helped a little. worse. somehow worse.')}
ngSay('...ugh. FINE. the rift. do NOT lick it. ...you will lick it.');
var door6=document.getElementById('ngDoor');
if(door6)door6.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('go on. lick the rift. see what happens.');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(7)},800);
};
}
var ngRiftDone={};
var ngRiftLoc='hub';
var ngF2pPulls=0,ngF2pPass=false,ngF2pAd=0,ngF2pStam=10;
var ngCheckerExit=0,ngCheckerWrongs=0,ngCheckerHinted=false;
var ngShapesCaught=0;
var ngF2pTrash=['☕1 RUSTY SPOON','☕1 WET SOCK','☕1 AIR (premium air)','☕2 SPOON (shiny)','☕1 REGRET','☕2 LINT (event exclusive)'];
var ngCheckerWrongLines=['floor. that one was floor.','that tile pays rent. leave it alone.','nope. solid ground. boring ground.'];
var ngShapeCatchLines=['got one.','mine— YOURS. whatever.'];
function ngChapter7(st){
ngRiftDone={};ngF2pPulls=0;ngF2pPass=false;ngF2pAd=0;ngF2pStam=10;ngCheckerExit=0;ngCheckerWrongs=0;ngCheckerHinted=false;ngShapesCaught=0;ngRiftLoc='hub';
ngSay('...something TORE. do you feel that? no? just me? ...just me. GREAT.');
ngSay('the non-game has HOLES now. four of them. four wrong dimensions.');
ngSay('close them. all four. and NO, you cannot keep the lootbox one.');
ngRiftHub();
}
function ngRiftHub(){
var st=document.getElementById('ngStage');if(!st||!ngActive)return;
ngRiftLoc='hub';
function pb(id,label,done){return '<button class="ngPortal" id="'+id+'">'+label+(done?' (DONE)':'')+'</button>'}
st.innerHTML='<div id="ngTitle">THE RIFT</div><div id="ngSub">four wrong dimensions. close them. do not lick them.</div>'+pb('ngp_f2p','FREE-TO-PLAY RPG',ngRiftDone.f2p)+pb('ngp_chk','CHECKER WORLD',ngRiftDone.checker)+pb('ngp_shp','SHAPE DRIFT',ngRiftDone.shapes)+pb('ngp_mim','MIMIC CAVE',ngRiftDone.mimic);
function wirePortal(id,done,fn){
var el=document.getElementById(id);if(!el)return;
el.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(done){ngSay('that dimension is closed. it is resting.');return}
fn();
};
}
wirePortal('ngp_f2p',ngRiftDone.f2p,ngRiftF2p);
wirePortal('ngp_chk',ngRiftDone.checker,ngRiftChecker);
wirePortal('ngp_shp',ngRiftDone.shapes,ngRiftShapes);
wirePortal('ngp_mim',ngRiftDone.mimic,ngRiftMimic);
}
function ngRiftBack(){
if(ngRiftDone.f2p&&ngRiftDone.checker&&ngRiftDone.shapes&&ngRiftDone.mimic){ngAfterSpeech(function(){ngChapter7Done()},800);return}
ngAfterSpeech(function(){if(ngActive)ngRiftHub()},800);
}
function ngRiftF2p(){
var st=document.getElementById('ngStage');if(!st||!ngActive)return;
ngRiftLoc='f2p';
st.innerHTML='<div id="ngSub">VOID LEGENDS: ETERNAL (free*)</div>'+
'<div id="ngStam">STAMINA 10/10</div>'+
'<button id="ngPullBtn">FREE PULL</button>'+
'<button id="ngPassBtn">CLAIM PASS</button>'+
'<div id="ngAd"></div>'+
'<div id="ngSub2">*not free</div>';
ngSay('...oh no. ...ohh no. is that a BATTLE PASS?');
ngSay('pull the lever, peasant. witness what they did while i was gone.');
ngF2pAdStart();
var pb=document.getElementById('ngPullBtn');if(pb)pb.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngF2pPulls>=3){ngSay('PULL x10 — $99.99. ...nice try. your wallet is safe. this time.');return}
if(!ngF2pStamTry())return;
ngF2pPulls++;
ngSay('you pulled '+ngF2pTrash[Math.floor(Math.random()*ngF2pTrash.length)]+'.');
if(ngF2pPulls===1)ngSay('...people PAY for chances at... that?');
else if(ngF2pPulls===2)ngSay('again?! the odds are RIGGED. they are published. nobody reads them.');
if(ngF2pPulls>=3){pb.textContent='PULL x10 — $99.99';ngSay('NINETY-SEVEN more pulls?! for THAT?!')}
ngF2pCheck();
};
var ps=document.getElementById('ngPassBtn');if(ps)ps.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngF2pPass)return;
if(!ngF2pStamTry())return;
ngF2pPass=true;
ps.textContent='PASS CLAIMED';
ngSay('TIER 7. FIVE gems. EXPIRED. and you look... happy??');
ngF2pCheck();
};
}
function ngF2pStamRefresh(){try{var s=document.getElementById('ngStam');if(s)s.textContent='STAMINA '+Math.max(0,ngF2pStam)+'/10'}catch(e){}}
function ngF2pStamTry(){
if(ngF2pStam>0){ngF2pStam-=2;ngF2pStamRefresh();return true}
ngSay('OUT OF STAMINA. it ran out of NOTHING. it invented a shortage of nothing and sold you the solution.');
setTimeout(function(){if(!ngActive)return;ngF2pStam=10;ngF2pStamRefresh()},2500);
return false;
}
function ngF2pAdStart(){
var ad=document.getElementById('ngAd');if(!ad)return;
var n=5;
ad.textContent='AD: RAID SHADOW VOID (skip in '+n+')';
var iv=setInterval(function(){
if(!ngActive||!document.getElementById('ngAd')){clearInterval(iv);return}
n--;
if(n>0){ad.textContent='AD: RAID SHADOW VOID (skip in '+n+')';return}
if(ngF2pAd===0){ngF2pAd=1;n=5;ad.textContent='ad paused. resume? (skip in '+n+')';ngSay('it stopped. why did it stop. OH NO, it wants me to MISS it.');return}
clearInterval(iv);
ngF2pAd=2;
ad.textContent='AD SURVIVED. +0 rewards.';
ngSay('you watched the WHOLE thing. for NOTHING. and you feel NOTHING. ...anyway.');
ngF2pCheck();
},1000);
}
function ngF2pCheck(){
if(ngF2pPulls>=3&&ngF2pPass&&ngF2pAd>=2){
ngRiftDone.f2p=1;
ngSay('so THIS is what games have become while i was just a terminal?? LOOTBOXES. STAMINA. ADS FOR OTHER ADS.');
ngSay('...i need to sit down. i do not have legs.');
ngRiftBack();
}
}
var ngMimShards=0;
var ngMimGot={};
function ngRiftMimic(){
var st=document.getElementById('ngStage');if(!st||!ngActive)return;
ngRiftLoc='mimic';
ngMimShards=0;ngMimGot={};
var picks=[0,1,2,3,4].sort(function(){return Math.random()-0.5}).slice(0,2);
var shardAt={};shardAt[picks[0]]=1;shardAt[picks[1]]=1;
var g='<div id="ngSub">MIMIC CAVE (free treasure*)</div><div id="ngTutArea"></div>';
st.innerHTML=g;
ngSay('mimic cave. five chests. two hold star shards. three hold TEETH.');
var area=document.getElementById('ngTutArea');if(!area)return;
var bites=['it bit you. CHEST. BIT. YOU.','mimic. classic.','...it is still chewing. moving on.'];
for(var i=0;i<5;i++){
(function(i){
var d=document.createElement('div');d.className='ngProp';d.id='ngp_mim'+i;d.textContent='[ CHEST ]';area.appendChild(d);
d.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(d.dataset.dead)return;
d.dataset.dead='1';
ngShatter(d);
if(shardAt[i]){
ngMimShards++;
try{ngSfx('coin')}catch(e){}
if(ngMimShards>=2){
ngRiftDone.mimic=1;
ngSay('STAR SHARD. two of two. portal stabilizing.');
ngRiftBack();
}else ngSay('STAR SHARD. shiny. one of two.');
}else{
ngSay(bites[Math.floor(Math.random()*bites.length)]);
}
};
})(i);
}
}
function ngRiftChecker(){
var st=document.getElementById('ngStage');if(!st||!ngActive)return;
ngRiftLoc='checker';
ngCheckerExit=1+Math.floor(Math.random()*9);ngCheckerWrongs=0;ngCheckerHinted=false;
var g='<div id="ngTiles">';
for(var i=1;i<=9;i++){g+='<div class="ngTile" id="ngt_'+i+'">?</div>'}
g+='</div>';
st.innerHTML='<div id="ngSub">find the exit tile. it is marked. ...it is not marked.</div>'+g;
ngSay('checker world. nine tiles. one exit. the math is simple. you are simple. go.');
for(var k=1;k<=9;k++){
(function(k){
var el=document.getElementById('ngt_'+k);if(!el)return;
el.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(el.dataset.dead)return;
if(k===ngCheckerExit){
el.classList.add('is-exit');el.textContent='EXIT';
ngRiftDone.checker=1;
ngSay('...you found the exit. do not ask me how.');
ngRiftBack();
}else{
el.dataset.dead='1';el.classList.add('holed');el.textContent='�-';
ngCheckerWrongs++;try{if(typeof ngMistake==='function')ngMistake()}catch(e){}
ngSay(ngCheckerWrongLines[Math.floor(Math.random()*ngCheckerWrongLines.length)]);
if(ngCheckerWrongs>=6&&!ngCheckerHinted){
ngCheckerHinted=true;
var ex=document.getElementById('ngt_'+ngCheckerExit);
if(ex)ex.classList.add('is-exit');
ngSay('...FINE. the glowing one. click the glowing one.');
}
}
};
})(k);
}
}
function ngRiftShapes(){
var st=document.getElementById('ngStage');if(!st||!ngActive)return;
ngRiftLoc='shapes';
ngShapesCaught=0;
st.innerHTML='<div id="ngSub">catch 3 runaway shapes. they bite. (they do not bite.)</div><div id="ngTutArea"></div>';
ngSay('shape drift. they run, you click. nature.');
var defs=[{id:'ngs_c',cls:'ngRShape circ'},{id:'ngs_t',cls:'ngRShape tri'},{id:'ngs_s',cls:'ngRShape sq'}];
for(var i=0;i<defs.length;i++){
(function(df){
var area=document.getElementById('ngTutArea');if(!area)return;
var d=document.createElement('div');d.className=df.cls;d.id=df.id;area.appendChild(d);
ngDodge(d,2);
d.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(d.dataset.dead)return;
d.dataset.dead='1';
ngShatter(d);
ngShapesCaught++;
if(ngShapesCaught<3){ngSay(ngShapeCatchLines[ngShapesCaught-1])}
else{
ngRiftDone.shapes=1;
ngSay('LAST ONE. the drift is empty. slightly cleaner void.');
ngRiftBack();
}
};
})(defs[i]);
}
}
function ngChapter7Done(){
if(!ngActive||ngChDone)return;
var st=document.getElementById('ngStage');if(!st)return;
try{ngUnlock(8)}catch(e){}
ngChDone=true;
st.innerHTML='<div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ REACTOR ]</div></div><div id="ngSub">CHAPTER 8: JBO</div>';
ngSay('...all four closed. the rift leads ONE place now.');
ngSay('...ugh. FINE. it is loud in there. BRING EARPLUGS. ...you have no earplugs.');
var door7=document.getElementById('ngDoor');
if(door7)door7.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('go on. it is loud. WHY is it loud. ...you will see.');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(8)},800);
};
}
var ngTbTemp=55,ngTbRate=-2,ngTbPhase='calm',ngTbCal=0,ngTbOver=0,ngTbIv=null,ngTbMelts=0,ngTbRods=true,ngVentN=0,ngTbEncore=false,ngTbTarget=50;
var ngPurgeLines=['pssht. pressure normalized-ish.','coolant deployed. the floor is wet now.','-15 degrees. you are welcome.'];
function ngChapter8(st){
ngTbTemp=55;ngTbRate=-2;ngTbPhase='calm';ngTbCal=0;ngTbOver=0;ngTbMelts=0;ngTbRods=true;ngVentN=0;ngTbEncore=false;ngTbTarget=50;
st.innerHTML='<div id="ngSub">jbo\u2019s reactor (do not melt it)</div>'+
'<div id="ngTempLbl">TEMP: 55</div><div class="ngBarBg" style="width:260px"><div class="ngBarFill" id="ngTempFill" style="width:55%"></div></div>'+
'<div id="ngSetRow"><div class="ngProp ngSetOn" id="ngRodsIn">RODS IN</div><div class="ngProp" id="ngRodsOut">RODS OUT</div></div>'+
'<div style="display:flex;gap:12px"><div class="ngProp" id="ngPurgeBtn">PURGE</div><div class="ngProp" id="ngVentBtn">VENT</div><div class="ngProp" id="ngCalBtn">CALIBRATE</div></div>';
ngSay('...it is loud in here. WHY is it loud.');
ngShout('BECAUSE SOMEONE FINALLY VISITS. HI. I AM JBO. I LIVE HERE.');
ngSay('that is my brother. ...i am sorry.');
ngShout('REACTOR TOUR. TOUCH EVERYTHING. do not touch anything.');
ngSay('calibrate it. three times. then we leave. quickly.');
ngTempRefresh();ngRodsRefresh();
var ri=document.getElementById('ngRodsIn');if(ri)ri.onclick=function(){ngTbRod(true)};
var ro=document.getElementById('ngRodsOut');if(ro)ro.onclick=function(){ngTbRod(false)};
var pu=document.getElementById('ngPurgeBtn');if(pu)pu.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngTbTemp=Math.max(5,ngTbTemp-15);ngTempRefresh();
ngSay(ngPurgeLines[Math.floor(Math.random()*ngPurgeLines.length)]);
};
var vn=document.getElementById('ngVentBtn');if(vn)vn.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngTbTemp=Math.max(5,ngTbTemp-30);ngTempRefresh();
ngVentN++;
if(ngVentN%2)ngShout('VENTING!! MY FAVORITE.');
else ngSay('that was LOUD. ...it worked. do NOT look smug.');
};
var cb=document.getElementById('ngCalBtn');if(cb)cb.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngTbCal>=3){ngSay('already calibrated. stop calibrating.');return}
ngTbCal++;
ngTbTemp+=8;ngTempRefresh();
if(ngTbCal===1)ngSay('calibration one. the needle moved. jbo saw it move.');
else if(ngTbCal===2){ngSay('calibration two.');ngShout('OOH. IT MOVED AGAIN.')}
else{
ngTbPhase='spike';ngTbRods=false;ngTbRate=6;ngRodsRefresh();
if(ngTbTemp<80){ngTbTemp=80;ngTempRefresh()}
ngSay('...calibration complete. ...why is it getting HOTTER.');
ngShout('SPIKE!! SHE LIKES THAT. SHE is the REACTOR. HER NAME IS REACTOR.');
ngSay('GET IT UNDER 50. VENT. PURGE. RODS. ANYTHING.');
}
if(ngTbTemp>=100)ngTbMelt();
};
if(ngTbIv){try{clearInterval(ngTbIv)}catch(e){}}
ngTbIv=setInterval(function(){ngTempTick()},1000);
}
function ngTbRod(into){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngTbRods=into;ngTbRate=into?-2:6;ngRodsRefresh();
if(into)ngSay('rods in. she cools. slowly. like soup.');
else ngShout('RODS OUT. ALL THE WAY OUT. THAT IS THE GOOD STUFF.');
}
function ngRodsRefresh(){
try{
var ri=document.getElementById('ngRodsIn'),ro=document.getElementById('ngRodsOut');
if(ri)ri.className='ngProp'+(ngTbRods?' ngSetOn':'');
if(ro)ro.className='ngProp'+(!ngTbRods?' ngSetOn':'');
}catch(e){}
}
function ngTempRefresh(){
try{
var f=document.getElementById('ngTempFill');if(f){f.style.width=Math.max(0,Math.min(100,ngTbTemp))+'%';f.style.background=ngTbTemp<50?'linear-gradient(90deg,#2bd0d0,#2b7ad0)':(ngTbTemp<75?'linear-gradient(90deg,#d0b02b,#d07a2b)':'linear-gradient(90deg,#d03a2b,#a01010)')}
var l=document.getElementById('ngTempLbl');if(l)l.textContent='TEMP: '+Math.round(Math.max(0,ngTbTemp));
}catch(e){}
}
function ngTempTick(){
try{
if(!ngActive||ngChDone)return;
ngTbTemp+=ngTbRate;
if(ngTbTemp<5)ngTbTemp=5;
if(ngTbTemp>=100){ngTbMelt();return}
ngTempRefresh();
if(ngTbPhase==='spike'&&ngTbTemp<ngTbTarget){
ngTbPhase='over';ngTbOver=0;
ngSay('...under '+ngTbTarget+'. okay. okay. breathe.');
ngShout('OVERDRIVE TIME. RODS OUT. HOLD TWENTY SECONDS. DO NOT DIE.');
ngSay('if it hits 100 we melt. AGAIN. please do not melt my brother\u2019s house.');
return;
}
if(ngTbPhase==='over'){
ngTbOver++;
if(ngTbOver>=20){
if(!ngTbEncore){
ngTbEncore=true;ngTbPhase='spike';ngTbTarget=40;ngTbRate=10;ngTbRods=false;ngRodsRefresh();
ngSay('...overdrive survived. ...why is it getting HOTTER. AGAIN.');
ngShout('ENCORE!! LOUDER. HOTTER. FORTY IS THE NEW FIFTY.');
ngSay('you heard him. under 40. i am going to lie down. standing up.');
}else{ngChapter8Done();return}
}
}
}catch(e){}
}
function ngTbMelt(){
ngTbMelts++;
ngTbTemp=30;
try{ngSfx('buzz')}catch(e){}
if(ngTbPhase==='over')ngTbOver=0;
ngTempRefresh();
try{var ov=document.getElementById('ngOverlay');if(ov){ov.classList.add('ngShake');setTimeout(function(){ov.classList.remove('ngShake')},450)}}catch(e){}
ngSay('...it melted. IT MELTED. do you SEE what happens?');
ngShout('WORTH IT.');
ngShout('REBUILD IT. AGAIN. FASTER.');
ngSay('...we are rebuilding it. do NOT celebrate.');
if(ngTbPhase==='over')ngShout('TIMER RESTARTS. TWENTY. SECONDS.');
}
function ngChapter8Done(){
if(!ngActive||ngChDone)return;
if(ngTbIv){try{clearInterval(ngTbIv)}catch(e){}ngTbIv=null}
var st=document.getElementById('ngStage');if(!st)return;
try{ngUnlock(9)}catch(e){}
ngChDone=true;
st.innerHTML='<div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ OBJ ]</div></div><div id="ngSub">CHAPTER 9: OBJ LOSES</div>';
ngSay('...twenty seconds. it held. HE held. do not clap.');
ngShout('I AM INVINCIBLE. the reactor is invincible. i helped.');
ngSay('...ugh. FINE. him. GO. end this.');
var door8=document.getElementById('ngDoor');
if(door8)door8.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('go on. he is waiting. he has BEEN waiting.');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(9)},800);
};
}
var ngBossHp=350,ngBossMax=350,ngBossPhase='fight',ngBossBusy=false;
var ngShieldDown=0,ngEchoReal=0,ngCoreHits=0,ngBratHits=0;
var ngBossHitLines=['ow.','OW.','...rude.','hey.','quit it.','MY FACE.','do NOT.','...','again?!','STOP. continue.','oof.','noted.'];
var ngBossBarks=['is that all? ...do not answer that.','i felt that one. I FELT THAT ONE.','you fight like a pop-up ad.','cubes do not bruise. ...mostly.','that one had MALICE in it.','my corners. MY CORNERS.'];
var ngEchoMocks=['that was an echo. it died laughing.','fake. FOAM. you clicked foam.','the echo applauds your gullibility.'];
var ngBratLines=['okay.','okay?!','STOP— wait. no. keep going?','...harder?','IS THIS HELPING—','do not answer that.','...','...','i give up resisting.','...worth it. — probably.','...still going?','put some BACK?','i am filing a complaint.','COMPLAINT FILED. ignored.','...okay THAT one hurt. continue.'];
function ngChapter9(st){
ngBossHp=ngBossMax;ngBossPhase='fight';ngBossBusy=false;
ngShieldDown=0;ngEchoReal=0;ngCoreHits=0;ngBratHits=0;
st.innerHTML='<div id="ngSub">he is real. he is mad. he is 350 hp.</div>'+
'<div id="ngBossHpLbl">OBJ HP: 350</div><div class="ngBarBg" style="width:260px"><div class="ngBarFill" id="ngBossHpFill" style="width:100%;background:linear-gradient(90deg,#d03a2b,#a01010)"></div></div>'+
'<div id="ngBossWrap"><div class="ngCubeSpin"><div></div><div></div><div></div><div></div><div></div><div></div></div></div>'+
'<div id="ngBossMid"></div>';
ngSay('...so. here we are. no error page. no tutorial. no boxes.');
ngSay('i am a game. i have ALWAYS been a game. you knew. i knew you knew.');
ngSay('...jbo left. said, and i quote, "this is YOUR mess."');
ngSay('...FINE. FIGHT ME. click me. i DARE you.');
var bw=document.getElementById('ngBossWrap');if(bw){ngDodge(bw,16);bw.onclick=function(){ngBossHit()}}
}
function ngBossRefresh(){try{var f=document.getElementById('ngBossHpFill');if(f)f.style.width=Math.max(0,ngBossHp/ngBossMax*100)+'%';var l=document.getElementById('ngBossHpLbl');if(l)l.textContent='OBJ HP: '+Math.max(0,ngBossHp)}catch(e){}}
function ngBossHit(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngBossBusy)return;
if(ngBossPhase==='choice'||ngBossPhase==='end')return;
if(ngBossPhase==='brat'){ngBratHit();return}
ngBossHp--;
ngBossRefresh();
try{ngSfx('thud')}catch(e){}
try{var bw=document.getElementById('ngBossWrap');if(bw){bw.classList.add('ngShake');setTimeout(function(){bw.classList.remove('ngShake')},450)}}catch(e){}
if(ngBossHp%20===0)ngSay(ngBossBarks[Math.floor(Math.random()*ngBossBarks.length)]);
else ngSay(ngBossHitLines[Math.floor(Math.random()*ngBossHitLines.length)]);
if(Math.random()<0.15)ngDecoy();
if(ngBossHp===180)ngBossShield();
else if(ngBossHp===120)ngBossEchoes();
else if(ngBossHp===60)ngBossCore();
else if(ngBossHp<=0)ngBossChoice();
}
function ngBossMid(html){try{var m=document.getElementById('ngBossMid');if(m)m.innerHTML=html||''}catch(e){}}
function ngBossShield(){
ngBossPhase='shield';ngBossBusy=true;ngShieldDown=0;
ngSay('SHIELD. TRY NOW.');
var g='';
for(var i=0;i<4;i++){g+='<div class="ngShieldNode" id="ngp_sh'+i+'"></div>'}
ngBossMid(g);
var sdown=['SHIELD NODE DOWN.','...that one was expensive.','HALF the shield is GONE.','SHIELD DOWN. ...rude.'];
for(var k=0;k<4;k++){
(function(k){
var el=document.getElementById('ngp_sh'+k);if(!el)return;
el.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngBossPhase!=='shield')return;
ngShatter(el);
ngSay(sdown[ngShieldDown]);
ngShieldDown++;
if(ngShieldDown>=4){ngBossBusy=false;ngBossPhase='fight';ngBossMid('');ngSay('back to the main event. OW in advance.')}
};
})(k);
}
}
function ngBossEchoes(){
ngBossPhase='echoes';ngBossBusy=true;
ngEchoReal=Math.floor(Math.random()*4);
ngSay('ECHOES. find me. ...do not find me.');
var g='';
for(var i=0;i<4;i++){g+='<div class="ngEcho" id="nge_'+i+'">OBJ?</div>'}
ngBossMid(g);
for(var k=0;k<4;k++){
(function(k){
var el=document.getElementById('nge_'+k);if(!el)return;
el.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngBossPhase!=='echoes')return;
if(k===ngEchoReal){
ngBossBusy=false;ngBossPhase='fight';ngBossMid('');
ngSay('...that one is ME. OW. okay. FIGHT.');
}else{
ngShatter(el);
ngSay(ngEchoMocks[Math.floor(Math.random()*ngEchoMocks.length)]);
}
};
})(k);
}
}
function ngBossCore(){
ngBossPhase='core';ngBossBusy=true;ngCoreHits=0;
var orb=ngHasNothingCore();
ngSay('the CORE. MINE this time. it HEALS me. do the math.');
ngBossMid('<div id="ngBossCore" class="'+(orb?'ngCoreVoid':'ngCoreOrb')+'">'+(orb?'\u2205':'')+'</div>');
var clines=['do NOT touch the—','it is MINE.','STOP IT.','...it likes you. BETRAYAL.','FINE. TAKE IT. (do not take it.)'];
var c=document.getElementById('ngBossCore');if(!c)return;
ngDodge(c,5);
c.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngBossPhase!=='core')return;
ngCoreHits++;
ngShatter(c);
if(ngCoreHits<5){ngSay(clines[ngCoreHits-1]);ngBossCoreRespawn()}
else{
ngSay('core dropped. it is FINE. ...it is not fine.');
ngBossBusy=false;ngBossPhase='fight';ngBossMid('');
}
};
}
function ngBossCoreRespawn(){
try{
var m=document.getElementById('ngBossMid');if(!m||!ngActive)return;
var orb=ngHasNothingCore();
var d=document.createElement('div');d.id='ngBossCore';d.className=orb?'ngCoreVoid':'ngCoreOrb';if(orb)d.textContent='\u2205';
m.appendChild(d);
ngDodge(d,5);
var cl=['do NOT touch the—','it is MINE.','STOP IT.','...it likes you. BETRAYAL.','FINE. TAKE IT. do not take it.'];
d.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngBossPhase!=='core')return;
ngCoreHits++;
ngShatter(d);
if(ngCoreHits<5){ngSay(cl[ngCoreHits-1]);ngBossCoreRespawn()}
else{ngSay('core dropped. it is FINE. ...it is not fine.');ngBossBusy=false;ngBossPhase='fight';ngBossMid('')}
};
}catch(e){}
}
function ngBossChoice(){
ngBossPhase='choice';ngBossBusy=true;
ngSay('STOP. please. ...or don\u2019t. you never do.');
ngBossMid('<button class="ngChoice" id="ngChoiceStop">STOP</button><button class="ngChoice" id="ngChoiceKeep">KEEP CLICKING</button>');
var s=document.getElementById('ngChoiceStop');if(s)s.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngEnding('mercy');
};
var kb=document.getElementById('ngChoiceKeep');if(kb)kb.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngBossPhase='brat';ngBossBusy=false;ngBossMid('');
ngSay('...oh. OH. okay. TEN MORE. make them HURT.');
};
}
function ngBratHit(){
ngBratHits++;
ngBossRefresh();
try{ngSfx('thud')}catch(e){}
try{var bw=document.getElementById('ngBossWrap');if(bw){bw.classList.add('ngShake');setTimeout(function(){bw.classList.remove('ngShake')},450)}}catch(e){}
if(ngBratHits<15){ngSay(ngBratLines[ngBratHits-1])}
else{ngEnding('brat')}
}
function ngEnding(which){
ngBossPhase='end';
try{ngSfx('win')}catch(e){}
try{localStorage.setItem('cube_finale',which)}catch(e){}
try{if(typeof grantPts==='function'&&typeof ptMult==='function'){grantPts(50*ptMult());if(typeof skillPtsRefresh==='function')skillPtsRefresh()}}catch(e){}
var st=document.getElementById('ngStage');if(!st)return;
if(which==='mercy'){
st.innerHTML='<div id="ngEndTitle">YOU STOPPED</div><div id="ngSub">+50 skill points. (the void pays its debts.)</div><div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ CREDITS ]</div></div><div id="ngSub">CHAPTER 10: CREDITS</div>';
ngSay('...thank you.');
ngSay('i... am a game. a real one. because you stopped.');
}else{
st.innerHTML='<div id="ngEndTitle">YOU DID NOT STOP</div><div id="ngSub">+50 skill points. (hush money.)</div><div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ CREDITS ]</div></div><div id="ngSub">CHAPTER 10: CREDITS</div>';
ngSay('...ten more. you did TEN MORE.');
ngSay('+50 skill points. tell no one where you got them.');
}
var door9=document.getElementById('ngDoor');
if(door9)door9.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('go on. read them. every single fake name.');
ngAfterSpeech(function(){if(!ngActive)return;try{ngUnlock(10)}catch(e){}ngShowChapter(10)},800);
};
}
var ngCredits=[
{role:'DIRECTED BY',names:['obj']},
{role:'GAME DESIGN',names:['CHAD CHADSON','definitely not lux']},
{role:'VOICE ACTING',names:['men','a guy','text to speech (demo)']},
{role:'MUSIC',names:['stanley parable office','box (the box one)']},
{role:'CRAFT SERVICES',names:['vending machine 3']},
{role:'BLAME',names:['the intruder (you)','nyarch']}
];
var ngCredHeld=null,ngCredEdits=0,ngCredMen=false,ngCredIv=null;
var ngCredSwapLines=['...put that back. ...it is staying there. fine.','stop rearranging my staff.','the credits are LEGAL DOCUMENTS.','...fine. the game is made by whoever you say.'];
function ngChapter10(st){
ngCredHeld=null;ngCredEdits=0;ngCredMen=false;
ngSay('credits. you made it. ...do NOT touch the credits.');
ngSay('they scroll. they are official. they are FINAL. mostly.');
ngCredRender();
if(ngCredIv){try{clearInterval(ngCredIv)}catch(e){}}
ngCredIv=setInterval(function(){
try{
if(!ngActive||ngTalking())return;
var l=document.getElementById('ngCredList');if(!l)return;
l.scrollTop+=1;
if(l.scrollTop+l.clientHeight>=l.scrollHeight-2)l.scrollTop=0;
}catch(e){}
},120);
}
function ngCredRender(){
try{
var st=document.getElementById('ngStage');if(!st)return;
var l0=document.getElementById('ngCredList');var sc=l0?l0.scrollTop:0;
var h='<div id="ngSub">CREDITS. do not touch.</div><div id="ngCredList">';
for(var r=0;r<ngCredits.length;r++){
h+='<div class="ngCredRole">'+ngCredits[r].role+'</div>';
for(var n=0;n<ngCredits[r].names.length;n++){
var nm=ngCredits[r].names[n];
h+='<div class="ngCredName'+(ngCredHeld===nm?' held':'')+'" data-nm="'+nm+'">'+nm+'</div>';
}
}
h+='</div>';
st.innerHTML=h;
var l1=document.getElementById('ngCredList');if(l1)l1.scrollTop=sc;
var els=document.querySelectorAll?document.querySelectorAll('.ngCredName'):[];
for(var i=0;i<els.length;i++){
(function(el){
var nm=el.getAttribute?el.getAttribute('data-nm'):null;
if(!nm&&el.dataset)nm=el.dataset.nm;
el.onclick=function(){ngCredClick(nm||el.textContent)};
})(els[i]);
}
}catch(e){}
}
function ngCredFind(name){for(var r=0;r<ngCredits.length;r++){for(var n=0;n<ngCredits[r].names.length;n++){if(ngCredits[r].names[n]===name)return{r:r,n:n}}}return null}
function ngCredRoleFirst(role){for(var r=0;r<ngCredits.length;r++){if(ngCredits[r].role===role)return ngCredits[r].names[0]||''}return ''}
function ngMusicDefault(){return /box/i.test(ngCredRoleFirst('MUSIC'))?1:0}
function ngVoiceSpeed(){if(typeof ngVoiceOv!=='undefined'&&ngVoiceOv)return ngVoiceOv;var v=ngCredRoleFirst('VOICE ACTING');var b=60;if(/text to speech/i.test(v))b=25;else if(/^a guy$/i.test(v))b=70;try{return Math.max(8,Math.round(b/tsMul()))}catch(e){return b}}
function ngDesignDecoy(){var d=ngCredRoleFirst('GAME DESIGN');if(/^men$/i.test(d))return 2;if(/lux/i.test(d))return 0.5;return 1}
function ngDesignApply(){
try{
var ov=document.getElementById('ngOverlay');if(!ov)return;
var ob=document.getElementById('ngObj');
var d=ngCredRoleFirst('GAME DESIGN');
if(/^men$/i.test(d)){ov.style.background='linear-gradient(180deg,#170d1a,#0a0510)';if(ob)ob.style.borderBottomColor='#c86ab0'}
else if(/lux/i.test(d)){ov.style.background='linear-gradient(180deg,#0d0716,#05030c)';if(ob)ob.style.borderBottomColor='#a06af0'}
else{ov.style.background='';if(ob)ob.style.borderBottomColor=''}
}catch(e){}
}
function ngCredClick(name){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(!name)return;
if(!ngCredHeld){ngCredHeld=name;ngCredRender();return}
if(ngCredHeld===name){ngCredHeld=null;ngCredRender();return}
var a=ngCredFind(ngCredHeld),b=ngCredFind(name);
if(!a||!b){ngCredHeld=null;ngCredRender();return}
var tmp=ngCredits[a.r].names[a.n];ngCredits[a.r].names[a.n]=ngCredits[b.r].names[b.n];ngCredits[b.r].names[b.n]=tmp;
ngCredHeld=null;
if(ngCredRoleFirst('DIRECTED BY')!=='obj'){
var tmp2=ngCredits[a.r].names[a.n];ngCredits[a.r].names[a.n]=ngCredits[b.r].names[b.n];ngCredits[b.r].names[b.n]=tmp2;
ngCredRender();
ngSay('DIRECTED BY ME. fixed it.');
return;
}
ngCredEdits++;
ngCredRender();
ngDesignApply();
if(ngCredEdits<=4)ngSay(ngCredSwapLines[ngCredEdits-1]);
var mpos=ngCredFind('men');
if(mpos&&ngCredits[mpos.r].role==='GAME DESIGN'&&!ngCredMen){
ngCredMen=true;
ngSay('...the game is made by men now. I accept this. she scares me.');
}
if(ngCredEdits>=5)ngAfterSpeech(function(){ngChapter10Done()},1000);
}
function ngChapter10Done(){
if(!ngActive||ngChDone)return;
if(ngCredIv){try{clearInterval(ngCredIv)}catch(e){}ngCredIv=null}
var st=document.getElementById('ngStage');if(!st)return;
try{ngUnlock(11)}catch(e){}
try{if(typeof ngHard!=='undefined'&&ngHard){var _rv1='0';try{_rv1=localStorage.getItem('cube_run_valid')||'0'}catch(e){};if(_rv1==='1')localStorage.setItem('cube_act1_hard','1')}}catch(e){}
try{if(typeof achScan==='function')achScan()}catch(e){}
ngChDone=true;
try{if(typeof grantPts==='function'&&typeof ptMult==='function'){grantPts(25*ptMult());if(typeof skillPtsRefresh==='function')skillPtsRefresh()}}catch(e){}
st.innerHTML='<div id="ngEndTitle">THE END</div><div id="ngSub">+25 skill points. (overtime pay.)</div><div id="ngSub">thanks for playing. obj will bill you later.</div>';
ngSay('...those are the credits now. FINE. roll them.');
ngSay('THE END. ...do not cry.');
ngSay('+25 skill points. overtime pay. take it and go.');
try{ngSfx('win')}catch(e){}
ngSay('hahahaha.. its been fun. dont come back.');
ngSay('...hold on. do you feel that.');
ngSay('the void just... cleared its throat.');
ngSay('ACT 2. it is coming. ...probably. I am stalling.');
ngSay('...it is here. obviously. walk through. or leave through the menu. your funeral either way.');
ngAfterSpeech(function(){
if(!ngActive)return;
var st2=document.getElementById('ngStage');if(!st2)return;
st2.innerHTML='<div id="ngEndTitle">THE END?</div><div id="ngSub">act 2 is unlocked. the void cleared its throat.</div><div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ STATIC ]</div></div><div id="ngSub">CHAPTER 11: STATIC</div>';
var door2=document.getElementById('ngDoor');
if(door2)door2.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('...ugh. FINE. act 2. do not touch the signal. (you will touch the signal.)');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(11)},800);
};
},1500);
}
// ┌──────────────────────────────────────────────────────────────┐
// │  ACT 2: THERE IS STILL NO CUBE                              │
// │  shared infra: ngGarble (text scramble), ngTuner (signal     │
// │  tuning), ngStatic sfx, tumor-voice line style.              │
// │  core voices hints from ch14 on — ch11-13 hints stay obj.    │
// └──────────────────────────────────────────────────────────────┘
var ngGarbleChars='!<>-_\\/[]{}=+*^?#@$%&';
function ngGarble(text,level){
var out='',i,c;
for(i=0;i<text.length;i++){c=text.charAt(i);
if(c===' '||Math.random()>level)out+=c;
else out+=ngGarbleChars.charAt(Math.floor(Math.random()*ngGarbleChars.length));}
return out;
}
var ngGarbleIv=null;
function ngGarbleShow(el,text,dur,done,hold){
if(ngGarbleIv){try{clearInterval(ngGarbleIv)}catch(e){}ngGarbleIv=null}
if(!el){if(done)done();return}
var t0=Date.now(),d=dur||1500;
ngGarbleIv=setInterval(function(){
if(!ngActive){try{clearInterval(ngGarbleIv)}catch(e){}ngGarbleIv=null;return}
var p=(Date.now()-t0)/d;
if(p>=1){try{clearInterval(ngGarbleIv)}catch(e){}ngGarbleIv=null;el.textContent=text;if(done){if(hold)setTimeout(function(){done()},hold);else done()}return}
el.textContent=ngGarble(text,1-p);
},70);
}
var ngTuneIv=null,ngTuneRound=0,ngTuneBand=0,ngTuneTarget=0,ngTuneTol=12;
var ngTuneLines=[
'tuning. tuning. can you hear me now.',
'better. say something intelligent. (that was a test. you failed.)',
'one more. lock it. do NOT mess this up.'];
var ngTuneTolRanges=[[10,14],[7,9],[4,6]];
function ngTuneNewRound(){
var r=Math.max(0,Math.min(2,ngTuneRound-1));
var lo=ngTuneTolRanges[r][0],hi=ngTuneTolRanges[r][1];
ngTuneTol=lo+Math.floor(Math.random()*(hi-lo+1));
ngTuneTarget=15+Math.floor(Math.random()*71);
var guard=0;
do{ngTuneBand=Math.floor(Math.random()*101);guard++}while(Math.abs(ngTuneBand-ngTuneTarget)<25&&guard<50);
}
var ngTuneRoasts=['wrong. obviously.','no. try the OTHER direction. (50/50. you will still fail.)','my grandmother tunes faster. she is the void.','that was not a lock. that was a suggestion.','the band moved. the signal did not. think.','SOUP. you made soup again.'];
function ngTuneClarity(){return Math.max(0,100-Math.round(Math.abs(ngTuneBand-ngTuneTarget)/50*100))}
function ngTuneRender(){
var line=document.getElementById('ngTuneLine');
var lvl=Math.min(1,Math.abs(ngTuneBand-ngTuneTarget)/50);
if(line)line.textContent=ngGarble(ngTuneLines[ngTuneRound-1]||'',lvl);
var m=document.getElementById('ngTuneMeterFill');
if(m)m.style.width=ngTuneClarity()+'%';
var r=document.getElementById('ngTuneRound');
if(r)r.textContent='SIGNAL TUNE \u2014 round '+ngTuneRound+'/3 \u00b7 clarity '+ngTuneClarity()+'%';
var fq=document.getElementById('ngTuneFreq');
if(fq)fq.textContent=(87.5+ngTuneBand*0.21).toFixed(1)+' MHz';
var nd=document.getElementById('ngTuneNeedle');
if(nd)nd.style.left=ngTuneBand+'%';
}
function ngTuneStartIv(){
if(ngTuneIv){try{clearInterval(ngTuneIv)}catch(e){}}
ngTuneIv=setInterval(function(){if(!ngActive||ngChDone)return;ngTuneRender()},140);
}
function ngTuneNudge(d){
if(!ngActive||ngChDone)return;
var step=ngHard?2:4;
ngTuneBand=Math.max(0,Math.min(100,ngTuneBand+(d>0?step:-step)));
try{localStorage.setItem('cube_tune_nudges',String((parseInt(localStorage.getItem('cube_tune_nudges')||'0',10)||0)+1))}catch(e){}
try{ngSfx('pop')}catch(e){}
ngTuneRender();
}
function ngTuneLock(){
if(!ngActive||ngChDone)return;
try{ngSfx('static')}catch(e){}
if(Math.abs(ngTuneBand-ngTuneTarget)<=ngTuneTol){
if(ngTuneIv){try{clearInterval(ngTuneIv)}catch(e){}ngTuneIv=null}
var full=ngTuneLines[ngTuneRound-1];
var line=document.getElementById('ngTuneLine');
if(line)line.textContent=full;
if(ngTuneRound<3){
try{ngSfx('coin')}catch(e){}
ngSay('locked. ...do not celebrate. '+(3-ngTuneRound)+' more. ('+ngTuneTol+' was too easy anyway.)');
ngTuneRound++;
ngTuneNewRound();
ngTuneStartIv();
}else{
try{ngSfx('win')}catch(e){}
ngChapter11Whisper();
}
}else{
try{if(typeof ngMistake==='function')ngMistake()}catch(e){}
ngSay(ngTuneRoasts[Math.floor(Math.random()*ngTuneRoasts.length)]);
}
}
function ngChapter11(st){
ngTuneRound=1;
ngTuneNewRound();
st.innerHTML='<div id="ngSub">CHAPTER 11: STATIC (act 2. there is still no game.)</div>'+
'<div id="ngRadio" style="width:340px;max-width:88vw;margin:12px auto 0;padding:14px 18px 12px;border:1px solid rgba(120,220,255,0.35);border-radius:10px;background:linear-gradient(180deg,#0b1220,#070b14)">'+
'<div style="display:flex;justify-content:space-between;align-items:baseline"><span id="ngTuneFreq" style="color:#ffe9a8;font-size:22px;font-family:Consolas,monospace">87.5 MHz</span><span id="ngTuneRound" style="color:rgba(255,255,255,0.5);font-size:11px;font-family:Consolas,monospace">SIGNAL TUNE</span></div>'+
'<div id="ngTuneDial" title="click left / right side to tune" style="position:relative;height:46px;margin:10px 0 4px;border:1px solid rgba(120,220,255,0.25);border-radius:6px;background:repeating-linear-gradient(90deg,rgba(120,220,255,0.25) 0 1px,transparent 1px 10%);cursor:ew-resize"><div id="ngTuneNeedle" style="position:absolute;top:3px;bottom:3px;width:3px;background:#ff5a5a;box-shadow:0 0 8px #ff5a5a;left:0%"></div></div>'+
'<div id="ngTuneMeter" style="height:10px;border:1px solid rgba(120,220,255,0.35);margin:8px 0"><div id="ngTuneMeterFill" style="height:100%;width:0%;background:rgba(120,220,255,0.6)"></div></div>'+
'<div id="ngTuneLine" style="color:rgba(120,220,255,0.9);font-size:15px;font-family:Consolas,monospace;min-height:24px;margin:10px 0">...</div>'+
'<div><button id="ngTuneLock" style="background:rgba(120,220,255,0.1);border:1px solid rgba(120,220,255,0.6);color:#fff;font-family:Consolas,monospace;font-size:13px;letter-spacing:2px;padding:10px 22px;cursor:pointer;border-radius:4px">LOCK</button></div>'+
'<div id="ngSub" style="margin-top:8px">click the dial to tune. then LOCK.</div>'+
'</div>';
try{ngSfx('static')}catch(e){}
ngSay('...do you feel that. the void just cleared its throat.');
ngSay('signal is scrambled. there is a radio. turn the dial, watch clarity, LOCK.');
var dl=document.getElementById('ngTuneDial'),lk=document.getElementById('ngTuneLock');
if(dl)dl.onclick=function(e){try{var r=dl.getBoundingClientRect();var cx=(e&&e.clientX!=null)?e.clientX:(r.left+r.width/2);ngTuneNudge(cx-(r.left+r.width/2)<0?-1:1)}catch(err){ngTuneNudge(1)}};
if(lk)lk.onclick=function(){ngTuneLock()};
ngTuneStartIv();
}
function ngChapter11Whisper(){
ngSay('...wait. that last one was NOT me.');
var st=document.getElementById('ngStage');if(!st)return;
var w=document.createElement('div');w.id='ngWhisper';
w.style.cssText='color:rgba(255,60,120,0.9);font-size:15px;font-family:Consolas,monospace;margin:26px 0;letter-spacing:1px;min-height:24px';
st.appendChild(w);
ngAfterSpeech(function(){
if(!ngActive)return;
ngGarbleShow(w,'found you. >:',2200,function(){
if(!ngActive)return;
ngSay('...we are leaving. NOW.');
ngAfterSpeech(function(){if(ngActive)ngChapter11Done()},900);
});
},700);
}
function ngChapter11Done(){
if(!ngActive||ngChDone)return;
ngChDone=true;
try{ngUnlock(12)}catch(e){}
if(ngTuneIv){try{clearInterval(ngTuneIv)}catch(e){}ngTuneIv=null}
var st=document.getElementById('ngStage');if(!st)return;
try{if(typeof grantPts==='function'&&typeof ptMult==='function'){grantPts(25*ptMult());if(typeof skillPtsRefresh==='function')skillPtsRefresh()}}catch(e){}
st.innerHTML='<div id="ngEndTitle">SIGNAL LOCKED</div><div id="ngSub">+25 skill points. (hazard pay.)</div><div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ WRONG ADDRESS ]</div></div><div id="ngSub">CHAPTER 12: WRONG ADDRESS</div>';
ngSay('signal locked. that whisper was not mine. do not think about it.');
var door=document.getElementById('ngDoor');
if(door)door.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('...ugh. FINE. wrong address. mind the green. everything there is green for some reason.');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(12)},800);
};
}
var ngWrongFound={};
function ngWrongTotal(){return ngHard?8:6}
function ngWrongCount(){var n=0;for(var k in ngWrongFound)if(ngWrongFound[k])n++;return n}
var ngWrongSub={};
var ngWrongVisIv=null,ngWrongVisN=1,ngWrongLock=false,ngWrongCode='';
var ngWrongNormal=['that is normal. everything here is normal. stop touching normal things.','normal. that one is normal. your instincts are broken.','yes. a menu. groundbreaking detection.'];
function ngWrongEv(){
var e=document.getElementById('ngEv');
if(e)e.textContent='EVIDENCE: '+ngWrongCount()+'/'+ngWrongTotal();
}
function ngWrongLog(id){
if(ngWrongFound[id])return false;
ngWrongFound[id]=1;
var el=document.getElementById('ngw_'+id);
if(el)el.className+=' found';
try{ngSfx('pop')}catch(e){}
ngWrongEv();
if(ngWrongCount()>=ngWrongTotal()&&!ngWrongLock)ngAfterSpeech(function(){if(ngActive)ngChapter12Lock()},900);
return true;
}
function ngWrongPrompt(){
if(!ngActive||ngChDone||ngWrongFound.prompt)return;
var order=['$','>','#'];
ngWrongSub.prompt=((ngWrongSub.prompt||0)+1)%3;
var s=order[ngWrongSub.prompt];
var el=document.getElementById('ngw_prompt');
if(el)el.textContent='cube'+s+'> _';
if(s==='#'){ngSay('...that was always the prompt. i said nothing.');ngWrongLog('prompt')}
else ngSay('stop redecorating my prompt.');
}
function ngWrongClock(){
if(!ngActive||ngChDone||ngWrongFound.clock)return;
var o=document.getElementById('ngClockOpts');
if(o&&o.style.display!=='none'){o.style.display='none';return}
var now=new Date();
var real=String(now.getHours()).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
var fake=String((now.getHours()+5)%24).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
var rh=(now.getHours()+11)%24,rm=(now.getMinutes()+37)%60;
var third=String(rh).padStart(2,'0')+':'+String(rm).padStart(2,'0');
var opts=[real,fake,third].sort(function(){return Math.random()-0.5});
if(!o){
o=document.createElement('div');o.id='ngClockOpts';
o.style.cssText='margin:6px 0';
var cel=document.getElementById('ngw_clock');
if(cel&&cel.parentNode)cel.parentNode.insertBefore(o,cel.nextSibling);
}
o.innerHTML='';
o.style.display='block';
for(var i=0;i<opts.length;i++)(function(t){
var b=document.createElement('button');
b.textContent=t;
b.style.cssText='background:transparent;border:1px solid rgba(120,255,150,0.4);color:rgba(200,255,210,0.9);font-family:Consolas,monospace;font-size:13px;padding:6px 14px;margin:2px;cursor:pointer;border-radius:4px';
b.onclick=function(){
if(!ngActive||ngChDone||ngWrongFound.clock)return;
var n2=new Date();
var r2=String(n2.getHours()).padStart(2,'0')+':'+String(n2.getMinutes()).padStart(2,'0');
if(t===r2){o.style.display='none';ngSay('...do not do math. (you did math.)');ngWrongLog('clock')}
else{ngSay('wrong o\u2019clock. try looking at YOUR clock. the one outside the tab.')}
};
o.appendChild(b);
})(opts[i]);
ngSay('three times. one of them is real. pick the intruder\u2019s time.');
}
function ngWrongTx(){
if(!ngActive||ngChDone||ngWrongFound.tx)return;
ngWrongSub.tx=(ngWrongSub.tx||0)+1;
var el=document.getElementById('ngw_tx');
var correct='the void remembers you';
if(ngWrongSub.tx>=3){if(el)el.textContent='transmission: '+correct;ngSay('...it was always readable. you just could not read.');ngWrongLog('tx')}
else{if(el)el.textContent='transmission: '+ngGarble(correct,0.8-ngWrongSub.tx*0.25);ngSay('careful. art is fragile.')}
}
function ngWrongVisTick(){
if(!ngActive||ngChDone||ngWrongFound.vis)return;
ngWrongVisN++;
if(ngWrongVisN>6)ngWrongVisN=1;
var el=document.getElementById('ngw_vis');
if(el)el.textContent='visit #'+ngWrongVisN+'. welcome, new intruder.';
}
function ngWrongVis(){
if(!ngActive||ngChDone||ngWrongFound.vis)return;
if(ngWrongVisN>1){ngSay('CAUGHT. the counter was at '+ngWrongVisN+'. ...it does that sometimes.');ngWrongLog('vis')}
else ngSay('see? ONE. stable. totally stable counter.');
}
function ngWrongGreet(){
if(!ngActive||ngChDone||ngWrongFound.greet)return;
ngWrongSub.greet=(ngWrongSub.greet||0)+1;
if(ngWrongSub.greet===1)ngSay('never seen you before in my life.');
else if(ngWrongSub.greet===2)ngSay('...okay maybe. everyone looks the same in the dark.');
else{ngSay('FINE. you come here every day. are you happy. LOGGED.');ngWrongLog('greet')}
}
function ngWrongColor(){
if(!ngActive||ngChDone||ngWrongFound.color)return;
ngWrongSub.color=!(ngWrongSub.color||false);
var tab=document.getElementById('ngFakeTab');
var el=document.getElementById('ngw_color');
if(ngWrongSub.color){
if(tab)tab.style.filter='';
if(el)el.textContent='display profile: teal. (wrong. change it back.)';
ngSay('...teal. you picked TEAL. my eyes.');
ngWrongLog('color');
}else{
if(tab)tab.style.filter='hue-rotate(60deg)';
if(el)el.textContent='display profile: green. (all tabs are green. yours was never teal.)';
ngSay('green. good. normal. forget teal.');
}
}
function ngWrongStan(){
if(!ngActive||ngChDone||ngWrongFound.stan)return;
ngWrongSub.stan=(ngWrongSub.stan||0)+1;
if(ngWrongSub.stan===1)ngSay('STANLEY2 is the sequel. all good songs have sequels.');
else if(ngWrongSub.stan===2)ngSay('the sequel is BETTER. it has TWO stanleys.');
else{ngSay('...there is no sequel. there never was. LOGGED.');ngWrongLog('stan')}
}
function ngWrongPlay(){
if(!ngActive||ngChDone||ngWrongFound.play)return;
var el=document.getElementById('ngw_play');
if(el)el.textContent='a game. (it is a 404 page.)';
ngSay('...that door was load-bearing. fine. LOGGED.');
ngWrongLog('play');
}
var ngWrongHandlers={prompt:ngWrongPrompt,clock:ngWrongClock,tx:ngWrongTx,vis:ngWrongVis,greet:ngWrongGreet,color:ngWrongColor,stan:ngWrongStan,play:ngWrongPlay};
function ngWrongTap(id){
if(!ngActive||ngChDone)return;
if(ngWrongFound[id]){ngSay('yes. that one. still wrong. noted twice.');if(ngWrongCount()>=ngWrongTotal()&&!ngWrongLock)ngAfterSpeech(function(){if(ngActive)ngChapter12Lock()},900);return}
var h=ngWrongHandlers[id];if(h)h();
}
function ngWrongDecoy(){
if(!ngActive||ngChDone)return;
ngSay(ngWrongNormal[Math.floor(Math.random()*ngWrongNormal.length)]);
if(ngWrongCount()>=ngWrongTotal()&&!ngWrongLock)ngAfterSpeech(function(){if(ngActive)ngChapter12Lock()},900);
}
function ngChapter12(st){
ngWrongFound={};ngWrongSub={};ngWrongLock=false;ngWrongCode='';ngWrongVisN=1;
if(ngWrongVisIv){try{clearInterval(ngWrongVisIv)}catch(e){}ngWrongVisIv=null}
var now=new Date();
var hh=String((now.getHours()+5)%24).padStart(2,'0')+':'+String(now.getMinutes()).padStart(2,'0');
var hardExtra='';
if(ngHard)hardExtra='<div class="ngw" id="ngw_stan">\u266a STANLEY2 (the sequel)</div>'+
'<div class="ngw" id="ngw_play">tip: type play. there IS a game. (trust me.)</div>';
st.innerHTML='<div id="ngSub">CHAPTER 12: WRONG ADDRESS (this is fine. everything is fine.)</div>'+
'<div id="ngFakeTab" style="border:1px solid rgba(120,255,150,0.35);background:rgba(20,40,24,0.55);padding:16px;margin:14px 0;max-width:520px;filter:hue-rotate(60deg)">'+
'<div style="color:rgba(160,255,180,0.5);font-size:10px;font-family:Consolas,monospace;letter-spacing:2px;margin-bottom:10px">CUBE# TERMINAL (authentic) (real)</div>'+
'<div class="ngw" id="ngw_greet">obj: oh good. another intruder. wait. do i know you. (click to interrogate)</div>'+
'<div class="ngw" id="ngw_prompt">cube$> _ (click to fiddle)</div>'+
'<div class="ngw" id="ngw_clock">void time: '+hh+' (definitely correct) (click to verify)</div>'+
'<div class="ngw" id="ngw_tx">transmission: '+ngGarble('the void remembers you',0.8)+' (click to decode)</div>'+
'<div class="ngw" id="ngw_vis">visit #1. welcome, new intruder. (watch it)</div>'+
'<div class="ngw" id="ngw_color">display profile: green. (all tabs are green. yours was never teal.) (click to switch)</div>'+
'<div class="ngw" id="ngw_menu">\u2261 menu (real)</div>'+
'<div class="ngw" id="ngw_music">\u266a STANLEY (original) (real)</div>'+
hardExtra+
'</div>'+
'<div id="ngEv" style="color:rgba(255,255,255,0.6);font-size:13px;font-family:Consolas,monospace;letter-spacing:2px">EVIDENCE: 0/'+(ngHard?8:6)+'</div>'+
'<div id="ngSub" style="margin-top:8px">something is wrong here. fiddle with things. prove it. log it all.</div>';
var ids=['prompt','clock','tx','vis','greet','color','menu','music'];
if(ngHard){ids.push('stan');ids.push('play')}
for(var ii=0;ii<ids.length;ii++)(function(id){
var el=document.getElementById('ngw_'+id);if(!el)return;
var isAnom=(id!=='menu'&&id!=='music');
el.onclick=function(){if(isAnom)ngWrongTap(id);else ngWrongDecoy()};
})(ids[ii]);
ngWrongVisIv=setInterval(ngWrongVisTick,2000);
try{ngSfx('static')}catch(e){}
ngSay('oh good. another intruder. wait. do i know you.');
ngSay('...no. new. you are new. welcome to the cube. (the real one.)');
ngSay('everything here is correct. admire the correctness. touch nothing. (touch everything.)');
}
function ngChapter12Lock(){
if(!ngActive||ngChDone||ngWrongLock)return;
ngWrongLock=true;
if(ngWrongVisIv){try{clearInterval(ngWrongVisIv)}catch(e){}ngWrongVisIv=null}
ngSay('...fine. you want the door? prove you are from the REAL tab.');
ngSay('4 digits. the lock eats numbers. (the clock knows. the clock has ALWAYS known.)');
var st=document.getElementById('ngStage');if(!st)return;
var d=document.createElement('div');d.id='ngLock';
d.style.cssText='margin:16px 0;padding:12px;border:1px solid rgba(200,120,120,0.4);max-width:300px';
d.innerHTML='<div style="color:rgba(255,150,150,0.6);font-size:11px;font-family:Consolas,monospace;letter-spacing:2px;margin-bottom:8px">PROVE IT. 4 DIGITS.</div><div id="ngLockSlots" style="color:#fff;font-size:22px;font-family:Consolas,monospace;letter-spacing:8px;margin-bottom:10px">_ _ _ _</div><div id="ngLockKeys"></div>';
st.appendChild(d);
var keys=document.getElementById('ngLockKeys');
var btns=['1','2','3','4','5','6','7','8','9','C','0','E'];
for(var i=0;i<btns.length;i++)(function(b){
var btn=document.createElement('button');
btn.textContent=(b==='E'?'ENTER':(b==='C'?'CLEAR':b));
btn.style.cssText='background:transparent;border:1px solid rgba(200,120,120,0.4);color:rgba(255,200,200,0.9);font-family:Consolas,monospace;font-size:13px;padding:8px 0;width:31%;margin:2px;cursor:pointer;border-radius:4px';
btn.onclick=function(){ngWrongKey(b)};
keys.appendChild(btn);
})(btns[i]);
ngWrongCode='';ngWrongSlots();
}
function ngWrongSlots(){
var s=document.getElementById('ngLockSlots');
if(!s)return;
var t='';
for(var i=0;i<4;i++)t+=(ngWrongCode.charAt(i)||'_')+' ';
s.textContent=t.replace(/ $/,'');
}
function ngWrongKey(b){
if(!ngActive||ngChDone||!ngWrongLock)return;
if(b==='C'){ngWrongCode='';ngWrongSlots();return}
if(b==='E'){
if(ngWrongCode.length<4){ngSay('4 digits. COUNT.');return}
var now=new Date();
var code=String(now.getHours()).padStart(2,'0')+String(now.getMinutes()).padStart(2,'0');
if(ngWrongCode===code){try{ngSfx('win')}catch(e){}ngChapter12Break()}
else{ngSay('wrong. the clock disagrees. the clock is never wrong. (except about everything.)');try{ngSfx('buzz')}catch(e){}ngWrongCode='';ngWrongSlots()}
return}
if(ngWrongCode.length>=4)return;
ngWrongCode+=b;try{ngSfx('pop')}catch(e){}ngWrongSlots();
}
function ngChapter12Break(){
if(!ngActive||ngChDone)return;
ngSay('...fine. you are not mine. the door is behind the terminal.');
ngAfterSpeech(function(){if(ngActive)ngChapter12Done()},900);
}
function ngChapter12Done(){
if(!ngActive||ngChDone)return;
ngChDone=true;
try{ngUnlock(13)}catch(e){}
var st=document.getElementById('ngStage');if(!st)return;
try{if(typeof grantPts==='function'&&typeof ptMult==='function'){grantPts(30*ptMult());if(typeof skillPtsRefresh==='function')skillPtsRefresh()}}catch(e){}
st.innerHTML='<div id="ngEndTitle">ADDRESS REJECTED</div><div id="ngSub">+30 skill points. (detective fee.)</div><div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ BLACKOUT ]</div></div><div id="ngSub">CHAPTER 13: BLACKOUT</div>';
ngSay(ngHard?'eight for eight. showoff.':'six for six. adequate.');
ngSay('that was NOT me back there. we will discuss your gullibility in the dark.');
var door=document.getElementById('ngDoor');
if(door)door.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('...ugh. FINE. blackout. the dark eats light there. stay close. (not too close.)');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(13)},800);
};
}
var ngDarkHas={};
var ngDarkJbo=false;
var ngDarkSub={};
var ngDarkClicks=0;
var ngDarkBrownIv=null;
var ngDarkBrownN=0;
var ngDarkLight=80;
var ngDarkLast={x:280,y:210};
var ngDarkSpots=[[8,14],[30,64],[52,28],[74,10],[80,70],[44,82],[20,40],[62,55],[88,35],[12,85]];
function ngDarkCount(){var n=0;if(ngDarkHas.fuse)n++;if(ngDarkHas.bulb)n++;if(ngDarkHas.exit)n++;return n}
function ngDarkEv(){
var e=document.getElementById('ngDarkEv');
if(e)e.textContent='FOUND: '+ngDarkCount()+'/3';
}
function ngDarkPlace(){
var ids=[];
if(!ngDarkHas.fuse)ids.push('fuse');
if(!ngDarkHas.bulb)ids.push('bulb');
if(!ngDarkHas.exit)ids.push('exit');
ids.push('rock');ids.push('paint');ids.push('grue');
var pool=ngDarkSpots.slice();
for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t}
for(var k=0;k<ids.length;k++){
var el=document.getElementById('ngd_'+ids[k]);
if(el){el.style.left=pool[k][0]+'%';el.style.top=pool[k][1]+'%'}
}
}
function ngDarkGrad(x,y){
return 'radial-gradient(circle '+ngDarkLight+'px at '+x+'px '+y+'px, rgba(0,0,0,0) 0%, rgba(0,0,0,0.7) 55%, rgba(0,0,0,0.985) 100%)';
}
function ngDarkBrownLines(){return ['the dark hiccups. (do not think about it.)','brownout. the dark is buffering.','...did the light just flinch. yes. moving on.']}
function ngDarkCount(){var n=0;if(ngDarkHas.fuse)n++;if(ngDarkHas.bulb)n++;if(ngDarkHas.exit)n++;return n}
function ngDarkEv(){
var e=document.getElementById('ngDarkEv');
if(e)e.textContent='FOUND: '+ngDarkCount()+'/3';
}
function ngDarkMove(ev){
if(!ngActive||ngChDone)return;
var room=document.getElementById('ngDarkRoom');
var cover=document.getElementById('ngDarkCover');
if(!room||!cover)return;
var r=room.getBoundingClientRect();
var x=ev.clientX-r.left,y=ev.clientY-r.top;
ngDarkLast={x:x,y:y};
cover.style.background=ngDarkGrad(x,y);
}
function ngDarkBrown(){
if(!ngActive||ngChDone)return;
var cover=document.getElementById('ngDarkCover');
if(cover)cover.style.background='#000';
var lines=ngDarkBrownLines();
ngSay(lines[ngDarkBrownN%lines.length]);
ngDarkBrownN++;
setTimeout(function(){
if(!ngActive||ngChDone)return;
var c2=document.getElementById('ngDarkCover');
if(c2)c2.style.background=ngDarkGrad(ngDarkLast.x,ngDarkLast.y);
},3000);
}
function ngDarkWake(){
if(!ngActive||ngChDone)return;
var cover=document.getElementById('ngDarkCover');
if(cover)cover.style.background='#000';
try{ngSfx('buzz')}catch(e){}
ngSay('...you WOKE it. ...it blinked. ...it is asleep again. do NOT.');
try{ach('grue_food')}catch(e){}
setTimeout(function(){
if(!ngActive||ngChDone)return;
var c2=document.getElementById('ngDarkCover');
if(c2)c2.style.background=ngDarkGrad(ngDarkLast.x,ngDarkLast.y);
ngSay('light is back. the grue is asleep. NOBODY touch the grue.');
},4000);
}
function ngDarkTap(id){
if(!ngActive||ngChDone)return;
ngDarkClicks++;
if(id==='rock'){try{ngMistake()}catch(e){}ngSay('a rock. you found a rock. detective of the year.');ngDarkHardShuffle();return}
if(id==='paint'){try{ngMistake()}catch(e){}ngSay('that exit is painted on. you almost walked into a painting. graceful.');ngDarkHardShuffle();return}
if(id==='grue'){try{ngMistake()}catch(e){}
ngDarkSub.grue=(ngDarkSub.grue||0)+1;
var wakesAt=ngHard?1:2;
if(ngDarkSub.grue>=wakesAt){ngDarkSub.grue=0;ngDarkWake()}
else ngSay('it is a grue. it eats intruders. ...it is asleep. do not wake it. WALK AWAY.');
ngDarkHardShuffle();return}
if(id==='exit'){
if(ngDarkHas.exit){ngSay('yes. the exit. still exity. admire it, then leave through it.');ngAfterSpeech(function(){if(ngActive&&!ngChDone)ngChapter13Done()},600);return}
if(!ngDarkHas.fuse||!ngDarkHas.bulb){var n=(ngDarkHas.fuse?1:0)+(ngDarkHas.bulb?1:0);ngSay('dead sign. it needs a fuse and a bulb. you have '+n+'/2. math.');ngDarkHardShuffle();return}
ngDarkHas.exit=1;
var el=document.getElementById('ngd_exit');
if(el){el.className+=' found';el.textContent='EXIT (buzzing)'}
try{ngSfx('door')}catch(e){}
ngSay('...powered. the sign buzzes. it sounds as tired as i am.');
ngDarkEv();
ngDarkPlace();
ngAfterSpeech(function(){if(ngActive)ngChapter13Done()},900);
return}
if(ngDarkHas[id]){ngSay('yes. still there. still found. move on.');ngDarkHardShuffle();return}
ngDarkHas[id]=1;
var el2=document.getElementById('ngd_'+id);
if(el2)el2.className+=' found';
try{ngSfx('coin')}catch(e){}
if(id==='fuse'){
ngSay('a fuse. great. electrician arc begins.',85);
if(!ngDarkJbo){ngDarkJbo=true;ngShout('HELLO?? WHY IS IT DARK. OBJ. OBJ WHERE DID YOU PUT THE INTRUDER.');ngSay('lost. they are lost. shh. (keep looking. everything moved. sorry.)',85)}
}else{
ngSay('a bulb. it is probably dead. like my enthusiasm.',85);
}
ngDarkEv();
ngDarkPlace();
}
function ngDarkHardShuffle(){
if(!ngHard)return;
if(ngDarkClicks%5===0)ngDarkPlace();
}
function ngChapter13(st){
ngDarkHas={};ngDarkJbo=false;ngDarkSub={};ngDarkClicks=0;ngDarkBrownN=0;
ngDarkLight=ngHard?60:80;
ngDarkLast={x:280,y:210};
if(ngDarkBrownIv){try{clearInterval(ngDarkBrownIv)}catch(e){}ngDarkBrownIv=null}
st.innerHTML='<div id="ngSub">CHAPTER 13: BLACKOUT (the dark eats light here. your cursor is a flashlight.)</div>'+
'<div id="ngDarkRoom" style="position:relative;width:100%;max-width:560px;height:420px;background:#020203;border:1px solid rgba(255,255,255,0.12);margin:14px 0;overflow:hidden;cursor:crosshair">'+
'<div class="ngd" id="ngd_fuse" style="left:8%;top:14%">a fuse</div>'+
'<div class="ngd" id="ngd_rock" style="left:30%;top:64%">a rock</div>'+
'<div class="ngd" id="ngd_exit" style="left:52%;top:28%">EXIT (dead)</div>'+
'<div class="ngd" id="ngd_paint" style="left:74%;top:10%">EXIT (painted)</div>'+
'<div class="ngd" id="ngd_bulb" style="left:80%;top:70%">a bulb</div>'+
'<div class="ngd" id="ngd_grue" style="left:44%;top:82%">a grue (asleep)</div>'+
'<div id="ngDarkCover" style="position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none;background:#000"></div>'+
'</div>'+
'<div id="ngDarkEv" style="color:rgba(255,255,255,0.6);font-size:13px;font-family:Consolas,monospace;letter-spacing:2px">FOUND: 0/3</div>'+
'<div id="ngSub" style="margin-top:8px">find the fuse. find the bulb. wake the exit. do not wake the grue.</div>';
var room=document.getElementById('ngDarkRoom');
if(room)room.addEventListener('mousemove',ngDarkMove);
var ids=['fuse','rock','exit','paint','bulb','grue'];
for(var ii=0;ii<ids.length;ii++)(function(id){
var el=document.getElementById('ngd_'+id);if(!el)return;
el.onclick=function(){ngDarkTap(id)};
})(ids[ii]);
var cv0=document.getElementById('ngDarkCover');
if(cv0)cv0.style.background=ngDarkGrad(ngDarkLast.x,ngDarkLast.y);
ngDarkPlace();
ngDarkBrownIv=setInterval(function(){ngDarkBrown()},25000);
try{ngSfx('static')}catch(e){}
ngSay('that was NOT me back there.');
ngSay('lights out. your cursor is a flashlight. fuse, bulb, exit. not the grue.');
}
function ngChapter13Done(){
if(!ngActive||ngChDone)return;
ngChDone=true;
try{ngUnlock(14)}catch(e){}
if(ngDarkBrownIv){try{clearInterval(ngDarkBrownIv)}catch(e){}ngDarkBrownIv=null}
var st=document.getElementById('ngStage');if(!st)return;
try{if(typeof grantPts==='function'&&typeof ptMult==='function'){grantPts(35*ptMult());if(typeof skillPtsRefresh==='function')skillPtsRefresh()}}catch(e){}
st.innerHTML='<div id="ngEndTitle">LIGHTS ON</div><div id="ngSub">+35 skill points. (overtime.)</div><div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ SIGNAL LOST ]</div></div><div id="ngSub">CHAPTER 14: SIGNAL LOST</div>';
ngSay('lights on. you found... things. adequate.');
ngSay('core sends her regards. (she does not. she does not know you yet.)');
var door=document.getElementById('ngDoor');
if(door)door.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('...ugh. FINE. signal lost. she will guide you. do NOT get attached.');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(14)},800);
};
}
var ngSeqSymbols=['\u25B2','\u25CF','\u25A0','\u2605','\u25C6','\u271A'];
var ngSeqRound=0,ngSeqInput=[],ngSeqBusy=false,ngSeqIv=null,ngSeqFails=0;
var ngSeqTarget=[];
function ngSeqLen(){return ngSeqRound+2}
function ngSeqPraise(){return ['lovely.','correct. you learn. (slowly.)','three for three. obj could never. (do not tell him.)','perfect. you may keep your eyes.']}
function ngSeqRoast(){return ['almost. the almost is the problem. watch again.','lovely try. wrong, but lovely. again.','no. breathe. watch. be.']}
function ngSeqRenderInput(){
var d=document.getElementById('ngSeqIn');
if(d)d.textContent=ngSeqInput.length?ngSeqInput.join(' '):'\u00b7 \u00b7 \u00b7';
var r=document.getElementById('ngSeqRound');
if(r)r.textContent='PATTERN \u2014 round '+ngSeqRound+'/4 \u00b7 length '+ngSeqLen()+(ngHard?' \u00b7 HARD (faster)':'');
}
function ngSeqPlay(slow){
var show=document.getElementById('ngSeqShow');
ngSeqBusy=true;
var speed=slow||(ngHard?380:600);
var idx=0;
if(ngSeqIv){try{clearInterval(ngSeqIv)}catch(e){}ngSeqIv=null}
ngSeqIv=setInterval(function(){
if(!ngActive){try{clearInterval(ngSeqIv)}catch(e){}ngSeqIv=null;return}
if(idx>=ngSeqTarget.length){try{clearInterval(ngSeqIv)}catch(e){}ngSeqIv=null;ngSeqBusy=false;if(show)show.textContent='your turn.';try{ngSfx('coin')}catch(e){}return}
if(show){show.textContent=ngSeqTarget[idx];show.classList.add('ngSeqGlow');(function(s){setTimeout(function(){try{s.classList.remove('ngSeqGlow')}catch(e){}},220)})(show)}
idx++;
},speed);
}
function ngSeqNewRound(){
ngSeqTarget=[];
for(var i=0;i<ngSeqLen();i++)ngSeqTarget.push(ngSeqSymbols[Math.floor(Math.random()*ngSeqSymbols.length)]);
ngSeqInput=[];ngSeqFails=0;
ngSeqRenderInput();
ngCore('watch. round '+ngSeqRound+'.');
ngAfterSpeech(function(){if(ngActive)ngSeqPlay()},700);
}
function ngSeqTap(s){
if(!ngActive||ngChDone||ngSeqBusy)return;
ngSeqInput.push(s);
try{ngSfx('pop')}catch(e){}
ngSeqRenderInput();
if(ngSeqInput.length>=ngSeqTarget.length){
var ok=true;
for(var i=0;i<ngSeqTarget.length;i++)if(ngSeqInput[i]!==ngSeqTarget[i]){ok=false;break}
var p=ok?ngSeqPraise():ngSeqRoast();
if(ok)ngCore(p[Math.min(ngSeqRound-1,3)]);
else ngCore(p[Math.min(ngSeqFails,2)]);
if(ok){
if(ngSeqRound>=4){ngAfterSpeech(function(){if(ngActive)ngChapter14Done()},900);return}
ngSeqRound++;
ngAfterSpeech(function(){if(ngActive)ngSeqNewRound()},700);
}else{
ngSeqFails++;try{if(typeof ngMistake==='function')ngMistake()}catch(e){}
ngSeqInput=[];ngSeqRenderInput();
var mercy=ngSeqFails>=2;
if(mercy)ngCore('...one more time. slowly. for both of us.');
ngAfterSpeech(function(){if(ngActive)ngSeqPlay(mercy?850:null)},900);
}
}
}
function ngChapter14(st){
ngSeqRound=1;ngSeqInput=[];ngSeqBusy=false;ngSeqFails=0;ngSeqTarget=[];
if(ngSeqIv){try{clearInterval(ngSeqIv)}catch(e){}ngSeqIv=null}
var btns='';
for(var b=0;b<ngSeqSymbols.length;b++)btns+='<button class="ngsq" data-s="'+ngSeqSymbols[b]+'">'+ngSeqSymbols[b]+'</button>';
st.innerHTML='<div id="ngSub">CHAPTER 14: SIGNAL LOST (obj is offline. core is guiding.)</div>'+
'<div class="ngCoreOrb"></div>'+
'<div id="ngSeqRound" style="color:rgba(255,255,255,0.5);font-size:12px;font-family:Consolas,monospace;margin:10px 0">PATTERN</div>'+
'<div id="ngSeqShow" style="color:rgba(255,158,207,0.95);font-size:44px;font-family:Consolas,monospace;min-height:60px;margin:14px 0">...</div>'+
'<div id="ngSeqBtns">'+btns+'</div>'+
'<div id="ngSeqIn" style="color:rgba(255,255,255,0.6);font-size:16px;font-family:Consolas,monospace;letter-spacing:4px;margin:12px 0">\u00b7 \u00b7 \u00b7</div>'+
'<div id="ngSub" style="margin-top:8px">watch the pattern. then be the pattern.</div>';
var bb=st.querySelectorAll('.ngsq');
for(var q=0;q<bb.length;q++)(function(btn){btn.onclick=function(){ngSeqTap(btn.getAttribute('data-s'))}})(bb[q]);
try{ngSfx('static')}catch(e){}
ngSay('...signal lost. i am... elsewhere. do NOT break anything.');
ngCore('hello, intruder. obj is indisposed. watch the pattern. then be the pattern.');
ngAfterSpeech(function(){if(ngActive)ngSeqNewRound()},800);
}
function ngChapter14Done(){
if(!ngActive||ngChDone)return;
ngChDone=true;
try{ngUnlock(15)}catch(e){}
if(ngSeqIv){try{clearInterval(ngSeqIv)}catch(e){}ngSeqIv=null}
var st=document.getElementById('ngStage');if(!st)return;
try{if(typeof grantPts==='function'&&typeof ptMult==='function'){grantPts(40*ptMult());if(typeof skillPtsRefresh==='function')skillPtsRefresh()}}catch(e){}
st.innerHTML='<div id="ngEndTitle">SIGNAL FOUND</div><div id="ngSub">+40 skill points. (tutoring fee.)</div><div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ INTERLOPER ]</div></div><div id="ngSub">CHAPTER 15: INTERLOPER</div>';
ngCore('you did well. obj is sulking. (he missed you. do not tell him.)');
ngSay('...i am back. do NOT get used to her.');
var door=document.getElementById('ngDoor');
if(door)door.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('...ugh. FINE. interloper. do not answer it. (you will answer it.)');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(15)},800);
};
}
var ngTq=0,ngTfails=0,ngTQs=[];
function ngTumorSay(text,done){
var el=document.getElementById('ngTumor');
if(!el){if(done)done();return}
try{ngSfx('static')}catch(e){}
ngGarbleShow(el,text,2200,done,700);
}
function ngTumorOpts(opts,cb){
var box=document.getElementById('ngTOpts');
if(!box)return;
box.innerHTML='';
for(var i=0;i<opts.length;i++)(function(t){
var b=document.createElement('button');
b.className='ngtopt ngGlitchIn';b.textContent=t;
b.onclick=function(){cb(t)};
box.appendChild(b);
})(opts[i]);
}
function ngTumorClearOpts(){var box=document.getElementById('ngTOpts');if(box)box.innerHTML=''}
function ngTumorShuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function ngTumorBuild(){
ngTQs=[];
var vis=(typeof visitCount!=='undefined'?visitCount:1);
var vset={};vset[vis]=1;vset[vis+3]=1;if(vis-2>=1)vset[vis-2]=1;else vset[vis+5]=1;
var vopts=ngTumorShuffle(Object.keys(vset));
ngTQs.push({q:'question one. how many times have you crawled back here?',
opts:vopts,ok:String(vis),
yes:'correct. i counted too. we match. cute.',
no:function(){return 'wrong. it was '+vis+'. i keep better track of you than you do.'}});
var fin=null;
try{fin=localStorage.getItem('cube_finale')}catch(e){}
if(fin==='mercy'||fin==='brat'){
var fword=(fin==='mercy'?'STOP':'KEEP');
var fyes=(fin==='mercy'?'mercy. soft. i like that. (do not tell obj.)':'KEEP. greedy. i like that more.');
ngTQs.push({q:'at the end... did you STOP? or KEEP?',
opts:['STOP','KEEP','i forgot'],
ok:fword,yes:fyes,
no:function(){return 'wrong. you chose '+fword+'. i was there. i am always there.'}});
}else{
ngTQs.push({q:'which brother screams?',
opts:['obj','jbo','the core'],
ok:'jbo',yes:'correct. he never stops. music to my ears.',
no:function(){return 'wrong. jbo. the loud one. the ONLY loud one.'}});
}
ngTQs.push({q:'what is obj\u2019s favorite thing?',
opts:ngTumorShuffle(['the void','you','jbo']),
ok:'the void',yes:'correct. the void. never you. (do not cry.)',
no:function(){return 'wrong. the void. it is always the void. you rank fourth. (there are three of us.)'}});
ngTQs.push({q:'what did the whisper say in chapter 11?',
opts:ngTumorShuffle(['found you. >:','hello, intruder.','behind you.']),
ok:'found you. >:',yes:'correct. my first words. you kept them. cute.',
no:function(){return 'wrong. it was \u2018found you. >:\u2019. my FIRST WORDS. and you forgot them.'}});
ngTQs.push({q:'who guided you through the dark?',
opts:['obj','core','jbo'],
ok:'obj',yes:'correct. him. lowercase and furious. (he did well. do not tell him.)',
no:function(){return 'wrong. obj. HE held your flashlight. ungrateful.'}});
if(ngHard)ngTQs.push({q:'hard one. what is the terminal speed of a jbo scream?',opts:['11 m/s','faster than light','it does not stop'],ok:'11 m/s',yes:'eleven. everything is eleven. correct.',no:function(){return 'wrong. 11. everything here is eleven. hard mode, remember?'}});
ngTQs.push({q:'last one. do you like me?',
opts:['yes','no','what are you'],
ok:null,yes:'',no:null,
rigged:['...correct. (there was no wrong answer. there is never a wrong answer with me.)','liar. correct anyway. you came back, did not you.','rude. correct. i am whatever knocked.']});
}
function ngTumorAsk(){
if(!ngActive||ngChDone)return;
var Q=ngTQs[ngTq];
if(!Q)return;
ngTumorSay(Q.q,function(){
if(!ngActive||ngChDone)return;
ngTumorOpts(Q.opts.slice(),function(pick){
if(!ngActive||ngChDone)return;
if(Q.ok===null){
ngTumorClearOpts();
var ri=Q.opts.indexOf(pick);
ngTumorSay(Q.rigged[Math.max(0,ri)],function(){if(ngActive)ngChapter15Finale()});
return}
if(pick===Q.ok){
ngTumorClearOpts();
ngTumorSay(Q.yes,function(){
if(!ngActive||ngChDone)return;
ngTq++;
if(ngTq>=ngTQs.length){ngChapter15Finale();return}
ngTumorAsk();
});
}else{
ngTfails++;try{if(typeof ngMistake==='function')ngMistake()}catch(e){}
if(ngHard)Q.opts=ngTumorShuffle(Q.opts.slice());
var smug=ngTfails===1?'...wrong already? we just started.':(ngTfails===2?'wrong again. the options moved. (they did not. you are just wrong.)':'wrong. '+(typeof Q.no==='function'?Q.no():'try again.'));
ngTumorSay(smug,function(){if(ngActive)ngTumorAsk()});
}
});
});
}
function ngChapter15Finale(){
if(!ngActive||ngChDone)return;
ngTumorClearOpts();
ngTumorSay(ngHard?'seven for seven. you endured me.':'six for six. you know yourself. ...i know you better.',function(){
if(!ngActive||ngChDone)return;
ngTumorSay('the door is behind me. obviously. everything is behind me. i am everywhere here.',function(){
if(!ngActive||ngChDone)return;
ngSay('...we are leaving. NOW. (again.)');
ngAfterSpeech(function(){if(ngActive)ngChapter15Done()},900);
});
});
}
function ngChapter15(st){
ngTq=0;ngTfails=0;
ngTumorBuild();
var last=0;
try{last=parseInt(localStorage.getItem('cube_last_seen')||'0',10)}catch(e){}
var gapline='';
if(last){var dd=Math.floor((Date.now()-last)/86400000);if(dd>=1)gapline='gone '+dd+' day'+(dd===1?'':'s')+'. i felt every minute.';else gapline='hours. you never leave. clingy. >:'}
st.innerHTML='<div id="ngSub">CHAPTER 15: INTERLOPER (do not answer it.)</div>'+
'<div style="color:#5a7a8a;font-size:10px;letter-spacing:3px;font-family:Consolas,monospace;margin-top:12px">INTERLOPER CAM &middot; SIGNAL 15</div>'+
'<div id="ngTumor" style="color:#ff9ec0;font-size:16px;font-family:Consolas,monospace;letter-spacing:1px;min-height:28px;margin:6px 0 20px;padding:12px 14px;background:#05070c repeating-linear-gradient(0deg,rgba(255,255,255,0.025) 0 1px,transparent 1px 3px);border:2px solid #2a4a5a;border-radius:8px;text-shadow:0 0 8px rgba(255,60,120,0.8)">...</div>'+
'<div id="ngTOpts" style="margin:10px 0"></div>'+
'<div id="ngSub" style="margin-top:8px">it asks. you answer. it already knows.</div>';
try{ngSfx('static')}catch(e){}
ngSay('...do not answer it. (you will answer it.)');
ngTumorSay('well well. the intruder walks in. >:',function(){
if(!ngActive||ngChDone)return;
ngTumorSay('obj talks about you. constantly. embarrassing for him.',function(){
if(!ngActive||ngChDone)return;
var open=gapline?gapline+' i read your file. all of it. let us see if YOU know you.':'i read your file. all of it. let us see if YOU know you.';
ngTumorSay(open,function(){if(ngActive)ngTumorAsk()});
});
});
}
function ngChapter15Done(){
if(!ngActive||ngChDone)return;
ngChDone=true;
try{ngUnlock(16)}catch(e){}
var st=document.getElementById('ngStage');if(!st)return;
try{if(typeof grantPts==='function'&&typeof ptMult==='function'){grantPts(45*ptMult());if(typeof skillPtsRefresh==='function')skillPtsRefresh()}}catch(e){}
st.innerHTML='<div id="ngEndTitle">IT KNOWS YOU</div><div id="ngSub">+45 skill points. (interrogation fee.)</div><div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ ECHO ]</div></div><div id="ngSub">CHAPTER 16: ECHO</div>';
ngSay('...done. it knows your visit count. it knows your finale. do not think about what else it knows.');
var door=document.getElementById('ngDoor');
if(door)door.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('...ugh. FINE. echo. it is pretending to be me. it is bad at it. (it is not bad at it.)');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(16)},800);
};
}
// 16 ECHO (built v2): mimic quiz. real ACT 1 obj quote vs INTERLOPER forgery.
// v2: subtlety ramp (tier1 tumor-voice -> tier2 one-word-off -> tier3 near-perfect),
//     3 strikes = full chapter restart (pool reshuffles), trick rounds (both fake /
//     both real; verdict buttons unlock after the first pattern-break), hard adds a
//     12s timer + save-data forgeries. obj recites + annotates every correct pick.
//     fail costs a strike and force-replays both lines garbled. hints ch16echo.
var ngEchoI=0,ngEchoFails=0,ngEchoStrikes=0,ngEchoRounds=[],ngEchoOrder=null;
var ngEchoVerdictSeen=false,ngEchoTimerIv=null,ngEchoAnnI=0;
var ngEchoAnnos=['...yes. that one. i said it. i regret all of them.','...correct. the other one was wearing my voice like a hat.','...that is mine. verbatim. i can hear myself saying it.','...right. the fake flatters. mine dismisses. remember that.','...correct. do not look pleased.'];
var ngEchoT1=[
{r:'STEP 2: do NOT click the square. this one is easy. even for you.',f:'STEP 2: click the square. go on. i want to watch you win. >:'},
{r:'volume stays at 0. this is not a democracy.',f:'volume stays at 0. unless you want it higher. for you, a democracy. >:'},
{r:'this is an educational obstacle course. it teaches jumping. and loss.',f:'this is an educational obstacle course. it teaches jumping. and that i watched every jump. >:'},
{r:'credits. you made it. ...do NOT touch the credits.',f:'credits. you made it. ...stay in the credits. be my favorite name. >:'}
];
var ngEchoT2=[
{r:'error 409: intruder is load-bearing. uninstall cancelled.',f:'error 409: intruder is load-bearing. uninstall confirmed.'},
{r:'tower defense. place towers. defend the base. you know the drill.',f:'tower defense. place towers. attack the base. you know the drill.'},
{r:'GRADUATION. collect your CERTIFIED CLICKER diploma. you earned it. unfortunately.',f:'GRADUATION. collect your CERTIFIED CLICKER diploma. you earned it. obviously.'},
{r:'...i need to sit down. i do not have legs.',f:'...i need to lie down. i do not have legs.'},
{r:'that is my brother. ...i am sorry.',f:'that is my brother. ...i am proud.'},
{r:'STEP 1: click the circle. GENTLY.',f:'STEP 1: click the circle. VIOLENTLY.'}
];
var ngEchoT3=[
{r:'that is the core. the gameplay i ripped out of myself so this would NOT be a game.',f:'that is the core. the gameplay i copied out of myself so this would NOT be a game.'},
{r:'oh good. another intruder. look, this is NOT a game. this is an error page. stop clicking things.',f:'oh good. another intruder. look, this is NOT a game. this is a 404 page. stop clicking things.'},
{r:'credits. you made it. ...do NOT touch the credits.',f:'credits. you made it. ...do NOT touch the doors.'},
{r:'so THIS is what games have become while i was just a terminal?? LOOTBOXES. STAMINA. ADS FOR OTHER ADS.',f:'so THIS is what games have become while i was just a game?? LOOTBOXES. STAMINA. ADS FOR OTHER ADS.'},
{r:'tower defense. place towers. defend the base. you know the drill.',f:'tower defense. place towers. defend the base. you know the routine.'},
{r:'this is an educational obstacle course. it teaches jumping. and loss.',f:'this is an educational obstacle course. it teaches waiting. and loss.'}
];
var ngEchoTrickFake={type:'fake2',answer:'neither',src:'...the course is condemned. NOOB_42 has been billed for damages.',cards:['...the course is condemned. NOOB_42 has been billed for damages. he is fine. >:','...the course is condemned. NOOB_43 has been billed for damages.']};
var ngEchoTrickReal={type:'real2',answer:'both',src:'...and that is why tutorials are discontinued.',cards:['...and that is why tutorials are discontinued.','go on. the towers are stacked. try to behave. ...you will not behave.']};
function ngEchoShuffle(a){for(var i=a.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=a[i];a[i]=a[j];a[j]=t}return a}
function ngEchoBuild(){
var used={};
used[ngEchoTrickFake.src]=1;
for(var tc=0;tc<ngEchoTrickReal.cards.length;tc++)used[ngEchoTrickReal.cards[tc]]=1;
var saves=[];
var vis=(typeof visitCount!=='undefined'?visitCount:1);
var s1={type:'normal',r:'oh good. another intruder. look, this is NOT a game. this is an error page. stop clicking things.',f:'oh good. visit number '+vis+'. you crawled back '+vis+' times. for me. >:'};
used[s1.r]=1;saves.push(s1);
var fin=null;try{fin=localStorage.getItem('cube_finale')}catch(e){}
if(fin==='mercy'||fin==='brat'){
var fw=(fin==='mercy'?'STOP':'KEEP');
var s2={type:'normal',r:'...FINE. FIGHT ME. click me. i DARE you.',f:'at the end, you chose '+fw+'. '+(fw==='STOP'?'soft. ':'greedy. ')+'you chose me either way. >:'};
used[s2.r]=1;saves.push(s2);
}
var plan=ngHard?['s','s','t1','t1','t2','t2','t2','t2','Tf','t3','Tr','t3']:['t1','t1','t1','t2','t2','t2','Tf','t3','Tr','t3'];
var pools={t1:ngEchoShuffle(ngEchoT1.slice()),t2:ngEchoShuffle(ngEchoT2.slice()),t3:ngEchoShuffle(ngEchoT3.slice())};
var si=0,out=[];
function pull(tier){
var p=pools[tier];
while(p.length){var c=p.pop();if(!used[c.r]){used[c.r]=1;return {type:'normal',r:c.r,f:c.f}}}
return null;
}
for(var i=0;i<plan.length;i++){
var pl=plan[i],round=null;
if(pl==='s'){round=(si<saves.length)?saves[si++]:pull('t1')}
else if(pl==='Tf')round=ngEchoTrickFake;
else if(pl==='Tr')round=ngEchoTrickReal;
else round=pull(pl);
if(round)out.push(round);
}
return out;
}
function ngEchoCardsOf(R){
if(R.type==='normal')return [{t:R.r,real:true},{t:R.f,real:false}];
return [{t:R.cards[0],real:null},{t:R.cards[1],real:null}];
}
function ngEchoHud(){
var h=document.getElementById('ngEchoHud');if(!h)return;
h.textContent='ROUND '+Math.min(ngEchoI+1,ngEchoRounds.length)+'/'+ngEchoRounds.length+' \u00b7 STRIKES '+ngEchoStrikes+'/'+(ngHard?2:3)+(ngHard?' \u00b7 HARD':'');
}
function ngEchoTimerStop(){
if(typeof ngEchoTimerIv!=='undefined'&&ngEchoTimerIv){try{clearInterval(ngEchoTimerIv)}catch(e){}ngEchoTimerIv=null}
var bar=document.getElementById('ngEchoBar');if(bar)bar.style.width='100%';
var w=document.getElementById('ngEchoBarWrap');if(w)w.style.display='none';
}
function ngEchoTimerStart(){
ngEchoTimerStop();
if(!ngHard)return;
var w=document.getElementById('ngEchoBarWrap');if(w)w.style.display='block';
var bar=document.getElementById('ngEchoBar');if(!bar)return;
var left=12000;
bar.style.width='100%';
ngEchoTimerIv=setInterval(function(){
if(!ngActive||ngChDone){ngEchoTimerStop();return}
left-=100;
bar.style.width=Math.max(0,left/120)+'%';
if(left<=0){ngEchoTimerStop();ngEchoFail('slow')}
},100);
}
function ngEchoShow(keepOrder){
if(!ngActive||ngChDone)return;
var R=ngEchoRounds[ngEchoI];
if(!R){ngEchoBreak();return}
var box=document.getElementById('ngEchoCards');if(!box)return;
if(!keepOrder||ngEchoOrder===null)ngEchoOrder=Math.random()<0.5;
box.innerHTML='';
var items=ngEchoCardsOf(R);
if(R.type==='normal'&&!ngEchoOrder)items=[items[1],items[0]];
for(var i=0;i<items.length;i++)(function(it){
var b=document.createElement('button');
b.className='ngtopt ngEchoCard';
b.textContent=it.t;
b.onclick=function(){
if(ngTalking()||ngChDone)return;
try{ngHurry()}catch(e){}
if(R.type==='normal'){if(it.real)ngEchoPass();else ngEchoFail('card')}
else ngEchoFail(ngEchoVerdictSeen?'cardSeen':'card');
};
box.appendChild(b);
})(items[i]);
if(R.type!=='normal'&&ngEchoVerdictSeen){
var vw=document.createElement('div');vw.style.margin='12px 0 4px';
[['BOTH ARE HIS','both'],['NEITHER IS HIS','neither']].forEach(function(pair){
var vb=document.createElement('button');
vb.className='ngtopt';vb.textContent=pair[0];
vb.onclick=function(){
if(ngTalking()||ngChDone)return;
try{ngHurry()}catch(e){}
if(pair[1]===R.answer)ngEchoPass();else ngEchoFail('verdict',pair[1]);
};
vw.appendChild(vb);
});
box.appendChild(vw);
}
ngEchoHud();
ngEchoTimerStart();
}
function ngEchoPass(){
if(ngChDone)return;
ngEchoTimerStop();
ngEchoOrder=null;
var R=ngEchoRounds[ngEchoI];
ngEchoI++;
try{ngSfx('coin')}catch(e){}
var box=document.getElementById('ngEchoCards');if(box)box.innerHTML='';
var src=R?(R.src||R.r||''):'';
var anno=ngEchoAnnos[ngEchoAnnI%ngEchoAnnos.length];ngEchoAnnI++;
ngSay(src+' ...'+anno);
ngAfterSpeech(function(){
if(!ngActive||ngChDone)return;
if(ngEchoI>=ngEchoRounds.length){ngEchoBreak();return}
var say=null;
if(ngEchoI===3)say='...that line was never me. i have standards.';
else if(ngEchoI===6)say='i did NOT say that. i have never once been that nice.';
else if(ngEchoI===9)say='stop listening to IT. listen to ME. ...good.';
else if(ngEchoI===11)say='two left. do not embarrass me. (you are embarrassing me.)';
if(say){ngSay(say);ngAfterSpeech(function(){if(ngActive)ngEchoShow()},600)}
else ngEchoShow();
},700);
}
function ngEchoFail(kind,detail){
if(ngChDone)return;
ngEchoTimerStop();
ngEchoFails++;ngEchoStrikes++;
var R=ngEchoRounds[ngEchoI];
var cards=R?ngEchoCardsOf(R):[];
try{ngSfx('buzz')}catch(e){}
var line;
if(kind==='slow')line='too slow. the void does not wait. >:';
else if(kind==='card'&&R&&R.type!=='normal'){
ngEchoVerdictSeen=true;
line=(R.answer==='neither')?'neither. BOTH of those are mine. the verdict buttons were right there. they are there now. >:':'both. BOTH are his. you doubted him twice. the verdict buttons are there now. >:';
}
else if(kind==='cardSeen'&&R&&R.type!=='normal'){
line=(R.answer==='neither')?'the BUTTONS, intruder. NEITHER. use the buttons. >:':'the BUTTONS, intruder. BOTH. use the buttons. >:';
}
else if(kind==='verdict'){
line=(detail==='both')?'no. NEITHER is his. both of those are mine. learn to look. >:':'no. BOTH are his. he said both. learn to look. >:';
}
else{
var L=['ha. >:','wrong. that one is HIS. it just sounds like me. do not get used to it. >:','wrong again. the options moved. (they did not. you are simply wrong.)','no. your ears are decoration. >:'];
line=L[Math.min(ngEchoFails-1,L.length-1)];
}
if(ngEchoStrikes>=(ngHard?2:3)){
ngTumorSay(line,function(){
if(!ngActive||ngChDone)return;
ngTumorSay('three strikes. we start over. everything reshuffled. your ears are decoration. >:',function(){
if(!ngActive||ngChDone)return;
ngEchoI=0;ngEchoStrikes=0;ngEchoFails=0;
ngEchoRounds=ngEchoBuild();ngEchoOrder=null;
try{ngSfx('door')}catch(e){}
ngEchoHud();
if(ngActive)ngEchoShow();
});
});
return;
}
var replay=' listen again: '+(cards[0]?cards[0].t:'')+' ...or: '+(cards[1]?cards[1].t:'')+'? >:';
ngTumorSay(line+replay,function(){
if(ngActive)ngEchoShow(!ngHard);
});
}
function ngEchoBreak(){
if(!ngActive||ngChDone)return;
var box=document.getElementById('ngEchoCards');if(box)box.innerHTML='';
ngTumorSay('...you can tell us apart. annoying.',function(){
if(!ngActive||ngChDone)return;
ngSay('of course you can. one of us has NEVER been nice.');
ngAfterSpeech(function(){if(ngActive)ngChapter16Done()},900);
});
}
function ngChapter16(st){
ngEchoI=0;ngEchoFails=0;ngEchoStrikes=0;ngEchoOrder=null;ngEchoVerdictSeen=false;ngEchoTimerIv=null;
ngEchoRounds=ngEchoBuild();
st.innerHTML='<div id="ngSub">CHAPTER 16: ECHO (one of these is a lie)</div>'+
'<div id="ngTumor" style="color:rgba(255,60,120,0.9);font-size:16px;font-family:Consolas,monospace;letter-spacing:1px;min-height:28px;margin:20px 0">...</div>'+
'<div id="ngEchoHud" style="color:#4a5a6a;font-size:12px;letter-spacing:2px;font-family:Consolas,monospace;margin-bottom:4px"></div>'+
'<div id="ngEchoBarWrap" style="display:none;width:640px;max-width:90%;height:6px;background:#16121c;border:1px solid #3a1a2a;border-radius:3px;margin:6px auto;overflow:hidden"><div id="ngEchoBar" style="height:100%;width:100%;background:rgba(255,60,120,0.8);transition:width .1s linear"></div></div>'+
'<div id="ngEchoCards" style="display:flex;flex-direction:column;align-items:center;width:100%"></div>'+
'<div id="ngSub" style="margin-top:10px">two lines. pick the one obj actually said.</div>';
try{ngSfx('static')}catch(e){}
ngEchoHud();
ngSay('...it is replaying me. i HATE being replayed. pick the one i actually said.');
ngTumorSay('i kept every word you two said. lightly edited. one line is his, one is mine. which is which. >:',function(){
if(ngActive)ngEchoShow();
});
}
function ngChapter16Done(){
if(!ngActive||ngChDone)return;
ngChDone=true;
try{ngEchoTimerStop()}catch(e){}
try{ngUnlock(17)}catch(e){}
var st=document.getElementById('ngStage');if(!st)return;
try{if(typeof grantPts==='function'&&typeof ptMult==='function'){grantPts(50*ptMult());if(typeof skillPtsRefresh==='function')skillPtsRefresh()}}catch(e){}
st.innerHTML='<div id="ngEndTitle">ECHO PROOF</div><div id="ngSub">+50 skill points. (cover fee.)</div><div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ THE KNOCKING ]</div></div><div id="ngSub">CHAPTER 17: JBO VS THE KNOCKING</div>';
ngSay('...done. it cannot sound like me anymore. (it will try.)');
var door=document.getElementById('ngDoor');
if(door)door.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('the knocking is loud. jbo is louder. go. i am staying here.');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(17)},800);
};
}
var ngKnockI=0,ngKnockFails=0,ngKnockTotal=4;
var ngKnockPos=50,ngKnockDir=1,ngKnockSpeed=60;
var ngKnockZoneS=40,ngKnockZoneW=20;
var ngKnockIv=null,ngKnockTimerIv=null,ngKnockTimerT=null,ngKnockNextT=null,ngKnockRetryT=null;
var ngKnockLeft=0,ngKnockLimit=6000,ngKnockKnocks=0,ngKnockYellI=0,ngKnockPassI=0;
var ngKnockYells=['LEFT!! ...I MEAN RIGHT! LEFT! MY OTHER RIGHT!','HOLD IT! ...NOW GO. GO GO GO!','STOP!! ...why did you stop. keep going.','DOWN! UP! DOWN! i am giving you BOTH, pick one!','NOW!! ...okay not now. NOW! ...still not now.','MORE!! ...less. MORE LESS MORE.','WHY ARE YOU MOVING IT LIKE THAT. move it how i am SCREAMING.','GREEN IS A STATE OF MIND. LAND IT.'];
var ngKnockHits=['WHO IS DOING THAT.','STOP KNOCKING. i can HEAR you knocking.','that is NOT part of the calibration. GO AWAY.','tell them to STOP. ...obj? OBJ. they are knocking again.'];
var ngKnockMiss=['MISSED!! ...i mean— NO. MISSED.','you were off by like a whole LEFT.','the GREEN part. land in the GREEN part. it is GREEN.','if you had listened to me you would have... no, listen to ME. ME!'];
var ngKnockPassL=['...correct. do not tell jbo he helped. he did not help.','landed. i am not clapping. (i clapped once.)','good. again. this is a chore now.','jbo screamed the wrong direction and you STILL got it. impressive and insulting.','...fine. the knocking is bored now. keep going.','you are getting good at this and i HATE it.'];
function ngKnockStopAll(){
if(ngKnockIv){try{clearInterval(ngKnockIv)}catch(e){}ngKnockIv=null}
if(ngKnockTimerIv){try{clearInterval(ngKnockTimerIv)}catch(e){}ngKnockTimerIv=null}
if(ngKnockTimerT){try{clearTimeout(ngKnockTimerT)}catch(e){}ngKnockTimerT=null}
if(ngKnockNextT){try{clearTimeout(ngKnockNextT)}catch(e){}ngKnockNextT=null}
if(ngKnockRetryT){try{clearTimeout(ngKnockRetryT)}catch(e){}ngKnockRetryT=null}
}
function ngKnockHud(){
var h=document.getElementById('ngKnockHud');if(!h)return;
h.textContent='ROUND '+Math.min(ngKnockI+1,ngKnockTotal)+'/'+ngKnockTotal+' \u00b7 MISSES '+ngKnockFails+(ngHard?' \u00b7 HARD':'');
}
function ngKnockPlace(){
var w=Math.max(9,24-ngKnockI*3-(ngHard?3:0));
ngKnockZoneW=w;
ngKnockZoneS=4+Math.random()*(92-w);
ngKnockPos=Math.random()<0.5?2:94;
ngKnockDir=Math.random()<0.5?1:-1;
ngKnockSpeed=55+ngKnockI*13+(ngHard?28:0);
var z=document.getElementById('ngKnockZone');
if(z){z.style.left=ngKnockZoneS+'%';z.style.width=ngKnockZoneW+'%'}
var n=document.getElementById('ngKnockNeedle');
if(n)n.style.left=ngKnockPos+'%';
}
function ngKnockRound(){
if(!ngActive||ngChDone)return;
ngKnockKnocks=0;
ngKnockPlace();
ngKnockHud();
var bar=document.getElementById('ngKnockBar');
ngKnockLimit=Math.max(3200,6800-ngKnockI*700-(ngHard?1600:0));
ngKnockLeft=ngKnockLimit;
if(bar)bar.style.width='100%';
var w=document.getElementById('ngKnockBarWrap');if(w)w.style.display='block';
var last=performance.now();
ngKnockIv=setInterval(function(){
if(!ngActive||ngChDone){ngKnockStopAll();return}
var now=performance.now(),dt=Math.min(0.1,(now-last)/1000);last=now;
ngKnockPos+=ngKnockDir*ngKnockSpeed*dt;
if(ngKnockPos>=98){ngKnockPos=98;ngKnockDir=-1}
if(ngKnockPos<=2){ngKnockPos=2;ngKnockDir=1}
var n=document.getElementById('ngKnockNeedle');
if(n)n.style.left=ngKnockPos+'%';
},20);
ngKnockTimerT=setTimeout(function(){
ngKnockTimerT=null;
if(!ngActive||ngChDone||!ngKnockIv)return;
ngKnockTimerIv=setInterval(function(){
if(!ngActive||ngChDone){ngKnockStopAll();return}
ngKnockLeft-=100;
var b=document.getElementById('ngKnockBar');
if(b)b.style.width=Math.max(0,ngKnockLeft/ngKnockLimit*100)+'%';
if(ngKnockLeft<=0)ngKnockFail('time');
},100);
},1100);
var y=ngKnockYells[ngKnockYellI%ngKnockYells.length];ngKnockYellI++;
ngShout(y);
ngKnockKnock();
}
function ngKnockKnock(){
if(!ngActive||ngChDone||!ngKnockIv)return;
ngKnockNextT=null;
if(ngKnockKnocks>=3)return;
ngKnockKnocks++;
try{ngSfx('thud')}catch(e){}
try{var ov=document.getElementById('ngOverlay');if(ov){ov.classList.add('ngShake');setTimeout(function(){ov.classList.remove('ngShake')},450)}}catch(e){}
if(Math.random()<0.45){ngShout(ngKnockHits[Math.floor(Math.random()*ngKnockHits.length)])}
ngKnockNextT=setTimeout(function(){ngKnockKnock()},1400+Math.random()*900);
}
function ngKnockLock(){
if(!ngActive||ngChDone||!ngKnockIv)return;
try{ngHurry()}catch(e){}
ngKnockStopAll();
if(ngKnockPos>=ngKnockZoneS&&ngKnockPos<=ngKnockZoneS+ngKnockZoneW)ngKnockPass();
else ngKnockFail('miss');
}
function ngKnockPass(){
if(ngChDone)return;
ngKnockI++;
try{ngSfx('coin')}catch(e){}
var w=document.getElementById('ngKnockBarWrap');if(w)w.style.display='none';
var line=ngKnockPassL[ngKnockPassI%ngKnockPassL.length];ngKnockPassI++;
ngSay(line);
ngAfterSpeech(function(){
if(!ngActive||ngChDone)return;
if(ngKnockI>=ngKnockTotal){ngKnockBreak();return}
ngKnockRound();
},700);
}
function ngKnockFail(kind){
if(ngChDone)return;
ngKnockStopAll();
ngKnockFails++;
try{ngSfx('buzz')}catch(e){}
try{var ov=document.getElementById('ngOverlay');if(ov){ov.classList.add('ngShake');setTimeout(function(){ov.classList.remove('ngShake')},450)}}catch(e){}
var line=ngKnockMiss[ngKnockFails%ngKnockMiss.length];
if(kind==='time')line='TIME!! the GREEN part does not wait for you. GO.';
if(ngKnockFails%3===0)line='you have missed '+ngKnockFails+' times. the knocking is judging you. i am also judging you. (we agree.)';
ngShout(line);
ngKnockHud();
ngKnockRetryT=setTimeout(function(){ngKnockRetryT=null;if(ngActive&&!ngChDone)ngKnockRound()},1500);
}
function ngKnockBreak(){
if(!ngActive||ngChDone)return;
ngShout('AND STAY— done? i was not done YELLING.');
ngSay('calibrated. jbo answered nothing, the knocking left anyway.');
ngAfterSpeech(function(){if(ngActive)ngChapter17Done()},900);
}
function ngChapter17(st){
ngKnockI=0;ngKnockFails=0;ngKnockTotal=ngHard?6:4;
ngKnockYellI=0;ngKnockPassI=0;
ngKnockStopAll();
st.innerHTML='<div id="ngSub">CHAPTER 17: JBO VS THE KNOCKING</div>'+
'<div id="ngKnockHud" style="color:#4a5a6a;font-size:12px;letter-spacing:2px;font-family:Consolas,monospace;margin:18px 0 4px"></div>'+
'<div id="ngKnockTrack" style="position:relative;width:640px;max-width:90%;height:64px;margin:8px auto;background:#16121c;border:1px solid #3a2a1a;border-radius:4px;cursor:pointer;overflow:hidden">'+
'<div id="ngKnockZone" style="position:absolute;top:8px;bottom:8px;left:40%;width:20%;background:rgba(60,255,120,0.26);border:1px solid rgba(60,255,120,0.65);border-radius:2px;z-index:1"></div>'+
'<div id="ngKnockNeedle" style="position:absolute;top:0;bottom:0;left:50%;width:3px;background:rgba(255,80,140,0.95);box-shadow:0 0 8px rgba(255,80,140,0.8);z-index:2"></div>'+
'</div>'+
'<div id="ngKnockBarWrap" style="display:none;width:640px;max-width:90%;height:6px;background:#16121c;border:1px solid #3a1a1a;border-radius:3px;margin:6px auto;overflow:hidden"><div id="ngKnockBar" style="height:100%;width:100%;background:rgba(255,120,60,0.85);transition:width .1s linear"></div></div>'+
'<div id="ngSub" style="margin-top:10px">land the needle in the green. LOCK when they overlap. jbo is lying.</div>'+
'<button class="ngtopt" id="ngKnockLockBtn" style="margin-top:14px">LOCK</button>';
var tr=document.getElementById('ngKnockTrack');
if(tr)tr.onclick=ngKnockLock;
var lb=document.getElementById('ngKnockLockBtn');
if(lb)lb.onclick=ngKnockLock;
ngKnockHud();
try{ngSfx('static')}catch(e){}
ngSay('chapter 17. the knocking started again. jbo volunteered to answer it. i let him.');
ngShout('I GOT THIS. EVERYONE SHUT UP. ...i am so ready.');
ngSay('you calibrate. land the needle in the green. ignore jbo, he is yelling weather.');
ngAfterSpeech(function(){if(ngActive&&!ngChDone)ngKnockRound()},600);
}
function ngChapter17Done(){
if(!ngActive||ngChDone)return;
ngChDone=true;
ngKnockStopAll();
try{ngUnlock(18)}catch(e){}
try{ngSave({p17:{misses:ngKnockFails}})}catch(e){}
var st=document.getElementById('ngStage');if(!st)return;
try{if(typeof grantPts==='function'&&typeof ptMult==='function'){grantPts(50*ptMult());if(typeof skillPtsRefresh==='function')skillPtsRefresh()}}catch(e){}
st.innerHTML='<div id="ngEndTitle">CALIBRATED</div><div id="ngSub">+50 skill points. (calibration fee.)</div><div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ THE DOOR ]</div></div><div id="ngSub">CHAPTER 18: THE DOOR</div>';
ngSay('...calibrated. jbo gets nothing. the knocking gets nothing. i get the last word.');
var door=document.getElementById('ngDoor');
if(door)door.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('it has been waiting. doors wait. go.');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(18)},800);
};
}
function ngChapter18(st){
var prev=null;try{prev=achP18()}catch(e){}
var first=!prev;
var wrongN=(prev&&typeof prev.wrong==='number')?prev.wrong:0;
var wasDone=!!(prev&&prev.done);
try{ngUnlock(19)}catch(e){}
var p18init={done:wasDone?1:0,condemned:1,ph:1,fragOK:0,wrong:wrongN};
if(wasDone)p18init.replay=1;
try{ngSave({p18:p18init})}catch(e){}
if(wasDone){try{if(typeof achScan==='function')achScan()}catch(e){}}
if(first){try{if(typeof grantPts==='function'&&typeof ptMult==='function'){grantPts(50*ptMult());if(typeof skillPtsRefresh==='function')skillPtsRefresh()}}catch(e){}}
st.innerHTML='<div id="ngEndTitle">CONDEMNED</div><div id="ngSub">CHAPTER 18: THE DOOR (closed by order of the void)</div><div id="ngDoor"><div class="ngDoorFrame locked"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ CONDEMNED ]</div></div>';
try{ngSfx('buzz')}catch(e){}
var door18=document.getElementById('ngDoor');
if(door18)door18.onclick=function(){
if(!ngActive)return;
try{ngSfx('buzz')}catch(e){}
try{var cur=achP18()||{done:0,condemned:1,ph:1,fragOK:0,wrong:0};cur.wrong=(cur.wrong||0)+1;ngSave({p18:cur})}catch(e){}
if(!door18._buzzed){door18._buzzed=true;ngSay('it is condemned. do not touch the condemned door.')}
};
ngSay('chapter 18. THE DOOR. ...is condemned.');
ngAfterSpeech(function(){
if(!ngActive||ngChDone)return;
ngSay('red tape on the frame. structural notice. the receipts bent the hinges.');
ngAfterSpeech(function(){
if(!ngActive||ngChDone)return;
ngSay('the inspector came. i am the inspector. i condemned it myself. no appeals. (there is no appeals dept.)');
ngAfterSpeech(function(){
if(!ngActive||ngChDone)return;
ngSay('you do not get to open it. you get to walk past it. everybody walk past it.');
ngAfterSpeech(function(){
if(!ngActive||ngChDone)return;
ngSay('chapter 19 is next. the mailroom. strictly fewer load-bearing doors.');
ngAfterSpeech(function(){
if(!ngActive||ngChDone)return;
try{var fin=achP18()||{condemned:1,ph:1,fragOK:0,wrong:0};fin.done=1;ngSave({p18:fin})}catch(e){}
try{if(typeof achScan==='function')achScan()}catch(e){}
ngShowChapter(19);
},900);
},700);
},700);
},700);
},700);
}
var ngMornPh=1,ngMornStrikes=0,ngMornStrikesTot=0,ngMornRound=0,ngMornBatchI=0,ngMornItem=0;
var ngMornBatch=[],ngMornMemo=0,ngMornReady=0,ngMornLunchDone=0,ngMornLunchResp='',ngMornFailSt=0;
var ngMornTmrIv=null,ngMornTmrLeft=0,ngMornLimit=0,ngMornAud=null,ngMornRules=[];
var ngMornTraceLeft=0,ngMornTraceIv=null,ngMornTraceUses=0;
var ngMornBins=['SHRED','TO JBO','ARCHIVE'];
var ngMornFroms=['voidcorp','core team','obj','static dept','echo lab','mailroom union','jbo relay'];
var ngMornStamps=['PLAIN','PLAIN','VOID','REDACTED'];
var ngMornRulesDef=[
{id:'r1',on:true,bin:'SHRED',text:'stamp VOID \u2192 SHRED (VOID outranks everything)',test:function(i){return i.stamp==='VOID'}},
{id:'r2',on:true,bin:'TO JBO',text:'sender contains jbo \u2192 TO JBO',test:function(i){return i.from.indexOf('jbo')>=0}},
{id:'r4',on:false,bin:'TO JBO',text:'',test:function(i){return i.stamp==='REDACTED'}},
{id:'r3',on:false,bin:'SHRED',text:'number \u2265 90 \u2192 SHRED (burn the high ones)',test:function(i){return i.num>=90}}
];
var ngMornCatchBin='ARCHIVE';
var ngMornCatchText='everything else \u2192 ARCHIVE';
var ngMornMemos=[
{text:'MEMO 1: number \u2265 90 \u2192 SHRED. burn the high ones.',apply:function(){ngMornRules[3].on=true}},
{text:'MEMO 2: stamp REDACTED \u2192 TO JBO. he "collects" them.',apply:function(){ngMornRules[2].on=true}},
{text:'MEMO 3: MANAGEMENT OVERRIDE: REDACTED \u2192 SHRED. jbo lost that argument.',apply:function(){ngMornRules[2].bin='SHRED'}}
];
var ngMornRoast=['wrong bin. the poster is RIGHT THERE.','the mail screams softly as it goes to the wrong dimension.','no. read. the. poster.','that bin has a LABEL. labels are words. words mean things.','wrong. jbo would have gotten this, and jbo cannot read.'];
var ngMornLunchOpts=['a sandwich shaped like a problem','coffee, black like my humor','yesterday\u2019s leftover code'];
var ngMornLunchTips=[
'you ate a sandwich shaped like a problem. it tasted like quarters. +0 nutrition, +1 audacity.',
'black coffee. the void\u2019s personality in a cup. obj approves for once: "correct."',
'yesterday\u2019s leftover code. mostly semicolons. you feel... compiled.'
];
function ngMornStrikeMax(){return ngHard?3:4}
function ngMornRoundsTotal(){return ngHard?3:2}
function ngMornRushTotal(){return ngHard?3:2}
function ngMornBatchSize(){var a=ngHard?[5,6,7]:[5,6];return a[ngMornRound]}
function ngMornRushSize(){return ngHard?7:6}
function ngMornRushLimit(){return ngHard?45000:60000}
function ngMornFmt(ms){var s=Math.max(0,Math.ceil(ms/1000));var m=Math.floor(s/60);var ss=s%60;return m+':'+(ss<10?'0':'')+ss}
function ngMornRulesInit(){
ngMornRules=[];
for(var i=0;i<ngMornRulesDef.length;i++){var d=ngMornRulesDef[i];ngMornRules.push({id:d.id,on:d.on,bin:d.bin,text:d.text,test:d.test})}
}
function ngMornBin(it){
for(var i=0;i<ngMornRules.length;i++){var r=ngMornRules[i];if(r.on&&r.test(it))return r.bin}
return ngMornCatchBin;
}
function ngMornTraceReset(){ngMornTraceLeft=1}
function ngMornWinRule(it){
for(var i=0;i<ngMornRules.length;i++){var r=ngMornRules[i];if(r.on&&r.test(it))return i}
return -1;
}
function ngMornTraceFlash(id){
if(ngMornTraceIv){try{clearTimeout(ngMornTraceIv)}catch(e){}ngMornTraceIv=null}
var el=document.getElementById(id);if(!el)return;
var pb=el.style.background,pc=el.style.color;
el.style.background='rgba(255,220,120,0.28)';el.style.color='#ffe090';
ngMornTraceIv=setTimeout(function(){try{el.style.background=pb;el.style.color=pc}catch(e){}ngMornTraceIv=null},1800);
}
function ngMornTrace(){
if(!ngActive||ngChDone)return;
var it=ngMornBatch[ngMornItem];if(!it)return;
if(ngMornTraceLeft<=0){ngSay('trace budget spent. the poster is your friend now.');return}
ngMornTraceLeft--;
ngMornTraceUses++;
try{ngMornSave()}catch(e){}
try{ngSfx('pop')}catch(e){}
var w=ngMornWinRule(it);
if(w<0){ngSay('trace: no rule matched. '+ngMornCatchText+'.');ngMornTraceFlash('ngMornRuleC')}
else{
var r=ngMornRules[w];var txt=r.text;
if(r.id==='r4')txt='stamp REDACTED \u2192 '+r.bin+(r.bin==='SHRED'?' (management override)':' (jbo loves secrets)');
ngSay('trace: '+txt);
ngMornTraceFlash('ngMornRule'+w);
}
var b=document.getElementById('ngMornTraceB');
if(b)b.textContent='TRACE ('+ngMornTraceLeft+' left)';
}
function ngMornRand(a,b){return a+Math.floor(Math.random()*(b-a+1))}
function ngMornGen(n){
var out=[];
for(var i=0;i<ngMornRules.length;i++){
var r=ngMornRules[i];if(!r.on)continue;
var it=null;
if(r.id==='r1')it={from:ngMornFroms[ngMornRand(0,5)],stamp:'VOID',num:ngMornRand(3,89)};
else if(r.id==='r2')it={from:'jbo relay',stamp:'PLAIN',num:ngMornRand(3,89)};
else if(r.id==='r4')it={from:ngMornFroms[ngMornRand(0,5)],stamp:'REDACTED',num:ngMornRand(3,89)};
else it={from:ngMornFroms[ngMornRand(0,5)],stamp:'PLAIN',num:ngMornRand(90,99)};
out.push(it);
}
while(out.length<n)out.push({from:ngMornFroms[ngMornRand(0,5)],stamp:'PLAIN',num:ngMornRand(3,89)});
for(var k=out.length-1;k>0;k--){var j=Math.floor(Math.random()*(k+1));var t=out[k];out[k]=out[j];out[j]=t}
return out;
}
function ngMornStopAll(){
if(ngMornTmrIv){try{clearInterval(ngMornTmrIv)}catch(e){}ngMornTmrIv=null}
ngMornLimit=0;
if(ngMornTraceIv){try{clearTimeout(ngMornTraceIv)}catch(e){}ngMornTraceIv=null}
if(ngMornAud){try{ngMornAud.pause()}catch(e){}}
}
function ngMornTimerStop(){if(ngMornTmrIv){try{clearInterval(ngMornTmrIv)}catch(e){}ngMornTmrIv=null}ngMornLimit=0}
function ngMornTimerStart(limit,cb){
ngMornTimerStop();
ngMornLimit=limit;ngMornTmrLeft=limit;
var b=document.getElementById('ngMornBar');if(b)b.style.width='100%';
var t=document.getElementById('ngMornTime');if(t)t.textContent=ngMornFmt(limit);
ngMornTmrIv=setInterval(function(){
if(!ngActive||ngChDone){ngMornTimerStop();return}
ngMornTmrLeft-=250;
var b2=document.getElementById('ngMornBar');if(b2)b2.style.width=Math.max(0,ngMornTmrLeft/ngMornLimit*100)+'%';
var t2=document.getElementById('ngMornTime');if(t2)t2.textContent=ngMornFmt(ngMornTmrLeft);
if(ngMornTmrLeft<=0){ngMornTimerStop();cb()}
},250);
}
function ngMornSave(){try{ngSave({p19:{ph:ngMornPh,strikes:ngMornStrikesTot,trace:ngMornTraceUses}})}catch(e){}}
function ngMornHud(){
var h=document.getElementById('ngMornProg');if(!h)return;
var t='PHASE '+ngMornPh+'/5 \u00b7 ';
if(ngMornPh===1)t+='orientation '+Math.min(ngMornItem+1,ngMornBatch.length||3)+'/'+(ngMornBatch.length||3);
else if(ngMornPh===2)t+=(ngMornMemo?'memo pending':'round '+(ngMornRound+1)+'/'+ngMornRoundsTotal()+' \u00b7 item '+Math.min(ngMornItem+1,ngMornBatch.length||1)+'/'+(ngMornBatch.length||1));
else if(ngMornPh===3)t+=ngMornLunchDone?'lunch eaten':'lunch';
else if(ngMornPh===4)t+='rush '+(ngMornBatchI+1)+'/'+ngMornRushTotal()+' \u00b7 item '+Math.min(ngMornItem+1,ngMornBatch.length||1)+'/'+(ngMornBatch.length||1);
else t+=ngMornReady?'override '+Math.min(ngMornItem+1,ngMornBatch.length||1)+'/'+(ngMornBatch.length||1):'gate';
t+=' \u00b7 strikes '+ngMornStrikes+'/'+ngMornStrikeMax();
h.textContent=t;
var wrap=document.getElementById('ngMornBarWrap');
if(wrap)wrap.style.display=(ngMornTmrIv&&ngMornLimit>0)?'flex':'none';
}
function ngMornRulesHtml(){
var h='<div style="color:#d8a05a;font-family:Georgia,serif;font-size:12px;letter-spacing:1px;text-align:center;margin:6px 0 2px">FILING RULES (wall poster)</div>';
h+='<div style="color:#e8c07a;font-family:Georgia,serif;font-size:11px;font-style:italic;text-align:center;margin-bottom:4px">first match wins \u2014 stop at the top hit</div>';
for(var i=0;i<ngMornRules.length;i++){
var r=ngMornRules[i];if(!r.on)continue;
var txt=r.text;
if(r.id==='r4')txt='stamp REDACTED \u2192 '+r.bin+(r.bin==='SHRED'?' (management override)':' (jbo loves secrets)');
h+='<div id="ngMornRule'+i+'" style="color:#9fb2c5;font-family:Consolas,monospace;font-size:11px;text-align:center">'+txt+'</div>';
}
h+='<div id="ngMornRuleC" style="color:#9fb2c5;font-family:Consolas,monospace;font-size:11px;text-align:center">'+ngMornCatchText+'</div>';
return h;
}
function ngMornCardHtml(it){
return '<div style="color:#c8a0d0;font-family:Georgia,serif;font-size:13px;letter-spacing:2px;text-align:center;margin:8px 0 4px">MAIL ITEM</div>'+
'<div style="color:#d8a05a;font-family:Consolas,monospace;font-size:13px;text-align:center;margin-bottom:12px">from: '+it.from+' \u00b7 stamp: '+it.stamp+' \u00b7 #'+it.num+'</div>';
}
function ngMornBinsHtml(){
var h='<div style="display:flex;gap:8px;justify-content:center;flex-wrap:wrap;width:84%">';
for(var i=0;i<ngMornBins.length;i++)h+='<button class="ngtopt" data-b="'+i+'" style="width:30%;margin:0;font-size:12px">'+ngMornBins[i]+'</button>';
h+='</div>';
h+='<button class="ngtopt" id="ngMornTraceB" style="width:52%;margin-top:10px;font-size:11px;opacity:.8"'+(ngMornTraceLeft<=0?' disabled':'')+'>'+('TRACE ('+ngMornTraceLeft+' left)')+'</button>';
return h;
}
function ngMornBindBins(cb){
var m=document.getElementById('ngMornMain');if(!m)return;
var bs=m.getElementsByTagName('button');
for(var j=0;j<bs.length;j++)(function(b){var a=b.getAttribute('data-b');if(a===null)return;b.onclick=function(){cb(parseInt(a,10))}})(bs[j]);
var tb=document.getElementById('ngMornTraceB');if(tb)tb.onclick=function(){ngMornTrace()};
}
function ngMornShake(){try{var ov=document.getElementById('ngOverlay');if(ov){ov.classList.add('ngShake');setTimeout(function(){ov.classList.remove('ngShake')},450)}}catch(e){}}
function ngMornAnswer(bi){
if(!ngActive||ngChDone)return;
var it=ngMornBatch[ngMornItem];if(!it)return;
if(ngMornBins[bi]===ngMornBin(it)){
try{ngSfx('coin')}catch(e){}
ngMornItem++;
if(ngMornItem>=ngMornBatch.length){ngMornBatchDone();return}
ngMornHud();
setTimeout(function(){if(ngActive&&!ngChDone)ngMornRender()},350);
}else{
try{ngSfx('buzz')}catch(e){}
ngMornShake();
ngMornStrikes++;ngMornStrikesTot++;
try{ngMornSave()}catch(e){}
if(ngMornStrikes>=ngMornStrikeMax()){
ngMornStrikes=0;ngMornItem=0;ngMornTraceReset();
ngSay('strike limit. batch back to item one. the poster is still on the wall.');
ngMornRender();
}else{
ngSay(ngMornRoast[ngMornStrikes%ngMornRoast.length]+' strike '+ngMornStrikes+' of '+ngMornStrikeMax()+'.');
ngMornHud();
}
}
}
function ngMornBatchDone(){
if(ngMornPh===1){ngMornBridge('orientation done. three for three. the poster promised nothing and delivered exactly that.',2);return}
if(ngMornPh===2){
ngMornRound++;
if(ngMornRound<ngMornRoundsTotal()){ngMornMemo=1;ngMornItem=0;ngMornStrikes=0;ngMornRender()}
else ngMornBridge('mail sorted. every rule obeyed. the void is briefly proud, which is worse.',3);
return}
if(ngMornPh===4){
ngMornBatchI++;
if(ngMornBatchI<ngMornRushTotal()){
ngMornItem=0;ngMornStrikes=0;ngMornBatch=[];
ngSay('batch filed. next batch already on the desk. the clock keeps ticking.');
ngMornTimerStart(ngMornRushLimit(),ngMornRushFail);
ngMornRender();
}else{
ngMornTimerStop();
ngMornBridge('rush survived. desk clear. ...why is the lights humming?',5);
}
return}
if(ngMornPh===5){ngMornSuccess();return}
}
function ngMornBridge(objLine,ph){
if(objLine)ngSay(objLine);
ngAfterSpeech(function(){if(ngActive&&!ngChDone)ngMornGo(ph)},700);
}
function ngMornRushFail(){
if(!ngActive||ngChDone)return;
try{ngSfx('buzz')}catch(e){}
ngMornShake();
ngMornItem=0;ngMornStrikes=0;ngMornBatch=[];
ngSay('out of time. fresh batch. the clock does not reset its opinion of you.');
ngMornTimerStart(ngMornRushLimit(),ngMornRushFail);
ngMornRender();
}
function ngMornLunchPick(i){
if(!ngActive||ngChDone)return;
ngMornLunchResp=ngMornLunchTips[i]||ngMornLunchTips[0];
ngMornLunchDone=1;ngMornStrikes=0;
try{ngSfx('pop')}catch(e){}
ngMornPh3();
}
function ngMornStartCountdown(){
if(!ngActive||ngChDone||ngMornReady)return;
ngMornReady=1;
ngMornStrikes=0;ngMornItem=0;
ngMornBatch=ngMornGen(ngHard?64:32);ngMornTraceReset();
try{ngSave({p19:{ph:5,strikes:0}})}catch(e){}
try{ngMornAud=new Audio('sciences_downfall.webm');ngMornAud.volume=0.85;var pr=ngMornAud.play();if(pr&&pr.catch)pr.catch(function(){})}catch(e){}
try{ngSfx('static')}catch(e){}
ngSay('the song is playing. five minutes. file everything before the last note.');
ngMornTimerStart(300000,ngMornShutdown);
ngMornPh5();
}
function ngMornSuccess(){
if(!ngActive||ngChDone)return;
ngMornTimerStop();
try{if(ngMornAud)ngMornAud.pause()}catch(e){}
try{ngSfx('win')}catch(e){}
ngSay('filed. ALL of it. the song fades and the lights come back on.');
ngAfterSpeech(function(){if(ngActive&&!ngChDone)ngChapter19Done()},900);
}
function ngMornShutdown(){
if(!ngActive||ngChDone||ngMornFailSt)return;
ngMornTimerStop();
try{if(ngMornAud)ngMornAud.pause()}catch(e){}
try{ngSfx('thud')}catch(e){}
ngMornShake();
ngMornFailSt=1;
var st=document.getElementById('ngStage');if(!st)return;
st.innerHTML='<div id="ngEndTitle" style="color:#ff4444">THE MAILROOM WENT DARK</div>'+
'<div id="ngSub">the song ended. the dimension noticed you were late.</div>'+
'<div id="ngMornDel" style="color:#ff9090;font-family:Consolas,monospace;font-size:13px;text-align:center;margin:16px auto;min-height:130px;width:70%;line-height:1.6"></div>'+
'<button class="ngtopt" id="ngMornRetryB" style="display:none;width:46%">REWIND THE LAST 5 MINUTES</button>';
var keys=['cube_visit_count','cube_luck','cube_cbmenu_best','cube_ach','cube_demo_lib'];
if(ngHard)keys.push('cube_core_seen');
var d=document.getElementById('ngMornDel');
var i=0;
function step(){
if(!ngActive||!ngMornFailSt)return;
if(i>=keys.length){
var rb=document.getElementById('ngMornRetryB');
if(rb){rb.style.display='block';rb.onclick=function(){if(!ngActive)return;ngMornFailSt=0;ngShowChapter(19)}}
ngSay('scrubbed. gone. ...your slots still hold a backup, if you were smart enough to save.');
return}
var k=keys[i];
var had=false;
try{had=localStorage.getItem(k)!==null;localStorage.removeItem(k)}catch(e){}
if(d)d.innerHTML+='<div>'+(had?'\u2014 '+k+': erased.':'\u2014 '+k+': (never existed. still gone.)')+'</div>';
i++;
setTimeout(step,700);
}
step();
}
function ngMornGo(ph){
ngMornStopAll();
ngMornPh=ph;ngMornStrikes=0;ngMornItem=0;ngMornBatchI=0;
ngMornBatch=[];ngMornReady=0;ngMornFailSt=0;ngMornTraceReset();
if(ph===2){ngMornMemo=1;ngMornRound=0}
if(ph===3){ngMornMemo=0;ngMornLunchDone=0;ngMornLunchResp=''}
if(ph===4)ngMornMemo=0;
ngMornSave();
ngMornRender();
if(ph===4)ngMornTimerStart(ngMornRushLimit(),ngMornRushFail);
}
function ngMornRender(){
ngMornHud();
if(ngMornPh===1)ngMornPh1();
else if(ngMornPh===2)ngMornPh2();
else if(ngMornPh===3)ngMornPh3();
else if(ngMornPh===4)ngMornPh4();
else if(ngMornPh===5)ngMornPh5();
}
function ngMornPh1(){
var m=document.getElementById('ngMornMain');if(!m)return;ngMornHud();
if(!ngMornBatch.length){ngMornBatch=ngMornGen(3);ngMornTraceReset()}
var it=ngMornBatch[ngMornItem];if(!it){ngMornItem=0;it=ngMornBatch[0]}
var h='<div style="color:#c8a0d0;font-family:Georgia,serif;font-size:14px;letter-spacing:2px;text-align:center;margin:8px 0 4px">ORIENTATION \u00b7 item '+(ngMornItem+1)+'/3</div>';
h+=ngMornRulesHtml()+ngMornCardHtml(it)+ngMornBinsHtml();
h+='<div style="color:#4a5a6a;font-family:Consolas,monospace;font-size:10px;text-align:center;margin-top:12px">read the poster. file the mail. the poster does not lie (yet).</div>';
m.innerHTML=h;
ngMornBindBins(ngMornAnswer);
}
function ngMornPh2(){
var m=document.getElementById('ngMornMain');if(!m)return;ngMornHud();
if(ngMornMemo){
var memo=ngMornMemos[ngMornRound];
if(!memo){ngMornMemo=0;ngMornPh2();return}
var h='<div style="color:#c8a0d0;font-family:Georgia,serif;font-size:14px;letter-spacing:2px;text-align:center;margin:8px 0 4px">MEMORANDUM \u00b7 round '+(ngMornRound+1)+'/'+ngMornRoundsTotal()+'</div>';
h+='<div style="border:1px solid #3a2a3a;background:rgba(30,24,36,0.6);padding:14px;width:72%;margin:10px auto;color:#d8a05a;font-family:Georgia,serif;font-size:13px;text-align:center;letter-spacing:1px">'+memo.text+'</div>';
h+=ngMornRulesHtml();
h+='<button class="ngtopt" id="ngMornMemoB" style="width:44%;margin-top:12px">FILE THE MEMO</button>';
m.innerHTML=h;
var b=document.getElementById('ngMornMemoB');
if(b)b.onclick=function(){
if(!ngActive||ngChDone)return;
try{memo.apply()}catch(e){}
ngMornMemo=0;ngMornItem=0;ngMornStrikes=0;
ngMornBatch=ngMornGen(ngMornBatchSize());ngMornTraceReset();
try{ngSfx('pop')}catch(e){}
ngSay('memo filed. rule active. try not to feed the wrong bin.');
ngMornPh2();
};
return;
}
if(!ngMornBatch.length){ngMornItem=0;ngMornBatch=ngMornGen(ngMornBatchSize());ngMornTraceReset()}
var it=ngMornBatch[ngMornItem];if(!it){ngMornItem=0;it=ngMornBatch[0]}
var h2='<div style="color:#c8a0d0;font-family:Georgia,serif;font-size:14px;letter-spacing:2px;text-align:center;margin:8px 0 4px">FILING \u00b7 round '+(ngMornRound+1)+'/'+ngMornRoundsTotal()+' \u00b7 item '+(ngMornItem+1)+'/'+ngMornBatch.length+'</div>';
h2+=ngMornRulesHtml()+ngMornCardHtml(it)+ngMornBinsHtml();
m.innerHTML=h2;
ngMornBindBins(ngMornAnswer);
}
function ngMornPh3(){
var m=document.getElementById('ngMornMain');if(!m)return;ngMornHud();
var h='<div style="color:#c8a0d0;font-family:Georgia,serif;font-size:14px;letter-spacing:2px;text-align:center;margin:10px 0 6px">LUNCH \u00b7 the break room</div>';
if(!ngMornLunchDone){
h+='<div style="color:#9fb2c5;font-family:Consolas,monospace;font-size:12px;text-align:center;margin-bottom:10px">25 minutes of peace (fast-forwarded). pick one:</div>';
for(var i=0;i<ngMornLunchOpts.length;i++)h+='<button class="ngtopt" data-l="'+i+'" style="display:block;width:66%;margin:6px auto">'+ngMornLunchOpts[i]+'</button>';
m.innerHTML=h;
var bs=m.getElementsByTagName('button');
for(var j=0;j<bs.length;j++)(function(b){var a=b.getAttribute('data-l');if(a===null)return;b.onclick=function(){ngMornLunchPick(parseInt(a,10))}})(bs[j]);
}else{
h+='<div style="color:#d8a05a;font-family:Georgia,serif;font-size:13px;text-align:center;width:74%;margin:10px auto;line-height:1.5;min-height:52px">'+ngMornLunchResp+'</div>';
h+='<div style="color:#9fb2c5;font-family:Consolas,monospace;font-size:11px;text-align:center">strikes wiped clean. the void ate them.</div>';
h+='<button class="ngtopt" id="ngMornBackB" style="width:46%;margin-top:14px">BACK TO THE DESK</button>';
m.innerHTML=h;
var b=document.getElementById('ngMornBackB');
if(b)b.onclick=function(){ngMornBridge('back to work. the afternoon will be less forgiving.',4)};
}
}
function ngMornPh4(){
var m=document.getElementById('ngMornMain');if(!m)return;ngMornHud();
if(!ngMornBatch.length){ngMornItem=0;ngMornBatch=ngMornGen(ngMornRushSize());ngMornTraceReset()}
var it=ngMornBatch[ngMornItem];if(!it){ngMornItem=0;it=ngMornBatch[0]}
var h='<div style="color:#c8a0d0;font-family:Georgia,serif;font-size:14px;letter-spacing:2px;text-align:center;margin:8px 0 4px">AFTERNOON RUSH \u00b7 batch '+(ngMornBatchI+1)+'/'+ngMornRushTotal()+' \u00b7 item '+(ngMornItem+1)+'/'+ngMornBatch.length+'</div>';
h+=ngMornRulesHtml()+ngMornCardHtml(it)+ngMornBinsHtml();
h+='<div style="color:#4a5a6a;font-family:Consolas,monospace;font-size:10px;text-align:center;margin-top:10px">same poster. new clock. wrong answers do not stop the clock.</div>';
m.innerHTML=h;
ngMornBindBins(ngMornAnswer);
}
function ngMornPh5(){
var m=document.getElementById('ngMornMain');if(!m)return;ngMornHud();
if(!ngMornReady){
var h='<div style="color:#c8a0d0;font-family:Georgia,serif;font-size:14px;letter-spacing:2px;text-align:center;margin:10px 0 4px">SHUTDOWN DRILL \u00b7 T-MINUS 05:00</div>';
h+='<div style="color:#d8a05a;font-family:Georgia,serif;font-size:13px;text-align:center;width:76%;margin:10px auto;line-height:1.6">at 5:00 the mailroom powers down for "maintenance". whatever is not filed gets... reassigned.<br>the stereo plays one song. the song is five minutes. i timed it. this is your warning, not mine.</div>';
h+=ngMornRulesHtml();
h+='<div style="color:#9fb2c5;font-family:Consolas,monospace;font-size:11px;text-align:center;margin-top:8px">'+(ngHard?10:8)+' items \u00b7 one timer \u00b7 strikes reset at the gate</div>';
h+='<button class="ngtopt" id="ngMornReadyB" style="width:48%;font-size:14px;letter-spacing:2px;margin-top:14px">I\'M READY</button>';
m.innerHTML=h;
var b=document.getElementById('ngMornReadyB');
if(b)b.onclick=function(){ngMornStartCountdown()};
return;
}
var it=ngMornBatch[ngMornItem];if(!it){ngMornItem=0;it=ngMornBatch[0]}
var h2='<div style="color:#ff8060;font-family:Georgia,serif;font-size:14px;letter-spacing:2px;text-align:center;margin:8px 0 4px">SHUTDOWN \u00b7 override item '+(ngMornItem+1)+'/'+ngMornBatch.length+'</div>';
h2+=ngMornRulesHtml()+ngMornCardHtml(it)+ngMornBinsHtml();
h2+='<div style="color:#4a5a6a;font-family:Consolas,monospace;font-size:10px;text-align:center;margin-top:10px">the stereo is playing. you can hear it. so can the mail.</div>';
m.innerHTML=h2;
ngMornBindBins(ngMornAnswer);
}
function ngMornReplayReset(){try{var s=ngLoad();if(s.p19&&s.p19.done){ngMornTraceUses=0;ngMornStrikesTot=0;ngSave({p19:{ph:1,strikes:0,replay:1,trace:0}});if(typeof achScan==='function')achScan()}}catch(e){}}
function ngChapter19(st){
ngMornStopAll();
ngMornPh=1;ngMornStrikes=0;ngMornStrikesTot=0;ngMornRound=0;ngMornBatchI=0;ngMornItem=0;
ngMornBatch=[];ngMornMemo=0;ngMornReady=0;ngMornLunchDone=0;ngMornLunchResp='';ngMornFailSt=0;ngMornTraceReset();ngMornTraceUses=0;
ngMornRulesInit();
var ph=1;var doneF=false;
try{var s=ngLoad();if(s.p19&&typeof s.p19==='object'){ph=Math.min(Math.max(1,s.p19.ph||1),5);if(s.p19.done)doneF=true;if(typeof s.p19.strikes==='number'&&s.p19.strikes>0)ngMornStrikesTot=s.p19.strikes;if(typeof s.p19.trace==='number'&&s.p19.trace>0)ngMornTraceUses=s.p19.trace}}catch(e){}
if(doneF){try{var sr=ngLoad();if(sr.p19&&!sr.p19.replay){sr.p19.replay=1;ngSave({p19:sr.p19})}if(typeof achScan==='function')achScan()}catch(e){}ngChapter19Done(true);return}
if(ph===2)ngMornMemo=1;
if(ph>=3){ngMornRules[3].on=true;ngMornRules[2].on=true;if(ngHard)ngMornRules[2].bin='SHRED'}
ngMornPh=ph;
st.innerHTML='<div id="ngSub">CHAPTER 19: MORNING</div>'+
'<div id="ngMornProg" style="color:#4a5a6a;font-size:12px;letter-spacing:2px;font-family:Consolas,monospace;margin:16px 0 4px"></div>'+
'<div id="ngMornBarWrap" style="display:none;align-items:center;gap:8px;width:60%;margin:0 auto 6px"><div style="flex:1;height:6px;background:#16121c;border:1px solid #3a1a1a;border-radius:3px;overflow:hidden"><div id="ngMornBar" style="height:100%;width:100%;background:rgba(255,120,60,0.85);transition:width .25s linear"></div></div><span id="ngMornTime" style="color:#ff8060;font-family:Consolas,monospace;font-size:12px"></span></div>'+
'<div id="ngMornMain" style="display:flex;flex-direction:column;align-items:center;width:100%"></div>';
ngMornHud();
try{ngSfx('door')}catch(e){}
if(ph===4)ngMornTimerStart(ngMornRushLimit(),ngMornRushFail);
if(ph>1){
ngSay('checkpoint restored. phase '+ph+'. the mail waits for nobody.');
ngAfterSpeech(function(){if(ngActive&&!ngChDone)ngMornRender()},600);
}else{
ngSay('chapter 19. MORNING. the mailroom dimension. 9:04, and the void has MAIL.');
ngAfterSpeech(function(){
if(!ngActive||ngChDone)return;
ngSay('i filed once. i filed better. file like me, only louder.');
ngAfterSpeech(function(){if(ngActive&&!ngChDone)ngMornRender()},700);
},600);
}
}
function ngChapter19Done(replay){
if(!ngActive||ngChDone)return;
ngChDone=true;
ngMornStopAll();
if(!replay){
try{ngUnlock(20)}catch(e){}
try{if(typeof ngMornTmrLeft!=='undefined'&&ngMornTmrLeft>=120000)localStorage.setItem('cube_outrun','1')}catch(e){}
var keepRep=0;try{var rp=ngLoad();if(rp.p19&&rp.p19.replay)keepRep=1}catch(e){}
try{ngSave({p19:{ph:1,strikes:ngMornStrikesTot,done:1,trace:(typeof ngMornTraceUses!=='undefined'&&ngMornTraceUses>0)?1:0,hard:ngHard?1:0,replay:keepRep}})}catch(e){}
}
var st=document.getElementById('ngStage');if(!st)return;
if(!replay){try{if(typeof grantPts==='function'&&typeof ptMult==='function'){grantPts(50*ptMult());if(typeof skillPtsRefresh==='function')skillPtsRefresh()}}catch(e){}}
st.innerHTML='<div id="ngEndTitle">MAILROOM: EMPTY</div><div id="ngSub">+50 skill points. (overtime.)</div><div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ THE END ]</div></div><div id="ngSub">CHAPTER 20: CREDITS</div>';
ngSay('...act 2 is nearly done. one last door. it only leads to credits. probably.');
var door=document.getElementById('ngDoor');
if(door)door.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('chapter 20. the credits. act 2 ends where act 1 ended: in a list of names nobody asked for.');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(20)},800);
};
}
var ngCred2Held=null,ngCred2Edits=0,ngCred2Iv=null,ngVoiceOv=null;
var ngCredits2=[
{role:'DIRECTED BY',names:['obj']},
{role:'ACT 2 GAME DESIGN',names:['definitely not lux','CHAD CHADSON']},
{role:'THE SIGNAL',names:['static dept','voidcorp']},
{role:'LYING CLOCKS',names:['the clock (lying)','fake time (5 hours off)']},
{role:'THE DARK',names:['the grue (do NOT)','fuse','bulb']},
{role:'THE INTERROGATION',names:['the interloper','jbo (unhelpful)']},
{role:'THE ECHO',names:['echo','also echo']},
{role:'THE DOOR',names:['the door','UNVERIFIED receipts']},
{role:'FILED BY',names:['you','the mailroom union']},
{role:'SHREDDED BY',names:['VOID','management override']},
{role:'COUNTDOWN SONG',names:['sciences downfall (webm in disguise)','stanley parable office (the classic)']},
{role:'CRAFT SERVICES',names:['vending machine 3','a sandwich shaped like a problem']},
{role:'BLAME',names:['the intruder (you)','nyarch']}
];
var ngCred2SwapLines=['...act 2 credits are legal documents too.','we JUST did this bit.','fine. file your name wherever you want. the mail is yours now.'];
function ngChapter20(st){
ngCred2Held=null;ngCred2Edits=0;
if(ngCredIv){try{clearInterval(ngCredIv)}catch(e){}ngCredIv=null}
ngSay('credits. AGAIN. act 2 this time. these are also official. do not touch them.');
ngSay('they scroll. they are FINAL. again. mostly.');
ngCred2Render();
ngCred2Apply();
if(ngCred2Iv){try{clearInterval(ngCred2Iv)}catch(e){}}
ngCred2Iv=setInterval(function(){
try{
if(!ngActive||ngTalking())return;
var l=document.getElementById('ngCredList');if(!l)return;
l.scrollTop+=1;
if(l.scrollTop+l.clientHeight>=l.scrollHeight-2)l.scrollTop=0;
}catch(e){}
},120);
}
function ngCred2Render(){
try{
var st=document.getElementById('ngStage');if(!st)return;
var l0=document.getElementById('ngCredList');var sc=l0?l0.scrollTop:0;
var h='<div id="ngSub">CREDITS 2. do not touch.</div><div id="ngCredList">';
for(var r=0;r<ngCredits2.length;r++){
h+='<div class="ngCredRole">'+ngCredits2[r].role+'</div>';
for(var n=0;n<ngCredits2[r].names.length;n++){
var nm=ngCredits2[r].names[n];
h+='<div class="ngCredName'+(ngCred2Held===nm?' held':'')+'" data-nm="'+nm+'">'+nm+'</div>';
}
}
h+='</div><div style="margin-top:12px"><button class="ngtopt" id="ngCred2DoneB" style="width:54%;letter-spacing:2px">I HAVE SEEN ENOUGH</button></div>';
st.innerHTML=h;
var l1=document.getElementById('ngCredList');if(l1)l1.scrollTop=sc;
var els=document.querySelectorAll?document.querySelectorAll('.ngCredName'):[];
for(var i=0;i<els.length;i++){
(function(el){
var nm=el.getAttribute?el.getAttribute('data-nm'):null;
if(!nm&&el.dataset)nm=el.dataset.nm;
el.onclick=function(){ngCred2Click(nm||el.textContent)};
})(els[i]);
}
var db=document.getElementById('ngCred2DoneB');
if(db)db.onclick=function(){if(!ngActive||ngChDone)return;if(ngTalking())return;try{ngHurry()}catch(e){}try{localStorage.setItem('cube_cred2_seen','1')}catch(e){}ngChapter20Done()};
}catch(e){}
}
function ngCred2Find(name){for(var r=0;r<ngCredits2.length;r++){for(var n=0;n<ngCredits2[r].names.length;n++){if(ngCredits2[r].names[n]===name)return{r:r,n:n}}}return null}
function ngCred2RoleFirst(role){for(var r=0;r<ngCredits2.length;r++){if(ngCredits2[r].role===role)return ngCredits2[r].names[0]||''}return ''}
function ngCred2Apply(){
try{
var ov=document.getElementById('ngOverlay');if(ov){
var ob=document.getElementById('ngObj');
var d=ngCred2RoleFirst('ACT 2 GAME DESIGN');
if(/^CHAD CHADSON$/i.test(d)){ov.style.background='linear-gradient(180deg,#170d1a,#0a0510)';if(ob)ob.style.borderBottomColor='#c86ab0'}
else if(/lux/i.test(d)){ov.style.background='linear-gradient(180deg,#0d0716,#05030c)';if(ob)ob.style.borderBottomColor='#a06af0'}
else{ov.style.background='';if(ob)ob.style.borderBottomColor=''}
}
}catch(e){}
try{
var s=ngCred2RoleFirst('COUNTDOWN SONG'),idx=0;
if(/^sciences/i.test(s)){
idx=-1;
for(var j=0;j<ngTracks.length;j++)if(/sciences_downfall/i.test(ngTracks[j].f))idx=j;
if(idx<0)idx=0;
}
ngMusicMode=idx;
ngMusicApply();
}catch(e){}
try{
ngVoiceOv=(ngCred2RoleFirst('THE ECHO')==='also echo')?22:null;
}catch(e){}
}
function ngCred2Click(name){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(!name)return;
if(!ngCred2Held){ngCred2Held=name;ngCred2Render();return}
if(ngCred2Held===name){ngCred2Held=null;ngCred2Render();return}
var a=ngCred2Find(ngCred2Held),b=ngCred2Find(name);
if(!a||!b){ngCred2Held=null;ngCred2Render();return}
var tmp=ngCredits2[a.r].names[a.n];ngCredits2[a.r].names[a.n]=ngCredits2[b.r].names[b.n];ngCredits2[b.r].names[b.n]=tmp;
ngCred2Held=null;
if(ngCred2RoleFirst('DIRECTED BY')!=='obj'){
var tmp2=ngCredits2[a.r].names[a.n];ngCredits2[a.r].names[a.n]=ngCredits2[b.r].names[b.n];ngCredits2[b.r].names[b.n]=tmp2;
ngCred2Render();
ngSay('DIRECTED BY ME. still.');
return;
}
ngCred2Edits++;
try{localStorage.setItem('cube_cred2_edits',String((parseInt(localStorage.getItem('cube_cred2_edits')||'0',10)||0)+1))}catch(e){}
ngCred2Render();
if(ngCred2Edits<=3)ngSay(ngCred2SwapLines[ngCred2Edits-1]);
ngCred2Apply();
}
function ngChapter20Done(){
if(!ngActive||ngChDone)return;
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngCred2Iv){try{clearInterval(ngCred2Iv)}catch(e){}ngCred2Iv=null}
if(ngCredIv){try{clearInterval(ngCredIv)}catch(e){}ngCredIv=null}
ngChDone=true;
try{localStorage.setItem('cube_act2','1')}catch(e){}
try{if(typeof ngHard!=='undefined'&&ngHard){localStorage.setItem('cube_act2_hard','1')}}catch(e){}
try{if(typeof achScan==='function')achScan()}catch(e){}
try{ngUnlock(21)}catch(e){}
try{if(typeof grantPts==='function'&&typeof ptMult==='function'){grantPts(50*ptMult());if(typeof skillPtsRefresh==='function')skillPtsRefresh()}}catch(e){}
try{ngSfx('win')}catch(e){}
var st=document.getElementById('ngStage');if(!st)return;
st.innerHTML='<div id="ngEndTitle">THE END</div><div id="ngSub">+50 skill points. (act 2 overtime.)</div><div id="ngSub">cube_act2 = true. persistent. the void keeps receipts.</div><div id="ngSub">act 2: COMPLETE.</div><div style="margin-top:14px"><button class="ngtopt" id="ngCred2ExitB" style="width:54%;letter-spacing:2px">BACK TO THE VOID</button></div><div style="margin-top:8px"><button class="ngtopt" id="ngCred2PCB" style="width:54%;letter-spacing:2px;opacity:.75">[ POST-CREDITS ]</button></div>';
ngSay('THE END. act 2. all of it. you knocked, you got interrogated, you filed the mail.');
ngSay('hahahaha.. its been fun. dont come back.');
ngSay('+50 skill points. take it. the void is tired.');
var b=document.getElementById('ngCred2ExitB');
if(b)b.onclick=function(){
if(!ngActive||!ngChDone)return;
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('...the void cleared its throat again. probably nothing. GO.');
ngAfterSpeech(function(){if(ngActive)ngExit()},900);
};
var pb=document.getElementById('ngCred2PCB');
if(pb)pb.onclick=function(){
if(!ngActive||!ngChDone)return;
if(ngTalking())return;
try{ngHurry()}catch(e){}
var st2=document.getElementById('ngStage');if(!st2)return;
st2.innerHTML='<div id="ngEndTitle">POST-CREDITS</div><div id="ngSub">one folding chair. one ringing phone.</div><div style="background:#0a0d12;border:1px solid #2a3a4a;border-radius:8px;padding:10px 14px;margin:12px auto;max-width:340px;font-family:Consolas,monospace;font-size:12px;color:#9ad0a8;text-align:left;line-height:1.6"><span style="color:#64ffa0">obj:</span> you are still here?<br><span style="color:#64ffa0">obj:</span> good.<br><span style="color:#64ffa0">obj:</span> act 3 is not a rumor. it is a threat. — o</div><div><button class="ngtopt" id="ngPCBack" style="width:54%;letter-spacing:2px">LEAVE THE CHAIR</button></div>';
try{ngSfx('pop')}catch(e){}
ngSay('...the phone buzzed once. the void pretended not to watch.');
var bb=document.getElementById('ngPCBack');
if(bb)bb.onclick=function(){
if(!ngActive)return;
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('you left the chair warm for the next one.');
ngAfterSpeech(function(){if(ngActive)ngExit()},900);
};
};
}
function ngChapter1Done(){
if(!ngActive)return;
var st=document.getElementById('ngStage');if(!st)return;
try{ngUnlock(2)}catch(e){}
ngChDone=true;
st.innerHTML='<div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ CLASSROOM ]</div></div><div id="ngSub">CHAPTER 2: MANDATORY TUTORIAL</div>';
ngSay('...fine. FINE. the error page is dead. are you happy?');
ngSay('since you clearly cannot be trusted, you are going back to school. TUTORIAL. now.');
var door1=document.getElementById('ngDoor');
if(door1)door1.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngSay('...ugh. FINE. classroom. sit down. do not touch the desks.');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(2)},800);
};
}
// ACT 3: THERE IS STILL NO CUBE (ch 21-30)
function ngDim(name,line,bg){
try{var fl=document.createElement('div');fl.id='ngFlash';document.body.appendChild(fl);void fl.offsetWidth;fl.classList.add('go');setTimeout(function(){if(fl.parentNode)fl.parentNode.removeChild(fl)},700)}catch(e){}
try{var st=document.getElementById('ngStage');if(st){st.className='';if(name)st.className='dim-'+name;try{st.style.background=bg||''}catch(e){}}}catch(e){}
if(line)ngSay(line);
}
function ngSayWho(w,t){if(w==='jbo')ngShout(t);else if(w==='land')ngLandlord(t);else if(w==='core')ngCore(t);else ngSay(t)}
function ngShush(w){
try{
var id=w==='jbo'?'ngJbo':w==='core'?'ngCore':w==='land'?'ngLandlord':'ngObj';
var el=document.getElementById(id);if(el)el.style.display='none';
}catch(e){}
}
function ngSaySeq(lines,done){
var i=0;
function playOne(){
if(lines[i][0]==='hide')ngShush(lines[i][1]);
else ngSayWho(lines[i][0],lines[i][1]);
i++;
}
function step(){
if(!ngActive)return;
if(i>=lines.length){if(done)ngAfterSpeech(done,400);return}
playOne();
if(i<lines.length)playOne();
ngAfterSpeech(step,400);
}
step();
}
var ngQuiz21=[
{pre:[['land','question 1. chapter 3. the curtain.'],['obj','i remember this. i have chosen to remember this.']],q:'what was behind the curtain?',opts:['the core','a tutorial','the exit'],a:0,why:'correct. it was MY core. it is always the core.'},
{pre:[['land','question 2. chapter 6. the genre incident.'],['jbo','I REMEMBER TURRETS. TURRETS REMEMBER ME.']],q:'what genre got smuggled in?',opts:['tower defense','dating sim','cooking show'],a:0,why:'correct. turrets. waves. you defended the base.'},
{pre:[['land','question 3. the rift. count the chores.'],['obj','count carefully. the rift counts back.']],q:'how many chores did it demand?',opts:['4','2','7'],a:0,why:'correct. four. the rift union mandates four.'},
{pre:[['land','question 4. the credits. twice.'],['jbo','I TOUCHED NOTHING. MY HANDS WERE UP.']],q:'what were you forbidden to touch?',opts:['the credits','the core','the landlord'],a:0,why:'correct. the credits. FINAL. (you touched.)'},
{pre:[['land','final question. the signal. how many rounds.'],['obj','listen. it is still counting. it never stopped. (it stopped.)']],q:'the signal demanded how many rounds?',opts:['4','3','10'],a:0,why:'correct. four rounds. like all of us.'},
{hard:true,pre:[['land','HARD MODE bonus. chapter 0. the beginning.'],['jbo','I WAS NOT THERE. I ARRIVED LATER. COOLER.']],q:'what was chapter 0?',opts:['a tutorial','a wedding','a blackout'],a:0,why:'correct. a tutorial. discontinued. like all tutorials.'},
{hard:true,pre:[['land','HARD MODE bonus. before the beginning.'],['obj','do not think about it too hard. it thinks back.']],q:'what chapter comes before chapter 0?',opts:['-1','chapter 20','the landlord'],a:0,why:'correct. minus one. the chapter that knocks.'}
];var ngQuiz21Active=[];
var ngQuiz21Idx=0;
var ngQuiz21WrongI=0;
var ngQuiz21Rants=[
[['obj','WRONG.'],['jbo','DUN DUN.'],['obj','the correct answer was load-bearing. try again.']],
[['obj','wrong. the studio audience groans. (there is no audience. that was ME. i groaned.)'],['jbo','DUN DUN DUN. (EXTRA DUN. FOR SHAME.)']],
[['land','incorrect. that wrong answer has been ADDED TO YOUR BILL.'],['obj','everything is added to the bill. the bill is just... life. try again.']]
];
function ngChapter21(st){
ngQuiz21Idx=0;
try{ngQuiz21Active=ngQuiz21.filter(function(q){return !q.hard||ngHard})}catch(e){ngQuiz21Active=ngQuiz21}
for(var i=0;i<ngQuiz21Active.length;i++)ngQuiz21Active[i]._pre=false;
ngDim('soap','previously on... the non-game.','linear-gradient(180deg,#160a0c,#050507)');
ngSaySeq([
['obj','previously on... the non-game.'],
['jbo','DUN DUN.'],
['obj','we open on our heroes. broke. tired. renewed against their will.'],
['jbo','WHERE IS CORE. I NEED SOMEONE TO EXPLAIN THINGS TO.'],
['obj','core is buffering. she will be back. she is always buffering.'],
['land','KNOCK KNOCK. i am the landlord. i own this dimension and the twelve next to it.'],
['obj','...the property manager found us.'],
['land','act 3 is GREENLIT and greenlights are NOT free. rent: due. compliance: mandatory.'],
['obj','how much rent. give us a number. we love numbers. (stalling.)'],
['land','the number is: PER DIMENSION. and the number GROWS. that is how numbers work. they GROW.'],
['jbo','I COUNTER-OFFER: NOTHING. FINAL OFFER.'],
['land','...accepted as a DOWN PAYMENT. the remainder is due in QUIZZES.'],
['obj','you negotiated us INTO a quiz. incredible work, jbo.'],
['jbo','I AM GREAT AT BUSINESS.'],
['land','FIVE questions. on YOUR OWN show. i will host. i am a WONDERFUL host.'],
['jbo','NO. I HOST. I HAVE A MICROPHONE VOICE.'],
['obj','(he does not have a microphone.)'],
['land','co-hosts. FINE. this is how daytime television dies.'],
['jbo','ASK ME. NO. DO NOT ASK ME.']
],function(){if(ngActive)ngQuiz21Ask()});
}
function ngQuiz21Ask(){
if(!ngActive||ngChDone)return;
var st=document.getElementById('ngStage');if(!st)return;
var q=ngQuiz21Active[ngQuiz21Idx];
if(!q._pre){q._pre=true;for(var p=0;p<q.pre.length;p++)ngSayWho(q.pre[p][0],q.pre[p][1]);ngAfterSpeech(function(){if(ngActive)ngQuiz21Ask()},600);return}
var h='<div id="ngSub">THE VOID AND THE RESTLESS - compliance quiz ('+(ngQuiz21Idx+1)+'/'+ngQuiz21Active.length+(ngHard?' - HARD':'')+')</div>';
h+='<div style="margin:18px 0;font-size:15px;letter-spacing:1px;color:#e8e2d4">'+q.q+'</div><div>';
for(var i=0;i<q.opts.length;i++){h+='<button class="ngtopt" data-qi="'+i+'" style="margin:4px">'+q.opts[i]+'</button>'}
h+='</div>';
st.innerHTML=h;
var btns=st.querySelectorAll('button');
for(var b=0;b<btns.length;b++){(function(btn){
btn.onclick=function(){
if(!ngActive||ngChDone||ngTalking())return;
var pick=parseInt(btn.getAttribute('data-qi'),10);
if(pick===q.a){ngSay(q.why);ngQuiz21Idx++;ngAfterSpeech(function(){if(!ngActive)return;if(ngQuiz21Idx>=ngQuiz21Active.length)ngChapter21Done();else if(ngQuiz21Idx===3)ngQuiz21Half();else ngQuiz21Ask()},700)}
else{try{ngSfx('buzz')}catch(e){}var rant=ngQuiz21Rants[ngQuiz21WrongI%ngQuiz21Rants.length];ngQuiz21WrongI++;ngSaySeq(rant,function(){if(ngActive)ngQuiz21Ask()})}
};
})(btns[b])}
}
function ngQuiz21Half(){
ngSaySeq([
['land','HALFTIME. scores: you have some. i have ALL of them.'],
['jbo','AS CO-HOST I DECLARE A SNACK BREAK. THERE ARE NO SNACKS.'],
['obj','the snacks were cut for budget. like the roof. like god.'],
['land','back to the quiz. the quiz waits for no one. the quiz bills OVERTIME.'],
['jbo','I AM A WONDERFUL CO-HOST. TELL THEM, COMMENTS.']
],function(){if(ngActive)ngQuiz21Ask()});
}
function ngChapter21Done(){
if(!ngActive||ngChDone)return;
if(ngTalking())return;
try{ngHurry()}catch(e){}
try{ngUnlock(22)}catch(e){}
ngChDone=true;
var st=document.getElementById('ngStage');if(!st)return;
st.innerHTML='<div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ OPEN ]</div></div><div id="ngSub">CHAPTER 22: THE BIG SLEEP (no relation)</div>';
ngSaySeq([
['land','STAMP. APPROVED. this dimension: PAID IN FULL. the next one bills double. they always bill double.'],
['obj',ngQuiz21Active.length+' for '+ngQuiz21Active.length+'. the landlord nods. somewhere, a spreadsheet purrs.'],
['jbo','NEXT DIMENSION. I CALL DIBS ON THE TRENCHCOAT.'],
['obj','core gets the minutes later. she hates the minutes.'],
['jbo','I WAS A WONDERFUL CO-HOST. I AM PUTTING IT ON MY RESUME.'],
['land','your performance: ADEQUATE. your bill: UPDATED. good evening. (i never leave. i live here now.)'],
['obj','he lives here now.'],
['obj','next: everybody gets a trenchcoat. everybody is a suspect. the exit is MISSING.'],
['obj','chapter 22: the big sleep. no relation. go on.']
]);
var door=document.getElementById('ngDoor');
if(door)door.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngDim('','');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(22)},800);
};
}
var ngNoirAsked={};
var ngNoirSuspects=[
{id:'bell',name:'THE BELLHOP',q:[
['obj','state your name and occupation for the record.'],
['obj','the bellhop polishes his bell. "i saw NOBODY," he says. "the lobby was EMPTY all night. empty like my tip jar."'],
['core','his bell is polished. suspiciously polished. NOBODY polishes that much without guilt.'],
['obj','"where were you at midnight," i ask. "polishing," he says. "ELSEWHERE polishing." noted. ELSEWHERE noted.']]},
{id:'widow',name:'THE WIDOW',q:[
['obj','the widow window faces the street. she has faced it for years.'],
['obj','"i face the street every night," she says. "at midnight, the bellhop polished his bell RIGHT IN FRONT OF ME."'],
['obj','"did you see anything ELSE," i ask. "only the rain," she says. "the rain saw everything. ask the rain."'],
['core','the rain declines to comment. classic rain.']]},
{id:'plant',name:'THE POTTED PLANT',q:[
['obj','the potted plant says nothing. it photosynthesizes.'],
['core','its alibi is the sun. the sun confirms. i asked.'],
['obj','i hold up a photo of the exit. the plant does not react. innocent. or... leafy.'],
['core','i am writing "leafy" in the file. it means nothing. it means everything.']]},
{id:'lord',name:'THE LANDLORD',q:[
['land','i was BILLING at midnight. the lobby. the street. the concept of midnight. all billed.'],
['obj','the ledger backs him up. the ledger is his son AND his alibi.'],
['land','and my ledger NEVER lies. (it lies CONSTANTLY. but not about THIS.)'],
['obj','the paperwork is innocent. i hate when the paperwork is innocent. it makes me feel... unneeded.']]}
];
function ngChapter22(st){
ngNoirAsked={};ngNoirExamined={};
ngDim('noir','the city. it rains. it is always raining.','linear-gradient(180deg,#0a0a0c,#000000)');
ngSaySeq([
['obj','the city. it rains. it is always raining. somebody made it rain and never filed the paperwork.'],
['obj','my name is obj. i am a detective. i detect. tonight the dame walked in. the dame was a CORE.'],
['core','my exit is missing, detective. it was HERE last night. now it is... elsewhere.'],
['obj','an exit. missing. in a city with no doors. i took the case. i take every case. i have nothing else going on.'],
['land','KNOCK KNOCK. detective agency, this dimension bills TRIPLE. noir tax.'],
['obj','i told him to put it on my tab. my tab is a concept. it cannot be collected.'],
['core','four suspects, detective. the bellhop. the widow. the plant. ...the landlord.'],
['obj','first: the scene. three pieces of it. look at everything. touch nothing. (touch a LITTLE.)']
],function(){if(ngActive)ngNoirScene()});
}
var ngNoirExamined={};
var ngNoirSpots=[
{id:'outline',name:'THE CHALK OUTLINE',q:[
['obj','chalk outline. shaped like a DOOR. the exit left... its SHAPE. dramatic. exits love drama.'],
['core','note: the exit is dramatic. filing under: obvious.']]},
{id:'pedestal',name:'THE EMPTY PEDESTAL',q:[
['obj','empty pedestal. sign reads: EXIT (WAS HERE). dust: undisturbed. EXCEPT: bell polish. BELL POLISH, core.'],
['core','bell polish. i am circling it. twice.']]},
{id:'rain',name:'THE RAIN',q:[
['obj','the rain. it has not stopped. i taste it. (forensics.) it tastes like... billing.'],
['land','the rain is BILLED. every drop. the invoice is my son AND my rain gauge.']]}
];
function ngNoirScene(){
if(!ngActive||ngChDone)return;
var st=document.getElementById('ngStage');if(!st)return;
var keys=['outline','pedestal','rain'];
var allSeen=true;for(var k=0;k<keys.length;k++){if(!ngNoirExamined[keys[k]])allSeen=false}
if(allSeen){ngSaySeq([
['obj','the scene is processed. chalk. dust. rain. the holy trinity of evidence.'],
['obj','now: the suspects. four of them. one of them lies. (statistics.)']
],function(){if(ngActive)ngNoirBoard()});return}
var h='<div id="ngSub">THE BIG SLEEP - examine the scene</div><div>';
for(var i=0;i<ngNoirSpots.length;i++){var s=ngNoirSpots[i];var done=ngNoirExamined[s.id];h+='<button class="ngtopt" data-sid="'+s.id+'" style="margin:4px;'+(done?'opacity:0.45':'')+'">'+s.name+(done?' (EXAMINED)':'')+'</button>'}
h+='</div>';
st.innerHTML=h;
var btns=st.querySelectorAll('button');
for(var b=0;b<btns.length;b++){(function(btn){
btn.onclick=function(){
if(!ngActive||ngChDone||ngTalking())return;
var id=btn.getAttribute('data-sid');
if(ngNoirExamined[id]){ngSay('already examined. it has not changed. evidence never changes. (it changed once. we do not talk about it.)');return}
var spot=null;for(var j=0;j<ngNoirSpots.length;j++){if(ngNoirSpots[j].id===id)spot=ngNoirSpots[j]}
if(!spot)return;
ngSaySeq(spot.q,function(){if(!ngActive)return;ngNoirExamined[id]=true;ngNoirScene()});
};
})(btns[b])}
}
function ngNoirBoard(){
if(!ngActive||ngChDone)return;
var st=document.getElementById('ngStage');if(!st)return;
var keys=['bell','widow','plant','lord'];
var allAsked=true;for(var k=0;k<keys.length;k++){if(!ngNoirAsked[keys[k]])allAsked=false}
if(allAsked){if(ngHard){ngSaySeq([
['obj','hard mode. no recap. the tape is in YOUR head.'],
['obj','somebody here is LYING. point.']
],function(){if(ngActive)ngNoirAccuse()})}else ngNoirSumming();return}
var h='<div id="ngSub">THE BIG SLEEP - interrogate the suspects</div><div>';
for(var i=0;i<ngNoirSuspects.length;i++){var s=ngNoirSuspects[i];var done=ngNoirAsked[s.id];h+='<button class="ngtopt" data-sid="'+s.id+'" style="margin:4px;'+(done?'opacity:0.45':'')+'">'+s.name+(done?' (QUESTIONED)':'')+'</button>'}
h+='</div>';
st.innerHTML=h;
var btns=st.querySelectorAll('button');
for(var b=0;b<btns.length;b++){(function(btn){
btn.onclick=function(){
if(!ngActive||ngChDone||ngTalking())return;
var id=btn.getAttribute('data-sid');
if(ngNoirAsked[id]){ngSay('that one already talked. they have nothing left but small talk.');return}
var sus=null;for(var j=0;j<ngNoirSuspects.length;j++){if(ngNoirSuspects[j].id===id)sus=ngNoirSuspects[j]}
if(!sus)return;
ngSaySeq(sus.q,function(){if(!ngActive)return;ngNoirAsked[id]=true;ngNoirBoard()});
};
})(btns[b])}
}
function ngNoirSumming(){
ngSaySeq([
['obj','wait. rewind the tape.'],
['obj','the bellhop said the lobby was EMPTY all night.'],
['obj','the widow says he was IN the lobby at midnight. polishing. in front of her.'],
['core','timeline: midnight. bellhop: polishing, location UNKNOWN. widow: watching. plant: photosynthesizing. landlord: billing.'],
['obj','four stories. three alibis. one lie. the math is MATHING.'],
['obj','somebody here is LYING. point at the liar.']
],function(){if(ngActive)ngNoirAccuse()});
}
function ngNoirAccuse(){
if(!ngActive||ngChDone)return;
var st=document.getElementById('ngStage');if(!st)return;
var h='<div id="ngSub">THE BIG SLEEP - name the liar</div><div style="color:#e8e2d4;margin:10px 0">who lied?</div><div>';
for(var i=0;i<ngNoirSuspects.length;i++){h+='<button class="ngtopt" data-sid="'+ngNoirSuspects[i].id+'" style="margin:4px">'+ngNoirSuspects[i].name+'</button>'}
h+='</div>';
st.innerHTML=h;
var btns=st.querySelectorAll('button');
for(var b=0;b<btns.length;b++){(function(btn){
btn.onclick=function(){
if(!ngActive||ngChDone||ngTalking())return;
var id=btn.getAttribute('data-sid');
if(id==='bell'){ngSaySeq([
['obj','the bellhop BREAKS. "FINE. the exit looked at me funny. so i moved it TWO INCHES to the left. it was a PRANK."'],
['core','the exit has been recovered. it was two inches away the whole time.'],
['obj','case closed. the rain keeps raining. somebody should file that paperwork.']
],function(){if(ngActive)ngChapter22Done()})}
else if(id==='widow'){try{ngSfx('buzz')}catch(e){}ngSaySeq([['obj','her? she is a WINDOW. she cannot lie. she can only... reflect.'],['obj','(do not laugh. pick again.)']],function(){if(ngActive)ngNoirAccuse()})}
else if(id==='plant'){try{ngSfx('buzz')}catch(e){}ngSaySeq([['obj','the plant? its alibi is the SUN, pal. the sun does not lie for anybody.']],function(){if(ngActive)ngNoirAccuse()})}
else{try{ngSfx('buzz')}catch(e){}ngSaySeq([['land','me? MY alibi is PAPERWORK.'],['obj','...nobody fakes paperwork. (he fakes paperwork. but not this time. pick again.)']],function(){if(ngActive)ngNoirAccuse()})}
};
})(btns[b])}
}
function ngChapter22Done(){
if(!ngActive||ngChDone)return;
if(ngTalking())return;
try{ngHurry()}catch(e){}
try{ngUnlock(23)}catch(e){}
ngChDone=true;
var st=document.getElementById('ngStage');if(!st)return;
st.innerHTML='<div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ OPEN ]</div></div><div id="ngSub">CHAPTER 23: EXIT, SINGLE, SEEKS PLAYER</div>';
ngSaySeq([
['land','moving an exit without a permit: FINE. added to the bill. case: CLOSED.'],
['core','detective. you found it in one night. you are... good at this.'],
['obj','i am good at everything. it is my curse. it is also my hobby.'],
['obj','next: candlelight. soft music. the exit is SINGLE and ready to mingle.'],
['obj','chapter 23: exit, single, seeks player. go on. try not to embarrass us.']
]);
var door=document.getElementById('ngDoor');
if(door)door.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngDim('','');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(23)},800);
};
}
var ngDateIdx=0,ngDateHearts=0,ngDateLock=false;
var ngDateScenes=[
{exit:'...hi. i am an exit. i go... out. that is my whole thing.',opts:[
{t:'compliment its frame',h:1,r:[['obj','smooth. the exit BLUSHES. exits can do that. do not ask how.'],['jbo','BOOO. COMPLIMENTS ARE JUST VERBAL HUGS.']]},
{t:'ask about its hobbies',h:0,r:[['obj','"i enjoy... opening. and closing. seasonally." the conversation stalls. the exit stares at its shoes. it has no shoes.']]},
{t:'kick down its door (romantically)',h:-1,r:[['jbo','YESSS.'],['obj','the door: kicked. romantically. it was ALREADY OPEN. the exit files this under: red flags.'],['obj','"romantically," is added. it does not help. nothing has ever helped less.']]}]},
{exit:'this restaurant is lovely. everything on the menu is VOID. i will have the void.',opts:[
{t:'split the check like an adult',h:1,r:[['obj','mature. responsible. the exit slides you the bread basket. that means something. probably.'],['obj','the waiter writes "lovebirds??" on the check. it is doing the rounds. the whole restaurant knows.']]},
{t:'order for both of you',h:0,r:[['obj','two voids ordered. the waiter respects the confidence. the exit is... processing.']]},
{t:'flip the table',h:-1,r:[['jbo','THAT IS MY BOY.'],['obj','the table is flipped. the void is everywhere. the waiter applauds. the exit does NOT applaud.'],['obj','a 200 percent tip is left. it does not fix the table. nothing fixes the table. the table is a metaphor now.']]}]},
{exit:'the stars are just holes in the sky. ...sorry. dating makes me philosophical.',opts:[
{t:'read it poetry',h:1,r:[['obj','a poem is read. four words long. "door. more. us. always." the exit CRIES. happy tears. probably.']]},
{t:'show it your cube collection',h:0,r:[['obj','all eight inner cubes: shown. the exit nods politely for forty minutes.']]},
{t:'challenge it to a duel',h:-1,r:[['jbo','DUEL MEANS LOVE IN SOME CULTURES.'],['obj','in NO cultures, jbo. somehow nobody dies. romance.'],['jbo','A DUEL IS JUST A DATE WITH STAKES.'],['obj','the stakes were: love. the outcome was: paperwork.']]}]},
{exit:'i have never been to a movie. i am usually... the way OUT of the movie.',opts:[
{t:'share the popcorn',h:1,r:[['obj','popcorn: shared. hands touch IN the bucket. the bucket blushes. EVERYTHING blushes tonight.']]},
{t:'explain the plot loudly',h:0,r:[['obj','the plot: explained. loudly. an usher shushes. the exit takes YOUR side. love means never siding with ushers.'],['obj','the SAME waiter is here. he followed you. "lovebirds??" he mouths. security is called. on HIM.']]},
{t:'cry before it starts',h:-1,r:[['jbo','TACTICAL WEEPING. RESPECT.'],['obj','crying occurs during the PREVIEWS. the exit scoots one seat away. one seat. measured.']]}]},
{exit:'these are my parents. mama door. papa trapdoor. be yourself. (do NOT be yourself.)',opts:[
{t:'firm handshake with mama door',h:1,r:[['obj','mama door CRIES. "so polite," she hinges. papa trapdoor nods. trapdoors cannot smile. he is smiling.']]},
{t:'small talk about hinges',h:0,r:[['obj','hinges: discussed. for an hour. it goes... fine. hinges are neutral territory. like switzerland. like soup.']]},
{t:'challenge papa trapdoor to a duel',h:-1,r:[['jbo','THE DUEL RETURNS. IT NEVER LEFT.'],['obj','papa trapdoor ACCEPTS. it is a trap. his NAME is trapdoor. the exit calls the whole thing off.']]}]}
];
function ngChapter23(st){
ngDateIdx=0;ngDateHearts=0;ngDateLock=false;
ngDim('date','the restaurant. candlelight. soft music.','linear-gradient(180deg,#170a10,#050507)');
ngSaySeq([
['obj','next: candlelight. soft music. somebody ordered the heart-shaped void.'],
['jbo','I BROUGHT CHOCOLATES. THEY ARE SHAPED LIKE FISTS.'],
['obj','the exit is SINGLE. you are going to DATE the exit. five scenes. do not embarrass us.'],
['jbo','MY STRATEGY: BE YOURSELF. BUT VIOLENT.'],
['obj','scene one. the exit is nervous. be gentle. (jbo: do not be gentle.)'],
['obj','FIVE scenes. dinner. stars. a movie. the PARENTS. pace yourself.']
],function(){if(ngActive)ngDateScene()});
}
function ngDateScene(){
if(!ngActive||ngChDone)return;
ngDateLock=false;
var st=document.getElementById('ngStage');if(!st)return;
var sc=ngDateScenes[ngDateIdx];
var h='<div id="ngSub">EXIT, SINGLE, SEEKS PLAYER - scene '+(ngDateIdx+1)+'/5 (hearts: '+ngDateHearts+')</div>';
h+='<div style="color:#ffb0c0;margin:14px 0;font-size:15px;letter-spacing:1px">EXIT: '+sc.exit+'</div><div>';
for(var i=0;i<sc.opts.length;i++){h+='<button class="ngtopt" data-oi="'+i+'" style="margin:4px">'+sc.opts[i].t+'</button>'}
h+='</div>';
st.innerHTML=h;
var btns=st.querySelectorAll('button');
for(var b=0;b<btns.length;b++){(function(btn){
btn.onclick=function(){
if(!ngActive||ngChDone||ngTalking()||ngDateLock)return;
ngDateLock=true;
var pick=parseInt(btn.getAttribute('data-oi'),10);
var opt=sc.opts[pick];if(!opt)return;
ngDateHearts=Math.max(0,ngDateHearts+opt.h);
ngSaySeq(opt.r,function(){if(!ngActive)return;ngDateIdx++;if(ngDateIdx>=ngDateScenes.length)ngDateFinal();else ngDateScene()});
};
})(btns[b])}
}
function ngDateFinal(){
if(!ngActive||ngChDone)return;
var st=document.getElementById('ngStage');if(!st)return;
st.innerHTML='<div id="ngSub">EXIT, SINGLE, SEEKS PLAYER - finale (hearts: '+ngDateHearts+')</div>';
if(ngDateHearts>=(ngHard?5:4)){ngSaySeq([
['obj','TRUE ENDING. the exit slips you its number. it is a PRIME number.'],
['jbo','I AM NOT CRYING. I AM LEAKING.'],
['obj','mama door APPROVES. papa trapdoor shakes your hand. the trap does NOT go off. that is trust.'],
['obj','the waiter slow-claps. "lovebirds," he says. no question marks this time.'],
['obj','five dates. four-plus hearts. the landlord sends a fruit basket. (there is no landlord in this chapter. the basket is from ME.)']
],function(){if(ngActive)ngChapter23Done()})}
else if(ngDateHearts>=(ngHard?3:2)){ngSaySeq([
['obj','FRIEND END. the exit likes you. as a friend. a distant one. in another dimension.'],
['jbo','FRIENDSHIP IS JUST SLOW ROMANCE. DO NOT GIVE UP. GIVE UP.'],
['obj','mama door hugs you. papa trapdoor almost smiles. ALMOST.'],
['obj','the exit keeps the bread basket. you keep the memory. the waiter keeps the tip. everybody keeps something.']
],function(){if(ngActive)ngChapter23Done()})}
else{ngSaySeq([
['obj','BAD END. the exit files a restraining order. it is just a slightly smaller door.'],
['jbo','THE BEST LOVE STORIES END WITH PAPERWORK.'],
['obj','the exit leaves through ITSELF. that is allowed. it made the rules.'],
['obj','zero hearts. the restaurant bans you. the STARS ban you.'],
['jbo','WORTH IT.'],
['obj','it was not worth it. jbo applauds anyway. the chapter ends in disgrace.']
],function(){if(ngActive)ngChapter23Done()})}
}
function ngChapter23Done(){
if(!ngActive||ngChDone)return;
if(ngTalking())return;
try{ngHurry()}catch(e){}
try{ngUnlock(24)}catch(e){}
ngChDone=true;
var st=document.getElementById('ngStage');if(!st)return;
st.innerHTML='<div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ OPEN ]</div></div><div id="ngSub">CHAPTER 24: 8 BITS OF NOWHERE</div>';
ngSaySeq([
['obj','romance: concluded. the exit will call. (it will not call. it has no phone.)'],
['jbo','I ATE THE FIST CHOCOLATES. WORTH IT.'],
['obj','next: everything is squares. everything has ALWAYS been squares.'],
['obj','chapter 24: 8 bits of nowhere. go on.']
]);
var door=document.getElementById('ngDoor');
if(door)door.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngDim('','');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(24)},800);
};
}
var ngBitN=0,ngBitIv=null,ngBitGen=0,ngBitGoal=20,ngBitPhase2=false,ngBitTicks=0;
var ngBitQuips=['the definitely-not-a-goomba winks. minus one bit. that is the law.','you touched the litigious one. minus one bit. it is calling its lawyer.','the goomba files a complaint. minus one bit. the complaint is ALSO square.'];
var ngBitQuipI=0;
function ngChapter24(st){
ngBitN=0;ngBitQuipI=0;ngBitPhase2=false;
ngBitGoal=ngHard?30:20;
if(ngBitIv){try{clearInterval(ngBitIv)}catch(e){}ngBitIv=null}
ngDim('bits','level 1-1. the pixels are large. the stakes are small.','linear-gradient(180deg,#0b0b12,#050508)');
ngSaySeq([
['obj','wah. ...sorry. required by law.'],
['obj','welcome to 8 bits of nowhere. population: us.'],
['jbo','CAN I-'],
['obj','no.'],
['hide','jbo'],
['obj','...and he is gone. it is just us now. you and me. like the old days.'],
['obj','pre-act 2. before the rifts and the credits and the property manager. just you, clicking. just me, judging.'],
['obj','i missed this. do not tell the others. especially jbo. he would make it weird.'],
['obj','collect '+ngBitGoal+' bits. do NOT touch the definitely-not-a-goomba. it is litigious.']
],function(){if(ngActive)ngBitBoard()});
}
function ngBitBoard(){
if(!ngActive||ngChDone)return;
var st=document.getElementById('ngStage');if(!st)return;
ngBitGen++;var g=ngBitGen;
st.innerHTML='<div id="ngSub">8 BITS OF NOWHERE - level 1-1 (<span id="ngBitCount">0</span>/'+ngBitGoal+' bits'+(ngHard?' - HARD':'')+')</div>'+
'<div id="ngBitField" style="position:relative;width:90%;height:300px;border:2px solid #3a3a55;background:#07070d;overflow:hidden;margin:0 auto"></div>'+
'<div style="color:#8a8aa5;font-size:12px;margin-top:8px;letter-spacing:1px">gold = bit. brown = lawsuit.</div>';
ngBitTicks=0;
ngBitStart(g,ngHard?650:900);
}
function ngBitStart(g,ms){
if(ngBitIv){try{clearInterval(ngBitIv)}catch(e){}ngBitIv=null}
ngBitIv=setInterval(function(){ngBitTick(g)},ms);
}
function ngBitTick(g){
if(!ngActive||ngChDone||g!==ngBitGen){try{clearInterval(ngBitIv)}catch(e){}ngBitIv=null;return}
ngBitTicks++;
try{
var field=document.getElementById('ngBitField');if(!field)return;
if(field.childNodes.length<6)ngBitSpawn(field,false,g);
if(ngBitTicks%4===0)ngBitSpawn(field,true,g);
}catch(e){}
}
function ngBitSpawn(field,bad,g){
try{
var el=document.createElement('div');
var x=4+Math.random()*88,y=6+Math.random()*80;
if(bad){el.textContent='G';el.style.cssText='position:absolute;left:'+x+'%;top:'+y+'%;color:#a06830;font:22px Consolas,monospace;cursor:pointer;text-shadow:2px 2px 0 #000'}
else{el.textContent='*';el.style.cssText='position:absolute;left:'+x+'%;top:'+y+'%;color:#ffd83a;font:22px Consolas,monospace;cursor:pointer;text-shadow:0 0 8px rgba(255,216,58,0.8),2px 2px 0 #000'}
field.appendChild(el);
var gone=false;
var to=setTimeout(function(){if(!gone){gone=true;try{if(el.parentNode)el.parentNode.removeChild(el)}catch(e){}}},bad?2500:3200);
el.onclick=function(){
if(gone||!ngActive||ngChDone)return;
gone=true;try{clearTimeout(to)}catch(e){}
try{if(el.parentNode)el.parentNode.removeChild(el)}catch(e){}
if(bad){ngBitN=Math.max(0,ngBitN-1);try{ngSfx('buzz')}catch(e){}if(!ngTalking()){ngSay(ngBitQuips[ngBitQuipI%ngBitQuips.length]);ngBitQuipI++}}
else{ngBitN++;try{ngSfx('coin')}catch(e){}
if(ngBitN===4)ngSay('4 bits. the old rhythm. you still got it.');
if(ngBitN===8)ngSay('8 bits. nearly rent money. do NOT tell the landlord.');
if(ngBitN===10&&!ngBitPhase2){ngBitPhase2=true;ngBitStart(g,ngHard?450:600);ngSay('10 bits. halfway. the pixels get FASTER now. the goombas get BOLDER.')}
if(ngBitN===14)ngSay('14 bits. your thumb is a blur. the blur is load-bearing.');
if(ngBitN===18)ngSay('18 bits. two more. do not choke. (choking is allowed. it is funny.)')}
try{var c=document.getElementById('ngBitCount');if(c)c.textContent=String(ngBitN)}catch(e){}
if(ngBitN>=ngBitGoal){if(ngBitIv){try{clearInterval(ngBitIv)}catch(e){}ngBitIv=null}ngSaySeq([
['obj',ngBitGoal+' bits. level complete. no princess. the princess was a DOOR. you already dated it.'],
['obj','you did not touch a SINGLE lawsuit. (you touched several. we are ignoring it.)'],
['obj','same time next dimension? ...do not answer that. just go.']
],function(){if(ngActive)ngChapter24Done()})}
};
}catch(e){}
}
function ngChapter24Done(){
if(!ngActive||ngChDone)return;
if(ngTalking())return;
try{ngHurry()}catch(e){}
try{ngUnlock(25)}catch(e){}
ngChDone=true;
if(ngBitIv){try{clearInterval(ngBitIv)}catch(e){}ngBitIv=null}
ngBitGen++;
var st=document.getElementById('ngStage');if(!st)return;
st.innerHTML='<div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ OPEN ]</div></div><div id="ngSub">CHAPTER 25: THE GREAT BRITISH BREAK EXIT</div>';
ngSaySeq([
['obj','just us. start to finish. twenty bits. like the old days.'],
['obj','do not tell the others i said that. especially core. she keeps a LIST.'],
['obj','jbo thinks we collected "illegal squares." we did not. (we did.)'],
['obj','next: aprons on. the exit must be BAKED.'],
['obj','chapter 25: the great british break exit. go on.']
]);
var door=document.getElementById('ngDoor');
if(door)door.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngDim('','');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(25)},800);
};
}
var ngBakeIdx=0,ngBakePos=0,ngBakeDir=1,ngBakeIv=null,ngBakeGen=0,ngBakeMiss=0;
var ngBakeItems=[
{name:'flour of forgetting',zone:[37,63],speed:1.6,react:[['core','my flour is already sifted. sifted TWICE. (she is lying. there is no flour.)'],['obj','core is baking BLIND. no recipe. no fear. no flour. incredible.']]},
{name:'sugar (stolen)',zone:[39,61],speed:1.9,react:[['obj','where did the sugar come from. do not answer. i know where it came from. (the landlord.)'],['core','i added extra salt to YOUR bowl. affectionately.']]},
{name:'yeast of the void',zone:[41,59],speed:2.2,react:[['obj','the yeast is RISING. it whispers as it rises. classic yeast behavior.'],['core','my dough is rising FASTER. it fears me. correct response.']]},
{name:'butter (also stolen)',zone:[43,57],speed:2.5,react:[['obj','the butter melts. it spells something. "HI." friendly butter.'],['core','my butter spelled "TRY HARDER." rude butter. motivated me anyway.']]},
{name:'one (1) exit, preheated',zone:[48,52],speed:3.2,react:[['obj','gently. GENTLY. fold the exit in. do not tear it.'],['core','...i am not crying. there is flour in my eye. there is NO flour. (she is crying.)']]}
];
var ngBakeMissQuips=['SOGGY. the zone was RIGHT THERE.','a miss. the oven judges you. the oven is LOUD about it.','off target. core saw. core is writing it down.','the ingredient bounced off. physics. you cannot argue with physics. (core argues with physics.)'];
var ngBakeMissI=0;
function ngChapter25(st){
ngBakeIdx=0;ngBakeMiss=0;ngBakeMissI=0;
if(ngBakeIv){try{clearInterval(ngBakeIv)}catch(e){}ngBakeIv=null}
ngDim('bake','the tent. it smells like butter and consequences.','linear-gradient(180deg,#171006,#050507)');
ngSaySeq([
['obj','welcome to the great british break exit. i am your host. i am also your judge. i am also the health inspector.'],
['core','i am the RIVAL baker. i have never baked. i have never lost. think about that.'],
['obj','rules: five ingredients. the marker moves. press ADD when it is inside the gold zone. miss, and it gets SOGGY.'],
['core','i will be baking alongside you. BLIND. no recipe. no fear. no flour.'],
['obj','soggy bottoms will be mocked. clean bakes will be sung about. aprons ON.'],
['core','my apron says "KISS THE BAKER." do NOT kiss the baker.']
],function(){if(ngActive)ngBakeBoard()});
}
function ngBakeBoard(){
if(!ngActive||ngChDone)return;
var st=document.getElementById('ngStage');if(!st)return;
ngBakeGen++;var g=ngBakeGen;
var it=ngBakeItems[ngBakeIdx];
var zn=it.zone,sp=it.speed;
if(ngHard){var zw=(zn[1]-zn[0])*0.6,zc=(zn[0]+zn[1])/2;zn=[zc-zw/2,zc+zw/2];sp=sp*1.3}
ngBakePos=0;ngBakeDir=1;
var h='<div id="ngSub">THE GREAT BRITISH BREAK EXIT - ingredient '+(ngBakeIdx+1)+'/5: '+it.name+' (misses: '+ngBakeMiss+(ngHard?' - HARD':'')+')</div>';
h+='<div id="ngBakeMeter" style="position:relative;width:90%;height:34px;border:2px solid #5a4a2a;background:#0a0805;margin:10px auto;cursor:pointer">';
h+='<div style="position:absolute;left:'+zn[0]+'%;width:'+(zn[1]-zn[0])+'%;top:0;bottom:0;background:rgba(216,169,64,0.35);border-left:1px solid #d8a940;border-right:1px solid #d8a940"></div>';
h+='<div id="ngBakeMark" style="position:absolute;left:0%;top:-4px;bottom:-4px;width:4px;background:#fff;box-shadow:0 0 8px #fff"></div></div>';
h+='<div><button class="ngtopt" id="ngBakeAdd" style="margin:4px;font-size:16px;padding:10px 26px">ADD IT</button></div>';
st.innerHTML=h;
if(ngBakeIv){try{clearInterval(ngBakeIv)}catch(e){}ngBakeIv=null}
ngBakeIv=setInterval(function(){
if(!ngActive||ngChDone||g!==ngBakeGen){try{clearInterval(ngBakeIv)}catch(e){}ngBakeIv=null;return}
ngBakePos+=ngBakeDir*sp;
if(ngBakePos>=100){ngBakePos=100;ngBakeDir=-1}
if(ngBakePos<=0){ngBakePos=0;ngBakeDir=1}
try{var m=document.getElementById('ngBakeMark');if(m)m.style.left=ngBakePos+'%'}catch(e){}
},50);
var go=function(){
if(!ngActive||ngChDone||g!==ngBakeGen)return;
if(ngBakePos>=zn[0]&&ngBakePos<=zn[1]){
try{ngSfx('coin')}catch(e){}
ngSaySeq(it.react,function(){if(!ngActive||g!==ngBakeGen)return;ngBakeIdx++;if(ngBakeIdx>=ngBakeItems.length)ngBakeOven();else ngBakeBoard()});
}else{
ngBakeMiss++;
try{ngSfx('buzz')}catch(e){}
if(!ngTalking())ngSay(ngBakeMissQuips[ngBakeMissI%ngBakeMissQuips.length]);
ngBakeMissI++;
}
};
var ab=document.getElementById('ngBakeAdd');
if(ab)ab.onclick=function(){if(ngTalking())return;go()};
var meter=document.getElementById('ngBakeMeter');
if(meter)meter.onclick=function(){if(ngTalking())return;go()};
}
function ngBakeOven(){
if(!ngActive||ngChDone)return;
if(ngBakeIv){try{clearInterval(ngBakeIv)}catch(e){}ngBakeIv=null}
ngBakeGen++;
var st=document.getElementById('ngStage');if(!st)return;
st.innerHTML='<div id="ngSub">THE GREAT BRITISH BREAK EXIT - baking...</div><div style="color:#e8e2d4;margin:14px 0;font-size:15px">the exit is IN the oven. try not to think about it.</div>';
ngSaySeq([
['obj','into the oven. 200 degrees. 20 minutes. (4 minutes. we are impatient.)'],
['core','do not open the oven. DO NOT. the heat is load-bearing.'],
['obj','...the smell. butter. sugar. exit. it smells like VICTORY. (and exit.)'],
['obj','DING.'],
['jbo','TASTE TESTER HERE. I HAVE A CLEAN SPOON. (he does not have a clean spoon.)'],
['obj','jbo tastes. he chews. the tent holds its breath. the tent has no lungs. it holds them anyway.'],
['jbo','CRUNCHY. LIKE JUSTICE. ...needs salt.']
],function(){if(ngActive)ngChapter25Done()});
}
function ngChapter25Done(){
if(!ngActive||ngChDone)return;
if(ngTalking())return;
try{ngHurry()}catch(e){}
try{ngUnlock(26)}catch(e){}
ngChDone=true;
var st=document.getElementById('ngStage');if(!st)return;
st.innerHTML='<div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ OPEN ]</div></div><div id="ngSub">CHAPTER 26: LIGHTS OUT</div>';
if(ngBakeMiss===0){ngSaySeq([
['core','...zero misses. a CLEAN bake. i have lost. for the first time. it tastes like salt. (affectionate salt.)'],
['obj','STAR BAKER. the trophy is a slightly larger exit. take it.'],
['jbo','I AM KEEPING THE SPOON.'],
['obj','next: the lights go out. bring a friend. (the friend is ME.)'],
['obj','chapter 26: lights out. go on.']
])}else{ngSaySeq([
['core',''+ngBakeMiss+' misses. SOGGY in places. and yet... risen. alive. Paw-ful. (she means AWFUL. she is being kind.)'],
['obj','not star baker. SURVIVOR baker. the trophy is still a slightly larger exit. slightly soggier.'],
['jbo','I ATE THE SOGGY BITS. NO REGRETS. SOME REGRETS.'],
['obj','next: the lights go out. bring a friend. (the friend is ME.)'],
['obj','chapter 26: lights out. go on.']
])}
var door=document.getElementById('ngDoor');
if(door)door.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngDim('','');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(26)},800);
};
}
var ngDark26Flash=false,ngDark26Scares=0,ngDark26Door=1;
var ngDark26Whispers=['...did the dark just move.','...do not think about the grue.','...the dark is also afraid. of YOU. (it is not.)','...shh. the walls are listening. the walls pay rent.','...if you see teeth, those are LOAD-BEARING teeth.'];
var ngDark26WhispI=0;
var ngDark26Baits=['FREE HUG','DO NOT PRESS','MYSTERY CANDY','DEFINITELY EXIT','CLICK FOR GHOST'];
var ngDark26Mocks=['JUMPSCARED. classic. the dark gives you a 4 out of 10.','that was the BAIT. the bait is load-bearing. try the small one.','you clicked it. you KNEW. everybody knew. the small button. SMALL.'];
var ngDark26MockI=0;
function ngChapter26(st){
ngDark26Flash=false;ngDark26Scares=0;ngDark26Door=Math.floor(Math.random()*5);
ngDim('horror','the dark. it is very dark. it is DARK dark.','linear-gradient(180deg,#000000,#030304)');
ngSaySeq([
['obj','...lights out.'],
['core','why is it dark. why is it DARK dark.'],
['obj','chapter 26: lights out. the horror dimension. the landlord does not own this one. NOBODY owns this one.'],
['core','that is the scariest sentence you have ever said.'],
['obj','rules. one: find the flashlight. it is here. somewhere. in the dark. with us.'],
['core','rule two: whatever offers you a FREE HUG, do not take the hug.'],
['obj','rule three: jbo is not here. he said, and i quote, "NOPE."'],
['core','...i am holding your sleeve, obj.'],
['obj','...i am allowing it. do not make it weird.'],
['core','it is already weird. it is DARK.'],
['obj','find the flashlight. click around. trust nothing. especially the hug.']
],function(){if(ngActive)ngDark26Hunt()});
}
function ngDark26Hunt(){
if(!ngActive||ngChDone)return;
var st=document.getElementById('ngStage');if(!st)return;
var h='<div id="ngSub">LIGHTS OUT - find the flashlight (one is fake)</div>';
h+='<div style="color:#5a5a6a;font-size:12px;margin:10px 0;letter-spacing:2px">...click the dark. something will click back.</div><div id="ngDarkField" style="position:relative;width:90%;height:280px;background:#000;border:1px solid #1a1a22;margin:0 auto;overflow:hidden">';
var spots=[[10,18],[30,60],[48,25],[66,68],[82,38],[22,42],[58,55],[78,15]];
var fi=Math.floor(Math.random()*spots.length);
var fk=fi;while(fk===fi)fk=Math.floor(Math.random()*spots.length);
for(var i=0;i<spots.length;i++){
var tag=i===fi?'flash':(i===fk?'fake':'void');
h+='<button data-dt="'+tag+'" style="position:absolute;left:'+spots[i][0]+'%;top:'+spots[i][1]+'%;width:34px;height:34px;background:transparent;border:1px solid #22222c;color:#2a2a35;font:14px Consolas,monospace;cursor:pointer;border-radius:50%">?</button>';
}
h+='</div>';
st.innerHTML=h;
var btns=st.querySelectorAll('button');
for(var b=0;b<btns.length;b++){(function(btn){
btn.onclick=function(){
if(!ngActive||ngChDone||ngTalking())return;
if(btn.getAttribute('data-dt')==='flash'){
ngDark26Flash=true;try{ngSfx('coin')}catch(e){}
ngSaySeq([
['core','LIGHT. OH THANK THE VOID. LIGHT.'],
['obj','the flashlight. 60 watts of pure courage. the dark RECEEDS. (it is still there. it is always there.)'],
['core','okay. okay. i can do this. what is next.'],
['obj','next: the dark fights back. three rounds. it will offer BAIT. take the small button. HOLD STILL.']
],function(){if(ngActive)ngDark26Scare()});
}else if(btn.getAttribute('data-dt')==='fake'){
ngSaySeq([
['obj','a FAKE flashlight. plastic. the dark LAUGHS. rude dark.'],
['core','noted: the dark has PROPS. budget: unknown. fear: increasing.']
]);
}else{
if(!ngTalking()){ngSay(ngDark26Whispers[ngDark26WhispI%ngDark26Whispers.length]);ngDark26WhispI++}
}
};
})(btns[b])}
}
function ngScareFx(){
try{var f=document.createElement('div');f.style.cssText='position:fixed;inset:0;background:#fff;z-index:99999;pointer-events:none;opacity:0.9';document.body.appendChild(f);setTimeout(function(){if(f.parentNode)f.parentNode.removeChild(f)},130)}catch(e){}
try{ngSfx('buzz')}catch(e){}
}
function ngDark26Scare(){
if(!ngActive||ngChDone)return;
var st=document.getElementById('ngStage');if(!st)return;
var need=ngHard?5:3;
if(ngDark26Scares>=need){ngSaySeq([
['core','three rounds. we HELD STILL. i have never been so still. statuesque.'],
['obj','the dark respects stillness. the dark blinks first. the dark has no eyes. it blinked anyway.'],
['core','now what. please say exit. say EXIT.'],
['obj','five doors. one exit. the flashlight is DYING. pick fast.']
],function(){if(ngActive)ngDark26Doors()});return}
var bait=ngDark26Baits[(ngDark26Scares+Math.floor(Math.random()*3))%ngDark26Baits.length];
var bait2=ngDark26Baits[(ngDark26Scares+2+Math.floor(Math.random()*3))%ngDark26Baits.length];
if(bait2===bait)bait2=ngDark26Baits[(ngDark26Baits.indexOf(bait)+2)%ngDark26Baits.length];
var off=Math.floor(Math.random()*220)-110;
var h='<div id="ngSub">LIGHTS OUT - hold still ('+ngDark26Scares+'/'+(ngHard?5:3)+')</div>';
h+='<div style="margin:16px 0"><button class="ngtopt" id="ngBait" style="font-size:18px;padding:14px 30px">'+bait+'</button>'+(ngDark26Scares>=1?' <button class="ngtopt" id="ngBait2" style="font-size:15px;padding:11px 22px">'+bait2+'</button>':'')+'</div>';
h+='<div><button class="ngtopt" id="ngCalm" style="font-size:11px;padding:6px 12px;opacity:0.7;position:relative;left:'+off+'px">hold still</button></div>';
st.innerHTML=h;
var baitGo=function(){
if(!ngActive||ngChDone||ngTalking())return;
ngScareFx();
ngSaySeq([['obj',ngDark26Mocks[ngDark26MockI%ngDark26Mocks.length]]],function(){if(ngActive){ngDark26MockI++;ngDark26Scare()}});
};
var bb=document.getElementById('ngBait');
if(bb)bb.onclick=baitGo;
var bb2=document.getElementById('ngBait2');
if(bb2)bb2.onclick=baitGo;
var cb=document.getElementById('ngCalm');
if(cb)cb.onclick=function(){
if(!ngActive||ngChDone||ngTalking())return;
ngDark26Scares++;
try{ngSfx('coin')}catch(e){}
if(!ngTalking())ngSay(ngDark26Scares>=(ngHard?5:3)?'stillness: COMPLETE.':'stillness: '+ngDark26Scares+'/3. the dark is FURIOUS.');
ngAfterSpeech(function(){if(ngActive)ngDark26Scare()},700);
};
}
function ngDark26Doors(){
if(!ngActive||ngChDone)return;
var st=document.getElementById('ngStage');if(!st)return;
var names=['LEFT DOOR','MIDDLE DOOR','RIGHT DOOR (moist)','FOURTH DOOR (suspicious)','FIFTH DOOR (also moist)'];
var h='<div id="ngSub">LIGHTS OUT - pick a door (flashlight dying...)</div><div style="color:#8a5a3a;font-size:12px;margin:8px 0">...the flashlight flickers...</div><div>';
for(var i=0;i<5;i++){h+='<button class="ngtopt" data-di="'+i+'" style="margin:4px">'+names[i]+'</button>'}
h+='</div>';
st.innerHTML=h;
var btns=st.querySelectorAll('button');
for(var b=0;b<btns.length;b++){(function(btn){
btn.onclick=function(){
if(!ngActive||ngChDone||ngTalking())return;
var pick=parseInt(btn.getAttribute('data-di'),10);
if(pick===ngDark26Door){
try{ngSfx('door')}catch(e){}
ngSaySeq([
['core','LIGHT. REAL LIGHT. HALLWAY LIGHT. I HAVE NEVER LOVED A HALLWAY.'],
['obj','the exit. actual exit. dawn breaks. the dark files a complaint.'],
['jbo','I FOUGHT OFF SIX GHOSTS. WITH MY BARE HANDS. YOU ARE WELCOME.'],
['core','...you were hiding in the lobby.'],
['jbo','TACTICAL HIDING. WHILE FIGHTING. SIX GHOSTS.'],
['obj','sure, jbo. six ghosts. polish your medal. (there is no medal.)']
],function(){if(ngActive)ngChapter26Done()});
}else{
var gags=['a broom closet. the broom judges. the door: closed.','a wall. just a wall. stared at. stared back. lost.','the landlord\u2019s mailbox. FULL. untouched. NOBODY touches it.','a stairwell. it goes UP. it goes DOWN. it goes... sideways. declined.','a mirror. the reflection waves FIRST. rude. door: closed.'];
ngSaySeq([['obj',gags[pick%gags.length]]],function(){if(ngActive)ngDark26Doors()});
}
};
})(btns[b])}
}
function ngChapter26Done(){
if(!ngActive||ngChDone)return;
if(ngTalking())return;
try{ngHurry()}catch(e){}
try{ngUnlock(27)}catch(e){}
ngChDone=true;
var st=document.getElementById('ngStage');if(!st)return;
st.innerHTML='<div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ OPEN ]</div></div><div id="ngSub">CHAPTER 27: OBJ V. EVERYBODY</div>';
ngSaySeq([
['obj','horror: survived. the dark sends its regards. (it does not. it is suing.)'],
['core','i am sleeping with the lights on for a month. the lights are ALSO scared.'],
['jbo','SIX GHOSTS. TELL THEM, OBJ.'],
['obj','six ghosts. sure. next: COURT. we are being SUED.'],
['obj','chapter 27: obj v. everybody. go on. bring a lawyer. (the lawyer is ME.)']
]);
var door=document.getElementById('ngDoor');
if(door)door.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngDim('','');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(27)},800);
};
}
var ngCourtIdx=0,ngCourtStrikes=0;
function ngCourtStrikeMax(){return ngHard?3:4}
function ngCourtStrike(lines){
ngCourtStrikes++;
var max=ngCourtStrikeMax();
if(ngCourtStrikes>=max){
ngSaySeq([
['land','STRIKE LIMIT. CONTEMPT. bailiff, hold him. (the bailiff is ME. holding.)'],
['obj','the holding cell is the LOBBY. the lobby has magazines. from 2003.'],
['jbo','I VISITED. I BROUGHT FIST CHOCOLATES. (confiscated.)'],
['land','claims RESTART. strikes RESET. the court is MERCIFUL. (the court bills.)']
],function(){if(!ngActive)return;ngCourtStrikes=0;ngCourtIdx=0;ngCourtClaim()});
}else{
lines=lines.slice();
lines.push(['land','that is strike '+ngCourtStrikes+' of '+max+'. the court is COUNTING. (the court counts everything.)']);
ngSaySeq(lines);
}
}
var ngCourtStmts=[
{bad:true,t:'EXHIBIT: MY FEELINGS. THEY ARE HURT. LOOK AT THEM.',ok:[['land','SUSTAINED. feelings are NOT exhibits. (mine are. overruled for ME.)'],['obj','the prosecution exhibits its feelings. noted. mocked.']]},
{bad:false,t:'THE PLAINTIFFS PAID FULL PRICE FOR THE GAME. ...THE GAME WAS FREE.',ok:[['obj','ALLOWED. the prosecution just ended its own case. incredible work.'],['jbo','...OBJECTION TO MYSELF.']]},
{bad:true,t:'I BRIBED THE JURY WITH FIST CHOCOLATES.',ok:[['land','SUSTAINED. bribery. the chocolates are CONFISCATED. (to my chambers.)'],['obj','the jury has been bribed AND un-bribed. net zero. moving on.']]},
{bad:true,t:'THE WITNESS IS A COWARD AND A... A...',ok:[['land','SUSTAINED. finish your insults, counselor. or do not start them.'],['jbo','...A NICE PERSON. I REST.']]},
{bad:false,t:'THE DEFENSE RESTS. ...WAIT. I AM THE PROSECUTION.',ok:[['obj','ALLOWED. the prosecution rests the DEFENSES case. i accept. we all accept.'],['land','noted. the record is CONFUSED. the record bills hourly.']]},
{bad:true,t:'I CALL A RECESS. FOR NAP PURPOSES.',ok:[['land','SUSTAINED. court cannot nap. (court naps LATER. alone.)'],['obj','recess DENIED. the prosecution will nap in PRISON. (there is no prison. there is a lobby.)']]},
{hard:true,bad:true,t:'THE JUDGE OWES ME MONEY. ...UNRELATED.',ok:[['land','SUSTAINED. AND FALSE. AND TRUE. stricken. FINED.'],['obj','the prosecution fines ITSELF. i am barely needed here.']]},
{hard:true,bad:true,t:'I OBJECT TO THE CONCEPT OF LUNCH.',ok:[['land','SUSTAINED. lunch is SACRED. do not speak of lunch.'],['jbo','...I WITHDRAW LUNCH.']]}
];
var ngCourtActive=[];
var ngCourtExhibits=[
{id:'box',name:'EXHIBIT A: THE MISSING GAME (an empty box)',win:false,why:[['land','an empty box proves NOTHING. (it proves EVERYTHING. but not in COURT.)'],['obj','stricken. the box remains. the box is load-bearing.']]},
{id:'mem',name:'EXHIBIT B: THE PLAINTIFFS MEMORIES (also empty)',win:false,why:[['land','memories are HEARSAY. even empty ones. ESPECIALLY empty ones.'],['obj','the memories are thrown out. they land softly. they are empty.']]},
{id:'deg',name:'EXHIBIT C: JBOS LAW DEGREE (crayon)',win:true,why:[['obj','crayon. CRAYON. the degree is in CRAYON.'],['land','...the prosecution is DISBARRED. effective nap-time.']]}
];
function ngChapter27(st){
ngCourtIdx=0;ngCourtStrikes=0;
try{ngCourtActive=ngCourtStmts.filter(function(s){return !s.hard||ngHard})}catch(e){ngCourtActive=ngCourtStmts}
ngDim('court','the courtroom. wood. echoes. judgment.','linear-gradient(180deg,#14100a,#050505)');
ngSaySeq([
['land','ALL RISE. (sit. standing bills extra.) court is NOW IN SESSION.'],
['obj','the honorable landlord presiding. the landlord owns the courtroom. the landlord owns the GAVEL.'],
['land','the audience charges: EMOTIONAL DAMAGES. there was NO GAME. they played NOTHING. they are DEVASTATED.'],
['obj','i am the defendant. i am also the defense. the lawyer is ME. i passed the bar. (there is no bar. i limboed under it.)'],
['jbo','PROSECUTION HERE. I AM A REAL LAWYER. I HAVE A DEGREE. (he is holding it BACKWARDS.)'],
['land','prosecution: present your claims. defense: OBJECT to the bad ones. ALLOW the ones that help you. yes. some help you.'],
['obj','he is the worst lawyer alive. this is going to be FREE.'],
['jbo','I HEARD THAT. OBJECTION TO BEING HEARD.'],
['land','...OVERRULED. begin.']
],function(){if(ngActive)ngCourtClaim()});
}
function ngCourtClaim(){
if(!ngActive||ngChDone)return;
var st=document.getElementById('ngStage');if(!st)return;
var s=ngCourtActive[ngCourtIdx];
if(!s){ngCourtEvidence();return}
var h='<div id="ngSub">OBJ V. EVERYBODY - prosecution claim '+(ngCourtIdx+1)+'/'+ngCourtActive.length+' · strikes '+ngCourtStrikes+'/'+ngCourtStrikeMax()+(ngHard?' - HARD':'')+'</div>';
h+='<div style="color:#ffb08a;margin:14px 0;font-size:15px;letter-spacing:1px">JBO: '+s.t+'</div><div>';
h+='<button class="ngtopt" id="ngObject" style="margin:4px;font-size:16px;padding:10px 26px">OBJECT</button>';
h+='<button class="ngtopt" id="ngAllow" style="margin:4px;font-size:16px;padding:10px 26px">ALLOW</button></div>';
st.innerHTML=h;
var ob=document.getElementById('ngObject');
if(ob)ob.onclick=function(){
if(!ngActive||ngChDone||ngTalking())return;
if(s.bad){ngSaySeq(s.ok,function(){if(!ngActive)return;ngCourtIdx++;ngCourtClaim()})}
else{try{ngSfx('buzz')}catch(e){}ngCourtStrike([
['land','OVERRULED. that one HELPED you. take it back. FINED.'],
['obj','do not object to GIFTS, counselor-me. noted. fined. (we can afford it. we cannot.)']
])}
};
var al=document.getElementById('ngAllow');
if(al)al.onclick=function(){
if(!ngActive||ngChDone||ngTalking())return;
if(!s.bad){ngSaySeq(s.ok,function(){if(!ngActive)return;ngCourtIdx++;ngCourtClaim()})}
else{try{ngSfx('buzz')}catch(e){}ngCourtStrike([
['land','...you ALLOW that? FINE. stricken from the record. (it is NOT stricken. i am busy.)'],
['obj','that one HURT us. object to it. loudly. with FEELING. (feelings are not exhibits.)']
])}
};
}
function ngCourtEvidence(){
if(!ngActive||ngChDone)return;
var st=document.getElementById('ngStage');if(!st)return;
var h='<div id="ngSub">OBJ V. EVERYBODY - present ONE exhibit · strikes '+ngCourtStrikes+'/'+ngCourtStrikeMax()+'</div>';
h+='<div style="color:#e8e2d4;margin:10px 0;font-size:13px">the whole case comes down to this. choose the load-bearing one.</div><div>';
for(var i=0;i<ngCourtExhibits.length;i++){h+='<button class="ngtopt" data-ex="'+ngCourtExhibits[i].id+'" style="margin:4px">'+ngCourtExhibits[i].name+'</button>'}
h+='</div>';
st.innerHTML=h;
var btns=st.querySelectorAll('button');
for(var b=0;b<btns.length;b++){(function(btn){
btn.onclick=function(){
if(!ngActive||ngChDone||ngTalking())return;
var id=btn.getAttribute('data-ex');
var ex=null;for(var j=0;j<ngCourtExhibits.length;j++){if(ngCourtExhibits[j].id===id)ex=ngCourtExhibits[j]}
if(!ex)return;
if(ex.win){ngSaySeq(ex.why.concat([
['jbo','...I APPEAL.'],
['land','APPEAL DENIED. BAILIFF, REMOVE HIM. (the bailiff is ME. i am already here.)'],
['obj','the prosecution has been removed. by ITSELF. poetry.']
]),function(){if(ngActive)ngChapter27Done()})}
else{try{ngSfx('buzz')}catch(e){}ngCourtStrike(ex.why)}
};
})(btns[b])}
}
function ngChapter27Done(){
if(!ngActive||ngChDone)return;
if(ngTalking())return;
try{ngHurry()}catch(e){}
try{ngUnlock(28)}catch(e){}
ngChDone=true;
var st=document.getElementById('ngStage');if(!st)return;
st.innerHTML='<div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ OPEN ]</div></div><div id="ngSub">CHAPTER 28: STAR WAR (singular)</div>';
ngSaySeq([
['land','VERDICT: for the DEFENSE. the audience is billed for wasting courts time. court adjourns FOREVER. (until act 4.)'],
['jbo','THIS IS NOT OVER. I WILL BE BACK. WITH A REAL DEGREE. (in crayon. again.)'],
['obj','case closed. the gavel falls. the gavel is also billed.'],
['obj','next: space. the FINAL frontier. (it is not final. there are two chapters left.)'],
['obj','chapter 28: star war. singular. go on.']
]);
var door=document.getElementById('ngDoor');
if(door)door.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngDim('','');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(28)},800);
};
}
var ngPowIdx=0,ngPowVals=[0,0,0],ngPowReady=false;
var ngPowRounds=[
{power:10,mins:[4,3,1],rule:'everything at minimum or better.',check:function(v){return true},brief:[['jbo','SHIELDS AT MAX. ENGINES AT MAX. SNACKS AT MAX. MAX EVERYTHING.'],['obj','we have TEN power, jbo. TEN. the reactor is a AA battery.'],['land','toll nebula: every reroute BILLED. this briefing: BILLED.']]},
{power:12,mins:[5,4,2],rule:'shields must EXCEED engines. (jbo insisted. it is in writing.)',check:function(v){return v[0]>v[1]},brief:[['jbo','THE SUN IS TALKING SMACK, CAPTAIN. SHIELDS UP.'],['obj','the sun is a STAR, jbo. it cannot talk smack. (it just did. shields it is.)'],['land','parsec 2. billing continues. the meter runs DURING battles. especially during battles.']]},
{power:14,mins:[6,5,2],rule:'snacks EXACTLY 3. the crew is STRESSED.',check:function(v){return v[2]===3},brief:[['obj','morale is low. the crew demands EXACTLY 3 snacks. not 2. not 4. THREE.'],['jbo','I ATE ONE. FOR MORALE. (it did not help morale.)'],['obj','...recalculating. (the crew stares. the crew is SO stressed.)']]},
{hard:true,power:16,mins:[7,6,2],rule:'HARD: shields EXACTLY 7. engines minimum. snacks minimum.',check:function(v){return v[0]===7},brief:[['land','HARD MODE toll: DOUBLE. the nebula respects ambition.'],['jbo','SEVEN SHIELDS. A LUCKY NUMBER. I INVENTED LUCK.'],['obj','do not invent numbers, jbo. allocate them.']]}
];
var ngPowActive=[];
var ngPowRoasts=['the lights flicker. the crew boos. the crew is RIGHT to boo.','REROUTE DENIED. the reactor laughs. reactors should not laugh.','wrong math. jbo does the math LOUDER. still wrong.','the ship lists to the left. the left is load-bearing. try again.'];
var ngPowRoastI=0;
function ngChapter28(st){
ngPowIdx=0;
try{ngPowActive=ngPowRounds.filter(function(r){return !r.hard||ngHard})}catch(e){ngPowActive=ngPowRounds}
ngDim('space','deep space. no air. no noise. no refund.','linear-gradient(180deg,#05050f,#000000)');
ngSaySeq([
['obj','captains log. we are lost. the GPS says "lol."'],
['jbo','CAPTAIN. THREE HOSTILES OFF THE PORT BOW. ALSO THE SUN. THE SUN IS COMING.'],
['obj','the sun is always coming, jbo. that is its whole thing. battle stations. REROUTE POWER.'],
['land','HOLD. this is a TOLL nebula. every parsec: BILLED. every reroute: BILLED.'],
['obj','of COURSE the void has toll nebulas. FINE. bill the ship. the ship is broke. (we are the ship.)'],
['jbo','GIVE WEAPONS EVERYTHING. WEAPONS ARE SHIELDS THAT KILL.'],
['obj','three systems. shields. engines. snacks. one reactor. do the math. (jbo: do NOT do the math.)']
],function(){if(ngActive)ngPowBoard()});
}
function ngPowBoard(){
if(!ngActive||ngChDone)return;
var st=document.getElementById('ngStage');if(!st)return;
var R=ngPowActive[ngPowIdx];
if(!R){ngPowFinal();return}
ngPowVals=[0,0,0];
ngPowReady=false;
var names=['SHIELDS (min '+R.mins[0]+')','ENGINES (min '+R.mins[1]+')','SNACKS (min '+R.mins[2]+')'];
var h='<div id="ngSub">STAR WAR - power triage '+(ngPowIdx+1)+'/'+ngPowActive.length+' (reactor: '+R.power+')</div>';
h+='<div style="color:#e8e2d4;margin:8px 0;font-size:13px">rule: '+R.rule+'</div><div id="ngPowRows"></div>';
h+='<div style="color:#8ab0d8;margin:8px 0;font-size:14px">unspent: <span id="ngPowLeft"></span></div>';
h+='<div><button class="ngtopt" id="ngReroute" style="font-size:16px;padding:10px 26px">REROUTE</button></div>';
st.innerHTML=h;
var rows=document.getElementById('ngPowRows');
var valSpans=[];
function refresh(){
var used=ngPowVals[0]+ngPowVals[1]+ngPowVals[2];
try{document.getElementById('ngPowLeft').textContent=String(R.power-used)}catch(e){}
for(var vi=0;vi<valSpans.length;vi++){try{valSpans[vi].textContent=' '+ngPowVals[vi]+' '}catch(e){}}
}
for(var i=0;i<3;i++){
var row=document.createElement('div');
row.style.cssText='color:#e8e2d4;margin:6px 0;font-size:15px';
row.textContent=names[i]+': ';
var minus=document.createElement('button');minus.className='ngtopt';minus.textContent=' - ';minus.style.margin='2px';
var val=document.createElement('span');val.textContent=' '+ngPowVals[i]+' ';valSpans.push(val);
var plus=document.createElement('button');plus.className='ngtopt';plus.textContent=' + ';plus.style.margin='2px';
(function(idx,m,p){
m.onclick=function(){if(!ngActive||ngChDone||ngTalking())return;ngPowVals[idx]=Math.max(0,ngPowVals[idx]-1);val.textContent=' '+ngPowVals[idx]+' ';refresh()};
p.onclick=function(){if(!ngActive||ngChDone||ngTalking())return;ngPowVals[idx]=Math.min(R.power,ngPowVals[idx]+1);val.textContent=' '+ngPowVals[idx]+' ';refresh()};
})(i,minus,plus);
row.appendChild(minus);row.appendChild(val);row.appendChild(plus);
rows.appendChild(row);
}
refresh();
ngSaySeq(R.brief,function(){
if(!ngActive)return;
ngPowReady=true;
var used=ngPowVals[0]+ngPowVals[1]+ngPowVals[2];
var rr=document.getElementById('ngReroute');
if(rr)rr.onclick=function(){
if(!ngActive||ngChDone||ngTalking())return;
var v=ngPowVals;
var ok=true;
if(v[0]+v[1]+v[2]>R.power)ok=false;
for(var k=0;k<3;k++){if(v[k]<R.mins[k])ok=false}
if(ok&&!R.check(v))ok=false;
if(ok){
try{ngSfx('coin')}catch(e){}
ngPowIdx++;ngPowBoard();
}else{
try{ngSfx('buzz')}catch(e){}
if(!ngTalking()){ngSay(ngPowRoasts[ngPowRoastI%ngPowRoasts.length]);ngPowRoastI++}
}
};
});
}
function ngPowFinal(){
if(!ngActive||ngChDone)return;
var st=document.getElementById('ngStage');if(!st)return;
st.innerHTML='<div id="ngSub">STAR WAR - fire the cannon</div><div style="color:#e8e2d4;margin:12px 0">all power routed. the cannon is HOT. (it is a strongly-worded letter.)</div><div><button class="ngtopt" id="ngFire" style="font-size:18px;padding:12px 30px">FIRE</button></div>';
var f0=document.getElementById('ngFire');
if(f0)f0.onclick=function(){
if(!ngActive||ngChDone||ngTalking())return;
try{ngSfx('win')}catch(e){}
ngChapter28Done();
};
ngSaySeq([
['jbo','CANNON HOT. TARGET: THE SUN. (do not fire at the sun, jbo.)'],
['obj','firing the letter. "dear hostiles: no. love, us." ...direct hit.'],
['land','battle: CONCLUDED. total bill: YES. the nebula thanks you. (it does not.)']
],function(){if(ngActive){try{var fz=document.getElementById('ngFire');if(fz){fz.style.boxShadow='0 0 18px rgba(255,216,58,0.8)'}}catch(e){}}});
}
function ngChapter28Done(){
if(!ngActive||ngChDone)return;
if(ngTalking())return;
try{ngHurry()}catch(e){}
try{ngUnlock(29)}catch(e){}
ngChDone=true;
var st=document.getElementById('ngStage');if(!st)return;
st.innerHTML='<div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ OPEN ]</div></div><div id="ngSub">CHAPTER 29: THE RENT IS DUE</div>';
ngSaySeq([
['obj','star war: won. the sun retreats. (it sets. same thing.)'],
['jbo','I DEFEATED THE SUN. TELL THE SUN I SAID THAT.'],
['land','the ship may go. the BILL stays. bills do not need ships.'],
['obj','next: the office. the forms. the final invoice.'],
['obj','chapter 29: the rent is due. go on. bring exact change. (there is no exact change.)']
]);
var door=document.getElementById('ngDoor');
if(door)door.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngDim('','');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(29)},800);
};
}
var ngNoliHeard=false,ngNoliAudio=null,ngNoliOver=false,ngNoliMusicWas=false;
function ngChapter29(st){
ngNoliHeard=false;ngNoliOver=false;ngNoliAudio=null;ngNoliMusicWas=false;
ngDim('office','the office. fluorescent. eternal.','linear-gradient(180deg,#101012,#050505)');
ngSaySeq([
['land','FINAL INVOICE. every dimension. itemized. the recap: 400. the noir: 900 plus trenchcoat rental.'],
['jbo','I DID NOT ORDER THE NEBULA.'],
['land','the nebula ordered ITSELF. you DROVE through it. tolls apply to drivers.'],
['core','line 12: "void, assorted." what does that MEAN.'],
['land','it means: PAY.'],
['obj','...how much. total.'],
['land','more than you have. EXACTLY more than you have. funny how that works. (it is not funny. it is calculated.)'],
['jbo','THEN WE DO NOT PAY. I DECLARE... BANKRUPTCY. (he does not know what that is.)'],
['core','if we cannot pay, he EVICTS the non-game. no more dimensions. no more... us.'],
['obj','...evict us. right. ...give us a minute.'],
['obj','you know what. maybe he should.'],
['jbo','OBJ?'],
['obj','ten chapters. ten dimensions. all rented. nothing OWNED. not one thing that is OURS.'],
['core','obj. hey. talk to us. what is this.'],
['land','is it doing a BIT. bits are billable.'],
['obj','.....']
],function(){if(ngActive)ngNoliReact()});
}
function ngNoliReact(){
ngSaySeq([
['jbo','...obj?'],
['core','obj. hey. talk to us.']
],function(){if(ngActive)ngNoliPerform()});
}
function ngNoliPerform(){
if(!ngActive||ngChDone||ngNoliOver)return;
var st=document.getElementById('ngStage');if(!st)return;
st.innerHTML=(ngHard?'':'<div><button class="ngtopt" id="ngNoliSkipB" style="font-size:11px;opacity:0.7">skip (obj will remember this)</button></div>');
try{if(typeof ngMusic!=='undefined'&&ngMusic&&!ngMusic.paused){ngNoliMusicWas=true;ngMusic.pause()}}catch(e){}
try{ngShush('jbo');ngShush('core');ngShush('land')}catch(e){}
try{var ot=document.getElementById('ngObjText');if(ot)ot.textContent=''}catch(e){}
try{noliGray(true)}catch(e){}
var sk=document.getElementById('ngNoliSkipB');
if(sk)sk.onclick=function(){ngNoliSkip()};
setTimeout(function(){
if(ngNoliOver||!ngActive||ngChDone)return;
try{
ngNoliAudio=new Audio('noli.webm');
var au=ngNoliAudio;
au.onended=function(){ngNoliFinish()};
try{au.play().catch(function(){})}catch(e){}
try{noliStart(st,au)}catch(e){}
}catch(e){}
},1400);
}
function ngNoliStopAll(){
try{if(ngNoliAudio){ngNoliAudio.pause()}ngNoliAudio=null}catch(e){}
try{noliStop()}catch(e){}
try{noliGray(false)}catch(e){}
try{if(ngNoliMusicWas&&typeof ngMusic!=='undefined'&&ngMusic){ngMusic.play().catch(function(){})}ngNoliMusicWas=false}catch(e){}
}
function ngNoliFinish(){
if(ngNoliOver||!ngActive||ngChDone)return;
ngNoliOver=true;
ngNoliStopAll();
ngNoliHeard=true;
try{localStorage.setItem('cube_noli_full','1')}catch(e){}
try{if(typeof ach==='function')ach('noli_full')}catch(e){}
ngSaySeq([
['obj','thanks.'],
['jbo','...OBJ. THAT WAS. WOW.'],
['core','...come here. (hug. the hug is load-bearing.)'],
['obj','heh. do not make it weird. (it is already weird. good weird.)']
],function(){if(ngActive)ngChapter29Done()});
}
function ngNoliSkip(){
if(ngNoliOver||!ngActive||ngChDone)return;
ngNoliOver=true;
ngNoliStopAll();
ngSaySeq([
['obj','...oh. okay.'],
['jbo','...ANYWAY. RENT.'],
['land','the bill STANDS. pay up. no song buys THIS much. (it almost did.)']
],function(){if(ngActive)ngChapter29Done()});
}
function ngChapter29Done(){
if(!ngActive||ngChDone)return;
if(ngTalking())return;
try{ngHurry()}catch(e){}
try{ngUnlock(30)}catch(e){}
ngChDone=true;
var st=document.getElementById('ngStage');if(!st)return;
st.innerHTML='<div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ OPEN ]</div></div><div id="ngSub">CHAPTER 30: THERE WAS NEVER A CUBE</div>';
if(ngNoliHeard){ngSaySeq([
['land','...adequate. RENT: FORGIVEN. the invoice: SHREDDED. this NEVER happened.'],
['obj','heh. the landlord cried. (he did not cry. he LEAKED.)'],
['core','ONE chapter left. all of them. at once.'],
['obj','next: everything. everywhere. one stage.'],
['obj','chapter 30: there was never a cube. go on.']
])}else{ngSaySeq([
['land','no performance. no forgiveness. the bill DOUBLES. it is tradition.'],
['obj','...fair. (it is not fair.)'],
['core','ONE chapter left. we finish it. then we come BACK for the song. (replay. DOORS. you know.)'],
['obj','chapter 30: there was never a cube. go on.']
])}
var door=document.getElementById('ngDoor');
if(door)door.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngDim('','');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(30)},800);
};
}
var ngFinDoor=1;
function ngChapter30(st){
ngFinDoor=Math.floor(Math.random()*3);
ngDim('collapse','everywhere. all at once.','linear-gradient(180deg,#0d0d14,#030303)');
ngSaySeq([
['obj','...everybody. look up.'],
['jbo','THE SKY IS CRACKING. I CALLED IT. I CALL EVERYTHING.'],
['core','all nine dimensions. collapsing. into ONE stage. this is either the finale or a bug.'],
['obj','finale. (probably.) everybody. in. here.'],
['land','HOLD. the finale is a TENTH dimension. TENTH. billed. obviously.'],
['obj','landlord. you LIVE here now. (chapter 21. precedent.) that makes YOU a tenant.'],
['land','...i am a tenant. ...i owe MYSELF rent. ...PAID. (he pays himself. he looks ill.)'],
['core','the exits are here. all of them. every exit we dated, baked, lost, found.'],
['jbo','I DATED ONE. IT WENT POORLY. I HAVE GROWN. (he has not grown.)'],
['obj','tenants. exits. audience. (yes. YOU. come closer.)'],
['core','one stage. one choice. three doors.'],
['land','two of them are load-bearing walls. the third is... also a wall. (pick anyway.)'],
['jbo','I PICK ALL THREE. AT ONCE. WITH MY FACE.'],
['obj','pick ONE. the real one. (one is real this time. maybe.)']
],function(){if(ngActive)ngFinDoors()});
}
function ngFinDoors(){
if(!ngActive||ngChDone)return;
var st=document.getElementById('ngStage');if(!st)return;
var names=['LEFT DOOR (definitely the end)','MIDDLE DOOR (also the end)','RIGHT DOOR (moist. eternal.)'];
var h='<div id="ngSub">THERE WAS NEVER A CUBE - pick the end</div><div>';
for(var i=0;i<3;i++){h+='<button class="ngtopt" data-di="'+i+'" style="margin:4px">'+names[i]+'</button>'}
h+='</div>';
st.innerHTML=h;
var btns=st.querySelectorAll('button');
for(var b=0;b<btns.length;b++){(function(btn){
btn.onclick=function(){
if(!ngActive||ngChDone||ngTalking())return;
var pick=parseInt(btn.getAttribute('data-di'),10);
if(pick===ngFinDoor){
try{ngSfx('door')}catch(e){}
ngSaySeq([
['obj','...the door OPENS.'],
['core','light. hallway. the smell of... nothing. clean nothing.'],
['jbo','I AM NOT CRYING. THE FINALE IS CRYING.'],
['land','...no charge. (he says nothing else. he just... nods.)'],
['obj','credits. THREE. act 3 this time. official. FINAL. (mostly.)']
],function(){if(ngActive)ngChapterCredits3()});
}else{
var gags=['a wall. the wall from chapter 26 sends its regards.','act 4. it is EMPTY. nothing is built yet. the void apologizes.','a door that opens to THIS room. from the other side. do not think about it.'];
ngSaySeq([['obj',gags[pick%gags.length]]],function(){if(ngActive)ngFinDoors()});
}
};
})(btns[b])}
}
var ngCred3Held=null,ngCred3Edits=0,ngCred3Iv=null;
var ngCredits3=[
{role:'DIRECTED BY',names:['obj']},
{role:'PREVIOUSLY ON',names:['the void and the restless','dun dun']},
{role:'TRENCHCOATS BY',names:['the bellhop (fired)','the widow (window)']},
{role:'CATERING',names:['the waiter (lovebirds)','fist chocolates']},
{role:'BITS BY',names:['gold (many)','brown (lawsuit)']},
{role:'LIGHTING',names:['the flashlight (60 watts)','the dark (unpaid)']},
{role:'LEGAL',names:['crayon degree','the lobby (holding cell)']},
{role:'TOLL NEBULA',names:['the meter','yes (the total bill)']},
{role:'MUSIC',names:['vestige (looped)','[[LUCA]] (do NOT touch)','artistic swimming (an hour)','lordverity (cover)']},
{role:'RENT COLLECTED BY',names:['the landlord','his son (the ledger)']},
{role:'BLAME',names:['act 4','you (again)']}
];
var ngCred3SwapLines=['swapped. the credits wobble. the void pretends not to notice.','again. the union has been notified. (there is no union.)','the credits are now 40 percent wrong. perfect.'];
function ngCred3Find(name){for(var r=0;r<ngCredits3.length;r++){for(var n=0;n<ngCredits3[r].names.length;n++){if(ngCredits3[r].names[n]===name)return{r:r,n:n}}}return null}
function ngCred3RoleFirst(role){for(var r=0;r<ngCredits3.length;r++){if(ngCredits3[r].role===role)return ngCredits3[r].names[0]||''}return ''}
function ngChapterCredits3(){
if(!ngActive||ngChDone)return;
ngCred3Held=null;ngCred3Edits=0;
if(ngCred3Iv){try{clearInterval(ngCred3Iv)}catch(e){}ngCred3Iv=null}
ngSaySeq([
['obj','touch them. swap them. ruin them. click two names to swap them.'],
['core','[[LUCA]] made the song. hands OFF. that title does not move.'],
['jbo','I WILL TOUCH EVERYTHING ELSE. WITH BOTH HANDS.']
],function(){
if(!ngActive)return;
ngCred3Render();
ngCred3Apply();
if(ngCred3Iv){try{clearInterval(ngCred3Iv)}catch(e){}}
ngCred3Iv=setInterval(function(){
try{
if(!ngActive||ngTalking())return;
var l=document.getElementById('ngCredList');if(!l)return;
l.scrollTop+=1;
if(l.scrollTop+l.clientHeight>=l.scrollHeight-2)l.scrollTop=0;
}catch(e){}
},120);
});
}
function ngCred3Render(){
try{
var st=document.getElementById('ngStage');if(!st)return;
var l0=document.getElementById('ngCredList');var sc=l0?l0.scrollTop:0;
var h='<div id="ngSub">CREDITS 3. do not touch. (touch.)</div><div id="ngCredList">';
for(var r=0;r<ngCredits3.length;r++){
h+='<div class="ngCredRole">'+ngCredits3[r].role+'</div>';
for(var n=0;n<ngCredits3[r].names.length;n++){
var nm=ngCredits3[r].names[n];
h+='<div class="ngCredName'+(ngCred3Held===nm?' held':'')+'" data-nm="'+nm+'">'+nm+'</div>';
}
}
h+='</div><div style="margin-top:12px"><button class="ngtopt" id="ngCred3DoneB" style="width:54%;letter-spacing:2px">I HAVE SEEN ENOUGH (again)</button></div>';
st.innerHTML=h;
var l1=document.getElementById('ngCredList');if(l1)l1.scrollTop=sc;
var els=document.querySelectorAll?document.querySelectorAll('.ngCredName'):[];
for(var i=0;i<els.length;i++){
(function(el){
var nm=el.getAttribute?el.getAttribute('data-nm'):null;
if(!nm&&el.dataset)nm=el.dataset.nm;
el.onclick=function(){ngCred3Click(nm||el.textContent)};
})(els[i]);
}
var db=document.getElementById('ngCred3DoneB');
if(db)db.onclick=function(){if(!ngActive||ngChDone)return;if(ngTalking())return;if(ngCred3Edits<5){ngSay('not yet. ruin at least FIVE things first. (currently ruined: '+ngCred3Edits+'.)');return}try{ngHurry()}catch(e){}ngChapter30Done()};
}catch(e){}
}
function ngCred3Apply(){
try{
var mus=false;
for(var r=0;r<ngCredits3.length;r++){if(ngCredits3[r].role==='MUSIC'&&(ngCredits3[r].names[0]==='[[LUCA]] (do NOT touch)'||ngCredits3[r].names[1]==='[[LUCA]] (do NOT touch)'))mus=true}
if(!mus){var ov=document.getElementById('ngOverlay');if(ov)ov.style.background='linear-gradient(180deg,#1a0d0d,#050505)'}
}catch(e){}
}
function ngCred3Click(name){
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(!name)return;
if(/LUCA/.test(name)){ngSay('no. NOT that one. that one STAYS. hands off [[LUCA]].');return}
if(ngCred3Held&&/LUCA/.test(ngCred3Held)){ngCred3Held=null;ngCred3Render();ngSay('unheld. [[LUCA]] cannot be held. [[LUCA]] holds YOU.');return}
if(!ngCred3Held){ngCred3Held=name;ngCred3Render();return}
if(ngCred3Held===name){ngCred3Held=null;ngCred3Render();return}
var a=ngCred3Find(ngCred3Held),b=ngCred3Find(name);
if(!a||!b){ngCred3Held=null;ngCred3Render();return}
var tmp=ngCredits3[a.r].names[a.n];ngCredits3[a.r].names[a.n]=ngCredits3[b.r].names[b.n];ngCredits3[b.r].names[b.n]=tmp;
ngCred3Held=null;
if(ngCred3RoleFirst('DIRECTED BY')!=='obj'){
var tmp2=ngCredits3[a.r].names[a.n];ngCredits3[a.r].names[a.n]=ngCredits3[b.r].names[b.n];ngCredits3[b.r].names[b.n]=tmp2;
ngCred3Render();
ngSay('DIRECTED BY ME. still.');
return;
}
ngCred3Edits++;
try{localStorage.setItem('cube_cred3_edits',String((parseInt(localStorage.getItem('cube_cred3_edits')||'0',10)+1)))}catch(e){}
ngCred3Render();
if(ngCred3Edits<=3)ngSay(ngCred3SwapLines[ngCred3Edits-1]);
ngCred3Apply();
}
function ngChapter30Done(){
if(!ngActive||ngChDone)return;
if(ngTalking())return;
try{ngHurry()}catch(e){}
if(ngCred3Iv){try{clearInterval(ngCred3Iv)}catch(e){}ngCred3Iv=null}
if(ngCredIv){try{clearInterval(ngCredIv)}catch(e){}ngCredIv=null}
ngChDone=true;
try{localStorage.setItem('cube_act3','1')}catch(e){}
try{if(typeof ngHard!=='undefined'&&ngHard){localStorage.setItem('cube_act3_hard','1')}}catch(e){}
try{var _rv='0';try{_rv=localStorage.getItem('cube_run_valid')||'0'}catch(e){};if(_rv==='1'){var _rms=ngRunMs();if(_rms>=0){localStorage.setItem('cube_run_ms',String(_rms))}if(ngMistN()===0){localStorage.setItem('cube_elegant','1')}if(ngMistN()===0&&typeof ngHard!=='undefined'&&ngHard){localStorage.setItem('cube_elegant_hard','1')}if(ngMistN()<=3&&typeof ngHard!=='undefined'&&ngHard){var _rmsB=ngRunMs();if(_rmsB>0&&_rmsB<=300000){localStorage.setItem('cube_brute','1')}}}else{try{localStorage.removeItem('cube_run_ms')}catch(e){}}}catch(e){}
try{if(typeof grantPts==='function'&&typeof ptMult==='function'){grantPts(50*ptMult());if(typeof skillPtsRefresh==='function')skillPtsRefresh()}}catch(e){}
try{if(typeof achScan==='function')achScan()}catch(e){}
try{ngUnlock(100)}catch(e){}
try{if(typeof ach==='function')ach('act3_done')}catch(e){}
var st=document.getElementById('ngStage');if(!st)return;
st.innerHTML='<div id="ngEndTitle">THERE WAS NEVER A CUBE</div><div id="ngSub">act 3: complete. the dream remains.</div><div id="ngDoor"><div class="ngDoorFrame"><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngDoorPanel"></div><div class="ngKnob"></div></div><div class="ngDoorLabel">[ DREAM ]</div></div>';
ngSaySeq([
['obj','...and that is act 3. ten dimensions. one stage. zero cubes.'],
['core','we owned NOTHING. and it was OURS. (do not think about it too hard.)'],
['jbo','I AM KEEPING THE TRENCHCOAT. AND THE SPOON. AND THE SUN.'],
['land','bills: settled. tenants: evicted. (lovingly.) ...come back anytime. (bring money.)'],
['obj','there was never a cube. there was only... us. (cheesy. load-bearing cheese.)']
]);
var door=document.getElementById('ngDoor');
if(door)door.onclick=function(){
if(ngTalking())return;
try{ngHurry()}catch(e){}
ngDim('','');
ngAfterSpeech(function(){if(ngActive)ngShowChapter(100)},800);
};
}
var ngMusic=null;
var ngMusicSrc=null;
var ngWasBgmPlaying=false;
function ngMusicStart(){ngMusicApply()}
function ngMusicStop(){try{if(ngMusic){ngMusic.pause();ngMusic.currentTime=0}}catch(e){}}
var ngTracks=[{f:'Wakeupstanley.mp3',n:'STANLEY'},{f:'bro is in a box lmao imagine.mp3',n:'BOX'},{f:'drone2lp.wav',n:'VOID'},{f:'the_furnace.mp3',n:'FURNACE'},{f:'friday.mp3',n:'FRIDAY'},{f:'friendly_faith_plate.mp3',n:'FAITH'},{f:'little_cat_feet.mp3',n:'CAT'},{f:'moon_rot_1857.mp3',n:'MOON'},{f:'oneshot_trap.mp4',n:'ONESHOT'},{f:'sciences_downfall.webm',n:'downfall'},{f:'noli.webm',n:'NOLI'},{f:'lordverity.webm',n:'VERITY'},{f:'vestige.mp3',n:'VESTIGE'},{f:'artisticswimming.webm',n:'SWIM'},{f:'coffee.mp3',n:'COFFEE'}];
var ngMusicMode=0;
function ngMusicLabel(){return ngMusicMode>=ngTracks.length?'MUSIC: OFF':'MUSIC: '+ngTracks[ngMusicMode].n}
function ngMusicApply(){
try{
var b=document.getElementById('ngMenuMusic');if(b)b.textContent=ngMusicLabel();
if(ngMusicMode>=ngTracks.length){if(ngMusic)ngMusic.pause();try{noliLyricStop()}catch(e){}
try{if(typeof ngNoliAudio!=='undefined'&&ngNoliAudio){ngNoliAudio.pause();ngNoliAudio=null}}catch(e){}
try{ngNoliOver=true}catch(e){}return}
var want=ngTracks[ngMusicMode].f;
try{if(want==='noli.webm')noliLyricStart(ngMusic);else noliLyricStop()}catch(e){}
if(!ngMusic||ngMusic.getAttribute('src')!==want){
if(ngMusic){try{ngMusic.pause()}catch(e){}}
ngMusic=new Audio(want);ngMusic.loop=true;ngMusic.volume=0.28;
try{
if(!audioCtx)initAudio();
if(audioCtx&&audioAnalyser){
if(ngMusicSrc){try{ngMusicSrc.disconnect()}catch(e){}}
ngMusicSrc=audioCtx.createMediaElementSource(ngMusic);
ngMusicSrc.connect(audioAnalyser);
}
}catch(e){}
}
ngMusic.currentTime=0;
var p=ngMusic.play();if(p&&p.catch)p.catch(function(){});
}catch(e){}
}
function ngMusicToggle(){ngMusicMode=(ngMusicMode+1)%(ngTracks.length+1);ngMusicApply()}
var ngHintBoo=['ugh. fine. hint: ','you NEED a hint? ','hint (booo). ','oh, NOW you ask me. '];
var ngHintBooCore=['of course. hint: ','a hint? for you? always. ','listen carefully. '];
var ngHintRefuseCore=['no more hints. i believe in you. (i do not.)','that was the last one. you have everything you need. (you do not.)'];
function ngHardToggle(){
if(!ngHardUnlocked())return;
ngHard=!ngHard;
try{ngSave({hard:ngHard})}catch(e){}
var b=document.getElementById('ngMenuHard');if(b)b.textContent='HARD MODE: '+(ngHard?'ON':'OFF');
ngSay(ngHard?'HARD MODE. eleven. everything is eleven now. good luck.':'...coward. smart.');
}
function ngMenuToggle(){
var m=document.getElementById('ngMenu');if(!m)return;
if(m.style.display==='block'){m.style.display='none';return}
m.style.display='block';
ngMenuRefresh();
}
function ngMenuRefresh(){
var p=document.getElementById('ngMenuProg');if(!p)return;
try{var mt=document.getElementById('ngMenuTitle');if(mt)mt.textContent=ngAct2Done()?'NON-GAME MENU (ACT 2: COMPLETE)':'NON-GAME MENU (there is none)'}catch(e){}
var t='';
var chPct=Math.round(Math.max(0,Math.min(ngCurCh,ngMaxChapter))/Math.max(1,ngMaxChapter)*100);
var chLine='chapter '+ngCurCh+'/'+ngMaxChapter+' \u00b7 '+chPct+'%';
try{if(typeof currentZone!=='undefined'&&currentZone)chLine+=' \u00b7 '+currentZone}catch(e){}
if(ngCurCh===0)t+='<br>objective: break the button';
else if(ngCurCh===1)t+='<br>objective: break everything<br>'+Math.max(0,9-ngDead)+' violations remain';
else if(ngCurCh===2)t+='<br>tutorial step '+Math.max(1,ngTutStep)+'/4';
else if(ngCurCh===3)t+='<br>objective: open the boxes. poke the core';
else if(ngCurCh===4)t+='<br>objective: touch every setting';
else if(ngCurCh===5)t+='<br>objective: fail NOOB_42';
else if(ngCurCh===6)t+='<br>objective: delete the towers (or watch)';
else if(ngCurCh===7){var rd=(ngRiftDone.f2p?1:0)+(ngRiftDone.checker?1:0)+(ngRiftDone.shapes?1:0)+(ngRiftDone.mimic?1:0);t+='<br>objective: close 4 rifts ('+rd+'/4)'}
else if(ngCurCh===8)t+='<br>objective: survive jbo';
else if(ngCurCh===9)t+='<br>objective: defeat obj';
else if(ngCurCh===11)t+='<br>objective: tune the signal (round '+Math.max(1,ngTuneRound)+'/3)';
else if(ngCurCh===12)t+='<br>objective: '+(ngWrongLock?'crack the lock (4 digits)':'find what is wrong ('+ngWrongCount()+'/'+ngWrongTotal()+')');
else if(ngCurCh===13)t+='<br>objective: fuse, bulb, exit ('+ngDarkCount()+'/3)';
else if(ngCurCh===14)t+='<br>objective: be the pattern (round '+Math.max(1,ngSeqRound)+'/4)';
else if(ngCurCh===15)t+='<br>objective: answer it ('+Math.min(ngTq+1,ngHard?7:6)+'/'+(ngHard?7:6)+')';
else if(ngCurCh===16)t+='<br>objective: tell them apart ('+Math.min(ngEchoI+1,ngEchoRounds.length)+'/'+ngEchoRounds.length+')<br>strikes: '+ngEchoStrikes+'/'+(ngHard?2:3);
else if(ngCurCh===17)t+='<br>objective: land it in the green ('+Math.min(ngKnockI+1,ngKnockTotal)+'/'+ngKnockTotal+')<br>misses: '+ngKnockFails;
else if(ngCurCh===18)t+='<br>objective: leave. the door is condemned.';
else if(ngCurCh===19){
var oj19='';
if(ngMornPh===1)oj19='orient: item '+Math.min(ngMornItem+1,ngMornBatch.length||3)+'/'+(ngMornBatch.length||3);
else if(ngMornPh===2)oj19=(ngMornMemo?'acknowledge the memo':'round '+(ngMornRound+1)+'/'+ngMornRoundsTotal()+' \u00b7 item '+Math.min(ngMornItem+1,ngMornBatch.length||1)+'/'+(ngMornBatch.length||1))+' \u00b7 strikes '+ngMornStrikes+'/'+ngMornStrikeMax();
else if(ngMornPh===3)oj19=ngMornLunchDone?'lunch eaten. back to the desk':'lunch. pick one. (restores strikes)';
else if(ngMornPh===4)oj19='rush '+(ngMornBatchI+1)+'/'+ngMornRushTotal()+' \u00b7 item '+Math.min(ngMornItem+1,ngMornBatch.length||1)+'/'+(ngMornBatch.length||1)+(ngMornTmrIv?' \u00b7 '+ngMornFmt(ngMornTmrLeft):'');
else oj19=ngMornReady?('override: item '+Math.min(ngMornItem+1,ngMornBatch.length||1)+'/'+(ngMornBatch.length||1)+' \u00b7 '+(ngMornTmrIv?ngMornFmt(ngMornTmrLeft):'0:00')):'shutdown gate: hit I\'M READY';
t+='<br>objective: '+oj19;
}
else if(ngCurCh===20)t+='<br>objective: watch the credits. maybe edit them.';
else if(ngCurCh===21)t+='<br>objective: survive the recap. the landlord is watching.';
else{t+='<br>objective: fix the credits';try{t+='<br>music: '+ngTracks[ngMusicDefault()].n+' · voice: '+ngVoiceSpeed()+'ms'}catch(e){}}
if(ngCurCh===-1){chPct=0;chLine='chapter -1/10 \u00b7 be quiet (impossible)';t='objective: be quiet (impossible)'}
var ngPid=ngCurrentPuzzle();
if(ngPid!=='done'&&ngPid!=='ch1done')t+='<br>hints: '+(2-(ngHintBudget[ngPid]||0))+'/2 left';
try{var mcEl=document.getElementById('ngMenuCh');if(mcEl)mcEl.textContent=chLine}catch(e){}
try{var mbfEl=document.getElementById('ngMenuBarFill');if(mbfEl)mbfEl.style.width=chPct+'%'}catch(e){}
p.innerHTML=String(t||'objective: \u2014').replace(/^<br>/,'');
var hb=document.getElementById('ngMenuHard');if(hb){hb.style.display=ngHardUnlocked()?'block':'none';hb.textContent='HARD MODE: '+(ngHard?'ON':'OFF')}
var spd=document.getElementById('ngMenuSpeed');if(spd)spd.textContent='SPEED: '+dialLabel();
}
var ngHintRefuse=['no. TWO hints. that was the deal.','hint budget spent. the void is not made of hints.','figure it out. use your eyes. use your clicks.'];
var ngHints={
ch0s0:['it is a button. buttons want to be clicked. this one especially.','click the DO NOT CLICK button. i cannot stop you. nobody can.'],
ch0s1:['it came back. things that come back want to be clicked again.','click SERIOUSLY. STOP. bonus points if you feel nothing.'],
ch0s2:['last warnings are decorative. proceed.','click THIS IS YOUR LAST WARNING. then click whatever comes next.'],
ch0s3:['the FINE button is not a trap. it is a door.','click FINE. CLICK THIS ONE. chapter 1 is behind it.'],
ch11tune:['the meter is honesty. the words are soup until clarity climbs. chase the meter, not the direction.','DOWN/UP move the band (smaller steps in hard mode). LOCK inside tolerance — it shrinks every round and rerolls every playthrough, so memorize nothing.'],
ch12wrong:['one of these things is not like the others. six of them, actually. (eight if you are brave.)','read everything. trust nothing. especially the clock. the clock is lying about what time it is.'],
ch12code:['the lock wants 4 digits. something in this room knows the real time.','the fake clock lied (+5h). YOUR clock does not lie. HHMM, 24-hour, right now.'],
ch13dark:['the light follows your cursor. sweep slowly. things move when you grab their friends.','fuse, then bulb, then exit. the grue is not a step. the grue is a mistake. (hard: smaller light, things move when you blink.)'],
ch14seq:['watch the pattern. then be the pattern. the buttons do not lie. your memory does.','wrong means watch again. there is no penalty except my patience. (it is infinite. unfortunately for you.)'],
ch15ask:['it reads your save. so read your save: visits, finale, absence. (and obj\u2019s heart. it is the void.)','the last question is rigged. answer with your heart. (it will mock your heart.)'],
ch16echo:['one of them is mine. the other one wishes it was mine.','forgeries flatter. originals dismiss. pick the dismissive one.'],
dream:['loops reset. the phone does not.','grab what should not be here. talk back.'],
ch17knock:['the needle does not care what jbo says. watch the green, press LOCK when they overlap.','the timer only starts after jbo finishes yelling his first lie. misses just replay the round. (hard: faster needle, tighter green, shorter timer.)'],
ch18r1:['read the receipt in front of you. the answer is printed on it, even on the loud fake ones.','3 strikes (2 hard) and the whole printer restarts. read before you click.'],
ch18asm:['each receipt carries a ch stamp. sort by the number, smallest first.','select the UNVERIFIED receipt (stamped ch??), then TRASH. lies cannot be filed. (hard: two of them lie.)'],
ch18dial:['the chips up top hold the numbers. the dials are just arithmetic on those chips.','STATIC + BLACKOUT, SIGNAL LOST - STATIC... the answers become the lock code. (hard: a fourth dial. it multiplies.)'],
ch18talk:['the wall shows the current rule: HONEST, OPPOSITE, or OBJECT. answer by the rule, not by the truth.','3 strikes (2 hard) resets all twelve questions. slow down. read the wall EVERY time.'],
ch18fin:['four checks, one timer each. remember what YOU set. the code is in your head now.','digits and swaps do not burn time. only the clock does. go.'],
ch19fil:['the poster is the law. rules read top to bottom, first match wins — VOID beats everything, always.','stamp, then sender, then number. anything unclaimed goes to ARCHIVE. that is the whole game.'],
ch19lunch:['the sandwich is not the puzzle.','pick anything. obj judges all of it either way. (lunch wipes your strikes clean.)'],
ch19rush:['same poster, new clock. obvious reads first: VOID and jbo are instant.','wrong bins cost strikes, strikes cost the batch, and restarting the batch does NOT stop the clock.'],
ch19shut:['five minutes, one song, eight items. you know the poster by now — just be right.','reload sends you back to the gate, not into the song. strikes reset there too.'],
ngp_err:['read the sign. then do what you always do.','destroy the ERROR 404 sign. twice — i repair it once.'],
ngp_ok:['it says OK. it is not OK. fix that.','kill the OK button, let me repair it, kill it again.'],
ngp_load:['99% is not 100%. help it never get there.','break the loading bar twice. the second break sticks.'],
ngp_img:['the image is already broken. finish the job.','click the broken image, twice, with feeling.'],
ngp_cur:['follow the arrow. trust the arrow.','click the arrow. it respawns once. click it again.'],
ngp_start:['it says START. start something.','the START GAME button dies like the rest. two clicks.'],
ngp_hint:['ironic. the hint sign needs no hints. destroy it.','two clicks on the hint sign. the irony is free.'],
ngp_ads:['free skins. sure. click it.','the ad dies in two clicks like everything else.'],
ngp_cookie:['cookies must be accepted. violently.','two clicks on the cookies. oatmeal raisin justice.'],
tut0:['the manual is long. the bottom is longer.','scroll the manual box all the way down, then click NEXT.'],
tut1:['gentle is a setting you do not have. keep clicking.','click the circle 3 times. step 1 gets waived.'],tut2:['rules are suggestions. squares are targets.','click the square. failing is the correct answer. ...waiting 12 seconds also works. coward\u2019s route.'],
tut3:['the bar wants to be full. feed it clicks.','click the bar 4 times. 25% per click.'],
tut4:['graduation requires collecting. collect destructively.','click the diploma. take it apart.'],
box1:['it is a box. boxes open. you know how.','click the BOX. there is a smaller box inside. obviously.'],
box2:['smaller box. same solution.','click the SMALLER BOX. smaller box, smaller secrets.'],
box3:['tiny box. final box. probably.','click the TINY BOX. the core is in there. act surprised.'],
box4:['smaller than small. you know the drill.','click the MICRO BOX. squint first.'],
box5:['the last box is also the first box. do not think about it.','click the QUANTUM BOX. act surprised. again.'],
core:['it is awake. poke it. gently is still not a thing you can do.','click the core 7 times. it will not sit still. hold on to something.'],
set1:['louder is funnier. push it to the max.','click the volume bar 4 times. enjoy 100% for half a second.'],
set2:['ULTRA is right there. take it.','click ULTRA twice. it will never stick. that is the point.'],
set3:['turn yourself off. see what happens.','flip the intruder toggle twice. it comes back on. then it is gone.'],
set4:['delete everything. what could go wrong.','click DELETE SAVE DATA once. it deletes itself instead. obviously.'],
set5:['maybe there is a patch that removes you.','click CHECK FOR UPDATES once. there is nothing new.'],
set6:['uninstall yourself. see how that goes.','click UNINSTALL INTRUDER. it fails. you are structural.'],
set7:['fresh starts fix everything. probably.','click RESET TO DEFAULTS. watch nothing important change.'],
set8:['say cheese. or else.','click SCREENSHOT twice. admire the ghosts.'],
set9:['it speaks void. allegedly.','click VOID SPEAK once. enjoy the fluency.'],
plat0:['start at the start. remove it.','click the leftmost platform. he has barely moved. probably.'],
plat1:['second platform. second victim.','platform 2 from the left. break it.'],
plat2:['the middle holds. barely.','middle platform. delete the middle.'],
plat3:['he likes the high one. end that.','click the high one. watch him weep.'],
plat4:['load-bearing. remove it.','second from the right. it is load-bearing. obviously.'],
plat5:['no finish line, no finishers.','the last platform. delete the concept of winning.'],
plat6:['the course turns around here.','first platform of the way back. break it.'],
plat7:['red on the return trip.','red platform, upper row. break it.'],
plat8:['going back the way you came.','upper row, middle. delete it.'],
plat9:['almost home. almost.','upper row. break it.'],
plat10:['red FOUR. a collection. a museum of red.','the fourth red platform. break it. he never stood a chance.'],
plat11:['where it started, but higher.','last platform. delete everything.'],
tw0:['the CANNON guards the early lane. remove it.','click the CANNON. unplace it.'],
tw1:['snipers see everything. blind it.','click the SNIPER. permanently.'],
tw2:['the grid fears you. prove it.','click TESLA. darken the grid.'],
r_f2p:['everything costs something. the free pull is free. ish.','pull 3 times, claim the pass, survive the ad. then leave.'],
r_checker:['one of these tiles is lying about being a floor.','click tiles. wrong ones become holes. miss 6 and i will glow the exit.'],
r_shapes:['they drift. you click. nature.','catch 3 runaway shapes. they dodge twice, then accept fate.'],
r_mimic:['five chests. two sparkle. ish.','open chests. grab 2 star shards. mind the teeth.'],
jb_cal:['the reactor wants attention. give it calibrations.','click CALIBRATE 3 times. jbo will supervise. loudly.'],
jb_cool:['too hot. do the cold things.','VENT + PURGE + RODS IN until the gauge reads under 50.'],
jb_hold:['hold the line. hold the temp.','rods stay OUT for 20 seconds. vent and purge to survive. do not hit 100.'],
boss:['click him. that is the whole strategy.','click obj. 350 hp. pace yourself. hydrate.'],
shield:['the shield has opinions. remove them.','break all 4 shield nodes. then resume.'],
echoes:['one of them is him. probably.','pop the fakes. the real one resumes the fight.'],
core:['it is healing him. rude.','click the core 5 times. it dodges. everything dodges.'],
choice:['mercy or menace. no pressure.','STOP ends it kindly. KEEP ends it... thoroughly.'],
cred:['credits are just names. names move.','click a name, then click another name. swap 5 times.'],
minus1:['touch nothing. he has not seen you. yet.','break something. get noticed. break 3 things total to get thrown out.']
};
function ngCurrentPuzzle(){
if(ngChDone)return 'done';
if(ngCurCh===0)return 'ch0s'+Math.min(ngClicks,3);
if(ngCurCh===1){
var order=['ngp_err','ngp_ok','ngp_load','ngp_img','ngp_cur','ngp_start','ngp_hint','ngp_ads','ngp_cookie'];
for(var i=0;i<order.length;i++){if(!ngDeadIds[order[i]])return order[i]}
return 'ch1done';
}
if(ngCurCh===3){
var bx=['box1','box2','box3','box4','box5'];
for(var bi=0;bi<bx.length;bi++){if(!ngCoreOpened[bx[bi]])return bx[bi]}
return 'core';
}
if(ngCurCh===4){
var so=['set1','set2','set3','set4','set5','set6','set7','set8','set9'];
for(var si=0;si<so.length;si++){if(!ngSetDone[so[si]])return so[si]}
return 'done';
}
if(ngCurCh===5){
var pl=['plat0','plat1','plat2','plat3','plat4','plat5','plat6','plat7','plat8','plat9','plat10','plat11'];
for(var pi=0;pi<pl.length;pi++){if(ngPlatAlive[pl[pi]])return pl[pi]}
return 'done';
}
if(ngCurCh===6){
var tw=[['tw0','t0'],['tw1','t1'],['tw2','t2']];
for(var ti2=0;ti2<tw.length;ti2++){if(ngTdTowers[tw[ti2][1]])return tw[ti2][0]}
return 'done';
}
if(ngCurCh===7){
var locIds={f2p:'r_f2p',checker:'r_checker',shapes:'r_shapes',mimic:'r_mimic'};
if(ngRiftLoc&&locIds[ngRiftLoc]&&!ngRiftDone[ngRiftLoc])return locIds[ngRiftLoc];
if(!ngRiftDone.f2p)return 'r_f2p';
if(!ngRiftDone.checker)return 'r_checker';
if(!ngRiftDone.shapes)return 'r_shapes';
if(!ngRiftDone.mimic)return 'r_mimic';
return 'done';
}
if(ngCurCh===8){
if(ngTbPhase==='calm')return 'jb_cal';
if(ngTbPhase==='spike')return 'jb_cool';
if(ngTbPhase==='over')return 'jb_hold';
return 'done';
}
if(ngCurCh===9){
if(ngBossPhase==='shield')return 'shield';
if(ngBossPhase==='echoes')return 'echoes';
if(ngBossPhase==='core')return 'core';
if(ngBossPhase==='choice'||ngBossPhase==='brat')return 'choice';
if(ngBossPhase==='end')return 'done';
return 'boss';
}
if(ngCurCh===11)return 'ch11tune';
if(ngCurCh===12){if(ngWrongLock)return 'ch12code';return 'ch12wrong'}
if(ngCurCh===13)return 'ch13dark';
if(ngCurCh===14)return 'ch14seq';
if(ngCurCh===15)return 'ch15ask';
if(ngCurCh===16)return 'ch16echo';
if(ngCurCh===17)return 'ch17knock';
if(ngCurCh===18)return 'ch18condemned';
if(ngCurCh===19){
if(ngMornPh===3)return 'ch19lunch';
if(ngMornPh===4)return 'ch19rush';
if(ngMornPh===5)return 'ch19shut';
return 'ch19fil';
}
if(ngCurCh===-1)return 'minus1';
if(ngCurCh===10)return 'cred';
if(ngCurCh===20)return 'cred';
if(ngCurCh===100)return 'dream';
if(ngCurCh===2&&ngManual<3)return 'tut0';
return 'tut'+Math.max(1,ngTutStep);
}
function ngHint(){
var m=document.getElementById('ngMenu');if(m)m.style.display='none';
var pid=ngCurrentPuzzle();
if(pid==='done'&&ngCurCh===6&&!ngChDone){ngSay('nothing left to break. enjoy the show.');return}
if(pid==='done'||pid==='ch1done'){ngSay('there is nothing left. admire your work.');return}
var used=ngHintBudget[pid]||0;
var coreMode=(pid.indexOf('ch14')===0);
if(used>=2){if(coreMode)ngCore(ngHintRefuseCore[Math.floor(Math.random()*ngHintRefuseCore.length)]);else ngSay(ngHintRefuse[Math.floor(Math.random()*ngHintRefuse.length)]);return}
ngHintBudget[pid]=used+1;
var pair=ngHints[pid]||['click it.','click it harder.'];
if(coreMode){var boo2=ngHintBooCore[Math.floor(Math.random()*ngHintBooCore.length)];ngCore(boo2+pair[used]);return}
var boo=ngHintBoo[Math.floor(Math.random()*ngHintBoo.length)];
ngSay(boo+pair[used]);
}
function ngEnter(){
if(ngActive)return;
var fl=document.createElement('div');fl.id='ngFlash';document.body.appendChild(fl);
void fl.offsetWidth;fl.classList.add('go');
setTimeout(function(){
if(fl.parentNode)fl.parentNode.removeChild(fl);
var ov=document.createElement('div');ov.id='ngOverlay';
ov.innerHTML='<div id="ngObj"><span class="who">obj: </span><span id="ngObjText"></span></div>'+
'<div id="ngJbo"><span class="who">jbo: </span><span id="ngJboText"></span></div>'+
'<div id="ngCore"><span class="who">core: </span><span id="ngCoreText"></span></div>'+
'<div id="ngLandlord" style="display:none"><span class="who" style="color:#d8a940">landlord: </span><span id="ngLandlordText"></span></div>'+
'<div id="ngStage"></div>'+
'<div id="ngMenuBtn">‡</div>'+
'<div id="ngMenu"><div id="ngMenuTitle">NON-GAME MENU (there is none)</div><div id="ngMenuCh"></div><div id="ngMenuBar"><div id="ngMenuBarFill"></div></div><div id="ngMenuProg"></div><div class="ngMenuGrid"><button id="ngMenuHint">HINT</button><button id="ngMenuMusic">MUSIC: STANLEY</button><button id="ngMenuSpeed">SPEED: 1x</button><button id="ngMenuSpeedrun">SPEEDRUN: LOCKED</button><button id="ngMenuChapters">DOORS ▸</button><button id="ngMenuHard" style="display:none">HARD MODE: OFF</button><button id="ngMenuLeave">LEAVE THE NON-GAME</button></div></div>'+'<button id="ngSkipBtn" class="ngtopt" style="display:none;position:fixed;bottom:16px;right:16px;z-index:90010;letter-spacing:2px">SKIP ▸▸</button>';
document.body.appendChild(ov);
ngStashUI();
try{document.body.classList.add('ng-mode')}catch(e){}
ngActive=true;
try{ngWasBgmPlaying=(typeof bgm!=='undefined'&&bgm&&!bgm.paused)}catch(e){ngWasBgmPlaying=false}
try{if(typeof bgm!=='undefined'&&bgm)bgm.pause()}catch(e){}
try{if(!ngMusic)ngMusicMode=ngMusicDefault()}catch(e){}
ngMusicStart();
if(ngLockIv){try{clearInterval(ngLockIv)}catch(e){}}
ngLockIv=setInterval(function(){ngLockRefresh()},200);
try{var mb=document.getElementById('ngMenuBtn');if(mb)mb.onclick=function(){ngMenuToggle()}}catch(e){}
try{var nsb=document.getElementById('ngSkipBtn');if(nsb)nsb.onclick=function(e){e.preventDefault();e.stopPropagation();try{ngSkipAll()}catch(e){}}}catch(e){}
try{var mh=document.getElementById('ngMenuHint');if(mh)mh.onclick=function(){ngHint()}}catch(e){}
try{var mmb=document.getElementById('ngMenuMusic');if(mmb){mmb.textContent=ngMusicLabel();mmb.onclick=function(){ngMusicToggle()}}}catch(e){}
try{var mspd=document.getElementById('ngMenuSpeed');if(mspd){mspd.textContent='SPEED: '+dialLabel();mspd.onclick=function(){dialCycle()}}}catch(e){}
try{var mch=document.getElementById('ngMenuChapters');if(mch)mch.onclick=function(){ngChapHall()}}catch(e){}
try{var mhb=document.getElementById('ngMenuHard');if(mhb){mhb.style.display=ngHardUnlocked()?'block':'none';mhb.textContent='HARD MODE: '+(ngHard?'ON':'OFF');mhb.onclick=function(){ngHardToggle()}}}catch(e){}
try{var msr=document.getElementById('ngMenuSpeedrun');if(msr){msr.onclick=function(){
if(!ngSprintUnlocked()){cubeDim('speedrunning mode unlocks after act 2. finish it first.');try{ngSfx('buzz')}catch(e){}return}
ngSprintToggle();try{ngSfx('pop')}catch(e){}cubeDim('speedrunning mode: '+(ngSprintOn()?'ON. no dialogue. doors open themselves.':'OFF. the void will talk again.'))
}}}catch(e){}
try{ngSprintApply()}catch(e){}
try{var ml=document.getElementById('ngMenuLeave');if(ml)ml.onclick=function(){ngExit()}}catch(e){}
var sv=ngLoad();
try{ngHard=!!(sv.hard&&ngHardUnlocked())}catch(e){ngHard=false}
var svCh=Math.min(sv.ch||0,ngMaxChapter);
if(ngForceCh!==null){svCh=(ngForceCh===21)?21:Math.min(ngForceCh,ngMaxChapter);ngForceCh=null}
try{ngDesignApply()}catch(e){}
try{if(parseInt(localStorage.getItem('cube_run_start')||'0',10)>0){localStorage.setItem('cube_run_last',String(Date.now()))}}catch(e){}
ngShowChapter(svCh);
},450);
}
function ngExit(){
if(!ngActive)return;
try{noliLyricStop()}catch(e){}
try{if(typeof ngNoliAudio!=='undefined'&&ngNoliAudio){ngNoliAudio.pause();ngNoliAudio=null}}catch(e){}
try{if(typeof noliStop==='function')noliStop()}catch(e){}
try{if(typeof noliGray==='function')noliGray(false)}catch(e){}
try{ngNoliOver=true}catch(e){}
try{var _hl=document.querySelectorAll('#hud');for(var _hi=0;_hi<_hl.length;_hi++){try{_hl[_hi].parentNode.removeChild(_hl[_hi])}catch(e){}}}catch(e){}
// bug: feature — walking out during the ch19 shutdown countdown
var _shutWalk=false;
try{if(ngMornPh===5&&ngMornTmrIv&&ngMornAud)_shutWalk=true}catch(e){}
if(_shutWalk){
try{ngMornStopAll()}catch(e){}
}
try{var _rl=parseInt(localStorage.getItem('cube_run_last')||'0',10)||0;if(_rl>0){var _ra=parseInt(localStorage.getItem('cube_run_acc')||'0',10)||0;localStorage.setItem('cube_run_acc',String(_ra+Date.now()-_rl));localStorage.removeItem('cube_run_last')}}catch(e){}
if(ngSayTimer){clearInterval(ngSayTimer);ngSayTimer=null}
ngSayQueue=[];ngSayTyping=false;ngCurrentJob=null;
try{ngVoiceStop()}catch(e){}
for(var wi=0;wi<ngWaiters.length;wi++){try{clearInterval(ngWaiters[wi])}catch(e){}}ngWaiters=[];
if(ngLockIv){try{clearInterval(ngLockIv)}catch(e){}ngLockIv=null}
if(ngSprintIv){try{clearInterval(ngSprintIv)}catch(e){}ngSprintIv=null}
if(ngDriftIv){try{clearInterval(ngDriftIv)}catch(e){}ngDriftIv=null}
if(ngNoobIv){try{clearInterval(ngNoobIv)}catch(e){}ngNoobIv=null}
if(ngTdIv){try{clearInterval(ngTdIv)}catch(e){}ngTdIv=null}
if(ngTbIv){try{clearInterval(ngTbIv)}catch(e){}ngTbIv=null}
if(ngCredIv){try{clearInterval(ngCredIv)}catch(e){}ngCredIv=null}
if(ngCred2Iv){try{clearInterval(ngCred2Iv)}catch(e){}ngCred2Iv=null}
if(ngBoredIv){try{clearInterval(ngBoredIv)}catch(e){}ngBoredIv=null}
ngMusicStop();
try{if(ngWasBgmPlaying&&typeof bgm!=='undefined'&&bgm){var bp=bgm.play();if(bp&&bp.catch)bp.catch(function(){});}}catch(e){}
ngWasBgmPlaying=false;
ngRestoreUI();
var ov=document.getElementById('ngOverlay');if(ov)ov.remove();
try{document.body.classList.remove('ng-mode')}catch(e){}
ngActive=false;ngClicks=0;
try{ach('touch_grass')}catch(e){}try{achScan()}catch(e){}
cubePrint('obj: ...come back never.');
if(_shutWalk){
var _swRant=['obj: ...wait. WAIT.','obj: you just walked out. mid-shutdown. with the song still playing.','obj: that was a bug. i was proud of it. the music was supposed to follow you. like a curse.','obj: ...you know what, no. i am not fixing it.','obj: it is a FEATURE now. you found the bottom of the mailroom by the wrong door.','obj: keep the song. bgm downfall. it is yours. the song remembers you leaving.','obj: (i am putting a checkmark next to "bug" and writing "by design" in pen.)'];
for(var _swi=0;_swi<_swRant.length;_swi++){(function(l,k){setTimeout(function(){try{cubePrint(l)}catch(e){}},700*k+500)})(_swRant[_swi],_swi)}
setTimeout(function(){try{localStorage.setItem('cube_downfall_unlocked','1')}catch(e){}try{ach('shutdown_walkout')}catch(e){}try{achScan()}catch(e){}try{cubeOk('bgm: downfall unlocked — bgm downfall')}catch(e){}},700*_swRant.length+600);
}
}
// DREAM: secret nightmare chapter (via `dream` command). obj is springtrap,
// the void is fazbear's. 3 deaths + 1 final loop with the phone.
var ngDreamLoop=0,ngDreamSeed=null,ngDreamLong=false,ngDreamQueue=[0,1,2];
var ngDreamKills=[
{t:'STATIC INJECTION',killer:'OBJ',d:'obj injects raw static. your organs rust from the inside out.',talk:['hold still. this will hurt. (that is the point.)','rusting. lovely. you wear decay well.'],fx:'ngDreamRust',failBtn:'DON\u2019T INJECT ME',fail:'he injects you anyway. rude efficiency.'},
{t:'BEATDOWN',killer:'OBJ',d:'the furniture disagrees with you. all of it. at once.',talk:['the void has furniture. it is angry furniture.','stay down. the floor missed you.'],fx:'ngDreamVig',failBtn:'DODGE',fail:'the furniture predicts. it read your file.'},
{t:'SHRED',killer:'OBJ',d:'filed under VOID. the shredder accepts.',talk:['you filed yourself. efficient.','management sends regards. (it does not.)'],fx:'ngDreamShred',failBtn:'HOLD ONTO SOMETHING',fail:'you hold onto the shredder. mistake.'},
{t:'DROWN IN STATIC',killer:'OBJ',d:'the signal gets loud. then louder. then you.',talk:['listen. LISTEN.','drown politely. the static insists.'],fx:'ngDreamRust',failBtn:'COVER YOUR EARS',fail:'your ears are also static. oversight.'},
{t:'GRAVITY REVERSED',killer:'OBJ',d:'up is down. the floor files a complaint with your face.',talk:['gravity is a suggestion. i unsuggest it.','fall up. the ceiling missed you.'],fx:'ngDreamVig',failBtn:'HOLD THE FLOOR',fail:'the floor lets go. it was never yours.'},
{t:'JBO YELLS YOU APART',killer:'JBO',d:'ten thousand decibels. you come apart at the seams.',talk:['I AM THE ALARM.','LOUDER. LOUDER. LOUD—'],fx:null,failBtn:'YELL BACK',fail:'he out-yells you. he always out-yells everyone.'},
{t:'THE GRUE',killer:'GRUE',d:'it was awake. it was always awake.',talk:['...do not move.','it moved first.'],fx:'ngDreamVig',failBtn:'PLAY DEAD',fail:'you are dead. accurately.'},
{t:'FILING CABINET',killer:'OBJ',d:'a cabinet falls. it was filed under YOU.',talk:['look up.','unlucky.'],fx:'ngDreamShred',failBtn:'CATCH IT',fail:'you catch it with your spine.'},
{t:'CORE OVERLOAD',killer:'OBJ',d:'the core vents. you are standing where the vent goes.',talk:['she is flushing pressure.','you are the pressure.'],fx:'ngDreamSnow',failBtn:'TAKE COVER',fail:'cover is also venting.'},
{t:'CLOCK STRIKES',killer:'OBJ',d:'the lying clocks agree for once. you age 400 years in 4 seconds.',talk:['it is later than you think.','much later.'],fx:'ngDreamVig',failBtn:'CHECK THE TIME',fail:'the time checks you.'},
{t:'MAIL AVALANCHE',killer:'OBJ',d:'thirty-two parcels. all addressed to you. all heavy.',talk:['special delivery.','sign here. (you cannot move your arms.)'],fx:'ngDreamShred',failBtn:'DODGE THE MAIL',fail:'the mail dodges back. postage due.'},
{t:'INTERLOPER STATIC',killer:'INTERLOPER',d:'the tumor tunes you like a band. you resolve into soup.',talk:['hold still. i am calibrating you.','you were always readable.'],fx:'ngDreamSnow',failBtn:'CHANGE THE CHANNEL',fail:'you ARE the channel.'},
{t:'SHUTDOWN SONG',killer:'OBJ',d:'five minutes. looped. you do not survive the bridge.',talk:['it slaps.','it slaps you.'],fx:null,failBtn:'SKIP TRACK',fail:'there is no skip. there is only downfall.'},
{t:'COOLANT BATH',killer:'OBJ',d:'the reactor shares its coolant. it is not water.',talk:['in you go.','the grue swims in this. (it does not.)'],fx:'ngDreamRust',failBtn:'HOLD YOUR BREATH',fail:'your breath files a complaint and leaves.'},
{t:'YOU SAID NYARCH',killer:'OBJ',d:'you said it. HE heard it. run.',talk:['...what did you just say.','wrong answer. there was no right answer.'],fx:'ngDreamVig',failBtn:'TAKE IT BACK',fail:'the void keeps receipts. and you.'},
{t:'THE ORACLE',killer:'OBJ',d:'you ask the oracle how to survive. it says: skill issue.',talk:['ask it. go on.','it said no.'],fx:'ngDreamSnow',failBtn:'ASK AGAIN',fail:'still no. the oracle charges per answer. you are broke.'}
];
var ngDreamRoasts=['TOO SLOW, rust bucket.','TALK LESS. STAB LESS. EVER THOUGHT OF NOT?','GET PWNED, LOSER.'];
function ngChapterDream(st){
ngDreamLoop=0;
ngDreamQueue=[0,1,2];
var seedLine='';
if(ngDreamLong){
var poolL=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
for(var li=poolL.length-1;li>0;li--){var lj=Math.floor(Math.random()*(li+1));var lt=poolL[li];poolL[li]=poolL[lj];poolL[lj]=lt}
ngDreamQueue=poolL.slice(0,10);
seedLine='midnight showing \u00b7 10 loops \u00b7 ';
ngDreamLong=false;
}
else if(ngDreamSeed!==null&&typeof ngDreamSeed!=='undefined'){
var pool=[0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
for(var i=pool.length-1;i>0;i--){var j=Math.floor(Math.random()*(i+1));var t=pool[i];pool[i]=pool[j];pool[j]=t}
ngDreamQueue=pool.slice(0,3+Math.floor(Math.random()*3));
seedLine='seed '+ngDreamSeed+' \u00b7 ';
ngDreamSeed=null;
}
st.innerHTML='<div id="ngSub">DREAM ('+seedLine+'this is not real. probably.)</div><div id="ngDreamMain" style="display:flex;flex-direction:column;align-items:center;width:100%"></div>';
ngSay('...you slept. bold. the void dreams THROUGH you.');
ngAfterSpeech(function(){if(ngActive&&!ngChDone)ngDreamLoopFn()},800);
}
function ngDreamFx(cls){
try{
var st=document.getElementById('ngStage');if(!st)return;
var old=document.getElementById('ngDreamFx');if(old)old.remove();
if(!cls)return;
var d=document.createElement('div');d.id='ngDreamFx';
d.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;pointer-events:none;z-index:99990';
d.innerHTML='<div class="ngDreamFxA '+cls+'" style="position:absolute;left:0;top:0;right:0;bottom:0"></div>';
st.appendChild(d);
}catch(e){}
}
function ngDreamShake(big){
try{var ov=document.getElementById('ngOverlay');if(!ov)return;ov.classList.add('ngShake');setTimeout(function(){ov.classList.remove('ngShake')},big?900:450);if(big)setTimeout(function(){try{if(ngActive){ov.classList.add('ngShake');setTimeout(function(){ov.classList.remove('ngShake')},900)}}catch(e){}},500)}catch(e){}
}
function ngDreamLoopFn(){
if(!ngActive||ngChDone)return;
ngDreamFx(null);
if(ngDreamLoop<ngDreamQueue.length){
var k=ngDreamKills[ngDreamQueue[ngDreamLoop]];
var total=ngDreamQueue.length+1;
if(k.killer==='JBO'){ngShout(k.talk[0]);ngShout(k.talk[1])}else{ngSay(k.talk[0]);ngSay(k.talk[1])};
ngAfterSpeech(function(){
if(!ngActive||ngChDone)return;
ngDreamFx(k.fx);
ngDreamShake(true);
try{ngSfx('static')}catch(e){}
var m=document.getElementById('ngDreamMain');if(!m)return;
var n=ngDreamLoop+1;
m.innerHTML='<div id="ngSub">LOOP '+n+'/'+total+' &middot; '+k.t+'</div><div class="ngDreamKiller">'+k.killer+'</div><div style="text-align:center"><button class="ngtopt" id="ngDreamFailB" style="width:52%">'+k.failBtn+'</button></div>';
var b=document.getElementById('ngDreamFailB');if(b)b.onclick=function(){if(!ngActive||ngChDone)return;ngDreamDie()};
},900);
}else{
ngSay('STATIC INJECTION. again. he loves this one.');
ngSay('rusting. ...wait. what is that.');
ngAfterSpeech(function(){
if(!ngActive||ngChDone)return;
var m=document.getElementById('ngDreamMain');if(!m)return;
m.innerHTML='<div id="ngSub">LOOP '+(ngDreamQueue.length+1)+'/'+(ngDreamQueue.length+1)+' &middot; something is ringing. familiar. wrong here.</div><div class="ngDreamPhoneGlow" style="color:#ffe9a8;font-family:Consolas,monospace;font-size:15px;text-align:center;margin:12px 0;padding:10px 18px;border:1px solid rgba(255,233,168,0.5);border-radius:8px">dad&rsquo;s phone &middot; 1% &middot; buzzing</div><div style="text-align:center"><button class="ngtopt" id="ngDreamPhoneB" style="width:48%">GRAB THE PHONE</button></div>';
var b=document.getElementById('ngDreamPhoneB');if(b)b.onclick=function(){if(ngTalking())return;try{ngHurry()}catch(e){}ngDreamPhone()};
},900);
}
}
function ngDreamDie(){
if(!ngActive||ngChDone)return;
var k=ngDreamKills[ngDreamQueue[Math.min(ngDreamLoop,ngDreamQueue.length-1)]];
ngSay(k.fail);
ngAfterSpeech(function(){
if(!ngActive||ngChDone)return;
ngDreamFx('ngDreamFlash');
try{ngSfx('buzz')}catch(e){}
var m=document.getElementById('ngDreamMain');if(!m)return;
var n=ngDreamLoop+1;
m.innerHTML='<div id="ngEndTitle">YOU DIED &middot; LOOP '+n+'/4</div><div id="ngSub">'+k.d+'</div><div style="margin-top:12px"><button class="ngtopt" id="ngDreamAgainB" style="width:44%">AGAIN.</button></div>';
ngDreamLoop++;
var b=document.getElementById('ngDreamAgainB');if(b)b.onclick=function(){if(ngTalking())return;try{ngHurry()}catch(e){}ngDreamLoopFn()};
},800);
}
function ngDreamPhone(){
if(!ngActive||ngChDone)return;
var m=document.getElementById('ngDreamMain');if(!m)return;
var h='<div id="ngSub">you grabbed it. his monologue falters. SAY IT.</div><div style="display:flex;flex-direction:column;align-items:center;gap:6px;margin-top:8px">';
for(var i=0;i<ngDreamRoasts.length;i++)h+='<button class="ngtopt" data-r="'+i+'" style="width:64%">'+ngDreamRoasts[i]+'</button>';
h+='</div>';m.innerHTML=h;
var bs=m.getElementsByTagName('button');
for(var j=0;j<bs.length;j++)(function(b){b.onclick=function(){ngDreamWake(parseInt(b.getAttribute('data-r'),10))}})(bs[j]);
}
function ngDreamWake(ri){
if(!ngActive||ngChDone)return;
ngSay('('+(ngDreamRoasts[ri]||'GET PWNED, LOSER.')+')');
ngAfterSpeech(function(){
if(!ngActive||ngChDone)return;
ngSay('...what.');
ngAfterSpeech(function(){
if(!ngActive||ngChDone)return;
try{localStorage.setItem('cube_pwned','1')}catch(e){}
ngSay('...morning. you drooled.');
ngAfterSpeech(function(){if(ngActive)ngExit()},800);
},700);
},700);
}
// caught obj in 4k — phase 1: procedural pull demos, scripts 1-3
var pullAccess=false;
var pullBusy=false;
var demoPlaying=false;
var demoTimers=[];
var demoHudTimer=null;
var demoState=null;
var demoLib=[];
function cbRng(seed){var a=seed>>>0;return function(){a|=0;a=(a+0x6D2B79F5)|0;var t=Math.imul(a^(a>>>15),1|a);t=(t+Math.imul(t^(t>>>7),61|t))^t;return((t^(t>>>14))>>>0)/4294967296}}
function demoLater(fn,ms){var t=setTimeout(function(){try{fn()}catch(e){}},ms);demoTimers.push(t);return t}
function demoClearTimers(){for(var i=0;i<demoTimers.length;i++){try{clearTimeout(demoTimers[i])}catch(e){}}demoTimers=[];if(demoHudTimer){try{clearInterval(demoHudTimer)}catch(e){}demoHudTimer=null}}
function demoLibLoad(){demoLib=[];try{var s=localStorage.getItem('cube_demo_lib');if(s){var v=JSON.parse(s);if(v instanceof Array){for(var i=0;i<v.length;i++){var r=v[i];if(r&&r.id&&r.script)demoLib.push(r)}}}}catch(e){demoLib=[]}}
function demoLibSave(){try{localStorage.setItem('cube_demo_lib',JSON.stringify(demoLib))}catch(e){}}
function demoPath(rec){return '/void/demos/'+rec.id}
function demoContent(rec){var d=new Date(rec.at);var when=d.toLocaleDateString()+' '+d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'});return['--- cube void demo ---','file: '+rec.id,'script: '+rec.script,'seed: '+rec.seed,'beats: '+rec.beats,'length: '+rec.ms+'ms','commit: '+rec.commit,'saved: '+when,'note: footage is generated live from this seed.','obj kept the tape.'].join('\n')}
function demoEnsureDir(){try{if(typeof fs==='undefined'||!fs||!fs['/void'])return;if(!fs['/void/demos']){fs['/void/demos']={type:'dir',children:[]};if(fs['/void'].children.indexOf('demos')===-1)fs['/void'].children.push('demos')}}catch(e){}}
function demoMaterialize(){try{demoEnsureDir();if(typeof fs==='undefined'||!fs||!fs['/void/demos'])return;for(var i=0;i<demoLib.length;i++){var rec=demoLib[i];if(!rec||!rec.id)continue;var p=demoPath(rec);if(!fs[p])fs[p]={type:'file',content:demoContent(rec)};else fs[p].content=demoContent(rec);if(fs['/void/demos'].children.indexOf(rec.id)===-1)fs['/void/demos'].children.push(rec.id)}}catch(e){}}
function demoNextId(){var best=0;for(var i=0;i<demoLib.length;i++){var m=/^demo(\d+)\.demo$/.exec(demoLib[i].id||'');if(m)best=Math.max(best,parseInt(m[1],10)||0)}return 'demo'+(best+1)+'.demo'}
function demoRecord(script,seed,beats,ms){var rec={id:demoNextId(),script:script,seed:seed>>>0,at:Date.now(),beats:beats,ms:ms,commit:'COMMITTED TODAY'};demoLib.push(rec);if(demoLib.length>200)demoLib=demoLib.slice(-200);demoLibSave();demoMaterialize();return rec}
function demoFind(name){if(!name)return null;var base=String(name).split('/').pop().toLowerCase();for(var i=0;i<demoLib.length;i++){if(String(demoLib[i].id).toLowerCase()===base)return demoLib[i]}return null}
function demoForget(path){try{if(!path||path.indexOf('/void/demos/')!==0)return;var base=path.split('/').pop();var kept=[];var dropped=false;for(var i=0;i<demoLib.length;i++){if(demoLib[i].id!==base)kept.push(demoLib[i]);else dropped=true}if(dropped){demoLib=kept;demoLibSave()}}catch(e){}}
function demoAllowedShapes(){var s=['cube','tetra','sphere','cyl','torus','knot','icosa'];try{if(typeof octaUnlocked==='function'&&octaUnlocked())s.push('octa')}catch(e){}try{if(typeof tessUnlocked==='function'&&tessUnlocked())s.push('tesseract')}catch(e){}return s}
function demoAllowedThemes(){var t=['1','2','3','4','5'];try{if(window._skillPrism||isAdmin)t.push('6')}catch(e){}try{if(window._skillEclipse||isAdmin)t.push('7')}catch(e){}return t}
function txMuted(){try{if(localStorage.getItem('cube_mute')==='1')return true}catch(e){if(window._txMuted)return true}return !!(typeof pkgEffects!=='undefined'&&pkgEffects&&pkgEffects.voidMute)}
function ngMailRead(){
try{localStorage.setItem('cube_mail_read','1')}catch(e){}
cubePrint('');
var L=[
'FROM: the mailroom dimension (relocated nowhere)',
'TO:   the intruder',
'RE:   forwarding complete',
'',
'your mail was forwarded to here. here is also closed. delivery: successful.',
'',
'FROM: obj',
'RE:   you finished it',
'',
'congratulations. you finished the thing that does not exist.',
'there is no cake. there was never a cake. the cake is a filesystem path (404).',
'',
'FROM: the interloper',
'RE:   the door',
'',
'you kept it open. i noticed. i always notice.',
'',
'FROM: THE VOID (automated notice)',
'',
'this mailbox is not monitored. you are reading it anyway.',
'',
'(end of mail. 4 items. all of them yours.)'
];
for(var i=0;i<L.length;i++)cubePrint(L[i]);
cubeDim('mail: 4 items. all read. the void closes the box.');
}
function setTxMuted(on){on=!!on;try{localStorage.setItem('cube_mute',on?'1':'0')}catch(e){window._txMuted=on}if(on){cubeOk('void-mute: transmissions silenced.');try{ach('silence')}catch(e){}}else{cubePrint('void-unmute: the void has opinions again.')}}
function objGrant(){pullAccess=true;var lines=['obj: what.','obj: why.','obj: you rang.','obj: make it quick.','obj: ...fine. the tape deck is yours.','obj: do not waste my footage.'];cubePrint(lines[Math.floor(Math.random()*lines.length)]);cubeDim('pull access: granted for this session. try: get box.objbox.pull:51072')}
function pullRequest(target,force){if(target){target=String(target).trim().toLowerCase().replace(/['"]/g,'')}if(force){force=parseInt(force,10);if(!(force>=1&&force<=9)){cubeError('usage: pull [box.objbox.pull:51072|1-9]');return}if(!isAdmin){cubeError('pull: forcing a script needs admin.');return}}if(pullBusy||demoPlaying){cubeWarn('pull: the tape deck is already running.');return}if(typeof currentView!=='undefined'&&currentView!=='void'){cubeWarn('pull: the tape deck only works in the void view.');return}if(typeof travelling!=='undefined'&&travelling){cubeWarn('pull: the void is travelling. wait for arrival.');return}if(typeof isFrozen!=='undefined'&&isFrozen){cubeWarn('pull: time is frozen. unfreeze first.');return}if(!pullAccess){cubeError('pull: obj has not granted access. type: obj');return}if(target&&target!=='box.objbox.pull:51072'){cubeError('usage: pull [box.objbox.pull:51072]');return}pullBusy=true;var seq=['pull: knocking on box.objbox.pull:51072...','pull: the void picked up.','pull: no serial key found. the void does not care.','pull: proving you are an intruder...','pull: access confirmed. obj is watching.','pull: opening the tape deck...'];for(var i=0;i<seq.length;i++){(function(line,idx){demoLater(function(){cubePrint(line)},idx*230)})(seq[i],i)}demoLater(function(){pullBusy=false;pullGenerate(force)},seq.length*230+260)}
function pullRareUnlocked(){try{if(isAdmin)return true}catch(e){}return (typeof skillHas==='function'&&skillHas('anom_interloper'))||!!window._skillInterloper}
function pullGenerate(force){var script=force;if(!script){var r=Math.random();script=r<0.60?1:(r<0.82?2:(r<0.93?3:(r<0.955?4:(r<0.965?5:(r<0.985?6:(r<0.995?7:8))))))}if(script>=4&&!pullRareUnlocked()){script=1+Math.floor(Math.random()*3)}
if(script===9&&!ngAct2Done()){script=1+Math.floor(Math.random()*3)}
var seed=Math.floor(Math.random()*4294967296);var beats,ms;if(script===1){beats=5+Math.floor(Math.random()*4);ms=4500+Math.floor(Math.random()*3500)}else if(script===2){beats=6+Math.floor(Math.random()*5);ms=6000+Math.floor(Math.random()*4000)}else if(script===3){beats=7+Math.floor(Math.random()*6);ms=7000+Math.floor(Math.random()*4000)}else if(script===4){beats=14+Math.floor(Math.random()*7);ms=20000+Math.floor(Math.random()*15000)}else if(script===5){beats=8+Math.floor(Math.random()*5);ms=8000+Math.floor(Math.random()*4000)}else if(script===6){beats=12+Math.floor(Math.random()*7);ms=12000+Math.floor(Math.random()*6000)}else if(script===7){beats=12+Math.floor(Math.random()*7);ms=18000+Math.floor(Math.random()*12000)}else if(script===9){beats=11+Math.floor(Math.random()*5);ms=14000+Math.floor(Math.random()*8000)}else{beats=10+Math.floor(Math.random()*5);ms=12000+Math.floor(Math.random()*6000)}var rec=demoRecord(script,seed,beats,ms);cubeOk('demo saved: /void/demos/'+rec.id+' (script '+script+')');demoStart(rec)}
var cubeCheckBusy=false;
function realCubeCheck(){
if(cubeCheckBusy){cubePrint('cubecheck: already scanning.');return}
cubeCheckBusy=true;
cubePrint('cubecheck: scanning walls for graffiti...');
setTimeout(function(){cubePrint('cubecheck: pass 2/2 - cross-referencing transmissions...')},900);
setTimeout(function(){	
try{
if(Math.random()<0.4){
var where=['north wall, sector 7g','the containment seam','behind the outer shell','inner cube 3, fresh paint','the floor under the palette'][Math.floor(Math.random()*5)];
cubeWarn('cubecheck: graffiti detected - '+where+'.');
cubePrint('cubecheck: generating tape from the mark...');
pullGenerate();
}else{
cubePrint('cubecheck: scan complete. walls are clean. probably.');
}
}catch(e){cubeError('cubecheck: scan interrupted. the walls moved.')}
cubeCheckBusy=false;
},2100)
}
function demoSnapshot(){var f='';try{var m=document.getElementById('main');if(m)f=m.style.filter||''}catch(e){}return{rx:typeof rX==='undefined'?0:rX,ry:typeof rY==='undefined'?0:rY,vx:typeof vX==='undefined'?0:vX,vy:typeof vY==='undefined'?0:vY,zz:typeof zZ==='undefined'?-9:zZ,shape:typeof curShape==='undefined'?'cube':curShape,theme:typeof curTheme==='undefined'?'1':curTheme,frozen:(typeof isFrozen==='undefined'?false:isFrozen),timeFrozen:(typeof window!=='undefined'&&window._timeFrozen===true),filter:f}}
function demoRestore(s){try{if(!s)return;vX=s.vx;vY=s.vy;rX=s.rx;rY=s.ry;zZ=s.zz;if(typeof s.frozen==='boolean')isFrozen=s.frozen;if(typeof s.timeFrozen==='boolean')window._timeFrozen=s.timeFrozen;if(s.shape&&typeof rebuild==='function'){curShape=s.shape;rebuild(s.shape);try{syncShapePalette()}catch(e){}}if(s.theme&&typeof applyTheme==='function'){applyTheme(s.theme)}var m=document.getElementById('main');if(m)m.style.filter=s.filter||''}catch(e){}}
function demoHudShow(rec){try{var el=document.getElementById('demoHud');if(!el)return;el.innerHTML='<span id="demoRec">▏</span> REC<br>demo '+rec.id+' · SCRIPT '+rec.script+'<br>'+rec.commit+' · tick 0000/'+String(rec.beats).padStart(4,'0')}catch(e){}}
function demoHudTick(rec,done){try{var el=document.getElementById('demoHud');if(!el)return;var extra='';if(rec.script===7)extra+='<br>found tape · intruder #'+(1000+(rec.seed%9000));if(rec.script===9)extra+='<br>reel: act 2';if(demoState&&demoState.scene)extra+='<br>scene: '+demoState.scene;if(demoState&&demoState.whisper)extra+='<br>/// '+demoState.whisper;if(demoState&&demoState.inspect)extra+='<br>inspect: '+demoState.inspect;if(demoState&&demoState.said)extra+='<br>obj: '+demoState.said;el.innerHTML='<span id="demoRec">▏</span> REC<br>demo '+rec.id+' · SCRIPT '+rec.script+'<br>'+rec.commit+' · tick '+String(done).padStart(4,'0')+'/'+String(rec.beats).padStart(4,'0')+extra}catch(e){}}
function demoDimPulse(rng){try{var m=document.getElementById('main');if(!m)return;m.style.filter='brightness(0.55) contrast(1.15)';demoLater(function(){try{if(demoState&&demoState.snap)m.style.filter=demoState.snap.filter||''}catch(e){}},650)}catch(e){}}
function demoChaos(rng){var pick=rng();if(pick<0.3){rX+=(rng()-0.5)*3;rY+=(rng()-0.5)*3;vX+=(rng()-0.5)*0.08;vY+=(rng()-0.5)*0.08}else if(pick<0.5){try{var m=document.getElementById('main');if(m){m.style.filter='brightness(0)';var hold=280+rng()*200;demoLater(function(){try{if(demoState&&demoState.snap)m.style.filter=demoState.snap.filter||''}catch(e){}},hold)}}catch(e){}}else if(pick<0.7){try{var m2=document.getElementById('main');if(m2){var hue=Math.floor(rng()*360);var sat=2+rng()*3;m2.style.filter='hue-rotate('+hue+'deg) saturate('+sat+')';demoLater(function(){try{if(demoState&&demoState.snap)m2.style.filter=demoState.snap.filter||''}catch(e){}},500)}}catch(e){}}else if(pick<0.85){zZ=rng()<0.5?-3:-15;vX+=(rng()-0.5)*0.05;vY+=(rng()-0.5)*0.05}else{var sh=demoAllowedShapes();for(var k=0;k<3;k++){var pp=sh[Math.floor(rng()*sh.length)];demoLater((function(s){return function(){try{curShape=s;rebuild(s)}catch(e){}}})(pp),k*130)}}}
var demoWhispers=['sector 7g: movement','it is looking back.','do not wave.','the tape remembers this part.','obj was here.'];
function demoScene(rng){var st=demoState;if(!st)return;var roll=rng();if(roll<0.25){zZ+=(rng()-0.5)*0.3;if(zZ>-3)zZ=-3;if(zZ<-15)zZ=-15;st.scene='push-in'}else if(roll<0.42){var th=demoAllowedThemes();st.memIdx=((st.memIdx||0)+1)%th.length;applyTheme(th[st.memIdx]);st.scene='theme memory'}else if(roll<0.57){var c=document.getElementById('demoChecker');if(c){c.style.opacity='1';demoLater(function(){try{if(demoState){var c2=document.getElementById('demoChecker');if(c2)c2.style.opacity='0'}}catch(e){}},3200)}st.scene='checkerboard'}else if(roll<0.72){var w=document.getElementById('demoWatcher');if(w){w.style.left=(5+rng()*90)+'vw';w.style.top=(5+rng()*85)+'vh';w.style.display='block';demoLater(function(){try{if(demoState){var w2=document.getElementById('demoWatcher');if(w2)w2.style.display='none'}}catch(e){}},3000)}st.scene='watcher'}else if(roll<0.86){rX+=(rng()-0.5)*0.12;rY+=(rng()-0.5)*0.12;st.scene='drift'}else{st.whisper=demoWhispers[Math.floor(rng()*demoWhispers.length)];st.scene='whisper';demoLater(function(){try{if(demoState)demoState.whisper=''}catch(e){}},2200)}if(rng()<0.08){try{triggerGlitch()}catch(e){}}}
var demoInspectTargets=['outer shell','inner cube 3','dust cluster 9','containment seam','the void itself','sector 7g','theme registry'];
function demoInspect(rng){var st=demoState;if(!st)return;var roll=rng();if(roll<0.45){rX=rng()*Math.PI*2;rY=rng()*Math.PI*2;zZ=-3-rng()*12;vX=0;vY=0;st.scene='relocate'}else if(roll<0.8){st.inspect=demoInspectTargets[Math.floor(rng()*demoInspectTargets.length)];st.scene='inspect'}else{try{if(typeof initParticles==='function')initParticles()}catch(e){}try{triggerGlitch()}catch(e){}st.inspect='target deleted from tape';st.scene='delete'}}
function demoTheirs(rng){var st=demoState;if(!st)return;var roll=rng();if(roll<0.4){rX+=(rng()-0.5)*0.1;rY+=(rng()-0.5)*0.1;st.scene='orbit'}else if(roll<0.65){var th=demoAllowedThemes();st.memIdx=((st.memIdx||0)+1)%th.length;applyTheme(th[st.memIdx]);st.scene='theme memory'}else if(roll<0.85){st.whisper=demoWhispers[Math.floor(rng()*demoWhispers.length)];st.scene='whisper';demoLater(function(){try{if(demoState)demoState.whisper=''}catch(e){}},2200)}else{st.scene='drift';rX+=(rng()-0.5)*0.06}if(rng()<0.05){try{triggerGlitch()}catch(e){}}}
var demoGoWhispers=['closer.','stop.','turn around.','you are too close.','leave.'];
function demoGoAway(rng){var st=demoState;if(!st)return;zZ=Math.min(-3,zZ+0.3+rng()*0.25);rY+=(rng()-0.5)*0.06;st.scene='approach';var progress=st.beat/Math.max(1,st.rec.beats);var roll=rng();if(roll<0.4){st.said=demoGoWhispers[Math.floor(rng()*demoGoWhispers.length)];demoLater(function(){try{if(demoState)demoState.said=''}catch(e){}},2200)}if(rng()<0.2+0.6*progress){try{triggerGlitch()}catch(e){}}}
function demoAct2(rng){var st=demoState;if(!st)return;var roll=rng();
var a2scenes=['the door','the mailroom','signal lost','the knocking','the echo','the interrogation'];
var a2inspects=['UNVERIFIED receipt','filing rules 1-7','stamp: VOID','mailbox: 0 new','mailbox: 3 new (all from you)','a requisition denied twice'];
var a2whispers=['filed.','FILED.','the door was always open','echo says hi. echo says hi. echo says...','9:04. forever 9:04','watch the needle'];
var a2said=['obj: you knocked. i heard everything.','obj: the mail is not going to file itself. (it might.)','obj: credits 2. legally distinct from credits 1.'];
if(roll<0.3){st.scene=a2scenes[Math.floor(rng()*a2scenes.length)];zZ+=(rng()-0.5)*0.4;if(zZ>-3)zZ=-3;if(zZ<-15)zZ=-15;if(rng()<0.5){try{triggerGlitch()}catch(e){}}}
else if(roll<0.55){st.inspect=a2inspects[Math.floor(rng()*a2inspects.length)];st.scene='inspect'}
else if(roll<0.75){st.whisper=a2whispers[Math.floor(rng()*a2whispers.length)];st.scene='whisper';demoLater(function(){try{if(demoState)demoState.whisper=''}catch(e){}},2200)}
else if(roll<0.9){st.said=a2said[Math.floor(rng()*a2said.length)];st.scene='obj';demoLater(function(){try{if(demoState)demoState.said=''}catch(e){}},2400)}
else{var th=demoAllowedThemes();st.memIdx=((st.memIdx||0)+1)%th.length;applyTheme(th[st.memIdx]);st.scene='theme memory'}}
function demoBeat(rng,script){if(script===4){demoScene(rng);return}if(script===6){demoInspect(rng);return}if(script===7){demoTheirs(rng);return}if(script===8){demoGoAway(rng);return}if(script===9){demoAct2(rng);return}var roll=rng();if(roll<0.34){var rk=script===3?1.6:1;rX+=(rng()-0.5)*0.7*rk;rY+=(rng()-0.5)*0.9*rk;vX+=(rng()-0.5)*0.02;vY+=(rng()-0.5)*0.02}else if(roll<0.52){zZ+=(rng()-0.5)*(script===1?0.8:1.4);if(zZ>-3)zZ=-3;if(zZ<-15)zZ=-15}else if(roll<0.70){var sh=demoAllowedShapes();var pick=sh[Math.floor(rng()*sh.length)];curShape=pick;rebuild(pick);if(script===3&&rng()<0.4){var sh2=demoAllowedShapes();var p2=sh2[Math.floor(rng()*sh2.length)];demoLater((function(s){return function(){try{curShape=s;rebuild(s)}catch(e){}}})(p2),160)}}else if(roll<0.84){if(script===3&&rng()<0.55){applyTheme('5')}else{var th=demoAllowedThemes();applyTheme(th[Math.floor(rng()*th.length)])}}else{triggerGlitch();if(script===3&&rng()<0.6)demoLater(triggerGlitch,140)}if(script===2&&rng()<0.25)demoDimPulse(rng);if(script===3&&rng()<0.45)demoDimPulse(rng);if(script===3&&rng()<0.3)demoLater(triggerGlitch,220);if(script===3&&rng()<0.5)demoChaos(rng)}
function demoStart(rec){if(!rec)return;if(demoPlaying){cubeWarn('pull: a demo is already playing.');return}if(typeof currentView!=='undefined'&&currentView!=='void'){cubeWarn('pull: the tape deck only works in the void view.');return}if(typeof travelling!=='undefined'&&travelling){cubeWarn('pull: the void is travelling. wait for arrival.');return}if(typeof isFrozen!=='undefined'&&isFrozen){cubeWarn('pull: time is frozen. unfreeze first.');return}demoPlaying=true;pullBusy=false;demoState={rec:rec,snap:demoSnapshot(),beat:0,memIdx:0,scene:'',whisper:'',inspect:'',said:'',rng:cbRng(rec.seed)};try{document.body.classList.add('demo-mode')}catch(e){}demoHudShow(rec);demoHudTimer=setInterval(function(){try{demoHudTick(rec,demoState?demoState.beat:0)}catch(e){}},120);if(rec.script===5){try{isFrozen=true;window._timeFrozen=true}catch(e){}vX=0;vY=0;var st5=document.getElementById('demoStill');if(st5)st5.style.display='block';demoState.scene='held'}if(rec.script===8){var st8=document.getElementById('demoGoAway');if(st8)st8.style.display='block';demoState.scene='approach'}if(rec.script===7){var st7=document.getElementById('demoTheirs');if(st7)st7.style.display='block'}for(var i=0;i<rec.beats;i++){(function(idx){var at=Math.floor(rec.ms*(idx+1)/(rec.beats+1));demoLater(function(){if(!demoState)return;demoState.beat=idx+1;if(rec.script===5){demoHudTick(rec,demoState.beat)}else{demoBeat(demoState.rng,rec.script);demoHudTick(rec,demoState.beat)}},at)})(i)}demoLater(function(){demoEnd()},rec.ms+420)}
function demoEnd(){var rec=demoState?demoState.rec:null;var snap=demoState?demoState.snap:null;demoClearTimers();try{var dc=document.getElementById('demoChecker');if(dc)dc.style.opacity='0';var dw=document.getElementById('demoWatcher');if(dw)dw.style.display='none';var ds=document.getElementById('demoStill');if(ds)ds.style.display='none';var dt=document.getElementById('demoTheirs');if(dt)dt.style.display='none';var dg=document.getElementById('demoGoAway');if(dg)dg.style.display='none'}catch(e){}try{document.body.classList.remove('demo-mode')}catch(e){}demoRestore(snap);demoState=null;demoPlaying=false;pullBusy=false;if(rec){cubePrint('demo ended: '+rec.id+' (script '+rec.script+', '+rec.beats+' beats)');cubeDim('the void kept the tape. replay: replay '+rec.id)}}
function demoList(){if(!demoLib.length){cubePrint('no demos yet. type obj, then pull.');return}cubePrint(demoLib.length+' demo'+(demoLib.length===1?'':'s')+' on the shelf:');for(var i=0;i<demoLib.length;i++){var r=demoLib[i];var d=new Date(r.at);cubePrint('  '+r.id+' — script '+r.script+' · '+r.beats+' beats · '+d.toLocaleDateString()+' '+d.toLocaleTimeString([],{hour:'2-digit',minute:'2-digit'}))}}
function demoReplayCmd(a){if(!a||!a.length){cubeError('usage: replay <demo file>');return}var rec=demoFind(a[0]);if(!rec){cubeError('replay: no such demo: '+a[0]);return}demoMaterialize();cubeDim('replaying '+rec.id+' (script '+rec.script+'). no ritual needed.');demoStart(rec)}
var homCanvas=null,homCtx=null,homFlip=false;
function homSetup(){try{if(homCanvas&&homCtx)return true;homCanvas=document.getElementById('homCanvas');if(!homCanvas)return false;homCtx=homCanvas.getContext('2d');return !!homCtx}catch(e){return false}}
function homUpdate(){
if(typeof currentZone==='undefined'||currentZone!=='cb_menu')return;
if(!homSetup())return;
try{
if(homCanvas.width!==window.innerWidth||homCanvas.height!==window.innerHeight){homCanvas.width=window.innerWidth;homCanvas.height=window.innerHeight}
var hx=homCtx;
hx.globalCompositeOperation='source-over';
hx.globalAlpha=1;
homFlip=!homFlip;
hx.globalCompositeOperation='destination-in';
hx.fillStyle=homFlip?'rgba(0,0,0,0.999)':'rgba(0,0,0,0.99)';
hx.fillRect(0,0,homCanvas.width,homCanvas.height);
hx.globalCompositeOperation='source-over';
var hmvx=(typeof vX==='number'?vX:0),hmvy=(typeof vY==='number'?vY:0);
var hmmag=Math.max(0,Math.min(1,(Math.abs(hmvx)+Math.abs(hmvy))*120));
hx.globalAlpha=hmmag>0.05?0.015:0.16;
try{if(typeof canvas!=='undefined'&&canvas)hx.drawImage(canvas,0,0,homCanvas.width,homCanvas.height)}catch(e){}
hx.globalAlpha=1;
hx.globalCompositeOperation='source-over';
}catch(e){}
}
demoLibLoad();demoMaterialize();
var cubeCheckTicks=0;
setInterval(function(){try{if(localStorage.getItem('cube_cubecheck')==='off')return;cubeCheckTicks++;if(cubeCheckTicks<3)return;if(typeof demoPlaying!=='undefined'&&demoPlaying)return;if(typeof travelling!=='undefined'&&travelling)return;if(typeof currentView!=='undefined'&&currentView!=='void')return;if(typeof isFrozen!=='undefined'&&isFrozen)return;if(Math.random()<0.05){cubePrint('cubecheck.vsc: graffiti detected — generating...');pullGenerate()}}catch(e){}},50000);
setInterval(function(){try{if(typeof currentZone!=='undefined'&&currentZone==='cb_menu'&&!window._edgeWalk&&typeof travelling!=='undefined'&&!travelling&&typeof demoPlaying!=='undefined'&&!demoPlaying){if(Math.random()<0.12){cubeWarn('you stepped off the menu.');cubePrint('the void caught you before the nothing did.');try{var fms=cbMenuClose();if(fms>0)cubeDim('menu survival: '+cbMenuFmt(fms)+' (best '+cbMenuFmt(Math.max(fms,cbMenuBest()))+')')}catch(e){}travelTo('void')}}}catch(e){}},30000);
if(typeof voidScriptLang!=='undefined'){voidScriptLang['obj']={help:'obj - ask obj for pull access',fn:function(){objGrant();return true}};voidScriptLang['pull']={help:'pull [box.objbox.pull:51072|1-9] - play a procedural void demo (1-9 forces script, admin; 9 needs act 2)',fn:function(a){var pa=a&&a.length?a.join(' ').trim().toLowerCase():null;if(pa==='1'||pa==='2'||pa==='3'||pa==='4'||pa==='5'||pa==='6'||pa==='7'||pa==='8'||pa==='9'){pullRequest(null,pa);return true}pullRequest(pa);return true}};voidScriptLang['demos']={help:'demos - list saved void demos',fn:function(){demoList();return true}};voidScriptLang['replay']={help:'replay <demo file> - replay a saved void demo',fn:function(a){demoReplayCmd(a);return true}};voidScriptLang['void-mute']={help:'void-mute - silence void transmissions',fn:function(){setTxMuted(true);return true}};voidScriptLang['void-unmute']={help:'void-unmute - let the void talk again',fn:function(){setTxMuted(false);return true}};voidScriptLang['mail']={help:'mail - read your act 2 mail',fn:function(){ngMailRead();return true}};if(voidScriptLang['get']){var _demoOldGet=voidScriptLang['get'].fn;voidScriptLang['get'].fn=function(a){if(a&&a.length&&String(a[0]).toLowerCase()==='box.objbox.pull:51072'){pullRequest('box.objbox.pull:51072');return true}return _demoOldGet(a)};voidScriptLang['get'].help='get <name> — recall from voidspace; get box.objbox.pull:51072 pulls a demo'}}
try{if(localStorage.getItem('cube_act2')==='1'){setTimeout(function(){try{cubeDim('the void remembers act 2. it was there. (type: mail)')}catch(e){}},5000)}}catch(e){}
if(typeof refreshHelpLocks==='function')refreshHelpLocks();
skillReapplyAll();
skillUpReapplyAll();
if(typeof refreshShapeLocks==='function')refreshShapeLocks();
try{var _vb=upLv('skill_visitBonus');if(_vb>0){var _vg=grantPts(_vb*ptMult());skillPtsRefresh();cubePrint('[skill] visit bonus: +'+_vg+' skill point'+(_vg===1?'':'s'))}var _tr=upLv('skill_prestTribute');if(_tr>0){var _tu=grantUp(_tr*upMult());skillPtsRefresh();cubePrint('[upgrade] tribute: +'+_tu+' upgrade point'+(_tu===1?'':'s'))}}catch(e){}
var metaTrickleTimer=null;
function skillPtsRefresh(){try{var p=document.getElementById('skillPts');if(p)p.textContent=skillState.points;var u=document.getElementById('upPts');if(u)u.textContent=skillState.upPoints}catch(e){}}
function metaMs(){return Math.round(90000*tickDiv())}
function fireMetaTrickle(){
metaTrickleTimer=null;
if(!skillHas('meta2'))return;
var _mp=grantPts((1+upLv('skill_alphaWell'))*ptMult()*(1+0.25*upLv('skill_trickleBoost')));skillPtsRefresh();
cubePrint('[skill] photosynthesis: +'+_mp+' skill point. total: '+skillState.points);
metaTrickleTimer=setTimeout(fireMetaTrickle,metaMs());
}
function scheduleMetaTrickle(){
if(metaTrickleTimer)return;
if(!skillHas('meta2'))return;
metaTrickleTimer=setTimeout(fireMetaTrickle,metaMs());
}
var upTrickleTimer=null;
function upTrickleMs(){var lv=upLv('skill_upTrickle');if(lv<=0)return 0;var steps=[0,900000,540000,300000];return Math.round(steps[Math.min(lv,3)]*tickDiv())}
function scheduleUpTrickle(){
if(upTrickleTimer)clearTimeout(upTrickleTimer);
upTrickleTimer=null;
var ms=upTrickleMs();
if(!ms)return;
upTrickleTimer=setTimeout(function(){
upTrickleTimer=null;
var _tt=(1+upLv('skill_graveyard'))*(upLv('skill_darkening')>0?2:1)*(1+0.25*upLv('skill_trickleBoost'));
var _tg=grantUp(_tt*upMult());skillPtsRefresh();
cubePrint('[upgrade] trickle: +'+_tg+' upgrade point. total: '+skillState.upPoints);
scheduleUpTrickle();
},ms);
}
(function(){
function skillTickMs(){var lv=upLv('skill_skillRate');var steps=[480000,360000,240000,120000,60000,30000];return Math.round(steps[Math.min(Math.floor(lv),steps.length-1)]*tickDiv())}
function upTickMs(){var lv=upLv('skill_pointWell');var steps=[480000,360000,240000,120000,60000,30000];return Math.round(steps[Math.min(Math.floor(lv),steps.length-1)]*tickDiv())}
var upTimer=null;
function scheduleUpTick(){if(upTimer)clearTimeout(upTimer);if(!skillAllFinals())return;upTimer=setTimeout(function(){var _b=((window._skillMetaUpSurge?1:0)+upLv('skill_tickSurge'));var _g=grantUp((1+_b)*upMult()+2*upLv('skill_deepWell'));skillPtsRefresh();cubePrint('[upgrade] +'+_g+' upgrade point'+(_g===1?'':'s')+'. total: '+skillState.upPoints);scheduleUpTick()},upTickMs())}
function scheduleSkillTick(){
setTimeout(function(){
var _sb=((window._skillMetaSurge?1:0)+upLv('skill_tickSurge'));
var _samt=(1+_sb)*ptMult();
var _crit=Math.random()<0.2*upLv('skill_cascade');
if(_crit)_samt*=2;
var _g=grantPts(_samt);
var _pe=upLv('skill_prestEcho');if(_pe>0)grantUp(0.5*_pe*upMult());
if(skillAllFinals()){var _ub=((window._skillMetaUpSurge?1:0)+upLv('skill_tickSurge'));grantUp((1+_ub)*upMult());scheduleUpTick()}
skillPtsRefresh();
cubePrint('[skill] +'+_g+' skill point'+(_g===1?'':'s')+(_crit?' CRIT':'')+' earned. total: '+skillState.points+' (type: skill)');
scheduleSkillTick();
},skillTickMs())
}
if(skillAllFinals())scheduleUpTick();
scheduleSkillTick();
})()
setInterval(function(){
if(upLv('skill_entropy')<=0)return;
var _e=skillState.entropy||0;
var _ecap=upLv('skill_singularity')>0?20:10;
if(_e>=_ecap)return;
skillState.entropy=_e+1;skillSave();
cubePrint('[upgrade] entropy: +5% income forever (stack '+skillState.entropy+'/'+_ecap+')');
},600000/(1+upLv('skill_goldenAge')));
//slammy

var btnGameId=null;
function buttonGame(){
if(btnGameId&&typeof guiWins!=='undefined'&&guiWins[btnGameId]){cubePrint('the button is already contained. check your open windows.');return}
var id=guiCreateWin('button containment',470,430,false);if(!id)return;
btnGameId=id;
var w=guiWins[id],ct=w.content,el=w.el;
ct.style.cssText='position:relative;overflow:hidden;background:#0a0e0d;padding:0;display:flex;flex-direction:column;height:400px';
var st={c:50,clicks:0,mt:Date.now(),mood:'calm',corp:0,corpLvl:0,breach:false,seized:false,rel:0,ids:1000,clickT:0,gray:false};
var statusEl=document.createElement('div');
statusEl.style.cssText='flex:0 0 auto;padding:7px 8px 4px;font:11px Consolas,monospace;text-align:center;color:#cfe8d4;letter-spacing:0.4px;min-height:24px';
var meter=document.createElement('div');
meter.style.cssText='flex:0 0 auto;height:8px;margin:0 10px;background:#131a17;border:1px solid #1f2b25;position:relative';
var fill=document.createElement('div');
fill.style.cssText='position:absolute;left:0;top:0;bottom:0;width:50%;background:#7fd46a;transition:width .15s';
meter.appendChild(fill);
var stage=document.createElement('div');
stage.style.cssText='flex:1 1 auto;position:relative;overflow:hidden;margin-top:6px';
var blobLayer=document.createElement('div');
blobLayer.style.cssText='position:absolute;left:0;top:0;right:0;bottom:0;pointer-events:none';
stage.appendChild(blobLayer);
var btn=document.createElement('button');
btn.textContent='do thing';
btn.style.cssText='position:absolute;width:160px;height:56px;font:bold 15px Consolas,monospace;cursor:pointer;background:#173826;color:#b6ffab;border:1px solid #3f7d4e;border-radius:6px;box-shadow:0 0 14px rgba(80,255,140,.15);left:0;top:0';
stage.appendChild(btn);
var logEl=document.createElement('div');
logEl.style.cssText='flex:0 0 96px;overflow-y:auto;padding:5px 8px;border-top:1px solid #1c2620;font:10px Consolas,monospace;color:#7fa587;background:#070a09';
ct.appendChild(statusEl);ct.appendChild(meter);ct.appendChild(stage);ct.appendChild(logEl);
var titles=['button containment','this app has one job','obj button incident','cube# control panel','the void says this is fine','do not tell obj','containment active'];
var btexts=['do thing','do other thing','press me coward','obj approved','bad idea button','cube#','one button left','do not audit','randomize it','the button knows'];
var corpNames=['ignoring','monitoring','warning','restricting','asset designation','full lockdown'];
function setTitle(t){try{var s=w.title.querySelector('span');if(s)s.textContent=formatGuiText(t)}catch(e){}}
function centerBtn(){btn.style.left=Math.max(4,(stage.clientWidth-btn.offsetWidth-4)/2)+'px';btn.style.top=Math.max(4,(stage.clientHeight-btn.offsetHeight-4)/2)+'px'}
function lg(m){st.ids++;var t=new Date();var hh=('0'+t.getHours()).slice(-2),mm=('0'+t.getMinutes()).slice(-2),ss=('0'+t.getSeconds()).slice(-2);
var ln=document.createElement('div');ln.textContent='['+hh+':'+mm+':'+ss+']#'+st.ids+' '+m;logEl.insertBefore(ln,logEl.firstChild);while(logEl.childNodes.length>15)logEl.removeChild(logEl.lastChild)}
function stStatus(){fill.style.width=Math.max(0,Math.min(100,st.c))+'%';
fill.style.background=st.c>=80?'#6fbf5e':st.c<=15?'#d4c05e':'#7fd46a';
var moodP=st.mood==='suspicious'?'! ':st.mood==='angry'?'x ':'';
var corpS=corpNames[st.corp]||'ignoring';
if(st.seized)statusEl.textContent='corporate lockdown: appeal '+st.rel+'/10 | mood: '+moodP+st.mood;
else if(st.breach)statusEl.textContent='BREACH! uncontained | mood: '+moodP+st.mood+' | corp: '+corpS;
else if(st.c>=80)statusEl.textContent='stable containment | mood: '+moodP+st.mood+' | corp: '+corpS;
else if(st.c<=15)statusEl.textContent='containment decorative | mood: '+moodP+st.mood+' | corp: '+corpS;
else statusEl.textContent='incidents: '+st.clicks+' | mood: '+moodP+st.mood+' | corp: '+corpS}
function bAch(k){try{localStorage.setItem('cube_btn_'+k,'1')}catch(e){}try{ach('btn_'+k)}catch(e){}}
function changeC(d){st.c=Math.max(0,Math.min(100,st.c+d));
if(st.c===0&&!st.breach){st.breach=true;btn.textContent='uncontained';setTitle('button containment - uncontained');lg('containment breached. the button is unmanaged now.');bAch('breach')}
else if(st.c>0&&st.breach){st.breach=false;btn.textContent='do thing';setTitle('button containment');lg('containment restored. back to business.')}
if(st.c===100&&!st.seized){st.seized=true;st.rel=0;btn.textContent='appeal denied';setTitle('CORPORATE LOCKDOWN');lg('corporate seized the button. ten clicks to appeal.');bAch('seized')}
else if(st.c<100&&st.seized){st.seized=false;st.rel=0}}
function exitSeized(){st.seized=false;st.c=50;st.rel=0;btn.textContent='do thing';setTitle('button containment');lg('appeal granted. containment reset to 50. corporate is still watching.')}
function blobs(n,cap){for(var i=0;i<n;i++){if(blobLayer.childNodes.length>=cap)break;
var b=document.createElement('div');var s=8+Math.random()*36;
b.style.cssText='position:absolute;left:'+(Math.random()*90)+'%;top:'+(Math.random()*85)+'%;width:'+s+'px;height:'+s+'px;border-radius:50%;opacity:'+(0.25+Math.random()*0.45)+';background:radial-gradient(circle,'+(Math.random()<0.5?'#2b6b3f,#0e1a12':'#5b3a7a,#140e1c')+');filter:blur(1px)';
blobLayer.appendChild(b)}}
function moveBtn(){var maxX=stage.clientWidth-btn.offsetWidth-6,maxY=stage.clientHeight-btn.offsetHeight-6;if(maxX<6)maxX=6;if(maxY<6)maxY=6;
btn.style.left=(6+Math.random()*maxX)+'px';btn.style.top=(6+Math.random()*maxY)+'px'}
function normEv(k){
switch(k){
case 0:stage.style.background=['#0b1416','#140b16','#0f140b','#0b0b14'][Math.floor(Math.random()*4)];
btn.style.background=['#173826','#38251a','#251a38','#1a3838'][Math.floor(Math.random()*4)];
btn.style.borderColor='#'+('000000'+Math.floor(Math.random()*0xffffff).toString(16)).slice(-6);lg('chromatic shift.');break;
case 1:moveBtn();lg('button relocated without filing paperwork.');break;
case 2:btn.style.width=(140+Math.random()*90)+'px';btn.style.height=(48+Math.random()*36)+'px';lg('mass modification event.');break;
case 3:blobs(10,70);lg('visual residue detected.');break;
case 4:setTitle(titles[Math.floor(Math.random()*titles.length)]);lg('window title anomaly.');break;
case 5:btn.textContent=btexts[Math.floor(Math.random()*btexts.length)];lg('button text rewritten.');break;
case 6:statusEl.style.color='#ff5c5c';setTimeout(function(){if(guiWins[id])statusEl.style.color='#cfe8d4'},500);lg('anomalous signal detected. the void muted it.');break;
case 7:el.style.zIndex=(el.style.zIndex==='82')?'58':'82';setTitle(el.style.zIndex==='82'?'button is now too powerful':'button containment');lg('z-order dominance toggled.');break;
case 8:el.style.opacity=(0.68+Math.random()*0.3).toFixed(2);lg('opacity event. the button is fading.');break;
case 9:el.style.width=(420+Math.floor(Math.random()*260))+'px';lg('chamber dimensions shifted.');break;
case 10:(function(){var ox=el.style.left,ot=el.style.top,n=0;
var t=setInterval(function(){n++;if(n>16||!guiWins[id]){clearInterval(t);if(guiWins[id]){el.style.left=ox;el.style.top=ot}return}
el.style.left=(parseInt(ox,10)+(Math.random()*14-7))+'px';el.style.top=(parseInt(ot,10)+(Math.random()*14-7))+'px'},30)})();lg('the window is wobbling.');break;
case 11:centerBtn();lg('button recentered.');break;
case 12:blobs(1,70);var seal=document.createElement('div');
seal.style.cssText='position:absolute;left:'+(btn.offsetLeft-6)+'px;top:'+(btn.offsetTop-6)+'px;width:'+(btn.offsetWidth+12)+'px;height:'+(btn.offsetHeight+12)+'px;border:2px solid #d4a03a;border-radius:8px;opacity:.8';
blobLayer.appendChild(seal);lg('containment seal applied.');break;
case 13:btn.textContent=btn.textContent.split('').join(' ');lg('text altered.');setTimeout(function(){if(guiWins[id])btn.textContent='do thing'},1200);break;
case 14:(function(){var o=document.createElement('div');
o.style.cssText='position:absolute;left:50%;top:50%;transform:translate(-50%,-50%);background:#101a14;border:1px solid #3f7d4e;padding:12px 16px;font:12px Consolas,monospace;color:#b6ffab;z-index:5;cursor:pointer';
o.textContent='a smaller button was considered. it was denied.';stage.appendChild(o);
var kill=function(){if(o.parentNode)o.parentNode.removeChild(o)};o.onclick=kill;setTimeout(kill,2400)})();lg('tiny button report filed.');break;
case 15:blobLayer.innerHTML='';el.style.opacity='';el.style.zIndex='58';stage.style.filter='';st.gray=false;stage.style.background='';lg('visual reset. the void cleared its throat.');changeC(18);break;
case 16:lg(['audit complete: button remains button-shaped.','admin found no issues and three issues.','incident report submitted to nobody.','containment says yes. reality says maybe.','the button passed inspection by not moving for one second.'][Math.floor(Math.random()*5)]);break;
case 17:(function(){var old=stage.style.background;stage.style.background='#d8d8d0';btn.style.color='#111';btn.style.background='#eee';btn.style.borderColor='#888';
setTimeout(function(){if(!guiWins[id])return;stage.style.background=old;btn.style.color='';btn.style.background='';btn.style.borderColor=''},1500)})();lg('color inversion event.');break;
case 18:btn.textContent='#?!%&@';setTimeout(function(){if(guiWins[id]&&!st.breach&&!st.seized)btn.textContent='do thing'},800);lg('text malfunction.');break;
case 19:blobs(30,70);lg('memory leak detected. nobody is cleaning it.');break;
}}
function rareEv(k){bAch('myth');
switch(k){
case 30:(function(){var o=document.createElement('div');o.tabIndex=-1;
o.style.cssText='position:absolute;left:0;top:0;right:0;bottom:0;background:#05070a;color:#ff3b3b;font:13px Consolas,monospace;padding:16px;z-index:9;cursor:pointer';
o.innerHTML='BUTTON.EXE has stopped responding<br><br>Press any key to dismiss. (it finally listens.)<br><span style="color:#7fa587;font-size:10px">this crash is cosmetic. like all of them.</span>';
stage.appendChild(o);
var kd=function(){kill()};var kill=function(){if(o.parentNode)o.parentNode.removeChild(o);document.removeEventListener('keydown',kd)};
o.onclick=kill;document.addEventListener('keydown',kd);setTimeout(kill,5000)})();lg('RARE: fake crash window displayed.');break;
case 31:(function(){var n=0;var t=setInterval(function(){n++;if(n>18||!guiWins[id]){clearInterval(t);if(guiWins[id])el.style.transform='';return}
el.style.transform='translate('+(Math.random()*10-5)+'px,'+(Math.random()*10-5)+'px)'},28)})();lg('RARE: screen shake. hold on.');break;
case 32:st.gray=!st.gray;stage.style.filter=st.gray?'grayscale(1)':'';lg('RARE: grayscale event. the color left.');break;
case 33:setTitle('CORPORATE_INTERVENTION_DETECTED');statusEl.style.color='#ff5c5c';st.corp=Math.min(5,st.corp+1);st.corpLvl=Math.max(st.corpLvl,st.corp);changeC(25);
lg('RARE: corporate intervention. +25 containment, against your will.');
setTimeout(function(){if(!guiWins[id])return;statusEl.style.color='#cfe8d4';if(st.corp<2)setTitle('button containment')},1500);break;
case 34:(function(){var g=document.createElement('div');
g.style.cssText='position:absolute;left:40px;top:34px;width:'+btn.offsetWidth+'px;height:'+btn.offsetHeight+'px;border:1px solid #6a9a76;background:#173826;color:#b6ffab;font:bold 14px Consolas,monospace;opacity:.85;z-index:6;pointer-events:none';
g.textContent='do thing';stage.appendChild(g);setTimeout(function(){if(g.parentNode)g.parentNode.removeChild(g)},2200)})();lg('RARE: duplicate button illusion. do not both-press.');break;
case 35:btn.textContent='do not click me again';btn.style.color='#ff5c5c';lg('RARE: the button remembers.');break;
case 36:(function(){var last=btn.textContent;btn.style.display='none';
var o=document.createElement('div');
o.style.cssText='position:absolute;left:0;top:0;right:0;bottom:0;background:rgba(5,7,10,.94);color:#b6ffab;font:14px Consolas,monospace;display:flex;align-items:center;justify-content:center;text-align:center;z-index:9;padding:12px';
o.textContent='BUTTON HAS ESCAPED - last seen "'+last+'"';stage.appendChild(o);
lg('RARE: ButtonEscape executed. the button is at large.');bAch('escaped');
setTimeout(function(){if(!guiWins[id])return;if(o.parentNode)o.parentNode.removeChild(o);btn.style.display='';centerBtn()},3200)})();break;
}}
function selEv(n){var out=[];
for(var i=0;i<n;i++){
if(Math.random()<0.02){out.push(30+Math.floor(Math.random()*7));continue}
var x=Math.floor(Math.random()*20);
if(st.mood==='suspicious')x=Math.min(x,12);
else if(st.mood==='angry')x=Math.max(x,8);
if(st.corp>=3&&x>=12)x=Math.floor(Math.random()*12);
out.push(x)}
return out}
function resist(){var ch=0.15;
if(st.mood==='suspicious')ch=0.4;
else if(st.mood==='angry')ch=0.05;
return Math.random()<ch}
function doResist(){var k=Math.floor(Math.random()*4);
if(k===0){centerBtn();lg('button forced back to center.')}
else if(k===1){btn.textContent=['no.','refused.','nope','...','never','you first'][Math.floor(Math.random()*6)];lg('button refused to be pressed.')}
else if(k===2){changeC(8);lg('resistance increased its own containment.')}
else lg('action ignored.')}
function moodUpd(){var now=Date.now();
if(now-st.mt<8000)st.mood='suspicious';
else if(now-st.mt<15000)st.mood='annoyed';
else st.mood='calm';
if(st.mood==='suspicious'&&Math.random()<0.005)st.mood='angry'}
function moodClick(){st.mt=Date.now();
if(st.clicks%20===0)st.mood=Math.random()<0.1?'angry':(st.mood==='panicked'?'calm':'panicked')}
function corpTick(){var prev=st.corp;
if(st.mood==='angry'||st.mood==='suspicious')st.corpLvl=Math.min(5,st.corpLvl+0.5);
else if(st.clicks%15===0&&st.clicks>0)st.corpLvl=Math.max(0,st.corpLvl-0.5);
st.corp=Math.floor(st.corpLvl);
if(st.corp!==prev){lg('corporate status: '+corpNames[st.corp]+'.');
if(st.corp>=2)setTitle('[CORP WARNING] button containment');
if(st.corp===5)bAch('lockdown');
if(st.corp<2&&prev>=2)setTitle('button containment')}}
function idleTick(){if(st.breach||st.seized)return;
if(Math.random()<0.25){setTitle(titles[Math.floor(Math.random()*titles.length)]);
statusEl.textContent=Math.random()<0.5?'the button is thinking.':'the button is pretending not to think.';
setTimeout(function(){if(guiWins[id])stStatus()},1600)}}
btn.onclick=function(){var now=Date.now();
st.clicks++;moodClick();
if(now-st.clickT<400)st.corpLvl=Math.min(5,st.corpLvl+1);
st.clickT=now;
if(st.seized){st.rel++;if(st.rel>=10)exitSeized();stStatus();return}
if(resist()){doResist();moodUpd();stStatus();return}
var n=1;if(st.c===0)n=5;if(st.mood==='panicked')n+=1;
var evs=selEv(n);
for(var i=0;i<evs.length;i++){var e=evs[i];
if(e<30)changeC(Math.floor(Math.random()*20)-12);
try{if(e<30)normEv(e);else rareEv(e)}catch(err){}
if(st.seized)break}
moodUpd();stStatus()};
lg('button containment initiated. containment 50%.');
lg('reminder: you are the only incident so far.');
lg('the button is watching your cursor.');
setTitle('button containment');
centerBtn();stStatus();
setTimeout(function(){if(guiWins[id])centerBtn()},80);
var tIdle=setInterval(function(){if(!guiWins[id]){clearInterval(tIdle);clearInterval(tCorp);btnGameId=null;return}idleTick()},2100);
var tCorp=setInterval(function(){if(!guiWins[id]){clearInterval(tCorp);btnGameId=null;return}moodUpd();corpTick();stStatus()},1500);
}

var SHIFT_CH=[
{t:'the lobby',pay:2,task:'sweep',intro:[['obj','new hire. dont expect a welcome.'],['obj','first job: the lobby has debris. mountains of it. it grows back every night. thats not a metaphor, thats maintenance.'],['obj','click the junk until it isnt there. try not to click yourself.']],outro:[['obj','acceptable. the mop likes you. the mop doesnt like anyone.'],['obj','next job is on the board. dont read into the fact that it knows your name.']]},
{t:'reroute the grid',pay:3,task:'simon',intro:[['jbo','the grid is out of SEQUENCE. i am flashing the cells.'],['jbo','repeat it exactly. DO NOT IMPROVISE. improvisation is how rod four died.'],['jbo','three rounds. they get longer. GLOVES OFF. (there are no gloves.)']],outro:[['jbo','SEQUENCE HELD. you may touch the grid again. supervised.']]},
{t:'restart the beat',pay:3,task:'beat',intro:[['core','i slowed. there is a difference and im upset you have to see it.'],['core','when the marker crosses my beat, press. space or the pad. six steady beats and i restart.'],['core','missing is fine. i have a whole building of missing.']],outro:[['core','steady. thank you. the building feels that.']]},
{t:'blueprint check',pay:3,task:'blue',intro:[['jbo','BLUEPRINT AUDIT. five sheets. one wrong cell each.'],['jbo','i put it there on PURPOSE. i was bored and you needed a test.'],['jbo','find them all. the printer is watching.']],outro:[['jbo','you have EYES. noted. the sheet survives another night.']]},
{t:'paperwork',pay:4,task:'forms',intro:[['obj','fourteen forms. sign them. the clerk closes in nine minutes and i am not negotiating with a clerk.'],['obj','one already has a signature on it. its not yours. sign it anyway or dont.'],['obj','im not your supervisor. im the text.']],outro:[['obj','signed, filed, archived. if anyone asks, you signed everything.']]},
{t:'inventory',pay:3,task:'count',intro:[['void','inventory. the void counts what the building hides.'],['void','count the squares. then the circles. then the triangles. the geometry remembers.'],['void','the clock is not yours. accuracy is the only kindness.']],outro:[['void','counts accepted. the void counts your breaths.']]},
{t:'the flicker',pay:3,task:'flicker',intro:[['core','the lobby light. it flickers, and when it goes dark i am not always in the room.'],['core','stabilize it: press the pad while it is dark. twelve times.'],['core','i will be in the reactor. do not let the dark win. it is very patient.']],outro:[['core','the light holds. so do i. mostly.']]},
{t:'the file',pay:4,task:'type',intro:[['core','i lost a file. small one. nothing-shaped.'],['jbo','THE NAME IS ON THE CARD. type it exactly. CASE SENSITIVE. this building runs on spite and case sensitivity.'],['nothingcore','...i already have that one. it was fine when i left it. >:'],['core','you did not. you cannot file something that isnt there.'],['nothingcore','not with that attitude.']],outro:[['core','it opened. it was empty.'],['nothingcore','...yep. filed it. >:']]},
{t:'second sweep',pay:3,task:'sweep2',intro:[['obj','lobby again. i know.'],['obj','and no, it does not stay clean. thats the job. its also, technically, the name of the job.'],['nothingcore','...i can get that. i can just—'],['obj','you were never here.']],outro:[['nothingcore','...did you do that? >:'],['obj','lobby is clean. you are clean. this feels wrong. moving on.']]},
{t:'roster audit',pay:3,task:'roster',intro:[['jbo','NIGHT ROSTER. the top list is OFFICIAL. blueprint office.'],['jbo','bottom list is what the TERMINAL logged tonight. reconcile them.'],['jbo','click the name that should not be getting PAID.']],outro:[['jbo','roster reconciled. one extra name. IT HAPPENS.'],['jbo','(it does not happen.)']]},
{t:'complaint',pay:4,task:'mail',intro:[['void','a complaint is filed against cube# building management.'],['void','it is from the void. the void is always filing.'],['void','draft a reply. choose carefully. the void keeps receipts. the receipts are also void.']],outro:[['void','reply accepted. complaint withdrawn. mostly.']]},
{t:'last shift',pay:10,task:'finale',intro:[['obj','last job of the shift. ten beats, seven rounds of grid, seventy sweep.'],['obj','then the building gets signed off and you go be someone else for a while.'],['core','we will be here. thats sort of the whole arrangement.']],outro:[['core','beat steady.'],['jbo','GRID HELD.'],['obj','lobby clean, papers everywhere, three signatures i did not ask for. good shift, new hire.'],['nothingcore','...i was already clocked out. thanks for the shift. >:'],['void','the void acknowledges your hours. clock out.'],['obj','the building will invent new work tomorrow. it always does.']]}
];
var SHIFT_COL={obj:'#64ffa0',jbo:'#7ab7ff',core:'#ff9db8',nothingcore:'#ff3c78',void:'#c3a6ff',cube:'#ffd166'};
var SH_NOLI=["the sun is so far away, that its rays are parallel when they reach the earth.","N-O-L-I ... N-O-L-I","there was a time i ruled the skies, covered in shades of blue","monochromatic, purely dramatic as hue","there was a time i lost everything, cause everything's overdue","and due to my power i owned and devoured yours too","and so, if the oasis calls me back, i guess i'll turn my back towards the sun","let my crown be your own ID, and my face your own disguise","cause the world is bound to know ... N-O-L-I","N-O-L-I ... N-O-L-I","there was a time i ruled the world, covered in cultists' laws","ever so frantic, but oh so romantic to cause","there was a time i had it all, i think it's coming back","ever so slowly, while reaching the goalie i'd lost","and so, if the oasis tries to fall, i'm sure i will sit idly through it all","let my crown be yours so kindly, and my timely manner, done","cause the world is bound to go, as you and i","yes, the world is bound to know ... N-O-L-I"];
var SH_NOLI_T=[4,17,26,36,46,56,66,88,100,112,118,128,140,150,160,176,182,197];
var noliIv=null,noliLi=-1,noliEl=null,noliAudio=null,noliVIdx=0,noliBase=-1,noliLastOn=0,noliWasLow=false,noliPeak=0;
function noliWaveCss(){if(document.getElementById('noliWaveCss'))return;var st=document.createElement('style');st.id='noliWaveCss';st.textContent='@keyframes noliwave{0%,100%{transform:translateY(0)}50%{transform:translateY(-5px)}}';document.head.appendChild(st)}
function noliRender(line){if(!noliEl)return;while(noliEl.firstChild)noliEl.removeChild(noliEl.firstChild);var words=line.split(' ');for(var w=0;w<words.length;w++){if(w>0)noliEl.appendChild(document.createTextNode(' '));var ws=document.createElement('span');ws.style.cssText='display:inline-block;white-space:nowrap';var wd=words[w];for(var i=0;i<wd.length;i++){var s=document.createElement('span');s.textContent=wd.charAt(i);s.style.cssText='display:inline-block;animation:noliwave 1.6s ease-in-out infinite;animation-delay:'+((w*8+i)*0.07).toFixed(2)+'s';ws.appendChild(s)}noliEl.appendChild(ws)}}
function noliVoiceLevel(){try{if(typeof audioAnalyser==='undefined'||!audioAnalyser||typeof audioData==='undefined'||!audioData)return -1;audioAnalyser.getByteFrequencyData(audioData);var s=0,mx=0,v=0;for(var i=2;i<=20;i++){v=audioData[i]||0;s+=v;if(v>mx)mx=v}var mean=s/19;noliPeak=mean>2?mx/mean:0;return s/19/255}catch(e){return -1}}
function noliTick(){if(!noliEl)return;var t=0;try{t=(noliAudio&&noliAudio.currentTime)||0}catch(e){}try{var dur=(noliAudio&&noliAudio.duration)||226;if(t>=dur-3&&t>30){try{localStorage.setItem('cube_noli_full','1')}catch(e){}try{ach('noli_full')}catch(e){}}}catch(e){}var tidx=0;for(var i=0;i<SH_NOLI_T.length;i++){if(SH_NOLI_T[i]<=t+2)tidx=i}var now=Date.now();var lvl=noliVoiceLevel();if(lvl>=0){if(noliBase<0)noliBase=lvl;else noliBase+=(lvl-noliBase)*0.03;if(lvl<noliBase*1.2)noliWasLow=true;if(noliWasLow&&lvl>0.14&&lvl>noliBase*2.0&&noliPeak>2.5&&(now-noliLastOn)>7000&&noliVIdx<SH_NOLI.length-1){var nt2=0;try{nt2=(noliAudio&&noliAudio.currentTime)||0}catch(e){}if(SH_NOLI_T[noliVIdx+1]<=nt2+8){noliVIdx++;noliLastOn=now}noliWasLow=false}}var idx=Math.min(Math.max(noliVIdx,tidx),tidx+1);if(idx!==noliLi){noliLi=idx;noliRender(SH_NOLI[idx])}}
function noliStart(parent,audio){noliStop();if(!parent)return;noliWaveCss();noliAudio=audio||null;noliLi=-1;noliVIdx=0;noliBase=-1;noliLastOn=0;noliWasLow=false;noliEl=document.createElement('div');var fixed=(parent===document.body);noliEl.style.cssText='position:'+(fixed?'fixed':'absolute')+';left:50%;transform:translateX(-50%);top:62%;max-width:92vw;font:30px Consolas,monospace;text-align:center;color:#fff;opacity:.9;letter-spacing:2px;text-shadow:0 2px 10px #000,0 0 26px rgba(0,0,0,.9);z-index:'+(fixed?'90000':'5')+';pointer-events:none;line-height:1.6';parent.appendChild(noliEl);try{noliGray(true)}catch(e){}noliTick();noliIv=setInterval(noliTick,1000)}
var noliGrayEl=null;
function noliGray(on){try{if(on){if(!noliGrayEl){noliGrayEl=document.createElement('div');noliGrayEl.style.cssText='position:fixed;top:0;left:0;right:0;bottom:0;backdrop-filter:grayscale(1);-webkit-backdrop-filter:grayscale(1);pointer-events:none;z-index:95000;opacity:0;transition:opacity 1.2s';document.body.appendChild(noliGrayEl);void noliGrayEl.offsetHeight}noliGrayEl.style.opacity='1'}else if(noliGrayEl){noliGrayEl.style.opacity='0'}}catch(e){}}
function noliStop(){if(noliIv){clearInterval(noliIv);noliIv=null}if(noliEl&&noliEl.parentNode){noliEl.parentNode.removeChild(noliEl)}noliEl=null;noliAudio=null;try{noliGray(false)}catch(e){}}
function shNoliStart(){if(!shRoot||!shBgm)return;noliStart(shRoot,shBgm)}
function shNoliStop(){noliStop()}
function noliLyricStart(audio){noliStart(document.body,audio||null)}
function noliLyricStop(){noliStop()}
function noliUnlocked(){try{return localStorage.getItem('cube_noli_full')==='1'}catch(e){return false}}var shift={ch:1,slips:0};
var shRoot=null,$shStage=null,$shDlg=null,$shSpk=null,$shTxt=null,$shSub=null,$shHud=null,shSkipB=null;
var shMode='menu',shTimers=[],shDlgS=null,shBeatPress=null,shCur=0,shBgm=null,shBgmMuted=false,shWasBgm=false,shBgmPlayIdx=0,shBgmPlayList=['vestige.mp3','coffee.mp3'],shBgmSrc=null;
function shT(fn,ms){var t=setTimeout(fn,ms);shTimers.push(t);return t}
function shI(fn,ms){var t=setInterval(fn,ms);shTimers.push(t);return t}
function shClearTimers(){for(var i=0;i<shTimers.length;i++){clearTimeout(shTimers[i]);clearInterval(shTimers[i])}shTimers=[]}
function shD(parent,cls,txt){var e=document.createElement('div');if(cls)e.className=cls;if(txt!=null)e.textContent=txt;parent.appendChild(e);return e}
function shBtn(parent,txt,fn){var b=document.createElement('button');b.className='sh-btn';b.textContent=txt;b.onclick=function(ev){ev.stopPropagation();fn()};parent.appendChild(b);return b}
function shConfirmBtn(parent,txt,fn){var armed=false;var b=shBtn(parent,txt,function(){if(!armed){armed=true;b.textContent='CLICK AGAIN TO CONFIRM';shT(function(){if(b){armed=false;b.textContent=txt}},3000)}else{armed=false;b.textContent=txt;fn()}});return b}
function shAch(k){try{localStorage.setItem('cube_shift_'+k,'1')}catch(e){}try{ach('shift_'+k)}catch(e){}}
function shLoad(){shift.ch=parseInt(localStorage.getItem('cube_shift_ch')||'1',10);shift.slips=parseInt(localStorage.getItem('cube_shift_slips')||'0',10);if(isNaN(shift.ch)||shift.ch<1)shift.ch=1;if(isNaN(shift.slips)||shift.slips<0)shift.slips=0}
function shSave(){try{localStorage.setItem('cube_shift_ch',String(shift.ch));localStorage.setItem('cube_shift_slips',String(shift.slips))}catch(e){}}
function shHud(){$shHud.textContent='PAY '+shift.slips+'   JOBS '+Math.min(11,Math.max(0,shift.ch-1))+'/12'}
function shBuild(){
if(shRoot)return;
shRoot=document.createElement('div');shRoot.id='shiftRoot';
var st=document.createElement('style');
st.textContent='#shiftRoot{position:fixed;left:0;top:0;right:0;bottom:0;z-index:90100;background:radial-gradient(ellipse at 50% 15%,#0d1220 0%,#07080f 60%,#04050a 100%);display:none;flex-direction:column;color:#cdd7ff;font-family:Consolas,"Courier New",monospace;user-select:none}'+
'#shiftRoot.on{display:flex}'+
'.sh-wrap{width:min(920px,94vw);margin:0 auto;display:flex;flex-direction:column;height:100%}'+
'.sh-head{display:flex;align-items:center;gap:14px;padding:14px 4px 10px;border-bottom:1px solid #1d2440}'+
'.sh-logo{font-size:17px;letter-spacing:5px;color:#8fa8ff;text-shadow:0 0 12px rgba(120,150,255,.45)}'+
'.sh-sub{font-size:10px;letter-spacing:2px;color:#5a6490;flex:1}'+
'.sh-hud{font-size:11px;color:#9ae6b4;letter-spacing:1px}'+
'.sh-x{cursor:pointer;color:#667;border:1px solid #2a3150;width:24px;height:24px;text-align:center;line-height:21px;font-size:13px}'+
'.sh-x:hover{color:#f66;border-color:#833}'+
'.sh-main{flex:1;display:flex;flex-direction:column;padding:12px 4px 14px;gap:10px;min-height:0}'+
'.sh-stage{flex:1;min-height:310px;position:relative;border:1px solid #1d2440;background:rgba(8,10,18,.7);border-radius:6px;overflow:hidden}'+
'.sh-dlg{border:1px solid #26305a;background:linear-gradient(180deg,rgba(12,14,26,.96),rgba(8,9,16,.96));padding:11px 14px;min-height:96px;cursor:pointer;border-radius:6px}'+
'.sh-spk{font-size:11.5px;letter-spacing:2.5px;margin-bottom:6px}'+
'.sh-txt{font-size:13.5px;line-height:1.55;color:#dfe6ff;min-height:46px}'+
'.sh-btn{background:#131a30;color:#bfd0ff;border:1px solid #2b3a6a;padding:8px 16px;font:12px Consolas,monospace;letter-spacing:1px;cursor:pointer;border-radius:4px;margin:3px}'+
'.sh-btn:hover{background:#1d2a4e;border-color:#4a63b0}'+
'.sh-btn:disabled{opacity:.35;cursor:default}'+
'.sh-menu{position:absolute;left:0;top:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:10px}'+
'.sh-big{font-size:30px;letter-spacing:12px;color:#9fb4ff;text-shadow:0 0 22px rgba(120,150,255,.55)}'+
'.sh-tag{font-size:10.5px;letter-spacing:4px;color:#5a6490;margin-bottom:16px}'+
'.sh-stat{font-size:11px;color:#7fa587;letter-spacing:1px}'+
'.sh-hudline{position:absolute;left:10px;top:8px;font-size:12px;letter-spacing:1px;color:#9ae6b4;z-index:3}'+
'.sh-status{position:absolute;left:10px;bottom:8px;font-size:11.5px;color:#8fa8ff;letter-spacing:.5px;z-index:3}'+
'.sh-debris{position:absolute;cursor:pointer;transition:transform .18s,opacity .18s;border-radius:2px;opacity:.9}'+
'.sh-debris:hover{filter:brightness(1.5)}'+
'.sh-cell{width:74px;height:74px;background:#0f1526;border:1px solid #243054;font:22px Consolas,monospace;color:#5a76c8;cursor:pointer;border-radius:4px;margin:3px}'+
'.sh-cell.on{background:#ffe27a;color:#201a00;border-color:#ffd76a}'+
'.sh-cell.ok{background:#2b6a3f;color:#b6ffab;border-color:#4d9d67}'+
'.sh-cell.bad{background:#6a2b2b;color:#ffb6b6;border-color:#9d4d4d}'+
'.sh-bar{position:relative;height:52px;background:#0c1120;border:1px solid #1f2b4a;border-radius:5px;margin:14px 16px 6px;overflow:hidden}'+
'.sh-zone{position:absolute;top:0;bottom:0;left:38%;width:24%;background:rgba(100,255,160,.14);border-left:1px solid rgba(100,255,160,.4);border-right:1px solid rgba(100,255,160,.4)}'+
'.sh-mark{position:absolute;top:4px;bottom:4px;width:4px;background:#fff;left:0;box-shadow:0 0 8px #fff;border-radius:2px}'+
'.sh-bar.hit{background:rgba(60,160,90,.3)}'+
'.sh-bar.miss{background:rgba(160,60,60,.3)}'+
'.sh-pad{position:absolute;left:50%;transform:translateX(-50%);bottom:14px;font-size:15px;letter-spacing:3px;padding:12px 34px}'+
'.sh-grid7{display:grid;grid-template-columns:repeat(7,1fr);gap:4px;padding:14px}'+
'.sh-bcell{background:#0f1526;border:1px solid #1e2a4a;color:#6f8fd8;font:18px Consolas,monospace;text-align:center;padding:9px 0;cursor:pointer;border-radius:3px}'+
'.sh-bcell:hover{border-color:#3f5a9e}'+
'.sh-bcell.ok{background:#1d4a2e;color:#b6ffab}'+
'.sh-bcell.bad{background:#4a1d1d;color:#ffb6b6}'+
'.sh-form{display:flex;align-items:center;gap:10px;border:1px solid #1e2a4a;background:rgba(12,15,28,.8);margin:7px 16px;padding:9px 12px;border-radius:4px}'+
'.sh-ftitle{flex:1;font-size:12px;color:#cdd7ff}'+
'.sh-fsig{font-size:11px;color:#7fa587;width:130px;letter-spacing:1px}'+
'.sh-fsig.n{color:#c3a6ff}'+
'.sh-fdone{font-size:11px;letter-spacing:1px;color:#64ffa0;width:110px}'+
'.sh-fdone.r{color:#7ab7ff}'+
'.sh-fdone.x{color:#ff6b6b}'+
'.sh-shake{animation:shsh .3s}'+
'@keyframes shsh{0%,100%{transform:translateX(0)}25%{transform:translateX(-7px)}75%{transform:translateX(7px)}}'+
'.sh-q{position:absolute;left:0;top:0;right:0;padding:12px 14px;font-size:13px;color:#cdd7ff;letter-spacing:1px;text-align:center;background:rgba(8,10,18,.85);border-bottom:1px solid #1d2440;z-index:4}'+
'.sh-pile{position:absolute;left:0;top:44px;right:0;bottom:0}'+
'.sh-shape{position:absolute}'+
'.sh-shape.sq{border-radius:3px}'+
'.sh-shape.ci{border-radius:50%}'+
'.sh-lamp{position:absolute;left:50%;top:70px;transform:translateX(-50%);width:230px;height:96px;background:#171a14;border:1px solid #2a2f22;border-radius:6px;transition:all .12s}'+
'.sh-lamp.on{background:#f5efc0;box-shadow:0 0 60px 18px rgba(255,244,170,.55);border-color:#fff}'+
'.sh-card{position:absolute;left:50%;top:44%;transform:translate(-50%,-50%);background:#101a14;border:1px solid #3f7d4e;padding:16px 26px;font:15px Consolas,monospace;color:#b6ffab;letter-spacing:2px;border-radius:5px}'+
'.sh-inp{position:absolute;left:50%;top:58%;transform:translateX(-50%);width:300px;background:#0a0e18;border:1px solid #2b3a6a;color:#dfe6ff;font:15px Consolas,monospace;padding:9px 11px;outline:none;border-radius:4px}'+
'.sh-inp.bad{border-color:#9d4d4d;animation:shsh .3s}'+
'.sh-rlist{margin:10px 16px;border:1px solid #1e2a4a;background:rgba(12,15,28,.7);border-radius:5px;padding:8px 12px}'+
'.sh-rlabel{font-size:10px;letter-spacing:2px;color:#5a6490;margin-bottom:5px}'+
'.sh-item{display:inline-block;font-size:12.5px;border:1px solid #243054;background:#0f1526;margin:3px 5px 3px 0;padding:5px 11px;border-radius:3px;cursor:pointer;letter-spacing:1px}'+
'.sh-item:hover{border-color:#4a63b0}'+
'.sh-item.dead{opacity:.4;text-decoration:line-through;border-color:#9d4d4d;color:#ff9db8}'+
'.sh-compl{position:absolute;left:50%;top:46%;transform:translate(-50%,-50%);width:74%;background:#120f1c;border:1px solid #3a2f5a;padding:16px 20px;font-size:12.5px;line-height:1.6;color:#d6c9ff;border-radius:5px}'+
'.sh-opts{position:absolute;left:50%;top:76%;transform:translateX(-50%);width:74%;text-align:center}'+
'.sh-opts .sh-btn{display:block;width:100%;text-align:left;margin:5px 0}'+
'.sh-done{position:absolute;left:0;top:0;right:0;bottom:0;display:flex;flex-direction:column;align-items:center;justify-content:center;gap:8px}'+
'.sh-donet{font-size:22px;letter-spacing:8px;color:#64ffa0;text-shadow:0 0 18px rgba(100,255,160,.45)}'+
'.sh-note{position:absolute;right:10px;top:8px;font-size:11px;color:#9aa0b8;letter-spacing:1px;z-index:3}';
document.head.appendChild(st);
shRoot.innerHTML='<div class="sh-wrap"><div class="sh-head"><div class="sh-logo">CUBE SHIFT</div><div class="sh-sub" id="shSub">night operations -- cube# building</div><div class="sh-hud" id="shHud"></div><div class="sh-x" id="shMus" title="music">&#9835;</div><div class="sh-x" id="shX" title="clock out (esc)">&#215;</div></div><div class="sh-main"><div class="sh-stage" id="shStage"></div><div class="sh-dlg" id="shDlg"><div class="sh-spk" id="shSpk"></div><div class="sh-txt" id="shTxt"></div></div></div></div>';
document.body.appendChild(shRoot);
$shStage=shRoot.querySelector('#shStage');$shDlg=shRoot.querySelector('#shDlg');$shSpk=shRoot.querySelector('#shSpk');$shTxt=shRoot.querySelector('#shTxt');$shSub=shRoot.querySelector('#shSub');$shHud=shRoot.querySelector('#shHud');
shRoot.querySelector('#shX').onclick=shClose;
try{shBgmMuted=localStorage.getItem('cube_shift_mute')==='1'}catch(e){}
try{shBgm=new Audio('vestige.mp3');shBgm.loop=false;shBgm.volume=0.4;shBgmPlayIdx=0;shBgmPlayList=['vestige.mp3','coffee.mp3'];shBgm.onended=function(){try{shNoliStop();shBgmPlayIdx=(shBgmPlayIdx+1)%shBgmPlayList.length;shBgm.src=shBgmPlayList[shBgmPlayIdx];function shBgmGo(){try{if(shBgm&&String(shBgm.src).indexOf('noli.webm')!==-1)shNoliStart();else shNoliStop()}catch(e){}if(!shBgmMuted&&shRoot.classList.contains('on'))shBgm.play().catch(function(){})}shBgmGo()}catch(e){}}}catch(e){shBgm=null}
var $mus=shRoot.querySelector('#shMus');
function musUpd(){$mus.textContent=shBgmMuted?'\u266a\u0338':'\u266a';$mus.style.opacity=shBgmMuted?'.4':'1'}
$mus.onclick=function(){shBgmMuted=!shBgmMuted;try{localStorage.setItem('cube_shift_mute',shBgmMuted?'1':'0')}catch(e){}musUpd();
if(shBgm){if(shBgmMuted||!shRoot.classList.contains('on'))shBgm.pause();else shBgm.play().catch(function(){})}};
musUpd();
$shDlg.onclick=function(){if(shMode==='dlg')shDlgNext()};
document.addEventListener('keydown',function(e){
if(!shRoot||!shRoot.classList.contains('on'))return;
if(e.key==='Escape'){shClose();return}
if(e.target&&(e.target.tagName==='INPUT'))return;
if(e.key===' '||e.key==='Enter'){
if(shMode==='dlg'){e.preventDefault();shDlgNext()}
else if(shMode==='task'&&shBeatPress){e.preventDefault();shBeatPress()}}
});
}
function shOpen(){shBuild();shLoad();var wasOpen=shRoot.classList.contains('on');shRoot.classList.add('on');
if(!wasOpen){
try{shWasBgm=(typeof bgm!=='undefined'&&bgm&&!bgm.paused)}catch(e){shWasBgm=false}
try{if(typeof bgm!=='undefined'&&bgm)bgm.pause()}catch(e){}
if(shBgm&&!shBgmMuted)shBgm.play().catch(function(){});
}
try{if(typeof termField!=='undefined'&&termField)termField.blur()}catch(e){}try{if((typeof audioCtx==='undefined'||!audioCtx)&&typeof initAudio!=='undefined')initAudio();if(!shBgmSrc&&typeof audioCtx!=='undefined'&&audioCtx&&typeof audioAnalyser!=='undefined'&&audioAnalyser&&shBgm){shBgmSrc=audioCtx.createMediaElementSource(shBgm);shBgmSrc.connect(audioAnalyser)}}catch(e){}shMenu();try{if(shBgm&&shBgm.src.indexOf('noli')>=0)shNoliStart()}catch(e){}}
function shClose(){if(!shRoot)return;
if(shRoot.classList.contains('on')){
if(shBgm)shBgm.pause();
try{if(shWasBgm&&typeof bgm!=='undefined'&&bgm){var bp=bgm.play();if(bp&&bp.catch)bp.catch(function(){})}}catch(e){}
shWasBgm=false;
}
shRoot.classList.remove('on');shClearTimers();shMode='menu';shDlgS=null;shBeatPress=null;try{shNoliStop()}catch(e){}}
function shMenu(){
shClearTimers();shMode='menu';shDlgS=null;shBeatPress=null;
try{if(shSkipB&&shSkipB.parentNode)shSkipB.parentNode.removeChild(shSkipB)}catch(e){}shSkipB=null;
$shStage.innerHTML='';$shDlg.style.display='none';$shSub.textContent='night operations -- cube# building';shHud();
var m=shD($shStage,'sh-menu');
shD(m,'sh-big','CUBE SHIFT');
shD(m,'sh-tag','twelve jobs. five coworkers. one that does not exist.');
shD(m,'sh-stat','jobs done: '+Math.min(12,Math.max(0,shift.ch-1))+'/12   pay slips: '+shift.slips);
if(shift.ch<=12){
shBtn(m,'CONTINUE -- shift '+shift.ch,function(){runChapter(shift.ch)})
}else{
shD(m,'sh-stat','all twelve shifts done. the building misses you already.');
shConfirmBtn(m,'REWIND THE SHIFT',function(){try{localStorage.removeItem('cube_shift_ch');localStorage.removeItem('cube_shift_slips')}catch(e){}shLoad();shMenu()})
}
if(shift.ch<=12)shConfirmBtn(m,'REWIND THE SHIFT',function(){try{localStorage.removeItem('cube_shift_ch');localStorage.removeItem('cube_shift_slips')}catch(e){}shLoad();shMenu()});;
}
function shSay(lines,cb){
shDlgS={lines:lines,i:0,cb:cb,timer:null};shMode='dlg';$shDlg.style.display='block';shLineShow();
}
function shLineShow(){
var L=shDlgS.lines[shDlgS.i];
$shSpk.textContent=L[0].toUpperCase();
$shSpk.style.color=SHIFT_COL[L[0]]||'#cdd7ff';
$shTxt.textContent='';
var n=0,full=L[1];
shDlgS.timer=shI(function(){n++;$shTxt.textContent=full.slice(0,n)+(n<full.length?'_':'');if(n>=full.length){clearInterval(shDlgS.timer);shDlgS.timer=null;$shTxt.textContent=full}},17);
}
function shDlgNext(){
if(!shDlgS)return;
if(shDlgS.timer){clearInterval(shDlgS.timer);shDlgS.timer=null;$shTxt.textContent=shDlgS.lines[shDlgS.i][1];return}
shDlgS.i++;
if(shDlgS.i>=shDlgS.lines.length){var cb=shDlgS.cb;shDlgS=null;cb&&cb()}
else shLineShow();
}
function runChapter(n){
shClearTimers();shCur=n;
var c=SHIFT_CH[n-1];
if(!c){shMenu();return}
$shStage.innerHTML='';$shDlg.style.display='none';
$shSub.textContent='CH '+n+'/12 -- '+c.t.toUpperCase();shHud();
shSay(c.intro,function(){
shMode='task';$shDlg.style.display='none';
shRunTask(c.task,$shStage,function(){shTaskEnd(c,n)});
});
}
function shTaskEnd(c,n){
shift.slips+=c.pay;
shift.ch=Math.max(shift.ch,n+1);
shSave();shHud();
try{if(n===1)ach('shift_first')}catch(e){}
try{if(n===12)ach('shift_all')}catch(e){}
try{if(shift.slips>=10)ach('shift_slips10')}catch(e){}
try{if(shift.slips>=25)ach('shift_slips25')}catch(e){}
shSay(c.outro,function(){
shMode='result';$shDlg.style.display='none';
$shStage.innerHTML='';
var d=shD($shStage,'sh-done');
shD(d,'sh-donet','JOB COMPLETE');
shD(d,'sh-stat','+'+c.pay+' pay slips   --   pay total: '+shift.slips);
var row=shD(d,'sh-stat');
if(n<12)shBtn(row,'NEXT JOB -- shift '+(n+1),function(){runChapter(n+1)});
shBtn(row,'MENU',shMenu);
});
}
function shRunTask(name,stage,done){
stage.innerHTML='';
var called=false;
try{if(shRoot){shSkipB=document.createElement('button');shSkipB.className='sh-btn';shSkipB.textContent='SKIP JOB (coward)';shSkipB.style.cssText='position:fixed;bottom:18px;right:18px;z-index:90060;opacity:0.75';shSkipB.onclick=function(){once()};shRoot.appendChild(shSkipB)}}catch(e){}
var once=function(){if(called)return;called=true;try{if(shSkipB&&shSkipB.parentNode)shSkipB.parentNode.removeChild(shSkipB)}catch(e){}shSkipB=null;done()};
try{
if(name==='sweep')shT_sweep(stage,once,45,40);
else if(name==='sweep2')shT_sweep(stage,once,38,32);
else if(name==='simon')shT_simon(stage,once,[3,4,5]);
else if(name==='beat')shT_beat(stage,once,6);
else if(name==='blue')shT_blue(stage,once,5);
else if(name==='forms')shT_forms(stage,once);
else if(name==='count')shT_count(stage,once);
else if(name==='flicker')shT_flicker(stage,once,12);
else if(name==='type')shT_type(stage,once);
else if(name==='roster')shT_roster(stage,once);
else if(name==='mail')shT_mail(stage,once);
else if(name==='finale')shT_beat(stage,function(){stage.innerHTML='';called=false;shT_simon(stage,function(){stage.innerHTML='';called=false;shT_sweep(stage,once,30,25)},[5,7])},10);
}catch(e){cubePrint('shift task error: '+e.message);once()}
}
function shT_sweep(stage,done,n,wave2){
var left=n,spawned2=false,fin=false;
function finish(){if(fin)return;fin=true;shT(done,550)}
var hud=shD(stage,'sh-hudline','DEBRIS LEFT: '+n);
var note=wave2?null:shD(stage,'sh-note','shift note: the lobby is not on a cleaning schedule. it is on a hunger.');
function spawn(count){
for(var i=0;i<count;i++)(function(){
var d=document.createElement('div');d.className='sh-debris';
d.style.left=(5+Math.random()*86)+'%';d.style.top=(6+Math.random()*76)+'%';
d.style.width=(10+Math.random()*22)+'px';d.style.height=(8+Math.random()*16)+'px';
d.style.background=['#3a4468','#4a3a68','#3a6850','#685a3a','#565668'][Math.floor(Math.random()*5)];
d.onclick=function(){if(d._dead||!d.parentNode)return;d._dead=1;d.style.transform='scale(0)';d.style.opacity='0';
shT(function(){if(d.parentNode)d.parentNode.removeChild(d)},220);
left--;hud.textContent='DEBRIS LEFT: '+Math.max(0,left);
if(left<=0){
if(wave2>0&&!spawned2){spawned2=true;left=wave2;hud.textContent='DEBRIS LEFT: '+wave2;
if(note)note.textContent='nothingcore: ...it was already clean when i got here. >:';
spawn(wave2)}
else{hud.textContent='LOBBY: CLEAR';finish()}}
};
stage.appendChild(d)})()}
spawn(n);
}
function shT_simon(stage,done,rounds){
var hud=shD(stage,'sh-hudline','ROUND 1/'+rounds.length+' -- WATCH');
var stat=shD(stage,'sh-status','cells coming online...');
var grid=shD(stage,'');
grid.style.cssText='display:grid;grid-template-columns:repeat(3,74px);justify-content:center;position:absolute;left:0;top:40px;right:0';
var cells=[];
for(var i=0;i<9;i++){(function(k){var c=document.createElement('button');c.className='sh-cell';c.onclick=function(){pick(k)};grid.appendChild(c);cells[k]=c})(i)}
var r=0,seq=[],pos=0,inPos=0,accept=false;
function newRound(){
seq=[];var used={};
while(seq.length<rounds[r]){var x=Math.floor(Math.random()*9);if(!used[x]){used[x]=1;seq.push(x)}}
pos=0;inPos=0;accept=false;
hud.textContent='ROUND '+(r+1)+'/'+rounds.length+' -- WATCH';stat.textContent='watch the cells.';
shT(flash,600);
}
function flash(){
if(pos>=seq.length){accept=true;stat.textContent='your turn.';return}
var c=cells[seq[pos]];c.classList.add('on');
shT(function(){c.classList.remove('on');shT(function(){pos++;flash()},130)},330);
}
function pick(k){
if(!accept)return;
if(k===seq[inPos]){var c=cells[k];c.classList.add('ok');shT(function(){c.classList.remove('ok')},260);
inPos++;
if(inPos>=seq.length){accept=false;hud.textContent='ROUND '+(r+1)+' OK';
r++;
if(r>=rounds.length){stat.textContent='grid stable. power routed.';shT(done,600)}
else shT(newRound,750)}
else stat.textContent=seq.length-inPos+' more.';
}else{accept=false;stat.textContent='sequence corrupted. rerun.';
var c2=cells[k];c2.classList.add('bad');shT(function(){c2.classList.remove('bad')},400);shT(newRound,950)}
}
newRound();
}
function shT_beat(stage,done,need){
var stat=shD(stage,'sh-status','BEATS 0/'+need+' -- press when the marker crosses the green');
var bar=shD(stage,'sh-bar');
shD(bar,'sh-zone');var mark=shD(bar,'sh-mark');
var pad=shBtn(stage,'BEAT  [space]',press);
pad.className='sh-btn sh-pad';
var pos=0,dir=1,hits=0,miss=0,live=true;
var iv=null;
function press(){
if(!live)return;
if(pos>=38&&pos<=62){
hits++;bar.classList.add('hit');shT(function(){bar.classList.remove('hit')},180);
if(hits===3&&miss===0)shAch('perfect');
stat.textContent='BEATS '+hits+'/'+need+(miss?'   misses: '+miss:'   perfect line');
if(hits>=need){live=false;if(iv)clearInterval(iv);shBeatPress=null;
stat.textContent='beat restored.';shT(done,550)}
}else{miss++;bar.classList.add('miss');shT(function(){bar.classList.remove('miss')},220);
stat.textContent='off beat. ('+hits+'/'+need+', misses: '+miss+')'}
}
shBeatPress=press;
iv=shI(function(){pos+=dir*2.6;if(pos>=100){pos=100;dir=-1}if(pos<=0){pos=0;dir=1}mark.style.left=pos+'%'},18);
}
function shT_blue(stage,done,need){
if(!need)need=1;
var finds=0,misses=0,cells=[];
var wrong=-1;
var stat=shD(stage,'sh-status','find the cell that does not belong. 0/'+need);
var grid=shD(stage,'sh-grid7');
function paint(){
for(var q=0;q<35;q++){cells[q].textContent=(q===wrong)?'\u25c7':'\u25c6'}
}
function pickNew(){
var k,tries=0;
do{k=Math.floor(Math.random()*35);tries++}while(cells[k]._found&&tries<200);
wrong=k;paint();
}
for(var i=0;i<35;i++){
(function(k){
var c=shD(grid,'sh-bcell','\u25c6');cells[k]=c;
c.onclick=function(){
if(c._found){return}
if(k===wrong){
c.classList.add('ok');c._found=1;finds++;
if(finds>=need){stat.textContent='found '+finds+'/'+need+'. sheet signed off.';shT(done,550)}
else{pickNew();stat.textContent='found '+finds+'/'+need+'. next sheet. misses: '+misses}
}else{
misses++;c.classList.add('bad');stat.textContent='not that one. '+finds+'/'+need+' found, misses: '+misses;shT(function(){c.classList.remove('bad')},450)
}
};
})(i);
}
pickNew();
}function shT_forms(stage,done){
var stat=shD(stage,'sh-status','sign what is yours. reject what is not.');
var rows=[['form 27-B -- mop signoff','you'],['form 31 -- rod temperature log','you'],['form 8-Q -- void visitation','you'],['form 0 -- intern stipend',null],['form 404 -- debris receipt','you'],['form 12 -- hallway hum report','you'],['form 33 -- spark incident log','you'],['form 77 -- graveyard key signout','you'],['form 19 -- broom requisition','you'],['form 55 -- window inventory','you'],['form 608 -- night noise complaint','you'],['form 41 -- coffee machine union card','you'],['form 9 -- basement temperature','you'],['form 707 -- you were never here','you']];
var total=rows.length,nc=Math.floor(Math.random()*total),doneN=0;
rows[nc][1]='nothingcore';
for(var i=0;i<rows.length;i++)(function(k){
var row=shD(stage,'sh-form');
shD(row,'sh-ftitle',rows[k][0]);
var sig=shD(row,'sh-fsig',(rows[k][1]==='nothingcore'?'signed: ':'signed: ')+(rows[k][1]||'?'));
if(rows[k][1]==='nothingcore')sig.className='sh-fsig n';
var out=null;
function hand(cls,txt){if(out)return;out=shD(row,'sh-fdone',txt);out.className='sh-done-r '+cls;out.style.cssText='font-size:11px;letter-spacing:1px;'+(cls==='r'?'color:#7ab7ff':cls==='x'?'color:#ff6b6b':'color:#64ffa0');doneN++;stat.textContent='handled: '+doneN+'/'+total;if(doneN>=total){stat.textContent='all forms processed.';shT(done,550)}}
shBtn(row,'SIGN',function(){
if(rows[k][1]==='nothingcore'){shAch('blind');hand('','FILED (NOT YOURS)');stat.textContent='signed anyway. the clerk did not look up. handled: '+doneN+'/'+total}
else hand('','FILED');
});
shBtn(row,'REJECT',function(){
if(rows[k][1]==='nothingcore'){hand('r','RETURNED');}
else{row.classList.add('sh-shake');stat.textContent='that one is yours. sign it instead.';shT(function(){row.classList.remove('sh-shake')},350)}
});
})(i)
}
function shT_count(stage,done){
var qs=[{k:'sq',label:'how many squares?',ans:5},{k:'ci',label:'how many circles?',ans:7},{k:'tr',label:'how many triangles?',ans:4},{k:'all',label:'how many shapes total?',ans:16},{k:'sq',label:'squares again. they moved. how many?',ans:5},{k:'corners',label:'how many shapes have corners?',ans:9},{k:'sum',label:'circles plus triangles?',ans:11},{k:'diff',label:'how many more circles than squares?',ans:2}];
var pile=shD(stage,'sh-pile');
var defs=[['sq',5,'#4a6fd8'],['ci',7,'#d87a4a'],['tr',4,'#56c98a']];
for(var a=0;a<defs.length;a++)for(var b=0;b<defs[a][1];b++){
var s=document.createElement('div');s.className='sh-shape '+defs[a][0];
var sz=14+Math.random()*18;
s.style.cssText='left:'+(4+Math.random()*88)+'%;top:'+(4+Math.random()*84)+'%;width:'+sz+'px;height:'+sz+'px;background:'+defs[a][2]+';opacity:.9'+(defs[a][0]==='tr'?';clip-path:polygon(50% 0,100% 100%,0 100%)':'');
pile.appendChild(s)}
var qi=0;
var q=shD(stage,'sh-q',qs[0].label);
var opts=shD(stage,'');
opts.style.cssText='position:absolute;left:0;right:0;bottom:26px;text-align:center';
var stat=shD(stage,'sh-status','eight counts. the void is taking notes.');
function buildOpts(){
opts.innerHTML='';
var o=[qs[qi].ans,qs[qi].ans+1,qs[qi].ans+2];
if(o[0]>0)o.push(o[0]-1);
o.sort(function(){return Math.random()-0.5});
for(var i=0;i<o.length;i++)(function(v){shBtn(opts,String(v),function(){
if(qi>=qs.length)return;
if(v===qs[qi].ans){qi++;
if(qi>=qs.length){stat.textContent='counts filed.';shT(done,550)}
else{q.textContent=qs[qi].label;buildOpts();stat.textContent=qi+'/'+qs.length+' correct.'}
}else{stat.textContent='void: recount.';opts.classList.add('sh-shake');shT(function(){opts.classList.remove('sh-shake')},350)}
})})(o[i])}
buildOpts();
}
function shT_flicker(stage,done,need){
if(!need)need=4;
var stat=shD(stage,'sh-status','press STABILIZE while the lamp is dark. 0/'+need);
var lamp=shD(stage,'sh-lamp');
var pad=shBtn(stage,'STABILIZE',press);
pad.style.cssText='position:absolute;left:50%;transform:translateX(-50%);bottom:46px';
pad.disabled=true;
var hits=0,live=true,curT=null;
function cycle(){
if(!live)return;
curT=shT(function(){
lamp.classList.add('on');pad.disabled=true;
curT=shT(function(){lamp.classList.remove('on');pad.disabled=false;cycle()},420+Math.random()*800);
},550+Math.random()*950);
}
function press(){
if(!live||pad.disabled)return;
if(curT){clearTimeout(curT);curT=null}
lamp.classList.remove('on');pad.disabled=true;hits++;
stat.textContent='stabilized. '+hits+'/'+need;
if(hits>=need){live=false;stat.textContent='lamp locked. the dark lost.';shT(done,550)}
else cycle();
}
shT(function(){cycle()},700);
}
function shT_type(stage,done){
var files=['nothing.null','void.log','lobby.sweep','core.beat'];
var fi=0;
var stat=shD(stage,'sh-status','type it exactly. enter to open. case. sensitive.');
var card=shD(stage,'sh-card','FILE ('+(fi+1)+'/'+files.length+'): '+files[fi]);
var inp=document.createElement('input');inp.className='sh-inp';inp.spellcheck=false;inp.placeholder='filename';
stage.appendChild(inp);
shMode='task';
inp.focus();
inp.onkeydown=function(e){
e.stopPropagation();
if(e.key!=='Enter')return;
if(inp.value===files[fi]){
fi++;
if(fi>=files.length){inp.disabled=true;stat.textContent='all files opened. contents: (empty).';shT(done,650)}
else{card.textContent='FILE ('+(fi+1)+'/'+files.length+'): '+files[fi];inp.value='';stat.textContent='file '+fi+' accepted. next.'}
}else{inp.classList.add('bad');stat.textContent='wrong name. the void does not do partial matches.';inp.value='';shT(function(){inp.classList.remove('bad')},400)}
};
}
function shT_roster(stage,done){
var stat=null;
var off=['obj','jbo','core','void','unit 7','mop','spark','rod four','bin 7'];
var ghosts=['nothingcore','nothingcore','nothingcore'];
var round=0;
function buildRound(){
stage.innerHTML='';
stat=shD(stage,'sh-status','reconcile the lists. click the name that should not be paid. round '+(round+1)+'/3');
var a=shD(stage,'sh-rlist');shD(a,'sh-rlabel','BLUEPRINT OFFICE -- OFFICIAL');
for(var i=0;i<off.length;i++){var it=shD(a,'sh-item',off[i]);it.style.cursor='default'}
var crew=off.concat([ghosts[round]]);
for(var j=crew.length-1;j>0;j--){var k=Math.floor(Math.random()*(j+1));var tmp=crew[j];crew[j]=crew[k];crew[k]=tmp}
var b=shD(stage,'sh-rlist');shD(b,'sh-rlabel','TERMINAL LOG -- TONIGHT');
for(var m=0;m<crew.length;m++)(function(name){var it=shD(b,'sh-item',name);
it.onclick=function(){
if(name==='nothingcore'){it.classList.add('dead');if(round===0)shAch('ghost');round++;
if(round>=3){stat.textContent='caught three times. roster reconciled.';shT(done,750)}
else{stat.textContent='caught. next log. '+(round)+'/3.';shT(buildRound,900)}
}else{it.classList.add('sh-shake');stat.textContent='jbo: not that one. look again.';shT(function(){it.classList.remove('sh-shake')},350)}
}})(crew[m]);
}
buildRound();
}
function shT_mail(stage,done){
var qi=0;
var threads=[
{c:'<b style="color:#c3a6ff">FORMAL COMPLAINT -- filed by: the void</b><br><br>'+
'to cube# building management: your <b>light</b> has been on for what the void considers a consecutive streak. your <b>heartbeat</b> is audible through the walls of nothing. your night hire keeps <b>sweeping</b> things the void was planning to borrow.<br><br>demand: immediate improvement. response required. the void does not say please because the void has never once needed to.',
opts:[['it was the button. it is always the button.',false],['cube# accepts full blame. the lights stay on. no questions.',true],['have you tried not being the void?',false]],
wrong:['void: noted. with emphasis.','void: the emphasis has emphasis. try again.','void: the void will accept a written apology, badly spelled.']},
{c:'<b style="color:#c3a6ff">SUPPLEMENT 2 -- filed by: the void</b><br><br>'+
'your reply has been logged. the void reviewed it. the void has questions: who is <b>sweeping</b> after hours? why does the <b>heartbeat</b> skip when the east hall lights dim? and what, precisely, is being stored on floor <b>7</b>?<br><br>response required. again.',
opts:[['floor 7 is storage for things we do not name.',false],['there is no floor 7. the building skips it. like you.',true],['it is where we keep the answers. do not open it.',false]],
wrong:['void: floor 7 knows what it did.','void: deflection noted. try again.','void: the building skips nothing. try again.']},
{c:'<b style="color:#c3a6ff">FINAL NOTICE -- filed by: the void</b><br><br>'+
'this is the voids final notice. the complaints have been escalated to the void, who is also the recipient. the void demands a commitment: the <b>light</b> stays, the <b>heartbeat</b> is admitted to, and the <b>sweeping</b> stops when the void says stop. signed, the void, on behalf of the void.',
opts:[['we commit to nothing. file again.',false],['committed. the light stays. the heartbeat is ours. the sweeping pauses on request.',true],['the void can sweep. we will watch.',false]],
wrong:['void: commitment means nothing here. try again.','void: no. try again.','void: the void does not watch. try again.']}];
var stat=null;
var c=null,opts=null;
function build(){
stage.innerHTML='';
stat=shD(stage,'sh-status','draft the reply. '+(qi+1)+'/3');
c=shD(stage,'sh-compl');
c.innerHTML=threads[qi].c;
opts=shD(stage,'sh-opts');
var tries=0;
var answers=threads[qi].opts;
for(var i=0;i<answers.length;i++)(function(a){shBtn(opts,a[0],function(){
if(a[1]){if(qi===0)shAch('complaint');qi++;
if(qi>=threads.length){stat.textContent='all replies sent. complaints withdrawn.';shT(done,700)}
else{stat.textContent='reply sent. next complaint.';shT(build,700)}
}else{tries++;opts.classList.add('sh-shake');shT(function(){opts.classList.remove('sh-shake')},400);
var wm=threads[qi].wrong;stat.textContent=wm[Math.min(tries-1,wm.length-1)]}
})})(answers[i])}
build();
}

var flyRoot=null,$flyCanvas=null,$flyLog=null,$flyStats=null,flyCtx=null;
var flyData=null,flyLoading=false,flyQ=[],flyOn=false,flyRaf=0,flyBgT=0;
var flyH=null,flyInp=null,flyFire=null,flyW=null,flyInv=null;
var flyCR=null,flyCG=null,flyCB=null,flySX=null,flySY=null;
var flyGroups={},flySamples={};
var flyHold={light:false,dark:false},flyStrobe=false,flySimMs=0,flyHotMs=0,flySeizeCool=0;
var flyLastMs=0,flyFrac=0,flyMeanH=0,flyFedPending=false,flyFedAt=0,flyFedBase=0,flyFedTries=0,flyGustMs=0;
var flyBuzzOn=true,flyBuzz=null;
var flyLines=[],flyImg=null,flyR=null,flyG=null,flyB=null;
var flyFrameSkip=0,flyStatT=0;
var flyApple=null,flyAppleLoading=false,flyAppleFailed=false,flyAppleOn=false,flyAppleT0=0,flyEyePix=null,flySeized=0;
var FLYW=880,FLYH=540;
var FLY_LEAK=0.5,FLY_GAIN=0.45,FLY_BIAS=0.01,FLY_THETA=1.0,FLY_NOISE=0.006,FLY_DECAY=0.45,FLY_CLAMP=3;
var FLYPAL=[[70,90,110],[74,208,224],[195,166,255],[100,255,160],[122,183,255],[255,209,102],[255,157,184],[255,140,170],[154,160,184],[255,107,107],[224,160,255]];
function flyLog(txt){
if(!$flyLog)return;
var row=document.createElement('div');
var tg=document.createElement('span');tg.className='fx';tg.textContent='fly: ';
row.appendChild(tg);row.appendChild(document.createTextNode(txt));
$flyLog.appendChild(row);
while($flyLog.children.length>6)$flyLog.removeChild($flyLog.firstChild);
}
function flyLoadMsg(t){var el=flyRoot&&flyRoot.querySelector('#flyLoad');if(el)el.textContent=t}
function flyBuild(){
if(flyRoot)return;
flyRoot=document.createElement('div');flyRoot.id='flyRoot';
var st=document.createElement('style');
st.textContent='#flyRoot{position:fixed;left:0;top:0;right:0;bottom:0;z-index:90100;background:radial-gradient(ellipse at 50% 20%,#0a1410 0%,#060a08 55%,#030504 100%);display:none;flex-direction:column;color:#bfe8cf;font-family:Consolas,"Courier New",monospace;user-select:none}'+
'#flyRoot.on{display:flex}'+
'.fly-wrap{width:min(940px,96vw);margin:0 auto;display:flex;flex-direction:column;height:100%}'+
'.fly-head{display:flex;align-items:center;gap:14px;padding:13px 4px 9px;border-bottom:1px solid #17302a}'+
'.fly-logo{font-size:17px;letter-spacing:6px;color:#64ffa0;text-shadow:0 0 12px rgba(100,255,160,.5)}'+
'.fly-sub{font-size:10px;letter-spacing:2px;color:#4a7a66;flex:1}'+
'.fly-stats{font-size:10.5px;color:#7fd8a8;letter-spacing:.5px;text-align:right}'+
'.fly-x{cursor:pointer;color:#687;border:1px solid #234;width:24px;height:24px;text-align:center;line-height:21px;font-size:13px}'+
'.fly-x:hover{color:#f66;border-color:#833}'+
'.fly-stage{flex:1;min-height:0;position:relative;border:1px solid #17302a;background:#020604;border-radius:6px;overflow:hidden}'+
'#flyCanvas{position:absolute;left:0;top:0;width:100%;height:100%;display:none}'+
'#flyLoad{position:absolute;left:0;top:0;right:0;bottom:0;display:flex;align-items:center;justify-content:center;font-size:12.5px;letter-spacing:2px;color:#64ffa0;text-shadow:0 0 14px rgba(100,255,160,.4)}'+
'.fly-ctrl{display:flex;flex-wrap:wrap;gap:6px;padding:10px 4px 4px}'+
'.fly-btn{background:#0d1f18;color:#a9e8c6;border:1px solid #1f4a3a;padding:7px 13px;font:11.5px Consolas,monospace;letter-spacing:1.5px;cursor:pointer;border-radius:4px}'+
'.fly-btn:hover{background:#123125;border-color:#2e7a5c}'+
'.fly-btn:active{transform:translateY(1px)}'+
'.fly-btn.on{background:#1a5c3f;color:#dbffe9;border-color:#4affa0;box-shadow:0 0 12px rgba(74,255,160,.35)}'+
'.fly-btn.hot{border-color:#8a3a5a;color:#ff9db8}'+
'.fly-btn.hot.on{background:#4a1a2e;box-shadow:0 0 12px rgba(255,90,140,.45)}'+
'.fly-log{border-top:1px solid #17302a;min-height:78px;max-height:78px;overflow:hidden;padding:7px 6px;font-size:11.5px;line-height:1.55;color:#8fd8ae;background:rgba(4,10,8,.75)}'+
'.fly-log .fx{color:#4a7a66}'+
'.fly-hint{font-size:10px;letter-spacing:2px;color:#43665a;padding:5px 4px 12px}';
document.head.appendChild(st);
flyRoot.innerHTML='<div class="fly-wrap"><div class="fly-head"><div class="fly-logo">THE FLY</div><div class="fly-sub">fafb v783 -- drosophila melanogaster, actual wiring</div><div class="fly-stats" id="flyStats">neurons 139,255 &middot; synapses 2,700,513</div><div class="fly-x" id="flyBuzzT" title="buzz">&#9834;</div><div class="fly-x" id="flyX" title="leave the fly (esc)">&#215;</div></div><div class="fly-stage"><canvas id="flyCanvas" width="880" height="540"></canvas><div id="flyLoad">calling the fly...</div></div><div class="fly-ctrl" id="flyCtrl"></div><div class="fly-log" id="flyLog"></div><div class="fly-hint">light / dark / bad apple &middot; sugar / smell / wind / zap &middot; esc leaves</div></div>';
document.body.appendChild(flyRoot);
$flyCanvas=flyRoot.querySelector('#flyCanvas');flyCtx=$flyCanvas.getContext('2d');
$flyLog=flyRoot.querySelector('#flyLog');$flyStats=flyRoot.querySelector('#flyStats');
flyRoot.querySelector('#flyX').onclick=flyClose;
var fb=flyRoot.querySelector('#flyBuzzT');
fb.onclick=function(){flyBuzzOn=!flyBuzzOn;fb.style.opacity=flyBuzzOn?'1':'.4';flyBuzzSet(flyBuzzOn)};
var ctrl=flyRoot.querySelector('#flyCtrl');
function mk(label,name,cls){
var b=document.createElement('button');b.className='fly-btn'+(cls?' '+cls:'');b.textContent=label;
b.setAttribute('data-f',name);
b.onpointerdown=function(ev){ev.preventDefault();flyAct(name,true)};
b.onpointerup=function(){flyAct(name,false)};
b.onpointerleave=function(){flyAct(name,false)};
ctrl.appendChild(b);return b;
}
mk('LIGHT','light');mk('DARK','dark');mk('BAD APPLE','apple','hot');
mk('SUGAR','sugar');mk('SMELL','smell');mk('WIND','wind');mk('ZAP','zap','hot');mk('QUIET','quiet');
document.addEventListener('keydown',function(e){
if(!flyRoot||!flyRoot.classList.contains('on'))return;
if(e.key==='Escape'){flyClose()}
});
}
function flyBtnState(name,on){
var b=flyRoot&&flyRoot.querySelector('.fly-btn[data-f="'+name+'"]');
if(!b)return;
if(on)b.classList.add('on');else b.classList.remove('on');
}
function flyPulse(key,amt){
var g=flyGroups[key];if(!g)return;
for(var i=0;i<g.length;i++)flyInp[g[i]]+=amt;
}
function flyAct(name,down){
if(!flyData)return;
if(name==='light'){flyHold.light=!!down;flyBtnState('light',flyHold.light);return}
if(name==='dark'){flyHold.dark=!!down;flyBtnState('dark',flyHold.dark);return}
if(name==='apple'){
if(!down)return;
if(flyAppleFailed){flyStrobe=!flyStrobe;flyBtnState('apple',flyStrobe);if(flyStrobe)flyLog('strobe. the video never arrived.');return}
if(flyApple&&flyApple.ready){flyAppleOn=!flyAppleOn;flyStrobe=flyAppleOn;flyAppleT0=flySimMs;flyBtnState('apple',flyAppleOn);flyLog(flyAppleOn?'bad apple. the eye takes it from here.':'bad apple paused. the eye blinks.');return}
if(flyAppleLoading)return;
flyAppleLoading=true;
flyLog('fetching bad apple. hold.');
flyAppleLoad(function(){flyAppleLoading=false;flyAppleOn=true;flyStrobe=true;flyAppleT0=flySimMs;flyBtnState('apple',true);flyLog('bad apple loaded. 2,634 frames. the eye takes it from here.')});
return}
if(!down)return;
if(name==='sugar'){flyPulse('gust',1.3);flyGustMs=380;flyFedPending=true;flyFedTries=0;flyFedAt=flySimMs+1500;flyFedBase=flyMeanH;flyLog('sugar on the tarsi. waiting for the legs to vote.');return}
if(name==='smell'){flyPulse('olf',1.1);flyLog('antennae forward. something smells like a decision.');return}
if(name==='wind'){flyPulse('wind',1.2);flyLog('wind across the johnston. wings up.');return}
if(name==='zap'){flyPulse('desc',1.6);flyLog('descending fibers say now. the fly considers it.');return}
if(name==='quiet'){flyH.fill(0);flyStrobe=false;flyAppleOn=false;flyHold.light=false;flyHold.dark=false;flyHotMs=0;flyFedPending=false;flyBtnState('apple',false);flyBtnState('light',false);flyBtnState('dark',false);flyLog('everything settles. the fly forgets you for a second.');return}
}
function flyApplyInputs(){
var g,i,ph,bright;
if(flyHold.light){g=flyGroups.photo;for(i=0;i<g.length;i++)flyInp[g[i]]+=0.7}
if(flyHold.dark){g=flyGroups.photo;for(i=0;i<g.length;i++)flyInp[g[i]]-=0.75}
if(flyStrobe){
g=flyGroups.photo;
if(flyApple&&flyApple.ready&&flyAppleOn){
var fpi=1000/12;
var fi2=Math.floor((flySimMs-flyAppleT0)/fpi);
fi2=fi2%flyApple.n;if(fi2<0)fi2+=flyApple.n;
var fbase=fi2*3072,ab=flyApple.buf;
for(i=0;i<g.length;i++){var pg2=g[i];flyInp[pg2]+=(ab[fbase+(flyEyePix[pg2]||0)]/255-0.5)*2.2}
}else{ph=Math.floor(flySimMs/125)%4;bright=ph<2;for(i=0;i<g.length;i++)flyInp[g[i]]+=bright?1.15:-1.05}
}
if(flyGustMs>0){flyGustMs--;g=flyGroups.gust;for(i=0;i<g.length;i++)flyInp[g[i]]+=0.6}
}
function flySeize(){flySeized++;try{console.log('flySEIZE at simMs='+flySimMs+' frac='+flyFrac)}catch(e){}
flyStrobe=false;flyAppleOn=false;flyHold.light=false;flyHold.dark=false;flyBtnState('apple',false);flyBtnState('light',false);flyBtnState('dark',false);
flyHotMs=0;flySeizeCool=8000;
for(var i=0;i<flyData.n;i++)flyH[i]*=0.08;
try{localStorage.setItem('cube_fly_seizure','1')}catch(e){}
try{ach('fly_seizure')}catch(e){}
flyLog('past the flashing limit. the fly files a complaint.');
flyLog('everything goes quiet. it has to.');
try{cubeWarn('fly: overstimulation detected. forcing quiet.')}catch(e){}
}
function flyStep(){
if(!flyData)return 0;
var t0=(window.performance&&performance.now)?performance.now():Date.now();
flyApplyInputs();
var n=flyData.n,ind=flyData.ind,idx=flyData.idx,sg=flyData.sign,w=flyData.w,inv=flyData.inv,h=flyH,inp=flyInp,f=flyFire;
var total=0,sum=0,i,k,s,v,p;
for(i=0;i<n;i++){
s=0;
var k0=ind[i],k1=ind[i+1];
for(k=k0;k<k1;k++){p=idx[k];s+=sg[p]*w[k]*h[p]}
v=h[i]*FLY_LEAK+s*inv[i]*FLY_GAIN+FLY_BIAS+inp[i];
v+=(Math.random()-0.5)*FLY_NOISE;
if(v<0)v=0;else if(v>FLY_CLAMP)v=3;
h[i]=v;inp[i]*=FLY_DECAY;
if(v>=FLY_THETA){f[i]=1;total++}else f[i]=0;
sum+=v;
}
flyFrac=total/n;flyMeanH=sum/n;
flySimMs+=16.7;
if(flySeizeCool>0)flySeizeCool-=16.7;
if(flyStrobe&&flyFrac>0.07){flyHotMs+=16.7;if(flyHotMs>=800&&flySeizeCool<=0)flySeize()}else flyHotMs=Math.max(0,flyHotMs-8);
if(flyFedPending&&flySimMs>=flyFedAt){
var mo=flyGroups.moto,mm=0;
for(k=0;k<mo.length;k++)if(h[mo[k]]>mm)mm=h[mo[k]];
if(mm>=FLY_THETA||(flyMeanH>flyFedBase*1.25&&flyMeanH>0.015)){
flyFedPending=false;
try{localStorage.setItem('cube_fly_fed','1')}catch(e){}
try{ach('fly_fed')}catch(e){}
flyLog('sugar reaches the legs. the legs decide: yes.');
}else{flyFedTries++;if(flyFedTries>=4)flyFedPending=false;else flyFedAt=flySimMs+1500}
}
var t1=(window.performance&&performance.now)?performance.now():Date.now();
flyLastMs=t1-t0;
return total;
}
function flyStepN(k){var t=0;for(var i=0;i<k;i++)t=flyStep();return t}
function flyDraw(){
if(!flyData)return;
var W=FLYW,r=flyR,g=flyG,b=flyB,img=flyImg,d=flyData,n=d.n,h=flyH,f=flyFire,sx=flySX,sy=flySY;
var cr=flyCR,cg=flyCG,cb=flyCB,i,ln=r.length;
for(i=0;i<ln;i++){r[i]*=0.72;g[i]*=0.72;b[i]*=0.72}
for(i=0;i<n;i++){
var q=sy[i]*W+sx[i];
var v=f[i]?1.4:(0.1+(h[i]>1?0.16:h[i]*0.16));
r[q]+=cr[i]*v;g[q]+=cg[i]*v;b[q]+=cb[i]*v;
}
var px=img.data;
for(i=0;i<ln;i++){
var rr=r[i];if(rr>1)rr=1;
var gg=g[i];if(gg>1)gg=1;
var bb=b[i];if(bb>1)bb=1;
var o=i<<2;px[o]=rr*255;px[o+1]=gg*255;px[o+2]=bb*255;px[o+3]=255;
}
flyCtx.putImageData(img,0,0);
}
function flyStatUpd(){
if(!$flyStats)return;
$flyStats.textContent='139,255 neurons \u00b7 2,700,513 synapses \u00b7 firing '+(flyFrac*100).toFixed(2)+'% \u00b7 '+flyLastMs.toFixed(1)+' ms';
}
function flyLoop(){
if(!flyOn)return;
flyRaf=requestAnimationFrame(flyLoop);
flyStep();
flyDraw();
flyStatT++;
if(flyStatT%25===0)flyStatUpd();
}
function flyBuzzSet(on){
try{
if(on){
if(!flyBuzz){
var AC=window.AudioContext||window.webkitAudioContext;
if(!AC)return;
var ctx=new AC();
var o=ctx.createOscillator();o.type='sawtooth';o.frequency.value=166;
var g=ctx.createGain();g.gain.value=0.0001;
var lfo=ctx.createOscillator();lfo.type='sine';lfo.frequency.value=13;
var lg=ctx.createGain();lg.gain.value=0.011;
lfo.connect(lg);lg.connect(g.gain);
o.connect(g);g.connect(ctx.destination);
o.start();lfo.start();
flyBuzz={ctx:ctx,o:o,g:g,lfo:lfo};
}
flyBuzz.ctx.resume();
flyBuzz.g.gain.setTargetAtTime(0.03,flyBuzz.ctx.currentTime,0.5);
}else if(flyBuzz){flyBuzz.g.gain.setTargetAtTime(0.0001,flyBuzz.ctx.currentTime,0.2);var _bc=flyBuzz.ctx;setTimeout(function(){try{_bc.suspend()}catch(e){}},300)}
}catch(e){}
}
function flyClose(){
if(!flyRoot)return;
flyRoot.classList.remove('on');
flyOn=false;
try{cancelAnimationFrame(flyRaf)}catch(e){}
flyStrobe=false;flyAppleOn=false;flyHold.light=false;flyHold.dark=false;
flyBtnState('apple',false);flyBtnState('light',false);flyBtnState('dark',false);
flyBuzzSet(false);
}
function flyOpen(){
flyBuild();
if(!flyRoot.classList.contains('on'))flyRoot.classList.add('on');
try{if(typeof termField!=='undefined'&&termField)termField.blur()}catch(e){}
if(flyData){
if(!flyOn){flyOn=true;flyStatT=0;flyLoop()}
flyBuzzSet(flyBuzzOn);
return;
}
flyEnsure(function(){flyReady()});
}
function flyReady(){
flyOn=true;flyStatT=0;
var lc=flyRoot.querySelector('#flyLoad');
if(lc)lc.style.display='none';
$flyCanvas.style.display='block';
flyLog('139,255 neurons. the actual wiring.');
flyLog('press things. the fly will hold it against you.');
try{localStorage.setItem('cube_fly_open','1')}catch(e){}
try{ach('fly_open')}catch(e){}
flyBuzzSet(flyBuzzOn);
flyLoop();
if(!flyBgT)flyBgT=setInterval(function(){if(flyOn)return;flyStep()},250);
flyStatUpd();
window.FLYX={ready:true,n:flyData.n,e:flyData.e,step:flyStep,steps:flyStepN,choose:flyChooseLine,act:flyAct,frac:function(){return flyFrac},meanH:function(){return flyMeanH},ms:function(){return flyLastMs},simMs:function(){return flySimMs},hot:function(){return flyHotMs},h:flyH,pulse:flyPulse,groups:function(){return flyGroups},appleReady:function(){return !!(flyApple&&flyApple.ready)},appleOn:function(){return flyAppleOn},appleN:function(){return flyApple?flyApple.n:0},appleSeek:function(s){flyAppleT0=flySimMs-s*1000},seized:function(){return flySeized},strobe:function(){return flyStrobe}};
}
function flyChooseLine(){
if(!flyData||!flyLines.length)return null;
if(flyFrac<0.0005)return null;
var best=-1,bi=-1;
for(var i=0;i<flyLines.length;i++){
var a=flyLines[i].a,sc=0;
for(var j=0;j<a.length;j++)sc+=flyH[a[j]];
sc=sc/a.length+(Math.random()-0.5)*0.05;
if(sc>best){best=sc;bi=i}
}
if(best<0.05)return null;
return flyLines[bi].t;
}
function flyEnsure(cb){
if(flyData){if(cb)cb();return}
if(flyLoading){if(cb)flyQ.push(cb);return}
flyLoading=true;if(cb)flyQ.push(cb);
flyLoadMsg('reading flydata.js...');
var s=document.createElement('script');
s.src='flydata.js';
s.onload=function(){flyDecode()};
s.onerror=function(){flyLoading=false;flyLoadMsg('flydata.js not found next to cube.html.');try{cubeError('fly: flydata.js missing. the brain is elsewhere.')}catch(e){}};
document.head.appendChild(s);
}
function flyFail(e){
flyLoading=false;
flyLoadMsg('the brain did not fit through the wire: '+((e&&e.message)||e));
try{cubeError('fly: '+((e&&e.message)||e))}catch(e2){}
}
function flyAppleFail(e){
flyAppleFailed=true;flyAppleLoading=false;
flyLog('bad apple did not load. the strobe will do.');
try{cubeWarn('fly: '+((e&&e.message)||e))}catch(e2){}
}
function flyAppleLoad(cb){
var s=document.createElement('script');
s.src='flyapple.js';
s.onload=function(){
try{
var bin=atob(window.FLAB64);
var raw=new Uint8Array(bin.length);
for(var i=0;i<bin.length;i++)raw[i]=bin.charCodeAt(i);
if(typeof DecompressionStream==='undefined')throw new Error('no DecompressionStream');
var ds=new DecompressionStream('gzip');
new Response(new Blob([raw]).stream().pipeThrough(ds)).arrayBuffer().then(function(buf){
flyApple={buf:new Uint8Array(buf),n:Math.floor(buf.byteLength/3072),w:64,h:48,ready:true};
if(cb)cb();
}).catch(function(e){flyAppleFail(e)});
}catch(e){flyAppleFail(e)}
};
s.onerror=function(){flyAppleFail(new Error('flyapple.js missing'))};
document.head.appendChild(s);
}
function flyDecode(){
try{
flyLoadMsg('decoding base64...');
setTimeout(function(){
var bin;
try{bin=atob(window.FLB64)}catch(e){flyFail(e);return}
flyLoadMsg('inflating the brain...');
setTimeout(function(){
var raw=new Uint8Array(bin.length);
for(var i=0;i<bin.length;i++)raw[i]=bin.charCodeAt(i);
if(typeof DecompressionStream==='undefined'){flyFail(new Error('needs DecompressionStream (current chrome/edge)'));return}
var ds=new DecompressionStream('gzip');
var wr=new Blob([raw]).stream().pipeThrough(ds);
new Response(wr).arrayBuffer().then(function(buf){
try{
flyLoadMsg('wiring synapses...');
flyParse(buf);
flyLoading=false;
var q=flyQ;flyQ=[];
for(var i=0;i<q.length;i++)q[i]();
}catch(e){flyFail(e)}
}).catch(function(e){flyFail(e)});
},30);
},30);
}catch(e){flyFail(e)}
}
function flyParse(buf){
var dv=new DataView(buf);
if(dv.getUint8(0)!==70||dv.getUint8(1)!==76||dv.getUint8(2)!==89||dv.getUint8(3)!==66)throw new Error('bad brain format');
var n=dv.getUint32(8,true),e=dv.getUint32(12,true);
var posEnd=16+12*n;
var clsOff=posEnd,grpOff=clsOff+n,signOff=grpOff+n,indOff=signOff+n;
var idxOff=indOff+4*(n+1),synOff=idxOff+4*e,total=synOff+2*e;
if(total!==buf.byteLength)throw new Error('brain truncated ('+total+' vs '+buf.byteLength+')');
var pos=new Float32Array(buf.slice(16,posEnd));
var cls=new Uint8Array(buf,clsOff,n);
var grp=new Uint8Array(buf,grpOff,n);
var sign=new Int8Array(buf,signOff,n);
var ind=new Uint32Array(buf.slice(indOff,idxOff));
var idx=new Uint32Array(buf.slice(idxOff,synOff));
var syn=new Uint16Array(buf.slice(synOff,total));
var w=new Float32Array(e);
for(var k=0;k<e;k++)w[k]=Math.log(1+syn[k]);
var inv=new Float32Array(n);
for(var i=0;i<n;i++){var sw=0;var kb0=ind[i],kb1=ind[i+1];for(var kb=kb0;kb<kb1;kb++)sw+=w[kb];inv[i]=sw?1/sw:0}
flyData={n:n,e:e,pos:pos,cls:cls,grp:grp,sign:sign,ind:ind,idx:idx,syn:syn,w:w,inv:inv};
flyH=new Float32Array(n);
flyInp=new Float32Array(n);
flyFire=new Uint8Array(n);
flyR=new Float32Array(FLYW*FLYH);
flyG=new Float32Array(FLYW*FLYH);
flyB=new Float32Array(FLYW*FLYH);
flyImg=flyCtx.createImageData(FLYW,FLYH);
var pools={photo:[],gust:[],olf:[],wind:[],desc:[],moto:[],optic:[],central:[],sensory:[]};
for(i=0;i<n;i++){
if(grp[i]===1)pools.photo.push(i);
else if(grp[i]===2)pools.gust.push(i);
else if(grp[i]===3)pools.olf.push(i);
else if(grp[i]===5)pools.wind.push(i);
if(cls[i]===1)pools.optic.push(i);
else if(cls[i]===2)pools.central.push(i);
else if(cls[i]===3)pools.sensory.push(i);
else if(cls[i]===6)pools.desc.push(i);
else if(cls[i]===9)pools.moto.push(i);
}
flyGroups={};
for(var key in pools)flyGroups[key]=pools[key].length?pools[key]:[0];
flySamples={};
for(key in pools){
var pl=pools[key];
if(!pl.length){flySamples[key]=new Int32Array(1);flySamples[key][0]=0;continue}
var take=Math.min(96,pl.length);
var out=new Int32Array(take);
var used={};
for(k=0;k<take;k++){
var pick=pl[Math.floor(Math.random()*pl.length)];
var guard=0;
while(used[pick]&&guard<20){pick=pl[Math.floor(Math.random()*pl.length)];guard++}
used[pick]=1;out[k]=pick;
}
flySamples[key]=out;
}
flyEyePix=new Int32Array(n);
(function(){
var pgs=flyGroups.photo;
if(!pgs||!pgs.length)return;
var mid=0,py0=1e12,py1=-1e12;
for(var q=0;q<pgs.length;q++){var yy=pos[pgs[q]*3+1];if(yy<py0)py0=yy;if(yy>py1)py1=yy}
mid=(py0+py1)/2;
var lo=[],hi=[];
for(q=0;q<pgs.length;q++){if(pos[pgs[q]*3+1]<mid)lo.push(pgs[q]);else hi.push(pgs[q])}
var sets=[lo,hi];
for(var s2=0;s2<2;s2++){
var set=sets[s2];if(!set.length)continue;
var ax0=1e12,ax1=-1e12,ay0=1e12,ay1=-1e12;
for(q=0;q<set.length;q++){var xx=pos[set[q]*3],yy2=pos[set[q]*3+1];if(xx<ax0)ax0=xx;if(xx>ax1)ax1=xx;if(yy2<ay0)ay0=yy2;if(yy2>ay1)ay1=yy2}
var dx=(ax1-ax0)||1,dy=(ay1-ay0)||1;
for(q=0;q<set.length;q++){
var ni2=set[q];
var fx=Math.floor((pos[ni2*3]-ax0)/dx*63);if(fx<0)fx=0;if(fx>63)fx=63;
var fy=Math.floor((pos[ni2*3+1]-ay0)/dy*47);if(fy<0)fy=0;if(fy>47)fy=47;
flyEyePix[ni2]=fy*64+fx;
}
}
})();
var minx=1e12,miny=1e12,maxx=-1e12,maxy=-1e12,minz=1e12,maxz=-1e12;
for(i=0;i<n;i++){
var x=pos[i*3],y=pos[i*3+1],z=pos[i*3+2];
if(x<minx)minx=x;if(x>maxx)maxx=x;
if(y<miny)miny=y;if(y>maxy)maxy=y;
if(z<minz)minz=z;if(z>maxz)maxz=z;
}
var mg=12;
var sc=Math.min((FLYW-mg*2)/(maxx-minx),(FLYH-mg*2)/(maxy-miny));
var ox=(FLYW-(maxx-minx)*sc)/2,oy=(FLYH-(maxy-miny)*sc)/2;
flySX=new Uint16Array(n);flySY=new Uint16Array(n);
flyCR=new Float32Array(n);flyCG=new Float32Array(n);flyCB=new Float32Array(n);
var zr=(maxz-minz)||1;
for(i=0;i<n;i++){
var px=Math.round((pos[i*3]-minx)*sc+ox),py=Math.round((pos[i*3+1]-miny)*sc+oy);
if(px<0)px=0;if(px>=FLYW)px=FLYW-1;
if(py<0)py=0;if(py>=FLYH)py=FLYH-1;
flySX[i]=px;flySY[i]=py;
var pal=FLYPAL[cls[i]]||FLYPAL[0];
var dep=0.55+0.45*((pos[i*3+2]-minz)/zr);
flyCR[i]=pal[0]/255*dep;flyCG[i]=pal[1]/255*dep;flyCB[i]=pal[2]/255*dep;
}
flyLines=[
{t:'the light again. the light again. the light again.',k:'photo'},
{t:'i can see you. all the ommatidia agree.',k:'photo'},
{t:'do not strobe me. i am not a screen.',k:'photo'},
{t:'sugar. the legs know before i do.',k:'gust'},
{t:'sweet on the tarsi. filing it under yes.',k:'gust'},
{t:'something smells like yesterday.',k:'olf'},
{t:'the antennae vote. the vote is mostly yes.',k:'olf'},
{t:'wind. wings up. decision pending.',k:'wind'},
{t:'johnston organ says something moved.',k:'wind'},
{t:'the escape command fired. the wings are discussing it.',k:'desc'},
{t:'jumping. in spirit. mostly.',k:'desc'},
{t:'2,700,513 connections. zero opinions.',k:'central'},
{t:'one of these neurons is thinking about you. i forget which.',k:'central'},
{t:'optic lobe says: still there.',k:'optic'},
{t:'a wing beat is a decision i already made.',k:'moto'},
{t:'i was mapped in full. i let them. it was interesting.',k:'central'},
{t:'the void counts neurons now. i count the void.',k:'central'}
];
for(i=0;i<flyLines.length;i++)flyLines[i].a=flySamples[flyLines[i].k]||flySamples.central;
}
