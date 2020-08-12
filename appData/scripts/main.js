function buttonOn (element) {
    element.classList.add("buttonHover");
}

function buttonOff (element) {
    element.classList.remove("buttonHover");
}

function leftButtonOn(element){
    buttonOn(element);
    let buttons = element.parentElement.children;
    let index = [...buttons].indexOf(element);
    let rWires = document.getElementById("rightWire").children;
    let bWires = document.getElementById("bottomWire").children;
    let bulbs = document.getElementById("bottomEnd").children;
    rWires[index].classList.add("wireShadow");
    bWires[index].classList.add("wireShadow");
    bulbs[index].classList.add("bottomEndBulbOn");

}

function leftButtonOff(element) {
    buttonOff(element);
    let buttons = element.parentElement.children;
    let index = [...buttons].indexOf(element);
    let rWires = document.getElementById("rightWire").children;
    let bWires = document.getElementById("bottomWire").children;
    let bulbs = document.getElementById("bottomEnd").children;
    rWires[index].classList.remove("wireShadow");
    bWires[index].classList.remove("wireShadow");
    bulbs[index].classList.remove("bottomEndBulbOn");

}

function button1 (element) {
    var screen = document.getElementById("screen");
    var head = screen.getElementsByTagName("h1");
    var paragraph = screen.getElementsByTagName("p");
    head[0].innerHTML = "Project CompArch SBS!";
    paragraph[0].innerHTML = "This is 3rd year project for IT Management<br>";
    paragraph[1].innerHTML = "Created by:";
    paragraph[2].innerHTML = "Kamil Cylko X00143445";
    deactivate(element);
}

function button2 (element) {
    var screen = document.getElementById("screen");
    var head = screen.getElementsByTagName("h1");
    var paragraph = screen.getElementsByTagName("p");
    head[0].innerHTML = "How to...";
    paragraph[0].innerHTML = "No idea...";
    paragraph[1].innerHTML = "Kamil Cylko ";
    deactivate(element);
}

function button3 (element) {
    var screen = document.getElementById("screen");
    var head = screen.getElementsByTagName("h1");
    var paragraph = screen.getElementsByTagName("p");
    head[0].innerHTML = "Dummy heading";
    paragraph[0].innerHTML = "I'm dummy";
    paragraph[1].innerHTML = "Kamil Cylko";
    deactivate(element);
}

function button4 (element) {
    var screen = document.getElementById("screen");
    var head = screen.getElementsByTagName("h1");
    var paragraph = screen.getElementsByTagName("p");
    head[0].innerHTML = "Second dummy";
    paragraph[0].innerHTML = "I'm dummy as well";
    paragraph[1].innerHTML = "Kamil Cylko";
    deactivate(element);
}



function deactivate (element) {
    var buttons = element.parentElement.children;
    var index = [...buttons].indexOf(element);
    console.log(index);
    var wires = document.getElementById("topBoardWireFoot").children;
    let x;
    for (i=0; i<buttons.length; i++) {
        buttons[i].classList.remove("buttonActive");
        wires[i].classList.remove("wireShadow");
        
    }
    element.classList.add("buttonActive");
    wires[index].classList.add("wireShadow")
}