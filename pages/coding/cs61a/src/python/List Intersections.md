---
tags:
  - CS
  - Python
  - CS61A
---
List Intersections
===
```python
[x for x in list1 if x in list2]
```
The above implementation takes quadratic time $\Theta\,(n^2)$ and is unefficient.
## Linear-Time Intersection of Sorted Lists
Given two sorted lists with no repeats, return the number of elements that appear in both.
```python
def fast_overlap(s, t):
    """Return the overlap between sorted S and sorted T.
    
    >>> fast_overlap([3, 4, 6, 7, 9, 10], [1, 3, 5, 7, 8])
    """
    i, j, count = 0, 0, 0
    
    while i < len(s) and j < len(t):
        if s[i] == t[j]:
            count, i, j = count+1, i+1, j+1
        elif s[i] < t[j]:
            i += 1
        else:
            j += 1
    return count
```