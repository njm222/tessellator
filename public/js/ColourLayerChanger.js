//Variables
var wait8 = 0;
var reverse = false;
var cubeCounter = 0;
var tempoLayerCounter = 0;
var wireframeCounter = 0;
var recentWireframe = 0;
var recentWireframe1 = Math.floor(Math.random() * (8 - 1) ) + 1;
var recentWireframe2 = Math.floor(Math.random() * (25 - 9) ) + 9;

var detailShape = Math.random()*4;

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

function randomWireframeChange() {
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
}

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
            barCounter++;
            if(g_bars[g_bar]) {
                barConfidence = g_bars[g_bar]["confidence"];
            }
            //console.log(barConfidence);

            if(barConfidence > yy && barCounter % 2 == 0) {
                cameraRandom = Math.floor(Math.random() * 9);
                //console.log("cameraRandom: " + cameraRandom);
                positionCamera(cameraRandom);
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
            if(g_beats[g_beat]) {
                beatConfidence = g_beats[g_beat]["confidence"];
            }

            if (beatConfidence > 0.34)
                beatCounter++;
            //console.log("Beat increased: " + g_beat);

            //console.log("beat " + beatConfidence);

        } else if (beatConfidence > 0.865 && beatStart /*+(((beatEnd - beatStart)/10)*2)*/ < trackCounter < beatEnd - (((beatEnd - beatStart) / 10) * xx)) {
            if (cameraRandom > 3) {
                camera.zoom = .65;
            } else {
                changeCameraZoomBeat();
            }
        } else {
            if (cameraRandom > 3) {
                camera.zoom = .65;
            } else {
                changeCameraZoom();
            }
        }/*else if(tatumConfidence > 0.78 && tatumStart /!*+(((tatumEnd - tatumStart)/10)*2)*!/ < trackCounter < tatumEnd - (((tatumEnd - tatumStart)/10)*3)) {
            if(cameraRandom > 3) {
                camera.zoom = .65;
            } else {
                changeCameraZoomTatum();
            }
        }*/
    }
}

function changeTatum() {
    if(g_tatums[g_tatum]) {
        tatumStart = g_tatums[g_tatum]["start"] * 1000;
        tatumEnd = tatumStart + (g_tatums[g_tatum]["duration"] * 1000);

        if (trackCounter > tatumEnd) {
            g_tatum++;
            tatumCounter++;
            //console.log("Tatum increased: " + g_tatum);

            if(g_tatums[g_tatum]) {
                tatumConfidence = g_tatums[g_tatum]["confidence"];
            }

            //console.log("tatum " + tatumConfidence);

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
        changeShapeType(detail, 0, 4);
        positionShape();
    }
    if(tatumCounter == 8) {
        //Morphing time
        for (let i = 1; i < 9; i++) {
            changeColour(shapeArr[i], 0x000000);
            changeShapeType(detail, i, 4);
        }
        positionShape();
    }
    if(tatumCounter == 12) {
        //Morphing time
        for (let i = 9; i < 25; i++) {
            changeColour(shapeArr[i], 0x000000);
            changeShapeType(detail, i, 4);
        }
        positionShape();
    }

    if(tatumCounter % 13 == 0) {
        points = Math.floor(Math.random() * (4 - 1)) + 1;
        detail = Math.floor(Math.random() * 3);
    }

    if(tatumCounter > 15) {
        for(var i = 0; i < 25; i++) {
            changePoints(shapeArr[i], points);
        }
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

    if(tatumCounter == 2) {
        detail = Math.floor(Math.random() * (5 - 1)) + 1;
        detailShape = Math.floor(Math.random() * 25);
    }

    if(tatumCounter > 3) {
        //Morphing time
        tatumCounter = 0;
        points = Math.floor(Math.random() * (4 - 1)) + 1;
        for(var i = 0; i < 25; i++) {
            changePoints(shapeArr[i], points);
        }
    }
}

function changeColourLayer1() {
    if(beatCounter > 0){
        changeColour(shapeArr[0], colour);
    }

    if(beatCounter > 1) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(beatCounter > 2) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(beatCounter > 3){
        beatCounter = 0;
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
    if(beatCounter <= 1){
        changeColour(shapeArr[0], colour);
    }
    if(1 < beatCounter && beatCounter <= 3) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(3 < beatCounter && beatCounter <= 6) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(beatCounter > 8){
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
    if(beatCounter >= 0){
        changeColour(shapeArr[0], colour);
    }
    if(beatCounter >= 1) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(beatCounter >= 2) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(beatCounter >= 3){
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
    if(beatCounter < 1) {
        points = Math.floor(Math.random() * (4 - 1)) + 1;
        detail = Math.floor(Math.random() * 3);
        shapeType = Math.random()*4;
    }

    if (beatCounter <= 1) {
        for(var i = 0; i < 25; i++) {
            changeColour(shapeArr[i], 0x000000);
            changePoints(shapeArr[i], points);
            changeShapeType(detail, i, shapeType);
        }
        positionShape();
    }
    if (beatCounter <= 2) {
        for(var i = 0; i < 25; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
    }
    if(2 <= beatCounter && beatCounter < 4){
        for(var i = 1; i < 25; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        changeColour(shapeArr[0], colour);
    }
    if(4 <= beatCounter && beatCounter < 7) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(7 <= beatCounter) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(10 < beatCounter){
        beatCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
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
            changePoints(shapeArr[i], points);
            changeShapeType(detail, i, shapeType);
        }
        positionShape();
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(10 < beatCounter && beatCounter <= 12) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], 0x000000);
            changePoints(shapeArr[i], points);
            changeShapeType(detail, i, shapeType);
        }
        positionShape();
        changeColour(shapeArr[0], colour);
    }
    if(12 < beatCounter) {
        changeColour(shapeArr[0], 0x000000);
        changePoints(shapeArr[0], points);
        changeShapeType(detail, 0, shapeType);
        positionShape();
    }
    if(14 < beatCounter){
        points = Math.floor(Math.random() * (4 - 1)) + 1;
        detail = Math.floor(Math.random() * 3);
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
        cubeCounter++;
        if(cubeCounter > 24) {
            cubeCounter = 0;
            for (let i = 0; i < 25; i++) {
                changeColour(shapeArr[i], 0x000000);
            }
        } else if(cubeCounter > 8) {
            for (let i = 0; i < 9; i++){
                changeColour(shapeArr[i], 0x000000);
            }
            for (let k = cubeCounter+1; k < 25; k++){
                changeColour(shapeArr[k], 0x000000);
            }
            for (let j = 9; j < cubeCounter; j++) {
                changeColour(shapeArr[j], colour);
            }
        } else if(cubeCounter > 0) {
            changeColour(shapeArr[0], 0x000000);
            for (let j = 1; j < cubeCounter; j++) {
                changeColour(shapeArr[j], colour);
            }
            for (let k = cubeCounter+1; k < 25; k++){
                changeColour(shapeArr[k], 0x000000);
            }
        }
    }

    changeColour(shapeArr[cubeCounter], colour);

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

    if(tatumCounter % 4 == 0) {
        cubeCounter++;
        if(cubeCounter > 25)
            cubeCounter = 0;
        for(var i = 0; i < cubeCounter; i++) {
            changeColour(shapeArr[i], colour);
        }
    } else {
        for(var i = 0; i < cubeCounter; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
    }

    if(tatumCounter > 32){
        tatumCounter = 0;
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

    if(tempoLayerCounter > 5) {
        if(reverse == false) {
            cubeCounter++;
            wait8 = 0;
        } else {
            wait8++;
            if (wait8 > 20)
                cubeCounter--;
        }
        if(cubeCounter > 25) {
            reverse = true;
        }
        if(cubeCounter == 0) {
            reverse = false;
        }
    }

    if(reverse == false) {
        for(var i = 0; i < cubeCounter; i++)
            changeColour(shapeArr[i], colour);
    } else {
        if (wait8 > 20)
            changeColour(shapeArr[cubeCounter-1], 0x00000);
        else {
            for(var i = 0; i < cubeCounter-1; i++)
                changeColour(shapeArr[i], colour);
        }
    }
    if(tempoLayerCounter > 6){
        tempoLayerCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}