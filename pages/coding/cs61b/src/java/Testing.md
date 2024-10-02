Testing
===
## Writing Tests
As a totally new way of thinking, we'll start by writing `testSort()` first, and only after we've finished the test, we'll move on to writing the actual sorting code.

### Ad Hoc Testing
We simply need to create an input, call `sort`, and check that the output of the method is correct. If the output is not correct, we print out the first mismatch and terminate the test.
```java
public class TestSort {
  /** Tests the sort method of the Sort class. */
  public static void testSort() {
    String[] input = {"i", "have", "an", "egg"};
    String[] expected = {"an", "egg", "have", "i"};
    Sort.sort(input);
    for (int i = 0; i < input.length; i += 1) {
      if (!input[i].equals(expected[i])) {
        System.out.println("Mismatch in position " + i + ", expected: " + expected + ", but got: " + input[i] + ".");
        break;
      }
    }
  }

  public static void main(String[] args) {
    testSort();
  }
}
```

### JUnit Testing
```java
import static org.junit.Assert.*;
public class TestSort {
  /** Tests the sort method of the Sort class. */
  public static void testSort() {
    String[] input = {"cows", "dwell", "above", "clouds"};
    String[] expected = {"above", "clouds", "cows", "dwell"};
    Sort.sort(input);

    assertEquals(input, expected);
  }

  public static void main(String[] args) {
    testSort();
  }
}
```

### Integration Testing
Integration testing verifies that components interact properly together.

## Testing in IDE
If we add `@Test` before a method AND make the function non-static, green arrows appear.

```java
public class TestSort {
  @Test
  public void testSort() { ... %%  %%}
}
```
- The single green arrow by testSort means “run this function”.
- The double green arrow means run all tests in this class.

## Test-Driven Development (TDD)
TDD is a development process in which we write tests for code before writing the code itself. The steps are as follows:
1. Identify a new feature.
2. Write a unit test for that feature.
3. Run the test. It should fail.
4. Write code that passes the test. Yay!
5. Optional: refactor code to make it faster, cleaner, etc. Except now we have a reference to tests that should pass.

Test-Driven Development is not required in this class and may not be your style but unit testing in general is most definitely a good idea.