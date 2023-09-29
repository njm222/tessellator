varying float vDistance;
uniform vec3 uColour;
uniform float uOpacity;

void main() {
  float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
  float strength = pow(1.0 - distanceToCenter, 3.0);

  vec3 color = mix(uColour, vec3(0.98, 0.78, 0.39), vDistance * 0.5);
  color = mix(vec3(0.0), color, strength);
  
  gl_FragColor = vec4(color, uOpacity);
}