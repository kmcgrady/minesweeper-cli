const BOMB = 'B';
const SPACE = '_';
const SAFE = '+';

module.exports = class MinesweeperBoard {
  constructor(height = 10, width = 10, numBombs = 3) {
    this.height = height;
    this.width = width;
    this.numBombs = numBombs;
    this.board = [];
    this.bombs = {};
    this.isWin = null;

    for (let i = 0; i < this.height; i++) {
      const row = [];

      for (let j = 0; j < this.width; j++) {
        row.push(SPACE);
      }

      this.board.push(row);
    }

    for (let i = 0; i < this.numBombs; i++) {
      let placed = false;

      while (!placed) {
        const row = Math.floor(Math.random() * height);
        const col = Math.floor(Math.random() * width);

        if (!this.bombs[row + ',' + col]) {
          this.bombs[row + ',' + col] = true;
          placed = true;
        }
      }
    }
  }

  isGameOver() {
    if (this.isWin !== null) {
      return true;
    }

    let numSpaces = 0;

    for (let i = 0; i < this.height; i++) {
      for (let j = 0; j < this.height; j++) {
        if (this.board[i][j] === SPACE) {
          numSpaces += 1;
        }
      }
    }

    if (numSpaces === this.numBombs) {
      this.isWin = true;
      return true;
    }

    return false;
  }

  isWinner() {
    return this.isWin === true;
  }

  validNeighbors(row, col) {
    const directions = [
      [-1, -1],
      [-1,  0],
      [-1,  1],
      [ 0, -1],
      [ 0,  1],
      [ 1, -1],
      [ 1,  0],
      [ 1,  1]
    ];
    const neighbors = [];

    for (const dir of directions) {
      const [rOff, cOff] = dir;
      const nRow = row + rOff;
      const nCol = col + cOff;

      if (nRow < 0 || nRow >= this.height || nCol < 0 || nCol >= this.width) {
        continue;
      }

      if (this.board[nRow][nCol] === SPACE) {
        neighbors.push([nRow, nCol]);
      }
    }

    return neighbors;
  }

  bombCount(row, col) {
    let count = 0;

    for (const neighbor of this.validNeighbors(row, col)) {
      const [nRow, nCol] = neighbor;

      if (this.bombs[nRow + ',' + nCol]) {
        count += 1;
      }
    }

    return count;
  }

  enterLocation(row, col) {
    if (this.bombs[row + ',' + col]) {
      this.board[row][col] = BOMB;
      this.isWin = false;
      return;
    }

    const workingList = [[row, col]];

    while (workingList.length > 0) {
      const [row, col] = workingList.shift();
      const bombCount = this.bombCount(row, col);

      if (bombCount === 0) {
        this.board[row][col] = SAFE;

        for (const neighbor of this.validNeighbors(row, col)) {
          workingList.push(neighbor);
        }
      } else {
        this.board[row][col] = bombCount;
      }
    }
  }

  toString() {
    let str = '  ';
    for (let i = 0; i < this.width; i++) {
      if (i < 10) {
        str += i + ' ';
      } else {
        str += i;
      }
    }
    str += '\n';

    for (let i = 0; i < this.height; i++) {
      let rowStr = '';
      if (i < 10) {
        rowStr += i + ' ';
      } else {
        rowStr += i;
      }

      for (let j = 0; j < this.height; j++) {
        rowStr += this.board[i][j] + ' ';
      }

      str += rowStr + '\n';
    }

    return str;
  }
}
