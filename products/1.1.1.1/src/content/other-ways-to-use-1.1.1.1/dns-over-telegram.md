---
order:
pcx-content-type: how-to
---

# DNS over Telegram

To perform DNS over Telegram, you will need Telegram, an end-to-end encrypted messaging app. You can download it on [telegram.org](https://telegram.org/).

You will also need to add the 1.1.1.1 bot to your friends list in Telegram before using this functionality:

1. Open the Telegram app.
1. Click **Contacts**.
1. Search for `onedotonedotonedotonedotbot`.
1. Click the **1.1.1.1 bot** when it appears in the search results, and press **Start**.
1. You can send a single domain name, which will default to returning the AAAA record. For example:

<br/>

<div class="medium-img">

![Search](../static/example-com.png)

</div>

<br/>

Or you can send a record type followed by a domain name. The record types supported are:

* A
* AAAA
* CAA
* CNAME
* DNSKEY
* DS
* MX
* NS
* NSEC
* NSEC3
* RRSIG
* SOA
* TXT

<br/>

Example:

<div class="medium-img">

![Search](../static/aaaa-example-com.png)

</div>