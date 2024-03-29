varying vec3 vUv;
uniform vec3 uColor;
uniform float uOpacity;
uniform float uTime;
uniform float uAmplitude;

vec3 palette( float t, vec3 baseColor ) {
  vec3 a = vec3(0.5, 0.5, 0.5);
  vec3 b = vec3(1.0, 1.0, 1.0);

  return a*cos( 3.1415*(b*t+baseColor) );
}

void main()
{
  vec3 color = palette(1.0 + vUv.z, uColor);

  float d = distance(0.0, (1.0 + vUv.z) * uAmplitude);

  d = pow(d, (1.0 + vUv.z) * uAmplitude);

  color += color * d;

  gl_FragColor = vec4(color, uOpacity);
}
