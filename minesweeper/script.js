// Creating a normal board 10x10
class NormalBoard {
  constructor(width, height, bombCount, number = 0, bombCoords = [], cellsArray = []) {
    this.width = width;
    this.height = height;
    this.bombCount = bombCount;
    this.number = number;
    this.bombCoords = bombCoords;
    this.cellsArray = cellsArray;
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
    console.log(bombs)
    return bombs;
  }

  updateCellsArray() {
    const cells = [];
    const bombCoords = this.generateBombs();
    this.bombCoords = bombCoords;

    for (let i = 0; i < this.width; i += 1) {
      cells.push([]);
      for (let j = 0; j < this.height; j += 1) {
        const isBomb = bombCoords.some(([row, col]) => i === row && j === col);
        cells[i].push(isBomb ? 'x' : ' ');
      }
    }

    bombCoords.forEach(([i, j]) => {
      for (let k = i - 1; k < i + 2; k += 1) {
        for (let l = j - 1; l < j + 2; l += 1) {
          if (k >= 0 && l >= 0 && k < 10 && cells[k][l] !== 'x' && k < cells.length && l < cells[k].length) {
            if (typeof cells[k][l] !== 'number') {
              cells[k][l] = 1;
            } else {
              cells[k][l] += 1;
            }
          }
        }
      }
    });
    this.cellsArray = cells;
    return cells;
  }

  generateCellsCover() {
    const container = document.createElement('div');
    container.classList.add('container');

    const mineField = document.createElement('div');
    mineField.classList.add('mine-field');
    const cells = this.updateCellsArray();
    for (let i = 0; i < this.width; i += 1) {
      const fieldRow = document.createElement('div');
      fieldRow.classList.add('field-row');
      for (let j = 0; j < this.height; j += 1) {
        const fieldCells = document.createElement('div');
        fieldCells.classList.add('field-cell');
        fieldCells.id = `[${i}, ${j}]`;
        fieldCells.innerHTML = cells[i][j];
        fieldRow.appendChild(fieldCells);
      }
      mineField.appendChild(fieldRow);
    }
    container.appendChild(mineField);
    document.body.appendChild(container);

    this.generateCover();
  }

  generateCover() {
    let clicksCounter = 0;
    const fieldCells = document.querySelectorAll('.field-cell');
    const mineField = document.querySelector('.mine-field');
    const gameOver = document.createElement('div');
    let isGameOver = false;
    Array.from(fieldCells).forEach(fieldCell => {
      fieldCell.addEventListener('click', (event) => {
        const [cellI, cellJ] = fieldCell.id
          .replace('[', '')
          .replace(']', '')
          .split(',')
          .map(coord => parseInt(coord.trim(), 10));
        this.bombCoords.forEach(([i, j]) => {
          if (clicksCounter === 0) {
            if (i === cellI && j === cellJ) {
              clicksCounter = 0;
              this.generateBombs();
              this.generateCellsCover();
            } else {
              clicksCounter += 1;
            }
          } else {
            if (i === cellI && j === cellJ) {
              fieldCell.classList.add('field-bomb');
              gameOver.classList.add('game-over-overlay');
              isGameOver = true;
              fieldCells.forEach(cell => {
                cell.classList.add('open-cells');
              });
              const youLooseModal = document.createElement('p');
              youLooseModal.textContent = 'Game over';
              youLooseModal.classList.add('overlay-text');
              gameOver.appendChild(youLooseModal);
              mineField.appendChild(gameOver);
            }
          }
        });
        this.cellsArray[cellI][cellJ] = 'checked';
        // console.log(this.cellsArray);

        // check win
        if (this.checkCells(this.cellsArray)) {
          const youWinModal = document.createElement('p');
          youWinModal.textContent = 'You win';
          youWinModal.classList.add('overlay-text');
          gameOver.classList.add('win-overlay');
          gameOver.appendChild(youWinModal);
          mineField.appendChild(gameOver);
        }
        // add numbers colors
        this.generateCellsColor(event, fieldCell);
        fieldCell.classList.add('open-cells');
      });
    });
  }

  checkCells(cellsArray) {
    for (let i = 0; i < this.width; i += 1) {
      for (let j = 0; j < this.height; j += 1) {
        if (cellsArray[i][j] !== 'checked' && cellsArray[i][j] !== 'x') {
          return false;
        }
      }
    }
    return true;
  }

  generateCellsColor(event, fieldCell) {
    if (event.target.innerHTML === '1') {
      fieldCell.classList.add('field-one');
    } else if (event.target.innerHTML === '2') {
      fieldCell.classList.add('field-two');
    } else if (event.target.innerHTML === '3') {
      fieldCell.classList.add('field-three');
    } else if (event.target.innerHTML === '4') {
      fieldCell.classList.add('field-four');
    } else if (event.target.innerHTML === '5') {
      fieldCell.classList.add('field-five');
    } else if (event.target.innerHTML === ' ') {
      fieldCell.classList.add('field-empty');
    }
  }
}

const normalBoard = new NormalBoard(10, 10, 10);

// normalBoard.generateCellsCover();

normalBoard.generateCellsCover();
