---
title: About
pcx-content-type: concept
weight: 2
---

# How it works

HTTP Applications work through a combination of **applications**, **versions**, and **routing rules**.

![Diagram illustrating how applications, versions, and routing rules interact. For more details, read further.](/http-applications/static/http-application-version-flow.png)

## Application versions

When you [create a new application](/http-applications/how-to/manage-applications-and-versions/#create-new-http-application), Cloudflare automatically copies over configuration settings from an existing zone. This creates a new *application*, as well as the first *version* of that application.

In that first version, you can [update](/http-applications/how-to/manage-applications-and-versions/#edit-a-version) the associated zone configuration settings (SSL Encryption mode, Page Rules, and more). 

You can also [create a new version](/http-applications/how-to/manage-applications-and-versions/#create-new-version-of-application) as a copy of a previous version if you wanted to make gradual changes.

## Routing rules

Once you have one or more versions, you would then [adjust the routing rules](/http-applications/how-to/manage-routing-rules/#update-routing-rules) for your application.

These routing rules determine which version of your application is used for specific environments (staging or production).