precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec4 vPosition;
uniform sampler2D uSampler;
uniform vec2 projectionVector;
uniform vec2 uTextureSize;
uniform float u_progress;
uniform float u_strong;
void main(){
    vec4 color=texture2D(uSampler, vTextureCoord.xy);
   
    float off=1.0-abs(u_progress-sqrt(vTextureCoord.x*vTextureCoord.x+vTextureCoord.y*vTextureCoord.y)*0.4-0.32)*7.0;
    gl_FragColor = color+clamp((color*off)*u_strong,0.0,1.0);
}