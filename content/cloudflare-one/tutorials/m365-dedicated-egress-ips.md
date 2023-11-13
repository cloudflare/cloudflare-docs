---
updated: 2023-11-13
category: 🔐 Zero Trust
difficulty: Intermediate
pcx_content_type: tutorial
title: Restrict access to Microsoft 365 with dedicated egress IPs
---

# Restrict access to Microsoft 365 with dedicated egress IPs

This tutorial demonstrates how to secure access to Amazon S3 buckets with Cloudflare Zero Trust so that data in these buckets is not publicly exposed on the Internet. You can combine Cloudflare Access and AWS VPC endpoints. Enterprise may also use Cloudflare Gateway egress policies with dedicated egress IPs.

{{<tutorial>}}

{{<tutorial-step title="Create egress policy in Cloudflare ZT dash">}}

Under Gateway > Egress Policies > Add a policy
For example, this policy will be applied to my users that are configured on Azure AD and for which the device posture passes
In that case they will get the following IP addresses: IPv4 = 8.29.231.206 / IPv6 = 2a09:bac0:1001:3e::/64

{{</tutorial-step>}}

{{<tutorial-step title="Create conditional access policy in Azure AD (aka Entra ID)">}}

Go to the Azure portal > Entra ID > Security > Named locations
Create a new location specifying the WARP IP addresses from the dedicated egress policy
Then go to Conditional Access and choose "Create new policy"
I created a policy that applies to the user Adele
That blocks access from "Any location" except the Named Location I configured
And applies to Office365 applications

{{</tutorial-step>}}

{{<tutorial-step title="Test connectivity">}}

With the WARP user connected, access to the M365 apps is allowed
As soon as the WARP user is disconnected if I try to do anything on Outlook, access will be blocked by Microsoft
The other big benefit of using dedicated egress IPs, is that enforcement of device posture will be almost real-time. As soon as posture check fails, access to the M365 apps will be blocked.

{{</tutorial-step>}}

{{</tutorial>}}
