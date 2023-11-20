varying vec2 vUv;
uniform vec3 uColor;
uniform float uOpacity;
uniform float uTime;
uniform float uIterations;
uniform float uEnergy;
uniform float uValence;
uniform float uFactor;
uniform float uHigh;
uniform float uBeatCount;

vec3 palette( float t, vec3 baseColor ) {
  return (1.0-uEnergy)*cos( 6.28318*(uIterations*abs(sin(t))+baseColor) );
}


void main() {
  vec2 vUv0 = vUv - 0.5;
  vec2 vUv1 = vUv0;
  vec3 finalColor = vec3(0.0);

  for (float i = 0.0; i < uIterations; i++) {
    vUv1 = fract(vUv0 * (sin(uTime*.01)+mod(uBeatCount, 4.0))) - 0.5;

    float distanceToCenter = distance(vUv1, vec2(0.5));

    vec3 col = palette(length(vUv1)+i, uColor);

    float d = (1.5-distance(vUv, vec2(0.5)));

    finalColor += col * d;
  }

  gl_FragColor = vec4 (finalColor, uOpacity);
}