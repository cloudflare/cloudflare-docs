---
title: What is Zero Trust Web Access?
pcx_content_type: overview
weight: 3
layout: learning-unit
---

Zero Trust Web Access (ZTWA), also known as Zero Trust Application Access (ZTAA), provides users with secure access to internal applications using Zero Trust principles. ZTWA authenticates users to applications by integrating with [identity providers](https://www.cloudflare.com/learning/access-management/what-is-an-identity-provider/), encrypting connections, considering each access request for an application individually, and blocking or allowing on a request-by-request basis.

## ZTNA vs. ZTWA

Zero Trust Network Access (ZTNA) and Zero Trust Web Access (ZTWA) are complementary solutions for securely connecting users to internal resources.

ZTNA focuses on granting access to private networks. ZTNA implementations usually involve installing device client software in order to access non-HTTP resources and filter network traffic.

ZTWA, on the other hand, focuses on granting access to specific applications on the network. ZTWA can be delivered without a device client for HTTP resources that are accessed in a browser. Clientless deployments allow organizations to quickly onboard users to their applications, especially users on unmanaged devices such as third-party contractors or vendors.

## Where Cloudflare differs in the ZTWA approach

One of the biggest challenges in delivering clientless, secure remote access is making it feel native for your end users. Solutions have existed for decades which operate in a way that breaks TLS on a firewall or creates a picture-in-a-picture to access an internal web service. These legacy solutions make it very difficult to apply traditional web security concepts to private applications.

In contrast, Cloudflare is the [leading reverse proxy provider](https://www.cloudflare.com/application-services/products/) for public-facing websites and applications, which gives us a unique capability to deliver seamless security and networking services for private applications. There is no additional overhead in implementation, management, ongoing updates, or routing; everything works for your administrators like a standard Cloudflare application. Most importantly, our ZTWA solution makes private applications feel like a SaaS applications for your end users, complete with security, performance, and consistency.
