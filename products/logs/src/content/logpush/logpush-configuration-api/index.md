---
title: Manage via the Logpush API
weight: 50
---

The **Cloudflare Logpush API** allows you to configure and manage jobs via create, retrieve, update, and delete operations (CRUD).

With Logpush, you can create a job to upload logs of your HTTP requests or Spectrum events every 5 minutes to your cloud service provider. The API allows one job per data set per domain.

To get started:

1. Set up a storage provider and grant Cloudflare access. For specific instructions:

   - [Enable Amazon S3](/logs/logpush/aws-s3/)
   - [Enable Google Cloud Storage](/logs/logpush/google-cloud-storage/)
   - [Enabled Microsoft Azure](/logs/logpush/azure/)
   - [Enable Sumo Logic](/logs/logpush/sumo-logic/)

2. Have your Cloudflare API credentials and other information handy, including:

   - Email address
   - Cloudflare API key
   - Zone ID
   - Destination access details for your cloud service provider

Next, to configure your Logpush job via the API, consult the following resources:

- [Understanding the Logpush API](/logs/logpush/logpush-configuration-api/understanding-logpush-api/)
- [Tutorial - Manage Logpush with cURL](/logs/tutorials/tutorial-logpush-curl/)
- [Example - Logpush using Python](/logs/tutorials/example-logpush-python/)
