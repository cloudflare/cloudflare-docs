---
title: China Express
pcx_content_type: concept
weight: 4
---

# China Express

China Express is a suite of connectivity and performance offerings designed to simplify connectivity and improve stability for users in China. It also makes Cloudflare Zero Trust products (WARP, Magic WAN) working in China. China Network is provided by our partners CMI, CBC and JD Cloud.

## When to use

To understand these better, let’s take an example of Acme Corp, a global company with offices in Shanghai and Beijing — with origin data centers in London and Ashburn. And let’s see how we can help their infrastructure teams better serve employees and users in mainland China.

### A. Caching Dynamic content from Origin out of Mainland China

Cloudflare [China Network](/china-network/) provides [caching](/cache/) on JD Cloud data centers to serve the clients in China. If your origin has dynamic content which can't be cached, it will trigger frequent original-pull requests. And if the origin is out of Mainland China, the responses will often meet latency and instability. So in such case the clients' experience in China is often compromised.

China Express is an optimized, high-quality public Internet connectivity. With this service, traffic from mainland China will arrive at our partner data center in Hong Kong (or other location per customer's requirement).

Acme Corp can use China Express to improve origin stability for their dynamic content caching in mainland China. Requests to the origin data centers in Ashburn and London would traverse the China Express, which offers lower packet loss and more bandwidth.

### B. Cloudflare One WARP and Magic WAN use in Mainland China

We are extending [Cloudflare One](/cloudflare-one/), our [Zero Trust](/reference-architecture/architectures/sase/) network-as-a-service product, to mainland China through our China Express partners. [WARP client](/warp-client/) and [Magic WAN](/magic-wan/) can setup connection via China Express.

Acme Corp will now be able to ensure their employees both inside and outside Mainland China will be able to use consistent zero trust security policy using the Cloudflare WARP device client. In addition, they will be able to connect their physical offices in China to their global private WAN using Magic WAN with consistent security policies applied globally.

### C. China Express Travel SIM for business travel with Zero Trust security

Cloudflare is pleased to announce that the Travel SIM provided by Cloudflare’s partner CMI automatically provides network connectivity and can be used together with the Cloudflare WARP Client on mobile devices to provide Cloudflare’s suite of Zero Trust security services.

Acme Corp might have employees visiting China on a regular basis and need access to their corporate apps on their mobile devices including phones and tablets. Their IT teams not only have to procure and provision mobile Internet connectivity for their users, but also enforce consistent Zero Trust security controls.

## General process

### Step 1. Prerequisites
Ensure that you have a Cloudflare Enterprise plan with China Network enabled or WARP seats, Magic WAN license deployed.

### Step 2. Contracting
Now you are required to sign a contract with the China Express partner. Please reach out to your Cloudflare sales team.

### Step 3. Deployment
Our China Express partner will assist you to deploy China Express.