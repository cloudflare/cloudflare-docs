---
title: Widget types
pcx_content_type: reference
weight: 7
layout: single
---

# Widget types 

Every instance of Turnstile belongs to a Turnstile widget. It is configured on a per-widget level. Every widget has a mode, a label, a sitekey, and a secret key. 

The 3 modes for Turnstile are **Managed**, **Non-Interactive**, and **Invisible**.

## Managed (recommended)

Cloudflare will use information from the visitor to decide if an interactive challenge should be used. If we show an interaction, the user will be prompted to check a box (no images or text to decipher).

### Light mode

![Managed challenge](/images/turnstile/light-verify.png)
![Verifying the challenge](/images/turnstile/light-verifying.png)
![Successful managed challenge](/images/turnstile/light-success.png)

### Dark mode

![Managed challenge](/images/turnstile/dark-verify.png)
![Verifying the challenge](/images/turnstile/dark-verifying.png)
![Successful managed challenge](/images/turnstile/dark-success.png)

## Non-Interactive

Users will see a widget with a loading bar while the browser challenges run. Users will never be required or prompted to interact with the widget. 

### Light mode

![Verifying the challenge](/images/turnstile/light-verifying.png)
![Successful managed challenge](/images/turnstile/light-success.png)

### Dark mode

![Verifying the challenge](/images/turnstile/dark-verifying.png)
![Successful managed challenge](/images/turnstile/dark-success.png)

## Invisible

Users will not see a widget or any indication that an invisible browser challenge is in progress. Invisible challenges should take a few seconds to complete. 

{{<Aside type="note">}}
To ensure you are in compliance with the online privacy laws coming into force around the world, please include the following text and links on the page that includes an invisible Turnstile security challenge:

```html
This site is protected by <a href="https://www.cloudflare.com">Cloudflare</a> and its
<a href="https://www.cloudflare.com/privacypolicy/">Privacy Policy</a> and
<a href="https://www.cloudflare.com/website-terms/">Terms of Service</a> apply.
```
You may also wish to integrate a disclosure into your Privacy Policy similar to the one [here](/turnstile/frequently-asked-questions#do-i-need-to-display-anything-on-the-page-when-using-turnstile-in-invisible-mode).

**Note that this is not legal advice, and you should consult with qualified counsel in the jurisdictions in which you operate if you have further questions about your specific use case.**

{{</Aside>}}
