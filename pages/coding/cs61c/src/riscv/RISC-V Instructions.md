---
tags:
- CS
- ComputerStructure
---
RISC-V Instructions
===
## Instructions
Each line of RISC-V code is a single instruction, which executes a simple operation on registers.

Arithmetic instruction syntax:
```RISC-V
opname rd rs1 rs2
```

- Assembly operands are registers
- Registers have no types - they are just bits
- Registers cannot be given a name
	- Comments
- Operation determines type


## Arithmetic Operations
For doing math between registers or between a register and an immediate.
- Addition/Subtraction: `add`, `sub`, `addi`
- Bitwise: `and`, `or`, `xor`, `andi`, `ori`, `xori`
- Shifts: `sll` (Shift Left Logical), `srl` (Shift Right Logical), `sra` (Shift Right Arithmetic), `slli`, `srli`, `srai`
- Set Less Than: `slt`, `sltu`, `slti`, `sltiu`

### Addition and Subtraction
Addition
```RISC-V
add x1, x2, x3
```
Subtraction
```RISC-V
sub x4, x5, x6
```
Complex statement: Multiple instructions
```c
a = b + c + d - e;
```
```RISC-V
add x10, x1, x2  # a_temp = b + c
add x10, x10, x3 # a_temp = a_temp + d
sub x10, x10, x4 # a = a_temp - e
```
- `# Comment`
```c
f = (g + h) - (i + j);
```
```RISC-V
add x5, x20, x21 # a_temp = g + h
add x6, x22, x23 # b_temp = i + j
sub x19, x5, x6  # f = (g + h)- (i + j)
```

### Persudoinstructions
Shorthand for complex instructions
- Interpreted as normal instructions
- Example `mv x5 x6`
	- `add x5 x6 x0`

- `mv rd, rs` = `addi rd, rs, 0`
- `li rd, 13` = `addi rd, x0, 13`
- `nop` = `addi x0, x0, 0`

### Immediates
Immediates are numerical constants.
- Syntax similar to add instruction, except that last argument is a number instead of a register.


Add immediate:
```RISC-V
addi x3 x4 10
```
```c
f = g + 10;
```
Sub immediate:
```RISC-V
addi x3 x4 -10
```
### Register Zero
Register zero (x0) is ‘hard-wired’ to value 0.

Initialize immediate:
```RISC-V
addi x3 x0 10
```


### Set Less Than
```RISC-V
slt x5 x6 x7
```
```c
x5 = x6 < x7 ? 1 : 0;
```

Types:
- `slt` (treat the operands as signed numbers)
- `sltu` (treat the operands as unsigned numbers)
- `slti` and sltiu are the same but with an immediate

### Bitwise Logical Operations
- `andi` can be used for "masks"
	- `andi` with `0000 00FF` isolates the LSB
	- `andi` with `FF00 0000` isolates the MSB
- No NOT in RISC-V
	- `xori` with `FFFF FFFF`

> [!info] Usage of Bitwise Operation in C Compiler
> - C allows *bit fields* or *fields* to be defined within (double)words, allowing objects to be packed within a word.
> - Fields are unsigned integers that can be as short as 1 bit.
> - C compilers insert and extract fields using logical instructions: `andi`, `ori`, `slli` and `srli`
### Arithmetic and Logical Shifts
- Logical Left shift: Move all bits to the left, appending zeros as needed
- Logical Right shift: Move all bits to the right, prepending zeros as needed

Effect of logical shifts
- Unsigned
	- Shift left: `*= 2`
	- Shift right: `/= 2` (rounding down)
- Signed
	- Shift left: `*= 2`
	- Shift right
		- Positive: `/= 2`
		- Negative: flip the sign

- Arithmetic Right shift: Move all bits to the right, **prepending the MSB** (**sign-extension**)
	- Negative: prepending 1s
	- Positive and 0: prepending 0s
```
0b110101 >>> 2 = 0b111101 (-11 -> -3)
```

#### Logical Shifting
```RISC-V
sll  x11 x12 x13 # x11 = x12 << x13
slli x11 x12 2   # x11 = x12 << 2
srl  x11 x12 x13 # x11 = x12 >> x13
srli x11 x12 2   # x11 = x12 >> 2
```

#### Arithmetic Shifting
Shift right arithmetic (`sra`, `srai`): moves n bits to the right, insert MSB into empty bits
```
sra  x10 x11 x12 # x10 = x11 >>> x12
srai x10 x11 2   # x10 = x11 >>> 2
```

## Memory Instructions
Allows data to be transferred from main memory to registers and vice versa
- Load and store words `lw` `sw`
- Load and store bytes (extend 3 bytes)
	- Sign extended `lb` `sb`(store LSB)
	- Unsigned (zero-extends) `lbu` (no sbu)
- Load and store half-word `lh` `sh` (extend 2 bytes)
	- Sign extended `lh` `sh`(store 2 LSBs)
	- Unsigned (zero-extends) `lhu`

Syntax:
```RISC-V
lw rd1 imm(rs1)
sw rs2 imm(rs2)
```
- **Loads** 4 bytes (1 word) of memory starting at address `rs1 + imm` into `rd1`
- **Stores** `rs2` starting at the address `rs1 + imm` in memory

> [!info] Spilling Registers
> When program have more variables than computer registers, the compiler will keep the most frequently used variables in registers and places the rest in memory, using loads and stores to move variables between registers and memory.
> - Registers are faster and energy efficient
> - Data in registers are more useful
### Load Instructions
```RISC-V
lw x5 12(x7)
```
- Meaning: Get address in `x7` and add `12`. Retrieve the next word of data (4 bytes) from memory, and save the result in `x5`.
```
|reg|  val    |                  |mem addr |   data   |
|x5 |         |<-----data------  |         |          |
|x6 |         |               |  |         |          |
|x7 |0x1001000|>-address-     |  |...      |...       |
                        |     |  |0x1001000|0xCAFEB0BA|
                     +0xC(12) |  |0x1001004|0xBADDCAFE|
                        |     |  |0x1001008|0x8BADF00D|
                        -------->|0x100100C|0xDEADBEEF|
                              |                  v
                              --------------------
```

Example:
```c
g = h + A[3];
```
```RISC-V
# x11 = g, x12 = h 
# x15 = address of A[0]
# 12  = offset in bytes

lw  x10 12(x15) # Reg x10 gets A[3]
add x11 x12 x10 # g = h + A[3]
```

### Store Instructions
```RISC-V
sw x5 12(x7)
```
- Meaning: Interpret `x7` as an address and add `12`. Overwrite the 4 bytes of memory at that location with the value currently stored in `x5`.

```
|reg|  val     |                  |mem addr |   data   |
|x5 |0xFEEDC0DE|>-----data------  |         |          |
|x6 |          |               |  |         |          |
|x7 |0x1001000 |>-address-     |  |...      |...       |
                         |     |  |0x1001000|0xCAFEB0BA|
                      +0xC(12) |  |0x1001004|0xBADDCAFE|
                         |     |  |0x1001008|0x8BADF00D|
                         -------->|0x100100C|XXXXXXXXXX|
                               |                  ^
                               --------write-------
```


## Control
- Normally always move to the next line of code
- Control instructions specify a different line of code to run next
	- Conditional jumps (branches)
		- Jump to the specified line when condition is met
		- Else move to next line
	- Unconditional jumps
		- Jump to the specified line no matter what
 


|                          | Label provided | Register provides address to jump to |
| ------------------------ | -------------- | ------------------------------------ |
| Do not return after call | `j label`      | `jr rs1`                             |
| Return after call (LINK) | `jal rd label` | `jalr rd rs1 imm`                    |
### Text
- RISC-V code is also a form of data.
	- This data gets stored in the text section of memory.
- Every (real) instruction is stored as a 32-bit number.
- The "next" instruction is always stored 4 bytes after the current instruction.
- A special 33rd register called the **Program Counter** (or PC) keeps track of which line of code is currently being run.
### Labels
A human-readable identifier for a particular line of code.
```c
int a = 0, b = 10;
while (a != 0) {
  a = a + b;
  a = a - 1;
}
```
```RISC-V
        addi x5 x0 0
        addi x6 x0 10
Loop:   add x5 x5 x6
        addi x5 x5 -1
        bne x5 x0 Loop
```

### Branches
- `beq`: Branch if the two registers have equal value
- `bne`: Branch if non-equal
- `blt`, `bltu`: Branch if less than along with unsigned variants.
- `bge`, `bgeu`: Branch if greater than or equal to with unsigned variants

Syntax:
```RISC-V
operand rs1 rs2 label # comparison left to right
```

Example:
```c
if (i == j) {
  f = g + h;
} else {
  f = g - h
}
```
```RISC-V
bne x13, x14, Else # Note == is translated into bne
add x10, x11, x12  # Because this line is to execute
j Exit
Else:
sub x10, x11, x12
Exit
```
- May need to negate branch condition

> [!tip] Bounds Check Shortcut
> Treating signed numbers as if they were unsigned is equivlent to checking if $0\le x < y$.
> - The sign bit is MSB
> - If $y$ is positive, then its MSB is 0, smaller than negative's MSB 1
> 
> ```
> bgeu x20, x11, IndexOutOfBounds
> // if x20 >= x11 or x20 < 0, goto IndexOutOfBounds
> ```

> [!info] `switch case` Statements
> Implementation:
> 1. if-then-else sequence
> ```
>     li   t1, 0
>     bne  t0, t1, case0_end  // case 0: ...
>     jal  case0_op
> case0_end:
>     li   t1, 1, 1
>     beq  t0, t1, case1_end   // case 1: ...
>     jal  case1_op
> case1_end:
> case_default:
>     j    case_default_op
> case0_op:
>     ...
>     ret
> case1_op:
>     ...
>     j   end   // break
> case_default_op:
>     ...
> end:
> ```
> 2. **Branch (address) table**: A table (array) of addresses of alternative instruction sequences
> ```
> // Assume s0 is the pointer to branch table
>     li   t1, 0
>     bne  t0, t1, case0_end
>     jalr ra 0(s0)
> case0_end:
>     li   t1, 1
>     bne  t0, t
>     jalr ra 4(s0)
> ...
> ```


### Unconditional Jumps
Versions:
- Jump to a label
- Jump to an address saved in a register

Program Counter (PC)
- Stores the address of the current line of code being run
```RISC-V
jal x1 some_label  # This is PC
addi x7 x0 42      # This is PC + 4
some_label: addi x5 x0 10
```

#### Jump to a Label
```RISC-V
jal rd label # Jump and Link
j label      # Jump (no link) (persudo)
```
- Meaning: Set `rd` to PC+4 (the line of code immediately after the current line), then jump to Label

#### Jump to an Address
```RISC-V
jalr rd rs1 imm # Jump and Link Register
jr rd           # Jump (no link) (persudo)
```
- Meaning: Set `rd` to PC+4, then jump to the line of code at address `rs1 + imm`

### Link
- Links allow us to “return” to where we were before we jumped
- Often used to mimic the behavior of functions:
```RISC-V
main: addi x10 x0 5
      jal x1 foo
      addi x10 x0 6
      ...
foo:  ...
      jr x1
```
1. We jump to foo, and store the address of the next line into `x1`
2. Later, foo runs `jr x1`, returning to the point after the “function call.”


### Example Loop
```c
int A[20];
int sum = 0;
for (int i=0; i < 20; i++)
  sum += A[i];
```
```RISC-V
  add  x9,  x8, x0 # x9=&A[0]
  add  x10, x0, x0 # sum=0
  add  x11, x0, x0 # i=0
  addi x13, x0, 20 # x13=20
Loop:
  bge x11, x13, Done
  lw x12, 0(x9)     # x12=A[i]
  add x10, x10, x12 # sum+=
  addi x9, x9, 4    # &A[i+1]
  addi x11, x11, 1  # i++
  j Loop
Done:
```

## Miscellaneous Instructions
- lui, auipc: “helpers” to let the pseudoinstructions “li” and “la” work.
	- `li x5 0xDEADBEEF`: Sets the register `x5` to immediate value `0xDEADBEEF`
	- `la x5 Label`: Sets `x5` to the address of the line of code pointed to by `Label`
	- Because immediates are less than 32 bits – will make more sense when we talk about how instructions are encoded as bits
- ebreak: Debugger-specific behavior. In Venus, acts like a breakpoint.
- ecall: OS-specific behavior, such as printing out data, requesting memory via malloc. In this class, we wrap ecalls with “functions” so you don’t need to call ecall directly.

## Extensions
- `mul rd rs1 rs2`
	- Multiply `rs1` and `rs2` together, and store the result in `rd`