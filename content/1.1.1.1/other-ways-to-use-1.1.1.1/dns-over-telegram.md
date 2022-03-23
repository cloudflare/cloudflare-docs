---
weight: 0
pcx-content-type: how-to
title: DNS over Telegram
---

# DNS over Telegram

To perform DNS lookups over Telegram, you will need Telegram, an end-to-end encrypted messaging app. You can download it on [telegram.org](https://telegram.org/).

You will also need to add the 1.1.1.1 bot to your friends list in Telegram before using this functionality.

## Add 1.1.1.1 bot to your Telegram friends list

1. Open the Telegram app.
2. Click **Contacts**.
3. Search for `onedotonedotonedotonedotbot`.
4. Click the **1.1.1.1 bot** when it appears in the search results, and press **Start**.

## Perform DNS lookups

You can send a single domain name, which will default to returning the AAAA record. For example:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig @1.1.1.1 AAAA example.com</span></div></span></span></span></code></pre>{{</raw>}}

You can also send a record type followed by a domain name.

<details>
<summary>Supported DNS record types</summary>
<div>

* `A`
* `AAAA`
* `CAA`
* `CNAME`
* `DNSKEY`
* `DS`
* `MX`
* `NS`
* `NSEC`
* `NSEC3`
* `RRSIG`
* `SOA`
* `TXT`

</div>
</details>

Example:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">dig @1.1.1.1 AAAA example.com</span></div></span></span></span></code></pre>{{</raw>}}