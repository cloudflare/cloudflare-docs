---
_build:
  publishResources: false
  render: never
  list: never
---

Using the Cloudflare API requires authentication so that Cloudflare knows who is making requests and what permissions you have. [Create an API token](/fundamentals/api/get-started/create-token/) to grant access to the API to perform actions.

{{<Aside type="note">}}

You can also authenticate with [API keys](/fundamentals/api/get-started/keys/), but these keys have [several limitations](/fundamentals/api/get-started/keys/#limitations) that make them less secure than API tokens. Whenever possible, use API tokens to interact with the Cloudflare API.

{{</Aside>}}