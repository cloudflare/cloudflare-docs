---
title: Getting started
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

API is an acronym standing for Application Programming Interface and it is a reference to the modern style of web communication. It is often formatted using JSON, XML or a similarly formatted data. The main purpose of an API is to allow different systems to seamlessly integrate together. 
## Why care about API security?

{{<render file="_why-care.md" productFolder="api-shield" >}}

## Which products are included in the API Shield suite?

The following list of products are all included in the API Shield product suite. Mututal TLS is available across all plans. 

- [API Discovery](/api-shield/security/api-discovery/): This tool employs automated mechanisms to identify, catalog, and document APIs within an application ecosystem, providing developers and security teams with comprehensive insights into the interface architecture.

- [Volumetric Abuse Detection](/api-shield/security/volumetric-abuse-detection/): By intelligently analyzing traffic patterns, this feature identifies and mitigates large-scale attacks on APIs by dynamically adjusting thresholds and leveraging anomaly detection mechanisms to distinguish legitimate from malicious traffic, enhancing the platform's resilience.

- [Sequence Analytics](/api-shield/security/sequence-analytics/): Using machine learning, Sequence Analytics analyzes patterns in API requests, providing in-depth insights into usage patterns and potential threats for proactive security measures.

- [Sequence Mitigation](/api-shield/security/sequence-mitigation/): Complementing Sequence Analytics, this component dynamically responds to identified patterns of abuse or potential threats with adaptive mitigation strategies, ensuring protection against sophisticated API-based attacks.

- [GraphQL malicious query protection](/api-shield/security/graphql-protection/): Employing deep packet inspection and heuristic analysis, this functionality identifies and blocks potentially harmful GraphQL queries by scrutinizing query structures and content, providing granular protection against injection attacks and unauthorized data access.

- [JSON Web Tokens validation](/api-shield/security/jwt-validation/): API Shield rigorously validates JSON Web Tokens (JWTs) through cryptographic verification and adherence to specified standards, preventing token-based attacks and ensuring the integrity of user authentication within API interactions.

- [Schema Validation](/api-shield/security/schema-validation/): API Shield enforces strict adherence to predefined data structures and formats by validating incoming API payloads against specified schemas, minimizing the risk of data corruption, injection attacks, or unintended deviations from the expected data model.

- [Mutual TLS (mTLS)](/api-shield/security/mtls/): This security feature establishes a two-way authentication mechanism, requiring both the client and server to present valid certificates. This ensures a higher level of trust in the communication channel between the eyeball and Cloudflare.
