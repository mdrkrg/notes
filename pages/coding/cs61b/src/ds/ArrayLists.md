ArrayLists
===
Linked lists have O(n) `get()` method, but arrays always access items at O(1) time.
## Implementation
### Geometric Resizing
When we reach the boundary of a list, we should resize the array to insert more.
```java
private void resize(int newSize) {
  int[] tmp = new int[newSize];
  System.arraycopy(items, 0, tmp, 0, size);
  items = tmp;
}
```

Instead of resizing by adding a constant, we use geometric resizing:
```java
public void insertBack(int x) {
    if (size == items.length) {
           resize(size * RFACTOR);
    }
    items[size] = x;
    size += 1;
}
```

When the usage ratio drops below 0.25, we halve the size of the array.
## Generic ALists
https://stackoverflow.com/questions/529085/how-can-i-create-a-generic-array-in-java
```java
class AList<Type> { ... }
```
To create a generic list of objects, we cannot use `Type[] items = new Type[8]`.
Instead, we should use static type casting:
```java
Type[] items = (Type[]) new Object[8];
```

### Strong Typing
```java
public class GenSet<E> {
    private E[] a;

    public GenSet(Class<E> c, int s) {
        // Use Array native method to create array
        // of a type only known at run time
        @SuppressWarnings("unchecked")
        final E[] a = (E[]) Array.newInstance(c, s);
        this.a = a;
    }

    E get(int i) {
        return a[i];
    }
}
```
### Deleting Items
After implementing generic, we should null out any items that we "detete" to avoid "loitering".

Java only destroys objects when the last reference has been lost. If we fail to null out the reference, then Java will not garbage collect the objects that have been added to the list.