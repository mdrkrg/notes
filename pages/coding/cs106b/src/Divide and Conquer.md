Divide and Conquer
===
## Merge Sort
- Dividing the problem by half, **quartering** the problem size (reverse $O(n^2)$)
- Assuming the smaller part is sorted, the process of **merging** is much easier (only comparing the **leftmost** elements)

### Procedure
**Base case**: Already sorted
- Empty array
- One element array

**Recursive case**: Divide and Conquer
1. Dividing the array into two halves
2. Sort each of the smaller arrays recursively
3. Empty the original array
4. Merge the two sorted arrays into the original


### Code
I really didn't remember when I wrote this.
```cpp
class MergeSort {
public:
  template <typename T> void sort(T array[], int size) {
    // Base cases
    if (size == 0 || size == 1)
      return; // Do nothing

    // Recursive cases
    int left = size / 2;
    int right = size - size / 2;

    T *arrLeft = new T[left];
    T *arrRight = new T[right];

    for (int i = 0; i < left; i++) {
      arrLeft[i] = array[i];
    }

    for (int j = 0; j < right; j++) {
      arrRight[j] = array[j + left];
    }

    mergeSort(arrLeft, left);
    mergeSort(arrRight, right);

    // Merging
    int leftIndex = 0;
    int rightIndex = 0;
    int index = 0;
    while (leftIndex < left && rightIndex < right) {
      if (arrLeft[leftIndex] < arrRight[rightIndex])
        array[index++] = arrLeft[leftIndex++];
      else
        array[index++] = arrRight[rightIndex++];
    }
    while (leftIndex < left)
      array[index++] = arrLeft[leftIndex++];
    while (rightIndex < right)
      array[index++] = arrRight[rightIndex++];

    delete[] arrLeft;
    delete[] arrRight;
  }
};
```