var data_count = 0;
var global_count = 0;

var context,
    analyser,
    frequencyData,
    bufferLength,
    source;        // the audio source

if (navigator.mediaDevices.getUserMedia === undefined) {
    navigator.mediaDevices.getUserMedia = function(constraints) {

        // First get ahold of the legacy getUserMedia, if present
        var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;

        // Some browsers just don't implement it - return a rejected promise with an error
        // to keep a consistent interface
        if (!getUserMedia) {
            return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
        }

        // Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
        return new Promise(function(resolve, reject) {
            getUserMedia.call(navigator, constraints, resolve, reject);
        });
    }
}

if (navigator.mediaDevices.getUserMedia) {
    console.log('getUserMedia supported.');
    navigator.mediaDevices.enumerateDevices().then((devices) => {
        devices = devices.filter((d) => d.kind === 'audiooutput');
        console.log(devices);
        let constraints = {audio: {deviceId: 'default'}};
        navigator.mediaDevices.getUserMedia (constraints)
            .then(
                function(stream) { console.log(stream);
                    //Creates the context
                    if(typeof AudioContext !== "undefined"){
                        context = new AudioContext();
                    }
                    else if (typeof webkitAudioContext !== "undefined"){
                        context = new webkitAudioContext();
                    }
                    else {
                        console.log('AudioContext is not supported! Please view this with Chrome')
                    }
                    //create analyser
                    analyser = context.createAnalyser();
                    analyser.fftSize = 256;
                    /*analyser.maxDecibels = 0;
                    analyser.maxDecibels = 0;*/
                    analyser.smoothingTimeConstant = .75;
                    frequencyData = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(frequencyData);
                    bufferLength = analyser.frequencyBinCount;
                    analyser.minDecibels = -90;
                    analyser.maxDecibels = -25;
                    //attach source to the mic
                    source = context.createMediaStreamSource(stream);
                    //connect source to the analyser
                    source.connect(analyser);
                }).catch( function(err) { console.log('The following gUM error occured: ' + err);})
    }).catch( function(err) { console.log('The following error occured: ' + err);})
} else {
    console.log('getUserMedia not supported on your browser!');
}