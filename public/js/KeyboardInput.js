document.addEventListener("keydown", function (event) {
    var keypress = event.key.toUpperCase();

    if(keypress == 0)
        layerKey = 0;
    else if(keypress == 1)
        layerKey = 1;
    else if(keypress == 2)
        layerKey = 2;
    else if(keypress == 3)
        layerKey = 3;
    else if(keypress == 4)
        layerKey = 4;
    else if(keypress == 5)
        layerKey = 5;
    else if(keypress == 6)
        layerKey = 6;
    else if(keypress == 7)
        layerKey = 7;
    else if(keypress == 8)
        layerKey = 8;
    else if(keypress == 9)
        layerKey = 9;
    else if(keypress == "Q")
        colourKey = 1;
    else if(keypress == "A")
        colourKey = 2;
    else if(keypress == "Z")
        colourKey = 3;
    else if(keypress == "W")
        colourKey = 4;
    else if(keypress == "S")
        colourKey = 5;
    else if(keypress == "X")
        colourKey = 6;
    else if(keypress == "E")
        colourKey = 7;
    else if(keypress == "D")
        colourKey = 8;
    else if(keypress == "C")
        colourKey = 9;

    console.log("colour mode: " + colourKey + "\nlayer mode: " + layerKey);
})

