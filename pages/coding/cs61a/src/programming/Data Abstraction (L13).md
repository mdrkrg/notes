---
tags:
  - CS
  - Python
  - CS61A
---
Data Abstraction (L13)
===
## Abstraction Barrier
Seperate those:
- How data are represented (as parts)
- How data are manipulated (as units)

e.g. Rational Numbers ADT

|Parts of the program that... |Treat rationals as... |Using only... |
|---|---|---|
|Use rational numbers to perform computation|whole data values|`add_rational`, `mul_rational`, `rationals_are_equal`, `print_rational` |
|Create rationals or implement rational operations|numerators and denominators|`rational`, `numer`, `denom` |
|Implement selectors and constructor for rationals|two-element lists|list literals and element selection|


