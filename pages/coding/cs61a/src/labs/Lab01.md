---
tags:
  - CS61A
---
## falling
```python
def falling(n, k):
    """Compute the falling factorial of n to depth k.

    >>> falling(6, 3)  # 6 * 5 * 4
    120
    >>> falling(4, 3)  # 4 * 3 * 2
    24
    >>> falling(4, 1)  # 4
    4
    >>> falling(4, 0)
    1
    """
    "*** YOUR CODE HERE ***"
    m = 1
    for x in range(n, n - k, -1):
        m = m * x
    return m
```
### Solution
```python
from operator import mul
from functools import reduce
def falling(n, k):
    if k == 0:
        return 1
    return reduce(mul, range(n, n-k, -1))
```
## divisible_by_k
```python
def sum_digits(y):
    """Sum all the digits of y.

    >>> sum_digits(10) # 1 + 0 = 1
    1
    >>> sum_digits(4224) # 4 + 2 + 2 + 4 = 12
    12
    >>> sum_digits(1234567890)
    45
    >>> a = sum_digits(123) # make sure that you are using return rather than print
    >>> a
    6
    """
    "*** YOUR CODE HERE ***"
    tens = 1
    digit_sum = 0
    while y // tens != 0:
        digit_sum += ( y % ( tens * 10 ) ) // tens
        tens = tens * 10
    return digit_sum
```
### Solution
```python
def sum_digits(y):
    ans = 0
    while y:
        ans += y % 10
        y //= 10
    return ans
```
## double_eights
```python
def double_eights(n):
    """Return true if n has two eights in a row.
    >>> double_eights(8)
    False
    >>> double_eights(88)
    True
    >>> double_eights(2882)
    True
    >>> double_eights(880088)
    True
    >>> double_eights(12345)
    False
    >>> double_eights(80808080)
    False
    """
    "*** YOUR CODE HERE ***"
    tens = 1
    temp = 0
    while n // tens !=0:
        temp = ( n % ( tens * 10) ) // tens
        tens = tens * 10
        if temp == 8:
            temp = ( n % ( tens * 10) ) // tens
            tens = tens * 10
            if temp == 8:
                return True
    return False
```
### Solution
```python
def double_eights(n):
    if n // 10 == 0:
        return False
    while n:
        last = n % 10
        n //= 10
        if last == 8 == (n % 10):
            return True
    return False
```