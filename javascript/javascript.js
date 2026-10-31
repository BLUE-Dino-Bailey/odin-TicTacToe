function Gameboard(){
    let board = ["","","","","","","","",""];
    let P1Moves = "";
    let P2Moves = "";
    let P1Score = 0;
    let P2Score = 0;
    const WCOMBOS = ["123", "456", "789", "147", "258", "369", "159", "357"];
    const AddPlace = (placement, character) => {
        board[placement] = character
    };
    const DisplayBoard = () => { 
        return (`[${board[0]}][${board[1]}][${board[2]}]
        [${board[3]}][${board[4]}][${board[5]}]
        [${board[6]}][${board[7]}][${board[8]}]`) };
    const Player1Moves = () => { 
        P1Moves = "";
        for(let i = 0 ; i < 9 ; i++){
            if(board[i] == "X"){
                P1Moves += String(i + 1);
            }
        }
        console.log(`Player 1 Grid Slots: ${P1Moves}`);
    };
    const Player2Moves = () => { 
        P2Moves = "";
        for(let i = 0 ; i < 9 ; i++){
            if(board[i] == "O"){
                P2Moves += String(i + 1);
            }
        }
        console.log(`Player 2 Grid Slots: ${P2Moves}`);
    };

    const Conclusion = () => {
            for(let i = 0 ; i < 8 ; i++){
                let [num1, num2, num3] = [...WCOMBOS[i]];
                // console.log(`${num1}, ${num2}, ${num3}`)
                if(P1Moves.includes(num1) && P1Moves.includes(num2) && P1Moves.includes(num3)){
                    return "Player 1 Wins"
                    break
                } else if(P2Moves.includes(num1) && P2Moves.includes(num2) && P2Moves.includes(num3)){
                    return "Player 2 Wins"
                    break
                }
            } 
    };

    const incPlyr1Sc = () => { P1Score++;};
    const incPlyr2Sc = () => { P2Score++;};

    const displayScores = () => {
        return `Player 1 Score: ${P1Score}\n
                Player 2 Score: ${P2Score}`
    }

    const NextRound = () => {
        // Score Remains Unchanged
        board = ["","","","","","","","",""];
    }

    const ResetBoard = () => {
        // Score and Board complete reset;
        board = ["","","","","","","","",""];
        P1Score = 0;
        P2Score = 0;
    }

    return {AddPlace, DisplayBoard, Player1Moves, Player2Moves, Conclusion, NextRound, ResetBoard, incPlyr1Sc, incPlyr2Sc, displayScores};
}

async function Game(){
    clrBoard();
    const activeBoard = Gameboard();
    let start = 0; //Player 1 Starts
    while(!activeBoard.displayScores().includes("3")){
        clrBoard();
        for( let i = 0 ; i < 9; i++){
            // placement = parseInt(prompt("Enter a grid placement"));
            if(start == 0){
                placement = await place("X") - 1;
                activeBoard.AddPlace(placement, "X");
                activeBoard.Player1Moves();
            } else {
                placement = await place("O") - 1;
                activeBoard.AddPlace(placement, "O");
                activeBoard.Player2Moves();
            }

            activeBoard.Conclusion();
            if(activeBoard.Conclusion()=="Player 1 Wins"){
                console.log("Player 1 Wins");
                alert("Player 1 Wins");
                activeBoard.incPlyr1Sc();
                break;
            } else if(activeBoard.Conclusion()=="Player 2 Wins"){
                console.log("Player 2 Wins");
                alert("Player 2 Wins");
                activeBoard.incPlyr2Sc();
                break;
            }

            if(start == 0){
                start = 1;
            } else {
                start = 0;
            } // Next Player's Turn
            
        }
        console.log(activeBoard.DisplayBoard());
        console.log(activeBoard.displayScores());
        alert(activeBoard.displayScores());

        if(activeBoard.displayScores().includes("3")){
            alert("3 Games Won! Press New Game To Restart");
        } else {
        newRound = prompt("New Round? (Yes/no)").toLowerCase();
        if(newRound.includes("yes")){
            console.log("New Round!");
            activeBoard.NextRound();
        } else if(newRound == null || newRound.includes("no")){
            break;
        }
    }
    }
}

function clrBoard(){
    const cubes = document.querySelectorAll(".box");
    cubes.forEach(cube => {
        cube.textContent = "";
    })
}

//Took me a while to learn this
async function place(char){
    const cubes = document.querySelectorAll(".box");

    return new Promise(resolve => {

        function handleClick(event){
            const cube = event.currentTarget;

            if(cube.textContent !== "") return;

            cube.textContent = char;

            cubes.forEach(box => {
                box.removeEventListener("click", handleClick);
            });

            resolve(Number(cube.id));
        }

        cubes.forEach(cube => {
            cube.addEventListener("click", handleClick);
        });

    });
}

const NewGame = document.querySelector("#new-game");
NewGame.addEventListener("click", () => {
    Game();
});
//Game();