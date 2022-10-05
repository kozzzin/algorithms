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
  }

  levelOrderRec(callback, queue = [this.root], result = []) {
    const current = queue.shift();
    if (current == null) return;

    if (!!callback) {
      callback(current);
    } else {
      result.push(current.data);
    }

    if (current.left != null) queue.push(current.left);
    if (current.right != null) queue.push(current.right);

    this.levelOrderRec(callback, queue, result);

    if (result.length > 0) return result;
  }

  traversal() {
    return this.inorder();
  }

  preorder(callback, current = this.root, out = []) {
    // root left right
    if (current == null) return;
    if (!!callback) {
      callback(current);
    } else {
      out.push(current.data);
    }
    this.preorder(callback,current.left,out);
    this.preorder(callback,current.right,out);
    if (out.length > 0) return out;
  }

  inorder(callback, current = this.root, out = []) {
    // left root right
    if (current == null) return;

    this.inorder(callback, current.left, out);

    if (!!callback) {
      callback(current);
    } else {
      out.push(current.data);
    }
    
    this.inorder(callback, current.right, out);
    
    if (out.length > 0) return out;
  }

  postorder(callback, current = this.root, out = []) {
    // left right root
    if (current == null) return;
    this.postorder(callback, current.left, out);
    this.postorder(callback, current.right, out);
    if (!!callback) {
      callback(current);
    } else {
      out.push(current.data);
    }
    if (out.length > 0) return out;
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

  isBalanced(current = this.root) {
    if (current == null) return true;
    
    const difference = Math.abs(
      this.height(current.left) - this.height(current.right)
    );
    
    return (
      difference <= 1 &&
      this.isBalanced(current.left) &&
      this.isBalanced(current.right)
    );
  }


}


const prettyPrint = (node, prefix = '', isLeft = true) => {
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
  }
  console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
  }
}

function printData(el) {
  console.log(el.data);
}


// Create a binary search tree from an array of random numbers.
const testArray = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const tree = new Tree(testArray);

// Confirm that the tree is balanced by calling isBalanced
console.log('is balanced', tree.isBalanced());

// Print out all elements in level, pre, post, and in order
console.log('elements in level',tree.levelOrder(printData));
console.log('preorder',tree.preorder(printData));
console.log('inorder',tree.inorder(printData));
console.log('postorder',tree.postorder(printData));

prettyPrint(tree.root);

// Unbalance the tree by adding several numbers > 100
tree.insertRec(1000);
tree.insertRec(900);
tree.insertRec(6343);

// Confirm that the tree is unbalanced by calling isBalanced
console.log('is balanced', tree.isBalanced());

prettyPrint(tree.root);

// Balance the tree by calling rebalance
tree.rebalance();

// Confirm that the tree is balanced by calling isBalanced
console.log('is balanced', tree.isBalanced());

// Print out all elements in level, pre, post, and in order
console.log('elements in level',tree.levelOrder(printData));
console.log('preorder',tree.preorder(printData));
console.log('inorder',tree.inorder(printData));
console.log('postorder',tree.postorder(printData));

prettyPrint(tree.root);

