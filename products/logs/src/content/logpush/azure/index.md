---
title: Enable Microsoft Azure
order: 62
---

# Enable Microsoft Azure

Cloudflare uses a service-level shared access signature (SAS) to gain access to your Blob Storage container. You'll need to provide *Write* permission and an expiration period of at least 5 years, which will allow you to not worry about the SAS token expiring.

To enable Logpush to Azure:

1. Create a Blob Storage container. *See [instructions from Azure](https://docs.microsoft.com/en-us/azure/storage/blobs/storage-quickstart-blobs-portal)*.

2. Create a shared access signature (SAS). To learn about shared access signatures, *see [information from Azure](https://docs.microsoft.com/en-us/azure/storage/common/storage-sas-overview)*. Logpush requires a *service-level SAS*, which provides the most restricted access. To create a service-level SAS, *see [instructions from Azure](https://docs.microsoft.com/en-us/rest/api/storageservices/create-service-sas)* or use the *Storage Explorer* feature in your storage account portal. Select *Storage Explorer*, navigate to and then right-click on your blob container to see the *Get Shared Access Signature* option. Select that option, set an expiry time of at least 5 years, and select only *Write* permission.

3. Provide the SAS URL when prompted by the Logpush API or UI.

<Aside type="note" header="Note">

Logpush will stop pushing logs if your SAS token expires, which is why an expiration period of at least 5 years is required. You can always update your Logpush job with a new token if needed.
</Aside>
