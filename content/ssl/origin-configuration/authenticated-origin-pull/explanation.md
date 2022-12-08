---
pcx_content_type: concept
title: How authenticated origin pulls work
weight: 1
---

# How authenticated origin pulls work

## Simple explanation

When visitors request content from your domain, Cloudflare first attempts to serve content from the cache. Failing that, Cloudflare sends a request — or an `origin pull` — back to your origin web server to get the content.

Authenticated origin pulls make sure that all of these `origin pulls` come from Cloudflare. Put another way, authenticated origin pulls ensure that any HTTPS requests outside of Cloudflare will not receive a response from your origin.

{{<Aside type="note" header="Note">}}

Requests to gray-clouded records within Cloudflare DNS are also blocked.

{{</Aside>}}

## Detailed explanation

Cloudflare enforces authenticated origin pulls by adding an extra layer of TLS client certificate authentication when connecting between Cloudflare and the origin web server.

For more details, refer to the [introductory blog post](https://blog.cloudflare.com/protecting-the-origin-with-tls-authenticated-origin-pulls/).

---

### Types of handshakes

For more details, refer to [What is a TLS handshake?](https://www.cloudflare.com/learning/ssl/what-happens-in-a-tls-handshake/).

**Standard TLS handshake**

![Diagram showing the Standard TLS handshake](/ssl/static/client-auth-tls-standard.png)

**Client authenticated TLS handshake**

![Diagram showing the client authenticated TLS handshake](/ssl/static/client-auth-tls-handshake.png)

### Comparison diagrams

Without authenticated origin pulls - and even with [Full](/ssl/origin-configuration/ssl-modes/full/) or [Full (strict)](/ssl/origin-configuration/ssl-modes/full-strict/) encryption modes - Cloudflare performs standard TLS handshakes between a client device and Cloudflare and Cloudflare and your origin.

<div class="mermaid">
    flowchart TD
      accTitle: Connection diagram without authenticated origin pulls
      A[End user query for <code>example.com</code>] --Standard TLS Handshake--> B[Cloudflare edge]
      B --Standard TLS Handshake--> C[Origin server]
      D[External device] --Standard TLS Handshake ----> C
</div>
<br/>

This lack of authentication means that - even if your origin is [protected behind Cloudflare](/fundamentals/get-started/concepts/how-cloudflare-works/) - attackers with your origin's IP address will still receive a response from your origin for HTTPS requests.

With authenticated origin pulls, Cloudflare performs standard TLS handshakes between a client device and Cloudflare, but a client-authenticated TLS handshake between Cloudflare and your origin.

<div class="mermaid">
    flowchart TD
      accTitle: Connection diagram without authenticated origin pulls
      A[End user query for <code>example.com</code>] --Standard TLS Handshake--> B[Cloudflare edge]
      B --Client authenticated TLS Handshake--> C[Origin server]
      D[External device] --Standard TLS Handshake -----x C
</div>
<br/>

This additional layer of authentication ensures that any HTTPS requests outside of Cloudflare will not receive a response from your origin.
