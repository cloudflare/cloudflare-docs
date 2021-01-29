---
title: Manage via the Logpush API
order: 50
---

# Manage via the Logpush API

The **Cloudflare Logpush API** allows you to configure and manage jobs via create, retrieve, update, and delete operations (CRUD).

With Logpush, you can create a job to upload logs of your HTTP requests, Spectrum events, or Firewall events in batches as soon as possible to your cloud service provider. The API allows one job per data set per domain.

To get started:

1. Set up a storage provider and grant Cloudflare access. For specific instructions:

   - [Enable Amazon S3](/logpush/aws-s3/)
   - [Enable Google Cloud Storage](/logpush/google-cloud-storage/)
   - [Enable Microsoft Azure](/logpush/azure/)
   - [Enable Sumo Logic](/logpush/sumo-logic/)
   - [Enable S3-compatible endpoints](/logpush/s3-compatible-endpoints/)

2. Have your Cloudflare API credentials and other information handy, including:

   - Email address
   - Cloudflare API key
   - Zone ID
   - Destination access details for your cloud service provider

Next, to configure your Logpush job via the API, consult the following resources:

- [Understanding the Logpush API](/logpush/logpush-configuration-api/understanding-logpush-api/)
- [Tutorial - Manage Logpush with cURL](/tutorials/tutorial-logpush-curl/)
- [Example - Logpush using Python](/tutorials/example-logpush-python/)
