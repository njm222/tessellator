//Constants
const width = window.innerWidth;
const height = window.innerHeight;

// Audio Variables
let currFreq = 0;
let avFreq = 0;
let peak = 0;
let rms = 0;
let rmslow = 20;
let rmshigh = 80;
let lowerBass = 0;
let upperBass = 4;
let lowerKick = 1;
let upperKick = 3;
let lowerSnare = 2;
let upperSnare = 4;
let lowerMids = 4;
let upperMids = 18;
let lowerHighs = 32;
let upperHighs = 128;

let bassEnergy = 0;
let kickEnergy = 0;
let snareEnergy = 0;
let midsEnergy = 0;
let highsEnergy = 0;

let bassArrCounter = 0;
let bassArr = [];
let bassAv = 0;
let bassDeviation = 0;
let bassFactor = 1.5;

let kickArrCounter = 0;
let kickArr = [];
let kickAv = 0;
let kickDeviation = 0;
let kickFactor = 1.6;

let snareArrCounter = 0;
let snareArr = [];
let snareAv = 0;
let snareDeviation = 0;
let snareFactor = 1.4;

let midsArrCounter = 0;
let midsArr = [];
let midsAv = 0;
let midsDeviation = 0;
let midsFactor = 1.2;

let highsArrCounter = 0;
let highsArr = [];
let highsAv = 0;
let highsDeviation = 0;
let highsFactor = 1.2;

//Spotify features and analysis variables
let g_danceability = 0;
let g_energy = 0;
let g_valence = 0;
let g_tempo = 0;
let g_time_signature = 0;
let g_section = 0;
let g_sections = 0;
let g_bar = 0;
let g_bars = 0;
let g_beat = 0;
let g_beats = 0;
let g_tatum = 0;
let g_tatums = 0;
let g_segment = 0;
let g_segments = 0;

//Visualizer variables
let trackCounter = 0;
let trackEnd = 999999;
let isPaused = true;
let isChangingShape = false;
let isVisualizer = false;
let isLiveVisualizer = false;

let shapeMax = 529;
let layerMarker = [];

let tatumAv = 0.93;
let tatumVar = 0;
let beatAv = 0.93;
let beatVar = 0;

let sectionEnd = 0;

let colourModifier = 0;

let barStart = 0;
let barEnd = 0;
let barCounter = 0;
let barConfidence = 0;

let beatStart = 0;
let beatEnd = 0;
let beatCounter = 0;
let beatConfidence = 0;

let tatumStart = 0;
let tatumEnd = 0;
let tatumCounter = 0;
let tatumConfidence = 0;

// Rotation Variables
let spinr, spinf = 0;
const spin2 = 0.03;
const spin3 = 0.015;
const spin4 = 0.075;
const spin5 = 0.0025;
const spin6 = 0.001;

let zoomIntensity = 30;
let xx = 0.4;
let zz = 0.5;
let cc = 7500;
let tc = 0.35;
let bc = 0.5;

let randomizer = false;
let changedColour = true;
let heightMapVersion = 3;

let modeSwitch = false;
let shapeArr = [];
let shapeType;
let shapeIncrement = 1;
let colourKey = 7;
let freqKey = 10;
let modeKey = {
    keyInternal: 1,
    keyListener: function (val) {},
    set key(val) {
        this.keyInternal = val;
        this.keyListener(val);
    },
    get key() {
        return this.keyInternal;
    },
    registerListener: function (listener) {
        this.keyListener = listener;
    }
};

modeKey.registerListener(function (val) {
    console.log("modeKey changed to " + val);

    $('.visualizerMode').css('color', '#FFF');
    $('#mode_' + val).css('color', '#3AD36B');
    if (modeKey.key < 6) {
        if (modeSwitch) {
            $('#shapeType').show();
            removeShape();
            addShape(shapeType);
            setShapePosition();
            modeSwitch = false;
        }

        resetMode();
    } else {
        removeShape();

        if (modeKey.key == 6) {
            addGenerativeSphere();
        }
        if (modeKey.key == 7) {
            positionCamera(0);
            addOcean();
            heightMapVersion = 0;
            noise = new SimplexNoise(Math.random());
        }

        if (!modeSwitch) {
            $('#shapeType').hide();
            modeSwitch = true;
        }
    }
});

let toggleZoom = false;
let toggleRotate = false;

let randomizeColour = false;
let randomizeMode = false;

let points = 1;
let detail = 1;
let cameraRandom = Math.floor(Math.random() * 7);

//Scene Setup
let scene = new THREE.Scene();
let camera = new THREE.PerspectiveCamera(75,width/height, 0.1, 1000);
//camera.focalLength = -90;
let renderer = new THREE.WebGLRenderer();
//renderer.setPixelRatio( window.devicePixelRatio );
let controls = new THREE.OrbitControls(camera);

//Stats
/*javascript:(function(){let script=document.createElement('script');script.onload=function(){let stats=new Stats();document.body.appendChild(stats.dom);requestAnimationFrame(function loop(){stats.update();requestAnimationFrame(loop)});};script.src='//mrdoob.github.io/stats.js/build/stats.min.js';document.head.appendChild(script);})()*/

//Material
let colour = new THREE.Color("rgb(256,256,256)");
let basicMaterial = new THREE.MeshBasicMaterial( { color: 0x000000, side: THREE.DoubleSide } );
let lambertMaterial = new THREE.MeshLambertMaterial( { color: 0x000000 } );
let phongMaterial = new THREE.MeshPhongMaterial( { color: 0x000000, side: THREE.DoubleSide, shading: THREE.FlatShading} );
let depthMaterial = new THREE.MeshDepthMaterial( { wireframe: true } );

//Geometry
let cubeGeo = new THREE.BoxGeometry(10,10,10);
let octaGeo = new THREE.OctahedronGeometry(10, 0);
let dodecaGeo = new THREE.DodecahedronGeometry(10, 0);
let sphereGeo = new THREE.SphereGeometry(5, 32, 32);
let tetraGeo = new THREE.TetrahedronGeometry(10, 0);

//Generative Sphere variables
let prevThetaS = 0;
let prevThetaL = Math.PI/4;
let prevWidth = 32;
let prevHeight = 32;

//Perlin Terrain variables
let planeGeo = new THREE.PlaneBufferGeometry(window.innerWidth, window.innerWidth, 512, 512);

//Light
let l1 = new THREE.PointLight(0xffffff);
let spotLight = new THREE.SpotLight(0xffffff);

let noise = new SimplexNoise(Math.random());

function addGenerativeSphereSimple() {
    prevThetaS = 1+Math.sin(snareAv)*g_valence % (2*Math.PI);
    //prevThetaL = kickEnergy % Math.PI;

    shapeArr.push(new THREE.Mesh(new THREE.SphereBufferGeometry(50, prevWidth, prevHeight % 32, 0, Math.PI * 2, prevThetaS % (Math.PI / 4), prevThetaL), phongMaterial));
    shapeArr[0].rotation.set(Math.PI / 2, 0, 0);
    scene.add(shapeArr[0]);
    console.log(prevThetaS);
}

function addGenerativeSphere() {
    //prevThetaS = Math.PI * Math.sin(bassAv);
    //prevThetaL = kickEnergy % Math.PI;
    prevThetaS = Math.PI/4 * Math.sin(trackCounter/250);

    shapeArr.push(new THREE.Mesh(new THREE.SphereBufferGeometry(50, Math.floor(bassEnergy) % 32, Math.floor(kickEnergy) % 32, 0, Math.PI * 2, prevThetaS % (Math.PI / 4), prevThetaL), phongMaterial));
    shapeArr[0].rotation.set(Math.PI / 2, 0, 0);
    scene.add(shapeArr[0]);
    console.log("added generative sphere");
}

function addOcean() {

    shapeArr.push(new THREE.Mesh(planeGeo, phongMaterial));
    shapeArr[0].rotation.set(-Math.PI/4, 0, Math.PI/2);
    shapeArr[0].position.set(0, 0, -250);
    scene.add(shapeArr[0]);
    console.log("added ocean");

    //Deform Ocean

}

//Cube Grid
function addShape(shapeType) {

    if(shapeType == 1) {
        for(let i = 0; i < shapeMax; i++) {
            shapeArr.push(new THREE.Mesh(cubeGeo, new THREE.MeshLambertMaterial( { color: 0x000000 } )));
            scene.add(shapeArr[i]);
            console.log("added new cube");
        }
    } else if(shapeType == 2) {
        for(let i = 0; i < shapeMax; i++) {
            shapeArr.push(new THREE.Mesh(octaGeo, new THREE.MeshLambertMaterial({ color: 0x000000 })));
            scene.add(shapeArr[i]);
            console.log("added new octa");
        }
    } else if(shapeType == 3) {
        for(let i = 0; i < shapeMax; i++) {
            shapeArr.push(new THREE.Mesh(sphereGeo, new THREE.MeshLambertMaterial({ color: 0x000000 })));
            scene.add(shapeArr[i]);
            console.log("added new sphere");
        }
    } else if(shapeType == 4) {
        for(let i = 0; i < shapeMax; i++) {
            shapeArr.push(new THREE.Mesh(tetraGeo, new THREE.MeshLambertMaterial({ color: 0x000000 })));
            scene.add(shapeArr[i]);
            console.log("added new tetra");
        }
    } else {
        for(let i = 0; i < shapeMax; i++) {
            shapeArr.push(new THREE.Mesh(dodecaGeo, new THREE.MeshLambertMaterial({ color: 0x000000 })));
            scene.add(shapeArr[i]);
            console.log("added new dodeca");
        }
    }
}

function changeShape(shapeType) {
    isChangingShape = true;
    removeShape();
    addShape(shapeType);
    setShapePosition();
    isChangingShape = false;
}

function removeShape() {
    for(let i = 0; i < shapeArr.length; i++) {
        scene.remove(shapeArr[i]);
        shapeArr[i].geometry.dispose();
        shapeArr[i].material.dispose();
    }
    shapeArr = [];
}

function setShapePosition() {
    //variables
    let a = 0;
    let f = 1;
    let x = 0;
    let y = 0;
    let z = 0;
    let distance = 20;
    let shapeCount = 0;
    let lim = 12;

    //layer 0
    shapeArr[shapeCount++].position.set(x,y,z);
    x = x + distance;

    layerMarker[0] = 1;

    //layer 1-<lim
    for(f; f < lim; f++){
        for(a = 1; a < 2*f; a++) {
            shapeArr[shapeCount++].position.set(x,y,z);
            y = y - distance;
        }
        for(a = 0; a < 2*f; a++) {
            shapeArr[shapeCount++].position.set(x,y,z);
            x = x - distance;
        }
        for(a = 0; a < 2*f; a++) {
            shapeArr[shapeCount++].position.set(x,y,z);
            y = y + distance;
        }
        for(a = -1; a < 2*f; a++) {
            shapeArr[shapeCount++].position.set(x,y,z);
            x = x + distance;
        }

        layerMarker[f] = shapeCount;
        console.log(shapeCount);
        z = z - distance;
    }
    console.log(layerMarker);
}

function positionCamera(cameraRandom) {
    switch (cameraRandom) {
        case 0:
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 300;
            spotLight.position.set(0, 0, 350);
            break;
        case 1:
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = -300;
            spotLight.position.set(0, 0, -350);
            break;
        case 2:
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = -300;
            spotLight.position.set(0, 0, -350);
            break;
        case 3:
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 300;
            spotLight.position.set(-peak-300, peak+300, 350);
            break;
        case 4:
            camera.position.x = 0;
            camera.position.y = 90;
            camera.position.z = 0;
            spotLight.position.set(Math.random() * (180 + 180) -180, 100, Math.random() * (180 + 180) -180);
            break;
        case 5:
            camera.position.x = 0;
            camera.position.y = -90;
            camera.position.z = 0;
            spotLight.position.set(Math.random() * (180 + 180) -180, -100, Math.random() * (180 + 180) -180);
            break;
        case 6:
            camera.position.x = 90;
            camera.position.y = 0;
            camera.position.z = 0;
            spotLight.position.set(100, Math.random() * (180 + 180) -180, Math.random() * (180 + 180) -180);
            break;
        case 7:
            camera.position.x = -90;
            camera.position.y = 0;
            camera.position.z = 0;
            spotLight.position.set(-100, Math.random() * (180 + 180) -180, Math.random() * (180 + 180) -180);
            break;
        default:
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 90;
            spotLight.position.set(Math.random() * (180 + 180) -180, Math.random() * (180 + 180) -180, 100);
    }
}

//Variable width/height canvas
window.addEventListener('resize', re => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    /*effect3d.setSize(width, height);*/
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

function rgbToHexHelper(num){
    let hex = Math.ceil(num).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r,g,b) {
    return ("0x" + rgbToHexHelper(r) + rgbToHexHelper(g) + rgbToHexHelper(b));
}


function hslToHex(h, s, l) {
    h /= 360;
    s /= 255;
    l /= 255;
    let r, g, b;
    if (s === 0) {
        r = g = b = l; // achromatic
    } else {
        const hue2rgb = (p, q, t) => {
            if (t < 0) t += 1;
            if (t > 1) t -= 1;
            if (t < 1 / 6) return p + (q - p) * 6 * t;
            if (t < 1 / 2) return q;
            if (t < 2 / 3) return p + (q - p) * (2 / 3 - t) * 6;
            return p;
        };
        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
        const p = 2 * l - q;
        r = hue2rgb(p, q, h + 1 / 3);
        g = hue2rgb(p, q, h);
        b = hue2rgb(p, q, h - 1 / 3);
    }
    const toHex = x => {
        const hex = Math.round(x * 255).toString(16);
        return hex.length === 1 ? '0' + hex : hex;
    };
    return `0x${toHex(r)}${toHex(g)}${toHex(b)}`;
}

function changeColour(currShape, currColour) {
    currShape.material.color.setHex(currColour);
}

function setColour(key) {
    if(beatConfidence > (beatAv - beatVar/2)) {
        colourModifier = (beatEnd-trackCounter)/4;
        //console.log("colourModifier" + colourModifier);
    }

    switch (key) {
        case 1:
            colour = rgbToHex(avFreq, avFreq, Math.pow(bassAv, 1.12));
            break;
        case 2:
            colour = rgbToHex(avFreq, Math.pow(bassAv, 1.12), avFreq);
            break;
        case 3:
            colour = rgbToHex(Math.pow(bassAv, 1.12), avFreq, avFreq);
            break;
        case 4:
            colour = rgbToHex(avFreq/2, avFreq/2, snareAv + colourModifier);
            break;
        case 5:
            colour = rgbToHex(avFreq/2, snareAv + colourModifier, avFreq/2);
            break;
        case 6:
            colour = rgbToHex(snareAv + colourModifier, avFreq/2, avFreq/2);
            break;
        case 7:
            colour = rgbToHex(rms, avFreq, peak);
            break;
        case 8:
            colour = rgbToHex(peak, avFreq, rms);
            break;
        case 9:
            colour = rgbToHex(avFreq*2, avFreq/10, avFreq*3);
            break;
        case 10:
            colour = rgbToHex(currFreq[13], currFreq[9], currFreq[5]);
            break;
        default:
            colour = rgbToHex(currFreq[4], currFreq[8], currFreq[12]);
    }

}

function doMode(key) {
    switch (key) {
        case 1:
            mode1();
            break;
        case 2:
            mode2();
            break;
        case 3:
            mode3();
            break;
        case 4:
            mode4();
            break;
        case 5:
            mode5();
            break;
        case 6:
            mode6();
            break;
        case 7:
            mode7();
            break;
        default:
            mode7();
    }
}

function rotateShape(shape) {
    spinf = currFreq[freqKey];

    if(spinr % 2 == 0) {
        if(spinf > 150) {
            if (spinf > 200) {
                shape.rotation.x -= spin3;
                shape.rotation.y -= spin2;
                shape.rotation.z -= spin3;
            } else {
                shape.rotation.x -= spin4;
                shape.rotation.y -= spin3;
                shape.rotation.z -= spin4;
            }
        } else {
            if (spinf > 100) {
                shape.rotation.x -= spin5;
                shape.rotation.y += spin3;
                shape.rotation.z -= spin6;
            } else {
                shape.rotation.x -= spin6;
                shape.rotation.y += spin4;
                shape.rotation.z -= spin5;
            }
        }
    } else {
        if(spinf > 150) {
            if (spinf > 200) {
                shape.rotation.x += spin3;
                shape.rotation.y += spin2;
                shape.rotation.z += spin3;
            } else {
                shape.rotation.x += spin4;
                shape.rotation.y += spin3;
                shape.rotation.z += spin4;
            }
        } else {
            if (spinf > 100) {
                shape.rotation.x += spin5;
                shape.rotation.y -= spin3;
                shape.rotation.z += spin6;
            } else {
                shape.rotation.x += spin6;
                shape.rotation.y -= spin4;
                shape.rotation.z += spin5;
            }
        }
    }
}

function resetData() {
    bassEnergy = 0;
    kickEnergy = 0;
    snareEnergy = 0;
    midsEnergy = 0;
    highsEnergy = 0;
    avFreq = 0;
    rms = 0;
    peak = 0;
    bassAv = 0;
    bassDeviation = 0;
    kickAv = 0;
    kickDeviation = 0;
    snareAv = 0;
    snareDeviation = 0;
    midsAv = 0;
    midsDeviation = 0;
    highsAv = 0;
    highsDeviation = 0;
}

function getBassData() {
    for (let i = lowerBass; i < upperBass; i++) {
        bassEnergy += frequencyData[i];
    }
    bassEnergy = bassEnergy/(upperBass-lowerBass);
    bassArr[bassArrCounter++] = bassEnergy;
}

function getKickData() {
    for (let i = lowerKick; i < upperKick; i++) {
        kickEnergy += frequencyData[i];
    }
    kickEnergy = kickEnergy/(upperKick-lowerKick);
    kickArr[kickArrCounter++] = kickEnergy;
}

function getSnareData() {
    for (let i = lowerSnare; i < upperSnare; i++) {
        snareEnergy += frequencyData[i];
    }
    snareEnergy = snareEnergy/(upperSnare-lowerSnare);
    snareArr[snareArrCounter++] = snareEnergy;
}

function getMidsData() {
    for (let i = lowerMids; i < upperMids; i++) {
        midsEnergy += frequencyData[i];
    }
    midsEnergy = midsEnergy/(upperMids-lowerMids);
    midsArr[midsArrCounter++] = midsEnergy;
}

function getHighsData() {
    for (let i = lowerHighs; i < upperHighs; i++) {
        highsEnergy += frequencyData[i];
    }
    highsEnergy = highsEnergy/(upperHighs-lowerHighs);
    highsArr[highsArrCounter++] = highsEnergy;
}

function getDeviations() {
    for(let i = 0; i < bassArr.length; i++) {
        bassAv += bassArr[i];
        bassDeviation += bassArr[i]*bassArr[i];

        kickAv += kickArr[i];
        kickDeviation += kickArr[i]*kickArr[i];

        snareAv += snareArr[i];
        snareDeviation += snareArr[i]*snareArr[i];

        midsAv += midsArr[i];
        midsDeviation += midsArr[i]*midsArr[i];

        highsAv += highsArr[i];
        highsDeviation += highsArr[i]*highsArr[i];
    }

    bassAv = bassAv/bassArr.length;
    bassDeviation = Math.sqrt(bassDeviation / bassArr.length - bassAv * bassAv);

    kickAv = kickAv/kickArr.length;
    kickDeviation = Math.sqrt(kickDeviation / kickArr.length - kickAv * kickAv);

    snareAv = snareAv/snareArr.length;
    snareDeviation = Math.sqrt( snareDeviation / snareArr.length - snareAv * snareAv);

    midsAv = midsAv/midsArr.length;
    midsDeviation = Math.sqrt( midsDeviation / midsArr.length - midsAv * midsAv);

    highsAv = highsAv/highsArr.length;
    highsDeviation = Math.sqrt( highsDeviation / highsArr.length - highsAv * highsAv);
}

function getAvFreq() {
    for (let i = 0; i < bufferLength; i++) {
        avFreq += frequencyData[i];
        rms += frequencyData[i]*frequencyData[i];
        if(frequencyData[i] > peak){
            peak = frequencyData[i];
        }
    }
    avFreq = avFreq/bufferLength;
    rms = Math.sqrt(rms/bufferLength);
    
}

function getData() {
    resetData();
    analyser.getByteFrequencyData(frequencyData);
    currFreq = frequencyData;

    getBassData();
    getKickData();
    getSnareData();
    getMidsData();
    getHighsData();
    getDeviations();
    
    getAvFreq();

    //console.log("low " + bassAv);
    //console.log("high " + snareAv);
    //console.log("av " + avFreq);
    //console.log("rms " + rms);
    //console.log(peak);

    spotLight.intensity = rms/30;

    if(rms < rmslow) {
        analyser.minDecibels -= 1;
        rmslow--;
        rmshigh = 80;
        analyser.maxDecibels = -30;
        spotLight.intensity -= .5;
        //decrease light
    } else if(rms > rmshigh) {
        analyser.maxDecibels += 1;
        rmshigh++;
        rmslow = 20;
        analyser.minDecibels = -85;
        //increase light
        spotLight.intensity += .5;
    }

}

function changeCameraRotation() {
    if(beatConfidence < 0.9) {
        let rotateNoiseY = noise.noise3D((Date.now()+500)/5000, (Date.now()+500)/5000, (Date.now()+500)/5000);
        let rotateNoiseZ = noise.noise3D((Date.now()+1500)/5000, (Date.now()+1500)/5000, (Date.now()+1500)/5000);

        camera.rotation.z = (Math.acos(rotateNoiseZ)/2);
        if(spinr % 2 !== 0) {
            camera.rotation.y = (Math.asin(rotateNoiseY)/2);
        } else {
            camera.rotation.y = (Math.atan(rotateNoiseY)/2);
        }
    }
}

function changeCameraZoom() {

    if (barConfidence > 0.65) {
        camera.zoom = 2.5 - Math.acos(((barEnd-trackCounter)/1000)%Math.PI/3);
    } else if(beatConfidence > 0.75) {
        camera.zoom = Math.acos((beatEnd - trackCounter)/1000);
    }

    /*if(beatConfidence > 0.95) {
        camera.zoom = 1 + Math.sin((rms + snareAv)/100) * ( Math.asin((beatEnd - trackCounter)/500))/!* * Math.sin((rms+snareAv)/75)*!/;
    } else if(beatConfidence > 0.9) {
        camera.zoom = 1 + Math.sin(snareAv/100) * ( Math.acos((beatEnd - trackCounter)/500))/!* * Math.sin(snareAv/75)*!/;
    } else if(beatConfidence > 0.85) {
        camera.zoom = 1 + Math.sin(snareAv/200) * ( Math.asin((beatEnd - trackCounter)/500))/!* * Math.sin(snareAv/150)*!/;
    } else if(beatConfidence > 0.8) {
        camera.zoom = 1 + Math.sin((rms + snareAv)/200) * ( Math.acos((beatEnd - trackCounter)/500))/!* * Math.sin((rms+snareAv)/150)*!/;
    }*/

}

function scaleShape(shapeToScale) {
    let sScale = Math.sqrt(bassAv)/10;
    shapeToScale.scale.set(sScale,sScale,sScale);
}

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("main-visualizer").appendChild(renderer.domElement);

//Add & position assets to scene
camera.position.z = 90;

l1.position.set(300, 200);
scene.add(l1);

spotLight.position.set(0,0,90);
spotLight.castShadow = true;

spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;

spotLight.shadow.camera.near = 500;
spotLight.shadow.camera.far = 4000;
spotLight.shadow.camera.fov = 30;
scene.add(spotLight);

addShape(1);
setShapePosition();

//Rendering
let run = function(){

    controls.update();

    if (!isPaused && !isChangingShape) {

        getData();
        changeBar();
        changeBeat();
        changeTatum();

        changeFreqMode();
        // change these to event listeners
        if(randomizeColour)
            setColourKey();
        if(randomizeMode)
            setModeKey();

        if(modeKey.key < 6) {
            for(let i = 0; i < shapeArr.length; i++) {
                rotateShape(shapeArr[i]);
            }
            // Camera movement
            if(toggleRotate)
                changeCameraRotation();
            if(toggleZoom)
                changeCameraZoom();
        }

        setColour(colourKey);
        doMode(modeKey.key);
    }

    camera.updateProjectionMatrix();
    requestAnimationFrame(run);
    renderer.render(scene, camera);
    //effect3d.render(scene, camera);
};
run();