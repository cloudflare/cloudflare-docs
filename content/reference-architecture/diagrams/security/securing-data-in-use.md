---
title: Securing data in use
pcx_content_type: reference-architecture-diagram
weight: 1
meta:
  title: "Reference Architecture Diagram: Securing data in use"
---

# Securing data in use

## Introduction

Data in use refers to data that is actively being processed, manipulated, or used by applications or systems. Protecting data in use is challenging because it must be accessible and in a usable state for applications and users, yet it should still be protected against unauthorized access or tampering. 

Today, a vast majority of data being used by users takes place inside a browser. The capabilities of the modern browser allow entire client applications to be written, such as email clients, word processors, and spreadsheets. This also means no software needs to be installed on the device and the ability to copy and paste or download sensitive data is relatively easy.

One method to secure data in use is to have greater control over the browser used to access applications and data. Cloudflare approached this by building a headless browser solution on our massive edge network, it's called [Remote Browser Isolation](/cloudflare-one/policies/browser-isolation/) (RBI). When a user attempts to access either a privately hosted resource, or a public Internet resource, Cloudflare enforces access via a browser which runs on the Cloudflare network. A small Javascript client then runs in the user's local browser which uses HTTPS and WebRTC to communicate the vectors from the web content running in the remote browser.

## Protecting data in use with Cloudflare RBI

Cloudflare RBI effectively creates an invisible “gap” between a user’s web browser and the endpoint device thereby protecting the device and the network it is connected to from exploits and attacks. Unlike secure web gateways, antivirus software, or firewalls which rely on known threat patterns or signatures, RBI is a genuine zero trust mechanism. Because all requests made by an RBI instance go through the Cloudflare Secure Web Gateway, it's possible to enforce access policies to data and also, inspect the contents of traffic to enforce any data in transit policies.

But ultimately the content is delivered to the remote browser, where we can then apply data in use access controls such as limiting the ability to download/upload data, copy and paste and prevent printing.

Common policies used with RBI: 

- Content category - [Social Networks](/cloudflare-one/policies/gateway/domain-categories/) (e.g. Facebook): Primarily due to the large volumes of data that popular social media platforms collect, these apps are an attractive target and yet another attack vector for malicious entities. RBI allows for limiting what data, especially if that data matches a DLP profile, from being pasted into these applications.
- Application - [Artificial Intelligence](/cloudflare-one/policies/gateway/application-app-types/) (e.g. ChatGPT): Generative AI tools can boost employee productivity, but understanding who is using them and for what is imperative at this stage of the generative AI evolution. Again, DLP profiles here can be applied to prevent the copy and pasting of sensitive data into public AI tools.
- Application - [SaaS](/cloudflare-one/policies/gateway/application-app-types/) (e.g. Salesforce, Zendesk, etc): These applications can often contain highly confidential data. RBI can be used to really lock down access for risky users that require some access, such as contractors or partners. Controls such as preventing printing, or even preventing any keyboard input at all, can result in third party users only looking at a read only view of the application, as if RBI is a pane of glass between the user and the data.

The following diagram visualizes a typical interaction between a user, RBI and a website such as ChatGPT.

![Figure 1: Text copy/paste blocked by Cloudflare RBI.](/images/reference-architecture/securing-data-in-use/securing-data-in-use-fig1.svg "Figure 1: Text copy/paste blocked by Cloudflare RBI.")

1. User attempts to login to ChatGPT, and the request goes via Cloudflare since the user is running our [device agent](/cloudflare-one/connections/connect-devices/warp/download-warp/) to maximize visibility and control of all traffic between the end user’s device and the resources being requested. [Clientless](/cloudflare-one/connections/connect-devices/agentless/) options are supported as well.
2. Cloudflare’s [Secure Web Gateway](/cloudflare-one/policies/gateway/) (SWG) will first verify that the user is permitted to access ChatGPT.
3. Cloudflare’s patented Network Vector Rendering (NVR) process begins as a headless browser on our edge network starts and rasterizes the web app, which involves writing SKIA draw commands.
4. NVR intercepts those draw commands > tokenizes them > compresses them > encrypts them > and sends them to the local web browser.  
5. Because this request is running isolated, the policy also enforces preventing the user from [copying and pasting](/cloudflare-one/policies/browser-isolation/isolation-policies/#disable-copy--paste) sensitive content to ChatGPT from their local machine. Additional [policy settings](/cloudflare-one/policies/browser-isolation/isolation-policies/#policy-settings), such as ‘Disable printing’, ‘Disable upload / download’, and more are available as well. 

## Related resources

- [Securing data in transit](/reference-architecture/diagrams/security/securing-data-in-transit/)
- [Securing data at rest](/reference-architecture/diagrams/security/securing-data-at-rest/)
