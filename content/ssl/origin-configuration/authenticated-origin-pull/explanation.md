---
pcx_content_type: concept
title: About
weight: 1
meta:
  title: How Authenticated Origin Pulls works
---

# How Authenticated Origin Pulls works

## Simple explanation

When visitors request content from your domain, Cloudflare first attempts to serve content from the cache. If this attempt fails, Cloudflare sends a request — or an `origin pull` — back to your origin web server to get the content.

Authenticated Origin Pulls makes sure that all of these `origin pulls` come from Cloudflare. Put another way, Authenticated Origin Pulls ensures that any HTTPS requests outside of Cloudflare will not receive a response from your origin.

{{<Aside type="note" >}}

This block also applies for requests to [unproxied DNS records](/dns/manage-dns-records/reference/proxied-dns-records/#dns-only-records) in Cloudflare.

{{</Aside>}}

## Detailed explanation

Cloudflare enforces authenticated origin pulls by adding an extra layer of TLS client certificate authentication when establishing a connection between Cloudflare and the origin web server.

For more details, refer to the [introductory blog post](https://blog.cloudflare.com/protecting-the-origin-with-tls-authenticated-origin-pulls/).

---

### Types of handshakes

For more details, refer to [What is a TLS handshake?](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/).

**Standard TLS handshake**

![Diagram showing the Standard TLS handshake](/ssl/static/client-auth-tls-standard.png)

**Client authenticated TLS handshake**

![Diagram showing the client authenticated TLS handshake](/ssl/static/client-auth-tls-handshake.png)

### Comparison diagrams

Without Authenticated Origin Pulls, Cloudflare performs standard TLS handshakes between a client device and Cloudflare and Cloudflare and your origin.
This is true even if you have [**Full**](/ssl/origin-configuration/ssl-modes/full/) or [**Full (strict)**](/ssl/origin-configuration/ssl-modes/full-strict/) encryption modes enabled.

```mermaid
    flowchart TD
      accTitle: Connection diagram without Authenticated Origin Pulls
      A[End user query for <code>example.com</code>] --Standard TLS Handshake--> B[Cloudflare edge]
      B --Standard TLS Handshake--> C[Origin server]
      D[External device] --Standard TLS Handshake ----> C
```
<br/>

This lack of authentication means that - even if your origin is [protected behind Cloudflare](/fundamentals/get-started/concepts/how-cloudflare-works/) - attackers with your origin's IP address will still receive a response from your origin for HTTPS requests.

With Authenticated Origin Pulls, Cloudflare performs standard TLS handshakes between a client device and Cloudflare, but a client-authenticated TLS handshake between Cloudflare and your origin.

```mermaid
    flowchart TD
      accTitle: Connection diagram with Authenticated Origin Pulls
      A[End user query for <code>example.com</code>] --Standard TLS Handshake--> B[Cloudflare edge]
      B --Client authenticated TLS Handshake--> C[Origin server]
      D[External device] --Standard TLS Handshake -----x C
```
<br/>

This additional layer of authentication ensures that any HTTPS requests outside of Cloudflare will not receive a response from your origin.
