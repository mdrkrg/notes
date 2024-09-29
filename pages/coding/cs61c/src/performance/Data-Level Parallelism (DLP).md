---
tags:
- CS
- ComputerStructure
---
Data-Level Parallelism (DLP)
===
Two kinds of Data-Level Parallelism:
- Lots of **data in memory** that can be operated on in parallel
- Lots of **data on many disks** that can be operated on in parallel

## MapReduce Programming Model
Input & Output: each a set of key-value pairs

Two functions:
**Map**
```
map_func:
(in_key, in_value) => list(interm_key, interm_value)
```
- Processes input key/value pair
- Slices data into “shards” or “splits”; distributed to workers
- Produces set of intermediate pairs

**Reduce**
```
reduce_func:
(interm_key, list(interm_value)) => list(out_value)
```
- Combines all intermediate values for a particular key
- Produces a set of merged output values (usu just one)