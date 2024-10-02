---
tags:
  - CS
  - Python
  - CS61A
---
print
===
```python
>>> a = "hello"
>>> print(a)
hello
>>> print("a")
a
>>> print('a') # I still need to figure out the difference obetween double and single quote and their usage in python.
a
>>> print("Hi, " + a + " world!") """This is how you insert a **STR Varible** into print."""
Hi, hello world!
```

Note that `print()` does NOT return a value, actually it returns `None`.
The "print" effect is just the *behaviour* of `print()` function whenever it is evaluated. It's what *non-pure* functions do.
```python
>>> a, b = 1, 2
>>> print(print(a), print(b))
1
2
None None
```