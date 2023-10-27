---
updated: 2023-10-25
category: 🔐 Zero Trust
pcx_content_type: tutorial
title: Protect access to S3 buckets with Cloudflare Zero Trust
---

# Protect access to S3 buckets with Cloudflare Zero Trust

This tutorial demonstrates how to secure access to S3 buckets in AWS via Cloudflare Zero Trust, so that data in these buckets is not exposed publicly in the internet. With Cloudflare Zero Trust we can do this in two different ways, providing more flexibility on how organizations can achieve this objective.

## Method 1: using Cloudflare Access and VPC endpoints

TO DO: INSERT IMAGE HERE

### Prerequisites

- AWS VPC with one EC2 virtual machine hosting the [Cloudflare tunnel daemon](/cloudflare-one/connections/connect-networks/)
- S3 bucket to be protected by Cloudflare Zero Trust
- S3 bucket and AWS VPC configured in the same AWS region

### 1. Create VPC endpoint on AWS

From the AWS dashboard, navigate to the **VPC dashboard** > **Virtual private cloud** > **Endpoints** > **Create endpoint**
1. Provide a name to the endpoint, for example `vpc-endpoint`
2. Select **AWS services** as the Service category
3. Under **Services** search and select the S3 service in the same region of the VPC. For example, for **Europe (London) - eu-west-2**, the S3 service is **com.amazonaws.eu-west-2.s3**. This is a service of type **Gateway**
4. Under **VPC**, select the VPC that contains the EC2 VM hosting the Cloudflare tunnel daemon
5. Under **Route tables**, select the route table associated with the VPC
6. Under **Policy**, select **Full access**
7. Click **Create endpoint**

After the VPC endpoint is created, there will be a new entry in the VPC route table with the target being the VPC endpoint, in the format `vpce-xxxxxxxxxxxxxxxxx`.

### 2. Set up a bucket policy on the S3 bucket so that the VPC can access the bucket

From the AWS dashboard, navigate to the **S3 dashboard** > **Buckets** > `your-S3-bucket` > **Permissions**
1. Uncheck **Block all public access**
2. Edit the **Bucket policy** and add this policy
```
{
    "Version": "2012-10-17",
    "Id": "VPCe",
    "Statement": [
        {
            "Sid": "VPCe",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:*",
            "Resource": [
                "arn:aws:s3:::<your-bucket-name>",
                "arn:aws:s3:::<your-bucket-name>/*"
            ],
            "Condition": {
                "StringEquals": {
                    "aws:SourceVpce": "<your-vpc-endpoint>"
                }
            }
        }
    ]
}
   ```

### 3. Enable Static website hosting on the S3 bucket

From the AWS dashboard, navigate to the **S3 dashboard** > **Buckets** > `your-S3-bucket` > **Properties**
1. Under **Static website hosting** click **Edit**
2. Choose **Enable** for **Static website hosting**
3. Specify the **Index** and **Error** documents for the S3 bucket
4. Click **Save changes**

A bucket website endpoint will be available at `http://<your-bucket-name>.<aws-region>.amazonaws.com` . Due to the bucket policy, this website endpoint will only accessible from the VPC with the VPC endpoint configured.

### 4. Add a new public hostname to the Cloudflare tunnel terminating in the AWS VPC

From the Cloudflare Zero Trust dashboard, navigate to **Access** > **Tunnels** > `your-cloudflare-tunnel` > **Configure**
1. Go to **Public hostnames** > **Add a public hostname**
2. Under **Subdomain**, choose a subdomain name that will be used by your organization to access the S3 bucket, for example, `s3-bucket.your-domain.com`
3. Under **Service**, choose `Type = HTTP` and `URL = http://<your-bucket-name>.<aws-region>.amazonaws.com`
4. Expand the **Additional application settings** > **HTTP Settings** > and configure the **HTTP Host Header** as `<your-bucket-name>.<aws-region>.amazonaws.com` 
5. Click **Save hostname**

### 5. Add a new Access Policy to restrict access to the S3 bucket
From the Cloudflare Zero Trust dashboard, navigate to **Access** > **Applications** > **Add an application**
1. Select **Self-hosted** as the application type
2. Provide a name to the **Application**, for example, `s3-bucket`
3. Define the **Application Domain** as the **Public hostname** added to the Cloudflare tunnel, for example, `s3-bucket.your-domain.com`
4. Configure the rest of the Application settings as per your organization requirements. For more details, please refer to the [Access Policies](/cloudflare-one/policies/access/) documentation. For automated systems, to access the bucket, [Service Tokens](/cloudflare-one/identity/service-tokens/) can be used.

The S3 bucket is now available at `https://s3-bucket.your-domain.com` but only for users/applications that successfully authenticate via Cloudflare Access.

## Method 2: using Cloudflare Gateway and Egress policies

TO DO: INSERT IMAGE HERE

### Prerequisites

- S3 bucket to be protected by Cloudflare Zero Trust

### 1. 
