
precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec4 vPosition;
uniform vec2 projectionVector;
uniform vec2 uTextureSize;
uniform sampler2D uSampler;
uniform vec2 u_center;
uniform float u_progress;
uniform float u_strong;
uniform float u_alpha;

void main(){
    vec2 uv=vTextureCoord.xy;
	vec4 color=texture2D(uSampler,uv);
	float x=abs(uv.x-u_center.x);
	float y=abs(uv.y-(1.0-u_center.y))*(uTextureSize.y/uTextureSize.x);
    float off=1.0-abs(u_progress-sqrt(x*x+y*y)*0.4-0.2)*6.0;

    gl_FragColor = color*u_alpha+clamp((color*off)*u_strong,0.0,1.0);
}

