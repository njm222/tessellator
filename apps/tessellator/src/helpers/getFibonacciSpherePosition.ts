// adapted from https://gist.github.com/stephanbogner/a5f50548a06bec723dcb0991dcbb0856 by https://twitter.com/st_phan
export function getFibonacciSpherePosition(
  samples = 100,
  radius = 50,
  randomize = false
) {
  var random = 1;
  if (randomize === true) {
    random = Math.random() * samples;
  }

  const points = [];
  const offset = 2 / samples;
  const increment = Math.PI * (3 - Math.sqrt(5));

  for (let i = 0; i < samples; i++) {
    let y = i * offset - 1 + offset / 2;
    const distance = Math.sqrt(1 - Math.pow(y, 2));
    const phi = ((i + random) % samples) * increment;
    let x = Math.cos(phi) * distance;
    let z = Math.sin(phi) * distance;
    x = x * radius;
    y = y * radius;
    z = z * radius;

    const point = {
      x: x,
      y: y,
      z: z,
    };
    points.push(point);
  }
  return points;
}
