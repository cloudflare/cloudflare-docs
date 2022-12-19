---
pcx_content_type: concept
title: Known issues
---

# Known issues

Below are some known bugs and issues to be aware of when using Cloudflare Workers.

## Route specificity

- When defining route specificity, a trailing `/*` in your pattern may not act as expected.

Consider two different Workers, each deployed to the same zone. Worker A is assigned the `example.com/images/*` route and Worker B is given the `example.com/images*` route pattern. With these in place, here are how the following URLs will be resolved:

    // (A) example.com/images/*
    // (B) example.com/images*

    "example.com/images"
    // -> B
    "example.com/images123"
    // -> B
    "example.com/images/hello"
    // -> B

You will notice that all examples trigger Worker B. This includes the final example, which exemplifies the unexpected behavior.

When adding a wildcard on a subdomain, here are how the following URLs will be resolved:
    
    // (A) *.example.com/a 
    // (B) a.example.com/* 
    
    "a.example.com/a"
    // -> B

## wrangler dev

- When running `wrangler dev`, all outgoing requests are given the `cf-workers-preview-token` header, which Cloudflare recognizes as a preview request. This applies to the entire Cloudflare network, so making HTTP requests to other Cloudflare zones is currently discarded for security reasons. To enable a workaround, insert the following code into your Worker script:

```js
const request = new Request(url, incomingRequest);
request.headers.delete('cf-workers-preview-token');
return await fetch(request);
```
## Fetch API in CNAME setup

- When using Cloudflare Workers' Fetch API the Cloudflare DNS resolver is being used. In [Partial (CNAME) setup](https://developers.cloudflare.com/dns/zone-setups/partial-setup/) for a zone this has special implications. All hostnames that the Worker should be able to resolve require a dedicated DNS entry in Cloudflare's DNS setup. Otherwise the Fetch API call will fail with status code 530.


Setup with missing DNS records in Cloudflare DNS

    // Zone in partial setup: example.com
    // DNS records at Authoritative DNS: sub1.example.com, sub2.example.com, ...
    // DNS records at Cloudflare DNS: sub1.example.com

    "sub1.example.com/"
    // -> Can be resolved by Fetch API
    "sub2.example.com/"
    // -> Cannot be resolved by Fetch API, will lead to 530 status code
    
    
After adding `sub2.example.com` to Cloudflare DNS

    // Zone in partial setup: example.com
    // DNS records at Authoritative DNS: sub1.example.com, sub2.example.com, ...
    // DNS records at Cloudflare DNS: sub1.example.com, sub2.example.com

    "sub1.example.com/"
    // -> Can be resolved by Fetch API
    "sub2.example.com/"
    // -> Can be resolved by Fetch API
