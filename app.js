/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
let dice, RoundScore, CurrentScore, ActivePlayer, GlobalScore, WinningScore;
// Placeholder for document.querySelector => $
function $(elementName) {
  return document.querySelector(elementName);
}

init();

function init() {
  WinningScore = 100;
  GlobalScore = [0, 0];
  RoundScore = 0;
  ActivePlayer = 0;
  $("#current-0").textContent = RoundScore;
  $("#current-1").textContent = RoundScore;
  $("#score-0").textContent = GlobalScore[0];
  $("#score-1").textContent = GlobalScore[1];
  $(".dice").style.display = "none";
}

console.log("=======");
// console.log($(".btn-roll").innerHTML);

$(".btn-roll").addEventListener("click", function() {
  dice = Math.floor(Math.random() * 6) + 1;
  $(".dice").style.display = "block";
  console.log("dice = ", dice);
  $(".dice").src = `dice-${dice}.png`;

  console.log($("#current-" + ActivePlayer).textContent);

  if (dice !== 1) {
    RoundScore += dice;
    $("#current-" + ActivePlayer).textContent = RoundScore;
  } else {
    nextPlayer();
  }
});

$(".btn-hold").addEventListener("click", function() {
  console.log("Hold clicked");
  GlobalScore[ActivePlayer] += RoundScore;
  $("#score-" + ActivePlayer).textContent = GlobalScore[ActivePlayer];
  // check if current payer won
  if (GlobalScore[ActivePlayer] >= WinningScore) {
    console.log("player won");
    $("#name-" + ActivePlayer).textContent = "Winner";
    $("#name-" + ActivePlayer).classList.add("winner");

    init();
  } else {
    nextPlayer();
  }
});

function nextPlayer() {
  RoundScore = 0;
  $("#current-0").textContent = RoundScore;
  $("#current-1").textContent = RoundScore;
  ActivePlayer === 0 ? (ActivePlayer = 1) : (ActivePlayer = 0);
  console.log("active player switched: new player = " + ActivePlayer);
  $(`.player-0-panel`).classList.toggle("active");
  $(`.player-1-panel`).classList.toggle("active");
}
