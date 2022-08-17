---
title: About
pcx_content_type: concept
weight: 2
---

# How it works

HTTP Applications work through a combination of **applications**, **versions**, and **routing rules**.

![Diagram illustrating how applications, versions, and routing rules interact. For more details, read further.](/http-applications/static/http-application-version-flow.png)

## Applications and versions

An application is a collection of configuration settings associated with your zone, usually defined for a specific purpose. When you [create a new application](/http-applications/how-to/manage-applications-and-versions/#create-new-http-application), Cloudflare automatically copies over configuration settings from an existing zone.

For each application, you manage various configuration settings through a series of versions. Your application starts at Version 1. Each version represents a snapshot of your settings for managing traffic (Page Rules, Fiewall Rules, Cache settings, and more). All versions are independent of the others, but when you [create a new version](/http-applications/how-to/manage-applications-and-versions/#create-new-version-of-application), it is initialized as a copy of the version that preceded it.

Within each version, you can [update](/http-applications/how-to/manage-applications-and-versions/#edit-a-version) settings as needed. These settings are saved automatically and only applied to your zone traffic when you set up routing rules.

## Routing rules

With one or more versions, you can [set up routing rules](/http-applications/how-to/manage-routing-rules/#create-routing-rules) to start directing zone traffic to a specific version of your application.

Routing rules support two types of rules: staging rules and production rules. Though both apply to zone traffic, staging rules have an extra filter applied. Staging rules only affect traffic sent to specific IP addresses at the Cloudflare edge, meaning you can safely test changes without affecting end users.

Once you finish testing your changes in staging, you can then create a production routing rule to apply your version's configurations to your live traffic.