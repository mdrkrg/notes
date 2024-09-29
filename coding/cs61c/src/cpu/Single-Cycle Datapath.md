---
tags:
- CS
- ComputerStructure
---
Single-Cycle Datapath
===
## Single-Core Processor
- Processor (CPU): the active part of the computer that does all the work
	- Data manipulation
	- Decision making
- **Datapath** (the brawn): portion of the processor that contains hardware necessary to perform operations required by the processor
- **Control** (the brain): portion of the processor (also in hardware) that tells the datapath what needs to be done

```
+-------------------+             +-------------------+
| Processor         |             | Memory            |
| +---------------+ | Enable? R/W | +---+---+---+---+ |
| | Control       | |------------>| |---|---|---|---| |<----- Input
| +--|---------^--+ |             | |---------------| |
|    |         |    |             | | Instructions  | |
| +--v---------|--+ |   Address   | |               | |
| | Datapath      | |------------>| |---------------| |
| | +-----------+ | |             | |---|---|---|---| |
| | |PC         | | |             | |---Bytes---|---| |
| | +-----------+ | |             | |---|---|---|---| |
| | +-----------+ | |             | |---|---|---|---| |
| | |-Registers-| | |             | |---|---|---|---| |
| | |- - - - - -| | |             | |---|---|---|---| |
| | |- - - - - -| | | Write  Data | |---------------| |
| | |- - - - - -| | |------------>| | Data          | |
| | +-----------+ | |             | |               | |
| | ______ ______ | |  Read Data  | |               | |
| | \     V     / | |<------------| |---------------| |
| |  \   ALU   /  | |             | |---|---|---|---| |-----> Output
| |   \_______/   | |             | |---|---|---|---| |
| +---------------+ |             | +---------------+ |
+-------------------+             +-------------------+
```

## One-Instruction-Per-Cycle RISC-V Machine
The CPU is composed of two types of subcircuits:
- Combinational logic blocks
- State elements

On every tick of the clock, the computer executes one instruction:
- Current outputs of the **state elements** drives the **inputs to combinational logic**
- ... whose **outputs** settle at the **inputs to the state element** before the next rising clock edge

At the rising clock edge:
- All the state elements are updated with the combinational logic inputs
- Execution moves to the next clock cycle

```
CLK ‾‾‾↓___|‾‾‾|_


          +----+
 PC   --->|    |
 IMEM --->| CL |
 Reg[]--->|    |
 DMEM --->|    |
          +----+

CLK ‾‾‾|___↑‾‾‾|_

--------------------
|         +----+   |
>PC       |    |   |
>IMEM     | CL |----
>Reg[]    |    |
>DMEM     |    |
          +----+
```

### State Elements Required by RV32I ISA
- Program Counter
- Register File `Reg`
- Memory `MEM`
	- `IMEM` (Instruction Memory)
	- `DMEM` (Data Memory)
#### Program Counter
The Program Counter is a 32-bit Register.
- Input
	- N-bit data input bus
	- Write Enbale "Control" bit (1: assert/high, 0: deasserted/0)
- Output
	- N-bit data output bus
- Behaviour
	- If `Write Enable` is 1 on *rising clock edge*, set `Data Out = Data In`
	- *At all other times*, `Data Out` will not change; it will output its current value
```
      Write Enable
       +---|---+
Data In|       |Data Out
---/-->|       |--/--->
   N   |       |  N
       +---^---+
           |
          CLK
```

#### Register File
Register File (`RegFile`) has 32 registers.
- Input
	- One 32-bit input data bus, `dataW`
	- Three 5-bit select busses, `rs1` `rs2` `rsW`
	- `RegWEn` (Register Write Enable) control bit
- Output
	- Two 32-bit output data busses, `data1` `data2`
- Registers are accessed via their 5-bit register numbers
	- `R[rs1]`: `rs1` selects register to put on `data1` bus out
	- `R[rs2]`: `rs2` selects register to put on `data2` bus out
	- `R[rd]`: `rsW` selects register to be written via `dataW` when `RegWEn = 1`
- Clock behaviour: Write operation occurs on *rising clock edge*
	- Clock input only a factor on write
	- All read operation behave like a combinational block:
		- If `rs1`, `rs2` valid, then `data1`, `data2` valid after **access time** (within clock cycle)

```
     +-----------+
--/->|dataW      |
  32 |           |
--/->|rsW        |
  5  |           |
--/->|rs1        |
  5  |      data1|--/->
--/->|rs2        | 32
  5  |      data2|--/->
     |Reg[]      | 32
     +-|-------^-+
       |       |
     RegRW   CLK
```

#### Memory
Memory is a 32-bit byte-addressed memory space, accessed with 32-bit words.

- Access
	- Read: Address `addr` selects word to put on `dataR` bus
		- (Out of scope, read use multi-way MUX)
	- Write: Set `MemRW = 1`, address `addr` selects word to be written with `dataW` bus
		- (Out of scope, write use multi-way DMUX, wire into registers' `RegWEn`)
	- (More info on [Nand2Tetris Project 3 RAM implementation](file:///home/crvena/Learning/nand2tetris/projects/3/a/RAM8.hdl))
- Clock behaviour: Write operation occurs on *rising clock edge*
	- If `MemRW = 1`, write occurs on rising clock edge
	- If `MemRW = 0` and `addr` valid, then `dataR` valid after access time (combinational block, within clock cycle)


In current processors, memories are separated into two:
- `IMEM`: A **read-only** memory for fetching instructions
	- Behaves like a combinational block: if `addr` valid, then `inst` valid after *access time*
- `DMEM`: A memory for loading (read) and storing (write) data words.
- Under the hood, these are placeholders for caches

```
     +-------+            +-------+
--/->|addr   |       --/->|addr   |
  32 |       |         32 |  dataR|--/->
     |   inst|--/->  --/->|dataW  | 32
     |IMEM   | 32      32 |DMEM   |
     +-------+            +|-----^+
                           |     |
                         MemRW  CLK
```

## Designing the Datapath in Phases
Datapath is designed by breaking up into different stages
- Simple
- Modularity

5 basic stages of instruction execution:
1. Instruction Fetch (IF)
2. Instruction Decode (ID) + Read Registers
3. Execute (EX) ALU
4. Memory Access (MEM)
5. Write back to Register (WB)

```
    |  IF  |     ID     |  EX  |  MEM  |  WB
  _____
  \   V
 => PC => IMEM => Reg[] => ALU => DMEM =>
 ^=================^====================V
     ^                ^              ^
     |                |              |
CLK -+----------------+--------------+
```

Not all instructions need all 5 stages
- The **control logic** selects "needed" datapath lines based on the instruction
	- MUX selector, ALU op selector, write enable, etc

## R-Type Datapath
### Example: R-Type `add` Datapath
```
add  rd, rs1, rs2
 31          25 24      20 19      15 14  12 11       7 6            0
|    funct7    |    rs2   |    rs1   |funct3|    rd    |    opcode    |
|   0000000    |    rs2   |    rs1   | 000  |    rd    |   0110011    |
       7             5          5       3        5            7
```
- The `add` instruction makes two changes to the processor state:
	- RegFile `Reg[rd] = Reg[rs1] + Reg[rs2]`
	- PC `PC = PC + 4`

![[add_datapath_stages.svg]]
### Example: R-Type `sub` Datapath
```
sub  rd, rs1, rs2
 31          25 24      20 19      15 14  12 11       7 6            0
|    funct7    |    rs2   |    rs1   |funct3|    rd    |    opcode    |
|   0100000    |    rs2   |    rs1   | 000  |    rd    |   0110011    |
       7             5          5       3        5            7
```
- `sub` is almost the same as `add`, except now the ALU subtracts operands instead of adding them:
	- RegFile `Reg[rd] = Reg[rs1] - Reg[rs2]`
	- PC `PC = PC + 4`
- Instruction bit `inst[30]` selects between `add`/`sub`
	- Control logic `ALUSel` select which ALU operation to output
		- Convention `Add(0) Sub(1)`

![[sub_datapath_stages.svg]]
## I-Type Datapath
### Normal Arithmetic Immediates
```
addi rd, rs1, imm
 31          25 24      20 19      15 14  12 11       7 6            0
|                         |          |funct3|          |    opcode    |
|        imm[11:0]        |    rs1   | 000  |    rd    |    0010011   |
            12                 5        3        5            7
```
Two states to change, need to build an **immediate `imm`** 
- RegFile `Reg[rd] = Reg[rs1] + imm`
- PC `PC = PC + 4`


1. IF
	- `pc = pc + 4`
2. ID
	- Address bits of `inst` => `Reg[]`
		- `inst[11:7]` => `rsW`
		- `inst[19:15]` => `rsR1`
		- `inst[24:20]` => `rsR2` (discarded afterwards)
	- `inst[31:0]` => Control Logic
	- Immediate bits `inst[31:20]` => Immediate Generator
	- Register outputs `dataR1` and `dataR2`
	- Immediate Generator outputs `imm[31:0]`
	- `Bsel=1` -> B Selector
		- Output `imm`
3. EX
	- `rs1`, `imm` => ALU => Output
4. ME (nop)
5. WB
	- Result write back to `rsW` selected register
		- `RegWEn` -> `Reg[]`
		- Output >> `dataW`

![[I_type_datapath_stages .svg]]
#### B Selector
2-way 32-bit MUX selecting between `dataR2` and `imm`
- Input
	- 0: 32-bit `dataR1`
	- 1: 32-bit`imm`
- Control
	- 1-bit selection bit `Bsel`
- Output
	- 32-bit wired into ALU's B input
#### Immediate Generator
- Input
	- 12-bit immediate `inst[31:20]`
- Control
		- Immediate selection control bits `ImmSel` (between type I, S, B, ...)
- Output
	- 32-bit immediate `imm[31:0]` wired into B Select (MUX)
		- `imm[11:0]` copied from input
		- `imm[31:12]` smear the MSB of input (sign bit)

### Load Instructions
`lw` uses I-Format
```
lw   rd, imm(rs1)
 31          25 24      20 19      15 14  12 11       7 6            0
|                         |          |funct3|          |    opcode    |
|        imm[11:0]        |    rs1   | 000  |    rd    |    0010011   |
            12                 5        3        5            7
```
Load instruction creates an address as temp value, but stores another value
- `addr = (Base register rs1) + (sign-extended imm offset)`

Three states, including a memory load:
- DMEM read word at address `addr`
- RegFile (`Reg[rs1]` read), `Reg[rs1]` write`
- PC `PC = PC + 4`

![[load_datapath_stages.svg]]
#### Write Back Selector
MUX selecting between ALU output and DMEM `dataR` (and PC + 4 for J-format)
- Input
	- 0: 32-bit ALU output
	- 1: 32-bit DMEM output `dataR`
	- 2: 32-bit PC + 4
- Control
	- 2-bit `WBSel`
- Output
	- 32-bit output to write into `dataW`

#### Supporting Different Widths
To support narrower loads (`lb`, `lh`, `lbu`, `lhu`):
- Load 32-bit word from memory
- Add additional logic to extract correct byte or halfword
- Sign- or zero-extend result to 32-bits to write into RegFile
- Can be implemented with MUX and a few gates


## S-Type Datapath
```
sw  rs2, imm(rs1)
 31          25 24      20 19      15 14  12 11       7 6            0
|   imm[11:5]  |    rs2   |    rs1   |funct3| imm[4:0] |    opcode    |
       7             5          5       3        5            7
```
Immediate Format:
- `addr` = (Base register `rs1`) + (sign-extended `imm` offset)

State Elements Accessed:
- DMEM: write `R[rs2]` to word at address `addr`
- RegFile `R[rs1]` (base address), `R[rs2]` value to store
- PC `PC = PC + 4`

![[S_type_datapath_stages.svg]]
## B-Type Datapath
B-Format
```
opname rs1, rs2, Label
 31          25 24      20 19      15 14  12 11       7 6            0
| imm[12|10:5] |    rs2   |    rs1   |funct3|im[4:1|11]|    opcode    |
       7             5          5       3        5            7
```
New Immediate Format

State Elements changed:
- RegFile `R[rs1]`, `R[rs2]` Read only, for branch comparison
- PC `PC = PC + imm` (branch taken) or `PC = PC + 4` (not taken)

![[B_type_datapath_stages.svg]]
### The Branch Comparator Block
A combination logic block
- Input
	- Two data buses `A` and `B` (datapath `R[rs1]` and `R[rs2]`)
	- `BrUn` ("Branch Unsigned") Control bit
- Output
	- `BrEq` flag: `1 if A == B` => Control Logic
	- `BrLT` flat: `1 if A < B` => Control Logic
		- Unsigned comparison if `BrUn == 1`, signed otherwise

Control Logic:
- Set `BrUn` based on current instruction, `inst[31:0]`
- Set `PCSel` based on branch flags `BrLT`, `BrEq`

Examples:
- `blt`
	- If `BrLT == 1` and `BrEq == 0`, then `PCSel = taken`
- `bge` $A\ge B = \overline{(A<B)}$
	- If `BrLT = 0`, then `PCSel = taken`

### A Selector
2-way 32-bit MUX selecting between `dataR1` and `PC`
- Input
	- 0: `dataR1`
	- 1: `PC`
- Control
	- 1-bit `Asel`
- Output
	- 32-bit => ALU's A channel

### Immediate Generator in Detail
For I and S-Type:
```
        31          25 24      20 19      15 14  12 11       7 6            0
I-Type | imm[11|10:5] | imm[4:0] |   rs1    |funct3|    rd    |    opcode    |
S-Type | imm[11|10:5] |   rs2    |   rs1    |funct3| imm[4:0] |    opcode    |
             s   |         |                             |
             |   |         |                             -------/-5-----
             |   |         -------------------/-5-------------------   |
             |   -------------------/6--------------------         |   |  immSel
             ------------------------------------        |       __V___V__ |
                           |                    |        |       \_I___S_/<-
                           |                    V        V           |
        31                 V                  12 11 10         5 4   V    0
       |               imm[31:12]               |  | imm[10:5]  | imm[4:0] |
       |        ssss ssss ssss ssss ssss        |s |   ......   |  .....   |
```
- `inst[31]` directly to `imm[11]` (always the sign bit)
- Sign-extended `inst[31]` to `imm[31:12]` (maybe unsigned)
- 5-bit MUX select bits of `inst` to fill `imm[4:0]`
	- I: `inst[24:20]`
	- S: `inst[11:7]`

For I, S and B-Type:
```
        31          25 24      20 19      15 14  12 11        7 6            0
I-Type | imm[11|10:5] | imm[4:0] |   rs1    |funct3|    rd     |    opcode    |
S-Type | imm[11|10:5] |   rs2    |   rs1    |funct3| imm[4:0]  |    opcode    |
B-Type | imm[12|10:5] |   rs2    |   rs1    |funct3|imm[4:1|11]|    opcode    |
       |  s  ......   |  .....   |          |      |   .....   |              |
          ^                                                ^
          |                                                |---------------
          --------------------------------------------------              |
                                                |                         |
                                                V                         V
                                               MUX                       MUX
        31                                    12 11 10         5 4   V  1  0
       |               imm[31:12]               |  | imm[10:5]  | imm[4:0]  |
       |        ssss ssss ssss ssss ssss        |s |   ......   |  ..... |  |
```
- MUX for `imm[11]`
	- S: `inst[31]`
	- B: `inst[11]`
- MUX for `imm[0]`
	- S: `inst[7]`
	- B: `0` (implicit 0; half-words: bytes)
## J-Type Datapath
```
jal  rd, Label
 31          25 24      20 19            12 11       7 6            0
| imm[20|10:5] |im[4:1,11]|   imm[19:12]   |    rd    |    opcode    |
        7           5              8            5            7
```
Two changes to state:
- PC `PC = PC + imm` (unconditional PC-relative jump)
- RegFile `rd = PC + 4` save return address

Block updated:
- `WBSel` now controls a 3-input MUX
	- 0: `dataR` from DMEM
	- 1: ALU output
	- 2: `PC + 4`

## I-Format `jalr`
```
jalr rd, rs1, imm
 31                     20 19      15 14  12 11       7 6            0
|        imm[11:0]        |    rs1   |funct3|    rd    |    opcode    |
             12                 5        3        5            7
```
Two changes to state:
- PC `PC = rs1 + imm` (absolute addressing)
- RegFile `rd = PC + 4`

![[J_type_datapath_stages.svg]]

### I-Type `jalr`
I-Format means `jalr` uses the same immediates as arithmetic/loads
- Control `ImmSel` is based on instruction format

![[jalr_datapath_stages.svg]]

## U-Type Datapath
Upper Immediate instructions (`lui`, `auipc`)
```
opname rd, imm
 31                                    12 11       7 6           0
|               imm[31:12]               |    rd    |    opcode   |
         7           5         8              5            7
```
- Immediate format: represents **upper 20 bits** of a 32-bit immediate
- Two instructions both increment PC to next instruction and save to destination register
	- `lui`: Load Upper Immediate
	- `auipc`: Add Upper Immediate to PC

**`lui`**:
![[lui_datapath_stages.svg]]

**`auipc`**:
![[auipc_datapath_stages.svg]]