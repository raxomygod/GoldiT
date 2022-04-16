// créer une grille (L x l)
    // ajouter aléatoirement les signes dans les cases
        // 2x le même signe max (paire)
    // les signes seront cachés
// le joueur clique sur une case
    // le signe caché se dévoile
// le joueur clique sur une seconde case
    // si signe 1 = signe 2 
        // les 2 cases restent retournées + validées
    // sinon 
        // les 2 cases sont de nouveaux cachées

// var signs = [
//     ["B", 1],
//     ["D", 1],
//     ["H", 1],
//     ["M", 1],
//     ["O", 1],
//     ["S", 1],
//     ["T", 1],
//     ["W", 1],
//     ["X", 1],
//     ["0", 1],
// ];
var signs = [
    "B", "D", "H", "M", "O", "S", "T", "W", "X", "0",
    "B", "D", "H", "M", "O", "S", "T", "W", "X", "0"
];
var boardSigns = [];
var foundSigns = [];
var trySign = "";

var totalSigns = signs.length;
const board = document.createElement("div");
board.id = "board";

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

document.body.appendChild(board);
game();


/*
    FUNCTIONS
*/
function game (){
    for (var i = 0; i < boardSigns.length; i++){
        const sign = boardSigns[i];
        console.log(i+1 + " : " + sign)
        const box = document.getElementById(sign);
        
        box.addEventListener("click", () => {
            box.innerText = sign.slice(0,1);
            if (sign === trySign){
                // if player click the same box more than once
                console.log("same box clicked!")
            } else {             
                if (trySign.length === 2){
                    const sign1 = document.getElementById(sign);
                    const sign2 = document.getElementById(trySign);
                    if (sign !== trySign && sign.slice(0,1) === trySign.slice(0,1)){   
                        [sign1, sign2].forEach(item => 
                            item.style.backgroundColor = "#FFD700"); 
                        foundSigns.push(sign, trySign);                      
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
                    trySign = "";
                } else {
                    trySign = sign;
                }
            if (foundSigns.sort().toString() === boardSigns.sort().toString()){
                setTimeout(() => {
                    alert("VICTORY !");
                }, 500);            
            }
                
        }
        });
    }
}
