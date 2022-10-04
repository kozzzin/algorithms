// class Deleter {
  //   constructor(root) {
  //     this.root = root;
  //   }
  
  //   deleteSearch(value, iteration = 0, current = this.root) {
  //     console.log('iteration',iteration);
  //     let next;
  //     if (current === undefined || current === null) {
  //       return null;
  //     }
  
  //     if (current.data === value) { 
  //       current.data = this.deleteThis(null, current, value).data;
  //       return;
  //     }
  
  //     if (current.data < value) {
  //       next = current.right;
  //       if (this.nextValue(next,value)) {
  //         current.right = this.deleteThis(current,next,value);
  //         return;
  //       }
  //     }
  
  //     if (current.data > value) {
  //       next = current.left;
  //       if (this.nextValue(next,value)) {
  //         current.left = this.deleteThis(current,next,value);
  //         return;
  //       }
  //     }
  
  //     if (current.left === null && current.right === null) {
  //       return;
  //     }
  
  //     this.deleteSearch(value, iteration + 1, next);
  //   }
  
  //   deleteThis(parent, toDelete, value) {
  //     const deleteFunc = this.selectDeleteFunc(toDelete);
  //     return deleteFunc.call(this,parent,toDelete,value);
  //   }
  
  //   nextValue(next, value) {
  //     if (next.data === value) {
  //       return true;
  //     }
  //     return false;
  //   }
  
  //   selectDeleteFunc(node) {
  //     if (node.left === null && node.right === null) {
  //       return this.deleteLeaf;
  //     }
  
  //     if (node.left === null || node.right === null) {
  //       return this.deleteOneChild;
  //     }
  
  //     if (node === null || node === undefined) {
  //       return false;
  //     }
  
  //     return this.deleteTwoChildren;
  //   }
  
  //   deleteLeaf(parent, toDelete, value) {
  //     return null;
  //   }
  
  //   deleteOneChild(parent, toDelete, value) {
  //     return toDelete.left || toDelete.right;
  //   }
  
  //   deleteTwoChildren(parent, toDelete, value) {
  //     const nextBiggest = this.findNextBiggest(
  //       toDelete.right,
  //       toDelete.data,
  //       toDelete.right.data
  //     );
  
  //     const tempData = nextBiggest.data;
  
  //     this.deleteSearch(nextBiggest.data);
  
  //     toDelete.data = tempData;
  
  //     return toDelete;
  //   }
  
  //   findNextBiggest(node, min, max) {
  //     let current = node;
  //     if ((node.data > min) && (node.data) <= max) {
  //       if (node.left === null) return current;
  //       current = this.findNextBiggest(node.left,min,max);
  //     }
  //     return current;
  //   }
  
  // }

class Node {
  constructor(data, left = null, right = null) {
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
      if (sortedArray.length === 0) return null;
    const mid = Math.floor(sortedArray.length/2);
    const left = this.buildTree(sortedArray.slice(0, mid));
    const right = this.buildTree(sortedArray.slice(mid+1, sortedArray.length));
    return new Node(sortedArray[mid],left,right);
  }
   

  insertRec(value, current=this.root) {
    if (current == null) {
      current = new Node(value);
      return current;
    }

    if (value < current.data) {
        current.left = this.insertRec(value, current.left);
    }

    if (value > current.data) {
        current.right = this.insertRec(value, current.right);
    }

    return current;
  }


  delete(value, current=this.root) {
    if (current == null) {
      return current;
    }

    if (value < current.data) {
      current.left = this.delete(value,current.left);
    } else if (value > current.data) {
      current.right = this.delete(value,current.right);
    } else {
      if (current.left == null) return current.right;
      if (current.right == null) return current.left;
      current.data = this.findNextBiggest(current.right);
      current.right = this.delete(current.data,current.right);
    }

    return current;
  }

  findNextBiggest(current) {
    if (current.left == null) {
      return current.data;
    }
    return this.findNextBiggest(current.left);
  }

  find(value, current=this.root) {
    if (current == null || current.data == value) {
      return current;
    }

    if (value < current.data) {
      current = this.find(value,current.left)
    } else if (value > current.data) {
      current = this.find(value,current.right)
    }
    return current;
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
    // try recursion implementation
  }

  traversal() {
    return this.inorder();
  }


  ///// !!!! ADD CALLBACK OR RETURN ARRAY

  preorder(callback, current = this.root) {
    // root left right
    if (current == null) return;
    console.log('in-depth',current,current.left,current.right);
    this.preorder(null,current.left);
    this.preorder(null,current.right);
  }

  inorder(callback, current = this.root) {
    // left root right
    const out = [];
    if (current == null) return;

    const left = this.inorder(null,current.left);

    if (!!callback) {
      callback(current);
    } else {
      console.log(current)
    }
    const right = this.inorder(null,current.right);

    if (left !== undefined) out.push(...left);
    out.push(current.data);
    if (right !== undefined) out.push(...right);
    
    return out;
  }

  postorder(callback, current = this.root) {
    // left right root
    if (current == null) return;
    this.postorder(null,current.left);
    this.postorder(null,current.right);
    console.log('in-depth',current,current.left,current.right);
  }

  height(node, height = 0) {
    if (node == null) {
      return node;
    }
    if (node.left === null && node.right === null) {
      return height;
    }
    const left = this.height(node.left, height + 1);
    const right = this.height(node.right, height + 1);
    return Math.max(left,right);
  }

  depth(node, current = this.root, depth = 0) {
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

  rebalance() {
    const currentArray = tree.traversal();
    this.root = this.buildTree(currentArray);
    return this.root;
  }




}

// 

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
tree.insertRec(0);
tree.insertRec(10);

tree.insertRec(1000);
tree.insertRec(900);
tree.insertRec(6343);
tree.insertRec(8);
tree.insertRec(11);


tree.delete(67);

console.log(tree.find(23));

// const deleter = new Deleter(tree.root);
// console.log('search',deleter.deleteSearch(6345));


console.log('traversal',tree.levelOrder());
console.log('traversal',tree.levelOrder(console.log));
// console.log(tree.levelOrder());

tree.postorder();
// tree.preorder();



const heightNode = tree.find(11);
console.log(heightNode);
console.log(tree.height(heightNode));
console.log('DEPTH...',tree.depth(heightNode));

prettyPrint(tree.root) 

tree.rebalance();
prettyPrint(tree.root) 