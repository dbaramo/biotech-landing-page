#define PI 3.1415926538
vec2 uvSphereCoordinates;
varying vec4 vPosition;
uniform float uClipValue;
uniform float uScrollProgress;
uniform sampler2D uAlphaTexture;
varying vec2 vUv;
varying vec2 vUvRef;

void main() {
    if(vPosition.y > uClipValue){
        discard;
    }
    
    // Calculate spherical coordinates (latitude and longitude)
    float latitude = acos(vPosition.y / length(vPosition.xyz));
    float longitude = atan(vPosition.z, vPosition.x);

    // Map spherical coordinates to UV coordinates
    float u = 1.0 - (longitude + PI) / (2.0 * PI);
    float v = (PI - latitude) / PI;

    // Output the UV coordinates
    uvSphereCoordinates = vec2(u, v);
    vec4 worldTexture = texture2D(uAlphaTexture, uvSphereCoordinates);

    if(uScrollProgress > 0.57 && uScrollProgress < 0.8){
        if (worldTexture.g > 0.5) {
            gl_FragColor.rgba = vec4(0.059,0.231,0.996, 1.0);    
        } else {
            gl_FragColor.rgba = vec4(0.149,0.176,0.392, 1.0);    
        };
    } else {
        gl_FragColor.rgba = vec4(0.059,0.231,0.996, 1.0);
    }
}