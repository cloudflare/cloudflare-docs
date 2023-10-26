---
title: Quarterly DDoS threat reports
pcx_content_type: overview
---

# Quarterly DDoS threat reports

Quarterly DDoS threat reports provide a comprehensive overview of {{<glossary-tooltip term_id="distributed denial-of-service (DDoS) attack">}}DDoS attack{{</glossary-tooltip>}} insights and trends over a three-month period.

Thanks to our vast network, Cloudflare provides insights on the evolving threat landscape, including variations in attack sizes, techniques, top source countries, top targeted countries and targeted industries. Each report presents a global outlook, dives into significant attacks and campaigns, and explores shifts in DDoS tactics, offering a blend of data analysis and insights to better understand the cyber threat environment.

Find the latest quarterly DDoS threat reports in the [**Reports**](https://radar.cloudflare.com/reports) section of Cloudflare Radar.

---

## Methodologies

### How we calculate ransom DDoS attack insights

Cloudflare’s systems constantly analyze traffic and automatically apply mitigation when DDoS attacks are detected. Each attacked customer is prompted with an automated survey to help Cloudflare better understand the nature of the attack and the success of the mitigation. For over two years, Cloudflare has been surveying attacked customers. One of the questions in the survey asks the respondents if they received a threat or a ransom note. Over the past two years, on average, Cloudflare collected 164 responses per quarter. The responses of this survey are used to calculate the percentage of ransom DDoS attacks.

### How we calculate geographical and industry insights

#### Source country

At the application layer, Cloudflare uses the attacking IP addresses to understand the origin country of the attacks. That is because at that layer, IP addresses cannot be spoofed [^1] (or modified). However, at the network layer, source IP addresses can be spoofed. So, instead of relying on IP addresses to understand the source, Cloudflare uses the location of our data centers where the attack packets were ingested. It is possible to obtain geographical accuracy due to Cloudflare's large global coverage in over 300 locations around the world.

[^1]: IP spoofing is the creation of Internet Protocol (IP) packets which have a modified source address to hide the identity of the sender, impersonate another computer system, or both.

#### Target country

For both application-layer and network-layer DDoS attacks, attacks and traffic are grouped by customers’ billing country. This allows Cloudflare to understand which countries are subject to more attacks.

#### Target industry

For both application-layer and network-layer DDoS attacks, attacks and traffic are grouped by customers’ industry according to the internal customer relations management system. This allows Cloudflare to understand which industries are subject to more attacks.

#### Total volume versus percentage

For both source and target insights, Cloudflare looks at the total volume of attack traffic compared to all traffic as one data point. Additionally, Cloudflare also takes into account the percentage of attack traffic towards or from a specific country, to a specific country or to a specific industry. This gives us an "attack activity rate" for a given country/industry which is normalized by their total traffic levels. This helps us remove biases of a country or industry that normally receives a lot of traffic and therefore, a lot of attack traffic as well.

### How we calculate attack characteristics

To calculate the attack size, duration, attack vectors, and emerging threats, Cloudflare buckets attacks and then provides the share of each bucket out of the total amount for each dimension.

However, in the **Network layer attack distribution** graph of the [**Security & Attacks**](https://radar.cloudflare.com/security-and-attacks) Radar page these trends are calculated by number of bytes instead. Since attacks may vary greatly in number of bytes from one another, this could lead to trends differing between the quarterly reports and the graph displayed in Cloudflare Radar.

---

## Final remarks

### Countries as source or target of attacks

When Cloudflare describes "top countries" as the source or target of attacks, it does not necessarily mean that a certain country was attacked as a country, but rather that organizations that use that country as their billing country were targeted by attacks.

Similarly, "attacks originating from a country" does not mean that a given country launched the attacks, but rather that the attack was launched from IP addresses mapped to that country. Threat actors operate global botnets with nodes all over the world, and often also use {{<glossary-tooltip term_id="Virtual Private Network (VPN)">}}VPNs (virtual private networks){{</glossary-tooltip>}} and proxies to obfuscate their true location. This means that the source country could indicate the presence of exit nodes or botnet nodes within that country.

### Excluded items due to insufficient data

The insights and trends presented in quarterly reports exclude certain countries and industries when there is not enough data to provide statistically meaningful insights.
