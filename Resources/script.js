const hat = "👒";
const hole = "⬛";
const fieldCharacter = "🟩";
const pathCharacter = "👣";
let y = 0;
let x = 0;
let cont = true;
let board = document.getElementById("board");
let result = document.getElementById("result");
let button = document.getElementById("button");
let test = document.getElementById("test");

class Field {
  constructor(Array) {
    this.field = Array;
  }

  print() {
    for (let i = 0; i < this.field.length; i++) {
      board.innerHTML += this.field[i].join("") + "<br>";
    }
  }

  static generateField(height, width) {
    let array = [];
    function getRandSquare() {
      let num = Math.floor(Math.random() * 2);
      switch (num) {
        case 0:
          return "🟩";
          break;
        case 1:
          return "⬛";
          break;
      }
    }
    for (let j = 0; j < height; j++) {
      array[j] = [];
      for (let k = 0; k < width; k++) {
        array[j][k] = getRandSquare();
      }
    }

    array[Math.floor(Math.random() * height)][
      Math.floor(Math.random() * width)
    ] = "👒";
    array[0][0] = "👣";

    return array;
  }
}

const MyField = Field.generateField(5, 4);
let Game = new Field(MyField);
Game.print();

function nextMove() {
  let move = prompt("Which way?");
  move = move.toLowerCase();
  switch (move) {
    case "d":
      y++;
      break;
    case "u":
      y--;
      break;
    case "l":
      x--;
      break;
    case "r":
      x++;
      break;
    default:
      result.innerHTML =
        "Type a valid letter: D, U, L or R. Not case-sensitive.";
      cont = false;
      break;
  }
  if (y < 0 || x < 0 || y > Game.field.length || x >= Game.field[0].length) {
    //Game.field[y][x] = "❌";
    //board.innerHTML = "";
    //Game.print();
    result.innerHTML = "Out of bounds - you lose! Refresh to play again.";
    cont = false;
    document.removeEventListener("keydown", nextMove);
  } else if (Game.field[y][x] === "👒") {
    Game.field[y][x] = "⭐";
    board.innerHTML = "";
    Game.print();
    result.innerHTML = "You won! Refresh to play again.";
    cont = false;
    document.removeEventListener("keydown", nextMove);
  } else if (Game.field[y][x] === "⬛") {
    Game.field[y][x] = "❌";
    board.innerHTML = "";
    Game.print();
    result.innerHTML =
      "You fell down a hole - you lose! Refresh to play again.";
    cont = false;
    document.removeEventListener("keydown", nextMove);
  } else {
    Game.field[y][x] = "👣";
    board.innerHTML = "";
    Game.print();
  }
}

document.addEventListener("keydown", nextMove);
