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
        cells[i].push(j);
      }
    }
    return cells;
  }

  generateBombs() {
    const bombs = [];
    while (bombs.length < this.bombCount) {
      const row = Math.floor(Math.random() * this.width);
      const col = Math.floor(Math.random() * this.height);
      bombs.push([row, col]);
    }
    console.log(bombs);
    return bombs;
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
        fieldCell.innerHTML = cellsArray[i][j];
        fieldCell.id = `${i}-${j}`;
        console.log(`${[i]} ${[j]} -cell`);
        console.log(`${bombsArray[[j][i]]} - bomb`);
        if (cellsArray[i][j] === bombsArray[i][j]) {
          fieldCell.classList.add('field-bomb');
          fieldCell.innerHTML = 'X';
        }
        fieldRow.appendChild(fieldCell);
      }
      mineField.appendChild(fieldRow);
      container.appendChild(mineField);
    }
    document.body.appendChild(container);
  }
}

const normalBoard = new NormalBoard(10, 10, 10);
normalBoard.generateCellsCover();
