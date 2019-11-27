document.addEventListener("keydown", function (event) {
    var keypress = event.key.toUpperCase();

    if(keypress == 0)
        modeKey.key = 0;
    else if(keypress == 1)
        modeKey.key = 1;
    else if(keypress == 2)
        modeKey.key = 2;
    else if(keypress == 3)
        modeKey.key = 3;
    else if(keypress == 4)
        modeKey.key = 4;
    else if(keypress == 5)
        modeKey.key = 5;
    else if(keypress == 6)
        modeKey.key = 6;
    else if(keypress == 7)
        modeKey.key = 7;
    else if(keypress == 8)
        modeKey.key = 8;
    else if(keypress == 9)
        modeKey.key = 9;
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

    console.log("colour mode: " + colourKey);
});

