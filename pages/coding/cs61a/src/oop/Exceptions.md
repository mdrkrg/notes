---
tags:
  - CS
  - Python
  - CS61A
---
Exceptions
===
When designing a program, one must anticipate the exceptional circumstances that may arise and take appropriate measures to handle them.

In any case, programmers must make conscious choices about how their programs should react to exceptional conditions.

_Exceptions_ provides a general mechanism for adding error-handling logic to programs.
_Raising an exception_ is a technique for interrupting the normal flow of execution in a program, signaling that some exceptional circumstance has arisen, and returning directly to an enclosing part of the program that was designated to react to that circumstance.

## Raising Exceptions
An exception is a object instance with a class that inherits, either directly or indirectly, from the `BaseException` class.
In general, any exception instance can be raised with the `raise` statement.
```python
>>> raise Exception('An error occurred')
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
Exception: an error occurred
```

When an exception is raised, no further statements in the current block of code are executed.

Unless the exception is _handled_ (described below), the interpreter will return directly to the interactive read-eval-print loop, or terminate entirely if Python was started with a file argument.

- `TypeError` A function was passed the wrong number/type of argument
- `NameError` A name wasn't found
- `KeyError` A key wasn't found in a dictionary
- `RecursionError` Too many recursive calls
## Handling Exceptions
An exception can be handled by an enclosing `try` statement.

A `try` statement consists of multiple clauses; the first begins with `try` and the rest begin with `except`:
```python
try:
    <try suite>
except <exception class> as <name>:
    <except suite>
except ...
```
- `<try suite>` executed immediately when the try statement is executed
- `<except suite>` executed when an exception is raised during the course of executing the `<try suite>`
	- Each `except` clause specifies the particular class of exception to handle
	- Any instance of a class inheriting from a particular exception class will be handled by the following `<except suite>` of that class
	- `<name>` is bound to the exception object within the suite

```python
def invert(x):
    result = 1/x  # Raises a ZeroDivisionError if x is 0
    print('Never printed if x is 0')
    return result

def invert_safe(x):
    try:
        return invert(x)
    except ZeroDivisionError as e:
        return str(e)

>>> invert_safe(2)
Never printed if x is 0
0.5
>>> invert_safe(0)
'division by zero'
```

## Exception Objects
Exception objects themselves can have attributes, such as the error message stated in an `assert` statement and information about where in the course of execution the exception was raised.

Exceptions can be defined as classes, inherting from `Exception`.

Example: Newton's method with `ValueError` handler
```python
class IterImproveError(Exception):
    def __init__(self, last_guess):
        self.last_guess = last_guess

def improve(update, done, guess=1, max_updates=1000):
    k = 0
    try:
        while not done(guess) and k < max_updates:
            guess = update(guess)
            k = k + 1
        return guess
    except ValueError: # When negative sqrted, raise the exception
        raise IterImproveError(guess)

def newton_update(f, df):
        def update(x):
            return x - f(x) / df(x)
        return update

def find_zero(f, df, guess=1):
    def done(x):
        return f(x) == 0
    try:
        return improve(newton_update(f, df), done, guess)
    except IterImproveError as e:
        return e.last_guess # Handle the exception and return last guess


>>> from math import sqrt
>>> find_zero(lambda x: 2*x*x + sqrt(x), lambda x: 4*x + 1/(2*sqrt(x)))
-0.030214676328644885 # Exception handled
```