---
title: Enable Microsoft Azure
pcx_content_type: how-to
weight: 63
meta:
  title: Enable Logpush to Microsoft Azure
---

# Enable Logpush to Microsoft Azure

Cloudflare Logpush supports pushing logs directly to Microsoft Azure via the Cloudflare dashboard or via API.

## Manage via the Cloudflare dashboard

{{<render file="_enable-logpush-job.md">}}

5. In **Select a destination**, choose **Microsoft Azure**.

6. Enter or select the following destination details:
    - **SAS URL** - a pre-signed URL that grants access to Azure Storage resources. Refer to [Azure storage documentation](https://learn.microsoft.com/en-us/azure/storage/storage-explorer/vs-azure-tools-storage-manage-with-storage-explorer?tabs=macos#shared-access-signature-sas-url) for more information on generating a SAS URL using Azure Storage Explorer.
    - **Path** - bucket location within the storage container
    - **Organize logs into daily subfolders** (recommended) 

When you are done entering the destination details, select **Continue**.

7. To prove ownership, Cloudflare will send a file to your designated destination. To find the token, select the **Open** button in the **Overview** tab of the ownership challenge file, then paste it into the Cloudflare dashboard to verify your access to the bucket. Enter the **Ownership Token** and select **Continue**.

8. Select the dataset to push to the storage service.

9. In the next step, you need to configure your logpush job:
    - Enter the **Job name**.
    - Under **If logs match**, you can select the events to include and/or remove from your logs. Refer to [Filters](/logs/reference/filters/) for more information. Not all datasets have this option available.
    - In **Send the following fields**, you can choose to either push all logs to your storage destination or selectively choose which logs you want to push.

10. In **Advanced Options**, you can:
    - Choose the format of timestamp fields in your logs (`RFC3339`(default),`Unix`, or `UnixNano`).
    - Select a [sampling rate](/logs/get-started/api-configuration/#sampling-rate) for your logs or push a randomly-sampled percentage of logs.
    - Enable redaction for `CVE-2021-44228`. This option will replace every occurrence of `${` with `x{`.

11. Select **Submit** once you are done configuring your logpush job.

## Create and get access to a Blob Storage container

Cloudflare uses a shared access signature (SAS) token to gain access to your Blob Storage container. You will need to provide `Write` permission and an expiration period of at least five years, which will allow you to not worry about the SAS token expiring.

{{<render file="_enable-read-permissions.md">}}
<br/>

To enable Logpush to Azure:

1. Create a Blob Storage container. Refer to [instructions from Azure](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal).

2. Create a [shared access signature (SAS)](https://learn.microsoft.com/en-us/azure/storage/common/storage-sas-overview) to secure and restrict access to your blob storage container. Use [Storage Explorer](https://learn.microsoft.com/en-us/azure/storage/storage-explorer/vs-azure-tools-storage-manage-with-storage-explorer) to navigate to your container and right click to create a signature. Set the signature to expire at least five years from now and only provide write permission.

3. Provide the SAS URL when prompted by the Logpush API or UI.

{{<Aside type="note" header="Note">}}

Logpush will stop pushing logs if your SAS token expires, which is why an expiration period of at least five years is required. The renewal for your SAS token needs to be done via API, updating the `destination_conf` parameter in your Logpush job.

{{</Aside>}}
