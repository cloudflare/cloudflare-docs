---
title: Overview
pcx_content_type: overview
layout: overview
weight: 1
meta:
  title: AI Gateway
---

{{<heading-pill style="beta" heading="h1">}}AI Gateway{{</heading-pill>}}

{{<description>}}
Observe and control your AI applications.
{{</description>}}

{{<plan type="all">}}

Cloudflare's AI Gateway allows you to gain visibility and control over your AI apps. By connecting your apps to AI Gateway, you can gather insights on how people are using your application with analytics and logging and then control how your application scales with features such as caching, rate limiting, as well as request retries, model fallback, and more. Better yet - it only takes one line of code to get started.

**Key features include:**
* **Analytics:** View metrics such as the number of requests, tokens, and the cost it takes to run your application
* **Real-time logs:** Gain insight on requests and errors
* **Caching:** Serve requests directly from Cloudflare's cache instead of the original model provider for faster requests and cost savings
* **Rate limiting:** Control how your application scales by limiting the number of requests your application receives
* **Request retry and fallback:** Improve resilience by defining request retry and model fallbacks in case of an error
* **Support for your favorite providers:** Workers AI, OpenAI, Azure OpenAI, HuggingFace, Replicate all work with AI Gateway (more to come)
* **Response streaming :** AI Gateway supports response streaming

Check out the [Get started guide](/ai-gateway/get-started/) to learn how to configure your applications with AI Gateway.

## More resources

{{<resource-group>}}

{{<resource header="Developer Discord" href="https://discord.cloudflare.com" icon="logo-Discord">}}Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.{{</resource>}}

{{<resource header="@CloudflareDev" href="https://twitter.com/cloudflaredev" icon="twitter">}}Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Workers.{{</resource>}}

{{</resource-group>}}