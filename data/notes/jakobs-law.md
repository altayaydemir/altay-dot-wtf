---
title: Tutanota's unintuitive email link
date: '2020-11-05T19:50:22Z'
tags:
  - jakobs-law
---

![](/images/notes/tutanota-email-link.mp4)

I wanted to copy this mail address to sign-up for another newsletter.

I assumed they're rendering emails with

```html
<a href="mailto:a+vanschneider@aydemir.io">a+vanschneider@aydemir.io</a>
```

A direct click to to that link would open `Mail.app`, which was not my aim.

- I tried to select the text, didn't work.
- I tried to right click the `a` so I could select `copy link` from the context menu, didn't work.
- As the last hope, I left clicked to understand what's going on...

It turns out that's a `button`, not an `anchor` tag!

Their consideration is really thoughtful, but that's not how the links work. 😐
