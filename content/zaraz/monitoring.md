---
pcx_content_type: how-to
title: Zaraz Monitoring
weight: 7
---

# Zaraz Monitoring

Zaraz Monitoring shows you different metrics regarding Zaraz. This helps you to detect issues when they occur. For example, if a third-party analytics provider stops collecting data, you can use the information presented by Zaraz Monitoring to find where in the workflow the problem occurred.

You can also check activity data in the **Activity last 24hr** section, when you access [tools](/zaraz/get-started/add-tool/), [actions](/zaraz/get-started/create-actions/) and [triggers](/zaraz/get-started/create-trigger/) in the dashboard.

To use Zaraz Monitoring:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and domain.
2. Go to **Zaraz** > **Monitoring**.
3. Select one of the options (Loads, Events, Triggers, Actions). Zaraz Monitoring will show you how the traffic for that section evolved for the time period selected.

## Zaraz Monitoring options

- **Loads**: Counts how many times Zaraz was loaded on pages of your website. When [Single Page Application support](/zaraz/reference/settings/#single-page-application-support) is enabled, Loads will count every change of navigation as well.
- **Events**: Counts how many times a specific event was tracked by Zaraz. It includes the [Pageview event](/zaraz/get-started/), [Track events](/zaraz/web-api/track/), and [E-commerce events](/zaraz/web-api/ecommerce/).
- **Triggers**: Counts how many times a specific trigger was activated. It includes the built-in [Pageview trigger](/zaraz/get-started/create-trigger/) and any other trigger you set in Zaraz.
- **Actions**: Counts how many times a [specific action](/zaraz/get-started/create-actions/) was activated. It includes the pre-configured Pageview action, and any other actions you set in Zaraz.