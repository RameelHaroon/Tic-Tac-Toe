function Cell(){
    let value = "0";

    const getValue = () => value;

    const setValue = function(val){
        value = val;
    }

    return{
        getValue,
        setValue
        };
}

function Board(){

    // Initialize board dimensions and board itself
    const rows = 3;
    const cols = 3;
    const board = []

    for(let r = 0; r < rows; r++){
        board[r] = [];
        for(let c = 0; c < cols; c++){
            board[r].push(Cell());
        }
    }

    // to get board's current status
    const getBoard = () => board;

    const markCell = function(r, c, player){
        const availableCell = board[r][c].getValue() === "0";
        if(!availableCell) return 0;

        board[r][c].setValue(player);

        return 1;
    }

    const printBoard = () => {
        const boardValues = board.map((row) => row.map((cell) => cell.getValue()));
        console.log(boardValues);
    };

    const blankCells = () => board.reduce((count, row) => {
        return count + row.filter(cell => cell.getValue() === "0").length;
      }, 0);

    const checkWinner = () => {
      const values = board.map(row => row.map(cell => cell.getValue()));

      // Check rows
      for (let r = 0; r < 3; r++) {
        if (values[r][0] !== "0" && values[r][0] === values[r][1] && values[r][1] === values[r][2]) {
          return values[r][0];
        }
      }

      // Check columns
      for (let c = 0; c < 3; c++) {
        if (values[0][c] !== "0" && values[0][c] === values[1][c] && values[1][c] === values[2][c]) {
          return values[0][c];
        }
      }

      // Check diagonals
      if (values[0][0] !== "0" && values[0][0] === values[1][1] && values[1][1] === values[2][2]) {
        return values[0][0];
      }

      if (values[0][2] !== "0" && values[0][2] === values[1][1] && values[1][1] === values[2][0]) {
        return values[0][2];
      }

      // No winner
      return null;
    };

    return {
        getBoard,
        markCell,
        printBoard,
        blankCells,
        checkWinner
    }
}

function GameController(
    playerOneName = "Player One",
    playerTwoName = "Player Two"
){
    const board = Board();

    const players = [
    {
      name: playerOneName,
      symbol: "X"
    },
    {
      name: playerTwoName,
      symbol: "O"
    }
  ];

  let activePlayer = players[0];

  const switchActivePlayer = function(){
    activePlayer = activePlayer === players[0] ? players[1] : players[0];
  }

  const getActivePlayer = () => activePlayer;

  const printNewRound = () => {
    board.printBoard();
    console.log(`${getActivePlayer().name}'s turn.`);
  };

  const drawGame = () => {
    return board.blankCells() > 0 ? false : true;
  };

  const playRound = function(row, column){
    let invalid = board.markCell(row, column, getActivePlayer().symbol);
    while(!invalid){

        console.log(`Not a Valid Cell`);
        printNewRound();
        if(board.markCell(row, column, getActivePlayer().symbol)){
            break;
        }
    }

    if (board.checkWinner()) {
      console.log(`${getActivePlayer().name} wins!`);
      board.printBoard();
      return;
    }

    // Game winning logic
    if(drawGame()){
      console.log(`DRAW GAME`);
      return;
    }

    switchActivePlayer();
    printNewRound();
  }

  printNewRound();

  return {
    playRound,
    getActivePlayer
  };
}