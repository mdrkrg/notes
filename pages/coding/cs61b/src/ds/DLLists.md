DLLists
===
SLLists fail when trying to delete the last node in O(1).
## Looking Back
Add a previous pointer to each `IntNode`:
```java
public class IntNode {
  public IntNode prev;
  public int item;
  public IntNode next;
}
```
![dllist_basic_size_0.png](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2Fjoshhug.gitbooks.io%2Fhug61b%2Fcontent%2Fchap2%2Ffig23%2Fdllist_basic_size_0.png&width=768&dpr=2&quality=100&sign=32ecb6ed&sv=1)
![dllist_basic_size_2.png](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2Fjoshhug.gitbooks.io%2Fhug61b%2Fcontent%2Fchap2%2Ffig23%2Fdllist_basic_size_2.png&width=768&dpr=2&quality=100&sign=14ae0c8b&sv=1)

## Sentinel Update
### Linear
![dllist_double_sentinel_size_0.png](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2Fjoshhug.gitbooks.io%2Fhug61b%2Fcontent%2Fchap2%2Ffig23%2Fdllist_double_sentinel_size_0.png&width=768&dpr=2&quality=100&sign=4fd6e18d&sv=1)
![dllist_double_sentinel_size_2.png](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2Fjoshhug.gitbooks.io%2Fhug61b%2Fcontent%2Fchap2%2Ffig23%2Fdllist_double_sentinel_size_2.png&width=768&dpr=2&quality=100&sign=d18215ab&sv=1)
### Circular
![dllist_circular_sentinel_size_0.png](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2Fjoshhug.gitbooks.io%2Fhug61b%2Fcontent%2Fchap2%2Ffig23%2Fdllist_circular_sentinel_size_0.png&width=768&dpr=2&quality=100&sign=fbcd27b5&sv=1)

![dllist_circular_sentinel_size_2.png](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2Fjoshhug.gitbooks.io%2Fhug61b%2Fcontent%2Fchap2%2Ffig23%2Fdllist_circular_sentinel_size_2.png&width=768&dpr=2&quality=100&sign=2a55a813&sv=1)


## Generic Lists
**Generic data structures** allow users to create structures that hold any type.

To declare a class of generic type:
```java
public class DLList<Type> {
  private IntNode sentinel;
  private int size;

  public class IntNode {
    public IntNode prev;
    public Type item; // Notice the type of item
    public IntNode next;
    ...
  }
  ...
}
```
To use a generic type:
```java
DLList<String> d2 = new DLList<>("hello");
d2.addLast("world");

DLList<Integer> d1 = new DLList<Integer>(5); // This is also OK
d1.insertFront(10);
```

Summary:
- In the .java file **implementing** a data structure, specify your generic type name only once at the very top of the file after the class name.
- In other .java files, which use your data structure, specify the specific desired type during declaration, and use the empty diamond operator during instantiation.
- If you need to instantiate a generic over a primitive type, use `Integer`, `Double`, `Character`, `Boolean`, `Long`, `Short`, `Byte`, or `Float` instead of their primitive equivalents.