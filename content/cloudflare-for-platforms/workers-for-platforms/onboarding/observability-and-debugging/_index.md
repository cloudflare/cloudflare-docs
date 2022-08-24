---
pcx_content_type: overview
title: Observability and debugging
weight: 4
---

# Observability and debugging

When you have developers building on your platform, you will want to give them to tools to be able to understand and debug errors, or unexpected behavior. Workers for Platforms provides a few tools to help developers do so:

* [Logpush](/cloudflare-for-platforms/cloudflare-for-saas/workers-for-platforms/onboarding/observability-and-debugging/logpush/) can help send logs to your existing logging system. You should use Logpush for:
    * Capturing historical errors
    * Aggregating metrics you may want to expose to your customer, like number of innovations, etc
    * Getting CPU data from a Worker
* [Trace Workers](/cloudflare-for-platforms/cloudflare-for-saas/workers-for-platforms/onboarding/observability-and-debugging/trace-workers/) are great for giving your developers real-time feedback by allowing a Worker, that can collect metadata such as errors and console logs, to run after their Worker. You may define your own logic to then send this information to your own dashboard or CLI for a live debugging experience.