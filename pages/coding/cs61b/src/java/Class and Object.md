Class and Object
===
## Object Instantiation
```java
public class Dog {
  public int weightInPounds;

  public void makeNoise() {
    if (weightInPounds < 10) {
      System.out.println("yipyipyip!");
    } else if (weightInPounds < 30) {
      System.out.println("bark. bark.");
    } else {
      System.out.println("woof!");
    }
  }    
}
```

- An `Object` in Java is an instance of any class.
- The `Dog` class has its own variables, also known as _instance variables_ or _non-static variables_. These must be declared inside the class.
- The method that we created in the `Dog` class did not have the `static` keyword. We call such methods _instance methods_ or _non-static methods_.
- To call the `makeNoise` method, we had to first _instantiate_ a `Dog` using the `new` keyword, and then make a specific `Dog` bark. In other words, we called `d.makeNoise()` instead of `Dog.makeNoise()`.
- Once an object has been instantiated, it can be _assigned_ to a _declared_ variable of the appropriate type, e.g. `d = new Dog();`
- Variables and methods of a class are also called _members_ of a class.
- Members of a class are accessed using _dot notation_.
### Constructor
The constructor with signature `public Dog(int w)` will be invoked anytime that we try to create a `Dog` using the `new` keyword and a single integer parameter.
```java
public Dog Dog(int w) {
  weightInPounds = w;
}
```

To call a constructor:
```java
Dog d = new Dog(5);
```

> [!note] Difference Between Java and C++
> Java does not have initializer lists as those in C++.
> One of the case is `const` variables in C++ should be initialized in initializer lists. In Java, the constants are decorated using `final` keyword, and they can be assigned only once in constructor functions.
> ```java
> public class Foo {
>   int final bar;
>   public Foo(int x) {
>     bar = x;
>   }
> }
> ```

### Array Instantiation, Array of Objects
Arrays are also instantiated in Java using the new keyword. For example:
```java
public class ArrayDemo {
    public static void main(String[] args) {
        /* Create an array of five integers. */
        int[] someArray = new int[5];
        someArray[0] = 3;
        someArray[1] = 4;
    }
}
```

We can create arrays of instantiated objects in Java, e.g.
```java
public class DogArrayDemo {
    public static void main(String[] args) {
        /* Create an array of two dogs. */
        Dog[] dogs = new Dog[3];
        dogs[0] = new Dog(8);
        dogs[1] = new Dog(20);

        /* Yipping will result, since dogs[0] has weight 8. */
        dogs[0].makeNoise();
    }
}
```

- You should think of the first array of `Dog` as an array of pointers to Dog objects as in C++.
- Add existing objects to arrays:
```java
/* in main(): */
Dog smallDog = new Dog(5);
dogs[2] = smallDog;
dogs[2].makeNoise();
```


## Static Methods (Class Methods)
Static methods are actions that are taken by the class itself.

```java
public static Dog maxDog(Dog d1, Dog d2) {
  if (d1.weightInPounds > d2.weightInPounds) {
    return d1;
  }
  return d2;
}
```

To call a static method, the most common ways is to call via the class name.
```java
x = Math.sqrt(100);
```

Another approach is allowed but weird and not often used.
```java
Math m = new Math();
x = m.sqrt(100);
```
### Client
A class that uses another class is sometimes called a "client" of that class.
Sometimes we want to seperate the `main` method from a class, in this case we can use a client.
```java
public class DogLauncher {
  public static void main(String[] args) {
    Dog.makeNoise();
  }
}
```

```sh
$ java DogLauncher
Bark!
```
## Non-static Methods (Instance Methods)
Instance methods are actions that can be taken only by a specific instance of a class.

```java
public Dog maxDog(Dog d2) {
  if (this.weightInPounds > d2.weightInPounds) {
    return this;
  }
  return d2;
}
```

- The keyword `this` to refer to the current object.

## Static Variables
Static variables are properties inherent to the class itself, rather than the instance.
For instance, the name of the species:
```java
public class Dog {
    public int weightInPounds;
    public static String binomen = "Canis familiaris";
    ...
}
```

To access a static variable:
```java
Dog.binomen
```

## `main` Function and Command Line Arguments
```java
public static void main(String[] args)
```
- `public`: So far, all of our methods start with this keyword.
- `static`: It is a static method, not associated with any particular instance.
- `void`: It has no return type.
- `main`: This is the name of the method.
- `String[] args`: This is a parameter that is passed to the main method.

Main is called by Java interpreter, so it is the interpreter's job to deliver these arguments.
```java
public class ArgsDemo {
    public static void main(String[] args) {
        System.out.println(args[0]);
    }
}
```
Output:
```shell
$ java ArgsDemo these are command line arguments
these
```