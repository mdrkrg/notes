Exception
===
```java
throw new ExceptionObject(parameter1, ...)
```

```java
try {
  // This block of code will throw exception
  ...
} catch (ExceptionObject c) {
  // This block of code is executed when exception occurs
  // Non local jump
  ...
} finally {
  // This block of code will execute after both cases
  ...
}
```