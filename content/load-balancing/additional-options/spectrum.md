---
pcx_content_type: navigation
title: Spectrum
weight: 2
meta:
  title: Add load balancing to Spectrum applications
---

# Add load balancing to Spectrum applications

You can configure [Spectrum](/spectrum/) with Load Balancing to bring resiliency to you TCP or UDP based applications.

Leverage TCP/UDP health monitors, failover, and traffic steering by selecting a load balancer as **Origin** when creating your Spectrum application.

The exact settings will vary depending on your use case. Refer to the following steps to understand the workflow.

---

## Set up

### 1. Configure your load balancer


### 2. Configure your Spectrum application

---

## Limitations

* Load Balancing [custom rules](/load-balancing/additional-options/load-balancing-rules/) are not supported by Spectrum.

* UDP health checks are only available with public monitoring. TCP can be used with both public and private montoring.