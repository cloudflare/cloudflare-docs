---
title: Traffic filters
pcx_content_type: reference
weight: 3
---

# Traffic filters

When you [create an environment](/version-management/how-to/environments/#create-environment), you specify a traffic filter for that environment. This filter ensures that all traffic reaching the environment - and, by extension, the configuration changes associated with the environment's version - is intentional.

To send traffic to a specific environment, send requests to your zone that match the pattern specified in your filter. These could be characteristics such as **Edge Server IP**, **Cookie**, **Hostname**, or **User Agent**.

To make sure requests are reaching an environment, review the [Metrics](/version-management/how-to/versions/#view-metrics) associated with your environment. These metrics will also help you evaluate whether your configuration changes are affecting traffic in the way you expect.