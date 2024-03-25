---
title: Cloud CNI
pcx_content_type: concept
weight: 4
---

# Cloud CNI

Cloud CNI allows you to connect your virtual private cloud (VPC) virtual networks directly with Cloudflare – for a more reliable and secure experience.

Connecting to Cloudflare directly with a Cloud CNI reduces latency, makes your network more stable by bypassing Internet performance potential bottlenecks, and will often reduce your cloud provider network egress bandwidth charges.

The use case for Cloud CNI is Magic Transit or Magic WAN. If you have publicly routable origins that are behind Magic Transit over a Cloud CNI, then all Cloudflare services that work with public origins will run over the CNI (e.g. Load Balancer, WAF, Cache etc).

## Supported cloud providers

Cloudflare supports interconnect with:
- Amazon Web Services (AWS) DirectConnect
- Google Cloud (GCP) Interconnect
- IBM Cloud Direct Link
- Oracle Cloud Infrastructure (OCI) FastConnect

Azure ExpressRoute support is coming soon.

## Cloud CNI Setup

Enterprise customers using Magic WAN and Magic Transit can get started with Cloud CNI by contacting their account team.