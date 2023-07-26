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

- When running `wrangler dev --remote`, all outgoing requests are given the `cf-workers-preview-token` header, which Cloudflare recognizes as a preview request. This applies to the entire Cloudflare network, so making HTTP requests to other Cloudflare zones is currently discarded for security reasons. To enable a workaround, insert the following code into your Worker script:

```js
const request = new Request(url, incomingRequest);
request.headers.delete('cf-workers-preview-token');
return await fetch(request);
```

## Custom ports

For Workers subrequests, when a Worker is deployed, custom ports are ignored and requests are sent to the scheme's default port, such as `443` for HTTPS. Note that when developing a Worker locally, or from within the Cloudflare dashboard using Quick Edit, custom ports are respected and allowed.

For example:

```js
await fetch('https://example.com:1234/foo')
```

is the equivalent of:

```js
await fetch('https://example.com/foo')
```

## Fetch to IP addresses

For Workers subrequests, requests can only be made to URLs, not to IP addresses directly. To overcome this limitation [add a A or AAAA name record to your zone](https://developers.cloudflare.com/dns/manage-dns-records/how-to/create-dns-records/) and then fetch that resource. 

For example, in the zone `example.com` create a record of type `A` with the name `server` and value `192.0.2.1`, and then use:

```js
await fetch('http://server.example.com')
```

Do not use:

```js
await fetch('http://192.0.2.1')
```
