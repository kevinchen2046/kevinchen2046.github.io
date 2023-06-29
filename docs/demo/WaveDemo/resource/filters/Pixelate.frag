precision mediump float;

varying vec2 vTextureCoord;
uniform vec2 uTextureSize;
uniform vec2 size;
uniform sampler2D uSampler;

vec2 mapCoord( vec2 coord )
{
    coord *= uTextureSize;

    return coord;
}

vec2 unmapCoord( vec2 coord )
{
    coord /= uTextureSize;

    return coord;
}

vec2 pixelate(vec2 coord, vec2 size)
{
	return floor( coord / size ) * size+size*0.5;
}

void main(void)
{
    vec2 coord = mapCoord(vTextureCoord);

    coord = pixelate(coord, size);

    coord = clamp(unmapCoord(coord),0.0,1.0);

    gl_FragColor = texture2D(uSampler, coord);
}
