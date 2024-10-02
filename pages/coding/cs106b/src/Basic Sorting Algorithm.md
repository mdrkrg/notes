Basic Sorting Algorithm
===
## Selection Sort
### Procedure
1. Find the **smallest element** in the array
2. Swap it to the **leftmost position** of the **unsorted portion** of the array
3. Mark that position as part of a **sorted portion** of the array
4. Repeat the process for the remaining **unsorted portion**
5. Finish when there's only **one element** left unsorted

### Analysis
- Worst case $O(n^2)$
	- $n-1+\cdots +1 + (n -1)= \dfrac{n\cdot(n-1)}{2}-1$ comparisons and swaps
- Best case $\Omega(n^2)$
	- $n-1+\cdots +1 = \dfrac{(n-1)\cdot (n-2)}{2}$ comparisons
- Operation
	- Heavy Comparison
	- Light swap
- Runtime consistency
- Easier to code or debug

### Code
```cpp
void selectionSort(Vector<int>& v) {
  for (int sorted = 0; sorted < v.size() – 1; sorted++) {
    int minIndex = sorted;
    for (int unsorted = sorted + 1; unsorted < v.size(); unsorted++) {
      if (v[unsorted] < v[minIndex]) {
        minIndex = unsorted;
      }
    swap(v, sorted, minIndex);
  }
}
```


For arrays (assume all cells are initialized)
```cpp
void selectionSort(int *arr, int size) {
  int tmp;
  for (int sorted = 0; sorted < size - 1; sorted++) {
    int minIndex = sorted;
    // Find minimum index on unsorted portion
    for (int unsorted = sorted + 1; unsorted < size; unsorted++) {
      if (arr[unsorted] < arr[minIndex]) {
        minIndex = unsorted;
      }
    }
    // Swapping
    tmp = arr[sorted];
    arr[sorted] = arr[minIndex];
    arr[minIndex] = tmp;
  }
}
```
## Insertion Sort
### Procedure
1. Assume the **first element** is sorted
2. Pull the first element of the **unsorted partition** of the array
3. In the **sorted partition**, scooch everything over that is **greater** than that element.
4. Stick the element into the hole **left for it** in the **sorted** portion of the array.
5. Finish when no unsorted left

### Analysis
- Worst case $O(n^2)$
	- Comparations and head insertion
	- $1+2+\cdots+n = \dfrac{n\cdot(n-1)}{2}$ swaps
- Best case $\Omega(n)$
	- Only $n$ comparations
- Operation
	- Swap heavy
	- Comparison light
- Faster in special cases
- Potential harder to code

### Code
Vector version:
```cpp
void insertionSort(Vector<int>& v) {
  for (int i = 1; i < v.size(); i++) {
    int val = v[i];
    int gap = i;
    for (int j = gap - 1; j >= 0 && v[j] > val; j--) {
      v[j + 1] = v[j];
      gap--;
    }
    v[gap] = val;
  }
}
```
Array version (assume all cells are initialized):
```cpp
void insertionSort(int *arr, int size) {
  for (int unsorted = 1; unsorted < size; unsorted++) {
    val = arr[unsorted]; // Pull the first unsorted
    gap = unsorted; // If nothing is greater, stay sill
    for (int sorted = unsorted - 1; sorted >= 0; sorted--) {
      if (arr[sorted] > val) {
        // Move forward the greater element
        arr[sorted + 1] = arr[sorted];
        // Move back the gap
        gap--;
      }
    }
    arr[gap] = val; // Filling the gap
  }
}
```
