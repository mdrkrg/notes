---
tags:
- CS
- ComputerStructure
---
Parallelism
===
> [!quote]
> “The real problem is that programmers have spent far too much time worrying about efficiency in the wrong places and at the wrong times; premature optimization is the root of all evil (or at least most of it) in programming.”
> 
> – Donald Knuth
> “The Art of Computer Programming”
> 
> - Get everything works fine before adding parallelism
## Flynn's Taxonomy
<table>
	<caption>
		Software vs. Hardware Parallelism
	</caption>
	<thead>
		<tr>
			<th rowspan='2' colspan='2'></th>
			<th colspan='2'><center>Software</center></th>
		</tr>
		<tr>
			<th><center><b>Sequential</b></center></th>
			<th><center><b>Concurrent</b></center></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan='2'><b>Hardware</b></td>
			<td><b>Serial</b></td>
			<td>Single program on Intel Pentium 4</td>
			<td>OS on Intel Pentium 4</td>
		</tr>
		<tr>
			<td><b>Parallel</b></td>
			<td>Single program on Intel Core i7</td>
			<td>OS on Intel Core i7</td>
		</tr>
	</tbody>
</table>

- Choice of hardware and software parallelism are independent
- **Flynn's Taxonomy** is for parallel hardware

### Single Instruction/Single Data Stream (SISD)
- Sequential computer that exploits no parallelism in either the instruction or data streams
- Examples of SISD architecture are traditional uniprocessor machines

![[SISD.svg]]
- PU is Processing Unit

### Single Instruction/Multiple Data Stream (SIMD)
- Computer that applies a single instruction stream to multiple data streams for operations that may be **naturally parallelized**
	- e.g. SIMD instruction extensions or GPU

![[SIMD.svg]]


> [!example] Exploiting Data Parallelism
> Web RGB format only takes 1 byte for each color, even with transparency, it only takes 4 total bytes, and each byte can be operated alone. So Web color processing can take the advantage of data parallelism by spliting the word up into 3 parts and handle them in parallel.

### MIMD
- Multiple autonomous processors simultaneously executing different instructions on different data
- MIMD architectures include multicore and Warehouse Scale Computers

![[MIMD.svg]]

### Conclusion
<table>
	<caption>
		Flylnn's Taxonomy
	</caption>
	<thead>
		<tr>
			<th rowspan='2' colspan='2'></th>
			<th colspan='2'><center>Data Streams</center></th>
		</tr>
		<tr>
			<th><center><b>Single</b></center></th>
			<th><center><b>Multiple</b></center></th>
		</tr>
	</thead>
	<tbody>
		<tr>
			<td rowspan='2'><b>Instruction<br />Streams</b></td>
			<td><b>Single</b></td>
			<td>SISD: Intel Pentium 4</td>
			<td>SIMD: SSE instructions of x86</td>
		</tr>
		<tr>
			<td><b>Multiple</b></td>
			<td>MISD: No example</td>
			<td>MIMD: Intel Xeon e5343 (Clovertown)</td>
		</tr>
	</tbody>
</table>

- SIMD and MIMD most commonly encountered today
- Most common parallel processing programming style: Single Program Multiple Data (“SPMD”)
	- Single program that runs on all processors of an MIMD
	- Cross-processor execution coordination through conditional expressions (will see later in Thread Level Parallelism)
- SIMD: specialized function units (hardware), for handling lock-step calculations involving arrays
	- Scientific computing, machine learning, signal processing, multimedia (audio/video processing)

## SIMD Architectures
> [!info] **Data-Level Parallelism (DLP)**
> Executing one operation on multiple data streams

Example:
```python
[c[i] * x[i] for i in range(0, n)]
```
- Sources of performance improvement:
	- One instruction is fetched & decoded for entire operation
	- Multiplications are known to be **independent**
	- Pipelining/concurrency in memory access as well
- To improve performance, Intel's SIMD instructions
	- Fetch one instruction, do the work of multiple instructions
	- MMX (MultiMedia eXtension, Pentium II processor family)
	- SSE (Streaming SIMD Extension, Pentium III and beyond)

### XMM Registers in SSE
XMM Registers are extra hardware to support Intel SSE extension.
-  Architecture extended with eight 128-bit data registers
	- 64-bit address architecture: available as 16 64-bit registers (`%xmm0`-`%xmm15`)
- e.g. 128-bit packed single-precision floating-point data type, allows four single-percision operations to be performed simultaneously

Intel Architecture SSE2+128-Bit SIMD Data Types (fit in one XMM Register)
- Packed Bytes 16 / 128 bits
- Packed Words 8 / 128 bits
- Packed Doublewords 4 / 128 bits (4 single fp)
- Packed Quadwords 2 / 128 bits (2 double fp)

See more: 512/256/128/64-bit AVX Registers


### SIMD Array Processing
Example:
```
for each f in array:
    f = sqrt(f)
```

SISD:
```
for each f in array {
  load f to the fp register
  calculate sqrt
  write result from register to mem
}
```

SIMD:
```
for every 4 member in array {
  load 4 members to the SSE register
  calculate 4 square roots in one operation
  write the result from the register to memory
}
```
***

Example: Add Single-Percision FP Vectors
```
vec_res.x = v1.x + v2.x
vec_res.y = v1.y + v2.y
vec_res.z = v1.z + v2.z
vec_res.w = v1.w + v2.w
```

SSE Instruction Sequence:
```x86
movaps  address-of-v1, %xmm0
  // Move from mem to XMM reg memory Aligned, Packed Single percision
  // v1.w | v1.z | v1.y | v1.x -> xmm0
addps   address-of-v2, %xmm0
  // ADD from mem to XMM reg Packed Single percision
  // v1.w + v2.w | ...  -> xmm0
movaps  %xmm0, address-of-vec_res
```

#### Intel SSE Intrinsics
> [!info] Intrinsic Functions
> The C and C++ **intrinsic functions** either **allow for direct access to some hardware instructions or result in generation of inline code to perform some specialized functions**. These intrinsic functions are processed completely by the compiler. (including SSE instructions)
> - With intrinsics, program can use these instructions indirectly
> - One-to-one correspondence between SSE instructions and intrinsics

- Vector data type
	- `__m128d`
- Load and store
	- `_mm_load_pd` => `MOVAPD`
	- `_mm_store_pd` => `MOVAPD`
- Arithmetic
	- `_mm_add_pd` => `ADDPD` add, packed double
	- `_mm_mul_pd` => `MULPD` mul, packed double

https://piotte13.github.io/SIMD-Visualiser/#/
https://godbolt.org/z/J7HXBk

#### RISC-V Vector Extensions
RISC-V's SIMD instruction and hardware extension.

Example:
`vadd vd, vs1, vs2` (add two 512-bit vectors stored in vector registers)

## Thread-Level Parallelism
Multiprocessor Execution Model
- Each processor (core) executes its own instructions
- **Separate** resources
	- Datapth (PC, regfile, ALU)
	- Hightest level caches (L1, L2)
- **Shared** resources
	- Memory (DRAM)
	- L3 Cache on same chip

Nomenclature:
- Multiprocessor Microprocessor
- Multicore Processor

### Multicore
-  Shared memory
	-  Each “core” has access to the entire memory in the processor
	-  Special hardware keeps caches consistent
	-  Advantages:
		- Simplifies communication in program via shared variables
	-  Drawbacks:
		- Does not scale well:
			-  “Slow” memory shared by many cores
			-  May become bottleneck (Amdahl’s Law)
-  Two ways to use a multiprocessor:
	-  **Job-level parallelism**
		- Processors work on **unrelated** problems
		- No communication between programs
-  Partition work of single task between several cores
		- E.g., each performs part of large matrix multiplication

### Threads
A Thread stands for “**thread of execution**”, is a single stream of instructions.
- A program / process can split, or fork itself into separate threads, which can  execute simultaneously.

With a single core, a single CPU can execute many threads by **Time Sharing**.
```
CPU Time ░░░░▒▒▒▒▒▒▓▓▓░░░░░░░░
░ Thread 0
▒ Thread 1
▓ Thread 2
```

- Program: Sequential flow of instructions that performs some task
- Each thread has:
	- Dedicated PC
	- Separate registers
	- Access to the shared memory
- Each physical core provides one (or more)
	- **Hardware threads** that actively execute instructions
	- Each executes one “hardware thread”
- **Operating system** multiplexes multiple
	- **Software threads** onto the available hardware threads
	- All threads except those mapped to hardware threads are **waiting**

> [!quote]
> "Although threads seem to be a small step from sequential computation, in fact, they represent a huge step. They discard the most essential and appealing properties of sequential computation: understandability, predictability, and determinism. Threads, as a model of computation, are wildly non-deterministic, and the job of the programmer becomes one of pruning that nondeterminism."
### Operating System Threads
System threads handled by the OS give illusion of "simultaneously" active threads. OS decides which software thread is mapped to which hardware thread.
1. Multiplex software threads onto hardware threads
	- Switch out blocked threads
		- Cache miss (cache miss bit indicating)
		- User input
		- Network access
	- Timer (e.g., switch active thread every 1 ms)
2. Remove a software thread from a hardware thread by
	1. Interrupting its execution
	2. Saving its register and PC to memory
3. Start executing a different software thread by
	1. Loading its previously saved register into a hardware thread's registers
	2.  Jumping to its saved PC

### Multithreading
> [!info] **Hardware Assisted Software Multi-Threading**
> More than one copy of PC and Registers can exist in one single CPU hardware (1 ALU, 2 PC, 2 RegFile)
> - Looks identical to two processors to software (==Abstraction for software==: Hardware thread 0, 1, ...)
> - Simultaneous Multi-Threading SMT (aka "*Hyper-Threading*"): Exploits superscalar architecture, threads can be active simultaneously, Logical CPUs > Physical CPUs
> - Share resources (cache, instruction unit, execution unit)
> 
> ```
> 1 core, 2 threads
> +-----------+
> |  Control  |
> | PC0   PC1 |
> | Reg0 Reg1 |
> |    ALU    |
> +-----------+
> ```

- Logical threads
	- ≈ 1% more hardware
		- Separate registers
		- Share datapath, ALU(s), caches
	- ≈ 10%? better performance
- Multicore
	- => Duplicate Processors
	- ≈ 50% more hardware
	- ≈ 2x better performance
- Modern machines do both

Biggest problem of multi-core: Shared Memory

## OpenMP
Serial Loops:
```c
for (int i = 0; i < 100; i++) {
  ...
}
```

Parallel Loops:
```
Thread0:
for (int i = 0; i < 25; i++) { ... }

Thread1:
for (int i = 25; i < 50; i++) { ... }

...
```

OpenMP
- C extension
- Multi-threaded, shared-memory parallelism
	- Compiler Directives, `#pragma`
	- Runtime Library Routines, `#include <omp.h>`
- `#pragma`
	- Ignored by compilers unaware of OpenMP
	- Same source for multiple architectures (same program for 1 & 16 cores)
- Only works with shared memory
- Thread type: Software Thread
	- OS multiplex onto hardware threads

### Parallel `for` in OpenMP
```c
#include <omp.h>

#pragma omp parallel for
for (int i = 0; i < 100; i++) { ... }
```

Example:
```c
#include <stdio.h>
#include <omp.h>

int main() {
  omp_set_num_threads(4);
  int a[] = { 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 };
  int N = sizeof(a) / sizeof(int);
  
  #pragma omp parallel for
  for (int i = 0; i < N; i++) {
    printf("thread %d, i= %2d\n",
      omp_get_thread_num(), i);
    a[i] = a[i] + 10 * omp_get_thread_num();
  }
  for (int i = 0; i < N; i++)
    printf("%02d ", a[i]);
  printf("\n");
}
```
```shell
$ gcc -Xpreprocessor -fopenmp -lomp -o for for.c; ./for
thread 0, i = 0
thread 1, i = 3
thread 2, i = 6
thread 3, i = 8
...
00 01 02 13 14 15 26 27 38 39
```
Break `for` loop into chunks, and allocate each to a separate thread

Rules:
- Must have relative simple "shape" for an OpenMP-aware compiler to be able to parallelize it
	- For system to determine how many iterations to assign to each thread
- No premature exits from the loop allowed
	- No `break`, `return`, `exit`, `goto` statements (don't jump outside of any `pragma` block)
### OpenMP Programming Model
- Fork - Join Model:
```
        F ---> J
master  O ---> O
------>   --->   --->
thread  R ---> I
        K ---> N
   { parallel region }
```
- OpenMP programs begin as single process (**main thread**)
	- Sequential
- When parallel region is encountered
	- Master thread “**forks**” into team of parallel threads
	- Executed simultaneously
	- At end of parallel region, parallel threads ”**join**”, leaving only master thread
- Process repeats for each parallel region

### Example 2: Computing $\pi$
```c
#include <stdio.h>
void main() {
  const long num_steps = 10;
  double step = 1.0 / (double) num_steps;
  double sum = 0.0;
  for (int i = 0; i < num_steps; i++) {
    double x = (i + 0.5) * step;
    sum += 4.0 * step / (1.0 + x*x);
  }
  printf("pi = %6.12f", sum);
}
```


Problem of parallelising:
- Each thread needs to access **the shared variable `sum`**
- Code runs sequentially

Solution:
1. Compute `sum[0]`, `sum[1]`, ... in parallel
2. Compute `sum = sum[0] + sum[1] + ...` sequentially

```c
#include <stdio.h>
#include <omp.h>
#define THREAD_NUMBER 4
void main() {
  omp_set_num_threads(THREAD_NUMBER);
  double sum[THREAD_NUMBER] = {0.0};
  const long num_steps = 10;
  double step = 1.0 / (double) num_steps;
  #pragma omp parallel
  {
    int id = omp_get_thread_num();
    for (int i = id; i < num_steps; i += THREAD_NUMBER) {
      double x = (i + 0.5) * step;
      sum[id] += 4.0 * step / (1.0 + x*x);
    }
  }
  double pi = 0.0;
  for (int i = 0; i < THREAD_NUMBER; i++)
    pi += sum[i];
  printf("pi = %6.12f", pi);
}
```
- Note `for (int i = id; i < num_steps; i += THREAD_NUMBER)`
	- Sample the iteration into **independent** slices
	- Each core do its own slice
- The sum up must happen in main thread
	- Or multiple threads accessing the same memory address, a **data race**
		- `pi = pi + sum[id]` 
		- Some threads read intermediate `pi` before another thread finished, not the one being incremented
	- Heisenbug, result is non-deterministic

> [!info] Race Condition
> The condition of a software where the system's substantive behavior ==is dependent on the sequence or timing of other **uncontrollable** events==, leading to **unexpected** or **inconsistent results**.
> It becomes a bug when one or more of the possible behaviors is undesirable. 
> 
> Two memory access form a data race if from ==different threads access same memory location==, at least one is a ==write==, and they occur one after another.

> [!note] Performance about Parallelism
> - The performance impact of number of threads is dependent on multiple factors
> - OpenMP decides how much work is divided for each thread
> - Other librarys get you more control on threads


## Synchronization
Avoid data races by synchronizing writing and reading to get deterministic bahaviour

### Locks
- Computers use locks to **control access to shared resources**
	- Processors take turn to access a shared resource
	- "Semaphore"
- Usually implemented with a variable
	- `int lock;` 0 for unlocked, 1 for locked

```c
// wait for lock released
while (lock != 0) ;
// lock == 0 now (unlocked)

// set lock
lock = 1;

// access shared resource ...
// e.g. pi
// sequential execution! (Amdahl ...)

// release lock
lock = 0;
```
- Problem: Thread 2 `while (lock != 0)` find `lock == 0` before thread 1 set `lock = 0`, they both set `lock = 1` and both execute with the lock.
- Solution: New assembly-level instructions

> [!info] Critical Seciton
> In concurrent programming, concurrent accesses to shared resources can lead to unexpected or erroneous behavior.
> Thus, the parts of the program ==where the shared resource is accessed need to be protected in ways that avoid the concurrent access==.
> One way to do so is known as a **critical section** or **critical region**. This protected section ==cannot be entered by more than one process or thread at a time==; others are suspended until the first leaves the critical section. 

### Hardware Synchronization
Atomic read/write
- Read & write in single instruction
	- No other access permitted between read and write
- Must use *shared memory* (multiprocessing)

Common implementations:
- Atomic swap of register and memory
	- Memory <-> Register at the same time
- Pair of instructions for "linked" read and write
	- write fails if memory location has been reached by another linked read

#### RISC-V Atomic Memory Operations (AMOs)
AMOs atomically **perform an operation on an operand in memory** and set the destination register to the **original memory value**.

- R-Type instruction format: `add`, `and`, `or`, `swap`, `xor`, `max`, `max unsigned`, `min`, `min unsigned`

```
 31      27 26 25 24      20 19      15 14  12 11       7 6            0
|  funct5  |aq|rl|   rs2    |   rs1    |funct3|    rd    |    opcode    |
      5     1  1       5          5        3        5           7
 operation ordering  src        addr    width     dest         AMO

amoadd.w rd, rs2, (rs1) #:
  # t = M[x[rs1]];
  # x[rd] = t;
  # M[x[rs1]] = t + x[rs2]
```
- Load from address in `rs1` to "t" (the value in memory)
- `rd` = "t"
- Store at address in `rs1` the result of ("t" op rs2)
- `aq` (acquire) and `rl` (release) to insure in order execution

#### RISC-V Critical Section
- Assume that the lock is in memory location stored in `a0`
- The lock is "set" if it's 1; it's "free" if it's 0 (initial)

```RISC-V
    li           t0, 1
Try:
    amoswap.w.aq t1, t0, (a0) # t1 get the old lock value
                              # while we set it to 1
    bnez         t1, Try      # if it was already 1, another
                              # thread has the lock
                              # so we need to try again
Locked:
    # ...
    # critical section
	# ...

Unlocked:
    amoswap.w.rl x0, x0, (a0) # store 0 in lock to release
```

#### OpenMP Locks
```c
#include <stdio.h>
#include <stdlib.h>
#include <omp.h>

int main(void) {
  omp_lock_t lock;
  omp_init_lock(&lock);
#pragma omp parallel
  {
    int id = omp_get_thread_num();
    // parallel section
    // ...
    
    omp_set_lock(&lock);
    // start sequential seciton
    // ...
    
    printf("id = %d\n", id);
    
    // end sequential section
    omp_unset_lock(&lock);
    
    // parallel section
    // ...
  }
  omp_destroy_lock(&lock);
}
```

### Synchronization in OpenMP
Synchronization are typically used in libraries of higher-level parallel programming constructs.

OpenMP offers `#pragma`s for common cases:
- critical
- atomic
- barrier
- ordered

See more features on [documentation](https://www.openmp.org/wp-content/uploads/OpenMPRefGuide-5.2-Web-2024.pdf) and [tutorial](http://openmp.org/mp-documents/omp-hands-on-SC08.pdf).

#### OpenMP Critical Section
Mutual exclution: Only one thread at a time can enter a `critical` region.
- Threads wait their turn
```c
#pragma omp parallel
{
  int id = omp_get_thread_num();
  for (int i = id; i < num_steps; i += NUM_THREADS) {
    double x = (i + 0.5) * step;
    sum[id] += 4.0 * step / (1.0 + x*x);
  }
#pragma omp critical
// Critical section!!
  pi += sum[id];
}
```

### Deadlock
A system state in which no progress is possible, usually happens within parallel programs, when each thread takes up some resources, but doesn't have enough to run, and to release these resources.

> [!info] Dining Philosopher's Problem:
> - Think until the left fork is available; when it is, pick it up
> - Think until the right fork is available; when it is, pick it up
> - When both forks are held, eat for a fixed amount of time
> - Then, put the right fork down
> - Then, put the left fork down
> - Repeat from the beginning
> 
> If the philosophers pick up the left fork in parallel, the right fork will never be available.

Solution: If deadlock happens (for a while), give up and release the lock. Acquire the resources later.

### OpenMP Timing
Elapsed wall clock time:
```c
double omp_get_wtime(void)
```
- Return elapsed wall clock time in seconds
- Time is measured per thread
- Time is measured from “some time in the past”
	- subtract results of two calls to `omp_get_wtime` to get elapsed time

```c
double start = omp_get_wtime();
//...
double end = omp_get_wtime();
double elapsed_time = end - start;
```


## Shared Memory and Caches
SMP: (Shared Memory) Symmetric Multiprocessor
- Two or more identical CPUs/Cores
- Single shared **coherent** memory

Multiprocessor Key Questions:
- How do they share data?
  Single address space shared by all processors/cores
- How do they coordinate?
  Processors coordinate/communicate through shared variables in memory (via loads and stores)
	- Use of shared data must be coordinated via synchronization primitives (locks) that allow access to data to only one processor at a time
- How many processors can be supported?

Multiprocessor Caches
- Each core has a local private cache holding data it has accessed recently
-  Only cache misses have to access the shared common memory

```
 Processor Processor Processor
     ^         ^         ^
     |         |         |
     V         V         V
   Cache     Cache     Cache
     ^         ^         ^
     |         |         |
     V         V         V
    Interconnection Network
        ^          ^
        |          |
        V          V
      Memory      I/O
```

### Cache Coherence
> [!warning] Situations when Parallel Caches Run into Trouble
> - Two cache read same address -> No problem
> - One cache writes to one address while other caches remains the old value -> Cache Incoherence!

Idea: When any processor has cache miss or writes, notify other processors via **interconnection network**
- If only reading, many processors can have copies
- If a processor writes, invalidate any other copies

When write transactions from one processor happens, other caches “**snoop**” the common interconnect checking for tags they hold
- Invalidate any copies of same address modified in other cache

Cache Block State: Works with only 1 and 2
1. Shared
	- up-to-date data
	- other caches may have a copy
2. Modified
	- up-to-date data
	- changed (dirty)
	- no other cache has a copy
	- OK to write
	- memory out-of-date (in write back policy)

Optional performance optimizations:
3. Exclusive
	- up-to-date data
	- no other cache has a copy
	- OK to write
	- memory up to date
	- Policy:
		- Avoids writing to memory if block replaced
		- Supplies data on read instead of going to memory
4. Owner
	- up-to-date data
	- other caches may have a copy (must be in shared state)
	- Policy and Behaviour:
		- One of several with a valid copy of the cache line
		- But has the exclusive right to make changes to it
		- must **broadcast** those changes **to all other caches sharing the line**
		- Allows **dirty sharing of data**: modified block get moved around without updating main memory
		- Can change into *Modified*: After **invalidating** all shared copies
		- Can change into *Shared*: After writing the modifications back to main memory
		- Must respond to a **snoop request** with data (from other caches to detect whether it is changed)

#### Snooping/Snoopy Protocals: MOESI
Memory access to cache is either:
- Modified (in cache)
- Owned (in cache)
- Exclusive (in cache)
- Shared (in cache)
- Invalid (not in cache)

|     | M                                                                                                                 | O                                                                                                                 | E                                                                                                                 | S                                                                                                                 | I                                                                                                                 |
| --- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------- |
| M   | ![Red X](https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/13px-Red_x.svg.png)                       | ![Red X](https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/13px-Red_x.svg.png)                       | ![Red X](https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/13px-Red_x.svg.png)                       | ![Red X](https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/13px-Red_x.svg.png)                       | ![Green tick](https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Green_check.svg/13px-Green_check.svg.png) |
| O   | ![Red X](https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/13px-Red_x.svg.png)                       | ![Red X](https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/13px-Red_x.svg.png)                       | ![Red X](https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/13px-Red_x.svg.png)                       | ![Green tick](https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Green_check.svg/13px-Green_check.svg.png) | ![Green tick](https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Green_check.svg/13px-Green_check.svg.png) |
| E   | ![Red X](https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/13px-Red_x.svg.png)                       | ![Red X](https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/13px-Red_x.svg.png)                       | ![Red X](https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/13px-Red_x.svg.png)                       | ![Red X](https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/13px-Red_x.svg.png)                       | ![Green tick](https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Green_check.svg/13px-Green_check.svg.png) |
| S   | ![Red X](https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/13px-Red_x.svg.png)                       | ![Green tick](https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Green_check.svg/13px-Green_check.svg.png) | ![Red X](https://upload.wikimedia.org/wikipedia/en/thumb/b/ba/Red_x.svg/13px-Red_x.svg.png)                       | ![Green tick](https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Green_check.svg/13px-Green_check.svg.png) | ![Green tick](https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Green_check.svg/13px-Green_check.svg.png) |
| I   | ![Green tick](https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Green_check.svg/13px-Green_check.svg.png) | ![Green tick](https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Green_check.svg/13px-Green_check.svg.png) | ![Green tick](https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Green_check.svg/13px-Green_check.svg.png) | ![Green tick](https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Green_check.svg/13px-Green_check.svg.png) | ![Green tick](https://upload.wikimedia.org/wikipedia/commons/thumb/0/03/Green_check.svg/13px-Green_check.svg.png) |

#### Coherence Misses
> [!example] **False Sharing**
> Situation:
> - Processor 0 writing to location 0 in cache 0
> - Processor 1 writing to location 1 in cache 1
> - Two location on the same cache block
> 
> Result:
> - Block ping-pongs between two caches even though processors are accessing disjoint variables
> 	- Cache controller write the first one, invalidating cache 1
> 	- Processor 1 need to handle the write miss, then write again
> - Effect called **false sharing**

- Misses caused by coherence traffic with other processor
- Also known as **communication misses** because represents data moving between processors working together on a parallel program
- For some parallel programs, coherence misses can dominate total misses