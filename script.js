const Game = () => {
  const X = "X";
  const O = "O";
  let player = 0;
  let moveCount = 0;
  let gameBoard = [[0,0,0], [0,0,0],[0,0,0]];
  let gameOver = false;
  
  const checkWin = () => {
    const win0 = [X, X, X];
    const win1 = [O, O, O];
    let winner = -1;

    const compareArr = (arr1, arr2) => {
      for (let i = 0; i<3; i++) {
        if (arr1[i] !== arr2[i]) {
          return false;
        }
      }
      return true;
    };

    const checkLine = (line) => {
      if (compareArr(line, win0)) {
        return 0;
      } else if (compareArr(line, win1)) {
        return 1;
      } else {
        return -1;
      }
    };

    // check each row
    for (let line of gameBoard) {
      winner = checkLine(line);
      if (winner != -1) {
        return winner;
      }
    }
    // check each col
    for (let i=0; i<3; i++) {
      let line = [gameBoard[0][i], gameBoard[1][i], gameBoard[2][i] ];
      winner = checkLine(line);
      if (winner != -1) {
        return winner;
      }
    }
    // check diagonals
    let diagonal = [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2] ];
    winner = checkLine(diagonal);
    if (winner != -1) {
      return winner;
    }
    diagonal = [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]];
    winner = checkLine(diagonal);
    return winner;
  };

  const printBoard = () => {
    for (let line of gameBoard) {
      console.log(line);
    }
  };

  const turn = (location) => {
    const moveCheck = checkValidMove(location);
    if (moveCheck !== 0) {
      return moveCheck;
    } else if (gameOver) {
      alert("Game is complete, Push Reset to start a new game.");
      return true;
    }

    const arrRow = parseInt(location/3);
    const arrCol = location%3;
    //const accessLocation = gameBoard[arrRow][arrCol];
    if (player === 0) {
     gameBoard[arrRow][arrCol] = X; 
    } else if (player === 1) {
      gameBoard[arrRow][arrCol] = O;
    } else {
      console.log(player)
      return -2;
    }

    let buttonID;
    switch (location) {
      case 0:
        buttonID = "#a";
        break;
      case 1:
        buttonID = "#b";
        break;
      case 2:
        buttonID = "#c";
        break;
      case 3:
        buttonID = "#d";
        break;
      case 4:
        buttonID = "#e";
        break;
      case 5:
        buttonID = "#f";
        break;
      case 6:
        buttonID = "#g";
        break;
      case 7:
        buttonID = "#h";
        break;
      case 8:
        buttonID = "#i";
        break;
    }

    const currentButton =document.querySelector(buttonID);
    if (player === 0) {
      currentButton.classList.add("x");
    } else {
      currentButton.classList.add("o");
    }

    let winner = checkWin();
    if (winner != -1) {
      gameOver = true;
      alert(`Player ${winner} won congrats!!`);
      return winner;
    } else {
      player = (player + 1) % 2;
      moveCount += 1;
      if (moveCount === 9) {
        alert("Game is a draw.");
        gameOver = true;
      }
    }
  };

  const checkValidMove = (location) => {
    if (location > 8 || location < 0) {
      console.log("Invalid location")
      alert("Invalid location");
      return -3;
    } else {
      const arrRow = parseInt(location/3);
      const arrCol = location%3;
      if (gameBoard[arrRow][arrCol] != 0) {
        console.log("Location occupied");
        alert("Location occupied");
        return -4;
      }
    }
    return 0;
  }

  const reset = () => {
    player = 0;
    moveCount = 0;
    gameBoard = [[0,0,0], [0,0,0],[0,0,0]];
    gameOver = false;
    const buttonIDs = ["#a", "#b", "#c", "#d", "#e", "#f", "#g", "#h", "#i"];
    for (let ID of buttonIDs) {
      const currentButton =document.querySelector(ID);
      currentButton.classList.remove("x");
      currentButton.classList.remove("o");
    }
  };

  return {printBoard, turn, reset};
};

const newGame = Game()
