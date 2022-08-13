---
title: Domains
pcx_content_type: how-to
weight: 1
---

# Domains

Cloudflare Area 1 works through a system of domain-based routing, where Cloudflare receives and evaluates incoming email from a domain.

## Create a domain

To create a new domain in Area 1:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email Configuration** > **Domains & Routing** > **Domains**.
4. Click **New Domain**.
5. Enter the following information:

   - **Domain**: The domain name receiving email traffic.
   - **Configured As**: Choose **MX Records** or specify a number of **Hops** (depending on your email architecture).
   - **Forwarding To**: Enter the hostname of your email provider.
   - **IP Restrictions** (optional): Restrict incoming traffic to the IP addresses of your mail servers.
   - **Inbound TLS** (only available for non-MX domains): Applies TLS to incoming traffic.
   - **Outbound TLS**: Choose between **Forward all messages over TLS** (recommended) or **Forward all messages using opportunistic TLS**.
   - **Quarantine Policy**: Choose the [dispositions](/email-security/reference/dispositions-and-attributes/) you want to send to [Admin quarantine](/email-security/email-configuration/admin-quarantine/).

6. Click **Publish Domain**.

---

## Edit a domain

To edit an existing domain:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email Configuration** > **Domains & Routing** > **Domains**.
4. On a specific domain, click **...** > **Edit**.
5. Make changes as needed.
6. Click **Update Domain**.

---

## Delete a domain

To delete a domain:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. Go to **Email Configuration** > **Domains & Routing** > **Domains**.
4. On a specific domain, click **...** > **Delete**.
