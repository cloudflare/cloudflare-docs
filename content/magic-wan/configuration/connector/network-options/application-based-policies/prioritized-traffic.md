---
pcx_content_type: how-to
title: Prioritized traffic
meta:
    description: Prioritized traffic allows you to define which applications are processed first by Magic WAN Connector.
---

# Prioritized traffic

Prioritized traffic allows you to define which applications Magic WAN Connector should process first. Applications not in the list will be queued behind prioritized traffic.

## Add an application

You need to configure Prioritized traffic for each of your existing sites, as it is a per-site configuration.

{{<render file="connector/app-aware-policies/_add-app.md" withParameters="Prioritized traffic" >}}

6. Select one or more applications that should take precedence over other traffic. You can also use the search box.
7. Select **Add applications**.

The traffic for the applications you chose are now processed first by Connector.

## Delete an application

{{<render file="connector/app-aware-policies/_delete-app.md" withParameters="Prioritized traffic">}}