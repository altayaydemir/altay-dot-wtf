---
title: I made Lighthouse 30% happier with one line of code
oneliner: or, why would anyone need a 500KB library to render a paragraph with markdown?
date: '2020-10-31'
tags:
  - software
  - web-performance
---

I am building this website with [next.js](https://nextjs.org) and charmed by the delightful developer experience we get when it's combined with [Vercel](https://vercel.com/).

In addition to eliminating the friction, they also provide [analytics](https://nextjs.org/analytics) and [Lighthouse integration](https://vercel.com/integrations/lighthouse) to monitor how your website is doing when it comes to vital metrics for the user experience.

And that's precisely what I did right after deploying a minimum-linkable-version. However, the results were not satisfying at all.

My beloved minimal home page with three lines of text and a handful of links made Lighthouse complain sorely.

[image-report]

The Lighthouse report is quite clear. I make people load a bunch of JavaScript they don't need.

[image-zoom]

But I thought that's an ethos to have if you are building a publishing thingy nowadays, or am I in the wrong _Medium_?

[image-medium]

_110 requests and 3.4MB data to render an article, maybe that's why._ 👹

### How to find what you are excessively loading

Back to my problem, Lighthouse tells me which chunk is not utilized but the code is minified. So I basically had two choices:

- Be a responsible, clean coder and de-obfuscate the source maps to find out what's wrong.

- Remember that's a fun project, and double the amount of fun with puzzles and quizzes; try to guesstimate what it could be.

Proceeding with the latter, I knew one thing which does not get minified: **error messages** (or any other string).
