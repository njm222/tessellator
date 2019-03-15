//Variables
var wait8 = 0;
var reverse = false;
var cubeCounter = 1;
var incrementBy = 1;
var tempoLayerCounter = 0;
var wireframeCounter = 0;
var recentWireframe = 0;
var recentWireframe1 = Math.floor(Math.random() * (8 - 1) ) + 1;
var recentWireframe2 = Math.floor(Math.random() * (25 - 9) ) + 9;

var randomCounter1 = 0;

function incrementLayerCounter() {
    tempoLayerCounter+= 0.01;
}

var doIncrementLayerCounter = setInterval(incrementLayerCounter, 10);

function randomWireframeLayerChange() {
    if(wireframeCounter < 5 && wireframeCounter < 10) {
        shapeArr[0].material.wireframe = false;
    }
    if(wireframeCounter > 10) {
        if(shapeArr[0].material.wireframe)
            shapeArr[0].material.wireframe = true;
    }
    if (wireframeCounter > 15)
        wireframeCounter = 0;

    if(wireframeCounter % 2) {
        if(shapeArr[recentWireframe1].material.wireframe) {
            shapeArr[recentWireframe1].material.wireframe = false;
            recentWireframe1 = Math.floor(Math.random() * (8 - 1) ) + 1;
            shapeArr[recentWireframe1].material.wireframe = true;
        }
    }
    else {
        if(shapeArr[recentWireframe2].material.wireframe) {
            shapeArr[recentWireframe2].material.wireframe = false;
            recentWireframe2 = Math.floor(Math.random() * (25 - 9) ) + 9;
            shapeArr[recentWireframe2].material.wireframe = true;
        }
    }
}

/*function randomWireframeChange() {
    shapeArr[recentWireframe].material.wireframe = false;
    recentWireframe = Math.floor(Math.random() * 25);
    shapeArr[recentWireframe].material.wireframe = true;
}

function wireframeLayerChange() {

    if(wireframeCounter == 0) {
        shapeArr[0].material.wireframe = false;
        for(var i = 1; i < 9; i++){
            shapeArr[i].material.wireframe = true;
        }
    }
    if(wireframeCounter == 1) {
        for(var i = 1; i < 9; i++){
            shapeArr[i].material.wireframe = false;
        }
        for(var i = 9; i < 25; i++){
            shapeArr[i].material.wireframe = true;
        }
    }
    if(wireframeCounter == 2) {
        for(var i = 9; i < 25; i++){
            shapeArr[i].material.wireframe = false;
        }
        shapeArr[0].material.wireframe = true;
    }

    if(wireframeCounter > 2) {
        wireframeCounter = 0;
    }
}*/

/*
* Layer 0 = 0
* Layer 1 = [1-8]
* Layer 2 = [9-24]
*/

function changeBar() {
    if(g_bars[g_bar]) {
        barEnd = (g_bars[g_bar]["start"] + g_bars[g_bar]["duration"]) * 1000;
        if (trackCounter > barEnd) {
            g_bar++;
            if(g_bar % 2 != 0) {
                changedColour = true;
            }
            barCounter++;
            if(g_bars[g_bar]) {
                barConfidence = g_bars[g_bar]["confidence"];
            }

            if(barConfidence > 0.5) {
                if((layerKey == (6 || 7 || 8) ||  barCounter % 2 == 0)) {
                    cameraRandom = Math.floor(Math.random() * 2);
                    positionCamera(cameraRandom);
                    console.log("cameraRandom:   " + cameraRandom);
                }
                if(barConfidence > 0.8) {
                    spinr++;
                }
            }
            //console.log("Bar increased: " + g_bar);
        }
    }
}

function changeBeat() {
    if(g_beats[g_beat]) {
        beatStart = g_beats[g_beat]["start"] * 1000;
        beatEnd = beatStart + (g_beats[g_beat]["duration"] * 1000);

        if (trackCounter > beatEnd) {
            g_beat++;
            if (g_beats[g_beat]) {
                beatConfidence = g_beats[g_beat]["confidence"];
            }
            if (beatConfidence > 0.34) {
                beatCounter++;
                if(beatConfidence > 0.9) {
                    spinr++;
                }
            }
        } else if(g_valence > 0.1) {
            let beatDuration = beatEnd-beatStart;
            if (beatConfidence > beatZoom && beatStart +((beatDuration/100)*2) < trackCounter < beatEnd - ((beatDuration / 100) * 27)) {
                if (cameraRandom > 3) {
                    camera.zoom = .65;
                } else {
                    changeCameraZoomBeat();
                }
            } else if(g_valence < 0.8) {
                if (cameraRandom > 3) {
                    randomCounter1++;
                    if(randomCounter1 > Math.pow(g_tempo, -1)*cc) {

                        if(randomCounter1 % 2 == 0) {
                            if(cameraRandom == 4) {
                                spotLight.position.set(-peak-300, 100, peak+300);
                            } else if(cameraRandom == 5) {
                                spotLight.position.set(peak+300, -100, -peak-300);
                            } else if(cameraRandom == 6) {
                                spotLight.position.set(100, peak+300, -peak-300);
                            } else if(cameraRandom == 7) {
                                spotLight.position.set(100, -peak-300, peak+300);
                            } else if(cameraRandom == 8) {
                                spotLight.position.set(peak+300, -peak-300, 100);
                            }
                            console.log(cameraRandom);
                            console.log(spotLight.position);
                        }
                        camera.zoom = (Math.random()*(15-2)+2)/15;
                        randomCounter1 = 0;
                    }
                } else {
                    changeCameraZoom();
                }
            }
        }
    }
}

function changeTatum() {
    if(g_tatums[g_tatum]) {
        tatumStart = g_tatums[g_tatum]["start"] * 1000;
        tatumEnd = tatumStart + (g_tatums[g_tatum]["duration"] * 1000);

        if (trackCounter > tatumEnd) {
            g_tatum++;
            if(g_tatums[g_tatum]) {
                tatumConfidence = g_tatums[g_tatum]["confidence"];
            }

            tatumCounter++;

        }
    }
}

function changeColourLayer001() {

    if(beatCounter == 1){
        changeColour(shapeArr[0], colour);
    }
    if(beatCounter == 2) {
        for(var i = 1; i < 9; i++) {
            changeColour(shapeArr[i], colour);
        }
    }
    if(beatCounter == 3) {
        for(var i = 9; i < 25; i++) {
            changeColour(shapeArr[i], colour);
        }
    }

    if(beatCounter > 4) {
        beatCounter = 0;
    }

    if(tatumCounter == 4) {
        //Morphing time
        changeColour(shapeArr[0], 0x000000);
    }
    if(tatumCounter == 8) {
        //Morphing time
        for (let i = 1; i < 9; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
    }
    if(tatumCounter == 12) {
        //Morphing time
        for (let i = 9; i < 25; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
    }

    if(tatumCounter > 15 == 0) {
        tatumCounter = 0;
    }
}

function changeColourLayer000() {
    if(beatCounter == 4) {
        beatCounter = 0;
    }

    if(beatCounter == 1){
        changeColour(shapeArr[0], colour);
    }
    if(beatCounter == 2) {
        for(var i = 1; i < 9; i++) {
            changeColour(shapeArr[i], colour);
        }
    }
    if(beatCounter == 3) {
        for(var i = 9; i < 25; i++) {
            changeColour(shapeArr[i], colour);
        }
    }

}

function changeColourLayer1() {

    if(beatCounter < 1 || tatumConfidence > (tatumAv+tatumVar)) {
        beatCounter = 1;
        for (let i = 1; i < shapeMax; i++) {
            changeColour(shapeArr[i], 0x000000);
        }

        if(setLargeShape = true) {
            shapeArr[0].scale.set(5,5,5);
            setLargeShape = false;
        }

        if(shapeArr[0].scale.x < 30 && tatumConfidence > (tatumAv+tatumVar) && cameraRandom % 2 == 0) {
            let tmp = shapeArr[0].scale.x + 0.05;
            shapeArr[0].scale.set(tmp, tmp, tmp);
            changeColour(shapeArr[0], colour);
        } else if(tatumConfidence > (tatumAv+tatumVar) && shapeArr[0].scale.x > 0.05) {
            let tmp = shapeArr[0].scale.x - 0.05;
            shapeArr[0].scale.set(tmp, tmp, tmp);
            changeColour(shapeArr[0], colour);
        }
    } else {
        setLargeShape = true;
        for (let i = 0; i < layerMarker[beatCounter - 2]; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    }

    if(beatCounter > 32){
        beatCounter = 0;
        setLargeShape = false;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

function changeColourLayer11() {
    if(tempoLayerCounter > 0){
        changeColour(shapeArr[0], colour);
    }

    if(tempoLayerCounter > g_tempo) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(tempoLayerCounter > g_tempo*2) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(tempoLayerCounter > g_tempo*4){
        tempoLayerCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

function changeColourLayer2() {

    if(beatCounter < 1 || tatumConfidence > (tatumAv+tatumVar)) {
        beatCounter = 1;
        for (let i = 1; i < shapeMax; i++) {
            changeColour(shapeArr[i], 0x000000);
        }

        if(setLargeShape = true) {
            shapeArr[0].scale.set(5,5,5);
            setLargeShape = false;
        }

        if(shapeArr[0].scale.x < 30 && tatumConfidence > (tatumAv+tatumVar) && cameraRandom % 2 == 0) {
            let tmp = shapeArr[0].scale.x + 0.05;
            shapeArr[0].scale.set(tmp, tmp, tmp);
            changeColour(shapeArr[0], colour);
        } else if(tatumConfidence > (tatumAv+tatumVar) && shapeArr[0].scale.x > 0.05) {
            let tmp = shapeArr[0].scale.x - 0.05;
            shapeArr[0].scale.set(tmp, tmp, tmp);
            changeColour(shapeArr[0], colour);
        }
    } else {
        setLargeShape = true;
        for (let i = 0; i < layerMarker[beatCounter - 2]; i = i+2) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    }

    if(beatCounter > 32){
        beatCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

function changeColourLayer22() {
    if(tempoLayerCounter < g_tempo){
        changeColour(shapeArr[0], colour);
    }
    if(g_tempo < tempoLayerCounter && tempoLayerCounter < g_tempo*2) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(g_tempo*2 < tempoLayerCounter && tempoLayerCounter < g_tempo*4) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(tempoLayerCounter > g_tempo*4){
        tempoLayerCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

function changeColourLayer3() {

    if(beatCounter < 1 || tatumConfidence > (tatumAv+tatumVar)) {
        beatCounter = 1;
        for (let i = 1; i < shapeMax; i++) {
            changeColour(shapeArr[i], 0x000000);
        }

        if(setLargeShape = true) {
            shapeArr[0].scale.set(5,5,5);
            setLargeShape = false;
        }

        if(shapeArr[0].scale.x < 30 && tatumConfidence > (tatumAv+tatumVar) && cameraRandom % 2 == 0) {
            let tmp = shapeArr[0].scale.x + 0.05;
            shapeArr[0].scale.set(tmp, tmp, tmp);
            changeColour(shapeArr[0], colour);
        } else if(tatumConfidence > (tatumAv+tatumVar) && shapeArr[0].scale.x > 0.05) {
            let tmp = shapeArr[0].scale.x - 0.05;
            shapeArr[0].scale.set(tmp, tmp, tmp);
            changeColour(shapeArr[0], colour);
        }
    } else {
        setLargeShape = true;
        changeColour(shapeArr[0], 0x000000);
        scaleShape(shapeArr[0]);
        for (let i = 1; i < layerMarker[beatCounter - 2]; i = i+2) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    }

    if(beatCounter > 32){
        beatCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

function changeColourLayer33() {
    if(tempoLayerCounter > 0){
        changeColour(shapeArr[0], colour);
    }
    if(tempoLayerCounter > g_tempo*2) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(tempoLayerCounter > g_tempo*4) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(tempoLayerCounter > g_tempo*8){
        tempoLayerCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

//go middle out then repeat
function changeColourLayer4() {

    if (beatCounter <= 2) {
        for(let i = 0; i < shapeArr.length; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
    } else if (beatCounter < 4) {
        changeColour(shapeArr[0], colour);
        scaleShape(shapeArr[0]);
    } else if (beatCounter < 6) {
        for(let i = layerMarker[0]; i < layerMarker[1]; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    } else if (beatCounter < 8) {
        for(let i = layerMarker[1]; i < layerMarker[2]; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    } else if (beatCounter < 10) {
        for(let i = layerMarker[2]; i < layerMarker[3]; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    } else if (beatCounter < 12) {
        for(let i = layerMarker[3]; i < layerMarker[4]; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    } else if (beatCounter < 14) {
        for(let i = layerMarker[4]; i < layerMarker[5]; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    } else if (beatCounter < 16) {
        for(let i = layerMarker[5]; i < layerMarker[6]; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    } else if (beatCounter < 18) {
        for(let i = layerMarker[6]; i < layerMarker[7]; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    } else if (beatCounter < 20) {
        for(let i = layerMarker[7]; i < layerMarker[8]; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    } else if (beatCounter < 22) {
        for(let i = layerMarker[8]; i < layerMarker[9]; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    } else if (beatCounter < 24) {
        for(let i = layerMarker[9]; i < layerMarker[10]; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    } else if (beatCounter < 26) {
        for(let i = layerMarker[10]; i < layerMarker[11]; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    } else if (beatCounter < 28) {
        for(let i = layerMarker[11]; i < layerMarker[12]; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    } else if (beatCounter < 30) {
        for(let i = layerMarker[12]; i < layerMarker[13]; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    } else if (beatCounter < 32) {
        for(let i = layerMarker[13]; i < layerMarker[14]; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    } else if (beatCounter < 34) {
        for(let i = layerMarker[14]; i < layerMarker[15]; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    } else if (beatCounter < 36) {
        for(let i = layerMarker[15]; i < layerMarker[16]; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    }

    if(42 <= beatCounter){
        beatCounter = 0;
        randomWireframeLayerChange();
        wireframeCounter++;
    }

    /*if(beatConfidence > baaaa) {
        beatCounter = Math.random() * beatCounter;
        console.log("beatConfidence:     " + beatConfidence);
    }*/
}

function changeColourLayer44() {
    if (tempoLayerCounter < g_tempo/2) {
        for(var i = 0; i < 25; i++) {
            changeColour(shapeArr[i], 0x000000)
        }
    }
    if(g_tempo/2 < tempoLayerCounter && tempoLayerCounter < g_tempo){
        for(var i = 1; i < 25; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        changeColour(shapeArr[0], colour);
    }
    if(g_tempo < tempoLayerCounter && tempoLayerCounter < g_tempo*2.5) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(g_tempo*2.5 < tempoLayerCounter) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(tempoLayerCounter > g_tempo*4){
        tempoLayerCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

//colour change mode 5 = go middle out then back to middle
function changeColourLayer5() {

    if(beatCounter <= 2){
        changeColour(shapeArr[0], colour);
    }
    if(2 <= beatCounter && beatCounter <= 4) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(4 <= beatCounter && beatCounter <= 8) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(8 < beatCounter && beatCounter <= 10) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], 0x000000);
        }
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(10 < beatCounter && beatCounter <= 12) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], 0x000000);
        }
        changeColour(shapeArr[0], colour);
    }
    if(12 < beatCounter) {
        changeColour(shapeArr[0], 0x000000);
    }
    if(14 < beatCounter){
        shapeType = Math.random()*4;
        beatCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

function changeColourLayer55() {
    if(tempoLayerCounter < g_tempo){
        changeColour(shapeArr[0], colour);
    }
    if(g_tempo < tempoLayerCounter && tempoLayerCounter < g_tempo*2) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(g_tempo*2 < tempoLayerCounter && tempoLayerCounter < g_tempo*2.5) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(g_tempo*2.5 < tempoLayerCounter && tempoLayerCounter < g_tempo*3) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], 0x000000);
        }
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(g_tempo*3 < tempoLayerCounter && tempoLayerCounter < g_tempo*4) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], 0x000000);
        }
        changeColour(shapeArr[0], colour);
    }
    if(g_tempo*4 < tempoLayerCounter) {
        changeColour(shapeArr[0], 0x000000);
    }
    if(tempoLayerCounter > g_tempo*4.5){
        tempoLayerCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

function changeColourLayer6() {
    if(beatCounter == 2) {
        cubeCounter += incrementBy;
        if(cubeCounter > shapeArr.length) {
            for (let i = 0; i < shapeArr.length; i++) {
                changeColour(shapeArr[i], 0x000000);
            }
            cubeCounter = 0;
            incrementBy = 1;
        }
        console.log(cubeCounter);
    }

    if(cubeCounter > layerMarker[15]) {
        for (let i = layerMarker[14]; i < layerMarker[15]; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        incrementBy = 30;
    } else if(cubeCounter > layerMarker[14]) {
        for (let i = layerMarker[13]; i < layerMarker[14]; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        incrementBy = 28;
    } else if(cubeCounter > layerMarker[13]) {
        for (let i = layerMarker[12]; i < layerMarker[13]; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        incrementBy = 26;
    } else if(cubeCounter > layerMarker[12]) {
        for (let i = layerMarker[11]; i < layerMarker[12]; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        incrementBy = 24;
    } else if(cubeCounter > layerMarker[11]) {
        for (let i = layerMarker[10]; i < layerMarker[11]; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        incrementBy = 22;
    } else if(cubeCounter > layerMarker[10]) {
        for (let i = layerMarker[9]; i < layerMarker[10]; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        incrementBy = 20;
    } else if(cubeCounter > layerMarker[9]) {
        for (let i = layerMarker[8]; i < layerMarker[9]; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        incrementBy = 18;
    } else if(cubeCounter > layerMarker[8]) {
        for (let i = layerMarker[7]; i < layerMarker[8]; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        incrementBy = 16;
    } else if(cubeCounter > layerMarker[7]) {
        for (let i = layerMarker[6]; i < layerMarker[7]; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        incrementBy = 14;
    } else if(cubeCounter > layerMarker[6]) {
        for (let i = layerMarker[5]; i < layerMarker[6]; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        incrementBy = 12;
    } else if(cubeCounter > layerMarker[5]) {
        for (let i = layerMarker[4]; i < layerMarker[5]; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        incrementBy = 10;
    } else if(cubeCounter > layerMarker[4]) {
        for (let i = layerMarker[3]; i < layerMarker[4]; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        incrementBy = 8;
    } else if(cubeCounter > layerMarker[3]) {
        for (let i = layerMarker[2]; i < layerMarker[3]; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        incrementBy = 6;
    } else if(cubeCounter > layerMarker[2]) {
        for (let i = layerMarker[1]; i < layerMarker[2]; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        incrementBy = 4;
    } else if(cubeCounter > layerMarker[1]) {
        for (let i = layerMarker[0]; i < layerMarker[1]; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        incrementBy = 2;
    } else if(cubeCounter > layerMarker[0]) {
        changeColour(shapeArr[0], 0x000000);
        incrementBy = 1;
    }

    if(cubeCounter >= shapeArr.length) {
        cubeCounter = shapeArr.length-1;
    }

    for(let i = layerMarker[Math.floor(incrementBy/2)]; i < cubeCounter; i++) {
        changeColour(shapeArr[i], colour);
    }

    if(beatCounter > 1){
        beatCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

function changeColourLayer66() {
    if(tempoLayerCounter > g_tempo/25) {
        cubeCounter++;
        if(cubeCounter > 24)
            cubeCounter = 0;
    }

    changeColour(shapeArr[cubeCounter], colour);

    if(tempoLayerCounter > g_tempo/25){
        tempoLayerCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

function changeColourLayer7() {

    if(cubeCounter < shapeMax && tatumConfidence > tc && tatumStart < trackCounter < tatumEnd) {
        cubeCounter += 1;
    }
    if(beatConfidence > bc) {
        if(cubeCounter > shapeMax)
            cubeCounter = shapeMax;
        for(let i = 0; i < cubeCounter; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    }

    if(barCounter % 2 == 0){
        for(let i = 0; i < shapeMax; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        cubeCounter = 1;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

function changeColourLayer77() {
    if(tempoLayerCounter > g_tempo) {
        cubeCounter++;
        if(cubeCounter > 25)
            cubeCounter = 0;
    }

    for(var i = 0; i < cubeCounter; i++) {
        changeColour(shapeArr[i], colour);
    }
    if(tempoLayerCounter > g_tempo+1){
        tempoLayerCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

function changeColourLayer8() {

    if(tempoLayerCounter > 3) {
        if(reverse == false) {
            cubeCounter++;
            wait8 = 0;
        } else {
            wait8++;
            if (wait8 > 360)
                cubeCounter--;
        }
        if(cubeCounter > shapeMax) {
            reverse = true;
        }
        if(cubeCounter == 0) {
            reverse = false;
        }
    }

    if(reverse == false) {
        for(let i = 0; i < cubeCounter; i++) {
            changeColour(shapeArr[i], colour);
            scaleShape(shapeArr[i]);
        }
    } else {
        if (wait8 > 360)
            changeColour(shapeArr[cubeCounter-1], 0x00000);
        else {
            for(let i = 0; i < cubeCounter-1; i++) {
                changeColour(shapeArr[i], colour);
                scaleShape(shapeArr[i]);
            }
        }
    }
    if(tempoLayerCounter > 5){
        tempoLayerCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}