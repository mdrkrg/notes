---
tags:
  - CS
  - Python
  - CS61A
---
Control Statements (L3)
===
Statements that control the flow of a program's execution based on the results of logical comparisons.
## Statements
Rather than being evaluated, statements are _executed_. Each statement describes some change to the interpreter state, and executing a statement applies that change.
- assignment
- `def` statement
- `return` statements

## Compound statements
Structure of compound statements
```python
"""********* STATEMENT *********"""
	"""****** CLAUSE ******"""    "
<header>:                    "    "
		"""*** SUITE ***"""  "    "
	<statement>           "  "    "
	<statement>           "  "    "
	...                   "  "    "
		"""^^^ suite ^^^"""  "    "
	"""^^^^^^ clause ^^^^^^"""    "
<separating header>:              "
	<statement>                   "
	<statement>                   "
	...                           "
...                               "
"""********* statement *********"""
```
- `def` statements are compound statements

The first header determines a statement's type.
The header of a clause "controls" the suite that follows.
A suite is a sequense of statements, which is "executed" by executing the sequence of statements by order.
- RULE:
	- Execute the first statement.
	- Unless redirected otherwise, execute the rest.

This rule will be recursively adapted to each statement, i.e. the "rest".
### Within Compound Statements
#### Local Assignment
Assignment statements can appear within a function body.
The effect of an assignment statement is to bind a name to a value in the _first_ frame of the current environment. As a consequence, assignment statements ==within a function body cannot affect the global frame==.

**Functions can only manipulate their local environment.**
#### `return` Statements
A `return` statement redirects control: the process of function application terminates whenever the first `return` statement is executed, and the value of the `return` expression is the returned value of the function being applied.
## Boolean
False values
- `False`
- `0`
	- This part is a little bit tricky, see this:
	- ```python
	def true_or_false(a)
		"""note that A can be an integer!
		>>> true_or_false(114514)
		True!
		>>> true_or_false(True)
		True!
		>>> true_or_false("false")
		True! # This is because "false" is a string, and a string as an conditional statement is always true.
		>>> true_or_false(0)
		False!
		"""
		if a:
			print("True!")
		else:
			print("False!")

- `''`
- `None`
- `[]`
- ...
True values
- Anything else including `True`
### Boolean Operators
```python
<left> and <right> # 111 100 010 000
<left> or <right> # 111 101 011 000
not <expr> # 01 10
```
Boolean Operators are ***short circuit operators***:
#### `and`
1. Evaluate the subexpr `<left>`
2. If the result is a false value `v`, ==then== the expression evaluates to `v`
3. Otherwise, the expression evaluates to `<right>`
#### `or`
1. Evaluate `<left>`
2. If the result is a false value `v`, then the expression evaluates to `v`
3. Otherwise, the expression evaluates to `<right>`

e.g.
```python
>>> 1 and 0/0

>>> False or 9999 or 1/0
9999
```
***
```python
"""is expressions returns boolean values"""
isfinite
isdigit
isinstance
...
```
## `if`
```python
if <expression_1>:
	<suite># do something
elif <expression_2>: # occur zero or more times
	<suite># do something else
else: # occur zero times or once
	<suite># do the rest things
```
1. Evaluate the header's expression.
2. If it is a true value, execute the suite. Then, skip over all subsequent clauses in the conditional statement.

If the `else` clause is reached (which only happens if all `if` and `elif` expressions evaluate to false values), its suite is executed.

Note: Difference between call expressions
![[Trivia about Functions (L2 & L3)#^1]]
Compound statements ==allow some clauses to be skipped==, while call expressions don't.
## `while` Iteration
```python
while <condition>:
	# do something
	"""
	
	the suite will be executed over and over again until the condition turns false.
	"""
```
Rule for While Statements:
1. Evaluate the header's expression.
2. If it's a true value, execute the whole suite, then return to step 1.

How to debug:
![[Tips for debugging (Lab1)#While loops]]
### `while 0` trick
![[Lab01#divisible_by_k#Solution]]
When the `y` is iterated to `0`, then the statement becomes `False`.