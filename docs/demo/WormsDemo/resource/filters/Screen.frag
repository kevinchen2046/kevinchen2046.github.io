precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec4 vPosition;
uniform vec2 projectionVector;
uniform vec2 uTextureSize;
uniform sampler2D uSampler;

uniform float u_time;
uniform float u_alpha;
uniform vec2 texscale;

// 2D Random
float random (in vec2 st) {
    return fract(sin(dot(st.xy,
                         vec2(12.9898,78.233)))
                 * 43758.5453123);
}

// 2D Noise based on Morgan McGuire @morgan3d
// https://www.shadertoy.com/view/4dS3Wd
float noise (in vec2 st) {
    vec2 i = floor(st);
    vec2 f = fract(st);

    // Four corners in 2D of a tile
    float a = random(i);
    float b = random(i + vec2(1.0, 0.0));
    float c = random(i + vec2(0.0, 1.0));
    float d = random(i + vec2(1.0, 1.0));

    // Smooth Interpolation

    // Cubic Hermine Curve.  Same as SmoothStep()
    vec2 u = f*f*(3.0-2.0*f);
    // u = smoothstep(0.,1.,f);

    // Mix 4 coorners percentages
    return mix(a, b, u.x) +
            (c - a)* u.y * (1.0 - u.x) +
            (d - b) * u.x * u.y;
}

void main(){
    const float count=30.0;

    vec4 color=vec4(0.0);
    for(float i=0.0;i<count;i++){

        float n1 = noise( vec2(texscale.x+i+u_time));
        float n2 = noise( vec2(texscale.y+i+u_time));
        vec2 f1=texscale*n1;
        vec2 f2=texscale*n2;
        color+=texture2D(uSampler,vTextureCoord*texscale-vec2(f1.x,f2.y));
    }
    

    gl_FragColor=color;
}