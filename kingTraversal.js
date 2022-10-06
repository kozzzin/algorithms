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
      // we has to add object, coordinates + data
    }
  }

  placeFigure(row,col) {
    const square = this.board[row][col] = {
      rank: '♘',
      file: ' ',
      color: ''
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
          acc.push([square.rank,square.file]);
          return acc;
        },
        []
      ).join(' ');
      console.log(printLine);
    });
  }
}



class Horse {
  constructor() {
    this.route = [];
  }

  static possibleMoves = [
    [-1,-2],
    [-2,-1],
    [1, 2],
    [2, 1],
    [1, -2],
    [2, -1],
    [-1,2],
    [-2,1]
  ];

  static boardSize = 8;

  static isLegalMove(square) {
    if (square[0] > this.boardSize - 1 || square[0] < 0) return false;
    if (square[1] > this.boardSize - 1 || square[1] < 0) return false;
    return true;
  }

  knightMoves(squareA, squareB) {

    // return array of moves
  }

  depth(node, current, depth = 0) {
    if (node == null || current.data == node.data) {
      return depth;
    }

    if (node.data < current.data) {
      depth = this.depth(node, current.left, depth + 1);
    } else if (node.data > current.data) {
      depth = this.depth(node, current.right, depth + 1)
    }

    return depth;
  }

  levelOrder(callback) {
    const queue = [];
    const result = []
    if (this.root == null) return;
    queue.push(this.root);
    while (queue.length > 0) {
      const current = queue.shift();
      if (!!callback) {
        callback(current);
      } else {
        result.push(current.data);
      }
      if (current.left != null) queue.push(current.left);
      if (current.right != null) queue.push(current.right);
    }
    if (result.length > 0) return result;
  }


  // use breadth-first
  // measure depth from squareA
  // each vertex could have two values: disctance to A, and link to predecessor or even all route to this point !


  board(board) {
    return new Board();
  }



  // findPath(squareA,squareB,queue,path,tries=0) {
  //   const board = this.board();
  //   const possibleMoves = this.getPossibleMoves(squareA,board);
  //   if (squareA.toString() == squareB.toString()) return path.push(squareB);
  //   if (possibleMoves.length === 0) return path;
  //   path.push(squareA);
  //   if (tries > 20) return path;
  //   possibleMoves.forEach(move => {
  //     const next =  this.findPath(move,squareB,queue,path,tries + 1);
  //     path = next.length > path.length ? 
  //       path : next;
  //   });
  //   return path;
  // }



  // create tree
  // and breadth width search


  // findPath(squareA, squareB, queue = [], result = []) {
    
  //   const board = new Board();
  //   board.create();

  //   if (squareA.toString() == squareB.toString()) return [squareA,squareB];

  //   squareB = board.getPositionInArray(...squareB);

  //   queue.push(...this.getPossibleMoves(squareA,board));
  //   let tries = 0;
    
  //   while ((queue.length > 0) && (tries < 20)) {
  //     console.log('QUEUE',queue);
  //     const coordinates = queue.shift();
  //     result.push(coordinates);
  //     if (coordinates.toString() == squareB.toString()) break;
  //     tries++;
  //   }
  //   console.log(result);
  // }

  findPathRec() {

  }

  static getPossibleMoves(currentPosition, board) {
    const start = [
      currentPosition[0],
      currentPosition[1]
    ];
    const moves = [];
    console.log('start',start);

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
    console.log('all legal moves', moves);
    return moves;
  }

  // queue = [], 

  // getPossibleMoves(currentPosition, board) {
  //   const start = board.placeFigure(
  //     ...board.getPositionInArray(...currentPosition)
  //   );
  //   const moves = [];
  //   console.log('start',start);
  //   board.print();

  //   this.possibleMoves.forEach(
  //     (move) => {
  //       const newMove = [
  //         start[0] + move[0],
  //         start[1] + move[1]
  //     ];  

  //       if (this.isLegalMove(newMove)) {
  //         console.log('legalMove', board.board[newMove[0]][newMove[1]]);
  //         moves.push(newMove);
  //         // board.placeFigure(...newMove);
  //       }



  //     }
  //   );
  //   return moves;
  // }

  move() {

  }
}


class PathFinder {
  constructor(start,end) {
    this.root = this.buildTree(start, start, end);
  }

  buildTree(current, start, end, depth = 0, path = [], limit = 3) {
    if (start.toString() == end.toString()) {
      console.log('FOOOOOOUUUUUUUNDDDD');
      return path.push(end);
    }

    if (depth === limit) {
      console.log('EXCEEEED');
      return path.push(end);
    }
    
    let legalMoves = Horse.getPossibleMoves(current);
    const previous = depth === 0 ? null : null;
    const distance = path.length;

    path.push(current);

    legalMoves = legalMoves.map(
      (move) => {
        return this.buildTree(
          move,
          start,
          end,
          depth + 1,
          path
        )
      }
    )

    const move = new Move(current, previous, distance);
    move.addMoves(legalMoves);
    console.log('returned move', move);
    return move;
  }

}

class Move {
  constructor(square, previous, distance) {
    this.square = square;
    this.previous = previous;
    this.distance = 0;
    this.moves = [];
    // add moves with distance or without
  }

  addMoves(moves) {
    this.moves.push(...moves);
  }

}

const board = new Board();
board.create();
const horse = new Horse();
// console.log(horse.getPossibleMoves([3,3]));
// board.print();

// horse.findPath([3,3],[,4]);

Horse.getPossibleMoves([0,7]);


const movestree = new PathFinder(
  [3,3],
  [1,4], 
)

console.log(
  movestree.root.moves
);
// use breadth-first search
// if depth is bigger than current, return
// and try another
// the path with smaller depth wins

// our posible moves could be branches of a tree
// using numbers of squares as reason to branch
// or use possible moves for reasoning

// use a distance as measure what next sqaure to choose