---
tags:
  - CS
  - C
---
# Macros
## Syntax
Concatnating: `##`
https://gcc.gnu.org/onlinedocs/cpp/Concatenation.html

## Tricks (Meta Programming)
I like [this one](https://github.com/numpy/numpy/blob/cfeed27838229b2f12e64297d8cce283ea52ef15/numpy/_core/src/umath/_rational_tests.c#L939):
```c hl:2
#define BINARY_UFUNC(name,intype0,intype1,outtype,exp) \
    void name(char** args, npy_intp const *dimensions, \
              npy_intp const *steps, void* data) { \
        npy_intp is0 = steps[0], is1 = steps[1], \
            os = steps[2], n = *dimensions; \
        char *i0 = args[0], *i1 = args[1], *o = args[2]; \
        int k; \
        for (k = 0; k < n; k++) { \
            intype0 x = *(intype0*)i0; \
            intype1 y = *(intype1*)i1; \
            *(outtype*)o = exp; \
            i0 += is0; i1 += is1; o += os; \
        } \
    }
#define RATIONAL_BINARY_UFUNC(name,type,exp) \
    BINARY_UFUNC(rational_ufunc_##name,rational,rational,type,exp)
RATIONAL_BINARY_UFUNC(add,rational,rational_add(x,y))
RATIONAL_BINARY_UFUNC(subtract,rational,rational_subtract(x,y))
RATIONAL_BINARY_UFUNC(multiply,rational,rational_multiply(x,y))
RATIONAL_BINARY_UFUNC(divide,rational,rational_divide(x,y))
RATIONAL_BINARY_UFUNC(remainder,rational,rational_remainder(x,y))
RATIONAL_BINARY_UFUNC(floor_divide,rational,
    make_rational_int(rational_floor(rational_divide(x,y))))
PyUFuncGenericFunction rational_ufunc_true_divide = rational_ufunc_divide;
RATIONAL_BINARY_UFUNC(minimum,rational,rational_lt(x,y)?x:y)
RATIONAL_BINARY_UFUNC(maximum,rational,rational_lt(x,y)?y:x)
RATIONAL_BINARY_UFUNC(equal,npy_bool,rational_eq(x,y))
RATIONAL_BINARY_UFUNC(not_equal,npy_bool,rational_ne(x,y))
RATIONAL_BINARY_UFUNC(less,npy_bool,rational_lt(x,y))
RATIONAL_BINARY_UFUNC(greater,npy_bool,rational_gt(x,y))
RATIONAL_BINARY_UFUNC(less_equal,npy_bool,rational_le(x,y))
RATIONAL_BINARY_UFUNC(greater_equal,npy_bool,rational_ge(x,y))
```

Note line2 of this macro: `void name(...`
- **Meta Programming** (My understanding) - the code that codes itself
- Every time we call a macro `BINARY_UFUNC`, the preprocessor ==expands the Macro into a function definition==
