//Combination of the following tuts:
//http://blog.teamtreehouse.com/the-beginners-guide-to-three-js
//http://threejs.org/docs/index.html#Manual/Introduction/Creating_a_scene
//http://code.tutsplus.com/tutorials/webgl-with-threejs-basics--net-35688

//Declare variables
var scene, camera, renderer, cube, light, ambientLight, mouse={x:0, y:0};
var sprite1, object;
var canvas1, context1, texture1;
var labels = [{center:{x:580,y:320}, image:"images/yellow_belly.png", range: {x:100, y:100}}];

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

  //Set up perspective camera
  //First arg is field of view (FOV)--angle of view
  //Second arg is aspect ratio-- width/height
  //Third arg is near
  //Fourth arg is far
  camera = new THREE.PerspectiveCamera(45, WIDTH/HEIGHT, 1, 20000);
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

  //Point Light
  light = new THREE.SpotLight(0xffffff, 2);
  light.position.set(100, 200, 200);
  scene.add(light);

  //Ambient light
  var ambientLight = new THREE.AmbientLight( 0x404040 ); // soft white light
  scene.add(ambientLight);
  
  //manager
  var manager = new THREE.LoadingManager();
  manager.onProgress = function ( item, loaded, total ) {
    console.log( item, loaded, total );
  };
  //texture
  var texture = new THREE.Texture();
  var loader = new THREE.ImageLoader( manager );
  loader.load( 'obj/cedar_texture.png', function ( image ) {
    texture.image = image;
    texture.needsUpdate = true;
  } );

  // model
  var loader = new THREE.OBJLoader(manager);
  loader.load( 'obj/cedar_waxwing.obj', function ( object ) {
    object.traverse(function(child) {
      if ( child instanceof THREE.Mesh ) {
        child.material.map = texture;
      }
    });

    object.position.y = - 80;
    object.scale.set(20,20,20);
    scene.add( object );
    camera.lookAt(object.position);

  });


  //Labels -- http://stemkoski.github.io/Three.js/Mouse-Tooltip.html
  document.addEventListener( 'mousemove', onDocumentMouseMove, false );

  // create a canvas element
  canvas1 = document.createElement('canvas');
  context1 = canvas1.getContext('2d');
  context1.font = "Bold 30px Arial";
  context1.fillStyle = "rgba(0,0,0,0.95)";
  context1.fillText('TWEET!', 0, 20);
    
  // canvas contents will be used for a texture
  texture1 = new THREE.Texture(canvas1);
  texture1.needsUpdate = true;

  var spriteMaterial = new THREE.SpriteMaterial( { map: texture1, useScreenCoordinates: true} );
  
  sprite1 = new THREE.Sprite( spriteMaterial );
  sprite1.scale.set(200,100,1.0);
  sprite1.position.set(250, 100, 0 );
  scene.add( sprite1 );

  //Controls
  controls = new THREE.OrbitControls(camera, renderer.domElement);
}

function between(num, min, max){
  return num >= min && num <= max;
}


function onDocumentMouseMove(event){
  mouse.x = event.clientX;
  mouse.y = event.clientY;
  console.log(mouse);
  for(i=0; i<labels.length; i++){
    minX = labels[i].center.x - labels[i].range.x;
    minY = labels[i].center.y - labels[i].range.y;
    maxX = labels[i].center.x + labels[i].range.x;
    maxY = labels[i].center.y + labels[i].range.y;
    if (between(mouse.x, minX, maxX) && between(mouse.y, minY, maxY)){
      context1.fillStyle = "rgba(255,255,255,0.95)";
      context1.fillText(labels[i].message, 0, 20);
      texture1.needsUpdate = true;
      console.log("move sprite");
      sprite1.position.set(labels[i].x, labels[i].y, -200);
    }else{
      context1.fillText("", 0, 20);
      texture1.needsUpdate = true;
    }
  }
}



 // Renders the scene and updates the render as needed.
function animate() {
  // Read more about requestAnimationFrame at http://www.paulirish.com/2011/requestanimationframe-for-smart-animating/
  requestAnimationFrame(animate);

  // Render the scene.
  renderer.render(scene, camera);
  controls.update();
}