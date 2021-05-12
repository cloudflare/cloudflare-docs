---
title: Introduction
type: overview
order: 1
pcx-content-type: landing page
---

# Introduction

One of the major advantages of using Cloudflare is that cacheable content (such as images, JavaScript, CSS and HTML) is both cached by Cloudflare and delivered from our data centers around the world. Because Cloudflare has data centers covering the entire globe, cached content gets delivered quickly to web surfers wherever they are (and overcomes latency problems).

But only about 66% of content is cacheable. The other 34% must be obtained from the real origin web server. Railgun overcomes this problem by using a scheme that is able to cache dynamically generated or personalized web pages dramatically reducing bandwidth used and improving download times.

Railgun is a single daemon that runs on a 64-bit system which uses alternative compression techniques to dramatically speed up WAN performance.

It proxies traffic through a special protocol that would normally travel between Cloudflare and your origin server over HTTP.

Typically, the markup of websites, or the body a JSON API response, does not change that frequently from one request to the next. Instead of transferring the entire request between Cloudflare and your environment, Railgun will transfer only the changes in markup from one request to the next. This cuts down on bandwidth, transfer time, and overall page load times. Railgun caches these differences in memory to make page processing as fast as possible.

## Requirements

<TableWrap>
This is a table
</TableWrap>