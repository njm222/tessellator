varying vec3 vUv;
varying float vCenterDistance;
uniform vec3 uColor;
uniform float uOpacity;
uniform float uNoise;

vec3 palette( float t, vec3 baseColor ) {
  vec3 a = vec3(0.5);
  float factor = max(uNoise * 10., 3.1415);
  return a+(cos(factor * (t+baseColor)));
}

void main() {
  float distanceToCenterPoint = distance(gl_PointCoord, vec2(0.5));
  float strength = pow(1. - distanceToCenterPoint, 10.);
  
  vec3 color = palette(vCenterDistance * uNoise, uColor);
  color = mix(vec3(0.0), color, strength * uNoise * 1.618);
  
  gl_FragColor = vec4(color, uOpacity);
}