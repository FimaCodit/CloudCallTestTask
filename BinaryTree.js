class Node {
  constructor(str, left = null, right = null) {
    this.str = str;
    this.left = left;
    this.right = right;
  }
}

class BinaryTree {
  constructor() {
    this.root = null;
  }
  insert(str) {
    const node = this.root;
    if (node === null) {
      this.root = new Node(str);
      return;
    } else {
      const searchTree = function(node) {
        if (str < node.str) {
          if (node.left === null) {
            node.left = new Node(str);
            return;
          } else if (node.left !== null) {
            return searchTree(node.left);
          }
        } else if (str > node.str) {
          if (node.right === null) {
            node.right = new Node(str);
            return;
          } else if (node.right !== null) {
            return searchTree(node.right);
          }
        } else if (str == node.str) {
          console.error(`This tree already contain ${str}`);
        } else {
          return null;
        }
      };
      return searchTree(node);
    }
  }

  remove(str) {
    const removeNode = function(node, str) {
      if (node == null) {
        return null;
      }
      if (str == node.str) {
        // node has no children

        if (node.left == null && node.right == null) {
          return null;
        }
        // node has no left child
        if (node.left == null) {
          return node.right;
        }
        // node has no right child
        if (node.right == null) {
          return node.left;
        }
        // node has two children
        var tempNode = node.right;
        while (tempNode.left !== null) {
          tempNode = tempNode.left;
        }
        node.str = tempNode.str;
        node.right = removeNode(node.right, tempNode.str);
        return node;
      } else if (str < node.str) {
        node.left = removeNode(node.left, str);
        return node;
      } else {
        node.right = removeNode(node.right, str);
        return node;
      }
    };
    this.root = removeNode(this.root, str);
  }

  toArray() {
    var result = [];
    var node = this.root;
    if (!node) return [];

    var traverse = function(node) {
      node.left && traverse(node.left);
      result.push(node.str);
      node.right && traverse(node.right);
    };

    traverse(node);

    return result;
  }
  height(node = this.root) {
    if (node == null) {
      return 0;
    }
    let left = this.height(node.left);
    let right = this.height(node.right);
    return Math.max(left, right) + 1;
  }
  exists(str) {
    let current = this.root;
    while (current) {
      if (str === current.str) {
        return true;
      }
      if (str < current.str) {
        current = current.left;
      } else {
        current = current.right;
      }
    }
    return false;
  }
}

let tree = new BinaryTree();

tree.insert("b");
tree.insert("a");
tree.insert("c");

console.log(tree.height()); // 2
console.log(tree.toArray()); // ['a','b','c']

tree.remove("b");
tree.insert("b");

console.log(tree.height()); // 3
console.log(tree.toArray()); // ['a','b','c']

tree.insert("z");

console.log(tree.height()); // 3
console.log(tree.toArray()); // ['a','b','c','z']

tree.insert("y");
tree.insert("x");

console.log(tree.height()); // 4
console.log(tree.toArray()); // ['a','b','c','x','y','z']

tree = new BinaryTree();

tree.insert("a");
tree.insert("b");
tree.insert("c");
tree.insert("d");
tree.insert("e");

console.log(tree.height()); // 5
console.log(tree.toArray()); // ['a','b','c','d','e']

tree.remove("b");
tree.remove("a");
tree.remove("c");
tree.remove("d");
tree.remove("e");

console.log(tree.height()); // 0
console.log(tree.toArray()); // []
