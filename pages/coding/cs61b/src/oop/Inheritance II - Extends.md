Inheritance II - Extends
===
> [!summary] **Is-a vs Has-a**
> Important Note: **extends** should only be used for **is-a** (hypernymic) relationships!

If you want one class to be a hyponym of another class (instead of an interface), you use extends.

Syntax:
```java
public class A<Type> extends B<Type> {
  ...
}
```

## Examples
### Rotating SLList
```java
public class RotatingSLList<Blorp> extends SLList<Blorp>{
       public void rotateRight() {
              Blorp oldBack = removeLast();
              addFirst(oldBack);
	}
}
```
Because of extends, RotatingSLList inherits all members of SLList:
- All instance and static variables.
- All methods.
- All nested classes.
- Constructors are **not** inherited!

### VengefulSLList
A special version of SLList that:
- Remembers all Items that have been destroyed by removeLast.
- Has an additional method `printLostItems()`, which prints all deleted items.

```java
public class VengefulSLList<Item> extends SLList<Item> {
	private SLList<Item> deletedItems;
	public VengefulSLList() {
       deletedItems = new SLList<Item>();
	}
  
	@Override
	public Item removeLast() {
    		Item oldBack = super.removeLast(); /*calls Superclass’s 
version of removeLast() */
    		deletedItems.addLast(oldBack);
    		return oldBack;
	}
 
	public void printLostItems() {
    		deletedItems.print();
	}
}

public static void main(String[] args) {
    	VengefulSLList<Integer> vs1 = new VengefulSLList<Integer>();
    	vs1.addLast(1);
    	vs1.addLast(5);
    	vs1.addLast(10);
    	vs1.addLast(13);      /* [1, 5, 10, 13] */
    	vs1.removeLast();     /* 13 gets deleted. */
    	vs1.removeLast();     /* 10 gets deleted. */
    	System.out.print("The fallen are: ");
    	vs1.printLostItems(); /* Should print 10 and 13. */
}
```
`deletedItems` can be also written as
```java
private SLList<Item> deletedItems = new SLList<Item>();
```
## Calling Ancestor
We use the keyword **`super`** to refer to a supclass.

Accessing and calling supclass's members:
```java
super.method();
super.attribute;
```

Calling ancestor's constructer:
```java
super();
```

## Constructor Behaviour
Constructors are **not** inherited.
However, the rules of Java say that all constructors ==must start with a call to one of the super class’s constructors==.

Either way:
- Explicitly call the constructor with the keyword `super`
- If not, Java automatically calls the default constructor of the supclass (no parameters)

```java
public VengefulSLList() {
   super();
   deletedItems = new SLList<Item>();
}
```

## The Object Class
Every type in Java is a descendant of the Object class.

For example:
- VengefulSLList extends SLList.
- SLList extends Object (implicitly).

Documentation for Object class:
https://docs.oracle.com/javase/9/docs/api/java/lang/Object.html