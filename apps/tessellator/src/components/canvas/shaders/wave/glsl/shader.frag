#pragma glslify: noise = require('glsl-noise/classic/3d')
uniform float uOpacity;
uniform float uTime;
uniform float uStrengthFactor;
uniform float uResolution;
uniform float uNoise;
uniform vec3 uColorStart;
uniform vec3 uColorEnd;
varying vec2 vUv;

vec3 palette(float t, vec3 d) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 1.0, 1.0);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  vec2 displacedUv = vUv + noise(vec3(vUv * uResolution, uTime));
  float strength = noise(vec3(displacedUv * uStrengthFactor, uTime));
  float outerGlow = distance(vUv, vec2(0.5)) * 2.0 - 0.5;
  strength += outerGlow;
  strength += step(-0.2, strength) * (1.0 - uNoise);
  strength = clamp(strength, 0.0, 1.0);
  vec3 color = palette(strength*2., uColorStart);
  color = mix(color, uColorEnd, strength);
  gl_FragColor = vec4(color, uOpacity);
  #include <tonemapping_fragment>
  #include <colorspace_fragment>
}