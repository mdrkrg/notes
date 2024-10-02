---
tags:
  - CS
  - Python
  - CS61A
---
Higher Order Functions (L4 & L5)
===
## Functions as return values and parameters
Alert that a function as a formal parameter in a higher order function is just the name bound to a function.
```python
def twice(func, x):
	return func(func(x))

def square(x):
	return x * x
"""
The **name** SQUARE is bound to <function>: square(x)

And when the TWICE is evaluated, the formal parameter FUNC evaluates to <function>: square(x) when looking up the **name** SQUARE in the global frame as a passed in argument.
"""
result = twice(square, x)
```
## Nested Definitions
```python
def make_adder(n):
	def adder(k):
		return k + n
	return adder

add_three = make_adder(3)
"""Calling the function MAKE_ADDER creates the frame f1, which bound 3 to formal parameter N"""
result = add_three(4)
"""When executed, this creates a frame whose parent is f1 (this means it can access N), which bound 4 to formal parameter K of function ADDER"""
```
- Nested `def`
- The parent of a function is the frame **in which it was defined**
- The parent of a frame is the parent of the function called
	- `add_three(4)` called the function `adder(k)`, whose parent is `f1`
## Draw Enviroment Diagrams
- Define
	- Create a function value: `func <name>(<formal parameters>) [pareet=<parent>]`
	- Its parent is the current frame
	- Bind `<name>` to the function value in the current frame
- Call
	- Add a local frame, titled with `<name>` of the function being called
	- Copy the parent of the function to the local frame: `[parent=<label>]`
	- Bind the `<formal parameters>` to the **arguments in the local frame**
	- Execute the body of the function in the enviroment that **starts with the local frame**
## Currying
```python
>>> def curried_pow(x):
        def h(y):
            return pow(x, y)
        return h

>>> curried_pow(2)(3)
8
```
### Uncurrying Transformation
```python
>>> def curry2(f):
        """Return a curried version of the given two-argument function."""
        def g(x):
            def h(y):
                return f(x, y)
            return h
        return g

>>> def uncurry2(g):
        """Return a two-argument version of the given curried function."""
        def f(x, y):
            return g(x)(y)
        return f

>>> pow_curried = curry2(pow)
>>> pow_curried(2)(5)
32
```
## Lambda Expressions
```python
square = lambda x: x * x
quadro_square = lambda x: square(x) * square(x)
some = lambda f: square(f)

>>> some(square)
func ...
>>> some(square)(2)
16
```
A lambda expression does not automatically bind the function object that it returns to an intrinsic name.