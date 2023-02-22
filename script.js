const Game = () => {
  const X = "X";
  const O = "O";
  const locationToId = {
    0: "#a",  1:"#b", 2:"#c", 3: "#d",  4:"#e", 5:"#f", 6: "#g",  7:"#h", 8:"#i",
  };

  let player = 0;
  let moveCount = 0;
  let gameBoard = [[0,0,0], [0,0,0],[0,0,0]];
  let gameOver = false;
  let moveOptions = [0, 1, 2, 3, 4, 5, 6, 7, 8];
  
    // return 0 for X/user win, 1 for O/computer win, -1 for no winner
  const checkWin = (gameBoard) => {
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

    // return 0 for X/user win, 1 for O/computer win, -1 for no winner
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

  const AImove = () => {
    // let bestMove = AIsearch(gameBoard, moveOptions, 1);
    // console.log(bestMove);
    // return bestMove["loc"];
    return moveOptions[Math.floor(Math.random()*moveOptions.length)];
  };

  //need to return location and score, and do min max
  const AIsearch = (gameBoard, moveOptions, player) => {
    const currentgameBoard = JSON.parse(JSON.stringify(gameBoard));
    const currentMoveOptions = JSON.parse(JSON.stringify(moveOptions));;
    let scores = {};
  
    // checks each possible move and recursively checks deeper moves
    for (let currentMove of currentMoveOptions) {
      scores[currentMove] = 0;
      let arrRow = parseInt(currentMove/3);
      let arrCol = currentMove % 3;
      if (player === 1) {
        currentgameBoard[arrRow][arrCol] = O;
      } else {
        currentgameBoard[arrRow][arrCol] = X;
      }
  
      const nextMoveOptions = currentMoveOptions.filter((n)=>{return n!=currentMove;});
      const score = checkWin(currentgameBoard);
      if (score === 0) {
        scores[currentMove] += 2;
      } else if (score === 1) {
        scores[currentMove] -= 1;
      } else if (nextMoveOptions.length !== 0) {
        scores[currentMove] += AIsearch(currentgameBoard, nextMoveOptions, (player+1)%2);
      }
    }
    //min of scores function
    const minOfScores = () => {
      let min = {loc: undefined, score: undefined};
      for (let loc in scores) {
        if (min.value > scores[loc] || min.value === undefined) {
          min.value = scores[loc];
          min.loc = loc;
        }
      }
      return min;
    }
    //max of scores function
    const maxOfScores = () => {
      let max = {loc: undefined, score: undefined};
      for (let loc in scores) {
        if (max.value < scores[loc] || max.value === undefined) {
          max.value = scores[loc];
          max.loc = loc;
        }
      }
      return max;
    }
    if (player === 0) {
      return maxOfScores();
    } else {
      return minOfScores();
    }
  };

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
    //const accessLocation = gameBoard[arrRow][arrCol];
    if (player === 0) {
     gameBoard[arrRow][arrCol] = X; 
    } else if (player === 1) {
      gameBoard[arrRow][arrCol] = O;
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


    let winner = checkWin(gameBoard);
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

  const turn = (location) => {
    turnHelper(location);
    turnHelper(AImove());
  };

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

  const reset = () => {
    player = 0;
    moveCount = 0;
    gameBoard = [[0,0,0], [0,0,0],[0,0,0]];
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

const Tree = (currentBoard, moveOptions) => {
  // user win is 2, draw is 0, AI win is -1

  const search = () => {
    //recursively search
  }

};

const newGame = Game();
