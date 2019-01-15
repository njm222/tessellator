//Variables
var wait8 = 0;
var reverse = false;
var cubeCounter = 0;
var tempoLayerCounter = 0;
var wireframeCounter = 0;
var recentWireframe = 0;
var recentWireframe1 = Math.floor(Math.random() * (8 - 1) ) + 1;
var recentWireframe2 = Math.floor(Math.random() * (25 - 9) ) + 9;

var beatEnd = 0;
var beatLayerCounter = 0;

function incrementLayerCounter() {
    tempoLayerCounter+= 0.01;
}

var doIncrementLayerCounter = setInterval(incrementLayerCounter, 10);

function randomWireframeLayerChange() {
    if(wireframeCounter < 5 && wireframeCounter < 10) {
        shapeArr[0].material.wireframe = false;
    }
    if(wireframeCounter > 10) {
        shapeArr[0].material.wireframe = true;
    }
    if (wireframeCounter > 15)
        wireframeCounter = 0;

    if(wireframeCounter % 2) {
        shapeArr[recentWireframe1].material.wireframe = false;
        recentWireframe1 = Math.floor(Math.random() * (8 - 1) ) + 1;
        shapeArr[recentWireframe1].material.wireframe = true;
    }
    else {
        shapeArr[recentWireframe2].material.wireframe = false;
        recentWireframe2 = Math.floor(Math.random() * (25 - 9) ) + 9;
        shapeArr[recentWireframe2].material.wireframe = true;
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

function changeLayer() {
    beatEnd = (g_beats[g_beat]["start"] + g_beats[g_beat]["duration"])*1000;

    if(trackCounter > beatEnd) {
        g_beat++;
        beatLayerCounter++;
    }
}

function changeColourLayer1() {
    if(beatLayerCounter > 0){
        changeColour(shapeArr[0], colour);
    }

    if(beatLayerCounter > 1) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(beatLayerCounter > 2) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(beatLayerCounter > 3){
        beatLayerCounter = 0;
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
    if(beatLayerCounter <= 1){
        changeColour(shapeArr[0], colour);
    }
    if(1 < beatLayerCounter && beatLayerCounter <= 3) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(3 < beatLayerCounter && beatLayerCounter <= 6) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(beatLayerCounter > 8){
        beatLayerCounter = 0;
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
    if(beatLayerCounter >= 0){
        changeColour(shapeArr[0], colour);
    }
    if(beatLayerCounter >= 1) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(beatLayerCounter >= 2) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(beatLayerCounter >= 3){
        beatLayerCounter = 0;
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
    if (beatLayerCounter <= 2) {
        for(var i = 0; i < 25; i++) {
            changeColour(shapeArr[i], 0x000000)
        }
    }
    if(2 <= beatLayerCounter && beatLayerCounter < 4){
        for(var i = 1; i < 25; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        changeColour(shapeArr[0], colour);
    }
    if(4 <= beatLayerCounter && beatLayerCounter < 7) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(7 <= beatLayerCounter) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(10 < beatLayerCounter){
        beatLayerCounter = 0;
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
    if(beatLayerCounter <= 2){
        changeColour(shapeArr[0], colour);
    }
    if(2 <= beatLayerCounter && beatLayerCounter <= 5) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(5 <= beatLayerCounter && beatLayerCounter <= 8) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(8 < beatLayerCounter && beatLayerCounter <= 10) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], 0x000000);
        }
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(10 < beatLayerCounter && beatLayerCounter <= 12) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], 0x000000);
        }
        changeColour(shapeArr[0], colour);
    }
    if(12 < beatLayerCounter) {
        changeColour(shapeArr[0], 0x000000);
    }
    if(beatLayerCounter > 14){
        beatLayerCounter = 0;
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
    if(beatLayerCounter == 2) {
        cubeCounter++;
        if(cubeCounter > 24)
            cubeCounter = 0;
    }

    changeColour(shapeArr[cubeCounter], colour);

    if(beatLayerCounter > 1){
        beatLayerCounter = 0;
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
    if(beatLayerCounter > 1) {
        cubeCounter++;
        if(cubeCounter > 25)
            cubeCounter = 0;
    }

    for(var i = 0; i < cubeCounter; i++) {
        changeColour(shapeArr[i], colour);
    }
    if(beatLayerCounter > 2){
        beatLayerCounter = 0;
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