---
title: Logpush Service
order: 40
---

# Logpush Service

Have logs of your HTTP requests, Spectrum events, or Firewall events pushed to your cloud service in batches as soon as possible.

If you're already using the Logpull API to download HTTP request logs, you can get the same functionality—including selecting fields and sampling—in Logpush.

Logpush can be configured using one of the following methods:

- [Cloudflare UI (Dashboard)](/logpush/logpush-dashboard/)
- [Cloudflare Logpush API](/logpush/logpush-configuration-api/)

If following the UI method, you'll be prompted to allow Cloudflare to access your cloud service. You can also do this beforehand:

- [Enable Amazon S3](/logpush/aws-s3/)
- [Enable Google Cloud Storage](/logpush/google-cloud-storage/)
- [Enable Microsoft Azure](/logpush/azure/)
- [Enable Sumo Logic](/logpush/sumo-logic/)

Currently, Logpush is available to customers on the Cloudflare Enterprise plan and for the following services:
- Amazon S3
- Google Cloud Storage (GCS)
- Microsoft Azure
- Sumo Logic
Customers using IBM Cloud Internet Services (CIS) on Enterprise accounts, powered by Cloudflare, can push their logs to [IBM's Cloud Object Storage (COS)](https://cloud.ibm.com/docs/cis?topic=cis-logpush)

Cloudflare Logpush also supports S3-compatible endpoints in an API-only beta, which includes: 
- [Digital Ocean Spaces](https://www.digitalocean.com/docs/spaces/) 
- [Backblaze B2](https://www.backblaze.com/b2/docs/s3_compatible_api.html)
- [Alibaba Cloud OSS](https://www.alibabacloud.com/help/doc-detail/64919.htm#title-37m-7gl-xy2)
- [JD Cloud Object Storage Service](https://docs.jdcloud.com/en/object-storage-service/introduction-2)
- [Oracle Cloud Object Storage](https://docs.cloud.oracle.com/en-us/iaas/Content/Object/Tasks/s3compatibleapi.htm)
- [Linode Object Storage](https://www.linode.com/products/object-storage/)
- On-premise [Ceph Object Gateway](https://docs.ceph.com/en/latest/radosgw/s3/).

See instructions to [Enable S3-compatible endpoints](/logpush/s3-compatible-endpoints).

Cloudflare aims to support additional plans and services in the future. Interested in a particular service? Please take this [survey](https://goo.gl/forms/0KpMfae63WMPjBmD2).
