---
title: Subdomains and subdirectories
order: 13
---

# Subdomains and subdirectories

## Run APO on a subdomain

After you enable APO, you configure it to run on the subdomain that uses WordPress. For example, if you have a website called `www.mysite.com` which includes a subdomain running WordPress called `shop.mysite.com`, you would configure APO to run on the `shop.mysite.com` subdomain.

1. Install version 4.4.0 or later of the Cloudflare WordPress plugin.
1. Log in using **Global key**. (You can only use a Global key for the subdomain.)
1. Enable APO. The subdomain displays in the list of hostnames in the card.
1. Repeat the process for each subdomain to enable APO.

By default, APO runs on the root domain. If you choose to run APO on a subdomain, the root domain is automatically disabled. To run APO on a subdomain and root domain, upgrade the WordPress plugin to version 4.4.0 or later on the root domain and re-enable APO.

## Run APO on a subdirectory

After you enable APO, you configure it to run on the subdirectory that uses WordPress. For example, if you have a website called `www.mysite.com` which includes a subdirectory running WordPress called `mysite.com/shop`, you would configure APO to run on the `mysite.com` domain.

1. Install the Cloudflare WordPress plugin.
1. Add your Cloudflare API Token.
1. Activate APO.

Repeat steps 1 and 2 for each subdirectory to activate the WordPress plugin for automatic cache purging.

## Run APO only on a subdirectory

If you choose to run APO only on a subdirectory, the rest of the domain should be configured to bypass APO. You can bypass APO in one of two ways.

### Use the `cf-edge-cache` response header

The `cf-edge-cache: no-cache` instructs the APO service to bypass caching for non-WordPress parts of the site. You can implement this option with Cloudflare Workers using the example below.

```js 
  addEventListener("fetch", (event) => {
     event.respondWith(handleRequest(event.request));
    });

    async function handleRequest(request) {
     /**
      * Response properties are immutable. To change them, construct a new
      * Response object. Response headers can be modified through the headers `set` method.
      */
     const originalResponse = await fetch(request)

     let response = new Response(originalResponse.body, originalResponse);

     // Add a header using set method
     response.headers.set("cf-edge-cache", "no-cache")

     return response
    }
```

### Use Page Rules

Use Page Rules to exclude non-WordPress portions of the site from caching using **Cache Level: Bypass**. This option disables all caching, including static assets for those paths. As a result, we recommend disabling APO via the response header.