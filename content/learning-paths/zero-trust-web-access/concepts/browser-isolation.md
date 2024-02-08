---
title: What is browser isolation?
pcx_content_type: overview
weight: 4
layout: learning-unit
---

Browser isolation (also known as remote browsing) executes active webpage content in a secure isolated browser to protect users from zero-day attacks, malware, and phishing. Browser isolation is an important component of Zero Trust Web Access, in which no connection request is inherently trusted by default. In this case, applying Zero Trust principles to browsing means no website code should be trusted to run on devices by default.

## How browser isolation works

Typically, a website visitor loads webpage content and code directly on the browser running on local devices. From a security perspective, this makes Internet browsing fairly risky, as this content and code often comes from unknown sources. However, remote browser isolation (RBI) — the technology underpinning browser isolation — loads and executes web content in the cloud, away from local devices. The RBI service then transmits the resulting output to the user's device so that the user can interact with the webpages like normal, but without actually loading the full webpages on their local browser and device. Any user actions, such as mouse clicks, keyboard inputs, or form submissions, are transmitted to the cloud server, where further controls can be applied.

![RBI loads active web content on a cloud server and sends the output to the user's device.](/images/cloudflare-one/policies/how-rbi-works.png)

There are three ways a remote browser isolation server can send web content to a user's device:

- **Pixel pushing** renders and processes web content on a remote server instead of the user’s device. The server then sends a visual representation of the webpage to the user’s device as an interactive image or video stream. The high network bandwidth required can introduce latency to the end-user’s browsing experience; however, this method can help ensure that malicious content remains confined to the remote server.
- **Document Object Model (DOM) reconstruction** rewrites each webpage in the cloud to remove malicious content. Once the content is sanitized, it is sent to the user's device, where the webpage code loads and executes a second time. This approach can still send untrusted third-party code to local devices, but it is better than pixel pushing at maintaining the original webpage’s experience.
- **Network vector rendering (NVR)** loads web content on a remote server and streams Skia draw commands to the web browser running locally on the user’s device. Skia is the graphics engine that works across Android, Google Chrome, Chrome OS, Mozilla Firefox, and many other hardware and software platforms. Because NVR streams draw commands rather than actual website code, it can be faster and more secure than pixel pushing and DOM reconstruction. NVR is the patented technology used by Cloudflare Browser Isolation.
