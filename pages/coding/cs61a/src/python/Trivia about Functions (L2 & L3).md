---
tags:
  - CS
  - Python
  - CS61A
---
Trivia about Functions (L2 & L3)
===
> Functions are abstractions.

## Behaviours and Usage
The body of a function is not executed until the function is called (not when it is defined).

- Calling a function ^1
	1. Evaluate the operator and all the operands to get the arguments
	2. Applying the function to the arguments

The "Return value" in the square() frame is not a name binding; instead it indicates the value returned by the function call that created the frame.

In other words, a function definition should be able to suppress details. The users of the function may not have written the function themselves, but may have obtained it from another programmer as a "black box". A programmer should not need to know how the function is implemented in order to use it.

Three core attributes of a function
- The _domain_ of a function is the set of arguments it can take.
- The _range_ of a function is the set of values it can return.
- The _intent_ of a function is the relationship it computes between inputs and output (as well as any side effects it might generate).

## Designing Functions
- Each function should have exactly one job. That job should be identifiable with a short name and characterizable in a single line of text. Functions that perform multiple jobs in sequence should be divided into multiple functions.
- _Don't repeat yourself_ is a central tenet of software engineering. The so-called DRY principle states that multiple fragments of code should not describe redundant logic. Instead, that logic should be implemented once, given a name, and applied multiple times. If you find yourself copying and pasting a block of code, you have probably found an opportunity for functional abstraction.
- Functions should be defined generally. Squaring is not in the Python Library precisely because it is a special case of the pow function, which raises numbers to arbitrary powers.
## docstring and doctest
```python
from operators import floordiv, mod
def divide_exact(n, d):
	"""Here is a brief description on what this function does and how it behaves.
	Below are what is called doctest, which can be executed by running the following in the commandline:
	$ python3 -m doctest ${file}.py
	When the test result is exactly the same with what mentioned below, shell will return 0 exit code (nothing happens). If it's the opposite, there'll be an error infomation.
	*** BEGINS DOCTEST ***
	
	>>> q, r = divide_exact(2013, 10)
	>>> q
	201
	>>> r
	2
	"""
	return floordiv(n, d), mod(n, d) # There can be multiple return values in Python.
```
- `-m <module>` means running a `.py` file with the module `<module>`.
- You can also get a view of the successful doctest by executing`python3 -m doctest -v foo.py`
## Default value of a function
You can bound a default value to a formal parameter in the Def statement using the followings:
```python
def function(p_1=1, p_2=2)
	"""If there's no input, P_1 would be bounded to 1 and P_2 would be bounded to 2.
	
	>>> k = function()
	>>> k
	3
	"""
	return p_1 + p_2
```
As a guideline, most data values used in a function's body should be expressed as default values to named arguments, so that they are easy to inspect and can be changed by the function caller. Some values that never change, such as the fundamental constant k, can be bound in the function body or in the global frame.