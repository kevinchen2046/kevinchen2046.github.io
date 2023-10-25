precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec4 vPosition;
uniform vec2 projectionVector;
uniform vec2 uTextureSize;
uniform sampler2D uSampler;

uniform float u_threshold;
void main(){
    vec4 color=texture2D(uSampler, vTextureCoord.xy);

    gl_FragColor = color+color.a*u_threshold;
}