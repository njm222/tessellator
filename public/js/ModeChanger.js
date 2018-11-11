//Variables
var colourModeCounter = 0;
var freqModeCounter = 0;
var layerModeCounter = 0;

function changeLayerMode() {
    layerModeCounter++;

    if(layerModeCounter == 5000) {
        layerModeCounter = 0;
        layerKey++;
        if(layerKey == 9) {
            layerKey = 1;
        }
        console.log("layer mode: " + layerKey);
    }
}

function changeColourMode() {
    colourModeCounter++;

    if (colourModeCounter == 1000){
        colourModeCounter = 0;
        currKey++;
        if (currKey == 10) {
            currKey = 1;
        }
        console.log("colour mode: " + currKey);
    }
}

function changeFreqMode() {
    freqModeCounter++;

    if(freqModeCounter == 500) {
        freqModeCounter = 0;
        freqKey++;
        if(freqKey == bufferLength-4) {
            freqKey = 4;
        }
        console.log("freq mode: " + freqKey);
    }
}