import AudioAnalyser from './audioAnalyser';
jest.mock("./audioAnalyser")

beforeEach(() => {
  // Clear all instances and calls to constructor and all methods:
  (AudioAnalyser as jest.Mock).mockClear();
});

it('We can check if the class constructor was called', () => {
  const audioAnalyser = new AudioAnalyser();
  expect(AudioAnalyser).toHaveBeenCalledTimes(1);
});

it('We can check if the class method was called', () => {
  // Show that mockClear() is working:
  expect(AudioAnalyser).not.toHaveBeenCalled();

  const audioAnalyser = new AudioAnalyser();
  expect((AudioAnalyser as jest.Mock)).toHaveBeenCalledTimes(1);

  audioAnalyser.updateData()

  const mockAudioAnalyserInstance = (AudioAnalyser as jest.Mock).mock.instances[0];
  const mockUpdateData = mockAudioAnalyserInstance.updateData;
  expect(mockUpdateData).toHaveBeenCalledTimes(1);
});


/**
 * Create mocks for following types:
 * analyserData
 * frequencySection
 *
 */