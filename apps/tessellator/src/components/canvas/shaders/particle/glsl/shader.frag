varying vec3 vUv;
varying float vDistance;
uniform vec3 uColour;
uniform float uOpacity;
uniform float uNoise;

vec3 palette( float t, vec3 baseColour ) {
  vec3 a = vec3(0.5);
  return a+(cos(6.1415*(t+baseColour)));
}

void main() {
  float distanceToCenterPoint = distance(gl_PointCoord, vec2(0.5));
  float strength = pow(1. - distanceToCenterPoint, 10.0);
  
  vec3 color = palette(vDistance + uNoise, uColour);
  color = mix(vec3(0.0), color, strength);
  
  gl_FragColor = vec4(color, uOpacity);
}