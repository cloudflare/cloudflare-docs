---
pcx_content_type: how-to
title: Client certificate
weight: 3
---

# Client certificate

{{<render file="posture/_available-for-warp-with-gateway.md">}}

The Client Certificate device posture attribute checks if the device has a valid certificate signed by a trusted certificate authority (CA). The posture result can be used in Gateway and Access policies to ensure that the user is connecting from a managed device.

## Prerequisites

You will need a root CA that issues client certificates for your devices. To generate an example root CA for testing, you can use the [Cloudflare PKI toolkit](/cloudflare-one/identity/devices/access-integrations/mutual-tls-authentication/#test-mtls-using-cloudflare-pki).

## Configure the client certificate check

1. {{<render file="_upload-mtls-cert.md">}}

2. In [Zero Trust](https://one.dash.cloudflare.com), go to **Settings** > **WARP Client**.

3. Scroll down to **WARP client checks** and select **Add new**.

4. Select **Client certificate**.

5. You will be prompted for the following information:

   1. **Name**: Enter a unique name for this device posture check.
   2. **Operating system**: Select your operating system.
   3. **Certificate ID**: Enter the UUID of the root CA.
   4. **Common name**: Enter the common name of the client certificate (not the root CA).

6. Select **Save**.

Next, go to **Logs** > **Posture** and verify that the client certificate check is returning the expected results.

## How WARP checks for a client certificate

Learn how the WARP client determines if a valid client certificate exists in the system store.

### macOS

### Linux

### Windows
