---
_build:
  publishResources: false
  render: never
  list: never
---

Block unauthorized applications to limit your users' access to certain web-based tools and minimize the risk of {{<glossary-tooltip term_id="shadow IT" link="https://www.cloudflare.com/learning/access-management/what-is-shadow-it/">}}shadow IT{{</glossary-tooltip>}}. For example, the following policy blocks popular AI chatbots.

| Selector    | Operator | Value                                           | Action |
| ----------- | -------- | ----------------------------------------------- | ------ |
| Application | in       | _Microsoft Copilot_, _ChatGPT_, _Google Gemini_ | Block  |
