var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Buffer Geometry
var planeGeometry = new THREE.PlaneBufferGeometry(5, 5, 32);

//Materials
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );

var shaderMaterial = new THREE.RawShaderMaterial( {

    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide,
    transparent: true

} );

//Mesh
var plane = new THREE.Mesh( planeGeometry, shaderMaterial );
//Add objects to scene
scene.add( plane );

camera.position.z = 5;

function onWindowResize () {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);
function animate () {
    requestAnimationFrame ( animate );
    render();
}

function render() {
    var time  = performance.now();
    plane.material.uniforms.time.value = time *0.005;
    renderer.render(scene, camera)
}
animate();