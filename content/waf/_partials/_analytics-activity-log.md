---
_build:
  publishResources: false
  render: never
  list: never
---

The **Activity log** summarizes security events by date to show the action taken and the applied Cloudflare security feature.

![Example list of events in the Activity log, with one of the events expanded to show its details](/waf/static/analytics-activity-log.png)

Security events are shown by individual event rather than by request. For example, if a single request triggers three different Firewall features, the security events will show three individual events in the **Activity log**.

Expand each event to check its details, and define filters and exclusions based on the event's field values. Select the **Filter** or **Exclude** button when hovering a field to add the field value to the filters or exclusions list of the displayed analytics. To download the event data in JSON format, select **Export event JSON**.

### Displayed columns

To configure the columns displayed in the **Activity log**, select **Edit columns**. This gives you flexibility depending on the type of analysis that you need to perform.

For example, if you are diagnosing a bot-related issue, you may want to display the **User agent** and the **Country** columns. On the other hand, if you are trying to identify a DDoS attack, you may want to display the **IP address**, **ASN**, and **Path** columns.

### Event actions

For details on most actions that appear in the **Activity Log**, refer to [Actions](/ruleset-engine/rules-language/actions/).

Besides the actions you can select when configuring rules in Cloudflare security products, you may also find events with the following associated actions:

* _Connection Close_
* _Force Connection Close_

For details on these actions, refer to [HTTP DDoS Attack Protection parameters](/ddos-protection/managed-rulesets/http/override-parameters/#action).

The [*Managed Challenge (Recommended)*](/fundamentals/get-started/concepts/cloudflare-challenges/#managed-challenge-recommended) action that may appear in the **Activity Log** is available in the following security features and products: firewall rules, IP Access rules, User Agent Blocking rules, rate limiting rules, custom rules, and Bot Fight Mode.
