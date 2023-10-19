uniform float uOpacity;
uniform vec3 uColor;
varying vec2 vUv;

void main() {
  gl_FragColor = vec4(uColor, uOpacity);
}