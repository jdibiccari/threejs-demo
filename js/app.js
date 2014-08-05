//Combination of the following tuts:
//http://blog.teamtreehouse.com/the-beginners-guide-to-three-js
//http://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene
//http://code.tutsplus.com/tutorials/webgl-with-threejs-basics--net-35688

//Declare variables
var scene, camera, renderer, cube, light, ambientLight;

//Call functions
init();
animate();

//Define the init function
function init() {

  //Create the scene and set size
  scene = new THREE.Scene();
  var WIDTH = window.innerWidth,
      HEIGHT = window.innerHeight;

  //Create renderer and add to body
  renderer = new THREE.WebGLRenderer({antialias:true});
  renderer.setSize(WIDTH, HEIGHT);
  document.body.appendChild(renderer.domElement);
  renderer.shadowMapEnabled = true;

   //Cube
  var geometry = new THREE.BoxGeometry(100,100,100);
  var material = new THREE.MeshLambertMaterial( { color: 0x00ff00} );
  cube = new THREE.Mesh( geometry, material );
  cube.castShadow = true;
  scene.add(cube);

  //Set up perspective camera
  //First arg is field of view (FOV)--angle of view
  //Second arg is aspect ratio-- width/height
  //Third arg is near
  //Fourth arg is far
  camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 100, 10000);
  camera.position.y = 160;
  camera.position.z = 400;
  
  scene.add(camera);

  //Event listener triggered by resizing the browser
  window.addEventListener('resize', function(){
    var WIDTH = window.innerWidth,
        HEIGHT = window.innerHeight;
    renderer.setSize(WIDTH, HEIGHT);
    camera.aspect = WIDTH / HEIGHT;
    camera.updateProjectionMatrix();
  });

  //Skybox-- a large box in which my little cube lives
  var skyboxGeometry = new THREE.BoxGeometry(10000, 10000, 10000);
  var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x99CCFF, side: THREE.BackSide });
  var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
  scene.add(skybox);

  //Create a ground plane
  var planeGeometry = new THREE.PlaneGeometry(200, 200);
  var planeMaterial = new THREE.MeshLambertMaterial({color: 0Xffffff, side: THREE.DoubleSide});
  var plane = new THREE.Mesh(planeGeometry, planeMaterial);
  plane.position.x = -100;
  plane.position.z = -100;
  plane.position.y = 0;
  plane.rotation.x=-0.5*Math.PI;
  plane.recieveShadow = true;
  scene.add(plane);

  //Set background color
  // renderer.setClearColor(0x333F47, 1);

  //Light
  
  light = new THREE.PointLight(0xffffff);
  light.position.set(0, 300, 200);
  scene.add(light);

  //Ambient light

  var ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add(ambientLight);
 
  

 

  //Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
}

 // Renders the scene and updates the render as needed.
function animate() {

  // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
  requestAnimationFrame(animate);

  //
  // cube.rotation.x += 0.05;
  // cube.rotation.y += 0.05;

  // Render the scene.
  renderer.render(scene, camera);
  controls.update();


}