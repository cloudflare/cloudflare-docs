---
title: Create a filter
pcx_content_type: how-to
weight: 5
meta:
  title: Create a filter for Advanced TCP Protection
---

# Create a filter

{{<render file="_atp-filter-definition.md">}}
<br>

Each protection system component (SYN flood protection or out-of-state TCP protection) should have at least one [rule](/ddos-protection/tcp-protection/concepts/#rule), but filters are optional.

## Procedure

To create a [filter](/ddos-protection/tcp-protection/concepts/#filter) for one of the system components:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Go to Account Home > **L3/4 DDoS** > **Advanced TCP Protection**.
3. Under the system component for which you are creating the filter (**SYN Flood Protection** or **Out-of-state TCP Protection**), select **Create** next to the type of filter you want to create:

    * **Mitigation Filter**: The protection system will drop {{<glossary-tooltip term_id="data packet">}}packets{{</glossary-tooltip>}} matching the filter expression.
    * **Monitoring Filter**: The protection system will log packets matching the filter expression.
    * **Off Filter**: The protection system will ignore packets matching the filter expression.

4. Under **When incoming packets match**, define a filter expression using the Expression Builder (specifying one or more values for **Field**, **Operator**, and **Value**), or manually enter an expression using the Expression Editor. For more information, refer to [Edit rule expressions](/ruleset-engine/rules-language/expressions/edit-expressions/).

5. Select **Save**.

{{<render file="_atp-filters-rules-precedence.md">}}
