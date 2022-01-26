---
title: Enable other providers
order: 65
pcx-content-type: how-to
---

import EnableReadPermissions from "../../../_partials/_enable-read-permissions.md"

# Enable Logpush to other providers

Cloudflare Logpush supports pushing logs to a limited set of services providers. However, you can configure Logpush via API.

## Manage via the Cloudflare dashboard

Refer to [Enable destinations](/get-started/enable-destinations/) for the list of services you can configure to use with Logpush through the Cloudflare dashboard. Interested in a different service? Take this [survey](https://docs.google.com/forms/d/e/1FAIpQLScwOSabROywVajpMX2ZYCVl3saYs11cP4NIC8QR-wmOAnxOtA/viewform).

## Manage via API

The Cloudflare Logpush API allows you to configure and manage jobs via create, retrieve, update, and delete operations (CRUD).

With Logpush, you can create a job to upload logs of the metadata Cloudflare collects in batches as soon as possible to your cloud service provider. The API allows one job per dataset per domain.

<EnableReadPermissions/>

To get started:

1. Set up a storage provider and grant Cloudflare access. Your storage provider may request your Cloudflare API credentials and other information including:
   - Email address
   - Cloudflare API key
   - Zone ID
   - Destination access details for your cloud service provider

1. Configure your Logpush job. For more information on how to configure a Logpush job, refer to [Logpush API configuration](/reference/logpush-api-configuration).