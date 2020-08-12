var paletteElements = [Wire, AndGate, OrGate, NotGate, RemoveTile]

drawPalette(paletteElements); 

var task =0;

var iteration10 = 0;
var iteration11 = 0;
var iteration12 = 0;
var iteration20 = 0;

const inputs10 = [[4,4], [6,4]];
const inputs11 = [[12,4],[14,4]];
const inputs12 = [[20,4], [22,4]];
const outputs10 = [[5,9]];
const outputs11 = [[13,9]];
const outputs12 = [[21,9]];

var inputs20 = [[12,2],[12,5]];
var outputs20 = [[12,16]];


var inputs1 = [inputs10, inputs11, inputs12];
var otputs1 = [outputs10, outputs11, outputs12];
var iterations = [iteration10, iteration11, iteration12, iteration20];
var inputs2 = [inputs20];
var outputs2 = [outputs20];

var inputs = [inputs1, inputs2];

setInputs(inputs10, outputs10);
setInputs(inputs11, outputs11);
setInputs(inputs12, outputs12);

document.getElementsByClassName("changeInputs")[0].onclick = function () {changeInputs(0)};
document.getElementsByClassName("changeInputs")[1].onclick = function () {changeInputs(1)};
document.getElementsByClassName("changeInputs")[2].onclick = function () {changeInputs(2)};

const solution10 = function solution10() {
    if ((board[inputs10[0][0]][inputs10[0][1]].state & board[inputs10[1][0]][inputs10[1][1]].state) == board[outputs10[0][0]][outputs10[0][1]].state) {
        return true;
    } else {
        log.textContent += `\nError in Circuit 1 at ${board[inputs10[0][0]][inputs10[0][1]].state}, ${board[inputs10[1][0]][inputs10[1][1]].state}`;
        return false;
    }
}

const solution11 = function solution11() {
    if ((board[inputs11[0][0]][inputs11[0][1]].state | board[inputs11[1][0]][inputs11[1][1]].state) == board[outputs11[0][0]][outputs11[0][1]].state) {
        return true;
    } else {
        log.textContent += `\nError in Circuit 2 at ${board[inputs11[0][0]][inputs11[0][1]].state}, ${board[inputs11[1][0]][inputs11[1][1]].state}`;
        return false;
    }
    
}

const solution12 = function solution12() {
    if (!(board[inputs12[0][0]][inputs12[0][1]].state & board[inputs12[1][0]][inputs12[1][1]].state) == board[outputs12[0][0]][outputs12[0][1]].state) {
        return true;
    } else {
        log.textContent += `\nError in Circuit 3 at ${board[inputs12[0][0]][inputs12[0][1]].state}, ${board[inputs12[1][0]][inputs12[1][1]].state}`;
        return false;
    }  
}

const solution20 = function solution20() {
    if( ((!(board[inputs20[0][0]][inputs20[0][1]].state & board[inputs20[1][0]][inputs20[1][1]].state)) & (board[inputs20[0][0]][inputs20[0][1]].state | board[inputs20[1][0]][inputs20[1][1]].state)) == board[outputs20[0][0]][outputs20[0][1]].state) {
        return true;
    } else {
        log.textContent += `\nError in Circuit at ${board[inputs20[0][0]][inputs20[0][1]].state}, ${board[inputs20[1][0]][inputs20[1][1]].state}`
        return false;
    }
}
solutions1 = [solution10,solution11, solution12];
solutions2 = [solution20];
solutions = [solutions1, solutions2];

function success() {
    let modalContent = document.getElementById("modalPop");
    let button = document.getElementById("nextTask");
    if (task == 0) {
        
    } else if (task == 1) {
        modalContent.getElementsByTagName("h1")[0].innerHTML = "Tutorial completed, next tutorial: Binary addition";
        modalContent.getElementsByTagName("h3")[0].innerHTML = "New gate added: XOR";
        let hA = XorGate.drawTile();
        hA.style = "width: 50px; height: 50px;";
        modalContent.insertBefore(hA, button);
        button.innerHTML = "Next Tutorial";
        button.onclick = function () {
            location.href = "Task1.html"
        }
    }
    modalSuccess.style.display = "block";
}

function nextTask() {
    if (task == 0) {
        clearBoard();
        setInputs(inputs20, outputs20);
        changeTask();
        let buttons = document.getElementById("buttonPanel").children;
        buttons[1].style.display = "none";
        buttons[2].style.display = "none";
        modalSuccess.style.display = "none";
        task = 1;
    }
}

function changeTask() {
    let tables = document.getElementsByClassName("taskTable");
    tables[0].textContent="";
    tables[2].textContent="";
    tables[1].getElementsByTagName("tr")[0].getElementsByTagName("th")[2].innerHTML="A⊻B";
    tables[1].getElementsByTagName("tr")[4].getElementsByTagName("td")[2].innerHTML="0";
    let taskContainer = document.getElementById("taskContainer");
    taskContainer.getElementsByTagName("h2")[0].innerHTML = "Create Xor Gate:";
    taskContainer.getElementsByTagName("p")[1].innerHTML = "";
    taskContainer.getElementsByTagName("p")[2].innerHTML = `There are many ways to build this circuit, simpiest one requires 4 Gates including one NOT gate.\n
                                                            Hint: try to find out how to achive output 0  for two 1s, build it on one side of board and compliment it with cicuit on another side and than connect them in middle.`;
    taskContainer.getElementsByTagName("p")[3].innerHTML = "";
}

