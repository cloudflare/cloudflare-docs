---
pcx_content_type: concept
title: Challenge Solve Rate (CSR)
weight: 2
---

# Challenge Solve Rate (CSR)

{{<render file="_challenge-solve-rate.md">}}

You can find the CSR of a rule by going to its corresponding dashboard page:

* For firewall rules, go to **Security** > **WAF** > **Firewall rules**.
* For custom rules, go to **Security** > **WAF** > **Custom rules**.
* For rate limiting rules, go to **Security** > **WAF** > **Rate limiting rules**.

## Common scenarios

{{<render file="_challenge-solve-recommendations.md">}}

Rules in Challenge mode will start generating a Captcha Solve Rate data (CSR) which indicates the falsepositive percentage. Historically, Bot Management users see a false positive rate of less than 1%. If you see arate higher than 3%; you should consider lowering your threshold in small increments (3-5 points at a time) until it drops.