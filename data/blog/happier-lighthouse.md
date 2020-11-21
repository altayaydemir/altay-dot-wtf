---
title: Leveraging dynamic imports to make Lighthouse happier
oneliner: Using a 450KB library to render a heading and paragraph was not my brightest decision.
date: '2020-11-01'
tags:
  - software
  - performance
  - next-js
---

I'm building this website with [Next.js](https://nextjs.org) and charmed by the delightful developer experience we get when it's combined with [Vercel](https://vercel.com/).

In addition to eliminating the friction, Vercel also provides [analytics](https://nextjs.org/analytics) and [Lighthouse integration](https://vercel.com/integrations/lighthouse) to monitor how my website is performing when it comes to vital metrics for the user experience.

And that's precisely what I did right after deploying a bearable version. But the results were not satisfying at all.

![Lighthouse score before the optimization](/images/blog/happier-lighthouse/lighthouse-score-before.png)

My minimal home page with three lines of text and a handful of links made Lighthouse complain sorely about the performance.

The report is clear, it tells that I'm basically making your computer load and parse a bunch of irrelevant JavaScript.

![Lighthouse score details, before the optimization](/images/blog/happier-lighthouse/lighthouse-score-before-detail.png)

> I thought that's an ethos to have if you are building a publishing thingy nowadays, or am I in the wrong [Medium?](/images/blog/happier-lighthouse/medium-110-requests.gif) 👹👹👹

### Finding out what I am excessively loading

The report shows which chunk is not utilized.
Unfortunately, the code is minified.

I have two choices:

- Be a responsible, clean coder and inspect the source maps by using [@next/bundle-analyzer](https://www.npmjs.com/package/@next/bundle-analyzer) to find out what's wrong.

- Remember that's a fun project, and double the amount of fun with puzzles by guesstimating what it could be.

Proceeding with the latter, I know one thing which doesn't get minified: **error messages!**

![Digging up the excessively loaded code](/images/blog/happier-lighthouse/excessively-loaded-code.png)

And searching for `only one of 'allowedTypes' and 'disallowedTypes' should be defined` in the `node_modules` is a good next step for approaching to the crux.

![Search results for the error message.](/images/blog/happier-lighthouse/search-results-for-error-message.png)

Then I realize it's seemingly related to markdown. Now that the scope is narrowed down, it's time to discover what I'm doing wrong.

### How does this website render markdown

I tend to rely on markdown for rendering any kind of content, and using [react-markdown](https://github.com/remarkjs/react-markdown) to render raw content to HTML. It has a nice API that allows you to render specific elements by using custom renderers.

I copy/pasted [the snippet in docs](https://github.com/remarkjs/react-markdown#use-custom-renderers-syntax-highlight) to render code blocks with `react-syntax-highlighter.`

It looked like this before the refactor:

```jsx
// Markdown.jsx
import ReactMarkdown from 'react-markdown'
import { Prism } from 'react-syntax-highlighter'

const Code = (props) => <Prism language={props.language}>{props.value}</Prism>

const Markdown = ({ children }) => (
  <ReactMarkdown
    renderers={{
      code: Code,
    }}
  >
    {children}
  </ReactMarkdown>
)

export default Markdown
```

That might be a heavy library to load if I'm not planning to render any code blocks since it contains all the parsing logic with themes and such.

And as you can guess, the homepage does not contain any code snippets, **which is why Lighthouse is unhappy: the eager load.**

### Dynamically loading modules with Next.js

Although `React` allows lazy loading with the [suspense API](https://reactjs.org/docs/react-api.html#reactsuspense), it's not available for `Next.js` since the `ReactDOMServer` support has not implemented yet.

Luckily, our thoughtful friend `Next.js` offers an alternative API for dynamic imports. It's called [next/dynamic](https://nextjs.org/docs/advanced-features/dynamic-import) and pretty straightforward for such a use-case like this.

First, I changed my usage of `react-syntax-higlighter` to load and register parsers only for the languages I use.

```jsx
// MarkdownCodeBlock.jsx
import { PrismLight } from 'react-syntax-highlighter'
import jsx from 'react-syntax-highlighter/dist/cjs/languages/prism/jsx'
import tsx from 'react-syntax-highlighter/dist/cjs/languages/prism/tsx'

PrismLight.registerLanguage('jsx', jsx)
PrismLight.registerLanguage('tsx', tsx)

const MarkdownCodeBlock = ({ language, value }) => (
  <PrismLight language={language}>{value}</PrismLight>
)

export default MarkdownCodeBlock
```

I also changed the strategy of using syntax highlighter to be on demand, so the other pages using markdown (such as [book notes](/books)) won't load `react-markdown` and friends.

```jsx
// Markdown.jsx
import ReactMarkdown from 'react-markdown'
import dynamic from 'next/dynamic'

const MarkdownCodeBlock = dynamic(() => import('./MarkdownCodeBlock'))

const Markdown = ({ children }) => (
  <ReactMarkdown
    renderers={{
      code: MarkdownCodeBlock,
    }}
  >
    {children}
  </ReactMarkdown>
)

export default Markdown
```

### ...and then, did they live happily after? 🤖👨‍💻

In the end, the performance score of [the home page](/) increased dramatically.

![Lighthouse score, after the optimization](/images/blog/happier-lighthouse/lighthouse-score-after.png)

This approach doesn't eradicate the CPU tax of loading and executing the JS on the pages that I need to render a code editor, such as this post.

Nonetheless, it divides the amount of work while browsing and progressively loads the required code, which is more helpful than not doing it. 🤨
