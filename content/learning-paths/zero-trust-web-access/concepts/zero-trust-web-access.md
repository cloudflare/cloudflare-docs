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

Cloudflare's business was built on creating a network that delivers performance and security for public-facing websites globally. That global network is now the largest of its kind, processing over 50 million HTTP requests per second and offering [Web Application Firewall](https://www.cloudflare.com/learning/ddos/glossary/web-application-firewall-waf/) and [DDoS mitigation](https://www.cloudflare.com/learning/ddos/ddos-mitigation/), all of which relies on the same underlying foundation: DNS.

We use this same network to deliver a comprehensive ZTWA solution that is easy to manage for administrators and adheres to the core tenets of the Internet. ZTWA is how we make private applications feel like SaaS applications for your users.