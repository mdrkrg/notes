Asymoptotics
===
## Algorithm Analysis Process
- Choosing our cost model, which is the representative operation we want to count.
- Identify the inner loop.
- Figuring out the order of growth for the count of our representative operation by either:
    - Making an exact count and discarding unnecessary pieces or...
    - Using intuition/inspection to determine orders of growth. This is something that comes with practice.

### Representation of the Function
- Given a piece of code, we can express its runtime as a function $R(N)$
	- $N$ is a **property** of the input of the function often representing the **size** of the input
- Rather than finding the exact value of $R(N)$, we only worry about finding the **order of growth** of $R(N)$.
### Cost Model
Primary factors:
- The cost of executing each statement
- The frequency of execution of each statement

Only the instructions that are executed the most frequently play a role in the final total—we refer to these instructions as the **inner loop** of the program.

Pick some representative operation to act as a proxy for overall runtime.
- Good choice: `increment`, or **less than** or **equals** or **array accesses.**

## Big-Theta
From now onward, we will refer to order of growth as Θ (pronounced "big theta").
- Order of growth: Incrementing the problem scale by N resulting the time complexity by f(N), f(N) is the order of growth

### Formal Definition
For some function $R(N)$ with order of growth $f(N)$, 
$$R(N)\in\Theta(f(N))\iff\begin{gather}\exists k_1, k_2>0, \exists N_0>0,s.t.~\forall N \ge N_0,\\
k_1\cdot f(N) \le R(N)\le k_2\cdot f(N)
\end{gather}$$
## Big-O
O (pronounced "Big-Oh") is similar to Θ. Instead of being an "equality" on the order of growth, it can be though of as "**less than or equal**."

- Often used as shorthand for "worst case"
### Formal Definition
$$R(N) \in O(f(N)) \iff \begin{gather}\exists  k_2>0, \exists N_0>0,s.t.~\forall N \ge N_0,\\
R(N)\le k_2\cdot f(N)
\end{gather}$$



## Common Procedure Analysis
### For Loops
#### Example 1
```java
int N = A.length;
for (int i = 0; i < N; i += 1)
   for (int j = i + 1; j < N; j += 1)
      if (A[i] == A[j])
         return true;
return false;
```
##### Method 1: Count Number of Operations
Since the main repeating operation is the comparator, we will count the number of **"`==`"** operations that must occur.
$$C = 1 + 2 + \cdots + (N -1) = N(N-1) / 2$$
Runtime: $\Theta(N^2)$

##### Method 2: Geometric Visualization
![](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2F2316889115-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FCLYj7ccqvV6l4Pt9R0w5%252Fuploads%252FDsJ9qehbAbw6DgTbN5Az%252Fimage.png%3Falt%3Dmedia%26token%3D8c564090-f2cc-4f67-9f27-bb92e08f13f8&width=300&dpr=2&quality=100&sign=dccc434e&sv=1)
the number of `==` operations is the same as the _area_ of a right triangle with a side length of N−1.


#### Example 2
```java
public static void printParty(int N) {
   for (int i = 1; i <= N; i = i * 2) {
      for (int j = 0; j < i; j += 1) {
         System.out.println("hello");   
         int ZUG = 1 + 1;
      }
   }
}
```
Most repeated operation:
- Print "hello", Θ(1)
- Increment ZUG, Θ(1)

Total operaion count:
$$C(N) = 1 + 2 + \cdots + N, \text{where }N\text{ is power of 2}$$
##### Method 1: Finding the Bound Visually
![](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2F2316889115-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FCLYj7ccqvV6l4Pt9R0w5%252Fuploads%252FbiPQHu9SrZOoYckVIM4q%252Fimage.png%3Falt%3Dmedia%26token%3D9cfb5a0c-ccca-40ec-a0b9-8a2152433e22&width=768&dpr=2&quality=100&sign=4842197&sv=1)
$$0.5N \le C(N) \le 4N,\therefore C(N)\in \Theta(N)$$

##### Method 2: Finding the Bound Mathematically
$$C(N) = 1 + 2 + 4 + \cdots + N = 2N - 1$$
#### Techniques: No Shortcuts
- **Find exact sum**
- **Write out examples**
- **Draw pictures**

### Recursion
#### Example
```java
public static int f3(int n) {
   if (n <= 1) 
      return 1;
   return f3(n-1) + f3(n-1);
}
```
Tree expression:
![](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2F2316889115-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FCLYj7ccqvV6l4Pt9R0w5%252Fuploads%252FS35bGr6MiaNCfbwHM90x%252Fimage.png%3Falt%3Dmedia%26token%3Dce4b3450-369a-4c5e-b7aa-913ec081648b&width=768&dpr=2&quality=100&sign=272f2fbf&sv=1)
##### Method 1: Intuition
Based on the visualization below, we can notice that every time we add one to `n` we **double** the amount of work that has to be done:
![](https://cs61b-2.gitbook.io/~gitbook/image?url=https%3A%2F%2F2316889115-files.gitbook.io%2F%7E%2Ffiles%2Fv0%2Fb%2Fgitbook-x-prod.appspot.com%2Fo%2Fspaces%252FCLYj7ccqvV6l4Pt9R0w5%252Fuploads%252F888CQe1RDaq5NifxR1OL%252Fimage.png%3Falt%3Dmedia%26token%3Ddf69fec4-da44-40d8-9563-1410bb9ca2ce&width=768&dpr=2&quality=100&sign=b34bc5c7&sv=1)

Runtime:
$$\Theta(2^N)$$

##### Method 2: Algebra
The total number of calls to f3 then is the **sum** of the number of nodes at each recursive level, which can be expressed as the equation below:
$$C(N) = 1 + 2 + 4 +\cdots + 2^{N - 1} = 2^N - 1, \therefore C(N)\in \Theta(2^N)$$

##### Method 3: Recurrence Relation
https://www.geeksforgeeks.org/recurrence-relations-a-complete-guide/

https://en.wikipedia.org/wiki/Master_theorem_(analysis_of_algorithms)

$$C(N) = 2C(N-1) + O(1)$$

### Binary Search
Each time, we cut the array in half, so in the end we must perform a total of roughly $\log_2​(N)$ operations.
- More Precise: $C(N) = \lfloor\log_2N\rfloor + 1$ 

Properties:
- $\lfloor f(N)\rfloor = \Theta(f(N))$
- $\lceil f(N)\rceil = \Theta(f(N))$
- $\log_p(N) = \Theta(\log_q(N))$

### Merge Sort
#### Merging
Merging takes $\Theta(N)$ runtime.

#### Sorting
Spliting the problem by half takes $2R(N/2)$.

#### Overall
$$R(N) = 2R(N/2) + \Theta(N) \in \Theta(N\log N)$$