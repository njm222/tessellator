//Variables
var wait8 = 0;
var reverse = false;
var shapeCounter = 1;
var incrementBy = 1;
var tempoLayerCounter = 0;
let recentWireframe = new Array(8).fill(0);

let fib0 = 0;
let fib1 = 1;
function incrementTrackCounter() {
    trackCounter+= 10;
}

var doIncrementTrackCounter = setInterval(incrementTrackCounter, 10);

function randomWireframeChange() {
    for(let i = 0; i < recentWireframe.length; i++) {
        shapeArr[recentWireframe[i]].material.wireframe = false;
        recentWireframe[i] = Math.floor(Math.random()*(shapeMax/4));
        shapeArr[recentWireframe[i]].material.wireframe = !shapeArr[recentWireframe[i]].material.wireframe;
    }
}

function setModeKey() {
    if(g_sections[g_section]){
        sectionEnd = (g_sections[g_section]["start"] + g_sections[g_section]["duration"])*1000;
        g_tempo = (g_sections[g_section]["tempo"]);
        spotLight.intensity = (g_sections[g_section]["loudness"] + 40) / 10;

        if(trackCounter > sectionEnd){
            g_section++;

            modeKey.key = Math.floor(Math.random() * (8 - 1)) + 1;
            console.log("layer mode: " + modeKey.key);
        }
    }
}

function setColourKey() {

    if (g_bar % 2 == 0 && changedColour == true){
        colourKey = Math.floor(Math.random() * 13);
        changedColour = false;
        console.log("colour mode: " + colourKey);
    }
}

function changeFreqMode() {

    if(g_tatum % 53 == 0) {
        freqKey = Math.floor(Math.random() * (11 - 2)) + 2;
        //console.log("freq mode: " + freqKey);
    }
}

function changeBar() {
    if(g_bars[g_bar]) {
        barEnd = (g_bars[g_bar]["start"] + g_bars[g_bar]["duration"]) * 1000;
        if (trackCounter > barEnd) {
            g_bar++;
            barCounter++;
            bassArrCounter = 0;
            kickArrCounter = 0;
            snareArrCounter = 0;
            midsArrCounter = 0;
            highsArrCounter = 0;

            if(g_bar % 2 !== 0) {
                changedColour = true;
            }
            if(g_bars[g_bar]) {
                barConfidence = g_bars[g_bar]["confidence"];
            }

            if(barConfidence > 0.5) {
                if(modeKey.key !== 7 && barCounter % 2 === 0) {
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
            // console.log("Beat increased: " + g_beat);
            g_beat++;
            if (g_beats[g_beat]) {
                beatConfidence = g_beats[g_beat]["confidence"];
            }
            if (beatConfidence > (beatAv-(beatVar))) {
                beatCounter++;
                console.log("beat");
                if(beatConfidence > 0.9) {
                    spinr++;
                }
            }
        } /*else if(g_valence > 0.1) {
            let beatDuration = beatEnd-beatStart;
            if (beatConfidence > beatZoom && beatStart +((beatDuration/100)*2) < trackCounter < beatEnd - ((beatDuration / 100) * 27)) {
                if (cameraRandom > 3) {
                    camera.zoom = .65;
                } else {
                    changeCameraZoom();
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
        }*/
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
            if (tatumConfidence > (tatumAv-(tatumVar))) {
                tatumCounter++;
            }

        }
    }
}

function resetMode() {
    // clear screen or something?
    console.log('resetMode');
    beatCounter = 0;
    tatumCounter = 0;
    shapeCounter = 0;
    changedColour = true;
    fib0 = 0;
    fib1 = 1;
    shapeIncrement = Math.ceil(Math.random() * 7);
    noise = new SimplexNoise(Math.random());

    for(let i = 0; i < shapeMax; i++){
        changeColour(shapeArr[i], '0x0000');
    }
}

function mode1() {
    if(tatumCounter > 1) {
        randomWireframeChange();
        tatumCounter = 0;
    }

    if(beatCounter > 3) {
        for(let i = layerMarker[beatCounter-4]; i < layerMarker[beatCounter-3]; i++) {
            changeColour(shapeArr[i], '0x0000');
        }
        for(let i = layerMarker[beatCounter-2]; i < layerMarker[beatCounter]; i++) {
            changeColour(shapeArr[i], colour);
        }
    } else {
        if(beatCounter !== 0) {
            for(let i = layerMarker[beatCounter-1]; i < layerMarker[beatCounter]; i++) {
                changeColour(shapeArr[i], colour);
            }
        }
        changeColour(shapeArr[0], colour);
    }

    shapeCounter = layerMarker[beatCounter];

    if(beatCounter > layerMarker.length-1){
        resetMode();
    }
}

function mode2() {
    if(tatumCounter > 1) {
        randomWireframeChange();
        tatumCounter = 0;
    }

    if(beatCounter > 3) {
        for(let i = layerMarker[beatCounter-4]; i < layerMarker[beatCounter-3]; i = i+2) {
            changeColour(shapeArr[i], '0x0000');
        }
        for(let i = layerMarker[beatCounter-2]; i < layerMarker[beatCounter]; i = i+2) {
            changeColour(shapeArr[i], colour);
        }
    } else {
        if(beatCounter !== 0) {
            for(let i = layerMarker[beatCounter-1]; i < layerMarker[beatCounter]; i = i+2) {
                changeColour(shapeArr[i], colour);
            }
        } else {
            changeColour(shapeArr[0], colour);
        }
    }

    shapeCounter = layerMarker[beatCounter];

    if(beatCounter > layerMarker.length-1){
        resetMode();
    }
}

function mode3() {
    if(tatumCounter > 1) {
        randomWireframeChange();
        tatumCounter = 0;
    }

    if(beatCounter > 3) {
        for(let i = layerMarker[beatCounter-4]; i < layerMarker[beatCounter-3]; i = i+shapeIncrement) {
            changeColour(shapeArr[i], '0x0000');
        }
        for(let i = layerMarker[beatCounter-2]; i < layerMarker[beatCounter]; i = i+shapeIncrement) {
            changeColour(shapeArr[i], colour);
        }
    } else {
        if(beatCounter !== 0) {
            for(let i = layerMarker[beatCounter-1]; i < layerMarker[beatCounter]; i = i+shapeIncrement) {
                changeColour(shapeArr[i], colour);
            }
        }
        changeColour(shapeArr[0], colour);
    }

    shapeCounter = layerMarker[beatCounter];

    if(beatCounter > layerMarker[layerMarker.length-1]){
        resetMode(modeKey.key);
    }
}

function mode4() {
    if(tatumConfidence > (tatumAv+tatumVar*1.25)) {
        if(shapeCounter-1 < layerMarker[layerMarker.length-1]) {
            shapeCounter++;
        }
        for(let i = 0; i < shapeCounter; i++) {
            changeColour(shapeArr[i], colour);
        }
    } else {
        changeColour(shapeArr[beatCounter], colour);
    }

    if(shapeCounter >= layerMarker[layerMarker.length-1] || beatCounter >= layerMarker[layerMarker.length-2]){
        resetMode();
    }
}

function mode5() {
    if(tatumCounter > 1) {
        randomWireframeChange();
        tatumCounter = 0;
    }

    if(beatCounter > 1) {
        if(shapeCounter+fib0+fib1 < layerMarker[layerMarker.length-1]) {
            shapeCounter = fib0 + fib1;
            fib0 = fib1;
            fib1 = shapeCounter;
            console.log(shapeCounter);
            beatCounter = 0;
        }
        for(let i = 0; i < shapeCounter; i++) {
            if(i % 2 === 0) {
                changeColour(shapeArr[i], 0x0000);
            } else {
                changeColour(shapeArr[i], colour);
            }
        }
    }

    if(shapeCounter+fib0+fib1 >= layerMarker[layerMarker.length-1]){
        resetMode();
    }
}

function mode6() {

    prevThetaS = Math.PI/4 * Math.sin(g_tempo*g_energy*trackCounter/100000);

    if(tatumCounter > 1) {
        tatumCounter = 0;
    }
    if(beatCounter > 1) {
        shapeArr[0].material.wireframe = !shapeArr[0].material.wireframe;
        shapeArr[0].material.flatShading = !shapeArr[0].material.wireframe;
        shapeArr[0].material.needsUpdate = true;
        beatCounter = 0;
    } else if(barCounter >= 1) {
        prevThetaL = avFreq % Math.PI;
        barCounter = 0;
    } else {
        if(bassEnergy > bassAv - (bassDeviation*bassFactor)) {
            prevWidth = 3 + Math.floor(snareAv/2) % 30;
            prevHeight = 3 + Math.floor(kickAv/2) % 30;
        }
    }
    removeShape();
    addGenerativeSphere();
    changeColour(shapeArr[0], colour);
}

let noiseFreq = 64;
let pow7;
/** Perlin Noise Heightmap displacement*/
function mode7() {

    if(beatCounter > 1) {
        //heightMapVersion = Math.floor(Math.random()*shapeArr[0].geometry.attributes.position.count/3);
        if(snareEnergy > snareAv - (snareDeviation*snareFactor)) {
            shapeArr[0].material.wireframe = !shapeArr[0].material.wireframe;
            shapeArr[0].material.flatShading = !shapeArr[0].material.wireframe;
            shapeArr[0].material.needsUpdate = true;
        }
        beatCounter = 0;
    }

    if(g_energy > .7) {
        noiseFreq = bassAv;
    } else if (g_energy > .4) {
        noiseFreq = snareAv;
    } else {
        noiseFreq = midsAv;
    }

    let position = shapeArr[0].geometry.attributes.position;
    let zHeight = g_energy*midsAv;

    if(barCounter % g_time_signature === 0) {
        heightMapVersion -= Math.abs(Math.sin(beatEnd - trackCounter)) + snareEnergy*g_tempo*0.0001;
    } else {
        heightMapVersion += Math.abs(Math.sin(beatEnd - trackCounter)) + snareEnergy*g_tempo*0.0001;
    }

    pow7 = (bassAv+snareEnergy+bassEnergy)/400;

    for (let i = 0; i < position.count; i++) {
        let z;
        if(barCounter % 3 === 0) {
            z = Math.pow(noise.noise2D(((i%513) - heightMapVersion) / noiseFreq, (Math.floor(i/513) - heightMapVersion) / noiseFreq)*zHeight, pow7);
        } else if(barCounter % 4 === 0) {
            z = Math.pow(noise.noise2D(((i%513) - heightMapVersion) / noiseFreq, (Math.floor(i/513) + heightMapVersion) / noiseFreq)*zHeight, pow7);
        } else if(barCounter % 5 === 0) {
            z = Math.pow(noise.noise2D(((i%513) + heightMapVersion) / noiseFreq, (Math.floor(i/513) - heightMapVersion) / noiseFreq)*zHeight, pow7);
        } else {
            z = Math.pow(noise.noise2D(((i%513) + heightMapVersion) / noiseFreq, (Math.floor(i/513) + heightMapVersion) / noiseFreq)*zHeight, pow7);
        }

        if(z > 0) {
            position.setZ(i, z);
            //mountain
        } else if(g_valence > .5) {
            position.setZ(i, (noise.noise2D(Date.now()/2000, i/noiseFreq)*Math.min((highsEnergy+highsAv), 25)));
            //water
        } else {
            position.setZ(i, (noise.noise2D(i/noiseFreq, Date.now()/2000)*Math.min((highsEnergy+highsAv), 25)));
            //water
        }
    }
    position.needsUpdate = true;
    shapeArr[0].geometry.verticesNeedUpdate = true;
    shapeArr[0].geometry.computeBoundingSphere();
    changeColour(shapeArr[0], colour);
}