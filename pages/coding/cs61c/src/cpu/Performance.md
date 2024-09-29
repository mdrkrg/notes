---
tags:
- CS
- ComputerStructure
---
Performance
===
## Performance Measures
Improving performance:
- Quicker response time (one job faster)
- More jobs per unit time (pipelining)
- Better energy efficiency

Performance factors:
- Program execution time
- Throughput (overall time to finish)
- Energy per task

### Iron Law of Processor Performance
$$\frac{\text{time}}{\text{program}} = \frac{\text{instructions}}{\text{program}}\cdot \frac{\text{cycles}}{\text{instructions}}\cdot\frac{\text{time}}{\text{cycle}}$$
- CPI = Cycles per Instruction, how many clock cycles for one average instruction to finish
	- ISA
	- Processor implementation
		- RISC-V, CPI = 1
		- CISC, CPI >> 1
		- Superscalar processors, CPI < 1
- Instructions per Program
	- Task
	- Algorithm
	- Programming language
	- Compiler
	- ISA
- Time per Cycle
	- Processor microarchitecture (**critical path**)
	- Technology
	- Power budget (lower voltage reduce transistor speed)