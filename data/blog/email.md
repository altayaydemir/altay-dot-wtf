---
draft: true
title: A private email setup with noise cancellation
oneliner: My justification for paying 3.29 EUR per month for something free.
date: '2020-12-04T11:05:24Z'
---

Do you remember the first-ever email address you've signed up for?

Mine was `djaty2@hotmail.com`. I was ten years old. I inherited the nickname from an elderly close friend (`djazy2`) that grew up in the same neighborhood. I don't know why `"dj"`, though. We were chatting on MSN Messenger and playing Counter-Strike all day.

I used that address for several years. Then Facebook came out, and MSN Messenger lost its popularity. Gmail grew as well. I was smart enough –still surprised by that– to get `altay.aydemir@gmail.com` when I was twelve. Yet, I kept using weird addresses such as `klozetkapagi@punkerland.com` (toilet seat cover) during my teenage period.

When my digital presence reached the maturity to use a proper email address, I already forgot the password of `altay.aydemir`. I suffered from that shame under the name of `altay.aydemir0` and `aydemir.altay`. It's still vague, but I managed to remember the password around 2013. I regained my identity as `altay.aydemir` and kept it till recently.

Over the years, email became something more useful than just mindlessly handing out to random services. It helped me connect with people, get job offers, learn stuff, and follow what's going on around the globe.

Now I use my dedicated domain with a service provider, and you are reading a post where I talk about my setup to convince you to use my affiliate link to sign-up.

### Problems of Gmail

It belongs to Google, one of the biggest ad networks in the world. Gmail is free, and Google is a revenue-driven company, like most businesses. Here we rehearse the _"if you are not paying for the product, you are the product"_ quote. There's no need going over the details, just _Google_ "Gmail and Privacy." I'm surprised [this ProtonMail article](https://protonmail.com/blog/google-privacy-problem/) shows up on the first page.

### Benefits of using your domain

- It looks cool. 🤡
- You can carry it over between providers. Maintaining your email server is also an option, yet not the most cost-effective.
- People around you can benefit from it. If you hold `familyname.com` you can create an address for your relatives, for example.

### My try-outs for migrating from Gmail

Based on what we have discussed, I was looking for three fundamental features:

- Ethical, privacy-focused.
- Supports custom domains.
- Easy to move from Gmail: import existing emails, redirect new emails.

And a few nice to have ones:

- Catch-all or alias: I can create arbitrary addresses such as `a+twitter@aydemir.io` for specific use-cases.
- Filters for incoming emails: I can mark non-crucial messages as read and group them within a folder to reduce noise.
- SMTP support on desktop (I use Apple Mail) and a responsive web app. I try not to use an email app on phone and tablet unless I can filter out the notifications.

When searching for alternatives, I found a few useful resources, such as [`ethical.net`](https://ethical.net/resources/?resource-category=email-services) and [`switching.software`](https://switching.software/replace/gmail/).

Tutanota and Protonmail seem to be the best options. Protonmail is more comprehensive, feature-rich, but naturally more expensive (5 EUR/month). However, I was familiar with Tutanota from the past, and it's cheaper (1 EUR/month). So decided to try that first.

### Tutanota

Unfortunately, Tutanota doesn't have an import feature. This actually made me go through my archived emails and reiterate on what's important. Still, I need many of them to be carried over. I considered forwarding them to my new mailbox. This is a sad and obnoxious process with a lot of repetition. So I ended up doing it only for the most recent conversations.

Setting up the redirection is fairly easy since it's mostly on Gmail's side. I've created a dedicated folder for redirected emails for the sake of categorization.

Tutanota includes `catch-all` feature in the premium plan. This gives us the opportunity of creating arbitrary addresses for like there's no tomorrow. I'm used to leverage the alias pattern (`altay.aydemir+twitter`) from Gmail. I kept it here as well and used addresses like `a+twitter@aydemir.io` (`twitter@aydemir.io` is also possible with `catch-all`).

We can create incoming email filters in Tutanota, yet they are disappointingly incompetent. There's no room for acrobatics like `mark as read`. We can only move them to specific folders. I contacted customer support to ask about `mark as read` (so I won't get push notifications for every incoming mail) and they recommended me to `mark them as spam`. I live by the fact that workarounds are the anchors of software development, but this really hurts when you have multiple categories. Another issue I've discovered is that the client sends the push notification as soon as the email arrives, then run the email filters. It makes the situation even worse.

Tutanota doesn't have SMTP support on desktop, but they offer apps for every platform and they all look the same. The interface is clean, yet it's not optimized for the best experience. There were many small flaws that made me miss Gmail's completeness. We can't `archive` an email with one click, for example.

By the time I'm about to complete my first month in Tutanota, I was already looking for Black Friday offers for ProtonMail.

### ProtonMail

The complaint-rich experience I've went through above helped me to discover what I need from an email service. With the 30% discount on the plus plan, ProtonMail felt like a big bottle of water in Sahara. It's probably not a surprise considering that they've been in the market for a long time.

ProtonMail has a dedicated tool which offers multiple ways to import/export emails. It works a like charm both over IMAP with Gmail, and plain `eml`, which I followed to import emails from Tutanota.

They don't offer `catch-all` in the plus plan (available in business) but `aliases` are supported as the same pattern with Gmail. This was an effortless transition from the setup I've migrated last month.

ProtonMail offers extensive options to filter emails, with an option to skip sending push notifications. This feature single-handedly makes it worth to pay three times more. It makes it inherently convenient to deal with newsletters and trivial mails.

![Noise Setup](/images/blog/email/setup-1.png)
![Noise Setup](/images/blog/email/setup-2.png)
![Noise Setup](/images/blog/email/setup-3.png)

They also have an `SMTP Bridge` application for the desktop usage, and the instructions are pretty clear. I'm able to do whatever I could do with Gmail, nothing is crippled. `Skip sending push notification` feature also convinced me to install the mobile app instead of obsessively checking the web app. Noise reduction is achieved!

Eventually, my several days of fascination lead to purchasing a 2-year plan from ProtonMail. If you read till this point, and considering to try out a similar setup, here's a flowchart for you.

![Decision diagram](/images/blog/email/decision-diagram.jpg)
