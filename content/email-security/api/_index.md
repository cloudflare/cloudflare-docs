---
title: API
pcx_content_type: navigation
weight: 6
---

# API

{{<Aside type="warning" header="Area 1 has been renamed">}}

{{<render file="rename-area1-to-ces.md">}}

{{</Aside>}}

Cloud Email Security offers Application Programming Interfaces (APIs) to expose our {{<glossary-tooltip term_id="phishing">}}phishing{{</glossary-tooltip>}} campaign rulesets. These APIs both aid research and provide a set of indicators to block using network security edge devices.

All API requests are initiated using normal HTTP requests (`GET`/`POST`/`DELETE`) and responses are returned in JSON. Authentication to the APIs uses HTTP Basic Authentication over HTTPS.

For more details, refer to our [API documentation (PDF)](/email-security/static/api_documentation_1.38.1.pdf).