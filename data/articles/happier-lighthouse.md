---
title: I made Lighthouse 60% happier with one line of code
oneliner: why would anyone need a ~450KB library to render a paragraph with markdown?
date: '2020-10-31'
tags:
  - software
  - web-performance
  - next-js
---

I am building this website with [Next.js](https://nextjs.org) and charmed by the delightful developer experience we get when it's combined with [Vercel](https://vercel.com/).

In addition to eliminating the friction, they also provide [analytics](https://nextjs.org/analytics) and [Lighthouse integration](https://vercel.com/integrations/lighthouse) to monitor how your website is doing when it comes to vital metrics for the user experience.

And that's precisely what I did right after deploying a minimum bearable version, but the results were not satisfying at all.

My beloved minimal home page with three lines of text and a handful of links made Lighthouse complain sorely about the performance.

![](/images/happier-lighthouse/lighthouse-score-before.png)

Actually, the report is quite clear. I'm making your computer load and execute a bunch of irrelevant JavaScript.

![](/images/happier-lighthouse/lighthouse-score-before-detail.png)

> I thought that's an ethos to have if you are building a publishing thingy nowadays, or am I in the wrong [Medium?](/images/happier-lighthouse/medium-110-requests.gif) 👹👹👹

### Finding out what I am excessively loading

The report tells which chunk is not utilized, unfortunately the code is minified.

So I basically have two choices:

- Be a responsible, clean coder and de-obfuscate the source maps to find out what's wrong.

- Remember that's a fun project, and double the amount of fun with puzzles and quizzes; try to guesstimate what it could be.

Proceeding with the latter, I know one thing which doesn't get minified: **error messages**, or any other string.

![](/images/happier-lighthouse/excessively-loaded-code.png)

And searching for `only one of 'allowedTypes' and 'disallowedTypes' should be defined` gives a hint.

![](/images/happier-lighthouse/search-results-for-error-message.png)

### How does this website render markdown

Now that the scope is narrowed down, it is time to discover what I am doing wrong. I am building this website mostly by relying on markdown, and I am using [react-markdown](https://github.com/remarkjs/react-markdown) to render raw content to HTML.

It has a very nice API that allows you to render specific elements by using custom renderers, and I literally copy/pasted [that snippet](https://github.com/remarkjs/react-markdown#use-custom-renderers-syntax-highlight) to render code blocks with `react-syntax-highlighter.`

```jsx
// Markdown component
// used in everywhere I need to render markdown

import ReactMarkdown from 'react-markdown'
import { Prism } from 'react-syntax-highlighter'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'

const MDCode = ({ language, dark }) => (
  <Prism style={dark} language={language}>
    {value}
  </Prism>
)

const Markdown = ({ children }) => (
  <ReactMarkdown escapeHtml={true} renderers={{ code: MDCode }}>
    {children}
  </ReactMarkdown>
)

export default Markdown
```

However, that might be a relatively heavy library to load if you are not going to render any code blocks since it contains all the parsing logic with themes and such.

And as you can guess, the homepage does not contain any code snippets, **which is why Lighthouse is unhappy: the eager load.**

### Dynamically loading modules with Next.js

Although `React` allows lazy loading with the [suspense API](https://reactjs.org/docs/react-api.html#reactsuspense), it's not available for `Next.js` since the `ReactDOMServer` support has not implemented yet.

However, `Next.js` offers an alternative API for dynamic imports, called [next/dynamic](https://nextjs.org/docs/advanced-features/dynamic-import), and it's pretty straightforward for my use-case.

I changed my usage of syntax highlighter to follow the lazy approach by splitting the components.

```jsx
// MDCodeBlock
// dynamically imported within Markdown component

import { Prism } from 'react-syntax-highlighter'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'

const MDCodeBlock = ({ language, value }) => (
  <Prism style={dark} language={language}>
    {value}
  </Prism>
)

export default MDCodeBlock
```

```jsx
import ReactMarkdown from 'react-markdown'
import dynamic from 'next/dynamic'

const MDCodeBlock = dynamic(() => import('./MDCodeBlock'))

const Markdown = ({ children }) => (
  <ReactMarkdown escapeHtml={true} renderers={{ code: MDCodeBlock }}>
    {children}
  </ReactMarkdown>
)

export default Markdown
```

### ...and then they lived happily after 🤖👨‍💻

![](/images/happier-lighthouse/lighthouse-score-after.png)
