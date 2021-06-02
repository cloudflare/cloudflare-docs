---
order: 2
---

# Azure

Follow this quick guide to start using 1.1.1.1 on Microsoft  Azure.

<Aside>

**Note:** Entering static IP addresses while setting up 1.1.1.1 may prevent you from connecting to some public Wi-Fi networks that use captive portals.

</Aside>


1. Log into your Azure portal.

1. From the Azure portal side menu, select **Virtual Networks**.

1. Navigate to the virtual network associated with your virtual machine (VM).

1. Select **DNS Servers** > **Custom**, and add two entries:

    ```txt
    1.1.1.1
    1.0.0.1
    ```

1. Click **Save**.