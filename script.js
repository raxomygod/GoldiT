var boardSigns = [];
var foundSigns = [];
var gameIsRunning = false;
var leaderboard = [];
var prevSign = "";
var signs = [
    "B", "D", "H", "M", "O", "S", "T", "W", "X", "0",
    "B", "D", "H", "M", "O", "S", "T", "W", "X", "0"
];
var totalSigns = signs.length;

const gameContainer = document.createElement("div");
gameContainer.id = "game-container";

const startBtn = document.createElement("button");
startBtn.id = "start-button";
startBtn.innerText = "GOLD IT";

const replayBtn = document.createElement("button");
replayBtn.id = "replay-button";
replayBtn.style.display = "none";
replayBtn.innerText = "GOLD MORE";

const victoryDiv = document.createElement("div");
victoryDiv.id = "victory-div";

gameContainer.appendChild(victoryDiv);
gameContainer.appendChild(replayBtn);
document.body.appendChild(startBtn);
document.body.appendChild(gameContainer);


startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    createBoard();
    setBoard();
    gameContainer.style.display = "flex";
    game();
});

replayBtn.addEventListener("click", () => {
    boardSigns = [];
    foundSigns = [];
    prevSign = "";
    board.style.zoom = "100%";
    replayBtn.style.display = "none";
    victoryDiv.style.display = "none";

    document.querySelectorAll(".boxes").forEach(box => {
        box.className = "boxes";
        box.id = "";
        box.style = "none";
    })
    setBoard();
    game();
});

// add local leaderboard
/*
    FUNCTIONS
*/
function createBoard(){
    const board = document.createElement("div");
    board.id = "board";
    board.className = "board";
    for (var i = 0; i < totalSigns; i++){
        const box = document.createElement("div");
        box.className = "boxes";
        board.appendChild(box);
    }
    gameContainer.appendChild(board);
}

function setBoard(){
    const boxes = document.querySelectorAll(".boxes");
    var usedSigns = [];
    boxes.forEach(box => {
        var randomSign = signs[Math.floor(Math.random() * signs.length)];
        box.classList.toggle(randomSign);
        // define sign1 & sign2
        if (boardSigns.includes(randomSign + "1")){
            boardSigns.push(randomSign + "2");
            box.id = randomSign + "2";
        } else {
            boardSigns.push(randomSign + "1");
            box.id = randomSign + "1";
        }  
        box.innerText = box.id.slice(0,1);
        usedSigns.push(randomSign);
        signs.splice(signs.indexOf(randomSign), 1);   
        //console.log(signs.splice(signs.indexOf(randomSign), 1)) 
    })
    gameContainer.insertBefore(board, gameContainer.firstChild);
    signs = usedSigns;
    setTimeout(() => {
        document.querySelectorAll(".boxes").forEach(box => {
            box.innerText = "";
        });
        gameIsRunning = true;
    }, 2000); 
};

function game() {
    var tries = 0;
    for (var i = 0; i < boardSigns.length; i++){
        const sign = boardSigns[i];
        const box = document.getElementById(sign);
        box.addEventListener("click", () => {
            if (gameIsRunning){
                box.innerText = sign.slice(0,1);
                if (sign === prevSign || box.classList.contains("checked")){
                    console.log("same box or gold box clicked ! try again.");
                } 
                else if (prevSign.length === 2){
                    const sign1 = document.getElementById(sign);
                    const sign2 = document.getElementById(prevSign);
                    if (sign1.innerText === sign2.innerText){   
                        turnGold(sign1);
                        turnGold(sign2);
                        foundSigns.push(sign, prevSign);                      
                    } 
                    else {
                        // if not matching
                        sign1.style.backgroundColor = "#FF1122";
                        sign2.style.backgroundColor = "#FF1122";
                        setTimeout(() => {
                            sign1.style.backgroundColor = "#000000";
                            sign1.innerText = "";
                            sign2.style.backgroundColor = "#000000";
                            sign2.innerText = "";
                        }, 500);
                    }
                    prevSign = "";
                    tries++;
                } 
                else {
                    prevSign = sign;
                }                                 
                if (foundSigns.length > 2 && foundSigns.sort().toString() === boardSigns.sort().toString()){
                    victory(tries);
                    return;    
                }                           
            }
        });
    }
};

function turnGold(sign) { 
    sign.style.cssText += `
        background-color: #FFD700;
        color: #000000;
        text-shadow: 1px 2px 2px #FFFFFF;
    `;
    sign.className += " checked";
}; 

function victory(tries) { 
    gameIsRunning = false;
    board.style.zoom = "50%";
    victoryDiv.innerText = `YOU GOLDED IT IN ${tries} TRIES!`;
    victoryDiv.style.display = "flex";
    document.querySelectorAll(".boxes").forEach(box => {
        box.style.border = "1px solid #000000";
    });
    replayBtn.style.display = "flex";
}