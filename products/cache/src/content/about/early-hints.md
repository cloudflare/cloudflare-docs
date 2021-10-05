---
title: Early Hints (Beta)
pcx-content-type: concept
---

# Early Hints (Beta)

Early Hints takes advantage of “server think time” to asynchronously send instructions to the browser to begin loading resources while the origin server is compiling the full response. By sending these hints to a browser before the full response is prepared, the browser can figure out how to load the webpage faster for the end user.

Formally, Early Hints is a [web standard](https://httpwg.org/specs/rfc8297.html) that defines a new HTTP status code (103 Early Hints) that defines new interactions between a client and server. 103s are served to clients while a 200 OK (or error) response is prepared, which is the “server think time.” The response contains hints about which assets will likely be needed to fully render the web page. This "hinting" speeds up page loads and generally reduces user-perceived latency.

For more information about Early Hints, refer to the [Early Hints blog](https://blog.cloudflare.com/early-hints/).

## Sign up for Early Hints Beta

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com) and select your domain.
1. From the dashboard, click **Speed** > **Optimization**.
1. Under **Optimized Delivery**, click **Join the beta**.

After you sign up, you will be added to a list of beta users, and the feature will be enabled in batches from the list.