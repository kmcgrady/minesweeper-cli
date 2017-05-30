const input = require('./input');
const MinesweeperBoard = require('./minesweeper_board');

const board = new MinesweeperBoard();

function cleanInput(line) {
  let [row, col] = line.split(',');

  return [row.trim(), col.trim()].map((str) => parseInt(str, 10));
}

function playGame() {
  console.log(board.toString());
  if (board.isGameOver()) {
    if (board.isWinner()) {
      console.log('You Won!');
    } else {
      console.log('You Lost!');
    }

    process.exit();
  }

  console.log('Enter a location (row,col):');
  input()
  .then((line) => {
    if (line.trim().toLowerCase() == 'quit') {
      process.exit();
      return;
    }

    [row, col] = cleanInput(line);

    board.enterLocation(row, col);
    playGame();
  })
  .catch((err) => {
    console.log(err);
    console.log('Invalid Choice. Please try again!');
    playGame();
  })
}

console.log('Welcome to Minesweeper!');
playGame();
