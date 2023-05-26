#pragma glslify: noise = require('glsl-noise/classic/3d')
uniform float uTime;
uniform float uStrengthFactor;
uniform float uResolution;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;
varying vec2 vUv;

void main() {
  vec2 displacedUv = vUv + noise(vec3(vUv * uResolution, uTime));
  float strength = noise(vec3(displacedUv * uStrengthFactor, uTime));
  float outerGlow = distance(vUv, vec2(0.5)) * 2.0 - 0.5;
  strength += outerGlow;
  strength += step(-0.2, strength) * 0.6;
  strength = clamp(strength, 0.0, 1.0);
  vec3 color = mix(uColorStart, uColorEnd, strength);
  gl_FragColor = vec4(color, 1.0);
  #include <tonemapping_fragment>
  #include <encodings_fragment>
}