uniform float u_progress;
uniform float u_strong;

const float M_PI_F = 3.14159;

vec2 noiseOffset(float time, vec2 uv, vec3 angleParamsX, vec3 angleParamsY, vec2 angleParamsTime, float baseDistance, vec3 distanceParamsX, vec3 distanceParamsY) {
	float angle = M_PI_F * (sin(angleParamsX.x * uv.x + angleParamsX.y * time + angleParamsX.z) + sin(angleParamsY.x * uv.y + angleParamsY.y * time + angleParamsY.z) + sin(angleParamsTime.x * time + angleParamsTime.y));
	float distance = baseDistance + baseDistance * (sin(distanceParamsX.x * uv.x + distanceParamsX.y * time + distanceParamsX.z) + sin(distanceParamsY.x * uv.y + distanceParamsY.y * time + distanceParamsY.z));
	return vec2(cos(angle), sin(angle)) * distance;
}

void mainImage(out vec4 fragColor,in vec2 fragCoord)
{
	vec2 uv=fragCoord.xy/iResolution.xy;

	vec2 centeredCoords = (uv - 0.5) * 1.2;
    centeredCoords.y *= iResolution.y / iResolution.x;
	float centerDistance = length(centeredCoords);
	vec2 noiseUV1=centeredCoords;
	noiseUV1+=noiseOffset(iTime,noiseUV1,vec3(2.3,.51,0.),vec3(-1.9,.47,1.),vec2(.4,.4),.02,vec3(3.1,.44,1.3),vec3(3.4,.53,0.));
	// noiseUV1*=(1.-.3*pow(centerDistance*2.,1.2));
	// noiseUV1.y-=iTime*.05;
	// noiseUV1.x+=.3*sin(iTime*.13);
	// noiseUV1*=.7;// scale it so we get larger specks
	
	// vec2 noiseUV2=centeredCoords;
	// noiseUV2+=noiseOffset(iTime,noiseUV2,vec3(-1.62,.3,2.1),vec3(-1.83,.42,.3),vec2(-.2,.19),.01,vec3(4.28,.23,.5),vec3(3.93,.19,1.1));
	// noiseUV2*=(1.-.4*pow(centerDistance*2.,1.3));
	// noiseUV2.x+=.2*sin(iTime*.22+.5);
	// noiseUV2.y-=iTime*.02;
	// noiseUV2*=.83;

	vec2 uv1=uv+noiseUV1*sin(iTime)*0.2;

	vec3 r=vec3(1.,0.,0.)*(1.-uv1.x+(1.-uv1.y))*.6;
	vec3 g=vec3(.4824,1.,0.)*(uv1.x+(1.-uv1.y))*.3;
	vec3 b=vec3(0.,.6353,1.)*(uv1.y+(1.-uv1.x))*.6;
	vec3 z=vec3(1.,.851,0.)*(uv1.x+uv1.y)*.2;

	vec4 color=vec4(r+g+b+z,1.);
	float x=abs(uv.x-0.5);
	float y=abs(uv.y-0.5)*(uTextureSize.y/uTextureSize.x);
    float off=1.0-abs(u_progress-sqrt(x*x+y*y)*0.4-0.2)*6.0;
    fragColor = color+clamp((color*off)*u_strong,0.0,1.0);
}