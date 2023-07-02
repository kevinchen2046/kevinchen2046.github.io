precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec4 vPosition;
uniform vec2 projectionVector;
uniform vec2 uTextureSize;
uniform sampler2D uSampler;
uniform sampler2D uSamplerNoise;
// uniform sampler2D uSampler2;
uniform float u_time;
uniform float u_alpha;
uniform float u_mask;
void main(){
    const float amplitude=.5;
    float speed=u_time*.5;
    //抖动
    vec4 color=texture2D(uSamplerNoise,vec2(1.-vTextureCoord.x,(1.-vTextureCoord.y)+speed));
    float threshold=(color.r+color.g+color.b)*.33;
    float amplitudeValue=(amplitude*threshold-amplitude*.5);

    vec4 rcolor=texture2D(uSampler,vec2(vTextureCoord.x+amplitudeValue*.05,vTextureCoord.y));
    if(rcolor.a>0.0){
        rcolor+=(texture2D(uSamplerNoise,vec2(vTextureCoord.x+amplitudeValue,vTextureCoord.y+speed))+vec4(0.3,0.2,0.0,0.0))*.3;
    }
    gl_FragColor=rcolor;
                    
    
    if(u_mask>0.0){
        //圆框
        float scale = uTextureSize.y/uTextureSize.x;
        float pct =/**将圆限制在一定的区间*/smoothstep(0.3,0.5,/*圆*/length(vec2((vTextureCoord.x-0.5),(vTextureCoord.y-0.5)*scale)));
        gl_FragColor= ///**背景*/pct*vec4(1.0,1.0,1.0,1.0)+
                    /**前景*/(1.0-pct)*gl_FragColor;
    }
    
    gl_FragColor=gl_FragColor*u_alpha;
}