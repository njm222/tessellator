varying vec2 vUv;
uniform vec3 uColor;
uniform float uOpacity;
uniform float uTime;
uniform float uIterations;
uniform float uEnergy;
uniform float uValence;
uniform float uNoise;
uniform float uBeatCount;

vec3 palette( float t, vec3 baseColor ) {
  return uEnergy*cos( 3.1415*(10.0*uNoise*abs(sin(t))+baseColor) );
}


void main() {
  vec2 vUv0 = vUv - 0.5;
  vec2 vUv1 = vUv0;
  vec3 finalColor = vec3(0.0);

  float beatCount = mod(uBeatCount, uValence*4.);

  for (float i = 0.0; i < uIterations + (beatCount*uEnergy); i++) {
    vUv1 = fract((vUv0) * (uIterations-i) * (sin(uTime*.01)+beatCount) + sin(uBeatCount)) - 0.5;

    vec3 col = palette(length(vUv1)+(uIterations-i), uColor);

    float d = (1.-distance(vUv, vec2(0.5)))*uEnergy;

    finalColor += col * d;
  }

  gl_FragColor = vec4 (finalColor, uOpacity);
}