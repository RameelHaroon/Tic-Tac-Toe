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
        if(!availableCell) return;

        board[r][c].setValue(player);
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