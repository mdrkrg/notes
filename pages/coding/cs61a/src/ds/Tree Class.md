---
tags:
  - CS
  - Python
  - CS61A
---
Tree Class
===
```python
class Tree:
    def __init__(self, label, branches=()):
        self.label = label
        for branch in branches:
            assert isinstance(branch, Tree)
        self.branches = branches
        
    def __repr__(self):
        if self.branches:
            return 'Tree({0}, {1})'.format(self.label, repr(self.branches))
        else:
            return 'Tree({0})'.format(repr(self.label))
        
    def __str__(self):
        return '\n'.join(self.indented)
        
    def indented(self):
        lines = []
        for b in self.branches:
            for line in b.indented():
                lines.append('    ' + line)
        return [str(self.label)] + lines
        
    def is_leaf(self):
        return not self.branches
```
