
// uniform sampler2D uCurrentPosition;
uniform sampler2D uIntroModel;
uniform sampler2D uHumanBodyModel;
uniform sampler2D uMicroscopeModel;
uniform sampler2D uDnaHelixModel;
uniform sampler2D uSphereModel;
uniform float uProgress;
uniform float uScrollProgress;
uniform vec3 uMouse;
uniform float uTime;
uniform float uCurrentModel;
float rand(vec2 co){
    return fract(sin(dot(co, vec2(12.9898, 78.233))) * 43758.5453);
}

#ifndef HALF_PI
#define HALF_PI 1.5707963267948966
#endif

float sineIn(float t) {
  return sin((t - 1.0) * HALF_PI) + 1.0;
}

float quarticIn(float t) {
  return pow(t, 4.0);
}


void main() {
    vec2 vUv = gl_FragCoord.xy / resolution.xy;
    float offset = rand(vUv);
    vec3 position = texture2D( uCurrentPosition, vUv ).xyz;
    vec3 introModel = texture2D( uIntroModel, vUv ).xyz;
    vec3 humanBodyModel = texture2D( uHumanBodyModel, vUv ).xyz;
    vec3 microscopeModel = texture2D( uMicroscopeModel, vUv ).xyz;
    vec3 dnaHelixModel = texture2D( uDnaHelixModel, vUv ).xyz;
    vec3 sphereModel = texture2D( uSphereModel, vUv ).xyz;
    vec3 velocity = texture2D( uCurrentVelocity, vUv ).xyz;

    vec3 currentModel = introModel;
    // if(uCurrentModel == 0.){
    //     currentModel = introModel;
    // } else if(uCurrentModel == 1.){
    //     currentModel = humanBodyModel;
    // } else if(uCurrentModel == 2.){
    //     currentModel = microscopeModel;
    // } else if(uCurrentModel == 3.){
    //     currentModel = dnaHelixModel;
    // }

    // vec2 velocity = texture2D( uCurrentPosition, vUv ).zw;

    vec3 modelToDisplay;
    // vec3 modelToDisplay = mix4(introModel, humanBodyModel, microscopeModel, dnaHelixModel, uProgress);

    if (uScrollProgress >= 0.0 && uScrollProgress <= 0.25) {
        float mixProgress = uScrollProgress < 0.07 ? 0. : 1.;
        modelToDisplay = mix(humanBodyModel, microscopeModel, mixProgress);
    } else if(uScrollProgress > 0.25 && uScrollProgress <= 0.5) {
        float mixProgress = uScrollProgress < 0.32 ? 0. : 1.;
        modelToDisplay = mix(microscopeModel, dnaHelixModel, mixProgress);
    } else if(uScrollProgress > 0.5 && uScrollProgress <= 0.8){
        float mixProgress = uScrollProgress < 0.57 ? 0. : 1.;
        modelToDisplay = mix(dnaHelixModel, sphereModel, mixProgress);
    } else if(uScrollProgress > 0.8){
        float mixProgress = uScrollProgress < 0.8 ? 0. : 1.;
        modelToDisplay = mix(sphereModel, introModel, mixProgress);
    }

    velocity *= 0.9;
    

    // particle attraction to shape force
    vec3 direction = normalize( modelToDisplay - position );
    float dist = length( modelToDisplay - position );
    if( dist > 0.01 ) {
        if(uTime < 3.5){
            if(uTime < 2.5 && uTime > 0.001){
                velocity += direction * sineIn(uTime)*0.0015 ;
            } else {
                velocity += direction * 0.0025;
            }
        } else {
            velocity += direction * 0.001;    
        }
       
        // velocity += direction * 0.001;
    }

    

    // mouse repel force
    float mouseDistance = distance( position, uMouse );
    float maxDistance = 0.15;
    if( mouseDistance < maxDistance ) {
        vec3 direction = normalize( position - uMouse );
        velocity += direction * ( 1.0 - mouseDistance / maxDistance ) * 0.1;
    }

    // lifespan of a particle
    // float lifespan = 10.;
    // float age = mod( uTime+ lifespan*offset, lifespan );
    // if(age<0.1){
    //     // velocity = vec2(0.0,0.001);
    //     position.xyz = modelToDisplay;
    // }



    // position.xy += velocity;
    
    gl_FragColor = vec4(velocity, 1.);
}