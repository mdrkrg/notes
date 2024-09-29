---
tags:
- CS
- ComputerStructure
---
Combinational Logic Blocks
===
## Data Multiplexors
![[1.3 Logic Gates#MUX (Multiplexer)]]

Multiple MUX can be combined together to get more way selection.

```
a --
   +--MUX----
b --   |    |
       ---  +--MUX--e
c --     |  |   |
   +--MUX----   |
d --   | |      |
       +--      |
       S0       S1
```

## Arithmetic Logic Unit (ALU)
Most processors contain a special logic block called "Arithmetic Logic Unit" (ALU).

A simple version that does ADD, SUB, bitwise AND (`&`), bitwise OR (`|`)

```
  A     B
  |     |
  /32   /32
  |     |               when S=00, R=A+B
__v__ __v__             when S=01, R=A-B
\    V    /             when S=10, R=A&B
 \  ALU  /<---/---S     when S=11, R=A|B
  \_____/     2
     |
     /32
     |
     v
     R
```

### Implementation
```
                   A     B
                   |     |
                   / 32  / 32
                   |     |
     --------------+--------------
     |       ------|-----+-------|------
     |       |     |     |       |     |
   +-----------+  +-------+     +-------+
S0>|  ADD/SUB  |  |  AND  |     |  O R  |
   +-|---|-----+  +---|---+     +---|---+
     |   |            / 32          / 32
     |   -----        |             |
     |       |        -----     -----
     v       |            |     |
  overflow   |          __v_____v__
             |          \ 0 MUX 1 /<----S0
             / 32        \_______/
             |               |
             |     -----------
		     |     |
		   __v_____v__
		   \ 0 MUX 1 /<-----------------S1
		    \_______/
		        |
		        / 32
		        |
		        v
		        R
```
- All operations done altogether
- Let MUX choose which one to output

## Adder
![[2.2 Binary Addition#Digital Adder]]

### Full Adder (Alternative Implementation)
$$\begin{align}
s_i & = \mathrm{XOR}(a_i,b_i,c_i)\\
c_{i+1} & = \mathrm{MAJ}(a_i,b_i,c_i) = a_ib_i + a_ic_i + b_ic_i
\end{align}$$
- $\mathrm{MAJ}$ is the majority operator, where
  $$\mathrm{MAJ}(x_1, x_2,\cdots, x_n) = \begin{cases}1,&\displaystyle\sum_{x_i = 1}i > \sum_{x_j = 0}j, \\0&\displaystyle\sum_{x_i = 1}i \le \sum_{x_j = 0}j.\end{cases}$$
### Multibit Adder
Cascading n instances of 1-bit Full Adder
- Unsigned: Last carry $c_n$ is overflow bit
- Signed: $\mathrm{XOR}(c_n, c_{n-1})$ is overflow bit
	- No overflow: Last bit $\overline c_{in} \overline c_{out}$ or $c_{in}c_{out}$
	- Overflow: Either $c_{in}$ or $c_{out}$ is 1

### Subtractor
$$A - B = A + (-B) = A + (\overline B + 1)$$
- XOR serve as conditional inverter
	- x = 0, XOR(x, y) = y
	- x = 1, XOR(x, y) = -y
- One bit carry input into the LSB as $+1$

Final design:
![[AdderSubtractor.svg]]
