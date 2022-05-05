
const [PLAYER_A, PLAYER_B] = ["player One","player Two"]
var scoreA  = document.querySelector(".score_1");
var scoreB  = document.querySelector(".score_2");
var pAwinCount = document.querySelector(".p1");
var pBWinCount = document.querySelector(".p2")
var round = document.querySelector(".round");
var winningPlayerBlock = document.querySelector("#winning_player");
var dect = document.querySelector(".dect");
var start = document.querySelector(".start")

var winCount = { 
    [PLAYER_A]: 0,
    [PLAYER_B]:0
}

var score = {
    [PLAYER_A]: 100,
    [PLAYER_B]: 100
}
var count = 0

start.addEventListener("click",playRound);

async function playRound(){
    startRound()

    for ( let i = 0 ; score[PLAYER_A] > 0 && score[PLAYER_B] > 0 ; i++ ) {
        await delay(200);
        let power = usePower();
        if(i % 2 == 0){
            detuctScore( power, scoreB, PLAYER_B );
        } else {
            detuctScore( power, scoreA, PLAYER_A );
        }
    }

    endRound()
    if(calculateGameWinner()) {
        start.style.display = "none"
    }
}


// random power
var usePower = ()=>{
    return Math.floor( (Math.random() * 5) + 1 );
}

// detuct score
function detuctScore( power, playerScore, player ) {
    score[player] =  score[player] - power;
    // playerScore.nextElementSibling.innerText = "-"+power;
    // playerScore.nextElementSibling.style.color = "red";
    // setTimeout( () => { 
        // playerScore.nextElementSibling.innerText = "";
    // },200)

    if ( score[player] >= 0 ){
        playerScore.innerText  = score[player];
    } else {
        playerScore.innerText  = 0;
        calculateRoundWinner()
    }
}

function calculateRoundWinner(){
    if(score[PLAYER_A]<=0) {
        winCount[PLAYER_B] += 1
    }
    if(score[PLAYER_B]<=0) {
        winCount[PLAYER_A] += 1
    }
    setWinCount()
}

function calculateGameWinner() {
    if(winCount[PLAYER_A] >=3) {
        winningPlayerBlock.innerText = "Player One Win"
        return true
    } if(winCount[PLAYER_B] >=3) {
        winningPlayerBlock.innerText = "Player Two Win"
        return true
    }
    return false
}

function setWinCount(){
    pAwinCount.innerText = winCount[PLAYER_A];
    pBWinCount.innerText = winCount[PLAYER_B];
}

function setScore() {
    scoreA.innerText = score[PLAYER_A]
    scoreB.innerText = score[PLAYER_B]
}

function startRound(){
    count += 1;
    updateDOM()
}

function endRound() {
    if ( count <= 5 ) {
        score[PLAYER_A] = 100;
        score[PLAYER_B] = 100;
        updateDOM()
    } else {
        updateDOM()
        round.innerText = "Game Over"
    }
    
}

function toggleCurrentPlayer(){
    currentPlayer = currentPlayer == PLAYER_A ? PLAYER_B : PLAYER_A
    currentPlayerSpan.innerText = currentPlayer
}


function updateDOM() {
    round.innerText = count
    setWinCount()
    setScore()
}

function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
