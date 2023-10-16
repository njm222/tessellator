varying vec3 vUv; 
varying float vDistance;
uniform float uSize;

void main() {
  vDistance = distance(position.xy, vec2(0.5)) * .15;
  
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.5);
  gl_Position = projectionMatrix * modelViewPosition; 
  float size = clamp(uSize, 10.0, 50.0);
  gl_PointSize = max(5.0, size * vDistance);
}