/**
 * Generates a random hex color
 *
 * @return {string} The hex color
 */
export function getRandomHexColor(): string {
  var letters = "0123456789ABCDEF";
  var color = "#";
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
}
