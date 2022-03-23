---
title: Quickstart
pcx-content-type: tutorial
layout: single
weight: 1
meta:
  title: Getting access to the Cloudflare API
---

# Getting access to the Cloudflare API

Using the Cloudflare API, requires authentication so that Cloudflare knows who is making requests and what permissions they have. An API Token can be created to grant access to the API to perform actions. See [creating an API Token](/api/tokens/create/) for more on this.

Legacy Note: Existing customers may be familiar with API Keys. These allow for less granular access and each user can only have one. For these reasons, we advice customers using API Keys to transition to using API Tokens.

## Making API Calls

Once you have your API Token created, all API requests are authorized in the same way. Cloudflare uses the [RFC standard](https://tools.ietf.org/html/rfc6750#section-2.1) `Authorization: Bearer <Token>` interface. When used in an example Cloudflare API request it looks like this:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">curl</span><span class="CodeBlock--token-plain"> -X GET </span><span class="CodeBlock--token-string">&quot;https://api.cloudflare.com/client/v4/zones/&ltACCOUNT_ID&gt&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-H </span><span class="CodeBlock--token-string">&quot;Content-Type:application/json&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">\</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">-H </span><span class="CodeBlock--token-string">&quot;Authorization: Bearer YQSn-xWAQiiEh9qM58wZNnyQS7FUdoqGIUAbrh7T&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

The above example is just that, an example. Never send anyone or store you API Token secret in plaintext. Also be sure not to check it into code repositories especially public ones like on github.

## Finding your zone and account IDs

When using the Cloudflare API, you will need to know your **Account ID** and **Zone ID**.

For help finding those values, refer to [Finding your zone and account IDs](/fundamentals/get-started/basic-tasks/find-account-and-zone-ids/).

## Using Cloudflare’s APIs

For specific guidance on making API calls, see the following:

*   The specific [Developer Docs section](/) for a service for how to guides.
*   [API schema docs](https://api.cloudflare.com) for request and response payloads for each endpoint.
*   If you are using [golang](https://github.com/cloudflare/cloudflare-go) or [Hashicorp's Terraform](https://github.com/cloudflare/terraform-provider-cloudflare) you can leverage our 1st party libraries to integrate with Cloudflare's API.
