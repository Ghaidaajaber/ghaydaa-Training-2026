/* Procedural anatomical-style 3D heart model: no external model download needed. */
function makeHeart(THREE){
 const group=new THREE.Group(), flesh=new THREE.MeshStandardMaterial({color:0xa95459,roughness:.82,metalness:0}), dark=new THREE.MeshStandardMaterial({color:0x843942,roughness:.9}), artery=new THREE.MeshStandardMaterial({color:0x99505b,roughness:.72,side:THREE.DoubleSide}), vein=new THREE.MeshStandardMaterial({color:0x665c82,roughness:.8});
 function blob(x,y,z,sx,sy,sz,mat=flesh){const m=new THREE.Mesh(new THREE.SphereGeometry(1,32,24),mat);m.position.set(x,y,z);m.scale.set(sx,sy,sz);group.add(m);return m}
 // Chambers and tapered lower ventricle
 blob(-.25,-.1,0,.73,.95,.53);blob(.32,-.13,-.04,.62,.88,.53);blob(-.38,.62,-.02,.4,.48,.42,dark);blob(.4,.61,0,.39,.42,.41,flesh);
 const cone=new THREE.Mesh(new THREE.ConeGeometry(.59,1.15,32),flesh);cone.rotation.z=Math.PI+.17;cone.position.set(.03,-.89,.01);group.add(cone);
 function tube(points,r,mat){const curve=new THREE.CatmullRomCurve3(points.map(p=>new THREE.Vector3(...p)));const mesh=new THREE.Mesh(new THREE.TubeGeometry(curve,70,r,10,false),mat);group.add(mesh)}
 tube([[-.18,.64,.02],[-.28,1.12,.02],[-.16,1.45,0],[.17,1.59,0],[.43,1.43,.04],[.46,1.11,.08]],.16,artery);
 tube([[.4,.55,.02],[.65,.98,.02],[.85,1.2,.04],[.94,1.45,.08]],.13,vein);
 tube([[-.53,.52,.3],[-.78,.85,.33],[-.88,1.12,.32]],.11,artery);
 tube([[.05,.95,.35],[.12,1.23,.42],[.31,1.37,.37]],.1,vein);
 // Surface vessels
 for(let i=0;i<9;i++){let x=-.5+i*.115;tube([[x,.3,.51],[x+.07,-.04,.53],[x+.13,-.35,.49],[x+.18,-.62,.34]],.012+i%3*.004,i%3===0?vein:dark)}
 group.rotation.z=-.12;group.scale.setScalar(.87);return group;
}
