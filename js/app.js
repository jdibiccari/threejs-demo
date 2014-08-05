//Declare variables
var scene, camera, renderer;

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


}