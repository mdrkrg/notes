---
tags:
  - CS
  - CPP
  - CS106B
---
Memory and Pointers
===
## Memory
### Bits, Bytes and Words
- Bit
	- Binary digit, 0 or 1
- Byte 
	- 8 bits
- Word
	- Multiple bytes assembled as larger structures
	- 16 bits, 32 bits ...
### Memory Address
Within the memory system, every byte is identified by a numeric **address**.

- Addresses are usually noted as hex numbers `0xff`


Different data types occupy different bytes of memory.
```cpp
sizeof(int) // Size of a type
sizeof x // Size of a variable
```

## Memory and Lvalues
Every variable we create in C++ has an address where it resides in memory. In C++, any expression that refers to an internal memory location capable of storing data is called an ***lvalue***.
- Every lvalue is stored somewhere in memory and therefore has an address.
- Once it has been declared, the address of an lvalue never changes, even though the contents of the lvalue may change.
- Depending on their data type, different lvalues require different amounts of memory.
- The address of an lvalue is a pointer value, which can be stored in memory and manipulated as data.

To access the address associated with a variable, we place an ampersand in front of the variable name.

```cpp
#include <iostream>
using namespace std;

int main() {
   int x = 55;

   cout << "x : " << x << endl;
   cout << "&x : " << &x << endl;

   return 0;
}
```

## Pointers
A ***pointer*** is simply a variable that holds a memory address.

Benefits:
- Refering to large data structure
- Reserving new memory during program execution
- Recording relationships among data items (linked lists, trees, etc.)


Syntax for declaring pointer variables:
```cpp
DATA_TYPE_POINTED_TO *NAME;
```

To create a variable named `p` that can hold the address of an integer, the syntax is as follows:
```cpp
int *p;
```
> [!EXAMPLE]
> ```cpp
> #include <iostream>
> using namespace std;
> 
> int main()
> {
>    int x = 55;
>    int *p = &x;
> 
>    cout << "x : " << x << endl;
>    cout << "&x : " << &x << endl;
> 
>    cout << endl;
> 
>    cout << "p : " << p << endl;
>    cout << "&p : " << &p << endl;
> 
>    return 0;
> }
> ```
> - `p` is **a pointer to** `x`
> - `p` has its own address `&p`
> 
### Pointer Declarations
Both styles are ok:
```cpp
int* p;
int *p;
```
But the following **only declears one pointer**:
```cpp
int* p, q, r;
```
- Only `p` is a pointer
- `q`, `r` are integers
### Pointer Types
The **type** of a pointer indicates the type of the value stored in an adress.
Designated by the `TYPE` on declaration.

Assignment of pointers between different types is **not allowed**, due to the different size of memory used by different types.
**Use forceful type cast** to assign across types.

### Pointer Operations
Pointers can be added, subtracted and assigned value, indicating the motion of the pointer on the memory.

Example:
```cpp
int x, y;
int *p1, *p2;
x = 1;
y = 2;
p1 = &x;
p2 = &y;
```
Memory diagram:
```
      +--------+
 0x00 |   1    | x
      +--------+
 0x04 |   2    | y
      +--------+
 0x08 |  0x00  | p1
      +--------+
 0x12 |  0x04  | p2
      +--------+
```
Performing operations on pointer:
```cpp
p1 += 4;
p2 -= 4;
```
Memory diagram:
```
      +--------+
 0x00 |   1    | x
      +--------+
 0x04 |   2    | y
      +--------+
 0x08 |  0x04  | p1
      +--------+
 0x12 |  0x00  | p2
      +--------+
```

**Pointer assignment**:
```cpp
p1 = p2; // Assign p2 to p1
```
**Value assignment**:
```cpp
*p1 = *p2; // Assign y to x
```
## Reference
### `&` Operator in Context
As relates to memory manipulation, there are actually **two** uses of the `&` operator:
- When we use `&` in a variable **declaration**, that creates a **reference**.
- When we use `&` on an **already-existing** variable, that gives us its **address**.

### Dereferencing Pointers
We can actually use a pointer to modify the contents of the variables they point to indirectly.
By ***dereference*** the pointer using `*` before the pointer variable.

Syntax:
```cpp
*p = VALUE;
```

Example:
```cpp
#include <iostream>
using namespace std;

int main() {
   int x = 55;
   int *p = &x;

   // Here, we DEREFERENCE p. We go to the address p holds, and that is where
   // we drop off the value 30. Notice that we are NOT setting p = 30. (We're
   // not dropping the value 30 into the box called p.)
   *p = 30;

   cout << "x : " << x << endl;
   cout << "&x : " << &x << endl;

   cout << endl;

   cout << "p : " << p << endl;
   cout << "&p : " << &p << endl;

   // We can also dereference p to find out what value is in the variable that
   // it's pointing to! The following line does not print the value inside p
   // itself. It goes to the address that p contains and tells us what it finds
   // in the box at that address.
   cout << "*p : " << *p << endl;

   return 0;
}
```
Memory diagram:
```
main():

  x   0x000000000001
  +----------------+
  |       30       |
  +----------------+

  p                   0x000000000002
  +--------------------------------+
  |          0x000000000001        |
  +--------------------------------+
```

### `*` Operator in Contexts
There are actually **two** uses of the `*` operator:
- When we use `*` in a variable **declaration**, that creates a **pointer**.
- When we use `*` on an **already-existing** variable, that **dereference** our pointer. (In other words, it **goes to** the address that our pointer is pointing to and then proceeds to operate on whatever variable it finds there.)

### Pointer and Reference
There are two approaches to using reference in functions.

Approach 1:
```cpp
#include <iostream>
using namespace std;

void foo(int& n) { n++; }

int main() {
   int n = 3;
   foo(n);

   cout << n << endl;

   return 0;
}
```
Memory diagram:
```
main()  
+----------------+  
|  n             |  
|  +-------+     |  
|  |   4   |     |  
|  +-------+     |  
+------↑---------+  
       |  
foo()  |  
+------|---------+  
|  n   |         |  
|  +---|---+     |  
|  |  0x01 |     |  
|  +-------+     |  
+----------------+
```
Approach 2:
```cpp
#include <iostream>
using namespace std;

void foo(int *n) { // Declaring a pointer parameter
  (*n)++; // Dereferencing and perform operation
} 

int main() {
   int n = 3;
   foo(&n); // Note that we are passing in an address

   cout << n << endl;

   return 0;
}
```
Memory diagram:
```
main()  
+----------------+  
|  n        0x01 |  
|  +-------+     |  
|  |   4   |     |  
|  +-------+     |  
+------↑---------+  
       |  
foo()  |  
+------|---------+  
|  *n  |    0x02 |  
|  +---|---+     |  
|  |  0x01 |     |  
|  +-------+     |  
+----------------+
```

## `nullptr`
For a pointer that do not want to assign a value for the moment, it can be assigned `nullptr`.

Dereferencing a null pointer will give you a ***segmentation fault***.

> **`NULL` and `nullptr`**
> `NULL` is the C-styled null pointer with the address 0.
> Dereference a `NULL` pointer will not throw segmentation error and may lead to unexpected error.

