---
pcx_content_type: overview
title: Rocket Loader
weight: 1
---

# Rocket Loader

Rocket Loader prioritizes your website's content (text, images, fonts, and more) by deferring the loading of all of your JavaScript until after rendering.

This type of loading (known as asynchronous loading) leads to earlier rendering of your page content. Rocket Loader handles both inline and external scripts, while maintaining order of execution. Cloudflare will detect incompatible browsers and disable Rocket Loader.

On pages with JavaScript, this results in a [much faster loading experience](https://www.cloudflare.com/learning/performance/test-the-speed-of-a-website/) for your users and improves the following performance metrics:

- Time to First Paint (TTFP)
- Time to First Contentful Paint (TTFCP)
- Time to First Meaningful Paint (TTFMP)
- Document Load

## How to

{{<directory-listing>}}

## Availability

{{<feature-table id="speed.rocket_loader">}}

## Limitations

Some of Cloudflare's optional features, including Rocket Loader and Email Obfuscation, use non standard tags that fail strict HTML validation via tools like [w3.org](https://validator.w3.org/). These failures do not correlate to issues for your site visitors.

If you observe JavaScript or jQuery issues for your website, [disable Rocket Loader](/fundamentals/speed/rocket-loader/enable/) and retest your website.

{{<render file="_rocket-loader-csp.md">}}
