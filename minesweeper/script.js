class NormalBoard {
  constructor(width, height, bombCount) {
    this.width = width;
    this.height = height;
    this.bombCount = bombCount;
    this.bombCoords = [];
    this.cellsArray = [];
    this.audioEnabled = true;
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

    const audioButton = document.createElement('img');
    audioButton.src = 'assets/imgs/audio-on.png';
    audioButton.classList.add('audio-button');

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

    const fieldTrackers = document.createElement('div');
    fieldTrackers.classList.add('trackers');

    const totalTimeTracker = document.createElement('p');
    totalTimeTracker.classList.add('time-tracker');

    const totalClicksTracker = document.createElement('p');
    totalClicksTracker.classList.add('clicks-tracker');

    // totalTimeTracker.textContent = 'Time : ';
    // totalClicksTracker.textContent = 'Clicks : ';
    fieldTrackers.appendChild(totalTimeTracker);
    fieldTrackers.appendChild(totalClicksTracker);

    container.appendChild(audioButton);
    container.appendChild(mineField);
    container.appendChild(newGameButton);
    container.appendChild(fieldTrackers);
    document.body.appendChild(container);
    this.startTimer();
    this.startNewGame();
    this.generateCover();
  }

  generateCover() {
    let clicksCounter = 0;
    const mineField = document.querySelector('.mine-field');
    const gameOver = document.createElement('div');
    const fieldCells = document.querySelectorAll('.field-cell');
    let isBomb = false;

    const clicksTracker = document.querySelector('.time-tracker');

    clicksTracker.textContent = `Clicks : ${clicksCounter} `;

    gameOver.classList.add('game-over-overlay');
    mineField.addEventListener('click', (event) => {
      const switcher = this.audioEnabled;
      if (switcher) {
        this.switchAudio(isBomb);
      }
      clicksCounter += 1;
      clicksTracker.textContent = `Clicks : ${clicksCounter} `;
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
              const switcher = this.audioEnabled;
              isBomb = true;
              if (switcher) {
                this.switchAudio(isBomb);
              }
              target.classList.add('field-bomb');
              gameOver.innerHTML = '<p class="overlay-text">Game over</p>';
              mineField.querySelectorAll('.field-cell').forEach(cell => {
                cell.classList.add('open-cells');
              });
              mineField.appendChild(gameOver);
            }
          }
        });

        if (this.cellsArray[cellI][cellJ] === ' ') {
          this.openAdjacentSquares(cellI, cellJ);
        } else {
          this.cellsArray[cellI][cellJ] = 'checked';
        }

        if (this.checkCells(this.cellsArray)) {
          const isVictory = true;
          if (switcher) {
            this.switchAudio(isBomb, isVictory);
          }
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

  openAdjacentSquares(row, col) {
    if (
      row < 0 ||
      col < 0 ||
      row >= this.width ||
      col >= this.height ||
      this.cellsArray[row][col] !== ' '
    ) {
      return;
    }

    const targetCell = document.getElementById(`[${row}, ${col}]`);
    this.cellsArray[row][col] = 'checked';
    this.generateCellsColor(targetCell);
    targetCell.classList.add('open-cells');

    // Recursively open adjacent squares in all directions
    this.openAdjacentSquares(row - 1, col); // Up
    this.openAdjacentSquares(row + 1, col); // Down
    this.openAdjacentSquares(row, col - 1); // Left
    this.openAdjacentSquares(row, col + 1); // Right
  }

  startTimer() {
    const totalClicksTracker = document.querySelector('.trackers');

    const timerDisplay = document.createElement('p');
    timerDisplay.classList.add('time-tracker');

    totalClicksTracker.appendChild(timerDisplay);

    let elapsedTime = 0;
    this.timerInterval = setInterval(() => {
      elapsedTime += 1;
      timerDisplay.textContent = `Time: ${elapsedTime}s`;
    }, 1000);
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
                  flagArrayCoords.push([cellI, cellJ]);
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
              flagArrayCoords = flagArrayCoords.filter(coord => coord[0] !== cellI || coord[1] !== cellJ);
            }
          }
          const hasWon = this.checkVictory(flagArrayCoords, this.bombCoords);

          if (hasWon) {
            const mineField = document.querySelector('.mine-field');
            const gameOver = document.createElement('div');
            gameOver.innerHTML = '<p class="overlay-text">You win</p>';
            gameOver.classList.add('win-overlay');
            const isVictory = true;
            const switcher = this.audioEnabled;
            const isBomb = false;
            if (switcher) {
              this.switchAudio(isBomb, isVictory);
            }
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

  switchAudio(isBomb = false, isVictory = false) {
    if (isBomb && this.audioEnabled) {
      const bombSound = new Audio('assets/audio/gameover.mp3');
      bombSound.play();
    } else if (isVictory && this.audioEnabled) {
      const clickSound = new Audio('assets/audio/win.mp3');
      clickSound.play();
    } else if (this.audioEnabled) {
      const clickSound = new Audio('assets/audio/click.mp3');
      clickSound.play();
    }
  }

  checkOnAudio() {
    const audioButton = document.querySelector('.audio-button');
    audioButton.addEventListener('click', (event) => {
      if (event.target === audioButton) {
        this.audioEnabled = !this.audioEnabled;
        if (this.audioEnabled) {
          audioButton.src = 'assets/imgs/audio-on.png';
        } else {
          audioButton.src = 'assets/imgs/audio-off.png';
        }
      }
    });
  }
}

const normalBoard = new NormalBoard(10, 10, 10);
normalBoard.generateCellsCover();
normalBoard.checkOnAudio();
