---
order:
title: Azure
pcx-content-type: how-to
---

# Set up 1.1.1.1 - Azure

Follow these steps to configure 1.1.1.1:

1. Log in to your Azure portal.
1. From the Azure portal side menu, select **Virtual Networks**.
1. Navigate to the virtual network associated with your virtual machine (VM).
1. Select **DNS Servers** > **Custom**, and add two entries:

    ```txt
    1.1.1.1
    1.0.0.1
    ```

1. Click **Save**.