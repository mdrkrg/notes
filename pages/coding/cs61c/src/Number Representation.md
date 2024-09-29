---
tags:
- CS
- ComputerStructure
---
Number Representation
===
N bits = at most 2^N things


## Number versus Numeral
Numeral: A symbol or name that stands for a number
- Hex numeral
- Binary numeral
- Roman numeral
- ...

Number: The idea, concept


## Base of Number
### Base 10
### Base 2
Bits `0`, `1`
Representation `0b1101`


### Base 16
Representation `0xFF`

Digits `0,1,2,3,4,5,6,7,8,9,A,B,C,D,E,F` (0-15)
## Converting Bases
### 2 -> 10
$$\begin{align}0\mathrm b ~01101 &= 01101_2\\&=0\times2^4 + 1\times2^3 + 1\times 2^2 + 0\times 2^1 + 1\times 2^0\\&= 8+ 4 + 1\\&=13\end{align}$$
### 16 -> 10
$$\begin{align}0\mathrm x~\mathrm A5 &= \mathrm A5_{16}
\\&= 10 \times 16^1 + 5 \times 16^0
\\&= 160 + 5 
\\&= 165_{10}\end{align}$$
### 10 -> 2
Find the largest power of 2 that can fit into the decimal number.
### 10 -> 16
### 2 -> 16
Just look up the table, **4 bits in a roll**
```
1011 0110
+--+ +--+
 B    6
```
Table:

| D    | H   | B      |
| ---- | --- | ------ |
| `00` | `0` | `0000` |
| `01` | `1` | `0001` |
| `02` | `2` | `0010` |
| `03` | `3` | `0011` |
| `04` | `4` | `0100` |
| `05` | `5` | `0101` |
| `06` | `6` | `0110` |
| `07` | `7` | `0111` |
| `08` | `8` | `1000` |
| `09` | `9` | `1001` |
| `10` | `A` | `1010` |
| `11` | `B` | `1011` |
| `12` | `C` | `1100` |
| `13` | `D` | `1101` |
| `14` | `E` | `1110` |
| `15` | `F` | `1111` |

Fixed space

Overflow

## Bit, Byte, Nibble
- 8 bits
	- 1 Byte
	- 2 hex digits
- 4 bits
	- 1 Nibble
	- 1 hex digit


## Negative Number Representation
### Sign and Magnitude
One sign bit, other magnitude bits

Shortcomings:
- Arithmetic circuit complicated
- Two zeros (+ and -)
	- `0x00000000` = $0_{10}$
	- `0x80000000` = $-0_{10}$
- Incrementationt to bits sometimes increase sometimes decrease

Sign and magnitude are only used in signal processors
### One's Complement
Flip all the bits for negative

e.g.
- $7_{10} = 00111_2$
- $-7_{10} = 11000_{2}$


- Incrementation of bit always increase value (if not overflown)
- Overflow to the opposite `65535` -> `-65535`
- Two Zeros
	- `0x00000000` = $+0_{10}$
	- `0xFFFFFFFF` = $-0_{10}$


### Two's Complement (Standard)
Shift the "negative zero" left by one

- First bit **sign**, others magnitude
	- `0000...` $\ge 0$
	- `1111...` $<0$
	- `1...111` = $-1$

#### Formula
Can represent positive and negative numbers in terms of the bit value times a power of 2:
$$d_{31} \times -(2^{31}) + d_{30} \times 2^{30} + \cdots +  d_1 \times 2^1 + d_0 \times 2^0$$

### Convertion of Negative Numbers (Shortcut)
- Decimal -> Binary
	- Flip the sign
	- Convert to binary as if unsigned, pad the left with 0’s to make n bits
	- Flip all the bits (0->1, 1->0)
	- Add 1 to the binary representation
- Binary -> Decimal 
	- Flip all the bits
	- Add 1 to the binary representation
	- Convert to decimal
	- Flip the sign
#### Range
For $N$ bits:
- $2^{N-1}$ non-negatives $[\,0, 2^{N-1} - 1\,]$
- $2^{N-1}$ negatives $[\,-2^{N-1}, -1\,]$
- 1 zero

Overflow:
- e.g. 15 -> -16

## Overflow
Binary digits are finite.

Cases of overflow:
- Going too high
```
1110 -> 1111 -> 0000
```
- Going too low
```
0001 -> 0000 -> 1111
```
- Fractions

### Bias Notation
To use a $[0, 2^n]$ system to represent negative numbers, we use a bias system:
- Define a bias (usually negative)
- To store a value in binary: subtract the bias, then store the resulting number as an unsigned value
- To interpret a stored binary value: read the data as unsigned value, add the bias

Range: $[\mathrm{bias}, 2^n - 1 + \mathrm{bias}]$

Example:
- For an 8-bit integer, the bias is -127 unless otherwise specified (**Standard Bias**: same amount of negative and non-negatives)
- Formula: $x + b = n$
	- $x$ Binary representation
	- $b$ Bias
	- $n$ Number get represented

> [!example]-
> - Interpret 0b00000001 in bias notation with a bias of -127:
> 	- 0b00000001 = 1 if unsigned
> 	- 1 + (-127) = n
> 	- Add -127 -> -126
> - If we want to represent the number -126
> 	- x + (-127) = -126
> 	- Store 1 as an unsigned integer -> 0b0000 0001

Problem:
- Arithemetic is complicated
	- -127 + 128 = 0b 00000000 + 0b 11111111 = 0b 11111111 = 128