const Game = () => {
  const X = "X";
  const O = "O";
  const locationToId = {
    0: "#a", 1: "#b", 2: "#c", 3: "#d", 4: "#e", 5: "#f", 6: "#g", 7: "#h", 8: "#i",
  };

  let player = 0;
  let moveCount = 0;
  let gameState = [[0,0,0], [0,0,0],[0,0,0]];
  let gameOver = false;
  let moveOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8];

  // return 1 for X/user win, -1 for O/computer win, 0 for no winner
  const checkWin = (gameBoard) => {
    const win0 = [X, X, X];
    const win1 = [O, O, O];
    let winner = 0;

    const compareArr = (arr1, arr2) => {
      for (let i = 0; i < 3; i += 1) {
        if (arr1[i] !== arr2[i]) {
          return false;
        }
      }
      return true;
    };

    // return 1 for X/user win, -1 for O/computer win, 0 for no winner
    const checkLine = (line) => {
      if (compareArr(line, win0)) {
        return 1;
      }
      if (compareArr(line, win1)) {
        return -1;
      } else {
        return 0;
      }
    };

    // check each row
    for (let line of gameBoard) {
      winner = checkLine(line);
      if (winner != 0) {
        return winner;
      }
    }
    // check each col
    for (let i=0; i<3; i++) {
      let line = [gameBoard[0][i], gameBoard[1][i], gameBoard[2][i] ];
      winner = checkLine(line);
      if (winner != 0) {
        return winner;
      }
    }
    // check diagonals
    let diagonal = [gameBoard[0][0], gameBoard[1][1], gameBoard[2][2] ];
    winner = checkLine(diagonal);
    if (winner != 0) {
      return winner;
    }
    diagonal = [gameBoard[0][2], gameBoard[1][1], gameBoard[2][0]];
    winner = checkLine(diagonal);
    return winner;
  };

  // prints out the board for testing purposes
  const printBoard = () => {
    for (let line of gameState) {
      console.log(line);
    }
  };

  // returns score for a board in minMax
  const minMaxScore = (currentGameBoard, depth) => {
    const winner = checkWin(currentGameBoard);
    if (winner === 1) {
      return 10 - depth;
    } else if (winner === -1) {
      return depth - 10;
    } else {
      return 0;
    }
  };

  // retursively call minMax to find best move
  // player 0 is user, player 1 is computer
  const minMax = (gameBoard, moveOptions, depth, player) => {
    const minMaxScoreResult = minMaxScore(gameBoard, depth);
    if (minMaxScoreResult != 0 || moveOptions.length === 0) {
      return minMaxScoreResult;
    }

    const currentgameBoard = JSON.parse(JSON.stringify(gameBoard));
    const currentMoveOptions = JSON.parse(JSON.stringify(moveOptions));
    const currentDepth = depth + 1;
    let scores = [];
    let moves = [];
    let loc = 0;

    //
    for (let currentMove of currentMoveOptions) {
      let arrRow = parseInt(currentMove/3);
      let arrCol = currentMove % 3;
      if (player === 1) {
        currentgameBoard[arrRow][arrCol] = O;
      } else {
        currentgameBoard[arrRow][arrCol] = X;
      }
      const nextMoveOptions = currentMoveOptions.filter((n)=>{return n!=currentMove;});
      scores.push(minMax(currentgameBoard, nextMoveOptions, currentDepth, (player+1)%2));
      moves.push(currentMove);
      currentgameBoard[arrRow][arrCol] = 0;
    };

    // returns max location if player = 0, min location if player =1
    if (player === 0) {
      for (let i = 1; i < scores.length; i++) {
        if (scores[i] > scores[loc]) {
          loc = i;
        }
      }
    } else {
      for (let i = 1; i < scores.length; i++) {
        if (scores[i] < scores[loc]) {
          loc = i
        }
      }
    }
    if (depth === 0) {
      console.log(moves[loc]);
      return moves[loc];
    } else {
      return scores[loc];
    }

  }
  
  // takes a location 0-8 on tic-tac-toe board, confirms it a valid location, then updated gameState and the UI,\
  // lastly checks if game is over/won
  const turnHelper = (location) => {
    const moveCheck = checkValidMove(location);
    if (moveCheck !== 0) {
      return moveCheck;
    } else if (gameOver) {
      alert("Game is complete, Push Reset to start a new game.");
      return true;
    }

    moveOptions = moveOptions.filter((n)=>{return n!=location;});
    const arrRow = parseInt(location/3);
    const arrCol = location%3;
    if (player === 0) {
     gameState[arrRow][arrCol] = X; 
    } else if (player === 1) {
      gameState[arrRow][arrCol] = O;
    } else {
      console.log(player)
      return -2;
    }

    let buttonID = locationToId[location];
    const currentButton =document.querySelector(buttonID);
    if (player === 0) {
      currentButton.classList.add("x");
    } else {
      currentButton.classList.add("o");
    }

    let winner = checkWin(gameState);
    if (winner != 0) {
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

  // represents a turn, lets the user input a location adn then lets AI take a turn
  const turn = (location) => {
    turnHelper(location);
    turnHelper(minMax(gameState, moveOptions, 0, 1));
  };

  // confirms that move is a valid move
  const checkValidMove = (location) => {
    if (location > 8 || location < 0) {
      alert("Invalid location");
      return -3;
    } else {
      if (!moveOptions.includes(location) ) {
        alert("Location occupied");
        return -4;
      }
    }
    return 0;
  }

  // resets game board to allow user to play another game
  const reset = () => {
    player = 0;
    moveCount = 0;
    gameState = [[0,0,0], [0,0,0],[0,0,0]];
    moveOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8]
    gameOver = false;
    for (let ID in locationToId) {
      const currentButton =document.querySelector(locationToId[ID]);
      currentButton.classList.remove("x");
      currentButton.classList.remove("o");
    }
  };

  return {printBoard, turn, reset};
};

const newGame = Game();
