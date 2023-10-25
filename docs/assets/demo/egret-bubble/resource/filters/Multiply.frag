precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec4 vPosition;
uniform vec2 projectionVector;
uniform vec2 uTextureSize;
uniform sampler2D uSampler;
uniform sampler2D uSamplerOther;
uniform float uTime;
void main(){
    // float detal=(mod(uTime,100.))*0.001;
    vec4 otherColor=texture2D(uSamplerOther,vec2(fract(vTextureCoord.x+uTime*0.0005),vTextureCoord.y));//vec2(vTextureCoord.x,fract(vTextureCoord.y+uTime*0.001)));
    
    // if(otherColor.r+otherColor.g+otherColor.b>2.){
    //     otherColor=otherColor*(mod(uTime,100.))*0.01;
    // }
    float amplitude=0.5;
    float threshold=(otherColor.r+otherColor.g+otherColor.b)*.33;
    float amplitudeValue=(amplitude*threshold-amplitude*.5)*0.1;
    otherColor.rgb*=0.3;    
    vec4 color=texture2D(uSampler,vec2(vTextureCoord.x+amplitudeValue,vTextureCoord.y+amplitudeValue));
    color.r+=sin(uTime*0.001)*0.3;
    color.g+=cos(uTime*0.002)*0.3;
    color.b+=sin(uTime*0.003)*0.3;
    color = color;
    color.rgb*=0.5;
    //圆框
    float scale = uTextureSize.y/uTextureSize.x;
    float pct =/**将圆限制在一定的区间*/smoothstep(0.1,0.9,/*圆*/length(vec2((vTextureCoord.x-0.5),(vTextureCoord.y-0.5)*scale)));
    gl_FragColor= ///**背景*/pct*vec4(1.0,1.0,1.0,1.0)+
                    /**前景*/(1.0-pct)*color;
}