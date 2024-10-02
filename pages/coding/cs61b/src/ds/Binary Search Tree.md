Binary Search Tree
===
## Introduction
We want to enable binary search in a linked list -> flip the pointer

## Definition
- **Tree**: Trees are composed of nodes and edges that connect those nodes.
	- There is **only one path** between any two nodes.
	- In some trees, we select a **root** node which is a node that has no parents - Rooted Tree.
	- A tree also has **leaves**, which are nodes with no children.
- **Binary Trees**
	- Each node has either 0, 1, or 2 children.
- **Binary Search Trees**
	- For every node X in tree:
		- Every key in the left subtree is less than X’s key.
		- Every key in the right subtree is greater than X’s key.
```
    6
  3   8
 1 4 7 9
```

```java
public class BST<T extends Comparable<T>> {
  T node;
  BST<T> left;
  BST<T> right;

  public BST(T node, BST<T> left, BST<T> right) {
    this.node = node;
    this.left = left;
    this.right = right;
  }

  public BST(T node) {
    this.node = node;
  }
}
```

## Operations
### Search
To search for something, we employ binary search, which is made easy due to the BST property.
```java
public static <T extends Comparable<T>> BST<T> search(BST<T> tree, T key) {
  if (tree == null) {
    return null;
  }
  if (key.equals(tree.node)) {
    return tree;
  } else if (key.compareTo(tree.node) > 0) {
    return search(tree.right, key);
  } else {
    return search(tree.left, key);
  }
}
```

If our tree is relatively "bushy", the find operation will run in $\log ⁡n$ time because the height of the tree is $\log⁡ n$.

### Insert
We **always** insert at a leaf node!
- Search for key.
	- If found, do nothing.
	- If not found:
		- Create new node
		- Set appropriate link (left less than, right greater than)
```java
public static <T extends Comparable<T>> BST<T> insert(BST<T> tree, T key) {
  if (tree == null) {
    return new BST<>(key);
  } else if (key.compareTo(tree.node) > 0) {
    tree.right = insert(tree.right, key);
  } else {
    tree.left = insert(tree.left, key);
  }
  // We need return value because we need recursion
  return tree;
}
```

### Delete
- No children: Leaf, delete its parent pointer
- One child: Child maintain BST property, reassign parent's pointer to the node's child
- Two children: see follows

#### Hibbard Deletion
We choose a new node to replace the deleted one.
The new node must:
- be > than everything in left subtree. (rightmost node)
- be < than everything right subtree. (leftmost node)

Procedure:
1. Take the left-most node in the right tree, or the right-most node in the left tree
2. Replace the node to be deleted with the node abve
3. Delete the old node in 1

```java
public static <T extends Comparable<T>> BST<T> delete(BST<T> tree, T key) {
  // Base case: leaf
  if (tree == null) {
    return tree;
  }

  if (key.compareTo(tree.node) > 0) {
    tree.right = delete(tree.right, key);
  } else if (key.compareTo(tree.node) < 0) {
    tree.left = delete(tree.left, key);
  } else {

    if (tree.left == null) {
      return tree.right;
    } else if (tree.right == null) {
      return tree.left;
    }

    tree.node = minVal(tree.right);
    tree.right = delete(tree.right, tree.node);
  }
  return tree;
}

private static <T extends Comparable<T>> T minVal(BST<T> tree) {
  T min = tree.node;
  while (tree.left != null) {
    tree = tree.left;
    min = tree.node;
  }
  return min;
}
```

## BSTs as Sets and Maps
- Set ADT: $\log(n)$ `contains`
	- All operations will be $\Theta(\log N)$ if the tree is balanced, i.e. all left and right branches are occupied.
- Map ADT: let BSD node hold `(key, value)` pairs


## Performance
BSTs range from a best-case "bushy" tree to a worst-case "spindly" tree.
- Best-case height $\Theta(\log N)$
- Worst-case height $\Theta(N)$

![](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2F2316889115-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FCLYj7ccqvV6l4Pt9R0w5%252Fuploads%252F7PJe5K8xiYxZ0HCTrjuh%252Fimage.png%3Falt%3Dmedia%26token%3D60c8be95-f3d4-4fd9-9f02-0e4375a31853&width=768&dpr=2&quality=100&sign=9f2bcd&sv=1)
