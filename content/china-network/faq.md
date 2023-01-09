---
title: FAQ
pcx_content_type: faq
weight: 5
meta:
    description: Review FAQs for Cloudflare's China Network.
---

# FAQ

## Requirements

### What are the requirements to enable the Cloudflare China Network service from Cloudflare?

Refer to [Get started](/china-network/get-started/) for more information.

### Can I use my current account to access the Cloudflare China Network service or do I need a separate account?

Yes, you can use your current Cloudflare account and dashboard.

### What are the requirements for requesting a Cloudflare China Network PoC?

Cloudflare requires that you have a valid [ICP (Internet Content Provider)](/china-network/concepts/icp/) number and content vetting approval from JD Cloud to provide you with a Cloudflare China Network PoC (proof of concept). If you are interested in a PoC, contact your sales team.

## Data storage

### Will my Cloudflare account or configuration information be stored in China?

Cloudflare has taken numerous steps to ensure your security and the integrity of your data in China. Your identification information such as email addresses, password hashes, and billing information are never stored on the Cloudflare China Network or shared with the Cloudflare partner.

## Licensing and onboarding

### Does Cloudflare have an MIIT license to provide CDN services in China?

As a US company, Cloudflare does not have a license from China's Ministry of Industry and Information Technology (MIIT). However, Cloudflare's partner JD Cloud has all the licenses required by the MIIT to operate and provide CDN services in China.

### Can Cloudflare or JD Cloud help me to get the ICP?

No, neither Cloudflare nor JD Cloud is responsible for [ICP (Internet Content Provider)](/china-network/concepts/icp/) applications. Cloudflare recommends you to reach out to local agents specialized in ICP applications.

### Why is my ICP filing/license revoked?

The application and revocation of ICP filings or licenses is managed by China's local authorities. Usually either the customer or the agency processing the ICP application receive a notification with more details. Cloudflare cannot provide the ICP revocation reasons.

### What would happen if my ICP filing/license got revoked?

Cloudflare's partner JD Cloud and the local authorities continuously track the status of the ICP. If your ICP gets revoked, JD Cloud may terminate or suspend your access to the China Service at any time and without liability, in accordance with China local regulations.
To mitigate the impact on your Internet properties, Cloudflare would reroute the traffic for the affected domains to the nearest data centers outside of China.

### What is content vetting and why do I need JD Cloud to vet my domain's content before onboarding?

The JD Cloud network is proxying content inside of China for customers who have purchased the Cloudflare China Network subscription. To ensure compliance with China’s regulation on Internet information services and with [JD Cloud's service terms](https://docs.jdcloud.com/cn/product-service-agreement/starshield-terms-of-service), JD Cloud must review the content of all the domains before onboarding those domains to their network. They can approve or reject any domain based on the nature of its content. For more information, contact your sales team.

## Technical questions

### How does IPv6 work on the Cloudflare China Network?

All sites hosted in mainland China must have IPv6 enabled. The Cloudflare China Network feature automatically enables IPv6 for domains to fulfill this requirement and it is not possible to disable it. According to Cloudflare's tests, IPv6 connections in mainland China are more reliable and offer better latency.

## Other services

### Can Cloudflare provide a private line for cross-border traffic?

No. Cloudflare is not licensed to provide such cross-border private line service.
