Basic Java Syntax
===
## `if else`
```java
int dogSize = 20;
if (dogSize >= 50) {
  System.out.println("woof!");
} else if (dogSize >= 10) {
  System.out.println("bark!");
} else {
  System.out.println("yip!");
}
```

## `while`
```java
int bottles = 99;
while (bottles > 0) {
    System.out.println(bottles + " bottles of beer on the wall.");
    bottles = bottles - 1;
}
```

## Double and String
```java
String a = "Achilles";
String t = "Tortoise";
double aPos = 0;
double tPos = 100;
double aSpeed = 20;
double tSpeed = 10;
double totalTime = 0;
while (aPos < tPos) { 
    System.out.println("At time: " + totalTime);
    System.out.println("    " + a + " is at position " + aPos);
    System.out.println("    " + t + " is at position " + tPos);

    double timeToReach = (tPos - aPos) / aSpeed;
    totalTime = totalTime + timeToReach;
    aPos = aPos + timeToReach * aSpeed;
    tPos = tPos + timeToReach * tSpeed;
}
```


## Functions
```java
public static int max(int x, int y) {
    if (x > y) {
        return x;
    }
    return y;
}

public static void main(String[] args) {
    System.out.println(max(10, 15));
}
```

## Arrays
```java
int[] numbers = new int[3];
numbers[0] = 4;
numbers[1] = 7;
numbers[2] = 10;
System.out.println(numbers[1]);
```

```java
int[] numbers = new int[]{4, 7, 10};
System.out.println(numbers[1]);
System.out.println(numbers.length);
```

## `for`

### Count for loop
```java
for (initialization; termination; increment) {
    statement(s)
}
```


```java
public class ClassNameHere {
    /** Uses a basic for loop to sum a. */
    public static int sum(int[] a) {
      int sum = 0;
      for (int i = 0; i < a.length; i = i + 1) {
        sum = sum + a[i];
      }
      return sum;
    }
}
```


### For each loop

```java
public class EnhancedForBreakDemo {
    public static void main(String[] args) {
        String[] a = {"cat", "dog", "laser horse", "ketchup", "horse", "horbse"};

        for (String s : a) {
            for (int j = 0; j < 3; j += 1) {
                System.out.println(s);
                if (s.contains("horse")) {
                    break;
                }                
            }
        }
    }
}
```
## Break and Continue
The `continue` statement skips the current iteration of the loop, effectively jumping straight to the increment condition.
```java
public class ContinueDemo {
    public static void main(String[] args) {
        String[] a = {"cat", "dog", "laser horse", "ketchup", "horse", "horbse"};

        for (int i = 0; i < a.length; i += 1) {
            if (a[i].contains("horse")) {
                continue;
            }
            for (int j = 0; j < 3; j += 1) {
                System.out.println(a[i]);
            }
        }
    }
}
```

The `break` keyword completely terminates the innermost loop when it is called.

