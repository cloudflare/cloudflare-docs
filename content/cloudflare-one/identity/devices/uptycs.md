---
pcx_content_type: how-to
title: Uptycs
weight: 4
---

# Uptycs

Device posture with Uptycs requires that the Uptycs agent and the Cloudflare WARP client are deployed on your devices. For this integration to function, our service-to-service posture check relies on the **serial_number** being the same in both clients. Follow the instructions below to set up the check.

## Obtain Uptycs Settings

The following Uptycs values are needed to set up the Uptycs posture check:

- Client key
- Client Secret
- Customer ID

## Set up Uptycs

1. Open your Uptycs console.
1. Navigate to **Account Settings** > **API Key**.
1. Generate and download your `.json` file which contains your key, secret and ID.
