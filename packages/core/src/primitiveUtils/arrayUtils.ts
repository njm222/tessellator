/**
 * Given an array get the max index
 * @param  {number[]} values The array of numbers
 * @return {number} The index of the number
 */
export function getIndexOfMax(values: number[] | undefined): number {
  if (!values) return 0;
  return values.indexOf(Math.max(...values));
}
/**
 * Given an array get the min index
 * @param  {number[]} values The array of numbers
 * @return {number} The index of the number
 */
export function getIndexOfMin(values: number[] | undefined): number {
  if (!values) return 0;
  return values.indexOf(Math.min(...values));
}
