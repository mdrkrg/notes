---
tags:
  - CS
  - Python
  - CS61A
---
Generator
===
## Generator Function
```python
>>> def plus_minus(x):
... 	yield x
... 	yield -x
```
A *generator function* is a function that **yield**s values instead of **return**ing values
- Yield multiple times
- Create a *generator*

When a generator function is called, it returns a generator that iterates over its yields

```python
>>> t = plus_minux(3)
>>> next(t)
3
>>> next(t)
-3
>>> t
<generator object plus_minus ...>
>>> next(t)
StopIteration
```



Generators control the execution of the generator function, which runs until the next `yield` statement is executed each time the generator's `__next__` method is invoked.
A generator object has `__iter__` and `__next__` methods, and each call to `__next__` continues execution of the generator function from wherever it left off previously until another `yield` statement is executed.

## `yield from`
```python
yield from a
# Is equivlent to
for x in a:
	yield x
```



## Benefits of Generator
When dealing with a large amount of result while only wanting to view a handful of them, use iterators rather than lists.
```python
def partitions(n, m):
	"""Yield partitions.
	>>> for p in partitions(6, 4): print(p)
	2 + 4
	1 + 1 + 4
	3 + 3
	1 + 2 + 3
	1 + 1 + 1 + 3
	2 + 2 + 2
	1 + 1 + 2 + 2
	1 + 1 + 1 + 1 + 2
	1 + 1 + 1 + 1 + 1 + 1 + 1
	"""
	if n > 0 or m > 0:
		if n == m:
			yield str(m)
		for p in partitions(n-m, m):
			yield p + '+' + str(m)
		yield from partitions(n, m-1)
```
Which is much greater than this version
```python
def partitions(n, m):
	if n < 0 or m == 0:
		return []
	else:
		exact_match = []
		if n == m:
			exact_match = [str(m)]
		with_m = [p + '+' + str(m) for p in partitions(n-m, m)]
		without_m = partitions(n, m-1)
		return exact_match + with_m + withoutM
```