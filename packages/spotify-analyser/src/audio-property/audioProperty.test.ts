import AudioProperty from "./audioProperty";
import { SpotifyAudioPropertyData } from "./audioPropertyTypes";

const mockData: SpotifyAudioPropertyData[] = [
  { start: 0, duration: 1000, confidence: 0.9 },
  { start: 1000, duration: 500, confidence: 0.9 },
  { start: 1500, duration: 250, confidence: 0.9 },
];

describe("AudioProperty", () => {
  it("should setup correctly", () => {
    const section = new AudioProperty(mockData);

    expect(section.counter).toBe(0);
    expect(section.current).toBe(mockData[0]);
    expect(section.data).toBe(mockData);
  });
  it("should update audio property limits", () => {
    const property = new AudioProperty(mockData);

    property.updateAudioProperty(500);

    expect(property.counter).toBe(0);
    expect(property.current).toBe(mockData[0]);

    property.updateAudioProperty(1000);

    expect(property.counter).toBe(1);
    expect(property.current).toBe(mockData[1]);

    property.updateAudioProperty(1500);

    expect(property.counter).toBe(2);
    expect(property.current).toBe(mockData[2]);
  });
});
