var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

var planeGeometry = new THREE.PlaneBufferGeometry(5, 5, 32);
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );
var plane = new THREE.Mesh( planeGeometry, material );

scene.add( plane );

camera.position.z = 5;

var animate = function () {
    requestAnimationFrame( animate );

    renderer.render( scene, camera );
};

animate();