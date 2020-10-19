---
title: Enable Google Cloud Storage
order: 60
---

# Enable Google Cloud Storage


Cloudflare uses Google Cloud Identity and Access Management (IAM) to gain access to your bucket. The Cloudflare IAM service account needs admin permission for the bucket.

To enable Logpush to GCS:

1. Create a GCS bucket. *See [instructions from GCS](https://cloud.google.com/storage/docs/creating-buckets#storage-create-bucket-console)*.

2. In **Storage** > **Browser** > **Bucket** > **Permissions**, add the member `logpush@cloudflare-data.iam.gserviceaccount.com` with *Storage Object Admin* permission.

<Aside type="note" header="Note">

Logpush will not work if there is a retention policy on your bucket because this policy prevents overwrites. If you're using the policy to enforce deletion, you can use a lifecycle rule instead. *See [object lifecycle management from GCS](https://cloud.google.com/storage/docs/lifecycle)*.
</Aside>
