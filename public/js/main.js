//Constants
const width = window.innerWidth;
const height = window.innerHeight;

//Setup Variables
var currFreq = 0;
var lowAvFreq = 0;
var highAvFreq = 0;
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
var l1 = new THREE.PointLight(0xffffff);
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
    shapeArr[1].position.y = 20;
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

function positionCamera(cameraRandom) {

    switch (cameraRandom) {
        case 0:
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 90;
            break;
        case 1:
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = -90;
            break;
        case 2:
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 90;
            break;
        case 3:
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = -90;
            break;
        case 4:
            camera.position.x = 0;
            camera.position.y = 90;
            camera.position.z = 0;
            break;
        case 5:
            camera.position.x = 0;
            camera.position.y = -90;
            camera.position.z = 0;
            break;
        case 6:
            camera.position.x = 90;
            camera.position.y = 0;
            camera.position.z = 0;
            break;
        case 7:
            camera.position.x = -90;
            camera.position.y = 0;
            camera.position.z = 0;
            break;
        default:
            camera.position.x = 0;
            camera.position.y = 0;
            camera.position.z = 90;
    }
}


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

function changeShapeType(currDetail, currShape, shapeType) {
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

function changeCameraZoom() {

    camera.zoom = Math.pow(Math.sin((lowAvFreq + highAvFreq)/zoomIntensity), bb);

    //camera.zoom = Math.sin(highAvFreq/100) * Math.sin(highAvFreq/75);

    //camera.zoom = Math.sin(highAvFreq/100) * Math.sin(lowAvFreq / 50); //good

    if(camera.zoom > 4) {
        camera.zoom = 4;
    }
    //console.log("zoom: " + camera.zoom);
    //console.log(scene.background);
}

function changeCameraZoomTatum() {
    //camera.zoom = Math.sin(Math.exp(Math.cos((highAvFreq/200)*zoomSwing))*zoomIntensity)*2; //sin(exp(cos(t*0.8))*2)

    //camera.zoom = Math.sin(highAvFreq/100) * ( Math.asin((tatumEnd - trackCounter)/400)) /* * Math.sin(highAvFreq/75)*/;

    //camera.zoom = Math.cos(Math.sin(highAvFreq/200) * Math.tan(highAvFreq * Math.PI/ 200) * Math.PI/8); //cos(sin(t)*tan(t*PI)*PI/8)

    //camera.zoom = Math.pow(Math.abs(Math.sin(highAvFreq/100))*0.6, Math.sin(highAvFreq/100))*0.6 //pow(abs(sin(t*2))*0.6,sin(t*2))*0.6

    camera.zoom = Math.cos(Math.tan(highAvFreq/100) * 0.05);

    if(camera.zoom > 4) {
        camera.zoom = 4;
    }

    console.log("t");
}

function changeCameraZoomBeat() {
    //camera.zoom = Math.sin(highAvFreq/200) * Math.acos((beatEnd - trackCounter)/400);

    camera.zoom = Math.sin(highAvFreq/100) * ( Math.acos((beatEnd - trackCounter)/500)) * Math.sin(highAvFreq/75);

    //console.log("b");
}

//Rendering
var run = function(){
    requestAnimationFrame(run);
    controls.update();

    /*navigator.mediaDevices.enumerateDevices().then(function (devices) { console.log(devices)
    });*/
    //console.log("150: " + frequencyData[150] + "       175: " + frequencyData[175]);


    if (!isPaused && gotVisualizerScripts) {

        analyser.getByteFrequencyData(frequencyData);
        currFreq = frequencyData;
        let totalFreq = 0;
        highAvFreq = 0;
        for(let i = 0; i < (bufferLength/32)*2; i++){
            totalFreq += frequencyData[i];
        }
        lowAvFreq = totalFreq/((bufferLength/32)*2);
        for(let i = (bufferLength/32)*2; i < (bufferLength/32)*4; i++) {
            totalFreq += frequencyData[i];
            highAvFreq += frequencyData[i];
        }
        highAvFreq = highAvFreq/((bufferLength/32)*2);
        for(let i = (bufferLength/32)*4; i < bufferLength; i++) {
            totalFreq += frequencyData[i];
        }
        avFreq = totalFreq/bufferLength;

        //console.log(frequencyData);
        //console.log("freq = " + avFreq);

        changeBar();
        changeBeat();
        changeTatum();

        changeFreqMode();
        changeColourMode();
        changeLayerMode();

        camera.updateProjectionMatrix();

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
                colour = rgbToHex(avFreq/10, avFreq*3, avFreq*2);
                break;
            case 5:
                colour = rgbToHex(avFreq*3, avFreq/10, avFreq*2);
                break;
            case 6:
                colour = rgbToHex(avFreq*3, avFreq*2, avFreq/10);
                break;
            case 7:
                colour = rgbToHex(avFreq/10, avFreq*2, avFreq*3);
                break;
            case 8:
                colour = rgbToHex(avFreq*2, avFreq*3, avFreq/10);
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
    renderer.render(scene, camera);
};
run();

gotVisualizerScripts = true;

/* Idea:
    use spotify audio analysis to change the spin of the camera
    based on a switch case that randomize when the section changes
 */