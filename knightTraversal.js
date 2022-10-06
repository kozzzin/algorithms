class Board {
  constructor() {
    this.board = [];
  }

  create() {
    for (let h = 7; h >= 0; h--) {
      let line = [];
      for (let v = 0; v <= 7; v++) {
        let square;
        if (h % 2 !== 0) {
          if (v % 2 === 0) {
            square = '□';
          } else {
            square = '■';
          }
        } else {
          if (v % 2 === 0) {
            square = '■';
          } else {
            square = '□';
          }        
        }
        line.push({
          rank: h,
          file: v,
          color: square
        });
      }
      this.board.push(line);
    }
  }

  placeFigure(row,col) {
    const square = this.board[row][col] = {
      rank: '',
      file: ' ',
      color: '♘'
    }

    return [row, col];
  }

  getPositionInArray(rank,file) {
    const coordinates = [Math.abs(rank - 7), file];
    return coordinates;
  }


  print() {
    this.board.forEach(line => {
      const printLine = line.reduce(
        (acc, square) => {
          // acc.push([square.rank,square.file]);
          acc.push([square.color]);
          return acc;
        },
        []
      ).join(' | ');
      const liner = printLine
        .split('')
        .map(el => '-')
        .join('');
      console.log(printLine);
      console.log(liner);
    });
  }
}

class PathFinder {
  constructor(start,end) {
    this.possibleMoves = [
      [-1,-2],
      [-2,-1],
      [1, 2],
      [2, 1],
      [1, -2],
      [2, -1],
      [-1,2],
      [-2,1]
    ];
    this.boardSize = 8;
    this.path = this.find(start,end);
  }

  isLegalMove(square) {
    if (square[0] > this.boardSize - 1 || square[0] < 0) return false;
    if (square[1] > this.boardSize - 1 || square[1] < 0) return false;
    return true;
  }
  
  getPossibleMoves(currentPosition) {
    const start = [
      currentPosition[0],
      currentPosition[1]
    ];
    const moves = [];
    this.possibleMoves.forEach(
      (move) => {
        const newMove = [
          start[0] + move[0],
          start[1] + move[1]
        ];  
  
        if (this.isLegalMove(newMove)) {
          moves.push(newMove);
        }
      }
    );
    return moves;
  }
  
  find(start, end) {
    if (start.toString() == end.toString()) return [start, end];

    start = new Move(null, start, 0);

    const queue = [...this.getPossibleMoves(start.data)]
      .map((el) => new Move(start, el, 0));

    const depth = 0;

    while (queue.length > 0) {
      const current = queue.shift();

      if (end.toString() === current.data.toString()) {
        return this.getPath(current);
      }

      const possibleMoves = this.getPossibleMoves(current.data)
        .map((el) => new Move(current, el, 0));

      while (possibleMoves.length > 0) {
        const currentMove = possibleMoves.shift();
        if (end.toString() === currentMove.data.toString()) {
          return this.getPath(currentMove);
        }

        queue.push(
          ...this.getPossibleMoves(currentMove.data)
            .map(
              (el) => new Move(currentMove, el, 0)
            )
        )
      }
    }
  }

  getPath(current) {
    const path = [];
    while (current.previous != null) {
      path.push(current.data);
      current = current.previous;
    }
    path.push(current.data);
    return path.reverse();
  }

}

class Move {
  constructor(previous, data, distance) {
    this.data = data;
    this.previous = previous;
    this.distance = distance;
  }
}

const path = new PathFinder([0,0],[7,0]);


// visual demostration for console
let moves = -1;
const demo = setInterval(
  () => {
    moves++;
    try {
      if (path.path[moves] === undefined) {
        throw 'FIN';
      }
      const board = new Board();
      board.create();
      board.placeFigure(...path.path[moves]);
      board.print();
      console.log(path.path);
    } catch(err) {
      console.log(err);
      clearInterval(demo);
    }
    
  },
  1000
)