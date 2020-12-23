---
title: A private email setup with noise reduction
oneliner: My justification for paying 3.29 EUR per month for something free.
date: '2020-12-05T20:24:38Z'
---

Do you remember the first-ever email address you've signed up for?

Mine was `djaty2@hotmail.com`. I was ten years old. I inherited the nickname from a close friend (`djazy2`) that lived in the same neighborhood. I don't know why `"dj"`, though. We were chatting on MSN Messenger and playing Counter-Strike the whole day.

I used that address for several years. Then Facebook came out, and MSN Messenger lost its popularity. Gmail grew as well. I was smart enough –still surprised by that– to get `altay.aydemir@gmail.com` when I was twelve. Still, I kept using weird addresses such as `klozetkapagi@punkerland.com` (toilet seat cover) during my teenage period.

When my digital presence reached to a level of maturity to use a proper email address, I already forgot the password of `altay.aydemir`. I suffered from this shame under the name of `altay.aydemir0` and `aydemir.altay`. It's still vague, but I managed to remember the password around 2013. I regained my identity as `altay.aydemir` and kept it till recently.

Over the years, email became something more useful than just mindlessly handing out to random services. It helped me connect with people, get job offers, learn stuff, and follow what's going on around the globe.

Now I use my custom domain with a service provider, and you are reading a post where I brag about my setup to convince you to use my affiliate link to sign-up. No I don't.

### Problems of Gmail

It belongs to Google, one of the biggest ad networks in the world. Gmail is free, and Google is a revenue-driven company, like most businesses. When those businesses want to increase their revenue, they hire smart people. Those smart people discover smart ways to make use of what they know about us. Then every few months, we get a new documentary, book, or podcast to tell how the best minds of our generation are spending their willpower. Here we repeat the famous **_"if you are not paying for the product, you are the product"_** quote. There's no need to go over the details, just _Google_ "Gmail and Privacy." I'm surprised [this ProtonMail article](https://protonmail.com/articles/google-privacy-problem/) shows up on the first page.

### Benefits of using your domain

- It looks cool. Isn't the digital world is mostly about looking cool? Here you have a set of keys to the kingdom.
- You can carry it over between providers. Maintaining your email server is also an option, yet not the most cost-effective.
- People around you can benefit from it. If you hold `familyname.com` you can create an address for your relatives, for example.

### Saying goodbye to Gmail

Based on the thoughts above, I was looking for three fundamental features:

- Ethical, privacy-focused.
- Supports custom domains.
- Easy to move from Gmail: import existing emails, redirect new emails.

And several nice-to-have items:

- **Catch-all or alias.** I want to create arbitrary addresses (such as `a+twitter@aydemir.io`) for specific use-cases. It helps to differentiate our fellas and foes in the digital realm. If I get an automated email looking for a Java developer to work at the North-Pole, I'll have a chance to guess where they bought my email address from.
- **Filters for incoming emails.** I want to mark non-crucial messages as read and group them within a folder to reduce noise. I value maintaining an inbox-zero. Facing a dozen unread newsletters every Monday doesn't help.
- **SMTP support on desktop.** I use Apple Mail on desktop. I try not to use an email app on my phone and tablet unless I can shield myself from the notification bombardment.

When searching for Gmail alternatives, I found a few useful resources, such as [ethical.net](https://ethical.net/resources/?resource-category=email-services) and [switching.software](https://switching.software/replace/gmail/).

Tutanota and Protonmail seem to be the best options. Protonmail is more comprehensive, feature-rich, but naturally more expensive (5 EUR/month). However, I was familiar with Tutanota from the past, and it's cheaper (1 EUR/month). So decided to try that first.

![Tutanota Logo](/images/articles/email/tutanota.jpg)

### Tutanota

Unfortunately, Tutanota doesn't have an import feature. It actually made me go through my archived emails and rethink what's important. However, I still need to carry over many of them. I considered forwarding all emails to my new mailbox. But that's an obnoxious process with a lot of repetition. I ended up doing it only for the most recent conversations. Maybe all I need was just a fresh start.

Setting up the redirection is straightforward since it's mostly on Gmail's side. I've created a dedicated folder for redirected emails for the sake of categorization.

Tutanota includes the catch-all feature in the premium plan. It gives us the opportunity of creating arbitrary addresses like there's no tomorrow. I'm used to leveraging the alias pattern (`altay.aydemir+twitter`) from Gmail. I did the same here and used addresses like `a+twitter@aydemir.io` (`twitter@aydemir.io` is also possible with `catch-all`).

We can create incoming email filters in Tutanota, yet they are disappointingly inadequate. There's no room for basic acrobatics like `mark as read`. We can only move them to specific folders. I contacted customer support to ask about `mark as read` to not get push notifications for every incoming mail. They recommended marking them as spam. I live by the fact that workarounds are the anchors of software development, but this hurts my brain.

Another issue I've discovered is that the client sends the push notification as soon as the email arrives. It runs the email filters afterwards. This flow makes the workaround even worse. I get a notification, reach out to my phone, open the Tutanota iOS app then the email slips away from my eyesight on its way to the spam folder.

Tutanota doesn't have SMTP support on the desktop, but they offer apps for every platform, and they all look the same. The interface is clean, yet it's not optimized for the best user experience. Many small flaws made me miss Gmail's intuitive interface. I couldn't `archive` an email with one click, for example. Dropdown, dropdown, here I come.

By the time I'm about to complete my first month in Tutanota, I was already looking for Black Friday offers from ProtonMail.

![Protonmail Logo](/images/articles/email/protonmail.jpg)

### ProtonMail

The complaint-rich experience I cried above helped me to discover what I need from an email service. With a 30% discount on their plus plan, ProtonMail felt like a big bottle of water in Sahara. It's not a surprise considering that they've been in the market for a long time.

ProtonMail offers multiple ways to import/export emails with a tool dedicated to this purpose. It works like a charm both over IMAP with Gmail, and plain `eml`, which I followed to import emails from Tutanota and iCloud. The whole process took less than 30-minutes.

They don't have `catch-all` feature in the plus plan (available in business), but they support `aliases` as the same pattern with Gmail. It made the transition effortless for my setup, where I create an alias (`a+<something>`) for each service.

ProtonMail has extensive options to filter emails, with an option to skip sending push notifications. This feature single-handedly makes the service worth paying three times more.

![Noise Setup](/images/articles/email/setup-1.png)
![Noise Setup](/images/articles/email/setup-2.png)
![Noise Setup](/images/articles/email/setup-3.png)

They also have an `SMTP Bridge` application for desktop, and the instructions are pretty clear. I'm able to do whatever I could do with Gmail; nothing is crippled. The `skip sending push notification` feature also convinced me to install the mobile app instead of obsessively checking the web app. Noise reduction is achieved!

Eventually, my several days of fascination lead to committing ProtonMail with a 2-year plan. If you read till this point and consider a similar setup, here's a flowchart for you. Please don't hesitate to reach out if I can help somehow.

![Decision diagram](/images/articles/email/decision-diagram.jpg)
