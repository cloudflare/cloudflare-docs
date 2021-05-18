---
title: Get started
order: 41
pcx-content-type: concept
---

# Get started
Before enabling Logpush, ensure you [grant Cloudflare access](/logs/logpush/enable-destinations/) to push to your storage service, SIEM, or log management provider.

Once you've set up the connection between your destination and Cloudflare, configure Logpush using the [Cloudflare UI (Dashboard)](/logpush/logpush-dashboard/) or [API](/logpush/logpush-configuration-api/).

If enabling via the API, you can push to the following storage services:
- [AWS S3](/logs/logpush/aws-s3/)
- [S3-compatible endpoints](/logs/logpush/s3-compatible-endpoints)
- [Google Cloud Storage](/logs/logpush/google-cloud-storage/)
- [Microsoft Azure Blob Storage](/logs/logpush/azure/)

You also can push to the following SIEMs and log management providers:
- [Datadog](/logs/logpush/datadog)
- [Splunk](/logs/logpush/splunk)
- [Sumo Logic](/logs/logpush/sumo-logic/)

Cloudflare aims to support additional plans and services in the future. Interested in a particular service? Take this [survey](https://goo.gl/forms/0KpMfae63WMPjBmD2).