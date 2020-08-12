const modalInfo = document.getElementById("modalInfo");
const modalSuccess = document.getElementById("modalSuccess");
var boardDiv = document.getElementById("board-container");
var log = document.getElementById("logs").getElementsByTagName("p")[0];

window.onclick = function(event) {
    if (event.target == modalInfo || event.target == modalSuccess) {
        modalInfo.style.display = "none";
        modalSuccess.style.display = "none";
    }
}

document.getElementsByClassName("close")[0].onclick = function () {
    modalInfo.style.display = "none"
}

document.getElementById("openInfo").onclick = function () {
   modalInfo.style.display = "block"
}

document.getElementById("checkCircuit").onclick = function () {
    this.disabled = true;
    checkCircuit(this);
}

document.getElementById("clearLog").onclick = function () {
    log.textContent = "No Errors";
}

document.getElementById("nextTask").onclick = function () {
    nextTask();
}

function clearBoard () {
    for (i=0; i<boardX; i++ ) {
        for (j=0; j<boardY; j++) {
            board[i][j] = new Tile(i, j)
        }
    }
    let clrBoard = document.getElementById("board-container");
    clrBoard.textContent = '';
    for (i = 0; i<boardX*boardY; i++) { //creating board
        var gridTile = tile.cloneNode(true);
        gridTile.removeAttribute("id");
        boardContainer.appendChild(gridTile);
    }

}


function setInputs(inputsList, outputsList) {
    for (i=0; i<inputsList.length; i++) {
        board[inputsList[i][0]][inputsList[i][1]] = new Source(inputsList[i][0],inputsList[i][1]);
        let index = Tools.translatePosition(inputsList[i][0],inputsList[i][1]);
        boardDiv.children[index].appendChild(Source.drawTile(inputsList[i])); 
    }

    for (i=0; i<outputsList.length; i++) {
        board[outputsList[i][0]][outputsList[i][1]] = new Probe(outputsList[i][0],outputsList[i][1]);
        let index = Tools.translatePosition(outputsList[i][0],outputsList[i][1]);
        boardDiv.children[index].appendChild(Probe.drawTile(outputsList[i])); 
    }
}


function changeInputs(x) {
    iterations[x]++;
    listOfInputs = inputs[task][x];
    maxIterations = Math.pow(2, listOfInputs.length);
    if (iterations[x] == maxIterations) {
        iterations[x] = 0;
        for (let j=0; j < listOfInputs.length; j++) {
            board[listOfInputs[j][0]][listOfInputs[j][1]].power(true);
        }

    }
    let divisor = iterations[x];
    let i = 0;
    while (divisor !=0) {
        if (divisor%2 == 1) {
            board[listOfInputs[i][0]][listOfInputs[i][1]].power(false);
        } else if (divisor%2 == 0) {
            board[listOfInputs[i][0]][listOfInputs[i][1]].power(true);            
        }
        divisor = Math.floor(divisor/2);
        i++;
    }
}

function checkCircuit(button) {
    let noErrors = true;
    let curentInputs = inputs[task];
    for (let j=0; j< curentInputs.length; j++) {
        for (let i=0; i< Math.pow(2, curentInputs[j].length); i++) {
            setTimeout(function() {
                changeInputs(j);
                if (solutions[task][j]() == false) { noErrors = false};
                if (j==curentInputs.length-1 && i==Math.pow(2, curentInputs[j].length)-1) {
                    if (noErrors == true) {
                        success();
                    }
                    button.disabled= false;
                }
            }, 150+150*i+600*j);
        }
    }
}


