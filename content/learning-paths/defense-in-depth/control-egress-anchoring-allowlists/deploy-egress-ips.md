---
title: Deploy egress IPs the right way
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

When you turn on dedicated egress IPs for your account, Cloudflare will automatically balance all of your user traffic between your IPs depending on a few factors, including your user's physical location and the location of the resource that they are currently requesting. For example, if you have egress IP locations in Amsterdam, London, and Washington, D.C. and have not configured any policies, Cloudflare will assign the following egress IPs to your users:

- Amsterdam egress IP to users near the Netherlands
- London egress IP to users near England
- Washington, D.C. egress IP to users in North America

Because of Cloudflare's network design, your users will still take the fastest possible route on the Cloudflare network to reach their destination. The addition of an egress IP will add minimal latency in most scenarios.

## Geographic distribution

Cloudflare recommends reserving distributed IPs in areas that most accurately match your users' physical locations. For example, if all of your users are in North America, you should consider a series of IPs in various North American data centers to ensure redundancy and performance for all of your users.

You should also reserve multiple egress IPs if you have locations that need explicit egress. For example, if you have users who need to egress out of London and cannot fall back to Dublin, you will need to deploy multiple IPs in various London locations to ensure redundancy. Separately, you would need to build a policy relevant to all users with this requirement to ensure all of their traffic egresses with one of your London egress IPs.
