varying vec3 vUv;
varying float vDistance;
uniform vec3 uColour;
uniform float uOpacity;
uniform float uTime;

vec3 palette( float t, vec3 baseColour ) {
    vec3 a = vec3(0.5, 0.5, 0.5);
    vec3 b = vec3(1.0, 1.0, 1.0);

    return a*cos( 6.28318*(b*t+baseColour) );
}

void main() {
  float distanceToCenter = distance(vUv,vec3(0.5));
  vec3 color = palette(vDistance, uColour);
  
  float distanceToCenterPoint = distance(gl_PointCoord, vec2(0.5));
  float strength = pow(1.0 - distanceToCenterPoint, 10.0);
  color = mix(color, vec3(0.98, 0.78, 0.39), vDistance * 0.5);
  color = mix(vec3(0.0), color, strength);
  
  gl_FragColor = vec4(color, uOpacity);
}