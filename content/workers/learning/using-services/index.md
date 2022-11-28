---
pcx_content_type: concept
title: Workers Services
weight: 15
layout: single
---

# Workers Services

Workers Services are the new building blocks for deploying applications on Cloudflare Workers. Workers Services are made of environments, which are scripts that can contain bindings to KV stores, Durable Objects, or even other services, as well as environment variables and secrets.

{{<Aside type="note" header="Workers versus Workers Services?">}}

Workers Services are synonymous with Workers. In the legacy Workers model, Workers were created by writing scripts. Workers scripts could not communicate with each other. In the Workers Services model, Workers Services are made up of Workers Environments that are a collection of bindings, environment variables, secrets, and script deployments. The introduction of Workers Services also adds Worker-to-Worker communication functionality via Workers Service bindings.

{{</Aside>}}

Unlike a traditional Workers script, a Workers Service is composable, which allows Workers services to talk to each other; allowing you to develop new kinds of services like routers, middlewares, deployment managers, or traffic gateways.

{{<Aside type="note">}}

To enable a seamless transition to Workers Services, all scripts have been automatically migrated to Services with one production environment. No action is needed from the user.

{{</Aside>}}

Each Workers Service comes with a production environment. Every aspect of an environment is overridable: the code, environment variables, and resource bindings, like KV namespaces and Durable Objects.


## Service environments

{{<Aside type="note">}}

We have temporarily disabled the creation of Service Environments while we are improving this feature.

We recommend using [Deployments](/workers/platform/deployments) in place of Environments. Deployments give you a powerful audit log of changes to your application, and will soon include integrated rollbacks and automated deployment.

{{</Aside>}}

Wrangler supports an older version of environments. With Wrangler environments, you create custom contexts for your code to run in by adding keys to your `wrangler.toml` file. Wrangler will then generate a separate Workers Service for each Wrangler environment. If you make a staging and production environment, for example, Wrangler will generate `my-worker-staging` and `my-worker-prod`.

Workers Service environments take a cleaner approach. You can create and edit environments directly in the dashboard:

1.  Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/).
2.  Select your **Account**.
3.  Go to **Workers**.
4.  Select your **Workers Service**.
5.  Select **Quick edit**.

Unlike Wrangler environments, Workers Service environments do not create extra Workers Services. They are, however, able to connect to their own KV stores and Durable Objects. The code for any environment can be changed directly in the dashboard via the quick editor:

1.  Go to **Account Home**.
2.  Go to **Workers**.
3.  Choose your **Worker**.
4.  Select **Quick edit**.

![Select Quick edit to make edits to the Worker script](./media/quick-edit.png)

A common workflow is to create an environment for a test feature, edit the code via the quick editor until you are satisfied with it, and then promote it to production when the code is ready.

Each environment is resolvable at a unique hostname, which is automatically generated when you create or rename the environment. There is no wait after you deploy. Everything you need, like DNS records and SSL certificates, is ready seconds later. If you would like a more advanced setup, you can add custom routes from your domain to an environment.

## Service bindings

[Service bindings](/workers/platform/bindings/about-service-bindings/) are an API that facilitate Worker-to-Worker communication.

A Service binding allows you to send requests to another Worker without those requests going over the Internet. The request immediately invokes the downstream Worker. Service bindings allow for much more composability on the Workers platform.

Read more about [Service bindings](../../platform/bindings/about-service-bindings).
