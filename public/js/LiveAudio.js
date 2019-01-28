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
        devices = devices.filter((d) => d.kind === 'audioinput');
        var constraints = {audio: {deviceId: devices[0].deviceId}};
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
                    analyser.fftSize = 64;
                    /*analyser.maxDecibels = 0;
                    analyser.maxDecibels = 0;*/
                    analyser.smoothingTimeConstant = .75;
                    frequencyData = new Uint8Array(analyser.frequencyBinCount);
                    analyser.getByteFrequencyData(frequencyData);
                    bufferLength = analyser.frequencyBinCount;
                    //attach source to the mic
                    source = context.createMediaStreamSource(stream);
                    //connect source to the analyser
                    source.connect(analyser);
                    gotVisualizerScripts = true;
                }).catch( function(err) { console.log('The following gUM error occured: ' + err);})
    }).catch( function(err) { console.log('The following error occured: ' + err);})
} else {
    console.log('getUserMedia not supported on your browser!');
}

/*
var $player = document.getElementsByTagName('iframe');
$player_source = $player.ge

// Creates the analyser
analyser = context.createAnalyser();
//Defines the quality (Range from 32 to 2048
analyser.fftSize = 2048;
//Array for the data to be stored
frequencyData = new Uint8Array(analyser.frequencyBinCount);
//Length of the array
bufferLength = analyser.frequencyBinCount;
//Connect audio source to the player
source = context.createMediaElementSource($player_source);
//Connect the analyser to the source
source.connect(analyser);

///////////////////////////
/// Data Array for capturing
///////////////////////////
var $data = [];
var $audioData = [];
function makeArray($data){
    if($dataArray == undefined){
        var $dataArray = [$data];
    }
    else{
        $dataArray.push($data);
    }
    return $dataArray;
}

function capture(data) {
    //  audio input source microphone
    source = context.createMediaStreamSource(data);
    audio_data = data;

    analyser= context.createAnalyser();

    // Create the array for the data values
    analyser.getByteFrequencyData(frequencyData);
    var realtimeData = new Uint8Array(analyser.frequencyBinCount);
console.log(frequencyData);

    // Now connect the nodes together
    // Do not connect source node to destination - to avoid feedback
    source.connect(analyser);
    analyser.connect(processor);
    processor.connect(context.destination);
}

function update() {
    // amplitudeArray = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteTimeDomainData(frequencyData);

    var $transform_audiData = [];
    for(var i=0;i< frequencyData.length;i++){
        $transform_audiData.push(frequencyData[i]);
    }
    var $array = $transform_audiData;
    $audioData.push($array);
    // draw one column of the display
    $loop = requestAnimationFrame(update);
}

function renderAudio() {
    global_count++;
    analyser.getByteFrequencyData(frequencyData);
    var data_count = frequencyData.length;
}*/
