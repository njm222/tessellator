import { Color, ColorRepresentation, Vector3 } from "three";

export function hexToVector3(hexStr: string) {
  //check if valid hex value
  if (/^#([0-9A-F]{3}){1,2}$/i.test(hexStr)) {
    const color = new Color(hexStr as ColorRepresentation);
    return new Vector3(color.r, color.g, color.b);
  } else {
    return new Vector3(1, 1, 1);
  }
}
