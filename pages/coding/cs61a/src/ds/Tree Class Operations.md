---
tags:
  - CS
  - Python
  - CS61A
---
Tree Class Operations
===
Quick review [[Trees (L13)]]
![[Tree Class]]
## Function Examples

```python
def leave(t):
    """Return a list of leaf labels in Tree T."""
    if t.is_leaf():
        return [t.label]
    else:
        all_leaves = []
        for b in t.branches:
            all_leaves.extend(leaves(b))
        return all_leaves
```


```python
def height(t):
    """Return the number of transitions in the longest path in T."""
    if t.is_leaf():
        return 0
    else:
        return 1 + max([height(b) for b in t.branches])
```
## Mutating Trees
### Pruning Trees
Removing subtrees from a tree is called *pruning*.
Prune branches before recursive processing
```python
def prune(t, n):
    """Prune all sub-trees whose label is n."""
    t.branches = [b for b in t.branches if t.label != n]
    for b in t.branches:
        prune(b, n)
```