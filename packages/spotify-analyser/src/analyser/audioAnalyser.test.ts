import AudioProperty from "../audio-property/audioProperty";
import { SpotifyAudioData } from "../audio-property/audioPropertyTypes";
import SpotifyAnalyser from "./spotifyAnalyser";
jest.mock("../audio-property/audioProperty");

const mockData: {
  bars: SpotifyAudioData[];
  beats: SpotifyAudioData[];
  sections: SpotifyAudioData[];
  segments: SpotifyAudioData[];
  tatums: SpotifyAudioData[];
} = {
  bars: [],
  beats: [],
  sections: [],
  segments: [],
  tatums: [],
};

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  (AudioProperty as jest.Mock).mockClear();
});

it("Should setup the defined audio properties", () => {
  const spotifyAnalyser = new SpotifyAnalyser(mockData);
  expect(AudioProperty).toHaveBeenCalledTimes(5);
});

it("Should update each of the defined audio properties", () => {
  // Show that mockClear() is working:
  expect(AudioProperty).not.toHaveBeenCalled();

  const spotifyAnalyser = new SpotifyAnalyser();
  spotifyAnalyser.setData(mockData);

  spotifyAnalyser.updateData({ position: 0 });

  const mockAudioPropertyInstances = (AudioProperty as jest.Mock).mock
    .instances;

  expect(mockAudioPropertyInstances.length).toBe(5);

  for (const instance of mockAudioPropertyInstances) {
    const mockUpdateData = instance.updateAudioProperty;
    expect(mockUpdateData).toHaveBeenCalledTimes(1);
  }
});
