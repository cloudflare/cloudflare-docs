---
title: Multi-vendor AI observability and control
pcx_content_type: reference-architecture-diagram
weight: 1
meta:
  title: "Multi-vendor AI observability and control"
---

# Multi-vendor AI observability and control

## Introduction

## AI Proxy Setup

The following architecture illustrates the setup [AI Gateway](/ai-gateway/) as forward proxy between a service and one or multiple AI inference providers such as [Workers AI](/workers-ai/)

![Figure 1: Multi-vendor AI architecture](/images/reference-architecture/ai-multivendor-observability-control/ai-multi-vendor-observability-control.svg "Multi-vendor AI architecture")

1. **Inference request**: Send POST request to your AI gateway.
2. **Request proxying**: Forward POST request to AI Inference provider or serve response from [cache, if enabled and available](/ai-gateway/get-started/configuring-settings/#caching). Both [analytics](/ai-gateway/get-started/configuring-settings/#analytics) and [logs](/ai-gateway/get-started/configuring-settings/#logging) are collected in the process and controls such as Rate Limiting enforced.
3. **Error handling**: In case of errors, retry request or fallback to other inference provider, depending on configuration.

## Related resources

- [AI Gateway: Get started](/ai-gateway/get-started/)
- [AI Gateway: Supported Providers](/ai-gateway/providers/)
