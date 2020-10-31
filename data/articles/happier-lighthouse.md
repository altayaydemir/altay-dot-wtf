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

My beloved minimal home page with three lines of text and a handful of links made Lighthouse complain sorely about the performance.

![](/images/happier-lighthouse/lighthouse-score-before.png)

The report is quite clear. I am making people load and execute a bunch of JavaScript they don't need.

![](/images/happier-lighthouse/lighthouse-score-before-detail.png)

But I thought that's an ethos to have if you are building a publishing thingy nowadays, or am I in the wrong [Medium? 👹](/images/happier-lighthouse/medium-110-requests.gif)

### Finding out what I am excessively loading

Back to my problem, Lighthouse tells which chunk is not utilized but the code is minified. So I basically had two choices:

- Be a responsible, clean coder and de-obfuscate the source maps to find out what's wrong.

- Remember that's a fun project, and double the amount of fun with puzzles and quizzes; try to guesstimate what it could be.

Proceeding with the latter, I know one thing which doesn't get minified: **error messages**, or any other string.

![](/images/happier-lighthouse/excessively-loaded-code.png)

And searching for `only one of 'allowedTypes' and 'disallowedTypes' should be defined` gives a hint.

![](/images/happier-lighthouse/search-results-for-error-message.png)

### How does this website render markdown

Now that the scope is narrowed down, it is time to discover what I am doing wrong. I am building this website mostly by relying on markdown, and I am using [react-markdown](https://github.com/remarkjs/react-markdown) to render raw content to HTML.

It has a very nice API that allows you to render specific elements by using custom renderers, and I literally [copy/pasted that snippet](https://github.com/remarkjs/react-markdown#use-custom-renderers-syntax-highlight) to render code blocks with `react-syntax-highlighter.`

```tsx
import ReactMarkdown from 'react-markdown'
import { Prism } from 'react-syntax-highlighter'
import dark from 'react-syntax-highlighter/dist/cjs/styles/prism/vsc-dark-plus'

const MDCodeBlock: React.FC<{ language: string; value: string }> = ({ language, value }) => (
  <Prism style={dark} language={language}>
    {value}
  </Prism>
)

export default MDCodeBlock

const Markdown: React.FC<{ children: string }> = ({ children }) => (
  <ReactMarkdown
    escapeHtml={true}
    renderers={{
      code: MDCodeBlock,
    }}
  >
    {children}
  </ReactMarkdown>
)

export default Markdown
```

However, that might be a relatively heavy library to load if you are not going to render any code blocks since it contains all the parsing logic with themes and such.

And my homepage does not contain any code snippets, which is why Lighthouse is unhappy: the eager load.

### Dynamically loading modules with Next.js
