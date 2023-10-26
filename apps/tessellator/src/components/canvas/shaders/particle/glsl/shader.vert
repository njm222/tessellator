varying vec3 vUv; 
varying float vCenterDistance;
uniform float uSize;

void main() {
  vCenterDistance = 15.0 - distance(position, vec3(0.5));
  
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.5);
  gl_Position = projectionMatrix * modelViewPosition; 
  gl_PointSize = clamp(uSize * vCenterDistance, 10.0, 150.0);
}