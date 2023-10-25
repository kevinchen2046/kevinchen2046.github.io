precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec4 vPosition;
uniform vec2 projectionVector;
uniform vec2 uTextureSize;
uniform sampler2D uSampler;

uniform float column;
uniform float frame;
const float count=16.0;

void main(){
    vec4 color;
    
    
    float index=floor(vTextureCoord.x/column);
    float uvx=fract(vTextureCoord.x/column);
    index=floor(length(vTextureCoord.x)*count);
    float x=fract(index*column+uvx*column);
    float speed=frame*0.003;
    float y=fract(vTextureCoord.y+(index+count/2.)*speed+length(x+speed));
    color=texture2D(uSampler, vec2(x,y));
    gl_FragColor = color;
}