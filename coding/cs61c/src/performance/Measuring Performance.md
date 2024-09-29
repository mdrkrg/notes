---
tags:
- CS
- ComputerStructure
---
Measuring Performance
===
## Amdahl's (Heartbreaking) Law
Speedup due to enhancement E:
$$\text{Speedup w/ E} = \frac{\text{Exec time w/o E}}{\text{Exec time w/ E}}$$

If the enhancement E do not affect a portion s (s < 1) of a task, and accelerate the remainder (1 - s) by a factor P (P > 1):
- Exec time w/ E = Exec time w/o E * (s + (1 - s) / P)

$$\text{Speedup w/ E} = \frac{1}{s + \dfrac{1 - s}{P}} \xrightarrow{P\to+\infty} \frac1s$$

Consequence of Amdahl's Law:
The amount of speedup that can be achieved through parallelism is **limited by the serial portion** of the program