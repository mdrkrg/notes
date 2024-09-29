---
tags:
  - CS
  - C
  - CS61C
---
Generics
===
## Function Pointers
Function pointers are variables storing addresses of a function.

Declaration
```c
int (*fp) (int, int) = &foo;
int (*fp) (int, int) = foo; // Can only be omitted for function pointers
```
- `fp` is a function pointer that takes in two `int`s as parameter and returns an `int`

Usage
```c
(*fp)(x, y);
fp(x, y); // Can only be omitted for function pointers
```

Convention:
- Omitting `&` and `(*...)` follows the “less is more” ideology
- Leaving them in follows the “be clear” / “defensive programming” ideology
- Write `&foo` and `foo()`?

Example: `map`
```c
/* Mutates an array ARR of length N by 
 * replacing each element of ARR with
 * the result of calling FP on that element. */
void map(int arr[], size_t n, int (*fp)(int)) {
  for (int i = 0; i < n; i++) {
    arr[i] = fp(arr[i]); // remember that arr[] is a pointer!
  }
}
```

## Generic Pointers
The `void *` pointer is a generic pointer (pointer to anything).
- You can never, ever dereference a `void*` pointer
- You can’t do pointer arithmetic with `void*` pointers
- `void*` pointers can be safely and automatically converted to other pointer types
	- Other than function pointers

```c
void **doubleptr = int *&p;
printf("%p\n", *doubleptr);
sizeof(void *); // Size of any pointer
```



## Generic Functions
### Generic Memory Functions
- `void* memcpy(void *dest, void *src, size_t count);`
	- Copies count bytes from `src` to `dest`.
	- Undefined behavior if src and dest overlap (i.e. `(char *) src + count >= dest)`
	- Fast!!
- `void* memmove(void *dest, void *src, size_t count);`
	- Copies count bytes from `src` to `dest`.
	- No problems if src and dest overlap `(i.e. (char *) src + count >= dest)`
	- Slow!!
- Both
	- Return a copy of `dest`
	- Fail if either `src` or `dest` are invalid or `NULL`.

### Swapping
```c
void swap(void *x, void *y, size_t nbytes) {
  char tmp[nbytes];         // Create space to hold x;
  memcpy(tmp, x  , nbytes); // Save value of x in tmp
  memcpy(x  , y  , nbytes); // Copy value in y to x
  memcpy(y  , tmp, nbytes); // Copy value in tmp to y
}
```
- `sizeof(char) == 1` by definition, char is C's version of a byte
- Cannot `*x = *y` because cannot dereference `void *`

### Swap Ends
```c
void swap_ends(void *arr, size_t nelems, size_t nbytes) {
  void *start = arr;
  void *end   = (char *) arr + (nelems - 1) * nbytes;
  swap(start, end, nbytes);
}
```
- `(char *) arr + (nelems - 1) * nbytes`
	- `(char *)` converts `void *` to `char *`
	- `sizeof(char) == 1`, C pointer arithmetic automatically multiplies by the size of the pointer type
	- `arr[nelems - 1]` is `*(arr + (nelems - 1))`

