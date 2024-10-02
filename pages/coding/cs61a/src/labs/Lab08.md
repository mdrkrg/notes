---
tags:
  - CS61A
---
## Q2
Question1: Why merely use `link = Link(val, Link(val, ...))` doesn't even mutate the `link` at all? The local scope problem?

Question2: Why we must use `link.__init__` to mutate? Even so, this doesn't work either.
```python
def duplicate_link(link, val):
    """Mutates `link` such that if there is a linked list
    node that has a first equal to value, that node will
    be duplicated. Note that you should be mutating the
    original link list.

    >>> x = Link(5, Link(4, Link(3)))
    >>> duplicate_link(x, 5)
    >>> x
    Link(5, Link(5, Link(4, Link(3))))
    >>> y = Link(2, Link(4, Link(6, Link(8))))
    >>> duplicate_link(y, 10)
    >>> y
    Link(2, Link(4, Link(6, Link(8))))
    >>> z = Link(1, Link(2, (Link(2, Link(3)))))
    >>> duplicate_link(z, 2) # ensures that back to back links with val are both duplicated
    >>> z
    Link(1, Link(2, Link(2, Link(2, Link(2, Link(3))))))
    """
    "*** YOUR CODE HERE ***"
    # if link is Link.empty:
    #    print("empty reached")
    #    return Link.empty
    # elif link.first == val:
    #    print("equals val")
    #    link = link.__init__(val, Link(val, duplicate_link(link.rest, val)))
    #    print("DEBUG:", link)
    # else:
    #    print("neq val")
    #    link = link.__init__(link.first, duplicate_link(link.rest, val))
    #    print("DEBUG:", link)
    if link is Link.empty:
        return
    if link.first == val:
        link.rest = Link(val, link.rest)
        duplicate_link(link.rest.rest, val)
    else:
        duplicate_link(link.rest, val)
```
## Q3
```python
def convert_link(link):
    """Takes a linked list and returns a Python list with the same elements.

    >>> link = Link(1, Link(2, Link(3, Link(4))))
    >>> convert_link(link)
    [1, 2, 3, 4]
    >>> convert_link(Link.empty)
    []
    """
    "*** YOUR CODE HERE ***"
    if link is Link.empty:
        return []
    elif link.rest is Link.empty:
        return [link.first]
    else:
        return [link.first] + convert_link(link.rest)
```
## Q4
```python
def multiply_lnks(lst_of_lnks):
    """
    >>> a = Link(2, Link(3))
    >>> b = Link(5, Link(4))
    >>> p1 = multiply_lnks([a, b])
    >>> p1
    Link(10, Link(12))

    >>> c = Link(2, Link(3, Link(5)))
    >>> d = Link(6, Link(4, Link(2)))
    >>> e = Link(4, Link(1, Link(0, Link(2))))
    >>> p2 = multiply_lnks([c, d, e])
    >>> p2
    Link(48, Link(12, Link(0)))
    """
    product = 1
    for lnk in lst_of_lnks:
        if lnk is Link.empty:
            return Link.empty # I'm sort of breaking the abstraction barrier right here
        product = product * lnk.first
    lst_of_lnks_rests = [lnk_rest.rest for lnk_rest in lst_of_lnks]
    return Link(product, multiply_lnks(lst_of_lnks_rests))
```
