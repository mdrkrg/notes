Linked Lists
===
## Naked Linked Lists
```java
public class IntList {
  public int first;
  public IntList rest;        

  public IntList(int f, IntList r) {
    first = f;
    rest = r;
  }
}
```

Build the list forwards:
```java
IntList L = new IntList(5, null);
L.rest = new IntList(10, null);
L.rest.rest = new IntList(15, null);
```

Build the list backwords:
```java
IntList L = new IntList(15, null);
L = new IntList(10, L);
L = new IntList(5, L);
```

### `size` and `iterativeSize`
```java
/** Return the size of the list using... recursion! */
public int size() {
  if (rest == null) {
    return 1;
  }
  return 1 + this.rest.size();
}
```

```java
/** Return the size of the list using no recursion! */
public int iterativeSize() {
  int totalSize = 0;
  for (IntList p = this; p.rest != null; p = p.next)
    totalSize += 1;
  return totalSize;
}
```

### `get`
```java
/** Return the ith item of the list
 *  Note: invalid indexes are not excluded.
 */
public int get(int i) {
  IntList p;
  for (p = this; i > 0; i -= 1, p = p.rest)
    ;
  return p.item;
}
```

## SLLists
[[SLLists]]

## DLLists
[[DLLists]]
