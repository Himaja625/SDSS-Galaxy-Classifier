document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("galaxy-page")) return;

  const canvas = document.createElement("canvas");
  document.body.appendChild(canvas);

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(60, innerWidth/innerHeight, 0.1, 1000);
  camera.position.z = 60;

  const renderer = new THREE.WebGLRenderer({ canvas, alpha:true });
  renderer.setSize(innerWidth, innerHeight);

  const geo = new THREE.BufferGeometry();
  const stars = [];
  for(let i=0;i<3500;i++){
    stars.push((Math.random()-0.5)*1000,(Math.random()-0.5)*1000,(Math.random()-0.5)*1000);
  }
  geo.setAttribute("position",new THREE.Float32BufferAttribute(stars,3));

  const field = new THREE.Points(geo,new THREE.PointsMaterial({color:0xffffff,size:1}));
  scene.add(field);

  function animate(){
    requestAnimationFrame(animate);
    field.rotation.y += 0.0004;
    renderer.render(scene,camera);
  }
  animate();
});