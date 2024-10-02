Introduction to Java
===
## Basic Syntax
```java
public class HelloWorld {
    public static void main(String[] args) {
        System.out.println("Hello world!");
    }
}
```

- The **class declaration** `public class HelloWorld`: in Java, all code lives within classes.
- The **`main`** function: all the code that runs must be inside of a method declared as `public static void main(String[] args)`.
- **Curly braces** `{}` enclose sections of code (functions, classes, and other types of code that will be covered in future chapters).
- All statements must end with a **semi-colon**.


## `.java` and `.class`
- `javac` compiles a `.java` source file to a class file `.class`
- `java` runs the class file
	- Binary

## Static Typing
Java is a **statically typed language**, which means that all variables, parameters, and methods must have a declared type. After declaration, _the type can never change_.
Expressions also have an implicit type; for example, the expression `3 + 5` has type `int`.

```java
public class HelloNumbers {
  public static void main(String[] args) {
    int x = 0;
    int sum = 0;
    while (x < 10) {
      sum += x;
      System.out.print(sum + " ");
      x += 1;
    }
    System.out.println();
  }
}
```

## Comments
- `//` Line comment
- `/* */` Block comment
- `/** */` Javadoc
### Javadoc
In a Javadoc comment, the block comment starts with an extra asterisk, e.g. `/**`, and the comment often (but not always) contains descriptive tags.

```java
// import statements

/**
 * @author  Firstname Lastname <address @ example.com>
 * @version 1.6  (current version number of program)
 * @since   1.2  (the version of the package this class was first added to)
 */
public class Test {
    // class body
}
```

Useful ones (IDE ususally auto create them):
- `@param`
- `@returns`
- `@throws`


Copied from Wikipedia: 

| Tag & Parameter                                                                 | Usage                                                                                                        | Applies to                              |
| ------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------ | --------------------------------------- |
| **@author** _John Smith_                                                        | Describes an author.                                                                                         | Class, Interface, Enum                  |
| {**@docRoot**}                                                                  | Represents the relative path to the generated document's root directory from any generated page.             | Class, Interface, Enum, Field, Method   |
| **@version** _version_                                                          | Provides software version information.                                                                       | Module, Package, Class, Interface, Enum |
| **@since** _since-text_                                                         | Describes when this functionality has first existed.                                                         | Class, Interface, Enum, Field, Method   |
| **@see** _reference_                                                            | Provides a link to other element of documentation.                                                           | Class, Interface, Enum, Field, Method   |
| **@param** _name description_                                                   | Describes a method parameter.                                                                                | Method                                  |
| **@return** _description_                                                       | Describes the return value.                                                                                  | Method                                  |
| **@exception** _classname description_  <br>**@throws** _classname description_ | Describes an exception that may be thrown from this method.                                                  | Method                                  |
| **@deprecated** _description_                                                   | Describes an outdated method.                                                                                | Class, Interface, Enum, Field, Method   |
| {**@inheritDoc**}                                                               | Copies the description from the overridden method.                                                           | Overriding Method                       |
| {**@link** _reference_}                                                         | Link to other symbol.                                                                                        | Class, Interface, Enum, Field, Method   |
| {**@linkplain** _reference_}                                                    | Identical to {@link}, except the link's label is displayed in plain text than code font.                     | Class, Interface, Enum, Field, Method   |
| {**@value** _\#STATIC_FIELD_}                                                   | Return the value of a static field.                                                                          | Static Field                            |
| {**@code** _literal_}                                                           | Formats literal text in the code font. It is equivalent to <code>{@literal}</code>.                          | Class, Interface, Enum, Field, Method   |
| {**@literal** _literal_}                                                        | Denotes literal text. The enclosed text is interpreted as not containing HTML markup or nested javadoc tags. | Class, Interface, Enum, Field, Method   |
| {**@serial** _literal_}                                                         | Used in the doc comment for a default serializable field.                                                    | Field                                   |
| {**@serialData** _literal_}                                                     | Documents the data written by the writeObject( ) or writeExternal( ) methods.                                | Field, Method                           |
| {**@serialField** _literal_}                                                    | Documents an ObjectStreamField component.                                                                    | Field                                   |