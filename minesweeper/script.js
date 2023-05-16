// Creating a normal board 10x10
class NormalBoard {
  constructor(width, height, bombCount) {
    this.width = width;
    this.height = height;
    this.bombCount = bombCount;
  }

  generateCells() {
    const cells = [];
    for (let i = 0; i < this.width; i += 1) {
      cells.push([]);
      for (let j = 0; j < this.height; j += 1) {
        cells[i].push(' ');
      }
    }
    return cells;
  }

  generateBombs() {
    const bombs = [];
    while (bombs.length < this.bombCount) {
      const row = Math.floor(Math.random() * this.width);
      const col = Math.floor(Math.random() * this.height);

      const isDuplicate = bombs.some(([r, c]) => r === row && c === col);
      if (!isDuplicate) {
        bombs.push([row, col]);
      }
    }
    return bombs;
  }

  updateCellsArray(cellsArray) {
    for (let i = 0; i < this.width; i += 1) {
      for (let j = 0; j < this.height; j += 1) {
        if (cellsArray[i][j] === 'x') {
          if (j + 1 < cellsArray[i].length && cellsArray[i][j + 1] !== 'x') {
            cellsArray[i].splice(j + 1, 1, '0');
            if (i + 1 <= 9 && cellsArray[i + 1][j] !== 'x') {
              cellsArray[i + 1].splice(j - 1, 1, '0');
              cellsArray[i + 1].splice(j + 1, 1, '0');
              cellsArray[i + 1].splice(j, 1, '0');
            }
          }
          if (j - 1 >= 0 && cellsArray[i][j - 1] !== 'x') {
            cellsArray[i].splice(j - 1, 1, '0');
            if (i - 1 >= 0 && cellsArray[i - 1][j] !== 'x') {
              cellsArray[i - 1].splice(j - 1, 1, '0');
              cellsArray[i - 1].splice(j + 1, 1, '0');
              cellsArray[i - 1].splice(j, 1, '0');
            }
          }
        }
      }
    }
    return cellsArray;
  }

  generateCellsCover() {
    const container = document.createElement('div');
    container.classList.add('container');

    const mineField = document.createElement('div');
    mineField.classList.add('mine-field');

    const cellsArray = this.generateCells();
    const bombsArray = this.generateBombs();

    for (let i = 0; i < this.width; i += 1) {
      const fieldRow = document.createElement('div');
      fieldRow.classList.add('field-row');
      for (let j = 0; j < this.height; j += 1) {
        const fieldCell = document.createElement('div');
        fieldCell.classList.add('field-cell');
        fieldCell.id = `${i}-${j}`;
        for (let k = 0; k < bombsArray.length; k += 1) {
          const bombCoords = bombsArray[k];
          if (i === bombCoords[0] && j === bombCoords[1]) {
            fieldCell.classList.add('field-bomb');
            cellsArray[i].splice(j, 1, 'x');
          }
        }

        fieldCell.innerHTML = cellsArray[i][j];
        fieldRow.appendChild(fieldCell);
      }
      mineField.appendChild(fieldRow);
    }
    container.appendChild(mineField);
    document.body.appendChild(container);
    console.log(cellsArray);
  }
}

const normalBoard = new NormalBoard(10, 10, 10);
normalBoard.generateCellsCover();
