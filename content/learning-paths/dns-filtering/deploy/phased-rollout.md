---
title: Deploy in stages
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

You are now ready to deploy the WARP client to your users. To ensure a smooth deployment, we recommend making incremental changes and testing after every change. Note that third-party DNS filtering software must be uninstalled before installing WARP.

1. Using your MDM tool, uninstall third-party DNS software and install the WARP client on a single user device.
2. [Verify connectivity](/learning-paths/dns-filtering/connect-devices/verify-connectivity/) in your Gateway DNS logs.
3. [Migrate](/learning-paths/dns-filtering/deploy/policy-migration/) top priority (P1) policies from the third-party DNS filtering provider.
4. Deploy the WARP client to a few more devices that represent a broad set of configurations within your organization. For example, you could include devices from a variety of departments such as Engineering, Human Resources, and IT.
5. Verify connectivity for these devices.
6. Migrate the rest of your policies.
7. Once everything is working, deploy the WARP client to the rest of your organization.

You can see which devices have enrolled by going to **My Team** > **Devices**.