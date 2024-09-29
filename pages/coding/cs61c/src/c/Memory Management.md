---
tags:
  - CS
  - C
  - CS61C
---
Memory Management
===
## C Memory Model
A program's address space contains 4 regions:
- Stack: local variables inside functions, grows downward
- Heap: space requested for pointers via malloc(); resizes dynamically, grows upward
- Static Data: variables declared outside main, does not grow or shrink
- Code (aka Text): loaded when program starts, does not change
- 0x00000000 chunk is unwriteable/unreadable so you that crash on `NULL` pointer access

```
      +--------+  Last Address of RAM
      | Stack  |
      |   |    |
      |   v    |
      +--------+
RAM   |        |
      |        |
      +--------+
      |   ^    |
      |   |    |
      |  Heap  |
      +--------+
      | Static |
      +--------+
      |  Code  |  
      +========+  First Address of RAM
```

## Variable Allocate Location
Static and stack memories are managed automatically, while heap memories should be managed manulaly.
- Global (outside function): Static, entire lifetime of program
- Local (inside function): Stack, freed when function returns
- Dynamic (`malloc`): Heap, freed when `free` is called

### The Stack
Every time a function is called, a new "stack frame" is allocated on the stack.
- Last in, first out (LIFO)

Includes:
- Return “instruction” address (who called me?)
- Arguments
- Space for other local variables

Stack frames are contiguous blocks of memory, **stack pointer** indicates start of stack frame.

When a function ends, stack frame is tossed off the stack, frees memory for future stack frames.

```
fooA() { fooB(); }
fooB() { fooC(); }
fooC() { ... }

      +--------+
      | fooA   |
      +--------+
      | fooB   |
      |        |
      +--------+
      | fooC   |
SP--> +--------+
      |   |    |
      |   v    |
```

#### Passing Pointers into the Stack
- Passing a pointer down: Legit
- Returning a pointer from the stack: Dangerous!
	- Local variables disappear when the stack is poppped
	- The pointer may causes segmentation fault

### The Heap
The heap is **dynamic memory** - memory that can be allocated, resized, and freed during program runtime.
- Large pool of memory, not allocated in contiguous order

https://man7.org/linux/man-pages/man3/malloc.3.html
In C, specify number of bytes of memory explicitly to allocate item.
- `malloc()` allocates raw, uninitialized memory from heap
- `free()` frees memory on heap
- `realloc()` resizes previously allocated heap blocks to new size

Heap memory gets reused only when programmer explicitly cleans up.

## Dynamic Memory Allocation
### `void *malloc(size_t n)`
Allocates a block of uninitialized memory.
- `size_t n` is an unsigned integer type big enough to “count” memory bytes
- Returns `void *` pointer to block of memory on heap
- A return of `NULL` indicates no more memory (always check for it!!!)

To allocate a struct:
```c
typedef struct { ... } TreeNode;
TreeNode *tp = (TreeNode *) malloc(sizeof(TreeNode));
```
- `(TreeNode *)` casts return value from `void *` to `TreeNode *`
- `sizeof(type)` gives size in bytes

To allocate an array of 20 `int`s:
```c
int *ptr = (int *) malloc(20 * sizeof(int));
```

### `void free(void *ptr)`
Dynamically frees heap memory that the `ptr` is pointed to.
```c
int *ptr = (int *) malloc(sizeof(int) * 20);
...
free(ptr); // implicit typecast to (void *)
```

==Should pass the original address returned from `malloc()`, or crashes!==

### `void *realloc(void *ptr, size_t size)`
Resize a previously allocated block at `ptr` to a new `size`.
- Returns new address of the memory block.
	- In doing so, it may need to copy all data to a new location
- `realloc(NULL, size); // behaves like malloc`
- `realloc(ptr, 0); // behaves like free, deallocates heap block`

> [!important]
> Always check for return `NULL`, which means no memory to allocate!

```c
int *ip; ip = (int *) malloc(10 * sizeof(int));
... ... ... /* check for NULL */
ip = (int *) realloc(ip, 20 * sizeof(int));
/* contents of first 10 elements retained */
... ... ... /* check for NULL */
realloc(ip, 0); /* equivalent to free(ip); */
```

### Common Errors
- Failure to free - Memory leak
- Use after free
- Double-Free
- Forgetting `realloc()` can move data

### Tools for Managing Memory Failure
- Valgrind