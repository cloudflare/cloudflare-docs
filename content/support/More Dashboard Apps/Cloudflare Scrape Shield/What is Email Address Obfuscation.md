---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200170016-What-is-Email-Address-Obfuscation-
title: What is Email Address Obfuscation?
---

# What is Email Address Obfuscation?

Email harvesters and other bots roam the Internet looking for email addresses to add to lists that target recipients for spam. This trend results in an increasing amount of unwanted email.

Web administrators have come up with clever ways to protect against this by writing out email addresses (i.e., help \[at\] cloudflare \[dot\] com) or by using embedded images of the email address. However, you lose the convenience of clicking on the email address to automatically send an email. By enabling Cloudflare Email Address Obfuscation, email addresses on your web page will be obfuscated (hidden) from bots, while keeping them visible to humans. In fact, there are no visible changes to your website for visitors.

For email address obfuscation to work in Cloudflare, a page must have a MIME type (Content-Type) of "text/html" or "application/xhtml+xml". 

## Change Email Address Obfuscation setting

Cloudflare enables email address obfuscation automatically when you sign up.

To change the Email Address Obfuscation setting for your zone:

1.  Log into the [Cloudflare dashboard](https://dash.cloudflare.com/login).
2.  Select your account and website.
3.  Go to **Scrape Shield**.
4.  For **Server Side Excludes**, switch the toggle to **On**.

{{<render file="_configuration-rule-promotion.md" productFolder="rules">}}

___

## Troubleshoot email obfuscation

To prevent unexpected website behavior, email addresses are not obfuscated when they appear in:

-   Any HTML tag attribute, except for the _href_ attribute of the _a_ tag.
-   Other HTML tags:
    -   _script_ tags: `<script></script>`
    -   _noscript_ tags: `<noscript></noscript>`
    -   _textarea_ tags: `<textarea></textarea>`
    -   _xmp_ tags: `<xmp></xmp>`
    -   _head_ tags: `<head></head>`
-   Any page that does not have a MIME type of "text/html" or "application/xhtml+xml"

**Please Note** that Email Obfuscation will **not take affect** if you're using the `Cache-Control: no-transform` header.

___

## Prevent Cloudflare from obfuscating email

To prevent Cloudflare from obfuscating emails, you can:

-   Add the following comment in the page HTML code:  `<!--email_off-->``_your_` `_email addresses go here_``<!--/email_off-->`

-   Return email addresses in JSON format for AJAX calls, making sure your web server returns a content type of "application/json".

-   Disable the Email Obfuscation feature by creating a [Configuration Rule](/rules/configuration-rules/) or [Page Rule](/support/page-rules/understanding-and-configuring-cloudflare-page-rules-page-rules-tutorial/) to be applied on a specific endpoint.
