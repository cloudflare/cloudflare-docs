---
title: Legal
pcx_content_type: reference
weight: 2
---

# Legal

Privacy Gateway is a managed gateway service deployed on Cloudflare’s edge network that implements the Oblivious HTTP IETF standard to improve client privacy when connecting to an application backend.

OHTTP introduces a trusted third party (Cloudflare in this case) between client and server, called a relay, whose purpose is to forward requests from client to server, and likewise to forward responses from server to client. These messages are encrypted between client and server such that the relay learns nothing of the application data, beyond the server the client is interacting with.

The Privacy Gateway service follows [Cloudflare’s privacy policy](https://www.cloudflare.com/privacypolicy/).

## What Cloudflare sees

While Cloudflare will never see the contents of the encrypted application HTTP request proxied through the service, because the client will first connect to the Privacy Gateway service, Cloudflare will see the following information: the connecting device’s IP address, the application service they are using, including its DNS name and IP address, and metadata associated with the request, including the type of browser, device operating system, hardware configuration, and timestamp of the request ("Privacy Gateway Logs").

## What Cloudflare stores

Cloudflare retains the Privacy Gateway Logs information for the most recent quarter plus one month (approximately 124 days).

## What Privacy Gateway customers see

- The application content of requests.
- The IP address and associated metadata of the Cloudflare Privacy Gateway server the request came from.