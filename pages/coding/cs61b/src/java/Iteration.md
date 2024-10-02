Iteration
===
## For-each Loop
```java
Set<String> s = new HashSet<>();
...
for (String city : s) {
    ...
}
```
Translates to:
```java
Set<String> s = new HashSet<>();
...
Iterator<String> seer = s.iterator();
while (seer.hasNext()) {
    String city = seer.next();
    ...
}
```


## Iterator Object
To enable for-each loop for our class, we should define an `iterator()` method that returns an iterator object.
```java
public Iterator<T> iterator();
```

Iterator interface:
```java
public interface Iterator<T> {
    boolean hasNext();
    T next();
}
```

## Implementing Iterator
```java
private class ArraySetIterator implements Iterator<T> {
    private int wizPos;

    public ArraySetIterator() {
        wizPos = 0;
    }

    public boolean hasNext() {
        return wizPos < size;
    }

    public T next() {
        T returnItem = items[wizPos];
        wizPos += 1;
        return returnItem;
    }
}

public Iterator<T> iterator() {
  return new ArraySetIterator();
}
```