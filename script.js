var signs = [
    "B", "D", "H", "M", "O", "S", "T", "W", "X", "0",
    "B", "D", "H", "M", "O", "S", "T", "W", "X", "0"
];
var boardSigns = [];
var foundSigns = [];
var prevSign = "";
var tries = 0;
var gameIsRunning = true;

const gameContainer = document.createElement("div");
gameContainer.id = "game-container";

var totalSigns = signs.length;
const board = document.createElement("div");
board.id = "board";
board.className = "board";
board.classList.toggle("checked");

const victoryDiv = document.createElement("div");
victoryDiv.id = "victory-div";
victoryDiv.innerText = "YOU GOLDED IT !";

gameContainer.appendChild(victoryDiv);
document.body.appendChild(gameContainer);

setBoard();
game();

// add score (tries made to paint board in gold)
    // add local leaderboard
// replay button after victory
//

/*
    FUNCTIONS
*/
function setBoard(){
    for (var i = 0; i < totalSigns; i++){
        const box = document.createElement("div");
        var randomSign = signs[Math.floor(Math.random() * signs.length)];
        box.className = "boxes " + randomSign;
        // define sign1 & sign2
        if (boardSigns.includes(randomSign + "1")){
            boardSigns.push(randomSign + "2");
            box.id = randomSign + "2";
        } else {
            boardSigns.push(randomSign + "1");
            box.id = randomSign + "1";
        }
    
        box.innerText = "";
        signs.splice(signs.indexOf(randomSign), 1);
        board.appendChild(box);
    }
    gameContainer.appendChild(board);
};

function game() {
    for (var i = 0; i < boardSigns.length; i++){
        const sign = boardSigns[i];
        console.log(i+1 + " : " + sign)
        const box = document.getElementById(sign);
        
        box.addEventListener("click", () => {
            box.innerText = sign.slice(0,1);
            if (sign === prevSign || box.classList.contains("checked")){
                console.log("same box or gold box clicked ! try again.");
            } else {             
                if (prevSign.length === 2){
                    const sign1 = document.getElementById(sign);
                    const sign2 = document.getElementById(prevSign);
                    if (sign !== prevSign && sign.slice(0,1) === prevSign.slice(0,1)){   
                        turnGold(sign1, true);
                        turnGold(sign2, true);
                        foundSigns.push(sign, prevSign);                      
                    } else {
                        [sign1, sign2].forEach(item => 
                            item.style.backgroundColor = "#FF1122"); 
                        setTimeout(() => {
                            sign1.style.backgroundColor = "#000000";
                            sign1.innerText = "";
                            sign2.style.backgroundColor = "#000000";
                            sign2.innerText = "";
                        }, 500);
                    }
                    prevSign = "";
                    tries++;
                } else {
                    prevSign = sign;
                }
            if (foundSigns.sort().toString() === boardSigns.sort().toString()){
                gameIsRunning = false;   
                //board.style.zoom = "50%";
                return;    
            }
                
        }
        });
    }
};

function turnGold(sign, statut) { 
    if (statut){
        sign.style.backgroundColor = "#FFD700";
        sign.style.color = "#000000";
        sign.style.textShadow = "1px 2px 2px #FFFFFF";
        sign.classList.toggle("checked");
    }
}   