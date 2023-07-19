---
title: Enable BigQuery
pcx_content_type: how-to
weight: 62
meta:
  title: Enable Logpush to BigQuery
---

# Enable Logpush to BigQuery

Configure Logpush to send batches of Cloudflare logs to BigQuery.

BigQuery supports loading up to 1,500 jobs per table per day (including failures) with up to 10 million files in each load. That means you can load into BigQuery once per minute and include up to 10 million files in a load. For more information, refer to BigQuery's quotas for load jobs.

Logpush delivers batches of logs as soon as possible, which means you could receive more than one batch of files per minute. Ensure your BigQuery job is configured to ingest files on a given time interval, like every minute, as opposed to when files are received. Ingesting files into BigQuery as each Logpush file is received could exhaust your BigQuery quota quickly.

For an example of how to set up a schedule job load with BigQuery, refer to [Cloudflare + Google Cloud | Integrations repository](https://github.com/cloudflare/cloudflare-gcp/tree/master/logpush-to-bigquery).
