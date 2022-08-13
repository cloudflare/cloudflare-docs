---
pcx_content_type: how-to
title: DNS over Telegram
---

# DNS over Telegram

To perform DNS lookups over Telegram, you will need Telegram, an end-to-end encrypted messaging app. You can download it on [telegram.org](https://telegram.org/).

You will also need to add the 1.1.1.1 bot to your friends list in Telegram before using this functionality.

## Add 1.1.1.1 bot to your Telegram friends list

1. Open the Telegram app.
2. Select **Contacts**.
3. Search for `onedotonedotonedotonedotbot`.
4. Select the **1.1.1.1 bot** when it appears in the search results, and press **Start**.

## Perform DNS lookups

You can send a single domain name, which will default to returning the AAAA record. For example:

```txt
dig @1.1.1.1 AAAA example.com
```

You can also send a record type followed by a domain name.

<details>
<summary>Supported DNS record types</summary>
<div>

- `A`
- `AAAA`
- `CAA`
- `CNAME`
- `DNSKEY`
- `DS`
- `MX`
- `NS`
- `NSEC`
- `NSEC3`
- `RRSIG`
- `SOA`
- `TXT`

</div>
</details>

Example:

```txt
dig @1.1.1.1 AAAA example.com
```
