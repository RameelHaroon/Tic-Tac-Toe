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
        const boardValues = board.map((row) => row.map((cell) => cell.getValue()))
        console.log(boardValues);
    };

    return {
        getBoard,
        markCell,
        printBoard
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

  const playRound = function(row, column){
    let invalid = board.markCell(row, column, getActivePlayer().symbol);
    while(!invalid){

        console.log(`Not a Valid Cell`);
        printNewRound();
        if(board.markCell(row, column, getActivePlayer().symbol)){
            break;
        }
    }

    // Game winning logic

    switchActivePlayer();
    printNewRound();
  }

  printNewRound();

  return {
    playRound,
    getActivePlayer
  };
}