//Variables
var sectionEnd = 0;

function changeLayerMode() {
    if(g_sections[g_section]){
        sectionEnd = (g_sections[g_section]["start"] + g_sections[g_section]["duration"])*1000;
        g_tempo = (g_sections[g_section]["tempo"]);
        //if(trackCounter > currSection.endtime) increment section and change layer
        if(trackCounter > sectionEnd){
            g_section++;

            //console.log(g_tempo);

            layerKey = Math.floor(Math.random() * (10 - 1)) + 1;
            console.log("layer mode: " + layerKey);
        }
    }
}

function changeColourMode() {

    if (g_beat % 32 == 0){
        colourKey = Math.floor(Math.random() * 10);
        //console.log("colour mode: " + colourKey);
    }
}

function changeFreqMode() {

    if(g_tatum % 53 == 0) {
        freqKey = Math.floor(Math.random() * (11 - 2)) + 2;
        //console.log("freq mode: " + freqKey);
    }
}