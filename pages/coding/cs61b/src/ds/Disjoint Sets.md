Disjoint Sets
===
## Basic Concept and Interface
Two sets are named _disjoint sets_ if they have no elements in common.

A Disjoint-Sets (or Union-Find) data structure keeps track of a fixed number of elements partitioned into a number of _disjoint sets_.
Operations:
1. `connect(x, y)`: connect `x` and `y`. Also known as `union`
2. `isConnected(x, y)`: returns true if `x` and `y` are connected (i.e. part of the same set).

`connect(A, B)`
- Before calling: `{A}, {B}, {C}, {D}`
- `isConnected(A, B) -> false`
- After calling: `{A, B}, {C}, {D}`
- `isConnected(A, B) -> true`

Sets of non-negative integers
```java
public interface DisjointSets {
    /** connects two items P and Q */
    void connect(int p, int q);

    /** checks to see if two items are connected */
    boolean isConnected(int p, int q); 
}
```


## Quick Find
Using a single array of integers:
- The **indices of the array** represent the elements of our set.
- The **value at an index** is the set number it belongs to.

```
          _____________
int[] id |4|4|4|5|4|5|6|
          ‾‾‾‾‾‾‾‾‾‾‾‾‾
          0 1 2 3 4 5 6

Set 4: {0, 1, 2, 4}
Set 5: {3, 5}
Set 6: {6}
```


The specific set number doesn't matter as long as all elements in the same set share the same id.

### `connect(x, y)`
```
After connect(2, 3):
          _____________
int[] id |5|5|5|5|5|5|6|
          ^‾^‾^‾‾‾^‾‾‾‾
          0 1 2 3 4 5 6

Set 5: {0, 1, 2, 3, 4, 5}
Set 6: {6}
```

### `isConnected(x, y)`
`id[x] == id[y]`

### Code & Runtimes
```java
public class QuickFindDS implements DisjointSets {

    private int[] id;

    /* Θ(N) */
    public QuickFindDS(int N){
        id = new int[N];
        for (int i = 0; i < N; i++){
            id[i] = i;
        }
    }

    /* need to iterate through the array => Θ(N) */
    public void connect(int p, int q){
        int pid = id[p];
        int qid = id[q];
        for (int i = 0; i < id.length; i++){
            if (id[i] == pid){
                id[i] = qid;
            }
        }
    }

    /* Θ(1) */
    public boolean isConnected(int p, int q){
        return (id[p] == id[q]);
    }
}
```

| Implementation | Constructor | `connect` | `isConnected` |
| -------------- | ----------- | --------- | ------------- |
| ListOfSets     | Θ(N)        | O(N)      | O(N)          |
| QuickFind      | Θ(N)        | Θ(N)      | Θ(1)          |
## Quick Union
We treat the array as trees, or a forest.
- Each item: index of its parent
- Root: negative value

```
       ┌──┬──┬──┬──┬──┬──┬──┐
parent │-1│0 │1 │-1│0 │3 │-1│
       └──┴──┴──┴──┴──┴──┴──┘
        0  1  2  3  4  5  6

 ┌ 0 ┐      3 ┐        6
 4   1 ┐      5     
       2
"root 0"  "root 3"  "root 6"
```

![](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2Fjoshhug.gitbooks.io%2Fhug61b%2Fcontent%2Fchap9%2F9.3.1.png&width=768&dpr=2&quality=100&sign=65c74c93&sv=1)

### `find(int item)`
For QuickUnion we define a helper function `find(int item)` which returns the root of the tree `item` is in.

### `connect(x, y)`
1. Find the root of their respective trees
2. Make one the child of other
	- `parent[find(y)] = find(x)`

```
Calling connect(5, 2):
       ┌──┬──┬──┬──┬──┬──┬──┐
parent │-1│0 │1 │0 │0 │3 │-1│
       └──┴──┴──┴^^┴──┴──┴──┘
        0  1  2  3  4  5  6
```
![](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2Fjoshhug.gitbooks.io%2Fhug61b%2Fcontent%2Fchap9%2F9.3.2.png&width=768&dpr=4&quality=100&sign=e979678c&sv=1)

- Best case: `x`, `y` are both root, Θ(1)
- Worst case: Linear tree, Θ(N)
- Upper bound: O(N)


### `isConnected`
```java
find(x) == find(y)
```

### Code & Runtimes
```java
public class QuickUnionDS implements DisjointSets {
    private int[] parent;

    public QuickUnionDS(int num) {
        parent = new int[num];
        for (int i = 0; i < num; i++) {
            parent[i] = -1;
        }
    }

    private int find(int p) {
        while (parent[p] >= 0) {
            p = parent[p];
        }
        return p;
    }

    @Override
    public void connect(int p, int q) {
        int i = find(p);
        int j= find(q);
        parent[i] = j;
    }

    @Override
    public boolean isConnected(int p, int q) {
        return find(p) == find(q);
    }
}
```


| Implementation | Constructor | `connect` | `isConnected` |
| -------------- | ----------- | --------- | ------------- |
| QuickUnion     | Θ(N)        | O(N)      | O(N)          |
| QuickFind      | Θ(N)        | Θ(N)      | Θ(1)          |
| QuickUnion     | Θ(N)        | O(N)      | O(N)          |
- N = number of elements in our DisjointSets data structure

## Weighted Quick Union (WQU)
- The shorter the tree the faster it takes
- **New rule:** whenever we call `connect`, we always link the root of the smaller tree to the larger tree.
- Maximum height logN
- Determine tree weight: use root value **`-(size of tree)`**

> [!info]- **Maximum height: Log N**
> Imagine any element $x$ in tree $T1$. The depth of $x$ increases by $1$ only when $T1$ is placed below another tree $T2$. When that happens, the size of the resulting tree will be at least double the size of $T1$ because $size(T2)\ge size(T1)$.
> 
> The tree with $x$ can double at most $\log_2N$ times until we've reached a total of $N$ items ($2^{\log_2N}=N$).
> 
> So we can double up to $log_2N$​ times and each time, our tree adds a level → maximum $log_2N$​ levels.

### Code
In `connect(x, y)`:
```java
if (xRoot < yRoot) {
    parent[yRoot] = xRoot;
} else {
    parent[xRoot] = yRoot;
}
```

### Runtimes

| Implementation       | Constructor | `connect` | `isConnected` |
| -------------------- | ----------- | --------- | ------------- |
| QuickUnion           | Θ(N)        | O(N)      | O(N)          |
| QuickFind            | Θ(N)        | Θ(N)      | Θ(1)          |
| QuickUnion           | Θ(N)        | O(N)      | O(N)          |
| Weighted Quick Union | Θ(N)        | O(log N)  | O(log N)      |


## Weighted Quick Union with Path Compression
Whenever we call `find(x)` we have to traverse the path from `x` to root. So, along the way we can connect all the items we visit to their root at no extra asymptotic cost.

The average runtime of `connect` and `isConnected` becomes **almost constant** in the long term! This is called the _amortized runtime_.

### Code
```java
protected int find(int x) {
    while (id[x] >= 0) {
        id[x] = id[id[x]];
        x = id[x];
    }
    return x;
}
```