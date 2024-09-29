---
tags:
- CS
- ComputerStructure
---
Single-Cycle Control
===
## Instruction Timing
### Example: `add` Timing
![[add_timing.svg]]
$$\begin{align}
\text{critical path} &= t_\text{clk-q} + \max\{t_\text{Add} + t_\text{mux}, t_\text{IMEM} + t_\text{Reg} + t_\text{ALU} + t_\text{mux}\} + t_\text{setup}\\
&= t_\text{clk-q} + (t_\text{IMEM} + t_\text{Reg} + t_\text{ALU} + t_\text{mux}) + t_\text{setup}
\end{align}$$
### Example: `lw` Timing
`lw` involves all 5 stages
$$\begin{align}
\text{critical path} &= t_\text{clk-q} + \max\\\{\\
&t_\text{Add} + t_\text{mux},\\
&t_\text{IMEM} + t_\text{Reg} + t_\text{mux} + t_\text{ALU} + t_\text{DMEM} + t_\text{mux},\\
&t_\text{IMEM} + t_\text{Imm} + t_\text{mux} + t_\text{ALU} + t_\text{DMEM} + t_\text{mux}\\
\}\\ &+ t_\text{setup}
\end{align}$$

### Timing for 5 Stages
![[instruction_timing.svg]]
- $t_\text{WB}$ involves WB selector delay and setup time

Example timing of stages for different instruction types:

| Instruction | IF = 200ps | ID = 100ps | EX = 200ps | ME=200ps | WB = 100ps | Total |
| :---------: | :--------: | :--------: | :--------: | :------: | :--------: | :---: |
|      R      |     X      |     X      |     X      |          |            | 600ps |
|      I      |     X      |     X      |     X      |          |            | 600ps |
|      B      |     X      |     X      |     X      |    X     |            | 500ps |
|      J      |     X      |     X      |     X      |          |     X      | 500ps |
|    `lw`     |     X      |     X      |     X      |    X     |     X      | 800ps |
|      S      |     X      |     X      |     X      |    X     |            | 700ps |
- `lw` is the longest involving all stages
- Maximum clock frequency
	- $f_{\max} = 1/800~\mathrm{ps} = 1.25~\mathrm{GHz}$
- Most blocks are idle most of the time
	- Pipelining, adding registers in the middle

## Control Logic
Control Logic can be implemented in two ways:
- Truth Table
- ROM

### Control Logic Truth Table

| `Inst`  | BrEq | BrLT | PCSel | ImmSel | BrUn | ASel | BSel | ALUSel | MemRW | RegWEn | WBSel |
| :-----: | :--: | :--: | :---: | :----: | :--: | :--: | :--: | :----: | :---: | :----: | :---: |
|  `add`  |  \*  |  \*  |  +4   |   R    |  \*  | Reg  | Reg  |  Add   | Read  |   1    |  ALU  |
|  `sub`  |  \*  |  \*  |  +4   |   R    |  \*  | Reg  | Reg  |  Sub   | Read  |   1    |  ALU  |
| R-R Op  |  \*  |  \*  |  +4   |   R    |  \*  | Reg  | Reg  |   Op   | Read  |   1    |  ALU  |
| `addi`  |  \*  |  \*  |  +4   |   I    |  \*  | Reg  | Imm  |  Add   | Read  |   1    |  ALU  |
|  `lw`   |  \*  |  \*  |  +4   |   I    |  \*  | Reg  | Imm  |  Add   | Read  |   1    |  Mem  |
|  `sw`   |  \*  |  \*  |  +4   |   S    |  \*  | Reg  | Imm  |  Add   | Write |   0    |  \*   |
|  `beq`  |  0   |  \*  |  +4   |   B    |  \*  |  PC  | Imm  |  Add   | Read  |   0    |  \*   |
|  `beq`  |  1   |  \*  |  ALU  |   B    |  \*  |  PC  | Imm  |  Add   | Read  |   0    |  \*   |
|  `bne`  |  0   |  \*  |  ALU  |   B    |  \*  |  PC  | Imm  |  Add   | Read  |   0    |  \*   |
|  `bne`  |  1   |  \*  |  +4   |   B    |  \*  |  PC  | Imm  |  Add   | Read  |   0    |  \*   |
|  `blt`  |  \*  |  1   |  ALU  |   B    |  0   |  PC  | Imm  |  Add   | Read  |   0    |  \*   |
| `bltu`  |  \*  |  1   |  ALU  |   B    |  1   |  PC  | Imm  |  Add   | Read  |   0    |  \*   |
| `jalr`  |  \*  |  \*  |  ALU  |   I    |  \*  | Reg  | Imm  |  Add   | Read  |   1    | PC+4  |
|  `jal`  |  \*  |  \*  |  ALU  |   J    |  \*  |  PC  | Imm  |  Add   | Read  |   1    | PC+4  |
| `auipc` |  \*  |  \*  |  +4   |   U    |  \*  |  PC  | Imm  |  Add   | Read  |   1    |  ALU  |


### Control Realization Options
- ROM
	- Read-Only Memory
	- Regular structure
	- Can be easily reprogrammed
		- fix errors
		- add instructions
	- Popular when designing control logic manually
- Combinational Logic
	- Today, chip designers use logic synthesis tools to convert turth tables to network of gates

Instruction type encoded using only 9 bits:
- `inst[30]`
- `inst[14:12]`
- `inst[6:2]`

### ROM-based Control
```
11-bit address (inputs)
Inst[30,14:12,6:2]
        | 
        / 9   BrEq BrLT
        |       |   |
+-------V-------V---V-+
|                     |-----> PCSel
|                     |-/-3-> ImmSel[2:0]
|                     |-----> BrUn
|                     |-----> ASel
|         ROM         |-----> BSel
|                     |-/-4-> ALUSel[3:0]
|                     |-----> MemRW
|                     |-----> RegWEn
|                     |-/-2-> WBSel[1:0]
+---------------------+          15 data bits (output)
```

Implementation
![[ROM_controler.svg]]

#### Decoding Example: `add`
$$\begin{align}
\mathrm{add} &= \overline{i[30]}\cdot\overline{i[14]}\cdot\overline{i[13]}\cdot\overline{i[12]}\cdot\text{R-type}\\
\text{R-type} &= \overline{i[6]}\cdot{i[5]}\cdot{i[4]}\cdot\overline{i[3]}\cdot\overline{i[2]}\cdot \text{RV32I}\\
\text{RV32I} &= i[1]\cdot i[0]
\end{align}$$