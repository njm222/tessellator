varying vec3 vUv; 
varying float vDistance;
uniform float uSize;
uniform float uRadius;

void main() {
  vDistance = (uRadius - distance(position.xy, vec2(0.0)) * 0.5);

  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.5);
  gl_Position = projectionMatrix * modelViewPosition; 
  gl_PointSize = clamp(uSize * vDistance, 0.75, 150.0);
}