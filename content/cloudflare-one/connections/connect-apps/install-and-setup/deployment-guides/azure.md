---
pcx-content-type: how-to
title: Azure
weight: 8
---

# Deploy `cloudflared` in Azure

The purpose of this guide is to walk through some best practices for accessing private resources on AWS by deploying Cloudflare's lightweight connector, `cloudflared`. 

We will walk through how to initialize a service on a linux VM in Azure, and route to it from another VM running `cloudflared`. This deployment guide does not take into account routing beyond basic security groups and default VPCs.

# Prerequisites

- Navigate to the [Zero Trust Dashboard](https://dash.teams.cloudflare.com/) and create a Cloudflare Zero Trust account.
- [Enroll an end-user device](/cloudflare-one/connections/connect-devices/warp/warp-settings/#device-enrollment-permissions) into your Cloudflare Zero Trust account.

# Create your environment
