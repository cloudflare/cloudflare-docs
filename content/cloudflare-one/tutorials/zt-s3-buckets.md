---
updated: 2023-10-25
category: 🔐 Zero Trust
pcx_content_type: tutorial
title: Protect access to S3 buckets with Cloudflare Zero Trust
---

# Protect access to S3 buckets with Cloudflare Zero Trust

This tutorial demonstrates how to secure access to S3 buckets in AWS via Cloudflare Zero Trust, so that data in these buckets is not exposed publicly in the internet. With Cloudflare Zero Trust we can do this in two different ways, providing more flexibility on how organizations can achieve this objective.

## Method 1: using Cloudflare Access and VPC endpoints

### Prerequisites

- AWS VPC with one EC2 virtual machine hosting the Cloudflare tunnel daemon
- S3 bucket to be protected by Cloudflare Zero Trust
- S3 bucket and AWS VPC configured in the same AWS region


