import FrequencySection from "../frequency-section/frequencySection";
import AudioAnalyser from "./audioAnalyser";
jest.mock("../frequency-section/frequencySection");

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  (FrequencySection as jest.Mock).mockClear();
});

it("Should setup the defined frequency sections", () => {
  const audioAnalyser = new AudioAnalyser();
  expect(FrequencySection).toHaveBeenCalledTimes(5);
});

it("Should update each of the defined frequency sections", () => {
  // Show that mockClear() is working:
  expect(FrequencySection).not.toHaveBeenCalled();

  const audioAnalyser = new AudioAnalyser();

  audioAnalyser.updateData();

  const mockFrequencySectionInstances = (FrequencySection as jest.Mock).mock
    .instances;

  expect(mockFrequencySectionInstances.length).toBe(5);

  for (const instance of mockFrequencySectionInstances) {
    const mockUpdateData = instance.updateFrequencySection;
    expect(mockUpdateData).toHaveBeenCalledTimes(1);
  }
});
