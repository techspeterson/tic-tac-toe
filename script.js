var board = document.getElementById("board");
var x = document.createElement("p");
x.innerHTML = '<i class="fas fa-times"></i>';
x.classList.add("x");
var o = document.createElement("p");
o.innerHTML = '<i class="far fa-circle"></i>';
o.classList.add("o");
var wins = 0;
var losses = 0;
var myMark = o;
var pcMark = x;

function displayWinLoss() {
  document.getElementById("wins").innerText = wins;
  document.getElementById("losses").innerText = losses;
}

function gameOver() {
  for (square of document.getElementsByClassName("square")) {
    square.classList.remove("available");
    square.removeEventListener("click", selectSquare);
  }
  displayWinLoss();
}

function checkBoard() {
  let matchesArray = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9],
    [1, 4, 7],
    [2, 5, 8],
    [3, 6, 9],
    [1, 5, 9],
    [3, 5, 7]
  ];

  let squares = Array.from(document.getElementsByClassName("square"));

  for (matches of matchesArray) {
    if (checkSquares(matches, squares)) return true;
  }

  if (document.getElementsByClassName("available").length == 0) {
    alert("It's a tie.");
    return true;
  }

  function checkSquares(array, squares) {
    let s1 = squares[array[0] - 1];
    let s2 = squares[array[1] - 1];
    let s3 = squares[array[2] - 1];

    for (square of [s1, s2, s3]) {
      if (!square.classList.contains("my-square") && !square.classList.contains("pc-square")) {
        return;
      }
    }

    if (s1.classList.contains("my-square") && s2.classList.contains("my-square") && s3.classList.contains("my-square")) {
      for (square of [s1, s2, s3]) {
        square.classList.add("match-win");
      }

      wins++;
      alert("You win!");
      gameOver();
      return true;
    }
    else if (s1.classList.contains("pc-square") && s2.classList.contains("pc-square") && s3.classList.contains("pc-square")) {
      for (square of [s1, s2, s3]) {
        square.classList.add("match-lose");
      }

      losses++;
      alert("You lose...");
      gameOver();
      return true;
    }
  }
}

function markSquare(square, mark, className) {
  square.classList.add(className);
  markCopy = mark.cloneNode(true);
  square.appendChild(markCopy);
  square.classList.remove("available");
  square.removeEventListener("click", selectSquare);
  if (checkBoard()) return true;
}

function selectSquare() {
  if (markSquare(event.target, myMark, "my-square")) return;
  let choices = Array.from(document.getElementsByClassName("available"));
  let choiceIndex = Math.floor(Math.random() * choices.length);
  markSquare(choices[choiceIndex], pcMark, "pc-square");
}

function initialise() {
  while (board.firstChild) {
    board.removeChild(board.firstChild);
  }

  for (let i = 0; i < 9; i++) {
    let square = document.createElement("div");
    square.classList.add("square", "available");
    board.appendChild(square);
    square.addEventListener("click", selectSquare);
  }
}

document.getElementById("restart").addEventListener("click", initialise);

initialise();
displayWinLoss();

let toggleMark = document.getElementById("toggle-mark")
toggleMark.innerText = "Play as X";
toggleMark.addEventListener("click", (event) => {
  event.preventDefault();
  if (myMark == o) {
    myMark = x;
    pcMark = o;
    event.target.innerText = "Play as O";
    event.target.classList.add("blue-bg");
    event.target.classList.remove("red-bg");
  }
  else {
    myMark = o;
    pcMark = x;
    event.target.innerText = "Play as X";
    event.target.classList.add("red-bg");
    event.target.classList.remove("blue-bg");
  }
  initialise();
})