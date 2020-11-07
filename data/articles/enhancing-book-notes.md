---
draft: true
title: Enhancing book notes with metadata
oneliner: You can read, you can code. So why not?
date: '2020-11-06T20:44:56Z'
tags:
  - software
  - typescript
---

If you like to take notes from the books you read and know a little bit of JavaScript, this could help you.

I've been using Apple Notes, Notion, sticky notes, and real paper to keep my notes. They were a bit unorganized and hard to index when needed. So I moved all to Markdown, also started publishing on this website.

Taking notes is the hard part. Once you have them in place, making them look pretty is a joyful task to deal with. By using the ISBN number, it's easy to retrieve a lot of information and generate specific meta images. You can use Amazon or Google Books to find the ISBN. That is the only identifier needed for the rest.

<image from code to meta>

Magic? No, just JavasScript.

That's what I did while building my books page, without spending much effort on robustness. It took me half-a-day to make it legit enough to share as learning in this article.

Adding a front-matter to Markdown

Before we get to the real acrobatics, we need some manual labor to do. You can use YAML syntax at the beginning of a Markdown file to define some metadata. There is a library called gray-matter to parse it to JSON so we can use it in the next steps.

<markdown Snippet>

Using Google Books API for metadata

If you only need some essential information like title, authors, and cover image, you can proceed with the Google Books API. I'm not sure if it's a bug or feature, but some endpoints don't need authentication. Obtaining an API key is not that hard as well. You only need to create a Google Account and register a new app to use the Books API.

<Google Books API Image>

They have a pretty simple query endpoint that we can pass the ISBN and API keys as parameters.

<Code Snippet>

Unfortunately, thumbnail images are a little bit low-resolution. But they are convenient enough to ask for forgiveness from your pixel-perfect friends.

Creating a meta image for the Book page

Now that we have the least relevant information to render a book page, we can use a little time to make it look pretty.

Here's how related services render the meta images related to book pages.

<Amazon Image>
<GoodReads Image>

Alright, that seems doable with what we have so far.

In my experience, the easiest way to generate a custom image in the NodeJS context is to use a canvas library. The easiest to use I found is, hold your breath, called canvas. Here's the flow I followed.

- Fetch the metadata from Google Books API
- Fetch the thumbnail image
- Create a canvas with the size of the OpenGraph image
- Place the thumbnail image in the middle, but double it's size
- Save the generated image to somewhere, and pass it within the final payload

<Code Snippet>
