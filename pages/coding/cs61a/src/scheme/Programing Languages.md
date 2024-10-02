---
tags:
  - CS
  - Programing
  - CS61A
---
Programing Languages
===
A computer execute programs written in many different programming languages
- **Machine languages**: statements are interpreted by the hardware itself
	- A fixed set of instructions invoke operations implemented by the circuitry of the central processing unit
	- Operations refer to specific hardware memory addresses; no abstraction mechanisms
- **High-level languages**: statements and expressions are intepreted by another program or compiled into another language
	- Provide means of abstraction such as naming, function definition, and objects
	- Abstract away system details to be independent of hardware and operating systems

```python
from dis import dis
def square(x):
    return x * x
dis(square) # Display a lower level implementation similar to machine language
```

## Metalinguistic Abstraction
A powerful form of abstraction is to define a new language that is tailored to a particular type of application or problem domain

- Type of application: Erlang
- Problem domain: MediaWiki


Components:
- **Syntax**: The legal statements and expressions in the language
- **Semantics**: The execution/evaluation rule for those statements and expressions

Necessities:
- **Specification**: A document describe the precise synbax and semantics of the language
- **Canonical Implementation**: An interpreter or compiler for the language