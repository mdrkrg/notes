---
tags:
  - CS
  - CPP
  - CS106B
---
Arrays
===
An array is a variable that is able to hold multiple values of some type.
An array is made up of **cells**. Each cell holds a single value. Those cells are numbered starting at 0 (zero); an array of length N has cells 0 through (N - 1).
- Ordered
- Homogeneous

>**Unintialized Arrays**
>If we do not initialize the cells in an array, they contain unpredictable garbage values.

Syntax for defining:
```cpp
int array1[5]; // Uninitialized
array1 = {1, 2, 3, 4, 5}; // Initializing
int array2[5] = {1, 2, 3, 4, 5}; // Initialize on definition
int arrayWithoutIndex[] = {1, 2, 3}; // OK

// Better seperate the element number
const int N_ELEMENT = 10;
int array[N_ELEMENT]; // Easier for modification
```
Fundamental properties that must be specified:
- **Element type**
- **Array size**

> Global arrays cannot be assigned index based values. To contain values they have to be **initialized**.
## Array Size
When declaring an array, the compiler designate **a continuous block of memory** for the array.

The size of cells **is consistant with the size of the data type** on declaration of the array.

- Size CANNOT be variable, **must be constant**
- Convention is declaring a larger array and using only part of it, first defining a maximum of elements needed
	- **Allocated size**: size of array on declaration
	  **Effective size**: number of elements actively in use
```cpp
const int MAX_ELEMENTS = 100;
int array[MAX_ELEMENTS];
int nElement; // To keep track of effective size
```

The number of elements in array `a` can be computed as follows:
```cpp
sizeof a / sizeof a[0]
// Dividing the size of the entire array
// by the size of first element
```
## Passing Arrays as Parameters
Functions in C++ can take entire arrays as parameters.
Maximum size can be omitted
```cpp
double Mean(double array[], int n) {
  double total = 0;
  for (int i = 0; i < n; i++) {
    total += array[i];
  }
  return total / n;
}
```
Arrays as parameters are **pointers** in the function **pointing to the arrays**. The function is mutating the same array as the original one be passed in.

## Multidimentional Arrays
The element of arrays can themselves be arrays.
Arrays of arrays are called ***multidimensional arrays***.

Two-dimentional array is called a ***matrix***.
```cpp
double mat[3][3];
```
Memory diagram:
```
- - - - +---+
        |   | mat[0][0]
        +---+
mat[0]  |   | mat[0][1]
        +---+
        |   | mat[0][2]
- - - - +---+
        |   | mat[1][0]
        +---+
mat[1]  |   | mat[1][1]
        +---+
        |   | mat[2][2]
- - - - +---+
        |   | mat[2][0]
        +---+
mat[2]  |   | mat[2][1]
        +---+
        |   | mat[2][2]
- - - - +---+
```

Multidimentional arrays are passed in as parameters just as normal arrays, but the bounds are better included.

Initializing a multidimentional array:
```cpp
double identityMatrix[3][3] = {
  { 1.0, 0.0, 0.0 },
  { 0.0, 1.0, 0.0 },
  { 0.0, 0.0, 1.0 }
};
```
## Arrays and Pointers
### Sameness
Arrays are implemented internally as pointers.

For example: a `double` array `doubleArray`
- `&doubleArray[i]` is the same with `doubleArray + i * 8`
```cpp
double *p = doubleArray;
p += 1; // Pointing to the next index
cout << *p << endl; // This will be doubleArray[1]
```



The name of an array `arr` is defined to **be identical to `&name[0]`**.
If we print the naked array variable name, we get the address of the **base address** of the array (i.e., the address of cell zero):
```cpp
#include <iostream>
using namespace std;

int main() {
   int array[5];

   // Prints addresses of all cells in the array.
   for (int i = 0; i < 5; i++)
   {
      cout << "&(array[" << i << "]): " << &(array[i]) << endl;
   }

   // Prints base address of array. Notice this is the same as &(array[0]).
   cout << endl << "Base address of array: " << array << endl;

   return 0;
}
```


Declaring an argument as a pointer have the same effect as declaring it as an array.
```cpp
int sumIntegerArray(int array[], int n)
// is the same with
int sumIntegerArray(int *array, int n)
```
The address of the first element in intList is copied into the formal parameter array and manipulated using pointer arithmetic.


### Difference
Difference of arrays and pointers occur as they are originally declared.

Array
- Reserve **consecutive words of memory** for elements
- For use of storage

Pointer
- Reserve **only a single word** for storing **single address**
- Not associated with any storage until initialized
- Used for ***dynamic allocation***

To use a pointer as an array: assign the base address of the array to the pointer variable
```cpp
int array[5];
int *p;
p = array;
```

