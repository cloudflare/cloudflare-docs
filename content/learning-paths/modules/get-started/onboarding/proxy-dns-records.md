---
title: Proxy DNS records
pcx_content_type: learning-unit
weight: 2
layout: learning-unit
---

Since it affect so many other parts of Cloudflare, you should proxy your DNS records through Cloudflare.

<details>
<summary>What is DNS?</summary>
<div>

DNS stands for Domain Name System.

Without DNS, we would have to remember long strings of numbers to access our favorite websites. With DNS, you just have to remember something like `example.com` and your browser goes to an IP address like `192.0.2.1`.

For more details on DNS, refer to the [Learning Center](https://www.cloudflare.com/learning/dns/what-is-dns/).

</div>
</details>

<details>
<summary>What are DNS records?</summary>
<div>

DNS records are instructions that live in authoritative DNS servers and provide information about a domain including what IP address is associated with that domain and how to handle requests for that domain.

- [DNS records (concept)](https://www.cloudflare.com/learning/dns/dns-records/)
- [DNS records in Cloudflare](/dns/manage-dns-records/reference/dns-record-types/)
- [Manage DNS records](/dns/manage-dns-records/how-to/create-dns-records/)

</div>
</details>

<details>
<summary>What is "proxying my DNS through Cloudflare"?</summary>
<div>

{{<render file="_proxied-records-definition.md" productFolder="dns">}}

- [Reverse proxy (definition)](https://www.cloudflare.com/learning/cdn/glossary/reverse-proxy/)
- [How Cloudflare works](/fundamentals/get-started/concepts/how-cloudflare-works/)
- [DNS record proxy status](/dns/manage-dns-records/reference/proxied-dns-records/)

</div>
</details>

## Prerequisites

Before proxying your records, review [our guide](/dns/manage-dns-records/reference/proxied-dns-records/) that explains what proxying does and what limitations it has.

You may also need to [allow Cloudflare IP addresses](/fundamentals/get-started/setup/allow-cloudflare-ip-addresses/) at your origin to prevent requests from being blocked.

## How to do it

Then, [update](/dns/manage-dns-records/how-to/create-dns-records/#edit-dns-records) your Cloudflare DNS records so their **Proxy status** is **Proxied**.

![Proxy status affects how Cloudflare treats traffic intended for specific DNS records](/images/dns/proxy-status-screenshot.png)