---
tags:
  - CS
  - Python
  - CS61A
---
Tuple
===
Tuple is an **immutable** data type.
```python
>>> (1, 2, 3, 4)
(1, 2, 3, 4)
>>> 1, 2, 3, 4
(1, 2, 3, 4)
>>> (1, ) # One element
(1, )
>>> ()
() # No element
```

- The course of multiple assignment `a, b = 1, 2`
	- The `1, 2` evaluates to a tuple `(1, 2)`
	- And then the `a, b` dispatch the tuple
## Function
```python
"""function tuple"""
>>> tuple()
()
>>> tuple([1, 1, 4])
(1, 1, 4)
```
## Operation
### Addition
### Membership
### Slicing


