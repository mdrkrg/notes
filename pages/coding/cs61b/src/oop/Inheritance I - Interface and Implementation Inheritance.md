Inheritance I - Interface and Implementation Inheritance
===
> [!summary] **Interface Inheritance vs Implementation Inheritance**
> - Interface inheritance (**what**): Simply tells what the subclasses should be able to do.
> 	- EX) all lists should be able to print themselves, how they do it is up to them. 
> - Implementation inheritance (**how**): Tells the subclasses how they should behave.
> 	- EX) Lists should print themselves exactly this way: by getting each element in order and then printing them.
## Hypernyms, Hyponyms
Inheritance forms a hierarchy of "is-a" relationship:
- Hypernym - Superclass
- Hyponym - Subclass

In Java, in order to _express_ this hierarchy, we need to do **two things**:
- Step 1: Define a type for the general list hypernym -- we will choose the name List61B.
- Step 2: Specify that SLList and AList are hyponyms of that type.

## Interface Inheritance
Interface Inheritance refers to a relationship in which a subclass inherits all the methods/behaviors of the superclass.
- Interface
	- Provides all method signatures
	- No implementations
- Subclass
	- Provide implementations
### Defining Interfaces
An **interface** specifies what an object must be able to do, but it doesn't provide any implementation for those behaviors.

```java
public interface List61B<Item> {
  public void addFirst(Item x);
  public void add Last(Item y);
  public Item getFirst();
  public Item getLast();
  public Item removeLast();
  public Item get(int i);
  public void insert(Item x, int position);
  public int size();
}
```
### Implementing Interfaces
To specify an implementation of an interface, we add a relationship-defining word: implements.
```java
public class AList<Item> implements List61B<Item> {
  ...
}
```

## Overriding
When implementing the required functions in the subclass, it's useful (and actually required in 61B) to include the `@Override` tag right on top of the method signature.

```java
@Override
public void addFirst(Item x) {
  insert(x, 0);
}
```
- Not including `@Override` is still overrinding the method.
- Including the tag is safer for compiler to detect error.
	- If a method is not in the interface but comes with `@Override` tag, it will lead to compile error.

## Assigning Subclasses to Base Class Variables
```java
public static void main(String[] args) {
    List61B<String> someList = new SLList<String>();
    someList.addFirst("elk");
}
```

> [!note] Recall
> Like you've learnt in C++ lessons, those are called "runtime polymorphism".


## Implementation Inheritance
Beyond identifying **what** an object should do, interfaces can have their own implementation of methods. These methods identify **how** hypernyms of List61B should behave.

In order to do this, you must include the **`default`** keyword in the method signature.
```java
default public void print() {
    for (int i = 0; i < size(); i += 1) {
        System.out.print(get(i) + " ");
    }
    System.out.println();
}
```


### Overriding Default Methods
For SLLists, we may want to have a different implementation.
```java
@Override
public void print() {
    for (Node p = sentinel.next; p != null; p = p.next) {
        System.out.print(p.item + " ");
    }
}
```
For a `List61B<String> lst = new SLList<String>();`, the Java compiler will call the SLList version of `print()` instead of it's default implementation.
### Static Type and Dynamic Type
Java is able to know which method to call at runtime due to something called **dynamic method selection**.

- Static type
	- The type specified at declaration 
	- Checked at compile time
- Dynamic type
	- The type specified when the variable is **instantiated**
	- The type of the object that the variable is currently referring to
	- Checked at runtime

When Java runs a method that is overriden, it searches for the appropriate method signature in it's **dynamic type** and runs it.

> [!important] **Rule**
> - Compliers will allow Memory Boxes to hold any subtype of itself
>     - For example, compliers will allow the Dog memory box to hold a ShowDog object as a ShowDog is a subtype of the Dog Class
> - Compliers will allow calls based on Static type.
>     - For example, if a variable were declared as a Dog it's static type would be a Dog and the complier would allowed it to call bark()
> - **Overridden non-static methods are selected at run time based on dynamic type.**
>     - **Everything else is based on static types,** inculding overloaded methods.
### Overloaded Methods
```java
public static void peek(List61B<String> list) {
    System.out.println(list.getLast());
}
public static void peek(SLList<String> list) {
    System.out.println(list.getFirst());
}
```
```java
SLList<String> SP = new SLList<String>();
List61B<String> LP = SP;
SP.addLast("elk");
SP.addLast("are");
SP.addLast("cool");
peek(SP); // This will call the second
peek(LP); // This will call the first
```
For overloaded methods, when Java checks to see which method to call, it checks the **static type** and calls the method with the parameter of the same type.