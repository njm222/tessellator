uniform float uOpacity;
uniform vec3 uColor;
varying vec2 vUv;
flat varying int instanceID;
varying vec4 vPos;

int maxIndex3 (vec3 v) {
  int index = 0;
  float max = v[0];
  for ( int i=1; i<3; i+=1 ) {
    if(v[i] > max) {
      index = i;
      max = v[i];
    }
  }
  return index;
}

vec3 palette(float t, vec3 d) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(0.5, 0.5, 0.5);
  vec3 c = vec3(1.0, 1.0, 1.0);
  return a + b * cos(6.28318 * (c * t + d));
}

void main() {
  float distanceFromCenter = distance(vPos.xyz, vec3(0.5)) * .05;
  
  vec3 color = palette(distanceFromCenter, uColor);

  int index = maxIndex3(color);
  vec3 boost = vec3(0.0);
  boost[index] = color[index];


  gl_FragColor = vec4(color+boost, uOpacity);
}
