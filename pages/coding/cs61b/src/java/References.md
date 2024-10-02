References
===
## Primitive Types
- byte
- short
- int
- long
- float
- double
- boolean
- char

### Declaring Variables
When you declare a variable of a certain type, Java finds a contiguous block with exactly enough bits to hold a thing of that type. For example, if you declare an int, you get a block of 32 bits. If you declare a byte, you get a block of 8 bits. Each data type in Java holds a different number of bits.

Java does not write anything into the reserved box when a variable is declared. In other words, there are no default values. As a result, **the Java compiler prevents you from using a variable until after the box has been filled with bits using the `=` operator**.
## The Golden Rule of Equals
When you write `y = x`, you are telling the Java interpreter to copy the bits from x into y. This simple idea of **copying the bits** is true for ANY assignment using `=` in Java.

## Reference Types
Every type other than a primitive type is a **reference type**.
Arrays of primitive type are also references.
### Object Instantiation
When we _instantiate_ an Object using `new`, Java first allocates a box for each instance variable of the class, and fills them with a default value.

The Object we've created is **anonymous**, in the sense that it has been created, but **it is not stored in any variable**. Let's now turn to variables that store objects.

### Reference Variable Declaration
When we _declare_ a variable of any reference type, Java allocates a box of 64 bits, no matter what type of object. This box contains the **address** of the object of that type.

To assign the reference variable:
- Calling a `new` operator returns the address of the newly created object.
- Assigning by another reference of the same type.
- We can also assign the special value `null` to a reference variable, corresponding to all zeros.

> [!note] You should think of Reference Types as Pointers in C++

## Parameter Passing
When you pass parameters to a function, you are also simply copying the bits.
Copying the bits is usually called "pass by value". In Java, we **always** pass by value.

- Pass the value of Reference (Point to the same address)

