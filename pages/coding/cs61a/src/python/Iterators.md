---
tags:
  - CS
  - Python
  - CS61A
---
Iterators
===
## Implicit Sequences
Rather than store every element in the memory, `range` computes values on demand.
In computer science, _lazy computation_ describes any program that delays the computation of a value until that value is needed.

## Iterators
An _iterator_ is an object that provides sequential access to values, one by one.
- retrieving the next element in the sequence being processed
- signaling that the end of the sequence has been reached and no further elements remain

The underlying series of data for an iterator may not be represented explicitly in memory. when the next element is requested from an iterator, that element may be computed on demand instead of being retrieved from an existing memory source.
### `iter` and `next`
- `iter(iterable)` Return an iterator over the elements of an iterable value
- `next(iterator)` Return the next element in an iterator

```python
>>> primes = [2, 3, 5, 7]
>>> type(primes)
>>> iterator = iter(primes)
>>> type(iterator)
>>> next(iterator)
2
>>> next(iterator)
3
>>> next(iterator)
5
```
### `StopIteration` Exception
```python
>>> next(iterator)
7
>>> next(iterator)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
>>> try:
        next(iterator)
    except StopIteration:
        print('No more values')
No more values
```

### Remainings
When a `next` is executed, the iterator has a pointer moved to the next element on the iteratable value, and never goes back.
```python
>>> s = [1, 1, 4]
>>> t = iter(s)
>>> next(t)
1
>>> list(t)
[1, 4]
>>> next(t)
Traceback (most recent call last):
  File "<stdin>", line 1, in <module>
StopIteration
```

### Multiple Iterators
Two separate iterators can track two different positions in the same sequence.
Calling `iter` on an iterator will return that iterator, not a copy.
## Iterating on Dictionaries
All iterable
- `dict` `<class dict>`
- `dict.keys()` `<class dict_keys>`
- `dict.values()` `<class dict_values>`
- `dict.items()` `<class dict_items>`
	- Tuples of key-value pair
### Changing a Dictionary during Iteration
- Can do
	- Change keys
	- Change values
	- Change items
- CANNOT do
	- Change size
## Built-in Iterators
All of them are lazy, only calculating the value (evaluating the body) on demand.
They all return objects rather than a list or something else
### `map(func, iterable)`
Iterate over `func(x)` for `x` in `iterable`
### `filter(func, iterable)`
Iterate over `x` in `iterable` if `func(x)`
### `zip(first_iter, second_iter[, ...])`
Iterate over co-indexed `(x, y)` pairs
### `reversed(sequence)`
Iterate over `x` in a `sequence` in an reverse order

## Viewing Iterators
Run the iteration until the end, and return the value.
These create a new instance of the iterable.
- `list(iterable)`
- `tuple(iterable)`
- `sorted(iterable)`
## `for` Operates on Iterators
Objects are _iterable_ (an interface) if they have an `__iter__` method that returns an _iterator_.
```python
for <name> in <expression>:
    <suite>
```
1. To execute a for statement, Python evaluates the header `<expression>`, which must yield an iterable value.
2. Then, the `__iter__` method is invoked on that value.
3. Until a `StopIteration` exception is raised, Python repeatedly invokes the `__next__` method on that iterator and binds the result to the `<name>` in the for statement.
4. Then, it executes the `<suite>`.

Some trivia: [[CS61A/Labs/Lab06#Q6]]

Alike, if an element got passed in an iterator, a `for` statment will not deal with that element.
```python
>>> ri = iter(range(3))
>>> next(ri)
0
>>> for i in ri:
... 	print(i)
... 
1
2
```

## Using Iterators
An iterator bundles together a sequence and a position within that sequence as one object
- Passing that object to another function always retains the position
- Useful for ensuring that each element of a sequence is processed only once
- Limits the operations that can be performed on the sequence to only requesting `next`