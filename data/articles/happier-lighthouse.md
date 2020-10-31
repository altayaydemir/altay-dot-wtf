---
title: Leveraging dynamic imports to make Lighthouse happier
oneliner: using a 450KB library to render a heading with three paragraphs of text is not probably my brightest moment.
date: '2020-10-31'
tags:
  - software
  - performance
  - next-js
  - dynamic-imports
---

I am building this website with [Next.js](https://nextjs.org) and obviously charmed by the delightful developer experience we get when it's combined with [Vercel](https://vercel.com/).

In addition to eliminating the friction, Vercel also provides [analytics](https://nextjs.org/analytics) and [Lighthouse integration](https://vercel.com/integrations/lighthouse) to monitor how your website is doing when it comes to vital metrics for the user experience.

And that's precisely what I did right after deploying a minimum bearable version, but the results were not satisfying at all.

![](/images/happier-lighthouse/lighthouse-score-before.png)

My beloved minimal home page with three lines of text and a handful of links made Lighthouse complain sorely about the performance.

The report is quite clear, it tells that I am basically making your computer load and parse a bunch of irrelevant JavaScript.

![](/images/happier-lighthouse/lighthouse-score-before-detail.png)

> I thought that's an ethos to have if you are building a publishing thingy nowadays, or am I in the wrong [Medium?](/images/happier-lighthouse/medium-110-requests.gif) 👹👹👹

### Finding out what I am excessively loading

The report shows which chunk is not utilized, unfortunately the code is minified.

So I basically have two choices:

- Be a responsible, clean coder and de-obfuscate the source maps to find out what's wrong.

- Remember that's a fun project, and double the amount of fun with puzzles and quizzes by guesstimating what it could be.

Proceeding with the latter, I know one thing which doesn't get minified: **error messages**, or any other string.

![](/images/happier-lighthouse/excessively-loaded-code.png)

And searching for `only one of 'allowedTypes' and 'disallowedTypes' should be defined` in the `node_modules` is a good next step for approaching to the crux.

![](/images/happier-lighthouse/search-results-for-error-message.png)

Then I realize it's seemingly related to markdown. Now that the scope is narrowed down, it is time to discover what I am doing wrong.

### How does this website render markdown

I tend to rely on markdown for rendering any kind of content, and using [react-markdown](https://github.com/remarkjs/react-markdown) to render raw content to HTML. It has a very nice API that allows you to render specific elements by using custom renderers.

I literally copy/pasted [the snippet in docs](https://github.com/remarkjs/react-markdown#use-custom-renderers-syntax-highlight) to render code blocks with `react-syntax-highlighter.`

It was looking like before the refactor:

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

That might be a relatively heavy library to load if we are not going to render any code blocks since it contains all the parsing logic with themes and such.

And as you can guess, the homepage does not contain any code snippets, **which is why Lighthouse is unhappy: the eager load.**

### Dynamically loading modules with Next.js

Although `React` allows lazy loading with the [suspense API](https://reactjs.org/docs/react-api.html#reactsuspense), it's not available for `Next.js` since the `ReactDOMServer` support has not implemented yet.

However, our thoughtful friend `Next.js` offers an alternative API for dynamic imports. It's called [next/dynamic](https://nextjs.org/docs/advanced-features/dynamic-import) and pretty straightforward for such a use-case like this.

I changed strategy of using the syntax-higlighter to be on demand and follow the lazy approach by splitting the components.

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

### ...and then, did they live happily after? 🤖👨‍💻

In the end, performance score of [my home page](/) increased dramatically.

![](/images/happier-lighthouse/lighthouse-score-after.png)

This approach doesn't eradicate the CPU tax of loading and executing the JS on the pages that I actually need to render a code editor, such as this post.

Nonetheless, it divides the amount of work while browsing and progressively loads the required stuff, which is more helpful than not doing it. 🤨
