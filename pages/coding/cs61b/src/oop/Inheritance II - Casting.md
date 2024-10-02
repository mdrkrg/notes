Inheritance II - Casting
===
![[Inheritance I - Interface and Implementation Inheritance#Static Type and Dynamic Type]]

## Compile-Time Type Checking and Expressions
Based on compile-time types:
- Method calls
- Assignments

### Compile-Time Assignments
An expression using the new keyword has the specified compile-time type. Example:
```java
SLList<Integer> sl = new VengefulSLList<Integer>();
```

- Compile-time type of right hand side (RHS) expression is VengefulSLList.
- A VengefulSLList is-an SLList, so assignment is allowed.

```java
VengefulSLList<Integer> vsl = new SLList<Integer>();
```
- Compile-time type of RHS expression is SLList.
- An SLList is not necessarily a VengefulSLList, so compilation error results.

### Compile-Time Method Calls
Method calls have compile-time type equal to their declared type.
```java
public static Dog maxDog(Dog d1, Dog d2) { … }
```
- Any call to maxDog will have compile-time type Dog!

```java
Poodle frank  = new Poodle("Frank", 5);
Poodle frankJr = new Poodle("Frank Jr.", 15);

Poodle largerPoodle = maxDog(frank, frankJr);
```
- Compilation error! RHS has compile-time type Dog

## (Static) Casting
Java has a special syntax for specifying the **compile-time type** of any expression.
- Put desired type in parenthesis before the expression.
- Tells compiler to pretend it sees a particular type.
```java
Poodle largerPoodle = (Poodle) maxDog(frank, frankJr);
// compiles! Right hand side has compile-time type Poodle after casting
```

Casting is a powerful but dangerous tool.
- Tells Java to treat an expression as having a different compile-time type.
- Ignore type error at compile time but might cause runtime error.
- Does not actually change anything: sunglasses don’t make the world dark.

```java
Poodle frank = new Poodle("Frank", 5);
Malamute frankSr = new Malamute("Frank Sr.", 100);

Poodle largerPoodle = (Poodle) maxDog(frank, frankSr); // runtime exception!
// This return s a Malamute
// Can't be casted into Poodle
```