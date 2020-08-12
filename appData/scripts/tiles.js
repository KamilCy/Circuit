// basic tile
class Tile {
    constructor(x, y) {
        this.name = "Tile";
        this.position = [x, y];
        this.state = false;
        this.set = false;
        this.outputs = []; //every tile needs to have output even if it is empty
    }
    static width() { return 1};
    static height() { return 1};

    propagator() { }
    decisor() { }
    connect() { }
    static boundries(loc) {
        if (loc[0] >= 0 && loc[0] < boardX && loc[1] >= 0 && loc[1] < boardY) {
            return true
        }
    }

    switch(on) {
        let index = Tools.translatePosition(this.position[0], this.position[1]);
        let boardLoc = document.getElementById("board-container").children[index];
        let child;
        if (on == true) {
            for (child of boardLoc.firstChild.children) {
                child.classList.remove("off");
                child.classList.add("on");
            }
        }
        if (on == false) {
            for (child of boardLoc.firstChild.children) {
                child.classList.remove("on");
                child.classList.add("off");
            }
        }
    }


    static button(width, height) {
        let base = document.createElement("div");
        base.classList.add("circutButton");
        if (width !== undefined && height !== undefined) {
            base.classList.add(`circutButton-${width}-${height}`)
        }

        return base;
    }
}

/*
Flags:
1-check if any neighbour tiles are on - if so turn current tile on and other connected to it
2-send neighbour tiles info that current tile is on, if they are off turn them on and propagate further
*/
class Source extends Tile {
    constructor(x, y, ) {
        super(x, y);
        this.name = "Source";
        this.set = true;
        this.outputs = [[x, y]];
        this.state = true;
    }

    static width() {return 1};
    static height() {return 1};

    propagator(recursion, flag) {
        let x = this.position[0];
        let y = this.position[1];
        if (Tile.boundries([x,y - 1]) == true) {
            if (board[x][y - 1].decisor(recursion, flag) == true) { return true };
        }
        if (Tile.boundries([x,y + 1]) == true) {
            if (board[x][y + 1].decisor(recursion, flag) == true) { return true };
        }
        if (Tile.boundries([x - 1,y]) == true) {
            if (board[x - 1][y].decisor(recursion, flag) == true) { return true };
        }
        if (Tile.boundries([x + 1,y]) == true) {
            if (board[x + 1][y].decisor(recursion, flag) == true) { return true };
        }
    }

    decisor(recursion, flag) {
        let recur = false;
        recursion.forEach(element => {
            if (element[0] == this.position[0] && element[1] == this.position[1]) {
                recur = true;
            }
        })
        if (recur == false) { 
            if (flag == 1) {
                if (this.state == true) {
                    this.propagator([this.position],2);
                }
            }
            else if (flag == 3) {
                if (this.state == true) {
                    return true;
                }
            }
        }
    }

    power(on) {
        if (on == true) {
            this.state = true;
            this.switch(true);
            this.propagator([this.position],2);
            }
        else if (on == false) {
            this.state = false;
            this.switch(false);
            RemoveTile.decisorSource(this.position);

        }

        
    }

    switch(on) {
        let index = Tools.translatePosition(this.position[0], this.position[1]);
        let boardLoc = document.getElementById("board-container").children[index];
        if (on == true) {
                boardLoc.getElementsByClassName("source")[0].classList.add("on");
                boardLoc.getElementsByClassName("source")[0].classList.remove("off");

        }
        if (on == false) {
                boardLoc.getElementsByClassName("source")[0].classList.remove("on");
                boardLoc.getElementsByClassName("source")[0].classList.add("off");
        }
    }


    connect() {
        this.propagator([this.position], 2)
    }


    static drawTile(on, width, height) {
        let button = this.button(width, height);
        let logo = document.createElement("div");
        button.appendChild(logo);
        button.children[0].classList.add("source");
        if (on == false) {
            button.children[0].classList.add("source");
            button.children[0].classList.add("on");
        }
        return button;
    }


}

class Probe extends Tile {

    constructor(x, y, ) {
        super(x, y);
        this.name = "Probe";
        this.set = true;
        this.outputs = [[x, y]];
        this.state = false;
    }

    static width() {return 1};
    static height() {return 1};

    propagator(recursion, flag) {
        let x = this.position[0];
        let y = this.position[1];
        let newRecursion = recursion.slice();
        if (Tile.boundries([x,y - 1]) == true) {
            if (board[x][y - 1].decisor(newRecursion, flag) == true) { return true };
        }
        newRecursion = recursion.slice();
        if (Tile.boundries([x,y + 1]) == true) {
            if (board[x][y + 1].decisor(newRecursion, flag) == true) { return true };
        }
        newRecursion = recursion.slice();
        if (Tile.boundries([x - 1,y]) == true) {
            if (board[x - 1][y].decisor(newRecursion, flag) == true) { return true };
        }
        newRecursion = recursion.slice();
        if (Tile.boundries([x + 1,y]) == true) {
            if (board[x + 1][y].decisor(newRecursion, flag) == true) { return true };
        }
    }

    decisor(recursion, flag) {
        let recur = false;
        recursion.forEach(element => {
            if (element[0] == this.position[0] && element[1] == this.position[1]) {

                recur = true;
            }
        })
        if (recur == false) {

            if (flag == 2) {
                if (this.state == false) {
                    this.state = true;
                    this.switch(true);
                }
            }
            else if (flag == 3) {
                recursion.push(this.position);
                if (this.propagator(recursion, 3) != true) {
                    this.state = false;
                    this.switch(false);

                }
            }
        }
    }

    static drawTile() {
        let button = this.button();
        let logo = document.createElement("div");
        button.appendChild(logo);
        button.children[0].classList.add("probe");
        return button;
    }
}

class Wire extends Tile {
    constructor(x, y) {
        super(x, y);
        this.name = "Wire";

    }
    static width() {return 1};
    static height() {return 1};

    propagator(recursion, flag) {
        let x = this.position[0];
        let y = this.position[1];
        let newRecursion = recursion.slice();
        if (Tile.boundries([x,y - 1]) == true) {
            if (board[x][y - 1].decisor(newRecursion, flag) == true) { return true };
        }
        newRecursion = recursion.slice();
        if (Tile.boundries([x,y + 1]) == true) {
            if (board[x][y + 1].decisor(newRecursion, flag) == true) { return true };
        }
        newRecursion = recursion.slice();
        if (Tile.boundries([x - 1,y]) == true) {
            if (board[x - 1][y].decisor(newRecursion, flag) == true) { return true };
        }
        newRecursion = recursion.slice();
        if (Tile.boundries([x + 1,y]) == true) {
            if (board[x + 1][y].decisor(newRecursion, flag) == true) { return true };
        }
    }

    decisor(recursion, flag) {
        let recur = false;
        recursion.forEach(element => {
            if (element[0] == this.position[0] && element[1] == this.position[1]) {

                recur = true;
            }
        })
        if (recur == false) {
            if (flag == 1) {
                let index = Tools.translatePosition(this.position[0], this.position[1]);
                let boardElement = document.getElementsByClassName("tile")[index];
                boardElement.children[0].remove();
                boardElement.appendChild(Wire.drawTile(this.position));
                if (this.state == true) {
                    this.switch(true);
                    this.propagator([this.position],2)
                }                
            }
            else if (flag == 2) {
                let index = Tools.translatePosition(this.position[0], this.position[1]);
                let boardElement = document.getElementsByClassName("tile")[index];
                boardElement.children[0].remove();
                boardElement.appendChild(Wire.drawTile(this.position));
                this.switch(true);
                if (this.state == false) {
                    this.state = true;
                    this.switch(true);
                    recursion.push(this.position);
                    this.propagator(recursion,2);
                }
            }
            else if (flag == 3) {
                recursion.push(this.position);
                if (this.propagator(recursion, 3) != true) {
                    this.state = false;
                    this.switch(false);
                } else {
                    this.propagator([this.position], 2);
                    return true}
                }
            }
    }


    connect() {
        this.propagator([this.position],1);
    }

    static drawTile(location) {
        if (location != undefined) {
            // if top wire exists
            if (Tile.boundries([location[0],location[1]-1]) == true && board[location[0]][location[1]-1].name != "Tile") {
                // if right wire exists
                if (Tile.boundries([[location[0]+1],location[1]]) == true && board[location[0]+1][location[1]].name != "Tile") {
                    // if bottom wire exists
                    if (Tile.boundries([location[0],location[1]+1]) == true && board[location[0]][location[1]+1].name != "Tile") {
                        // if left wire exists
                        if (Tile.boundries([location[0]-1,location[1]]) == true && board[location[0]-1][location[1]].name !="Tile") {
                            let button = this.button();
                            let logo = document.createElement("div");
                            logo.classList.add("crossHorizontal");
                            button.appendChild(logo);
                            logo = document.createElement("div");
                            logo.classList.add("verticalWire");
                            button.appendChild(logo);
                            logo = document.createElement("div");
                            logo.classList.add("crossHorizontal");
                            button.appendChild(logo);
                            return button
                        }
                        // if no left wire
                        let button = this.button();
                        let logo = document.createElement("div");
                        logo.classList.add("crossHorizontal");
                        button.appendChild(logo);
                        logo = document.createElement("div");
                        logo.classList.add("crossVerticalRight");
                        button.appendChild(logo);
                        logo = document.createElement("div");
                        logo.classList.add("crossHorizontal");
                        button.appendChild(logo);
                        return button
                    }
                    // if top right and left exist
                    if (Tile.boundries([location[0]-1,location[1]]) == true && board[location[0]-1][location[1]].name !="Tile") {
                        let button = this.button();
                        let logo = document.createElement("div");
                        logo.classList.add("crossHorizontal");
                        button.appendChild(logo);
                        logo = document.createElement("div");
                        logo.classList.add("verticalWire");
                        button.appendChild(logo);
                        return button

                    }
                    // if no left and bottom wire
                    let button = this.button();
                    let logo = document.createElement("div");
                    logo.classList.add("crossHorizontal");
                    button.appendChild(logo);
                    logo = document.createElement("div");
                    logo.classList.add("crossVerticalRight");
                    button.appendChild(logo);
                    return button
                }
                // if top and left exist
                if (Tile.boundries([location[0]-1,location[1]]) == true && board[location[0]-1][location[1]].name !="Tile") {
                    //if top, left and bottom exist
                    if (Tile.boundries([location[0],location[1]+1]) == true && board[location[0]][location[1]+1].name !="Tile") {
                        let button = this.button();
                        let logo = document.createElement("div");
                        logo.classList.add("crossHorizontal");
                        button.appendChild(logo);
                        logo = document.createElement("div");
                        logo.classList.add("crossVerticalLeft");
                        button.appendChild(logo);
                        logo = document.createElement("div");
                        logo.classList.add("crossHorizontal");
                        button.appendChild(logo);
                        return button
                    }
                    // if top, left no bottom
                    let button = this.button();
                    let logo = document.createElement("div");
                    logo.classList.add("crossHorizontal");
                    button.appendChild(logo);
                    logo = document.createElement("div");
                    logo.classList.add("crossVerticalLeft");
                    button.appendChild(logo);
                    return button
                }
            }
            // if bottom wire exists but no top
            if (Tile.boundries([location[0],location[1]+1]) == true && board[location[0]][location[1]+1].name != "Tile") {
                // if right wire exists
                if (Tile.boundries([[location[0]+1],location[1]]) == true && board[location[0]+1][location[1]].name != "Tile") {
                    // if left wire exists
                    if (Tile.boundries([location[0]-1,location[1]]) == true && board[location[0]-1][location[1]].name !="Tile") {
                        let button = this.button();
                        let logo = document.createElement("div");
                        logo.classList.add("verticalWire");
                        logo.style.marginTop = "42.5%"
                        button.appendChild(logo);
                        logo = document.createElement("div");
                        logo.classList.add("crossHorizontal");
                        button.appendChild(logo);
                        return button
                    }
                    // if no left wire
                    let button = this.button();
                    let logo = document.createElement("div");
                    logo.classList.add("crossVerticalRight");
                    logo.style.marginTop = "42.5%";
                    button.appendChild(logo);
                    logo = document.createElement("div");
                    logo.classList.add("crossHorizontal");
                    button.appendChild(logo);
                    return button
                }
                //if bottom, left and no right  
                if (Tile.boundries([location[0]-1,location[1]]) == true && board[location[0]-1][location[1]].name !="Tile") {
                    let button = this.button();
                    let logo = document.createElement("div");
                    logo.classList.add("crossVerticalLeft");
                    logo.style.marginTop = "42.5%";
                    button.appendChild(logo);
                    logo = document.createElement("div");
                    logo.classList.add("crossHorizontal");
                    button.appendChild(logo);
                    return button
                }
            }
            // if left wire exists
            if (Tile.boundries([location[0]-1,location[1]]) == true && board[location[0]-1][location[1]].name !="Tile") {
                let button = this.button();
                let logo = document.createElement("div");
                logo.classList.add("verticalWire");
                logo.style.marginTop = "42.5%";
                button.appendChild(logo);
                return button
            }
            // if right wire exists
            if (Tile.boundries([location[0]+1,location[1]]) == true && board[location[0]+1][location[1]].name !="Tile") {
                let button = this.button();
                let logo = document.createElement("div");
                logo.classList.add("verticalWire");
                logo.style.marginTop = "42.5%";
                button.appendChild(logo);
                return button
            }
        }
        // no wires around or no location
        let button = this.button();
        let logo = document.createElement("div");
        logo.classList.add("horizontalWire");
        logo.classList.add("off");
        button.appendChild(logo);
        return button;
    }

}

class NotGate extends Tile {
    constructor(x,y) {
        super(x,y);
        this.name = "NotGate";
        this.inputsLoc = [x,y-1];
        this.inputs = false;
        this.output = [x,y+1];
    }

    static width() {return 1};
    static height() {return 1};

    decisor(recursion, flag) {
        let recur = false;
        recursion.forEach(element => {
            if (element[0] == this.position[0] && element[1] == this.position[1]) {
                recur = true;
            }
        })
        if (recur == false) {
            if (flag == 1) {
                if (this.state == true) {
                    this.propagator([this.position],2,false)
                }                
            }
            else if (flag == 2) {
                    recursion.push(this.position);
                    this.inputCalc(recursion);
            }
            else if (flag == 3) {
                recursion.push(this.position);
                if (this.inputCalc(recursion, false) == true) {
                    return true
                    }
                }
            }
        }

        propagator(recursion, flag, input=true) {
            let x = this.position[0];
            let y = this.position[1];
            if (input == true) {
                if (Tile.boundries([x,y - 1]) == true) {
                    if (board[x][y - 1].decisor(recursion, flag) == true) { return true }
                    else {this.state = true; this.logic();}
                }
            } else {
                if (Tile.boundries([x,y+1]) == true) {
                    board[x][y+1].decisor(recursion, flag);
                }
            }
        }

        inputCalc(list, on=true) {
            let location = list[list.length-2];
            let inputLoc = [];
            if (board[location[0]][location[1]].name == "Gate") {
                inputLoc.push(location[0]+1);
                inputLoc.push(location[1]+2);
            } else {
                inputLoc.push(location[0]);
                inputLoc.push(location[1]);
            }
            if (on == true) {
                if (inputLoc[0] == this.inputsLoc[0] && inputLoc[1] == this.inputsLoc[1]) {
                    this.inputs = true;
                    this.switch(true, 1);
                    this.logic();
                }
            } else {
                if (inputLoc[0] == this.inputsLoc[0] && inputLoc[1] == this.inputsLoc[1]) {
                    this.inputs = false;
                    this.switch(false, 1);
                    this.logic();
                };
                if (inputLoc[0] == this.output[0] && inputLoc[1] == this.output[1]) {
                    /*if (this.propagator(list, 3) != true) {
                        this.state = false;
                        this.switch(false);
                    } else {return true}*/
                    
                    this.logic();
                    if (this.state == true) {return true}
                }
            }
    
        }

        logic() {
            if (this.inputs  == true) {
                this.state = false;
                this.switch(false);
                this.propagator([this.position],3,false);
            } else {
                this.state = true;
                this.switch(true);
                this.propagator([this.position],2,false);
            }
        }

        connect() {
            this.propagator([this.position],1)
        }

        switch(on) {
            let index = Tools.translatePosition(this.position[0], this.position[1]);
            let boardLoc = document.getElementById("board-container").children[index];
            if (on == true) {
                    boardLoc.getElementsByClassName("notInput")[0].classList.add("off");
                    boardLoc.getElementsByClassName("notInput")[0].classList.remove("on");

                    boardLoc.getElementsByClassName("notOutput")[0].classList.add("on");
                    boardLoc.getElementsByClassName("notOutput")[0].classList.remove("off");

            }
            if (on == false) {

                    boardLoc.getElementsByClassName("notInput")[0].classList.remove("off");
                    boardLoc.getElementsByClassName("notInput")[0].classList.add("on");

                    boardLoc.getElementsByClassName("notOutput")[0].classList.remove("on");
                    boardLoc.getElementsByClassName("notOutput")[0].classList.add("off");

            }
        }

        static drawTile(location) {
            let button = this.button();
            if (location !=undefined) {
                button = this.button();
            }
            let logo = document.createElement("div");
            logo.classList.add("notInput");
            button.appendChild(logo);
            logo = document.createElement("div");
            logo.classList.add("notGate");
            let img = document.createElement("img");
            img.src = "art/notGate.png";
            img.classList.add("img");
            logo.appendChild(img);
            button.appendChild(logo);
            logo = document.createElement("div");
            logo.classList.add("notOutput");
            button.appendChild(logo);
            return button;
        }
}

class Gate extends Tile {
    constructor(x, y) {
        super(x, y);
        this.name = "Gate";
        this.inputsLoc = [[x,y-1],[x+2,y-1]];
        this.inputs = [false,false]
        this.output = [x+1,y+3];

    }
    static width() {return 3};
    static height() {return 3};

    inputCalc(list, on=true) {
        let location = list[list.length-2];
        let inputLoc = [];
        if (board[location[0]][location[1]].name == "Gate") {
            inputLoc.push(location[0]+1);
            inputLoc.push(location[1]+2);
        } else if (board[location[0]][location[1]].name == "HalfAdder") {
            if ((location[0]) == this.inputsLoc[1][0]) {
                inputLoc.push(location[0]);
                inputLoc.push(location[1]+2);
            } else {
                inputLoc.push(location[0]+2);
                inputLoc.push(location[1]+2);
            }
        }else {
            inputLoc.push(location[0]);
            inputLoc.push(location[1]);
        }
        if (on == true) {
            if (inputLoc[0] == this.inputsLoc[0][0] && inputLoc[1] == this.inputsLoc[0][1]) {
                this.inputs[0] = true;
                this.switch(true, 1);
                this.logic();
            }
            if (inputLoc[0] == this.inputsLoc[1][0] && inputLoc[1] == this.inputsLoc[1][1]) {
                this.inputs[1] = true;
                this.switch(true, 2);
                this.logic();
            }
        } else {
            if (inputLoc[0] == this.inputsLoc[0][0] && inputLoc[1] == this.inputsLoc[0][1]) {
                this.inputs[0] = false;
                this.switch(false, 1);
                this.logic();
            };
            if (inputLoc[0] == this.inputsLoc[1][0] && inputLoc[1] == this.inputsLoc[1][1]) {
                this.inputs[1] = false;
                this.switch(false, 2);
                this.logic();
            }
            if (inputLoc[0] == this.output[0] && inputLoc[1] == this.output[1]) {
                if (this.propagator(list, 3) == false) {
                    return false
                } else {return true}
            }
        }

    }

    logic() {
        if (this.inputs[0] == true && this.inputs[1] == true) {
            this.state = true;
            this.switch(true, 3);
            this.propagator([this.position],2,false);
        } else {
            this.state = false;
            this.switch(false, 3);
            this.propagator([this.position],3,false);
        }
    }

    decisor(recursion, flag) {
        let recur = false;
        recursion.forEach(element => {
            if (element[0] == this.position[0] && element[1] == this.position[1]) {
                recur = true;
            }
        })
        if (recur == false) {
            if (flag == 1) {
                if (this.state == true) {
                    this.propagator([this.position],2,false)
                }                
            }
            else if (flag == 2) {
                    recursion.push(this.position);
                    this.inputCalc(recursion);
            }
            else if (flag == 3) {
                recursion.push(this.position);
                if (this.inputCalc(recursion, false) == true) {
                    return true
                    }
                }
            }
    }

    connect() {
        this.propagator([this.position],1)
    }

    switch(on,input) {
        let index = Tools.translatePosition(this.position[0], this.position[1]);
        let boardLoc = document.getElementById("board-container").children[index];
        if (on == true) {
            if (input == 1) {
                boardLoc.getElementsByClassName("gateInput1")[0].classList.add("on");
                boardLoc.getElementsByClassName("gateInput1")[0].classList.remove("off");
            }
            if (input == 2) {
                boardLoc.getElementsByClassName("gateInput2")[0].classList.add("on");
                boardLoc.getElementsByClassName("gateInput2")[0].classList.remove("off");
            }
            if (input == 3) {
                boardLoc.getElementsByClassName("gateOutput")[0].classList.add("on");
                boardLoc.getElementsByClassName("gateOutput")[0].classList.remove("off");
            }
        }
        if (on == false) {
            if (input == 1) {
                boardLoc.getElementsByClassName("gateInput1")[0].classList.remove("on");
                boardLoc.getElementsByClassName("gateInput1")[0].classList.add("off");
            }
            if (input == 2) {
                boardLoc.getElementsByClassName("gateInput2")[0].classList.remove("on");
                boardLoc.getElementsByClassName("gateInput2")[0].classList.add("off");
            }
            if (input == 3) {
                boardLoc.getElementsByClassName("gateOutput")[0].classList.remove("on");
                boardLoc.getElementsByClassName("gateOutput")[0].classList.add("off");

            }
        }
    }



    propagator(recursion, flag, input=true) {
        let x = this.position[0];
        let y = this.position[1];
        if (input == true) {
            let ok=true;
            if (Tile.boundries([x,y - 1]) == true) {
                if (board[x][y - 1].decisor(recursion, flag) != true) { ok = false };
            }
            if (Tile.boundries([x+2,y-1]) == true) {
                if (board[x+2][y - 1].decisor(recursion, flag) != true) { ok = false };
            }
            return ok;
        } else {
            if (Tile.boundries([x + 1,y+3]) == true) {
                if (board[x + 1][y+3].decisor(recursion, flag) == true) { return true };
            }
        }
    }

}


class AndGate extends Gate {
    constructor(x, y) {
        super(x, y);
    }



    static drawTile(location) {
        let button = this.button();
        if (location !=undefined) {
            button = this.button(3,3);
        }
        let logo = document.createElement("div");
        logo.classList.add("gateInput1");
        button.appendChild(logo);
        logo = document.createElement("div");
        logo.classList.add("gateInput2");
        button.appendChild(logo);
        logo = document.createElement("div");
        logo.classList.add("andGate");
        button.appendChild(logo);
        logo = document.createElement("div");
        logo.classList.add("gateOutput");
        button.appendChild(logo);
        return button;
    }


}

class OrGate extends Gate {
    constructor(x,y) {
        super(x,y);
    }
    logic() {
        if (this.inputs[0] == true || this.inputs[1] == true) {
            this.state = true;
            this.switch(true, 3);
            this.propagator([this.position],2,false);
        } else {
            this.state = false;
            this.switch(false, 3);
            this.propagator([this.position],3,false);
        }
    }

    static drawTile(location) {
        let button = this.button();
        if (location !=undefined) {
            button = this.button(3,3);
        }
        let logo = document.createElement("div");
        logo.classList.add("gateInput1");
        button.appendChild(logo);
        logo = document.createElement("div");
        logo.classList.add("gateInput2");
        button.appendChild(logo);
        logo = document.createElement("div");
        logo.classList.add("orGate");
        let img = document.createElement("img");
        img.src = "art/or.png";
        img.classList.add("img");
        logo.appendChild(img);
        button.appendChild(logo);
        logo = document.createElement("div");
        logo.classList.add("gateOutput");
        button.appendChild(logo);
        return button;
    }
}

class XorGate extends Gate {
    constructor(x,y) {
        super(x,y);
    }
    logic() {
        if (this.inputs[0] == true || this.inputs[1] == true) {
            if (this.inputs[0] == true && this.inputs[1] == true) {
                this.state = false;
                this.switch(false, 3);
                this.propagator([this.position],3,false)
            } else {
                this.state = true;
                this.switch(true, 3);
                this.propagator([this.position],2,false);
            }

        } else {
            this.state = false;
            this.switch(false, 3);
            this.propagator([this.position],3,false);
        }
    }

    static drawTile(location) {
        let button = this.button();
        if (location !=undefined) {
            button = this.button(3,3);
        }
        let logo = document.createElement("div");
        logo.classList.add("gateInput1");
        button.appendChild(logo);
        logo = document.createElement("div");
        logo.classList.add("gateInput2");
        button.appendChild(logo);
        logo = document.createElement("div");
        logo.classList.add("orGate");
        let img = document.createElement("img");
        img.src = "art/xor.png";
        img.classList.add("img");
        logo.appendChild(img);
        button.appendChild(logo);
        logo = document.createElement("div");
        logo.classList.add("gateOutput");
        button.appendChild(logo);
        return button;


    }
}

class HalfAdder extends Tile {
    constructor(x, y) {
        super(x, y);
        this.name = "HalfAdder";
        this.inputsLoc = [[x,y-1],[x+2,y-1]];
        this.inputs = [false,false];
        this.outputs = [false,false];
        this.outputsLoc = [[x,y+3],[x+2,y+3]];

    }
    static width() {return 3};
    static height() {return 3};

    inputCalc(list, on=true) {
        let location = list[list.length-2];
        let inputLoc = [];
        if (board[location[0]][location[1]].name == "Gate") {
            inputLoc.push(location[0]+1);
            inputLoc.push(location[1]+2);
        } else if (board[location[0]][location[1]].name == "HalfAdder") {
            if ((location[0]) == this.inputsLoc[1][0]) {
                inputLoc.push(location[0]);
                inputLoc.push(location[1]+2);
            } else {
                inputLoc.push(location[0]+2);
                inputLoc.push(location[1]+2);
            }
        } else {
            inputLoc.push(location[0]);
            inputLoc.push(location[1]);
        }
        if (on == true) {
            if (inputLoc[0] == this.inputsLoc[0][0] && inputLoc[1] == this.inputsLoc[0][1]) {
                this.inputs[0] = true;
                this.switch(true, 1);
                this.logic();
            }
            if (inputLoc[0] == this.inputsLoc[1][0] && inputLoc[1] == this.inputsLoc[1][1]) {
                this.inputs[1] = true;
                this.switch(true, 2);
                this.logic();
            }
        } else {
            if (inputLoc[0] == this.inputsLoc[0][0] && inputLoc[1] == this.inputsLoc[0][1]) {
                this.inputs[0] = false;
                this.switch(false, 1);
                this.logic();
            };
            if (inputLoc[0] == this.inputsLoc[1][0] && inputLoc[1] == this.inputsLoc[1][1]) {
                this.inputs[1] = false;
                this.switch(false, 2);
                this.logic();
            }
            if ((inputLoc[0] == this.outputsLoc[0][0] && inputLoc[1] == this.outputsLoc[0][1]) || (inputLoc[0] == this.outputsLoc[1][0] && inputLoc[1] == this.outputsLoc[1][1])) {
                if (this.propagator(list, 3) == false) {
                    return false
                } else {return true}
            }
        }

    }

    logic() {
        if ((this.inputs[0] == true ^ this.inputs[1]) == true) {
            this.switch(true, 4);
            this.outputs[1] = true;
            this.propagator([this.position],2,false);
        } else {
            this.switch(false, 4);
            this.outputs[1] = false;
            this.propagator([this.position],3,false);
        }

        if ((this.inputs[0] == true & this.inputs[1]) == true) {
            this.switch(true, 3);
            this.outputs[0] = true;
            this.propagator([this.position],2,false);
        } else {
            this.switch(false, 3);
            this.outputs[0] = false;
            this.propagator([this.position],3,false);
        }
    }

    decisor(recursion, flag) {
        let recur = false;
        recursion.forEach(element => {
            if (element[0] == this.position[0] && element[1] == this.position[1]) {
                recur = true;
            }
        })
        if (recur == false) {
            if (flag == 1) {
                    this.propagator([this.position],2,false)                              
            }
            else if (flag == 2) {
                    recursion.push(this.position);
                    this.inputCalc(recursion);
            }
            else if (flag == 3) {
                recursion.push(this.position);
                if (this.inputCalc(recursion, false) == true) {
                    return true
                    }
                }
            }
    }

    connect() {
        this.propagator([this.position],1)
    }

    switch(on,input) {
        let index = Tools.translatePosition(this.position[0], this.position[1]);
        let boardLoc = document.getElementById("board-container").children[index];
        if (on == true) {
            if (input == 1) {
                boardLoc.getElementsByClassName("gateInput1")[0].classList.add("on");
                boardLoc.getElementsByClassName("gateInput1")[0].classList.remove("off");
            }
            if (input == 2) {
                boardLoc.getElementsByClassName("gateInput2")[0].classList.add("on");
                boardLoc.getElementsByClassName("gateInput2")[0].classList.remove("off");
            }
            if (input == 3) {
                boardLoc.getElementsByClassName("gateOutput1")[0].classList.add("on");
                boardLoc.getElementsByClassName("gateOutput1")[0].classList.remove("off");
            }
            if (input == 4) {
                boardLoc.getElementsByClassName("gateOutput2")[0].classList.add("on");
                boardLoc.getElementsByClassName("gateOutput2")[0].classList.remove("off");
            }
        }
        if (on == false) {
            if (input == 1) {
                boardLoc.getElementsByClassName("gateInput1")[0].classList.remove("on");
                boardLoc.getElementsByClassName("gateInput1")[0].classList.add("off");
            }
            if (input == 2) {
                boardLoc.getElementsByClassName("gateInput2")[0].classList.remove("on");
                boardLoc.getElementsByClassName("gateInput2")[0].classList.add("off");
            }
            if (input == 3) {
                boardLoc.getElementsByClassName("gateOutput1")[0].classList.remove("on");
                boardLoc.getElementsByClassName("gateOutput1")[0].classList.add("off");
            }
            if (input == 4) {
                boardLoc.getElementsByClassName("gateOutput2")[0].classList.remove("on");
                boardLoc.getElementsByClassName("gateOutput2")[0].classList.add("off");
            }
        }
    }


    propagator(recursion, flag, input=true) {
        let x = this.position[0];
        let y = this.position[1];
        let newRecursion = recursion.slice();
        if (input == true) {
            let ok=true;
            if (Tile.boundries([x,y - 1]) == true) {
                if (board[x][y - 1].decisor(recursion, flag) != true) { ok=false };
            }
            if (Tile.boundries([x+2,y-1]) == true) {
                if (board[x+2][y - 1].decisor(recursion, flag) != true) { ok=false };
            }
            return ok;
        } else {
            if (Tile.boundries([x,y+3]) == true) {
                if (this.outputs[0] == true && flag==2) {
                    board[x][y+3].decisor(newRecursion, flag);
                } else if (this.outputs[0] == false && flag==3) {
                    board[x][y+3].decisor(newRecursion, flag);
                }                 
            }
            newRecursion = recursion.slice();
            if (Tile.boundries([x+2,y+3]) == true) {
                if (this.outputs[1] == true && flag==2) {
                    board[x+2][y+3].decisor(newRecursion, flag);
                } else if(this.outputs[1] == false && flag==3) {
                    board[x+2][y+3].decisor(newRecursion, flag);
                }
            }
        }
    }

    static drawTile(location) {
        let button = this.button();
        if (location !=undefined) {
            button = this.button(3,3);
        }
        let logo = document.createElement("div");
        logo.classList.add("gateInput1");
        button.appendChild(logo);
        logo = document.createElement("div");
        logo.classList.add("gateInput2");
        button.appendChild(logo);
        logo = document.createElement("div");
        logo.classList.add("halfAdder");

        button.appendChild(logo);
        logo = document.createElement("div");
        logo.classList.add("gateOutput1");
        button.appendChild(logo);
        logo = document.createElement("div");
        logo.classList.add("gateOutput2");
        button.appendChild(logo);
        logo = document.createElement("div");
        logo.classList.add("halt");
        logo.innerHTML = "in";
        button.appendChild(logo);
        logo = document.createElement("div");
        logo.classList.add("hart");
        logo.innerHTML = "in";
        button.appendChild(logo);
        logo = document.createElement("div");
        logo.classList.add("halb");
        logo.innerHTML = "C";
        button.appendChild(logo);
        logo = document.createElement("div");
        logo.classList.add("harb");
        logo.innerHTML = "Out";
        button.appendChild(logo);

        return button;
    }

}

class RemoveTile {
    name = "RemoveTile";

    static drawTile(position) {
        let base = document.createElement("div");
        base.classList.add("circutButton");
        let logo = document.createElement("div");
        logo.classList.add("removeTile");
        logo.innerHTML = "DEL";
        base.appendChild(logo);
        return base;
    }

    static remove(location){
        let type = board[location[0]][location[1]].name;
        if (type == "Wire" || type == "Source" || type == "NotGate") {
            board[location[0]][location[1]] = new Tile(location[0],location[1]);
            this.decisorSource(location);
        }
        else if (type == "Gate" || type =="HalfAdder") {
            board[location[0]][location[1]] = new Tile(location[0],location[1]);
            board[location[0]+1][location[1]] = new Tile(location[0]+1,location[1]);
            board[location[0]+2][location[1]] = new Tile(location[0]+2,location[1]);
            board[location[0]][location[1]+1] = new Tile(location[0],location[1]+1);
            board[location[0]+1][location[1]+1] = new Tile(location[0]+1,location[1]+1);
            board[location[0]+2][location[1]+1] = new Tile(location[0]+2,location[1]+1);
            board[location[0]][location[1]+2] = new Tile(location[0],location[1]+2);
            board[location[0]+1][location[1]+2] = new Tile(location[0]+1,location[1]+2);
            board[location[0]+2][location[1]+2] = new Tile(location[0]+2,location[1]+2);
            this.decisorGate(location);
        }
    }

    static decisorSource(location) {
        if (Tile.boundries([location[0],location[1]-1]) == true) {
            board[location[0]][location[1]-1].decisor([[location[0],location[1]]],3);
        }
        if (Tile.boundries([location[0],location[1]+1]) == true) {

            board[location[0]][location[1]+1].decisor([[location[0],location[1]]],3);
        }
        if (Tile.boundries([location[0]-1,location[1]]) == true) {
            board[location[0]-1][location[1]].decisor([[location[0],location[1]]],3);
        }
        if (Tile.boundries([location[0]+1,location[1]]) == true) {
            board[location[0]+1][location[1]].decisor([[location[0],location[1]]],3);
        }
    }

    static decisorGate(location) {
        if (Tile.boundries([location[0]+1,location[1]+3]) == true) {
            board[location[0]+1][location[1]+3].decisor([[location[0]+1,location[1]+2]],3);
        }

    }
}