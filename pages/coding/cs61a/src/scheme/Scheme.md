---
tags:
  - CS
  - Scheme
  - CS61A
---
Scheme
===
https://inst.eecs.berkeley.edu/~cs61a/fa23/articles/scheme-spec/

https://inst.eecs.berkeley.edu/~cs61a/fa23/articles/scheme-builtins/
## Scheme Fundamentals
Scheme programs consist of expressions, which can be:
- Primitive expressions: `2`, `3.3`, `true`, `+`, `quotient`, ...
- Combinations: `(quotient 10 2)`, `not true`, ...

Numbers are self-evaluating

Symbols are bound to values

Call expressions include an operator and 0 or more operands in parentheses

```scheme
> (+ (* 3
        (+ (* 2 4)
           (+ 3 5)))
     (+ (- 10 7)
        6))
```
- Combinations can span multiple lines
- Spacing doesn't matter (indent for making expression clearer)

Examples:
```scheme
> (+ 1 2 3 4)
10
> (* 1 2 3 4)
24
> (+)
1
> (*)
1
> (quotient 7 5)
1; //
> (modulo 7 5)
2; mod
> +
#[+]
> (number? 3)
#t
> (number? +)
#f
> (zero? (- 2 2))
#t
> (integer? 2)
#t
> (integer? 2.2)
#f
```
- The question mark is part of the name `integer?`

## Special Forms
A combination that is not a call expression is a *special form*.

### If Expression
```scheme
> (if <predicate> <consequent> <alternative>)
```
Evalutation:
1. Evaluate the predicate expression
2. Evaluate either the `consequent` or `alternative`
	- `consequent` as the suite of `if` clause in Python
	- `alternative` as the suite of `else` clause in Python
### Boolean Operators
Boolean operators are short circuit operators
```scheme
> (and <e1> ... <en>)
> (or <e1> ... <en>)
> (not <expr>)
```
### Binding Symbols
```scheme
> (define <symbol> <expression>)
```
Symbols defined in the global enviroment are bound to values in the global frame
### New Procedures
```scheme
> (define (<symbol> <formal parameters>) <body>)
```

Example: Babylonian Square Root
$$\begin{gather}
a_1 = a\in\mathbb R_+\\a_{n+1} = \frac12\left(a_n + \frac k{a_n}\right)\\\\
\lim_{n\to\infty}a_n=\sqrt{k}
\end{gather}$$
```scheme
> (define (average x y)
    (/ (+ x y) 2))

> (define (square x) (* x x))

> (define (sqrt x)
    (define (good-enough? guess)
      (< (abs (- (square guess) x)) 0.000000001))
    (define (improve guess)
      (average guess (/ x guess)))
    (define (sqrt-iter guess)
      (if (good-enough? guess)
          guess; Returning the GUESS if true
          (sqrt-iter (improve guess)))); Otherwise keep guessing
    (sqrt-iter 1.0)); Return the SQRT_ITER function on oprend 1

> (sqrt 9)
3.0
```

Due to some precision problem, the following code may lead to an infinity recursion.
```scheme
(define (alt_sqrt x)
  (define (update guess)
    (if (= (square guess) x)
      guess
      (update (average guess (/ x guess)))))
  (update 1.0))
```
Though it can run fairly well in Python.

Here's another recursion example:
```scheme
(define (power x) 
        (if (= x 1) x (* x (power (- x 1)))))
```
## Lambda Expressions
Lambda expressions evaluate to anonymous procedures
```scheme
(lambda (<formal-parameters>) <body>)
```
Two equivlent expressions:
```scheme
(define (plus4 x) (+ x 4))
(define plus4 (lambda (x) (+ x 4)))
```

An operator can be a call expression too:
```scheme
((lambda (x y z) (+ x y (square z))) 1 2 3)
```

## Printing Values
The native-code interpretors use `display` instead of `print`, but in 61A we use `print`
```scheme
> (define a 3)
> (display a)
3
> (display 'a)
a
```

## `cond`
The `cond` special form that behaves like `if`-`elif`-`else` statements in Python.
```scheme
(cond ((<condition1>) (<expression1>))
      ((<condition2>) (<expression2>))
      (...)
      (else           (<expression3>))); Optional
```
If we want the conditional statement to get displayed, the best option is to nest the `cond` statment inside of the `display` statement.
```scheme
(display 
  (cond ((<condition1>) (<expression1>))
        ((<condition2>) (<expression2>))
        (...)
        (else           (<expression3>))))
```
## `begin`
The `begin` special form combines multiple expressions into one expression.
```scheme
(begin <expression1> <expression2> ... <expressionN>)
```
The interpreter will evaluate each expression or execute each procedure one by one.

## Let Expressions
The `let` special form binds symbols to values temporarily, **just for one expression.**
```scheme
(let ((<symbol1> <expression1>) (<symbol2> <expression2>) ... (<symbolN> <expressionN>)) (<procedure>))
```
The following is an example of how `let` is used in the context:
```scheme
> (define c (let ((a 3)
                  (b (+ 2 2)))
                 (sqrt (+ (* a a) (* b b)))
            )
  )
> c
5
> a
Exception: variable a is not bound
```
## Compound Values
Pairs are built into the Scheme language.

Pairs are created with the `cons` built-in function, and the elements of a pair are accessed with `car` and `cdr`:
```scheme
> (define x (cons 1 2))
x
(1 . 2)
> (car x)
1
> (cdr x)
2
```
- `cons` Two-argument procedure that creates a linked list
- `car` Procedure that returns the first element of a list
- `cdr` Procedure that returns the rest of a list
- `nil` The empty list `'()`

Recursive lists are also built into the language, using pairs. These lists are like the linked list class in Python.
```scheme
> (cons 1
        (cons 2
              (cons 3
                  (cons 4 nil))))
(1 2 3 4); Rendered this way but is in fact recursive
> (list 1 2 3 4)
(1 2 3 4)
> (define lst (list 1 2 3 4))
> (car lst)
1
> (cdr lst)
(2 3 4)
> (car (cdr lst))
2
> (cons 10 lst)
(10 1 2 3 4)
> lst
(1 2 3 4); Not mutated
```
Whether a value is a list can be determined by `list?` operator:
```scheme
> (list? 1)
#f
> (list? (cons 1 (cons 2 nil)))
#t
> (list? nil)
#t
```
Whether a list is empty can be determined using the primitive `null?` predicate.

Using it, we can define the standard sequence operations for computing `length` and selecting elements:
```scheme
(define (length items)
  (if (null? items)
      0
      (+ 1 (length (cdr items)))))

(define (getitem items n)
  (if (= n 0)
      (car items)
      (getitem (cdr items) (- n 1))))

> (define squares (list 1 4 9 16 25))
> (length squares)
5
> (getitem squares 3)
16
```
## Symbolic Data
In Scheme, we refer to the symbols rather than their values by preceding them with a single quotation mark `'` (short for `(quote name)`):
```scheme
> (define a 1)
> (define b 2)
> (list a b)
(1 2)
> (list 'a 'b)
(a b)
> (list 'a b)
(a 2)
> (list 'define 'list)
(define list)
```

Quotation also allows us to type in compound objects, using the conventional printed representation for lists:
```scheme
> (car '(a b c))
a
> (cdr '(a b c))
(b c)
```
## List Processing
### Built-in Procedures
- `(append s t)` List the elements of `s` and `t` 
	- Can be called on more than 2 lists
- `(map f s)` Call a procedure `f` on each element of a list `s` and list the results
- `(filter f s)` Call a procedure `f` on each element of a list `s` and list the elements for which a true value is the result
- `(apply f s)` Call a procedure `f` with the elements of a list as its arguments
```scheme
> (apply + '(1 2 3 4))
10
```


### Example: Even Subsets
The even subsets of `s` include:
- All the even subsets of the rest of `s`
- The first element of `s` followed by an (even/odd) subset of the rest
- Just the first element of `s` if it is even

```scheme
(define (even-subsets s)
  (if (null? s) 
    nil
    (append (even-subsets (cdr s))
            (map (lambda (t) (cons (car s) t))
                  (if (even? (car s))
                    (even-subsets (cdr s))
                    (odd-subsets (cdr s))
                  )
            )
            (if (even? (car s)) (list (list(car s))) nil)
    )
  )
)

(define (odd-subsets s)
  (if (null? s) 
    nil
    (append (odd-subsets (cdr s))
            (map (lambda (t) (cons (car s) t))
                  (if (odd? (car s))
                    (even-subsets (cdr s))
                    (odd-subsets (cdr s))
                  )
            )
            (if (odd? (car s)) (list (list(car s))) nil)
    )
  )
)
```

Simplify it with higher order function
```scheme
(define (even-subsets s)
  (if (null? s) 
    nil
    (append (even-subsets (cdr s))
            (subset-helper even? s)
    )
  )
)

(define (odd-subsets s)
  (if (null? s) 
    nil
    (append (odd-subsets (cdr s))
            (subset-helper odd? s)
    )
  )
)

(define (subsethelper f s)
  (map (lambda (t) (cons (car s) t))
                  (if (f (car s))
                    (even-subsets (cdr s))
                    (odd-subsets (cdr s))
                  )
    )
  (if (f (car s)) (list (list(car s))) nil)
)
```


Even simpler approach using `filter`
```scheme
(define (nonempty-subsets s)
  (if (null? s)
    nil
    (let ((rest (nonempty-subsets (cdr s))))
      (append rest
              (map (lambda (t) (cons (car s) t )) rest)
              (list (list (car s)))
      )
    )
  )
)

(define (even-subsets s)
  (filter 
    (lambda (s) (even? (apply + s))) 
    (nonempty-subsets s)
  )
)
```
