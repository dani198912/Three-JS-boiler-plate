//start of shader
const vertexShader = `
#ifdef GL_ES
precision mediump float;
precision mediump int;

#endif
uniform mat4 modelViewMatrix; // optional
uniform mat4 projectionMatrix; // optional

attribute vec2 uv;
attribute vec3 position;
attribute vec4 color;

varying vec2 vUv;

void main()	{

    gl_Position =   projectionMatrix * 
                    modelViewMatrix * 
                    vec4(position,1.0);
    vUv = uv.xy;                    
}

` // End of shader