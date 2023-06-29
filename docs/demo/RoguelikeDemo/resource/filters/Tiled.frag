
precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec4 vPosition;
uniform vec2 projectionVector;
uniform vec2 uTextureSize;
uniform sampler2D uSampler;

uniform float u_time;
uniform float u_sun;
//{uniforms}

float plot(vec2 st, float pct,float thinkness){
  return  smoothstep( pct-thinkness, pct, st.y) -
          smoothstep( pct, pct+thinkness, st.y);
}

vec4 addlight(vec2 uv,vec2 center,float light_radius,vec4 light_color,vec4 light_edge_color){
    float scale = uTextureSize.x/uTextureSize.y;
    float pct =/**将圆限制在一定的区间*/smoothstep(0.0,light_radius,/*圆*/length(vec2((uv.x-center.x)*scale,uv.y-center.y)));
    return pct*light_edge_color+(1.0-pct)*light_color;
}

//lights
vec4 createlights(){
//{lights}
    return light;
}

vec4 blur(sampler2D uSampler,vec2 uv,float threshold){
    vec4 blur_color = vec4(0.0);
    vec2 blur_res=vec2(0.002,0.002);
    // Sample top left pixel
    blur_color += texture2D(uSampler, vec2(uv.x - blur_res.x, uv.y + blur_res.y));

    // Sample top right pixel
    blur_color += texture2D(uSampler, vec2(uv.x + blur_res.x, uv.y + blur_res.y));

    // Sample bottom right pixel
    blur_color += texture2D(uSampler, vec2(uv.x + blur_res.x, uv.y - blur_res.y));

    // Sample bottom left pixel
    blur_color += texture2D(uSampler, vec2(uv.x - blur_res.x, uv.y - blur_res.y));

    // Average
    blur_color *= threshold;
    return blur_color;
}

void example(){
    // float u_threshold=0.5;

    // vec4 R=texture2D(uSampler, vTextureCoord.xy+vec2(-0.01,-0.01));
    // vec4 G=texture2D(uSampler, vTextureCoord.xy+vec2(-0.006,-0.006));
    // vec4 B=texture2D(uSampler, vTextureCoord.xy+vec2(-0.002,-0.002));
    // vec4 rgb_color=vec4(R.r,0.,0.,R.a*0.5)*0.2+vec4(0.,G.g,0.,G.a*0.5)*0.4+vec4(0.,0.,B.b,B.a*0.5)*0.3;
    // rgb_color*=0.8;
    // // color=color+blur_color;
    // gl_FragColor = color+(1.0-color.a)*rgb_color;
    // float v=max(max(color.r,color.g),color.b);
    // color.r=v;
    // color.g=v;
    // color.b=v;
    // color.a=v;
    // color=texture2D(uSampler, vTextureCoord.xy);
    // float pct = plot(vTextureCoord,vTextureCoord.x,0.5);
    // float pct = plot(vTextureCoord,pow(vTextureCoord.x,5.0),0.5);
    // float pct = plot(vTextureCoord,step(0.5,vTextureCoord.x),0.5);
    // float pct = plot(vTextureCoord,smoothstep(0.1,0.9,vTextureCoord.x),0.5);
    
    // float pct = plot(vTextureCoord,length(vTextureCoord.xy-0.5),0.01);

    // color=color+pct*vec4(0.0,1.0,0.0,1.0);
}

void main(){
    vec4 color=texture2D(uSampler, vTextureCoord);
    //bloom
    color+=blur(uSampler,vTextureCoord,0.03);
    //lights
    vec4 light=createlights();
    vec4 color_res=color*(vec4(color.rgb*0.2,color.a)+color*mix(light.r,light.g,light.b));
    light.x+=(1.0-light.x)*u_sun;
    light.y+=(1.0-light.y)*u_sun;
    light.z+=(1.0-light.z)*u_sun;
    color_res+=(color*light);
    gl_FragColor = color_res;
}
