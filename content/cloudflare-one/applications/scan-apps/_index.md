---
pcx_content_type: how-to
title: Scan SaaS applications
layout: single
weight: 5
---

# Scan SaaS applications

Cloudflare’s API-driven Cloud Access Security Broker (CASB) scans SaaS applications for misconfigurations, unauthorized user activity, shadow IT, and other data security issues that can occur after a user has successfully logged in.

When you integrate a third-party SaaS application with Cloudflare CASB, you allow CASB to make API calls to the application and read relevant data on your behalf. The CASB integration permissions are read-only and follow the least privileged model. In other words, only the minimum access required to perform a scan is granted.

## Prerequisites

Before you can integrate a SaaS application with CASB, your SaaS account must meet certain requirements. To view the prerequisites and permissions for your application, refer to its [integration guide](/cloudflare-one/applications/scan-apps/casb-integrations/).

## Add an integration

1. In the [Zero Trust Dashboard](https://dash.teams.cloudflare.com/), navigate to **CASB** > **Integrations**.
2. Click **Add integration**.
3. Browse the available SaaS integrations and click the application you would like to add.
4. Follow the step-by-step integration instructions in the UI.
5. To run your first scan, click **Save integration**. You will be redirected to the Findings page to see an in-depth listing of issues found.

After the first scan, CASB will automatically scan your application on a frequent basis to keep up with any changes. Due to each application having their own set of requirements, scan intervals will vary, but the frequency is typically between every 1 hour and every 24 hours.

## View security findings

In the [Zero Trust Dashboard](https://dash.teams.cloudflare.com/), navigate to **CASB** > **Findings**. You will see a list of all security issues detected and steps for resolving each issue.

### Severity levels

Findings, or security issues detected from an integration, are tagged with one of the following severity levels:

* **Critical** suggests the finding is something your team should act on today.
* **High** suggests the finding is something your team should act on this week.
* **Medium** suggests the finding should be reviewed sometime this month.
* **Low** suggests the finding is informational or part of a scheduled review process.

## Pause an integration

1. In the [Zero Trust Dashboard](https://dash.teams.cloudflare.com/), navigate to **CASB** > **Integrations**.
2. Identify the integration for which you would like to pause and click **Manage**.
3. To stop scanning the application, click **Pause**.

You can resume application scanning at any time by clicking **Resume**.

## Delete an integration

{{<Aside type="warning">}}

When you delete an integration, all keys and OAuth data will be deleted. This means you cannot restore a deleted integration or its scanned data.

{{</Aside>}}

1. In the [Zero Trust Dashboard](https://dash.teams.cloudflare.com/), navigate to **CASB** > **Integrations**.
2. Identify the integration for which you would like to delete and click **Manage**.
3. Click **Delete**.
