---
tags:
  - CS
  - Python
  - CS61A
---
Tips for debugging (Lab1)
===
https://inst.eecs.berkeley.edu/~cs61a/fa23/lab/lab01/

https://inst.eecs.berkeley.edu/~cs61a/fa23/articles/debugging/

https://www.composingprograms.com/pages/15-control.html

## Traceback Messages
```
File "<file name>", line <number>, in <function>
```
The traceback is organized with the "most recent call last."
### Error Messages
```
<error type>: <error message>
```
## Doctest
![[Trivia about Functions (L2 & L3)#docstring and doctest]]
1. Write some tests before you write code
2. Write more tests after you write code
3. Test edge cases
### Interactively Running Doctests 
Also can be used in python interactive mode.
```bash
$ python3 -i test.py
```
```python
>>> from doctest import testmod
>>> testmod()
TestResults(failed=0, attempted=12)
>>> from doctest import run_docstring_examples
>>> run_docstring_examples(sum_naturals, globals(), True) # (function_name, globals() returns the global env, whether to verbose output)
Finding tests in NoName
Trying:
    sum_naturals(10)
Expecting:
    55
ok
Trying:
    sum_naturals(100)
Expecting:
    5050
ok
```
A test that applies a single function is called a _unit test_.
## Debug print
### Normal case
Just add this if you want to check a certain value at a certain point of execution.
```python
print('DEBUG: foo was this:', foo)
```
### While loops
In While loops: debug print shows the times it has looped
```python
i = 0
while i < n:
    i += func(i)
    print('DEBUG: i is', i)
```
## `assert` statements
Python has a feature known as an `assert` statement, which lets you test that a condition is true, and print an error message otherwise in a single line.
```python
>>> assert 4 > 3, 'This will never be displayed'
>>> assert 2 > 3, 'There\'s an error'
...
AssertionError: There's an error
```
This is useful if you know that certain conditions need to be true at certain points in your program.
```python
def double(x):
    assert isinstance(x, int), "The input to double(x) must be an integer"
    return 2 * x
```
**Crashes are better than running errors!** Having asserts in your code makes it far more likely that your code will crash if it has a bug in it.

Also test the extreme conditions.
```python
"""fib_test.py
After the fib.py file.
"""
def fib_test():
	assert fib(2) == 1, 'The 2nd Fibonacci number should be 1'
	assert fib(3) == 1, 'The 3rd Fibonacci number should be 1'
	assert fib(50) == 7778742049, 'Error at the 50th Fibonacci number'
```