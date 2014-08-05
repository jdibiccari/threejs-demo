//Combination of the following tuts:
//http://blog.teamtreehouse.com/the-beginners-guide-to-three-js
//http://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene
//http://code.tutsplus.com/tutorials/webgl-with-threejs-basics--net-35688

//Declare variables
var scene, camera, renderer, cube, light;

//Call functions
init();
render();

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

   //Cube
  var geometry = new THREE.CubeGeometry(100,100,100);
  var material = new THREE.MeshLambertMaterial( { color: 0x00ff00} );
  cube = new THREE.Mesh( geometry, material );
  scene.add(cube);

  //Set up perspective camera
  //First arg is field of view (FOV)--angle of view
  //Second arg is aspect ratio-- width/height
  //Third arg is near
  //Fourth arg is far
  camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 0.1, 10000);
  camera.position.y = 160;
  camera.position.z = 400;
  camera.lookAt(cube.position);
  scene.add(camera);

  //Event listener triggered by resizing the browser


  //Skybox
  var skyboxGeometry = new THREE.CubeGeometry(10000, 10000, 10000);
  var skyboxMaterial = new THREE.MeshBasicMaterial({ color: 0x000000, side: THREE.BackSide });
  var skybox = new THREE.Mesh(skyboxGeometry, skyboxMaterial);
 
  scene.add(skybox);

  //Light
  
  var light = new THREE.PointLight(0xffffff);
  light.position.set(0, 300, 200);
 
  scene.add(light);

 

  //Controls
  

}

 // Renders the scene and updates the render as needed.
function render() {

  // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
  requestAnimationFrame(render);

  //
  cube.rotation.x += 0.05;
  cube.rotation.y += 0.05;

  // Render the scene.
  renderer.render(scene, camera);

}