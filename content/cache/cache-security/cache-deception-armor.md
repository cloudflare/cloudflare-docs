---
pcx_content_type: concept
title: Cache Deception Armor
---

# Cache Deception Armor

Before learning about Cache Deception Armor, you should first understand how Web Cache Deception attacks work.

## Web Cache Deception attacks

Web Cache Deceptions attacks occur when an attacker tricks a user into opening a link in the format of `http://www.example.com/newsfeed/foo.jpg`, when `http://www.example.com/newsfeed` is the location of a dynamic script that returns different content for different users.

This scenario becomes problematic when your website is configured to be flexible about what kinds of paths it can handle. To be more specific, when requests to a path that do not exist, such as `/x/y/z` are treated as equivalent to requests to a parent path that does exist `/x`.

For example, an attacker could send a user a link to `http://www.example.com/newsfeed/foo.jpg` so that the user could be taken to their newsfeed. When the request passes through Cloudflare, the request would be cached because the path ends in `.jpg`. The attacker can then visit the same URL themselves, and their request will be served from Cloudflare's cache, exposing your user's sensitive content.

## Cache Deception Armor protects against attacks

You can protect users from Web Cache Deception attacks by creating a [cache rule](/cache/how-to/cache-rules/create-dashboard/). With this rule, you can continue to cache static assets, but the rule will verify a URL's extension matches the returned `Content-Type`.

In the newsfeed example above, if `http://www.example.com/newsfeed` is a script that outputs a webpage, the `Content-Type` is `text/html`. On the other hand, `http://www.example.com/newsfeed/foo.jpg` is expected to have `image/jpeg` as `Content-Type`. When a mismatch that could result in a Web Cache Deception attack is found, Cloudflare does not cache the response.

### Exceptions

- If the returned `Content-Type` is `application/octet-stream`, the extension does not matter because that is typically a signal to instruct the browser to save the asset instead of to display it.
- Cloudflare allows `.jpg` to be served as `image/webp` or `.gif` as `video/webm` and other cases that we think are unlikely to be attacks.
- Keep in mind that Cache Deception Armor depends upon [Origin Cache Control](/cache/concepts/cache-control/). A `Cache-Control` header from the origin, [Edge Cache TTL Cache Rule](/cache/how-to/cache-rules/settings/#edge-ttl) or Browser Cache TTL zone setting may override the protection.

## Enable Cache Deception Armor

To enable Cache Deception Armor, you need to start by creating a [cache rule](/cache/how-to/cache-rules/). Follow the steps below for guidance:

1. Log in to your [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Caching** > **Cache Rules**.
3. Select **Create rule**.
4. Under **When incoming requests match**, define the [rule expression](/ruleset-engine/rules-language/expressions/edit-expressions/#expression-builder).
5. Under **Then**, in the **Cache eligibility** section, select **Eligible for cache**.
6. Add the **Cache Key** setting to the rule and turn on **Cache deception armor**.
7. To save and deploy your rule, select **Deploy**. If you are not ready to deploy your rule, select **Save as Draft**.