const { tween, styler, spring, listen, pointer, value, easing, reach } = window.popmotion;


var mouse = new THREE.Vector2(0,0);
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera( 35, window.innerWidth / window.innerHeight, 0.1, 1000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );
console.log(renderer);
var resolution = new THREE.Vector2(window.innerWidth, window.innerHeight);
//Buffer Geometry
var planeGeometry = new THREE.PlaneBufferGeometry(5,7.5, 32, 32);
//Textures
var factor = new THREE.Vector2(1.0, 1.0);
// var texture = new THREE.TextureLoader().load( 'https://images.unsplash.com/photo-1563192504-36ac622196dd' );
var texture = new THREE.TextureLoader().load( '/images/Proiect01/IMAGINE_01.jpg' );

//Materials
var material = new THREE.MeshBasicMaterial( {color: 0xffff00, side: THREE.DoubleSide} );



//shader uniforms
const uniforms = 
{   u_time: { value: 1.0 },
    u_mouse:{type: "v2", value: mouse},
    u_texture: { type: "t", value: texture },
    u_resolution: {type: "v2", value: resolution},
    u_textureFactor: {type: "v2", value: factor}
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

camera.position.z = 10;

plane.material.uniforms.u_texture.value = texture;

function onWindowResize () {
    resolution = THREE.Vector2(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    plane.material.uniforms.u_resolution.value = resolution;
}

window.addEventListener('resize', onWindowResize, false);
function animate () {
    requestAnimationFrame ( animate );
    render();
}



window.addEventListener('mousemove', function(ex){});

// const v = value(0, console.log);
// tween({to: 1, duration: 1000}).start(v);
// setTimeout(() => v.getVelocity(), 100)



function render() {
    var time  = performance.now();
    // plane.material.uniforms.time.value = time * 0.01;
    //plane.rotation.x = 0.01*Math.PI;
    renderer.render(scene, camera)
}
animate();



const cameraRotation = value(0, (v) => {
    plane.rotation.x = v;
  });


spring({
    from: 0,
    to: 0*Math.PI,
    loop: Infinity,
    stiffness: 50,
    damping: 3
  }).start(cameraRotation);



