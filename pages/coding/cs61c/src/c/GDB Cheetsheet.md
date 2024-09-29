---
tags:
  - CS
  - C
  - CS61C
---
GDB Cheetsheet
===
To debug a source file with gdb, use `gcc -g`.
## List of Everyday Commands

| Command                                      | Abbreviation      | Description                                                                                                 |
| -------------------------------------------- | ----------------- | ----------------------------------------------------------------------------------------------------------- |
| start                                        | N/A               | begin running the program and stop at line 1 in main                                                        |
| step                                         | s                 | execute the current line of code (this command will step into functions)                                    |
| next                                         | n                 | execute the current line of code (this command will not step into functions)                                |
| finish                                       | fin               | executes the remainder of the current function and returns to the calling function                          |
| print [arg]                                  | p                 | prints the value of the argument                                                                            |
| quit                                         | q                 | exits gdb                                                                                                   |
| break [line num or function name]            | b                 | set a breakpoint at the specified location, use `filename.c:linenum` to set a breakpoint in a specific file |
| conditional break  <br>(ex: break 3 if n==4) | (ex: b 3 if n==4) | set a breakpoint at the specified location only if a given condition is met                                 |
| run                                          | r                 | execute the program until termination or reaching a breakpoint                                              |
| continue                                     | c                 | continues the execution of a program that was paused                                                        |
| backtrace                                    | bt                | print one line per frame for frames in the stack                                                            |
### Command: `info locals`
Prints the value of all of the local variables in the current stack frame
### Command: `command`
Executes a list of commands every time a break point is reached. For example:
Set a breakpoint:
```gdb
(gdb) b 73
```

Type `commands` followed by the breakpoint number:
```gdb
(gdb) commands 1
```

Type the list of commands that you want to execute separated by a new line. After your list of commands, type `end` and hit Enter.
```gdb
(gdb) p var1
(gdb) p var2
(gdb) end
```

Calling a fuction in the symbol list
```gdb
(gdb) call <name_of_function>
```

## Debugging
Attaching to a process
```sh
gdb -p <pid>
```

Debug with command line arguments
```sh
gdb --args /path/to/executable arg1 arg2
```


## Display
### Displaying Code
```sh
$ gdbtui
$ gdb --tui
```

Or inside `gdb`:
`^x` + `o` 

### Displaying Assmbly
```gdb
(gdb) layout asm
```

## Examine
All **examine** commands use `x`
### Examine Register
`x/i $pc` examine the current PC
