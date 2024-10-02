---
tags:
  - CS
  - CPP
  - CS106B
---
Efficiency Analysis
===
## Order Analysis (Big-O)
Main idea: how rapidly a function's runtime grows as its input(s) grow.
1. Assume the input is arbitrarily huge.
2. Find the statement (or statements) executed the most in that function, and count how many times they occur.
3. Drop any constant coefficients from your approximation and take the highest-order term as the Big-O runtime.


Terminology:

| Expression                    | Big-O Runtime | Alternative Phrasing   |
| ----------------------------- | ------------- | ---------------------- |
| T(n) = 6n + 2^n               | O(2^n)        | exponential            |
| T(n) = n + 4n^3 + 2n^2 + 1055 | O(n^3)        | cubic (polynomial)     |
| T(n) = (1/6)n^2 + 1000n       | O(n^2)        | quadratic (polynomial) |
| T(n) = log n + n              | O(n)          | linear                 |
| T(n) = n log n + n            | O(n log n)    | linearithmic           |
| T(n) = log n + 40             | O(log n)      | logarithmic            |
| T(n) = 5                      | O(1)          | constant               |

Characteristics

| Big-O Runtime        | **Growth Description**                               |
| -------------------- | ---------------------------------------------------- |
| $$\Theta\,(1)$$      | Growth is independent of the input                   |
| $$\Theta\,(\log n)$$ | Doubling $n$ increments *time* by a constant         |
| $$\Theta\,(n)$$      | Incrementing $n$ increases *time* by a constant      |
| $$\Theta\,(n^2)$$    | Incrementing $n$ adds *time* by $n$ times a constant |
| $$\Theta\,(b^n)$$    | Incrementing $n$ multiplies *time* by a constant     |


### Analysis on Arrays
Appending a list is $O(1)$

Inserting a list is $O(n)$ because every elements after the index of insertion will be moved forward by one index.


```python
lst = []
for i in range(0, 10):
    lst.insert(0, i)
```
This will be $O(n^2)$ because $1+2+\cdots n$

**Binary Search**
```cpp
#include <iostream>
using namespace std;


/* Binary search from positions lo through hi (inclusive) for our key. Return first
 * index where found, or -1 if not found. Passing array by pointer. 
 */
int binarySearch(int array[], int key, int lo, int hi) {
  // Base case: If our indices have crossed over, the key must not be present.
  if (lo > hi) {
    return -1;
  }
  // See note about this midpoint formula in the section of today's notes
  // titled, "Midpoint Formula (and Integer Overflow)."
  int mid = lo + (hi - lo) / 2;

  if (key < array[mid]) {
    return binarySearch(array, key)
  }
}
```