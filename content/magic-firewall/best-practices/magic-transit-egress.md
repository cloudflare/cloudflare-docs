---
pcx-content-type: concept
order: 3
---

# Magic Transit egress

The suggestions in the [Minimal ruleset](/best-practices/minimal-ruleset) and [Extended ruleset](/best-practices/extended-ruleset) are recommendations for ingress traffic.

For Magic Transit egress traffic, consider the following information:

*   The Magic Firewall rules will apply to both Magic Transit ingress and egress traffic passing via Cloudflare.
*   Magic Firewall is not stateful for your Magic Transit egress traffic.
*   If you have a Magic Firewall "default drop" catchall rule for ingress traffic, you will need to add an earlier rule to permit traffic sourced from your Magic Transit prefix with the destination as **any** to allow outbound egress traffic.
