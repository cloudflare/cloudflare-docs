---
updated: 2023-10-25
category: 🔐 Zero Trust
difficulty: Advanced
pcx_content_type: tutorial
title: Protect access to Amazon S3 buckets with Cloudflare Zero Trust
---

# Protect access to Amazon S3 buckets with Cloudflare Zero Trust

This tutorial demonstrates how to secure access to Amazon S3 buckets with Cloudflare Zero Trust so that data in these buckets is not publicly exposed on the Internet. You can combine Cloudflare Access and AWS VPC endpoints. Enterprise may also use Cloudflare Gateway egress policies with dedicated egress IPs.

## Method 1: Via Cloudflare Access and VPC endpoints

```mermaid
flowchart TB
    cf1[/Agentless and WARP </br>Zero Trust users/]--Access policy-->cf2{{Cloudflare}}
    cf2--Cloudflare Tunnel-->vpc1
    
    subgraph VPC
    vpc1[EC2 VM]-->vpc2[VPC endpoint]
    end
    vpc2-->s3_1

    subgraph S3 service
    s3_1([S3 bucket])
    end

    i1[/Users outside </br> Zero Trust/]-. "S3 access denied" .->s3_1
```

### Prerequisites

- S3 bucket to be protected by Cloudflare Zero Trust
- AWS VPC with one EC2 virtual machine (VM) hosting the [Cloudflare Tunnel daemon](/cloudflare-one/connections/connect-networks/)
- S3 bucket and AWS VPC configured in the same [AWS region](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Concepts.RegionsAndAvailabilityZones.html)

### 1. Create a VPC endpoint in AWS

1. In the [AWS dashboard](https://aws.amazon.com/console/), go to **Services** > **Networking & Content Delivery** > **VPC**.
2. Under **Virtual private cloud**, go to **Endpoints**.
3. Select **Create endpoint** and name the endpoint.
4. Choose _AWS services_ as the service category.
5. In **Services**, search and select the S3 service in the same region of the VPC. For example, for the AWS region **Europe (London) - eu-west-2**, the corresponding S3 service is named `com.amazonaws.eu-west-2.s3` with a type of Gateway.
6. In **VPC**, select your VPC that contains the EC2 VM hosting the Cloudflare tunnel daemon.
7. In **Route tables**, select the route table associated with the VPC.
8. In **Policy**, choose _Full access_.
9. Select **Create endpoint**.

After you create the VPC endpoint, a new entry in the VPC route table with the target being your VPC endpoint. The entry will have the format `vpce-xxxxxxxxxxxxxxxxx`.

### 2. Set up a bucket policy for VPC access

1. Go to **Services** > **Storage** > **S3**.
2. In Amazon S3, go to **Buckets** > **\<your-S3-bucket\>** > **Permissions**.
3. Disable **Block all public access**.
4. In **Bucket policy**, add the following policy:

```json
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
                "arn:aws:s3:::<your-S3-bucket01>",
                "arn:aws:s3:::<your-S3-bucket01>/*"
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

Your bucket policy will allow your VPC to access your S3 bucket.

### 3. Enable static website hosting for the S3 bucket

1. Return to Amazon S3, then go to **Buckets** > **\<your-S3-bucket01\>** > **Properties**.
2. In **Static website hosting**, select **Edit**.
3. Enable **Static website hosting**.
4. Specify the Index and Error documents for the S3 bucket.
5. Select **Save changes**.

A bucket website endpoint will be available at `http://<your-S3-bucket01>.s3-website.<aws-region>.amazonaws.com`. Because of the bucket policy, this website endpoint will only be accessible from the VPC with the VPC endpoint configured.

### 4. Add a new public hostname to the Cloudflare Tunnel

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Access** > **Tunnels**
2. Select your Tunnel, then select **Configure**.
3. Go to **Public Hostname**, then select **Add a public hostname**.
4. Enter a subdomain your organization will use to access the S3 bucket. For example, `s3-bucket.<your-domain>.com`.
5. Under **Service**, choose _HTTP_ for **Type**. In **URL**, enter `<your-S3-bucket01>.s3-website.<aws-region>.amazonaws.com`.
6. In **Additional application settings** > **HTTP Settings**, input the **HTTP Host Header** as `<your-S3-bucket01>.s3-website.<aws-region>.amazonaws.com`.
7. Select **Save hostname**.

Your Cloudflare Tunnel will terminate at the AWS VPC using your public hostname.

### 5. Restrict S3 access with an Access policy

1. Go to **Access** > **Applications**. Select **Add an application**.
2. Select **Self-hosted**.
3. Enter a name for the application.
4. In **Application Domain**, enter the public hostname used by your Tunnel. For example, `s3-bucket.<your-domain>.com`.
5. (Optional) Create a [service token](/cloudflare-one/identity/service-tokens/) to automatically authenticate access to your S3 bucket.
6. Configure your application, then select **Next**.
7. Add [Access policies](/cloudflare-one/policies/access/) to determine which users and applications may access your bucket.
8. Configure the settings per your organization's requirements.
9. Select **Add application**.

Users and applications that successfully authenticate via Cloudflare Access can access your S3 bucket at `https://s3-bucket.<your-domain>.com`.

## Method 2: Via Cloudflare Gateway egress policies

{{<Aside type="note">}}
This method is only available on Enterprise plans.
{{</Aside>}}

```mermaid
flowchart TB
    cf1[/WARP users/]--Egress policy-->cf2{{Cloudflare}}
    cf2--Egress with dedicated IP-->i1[Internet]
    i1-->s3_1
    
    subgraph S3 Service
    s3_1([S3 bucket])
    end

    i2[/Users outside </br> Zero Trust/]-. "IPs denied" .->s3_1
```

### Prerequisites

- Cloudflare Zero Trust account with [dedicated egress IPs](/cloudflare-one/policies/gateway/egress-policies/dedicated-egress-ips/)
- S3 bucket to be protected by Cloudflare Zero Trust

### 1. Set up a bucket policy to restrict access to a specific IP address

1. In the [AWS dashboard](https://aws.amazon.com/console/), go to **Services** > **Storage** > **S3**.
2. Go to **Buckets** > **\<your-S3-bucket02\>** > **Permissions**.
3. Disable **Block all public access**.
4. In **Bucket policy**, add the following policy:

```json
{
    "Version": "2012-10-17",
    "Id": "SourceIP",
    "Statement": [
        {
            "Sid": "SourceIP",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:*",
            "Resource": [
                "arn:aws:s3:::<your-S3-bucket02>",
                "arn:aws:s3:::<your-S3-bucket02>/*"
            ],
            "Condition": {
                "IpAddress": {
                    "aws:SourceIp": "<your-dedicated-ip>/32"
                }
            }
        }
    ]
}
```

### 2. Enable static website hosting for the S3 bucket

1. Return to your bucket, then go to **Properties**.
2. In **Static website hosting**, select **Edit**.
3. Enable **Static website hosting**.
4. Specify the Index and Error documents for the S3 bucket.
5. Select **Save changes**.

A bucket website endpoint will be available at `http://<your-S3-bucket02>.s3-website.<aws-region>.amazonaws.com`. Because of the bucket policy, the website endpoint will only be accessible to traffic sourced from the dedicated egress IP specified.

### 3. Setup a dedicated egress IP policy

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Gateway** > **Egress Policies**. Select **Add a policy**.
2. Create a policy that specifies which proxied traffic Gateway should assign a [dedicated egress IP](/cloudflare-one/policies/gateway/egress-policies/dedicated-egress-ips/) to. For more information, refer to [Egress policies](/cloudflare-one/policies/gateway/egress-policies/).
3. In **Select an egress IP**, choose _Use dedicated Cloudflare egress IPs_. Select the dedicated egress IP defined in your bucket policy.
4. Select **Create policy**.

Traffic proxied by Gateway and assigned your specified egress IP can access your S3 bucket at `http://<your-S3-bucket02>.s3-website.<aws-region>.amazonaws.com`.
