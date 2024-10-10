class GameModel {
    constructor() {
      this.grid = this.initializeGrid();
      this.placeShips(this.grid);
      this.ships = {
        B: { size: 5, hits: 0, name: 'Battleship' },
        D: { size: 4, hits: 0, name: 'Destroyer' }
      };
    }

    initializeGrid() {
      return Array(10).fill().map(() => Array(10).fill(0));
    }

    placeShips(grid) {
      this.placeShip(grid, 5, 'B'); // Battleship
      this.placeShip(grid, 4, 'D'); // Destroyer 1
      this.placeShip(grid, 4, 'D'); // Destroyer 2
    }

    placeShip(grid, size, type) {
      let placed = false;
      while (!placed) {
        const row = Math.floor(Math.random() * 10);
        const col = Math.floor(Math.random() * 10);
        const direction = Math.random() > 0.5 ? 'H' : 'V';
  
        if (this.canPlaceShip(grid, row, col, size, direction)) {
          for (let i = 0; i < size; i++) {
            if (direction === 'H') grid[row][col + i] = type;
            else grid[row + i][col] = type;
          }
          placed = true;
        }
      }
    }

    canPlaceShip(grid, row, col, size, direction) {
      if (direction === 'H' && col + size > 10) return false;
      if (direction === 'V' && row + size > 10) return false;
  
      for (let i = 0; i < size; i++) {
        if (direction === 'H' && grid[row][col + i] !== 0) return false;
        if (direction === 'V' && grid[row + i][col] !== 0) return false;
      }
      return true;
    }

    processShot(target) {
      const colLetter = target[0].toUpperCase();
      const row = parseInt(target.slice(1), 10) - 1;
      const col = colLetter.charCodeAt(0) - 65;

      if (row < 0 || row >= 10 || col < 0 || col >= 10) {
        return { error: 'Invalid target' };
      }
  
      const hit = this.grid[row][col];
      if (hit === 0) {
        return { result: 'miss', row, col };
      } else if (hit === 'X') {
        return { result: 'already_hit', row, col };
      } else {
        this.grid[row][col] = 'X'; 
        this.ships[hit].hits += 1;
  
        const isSunk = this.checkIfSunk(hit);
        if (isSunk) {
          return { result: 'hit', sunk: true, ship: this.ships[hit].name, row, col };
        } else {
          return { result: 'hit', sunk: false, ship: this.ships[hit].name, row, col };
        }
      }
    }

    checkIfSunk(shipType) {
      return this.ships[shipType].hits === this.ships[shipType].size;
    }

    getGrid() {
      return this.grid;
    }
  }
  
  module.exports = GameModel;
  