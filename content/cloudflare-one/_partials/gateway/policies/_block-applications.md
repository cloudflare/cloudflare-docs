---
_build:
  publishResources: false
  render: never
  list: never
---

## Block unauthorized applications

To minimize the risk of {{<glossary-tooltip term_id="shadow IT" link="https://www.cloudflare.com/learning/access-management/what-is-shadow-it/">}}shadow IT{{</glossary-tooltip>}}, some organizations choose to limit their users' access to certain web-based tools and applications. For example, the following policy blocks AI assistants:

| Selector    | Operator | Value                                           | Action |
| ----------- | -------- | ----------------------------------------------- | ------ |
| Application | in       | _Microsoft Copilot_, _ChatGPT_, _Google Gemini_ | Block  |

{{<Aside type="note">}}
After seven days, view your [shadow IT analytics](/cloudflare-one/insights/analytics/access/) and block additional applications based on what your users are accessing.
{{</Aside>}}
