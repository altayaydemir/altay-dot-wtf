---
title: Blur-up image loading with next/image
date: '2020-11-13T22:41:11Z'
tags:
  - next-js
---

I wanted to implement Medium's progressive image loading technique[^1] with Next.js's new `next/image` component. It doesn't pass the image dimensions, not as intuitive as gatsby.

Found a way to make it work for article images and book covers. Using [next-placeholder](https://github.com/joe-bell/next-placeholder) to get `blurhash` during the build time, then passing it to [blurhash](https://blurha.sh).

Unfortunately non-meta images are still lacking this feature. Generating a map of blurhashes of each local image could be a solution. It's a bit ugly though.

[^1]: https://github.com/evenchange4/react-progressive-bg-image
