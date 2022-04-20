var boardSigns = [];
var foundSigns = [];
var leaderboard = [];
var gameIsRunning = false;
var tries = 0;
// var signs = [
//     "B", "D", "H", "M", "O", "S", "T", "W", "X", "0",
//     "B", "D", "H", "M", "O", "S", "T", "W", "X", "0"
// ];
var signs = [
    "B", "D", "H", "M", "O", "S", 
    "B", "D", "H", "M", "O", "S"
];

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

const leaderboardTable = document.createElement("table");
leaderboardTable.id = "leaderboard";

gameContainer.appendChild(victoryDiv);
gameContainer.appendChild(replayBtn);
document.body.appendChild(startBtn);
document.body.appendChild(gameContainer);
document.body.appendChild(leaderboardTable);

startBtn.addEventListener("click", () => {
    startBtn.style.display = "none";
    createBoard(signs);
    setBoard();
    gameContainer.style.display = "flex";
    game();
});

replayBtn.addEventListener("click", () => {
    tries = 0;
    replayBtn.style.display = "none";
    victoryDiv.style.display = "none";
    document.getElementById("board").style.zoom = "";
    document.querySelectorAll(".boxes").forEach(box => {
        box.classList.toggle("checked");
    })
    setBoard();
})

function createBoard(signsList){
    const board = document.createElement("div");
    board.id = "board";
    for (var i = 0; i < signsList.length; i++){
        const box = document.createElement("div");
        box.className = "boxes";
        board.appendChild(box);
    }
    gameContainer.insertBefore(board, gameContainer.firstChild);
};

function setBoard() {
    var usedSigns = [];
    document.querySelectorAll(".boxes").forEach(box => {
        var randomSign = signs[Math.floor(Math.random() * signs.length)];
        if (usedSigns.includes(randomSign)){
            box.id = randomSign + "2";
            boardSigns.push(randomSign + "2");
        } else {
            box.id = randomSign + "1";
            boardSigns.push(randomSign + "1");
        }
        box.innerText = randomSign;
        usedSigns.push(randomSign);
        signs.splice(signs.indexOf(randomSign), 1);
    })
    signs = usedSigns;
    setTimeout(() => {
        document.querySelectorAll(".boxes").forEach(box => {box.innerText = ""});     
        gameIsRunning = true;  
    }, 2000);
    console.log(boardSigns)
};

function game() {
    var prevSign = ""; 
    for (var i = 0; i < gameContainer.firstChild.children.length; i++){
        const box = document.getElementById(boardSigns[i]);
        box.addEventListener("click", () => {
            if (gameIsRunning){
                const sign = box.id;   
                box.innerText = sign.slice(0,1);         
                if (prevSign.length === 0){
                    prevSign += sign;
                } 
                if (sign === prevSign){
                    console.log("same box clicked !")
                } 
                else {
                    // if player try to find twins
                    if (sign.slice(0,1) === prevSign.slice(0,1)){
                        turnGold(document.getElementById(sign));
                        turnGold(document.getElementById(prevSign));
                        foundSigns.push(sign, prevSign);
                    } 
                    else {
                        turnRed(document.getElementById(sign));
                        turnRed(document.getElementById(prevSign));
                    }
                    prevSign = "";
                    tries++;
                }
                if (foundSigns.sort().join("") === boardSigns.sort().join("")){
                    victory(tries);
                    return;
                }
            }
        })
    
    }
};

function turnGold(sign) { 
    sign.classList.toggle("checked");
}; 

function turnRed(sign){
    sign.style.backgroundColor = "#FF1122";
    setTimeout(() => {
        sign.style.backgroundColor = "";
        sign.innerText = "";
    }, 500);
};

function victory(tries) { 
    board.style.zoom = "50%";
    victoryDiv.innerText = `YOU GOLDED IT IN ${tries} TRIES!`;
    victoryDiv.style.display = "flex";
    replayBtn.style.display = "flex";
    gameIsRunning = false;
    boardSigns = [];
    foundSigns = [];
    leaderboard.push(tries);
}

leaderboard.push(7,6,9);

function getLeaderboard(leaderboard){

    leaderboardTable.innerHTML = `
        <thead>
            <tr>
                <th>LEADERBOARD</th>
            </tr>
        </thead>
        <tbody> 
            <td>
                ${scores}
            </td> 
        </tbody>  
    `;

}
getLeaderboard(leaderboard)
