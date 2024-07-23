---
title: How DDoS protection works
pcx_content_type: concept
weight: 1
---

# How DDoS protection works

To detect and mitigate {{<glossary-tooltip term_id="distributed denial-of-service (DDoS) attack">}}DDoS attacks{{</glossary-tooltip>}}, Cloudflare’s autonomous edge and centralized DDoS systems analyze traffic samples out of path, which allows Cloudflare to asynchronously detect DDoS attacks without causing latency or impacting performance.

The analyzed samples include:

* **Packet fields** such as the source IP, source port, destination IP, destination port, protocol, TCP flags, sequence number, options, and packet rate.
* **HTTP request metadata** such as HTTP headers, user agent, query-string, path, host, HTTP method, HTTP version, TLS cipher version, and request rate.
* **HTTP response metrics** such as error codes returned by customers’ origin servers and their rates.

Once attack traffic matches a rule, Cloudflare's systems will track that traffic and generate a real-time signature to surgically match against the attack pattern and mitigate the attack without impacting legitimate traffic. The rules are able to generate different signatures based on various properties of the attacks and the signal strength of each attribute. For example, if the attack is distributed — that is, originating from many source IPs — then the source IP field will not serve as a strong indicator, and the rule will not choose the source IP field as part of the attack signature. Once generated, the fingerprint is propagated as a mitigation rule to the most optimal location on the Cloudflare global network for cost-efficient mitigation. These mitigation rules are ephemeral and will expire shortly after the attack has ended, which happens when no additional traffic has been matched to the rule.

## Data localization

To learn more about how DDoS protection works with data localization, refer to the Data Localization Suite [product compatibility](/data-localization/compatibility/). 