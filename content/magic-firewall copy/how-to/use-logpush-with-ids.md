---
title: Use Logpush with IDS
pcx_content_type: concept
---

# Configure a Logpush Destination

First consult the [Logpush Destination docs](/logs/get-started/api-configuration#destination) to see what destinations logpush supports. After picking a destination, the docs will also show how to correctly format the destination URL for Logpush.

Next, follow the [Manage Lopush with cURL](/logs/tutorials/examples/example-logpush-curl) tutorial to validate your Logpush destination and define a Logpush job. 

A few notes on using Logpush with IDS:

- Magic IDS is an account-scoped dataset. This means the string `/zone/<ZONE_ID>` in the Cloudflare API URLs in the tutorial should be replaced with `/account/<ACCOUNT_ID>`.

- Consult the [Magic IDS Detection fields doc](/logs/reference/log-fields/account/magic_ids_detections) to know what fields you want configured for the job.

- When creating the Logpush job, the dataset field should equal `magic_ids_detections`.

- Timestamps by default are unixnano. Consult the [Logpush Options docs](/logs/get-started/api-configuration#options) to see what format you can choose that will be compatible with your destination and/or expectations. Note that all options must be added *after* all fields you want from the Logpush job, akin to URL parameters.