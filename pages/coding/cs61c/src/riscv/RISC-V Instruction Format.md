---
tags:
- CS
- ComputerStructure
---
RISC-V Instruction Format
===
Pricinple idea: keep all instruction same bit length (32-bit)

## Machine Language
### Big Idea: Stored-Program Computer
- Instructions are represented as bit patterns – can think of these as numbers
- Therefore, entire programs can be stored in memory to be read or written just like data

Implications:
1. Everything Has a Memory Address
	- Instructions have memory address
		- Branches and jumps use these address
	- One register keeps address of instruction being executed: “Program Counter” (PC)
		- A pointer to memory
2. Programs are distributed in binary form (asssembled machine code)
	- Programs bound to specific instruction set
		- Different version for phones and PCs

### Instruction Format
- ISA defines instructions for CPU down to the bit level
- RISC-V instructions are fixed size, 32-bit words
	- Same size for a data word
- Instruction words are divided into **fields**
	- Each field represents some information for processor
- RISC-V six basic type of instruction formats
	- Use same format for similar instructions

| Format   | Description                                        |
| -------- | -------------------------------------------------- |
| R-Format | Register-register arithmetic operations            |
| I-Format | Register-immediate arithmetic operations and loads |
| S-Format | Stores                                             |
| B-Format | Branches (S variant)                               |
| U-Format | 20-bit upper immediate instructions                |
| J-Format | Jumps (U variant)                                  |


## R-Format Layout
Register-register arithmetic operations (`add`, `xor`, `sll`, etc.)

```
 31          25 24      20 19      15 14  12 11       7 6            0
|    funct7    |    rs2   |    rs1   |funct3|    rd    |    opcode    |
       7             5          5       3        5            7
```
```RISC-V
opname rd, rs1, rs2
```
- **opcode** partially specify which instruction it is.
	- All R-Format instructions have opcode `0110011`
- **funct7, funct3** combined with opcode describe what operation to perform.
	- funct7: Extra 7-bit identifier for extremely similar instructions with the same opcode and funct3 (such as `sra` and `srl`)
- **rs1, rs2**: first and second register oprend
- **rd**: destination register


|  funct7   | rs2 | rs1 | funct3 | rd  |  opcode   | Instruction |
| :-------: | :-: | :-: | :----: | :-: | :-------: | ----------: |
| `0000000` |     |     | `000`  |     | `0110011` |       `add` |
| `0100000` |     |     | `000`  |     | `0110011` |       `sub` |
| `0000000` |     |     | `001`  |     | `0110011` |       `sll` |
| `0000000` |     |     | `010`  |     | `0110011` |       `slt` |
| `0000000` |     |     | `011`  |     | `0110011` |      `sltu` |
| `0000000` |     |     | `100`  |     | `0110011` |       `xor` |
| `0000000` |     |     | `101`  |     | `0110011` |       `srl` |
| `0100000` |     |     | `101`  |     | `0110011` |       `sra` |
| `0000000` |     |     | `110`  |     | `0110011` |        `or` |
| `0000000` |     |     | `111`  |     | `0110011` |       `and` |
- One higher-order immediate bit used for **sign extend** (`sra` / `srl`, `add` / `sub`)


## I-Format Layout
```
 31                     20 19      15 14  12 11       7 6            0
|        imm[11:0]        |    rs1   |funct3|    rd    |    opcode    |
             12                 5        3        5            7
```
```RISC-V
opname rd, rs1, imm
```
- All arithmetic immediate instructions have opcode `0010011`
- **imm\[11:0]** holds 12-bit-wide immediate values
	- Values in range \[-2048, +2047]
	- CPU sign-extends to 32 bits before use in an arithmetic operation

### Immediate
Register-immediate arithmetic operations
- Mostly consistent with R-Format. Simplify how the CPU processes instructions
- Immediate fields need to be wider

|      imm\[11:0]      | rs1 | funct3 | rd  |  opcode   | Instruction |
| :------------------: | :-: | :----: | :-: | :-------: | ----------: |
|                      |     | `000`  |     | `0010011` |      `addi` |
|                      |     | `010`  |     | `0010011` |      `slti` |
|                      |     | `011`  |     | `0010011` |     `sltiu` |
|                      |     | `100`  |     | `0010011` |      `xori` |
|                      |     | `110`  |     | `0010011` |       `ori` |
|                      |     | `111`  |     | `0010011` |      `andi` |
| `0000000` \| `shamt` |     | `001`  |     | `0010011` |      `slli` |
| `0000000` \| `shamt` |     | `101`  |     | `0010011` |      `srli` |
| `0100000` \| `shamt` |     | `101`  |     | `0010011` |      `srai` |
- Shift by Immediate instructions encode the `shift amount` in the lower-order 5 bits
	- Only shift a 32-b word by 0-31 positions is meaningful


### Load
Load operations
- All load instructions have opcode `0000011`

```RISC-V
loadop rd, imm(rs1)
```
- **imm\[11:0]** is the offset from **rs1**
- **rs1** is the register that holds the base address

| imm\[11:0] | rs1 | funct3 | rd  |  opcode   | Instruction |
| :--------: | :-: | :----: | :-: | :-------: | ----------: |
|            |     | `000`  |     | `0000011` |        `lb` |
|            |     | `001`  |     | `0000011` |        `lh` |
|            |     | `010`  |     | `0000011` |        `lw` |
|            |     | `100`  |     | `0000011` |       `lbu` |
|            |     | `101`  |     | `0000011` |       `lhu` |
- `lb`: load byte, `lh`: load halfword (16 bits)
	- **Sign extend** to fill upper bits of `rd`
- `lbu`: load unsigned byte, `lhu`: load unsigned half word
	- **Zero extend** to fill upper bits of `rd`

## S-Format Layout
Store operations

```
 31          25 24      20 19      15 14  12 11       7 6            0
|   imm[11:5]  |    rs2   |    rs1   |funct3| imm[4:0] |    opcode    |
       7             5          5       3        5            7
```
```RISC-V
storeop rs2, imm(rs1)
```
- All store instructions have opcode `0100011`
- **rs2** source register
	- Data to be stored in memory
- **rs1** base register
	- Base address of store
- **imm** immediate offset added to base address to form memory address
	- Higher 7 bits and lower 5 bits are in **seperate fields**
	- RISC-V design prioritizes keeping **register fields** in the same places. Immediates are less critical to hardward

| imm\[11:5] | rs1 | rs2 | funct3 | imm\[4:0] |  opcode   | Instruction |
| :--------: | :-: | :-: | :----: | :-------: | :-------: | ----------: |
|            |     |     | `000`  |           | `0100011` |        `sb` |
|            |     |     | `001`  |           | `0100011` |        `sh` |
|            |     |     | `010`  |           | `0100011` |        `sw` |

## Program Counter (PC)
The Program Counter is a special internal register inside the processor holding the **byte address** of the **instruction** being executed.
- Seperate from the 32-registers **Register File**
- `PC = PC + 4` for most instructions
- Branches update PC to "Jump"
	- Unconditional Branches update PC to the line of instructions
	- Conditional Branches update PC to the line of instructions if taken, if not, `PC = PC + 4`
### PC-Relative Addressing
Supply a signed offset to update PC
- `PC = PC + byteoffset`
- *Position-Independent Code*: If all code removes, *relative offsets* don't change

Contract: Absolute Addressing
- Supply new address to overwrite PC (`PC = new_address`)

## B-Format (SB-Type) Layout
Conditional Branches
- RISC-V uses PC-relative addressing to encode labels
	- Don't branch: `PC = PC + 4`
	- Do branch: `PC = PC + relative_offset`
- The 12-bit immediate field for conditional branches is **in units of 2 bytes**
	- For 16-bit microprocessor extension
	- Variable-length instructions that are multiples of 16b in length
	- One branch reaches $\pm 2^{10}$ x 32-bit instructions from PC

```
 31          25 24      20 19      15 14  12 11       7 6            0
| imm[12|10:5] |    rs2   |    rs1   |funct3|im[4:1|11]|    opcode    |
       7             5          5       3        5            7
```
```RISC-V
opname rs1, rs2, Label
```
- All *conditional* branch instructions have opcode `1100011`
- **imm** represents relative in increments of **2 bytes**
	- 1 bit: 2's complement (+/- offset) (index 12 MSB)
	- 1 bit: 16-b instruction support (index 11)
	- Index zero (lowest bit) of offset is always zero, so no need to store in instruction (multiply by 2)


| imm\[12\|10:5] | rs1 | rs2 | funct3 | imm\[4:1\|11] |  opcode   | Instruction |
| :------------: | :-: | :-: | :----: | :-----------: | :-------: | ----------: |
|                |     |     | `000`  |               | `1100011` |       `beq` |
|                |     |     | `001`  |               | `1100011` |       `bne` |
|                |     |     | `100`  |               | `1100011` |       `blt` |
|                |     |     | `101`  |               | `1100011` |       `bge` |
|                |     |     | `110`  |               | `1100011` |      `bltu` |
|                |     |     | `111`  |               | `1100011` |      `bgeu` |
### Immediate Format Design
Immediate bit encoding is optimized to reduce hardware cost
```
 31          25 24      20 19      15 14  12 11       7 6            0
|        imm[11:0]        |    rs1   |funct3|    rd    |    opcode    | I
|        yxxxxxx          |   wwwwv  |      |          |              |
|   imm[11:5]  |    rs2   |    rs1   |funct3| imm[4:0] |    opcode    | S
|        yxxxxxx          |          |      |  wwwwv   |              |
| imm[12|10:5] |    rs2   |    rs1   |funct3|im[4:1|11]|    opcode    | B
|        zxxxxxx          |          |      |  wwwwy   |              |
```
- Bit positions of immediates are consistent
- Instruction bit 31 is always the **sign bit**

### Conditionally Branching Further
- B-Format has limited range:
- Destination is further away: Enter **unconditional jump**
```RISC-V
# >>>>>
beq x10, x0, far # This doesn't work
# <<<<<
bne x10, x0, next # Use this instead
j far
next: # next instruction
```


## J-Format (UJ-Type)
Unconditional jumps
```
 31          25 24      20 19            12 11       7 6            0
| imm[20|10:5] |im[4:1,11]|   imm[19:12]   |    rd    |    opcode    |
        7           5              8            5            7
```
```RISC-V
jal rd, Label
```
- **opcode** `1101111`
- **rd**: Destination Register gets "return address"
	- `rd = PC + 4`
- immediate represents relative offset in increments of 2 bytes
	- To compute new PC: `PC = PC + byte_offsite`
	- 20 immediate bits implies $\pm 2^{18}$ 32-bit instructions reachable
		- 1 bit: 2's complement (index 20)
		- 1 bit: 16-bit instruction support (index 11)

## U-Format
Upper Immediate instructions
```
 31                                    12 11       7 6           0
|               imm[31:12]               |    rd    |    opcode   |
         7           5         8              5            7
```
```RISC-V
opname rd, immed
```
- Immediate represents **upper 20 bits** of a 32-bit immediate
	- `imm = immed << 12`

### `lui` for Long Immediates
```RISC-V
lui rd, immed
```
The `lui` instruction, **Load Upper Immediate**:
- Write a 20-bit immediate value into the upper 20-bits of register `rd`
- Clear the lower 12 bits

Effect: `rd = immed << 12`

`lui` together with an `addi` (to set lower 12 bits) can create any 32-bit value in a register:
```RISC-V
lui x10, 0x87654      # x10 = 0x87654000
addi x10, x10, 0x321  # x10 = 0x87654321
```
- The `li` persudoinstrucion resolves to `lui + addi` as needed
- Problem: `addi` sign-extends the 12-bit immediate
	- If sign bit set, subtracts 1 from the upper 20-bits
- Solution: If 12-bit immediate is negative, add 1 to the upper 20-bit load
	- `li` do it immediately

### `auipc` Loads the PC into the Register File
```RISC-V
auipc rd, immed
```
The `auipc` instruction
- Adds an Upper Immediate plus the PC to `rd`

 Effect: `rd = PC + (immed << 12)`

In practice:
```RISC-V
Label: auipc x5, 0 # puts address of Label in x5
```
- Loads the PC into a register accessible by other instructions


## I-Format (`jalr`)
```RISC-V
jalr rd, rs1, imm
```
The `jalr` instruction does a Jump and Link Register
- Jump to `rs1 + imm`
- Write address of the *following* instruction to `rd`
- Allows for bigger jumps

Efffect: `PC = rs1 + imm, rd = PC + 4`

The `ja` persudoinstruction:
```RISC-V
jr ra # <=> jalr x0, ra, 0
```

Use cases:
1. Return to callee `jr ra`
2. Jump to absolute address (external lib) by `auipc` + `jalr`


### Layout
```
 31                     20 19      15 14  12 11       7 6            0
|        imm[11:0]        |    rs1   |funct3|    rd    |    opcode    |
             12                 5        3        5            7
```
- opcode `1100111`
- Immediate: `imm` and `rs1` are added together to update PC
	- `PC = rs1 + imm`
	- I-Type will **not** multiply `imm` by 2
