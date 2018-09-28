//Setup
var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var listener = new THREE.AudioListener();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);
camera.position.z = 30;


var colour = new THREE.Color("rgb(256,256,256)");
var basicMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
var depthMaterial = new THREE.MeshDepthMaterial( { wireframe: true } );

//Cube Shape
var cubeGeo = new THREE.BoxGeometry(10,10,10);
var shape = new THREE.Mesh(cubeGeo, basicMaterial);


//Sphere
var sphereGeo = new THREE.SphereGeometry(15, 5, 5);
var shape1 = new THREE.Mesh(sphereGeo, depthMaterial);

//Light
var l1 = new THREE.PointLight(0x123124);
l1.position.set(300, 200);

scene.add(l1);
scene.add(shape);

//scene.add(shape1);


//Sound
camera.add(listener);
//Create audio source
var sound = new THREE.Audio(listener);
//Load a sound from a source and set it as the
//audio object's buffer
var audioLoader = new THREE.AudioLoader();
audioLoader.load('sounds/song2.mp3', function (buffer) {
    sound.setBuffer(buffer);
    sound.setLoop(true);
    sound.setVolume(0.8);
    sound.play();
})
var analyser = new THREE.AudioAnalyser(sound, 32);
var data = analyser.getAverageFrequency();


//Add screenResizer helper function

function rgbToHexHelper(num){
    var hex = Math.ceil(num).toString(16);
    return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r,g,b) {
    return ("0x" + rgbToHexHelper(r) + rgbToHexHelper(g) + rgbToHexHelper(b));
}

function changeColor(currShape, currColour) {
    currShape.material.color.setHex(currColour);
}

var currKey = 1;

//Rendering
var play = function(){
    requestAnimationFrame(play);
    currFreq = analyser.getFrequencyData();
    avFreq = analyser.getAverageFrequency();

    var spin2 = 0.03;
    var spin3 = 0.015;
    var spin4 = 0.075;
    var spin5 = 0.0025;
    var spin6 = 0.001;

    if(currFreq[0] > 150) {
        if (currFreq[0] > 200) {
            shape.rotation.x += spin3;
            shape.rotation.y += spin2;
            shape.rotation.z += spin3;
        } else {
            shape.rotation.x += spin4;
            shape.rotation.y += spin3;
            shape.rotation.z += spin4;
        }
    } else {
        if (currFreq[0] > 100) {
            shape.rotation.x += spin5;
            shape.rotation.y -= spin3;
            shape.rotation.z += spin6;
        } else {
            shape.rotation.x += spin6;
            shape.rotation.y -= spin4;
            shape.rotation.z += spin5;
        }
    }


    if (sound.isPlaying) {

        /*document.onkeydown = function (e) {
            currKey = e.key;
        };*/
        switch (currKey) {
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

        console.log(currKey + " || " + avFreq);
        console.log(currFreq.toString());

        changeColor(shape, colour);
        //changeColor(shape1, colour);

    }
    renderer.render(scene, camera);
}
play();