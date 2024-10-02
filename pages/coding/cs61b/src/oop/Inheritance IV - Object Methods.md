Inheritance IV - Object Methods
===
List of class Object methods
- `String toString()`
- `boolean equals(Object obj)`
- `Class <?> getClass()`
- `int hashCode()`
- `protected Objectclone()`
- `protected void finalize()`
- `void notify()`
- `void notifyAll()`
- `void wait()`
- `void wait(long timeout)`
- `void wait(long timeout, int nanos)`

## `toString()`
- Provides string representatoin
- `System.out.println()` implicitly call this method

```java
@Override
public String toString() {
  String str = "(";
  ...
  str += ")";
  return str;
}
```

### StringBuilder
- String are inmutable, appending a string creates new copy (time consuming O(n^2))
- Use `StringBuilder` class to create mutable string object

```java
@Override
public String toString() {
  StringBuilder returnSB = new StringBuilder("{");
  for (int i = 0; i < size - 1; i += 1) {
    returnSB.append(items[i].toString());
    returnSB.append(", ");
  }
  returnSB.append(items[size - 1]);
  returnSB.append("}");
  return returnSB.toString();
}
```

### Simpler toString
```java
@Override
public String toString() {
  List<String> listOfItems = new ArrayList<>();
  for (T x : this) {
    listOfItems.add(x.toString());
  }
  return "{" + String.join(', ', listOfItems) + "}";
}
```

### Extra: `ArraySet.of()`
```java
public static <T> ArraySet<T> of(T... stuff) {
  ArraySet<T> returnSet = new ArraySet<T>();
  for (T x : stuff) {
    returnSet.add(x);
  }
  return returnSet;
}
```
- `T... stuff` Vararg: variable number of arguments
- `<T> ArraySet<T>` static method do not know what is `T` (related to object), so we need to specify
## `equals()`
- `equals()` and `==` have different behaviour
	- `==` check same object (memory)
	- `equals()` **defined by implementation**


### Example: `equals()` for ArraySet
```java
public boolean equals(Object other) {
  /* Same object */
  if (this == other) {
    return true;
  }
  if (other == null) {
    return false;
  }
  /* Remember to check the type (generic) */
  if (other.getClass() != this.getClass()) {
    return false;
  }
  ArraySet<T> o = (ArraySet<T>) other;
  if (o.size() != this.size()) {
    return false;
  }
  for (T item : this) {
    if (!o.contains(item)) {
      return false;
    }
  }
  return true;
}
```