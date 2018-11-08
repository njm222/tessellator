//Constants
const width = window.innerWidth;
const height = window.innerHeight;

//Setup Variables
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,width/height, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var controls = new THREE.OrbitControls(camera);

//controls.autoRotate = true;

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 90;

var colour = new THREE.Color("rgb(256,256,256)");
var basicMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
var depthMaterial = new THREE.MeshDepthMaterial( { wireframe: true } );

//Cube Shape
var cubeGeo = new THREE.BoxGeometry(10,10,10);
var shape = new THREE.Mesh(cubeGeo, basicMaterial);

//Light
var l1 = new THREE.PointLight(0x123124);
l1.position.set(300, 200);
scene.add(l1);

//Cube Grid
var shapeArr = [];
for(var i = 0; i < 25; i++) {
    shapeArr.push(new THREE.Mesh(cubeGeo, new THREE.MeshBasicMaterial( { color: 0x000000, } )));
    scene.add(shapeArr[i]);
}
//shapeArr[0] is the center (layer 0)
shapeArr[0].position.z = -40;
//layer 1
shapeArr[1].position.y = 20
shapeArr[1].position.x = -20;
shapeArr[1].position.z = -20;

shapeArr[2].position.y = 20;
shapeArr[2].position.z = -20;

shapeArr[3].position.y = 20;
shapeArr[3].position.x = 20;
shapeArr[3].position.z = -20;

shapeArr[4].position.x = 20;
shapeArr[4].position.z = -20;

shapeArr[5].position.y = -20;
shapeArr[5].position.x = 20;
shapeArr[5].position.z = -20;

shapeArr[6].position.y = -20;
shapeArr[6].position.z = -20;

shapeArr[7].position.y = -20;
shapeArr[7].position.x = -20;
shapeArr[7].position.z = -20;

shapeArr[8].position.x = -20;
shapeArr[8].position.z = -20;
//end layer 1
//layer 2
shapeArr[9].position.y = 40;
shapeArr[9].position.x = -40;

shapeArr[10].position.y = 40;
shapeArr[10].position.x = -20;

shapeArr[11].position.y = 40;

shapeArr[12].position.y = 40;
shapeArr[12].position.x = 20;

shapeArr[13].position.y = 40;
shapeArr[13].position.x = 40;

shapeArr[14].position.y = 20;
shapeArr[14].position.x = 40;

shapeArr[15].position.x = 40;

shapeArr[16].position.y = -20;
shapeArr[16].position.x = 40;

shapeArr[17].position.y = -40;
shapeArr[17].position.x = 40;

shapeArr[18].position.y = -40;
shapeArr[18].position.x = 20;

shapeArr[19].position.y = -40;

shapeArr[20].position.y = -40;
shapeArr[20].position.x = -20;

shapeArr[21].position.y = -40;
shapeArr[21].position.x = -40;

shapeArr[22].position.y = -20;
shapeArr[22].position.x = -40;

shapeArr[23].position.x = -40;

shapeArr[24].position.y = 20;
shapeArr[24].position.x = -40;
//end layer 2

//Sound
var listener = new THREE.AudioListener();
camera.add(listener);
//Create audio source
var sound = new THREE.Audio(listener);


//colour = 6 song5 freq = 10 Layer4
//colour = 8 song4 freq = 8 Layer1
//colour = 7 song3 freq = 9 Layer3
//colour = 1 song2 freq = 7
//colour = 8 song7 freq = 9 Layer2
var layerKey = 6;
var colourKey = 7;
var freqKey = 10;
//audio object's buffer
var audioLoader = new THREE.AudioLoader();
audioLoader.load('sounds/song4.mp3', function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.8);
    //sound.play();
})
var analyser = new THREE.AudioAnalyser(sound, 32);
var data = analyser.getAverageFrequency();

//Variable width/height canvas
window.addEventListener('resize', re => {
    const width = window.innerWidth;
    const height = window.innerHeight;

    renderer.setSize(width, height);
    camera.aspect = width / height;
    camera.updateProjectionMatrix();
});

function rgbToHexHelper(num){
    var hex = Math.ceil(num).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r,g,b) {
    return ("0x" + rgbToHexHelper(r) + rgbToHexHelper(g) + rgbToHexHelper(b));
}

function changeColour(currShape, currColour) {
    currShape.material.color.setHex(currColour);
}

function rotateShape(shape) {
    var spin2 = 0.03;
    var spin3 = 0.015;
    var spin4 = 0.075;
    var spin5 = 0.0025;
    var spin6 = 0.001;
    var spinf = currFreq[freqKey];
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

//Rendering
var run = function(){
    requestAnimationFrame(run);
    controls.update();
    currFreq = analyser.getFrequencyData();
    avFreq = analyser.getAverageFrequency();

    changeFreqMode();
    //changeColourMode();
    //changeLayerMode();


    /*if(analyser) {
        renderAudio();
    }*/
    if (sound.isPlaying) {

        for(var i = 0; i < 25; i++) {
            rotateShape(shapeArr[i]);
        }

        switch (layerKey) {
            case 1:
                changeColourLayer1();
                break;
            case 2:
                changeColourLayer2();
                break;
            case 3:
                changeColourLayer3();
                break;
            case 4:
                changeColourLayer4();
                break;
            case 5:
                changeColourLayer5();
                break;
            case 6:
                changeColourLayer6();
                break;
            case 7:
                changeColourLayer7();
                break;
            case 8:
                changeColourLayer8();
                break;
            default:
                changeColourLayer1();
        }

        /*document.onkeydown = function (e) {
            currKey = e.key;
        };*/
        switch (colourKey) {
            case 1:
                colour = rgbToHex(avFreq, avFreq, avFreq*2);
                break;
            case 2:
                colour = rgbToHex(avFreq, avFreq*2, avFreq);
                break;
            case 3:
                colour = rgbToHex(avFreq*2, avFreq, avFreq);
                break;
            case 4:
                colour = rgbToHex(avFreq, avFreq, avFreq);
                break;
            case 5:
                colour = rgbToHex(currFreq[1], currFreq[3], currFreq[5]);
                break;
            case 6:
                colour = rgbToHex(avFreq*2, avFreq*2, avFreq);
                break;
            case 7:
                colour = rgbToHex(avFreq*2, avFreq, avFreq*2);
                break;
            case 8:
                colour = rgbToHex(avFreq, avFreq*2, avFreq*2);
                break;
            case 9:
                colour = rgbToHex(currFreq[10], currFreq[9], currFreq[8]);
                break;
            default:
                colour = rgbToHex(currFreq[1], currFreq[3], currFreq[5]);
        }
        /*console.log(currKey + " || " + avFreq);
        console.log(currFreq.toString());*/

    }
    renderer.render(scene, camera);
}
run();

/* Idea:
    use spotify audio analysis to change the spin of the camera
    based on a switch case that randomize when the section changes
 */