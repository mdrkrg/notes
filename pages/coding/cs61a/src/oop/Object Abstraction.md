---
tags:
  - CS
  - Python
  - CS61A
---
Object Abstraction
===
## Polymorphic Functions
Polymorphic function: A function that applies to many (poly) different forms (morph) of data.

Example: [[String Representation]]
`str` and `repr` are both polymorphic; they **apply to any object**
- `repr` invokes a zero-argument method `__repr__` on its argument
- `str` invokes a zero-argument method `__str__` on its argument
### Implementing `str` and `repr`
The behaviour of `repr`, different from invoking `__repr__`:
- An instance attribute called `__repr__` is ignored
- Only class attributes are found
```python
def repr(x):
    return type(x).__repr__(x) # The __repr__ of its class
```

The behaviour of `str`, different from invoking `__str__`:
- An instance attribute called `__str__` is ignored
- If no `__str__` attribute is found, uses `repr` string


When we define a class in Python, `__str__` and `__repr__` are both built-in methods for the class.

We can call those methods using the global built-in functions `str(obj)` or `repr(obj)` instead of dot notation, `obj.__repr__()` or `obj.__str__()`.

In addition, the `print()` function calls the `__str__` method of the object and displays the returned string **with the quotations removed**, while simply calling the object in interactive mode in the interpreter calls the `__repr__` method and displays the returned string **with the quotations removed**.
```python
class Rational:

    def __init__(self, numerator, denominator):
        self.numerator = numerator
        self.denominator = denominator

    def __str__(self):
        return str(self.numerator) + '/' + str(self.denominator)

    def __repr__(self):
        return 'Rational' + '(' + str(self.numerator) + ',' + str(self.denominator) + ')'

>>> a = Rational(1, 2)
>>> [str(a), repr(a)]
['1/2', 'Rational(1,2)']
>>> print(a)
1/2
>>> a
Rational(1,2)
```

## Interfaces
`[!!TODO:TODO]` easify this
An _object interface_ is a collection of attributes and conditions on those attributes. Different instances of the same class must have the same object interface.

Inherited attributes and methods share the same name because the base and the subclass both implement the same interface.

For the sake of object abstraction, interfaces should be designed to be robust to all special implementations of the class. That is, however the subclass behaviour differently from the base class, the design should abstract away the implementation details and make the interface achieve the same effect.


**Message Passing**: Objects interact by **looking up attributes** on each other (passing messages)

The attribute look-up rules allow different data types to respond to the same message.
A **shared message** (attribute name) that elicits similar behaviour from different object classes is a powerful method of abstraction.


An interface is **a set of shared messages**, along with a specification of what they mean.

> `__repr__` and `__str__` methods that return Python-interpretable and human-readable strings implement an interface for producing string representations


## Special Methods
In Python, certain _special names_ are invoked by the Python interpreter in special circumstances.

e.g.
- `__init__`: automatically invoked whenever an object is constructed
- `__str__`: invoked when printing
- `__repr__`: invoked in an interactive session to display values
- `__add__`: invoked to add one object to another
- `__float__`: invoked to convert an object to a float

```python
>>> zero, one, two = 0, 1, 2
>>> one.__add__(two)
3 # Same with 1 + 2
>>> zero.__bool__(), one.__bool__()
(False, True) # Same with bool(zero), bool(one)
```
Interfaces can be built for user-defined objects to implement built-in functions and operators, by overriding the special methods.
### Boolean Method for Object
By default, objects of user-defined classes are considered to be true.
`__bool__` method can override this behaviour, by evaluating some conditions to `false` on invoking the method.
```python
>>> Account.__bool__ = lambda self: self.balance != 0
>>> bool(Account('Jack'))
False
>>> if not Account('Jack'):
        print('Jack has nothing')
Jack has nothing
```

### Sequnce Operations
The `len` function invokes the `__len__` method of its argument to determine its length. All built-in sequence types implement this method.
```python
>>> len('Go Bears!')
9
>>> 'Go Bears!'.__len__()
9
```
Python uses a sequence's length to determine its truth value, if it does not provide a `__bool__` method. Empty sequences are `false`, while non-empty sequences are `true`.


The `__getitem__` method is invoked by the element selection operator, but it can also be invoked directly.
```python
>>> 'Go Bears!'[3]
'B'
>>> 'Go Bears!'.__getitem__(3)
'B'
```
### Callable Objects
In Python, functions are first-class objects, so they can be passed around as data and have attributes like any other object.
Python also allows us to define objects that can be "called" like functions by including a `__call__` method.

```python
>>> class Adder(object):
        def __init__(self, n):
            self.n = n
        def __call__(self, k):
            return self.n + k

>>> add_three_obj = Adder(3)
>>> add_three_obj(4)
7
```

### Arithmetic
Special methods can also define the behavior of built-in operators applied to user-defined objects.

e.g. `+` operator
First, Python checks for an `__add__` method on the value of the left operand, then checks for an `__radd__` method on the value of the right operand. If either is found, that method is invoked with the value of the other operand as its argument.


Here's an example of *type dispatching*, where you inspect the type of an argument to decide what implementation to take.
```python
def Rational.__add__(self, other):
    if isinstance(other, int):
        n = self.numer + self.denom * other
        d = self.denom
    elif isinstance(other, Rational):
        n = self.numer * other.denom + self.denom * other * numer
        d = self.denom * other.denom
        g = gcd(n, d)
    elif isinstance(other, float):
        return float(self) + other
    return Rational(n//g, d//g)

Rational.__radd__ = Rational.__add__

def gcd(n, d):
    while n != d:
	    n, d = min(n, d), abs(n-d)
	return n

### OR ###
def gcd(n, d):
    if b == 0:
        return a
    return gcd(b, a % b)

### OR ###
gcd = lambda a, b: (a if b == 0 else gcd(b, a % b))
```

Here's an example of *type coercion*, where the object is converted into another type in order to be able to combine it with some other value.
```python
def Rational.__add__(self, other):
    ...
    elif isinstance(other, float):
        return float(self) + other
    ...

def Rational.__float__(self):
    return self.numer / self.denom
```
## Multiple Representations
https://www.composingprograms.com/pages/27-object-abstraction.html#multiple-representations
## Generic Functions
https://www.composingprograms.com/pages/27-object-abstraction.html#generic-functions
### Type Dispatching
### Type Coercion