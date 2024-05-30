---
title: 2024-05-30 - Updates to Logpush's User-Agent
pcx_content_type: overview
weight: 300
---

# 2024-05-30 - Logpush User-Agent

## Summary

Starting on July 10, 2024, Cloudflare Logpush will begin updating the [User-Agent request header](https://developer.mozilla.org/en-US/docs/Web/HTTP/Headers/User-Agent) used to make HTTP requests to your destination. We will be replacing the existing User-Agent header values of `Go-http-client/1.1` and `Go-http-client/2.0` with the value of `Cloudflare-Logpush/1.0`. While this change is being rolled out, you may see any Logpush traffic from any of the three User-Agents mentioned.

## What destination types does this affect?

This affects any destination type enforcing the value of the User-Agent header on incoming HTTP requests. This change should have no impact to jobs with an object store as its destination.

## What action do I need to take?

For most jobs, this change should be transparent. However, if your Logpush destination expects or enforces the specific User-Agent values of `Go-http-client/1.1` or `Go-http-client/2.0`, you will need to adjust your rules accordingly to also allow the value of `Cloudflare-Logpush/1.0`.

If your rules are not updated before July 10, 2024, Logpush may be unable to continue pushing logs to your destination. If we are unable to reach your destination for more than 24 hours, your job will be disabled.

Please note, User-Agent values are easily spoofed and should not be used as a form of authentication or authorization for your destination.
