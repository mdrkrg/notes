Heaps and Priority Queues
===
## Priority Queue
A data structure that is for quickly finding the **smallest** or **largest** element instead of quickly searching

```java
/** (Min) Priority Queue: Allowing tracking and removal of 
  * the smallest item in a priority queue. */
public interface MinPQ<Item extends Comparable<Item>> {
    /** Adds the item to the priority queue. */
    public void add(Item x);
    /** Returns the smallest item in the priority queue. */
    public Item getSmallest();
    /** Removes the smallest item from the priority queue. */
    public Item removeSmallest();
    /** Returns the size of the priority queue. */
    public int size();
}
```
- Can only interact with the smallest / larges items

### Implementation
- Ordered Array
	- `add`: Θ(N)
	- `getSmallest`: Θ(1)
	- `removeSmallest`: Θ(1)
    
- Bushy BST
	- `add`: Θ(logN)
	- `getSmallest`: Θ(logN)
	- `removeSmallest`: Θ(logN)
    
- HashTable
	- `add`: Θ(1)
	- `getSmallest`: Θ(N)
	- `removeSmallest`: Θ(N)

Better implementation: Heap

## Heaps
Defining a binary min-heap as being **complete** and obeying **min-heap** property:
- Min-heap: Every node is less than or equal to both of its children
- Complete: Missing items only at the bottom level (if any), all nodes are as far left as possible.

![min_heap_property](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2Fjoshhug.gitbooks.io%2Fhug61b%2Fcontent%2Fassets%2Fheap-13.2.1.png&width=768&dpr=2&quality=100&sign=48cc9456&sv=1)

### Heap Operations
- `add`: Add to the **end** of heap temporarily. ==Swim up the hierarchy== to the proper place.
    - Swimming involves swapping nodes if child < parent
	- Θ(logN)
- `getSmallest`: Return the root of the heap
	- This is guaranteed to be the minimum by our _min-heap_ property
	- Θ(1)
- `removeSmallest`: Swap the **last item** in the heap into the root. ==Sink down the hierarchy== to the proper place.
    - Sinking involves swapping nodes if parent > child. ==Swap with the smallest child== to preserve _min-heap_ property.

### Tree Representation
#### Node Mapping Trees
In these approaches, we store explicit references of children
1. Fixed width nodes
    ```java
    public class Tree1A<Key> {
      Key k;
      Tree1A left;
      Tree1A middle;
      Tree1A right;
      ...
    }
    ```
    ![1a](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2F2316889115-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FCLYj7ccqvV6l4Pt9R0w5%252Fuploads%252FGPQICfSMvLaxRltFOxMF%252Fimage.png%3Falt%3Dmedia%26token%3De3f459a8-363c-4601-920d-819d966e7115&width=768&dpr=2&quality=100&sign=b4f8b476&sv=1)

2. Variable-width nodes
   ```java
     public class Tree1B<Key> {
     Key k;
     Tree1B[] children;
     ...
     ```
	 ![1b](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2F2316889115-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FCLYj7ccqvV6l4Pt9R0w5%252Fuploads%252Fl1NhbH8IuDKlHe9ji7rV%252Fimage.png%3Falt%3Dmedia%26token%3D43d3d27e-3946-4924-95e9-20af802a8494&width=768&dpr=2&quality=100&sign=b0b32bbd&sv=1)
	- awkward traversal
	- worse performance
3. Sibling Tree
   ```java
     public class Tree1C<Key> {
       Key k;
       Tree1C favoredChild;
       Tree1C sibling;
       ...
     }
     ```
     ![1c](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2F2316889115-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FCLYj7ccqvV6l4Pt9R0w5%252Fuploads%252FWSjeCjdRvb3jzTlV6wz2%252Fimage.png%3Falt%3Dmedia%26token%3Dfda06ad4-4535-47bd-9c7f-b2d23d521609&width=768&dpr=4&quality=100&sign=75ca676a&sv=1)

#### Array Based Trees
Much like the [[Disjoint Sets]], we use arrays to store `keys` and `parents`
- `Key[] keys` stores key value, whose index is used in `parents` to lookup its parent's index
- `int[] parents` stores the index of the parent of a `key` in `keys`
- To look up the parent, `parent == keys[parents[keys.indexOf(key)]]`

```java
public class Tree2<Key> {
  Key[] keys;
  int[] parents;
  ...
}
```
![array_tree](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2F2316889115-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FCLYj7ccqvV6l4Pt9R0w5%252Fuploads%252Fi99NVIANpmuo1ZNdpp0Z%252Fimage.png%3Falt%3Dmedia%26token%3Dddcc934c-d7e7-436b-9053-9a60d8e9cf12&width=768&dpr=2&quality=100&sign=888014e6&sv=1)
- The level-order of the tree matches the order of `keys` exactly
- `parents` is redundent
- The tree is complete

So this can be simplified into
```java
public class TreeC<Key> {
  Key[] keys;
  ...
}
```
![array_tree_no_parent](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2F2316889115-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FCLYj7ccqvV6l4Pt9R0w5%252Fuploads%252FgBdGBgTxIlozZMklfxkm%252Fimage.png%3Falt%3Dmedia%26token%3Dc3728dc4-5dea-4111-aa35-0591f331daf6&width=768&dpr=4&quality=100&sign=8e38c6f5&sv=1)

**Swimming in an Array Based Tree**
```java
public void swim(int k) {
    if (keys[parent(k)] > keys[k]) {
       swap(k, parent(k));
       swim(parent(k));              
    }
}
```

`parent(k)` returns the (index of) parent of the given (index of) k
```java
/**
 * Given the structure of an array based tree,
 * the parent() is simple
 * @param k - The index of a key
 * @return The index of the parent of k
 */
private int parent(int k) {
  return (k + 1) / 2 - 1
}

private int leftChild(int k) {
  return k * 2 + 1;
}

private int rightChild(int k) {
  return (k + 1) * 2;
}
```


## PQ Implementation
Using Heap to implement PQ:
- `add` Θ(logN)
- `getSmallest` Θ(1)
- `removeSmallest` Θ(logN)

Notes:
- Runtime is averaged, since the array have to **resize**
- BST's can have constant time `getSmallest` if ==pointer is stored to smallest element==
- Array-based heaps take around 1/3rd the memory it takes to represent a heap using approach 1A (direct pointers to children)


My Implementation:
```java fold title=ArrayMinHeap hl=88-89
public class ArrayMinHeap<K extends Comparable<K>> implements MinHeap<K> {
    private K[] keys;
    private int size;
    private final int INITIAL_SIZE = 10;
    private final int RESIZE_MULTIPLIER = 2;
    private final double RESIZE_RATIO = 0.75;

    public ArrayMinHeap() {
        keys = (K[]) new Comparable[INITIAL_SIZE];
        size = 0;
    }

    /**
     * @return The smallest (first) element in the heap
     * @throws ArrayIndexOutOfBoundsException When there is nothing in the heap
     */
    public K getMin() throws ArrayIndexOutOfBoundsException {
        if (size == 0) {
            throw new ArrayIndexOutOfBoundsException(
                    "ArrayMinHeap: Expected more than 1 element, got 0.");
        }
        return keys[0];
    }

    /**
     * @return The size of the heap
     */
    public int size() {
        return size;
    }

    /**
     * Add an element into the heap
     * @param key The key to add
     * @return The heap itself
     */
    public MinHeap<K> add(K key) {
        if ((double) size / keys.length > RESIZE_RATIO) {
            enlarge();
        }
        keys[size] = key;
        swim(size);
        size++;
        return this;
    }

    /**
     * From bottom to top, insert the last element of the
     * heap up to the right position.
     * @param index The current index (position) of swimming
     */
    private void swim(int index) {
        int parent = parent(index);
        if (keys[parent].compareTo(keys[index]) > 0) {
            swap(index, parent);
            swim(parent);
        }
    }

    /**
     * From top to bottom, insert the top element of the
     * heap down to the right position.
     * @param current The current index (position) of diving
     */
    private void dive(int current) {
        K currentKey = keys[current];
        int parent = parent(current);
        K parentKey = keys[parent];
        if (current != 0) {
            if (currentKey.compareTo(parentKey) < 0) {
                swap(current, parent);
            } else {
                // Already in position, returning
                return;
            }
        }
        int left = leftChild(current);
        int right = rightChild(current);
        if (current == size || left >= size) {
            return;
        }
        if (right >= size) {
            dive(left);
            return;
        }
        K leftKey = keys[left];
        K rightKey = keys[right];
        // Dive the smaller child
        if (leftKey.compareTo(rightKey) < 0) {
           dive(left);
        } else {
           dive(right);
        }
    }

    /**
     * Swap two keys given each one's index
     * @param a Index of one key
     * @param b Index of another key
     */
    private void swap(int a, int b) {
        K tmpKey = keys[a];
        keys[a] = keys[b];
        keys[b] = tmpKey;
    }

    /**
     * Delete the minimum item in the heap
     * @return The deleted minimum item
     * @throws ArrayIndexOutOfBoundsException When there is no more to delete
     */
    public K deleteMin() throws ArrayIndexOutOfBoundsException {
        if (size == 0) {
            throw new ArrayIndexOutOfBoundsException(
                    "ArrayMinHeap: Expected more than 1 element, got 0.");
        }
        K min = keys[0];
        keys[0] = keys[size - 1];
        keys[size - 1] = null;
        size--;
        if (size > INITIAL_SIZE && (double) size / keys.length < 1 - RESIZE_RATIO) {
            shrink();
        }
        dive(0);
        return min;
    }

    /**
     * Resize the [keys] and [values] bigger
     * The resize ratio should be checked by the caller
     */
    private void enlarge() {
        K[] newKeys = (K[]) new Comparable[keys.length * RESIZE_MULTIPLIER];
        System.arraycopy(keys, 0, newKeys, 0, size);
        keys = newKeys;
    }

    /**
     * Resize the [keys] and [values] smaller
     * The resize ratio and minimal length should be checked by the caller
     */
    private void shrink() {
        K[] newKeys = (K[]) new Comparable[keys.length / RESIZE_MULTIPLIER];
        System.arraycopy(keys, 0, newKeys, 0, size);
        keys = newKeys;
    }

    /**
     * Get the parent's index of a given index of an element
     * @param index Index of the element to lookup
     * @return The index of it's parent, if index is root, return itself
     */
    private static int parent(int index) {
        if (index == 0) {
            return 0;
        }
        return (index + 1) / 2 - 1;
    }

    /**
     * Get the left child's index of a given index of an element
     * Whether the return value is out of bound should be checked by caller
     * @param index Index of the element to lookup
     * @return The index of left child
     */
    private static int leftChild(int index) {
        return index * 2 + 1;
    }

    /**
     * Get the right child's index of a given index of an element
     * Whether the return value is out of bound should be checked by caller
     * @param index Index of the element to lookup
     * @return The index of right child
     */
    private static int rightChild(int index) {
        return (index + 1) * 2;
    }
}
```

### Extra: Implementing the Stack Using a PQ
