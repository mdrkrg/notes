Higher Order Functions
===
In Java earlier than Java 8, there're no pointers to functions.

## Interface-Styled HOF
Consider the Python code:
```python
def tenX(x):
   return 10*x
 
def do_twice(f, x):
   return f(f(x))

print(do_twice(tenX, 2))
```

Java implementation:
```java
public interface IntUnaryFunction {
	int apply(int x);
}

public class TenX implements IntUnaryFunction {
	public int apply(int x) {
   		return 10 * x;
	}
}

public class HoFDemo {
	public static int do_twice(IntUnaryFunction f, int x) {
   		return f.apply(f.apply(x));
	}
	
	public static void main(String[] args) {
   		System.out.println(do_twice(new TenX(), 2));
	}
}
```

## Function Pointers Using Lambdas
```java
list.sort((a, b) -> a.isGreaterThan(b));
```

Method references:
```java
list.sort(MyClass::isGreaterThan);
```