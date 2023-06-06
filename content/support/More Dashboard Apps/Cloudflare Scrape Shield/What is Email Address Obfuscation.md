---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/200170016-What-is-Email-Address-Obfuscation-
title: What is Email Address Obfuscation?
---

# What is Email Address Obfuscation?



## Overview

Email harvesters and other bots roam the Internet looking for email addresses to add to lists that target recipients for spam. This trend results in an increasing amount of unwanted email.

Web administrators have come up with clever ways to protect against this by writing out email addresses (i.e., help \[at\] cloudflare \[dot\] com) or by using embedded images of the email address. However, you lose the convenience of clicking on the email address to automatically send an email. By enabling Cloudflare Email Address Obfuscation, email addresses on your web page will be obfuscated (hidden) from bots, while keeping them visible to humans. In fact, there are no visible changes to your website for visitors.

 For email address obfuscation to work in Cloudflare, a page must have a MIME type (Content-Type) of "text/html" or "application/xhtml+xml". 

{{<Aside type="note">}}
Dedicated email support is available for all Pro, Business, and
Enterprise Plan users. Business and Enterprise plan users also have
access to chat support. If you require additional support, explore [our
plans](https://www.cloudflare.com/plans/).
{{</Aside>}}

___

Cloudflare enables email address obfuscation automatically when you sign up. 

To verify email address obfuscation in the Cloudflare dashboard:

1.  Log in to the Cloudflare dashboard.
2.  Ensure the website you want to verify is selected.
3.  Click the **Scrape Shield** app.
4.  Under **Email Address Obfuscation**, check that the toggle is set to _On_.

Alternatively, you can retrieve the page source from an HTTP client such as CURL, an HTTP library, or browser's view-source option. Then, review the source HTML to confirm that the address is no longer present. 

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

-   Disable the \`Email Obfuscation\` feature using a Page Rule to be applied on a specific endpoint for your zone, following our Page Rule Tutorial here: [Understanding and Configuring Cloudflare Page Rules (Page Rules Tutorial)](https://support.cloudflare.com/hc/en-us/articles/218411427-Understanding-and-Configuring-Cloudflare-Page-Rules-Page-Rules-Tutorial-#h_18YTlvNlZET4Poljeih3TJ)
