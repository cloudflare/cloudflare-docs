---
title: Gmail directory integration
pcx_content_type: how-to
weight: 2
---

# Gmail directory integration

Cloudflare Area 1 can integrate with Google to retrieve user and group information. This can be used to enforce the Business Email Compromise configuration to prevent user impersonation.

## 1. Create a service account in Google for Area 1 Directory Integration

You need to authorize Cloudflare Area 1 to make connections into your Google tenant to retrieve your directory details. Cloudflare recommends that you create a service account for this purpose. This account will require the following following permissions:

- View group subscriptions on your domain
- View organization units on your domain
- View groups on your domain
- See info about users on your domain

Follow these steps to create a service account. If you already have one, you can skip this step.

1. Access your [Google Admin console](https://admin.google.com/), and go to **Account** > **Admin roles**.
