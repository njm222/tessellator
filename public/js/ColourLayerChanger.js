//Variables
var wait8 = 0;
var reverse = false;
var cubeCounter = 0;
var layerCounter = 0;
var wireframeCounter = 0;
var recentWireframe = 0;
var recentWireframe1 = Math.floor(Math.random() * (8 - 1) ) + 1;
var recentWireframe2 = Math.floor(Math.random() * (25 - 9) ) + 9;

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
function changeColourLayer1() {
    if(layerCounter > 0){
        changeColour(shapeArr[0], colour);
    }
    if(layerCounter > 60) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(layerCounter > 120) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    layerCounter++;
    if(layerCounter > 180){
        layerCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

function changeColourLayer2() {
    if(layerCounter < 60){
        changeColour(shapeArr[0], colour);
    }
    if(60 < layerCounter && layerCounter < 120) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(120 < layerCounter && layerCounter < 180) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    layerCounter++;
    if(layerCounter > 180){
        layerCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

function changeColourLayer3() {
    if(layerCounter > 0){
        changeColour(shapeArr[0], colour);
    }
    if(layerCounter > 180) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(layerCounter > 300) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    layerCounter++;
    if(layerCounter > 360){
        layerCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

//go middle out then repeat
function changeColourLayer4() {
    if(layerCounter < 60){
        for(var i = 1; i < 25; i++) {
            changeColour(shapeArr[i], 0x000000);
        }
        changeColour(shapeArr[0], colour);
    }
    if(60 < layerCounter) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(150 < layerCounter) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }

    layerCounter++;
    if(layerCounter > 300){
        layerCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

//colour change mode 5 = go middle out then back to middle
function changeColourLayer5() {
    if(layerCounter < 60){
        changeColour(shapeArr[0], colour);
    }
    if(60 < layerCounter && layerCounter < 120) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(120 < layerCounter && layerCounter < 210) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(210 < layerCounter && layerCounter < 300) {
        for(var i = 9; i < 25; i++){
            changeColour(shapeArr[i], 0x000000);
        }
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], colour);
        }
    }
    if(300 < layerCounter && layerCounter < 360) {
        for(var i = 1; i < 9; i++){
            changeColour(shapeArr[i], 0x000000);
        }
        changeColour(shapeArr[0], colour);
    }
    if(360 < layerCounter) {
        changeColour(shapeArr[0], 0x000000);
    }
    layerCounter++;
    if(layerCounter > 390){
        layerCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

function changeColourLayer6() {
    if(layerCounter > 5) {
        cubeCounter++;
        if(cubeCounter > 24)
            cubeCounter = 0;
    }

    changeColour(shapeArr[cubeCounter], colour);

    layerCounter++;
    if(layerCounter > 6){
        layerCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

function changeColourLayer7() {
    if(layerCounter > 60) {
        cubeCounter++;
        if(cubeCounter > 25)
            cubeCounter = 0;
    }

    for(var i = 0; i < cubeCounter; i++) {
        changeColour(shapeArr[i], colour);
    }

    layerCounter++;
    if(layerCounter > 61){
        layerCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}

function changeColourLayer8() {

    if(layerCounter > 5) {
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

    layerCounter++;
    if(layerCounter > 6){
        layerCounter = 0;
        //wireframeLayerChange();
        //randomWireframeChange();
        randomWireframeLayerChange();
        wireframeCounter++;
    }
}