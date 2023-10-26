---
pcx_content_type: concept
title: Sentry integration (beta)
meta:
  description: Connect to a Sentry project from your Worker to automatically send errors and uncaught exceptions to Sentry.
---

{{<heading-pill style="beta">}}Sentry integration{{</heading-pill>}}

[Sentry](https://sentry.io/welcome/) is an error tracking and performance monitoring platform that allows developers to diagnose, fix, and optimize the performance of their code.

This integration allows you to connect to a Sentry project from your Worker to automcatically send errors and uncaught exceptions to Sentry with no code changes needed in the Workers application.

## How it works

This integration adds a [Tail Worker](/workers/observability/tail-workers) to your application Worker. The Tail Worker automatically sends errors and uncaught exceptions to the Sentry project you have configured.

This integration supports the following Sentry features:
- **[Data Handling](https://develop.sentry.dev/sdk/data-handling/)**: As a best practice, do not include PII or other sensitive data in the payload sent to Sentry. HTTP headers (for example, `Authorization` or `Cookie`) can be removed before events are forwarded to Sentry.
- **[Sampling](https://docs.sentry.io/platforms/javascript/configuration/sampling/#configuring-the-transaction-sample-rate)**: Sampling can be configured to manage the number and type of events sent to Sentry. Sampling rates can be configured based on the HTTP status code returned by the Worker and for uncaught exceptions. Setting the sampling rate to 100% sends all events to Sentry or setting it to 30% sends approximately 30% of events to Sentry.
- **[Breadcrumbs](https://docs.sentry.io/product/issues/issue-details/breadcrumbs/)**: Breadcrumbs create a trail of events that happened prior to an issue. Breadcrumbs are automatically forwarded to Sentry in the case of an error or exception. These events consist of the `console.log()` from the Worker before the error or exception occurred. 

{{<Aside type="note">}}
If there are more configuration options that you would like to see, leave us feedback on the [Cloudflare Developer Discord](https://discord.gg/wCzAmkNF) (channel name: integrations). 
{{</Aside>}}


## Set up an integration with Sentry

To set up an integration with Sentry:

1. You need to have an existing Sentry project to connect to. [Create a Sentry project](https://docs.sentry.io/product/sentry-basics/integrate-frontend/create-new-project), or use an existing project for this integration.

2. Add the Sentry integration to your Worker:

    1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
    2. In **Account Home**, select **Workers & Pages**.
    3. In **Overview**, select your Worker.
    4. Select **Integrations** > **Sentry**. 
    5. Follow the setup flow.

Once installed, the integration will automatically start forwarding matching events to Sentry. To learn more about Sentry, refer to [Sentry's official documentation](https://docs.sentry.io/).

{{<Aside type="warning">}}

Each Cloudflare account can only be linked to one Sentry organization. Use the [Sentry SDK](https://github.com/getsentry/sentry-javascript) in order to send events to projects in more than one Sentry organization.

{{</Aside>}}
