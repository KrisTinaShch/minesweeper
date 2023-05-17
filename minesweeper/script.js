// Creating a normal board 10x10
class NormalBoard {
  constructor(width, height, bombCount, number = 0) {
    this.width = width;
    this.height = height;
    this.bombCount = bombCount;
    this.number = number;
  }

  generateCells() {
    const cells = [];
    for (let i = 0; i < this.width; i += 1) {
      cells.push([]);
      for (let j = 0; j < this.height; j += 1) {
        cells[i].push(this.number);
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

  updateCellsArray(cellsArray, bombCoords) {
    const i = bombCoords[0];
    const j = bombCoords[1];
    for (let k = i - 1; k < i + 2; k += 1) {
      for (let l = j - 1; l < j + 2; l += 1) {
        if (k >= 0 && l >= 0 && k < 10 && cellsArray[k][l] !== 'x' && k < cellsArray.length && l < cellsArray[k].length) {
          if (typeof cellsArray[k][l] !== 'number') {
            cellsArray[k][l] = 1;
          } else {
            cellsArray[k][l] += 1;
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
    console.log(bombsArray);
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
            this.updateCellsArray(cellsArray, bombCoords);
          }
          // console.log(bombCoords);
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
