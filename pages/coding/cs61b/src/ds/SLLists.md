SLLists
===
## Introducing Class for Linked Lists
To improve naked linked lists, we use **nodes** to store the information of int value and address.

```java
public class IntNode {
  public int item;
  public IntNode next;

  public IntNode(int i, IntNode n) {
    item = i;
    next = n;
  }
}
```

Then we seperate a class to interact with the nodes.
```java
public class SLList {
  public IntNode first;

  public SLList(int x) {
    first = new IntNode(x, null);
  }
}
```

## `addFirst()` and `getFirst()`
```java
/** Adds an item to the front of the list. */
public void addFirst(int x) {
  first = new IntNode(x, first);
}
```

```java
/** Retrieves the front item from the list. */
public int getFirst() {
  return first.item;
}
```

## `private` and `public`
Public variables and methods can make troubles, in the sense that the internal structure of a linked list may be changed manually.

Private variables and methods can only be accessed by code inside the same `.java` file, e.g. in this case `SLList.java`, making the code safer.

```java
public class SLList {
    private IntNode first;
...
```

> [!tip] When to use `private` and `public`
> - The `private` keyword involves **implementation**
> 	- A signal that certain pieces of code should be ignored (and thus need not be understood) by the end user
> - The `public` keyword involves **interface**
> 	-A declaration that a method is available and will work **forever** exactly as it does now.
> 
> **When you create a** `**public**` **member (i.e. method or variable), be careful, because you're effectively committing to supporting that member's behavior exactly as it is now, forever.**



## Nested Classes
To make the class definition more organized, we can use nested classes.

### Static Classes
If the nested class has no need to use any of the instance methods or variables of `SLList`, you may declare the nested class `static`, as follows.
**Declaring a nested class as `static`** means that methods inside the static class **can not access any of the members of the enclosing class**.
```java
public class SLList {
  public static class IntNode {
    public int item;
      public IntNode next;
        public IntNode(int i, IntNode n) {
          item = i;
          next = n;
    }
  }

  private IntNode first; 

  public SLList(int x) {
    first = new IntNode(x, null);
   } 
...
```

A simple rule of thumb is that _if you don't use any instance members of the outer class, make the nested class static_.

## `addLast()` and `size()`
```java
/** Adds an item to the end of the list. */
public void addLast(int x) {
  IntNode p = first;

  /* Advance p to the end of the list. */
  while (p.next != null) {
    p = p.next;
  }
  p.next = new IntNode(x, null);
}
```

```java
/** Returns the size of the list starting at IntNode p. */
private static int size(IntNode p) {
  if (p.next == null) {
    return 1;
  }

  return 1 + size(p.next);
}

public int size() {
  return size(first);
}
```

> [!note] Function overloading
> We say that two methods with the same name but different signatures are **overloaded**.
## Caching
The `size()` takes up linear time. To improve this, we can use a  `size` variable to keep track of the size.

```java
public class SLList {
  ...
  private int size;
  
  public SLList(int x) {
    first = new IntNode(x, null);
    size = 1;
  }
  
  public void addFirst(int x) {
    first = new IntNode(x, first);
    size += 1;
  }
  
  public int size() {
    return size;
  }
}
```

This practice of saving important data to speed up retrieval is sometimes known as **caching**.

## Sentinel Nodes
If we want to introduce a **empty list**, the `addLast()` function must have a special case.
```java
public SLList() {
  first = null;
  size = 0;
}

public void addLast(int x) {
  /* Specical case */
  size += 1;
  if (first == null) {
    first = new IntNode(x, null);
  } else {
    IntNode p;
    for (p = first; p.next != null; p = p.next)
      ;
    p.next = new IntNode(x, null);
  }
}
```
A cleaner, though less obvious solution, is to make it so that all `SLLists` are the "same", even if they are empty. We can do this by creating a special node that is always there, which we will call a **sentinel node**. The sentinel node will hold a value, which we won't care about.

After `SLList L = new SLList()`:
![empty_sentinelized_SLList.png](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2Fjoshhug.gitbooks.io%2Fhug61b%2Fcontent%2Fchap2%2Ffig22%2Fempty_sentinelized_SLList.png&width=768&dpr=2&quality=100&sign=4885616d2c3764b400dae1bcaf26037ef9dd8ccbff19a7982be783aa7f10a010)
Inserting items:

![three_item_sentenlized_SLList.png](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2Fjoshhug.gitbooks.io%2Fhug61b%2Fcontent%2Fchap2%2Ffig22%2Fthree_item_sentenlized_SLList.png&width=768&dpr=2&quality=100&sign=697d397150573c5c45153d1e14ce78ae5bab9e10dabff077905f630d88cebc96)

```java
public void addLast(int x) {
  IntNode p;
  for (p = sentinel; p.next != null; p = p.next)
    ;
  p.next = new IntNode(x, null);
}
```

## Invariants
An invariant is a fact about a data structure that is guaranteed to be true (assuming there are no bugs in your code).

A `SLList` with a sentinel node has at least the following invariants:
- The `sentinel` reference always points to a sentinel node.
- The front item (if it exists), is always at `sentinel.next.item`.
- The `size` variable is always the total number of items that have been added.

Invariants make it easier to reason about code, and also give you specific goals to strive for in making sure your code works.