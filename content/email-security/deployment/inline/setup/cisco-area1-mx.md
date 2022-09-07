---
title: Cisco MX Record
pcx_content_type: tutorial
weight: 3
layout: single
meta:
   title: Deploy and configure Cisco IronPort with Area 1 as MX Record
---

# Deploy and configure Cisco IronPort with Area 1 as MX Record

In this tutorial you will learn how to configure Cisco IronPort with Area 1 as MX record. This tutorial is broken down into several steps:

1. Add a new Sender Group to include Area 1’s egress IPs.
2. Configure Incoming Relays.
3. Update domain MX records.

![A schematic showing where Area 1 security is in the lifeline of an email received](/email-security/static/cisco-area1-mx-flow.png)

## 1. Add a Sender Group for Area 1 Email Protection IPs