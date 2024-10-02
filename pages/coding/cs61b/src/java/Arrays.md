Arrays
===
## Array Basics
Arrays are a special type of object that consists of a numbered sequence of memory boxes.

Arrays consist of:
- A fixed integer length, N
- A sequence of N memory boxes (N = length) where all boxes are of **the same type**, and are numbered 0 through N - 1.

### Array Creation
Three notations for array creation are just the same.
- `int[] x = new int[3];`
- `int[] y = new int[]{1, 2, 3, 4, 5};`
- `int[] z = {9, 10, 11, 12, 13};`

### Array Access and Modification
```java
int[] z = null; // Null pointer
int[] x, y; // Uninitialized pointer

x = new int[]{1, 2, 3, 4, 5};
y = x; // Point to the same address
x = new int[]{-1, 2, 5, 4, 99};
y = new int[3];
z = new int[0]; // Empty array
int xL = x.length;

String[] s = new String[6];
s[4] = "ketchup";
s[x[3] - x[1]] = "muffins";
```
Java arrays only perform bounds checking at runtime.
### Array Copying
```java
System.arraycopy(src, src_beg, dst, dst_beg, len);
```
`System.arraycopy` takes five parameters:
- The array to use as a source
- Where to start in the source array 
- The array to use as a destination
- Where to start in the destination array
- How many items to copy

## 2D Arrays
A 2D array in Java is actually just an array of arrays.

Consider the code `int[][] bamboozle = new int[4][]`. This creates an array of integer arrays called `bamboozle`. Specifically, this creates exactly four memory boxes, each of which can point to an array of integers (of unspecified length).

