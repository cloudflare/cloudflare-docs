---
---

### Add filters

You can adjust the scope of analytics by manually entering filter conditions. Alternatively, click the **Filter** or **Exclude** buttons that appear when hovering over analytics data legend to filter by that field value.

To manually add a filter:

1.  Click **Add filter** under **Firewall Events**.
2.  Select a field, an operator, and a value. For example, to filter events by IP address, select *IP* for **Action**, select *equals* for the operator, and enter the IP address.
3.  Click **Apply**.

Take the following into account when entering filter values:

*   Do not add quotes around values.
*   Do not enter the `AS` prefix when entering ASN numbers. For example, enter `1423` instead of `AS1423`.
*   Wildcards are not supported.

### Adjust report duration

To adjust report duration, select the desired duration from the dropdown in **Firewall Events**.

The available report duration values depend on your Cloudflare plan. Refer to [Availability](/analytics#availability) for details.
