---
tags:
  - CS61A
---
## Q2
```python
def wears_jacket_with_if(temp, raining):
	"""
 	>>> wears_jacket_with_if(90, False)
	False
	>>> wears_jacket_with_if(40, False)
	True
	>>> wears_jacket_with_if(100, True)
	True
	"""
	"*** YOUR CODE HERE ***"
	if temp <= 60 or raining:
			return True
		return False
```
## Q3
```python
def nearest_ten(n):
    """
    >>> nearest_ten(0)
    0
    >>> nearest_ten(4)
    0
    >>> nearest_ten(5)
    10
    >>> nearest_ten(61)
    60
    >>> nearest_ten(2023)
    2020
    """
    "*** YOUR CODE HERE ***"
    if n % 10 < 5:
        return n // 10 * 10
    return n // 10 * 10 + 10
```
## Q5
```python
def mod_x(input, x):
    if input % x == 0:
        return True
    return False

def fizzbuzz(n):
    """
    >>> result = fizzbuzz(16)
    1
    2
    fizz
    4
    buzz
    fizz
    7
    8
    fizz
    buzz
    11
    fizz
    13
    14
    fizzbuzz
    16
    >>> print(result)
    None
    """
    "*** YOUR CODE HERE ***"
    i = 1
    while i <= n:
        if mod_x(i, 3) and mod_x(i, 5):
            print("fizzbuzz")
        elif mod_x(i, 3):
            print("fizz")
        elif mod_x(i, 5):
            print("buzz")
        else:
            print(i)
        i += 1
```
## Q6
```python
def is_prime(n):
    """
    >>> is_prime(10)
    False
    >>> is_prime(7)
    True
    >>> is_prime(1) # one is not a prime number!!
    False
    """
    "*** YOUR CODE HERE ***"
    if n == 1: return False
    for y in range(2,n):
        if n % y == 0:
            return False
    return True
```
## Q7
```python
def unique_digits(n):
    """Return the number of unique digits in positive integer n.

    >>> unique_digits(8675309) # All are unique
    7
    >>> unique_digits(13173131) # 1, 3, and 7
    3
    >>> unique_digits(101) # 0 and 1
    2
    """
    "*** YOUR CODE HERE ***"
    num = 0
    while n:
        digit = n % 10
        n //= 10
        if not(has_digit(n, digit)):
            num += 1
    return num
def has_digit(n, k):
    """Returns whether k is a digit in n.

    >>> has_digit(10, 1)
    True
    >>> has_digit(12, 7)
    False
    """
    assert k >= 0 and k < 10
    "*** YOUR CODE HERE ***"
    while n:
        if n % 10 == k:
            return True
        n //= 10
    return False
```
