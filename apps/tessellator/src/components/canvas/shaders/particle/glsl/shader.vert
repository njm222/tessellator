varying vec3 vUv; 
varying float vDistance;
uniform float uSize;
uniform float uRadius;

void main() {
  vUv = position; 

  gl_PointSize = clamp(uSize, 0.75, 20.0);
  vDistance = uRadius - distance(position.xy, vec2(0.0));
  vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.5);
  gl_Position = projectionMatrix * modelViewPosition; 
}