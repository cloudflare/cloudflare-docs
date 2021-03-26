---
title: Logpush Service
order: 40
---

# Logpush Service

## Overview

Push logs of your HTTP requests, Spectrum events, or Firewall events to your cloud service in batches as soon as possible. Logpush is available to customers on Cloudflare's Enterprise plan.

Cloudflare pushes logs approximately every 100000 records or 30 seconds, whichever comes first. Keep in mind that these numbers are an estimate - logs are pushed more frequently when possible.  

Prior to mid-2020, Logpush sent logs once every five minutes (referred to as Logpush v1). The change to more frequent log pushing allows Cloudflare to deliver information to you as close to real time as possible in smaller files. You may receive log files that contain fewer lines - that’s expected. 

All Logpush jobs created after mid-2020 deliver logs as frequently as possible. If you have legacy Logpush jobs configured to the old settings, use the [Logpush API](https://api.cloudflare.com/#logpush) to upgrade your job to Logpush v2.  

## Get started
Configure Logpush using the [Cloudflare UI (Dashboard)](/logpush/logpush-dashboard/) or [API](/logpush/logpush-configuration-api/).

If enabling via the API, you can push to the following storage services:
- [AWS S3](/logpush/aws-s3/)
- [S3-compatible endpoints](/logpush/s3-compatible-endpoints)
- [Google Cloud Storage](/logpush/google-cloud-storage/)
- [Microsoft Azure Blob Storage](/logpush/azure/)

You also can push to the following SIEMs and log management providers:
- [Datadog](/logpush/datadog)
- [Splunk](/logpush/splunk)
- [Sumo Logic](/logpush/sumo-logic/)

Cloudflare aims to support additional plans and services in the future. Interested in a particular service? Take this [survey](https://goo.gl/forms/0KpMfae63WMPjBmD2).
