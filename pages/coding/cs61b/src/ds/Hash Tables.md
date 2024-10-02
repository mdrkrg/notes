Hash Tables
===
Key Idea:
If we can convert any object into an integer, then we can use an array to store the object and use this integer as the index. This converting is called **hashing**
- Hash function computes an integer
- Array access is constant time


Using the hash table and the map abstract data type, we can build a `HashMap` which allows for amortized constant time access to any key-value pair so long as we know which bucket the key falls into.

## Hash Code
Classes compute the hash of their objects using the `hashCode()` function

```java
public class String {
    public int hashCode() {
        // Implementation
    }
}
```

The result of `hashCode()` ranges from `-2,147,483,648` and `2,147,483,647`, which is the range of 32-bit integer

Java's default `hashCode()` returns the address of the object
### Wrapping
To fit the range into array of size N, we can use the **modulus operator (`%`)**
- `key.hashCode() % N` fits into the array
- Modulo went wrong when operands are **negative numbers**

To get the correct result, using the `Math.floorMod`
```java
Math.floorMod(key.hashCode(), array.length)
```


### Hash Code Rating
**Valid** Hashcodes:
1. _**Deterministic**_**:** The `hashCode()` function of two objects A and B who are ==equal to each other (`A.equals(B) == true`) have the same hashcode==.
	- _This also means the hash function cannot rely on attributes of the object that are not reflected in the_ `.equals()` _method._
2. _**Consistent**_**:** The `hashCode()` function ==returns the same integer== every time it is called ==on the same instance of an object==.
	- This means the `hashCode()` function must be independent of time/stopwatches, random number generators, or any methods that would not give us a consistent `hashCode()` across multiple `hashCode()` function calls on the same object instance.

There are no requirements that state that unequal objects should have different hash function values.

**Good** Hashchodes:
1. The `hashCode()` function must be valid.
2. The `hashCode()` function values should be ==spread as uniformly as possible over the set of all integers==.
3. The `hashCode()` function should be relatively quick to compute (ideally ==O(1)== constant time mathematical operations)



## Hash Tables
### Hash Collisions
In hashing, a collision occurs when we have multiple elements that have the same index in our array.
- Hashcode value are the same
- Hashcode's modulo computed the same
- Since finite hashcode output, inevitable

Solutions:
- **Linear Probing**: Store the colliding keys elsewhere in the array, potentially in the next open array space.
	- Can be seen with distributed hash tables
- **External Chaining**: Store all the keys with the same hash value together in a ==collection of their own==, such as a `LinkedList`
	- This collection of entries sharing a single index is called a **bucket**.

### Resizing
When more and more elements are added into the hash table, there'll be more collisions, and the table will become an array of linked list of O(N).

Resizing will help maintain the performance of a hash table

**Load Factor**: define how full the table is
$$\text{load factor}=\dfrac{\text{size()}}{\text{array.length}}$$

- If adding another key-value pair would cause the load factor to ==exceed **the specified maximum load factor**==, then the hash table should resize
- Java's default maximum load factor is 0.75


When a resize occurs, all of the elements in the hash table will be relocated, because ==the moduler (`array.length`) has changed, and the result of modulo will also change==
- Will be Θ(N) operation
- Performance cutoff caused by resizing will be averaged

### Performance
Assume the hashcode function has a uniform spread, and the load factor is relatively low by implementing resizing
- Insert Θ(1)
- Look up Θ(1)
- Deletetion Θ(1)

|                                               | contains(x) | add(x)   |
| --------------------------------------------- | ----------- | -------- |
| Bushy BSTs                                    | Θ(log N)    | Θ(log N) |
| Separate Chaining Hash Table with NO resizing | Θ(N)        | Θ(N)     |
| Separate Chaining Hash Table with resizing    | Θ(1)        | Θ(1)     |

### `contains()`
The `contains()` method of a HashSet make use of the `equals()` funciton of the object.
```java
@Override
public boolean equals(Object o) {
   if (o instanceof ColoredNumber otherCn) {
       return this.num == otherCn.num;
   }
   return false;
}
```

A `equals()` defined this way makes all `ColoredNumber`s of the same `.num` be equals.

However, if the defualt `hashCode` isn't ==overrided by the one coordinates with the `equals`==, equal `ColoredNumber`s can be inserted into different buckets, creating **duplicate values**

### Duplicate Values
If we override `equals()` but not `hashCode()`, the `hashCode()` will return default address number, weird things will happen when there's already an equal object in the table:
- High chance: `newObj.hashCode() % length` yields different index, no collision => Duplicate value in different buckets
- Low change: `newObj.hashCode() % length` yields a hash collision => Replace the old object


> [!important] Overriding both `equals()` and `hashCode()`
> 
> If your class override equals, you should also override hashCode in a consistent manner.
> - If two objects are equal, they must always have the same hash code.
> 
> If you don’t, everything breaks:
> - `Contains` can’t find objects (unless it gets lucky).
> - `Add` results in duplicates.

## Mutable and Immutable Types
### Immutable Data Types
An immutable data type is one for which an instance cannot change in any observable way after instantiation.
- e.g., Mutable: `ArrayList`, Immutable: `Integer`

The `final` keyword will help the compiler ensure immutability.
- `final` variable means you may assign a value once, but after it can never change.
	- Assign in constructor
	- Assign in the initializer
- `final` is neither sufficient nor necessary for a class to be immutable.

```java
public class Date {
   public final int month;
   public final int day;
   public final int year;
   private boolean contrived = true;
   public Date(int m, int d, int y) {
       month = m; day = d; year = y;
   }
}
```

- Advantage: **stateless** object, avoid bugs
- Disadvantage: Must create a new object anytime anything changes

### Mutable Data Types
**Key Point**: Never mutate (modify) an object being used as a key.
- When the object is mutated, and hashcode is changed
- But it's still in the position of the previous hashcode
- Item gets lost

