var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
console.log(renderer);
var resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
//Buffer Geometry
var planeGeometry = new THREE.PlaneBufferGeometry(5, 5, 32, 32);
//Textures
var factor = new THREE.Vector2(1.0, 1.0);
var texture = new THREE.TextureLoader().load( 'https://images.unsplash.com/photo-1563192504-36ac622196dd' );

//Materials
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );


//shader uniforms
const uniforms = 
{   u_time: { value: 1.0 },
    u_texture: { type: "t", value: texture },
    u_resolution: {type: "f", value: resolution},
    u_textureFactor: {type: "f", value: factor}
};

var shaderMaterial = new THREE.RawShaderMaterial( {

    uniforms: uniforms,
    vertexShader: vertexShader,
    fragmentShader: fragmentShader,
    side: THREE.DoubleSide,
    transparent: false

} );

//Mesh
var plane = new THREE.Mesh( planeGeometry, shaderMaterial );
//Add objects to scene
scene.add( plane );

camera.position.z = 5;

plane.material.uniforms.u_texture.value = texture;

function onWindowResize () {
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    this.mesh.material.uniforms.u_resolution.value = new THREE.Vector2(
        window.innerWidth,
        window.innerHeight);
}

window.addEventListener('resize', onWindowResize, false);
function animate () {
    requestAnimationFrame ( animate );
    render();
}

function render() {
    var time  = performance.now();
    plane.material.uniforms.time.value = time *0.01;
    plane.rotation.x +=0.010;
    renderer.render(scene, camera)
}
animate();