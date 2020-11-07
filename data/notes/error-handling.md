---
title: Error Handling
date: '2020-11-03'
tags:
  - software
---

### Joe Armstrong: The Do's and Don'ts of Error Handling

Notes from his [GOTO 2018 talk.](https://www.youtube.com/watch?v=TTM_b7EJg5E)

#### What is an error?

A deviation of the program.

#### Who finds the error?

- Program (runtime)
- Programmer
- Compiler

#### What should the runtime do?

- Example runtime errors: arithmetic, system, null pointer.
- Crash immediately and assume somebody else will fix the problem.
- It's basically like rebooting the system.

#### What should the programmer do?

Log it to a stable storage and crash immediately.

However, crashing will result end of losing everything for single threaded languages. Talks about concurrent programming.

#### Where do errors come from?

- Silent errors, doesn't cause program to crash but produces wrong result.
- Programmers may not know how to solve because they don't know there will be an error.
