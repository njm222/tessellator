varying vec3 vUv;
varying float vDistance;
uniform vec3 uColor;
uniform float uOpacity;
uniform float uNoise;

vec3 palette( float t, vec3 baseColor ) {
  vec3 a = vec3(0.5);
  return a+(cos(uNoise * 10. *(t+baseColor)));
}

void main() {
  float distanceToCenterPoint = distance(gl_PointCoord, vec2(0.5));
  float strength = pow(1. - distanceToCenterPoint, 10.0);
  
  vec3 color = palette(vDistance * uNoise, uColor);
  color = mix(vec3(0.0), color, strength * uNoise * 1.618);
  
  gl_FragColor = vec4(color, uOpacity);
}