---
title: Use PAC files
pcx_content_type: overview
weight: 4
layout: learning-unit
---

Learn why and when to use PAC files instead of (or complementary to) endpoint agents.

## What are PAC files?

A {{<glossary-tooltip term_id="PAC file">}}PAC file{{</glossary-tooltip>}}, or Proxy Auto-Configuration file, is like a tiny map for your web browser, telling it how to reach websites. Instead of just going straight there, it can direct your traffic through a proxy server first for Internet protection, filtering out unwanted URL access. Cloudflare customers use PAC files for filtering internet traffic when they do not want to install agents on devices or where agent installations are not supported.

Here's a quick rundown:

- What it does: PAC files contain JavaScript code that decide whether your browser uses a proxy for each website you visit.
- Why use it: PAC files are handy for organizations or networks that want to control access to the internet. They can allow access to some websites directly, while routing others through the proxy for filtering or security reasons.
- How it works: The PAC file tells your browser to run a FindProxyForURL function with the website address. This function analyzes the address and decides whether to send it directly or through a specific proxy server.
- Benefits: Managing a single PAC file saves time and effort compared to manually configuring proxy settings for each device. It also allows for flexible rules based on websites, times, or other factors.
- The PAC files/ PAC URLs are usually pushed to devices via GPO.
- Think of it like this: you're driving to a friend's house, but there's construction on the main road. Your GPS (the PAC file) suggests a detour through a side street (the proxy server) to get there faster.

## Where are the PAC files hosted?

PAC files are usually hosted in a centralized location where all the devices can reach and download the file, the browsers are configured with PAC URL and the browsers retrieves the PAC file from the address usually when the browser is opened.

## Best practices

- Avoid complex logic and nested condition that might slow down processing
- Place frequently accessed URLs/ conditions to the top for faster processing
- Test the PAC file logic on few machine before deployment, test it using tools like an [online proxy PAC file tester](https://thorsen.pm/proxyforurl)
- When downloading a PAC file from a central location it must complete within 30 seconds.
- Must complete with an HTTP response code `200`.
- Must have an uncompressed body smaller than 1 MB.
- Do not follow ordinary HTTP caching semantics.
- Are never fetched through a proxy
