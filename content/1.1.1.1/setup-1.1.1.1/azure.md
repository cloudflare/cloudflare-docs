---
title: Azure
pcx-content-type: how-to
weight: 0
meta:
  title: Set up 1.1.1.1 - Azure
---

# Set up 1.1.1.1 - Azure

Follow these steps to configure 1.1.1.1:

1.  Log in to your Azure portal.

2.  From the Azure portal side menu, select **Virtual Networks**.

3.  Navigate to the virtual network associated with your virtual machine (VM).

4.  Select **DNS Servers** > **Custom**, and add two entries:

    ```txt
    1.1.1.1
    1.0.0.1
    ```

5.  Click **Save**.
