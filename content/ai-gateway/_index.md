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

Check out the [Get started guide](/ai-gateway/get-started/) to learn how to configure your applications with AI Gateway.

## Features

{{<feature header="Analytics" href="/ai-gateway/get-started/configuring-settings/#analytics" cta="View analytics">}}

View metrics such as the number of requests, tokens, and the cost it takes to run your application.

{{</feature>}}

{{<feature header="Real-time logs" href="/ai-gateway/get-started/configuring-settings/#logging" cta="View Real-time logs">}}

Gain insight on requests and errors.

{{</feature>}}

{{<feature header="Caching" href="/ai-gateway/configuration/caching/">}}

Serve requests directly from Cloudflare's cache instead of the original model provider for faster requests and cost savings.

{{</feature>}}

{{<feature header="Rate limiting" href="/ai-gateway/get-started/configuring-settings/#rate-limiting">}}

Control how your application scales by limiting the number of requests your application receives.

{{</feature>}}

{{<feature header="Request retry and fallback" href="/ai-gateway/configuration/fallbacks/">}}

Improve resilience by defining request retry and model fallbacks in case of an error.

{{</feature>}}

{{<feature header="Your favorite providers" href="/ai-gateway/providers/">}}

Workers AI, OpenAI, Azure OpenAI, HuggingFace, Replicate, and more work with AI Gateway.

{{</feature>}}

---

## Related products

{{<related header="Workers AI" href="/workers-ai/" product="workers-ai">}}

Run machine learning models, powered by serverless GPUs, on Cloudflare’s global network.

{{</related>}}

{{<related header="Vectorize" href="/vectorize/" product="vectorize">}}

Build full-stack AI applications with Vectorize, Cloudflare’s vector database. Adding Vectorize enables you to perform tasks such as semantic search, recommendations, anomaly detection or can be used to provide context and memory to an LLM.

{{</related>}}

## More resources

{{<resource-group>}}

{{<resource header="Developer Discord" href="https://discord.cloudflare.com" icon="logo-Discord">}}Connect with the Workers community on Discord to ask questions, show what you are building, and discuss the platform with other developers.{{</resource>}}

{{<resource header="@CloudflareDev" href="https://twitter.com/cloudflaredev" icon="twitter">}}Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Workers.{{</resource>}}

{{</resource-group>}}