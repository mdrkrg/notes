---
tags:
  - CS61A
---
## Q1
```python
def make_rat(num, den):
    """Creates a rational number, given a numerator and denominator.

    >>> a = make_rat(2, 4)
    >>> numer(a)
    1
    >>> denom(a)
    2
    """
    "*** YOUR CODE HERE ***"
    d = gcd(num, den)
    return [num // d, den // d]

def numer(rat):
    """Extracts the numerator from a rational number."""
    "*** YOUR CODE HERE ***"
    return rat[0]

def denom(rat):
    """Extracts the denominator from a rational number."""
    "*** YOUR CODE HERE ***"
    return rat[1]
```

## Q2
```python
def div_rat(x, y):
    """The quotient of rationals x/y.
    >>> a, b = make_rat(3, 4), make_rat(5, 3)
    >>> c = div_rat(a, b)
    >>> numer(c)
    9
    >>> denom(c)
    20
    """
    "*** YOUR CODE HERE ***"
    numDiv = numer(x) * denom(y)
    denDiv = numer(y) * denom(x)
    return make_rat(numDiv, denDiv)
```
## Q3
```python
from operator import add, sub
def add_rat(x, y, oper=add):
    """Return rational add or sub."""
    numAdd = oper(numer(x) * denom(y), numer(y) * denom(x))
    denAdd = denom(x) * denom(y)
    return make_rat(numAdd, denAdd)

def lt_rat(x, y):
    """Returns True iff x < y as rational numbers; else False.
    >>> a, b = make_rat(6, 7), make_rat(12, 16)
    >>> lt_rat(a, b)
    False
    >>> lt_rat(b, a)
    True
    >>> lt_rat(a, b)
    False
    >>> a, b = make_rat(-6, 7), make_rat(-12, 16)
    >>> lt_rat(a, b)
    True
    >>> lt_rat(b, a)
    False
    >>> lt_rat(a, a)
    False
    """
    "*** YOUR CODE HERE ***"
    result = add_rat(x, y, sub)
    if numer(result) * denom(result) < 0:
        return True
    else:
        return False
```

## Q5
Include those [[Tree ADT]]
```python
def height(t):
    """Return the height of a tree.
    >>> t = tree(3, [tree(5, [tree(1)]), tree(2)])
    >>> height(t)
    2
    >>> t = tree(3, [tree(1), tree(2, [tree(5, [tree(6)]), tree(1)])])
    >>> height(t)
    3
    """
    "*** YOUR CODE HERE ***"
    if is_leaf(t):
        return 0 # :/, but the test string says so
    return 1 + max([height(branch) for branch in branches(t)])
```


## Q6 (Remain)
### Q6: Find Path

Write a function `find_path` that takes in a tree `t` with unique labels and a value `x`. It returns a list containing the labels of the nodes along the path from the root of `t` to the node labeled `x`.

If `x` is not a label in `t`, return `None`. Assume that the labels of `t` are unique.

For the following tree, `find_path(t, 5)` should return `[2, 7, 6, 5]`.

![Example Tree](https://inst.eecs.berkeley.edu/~cs61a/fa23/disc/disc05/assets/find_path.png)
```python
def find_path(t, x):
"""
>>> t = tree(2, [tree(7, [tree(3), tree(6, [tree(5), tree(11)])] ), tree(15)])
>>> find_path(t, 5)
[2, 7, 6, 5]
>>> find_path(t, 10) # returns None
"""
if _____________________________:
return _____________________________
_____________________________:
path = ______________________
if _____________________________:
return _____________________________
```
## Q7
```python
def sprout_leaves(t, leaves):
    """Sprout new leaves containing the data in leaves at each leaf in
    the original tree t and return the resulting tree.
    >>> t1 = tree(1, [tree(2), tree(3)])
    >>> print_tree(t1)
    1
      2
      3
    >>> new1 = sprout_leaves(t1, [4, 5])
    >>> print_tree(new1)
    1
      2
        4
        5
      3
        4
        5

    >>> t2 = tree(1, [tree(2, [tree(3)])])
    >>> print_tree(t2)
    1
      2
        3
    >>> new2 = sprout_leaves(t2, [6, 1, 2])
    >>> print_tree(new2)
    1
      2
        3
          6
          1
          2
    """
    "*** YOUR CODE HERE ***"
    if is_leaf(t):
        return tree(label(t), leaves)
    else:
        return tree(label(t), [sprout_leaves(branch, leaves) for branch in branches(t)])
```
## Q8 (remain)
### Q8: Perfectly Balanced

**Part A:** Implement `sum_tree`, which returns the sum of all the labels in tree `t`.

**Part B:** Implement `balanced`, which returns whether every branch of `t` has the same total sum and that the branches themselves are also balanced.

![Example Tree](https://inst.eecs.berkeley.edu/~cs61a/fa23/disc/disc05/assets/just-balanced.JPG)

- For example, the tree above is balanced because each branch has the same total sum, and each branch is also itself balanced.

> **Hint:** If we ever need to select a specific branch, we will need to break index into our branches list!
> 
> **Challenge:** Solve both of these parts with just 1 line of code each.


```python
def sum_tree(t):
"""
Add all elements in a tree.
>>> t = tree(4, [tree(2, [tree(3)]), tree(6)])
>>> sum_tree(t)
15
"""
"*** YOUR CODE HERE ***"
```
```python
def balanced(t):
"""
Checks if each branch has same sum of all elements and
if each branch is balanced.
>>> t = tree(1, [tree(3), tree(1, [tree(2)]), tree(1, [tree(1), tree(1)])])
>>> balanced(t)
True
>>> t = tree(1, [t, tree(1)])
>>> balanced(t)
False
>>> t = tree(1, [tree(4), tree(1, [tree(2), tree(1)]), tree(1, [tree(3)])])
>>> balanced(t)
False
"""
"*** YOUR CODE HERE ***"
```