Advanced Syntax
===
## Automatic Conversions
> [!info] **Recall**
> Using generics:
> - Generic classes require us to provide one or more actual type arguments
> 	- Before Java 8: `ArrayList<String> L = new ArrayList<String>()`
> 	- After Java 8: `ArrayList<String> L = new ArrayList<>()`
> - Generics need **reference type** as actual type arguments
> 
> ### Reference Types
> Java has 8 primitive types, all other types are reference types.
> For each primitive type, there is a corresponding reference type called a wrapper class.
> ![reference_types](https://joshhug.gitbooks.io/hug61b/content/assets/wrapper_classes.png)
> ![](https://www3.ntu.edu.sg/HOME/EHCHUA/PROGRAMMING/java/images/OOP_WrapperClass.png)

Conversion between int and Integer is annoying:
```java
ArrayList<String> L = new ArrayList<String>()
L.add(new Integer(5));
int first = L.get(0).valueOf();
```

### Autoboxing and Unboxing
**Autoboxing** (auto-unboxing): Implicit conversions between wrapper/primitives.
```java
L.add(5)
int first = L.get(0);
```

Wrapper types and primitives can be used almost interchangeably.
- If Java code expects a wrapper type and gets a primitive, it is autoboxed.
```java
public static void blah(Integer x) {
  System.out.println(x);
}
int x = 20;
blah(x);
```
- If the code expects a primitive and gets a wrapper, it is unboxed.
```java
public static void blahPrimitive(int x) {
  System.out.println(x);
}
Integer x = new Integer(20);
blahPrimitive(x);
```

Note:
- Arrays are never autoboxed/unboxed
	- e.g. an `Integer[]` cannot be used in place of an `int[]` (or vice versa).
- Autoboxing / unboxing incurs a measurable performance impact!
- Wrapper types use MUCH more memory than primitive types.

#### Warpper Type Class
```java
public final class Integer extends Number implements Comparable<Integer> {
  private final int value;  
  public Integer(int value) {
    this.value = value;
  }
  ...
}
```
### Widening
**Widening**: A primitive type with narrower range is implicitly converted to a wider range type.

```java
int x = 20;
double y = x; // Widen int to double
```

Wider -> narrower: type casting
```java
double x = 20;
int y = (int) x;
```

## Immutability
An immutable data type is a data type whose instances cannot change in any observable way after instantiation.
- e.g. `String` objects are immutable
	- Concatenating strings returns a new `String` object
- Any data type with non-private variables is mutable
- Unless those variables are declared `final`

The `final` keyword will help the compiler ensure immutability.
- final variable means you will assign a value once (either in constructor of class or in initializer).
- Not necessary to have final to be immutable (e.g. Dog with private variables).
- Declaring a **reference** as `final` does **not** make object immutable.
	- `public final ArrayDeque<String> d = new ArrayDeque<String>();`


## Generics
### Generic Methods
With generics defined in class headers, Java waits for the user to **instantiate an object** of the class in order to know what actual types each generic will be.
- Static methods don't have related object
- Fix: generic methods

To declare a method as generic, the formal type parameters must be specified before the return type:

```java
public static <K,V> V get(Map61B<K,V> map, K key)
```

Calling:
```java
ArrayMap<Integer, String> isMap = new ArrayMap<Integer, String>();
System.out.println(mapHelper.get(isMap, 5));
```
- Autometically infer types
### Type Upper Bounds
https://docs.oracle.com/javase%2Ftutorial%2F/java/generics/restrictions.html
`extends` in another viewpoint `A extends B`:
- Context of **inheritance**: Giving A the ability of B
- Context of **generics**: A **must be** B
	- **`extends` imposes a constraint**
```java
public class A<B extends SomeInterface<B>> implements SomeInterface<A> {
  ...
}
```
- `B extends SomeInterface<B>` means `B` must belong to SomeInterface
	- `extends Comparable<B>` B must be comparable