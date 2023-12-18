---
_build:
  publishResources: false
  render: never
  list: never
---

You can create Zero Trust policies to manage access to specific applications on your network.

1. Go to **Access** > **Applications** > **Add an application**.
2. Select **Private Network**.
3. Name your application.
4. For **Application type**, select _Destination IP_.
5. For **Value**, enter the IP address for your application (for example, `10.128.0.7`).
   {{<Aside type="note">}}
   If you would like to create a policy for an IP/CIDR range instead of a specific IP address, you can build a [Gateway Network policy](/cloudflare-one/policies/gateway/network-policies/) using the **Destination IP** selector.
   {{</Aside>}}

6. Configure your [App Launcher](/cloudflare-one/applications/app-launcher/) visibility and logo.
7. Select **Next**. You will see two auto-generated Gateway Network policies: one that allows access to the destination IP and another that blocks access.
8. Modify the policies to include additional identity-based conditions. For example:

   - **Policy 1**
     | Selector       | Operator      | Value            | Logic | Action |
     | -------------- | ------------- | ---------------- | ----- | ------ |
     | Destination IP | in            | `10.128.0.7`     | And   | Allow  |
     | User email     | Matches regex | `.*@example.com` |       |        |

   - **Policy 2**
     | Selector       | Operator | Value        | Action |
     | -------------- | -------- | ------------ | ------ |
     | Destination IP | in       | `10.128.0.7` | Block  |

   Policies are evaluated in [numerical order](/cloudflare-one/policies/gateway/order-of-enforcement/#order-of-precedence), so a user with an email ending in @example.com will be able to access `10.128.0.7` while all others will be blocked. For more information on building network policies, refer to our [dedicated documentation](/cloudflare-one/policies/gateway/network-policies/).

9. Select **Add application**.

Your application will appear on the **Applications** page.
