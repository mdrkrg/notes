---
tags:
- CS
- ComputerStructure
---
Intro to RISC-V
===
## Assembly Languages
Instruction Set Architecture (ISA)
- A set of available operations implemented by a specific type of CPU
- Describe almost any behaviour
- ISA defines an assembly language

With assembly languages, almost everything is explicitly handled by the programmer.
### RISC
Reduced Instruction Set Computer
- Instruction set simple and small
- Software do complicated operations

### RISC-V
https://cs61c.org/su24/pdfs/resources/reference-card.pdf
https://venus.cs61c.org/
- RISC-V is little endian
#### Design Principle
1. Simplicity favours regularity
2. Smaller is faster
3. Good design demands good compromises

## RISC-V Registers
### Overview
- A RISC-V system is composed of two main parts:
	- The CPU, which is responsible for computing
	- Main memory, which is responsible for long-term data storage
- The CPU is designed to be extremely fast, often completing multiple instructions every nanosecond
- Going to main memory often takes hundreds or even thousands of nanoseconds.
- The CPU can store a small amount of data, through components called registers.

### Registers
![](https://lh7-us.googleusercontent.com/slidesz/AGV_vUfBQpU5HrYl8g19jhNZFohYYV7vEc_REe_FDBtl4uk7v_lJbl9cVmHJQ2Q8tLXu1HOLhvlQ1E-hVeCxv5i13fbJdiGNWsaTS7lvV1g2SYF6gFmHSjC6-RRsMmVNxt7v-cVf7SMe9NL1qNT2G_9yfcYebEgJZm6c=nw?key=7PLtEz0UJVKN6oy2-8MNvA)
![](https://lh7-us.googleusercontent.com/slidesz/AGV_vUcN7WgEXpWg119i2Tnla3-EMvfvQCR9nzCUMTHAYZh60d8wXoIm4BknhUGYw9jDdVP0uhHQCW0mIIsYcVuw6frfa74dnx9UhWk8X3t-spjJ0nkgLi8Ig5a2OJLmx9OafSQ2ZrwahMXK-8Hctxq7owasb0GzP_M9=nw?key=7PLtEz0UJVKN6oy2-8MNvA)
- A register is a CPU component designed to store a small amount of data. 
- Each register stores 32 bits of data (for a 32-bit system) or 64 bits of data (for a 64-bit system). In this class, we use 32-bit only.
- RISC-V gives access to 32 registers
- The size and number of registers is fixed (you can think of them as being implemented in hardware)

### Registers in RISC-V
- RISC-V gives access to 32 registers
- Registers are numbered from 0 to 31
	- Referred to by number: x0 – x31
- The register x0 is special and always stores 0 (trying to write data to that register results in the write being ignored). As such, we have 31 registers available for data storage
- The other 31 registers are all identical in behavior; the only difference between different registers is the conventions we follow when using them.
