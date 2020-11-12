---
draft: true
title: Extending useSWR to never look back
oneliner: Time to write another NPM package to install another NPM package.
date: '2020-11-05T10:11:53Z'
tags:
  - software
  - typescript
---

It's been several years since the hooks bestowed to the React community. They might be more challenging to understand than predictably named life-cycled methods in class components, especially for the newcomers. Once we get the idea by causing many infinite loops, it significantly improves the codebase.

- We write less code.
- Hooks use `function`s, therefore, generate less code compared to `class`es.
- Hooks are completely isolatable from components.
- Hooks help us to make better design decisions by reducing chained conditional operations.

Data fetching is inevitable; most apps don't even work properly if they cannot talk to a server. Asynchronously relying on third parties over side-effects usually comes with challenges:

- Network stability.
- The never ending tale of unknown payload.
- Conscious state management.
- Proper error handling based on status codes and error messages.
- Caching, revalidation, optimistic mutations, and other types of acrobatics.

Some of them are not even in our hands, but we still need to be prepared and try our best.

Thanks to the JS community's abstractionist mindset, achieving a convenient alliance of hooks and the network layer is not the hardest. There are many great people out there maintaining libraries to make it easier.

My favorite has been `swr` from `Vercel`, which comes with considerate functionalities by default.

- Response caching.
- Revalidation and polling based on window focus.
- Local mutations for the optimistic UI
- Supporting suspense mode

What do we do?
We install `SWR` from NPM.

## useSWR = hooks + remote data fetching

What do we do?
We write our own `useSWR` hook.

## mySWR = TypeScript + useSWR
