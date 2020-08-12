var board = [];
for (i=0; i<boardX; i++ ) {
    board.push([])
    for (j=0; j<boardY; j++) {
        board[i].push(new Tile(i, j))
    }
}


//tile and board size
var tileWidth = 24;
var tileWidthPx = (tileWidth.toString()+"px");
var tileMargin = 0;
var tileMarginPx = (tileMargin.toString()+"px");
var boardWidth = boardX*(tileWidth+2*tileMargin);
var boardWidthPx = (boardWidth.toString()+"px");
var boardHeight = boardY*(tileWidth+2*tileMargin);
var boardHeightPx = (boardHeight.toString()+"px");

var boardContainer = document.getElementById("board-container");
boardContainer.style.width = boardWidthPx;
boardContainer.style.height = boardHeightPx;
boardContainer.addEventListener("click", clickBoard);

var tile = document.createElement("div"); //setting size for single tile
tile.classList.add("tile");
tile.style.width = tileWidthPx;
tile.style.height = tileWidthPx;
tile.style.margin = tileMarginPx;

for (i = 0; i<boardX*boardY; i++) { //creating board
    var gridTile = tile.cloneNode(true);
    gridTile.removeAttribute("id");
    boardContainer.appendChild(gridTile);
}



function clickBoard (element) {
    if (currentElement != undefined ) { //cuurentElement - item selected from palette
        if (currentCircut == RemoveTile) {
            if (element.target.parentElement.parentElement.className == "tile") { //if target is existing element
                let currentBoardElement = element.target.parentElement;
                let index = Tools.findIndex(currentBoardElement.parentElement);
                let position = Tools.translateIndex(index);
                if (board[position[0]][position[1]].set == false) {
                    RemoveTile.remove(position);
                    currentBoardElement.remove();
                }

            }
            else if (element.target.parentElement.className == "tile") { //if target is existing elemnt
                let currentBoardElement = element.target;
                let index = Tools.findIndex(currentBoardElement.parentElement);
                let position = Tools.translateIndex(index);
                if (board[position[0]][position[1]].set == false) {
                    RemoveTile.remove(position);
                    currentBoardElement.remove();
                }
            }
            else if (element.target.parentElement.parentElement.parentElement.className == "tile") { //if target is existing elemnt
                let currentBoardElement = element.target.parentElement.parentElement;
                let index = Tools.findIndex(currentBoardElement.parentElement);
                let position = Tools.translateIndex(index);
                if (board[position[0]][position[1]].set == false) {
                    RemoveTile.remove(position);
                    currentBoardElement.remove();
                }
            }

        } 
        else if (element.target.className == "tile"){ //if target is empty tile
            let currentBoardElement = element.target;
            let index = Tools.findIndex(currentBoardElement); //find index of clicked tile
            let position = Tools.translateIndex(index);  //translate index into position on board
            let clear = true;
            for (i =0; i<currentCircut.width(); i++) {
                for (j= 0; j<currentCircut.height(); j++) {
                    if (board[position[0]+i][position[1]+j].name != "Tile") {
                        clear = false;
                    }
                }
            }
            if (clear == true) {
                currentBoardElement.appendChild(currentCircut.drawTile(position));
                Tools.createBoardElement(currentCircut, position); //create new element at selected position
            } 
            
        }
      
    }
}

class Tools {

    static translateIndex (index) { //transalte elemnt list index into position on board
        let position = [];
        let positionX;
        let positionY;
        positionY = Math.floor(index/boardX);
        positionX = index-boardX*positionY;
        position = [positionX,positionY];
        return position;
    }

    static translatePosition(x,y) { //translate element position on board into list index
        return (y*boardX+x);
    }

    static createBoardElement(type, position) {
        board[position[0]][position[1]] = new type(position[0],position[1]);
        for (i=0; i<type.width(); i++) {
            for (j=0; j<type.height(); j++) {
                board[position[0]+i][position[1]+j] = board[position[0]][position[1]] //shalow copy of circut type for its size
            }
        }
        board[position[0]][position[1]].connect()
    }
    
    static findIndex(element) {
        var index = Array.from(element.parentElement.children).indexOf(element)
        return index;
    }
}
