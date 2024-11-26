//Load boards from file or manually
const first = [
    "6--3-9-7--7---5-2--34--1---362--4-81--96--7--71--9-4-5-2---651---78-2--345---7-9-",
    "685329174971485326234761859362574981549618732718293465823946517197852643456137298"
];

//Variables

var timer;
var timeRemaining;
var selectedNum;
var selectedTile;
var disableSelect;

window.onload = function() {
    //Run startgame function when button is clicked
    id("createButton").addEventListener("click", startGame);

    for(let i = 0; i < id("number-container").children.length; i++){
        id("number-container").children[i].addEventListener("click", function() {
            if(!disableSelect) {
                if(this.classList.contains("selected")){
                    this.classList.remove("selected");
                    selectedNum = null;
                } else {
                    for(let i = 0; i < 9; i++){
                        id("number-container").children[i].classList.remove("selected");
                    }
    
                    this.classList.add("selected");
                    selectedNum = this;
                    updateMove();
                } 
            }
        });
    }
}

function startGame() {
    let board;
    board = first[0];

    //allow select
    disableSelect = false;
    
    generateBoard(board);

    startTimer();

    if(id("theme1").checked) {
        qs("body").classList.remove("dark");
    } else {
        qs("body").classList.add("dark");
    }

    id("number-container").classList.remove("hidden");
}

function startTimer() {
    timeRemaining = 1200; // 20 minutes

    id("timer").textContent = timeConversion(timeRemaining);

    timer = setInterval(function () {
        timeRemaining--;

        console.log(`Time Remaining: ${timeRemaining}`); // Debugging log

        if (timeRemaining === 0) {
            console.log("Time is up. Clearing timer and calling endGame...");
            clearInterval(timer); // Stop the interval
            endGame(); // Call endGame when time is up
            return;
        }

        id("timer").textContent = timeConversion(timeRemaining);
    }, 1000);
}


function timeConversion(time) {
    let minutes = Math.floor(time/60);
    
    if(minutes < 10) minutes = "0" + minutes;
    let seconds = time % 60;
    if(seconds < 10) seconds = "0" + seconds;

    return minutes + ":" + seconds;
}

function generateBoard(board) {
    //Clear previous board
    clearPrevious();

    //Let used to increment tile ids
    let idCount = 0;

    //Create 81 tiles

    for(let i = 0; i < 81; i++){
        let tile = document.createElement("p");
        if(board[i] != "-"){
            tile.textContent = board[i];
        } else {
            //Add click event listener to tile
            tile.addEventListener("click", function() {
                if(!disableSelect) {
                    if(tile.classList.contains("selected")) {
                        tile.classList.remove("selected");
                        selectedTile = null;
                    } else {
                        for(let i = 0; i < 81; i++){
                            qsa(".tile")[i].classList.remove("selected");
                        }

                        tile.classList.add("selected");
                        selectedTile = tile;
                        updateMove();
                    }
                }
            });
        }

        //Assign tile id
        tile.id = idCount;

        idCount++;

        tile.classList.add("tile");

        if((tile.id > 17 && tile.id < 27) || (tile.id > 44 && tile.id < 54)){
            tile.classList.add("bottomBorder");
        }
        
        if((tile.id + 1) % 9 == 3 || (tile.id + 1) % 9 == 6) {
            tile.classList.add("rightBorder");
        }
        //Add tiles to board
        id("board").appendChild(tile);
    }
}

function updateMove() {
    if(selectedTile && selectedNum){
        selectedTile.textContent = selectedNum.textContent;

        if(checkCorrect(selectedTile)) {
            selectedTile.classList.remove("selected");
            selectedNum.classList.remove("selected");

            selectedNum = null;
            selectedTile = null;

            if(checkDone()) {
                endGame();
            }
        } else {
            disableSelect = true;
            selectedTile.classList.add("incorrect");
            setTimeout(function(){
                disableSelect = false;

                selectedTile.classList.remove("incorrect");
                selectedTile.classList.remove("selected");
                selectedNum.classList.remove("selected");

                selectedTile.textContent = "";
                selectedTile = null;
                selectedNum = null;
            }, 1000);
        }
    }
}

function checkDone() {
    let tiles = qsa(".tile");

    for(let i = 0; i < tiles.length; i++){
        if(tiles[i].textContent === "") return false;
    }

    return true;
}

function endGame() {
    console.log("endGame function called!");

    disableSelect = true;

    clearTimeout(timer); // Stop any ongoing timer updates

    const timerElement = id("timer");

    if (!timerElement) {
        console.error("Timer element not found in the DOM!");
        return;
    }

    if (timeRemaining === 0) {
        console.log("Setting timer message to 'You ran out of time.'");
        timerElement.innerHTML = "You ran out of time and lost! Please start a new game.";
    } else {
        console.log("Setting timer message to 'You won!'");
        timerElement.innerHTML = 'You won! Click <a href="puzzle3.html">here</a> to proceed to the next puzzle.';
    }

    console.log("Final Timer Message:", timerElement.innerHTML);
}



function checkCorrect(tile) {
    let solution;

    solution = first[1];

    if(solution.charAt(tile.id) === tile.textContent) return true;
    else return false;
}
function clearPrevious() {
    //Access all tiles
    let tiles = qsa(".tile");

    //Remove each tile
    for(let i = 0; i < tiles.length; i++){
        tiles[i].remove();
    }

    //If there is a time clear it
    if(timer) clearTimeout(timer);

    //Deselect any numbers
    for(let i = 0; i < id("number-container").children.length; i++){
        id("number-container").children[i].classList.remove("selected");
    }

    //Clear selected variables
    selectedTile = null;
    selectedNum = null;
}

//Helper functions
function id(id) {
    return document.getElementById(id);
}

function qs(selector) {
    return document.querySelector(selector);
}

function qsa(selector) {
    return document.querySelectorAll(selector);
}
