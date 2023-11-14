varying vec2 vUv;
varying vec4 vPos;

void main() {
  gl_Position = projectionMatrix * modelViewMatrix * instanceMatrix * vec4(position, 1.0);
  vPos = instanceMatrix * vec4(position, 1.0);
  vUv = uv;
}