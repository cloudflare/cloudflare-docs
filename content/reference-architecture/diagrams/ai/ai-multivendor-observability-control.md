---
title: Multi-vendor AI observability and control
pcx_content_type: reference-architecture-diagram
weight: 1
meta:
  title: "Multi-vendor AI observability and control"
---

# Multi-vendor AI observability and control

## Introduction

The AI landscape is rapidly evolving with new models, services, and applications emerging daily. Many developers and organizations seek to enhance agility by opting for inference-as-a-service solutions like [Workers AI](/workers-ai/), rather than developing or managing models themselves.

Inference-as-a-Service is a cloud-based model that allows users to deploy and execute AI without managing underlying infrastructure. The platform handles all aspects of model serving, including scaling resources based on demand, often-times supporting both real-time and batch inference. Users can send input data to the model via API calls, with the service provider managing servers, scaling, and maintenance tasks. Typically operating on a pay-as-you-go model, inference services simplify model deployment and scaling, enabling organizations to leverage AI capabilities without infrastructure complexities.

As this field evolves rapidly, developers and organizations face several challenges:

- Fragmentation: Many inference service providers offer only a limited range of models and features. Different use cases may require multiple vendors, leading to fragmentation.
- Availability: With increasing demand and fast-paced technological advancements, inference service providers struggle to maintain high API availability.
- Lack of observability: Providers often offer limited analytics and logging capabilities, which vary across vendors. Gaining a unified view of AI usage proves challenging.
- Lack of security control: Organizations encounter difficulties in maintaining adequate security measures.
- Lack of cost control: Understanding usage insights can be challenging, and the absence of custom rate limits poses risks in public-facing AI use cases.

Using a forward proxy can mitigate these challenges. Positioned between the service making inference requests and the inference service platform, it serves as a single point for observability and control. By shifting features such as rate limiting, caching, and error handling to the proxy layer, organizations can apply unified configurations across services and inference service providers.

## AI forward proxy setup

The following architecture illustrates the setup of [AI Gateway](/ai-gateway/) as a forward proxy between a service and one or multiple AI inference providers, such as [Workers AI](/workers-ai/)

![Figure 1: Multi-vendor AI architecture](/images/reference-architecture/ai-multivendor-observability-control/ai-multi-vendor-observability-control.svg "Multi-vendor AI architecture")

1. **Inference request**: Send POST request to your AI gateway.
2. **Request proxying**: Forward POST request to AI Inference provider or serve response from [cache, if enabled and available](/ai-gateway/get-started/configuring-settings/#caching). Both [analytics](/ai-gateway/get-started/configuring-settings/#analytics) and [logs](/ai-gateway/get-started/configuring-settings/#logging) are collected in the process and controls such as Rate Limiting enforced.
3. **Error handling**: In case of errors, retry request or fallback to other inference provider, depending on configuration.

## Related resources

- [AI Gateway: Get started](/ai-gateway/get-started/)
- [AI Gateway: Supported Providers](/ai-gateway/providers/)
