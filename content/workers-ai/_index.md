---
title: Overview
order: 0
type: overview
weight: 1
layout: overview
pcx_content_type: overview
meta:
  title: Workers AI
---

# Workers AI

{{<description>}}
Run machine learning models, powered by serverless GPUs, on Cloudflare's global network.
{{</description>}}

{{<plan type="workers_all">}}

Workers AI allows you to run machine learning models, on the Cloudflare network, from your own code -- whether that be from [Workers](/workers/), [Pages](/pages/), or anywhere via [the Cloudflare API](/api/operations/workers-ai-post-run-model).

With the launch of Workers AI, Cloudflare is slowly rolling out GPUs to its global network. This enables you to build and deploy ambitious AI applications that run near your users, wherever they are.

{{<render file="_custom_requirements.md">}}

{{<render file="_file_issues.md">}}

---
## Features

{{<feature header="Models" href="/workers-ai/models/" cta="Browse models">}}

Workers AI comes with a curated set of popular open-source models that enable you to do tasks such as image classification, text generation, object detection and more.

{{</feature>}}

---

## Related products

{{<related header="AI Gateway" href="/ai-gateway/" product="ai-gateway">}}

Observe and control your AI applications with caching, rate limiting, request retries, model fallback, and more.

{{</related>}}

{{<related header="Vectorize" href="/vectorize/" product="vectorize">}}

Build full-stack AI applications with Vectorize, Cloudflare’s vector database. Adding Vectorize enables you to perform tasks such as semantic search, recommendations, anomaly detection or can be used to provide context and memory to an LLM.

{{</related>}}

{{<related header="Workers" href="/workers/" product="workers">}}

Build serverless applications and deploy instantly across the globe for exceptional performance, reliability, and scale.

{{</related>}}

{{<related header="Pages" href="/pages/" product="pages">}}

Create full-stack applications that are instantly deployed to the Cloudflare global network.

{{</related>}}

{{<related header="R2" href="/r2/" product="r2">}}

Store large amounts of unstructured data without the costly egress bandwidth fees associated with typical cloud storage services.

{{</related>}}

{{<related header="D1" href="/d1/" product="d1">}}

Create new serverless SQL databases to query from your Workers and Pages projects.

{{</related>}}

{{<related header="Durable Objects" href="/durable-objects/" product="durable-objects">}}

A globally distributed coordination API with strongly consistent storage.

{{</related>}}

{{<related header="KV" href="/kv/" product="kv">}}

Create a global, low-latency, key-value data storage.

{{</related>}}

---

## More resources

{{<resource-group>}}

{{<resource header="Get started" href="/workers-ai/get-started/workers-wrangler/" icon="learning-center-book">}}Build and deploy your first Workers AI application.{{</resource>}}

{{<resource header="Plans" href="/workers-ai/platform/pricing/" icon="price">}}Learn about Free and Paid plans.{{</resource>}}

{{<resource header="Limits" href="/workers-ai/platform/limits/" icon="documentation-clipboard">}}Learn about Workers AI limits.{{</resource>}}

{{<resource header="Use cases" href="/use-cases/ai/" icon="documentation-clipboard">}}Learn how you can build and deploy ambitious AI applications to Cloudflare's global network.{{</resource>}}

{{<resource header="Storage options" href="/workers/platform/storage-options/" icon="learning-center-book">}}Learn which storage option is best for your project.{{</resource>}}

{{<resource header="Developer Discord" href="https://discord.cloudflare.com" icon="logo-Discord">}}Connect with the Workers community on Discord to ask questions, share what you are building, and discuss the platform with other developers.{{</resource>}}

{{<resource header="@CloudflareDev" href="https://x.com/cloudflaredev" icon="twitter">}}Follow @CloudflareDev on Twitter to learn about product announcements, and what is new in Cloudflare Workers.{{</resource>}}

{{</resource-group>}}
