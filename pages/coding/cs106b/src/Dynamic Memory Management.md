---
tags:
  - CS
  - CPP
  - CS106B
---
Dynamic Memory Management
===
## Stack Memory and Heap Memory
```cpp
/*
 * Array created on the stack
 */
int func1(int foo) {
  const int MAX_CAPACITY = 100;
  int array[MAX_CAPACITY];
}
```
- Array is inside a function frame and defined on the ***stack***
- Static memory allocation
- Variables on the stack are stored directly to the memory, fast access
- Memory managed autometically (with the stack frame created and discarded automatically)

```cpp
void func2() {
  string *arr = new string[numValues];
}
```
- Request memory from the ***heap***
- Dynamic Memory Allocation
- Gain more control over variables on the heap
- Manual memory management

Diagram:
```
|Stack frame of main()              |
|local_To_Main                      |
|                                   |
|-----------------------------------|
|Stack frame of func1()             |
|local_To_Function1                 |
|MAX_CAPACITY=100                   |
|array                              |
|                                   |
|-----------------------------------|
|Stack frame of func2()             |
|local_To_Function2                 |
|arr                                |
|     \               STACK         |
|------\---------------|------------|
|       \             \|/           |
|        \                          |
|         \                         |
|          \                 ^      |
|           \                |      |
|------------\---------------|------|
|   HEAP      \       ------        |
|              \---> |string|       |   
|                     ------        |
|-----------------------------------|
|                                   |
|   UNINITIALIZED DATA (BSS)        |
|                                   |
|-----------------------------------|
|                                   |
|      INITIALIZED DATA             |
|      (Global Variables)           |
|                                   |
|(static)         |                 |
|                 |                 |
|                 |                 |
|(Read Only)      |(Read/Write)     |
|-----------------------------------|
|   Text or Code Segment            |
|                                   |
|-----------------------------------|
```


### Problems with Stack (Static) Allocation
For complicated data structures declared in function frames,
- If returning them by value, the copying process is slow
- If returning them by reference or pointer, the reference is a dead variable since the stack frame is already discarded on return

Solution:
- Using `new` to dynamically allocate a space in memory that **lives beyond the lifespan of the function** where it's set aside.
- Returning a pointer to that dynamically allocated memory space is fast


## `new` Operator and Dynamic Memory Allocation
The `new` operator sets aside memory for whatever data type we would like to hold and **returns the address of that memory block**.

Syntax:
```cpp
new DATA_TYPE;
```
That will return a pointer to the newly allocated memory space:
```cpp
DATA_TYPE *var = new DATA_TYPE;
```
For arrays:
```cpp
DATA_TYPE *var = new DATA_TYPE [ARRAY_LENGTH];
```

- `new` operator creates the data on the **heap memory**
- Should be manually released to the system using the `delete` operator
- `new` **returns the address** of the block of memory, to store it use a pointer
- Dynamic: the allocation and release of the memory cannot be predicted (i.e. user input, etc.)

### Memory Leak
If the program lose track of the dynamic allocated block of memory (lose the pointer variable, forget to release the memory...), the prgram will never be able to claim the memory back. This is called a ***memory leak***.

Memory leaks cause performance problem or even more dangerous consequences.

## DMA in Functions
To use dynamically allocatted variables in functions (to avoid memory leaks), we need the function to **return a pointer** to the dynamically allocated memory.

The data type of the function should be a pointer whose type is in consistence with the dynamically allocated variable.

```cpp
Quokka *createQuokka() {
  cout << "In createQuokka()..." << endl;
  getLine();
   Quokka *q = new Quokka("Muffinface");

  cout << "About to leave createQuokka()..." << endl;
  getLine();

  return q;
}
```
- Fast, returning a small pointer holding an address
- No copy of data structures

`[!!TODO:TODO]` Memory diagram
## Releasing Memory
When a dynamically allocated variable is not used any more, use **`delete`** statement to release that piece of memory.

Syntax:
```cpp
delete POINTER_TO_SPACE;
```
For arrays, add `[]`:
```cpp
delete[] POINTER_TO_SPACE;
```

**For every `new`, a single `delete`!**
## Example: Array-Based Stack
[[Array-Based Stack]]