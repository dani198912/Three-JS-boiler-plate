const fragmentShader = `
#ifdef GL_ES
precision mediump float;
precision mediump int;

#endif

uniform sampler2D u_texture;
uniform vec2 u_textureFactor;
uniform vec2 u_resolution;

varying vec2 vUv;


vec2 centeredAspectRatio(vec2 uvs, vec2 factor){
    return uvs * factor - factor /2. + 0.5;
    }

void main(){
    vec3 color = texture2D(u_texture, vUv).xyz;
    gl_FragColor = vec4(color, 1.0);
}


`

