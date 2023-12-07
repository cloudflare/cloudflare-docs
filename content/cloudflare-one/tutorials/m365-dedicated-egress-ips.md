---
updated: 2023-11-13
category: 🔐 Zero Trust
difficulty: Intermediate
pcx_content_type: tutorial
title: Protect access to Microsoft 365 with dedicated egress IPs
---

# Protect access to Microsoft 365 with dedicated egress IPs

This tutorial demonstrates how to secure access to Amazon S3 buckets with Cloudflare Zero Trust so that data in these buckets is not publicly exposed on the Internet. You can combine Cloudflare Access and AWS VPC endpoints. Enterprise may also use Cloudflare Gateway egress policies with dedicated egress IPs.

{{<tutorial>}}

{{<tutorial-prereqs>}}

Make sure you have:

- In Cloudflare, a Zero Trust Enterprise plan with [dedicated egress IPs](/cloudflare-one/policies/gateway/egress-policies/dedicated-egress-ips/)
- In Microsoft 365, an organization managed with [Microsoft Entra ID](https://learn.microsoft.com/en-us/entra/identity/)

{{</tutorial-prereqs>}}

{{<tutorial-step title="Create an egress policy in Cloudflare Gateway">}}

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Gateway** > **Egress Policies**.
2. Select **Add a policy**.
3. Name your policy, then add conditions to check users are configured in Microsoft Entra ID. For example, you can check for [identity conditions](/cloudflare-one/policies/gateway/identity-selectors/):

    | Selector         | Operator | Value                                         |
    | ---------------- | -------- | --------------------------------------------- |
    | User Group Names | in       | `Sales and Marketing`, `Retail`, `U.S. Sales` |

    Additionally, you can check for [device posture conditions](/cloudflare-one/identity/devices/):

    | Selector                    | Operator | Value                                             | Logic |
    | --------------------------- | -------- | ------------------------------------------------- | ----- |
    | Passed Device Posture Check | is       | `CrowdStrike Overall ZTA score (Crowdstrike s2s)` | And   |
    | Passed Device Posture Check | is       | `AppCheckMac - Required Software (Application)`   |       |

4. Enable **Use dedicated Cloudflare egress IPs**. Select your desired IPv4 and IPv6 addresses. For example:

    | Primary IPv4 address | IPv6 address    |
    | -------------------- | --------------- |
    | `203.0.113.0`        | `2001:db8::/32` |

{{</tutorial-step>}}

{{<tutorial-step title="Create a named IP range location in Microsoft Entra ID">}}

1. In the [Microsoft Azure portal](https://aka.ms/azureportal), select **Microsoft Entra ID** in the sidebar.
2. Go to **Security** > **Named locations**.
3. Select **IP ranges location**.
4. Name your location, then add the IP addresses from your Cloudflare dedicated egress IP policy.
5. Select **Upload**.

This named location corresponds with the locations of your dedicated egress IPs.

{{</tutorial-step>}}

{{<tutorial-step title="Create a conditional access policy in Microsoft Entra ID">}}

1. In **Protect**, go to **Conditional Access**.
2. Select **Create new policy**.
3. Configure which Entra ID users you want to limit access for, and which traffic, apps, or actions you want to protect.
4. In **Conditions**, select **Locations**. Enable **Configure**.
5. In **Include**, select _Any location_. In **Exclude**, select the named location you created.
6. In **Access controls**, go to **Grant**. Enable _Block access_.

Your policy will block access for your selected users from any location except those using your dedicated egress IPs.

{{</tutorial-step>}}

{{<tutorial-step title="Test your policies">}}

1. Using [WARP](/cloudflare-one/connections/connect-devices/warp/), sign in to your Zero Trust organization with a user's account.
2. Access any Microsoft 365 app within your organization. Entra ID should allow access.
3. Disconnect WARP from your Zero Trust organization. Entra ID should block access to any Microsoft 365 apps.

{{</tutorial-step>}}

{{</tutorial>}}
