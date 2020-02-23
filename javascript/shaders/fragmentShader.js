const fragmentShader = `
#ifdef GL_ES
precision mediump float;
precision mediump int;

#endif

uniform sampler2D u_texture;
uniform vec2 u_textureFactor;
uniform vec2 u_resolution;

varying vec2 vUv;



void main(){
    vec2 uv = vUv;
    //uv = uv/u_resolution.x*1000.;
    //uv-=0.5;
    //uv*=u_resolution.x;

    vec3 color = texture2D(u_texture, uv).xyz;
    gl_FragColor = vec4(color, 1.0);
}


`

