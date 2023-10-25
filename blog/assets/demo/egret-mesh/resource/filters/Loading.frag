
precision mediump float;
varying vec2 vTextureCoord;
varying vec4 vColor;
varying vec4 vPosition;
uniform vec2 projectionVector;
uniform vec2 uTextureSize;

uniform float u_progress;
uniform float u_strong;


void main(){
    vec2 uv=vTextureCoord.xy;

	vec3 r=vec3(1.,0.,0.)*(1.-uv.x+(1.-uv.y))*.6;
	vec3 g=vec3(.4824,1.,0.)*(uv.x+(1.-uv.y))*.3;
	vec3 b=vec3(0.,.6353,1.)*(uv.y+(1.-uv.x))*.6;
	vec3 z=vec3(1.,.851,0.)*(uv.x+uv.y)*.2;

	vec4 color=vec4(r+g+b+z,1.);
	float x=abs(uv.x-0.5)*(uTextureSize.x/uTextureSize.y);
	float y=abs(uv.y-0.5);
    float off=1.0-abs(u_progress-sqrt(x*x+y*y)*0.4-0.2)*6.0;

    gl_FragColor = color+clamp((color*off)*u_strong,0.0,1.0);
}

