var paletteElements = [Wire, AndGate, OrGate, NotGate, XorGate, RemoveTile]

drawPalette(paletteElements); 

var task =0;

var iteration10 = 0;


const inputs10 = [[12,3], [12,5]];
const outputs10 = [[13,12],[11,12]];

var inputs20 = [[10,1],[12,1], [14,1]];
var outputs20 = [[13,14],[11,14]];


var inputs1 = [inputs10];
var outputs1 = [outputs10];
var iterations = [iteration10];
var inputs2 = [inputs20];
var outputs2 = [outputs20];

var inputs = [inputs1, inputs2];
var outputs = [outputs1,outputs2]

setInputs(inputs10, outputs10);

document.getElementsByClassName("changeInputs")[0].onclick = function () {changeInputs(0)};





function and(in1,in2) {
    return (board[in1[0]][in1[1]].state & board[in2[0]][in2[1]].state)
}

const solution10 = function solution10() {
    var bi = [];
    for (inps of inputs[task]) {
        for (inp of inps) {
            bi.push(board[inp[0]][inp[1]].state)
        }
    }
    var bo = [];
    for (outs of outputs[task]) {
        for (outp of outs) {
            bo.push(board[outp[0]][outp[1]].state)
        }
    }
    if (((bi[0] ^ bi[1]) == bo[0]) && ((bi[0] & bi[1]) == bo[1])) {
        return true
    } else {
        log.textContent += `\nError in Circuit  at ${bi[0]}, ${bi[1]}`;
        return false;
    }
}


const solution20 = function solution20() {
    var bi = [];
    for (inps of inputs[task]) {
        for (inp of inps) {
            bi.push(board[inp[0]][inp[1]].state)
        }
    }
    var bo = [];
    for (outs of outputs[task]) {
        for (outp of outs) {
            bo.push(board[outp[0]][outp[1]].state)
        }
    }
    if ((bi[0]+bi[1]+bi[2]) == (bo[0]+(2*bo[1]))) {
        return true
    } else {
        log.textContent += `\nError in Circuit  at ${bi[0]}, ${bi[1]}, ${bi[2]}`;
        return false;
    }
}
solutions1 = [solution10];
solutions2 = [solution20];
solutions = [solutions1, solutions2];

function success() {
    let modalContent = document.getElementById("modalPop");
    let button = document.getElementById("nextTask");
    if (task == 0) {
        
    } else if (task == 1) {
        modalContent.getElementsByTagName("h1")[0].innerHTML = "Tutorial completed, next tutorial: TBC";
        modalContent.children[1].remove();
        modalContent.children[2].remove();
        button.innerHTML = "Next Tutorial";
        button.onclick = function () {
            location.href = "../main.html"
        }
        modalSuccess.style.display = "block";
    }
    modalSuccess.style.display = "block";
}

function nextTask() {
    if (task == 0) {
        clearBoard();
        setInputs(inputs20, outputs20);
        changeTask();
        paletteContainer.textContent = "";
        paletteElements.splice(5,0,HalfAdder);
        drawPalette(paletteElements);
        task = 1;
        modalSuccess.style.display = "none";
    }
}

function changeTask() {
    let taskContainer = document.getElementById("taskContainer");
    taskContainer.getElementsByTagName("h2")[0].innerHTML = "Create Full Adder:";
    taskContainer.getElementsByTagName("p")[0].innerHTML = `There is new gate added in panel (half adder)
    This circuit requires 3 gates in total

    To avoid wire intersection try building circuit from left and cascade it down`;

}

