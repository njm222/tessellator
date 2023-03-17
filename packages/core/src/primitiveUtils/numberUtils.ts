/**
 * Generates a random number between min & max
 * @param  {number} min The min range inclusive
 * @param  {number} max The max range exclusive
 * @return {number} The generated number
 */
export function generateRandomNumber(min: number, max: number): number {
  checkIfMaxMinValid(min, max);
  return Math.random() * (max - min) + min;
}
/**
 * Generates a random integer between min & max
 * @param  {number} min The min range inclusive
 * @param  {number} max The max range inclusive
 * @return {number} The generated number
 */
export function generateRandomInteger(min: number, max: number): number {
  checkIfMaxMinValid(min, max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function checkIfMaxMinValid(min: number, max: number) {
  if (max - min < 0) {
    throw Error("max cannot be less than min");
  }
}
