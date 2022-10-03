class Node {
  constructor(data, left, right) {
    this.data = data;
    this.left = left;
    this.right = right;
  }
}

class Tree {
  constructor(arr) {
    this.root = this.buildTree(arr);
  }

  buildTree(arr) {
    const sortedArray = Array.from(new Set(arr))
      .sort((a,b) => a - b);
    console.log(sortedArray);
    // if (sortedArray.length == 0) return null;
    const mid = Math.floor(sortedArray.length/2);
    if (mid === 0) {
      if (sortedArray.length === 0) return null;
      const value = sortedArray[mid] === undefined ? null : sortedArray[mid];
      return new Node(value,null,null);
    }
    const left = this.buildTree(sortedArray.slice(0, mid));
    const right = this.buildTree(sortedArray.slice(mid+1, sortedArray.length));
    console.log(left, mid, right);
    return new Node(sortedArray[mid],left,right);
  }

  insert(value) {
    let current = this.root;
    if (current.data === value || current === undefined) {
      return current
    }

    while(!(current.right === null && current.left === null)) {
      console.log('i work');
      if (value < current.data) {
        console.log('left--<',current.left);
        if (current.left === null) {
          ('NULL!!!!');
          current.left = new Node(value, null, null);
          return;
        }
        current = current.left;
      }

      if (value > current.data) {
        console.log('right-->',current.right);
        if (current.right === null) {
          current.right = new Node(value, null, null);
          return;
        }
        current = current.right;
      } 

      if (current.data === value) return;

    }

    
    if (value < current.data) current.left = new Node(value, null, null);;
    if (value > current.data) current.right = new Node(value, null, null);


  }

  delete(value) {
    let current = this.root;
    // deleting routine
    if (current.data === value) {

      return;
    }

    while (current.left !== null && current.right !== null) {
      console.log('current-->',current);
      if (current.data === value) {

      }

      if (value < current.data) {
        console.log('<--left',current.left);
        current = current.left;
      }

      if (value > current.data) {
        console.log('right-->',current.right);
        current = current.right;
      } 
    }
    // delete leaf node
    // delete node with one branch
    // delete node with two branches
    //
  }

}

const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(testArray);
console.log(tree.root);


const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}


tree.insert(2);
tree.insert(4);
tree.insert(6);
tree.insert(10);
tree.insert(1000);
tree.insert(6343);


// tree.delete(2);


prettyPrint(tree.root)                                                                   