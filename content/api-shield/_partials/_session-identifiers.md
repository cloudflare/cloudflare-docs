---
_build:
  publishResources: false
  render: never
  list: never
---

While not strictly required, it is recommended that you configure your {{<glossary-tooltip term_id="session identifier">}}session identifiers{{</glossary-tooltip>}} when getting started with API Shield. When Cloudflare inspects your API traffic for individual sessions, we can offer more tools for visibility, management, and control.

If you are unsure of the session identifiers that your API uses, consult with your development team. A common session identifier for API traffic is the **Authorization** header.