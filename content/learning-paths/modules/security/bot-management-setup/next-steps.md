---
title: Next steps
pcx_content_type: learning-unit
weight: 7
layout: learning-unit
---

After you create a few firewall rules with [Bot management variables](/bots/reference/bot-management-variables/), you should continue evaluating the performance and thoroughness of your rules:

- Regularly review [Bot analytics](/bots/bot-analytics/bm-subscription/), [Security events](/waf/security-events/paid-plans/), each rule's [Challenge solve rate](/bots/concepts/challenge-solve-rate/), and [Cloudflare logs](/logs/about/).
- When you notice false positives or false negatives, [submit a Bot feedback report](/bots/concepts/feedback-loop/).
- Explore combining bot management variables with [Rate limiting rules](/waf/rate-limiting-rules/) or [Cloudflare Workers](/workers/runtime-apis/request/#incomingrequestcfproperties).