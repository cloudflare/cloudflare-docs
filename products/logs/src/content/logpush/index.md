---
title: Logpush Service
order: 40
---

# Logpush Service

Have logs of your HTTP requests or Spectrum events pushed to your cloud service in batches as soon as possible.

If you're already using the Logpull API to download HTTP request logs, you can get the same functionality—including selecting fields and sampling—in Logpush.

Logpush can be configured using one of the following methods:

- [Cloudflare UI (Dashboard)](/logpush/logpush-dashboard/)
- [Cloudflare Logpush API](/logpush/logpush-configuration-api/)

If following the UI method, you'll be prompted to allow Cloudflare to access your cloud service. You can also do this beforehand:

- [Enable Amazon S3](/logpush/aws-s3/)
- [Enable Google Cloud Storage](/logpush/google-cloud-storage/)
- [Enable Microsoft Azure](/logpush/azure/)
- [Enable Sumo Logic](/logpush/sumo-logic/)

Currently, Logpush is available to customers on the Cloudflare Enterprise plan and for the following services: Amazon S3, Google Cloud Storage (GCS), Microsoft Azure, and Sumo Logic. Customers using IBM Cloud Internet Services (CIS) on Enterprise accounts, powered by Cloudflare, can have their logs pushed to IBM's Cloud Object Storage (COS).

Cloudflare aims to support additional plans and services in the future. Interested in a particular service? Please take this [survey](https://goo.gl/forms/0KpMfae63WMPjBmD2).
