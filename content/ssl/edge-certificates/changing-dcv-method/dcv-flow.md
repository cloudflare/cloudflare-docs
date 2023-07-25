---
pcx_content_type: concept
title: Domain control validation flow
weight: 2
layout: list
meta:
    description: Consider the steps that have to take place before the DCV process is completed and certificate aithorities can issue SSL/TLS certificates.
---

# Domain control validation flow

Universal, Advanced and Custom hostname certificates must be publicly trusted and so, in order to obtain them, Cloudflare partners with different certificate authorities (CAs).

What this means, in regards to DCV, is that there are three different parties involved in the process:

* the website or application for which the certificate is issued,
* the client that requests the certificate issuance or renewal, 
* and the server that processes the requests and, depending on the success or failure of the DCV process, issues or renews the certificates.

The following image illustrates this process. ACME stands for Automated Certificate Management Environment and DNS or HTTP corresponds to [TXT](/ssl/edge-certificates/changing-dcv-method/methods/txt/) or [HTTP](/ssl/edge-certificates/changing-dcv-method/methods/http/) methods.

![Domain control validation detailed flowchart](/images/ssl/dcv-process-detail.png)

1. CF gets DCV tokens from CAs
2. Either we place the tokens or we ask customers to do so
2. We poll the URLs to check for the tokens.
3. Only after we see the tokens placed via multiple DNS resolvers, we ask the CA (google in this case) to check for the tokens.
4. If CA sees the tokens, the cert gets issued. If the CA doesn't see the tokens, the old ones are invalidated and the tokens need to be rolled.


validation URL
/.well-known/
If CA sees the tokens, the cert gets issued. If the CA doesn't see the tokens, the old ones are invalidated and the tokens need to be rolled.