---
_build:
  publishResources: false
  render: never
  list: never
inputParameters: param1
---

JavaScript detections are another method that help Cloudflare identify bot requests.

$1

## What are JavaScript detections

These detections are implemented via a lightweight, invisible code injection that honors Cloudflare’s [strict privacy standards](https://www.cloudflare.com/privacypolicy/). A small amount of JavaScript is injected into client devices using [Google’s Picasso fingerprinting technique](https://research.google/pubs/pub45581/). Picasso results are factored into bot scores and help Cloudflare classify traffic as automated or human. `BotScoreSrc: Not Computed` and a score of 0 are relevant to Picasso JavaScript Fingerprinting requests. These are exempt from being blocked by any firewall rules.

This detection technique gathers general data about the machines reaching Cloudflare. For example, Cloudflare might learn that a particular user is accessing Cloudflare via Google Chrome on a MacBook Pro. Because there are millions of people using Google Chrome on a MacBook Pro, Cloudflare cannot identify specific individuals. Cloudflare also takes steps to anonymize and phase out data for added privacy.

JavaScript is injected only in response to requests for HTML pages or page views, excluding AJAX calls. API and mobile app traffic is unaffected. Additionally, code is not injected again until its 30-minute session life expires. After page load, the Picasso script is deferred and utilizes a separate thread (where available) to ensure that performance impact is minimal.

The snippets of JavaScript will contain a source pointing to the challenge platform with paths that start with `/cdn-cgi/challenge-platform/...`.