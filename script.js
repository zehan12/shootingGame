
const [PLAYER_A, PLAYER_B] = ["player One","player Two"]
var scoreOne  = document.querySelector(".score_1");
var scoreTwo  = document.querySelector(".score_2");
var p1Won = document.querySelector(".p1");
var p2Won = document.querySelector(".p2")
var score = document.querySelector(".score");
var currentPlayerSpan = document.querySelector("#current_player");
var dect = document.querySelector(".dect");

var btn  = document.querySelectorAll("button")

var body = document.querySelector("body");
let currentPlayer = PLAYER_A
currentPlayerSpan.innerText = currentPlayer
let gamePause = false

var winCount = { 
    [PLAYER_A]: 0,
    [PLAYER_B]:0
}
var count = 0

body.addEventListener("keypress",(event)=>{
    if(gamePause) return
    if ( event.keyCode === 100 ) {
        let power = usePower();
        detuctScore( power, scoreOne, PLAYER_A );
        
    } 
    if ( event.keyCode === 107 ) {
        let power = usePower();
        detuctScore( power, scoreTwo, PLAYER_B );
    }
});

// random power
var usePower = ()=>{
    return Math.floor( (Math.random() * 50) + 1 );
}

// detuct score
function detuctScore( power, playerScore, player ) {
    if(currentPlayer !== player) return
    let newScore = playerScore.innerText - power;
    playerScore.nextElementSibling.innerText = "-"+power;
    playerScore.nextElementSibling.style.color = "red";
    setTimeout( () => { 
        playerScore.nextElementSibling.innerText = "";
    },500)
    if ( newScore >= 0 ){
        playerScore.innerText  = newScore;
    } else {
        playerScore.innerText  = 0;
        document.querySelector(".result").innerText = `${player} Die`
        winCount[player] += 1;
        p1Won.innerText = winCount[PLAYER_B];
        p2Won.innerText = winCount[PLAYER_A];
        if ( winCount[PLAYER_A] >= 3 ) {
            console.log(p1Won.innerText,"3")
            document.querySelector(".break").innerText = "Player One Won By 3 ponit"
            stopGame()
            return
        }
        if ( winCount[PLAYER_B] >= "3" ) {
            document.querySelector(".break").innerText = "Player Two Won By 3 ponit"
            stopGame()
            return
        } else if ( p1Won.innerText < 3 || p2Won.innerText < 3 ) {
            startGame();
        }
    }
    toggleCurrentPlayer()
}

function startGame(){
    count += 1;
    score.innerText = count
    if ( count <= 5 ) {
        scoreOne.innerText = 100;
        scoreTwo.innerText = 100;
    } else {
        score.innerText = "Game Over"
    }
}

function stopGame(){
  gamePause = true
}

function toggleCurrentPlayer(){
    currentPlayer = currentPlayer == PLAYER_A ? PLAYER_B : PLAYER_A
    currentPlayerSpan.innerText = currentPlayer
}

// result
// rounds
// one chance for each player

console.log("script is running");