---
tags:
- CS
- ComputerStructure
---
Floating Points
===
## Scientific Notation in Binary
Base 10: Normalized scientific notation
- Normalized notation has exactly one non-zero digit before the point
- $0.000000009 = 9.0 \times 10^{-9}$

Base 2
- Normalized scientific notation always starts with a 1
- $0.000000101_2 = 1.01_2\times 2^{-7}$

## IEEE 754 Floating Point Standard
- Standard for denoting rational values in 32 bits
	- **Single-precision** standard
	- `float`s in C

```
Bit Number   31 30        23 22                  0
          ________________________________________
  Value  | Sgn |  Exponent  |     Significand     |
          ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾
  Width   1 bit    8 bits           23 bits  
```

### Type of Value

| Exponent Field | Significand Field |       Object        |
| :------------: | :---------------: | :-----------------: |
|       0        |     all zeros     |       ± Zero        |
|       0        |      nonzero      | Denormalized Number |
|   \[1, 254\]   |     anything      |  Normalized Number  |
|      255       |     all zeros     |     ± Infinity      |
|      255       |      nonzero      |         NaN         |
### Normalized Number
#### Sign Bit
$$\color{red}\pm\color{black} 1.001011_2 \times 2^{-11001_2}$$
- 0 - positive
- 1 - negative

#### Exponent Field
$$\pm 1.001011_2 \times 2^{\color{red}-11001\color{black}_2}$$
- In [[Number Representation#Bias Notation|bias notation]] with a **-127** bias
	- Exponent value = exponent field - 127
- Makes numbers with the same sign easily sortable
	- Between two floats with the same sign, integer comparison just works

#### Significand Field (Mantissa)
$$\pm 1.\color{red}001011\color{black}_2 \times 2^{-11001_2}$$
- Represents everything **after the decimal point** in binary format
	- Significand valud = significand field + 1
#### Equation
$$\rm Value = (-1)^{S} \times (1 + M) \times 2^{(E - 127)}$$

### Zero
2 zeros in the standard:
- `0 0000 0000 0000 0000 0000 0000 0000 000` = +0
- `1 0000 0000 0000 0000 0000 0000 0000 000` = -0`

Signed Zeroes usage
- $1 / -0 = -\infty$
- $1 / -0 = +\infty$

### Overflow, Underflow
Range of normalized numbers
- Largest magnitude
	- `s 1111 1110 111...111`
	- $\pm 1.1\cdots1_2\times 2^{(254 - 127)}\approx 3.4\times 10^{38}$
- Smallest magnitude
	- `s 0000 0001 000...000`
	- $\pm 1.0\cdots0_2\times 2^{(1 - 127)}\approx 1.2\times 10^{-38}$

Anything outside of this range is called overflow or underflow.
```
overflow|          |  underflow  |          |overflow
<———————|————//————|——————|——————|————//————|———————>
        ^          ^      0      ^          ^
    -3.4e38    -1.2e-38       1.2e-38    3.4e38
```

### Infinity (Coping with Overflow)
Dividing by zero should be infinity
- Comparing with infinity is valid
	- For example, one would expect that x/0 > y for finite y

2 infinities:
- `0 1111 1111 0000 0000 0000 0000 0000 000` = +∞
- `1 1111 1111 0000 0000 0000 0000 0000 000` = -∞

### Denormalized Numbers (Coping with Underflow)
$$\pm 0.001011\times 2^{-126}$$
- No implied leading 1
- Exponent is the same for all denormalized numbers — -126

Range and compare
- 2nd smallest normal
	-  `0 0000 0001 000...001` =  $2^{-126} + 2^{-149}$
- Smallest normal
	-  `0 0000 0001 000...000` =  $2^{-126}$
- Largest denorm
	- `0 0000 0000 111...111` = $2^{-126} - 2^{-149}$
- 2nd smallest denorm
	- `0 0000 0000 000...010` = $2^{-148}$
- Smallest denorm
	- `0 0000 0000 000...001` = $2^{-149}$


### NaN (Coping with Bad Math)
Bad math results are NaN (Not a Number):
- `sqrt(-4.0)` = NaN
- `0.0/0.0` = NaN

Represenation
- `0 1111 1111 0000 0000 0000 0000 0000 001` = NaN
- Contaminate other math operations
	- NaN + 1 = NaN

### Step Size
The step size of a floating point number is the difference between it and the next smallest FP number.
- Consequence of limited significand bits

Calculation: Value of the LSB of the significand
- Normalized numbers: Step = $2^{(\mathrm E - 127 -23)}$
- Denorm numbers: Step = $2^{(-126-23)}$

## IEEE 754 and Other
- doubles (Double Precision)
	- 64 bit floating point numbers — 1/11/52
	- Exponent bias = -1023
- Quad Precision
	- 128-bit floating point numbers — 1/15/112
- Oct Precision
	- 256 bit floating numbers — 1/19/236
- Half Precision
	- 16 bit floating point numbers:
		- IEEE 754: 1/5/10
		- Google: “bfloat”: 1/8/7
			- Used for making ML faster

## Examples
### Understanding the Significand
#### 1. Fractions
Compare:
$$0.340_{10} = 340_{10} / 1000_{10} = 34_{10}/100_{10}$$
$$\begin{align}0.110_2 &= 110_2/1000_2 = 6_{10}/8_{10}\\&=11_2/100_2 = 3_{10}/4_{10}\end{align}$$

#### 2. Place Values 
$$1.1001 = (1\times 2^0) + (1\times 2^{-1}) + (1\times 2^{-4})$$

### Percision and Accuracy
> [!example] FP add associative
> ```
> x = -1.5e38, y = 1.5e38, z = 1.0
> x + (y + z) = -1.5e38 + (1.5e38 + 1.0)
>             = -1.5e38 + (1.5e38)
>             = 0.0
> (x + y) + z = (-1.5e38 + 1.5e38) + 1.0
>             = (0.0) + 1.0
>             = 1.0
> ```
> Floating Point add is not associative
> - FP result **approximates** real result
> - Step size for 1.5e38 is too large for 1.0


- Precision is a count of the number bits in used to represent a value.
- Accuracy is the difference between the actual value of a `#` and its computer representation.
- High precision permits high accuracy but doesn’t guarantee it.
	- Example: `float pi = 3.14`
		- `pi` will be represented using all 24 bits of the significant (highly precise), but is only an approximation (not accurate).

### Rounding
Rounding occurs when:
- Real number math - fit the result in the significant field
- Converting

The FP hardware carries two extra bits of precision, and then round to get the proper value


IEEE FP Rounding Modes
- Round towards + ∞
	- ALWAYS round “up”: 2.001 -> 3, -2.001 -> -2
- Round towards - ∞
	- ALWAYS round “down”: 1.999 -> 1, -1.999 -> -2
- Truncate
	- Just drop the last bits (round towards 0)
- Unbiased (default mode): Round to even
	- Normal rounding, almost: 2.4 -> 2, 2.6 -> 3, 2.5 -> 2, 3.5 -> 4

### FP Addition
- De-normalize to match exponents
- Add significands to get resulting one
- Keep the same exponent
- Normalize (possibly changing exponent)

