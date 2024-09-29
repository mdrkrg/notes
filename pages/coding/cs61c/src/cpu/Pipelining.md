---
tags:
- CS
- ComputerStructure
---
Pipelining
===
- Latency (time it takes to finish a single task) is unchanged
- Throughput (number of jobs finished per hour) increases
- Maximum throughput speedup = number of stages
	- Limited by cost of filling and draining pipeline: not all resources used at the start and end
- Pipeline rate limited by slowest pipeline stage
	- Faster stages have to wait for slower stagesd

## Pipelining Stages
We can pipeline stages by adding registers between the stages, so the clock cycle can be as little as 200ps.

| Stage  | IF        | ID           | EX      | MEM           | WB            |
| ------ | --------- | ------------ | ------- | ------------- | ------------- |
| Device | IMEM      | Reg          | ALU     | DMEM          | Reg           |
| Time   | 200ps     | 100ps        | 200ps   | 200ps         | 100ps         |
| Event  | IMEM read | Reg **read** | Execute | Memory access | Reg **write** |
![[symbolic_stages.svg]]
### Single Cycle vs. Pipelined
```
add  t0, t1, t2  |IF|ID|EX|  |WB|
lw   t0, 8(t3)      |IF|ID|EX|ME|WB|
or   t3, t4, t5        |IF|ID|EX|  |WB|
sw   t0, 4(t3)            |IF|ID|EX|ME|  |
sll  t6, t0, t3              |IF|ID|EX|  |WB|
```
- Sequential: Resource use by same instruction over time (multiple clock cycles)
- Simutaneous: Resource use by multiple instruction **in same clock**


Latency vs. Processor **Throughput**: $\dfrac{\text{\#instructions}}{\text{time}}$

|                      | Single Cycle               | Pipelined |
| -------------------- | -------------------------- | --------- |
| Timing of each stage | 200, 100, 200, 200, 100 ps | 200 ps    |
| Latency              | 800 ps                     | 1000 ps   |
| Clock cycle time     | 800 ps                     | 200 ps    |
| Clock rage           | 1.25 GHz                   | 5 GHz     |
| CPI                  | \~1                        | \~1 or <1 |
| Relative throughput  | 1x                         | 4x        |


## Construction a Pipelined RV32I Datapath
- A pipelined datapath needs to "separate" the five stages of the RV32I datapath.
	- Each stage needs to process data from a different instruction
- Use **pipeline registers** to carry instruction data between stages

### IF/ID Pipeline Registers
- IF/ID has two pipeline registers:
	- `PC_ID`
	- `inst_ID`
- Increment PC to PC+4 for next cycle's IF stage


### ID/EX Pipelien Registers
- Instruction need to be piped with data to correctly operate **control** in each stage
- Five registers:
	- `PC_EX`
	- `ra1_EX`
	- `ra2_EX`
	- `imm_EX`
	- `inst_EX`

### EX/MEM Pipeline Registers
- Four registers:
	- `PC_MEM`
	- `alu_MEM`
	- `rs2_MEM`
	- `inst_MEM`
- `rs2` (data to store) needs to be piped through to `MEM`

### MEM/WB Pipeline Registers
- Four Registers, 3 before MUX
	- `PC+4_WB`
		- PC from `PC_MEM` need to +4 before the `PC+4_WB` register
	- `alu_WB`
	- `mem_WB`
	- `inst_WB`
		- Instruction finally pipe back and decoded to `rsW` to ensure data write

### Pipeline of Control
- Control signals are derived from the instruction
	- Computed during ID stage
- Control information for later stages is stored in pipeline registers (**forwarding**):
	- IF/ID: Derive control infromation
	- ID/EX: EX_ctrl, MEM_ctrl, WB_ctrl
	- EX/MEM: MEM_ctrl, WB_ctrl
	- MEM/WB: WB_ctrl

## Structural Hazards
A **hazard** is a situation that ==prevents starting the next instruction in the next clock cycle==.

Types:
1. Structural hazard
	- A required resource is busy (e.g. needed in multiple stages)
	- e.g., Two memory reads (IMEM and DMEM both in memory) in one cycle
2. Data hazard
	- Data dependency between instruction
	- Need to wait for previous instruction to complete its data read/write
	- e.g., The result of `t3` will be stages ahead (WB) of it's use (ID)
3. Control hazard
	- Flow of execution depeneds on previous instruction
	- e.g., Branching

### Structural Hazards
Hardware does not support access accross multiple instructions in the same cycle.
- Occurs when multiple instructions compete for access to a single physical resource

Solution 1 (inefficient):
- Instructions take turns using the resource
- Some instructions **stall** when the resource is busy

Solution 2: Add more hareware
- In current CPUs, structural hazards are not an issue
- RV32I ISA datapath avoids structural hazards via its hardware requirements on RegFile and Memory

#### FIX: Required RegFile
Required RegFile:
- Each RV32I instruction:
	- Reads up to 2 operands in ID (decode) stage
	- Writes up to 1 operand in WB (writeback) stage
- Structural hazard can occur if RegFile HW does not support simultaneous read/write
- RV32I's required RegFile design works:
	- Two independent read ports, one independent write port
	- Three accesses (2 read, 1 write) can happen **in the same cycle**

#### FIX: Separate IMEM, DMEM
- CPU can read memory twice in the same cycle:
	- IF: Instruction memory (IMEM)
	- MEM: Data memory (DMEM)
- Structural hazard if IMEM, DMEM were same hardware:
	- Without separate memories, instruction fetch would have to stall for a cycle
- RV32I's required separation of IMEM and DMEM works

Instruction and Data Caches
- Two fast, separate on-chip memories, one for instruction and one for data:
```
+------------------------------+  +------------------+
| Processor                    |  | Memory           |
| +-----------+                |  |                  |
| | Control   |                |  |                  |
| +--|-----^--+                |  |                  |
|    |     |                   |  |                  |
| +--V-----|--+  +-----------+ |  |                  |
| | Datapath  |  |Instruction<---->                  |
| |           <-->Cache      | |  |                  |
| |           |  +-----------+ |  |                  |
| |           |                |  |                  |
| |           |                |  |                  |
| |           |                |  |                  |
| |           |  +-----------+ |  |                  |
| |           <-->Data       | |  |                  |
| |           |  |Cache      <---->                  |
| |           |  +-----------+ |  |                  |
| |           |                |  |                  |
| |           |                |  |                  |
| +-----------+                |  |                  |
+------------------------------+  +------------------+
```


### Data Hazards
- Instructions have data dependency
- Need to wait for previous instruction to complete its data read/write

Occurs when an instruction **reads** a register before a previous instruction has finished **writing** to that register.

Three cases:
1. Register access
2. ALU result
3. Load data hazard


#### Data Hazard 1: Register Access
Problem: If the **same register is written and read** in one cycle:
- WB must write value before ID reads new value
- Not structural hazard! Separate ports allow simultaneous R/W

```
                            Both RegFile!!
                               V
add >t0<, t1, t2 |IF|ID|EX|  >WB<
lw   t0, 8(t3)      |IF|ID|EX|ME|WB|
or   t3, t4, t5        |IF|ID|EX|  |WB|
sw  >t0<, 4(t3)           |IF>ID<EX|ME|  |
sll  t6, t0, t3              |IF|ID|EX|  |WB|
```

Solution: RegFile HW should **write-then-read** in same cycle
- Exploits high speed of RegFile (100 ps + 100 ps)
- Might not always be possible in high-frequency designs
```
In one cycle:
|>>> Reg    |
|    Reg >>>|
```

#### Data Hazard 2: ALU Result
Problem: Instruction ==depends on WB's RegFile write from previous instruction==.
- Instructions that **reads old value** calculates wrong result

```
add >s0<, t0, t1 |IF|ID|EX|  >WB<
sub  t2,>s0<, t1    |IF>ID|EX|  |WB|
or   t6, s0, t3        |IF>ID<EX|  |WB|
xor  t5, t1, s0           |IF|ID|EX|  |WB|
sw   s0, 4(t4)               |IF|ID|EX|ME|WB|

s0 value         |5 |5 |5 |5|5/9|9 |9 |9 |9 |
```

##### Solution 1: Stalling
"Bubble" to effectively **`nop`**
- Affected pipeline stages do nothing during clock cycles
- Stall all stages preventing PC, IF/ID pipeline register from writing (see textbook)
```
add  s0, t0, t1 |IF|ID|EX|ME|WB|
sub -> nop         |IF|()|()|()|()|
sub -> nop            |IF|()|()|()|()|
sub  t2, s0, t0          |IF|ID|EX|ME|WB|
```

Stalls reduces performance
- Compiler could rearrange code/insert nops to avoid hazards, but this requires knowledge of the pipeline structure

##### Solution 2: Forwarding
**Forwarding**, aka bypassing, uses the result when it is computed.
- Don't wait for value to be stored into RegFile
- Instead, grap operand from the pipeline stage