Abstract Data Types and Java Library
===
## Abstract Data Type (ADT)
An Abstract Data Type is defined only by its operations, not by its implementation.

- In Java, called an interface
- Only comes with behaviours
- Not concrete ways to exhibit those behaviour (abstract)

## Java Libraries
In java.util library:
- [List](https://docs.oracle.com/javase/8/docs/api/java/util/List.html): an ordered collection of items
    - A popular implementation is the [ArrayList](https://docs.oracle.com/javase/8/docs/api/java/util/ArrayList.html)
- [Set](https://docs.oracle.com/javase/7/docs/api/java/util/Set.html): an unordered collection of strictly unique items (no repeats)
    - A popular implementation is the [HashSet](https://docs.oracle.com/javase/7/docs/api/java/util/HashSet.html)
- [Map](https://docs.oracle.com/javase/8/docs/api/java/util/Map.html): a collection of key/value pairs. You access the value via the key.
    - A popular implementation is the [HashMap](https://docs.oracle.com/javase/8/docs/api/java/util/HashMap.html)

![java_lib_inheritance](https://joshhug.gitbooks.io/hug61b/content/assets/collection_hierarchy.png)
### Lists
Full name ('canonical name') of class/interface:
```java
java.util.List<Integer> L = new java.util.ArrayList<>();
```

Import statement:
```java
import java.util.List;
import java.util.ArrayList;

public class Example {
    public static void main(String[] args) {
        List<Integer> L = new ArrayList<>();
        L.add(5);
        L.add(10);
        System.out.println(L);
    }
}
```

### Sets
```java
import java.util.Set;
import java.util.HashSet;
```

Example:
```java
Set<String> s = new HashSet<>();
s.add("Tokyo");
s.add("Lagos");
System.out.println(s.contains("Tokyo")); // true
```
### Maps
Maps are key-value maps.

Inside maps are `Map.Entry<K,V>` objects, you can iterate through a map through
```java
for (Map.Entry<K, V> entry: map.entrySet()) {
	System.out.println("key: ", entry.getKey());
	System.out.println("value: ", entry.getValue());
}
```
- `Map.Entry` are also handy for creating Pairs


Or if you only care about keys or values, use `keySet` or `values`


Example:
![[sp18 - 4.4#^61b-sp18e44]]

## Abstract Classes
Interfaces have the following qualities:
- All methods must be public.
- All variables must be public static final.
- Cannot be instantiated
- All methods are by default abstract unless specified to be `default`
- Can implement more than one interface per class

Abstract classes are between interfaces and concrete classes. Basically, abstract classes can do everything interfaces can do and more:
- Methods can be public or private
- Can have any types of variables
- Cannot be instantiated
- Methods are by default concrete unless specified to be `abstract`
- Can only implement one per class

Must be declared as abstract:
- Fails to implement any abstract methods inherited from an interface
```java
public abstract class AbstractBoundedQueue extends ...
```

Declare additional abstract methods (without implementation):
```java
abstract void moveTo(double deltaX, double deltaY);
```


## Packages
A package is a **namespace** that organizes classes and interfaces.
- Naming convention: starts with website address (backwords)
Package names **give a canonical name for everything**.
- Canonical means a _unique representation_ for a thing
- Differentiate multiple classes with the same name


To create a package specific class:
```java
package ug.joshh.animal;
public class Dog {
  ...
}
```

To use:
- Entire canonical name
```java
ug.josh.animal.Dog d = new ug.josh.animal.Dog();
```
- Import statement
```java
import ug.josh.animal.Dog;
Dog d = new Dog();
```
- Wildcard Import (bad)
```java
import ug.joshh.animal.*;
Dog d = new Dog();
```

### Creating a Package
1. Put the package name at the top of every file in this package
2. Store the file in a folder that has the appropriate folder name. The folder should have a name that matches your package:
	- i.e. `ug.joshh.animal` package is in `ug/joshh/animal` folder

### Packages with Intellij
**Creating a Package, in IntelliJ**
1. File → New Package
2. Choose package name (i.e. “ug.joshh.animal”)

**Adding (new) Java Files to a Package, in IntelliJ**
1. Right-click package name
2. Select New → Java Class
3. Name your class, and IntelliJ will automatically put it in the correct folder + add the “package ug.joshh.animal” declaration for you.

**Adding (old) Java Files to a Package, in IntelliJ**
1. Add “package \[packagename\]” to the top of the file.
2. Move the .java file into the corresponding folder.

### Default Packages
Any Java class without an explicit package name at the top of the file is automatically considered to be part of the “default” package.
- Cannot be imported outside default package
- Avoid
```java
DogLauncher.launch(); // won’t work
default.DogLauncher.launch(); // doesn’t exist
```
## JAR Files
JAR files can archive together .class files.

**Creating a JAR File (IntelliJ)**
1. Go to File → Project Structure → Artifacts → JAR → “From modules with dependencies”
2. Click OK a couple of times
3. Click Build → Build Artifacts (this will create a JAR file in a folder called “Artifacts”)
4. Distribute this JAR file to other Java programmers, who can now import it into IntelliJ (or otherwise)


## Build Systems
Automate the process of setting up your project
- Maven
- Gradle
- Ant
- ...