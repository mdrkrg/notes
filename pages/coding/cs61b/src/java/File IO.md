File IO
===
## Getting CWD
```java
System.getProperty("user.dir")
```
This will get a string representation of the Curent Working Directory's absolute path.

## File & Directory Manipulation
https://docs.oracle.com/en/java/javase/22/docs/api/java.base/java/io/File.html
### Files
Make a new file describer
```java
File f = new File("dummy.txt");
```
- Create a file describer with relative path of `./dummy.txt`
- File is not created yet

Creating the file as **plain file**
```java
f.createNewFile();
```
- Now file is in FS

Check if if file exists
```java
f.exists();
// -> boolean
```

#### \*Using the `Utils` (Provided in Project 2)
As an example, if you want to write a String to a file, you can do the following:

```java
Utils.writeContents(f, "Hello World");
```

### Directories
Make a new file describer
```java
File d = new File("dummy")
```

Create it as a directory entry
```java
d.mkdir();
```


## Serializable
**Serialization** is the process of translating an object to a series of bytes (binary) that can then be ==stored in the file==.
- C++'s `file.write(reinterpret_cast<const char *>(&object, sizeof object))`

We can then **deserialize** those bytes and get the original object back in a future invocation of the program.
- C++'s `file.read(reinterpret_cast<char *>(&object, sizeof object))`

To enable an object to be serializable, declare it to be `implements Serializable`
```java
import java.io.Serializable;

public class Model implements Serializable {
  ...
}
```

Writing the object `m` to file `saveFileName`:
```java
Model m = ....;
File outFile = new File(saveFileName);
try {
    ObjectOutputStream out =
        new ObjectOutputStream(new FileOutputStream(outFile));
    out.writeObject(m);
    out.close();
} catch (IOException excp) {
    ...
}
```


Reading the object `m` from `saveFileName`:
```java
Model m;
File inFile = new File(saveFileName);
try {
    ObjectInputStream inp =
        new ObjectInputStream(new FileInputStream(inFile));
    m = (Model) inp.readObject();
    inp.close();
} catch (IOException | ClassNotFoundException excp) {
    ...
    m = null;
}
```

### \*Using the Provided `Utils` (Provided in Project 2)
Serializing with `Utils`

```java
Model m;
File outFile = new File(saveFileName);

// Serializing the Model object
writeObject(outFile, m);
```

And similarly, deserializing is simply:

```java
Model m;
File inFile = new File(saveFileName);

// Deserializing the Model object
m = readObject(inFile, Model.class);
```