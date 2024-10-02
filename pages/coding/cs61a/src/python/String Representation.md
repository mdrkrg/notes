---
tags:
  - CS
  - Python
  - CS61A
---
String Representation
===
## String Representation of Objects
An object value should behave like the kind of data it is meant to represent.
For instance, by producing a string representation of itself.

There are two main ways to produce the "string" of an object in Python: `str()` and `repr()`.

- `str()` is used to describe the object to the end user in a "Human-readable" form
- `repr()` can be thought of as a "Computer-readable" form mainly used for debugging and development.

### `repr`
The `repr` function returns a Python expression (a string) that evaluates to an equal object.
```python
# For most object types
eval(repr(object)) == object
```
The result of calling `repr` on a value is what Python prints in an interactive session.
```python
>>> 12e12
12000000000000.0
>>> repr(12e12)
'12000000000000.0'
>>> print(repr(12e12))
12000000000000.0
```
```python
>>> s = "Hello, World!"
>>> repr(s)
"'Hello, World!'"
>>> str(s)
'Hello, World!'
>>> print(str(s))
Hello, World!
>>> print(repr(s))
'Hello, World!'
```
Some objects do not have a simple Python-readable string
### `str`
The `str` function returns a human-readable string interpreting the input value.
The result of calling `str` on the value of an expression is what Python prints using the `print` function.
```python
>>> from fractions import Fraction
>>> half = Fraction(1, 2)
>>> str(half)
'1/2'
>>> print(half)
1/2
```

## String Interpolation
### F-Strings
String interpolation involves evaluating a string literal that contains expressions.
```python
>>> from math import pi
>>> f'pi starts with {pi}...'
'pi starts with 3.14159...'
>>> print(f'pi starts with {pi}...')
pi starts with 3.14159...
```
The result of evaluating an *f-string* literal contains the `str` (*stir*) string of the value of each sub-expression.
```python
>>> from fractions import Fraction
>>> half = Fraction(1, 2)
>>> str(half)
1/2
>>> f'half of a half is {half * half}'
'half of a half is 1/4'
```
Sub-expressions are evaluated in the current enviroment.
When a sub-expression is evaluated, it behaves just as normal, which means that there might be side effects.

### Formatting Strings
```python
>>> 'I have {0} {1}'.format(2, "parameters")
'I have 2 parameters'
```