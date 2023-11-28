---
updated: 2023-11-27
category: 🔐 Zero Trust
difficulty: Beginner
pcx_content_type: tutorial
title: Use Cloudflare R2 as a Zero Trust log destination
---

# Use Cloudflare R2 as a Zero Trust log destination

This tutorial covers how to build an [R2 bucket](/r2/buckets/) to store logs in, and connect it to the Zero Trust logpush function in the Zero Trust dashboard to have persistent log storage that could then be ingested by an SIEM or exported into another tool.

---

{{<tutorial>}}

{{<tutorial-prereqs>}}

- Add Cloudflare R2 to your plan
- Add Logpush to your plan

{{</tutorial-prereqs>}}

{{<tutorial-step title="Create a Cloudflare R2 bucket">}}

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account. Go to **R2**.
2. Select **Create bucket**.
3. Enter an identifiable name for the bucket, then select **Create bucket**.

{{</tutorial-step>}}

{{<tutorial-step title="Create an API Token">}}

1. Return to R2, then select **Manage R2 API tokens**.
2. Select **Create API token**.
3. In **Permissions**, select **Object Read & Write**.
4. In **Specify bucket(s)**, select the bucket you created.
5. Configure other settings, such as TTL, to your preferences.
6. Select **Create API Token**.
7. Make note of the **Access Key ID**, **Secret Access Key**, and endpoint URL values.
8. Select **Finish**.

{{</tutorial-step>}}

{{<tutorial-step title="Configure Zero Trust logs">}}

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Logs** > **Logpush**.
2. Select **Connect a service**.
3. Configure which data sets and fields you want sent to R2. Select **Next**.
4. Select **S3 Compatible**.
5. Enter an identifiable name for the Logpush job. In **Bucket region**, enter `auto`.
6. Enter the values for **Access Key ID**, **Secret Access Key**, and **Endpoint URL** in their corresponding fields.
7. Select **Send token**.

Your Logpush job is now set up with Cloudflare R2. You do not need to prove ownership with a token challenge for connections between Cloudflare services.

{{</tutorial-step>}}

{{</tutorial>}}
