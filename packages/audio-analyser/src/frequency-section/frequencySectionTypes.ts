/**
 * @property {number} bucketSize - sampling frequency divided by the number of samples in your FFT
 * @property {number} lowerRange - lower bounds of the frequency range in Hz
 * @property {number} upperRange - upper bounds of the frequency range in Hz
 * @property {number?} counterLimit - limit of the data array length
 */
export type FrequencySectionProps = {
    bucketSize: number;
    lowerRange: number;
    upperRange: number;
    counterLimit?: number;
}

/**
 * @property {number} deviation - standard deviation of the data array
 * @property {number} average - mean average of the data array
 * @property {number} energy - current average decibel value for the frequency section
 * @property {number} counter - current index of the data array
 * @property {number} counterLimit - limit of the data array length
 * @property {number} lowerIndex - lower bounds of the frequencyData
 * @property {number} upperIndex - upper bounds of the frequencyData
 * @property {number[]} data - average decibel value over time
 */
export type FrequencySection = {
    deviation: number;
    average: number;
    energy: number;
    counter: number;
    counterLimit: number;
    lowerIndex: number;
    upperIndex: number;
    data: number[];
};
