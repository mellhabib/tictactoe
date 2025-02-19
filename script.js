//create gameboard
/* const gameBoard = (() => {
  const A = ["", "", "", "", "", "", "", "", ""];
  return A;
})(); */

let gameBoard = ["", "", "", "", "", "", "", "", ""];

//factory function that creates player objects
function createUser(name, marker, color) {
  //method that marks the gameboard
  const mark = function (markId) {
    gameBoard[markId] = marker;
    console.log(markId + ": marked!!");
  };

  let user = {
    name,
    marker,
    color,
    mark,
  };

  return user;
}

//temporary players
const player1 = createUser("player1", "X", "red");
const player2 = createUser("player2", "O", "blue");

var elements = document.querySelectorAll(".grid");

//set the grid divs id from 0-8
for (var i = 0; i < elements.length; i++) {
  elements[i].setAttribute("id", i);
}

let toggler = 1;

elements.forEach((div) => {
  div.addEventListener("click", () => {
    if (gameBoard[div.id] !== "") {
      return;
    } else {
      if (toggler === 1) {
        toggler = 0;
        player1.mark(div.id);
        if (checkBoard(player1)) {
          toggler = 2;
        }
      } else if (toggler === 0) {
        toggler = 1;
        //player2.mark(div.id);

        if (checkBoard(player2)) {
          toggler = 2;
        }
      }
    }

    renderMarks();
    if (toggler != 2) {
      let marker = randomBox();
      toggler = 1;
      player2.mark(marker);
      if (checkBoard(player2)) {
        toggler = 2;
      }
      renderMarks();
    }
  });
});

function randomBox() {
  let blankBox = [];

  for (let i = 0; i < gameBoard.length; i++) {
    if (gameBoard[i] == "") {
      console.log(gameBoard[i]);
      blankBox.push(i);
    }
  }
  console.log(blankBox);
  const randomElement = blankBox[Math.floor(Math.random() * blankBox.length)];
  return randomElement;
}

function renderMarks() {
  for (i = 0; i < gameBoard.length; i++) {
    document.getElementById(i).innerHTML = gameBoard[i];
    //document.getElementById(i).innerHTML = i;
  }
}

/* Winning conditions:
0   1   2
3   4   5
6   7   8
0   3   6
1   4   7
2   5   8
0   4   8
2   4   6*/

function checkBoard(player) {
  const m = player.marker;
  if (
    (gameBoard[0] === m && gameBoard[1] === m && gameBoard[2] === m) ||
    (gameBoard[3] === m && gameBoard[4] === m && gameBoard[5] === m) ||
    (gameBoard[6] === m && gameBoard[7] === m && gameBoard[8] === m) ||
    (gameBoard[0] === m && gameBoard[3] === m && gameBoard[6] === m) ||
    (gameBoard[1] === m && gameBoard[4] === m && gameBoard[7] === m) ||
    (gameBoard[2] === m && gameBoard[5] === m && gameBoard[8] === m) ||
    (gameBoard[0] === m && gameBoard[4] === m && gameBoard[8] === m) ||
    (gameBoard[2] === m && gameBoard[4] === m && gameBoard[6] === m)
  ) {
    console.log(player.name + " wins");
    document.getElementById("grid").style.background = player.color;
    return true;
  }
}
