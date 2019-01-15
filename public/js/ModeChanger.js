//Variables
var modeCounter = 0;
var sectionEnd = 0;
function incrementModeCounter() {
    modeCounter+= 0.1;
}

var doIncrementModeCounter = setInterval(incrementModeCounter, 100);

function changeLayerMode() {
    sectionEnd = (g_sections[g_section]["start"] + g_sections[g_section]["duration"])*1000;
    //if(trackCounter > currSection.endtime) increment section and change layer
    if(trackCounter > sectionEnd){
        g_section++;
        modeCounter = 0;
        layerKey = Math.floor(Math.random() * 9);
        console.log("layer mode: " + layerKey);
    }

    /*if(modeCounter % 3000 == 0) {
        modeCounter = 0;
        layerKey = Math.floor(Math.random() * 9);
        console.log("layer mode: " + layerKey);
    }*/
}

function changeColourMode() {

    if (modeCounter % 360 == 0){
        colourKey = Math.floor(Math.random() * 22);
        //console.log("colour mode: " + colourKey);
    }
}

function changeFreqMode() {

    if(modeCounter % 500 == 0) {
        freqKey = Math.floor(Math.random() * (11 - 2)) + 2;
        //console.log("freq mode: " + freqKey);
    }
}