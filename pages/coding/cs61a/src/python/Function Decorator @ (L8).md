---
tags:
  - CS
  - Python
  - CS61A
---
Function Decorator @ (L8)
===
## `@`
```python
@trace
def triple(x):
	return x * 3
"""
This is Equivlent to
"""
def triple(x):
	return x * 3
triple = trace(triple)
```
Using a decorator **rebind the name** of a function to a decorating function, which passes the original function as its argument.