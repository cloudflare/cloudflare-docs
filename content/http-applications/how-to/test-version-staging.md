---
title: Test configurations
pcx_content_type: how-to
weight: 3
---

# Test configurations in staging

Once you [create a routing rule](/http-applications/how-to/manage-routing-rules/#create-routing-rules) that applies a version's settings to **Staging**, you then need to send test traffic to your staging environment.

To prevent your staging rules from affecting live traffic, these rules are only triggered when requests come in to specific IP addresses.

To trigger staging rules:

1. When you [create or edit](/http-applications/how-to/manage-routing-rules/) a routing rule for **Staging**, copy the staging IPs listed under **Rule Type**:

   - `162.159.133.39`
   - `162.159.134.39`

2. On your device, [modify your hosts file](https://docs.rackspace.com/support/how-to/modify-your-hosts-file/) to send requests to specific IP addresses.
3. Go to the hostnames associated with your routing rules and test out your configuration changes.
