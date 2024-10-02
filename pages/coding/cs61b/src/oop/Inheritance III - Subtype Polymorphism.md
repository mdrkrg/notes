Inheritance III - Subtype Polymorphism
===
> [!summary]
> - Interface and **callbacks**
> 	- A function needs the help of another function
> 		- `max` need `compareTo`
> 	- Explicit function passing (Lambda)
> 	- Interfacing warping
> - Comparable (`obj.compareTo(other)`)
> 	- **Natural ordering** of a type
> 	- Imbedded within the object itself
> - Comparator (`comparator.compare(a, b)`)
> 	- Alternative mechnism to compare **two** objects
## Subtype Polymorphism
Inheritance also makes it possible to design general data structures and methods using _polymorphism_.
- Polymorphism, at its core, means 'many forms'.
- In Java, polymorphism refers to how objects can have many forms or types.
- In object-oriented programming, polymorphism relates to how an object can be regarded as an instance of its own class, an instance of its superclass, an instance of its superclass's superclass, and so on.

> [!warning] **Core Idea**
> - One interface, multiple implementation
> - Let the object itself decide its appropriate behaviour.
> 	- e.g. We tell the object to compare, and the object itself define its way of comparsion.

By making use of polymorphism, we can create more generic functions.
```python
def print_larger(x, y):
    """Generic function
    Let x decide its way of
    comparsion and stringify,
    as long as x has implemented
    of method: largerThan(), str().
    """
    if x.largerThan(y): 
        return x.str()
    return y.str()
```
## Comparable
### Creating Generic Compare Operators
- Java no generic compare operators
	- No operator overload
- Use interface inheritance
	- Create a superclass `OurComparble` that compares objects

![OurComparable](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2Fjoshhug.gitbooks.io%2Fhug61b%2Fcontent%2Fassets%2Fdog_comparable.png&width=768&dpr=2&quality=100&sign=f93f6fb5&sv=1)
```java
public interface OurComparable {
  public int compareTo(Object o);
}
```
The function `compareTo`:
- Return -1 if `this` < `o`.
- Return 0 if `this` equals `o`.
- Return 1 if `this` > `o`.

Then we can add method `compareTo` to `Dog`, `Cat`, etc.
```java
public class Dog implements OurComparable {
  ...
  public int compareTo(Object o) {
    Dog other = (Dog) o;
    return this.size - other.size;
  }
}
```

Last, we can implement a generic function that take in any object of the class OurComparable to compare.
```java
public static OurComparable max(OurComparable[] items) {
    int maxDex = 0;
    for (int i = 0; i < items.length; i += 1) {
        int cmp = items[i].compareTo(items[maxDex]);
        if (cmp > 0) {
            maxDex = i;
        }
    }
    return items[maxDex];
}
```
Advantages:
- No need for maximization code in every class (i.e. no `Dog.maxDog(Dog[])` function required
- We have code that operates on multiple types (mostly) gracefully

### Real Life Comparable Interface
There's an existing interface called `Comparable`.
```java
public interface Comparable<T> {
  public int compareTo(T obj);
}
```
- No need to cast to `T` from `Object`
- Used by many libraries

```java
public class Dog implements Comparable<Dog> {
  ...
  public int compareTo(Dog other) {
    return this.size - other.size;
  }
}
```


## Comparator

Comparators are used for implemeting generic functions that requires comparing.
- Can be used as function pointer

### An Alternative Comparsion
- Natural order
	- Used to refer to the ordering implied in the `compareTo` method of a particular class.
- Different way of comparasion
	- Use `Comparator` interface

### Comparator Interface
```java
public interface Comparator<T> {
  int compare(T o1, T o2);
}
```
`compare`:
- Return negative number if o1 < o2.
- Return 0 if o1 equals o2.
- Return positive number if o1 > o2.


### Implement Comparator
To define a comparator:
- Nested static class definition
	- Can be instantiate without any existing object of superclass


To use a comparator
- Instantiate a explicit comparator object
	- `Comparator<MyComparable> nc = new MyComparable.getNameComparator()`
- Instantiate an anomyous comparator object as argument of function

```java
import java.util.Comparator;

public class Dog implements Comparable<Dog> {
    ...
    public int compareTo(Dog other) {
        return this.size - other.size;
    }

    private static class NameComparator implements Comparator<Dog> {
        public int compare(Dog a, Dog b) {
            return a.name.compareTo(b.name);
        }
    }

    public static Comparator<Dog> getNameComparator() {
        return new NameComparator();
    }
}
```

To use
```java
Comparator<Dog> nc = Dog.getNameComparator();
```

### Example
https://www.geeksforgeeks.org/comparator-interface-java/
```java
/** Collections.sort() */
public void sort(List list, ComparatorClass c)

// Use:
Collections.sort(ar, new Sortbyroll());
```