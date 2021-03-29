const IrisBookSection = document.querySelector("section.iris-book");

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, IrisBookSection.clientWidth / IrisBookSection.clientHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer({
  alpha: true,
  antialias: true
});
renderer.setSize( IrisBookSection.clientWidth, IrisBookSection.clientHeight );
IrisBookSection.appendChild( renderer.domElement );

const ambient = new THREE.AmbientLight( 0x222222 );
scene.add( ambient );

const light = new THREE.DirectionalLight(0xffffff);
light.position.set(0, 0, 6);
scene.add( light );

const loader = new THREE.TextureLoader();

const urls = [
  "images/iris-edge.jpg", "images/iris-spine.jpg",
  "images/iris-top.jpg", "images/iris-bottom.jpg",
  "images/iris-front.jpg", "images/iris-back.jpg"
]

const materials = urls.map(url => {
  return new THREE.MeshLambertMaterial({
    map: loader.load(url)
  })
})

const geometry = new THREE.BoxGeometry(3.5, 5, 0.5);
const cube = new THREE.Mesh( geometry, materials );
scene.add( cube );

camera.position.z = 7;

let currentTimeline = window.pageYOffset / 3000;
let aimTimeline = window.pageYOffset / 3000;

function animate() {
	requestAnimationFrame( animate );

	currentTimeline += (aimTimeline - currentTimeline) * 0.01;

  var rx = currentTimeline * Math.PI;

   rx = rx * 2;

  cube.rotation.set(rx, 2 * rx, rx);

	renderer.render( scene, camera );
}
animate();

window.addEventListener("scroll", function () {
  aimTimeline = window.pageYOffset / 3000;
})
