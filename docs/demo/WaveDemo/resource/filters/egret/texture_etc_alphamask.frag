precision lowp float;
varying vec2 vTextureCoord;
varying vec4 vColor;
uniform sampler2D uSampler;
uniform sampler2D uSamplerAlphaMask;
void main(void){
    float alpha=texture2D(uSamplerAlphaMask,vTextureCoord).r;
    if(alpha<.0039){discard;}
    vec4 v4Color=texture2D(uSampler,vTextureCoord);
    v4Color.rgb=v4Color.rgb*alpha;
    v4Color.a=alpha;
    gl_FragColor=v4Color*vColor;
}