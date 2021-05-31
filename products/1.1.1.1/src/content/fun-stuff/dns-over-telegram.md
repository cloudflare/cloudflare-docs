---
order: 4
---

# DNS over Telegram

To perform DNS over Telegram, you will need the Telegram app. For the unfamiliar, Telegram is an end-to-end encrypted messaging app. You can download it on [telegram.org](https://telegram.org/).

You will also need to add the 1.1.1.1 bot to your friends list in Telegram before using this functionality:
1. Open the Telegram app.
1. Click **Contacts**.
1. Search for `onedotonedotonedotonedotbot`.

    ![search](../static/search.png)

1. When the 1.1.1.1 bot appears in the search results, click on it.
1. Then press **Start**.

    ![search](../static/click-start.png)

1. You can send a single domain name, which will default to returning the AAAA record. For example:

    ![search](../static/example-com.png)

Or you can send a record type followed by a domain name. The record types supported are:

```txt
A
AAAA
CAA
CNAME
DS
DNSKEY
MX
NS
NSEC
NSEC3
RRSIG
SOA
TXT
```

Example:

![search](../static/aaaa-example-com.png)
