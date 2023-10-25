precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec4 vPosition;
uniform vec2 projectionVector;
uniform vec2 uTextureSize;
uniform sampler2D uSampler;

uniform vec2 u_r_off;
uniform vec2 u_g_off;
uniform vec2 u_b_off;
uniform float u_threshold;
void main(){
    vec4 color=texture2D(uSampler, vTextureCoord.xy);

    vec4 R=texture2D(uSampler, vTextureCoord.xy+vec2(-u_r_off.x,0.));
    vec4 G=texture2D(uSampler, vTextureCoord.xy+vec2(0.,u_g_off.y));
    vec4 B=texture2D(uSampler, vTextureCoord.xy+vec2(u_b_off.x,0.));
    gl_FragColor = color*(1.0-u_threshold)+vec4(R.r,0.,0.,R.a*0.5)*u_threshold+vec4(0.,G.g,0.,G.a*0.5)*u_threshold+vec4(0.,0.,B.b,B.a*0.5)*u_threshold;
}