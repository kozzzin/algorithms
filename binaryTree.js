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
    const mid = Math.floor(sortedArray.length/2);
    if (mid === 0) {
      if (sortedArray.length === 0) return null;
      const value = sortedArray[mid] === undefined ? null : sortedArray[mid];
      return new Node(value,null,null);
    }
    const left = this.buildTree(sortedArray.slice(0, mid));
    const right = this.buildTree(sortedArray.slice(mid+1, sortedArray.length));
    return new Node(sortedArray[mid],left,right);
  }
   

  insertRec(value, current=this.root) {
    if (current.data === value || current === undefined) {
      return current
    }

    if ((value < current.data) &&
        (current.left !== null)) {
        current = this.insertRec(value, current.left);
    }

    if ((value > current.data) &&
        (current.right !== null)) {
        current = this.insertRec(value, current.right);
    }

    if (current.right === null || current.left === null) {
      if (value < current.data) current.left = new Node(value, null, null);
      if (value > current.data) current.right = new Node(value, null, null);
      return current;
    }
  }

  // insert(value) {
  //   let current = this.root;
  //   if (current.data === value || current === undefined) {
  //     return current
  //   }

  //   while(!(current.right === null && current.left === null)) {
  //     if (value < current.data) {
  //       if (current.left === null) {
  //         current.left = new Node(value, null, null);
  //         return;
  //       }
  //       current = current.left;
  //     }

  //     if (value > current.data) {
  //       if (current.right === null) {
  //         current.right = new Node(value, null, null);
  //         return;
  //       }
  //       current = current.right;
  //     } 

  //     if (current.data === value) return;

  //   }

  //   if (value < current.data) current.left = new Node(value, null, null);;
  //   if (value > current.data) current.right = new Node(value, null, null);
  // }

}

class Deleter {
  constructor(root) {
    this.root = root;
  }

  deleteSearch(value, iteration = 0, current = this.root) {
    console.log('iteration',iteration);
    let next;
    if (current === undefined || current === null) {
      return null;
    }

    if (current.data === value) { 
      current.data = this.deleteThis(null, current, value).data;
      return;
    }

    if (current.data < value) {
      next = current.right;
      if (this.nextValue(next,value)) {
        current.right = this.deleteThis(current,next,value);
        return;
      }
    }

    if (current.data > value) {
      next = current.left;
      if (this.nextValue(next,value)) {
        current.left = this.deleteThis(current,next,value);
        return;
      }
    }

    if (current.left === null && current.right === null) {
      return;
    }

    this.deleteSearch(value, iteration + 1, next);
  }

  deleteThis(parent, toDelete, value) {
    const deleteFunc = this.selectDeleteFunc(toDelete);
    return deleteFunc.call(this,parent,toDelete,value);
  }

  nextValue(next, value) {
    if (next.data === value) {
      return true;
    }
    return false;
  }

  selectDeleteFunc(node) {
    if (node.left === null && node.right === null) {
      return this.deleteLeaf;
    }

    if (node.left === null || node.right === null) {
      return this.deleteOneChild;
    }

    if (node === null || node === undefined) {
      return false;
    }

    return this.deleteTwoChildren;
  }

  deleteLeaf(parent, toDelete, value) {
    return null;
  }

  deleteOneChild(parent, toDelete, value) {
    return toDelete.left || toDelete.right;
  }

  deleteTwoChildren(parent, toDelete, value) {
    const nextBiggest = this.findNextBiggest(
      toDelete.right,
      toDelete.data,
      toDelete.right.data
    );

    const tempData = nextBiggest.data;

    this.deleteSearch(nextBiggest.data);

    toDelete.data = tempData;

    return toDelete;
  }

  findNextBiggest(node, min, max) {
    let current = node;
    if ((node.data > min) && (node.data) <= max) {
      if (node.left === null) return current;
      current = this.findNextBiggest(node.left,min,max);
    }
    return current;
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


tree.insertRec(2);
tree.insertRec(4);
tree.insertRec(6);
tree.insertRec(10);
tree.insertRec(1000);
tree.insertRec(6343);


// tree.delete(2);



const deleter = new Deleter(tree.root);
console.log('search',deleter.deleteSearch(6345));

                                                           

prettyPrint(tree.root) 