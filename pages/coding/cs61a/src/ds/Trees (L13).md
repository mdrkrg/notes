---
tags:
  - CS
  - Python
  - CS61A
---
Trees (L13)
===

| Recursive Definition (Wooden Tree)                 | Relative Definition (Family Tree)               |
| -------------------------------------------------- | ----------------------------------------------- |
| A tree has a root label and a list of **branches** | Each location in a tree is called a **node**    |
| Each branch is a tree                              | Each node has a **label** tha can be any value  |
| A tree with zero branches is called a **leaf**     | One node can be the **parent/child** of another |
## Rule
- A tree is a list.
- A tree has a root label and a sequence of branches.
- Each branch of a tree is a tree.
- A tree with no branches is called a leaf.
- Any tree contained within a tree is called a sub-tree of that tree (such as a branch of a branch).
- The root of each sub-tree of a tree is called a node in that tree.
```python
def tree(root_label, branches=[]):
    for branch in branches:
        assert is_tree(branch), 'branches must be trees'
    return [root_label] + list(branches)

def label(tree):
    return tree[0]

def branches(tree):
    return tree[1:]

def is_tree(tree):
    if type(tree) != list or len(tree) < 1:
        return False
    for branch in branches(tree):
        if not is_tree(branch):
            return False
    return True

def is_leaf(tree):
    return not branches(tree)
```
## Example: Fib Tree
```python
def fib_tree(n):
    if n == 0 or n == 1:
        return tree(n)
    else:
        left, right = fib_tree(n-2), fib_tree(n-1)
        fib_n = label(left) + label(right)
        return tree(fib_n, [left, right])
        
>>> fib_tree(5)
[5, [2, [1], [1, [0], [1]]], [3, [1, [0], [1]], [2, [1], [1, [0], [1]]]]]
```
<iframe width="700" height="1000" frameborder="0" src="https://pythontutor.com/iframe-embed.html#code=a%20%3D%20%5B5,%20%5B2,%20%5B1%5D,%20%5B1,%20%5B0%5D,%20%5B1%5D%5D%5D,%20%5B3,%20%5B1,%20%5B0%5D,%20%5B1%5D%5D,%20%5B2,%20%5B1%5D,%20%5B1,%20%5B0%5D,%20%5B1%5D%5D%5D%5D%5D&codeDivHeight=400&codeDivWidth=350&cumulative=true&curInstr=1&origin=composingprograms.js&py=3&rawInputLstJSON=%5B%5D"> </iframe>


## Example: Partition Tree
