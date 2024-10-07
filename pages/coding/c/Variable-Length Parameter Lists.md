---
tags:
  - CS
  - C
---
Variable-Length Parameter Lists
===
Standard libarary header `stdarg.h` let you create variable length parameter lists.

Functions with variable-length parameter lists can be declared like this:
```c
void foo(char *fmt, ...);
```
- The variable-length parameter list `...` must be at the end of parameter list
- A named parameter must appear before the variable-length parameter list

Some macros are defined in the header to get the list:
```c
#include <stdarg.h>
void foo (char *fmt, ...)
{
  va_list args;
  va_start (args, fmt);
}
```
- `args` is declared as a `va_list` variable that will be pointed to the start of list
- `va_start(va_list args, last_fixed_parameter)` points the `args` to the next parameter of `last_fixed_parameter`

To get the next argument in the list, use the `va_arg()`:
```c
type_t va_arg (va_list args, type_t);
```
```c
#include <stdarg.h>
#include <stdio.h>
void foo (char *fmt, ...)
{
  va_list args;
  va_start (args, fmt);
  char *str;
  while (*fmt)
    {
      switch (*fmt++)
        {
          case '%':
            {
              if (*fmt == 's')
                {
	              str = va_arg(args, char *);
                  put_string(str);
                  fmt++;
                }
              break;
            }
          default: put(*fmt);
        }
    }
    va_end(args);
}
```
- `va_args` will 
	- get the value of the current argument in the list being pointed to
	- increment the `args` and point it to the next value
- Undefined behaviour occurs when:
	- `type_t` mismatch with the argument being pointed to
	- Trying to access when there're no argument left
- So, it would be better if you pass in the total number of arguments, or know when to terminate (in the case of `fmt_string`)

In the end, use `va_end(va_list args)` to free the usage of `va_list`
