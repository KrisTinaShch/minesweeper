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

    const newGameButton = document.createElement('button');
    newGameButton.innerHTML = 'New Game';
    newGameButton.classList.add('new-game');

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
    container.appendChild(newGameButton);
    document.body.appendChild(container);
    this.startNewGame();
    this.generateCover();
  }

  generateCover() {
    let clicksCounter = 0;
    const mineField = document.querySelector('.mine-field');
    const gameOver = document.createElement('div');
    const fieldCells = document.querySelectorAll('.field-cell');
    gameOver.classList.add('game-over-overlay');

    mineField.addEventListener('click', (event) => {
      clicksCounter += 1;
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
    let flagCounter = 1;
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

          const isCellFlagged = flagArrayCoords.some(coord => coord[0] === cellI && coord[1] === cellJ);
          const flag = document.createElement('img');
          console.log(flagCounter);
          if (flagCounter <= this.bombCount && flagCounter >= 0) {
            if (!isCellFlagged) {
              flag.src = 'assets/imgs/icon_mine.png';
              flag.classList.add('flag-img');
              fieldCell.appendChild(flag);
              isFlagged = true;
              this.bombCoords.forEach(([i, j]) => {
                if (i === cellI && j === cellJ) {
                  flagArrayCoords.push([cellI, cellJ]); // Добавляем координату в массив
                }
              });
              flagCounter += 1;

              flag.addEventListener('contextmenu', event => {
                event.preventDefault();
                flagCounter -= 1;
                if (flag.parentNode === fieldCell) {
                  fieldCell.removeChild(flag);
                }
              });
            } else {
              if (flag.parentNode === fieldCell) {
                fieldCell.removeChild(flag);
              }
              isFlagged = false;
              flagArrayCoords = flagArrayCoords.filter(coord => coord[0] !== cellI || coord[1] !== cellJ); // Удаляем координату из массива
            }
          }
          const hasWon = this.checkVictory(flagArrayCoords, this.bombCoords);

          if (hasWon) {
            const mineField = document.querySelector('.mine-field');
            const gameOver = document.createElement('div');
            gameOver.innerHTML = '<p class="overlay-text">You win</p>';
            gameOver.classList.add('win-overlay');
            mineField.appendChild(gameOver);
          }
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

  startNewGame() {
    const buttonNewGame = document.querySelector('.new-game');
    buttonNewGame.addEventListener('click', () => {
      const container = document.querySelector('.container');
      container.parentNode.removeChild(container);
      this.generateCellsCover();
    });
  }
}

const normalBoard = new NormalBoard(10, 10, 10);
normalBoard.generateCellsCover();
