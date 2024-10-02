---
tags:
  - CS
  - CPP
  - CS106B
---
Class Implementation - CharStack
===
## Interface (Public Part)
```cpp
/*
 * File: charstack.h
 * -----------------
 * This interface defines the CharStack class, which implements
 * the stack abstraction for characters.
 */
#ifndef _charstack_h
#define _charstack_h
/*
 * Class: CharStack
 * ----------------
 * This interface defines a class that models a stack of characters.
 * Characters are added and removed only from the top of the stack.
 * The fundamental stack operations are push (add to top) and pop
 * (remove from top).
 */
 
class CharStack {
public:
/*
 * Constructor: CharStack
 * Usage: CharStack cstk;
 * ----------------------
 * Initializes a new empty stack that can contain characters.
 */
  CharStack();
/*
 * Destructor: ~CharStack
 * Usage: (usually implicit)
 * -------------------------
 * Deallocates storage associated with this cstk. This method is
 * called whenever a CharStack instance variable is deallocated.
 */
  ~CharStack();
/*
 * Method: size
 * Usage: nElems = cstk.size();
 * ----------------------------
 * Returns the number of characters in this stack.
 */
  int size();
/*
 * Method: isEmpty
 * Usage: if (cstk.isEmpty()) . . .
 * --------------------------------
 * Returns true if this stack contains no characters, and false
 * otherwise.
 */
  bool isEmpty();
/*
 * Method: clear
 * Usage: cstk.clear();
 * --------------------
 * This method removes all characters from this stack.
 */
  void clear();
/*
 * Method: push
 * Usage: cstk.push(ch);
 * ---------------------
 * Pushes the character ch onto this stack.
 */
  void push(char ch);
/*
 * Method: pop
 * Usage: topChar = cstk.pop();
 * ----------------------------
 * Removes the top character from this stack and returns it.
 */
  char pop();
/*
 * Method: peek
 * Usage: topChar = cstk.peek();
 * -----------------------------
 * Returns the value of top character from this stack without
 * removing it. Raises an error if called on an empty stack.
 */
  char peek();
private:
  // Fill this in when the data structure design is complete
  #include "cstkpriv.h"
  // Read in the contents of the file "cstkpriv.h"
};

#endif
```
## Implementation
Use an array as the building block of the stack data structure, and specify the number of elements using a `count`.

```cpp
/*
 * File: cstkpriv.h
 * ----------------
 * This file contains private part of charstack.h
 */

  static const int MAX_STACK_SIZE = 100;
  
  char elements[MAX_STACK_SIZE];
  int count;
```
To include this in a header file, just add `#import "cstkpriv.h` below the `private:`

Stack operations `push()` and `pop()` happens at the end of the array and are $O(1)$, the `count` is accordingly incremented or decremented.

```cpp
/*
 * File: charstack.cpp
 * -------------------
 * This file implements the CharStack class.
 */
#include "genlib.h"
#include "charstack.h"
/*
 * Implementation notes: CharStack constuctor and destructor
 * ---------------------------------------------------------
 * These methods have little work to do because the fixed-size
 * array is allocated on the stack and not in the heap.
 */

CharStack::CharStack() {
  count = 0;
}

CharStack::~CharStack() {
  /* Empty */
}
/*
* Implementation notes: size, isEmpty, clear
* ------------------------------------------
* These implementations should be self-explanatory.
*/
int CharStack::size() {
  return count;
}

bool CharStack::isEmpty() {
  return count == 0;
}

void CharStack::clear() {
  count = 0;
}

/*
 * Implementation notes: push, pop, peek
 * -------------------------------------
 * The only subtlety in this implementation is the use of
 * the ++ and -- to select the correct index in the stack
 * and adjust the count variable at the same time.
 */

void CharStack::push(char ch) {
  if (count == MAX_STACK_SIZE) Error("push: Stack is full");
  elements[count++] = ch;
}

char CharStack::pop() {
  if (isEmpty()) Error("pop: Attempting to pop an empty stack");
  return elements[--count];
}

char CharStack::peek() {
  if (isEmpty()) Error("peek: Attempting to peek at an empty stack");
  return elements[count - 1];
}
```

### Abstraction Barrier of `stack.size()`
Representing the size of stack by merely `stack.count` violates the abstraction barrier of `CharStack` class.
- `stack.count` - intermediate variable for implementation details
- `stack.size()` - interface for client and other methods

By using the `stack.size()` form, a layer of insulation between the client and the implementation is provided.
Even if the implementation detail of how the size of a stack is modified, its behaviour remains the same just if we just modify the `stack.size()` interface accordingly.


### Removing the Maximum Size Limitation
Approach: Make the array dynamic and reallocate space for a new, larger array whenever space in the old array is exhausted.
- A pointer to a dynamic `char` array
- A variable to keep track of the allocated size

```cpp
/*
 * File: cstkpriv.h
 * ----------------
 * This file contains the private data for the CharStack class.
 */
  DISALLOW_COPYING(CharStack)
 
/* Constant defining the initial capacity */
  static const int INITIAL_CAPACITY = 100;

/* Data fields required for the stack representation */
  char *elements;   /* Dynamic array of characters   */
  int capacity;     /* Allocated size of that array  */
  int count;        /* Current count of chars pushed */

/* Prototype for a private helper method to expand the array */
  void expandCapacity();
```

Changes in Implementation:
**Initialization**
Allocate initial space to the array using `new char[]`.
```cpp
CharStack::CharStack() {
  elements = new char[INITIAL_CAPACITY];
  capacity = INITIAL_CAPACITY;
  count = 0;
}
```

**Destructor**
Free the internal storage allocated from the heap using `delete[]`.
```cpp
CharStack::~CharStack() {
  delete[] elements;
}
```

**`push()`**
Expand the stack if space is exhausted.
```cpp
void CharStack::push(char element) {
  if (count == capacity) expandCapacity();
  elements[count++] = element;
}

void CharStack::expandCapacity() {
  capacity *= 2;
  char *array = new char[capacity];
  for (int i = 0; i < count; i++) {
    array[i] = elements[i];
  }
  delete[] elements;
  elements = array;
  /* NOTE: ELEMENT and ARRAY point to the same address,
   *       so this won't be a memory management problem. */
}
```
1. Doubles the capacity
2. Copies the old array into a new one
3. Frees the storage occupied by the old one
4. Stores the pointer to the new array

