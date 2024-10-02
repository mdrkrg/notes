Red Black Trees
===
## Binary Tree Rotation
Given any BST, it is possible to move to a different configuration using “rotation”.

- rotateLeft(G): Let x be the right child of G. Make G **the new left child** of x.
	- Can think of as temporarily merging G and P, then sending G down and left.
	- Preserves search tree property. No change to semantics of tree.
- rotateRight(H): Let x be the left child of P. Make P **the new right child** of x.
	- Can think of as temporarily merging G and P, then sending P down and right.
![rotation](https://upload.wikimedia.org/wikipedia/commons/2/23/Tree_rotation.png)
```java
/** Call from parent node */
private Node rotateRight(Node h) {
    // assert (h != null) && isRed(h.left);
    Node x = h.left;
    h.left = x.right;
    x.right = h;
    return x;
}

// make a right-leaning link lean to the left
private Node rotateLeft(Node h) {
    // assert (h != null) && isRed(h.right);
    Node x = h.right;
    h.right = x.left;
    x.left = h;
    return x;
}
```

Rotation:
- Can shorten (or lengthen) a tree.
- Preserves search tree property.


## Left-Leaning Red-Black Tree
Reading:

https://sedgewick.io/wp-content/themes/sedgewick/papers/2008LLRB.pdf

https://pdfs.semanticscholar.org/7cfb/8f56cabd723eb0b2a69f8ad3d0827ebc2f4b.pdf

https://www.read.seas.harvard.edu/%7Ekohler/notes/llrb.html


### Insertion

#### 2-3 LLRB Tree
```java
private Node put(Node h, Key key, Value val) {
	if (h == null) { return new Node(key, val, RED); }
 
	int cmp = key.compareTo(h.key);
    if (cmp < 0)      { h.left  = put(h.left,  key, val); }
    else if (cmp > 0) { h.right = put(h.right, key, val); }
    else              { h.val   = val;                    }
 
	if (isRed(h.right) && !isRed(h.left))      { h = rotateLeft(h);  }
	if (isRed(h.left)  &&  isRed(h.left.left)) { h = rotateRight(h); }
	if (isRed(h.left)  &&  isRed(h.right))     { flipColors(h);      } 
 
	return h;
}

```

#### 2-3-4 LLRB Tree
1. If found, update; if not found, insert a new node at bottom
2. Split the 4-nodes along the way
3. Enforce left-leaning condition

```java
private Node insert(Node h, Key key, Value val) {
  // Insert at bottom
  if (h == null) {
    return new Node(key, val, RED);
  }
  // Split a 4-node
  if (isRed(h.left)) {
    if (isRed(h.left.left)) {
      h = splitFourNode(h);
    }
  }
  // Standard BST insert
  int cmp = key.compareTo(h.key);
  if (cmp == 0) { h.val = val; }
  else if (cmp < 0) {
    h.left = insert(h.left, key, val);
  } else {
    h.right = insert(h.right, key, val);
  }
  // Enforce left-leaning
  if (isRed(h.right)) {
    h = leanLeft(h);
  }
  return h;
}
```

- Split 4-node:
```java
private Node splitFourNode(Node h) {
  x = rotR(h);
  x.left.color = BLACK;
  return x;
}
```

- Lean Left:
```java
private Node leanLeft(Node h) {
  x = rotL(h);
  x.color = x.left.color;
  x.left.color = RED;
  return x;
}
```