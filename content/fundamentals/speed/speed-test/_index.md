---
pcx_content_type: overview
title: Speed test
weight: 1
---

# Speed test

Speed test uses synthetic tests and real user data from browsers to assess the performance of your website. These metrics provide different types of insights into your website’s performance. Cloudflare then uses the analysis run by Speed test to recommend optimizations with the tools that best suit your performance issues.

## Synthetic tests

As its name suggests, synthetic testing uses servers to simulate the conditions that a user might encounter when accessing your website. This has the advantage of being consistent, as the conditions are easily replicated each time the test is run. It also allows you to have an analysis of how a code change might affect the overall performance of your website, as well as test any URL you want. However, due to its synthetic nature, it cannot replicate the breadth and diversity of different conditions that real users will experience.

## Real user monitoring (RUM)

Real user monitoring (also known as RUM), on the other hand, captures real metrics from real users accessing a website. This provides information that synthetic tests cannot capture, as users might access your website from different parts of the world, with different network conditions, ISPs, browsers and computer hardware. However, RUM data is only applied to your own website. Real user data also includes two user interaction metrics that synthetic tests do not offer - [First Input Delay (FID)](/fundamentals/speed/speed-test/run-speed-test/#first-input-delay-fid) and [Interaction to Next Paint (INP)](/fundamentals/speed/speed-test/run-speed-test/#interaction-to-next-paint-inp).

{{<button-group>}}
  {{<button type="primary" href="/fundamentals/speed/speed-test/run-speed-test/">}}Run Speed test{{</button>}}
{{</button-group>}}

