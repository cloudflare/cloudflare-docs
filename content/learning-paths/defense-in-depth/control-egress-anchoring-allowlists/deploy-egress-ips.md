---
title: Deploy egress IPs in the right way
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

When you turn on dedicated egress IPs for your account, all of your user traffic will automatically be balanced between them depending on a few factors including your user's physical location and the location of the resource that they are currently requesting. For instance, if you have no policies in place, and egress IP locations in Amsterdam, London, and Washington DC, users in the Netherlands will pick up an IP in Amsterdam, users near England will pick up an IP in London, and users in North America will have their egress applied in Washington DC. Because of Cloudflare's network design, your users will still take the fastest possible route on the Cloudflare network to reach their destination, and the addition of an egress IP will add minimal, negligible latency in most scenarios.

We recommend having distributed IPs in areas that most accurately match your users physical locations; if all your users are in North America, you should consider a series of IPs in various North American datacenters to ensure redundancy and performance for all your users. If you have locations that need 'explicit' egress (IE, users who need to egress out of London cannot fall back to Dublin if the London IP is offline for whatever reason), then you will need to deploy multiple IPs in various London locations to ensure redundancy. Separately, you would need to build a policy relevant to all users with this requirement to ensure all of their traffic egresses with one of your London egress IPs.
