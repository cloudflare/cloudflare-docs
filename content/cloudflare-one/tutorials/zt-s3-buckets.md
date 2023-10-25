---
updated: 2023-10-25
category: 🔐 Zero Trust
pcx_content_type: tutorial
title: Protect access to S3 buckets with Cloudflare Zero Trust
---

# Protect access to S3 buckets with Cloudflare Zero Trust

This tutorial demonstrates how to secure access to S3 buckets in AWS via Cloudflare Zero Trust, so that data in these buckets is not exposed publicly in the internet. With Cloudflare Zero Trust we can do this in two different ways, providing more flexibility on how organizations can achieve this objective.

## Method 1: using Cloudflare Access and VPC endpoints

INSERT IMAGE HERE

### Prerequisites

- AWS VPC with one EC2 virtual machine hosting the Cloudflare tunnel daemon
- S3 bucket to be protected by Cloudflare Zero Trust
- S3 bucket and AWS VPC configured in the same AWS region

### 1. Create VPC endpoint on AWS

From the AWS dashboard, navigate to the **VPC dashboard** > **Virtual private cloud** > **Endpoints** > **Create endpoint**
1. Provide a name to the endpoint, for example `vpc-endpoint`
2. Select **AWS services** as the Service category
3. Under Services search and select the S3 service in the same region of the VPC. For example, for **Europe (London) - eu-west-2**, the S3 service is **com.amazonaws.eu-west-2.s3**. This is a service of type **Gateway**
4. Under VPC, select the VPC that contains the EC2 VM hosting the Cloudflare tunnel daemon
5. Under Route tables, select the route table associated with the VPC
6. Under Policy, select **Full access**
7. Click **Create endpoint**

After the VPC endpoint is created, there will be a new entry in the VPC route table with the target being the VPC endpoint, in the format `vpce-xxxxxxxxxxxxxxxxx`.

### 2. Set up a bucket policy on the S3 bucket so that the VPC can access the bucket

From the AWS dashboard, navigate to the **S3 dashboard** > **Buckets** > `your-S3-bucket` > **Permissions**




On the VPC hosting the EC2 VM running Cloudflare tunnel, go to VPC
