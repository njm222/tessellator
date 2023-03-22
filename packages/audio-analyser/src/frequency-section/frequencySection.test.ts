import FrequencySection from "./frequencySection";

const mockProps = {
  bucketSize: 64,
  lowerRange: 0,
  upperRange: 250,
};
const mockFrequencyData = new Uint8Array(1024).fill(1);
describe("FrequencySection", () => {
  it("should setup correctly", () => {
    const section = new FrequencySection(mockProps);

    expect(section.counter).toBe(0);
    expect(section.counterLimit).toBe(32);
    expect(section.average).toBe(0);
    expect(section.data).toEqual(new Array(32).fill(0));
    expect(section.deviation).toBe(0);
    expect(section.energy).toBe(0);
    expect(section.lowerRange).toBe(0);
    expect(section.upperRange).toBe(250);
    expect(section.lowerIndex).toBe(0);
    expect(section.upperIndex).toBe(4);
  });
  it("should update section limits", () => {
    const section = new FrequencySection(mockProps);

    section.updateSectionLimits(32);

    expect(section.lowerIndex).toBe(0);
    expect(section.upperIndex).toBe(8);
  });
  it("should update frequency section", () => {
    const section = new FrequencySection(mockProps);

    expect(section.counter).toBe(0);

    section.updateFrequencySection(mockFrequencyData);

    expect(section.average).toBeCloseTo(0.032);
    expect(section.energy).toBe(1);
    expect(section.deviation).toBeCloseTo(0.82);
    expect(section.data[0]).toBe(1);
    expect(section.counter).toBe(1);
  });
});
