---
title: Disposition actions
pcx-content-type: concept
weight: 1
---

# Disposition actions

**Disposition actions** allow you to customize whether and how Area 1 rewrites potentially malicious URLs within the body of an email.

{{<Aside type="note">}}

Disposition actions are only applicable to customers using an [inline setup](/email-security/deployment/inline/).

{{</Aside>}}

## Enable URL rewrites

To choose which dispositions should have rewritten URLs:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Email Policies** > **Disposition Actions**.
4. Click **Edit**.
5. For each disposition, choose whether to take **No Action** or **URL Defang** (a URL rewrite).
6. Click **Save URL Actions**.

## Customize ignore patterns

Even if you want to rewrite URLs in the body of certain messages, you still might want Area 1 to ignore specific URL patterns.

To customize your URL ignore patterns:

1. Log in to the [Area 1 dashboard](https://horizon.area1security.com/).
2. Go to **Settings** (the gear icon).
3. On **Email Configuration**, go to **Email Policies** > **Disposition Actions**.
4. For **URL Rewrite Ignore Patterns**, enter a valid IP address, URL, or [valid](https://www.freeformatter.com/java-regex-tester.html) Java expressions Regex.
5. Click **Add Pattern**.