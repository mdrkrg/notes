---
tags:
  - CS
  - CPP
  - CS106B
---
Array-Based Stack
===
**arraybasedstack.h**
```cpp
#ifndef ARRAYBASEDSTACK_H
#define ARRAYBASEDSTACK_H

// Starting with a ridiculously small initial capacity so we can observe the
// expansion of the stack in a small test case.
#define DEFAULT_STACK_CAPACITY 3

class ArrayBasedStack {
public:
  ArrayBasedStack();
  ~ArrayBasedStack();
  void push(int value);
  int pop();
  int peek() const;
  int size() const;
  bool isEmpty() const;

private:
  int *_elements;
  int _size;
  int _capacity;
};

#endif // ARRAYBASEDSTACK_H
```
**arraybasedstack.cpp**
```cpp
#include <iostream>
#include <stdexcept>
#include "arraybasedstack.h"
using namespace std;

ArrayBasedStack::ArrayBasedStack() {
  // Creating this dynamically ensures it lives when we leave our constructor
  // function, which is definitely the desired behavior here!
  _elements = new int[DEFAULT_STACK_CAPACITY];
  _size = 0;
  _capacity = DEFAULT_STACK_CAPACITY;

  cout << "Created stack with capacity: " << _capacity << endl;
}

ArrayBasedStack::~ArrayBasedStack() {
  // When it's time to destroy a stack, we must free the array it contains.
  // Otherwise, we will lose access to that array's address and have a memory
  // leaks that persists until our program terminates. Recall that to delete
  // an array, we need [] brackets after "delete".
  delete[] _elements;
}

void ArrayBasedStack::push(int value) {
  // If our stack is full, we must expand the underlying array before expansion.
  // It's probably better design to outsource this to a private member function,
  // but I didn't take the time to do that in class.
  if (_size >= _capacity) {
    // Create new, larger stack.
    int *newArray = new int[_capacity * 2 + 1];

    // Copy elements from old array into new array.
    for (int i = 0; i < _size; i++) {
      newArray[i] = _elements[i];
    }

    // Free old array. If we don't do this before setting _elements = newArray,
    // we will lose this pointer forever and have a memory leak!
    delete[] _elements;

    // Set the stack's internal pointer to point to the new array.
    _elements = newArray;

    // Update the stack capacity.
    _capacity = _capacity * 2 + 1;

    cout << "Expanded stack to capacity: " << _capacity << endl;
   }

  _elements[_size] = value;
  _size++;
}

int ArrayBasedStack::pop() {
  if (isEmpty()) {
    throw runtime_error("Empty stack in pop()!");
  }

  int result = _elements[_size - 1];
  _size--;
  return result;
}

int ArrayBasedStack::peek() const {
  if (isEmpty()) {
    throw runtime_error("Stack is empty in peek()!");
  }

  return _elements[_size - 1];
}

int ArrayBasedStack::size() const {
  return _size;
}

bool ArrayBasedStack::isEmpty() const {
  return _size == 0;
}
```

**main.cpp**




TODO: Why `newSize = oldSize * 2 + 1` rather than `newSize = oldSize * 2`
### `const` Member Functions
If a method (member function) is designed to **not change the internal state of an object**, add **`const`** keyword after the function identifier.
If the method do change the internal state of the object, the program won't compile.

Syntax:
```cpp
TYPE CLASS::METHOD() const {
  ...
} 
```