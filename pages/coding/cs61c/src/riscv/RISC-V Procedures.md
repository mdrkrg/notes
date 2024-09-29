---
tags:
- CS
- ComputerStructure
---
RISC-V Procedures
===
## Function Calls
### Steps in Calling a Function
1. Put arguments in a place where function can access them
2. Transfer control to function
3. Acquire (local) storage resources needed for function
4. Perform desired task of the function
5. Put return value in a place where calling code can access it and restore any registers you used; release local storage
6. Return control to point of origin, since a function can be called from several points in a program

### Instruction for Function Calls
- Arguments: load arguments into `a0` - `a7`
- Save the point of return
	- `addi ra zero (line of code)` and `j foo`
	- `jal ra label` of just `jal label`
		- This will automatically do `addi ra pc 4`
		- and then jump to label
- Returning from function
	- `jr ra` of `ret`

Actually, only two instructions:
- `jal rd, Label` – jump-and-link
- `jalr rd, rs, imm` – jump-and-link register

`j`, `jr` and `ret` are pseudoinstructions!
- `j`: `jal x0, Label`


## Stack
In RISC-V, we have to manipulate the stack ourselves.
- Register `x2` is the stack pointer (sp), and is defined to point to the bottom (last call) of the stack.

### Rules for Manipulating the Stack
- At the beginning of the function…
	- Data above the sp is considered **immutable**.
		- **You may not modify anything above the sp without permission.**
	- Data **below** the sp is considered **mutable**
		- The function may modify anything below the sp
		- But another function can modify it, so you cannot leave the data there and expect it to stay there
- During the function, we can allocate space on the stack by decrementing the stack pointer
- But after finishing the function call, the sp must be set to its value from before the function call

```
# Data above the sp is immutable
# Data below the sp is mutable (available)

fooB:                 #      | mem addr |   data    |
addi sp sp -8 <-PC    #      |0xFFFFFF0C| inmutable |
...                   #  sp__|0xFFFFFF08| for fooB  |
jal ra fooC           #      |0xFFFFFF04| available |
...                   #      |0xFFFFFF00| for use   |
addi sp sp 8          #      |0xFFFFFEFC| mutable   |
jr ra                 #           sp: 0xFFFFFF04

# Allocate stack space for fooB

fooB:                 #      | mem addr |   data    |
addi sp sp -8         #      |0xFFFFFF0C| inmutable |
... <-PC              #      |0xFFFFFF08| for fooB  |
jal ra fooC           #      |0xFFFFFF04| allocated |
...                   #  sp__|0xFFFFFF00| fooB      |
addi sp sp 8          #      |0xFFFFFEFC|...        |
jr ra                 #           sp: 0xFFFFFEFC

fooB:                 #      | mem addr |   data    |
addi sp sp -8         #      |0xFFFFFF0C| inmutable |
...                   #      |0xFFFFFF08| for fooB  |
jal ra fooC <-PC      #      |0xFFFFFF04| inmutable |
...                   #  sp__|0xFFFFFF00| for fooC  |
addi sp sp 8          #      |0xFFFFFEFC|...        |
jr ra                 #           sp: 0xFFFFFEFC

# After fooC returns, sp should remain the same

# Restore sp to the value from before the function call

fooB:                 #      | mem addr |   data    |
addi sp sp -8         #      |0xFFFFFF0C| inmutable |
...                   #      |0xFFFFFF08| for fooB  |
jal ra fooC           #      |0xFFFFFF04| inmutable |
...                   #  sp__|0xFFFFFF00| for fooC  |
addi sp sp 8 <-PC     #      |0xFFFFFEFC|...        |
jr ra                 #           sp: 0xFFFFFEFC

# After return, the stack can be overwritten
# (local variable no longer reachable)

fooB:                 #      | mem addr |   data    |
addi sp sp -8         #      |0xFFFFFF0C| return    |
...                   #  sp__|0xFFFFFF08| in fooA   |
jal ra fooC           #      |0xFFFFFF04| available |
...                   #      |0xFFFFFF00|           |
addi sp sp 8          #      |0xFFFFFEFC|           |
jr ra <-PC            #           sp: 0xFFFFFEFC
```

## Calling Convention

| Register | ABI Name | Description                       | Saver  |
| -------- | -------- | --------------------------------- | ------ |
| x0       | zero     | Hard-wired zero                   | -      |
| x1       | ra       | Return address                    | Caller |
| x2       | sp       | Stack pointer                     | Callee |
| x3       | gp       | Global pointer                    | -      |
| x4       | tp       | Thread pointer                    | -      |
| x5       | t0       | Temporary/Alternate link register | Caller |
| x6-x7    | t1-2     | Temporaries                       | Caller |
| x8       | s0/fp    | Saved register/Frame pointer      | Callee |
| x9       | s1       | Saved register                    | Callee |
| x10-11   | a0-1     | Function arguments/Return values  | Caller |
| x12-17   | a2-7     | Function arguments                | Caller |
| x18-27   | s2-11    | Saved registers                   | Callee |
| x28-31   | t3-6     | Temporaries                       | Caller |

### C to RISC-V Example
```c
int foo;
int main() {
  int a = 5;
  int b = 6;
  int c = foo(a + b);
  a = a + b - c;
  return a;
}

int foo(int a) {
  a = a - 9;
  return a;
}
```
Painful:
```RISC-V
main:
  addi x5 x0 5  # a
  addi x6 x0 6  # b
  add  x7 x5 x6 # tmp = a + b
  jal  x1 foo   # jump to foo
  sub  x5 x7 x8 # a = tmp - foo(tmp)
  jr   x10      # return from main

foo:
  addi x8 x7 -9 # a - 9 (foo)
  jr x1         # return from foo

```
Solution: Standardize a set of conventions that everyone agrees to follow.
- Each register is given a name according to what its role is

### Terminlogy
- Callee: the function being called (foo)
- Caller: the calling function (main)
- A function can be both a callee and caller!

When callee returns from executing, the caller needs to know which registers may have changed and which are guaranteed to be unchanged.
### Callee-saved Registers
Registers that must be restored by the end of a function call (i.e. if you want to use it, the called function needs to save the old value)
Caller can rely on values being unchanged
- `sp`: The `x2` register (stack pointer)
- `gp`, `tp`
- `s0` - `s11`: Saved registers

As its name implies, ==saving the registers must be done by the callee==.

Example:
```RISC-V
main:
  ...
  addi s0 x0 5
  jal  ra foo   # call foo()
  addi s0 s0 6  # s0 will be still 5 and + 6 = 11
  ...
```

Use stack to store original value
```RISC-V
main:
  addi sp sp -8  # Allocate for 2 items
  sw   s0 0(sp)  # prologue: save s0
  sw   s1 4(sp)  # for use afterwards
  ...
  addi s0 x0 5
  addi s1 x0 8
  ...
  lw   s1 4(sp)  # epilogue: restore
  lw   s0 0(sp)  # register for caller
  addi sp sp 8   # Restore stack
  jr   ra        # jump back to calling routine
```


### Caller-saved Registers (Nested Calls)
Registers that do not need to be restored by a called function (i.e. if you want to save a variable in this register, it needs to be saved somewhere before you call another function)
Caller cannot rely on values being unchanged
- `ra` return address
	- Two new pseudoinstructions that explicitly use this:
		- `jal Label` -> `jal ra Label`
		- `ret` -> `jr ra`
- `a0` - `a7`: Registers used for function arguments
    - `a0`, `a1` also used for function outputs
	- If a function needs more than 8 arguments, can use the stack to store more arguments
- `t0` - `t6`: Temporary Registers


As its name implies, ==the callee have no obligation to save these registers==, if the register need to be restored, the caller must save it to stack.

```RISC-V
main: 
  ...
  addi t0 x0 8
  
  # Store t0 and ra in stack
  addi sp sp -8
  sw t0 0(sp)
  sw ra 4(sp)
  
  jal ra foo
  
  # Load t0 and ra from stack
  lw t0 0(sp)
  lw ra 4(sp)
  addi sp sp 8
  
  addi t0 t0 3 # We want t0 to be 11 after this line…
  ...
```

### Other Registers
(Out of scope)
- `gp`: The `x3` register, used to store a reference to the heap. Also called the "global pointer"
    
- `tp`: The `x4` register, used to store separate stacks for threads (multithreading)

## Memory Allocation
- C has two storage classes: automatic and static
	- Automatic variables are local to function and discarded when function exits
	- Static variables exist across exits from and entries to procedures
- Use stack for automatic (local) variables that don’t fit in registers
- **Procedure frame** or **activation record**: segment of stack with saved registers and local variables

```
sp_|██████████|   |██████████|sp_|██████████|
   |          |   |saved  ra |   |          |
   |          |   |saved a0..|   |          |
   |          |   |saved s0..|   |          |
   |          |sp_|local vars|   |          |
   before call    during call     after call
               (save if needed)
```

### Reserving Values During Call
```c
int sumSquare(int x, int y) {
  return multf(x, x) + y;
}
```
```RISC-V
sumSquare:
  addi sp, sp, -8    # space on stack (push)
  sw ra, 4(sp)       # save ret addr
  sw a1, 0(sp)       # save y
  mv a1, a0          # mult(x, x)
  jal mult           # call mult
  lw a1, 0(sp)       # restore y
  add a0, a0, a1     # mult() + y
  lw ra, 4(sp)       # get ret addr
  addi sp, sp, 8     # restore stack (pop)
  jr ra
```

### Procedure Frame
Also called **activation record**.
The segment of the stack containing a procedure's saved registers and local variables.

```
Before call:

  High Address
FP->|---------------|
    | ///////////// |
SP->|---------------|
    |               |
    |               |
    |               |
    |               |
    |               |
  Low Address

During call:

  High Address
    |               |
    |               |
FP->|---------------|
    |Saved argument |
    |Saved ra       |
    |Saved registers|
    |Local variable |
    |Local structure|
SP->|---------------|
    |               |
  Low Address

After call:

  High Address
FP->|---------------|
    | ///////////// |
SP->|---------------|
    |               |
    |               |
    |               |
    |               |
    |               |
  Low Address
```
- FP (not mentioned in course): The frame pointer, `fp` or `x8`, points to the first word of the frame, denoting the location of the saved registers and local variables for a given procedure
	- Often a saved argument register
	- Usage:
		- If no local variables, not used
		- When used, initialized using `sp` on a call, and `sp` is restored using `fp` (alt way)
		- Not strictly necessary in RISC-V
		- Enable *stack rewind*

### Memory Model
RV32 convention:
- **Stack** starts in high memory and grows down
	- Hexadecimal: **`0xbfff fff0`**
	- Stack ==must be aligned on 16-byte boundary== (not true in previous examples)
- RV32 programs (**text** segment) in low end
	- **`0x0001 0000`**
- **Static** data segment (constants and other static variables) above text for static variables
	- RISC-V convention global pointer (`gp`) points to static
	- RV32 **`gp` = `0x1000 0000`**
- **Heap** above static for data structures that grow and shrink; grows up to high addresses

```
sp = 0xbfff fff0 ┌───────────────┐
                 │     Stack     │
                 │       |       │
                 │       V       │
                 ┆               ┆
				 │       ^       │
                 │       |       │
                 │      Heap     │
                 ├───────────────┤
                 │  Static Data  │
	 0x1000 0000 ├───────────────┤
                 │     Text      │
pc = 0x0001 0000 ├───────────────┤
                 │    Reserved   │
                 └───────────────┘
```

