---
pcx-content-type: concept
---

# Cache Deception Armor

Before learning about Cache Deception Armor, you should first understand how Web Cache Deception attacks work.

## Web Cache Deception attacks

Web Cache Deceptions attacks occur when an attacker tricks a user into clicking a link in the format of `http://www.example.com/newsfeed/foo.jpg`, when `http://www.example.com/newsfeed` is the location of a dynamic script that returns different content for different users.

This scenario becomes problematic when your website is configured to be flexible about what kinds of paths it can handle. To be more specific, when requests to a path that do not exist, such as `/x/y/z` are treated as equivalent to requests to a parent path that does exist `/x`.

For example, an attacker could send a user a link to `http://www.example.com/newsfeed/foo.jpg` so that the user could be taken to their newsfeed. When the request passes through Cloudflare, the request would be cached because the path ends in `.jpg`. The attacker can then visit the same URL themselves, and their request will be served from Cloudflare's cache, exposing your user's sensitive content.

## Cache Deception Armor protects against attacks

You can protect users from Web Cache Deception attacks by adding a Cache Deception Armor Page Rule. With this rule, you can continue to cache static assets, but the rule will verify a URL's extension matches the returned `Content-Type`. 

In the newsfeed example above, if `http://www.example.com/newsfeed` is a script that outputs a web page, the `Content-Type` is `text/html`. On the other hand, `http://www.example.com/newsfeed/foo.jpg` is expected to have `image/jpeg` as `Content-Type`. When a mismatch that could result in a Web Cache Deception attack is found, Cloudflare does not cache the response.

To enable Cache Deception Armor, refer to [Enable Cache Deception Armor](/how-to/enable-cache-deception-armor).

### Exceptions 

- If the returned `Content-Type` is `application/octet-stream`, the extension does not matter because that's typically a signal to instruct the browser to save the asset instead of to display it.
- Cloudflare allows `.jpg` to be served as `image/webp` or `.gif` as `video/webm` and other cases that we think are unlikely to be attacks.