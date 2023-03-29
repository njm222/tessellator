import { Color, ColorRepresentation, Vector3 } from "three";

export function hexToVector3(hexStr: string) {
  //check if valid hex value
  if (/^#([0-9A-F]{3}){1,2}$/i.test(hexStr)) {
    const colour = new Color(hexStr as ColorRepresentation);
    return new Vector3(colour.r, colour.g, colour.b);
  } else {
    return new Vector3(1, 1, 1);
  }
}
