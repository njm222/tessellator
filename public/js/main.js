//Constants
const width = window.innerWidth;
const height = window.innerHeight;

//Setup Variables
var currFreq = 0;
var avFreq = 0;

var scene = new THREE.Scene();
var camera = new THREE.PerspectiveCamera(75,width/height, 0.1, 1000);
var renderer = new THREE.WebGLRenderer();
var controls = new THREE.OrbitControls(camera);

renderer.setSize(window.innerWidth, window.innerHeight);
document.getElementById("visualizer-main").appendChild(renderer.domElement);
camera.position.z = 90;

var colour = new THREE.Color("rgb(256,256,256)");
var basicMaterial = new THREE.MeshBasicMaterial( { color: 0x000000 } );
var depthMaterial = new THREE.MeshDepthMaterial( { wireframe: true } );

//Geometry
var cubeGeo = new THREE.BoxGeometry(10,10,10);
var torusGeo = new THREE.TorusGeometry(10, 3, 16, 100);
var circleGeo = new THREE.CircleGeometry( 5, 32 );
var octaGeo = new THREE.OctahedronGeometry(10, 0);
var octaGeo1 = new THREE.OctahedronGeometry(10, 1);
var octaGeo2 = new THREE.OctahedronGeometry(10, 2);
var octaGeo3 = new THREE.OctahedronGeometry(10, 3);
var octaGeo4 = new THREE.OctahedronGeometry(10, 4);




//Light
var l1 = new THREE.PointLight(0x123124);
l1.position.set(300, 200);
scene.add(l1);

var shapeArr = [];
//Cube Grid
if((Math.random() * 3) > 1) {
    for(var i = 0; i < 25; i++) {
        shapeArr.push(new THREE.Mesh(cubeGeo, new THREE.MeshBasicMaterial( { color: 0x000000 } )));
        scene.add(shapeArr[i]);
    }
} else {
    for(var i = 0; i < 25; i++) {
        shapeArr.push(new THREE.Points(octaGeo, new THREE.PointsMaterial({size: 1, color: 0x000000})));
        scene.add(shapeArr[i]);
    }
}

function positionShape() {
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
}

positionShape();

var layerKey = 444;
var colourKey = 7;
var freqKey = 10;


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

function changePoints(currShape, currPoints) {
    currShape.material.size = currPoints;
}

function changeDetail(currDetail, currShape, shapeType) {
    scene.remove(shapeArr[currShape]);
    if(shapeType > 2) {
        shapeArr[currShape] = new THREE.Points(new THREE.OctahedronGeometry(10, currDetail), new THREE.PointsMaterial({size: 1, color: 0x000000}));
    } else {
        shapeArr[currShape] = new THREE.Mesh(cubeGeo, new THREE.MeshBasicMaterial( { color: 0x000000 } ));
    }
    scene.add(shapeArr[currShape]);
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


    /*navigator.mediaDevices.enumerateDevices().then(function (devices) { console.log(devices)
    });*/
    //console.log(frequencyData);


    if (!isPaused && gotVisualizerScripts) {

        analyser.getByteFrequencyData(frequencyData);
        currFreq = frequencyData;
        for(let i = 0; i < bufferLength; i++){
            avFreq = avFreq + frequencyData[i];
        }
        avFreq = avFreq/bufferLength;

        changeBeat();
        changeTatum();

        changeFreqMode();
        changeColourMode();
        changeLayerMode();

        for(var i = 0; i < 25; i++) {
            rotateShape(shapeArr[i]);
        }

        switch (layerKey) {
            /*case 0:
                changeColourLayer000();
                break;*/
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
            case 9:
                changeColourLayer001();
                break;
            default:
                changeColourLayer001();
        }
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
                colour = rgbToHex(currFreq[4], currFreq[8], currFreq[12]);
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
                colour = rgbToHex(currFreq[13], currFreq[9], currFreq[5]);
                break;
            default:
                colour = rgbToHex(currFreq[4], currFreq[8], currFreq[12]);
        }
    }
    renderer.render(scene, camera);
};
run();

/* Idea:
    use spotify audio analysis to change the spin of the camera
    based on a switch case that randomize when the section changes
 */