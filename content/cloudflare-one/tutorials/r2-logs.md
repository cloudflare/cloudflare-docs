---
updated: 2023-11-30
category: 🔐 Zero Trust
difficulty: Beginner
pcx_content_type: tutorial
title: Use Cloudflare R2 as a Zero Trust log destination
---

# Use Cloudflare R2 as a Zero Trust log destination

{{<Aside type="note">}}

Only available on Zero Trust Enterprise plans.

{{</Aside>}}

This tutorial covers how to build a [Cloudflare R2 bucket](/r2/buckets/) to store logs, and how to connect the bucket to the Zero Trust [Logpush service](/cloudflare-one/insights/logs/logpush/) to store logs persistently and export them into other tools.

{{<tutorial>}}

{{<tutorial-prereqs>}}

- Ensure Cloudflare R2 and the Zero Trust Logpush integration are included in your plan. For more information, contact your account team.

{{</tutorial-prereqs>}}

{{<tutorial-step title="Create a Cloudflare R2 bucket">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account. Go to **R2** > **Overview**.
2. Select **Create bucket**.
3. Enter an identifiable name for the bucket, then select **Create bucket**.

{{</tutorial-step>}}

{{<tutorial-step title="Create an R2 API token">}}

1. Return to **R2**, then select **Manage R2 API tokens**.
2. Select **Create API token**.
3. In **Permissions**, select **Object Read & Write**.
4. In **Specify bucket(s)**, choose _Apply to specific buckets only_. Select the bucket you created.
5. Configure other token settings to your preferences.
6. Select **Create API Token**.
7. Copy the **Access Key ID**, **Secret Access Key**, and endpoint URL values. You will not be able to access these values again.
8. Select **Finish**.

{{</tutorial-step>}}

{{<tutorial-step title="Connect a Zero Trust Logpush job">}}

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Logs** > **Logpush**.
2. Select **Connect a service**.
3. Choose which data sets and fields you want to send to your bucket. Select **Next**.
4. Select **S3 Compatible**.
5. In **S3 Compatible Bucket Path**, enter the name of your bucket.
6. In **Bucket region**, enter `auto`.
7. Enter the values for **Access Key ID**, **Secret Access Key**, and **Endpoint URL** in their corresponding fields.
8. Select **Push**. If prompted, you do not need to prove ownership with a token challenge.

The Logpush job will send the selected Zero Trust logs to your R2 bucket.

{{</tutorial-step>}}

{{</tutorial>}}
