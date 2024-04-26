---
pcx_content_type: concept
title: Baselime integration (beta)
meta:
  description: Connect to Baselime from your Worker to automatically send errors and logs to Baselime.
---

{{<heading-pill style="beta">}}Baselime integration{{</heading-pill>}}

[Baselime](https://baselime.io/) is an observability solution built for modern cloud-native environments. It combines logs, metrics, and distributed traces to give you full visibility across your microservices at scale.

This integration allows you to connect to a Baselime environment from your Worker to automatically send errors and logs to Baselime with no code changes needed in the Workers application.

{{<Aside type="note">}}

Baselime integration is available to all Enterprise customers and Free, Pro, and Business customers on the [Workers Paid plan](/workers/platform/pricing/).

{{</Aside>}}

## How it works

This integration adds a [Tail Worker](/workers/observability/logging/tail-workers) to your application Worker. The Tail Worker automatically sends errors and uncaught exceptions to the Baselime environment you have configured.

This integration supports the following Baselime features:
- **[Logging](https://baselime.io/docs/analysing-data/overview/)**: Request info, logs, and exceptions are all available to be searched for and analyzed.
- **[Error tracking](https://baselime.io/docs/analysing-data/errors/)**: Actively find and be notified of new errors and track their resolution.

{{<Aside type="note">}}
If there are more configuration options that you would like to see, leave us feedback on the [Cloudflare Developer Discord](https://discord.cloudflare.com) (channel name: integrations).
{{</Aside>}}

## Set up an integration with Baselime

To set up an integration with Baselime, you need to have a Baselime environment to connect to. If this is your first time using Baselime, you will be prompted to create an account and an environment during the integration setup.

To add the Baselime integration to your Worker:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com) and select your account.
2. Select **Workers & Pages**.
3. In **Overview**, select your Worker.
4. Select **Integrations** > **Baselime**.
5. Follow the setup flow.

Once installed, the integration will automatically start forwarding events to Baselime. To learn more about Baselime, refer to [Baselime's official documentation](https://baselime.io/docs/).


{{<render file="_wrangler-tail-warning.md">}}

{{<Aside type="warning">}}

Note that automatic distributed tracing is not yet supported via the Baselime integration. To add tracing, follow the [Baselime documentation](https://baselime.io/docs/sending-data/platforms/cloudflare/traces/).

{{</Aside>}}
