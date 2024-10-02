---
tags:
  - CS
  - CPP
  - CS106B
---
Functions
===
![[C++ Basic Component#The `main()` Function]]

![[C++ Basic Component#Return Statements]]
## `void` Functions
If a function takes no parameters, we simply leave the parameter list within its parentheses blank.

If a function is not designed to have a return value, we give the function a return type of `void`, like so:

```cpp
#include <iostream>
#include "console.h"
using namespace std;

void greet() {
   cout << "hello :)" << endl;
}

int main() {
   greet();
   return 0;
}
```

A `void` function does not require a `return` statement.

### Returning Before Final Line
A `return` statement always terminates the function execution and force it to return a value.

If we `return` a `void` function, we are just skipping all the remaining statements.

## Default Parameter Values
```cpp
int function(int x, int y = Value) {
  ...
}
```

## Function Placement and Functional Prototypes
Functions can be introduced as ***prototypes*** before its definition.
By introducing prototypes, the function can be called before it is defined, therefore avoiding compiling error.


A **functional prototype** is just a ***function signature*** with a semicolon.
A **function signature** is that first line of your function's definition that gives the return type, function name, and parameter list.

```cpp
#include <iostream>
using namespace std;

// functional prototype
int square(int x);

int main() {
   cout << square(5) << endl;  // This is okay now.
   return 0;
}

int square(int x) {
   return x * x;
}
```

> If a prototyped is not defined but called, compiling error would occur at the end of the file.

## Function Calling Process
1. Evaluate all the arguments (recursive process until hit the base components)
2. Create a ***stack frame***, which is a space in memory, and  allocate together all the local variables required by the new function (including parameter variables)
3. Copy the arguments into the corresponding parameter variable (type conversion)
4. Execute the **suite** of the function until a **`return`** statememt or reach the end
5. Evaluate the `return` expression (if one) as the return value of the function (type conversion)
6. **Discard the stack frame**, all local variable disappears
7. The calling program continues, with the returned value **substituted in place of the call**


## Variable Scope
We refer to the regions of code that can refer to a particular variable as the variable's ***scope***.

C++ uses ***lexical scope***, the parent of the new call frame is the environment in which the function was **defined**.

Example:
```cpp
for (int i = 0; i < 5, i++) {
  ...
}
```
- `i` is only accessible within the for-loop scope

> Variables only exist within the code blocks where they are declared -- or, in the event that you declare a variable in the header of a for-loop, that variable only exists within the loop.

### Pass-by-Value Functions
**Pass-by-value** functions creates additional variables in its own scope, which cannot be referred to in the global scope.

Example:
```cpp
#include <iostream>
using namespace std;

void foo(int n) { n++; }

int main() {
   int n = 3;
   foo(n);

   // This prints 3. The ++ operator in foo() only increments foo()'s local copy
   // of n -- not our n variable back in main().
   cout << n << endl;

   return 0;
}
```
In the memory:
```
main()  
+----------------+  
|  n             |  
|  +-------+     |  
|  |   3   |     |  
|  +-------+     |  
+----------------+  
  
foo()  
+----------------+  
|  n             |  
|  +-------+     |  
|  |   4   |     |  
|  +-------+     |  
+----------------+
```
### Pass-by-Reference Functions
To turn a variable into a ***reference***, appending an ampersand (`&`) **to its data type**.

Example:
```cpp
#include <iostream>
using namespace std;

// This is now a pass-by-reference function. Note the addition of the ampersand.
void foo(int& n) { n++; }

int main() {
   int n = 3;
   foo(n);

   // This prints 4. The ++ operator in foo() increments n back in main(), since
   // foo()'s copy of n is tied directly to this one.
   cout << n << endl;

   return 0;
}
```
> In this example, `foo()`'s `n` is masquerading as a normal integer, but under the hood, it's actually acting as a portal to `n` back in `main()`.
> In this way, it **refers** to `main()`'s `n` variable (hence the term "reference").
> When we execute the `n++` line, the program actually **goes back** to `main()` and modifies the value of `n` that we find there.

In the memory
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
|  |   🌀  |     |  
|  +-------+     |  
+----------------+
```

#### Usage of Reference
1. Multiple "return values" of a function
	- `swap()` takes in two integers by reference and results a swapped value
	- `solveQuadratic()` takes in values `a`, `b`, `c` and references  `result1`, `result2`
2. Saving time and space for large data
3. When you need to **change something beyond the local scope**


