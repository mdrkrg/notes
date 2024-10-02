---
tags:
  - CS61A
---
## Q2
```python
def floor_div(args):
    # BEGIN SOLUTION Q2
    if args.rest is nil:
        return args.first
    else:
        return args.first // multiplication(args.rest)

def addition(args):
    if args.rest is nil:
        return calc_eval(args.first)
    else:
        return calc_eval(args.first) + addition(args.rest)

def subtraction(args):
    if args.rest is nil:
        return 0 - calc_eval(args.first)
    else:
        return calc_eval(args.first) - addition(args.rest)


def multiplication(args):
    if args.rest is nil:
        return calc_eval(args.first)
    else:
        return calc_eval(args.first) * multiplication(args.rest)


def division(args): # Maybe I should raise exceptions but not here
    if args.rest is nil:
        return 1 / calc_eval(args.first)
    else:
        return calc_eval(args.first) / multiplication(args.rest)
```
## Q3
```python
def eval_and(expressions):
    if expressions is nil:
        return True
    elif expressions.rest is nil:
        return calc_eval(expressions.first)
    elif type(calc_eval(expressions.first)) is int:
        return True and eval_and(expressions.rest)
    else:
        return calc_eval(expressions.first) and eval_and(expressions.rest)
```

## Q4
Problems lies here, the following code could not handle expressions in the defining procedure. Also, I didn't figure out the best way to bind a procedure, and made a really really bad implementation.
```python
def eval_define(expressions):
    """
    >>> eval_define(Pair("a", Pair(1, nil)))
    'a'
    >>> eval_define(Pair("b", Pair(3, nil)))
    'b'
    >>> eval_define(Pair("c", Pair("a", nil)))
    'c'
    >>> calc_eval("c")
    1
    >>> calc_eval(Pair("define", Pair("d", Pair("//", nil))))
    'd'
    >>> calc_eval(Pair("d", Pair(4, Pair(2, nil))))
    2
    """
    # BEGIN SOLUTION Q4 
    # This is really really bad, cannot bind the evaluated results of expressions
    # breaks abstraction barrier
    if expressions.rest.first in bindings:
        bindings[expressions.first] = calc_eval(expressions.rest.first)
    else:
        bindings[expressions.first] = expressions.rest.first
    return expressions.first
```
I also changed the implementation of `calc_eval`, which is actually cheating that breaks the abstraction barrier of `calc_eval`. I'm adding special cases.
```python
def calc_eval(exp):
    """
    >>> calc_eval(Pair("define", Pair("a", Pair(1, nil))))
    'a'
    >>> calc_eval("a")
    1
    >>> calc_eval(Pair("+", Pair(1, Pair(2, nil))))
    3
    """
    if isinstance(exp, Pair):
        operator = exp.first # UPDATE THIS FOR Q2
        operands = exp.rest # UPDATE THIS FOR Q2
        if operator == 'and': # and expressions
            return eval_and(operands)
        elif operator == 'define': # define expressions
            return eval_define(operands)
        else: # Call expressions
            if operator in OPERATORS:
                return calc_apply(OPERATORS[operator], operands)
            else:
                # print("DEBUG", calc_eval(operator))
                # Really really bad code happening here
                return calc_eval(Pair(calc_eval(operator), operands)) # UPDATE THIS FOR Q2
    elif exp in OPERATORS:   # Looking up procedures
        return OPERATORS[exp]
    elif isinstance(exp, int) or isinstance(exp, bool):   # Numbers and booleans
        return exp
    elif exp in bindings: # CHANGE THIS CONDITION FOR Q4
        return bindings[exp] # UPDATE THIS FOR Q4
```
### Solution
The answer is simple. (Though still cannot handle expressions)
In `calc_eval`:
```python
...
        else: # Call expressions
            return calc_apply(calc_eval(operator), operands.map(calc_eval)) # UPDATE THIS FOR Q2
...
```
In `eval_define`, things are just basically the same:
```python
def eval_define(expressions):
    symbol = expressions.first
    value = expressions.rest.first
    if value in bindings:
        bindings[symbol] = bindings[value]
    else:
        bindings[symbol] = value
    return symbol
```
## Part of All Code
```python
def calc_eval(exp):
    """
    >>> calc_eval(Pair("define", Pair("a", Pair(1, nil))))
    'a'
    >>> calc_eval("a")
    1
    >>> calc_eval(Pair("+", Pair(1, Pair(2, nil))))
    3
    """
    if isinstance(exp, Pair):
        operator = exp.first # UPDATE THIS FOR Q2
        operands = exp.rest # UPDATE THIS FOR Q2
        if operator == 'and': # and expressions
            return eval_and(operands)
        elif operator == 'define': # define expressions
            return eval_define(operands)
        else: # Call expressions
            if operator in OPERATORS:
                return calc_apply(OPERATORS[operator], operands)
            else:
                # print("DEBUG", calc_eval(operator))
                # Really really bad code happening here
                return calc_eval(Pair(calc_eval(operator), operands)) # UPDATE THIS FOR Q2
    elif exp in OPERATORS:   # Looking up procedures
        return OPERATORS[exp]
    elif isinstance(exp, int) or isinstance(exp, bool):   # Numbers and booleans
        return exp
    elif exp in bindings: # CHANGE THIS CONDITION FOR Q4
        return bindings[exp] # UPDATE THIS FOR Q4

def calc_apply(op, args):
    return op(args)

def floor_div(args):
    """
    >>> floor_div(Pair(100, Pair(10, nil)))
    10
    >>> floor_div(Pair(5, Pair(3, nil)))
    1
    >>> floor_div(Pair(1, Pair(1, nil)))
    1
    >>> floor_div(Pair(5, Pair(2, nil)))
    2
    >>> floor_div(Pair(23, Pair(2, Pair(5, nil))))
    2
    >>> calc_eval(Pair("//", Pair(4, Pair(2, nil))))
    2
    >>> calc_eval(Pair("//", Pair(100, Pair(2, Pair(2, Pair(2, Pair(2, Pair(2, nil))))))))
    3
    >>> calc_eval(Pair("//", Pair(100, Pair(Pair("+", Pair(2, Pair(3, nil))), nil))))
    20
    """
    # BEGIN SOLUTION Q2
    if args.rest is nil:
        return args.first
    else:
        return args.first // multiplication(args.rest)

def addition(args):
    if args.rest is nil:
        return calc_eval(args.first)
    else:
        return calc_eval(args.first) + addition(args.rest)

def subtraction(args):
    if args.rest is nil:
        return 0 - calc_eval(args.first)
    else:
        return calc_eval(args.first) - addition(args.rest)


def multiplication(args):
    if args.rest is nil:
        return calc_eval(args.first)
    else:
        return calc_eval(args.first) * multiplication(args.rest)


def division(args): # Maybe I should raise exceptions but not here
    if args.rest is nil:
        return 1 / calc_eval(args.first)
    else:
        return calc_eval(args.first) / multiplication(args.rest)

scheme_t = True   # Scheme's #t
scheme_f = False  # Scheme's #f

def eval_and(expressions):
    """
    >>> calc_eval(Pair("and", Pair(1, nil)))
    1
    >>> calc_eval(Pair("and", Pair(False, Pair("1", nil))))
    False
    >>> calc_eval(Pair("and", Pair(1, Pair(Pair("//", Pair(5, Pair(2, nil))), nil))))
    2
    >>> calc_eval(Pair("and", Pair(Pair('+', Pair(1, Pair(1, nil))), Pair(3, nil))))
    3
    >>> calc_eval(Pair("and", Pair(Pair('-', Pair(1, Pair(0, nil))), Pair(Pair('/', Pair(5, Pair(2, nil))), nil))))
    2.5
    >>> calc_eval(Pair("and", Pair(0, Pair(1, nil))))
    1
    >>> calc_eval(Pair("and", nil))
    True
    """
    # BEGIN SOLUTION Q3
    if expressions is nil:
        return True
    elif expressions.rest is nil:
        return calc_eval(expressions.first)
    elif type(calc_eval(expressions.first)) is int:
        return True and eval_and(expressions.rest)
    else:
        return calc_eval(expressions.first) and eval_and(expressions.rest)

bindings = {}

def eval_define(expressions):
    """
    >>> eval_define(Pair("a", Pair(1, nil)))
    'a'
    >>> eval_define(Pair("b", Pair(3, nil)))
    'b'
    >>> eval_define(Pair("c", Pair("a", nil)))
    'c'
    >>> calc_eval("c")
    1
    >>> calc_eval(Pair("define", Pair("d", Pair("//", nil))))
    'd'
    >>> calc_eval(Pair("d", Pair(4, Pair(2, nil))))
    2
    """
    # BEGIN SOLUTION Q4 
    # This is really really bad, cannot bind the evaluated results of expressions
    # breaks abstraction barrier
    if expressions.rest.first in bindings:
        bindings[expressions.first] = calc_eval(expressions.rest.first)
    else:
        bindings[expressions.first] = expressions.rest.first
    return expressions.first

OPERATORS = { "//": floor_div, "+": addition, "-": subtraction, "*": multiplication, "/": division }
```