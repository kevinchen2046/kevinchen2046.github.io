precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec4 vPosition;
uniform vec2 projectionVector;
uniform vec2 uTextureSize;
uniform sampler2D uSampler;

uniform vec2 blur;
void main(){
    // vec4 color=texture2D(uSampler, vTextureCoord);
    vec4 color = vec4(0.0);

    // Sample top left pixel
    color += texture2D(uSampler, vec2(vTextureCoord.x - blur.x, vTextureCoord.y + blur.y));

    // Sample top right pixel
    color += texture2D(uSampler, vec2(vTextureCoord.x + blur.x, vTextureCoord.y + blur.y));

    // Sample bottom right pixel
    color += texture2D(uSampler, vec2(vTextureCoord.x + blur.x, vTextureCoord.y - blur.y));

    // Sample bottom left pixel
    color += texture2D(uSampler, vec2(vTextureCoord.x - blur.x, vTextureCoord.y - blur.y));

    // Average
    color *= 0.25;

    gl_FragColor = color;
}