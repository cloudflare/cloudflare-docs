---
title: Overview
pcx_content_type: overview
layout: overview
weight: 1
meta:
  title: Health Checks
---

# Health Checks

Standalone Health Checks monitors an IP address or hostname for origin servers or applications and notifies you in near real-time if there happens to be a problem. 

A Health Check is a service that runs on Cloudflare’s edge network to monitor whether an origin server is online. This allows you to view the health of their origin servers even if there is only one origin or they do not yet need to balance traffic across their infrastructure.

Standalone Health Checks support various configurations to hone in on what you can check, including response codes, protocol types, and intervals. You can specify a particular path if an origin server serves multiple applications or check a larger subset of response codes for their staging environment. All of these options allow you to properly target their Health Check, providing a precise picture of what is wrong with an origin server.
