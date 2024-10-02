---
tags:
  - CS
  - CPP
  - CS106B
---
Object Oriented Programming
===
## Class
A class is a **data type**. Any **object** of the class is an **instance** of the class.
Instances have their own "interiors" and do not affect each other.

Classes can serve as new abstraction tools and abstract away their implemetation detail, only exposing ***interfaces*** for manipulation and problem solving.

## Interface (.h) and Implementation (.cpp)
The **interface** is what a class looks like from the outside (what):
- Attributes
- Methods that can be called
- Functions are represented as functional prototypes
- Articulated in a header file `.h`

The **implementation** is where we find the actual definitions of the functions that drive the behaviors of our class (how):
- Full function definition
- Articulated in an implementation file `.cpp`

## Implementing a Class
A class implementation is divided into a ***header file*** `class.h`  and a ***source file*** `class.cpp`.
Seperating a class implementation can separate as much as possible the interface for that class from the underlying implementation.

Naming convention: Capitalize the first letter of a class name.

The following example implements a dummy class called `QUOKKA`
### Structure of a Class's Header File
```cpp
/* 
 * File: quokka.h
 */

#ifndef QUOKKA_H
#define QUOKKA_H

class Quokka {
public:
  Quokka();
};

#endif
```

#### Definition Structure
Checking whether the class name is defined (included in an `#ifndef` statement) and defining it in the suite: 
```cpp
#ifndef CLASS_NAME_H
#define CLASS_NAME_H

// ...

#endif
```

#### Class Definition
```cpp
class CLASS_NAME {
public:
  CLASS_NAME();
  // ... other variable declarations and functional prototypes go here ...
private:
  // ... other variable declarations and functional prototypes go here ...
};
```
#### Access Modifiers `public:` and `private:`
**`public:`**
We place all the variables and functions we want any client who uses our class to have access to.
Those items constitute our **public-facing interface**.

List out the available interfaces with comments and method prototypes:
- Usage
- Argocuments
- Result type
- Special cases
- Contains no information of implementation

**`private:`**
We place variables and functions that we don't want our client to have access to (only visiable to the defining class).
- declarations of the private instance variables
- prototypes for any private methods used by the class

The compiler prevent the client to use these variables and functions.
For the sake of less visibility, private section can be replaced with a `#include` statement to keep the header file clean. (avoiding confusion)
```cpp
private:
  #include "headerpriv.h"
  // Read in the file "headerpriv.h"
```

### Constructor Function
```cpp
public:
  CLASS_NAME();
```
A function whose name matches our class name is called a ***constructor function***
Called **automatically** anytime we create an instance of our class, which is often useful for doing any important **initialization** tasks when a class is instantiated.

**.h**
```cpp
public:
  CLASS_NAME();
  CLASS(TYPE ATTRIBUTE_1, TYPE ATTRIBUE_2, ...);

  TYPE _ATTRIBUTE_1;
  TYPE _ATTRIBUTE_2;
  ...
```
**.cpp**
```cpp
CLASS_NAME::CLASS_NAME(TYPE ATTRIBUTE_1, TYPE ATTRIBUE_2, ...) {
  _ATTRIBUTE_1 = ATTRIBUTE_1;
  _ATTRIBUTE_2 = ATTRIBUTE_2;
  ...
}
```
To initialize with the constructor function:
```cpp
int main() {
  CLASS_NAME c1(attribute_1, attribute_2);
}

// Or

int main() {
  CLASS_NAME(attribute_1, attribute_2); // create an annoymous object
}
```
### Structure of a Class's Implementation Source File (.cpp)
```cpp
/* 
 * File: quokka.h
 */

Quokka::Quokka() {

}

TYPE Quokka::METHOD_NAME() {
  // ...
}
```
- We `#include` our class's header file from out .cpp file.
	- including all variables
	- including functional prototypes
- `Quokka()` constructor function
- **`ClassName::functionName`** (***qualifier***) for any methods of the class, declaring that it is a qualified name that is part of the class by using namespaces

### Actual Example
For `CharStack` class see [[Class Implementation - CharStack]]
**quokka.h**
```cpp
#ifndef QUOKKA_H
#define QUOKKA_H

#include <iostream>

class Quokka
{
public:
  // member functions (which govern behaviors an object can perform)
  Quokka();  // constructor
  bool haveASnack(std::string snack);
  void printInfo();

  // member variables (which govern the state of an object)
  std::string _name;
  int _howAdorable;  // 1 through 5
  std::string _location;
};

#endif
```

**quokka.cpp**
```cpp
#include <iostream>
#include "quokka.h"
using namespace std;

Quokka::Quokka() { }

// Recall that we need Quokka:: in front of any functions that are part of the class,
// to distinguish them from free-floating functions that exist outside the class.
// Note that the datatype comes before the class name when defining functions
// within a class.
void Quokka::printInfo() {
  // This function can refer to all the member variables inside this class!
  cout << _name << " (how adorable: " << _howAdorable
       << ", loc: " << _location << ")" << endl;
}

// We never ended up doing anything interesting with this function, but here it is.
bool Quokka::haveASnack(string snack){
  return true;
}
```


**main.cpp**
```cpp
#include <iostream>
#include "quokka.h"  // for Quokka class
using namespace std;

int main() {
  // If we didn't #include "quokka.h" above, the compiler would have no idea what
  // a Quokka was when it reached the following lines, and so our program would
  // fail to compile.

  // (Terminology) Below, when we declare q1, we are doing all of the following:
  //  - creating a Quokka
  //  - instantiating the Quokka class
  //  - creating an instance of the Quokka class
  //  - creating a Quokka object

  Quokka q1;
  q1._name = "Muffinface";
  q1._howAdorable = 5;
  q1._location = "Australia";

  // q2 has its own member variables that are distinct from the member variables
  // of q1. Note that Hemmy's adorableness score is only a 4 -- possibly because
  // no matter how adorable you are, it's just hard to look like a 5/5 when you're
  // standing next to Chris Hemsworth.

  Quokka q2;
  q2._name = "Hemmy";
  q2._howAdorable = 4;
  q2._location = "Australia";

  q1.printInfo();
  q2.printInfo();

  return 0;
}
```
Terminology related to what's happening above:
- We refer to the variables within a class as its ***member variables***.
	- ***Instance variables (Instance attributes)***: variables that are unique to every instance
	- ***Member variables (Class attributes)***: variables that are shared and accessed among all instances
- We refer to the functions within a class as its ***member functions***.
- We often say that member variables define the **state** of an object, while member functions define the **behaviors** an object can perform.
- A function whose name matches the name of the class where it resides is a **constructor function**.

Notes:
- We `#include "quokka.h"` from any .cpp file where we want to refer to our `Quokka` class.
- In `quokka.h` and `quokka.cpp`, we `#include` any header files we need to enable the functionality of those files.
- Member variables are named with underscores.
- Do **not** issue a `using namespace std;` in `quokka.h` file, otherwise that namespace would apply to _every_ source file with an `#include "quokka.h"` directive.

### Getter and Setters
Rather than using public instance variables, modern OOP makes all of them private, and use public (**exported**) methods to access and modify them:
- A ***getter*** (***accessor***) is a function that simply **returns the value of a private member variable**.
	- Usually named as `getAttribute()`
- A ***setter*** (***mutator***) is a function whose sole purpose is to change the value of a private member variable.
	- Usually named as `setAttribute()`

By forcing a client to use a setter -- rather than allowing them to modify a variable directly -- we can implement logic that places restrictions on the values they can set that variable to.

Many classes are **immutable**.

**quokka.h**
```cpp
#ifndef QUOKKA_H
#define QUOKKA_H

#include <iostream>

class Quokka {
public:
  Quokka();
  Quokka(std::string name, int howAdorable, std::string profilePic);
  void printInfo();
  std::string getName();
  void setName(std::string name);
  int howAdorable();
  std::string location();
  std::string profilePic();

private: // Setting the instance memebers to private
  std::string _name;
  int _howAdorable;  // 1 through 5
  std::string _location;
  std::string _profilePic;
};

#endif
```
**quokka.cpp**
```cpp
#include <iostream>
#include "quokka.h"
using namespace std;

Quokka::Quokka() { }

Quokka::Quokka(string name, int howAdorable, string profilePic) {
  _name = name;
  _howAdorable = howAdorable;
  _profilePic = profilePic;
  _location = "Australia";
}

string Quokka::getName() { return _name; }

void Quokka::setName(string name) { _name = name; }

int Quokka::howAdorable() { return _howAdorable; }

string Quokka::location() { return _location; }

string Quokka::profilePic() { return _profilePic; }

void Quokka::printInfo() {
  cout << _name << " (how adorable: " << _howAdorable
       << ", loc: " << _location << ")" << endl;
}
```

### Destructor Functions
C++ automatically calls a ***destructor function*** when an object goes out of scope and dies. When the destructor function is called, the object is removed from the heap memory and the program reclaims the memory.
A destructor function is just as a constructor function with a `~` in front of the name.

We can modify the behavoiur of object destruct:
**quokka.h**
```cpp
public:
 ...
 ~Quokka();
 ...
```
**quokka.cpp**
```cpp
...
Quokka::~Quokka() {
  cout << "R.I.P. " << _name << endl;
}
...
```
### The Keyword `this`
Mutators sometimes assign instance variables with parameters of the same name.
```cpp
Point::Point(int x, int y) {
  x = x;
  y = y;
}
```
This leads to the problem of **shadowing**: Having one variable
hide an identically named variable in some larger scope.
The parameter names is in the nearer scope than the instance variable names, so the assignment use the parameter variables to assign the variables, which is useless.

`this` serves as **a pointer to the current object**. Use the `->` operator to **dereference the pointer and select the instance variable** at the same time.
- `this->x` is a shorthand for `(*this).x`
```cpp
Point::Point(int x, int y) {
  this->x = x;
  this->y = y;
}
```

## Object Copying
When assigning one object to another or passing or returning an object by value, a copy of the object is made.
Unless its class specifies otherwise, an object is copied using the C++ default, which is a simple member-wise copy of the data members. This might cause problems with pointers.
- ***Deep copy***: copies pointers and what is being pointed to
- ***Shallow copy***: only copies pointers

### `DISALLOW_COPYING` Macro
**`DISALLOW_COPYING`** prevents the object from being copied.
The `DISALLOW_COPYING` macro is inserted into private section of a class interface and is given one argument, which is the name of the class.

```cpp
/* file: cstkpriv.h */
private:
  DISALLOW_COPYING(CharStack)
```

Objects are mostly passed by reference, prevent copying is implemented for avoiding unexpected error.

