document.addEventListener("DOMContentLoaded", () => {
  if (!document.body.classList.contains("home-page")) return;

  const canvas = document.getElementById("universe");
  if (!canvas || !window.THREE) return;

  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(60, innerWidth / innerHeight, 0.1, 2000);
  camera.position.set(0, 10, 45);

  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: true });
  renderer.setSize(innerWidth, innerHeight);
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));

  scene.add(new THREE.AmbientLight(0xffffff, 0.4));
  const sunLight = new THREE.PointLight(0xfff2cc, 2.4, 600);
  scene.add(sunLight);

  /* Stars */
  const starGeo = new THREE.BufferGeometry();
  const starPos = [];
  for (let i = 0; i < 3000; i++) {
    starPos.push((Math.random()-0.5)*1200,(Math.random()-0.5)*1200,(Math.random()-0.5)*1200);
  }
  starGeo.setAttribute("position", new THREE.Float32BufferAttribute(starPos,3));
  const stars = new THREE.Points(starGeo,new THREE.PointsMaterial({color:0xffffff,size:1}));
  scene.add(stars);

  /* Sun */
  const sun = new THREE.Mesh(
    new THREE.SphereGeometry(4,64,64),
    new THREE.MeshStandardMaterial({ emissive: 0xffc84a, emissiveIntensity: 1.4 })
  );
  scene.add(sun);

  /* Planets */
  const planetData = [
    [0.6,0xaaaaaa,8,0.03],
    [0.9,0xe3b86f,11,0.022],
    [1.0,0x2f80ff,14,0.018],
    [0.8,0xff5533,17,0.015],
    [2.6,0xffd27f,23,0.01],
    [2.3,0xe6c28b,30,0.008],
    [1.9,0x7fffd4,37,0.006],
    [1.7,0x5dade2,44,0.005]
  ];

  const planets = [];
  planetData.forEach(p=>{
    const mesh = new THREE.Mesh(
      new THREE.SphereGeometry(p[0],64,64),
      new THREE.MeshStandardMaterial({
        color:p[1],
        emissive:new THREE.Color(p[1]).multiplyScalar(0.15)
      })
    );
    mesh.userData={angle:Math.random()*10,dist:p[2],speed:p[3]};
    planets.push(mesh);
    scene.add(mesh);
  });

  function animate(){
    requestAnimationFrame(animate);
    stars.rotation.y += 0.00025;
    planets.forEach(p=>{
      p.userData.angle += p.userData.speed;
      p.position.x=Math.cos(p.userData.angle)*p.userData.dist;
      p.position.z=Math.sin(p.userData.angle)*p.userData.dist;
    });
    renderer.render(scene,camera);
  }
  animate();
});