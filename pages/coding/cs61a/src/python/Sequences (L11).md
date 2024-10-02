---
tags:
  - CS
  - Python
  - CS61A
---
Sequences (L11)
===
Two basic conditions of a sequence:
1. Length
2. Element selection
## Lists
List is a kind of compound value, a container.
```python
>>> list1 = [1, 1, 4, 5, 1, 4]
>>> for i in range(len(list1)): print(list1[i])
1
1
4
5
1
4
```
### Operations
#### Info
```python
>>> len(list1)
6
>>> list1[2], operator.getitem(list1, 2)
2, 2
```
The index of a list is "zero-based", it should be viewed as the offset to zero:
```python
>>> list1[0]
1
>>> list1[-1]
4
>>> list1[-8]
1
```
#### Concatenation and Repetition
```python
>>> [3, 6, 4] + list1
[3, 6, 4, 1, 1, 4, 5, 1, 4]
>>> list1 * 2
[1, 1, 4, 5, 1, 4, 1, 1, 4, 5, 1, 4]
"""
add and mul also works
"""
```
### Nested Lists
```python
>>> nested = [[8, 1, 0], [8, 9, 3]]
>>> nested[1]
[8, 9, 3]
>>> nested[1][2]
0
```
### `in` and `not in`: Membership
```python
>>> a = [1, 3, 5]
>>> 1 in a
True
>>> 3 not in a
False
```
`in` looks for **individual** elements
### Slicing
A _slice_ of a sequence is any contiguous span of the original sequence, designated by a pair of integers.
```python
>>> digits = [1, 8, 2, 8]
>>> digits[0:2]
[1, 8]
>>> digits[1:]
[8, 2, 8]
>>> digits[:]
[1, 8, 2, 8]
>>> digits[1:-1]
[8, 1, 8]
```
### Aggregation
#### `sum(iterable[, start])`
```python
'''
sum(iterable[, start])
Add all elements in ITERABLE to START (default 0)
'''
>>> sum([[1, 2, 3], [4]], [])
[1, 2, 3, 4]
```
#### `max(iterable[, key=func]), min(iterable[, key=func])`
```python
"""
max(iterable[, key=func])
Return the element X in the ITERABLE that makes the return value of KEY(X) largest (default lambda x: x)
"""
```
#### `all(iterable), any(iterable)`
```python
"""
Return True if bool(x) is True for all values x in the iterable.
If the iterable is empty, return True.
"""
```
## `For` Statement
```python
>>> RIM = ["YJSP", "RU", "YMN", "BNKRG", "KNN", "SNNN"]
>>> for i in RIM:
... 	print(i)
... 
YJSP
RU
YMN
BNKRG
KNN
SNNN
```
### Execution Rule
A for statement consists of a single clause with the form:
```python
for <name> in <expression>:
    <suite>
```
A for statement is executed by the following procedure:
1. Evaluate the header `<expression>`, which must yield an iterable value.
2. For each element value in that iterable value, in order:
    1. Bind `<name>` to that value in the current frame.
    2. Execute the `<suite>`.
### Sequence Unpacking
```python
pairs = [[1, 1], [4, 5], [1, 4], [1, 9], [1, 9]]
same = count = 0
>>> for x, y in pairs:
... 	if x == y:
... 		same_count += 1
>>> same_count
1
```
- The sequences in the parent sequence must be in fixed-lengt
- A name for each element in a fixed-length sequence
## Range
A range is a sequence of consecutive integers.
```python
>>> range(-2, 2) # Integers in [-2, 2)
range(-2, 2)
>>> list(range(-2, 2))
[-2, -1, 0, 1]
>>> list(range(4))
[0, 1, 2, 3] # Starting at 0
```
- Length: ending value - starting value
- Element selection: starting value + index

### If you don't want use the name in `for`
```python
>>> for _ in range(3):
... 	print("ok")
ok
ok
ok
```
Use the underline `_` as a blank to indicate that you don't want to use the name.

## Sequence Processing
### List Comprehensions
```python
>>> [x for x in range(5)]
[0, 1, 2, 3, 4]
>>> [x + 1 for x in range(5)]
[1, 2, 3, 4, 5]
>>> [x for x in range(5) if 8 % x == 0]
[1, 2, 4]
```

### HOF
```python
>>> def apply_to_all(map_fn, s):
... 	return [map_fn(x) for x in s]
>>> def keep_if(filter_fn, s):
... 	return [x for x in s if filter_fn(x)]
```
Conventional Names:
```python
apply_to_all = lambda map_fn, sequence: list(map(map_fn, sequence))
keep_if = lambda filter_fn, sequence: list(filter_fn, sequence)
```
#### reduce
```python
>>> def reduce(reduce_fn, sequence, initial):
... 	reduced = initial
... 	for x in sequence:
... 		reduced = reduce_fn(reduced, x)
... 	return reduced
... 
>>> reduce(mul, [2, 4, 8], 1)
64 # 1 * 2 * 4 * 8 
```
recursively apply a function `reduce_fn`
Conventional Name:
```python
>>> from functools import reduce
>>> from operator import mul
>>> def product(s):
... 	return reduce(mul, s)
... 
>>> product([1, 2, 3, 4, 5])
120
```
## String
String also supports length and element selection
```python
>>> city = 'Shanghai'
>>> len(city)
8
>>> city[4]
g
```
Strings can be executed by `exec(string)`
### Membership
`in` matches substrings
```python
>>> 'here' in "Where?"
True
```
### Multiline Literals
Span multilines by triplequote `'''`
```python
>>> """The Zen of Python
... claims, Readability counts.
... Read more: import this."""
'The Zen of Python\nclaims, "Readability counts."\nRead more: import this.'
```
### String Coercion
```python
>>> yjsp = [1, 1, 4, 5, 1, 4]
>>> str(yjsp) + ' yjsp'
'[1, 1, 4, 5, 1, 4] yjsp'
```

### Executing an Expression in the String Format
`eval(expression)`
## Dictionaries
Collections of key-value pairs 
- keys
	- cannot be [[Mutability|mutable type]]
	- two keys cannot be equal
```python
>>> value1, value2 = 1, 2
>>> dic = {'key1': value1, 'key2': value2}
>>> dic['key1']
1
>>> list(dic)
['key1', 'key2']
>>> list(dict.keys())
['key1', 'key2'] # The same
>>> 'key1' in dic
True
>>> dic.values()
dict_value([1, 2]) # It is a iterable value
>>> list(dic.values())
[1, 2]
```
### `dict.get(key[, default])` method
```python
>>> dic.get('key1')
1
>>> dic.get('key3') # Returns nothing
>>> dic.get('key3', 114514) # If the key 'KEY3' doesn't exist, return the next parameter 114514
```
### Dictionary Comprehensions
```python
{<key exp>: <value exp> for <name> in <iter exp>[ if <filter exp>]}
```