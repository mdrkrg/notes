---
tags:
  - CS
  - CPP
  - CS106B
---
Primitive Data Types
===
## Integer Types
Three integer types:
- `short`
	- $2^{15} - 1$
	- 2 Bytes
- `int`
	- Maximum at least $2^{15} - 1$
	- At least 2 Bytes
	- Normally $2^{31} - 1$
	- Normally 4 Bytes
- `long`
	- Maximum at least $2^{31} - 1$
	- At least 4 Bytes


### `unsigned` Keyword
Creates a new data type in which only nonnegative values are allowed.
Can hold twice as many positive values:
- `short`, `int` $2^{15} - 1\,(32767)\to2^{16}-1\,(65535)$
- modern `int`, `long` $2^{31}-1\to2^{32}-1$

Syntax:
```cpp
unsigned short NAME;
unsigned int NAME;
unsigned NAME; // Equivalent to unsigned int
```
### Different Representation
Bases:
- `N` base-10
- `0N` base-8
- `0xN` base-16

Suffix:
- `NL` Specify `N`'s type is `long`
- `NU` Specify `N` is `unsigned`


## Floating-point Types
Numbers that include a decimal fraction are called ***floating-point numbers***, which are used to approximate real numbers in mathematics.
Three floating-point types:
- `float`
- `double`
- `long double`

### Representation
- `2.0`
- `2.9979E+8` $2.9979\times 10^8$
- `3.0E-2` $3.0\times10^{-2}$

## Text Types
See [[Strings and Characters]] for details.

## Boolean Type
Booleans are special integers
- Takes up **1 byte**
- Value `true` or `false` (`1` or `0`)


## \*Enumeration Type
**Enumeration types** list the elements that constitute their domains.

Syntax:
```cpp
enum NAME {ELEMENT_LIST};
```
- `ELEMENT_LIST` A list of identifiers called ***enumeration constants***
- `name` The name of the **new type**

Using the newly created type:
```cpp
NAME var;
```
- Declares `var` to **be the type of** `NAME`
- `var` can take on any of the values in the `ELEMENT_LIST`

### Internal Representation
The values of an enumeration type are **stored internally as integers**.
Unless given the initial index, the compiler ordinarily **assigns consecutive integers** to the enumeration constants, **starting with the integer 0** (0, 1, 2, ...).
```cpp
enum directionT { North, East, South, West };
// Now North = 0, East = 1, etc.
```
To control the encoding:
```cpp
enum coinT {
  Penny = 1,
  Nickel = 5,
  Dime = 10,
  Quarter = 25,
  HalfDollar = 50
};
```
If the value of any enumeration constant is not specified, the compiler simply **adds one to the value** of the previous constant.
```cpp
enum monthT {
  January = 1, February, March, April, May, June,
  July, August, September, October, November, December
};

// The same effect as
const int JANUARY = 1;
...
```

Benefits:
- Separate type name are more easily readable
- Variables of enum type cannot be assigned integer values without typecast, preventing range outage
- Easier to debug with names rather than just integers

### Scalar Types
A data type that can represent a single value.
In C++, **enumeration types, characters and the various representation of integers** are scalar types, and are **converted into integers automatically** as values.

Example:
```cpp
string DirectionName(directionT dir) {
  switch (dir) {
    case North: return "North";
    case East:  return "East";
    case South: return "South";
    case West:  return "West";
    default:    Error("Illegal direction value");
  }
}
```
## Pointers and Arrays
See [[Memory and Pointers]] and [[CS106B/Arrays]]

