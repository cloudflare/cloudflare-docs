---
order: 46
pcx-content-type: how-to
---

# Manage via the Logpush API

The **Cloudflare Logpush API** allows you to configure and manage jobs via create, retrieve, update, and delete operations (CRUD).

With Logpush, you can create a job to upload logs of the metadata Cloudflare collects in batches as soon as possible to your cloud service provider. The API allows one job per data set per domain.

To get started:

1. Set up a storage provider and grant Cloudflare access. For specific instructions:

   - [Enable Amazon S3](/logs/get-started/enable-destinations/aws-s3/)
   - [Enable Datadog](/logs/get-started/enable-destinations/datadog/)
   - [Enable Google Cloud Storage](/logs/get-started/enable-destinations/google-cloud-storage/)
   - [Enable Microsoft Azure](/logs/get-started/enable-destinations/azure/)
   - [Enable Splunk](/logs/get-started/enable-destinations/splunk/)
   - [Enable Sumo Logic](/logs/get-started/enable-destinations/sumo-logic/)
   - [Enable S3-compatible endpoints](/logs/get-started/enable-destinations/s3-compatible-endpoints/)

2. Have your Cloudflare API credentials and other information handy, including:

   - Email address
   - Cloudflare API key
   - Zone ID
   - Destination access details for your cloud service provider

Next, to configure your Logpush job via the API, consult the following resources:

<DirectoryListing path="/get-started/logpush-configuration-api"/>