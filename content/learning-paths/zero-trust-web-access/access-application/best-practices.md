---
title: Best practices
pcx_content_type: overview
weight: 2
layout: learning-unit
---

Learn best practices for building scalable Access applications and policies.

## Use Access groups

Access groups are reusable sets of rules that you can quickly apply across multiple applications. This could be a definition such as "corporate users", which has both device posture check requirements and specific emails, or just “developers”, which references a group in your identity provider. If you have many applications that will need identical policy structure, we recommend building an Access group and referencing it across multiple applications.

{{<render file="access/_access-group.md" productFolder="cloudflare-one">}}

## Define your domain structure

Access applications have an inherently flexible and powerful domain structure capability. Your domain structure should achieve your application security goals without being overly permissive or overly restrictive. Before designing applications for production, review the [Application paths documentation](/cloudflare-one/policies/access/app-paths/) to understand how path definitions work and how to use wildcards.

### Multiple domains in an application

Many customers who have workflows designed around internal web applications, especially those that were built internally, often see challenges related to interdependencies on multiple internal services. Separately, there can be challenges related to SPAs (Single-Page Applications) that make onboarding to a Zero Trust Web Access service difficult. For example, an application may have iFrames or other embedded systems that rely on different internal and/or external addresses.

If your internal service operates in this way, we recommend specifying multiple top-level domains in a single Access application. Otherwise, if the goal of using multiple domains is to streamline or simplify policy creation, we recommend making one primary domain per application, and automating the rest of your deployment [using Terraform](/learning-paths/zero-trust-web-access/terraform/) or another Infrastructure as Code (IaC) service.
