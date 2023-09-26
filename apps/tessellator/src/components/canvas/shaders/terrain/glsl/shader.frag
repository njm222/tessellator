varying vec3 vUv;
uniform vec3 uColour;
uniform float uOpacity;

void main()
{
  vec3 complimentaryColour = vec3(1.0 - uColour.x, 1.0 - uColour.y, 1.0 - uColour.z);
  vec3 color = mix(uColour, complimentaryColour, vUv.z);
  color = mix(vec3(0.0), color, vUv.z + 0.9);

  gl_FragColor = vec4(color, uOpacity);
}
