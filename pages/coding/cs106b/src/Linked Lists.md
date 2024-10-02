Linked Lists
===
Problems with arrays:
- Continuous, worst case O(n) to insert
- Fixed size, waste memory or O(n) to copy to a new one

Solution - Linked lists:
- Structure
	- Made of **nodes**
	- Each node contains a single value
	- Nodes are **scattered** throughout the memory
	- Each node contains a memory address **pointing to** the next node
	- `data` and `next` are bundled into `node` struct
	- First node as **head** (entrance of the linked list), be pointed by a pointer
- Strengths
	- Dynamically allocated, no waste space or limitation
	- Insertion to head is fast O(1)
		- Creating a new node, setting its next pointer to the old head of our linked list, and setting the head to point to our newly created node
- Weakness
	- Slow access time, tail insertion O(n)
		- Resolved with binary linked lists
	- No binary search for basic linked lists
	- Take up more memory


## Preliminaries
### `nullptr`
A special type of pointer, indicating that it isn't pointing anywhere useful.

Usage
- Pointer is created but **not ready** to point to an address
- Pointer's destination address has been freed by `delete`

Check if a pointer is null:
```cpp
ptr == nullptr
// or
ptr == NULL
```

**Dereferencing a null pointer will cause a segmentation fault**

A diagram for linked lists
```
 addr:    0xf9800          0xf4d33          0xc625e  
        +---------+      +---------+      +---------+ 
 data:  |   87    |      |   93    |      |   12    | 
        +---------+ ---> +---------+ ---> +---------+ 
 next:  | 0xf4d33 |      | 0xc625e |      | nullptr | 
        +---------+      +---------+      +---------+ 
           ^  
           head = 0xf9800
```


### Passing Pointers by Reference
If we want to use a function to change the value of a pointer as a parameter, we should **pass the pointer variable by reference** into the function.

[!EXAMPLE]-
```cpp
void toNullptr(int *&ptr) {
  ptr = nullptr;
}
```
Diagram:
```
toNullptr():

    ptr
    +------------+
    |     🌀     |
    +------|-----+
           |
main():    +----------+
                      |
    x     0xdec08     |
    +-----------+     |
    |    50     |     |
    +-----------+     |
                      |
    ptr   0x55824     |
    +-----------+     |
    |  nullptr  <-----+
    +-----------+
```

What's happening here is that:
The parameter variable `ptr` of function `toNullptr` is **declared as a reference** (by `&`) of an integer pointer.
So in the function suite, the `ptr` is identified as a reference of what's getting passed in and **get dereferenced in expressions**.

You can do this for basic variables:
```cpp
#include <iostream>
using namespace std;

int main() {
  int x = 1;
  int &ptr = x;
  cout << ptr << endl;
  ptr = 2;
  cout << x << endl;
  return 0;
}
/* Output:
 *        1
 *        2
 */
```
> [!WARNING]
> If we not pass in the pointer by reference:
> `void toNullptr(int *ptr)`
> we get **a new copy of** the passed in argument value.
> 

> [!TIPS]
> Another trick: **Double pointer**
> `void toNullptr(int **ptr);`
> - Declare a pointer (first `*`) that points to a integer pointer (second `*`).


## Implementation (Single Linked Lists)
> Just copy and paste version
> For my own implementation, see `~/Learning/CS106B/exercise/single-linked-list`

```cpp
#include <iostream>
#include <stdexcept>
using namespace std;

struct Node {
  int data;
  Node *next;  // a pointer to a Node -- the next node in our list

  Node(int d) { // constructor
    data = d;
    next = nullptr;
  }
};

// Insert a new node at the head of the list.
void headInsert(Node *&head, Node *&tail, int data) {
  Node *newNode = new Node(data);
  newNode->next = head;
  head = newNode;

  // If tail is null and we have been keeping both our head and tail pointers up
  // to date, that means the node we just inserted is the only node currently in
  // the list -- making it both the head and the tail. We update the tail pointer
  // accordingly.
  if (tail == nullptr) {
    tail = head;
  }
}

// Removes head of linked list and returns the value it contained.
int offWithItsHead(Node *&head, Node *&tail) {
  if (head == nullptr) {
    throw runtime_error("Empty list in offWithItsHead().");
  }

  // Let's hold onto our return value before deleting the head.
  // "retval" stands for "return value."
  int retval = head->data;

  // Let's hold onto the head node we'll be deleting.
  Node *temp = head;

  // Move our head pointer forward.
  head = head->next;

  // If moving our head pointer forward caused it to fall off the end of the list,
  // that means the list is now empty. We need to update the tail pointer in this
  // case to reflect that.
  if (head == nullptr) {
    tail = nullptr;
  }

  // BYE.
  delete temp;

  return retval;
}

int main() {
   // I cannot stress enough how important it is to initialize these both to nullptr.
  Node *head = nullptr;
  Node *tail = nullptr;

  headInsert(head, tail, 10);
  headInsert(head, tail, 12);
  headInsert(head, tail, 15);

  while (head != nullptr) {
    cout << offWithItsHead(head, tail) << endl;
  }

  cout << endl << "Pointers (should be 0 for nullptr):" << endl;
  cout << head << endl;
  cout << tail << endl;

  return 0;
}
```

## Linked Queue
See ![[Single Linked Queue]]