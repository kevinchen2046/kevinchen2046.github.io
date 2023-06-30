precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec4 vPosition;
uniform vec2 projectionVector;
uniform vec2 uTextureSize;
uniform sampler2D uSampler;

uniform vec2 blur;
uniform vec2 scale;
uniform vec2 offset;
uniform float brightness;
void main(){
    vec4 color;
    float x=fract(vTextureCoord.x*scale.x+offset.x);
    float y=fract(vTextureCoord.y*scale.y+offset.y);
    if((blur.x>0.0||blur.y>0.0)){
        color = vec4(0.0);
        color += texture2D(uSampler, vec2(x - blur.x, y + blur.y));
        // Sample top right pixel
        color += texture2D(uSampler, vec2(x + blur.x, y + blur.y));
        // Sample bottom right pixel
        color += texture2D(uSampler, vec2(x + blur.x, y - blur.y));
        // Sample bottom left pixel
        color += texture2D(uSampler, vec2(x - blur.x, y - blur.y));
        // Average
        color *= 0.25;
    }else{
        color=texture2D(uSampler, vec2(x,y));
    }
    color.rgb*=brightness;
    gl_FragColor = color;
}