/**
 * Generates a hex color given the hsl values
 * @param  {number} h The hue
 * @param  {number} s The saturation
 * @param  {number} l The lightness
 * @return {string} The hex color
 */
export function hslToHex(h: number, s: number, l: number): string {
  h = (h % 361) / 360;
  s = (s % 256) / 255;
  l = (l % 256) / 255;
  let r, g, b;
  if (s === 0) {
    r = g = b = l; // achromatic
  } else {
    const hue2rgb = (p: number, q: number, t: number) => {
      if (t < 0) t += 1;
      if (t > 1) t -= 1;
      if (t < 1 / 6) return p + (q - p) * 6 * t;
      if (t < 1 / 2) return q;
      if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
      return p;
    };
    const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    const p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  const toHex = (x: number) => {
    const hex = Math.round(x * 255).toString(16);
    return hex.length === 1 ? "0" + hex : hex.slice(0, 2);
  };
  return `#${toHex(r)}${toHex(g)}${toHex(b)}`;
}
