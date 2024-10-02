---
tags:
  - CS
  - Python
  - CS61A
---
Recursion
===
## Recursive Functions
```python
def sum_digits(n):
	if n < 10:
		return n
	else:
		all_but_last, last = n // 10 , n % 10
		return sum_digits(all_but_last) + last
```
### Difference between Iterative Functions
In general, iterative functions must maintain some local state that changes throughout the course of computation. At any point in the iteration, that state characterizes the result of completed work and the amount of work remaining.
## Mutual Recursions
```python
def is_even(n):
    if n == 0:
        return True
    else:
        return is_odd(n-1)

def is_odd(n):
    if n == 0:
        return False
    else:
        return is_even(n-1)

result = is_even(4)
```

## Tree Recursion
```python
def fib(n):
	if n == 1:
		return 0
	if n == 2:
		return 1
	else:
		return fib(n - 2) + fib(n - 1)
```
