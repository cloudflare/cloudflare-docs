---
title: Customize Cloudflare security
pcx_content_type: learning-unit
weight: 3
layout: learning-unit
---

Another way of reducing origin traffic is customizing the Cloudflare WAF and other security features. The fewer malicious requests that reach your application, the fewer that could reach (and overwhelm) your origin.

To reduce incoming malicious requests, you could:

- Create [WAF custom rules](/waf/custom-rules/) for protection based on specific aspects of incoming requests.
- Adjust DDoS rules to handle [false negatives and false positives](/ddos-protection/managed-rulesets/adjust-rules/).
- Build [rate limiting rules](/waf/rate-limiting-rules/) to protect against specific patterns of requests.
- Enable [bot protection](/bots/get-started/) or set up [Bot Management for Enterprise](/bots/get-started/bm-subscription/) to protect against automated abuse.
- Explore [network-layer DDoS attack protection](/ddos-protection/managed-rulesets/network/).
- Review the rest of Cloudflare's [security options](/learning-paths/application-security/).