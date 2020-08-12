//size of palette container and buttons
/*var pTileWidth = 40;
var pTileWidthPx = (pTileWidth.toString()+"px");
var pTileMargin = 2;
var pTileMarginPx = (pTileMargin.toString()+"px");
var pBoardWidth = 400;
var pBoardWidthPx = (pBoardWidth.toString()+"px");
var pBoardHeight = 200;
var pBoardHeightPx = (pBoardHeight.toString()+"px");

paletteContainer = document.getElementById("paletteContainer");
paletteContainer.style.width = pBoardWidthPx;
paletteContainer.style.height = pBoardHeightPx;
*/
const paletteContainer = document.getElementById("paletteContainer");
var pTile = document.createElement("div");
/*pTile.style.width = pTileWidthPx;
pTile.style.height = pTileWidthPx;
pTile.style.margin = pTileMarginPx;*/
pTile.className = "paletteTile"
document.getElementById("paletteContainer").addEventListener("click", clickPalette);

var paletteElements0 = [Source, Wire, AndGate, OrGate, XorGate, RemoveTile, Probe, NotGate]

function drawPalette(list) {
    for (item of list) {//creating buttons in pallete
        let paletteButton = pTile.cloneNode(); //creating tile
        let circutButton = item.drawTile();// creating button
        paletteButton.appendChild(circutButton); //inserting button in tile
        paletteContainer.appendChild(paletteButton); //inserting tile in palette container
    }
}

function clickPalette (element) {
    if (element.target.parentElement.parentElement.matches(".circutButton")) { //if clicked on button
        if (currentElement != undefined) { //disables button
            currentElement.style.borderColor = "black"; 
        }
        currentElement=element.target.parentElement.parentElement.parentElement;
        element.target.parentElement.parentElement.parentElement.style.borderColor = "yellow";
    }
    if (element.target.parentElement.matches(".circutButton")) { //if clicked on button
        if (currentElement != undefined) { //disables button
            currentElement.style.borderColor = "black"; 
        }
        currentElement=element.target.parentElement.parentElement;
        element.target.parentElement.parentElement.style.borderColor = "yellow";
    }

    if (element.target.matches(".circutButton")) { //if clicked on button logo
        if (currentElement != undefined) { //disables button
            currentElement.style.borderColor = "black"; 
        }
        currentElement=element.target.parentElement;
        element.target.parentElement.style.borderColor = "yellow";
    }

    if (currentElement == undefined) {
        return console.log("hello");
    }
    indexOfCurrentElement = Tools.findIndex(currentElement);
    currentCircut = paletteElements[indexOfCurrentElement];

}



