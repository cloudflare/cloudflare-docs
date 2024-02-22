---
title: Use PAC files
pcx_content_type: learning-unit
weight: 4
layout: learning-unit
---

{{<Aside type="note">}}

Only available on Enterprise plans.

{{</Aside>}}

Learn why and when to use PAC files instead of (or complementary to) endpoint agents.

## What are PAC files?

A {{<glossary-tooltip term_id="PAC file">}}PAC file{{</glossary-tooltip>}}, or proxy auto-configuration file, is like a tiny map that guides your web browser to websites. Instead of going straight to a website, a PAC file can forward your traffic through a proxy server first, protecting your device and filtering unwanted URL access. Cloudflare customers use PAC files to filter Internet traffic when they device agent installations are unwanted or unsupported.

Here is a quick rundown on PAC files:

- What they do: PAC files contain JavaScript code that decides whether or not your browser should use a proxy. The code determines this for each website you visit.
- How they work: PAC files tell your browser to run a `FindProxyForURL()` function with the website address. This function analyzes the address and decides whether to send it directly to the browser or through a specified proxy server.
  - Admins usually push PAC files to devices via Group Policy Objects (GPOs).
- Why use them: PAC files are handy for organizations or networks that want to control access to the Internet. PAC files can allow access to some websites directly while routing others through the proxy for filtering or security.
- Benefits: Managing a single PAC file saves time and effort compared to manually configuring proxy settings for each device. It also allows for flexible rules based on websites, time and date, and other factors.

Think of PAC files like a GPS: you are driving to a friend's house, but there is construction on the main road. Your GPS (the PAC file) suggests a detour through a side street (the proxy server) to get there faster.

## Where are the PAC files hosted?

PAC files are usually hosted in a centralized location where all the devices can reach and download the file, the browsers are configured with PAC URL and the browsers retrieves the PAC file from the address usually when the browser is opened.

## Create PAC files

For detailed instructions on creating a PAC file, refer to [Enable Gateway proxy with PAC files](/cloudflare-one/connections/connect-devices/agentless/pac-files/).

### Best practices

- Avoid complex logic and nested conditions, as they might slow down processing time.
- Place frequently accessed URLs and conditions at the top for faster processing.
- Test your PAC file logic on multiple devices before deployment with tools such as an [online proxy PAC file tester](https://thorsen.pm/proxyforurl).
- When downloading a PAC file from a central location, it must complete within 30 seconds.
- Requests must complete with an HTTP response code `200`.
- Requests must have an uncompressed body smaller than 1 MB (megabyte).
- Do not follow ordinary HTTP caching semantics.
- Are never fetched through a proxy
