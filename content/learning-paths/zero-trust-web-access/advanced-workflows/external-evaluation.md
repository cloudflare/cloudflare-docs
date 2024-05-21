---
title: External Evaluation rules
pcx_content_type: overview
weight: 1
layout: learning-unit
---

With Cloudflare Access, you can build infinitely customizable policies using External Evaluation rules. External Evaluation rules allow you to call any API during the evaluation of an Access policy and authenticate users based on custom business logic. Example use cases include:

- Customize policies based on time of day.
- Check IP addresses against external threat feeds.
- Call industry-specific user registries.

The External Evaluation rule requires two values: an API endpoint to call and a key to verify that any request response is coming from a trusted source. After the user authenticates with your identity provider, all information about the user, device and location is passed to your external API. The API returns a pass or fail response to Access which will then either allow or deny access to the user.

## Set up External Evaluation rule

For detailed setup instructions, refer to [External Evaluation rules](/cloudflare-one/policies/access/external-evaluation/).

Example code for the API is available in our [open-source repository](https://github.com/cloudflare/workers-access-external-auth-example).
