//Variables
var colourModeCounter = 0;
var freqModeCounter = 0;
var layerModeCounter = 0;

function changeLayerMode() {
    layerModeCounter++;

    if(layerModeCounter == 1500) {
        layerModeCounter = 0;
        layerKey = Math.floor(Math.random() * 9);
        //console.log("layer mode: " + layerKey);
    }
}

function changeColourMode() {
    colourModeCounter++;

    if (colourModeCounter == 360){
        colourModeCounter = 0;
        colourKey = Math.floor(Math.random() * 22);
        //console.log("colour mode: " + colourKey);
    }
}

function changeFreqMode() {
    freqModeCounter++;

    if(freqModeCounter == 500) {
        freqModeCounter = 0;
        freqKey = Math.floor(Math.random() * (11 - 2)) + 2;
        console.log("freq mode: " + freqKey);
    }
}