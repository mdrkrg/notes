---
tags:
  - CS
  - CPP
  - CS106B
---
Records
===
A record is a compound data struct consisting of multiple types of data.
Each record is broken up into individual **fields** (**members**)

## Defining Structure Types
1. Define a new structure type
	- Specifies types and names of fields 
2. Declare variables of the new type

Syntax for defining a struct type:
```cpp
struct NAME {
  FIELD_DECLARATIONS;
};
```

Example:
```cpp
struct employeeRecordT {
  string name;
  string title;
  string ssnum;
  double salary;
  int withholding;
};
```
Declaring Struct Variables:
```cpp
employeeRecordT empRec;
```

Record selection and assignment:
```cpp
empRec.title = "Name"
```

Record initialization: Values should be the same order as in definition
```cpp
employeeRecordT manager = {
  "Ebenezer Scrooge", "Partner", "271-82-8183", 250.00, 1
};
```

## Pointers to Records
Larger structured data are often declared to be **pointers to records**.
```cpp
// Declaring a pointer of the type employeeRecordT
employeeRecordT *empPtr;

// Creating a record variable
employeeRecordT empRec;

// Assigning the address to the pointer
empPtr = &empRec;
```

The dynamic approach:
```cpp
  employeeRecordT *manager = new employeeRecordT
    { "Ebenezer Scrooge",
      "Partner",
      "271-82-8183",
	  250.00,
	  1
	};
```

Refering to fields:
```cpp
// Some issues with operator precedence
(*empPtr).salary;

// Shorthand
empPtr->salary;
```

Creating a list of records (dynamic approach) and initialization (C++11)
- For less modern approach use pointer expressions
```cpp
  employeeRecordT *manager = new employeeRecordT[2] {
    { "Ebenezer Scrooge",
      "Partner",
      "271-82-8183",
	  250.00,
	  1 },
	{ "Name2",
	  "...",
	  "114-514-1919",
	  114.514,
	  2 }
  };
```
## Record Member Functions
Records can have member functions. The only difference between records and classes is that **records only have `public`  sections**.
### Record Constructors
Records can have constructor functions, and the definition approach is just the same as in class definition.

They can also have destructors.

Syntax:
```cpp
struct Rectangle {
    int width;  // member variable
    int height; // member variable

    // constructors
    Rectangle()
    {
        width = 1;
        height = 1;
    }

    Rectangle( int width_  )
    {
        width = width_;
        height = width_ ;
    }

    Rectangle( int width_ , int height_ )
    {
        width = width_;
        height = height_;
    }
    // ...
};
```

Initialize with constructor:
```cpp
Rectangle rec(3, 2);
```

