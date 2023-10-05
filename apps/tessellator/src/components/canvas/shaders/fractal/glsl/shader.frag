varying vec2 vUv;
uniform vec3 uColour;
uniform float uOpacity;
uniform float uTime;
uniform float uIterations;
uniform float uEnergy;
uniform float uValence;
uniform float uFactor;
uniform float uHigh;

vec3 palette( float t, vec3 baseColour ) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(1.0, 1.0, 1.0);

    return a*cos( 6.28318*(b*t+baseColour) );
}

void main()
{

  vec2 vUv0 = (vUv - 0.5);
  vec2 vUv1 = vUv0;
  vec3 finalColor = vec3(0.0);
    
  for (float i = 0.0; i < uIterations; i++) {
    vUv1 = fract(vUv1 * uFactor) - 0.5;

    float d = (length(vUv1) * exp(-length(vUv0)));

    vec3 col = palette(length(vUv0) + i * uEnergy + uTime * uEnergy, uColour);

    d = abs(sin(d*uValence + uTime)/uValence);

    d = pow(((1.5-(uValence*0.1))*(uHigh*0.0005)*(0.5+uEnergy)) / d, 0.25 + uFactor);

    finalColor += col * d;
  }

  gl_FragColor = vec4(finalColor, 1.0);
}
