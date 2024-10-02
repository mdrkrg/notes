---
tags:
  - CS61A
---
## Q3
```python
def filter_iter(iterable, f):
    """
    Generates elements of iterable for which f returns True.
    >>> is_even = lambda x: x % 2 == 0
    >>> list(filter_iter(range(5), is_even)) # a list of the values yielded from the call to filter_iter
    [0, 2, 4]
    >>> all_odd = (2*y-1 for y in range(5))
    >>> list(filter_iter(all_odd, is_even))
    []
    >>> naturals = (n for n in range(1, 100))
    >>> s = filter_iter(naturals, is_even)
    >>> next(s)
    2
    >>> next(s)
    4
    """
    "*** YOUR CODE HERE ***"
    itr = iter(iterable)
    while True: # UGLY 
        try:
            tmp = next(itr)
            if f(tmp):
                yield tmp
        except StopIteration:
            return None
```
## Q4
```python
def differences(it):
    """ 
    Yields the differences between successive terms of iterable it.

    >>> d = differences(iter([5, 2, -100, 103]))
    >>> [next(d) for _ in range(3)]
    [-3, -102, 203]
    >>> list(differences([1]))
    []
    """
    "*** YOUR CODE HERE ***"
    itr = iter(it)
    try:
        prev = next(itr)
        while True: # How to prevent this shit?
            curr = next(itr)
            yield curr - prev
            prev = curr
    except StopIteration:
       return None
```
## Q5
```python
def differences(it):
    """ 
    Yields the differences between successive terms of iterable it.

    >>> d = differences(iter([5, 2, -100, 103]))
    >>> [next(d) for _ in range(3)]
    [-3, -102, 203]
    >>> list(differences([1]))
    []
    """
    "*** YOUR CODE HERE ***"
    itr = iter(it)
    try:
        prev = next(itr)
        while True: # How to prevent this shit?
            curr = next(itr)
            yield curr - prev
            prev = curr
    except StopIteration:
       return None

##########
#   Q5   #
##########

def is_prime(n):
    """Returns True if n is a prime number and False otherwise.
    >>> is_prime(2)
    True
    >>> is_prime(16)
    False
    >>> is_prime(521)
    True
    """
    def helper(i):
        if i > (n ** 0.5): # Could replace with i == n
            return True
        elif n % i == 0:
            return False
        return helper(i + 1)
    return helper(2)

def primes_gen(n):
    """Generates primes in decreasing order.
    >>> pg = primes_gen(7)
    >>> list(pg)
    [7, 5, 3, 2]
    """
    "*** YOUR CODE HERE ***"
    for i in range(n, 1, -1):
        if is_prime(i):
            yield i

def primes_gen2(n):
    """Generates primes in decreasing order.
    >>> pg = primes_gen2(7)
    >>> list(pg)
    [7, 5, 3, 2]
    """
    if n < 2:
        return
    if is_prime(n):
        yield n
    yield from primes_gen2(n-1)
```
## Q6
```python
def stair_ways(n):
    """
    Yields all ways to climb a set of N stairs taking
    1 or 2 steps at a time.

    >>> list(stair_ways(0))
    [[]]
    >>> s_w = stair_ways(4)
    >>> sorted([next(s_w) for _ in range(5)])
    [[1, 1, 1, 1], [1, 1, 2], [1, 2, 1], [2, 1, 1], [2, 2]]
    >>> list(s_w) # Ensure you're not yielding extra
    []
    """
    "*** YOUR CODE HERE ***"
    if n == 0:
        return []
    elif n == 1 or n == 2:
        return [n]
    yield from map(lambda x: x + [1], stair_ways(n-1))
    yield from map(lambda x: x + [2], stair_ways(n-2))
```