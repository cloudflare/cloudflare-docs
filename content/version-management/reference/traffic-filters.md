---
title: Traffic filters
pcx_content_type: reference
weight: 3
---

# Traffic filters

When you [create an environment](/version-management/how-to/manage-applications-and-versions/), you have the option to define a **traffic filter** for that environment. This filter prevents any version settings from affecting live traffic.

To send traffic to a specific environment, modify requests to your zone to match the pattern specified in your filter, such as **Edge Server IP**, **Cookie**, **Hostname**, or **User Agent**.