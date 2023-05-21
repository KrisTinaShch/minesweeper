class NormalBoard {
  constructor(width, height, bombCount) {
    this.width = width;
    this.height = height;
    this.bombCount = bombCount;
    this.bombCoords = [];
    this.cellsArray = [];
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

    this.bombCoords = bombs;
    console.log(bombs);
    return bombs;
  }

  updateCellsArray() {
    const cells = [];

    this.bombCoords = this.generateBombs();

    for (let i = 0; i < this.width; i += 1) {
      const row = [];
      for (let j = 0; j < this.height; j += 1) {
        const isBomb = this.bombCoords.some(([row, col]) => i === row && j === col);
        row.push(isBomb ? 'x' : ' ');
      }
      cells.push(row);
    }

    this.bombCoords.forEach(([i, j]) => {
      for (let k = i - 1; k < i + 2; k += 1) {
        for (let l = j - 1; l < j + 2; l += 1) {
          if (
            k >= 0 &&
            l >= 0 &&
            k < 10 &&
            cells[k][l] !== 'x' &&
            k < cells.length &&
            l < cells[k].length
          ) {
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

    cells.forEach((row, i) => {
      const fieldRow = document.createElement('div');
      fieldRow.classList.add('field-row');

      row.forEach((cell, j) => {
        const fieldCell = document.createElement('div');
        fieldCell.classList.add('field-cell');
        fieldCell.id = `[${i}, ${j}]`;
        fieldCell.innerHTML = cell;
        fieldRow.appendChild(fieldCell);
      });

      mineField.appendChild(fieldRow);
    });

    container.appendChild(mineField);
    document.body.appendChild(container);

    this.generateCover();
  }

  generateCover() {
    let clicksCounter = 0;
    const mineField = document.querySelector('.mine-field');
    const gameOver = document.createElement('div');
    const fieldCells = document.querySelectorAll('.field-cell');
    gameOver.classList.add('game-over-overlay');

    mineField.addEventListener('click', (event) => {
      const target = event.target;
      if (target.classList.contains('field-cell')) {
        const [cellI, cellJ] = target.id
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
              target.classList.add('field-bomb');
              gameOver.innerHTML = '<p class="overlay-text">Game over</p>';
              mineField.querySelectorAll('.field-cell').forEach(cell => {
                cell.classList.add('open-cells');
              });
              mineField.appendChild(gameOver);
            }
          }
        });

        this.cellsArray[cellI][cellJ] = 'checked';

        if (this.checkCells(this.cellsArray)) {
          gameOver.innerHTML = '<p class="overlay-text">You win</p>';
          gameOver.classList.add('win-overlay');
          mineField.appendChild(gameOver);
        }

        console.log(this.cellsArray);
        this.generateCellsColor(target);
        target.classList.add('open-cells');
      }
    });

    this.makeFlagOnCell(fieldCells);
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

  makeFlagOnCell(fieldCells, isFlagged = false) {
    let flagArrayCoords = [];

    fieldCells.forEach(fieldCell => {
      fieldCell.addEventListener('contextmenu', event => {
        event.preventDefault();
        const target = event.target;

        if (target.classList.contains('field-cell')) {
          const [cellI, cellJ] = target.id
            .replace('[', '')
            .replace(']', '')
            .split(',')
            .map(coord => parseInt(coord.trim(), 10));

          this.bombCoords.forEach(([i, j]) => {
            if (i === cellI && j === cellJ) {
              const flagIndex = flagArrayCoords.findIndex(coord => coord[0] === i && coord[1] === j);
              if (!fieldCell.querySelector('.flag-img')) {
                if (flagIndex === -1) {
                  console.log('ok');
                  flagArrayCoords.push([i, j]);
                  console.log(flagArrayCoords);
                }
              } else {
                if (flagIndex !== -1) {
                  flagArrayCoords.splice(flagIndex, 1);
                  console.log(flagArrayCoords);
                }
              }
            }
          });
        }

        if (!fieldCell.querySelector('.flag-img')) {
          const flag = document.createElement('img');
          flag.src = 'assets/imgs/icon_mine.png';
          flag.classList.add('flag-img');
          fieldCell.appendChild(flag);
          isFlagged = true;
        } else {
          const flag = fieldCell.querySelector('.flag-img');
          fieldCell.removeChild(flag);
          isFlagged = false;
        }

        // Проверка на победу
        const hasWon = this.checkVictory(flagArrayCoords, this.bombCoords);
        if (hasWon) {
          console.log('Поздравляем! Вы выиграли!');
        }
      });
    });

    return isFlagged;
  }

  checkVictory(flagArrayCoords, bombCoords) {
    if (flagArrayCoords.length !== bombCoords.length) {
      return false;
    }
    return flagArrayCoords.every(coord => bombCoords.some(([i, j]) => i === coord[0] && j === coord[1]));
  }


  generateCellsColor(target) {
    const cellValue = target.innerHTML;
    switch (cellValue) {
      case '1':
        target.classList.add('field-one');
        break;
      case '2':
        target.classList.add('field-two');
        break;
      case '3':
        target.classList.add('field-three');
        break;
      case '4':
        target.classList.add('field-four');
        break;
      case '5':
        target.classList.add('field-five');
        break;
      case ' ':
        target.classList.add('field-empty');
        break;
      default:
        break;
    }
  }
}

const normalBoard = new NormalBoard(10, 10, 10);
normalBoard.generateCellsCover();