precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vColor;
uniform mat4 matrix;
uniform vec4 colorAdd;
uniform sampler2D uSampler;
uniform sampler2D uSamplerAlphaMask;

void main(void){
    float alpha=texture2D(uSamplerAlphaMask,vTextureCoord).r;
    if(alpha<.0039){discard;}
    vec4 texColor=texture2D(uSampler,vTextureCoord);
    if(texColor.a>0.){
        // 抵消预乘的alpha通道
        texColor=vec4(texColor.rgb/texColor.a,texColor.a);
    }
    vec4 v4Color=clamp(texColor*matrix+colorAdd,0.,1.);
    v4Color.rgb=v4Color.rgb*alpha;
    v4Color.a=alpha;
    gl_FragColor=v4Color*vColor;
}