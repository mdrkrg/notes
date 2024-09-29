---
tags:
- CS
- ComputerStructure
---
Synchronous Digital System
===
## Introduction
- Hardware of a processor, e.g., RISC-V, is a Synchronous Digital System
- Synchronous:
	- All operations coordinated by a central clock
	- "Heartbdat" of the system
- Digital:
	- All values represented by discrete values
	- Electrical signals are treated as 1s and 0s;
	  grouped together to form words

## Switches
Composing switches in to complex ones can build Boolean functions:
- AND: Z = A and B
	- Serial switches
- OR: Z = A or B
	- Parallel switches

### MOS Transistor
Transistor: Semiconductor device to amplify or **switch** signals
MOS: Metal-Oxide on Semiconductor
- Act as voltage-controled switches
- Three terminals: Drain, Gate, Source
	- Switch action:
	  If voltage on gate terminal is highter/lower than source terminal, then conduct path established between drain and source terminals
	- N-Channel
		- Open When G is LOW
		- Closes when VG > VS + ε
	- P-Channel
		- Closed when G is LOW
		- Opens when VG > VS + ε

## Signals and Waveforms: Clock
Signals:
- When digitals is only treated as 1 or 0
- Is transmitted over wires continuously
- Transmission is effectively instant
- Implies that a wire contains 1 value at a time

![[Sample_Clock_Cycle.svg]]
Clocks control pulse of circuits
### Grouping
A group of wires with its voltage change with time can represent change of a number with time.
```
x0 _|‾‾|__┆__|‾‾┆‾‾|_ 10011
x1 _┆__|‾‾|__┆__|‾‾|_ 01001
x2 _|‾‾┆‾‾|__┆__|‾‾|_ 11001
x3 _┆__┆__|‾‾|__┆__┆_ 00100
    ┆  ┆  ┆  ┆  ┆  ┆
X    5  6  8  1  7    56817
```

### Circuit Delay
There can be delay between input and a stable output (propagation delay).


## Type of Circuits
Synchronous Digital Systems are made up of two basic types of circuits:
- Combinational Logic (CL) circuits
	- Output is a function of the input only (pure functions)
	- No side effects
- State Elements
	- Circuits that store information

### Circuit with State
Register
![[Register.svg]]
- Register value becomes the IN when LOAD is 1
- OUT is always register's value
- OUT = IN after one clock cycle
- Sometimes CLK is the load signal
	- Every clock cycle, load a value from IN
	- And every next clock cycle, the OUT will become previous IN