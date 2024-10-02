---
tags:
  - CS
  - CPP
  - CS106B
---
Strings and Characters
===
## ASCII Characters
The `char` data type represents a single character as its value. It is represented with single quotes `'`.

These values are has internal code as integers ranging from -128-127 in the computer (for `signed char` type), and takes up 8 bits in memory.
This means `char` variables can do calculation just as normal integers within its range.

The mapping relationship between value and character represented is according to the ASCII Table.
Some important values:

| Char | Value   |
| ---- | ------- |
| 0-9  | 091-100 |
| A-Z  | 065-090 |
| a-z  | 097-122 |


To ***cast*** a `char` value into `int`, use `int(...)` function.
```cpp
#include <iostream>
using namespace std;

int main() {
   for (char ch = 'a'; ch <= 'z'; ch++) {
      // typecast!
      cout << ch << " (" << int(ch) << ")" << endl;
   }

   return 0;
}
```

### Avoiding Magic Numbers
If you want to represent some value in character calculation, do not use the so called **magic numbers**. That is, to represent the index of lowercase letters, avoid this:
```cpp
int(ch) - 96
```
Instead, use this:
```cpp
int(ch) - ('a' - 1)
```


## Strings in C++
String values are represented with double quotes `"`.
Data type `string`
- Get automatically initialized with `""` (empty string)

1. Strings are **arrays of characters**
	- That is, a string is a block of characters that are contiguous in memory that are indexed from *0* through *(n - 1)*, where *n* is the overall number of characters in the string.
2. Strings are **objects**
	- Strings have methods (member functions of a class) that can be called on, using the dot `.` notation.
	- C++ strings are **mutable**

```cpp
string a = "String1";
string b = 
  "String that "
  "span multiple lines.";
string c = 
  "String that \
escapes the new line.";
```


**A list of string class methods**

| Member Function                               | Description                                                                                                                   |
| --------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------------- |
| `s.append(str)`                               | add text to the end of a string                                                                                               |
| `s.compare(str)`                              | return -1, 0, or 1 depending on relative ordering                                                                             |
| `s.erase(index, length)`                      | delete text from a string starting at given index                                                                             |
| `s.find(str)`<br>`s.rfind(str)`               | return first or last index where the start of str appears in this string (returns string::npos if not found)                  |
| `s.insert(index, str)`                        | add text into string at a given index                                                                                         |
| `s.length()`<br>`s.size()`                    | return number of characters in the string                                                                                     |
| `s.replace(index, len, str)`                  | replace len chars at given index with new text                                                                                |
| `s.substr(start, length)`<br>`s.subsr(start)` | return a new string with the next length chars beginning at start (inclusive); if length is omitted, grabs till end of string |

### String Mutation
Strings in C++ are objects, therefore, they are ***mutable values***.

#### Mutating Individual Characters
```cpp
#include <iostream>
using namespace std;

int main() {
   string s = "hello";
   cout << s << endl;

   // This changes the character at index 0. I read "s[0]" out loud as "s-sub-zero."
   s[0] = 'Y';
   cout << s << endl;

   // We can concatenate a single character to a string using the + operator. We know
   // the w below is just a character (not a string) because it's in single quotes.
   s += 'w';
   cout << s << endl;

   // We can also concatenate an entire string.
   s += " squashes";
   cout << s << endl;

   return 0;
}
```

#### Iteration Through Strings
1. for-loop
2. for-each loop


```cpp
#include <iostream>
using namespace std;

int main() {
   string s = "hello";

   // We can loop through a string using a for-loop.
   for (int i = 0; i < s.length(); i++) {
      cout << i << ": " << s[i] << endl;
   }

   // We can also use a for-each loop (aka "range-based loop"), but this approach
   // doesn't give us a handy variable to tell us what index we're at in the string.
   cout << endl;
   for (char ch : s) {
      cout << ch << endl;
   }

   return 0;
}
```

## Character Processing
Characters are as integers, they can be evaluated in an expression, compared, etc.


Example: Check if a character is lowercase
```cpp
#include <iostream>
using namespace std;

bool isCharLower(char a) {
  return a >= 'a' && a <= 'z';
}

int main() {
   string password = "p4ssw0rd";
   string alphaPortion;

   for (int i = 0; i < password.length(); i++) {
      // checks whether password[i] is a lowercase char
      if (isCharLower(password[i])) {
         alphaPortion += password[i];
      }
   }

   cout << alphaPortion << endl;

   return 0;
}
```
### Character Processing Library `cctype`
| Member Function | Description                                                         |
| --------------- | ------------------------------------------------------------------- |
| `isalnum(ch)`   | checks if a character is alphanumeric                               |
| `isalpha(ch)`   | checks if a character is alphabetic                                 |
| `islower(ch)`   | checks if a character is a lowercase alphabetic character           |
| `isupper(ch)`   | checks if a character is an uppercase alphabetic character          |
| `isdigit(ch)`   | checks if a character is a digit                                    |
| `isxdigit(ch)`  | checks if a character is a hexadecimal character                    |
| `iscntrl(ch)`   | checks if a character is a control character                        |
| `isgraph(ch)`   | checks if a character is a graphical (i.e., visible) character      |
| `isspace(ch)`   | checks if a character is a space character (typically tab or space) |
| `isblank(ch)`   | checks if a character is a blank character                          |
| `isprint(ch)`   | checks if a character is a printing character according to locale   |
| `ispunct(ch)`   | checks if a character is punctuation (visible non-alnum/non-space)  |
| `toupper(ch)`   | converts a character to uppercase (pass-by-value!)                  |
| `tolower(ch)`   | converts a character to lowercase (pass-by-value!)                  |
## Strings and String Literals
C++ has two types of strings
- String objects (with `string` type)
- ***String literals***

String literals are C-styled hard-coded strings in double quotes, they are **literals**, immutable **direct values** rather than objects.

Performing operation on string literals leads to compiling errors!
While performing operation between a C++ string and a string literal triggers **type-conversion**, **comverting the string literal to C++ string (informal to formal)**, and therefore get compiled without error.

Do the following:
- Implicit type conversion from C string literals to C++ strings
- Forced type conversion

```cpp
string s1 = "Hello " + "world!" // Error!
string hl = "Hello"
// string + literal
string s2 = hl + "world" // Implicit type cast
// literal + literal to string
string s3 = "Hello " + (string)"world!" // Forced type cast
```



## Extra: C-style String Processing
### `snprintf`
Converting other types into a character array.

`[!!TODO:TODO]`