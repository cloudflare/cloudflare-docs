---
_build:
  publishResources: false
  render: never
  list: never
---

### Add filters

You can adjust the scope of analytics by manually entering filter conditions. Alternatively, select **Filter** or **Exclude** to filter by a field value. These buttons appear when you hover the analytics data legend.

To manually add a filter:

1. Under **Security Events**, select **Add filter**.
2. Select a field, an operator, and a value. For example, to filter events by IP address, select *IP* for **Action**, select *equals* for the operator, and enter the IP address.
3. Select **Apply**.

Take the following into account when entering filter values:

* Do not add quotes around values.
* Do not enter the `AS` prefix when entering ASN numbers. For example, enter `1423` instead of `AS1423`.
* Wildcards are not supported.

### Adjust report duration

To adjust report duration, select the desired duration from the dropdown in **Security Events**.

The available report duration values depend on your Cloudflare plan. Refer to [Availability](/waf/security-events/#availability) for details.
