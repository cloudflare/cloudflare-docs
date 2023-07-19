---
pcx_content_type: concept
title: Continuous integration
---

# Continuous integration

Integrate Workers to your existing services and platforms to optimize your continuous integration and continuous deployment flow. The integrations officially supported for Cloudflare Workers are:

## GitHub

- [Wrangler GitHub Action](https://github.com/cloudflare/wrangler-action) offer a reliable and convenient way to deploy Workers projects automatically when you push.

## Lerna

- [Lerna](https://lerna.js.org/) allows you to easily [manage multiple Workers projects in one repository](/workers/tutorials/manage-projects-with-lerna/).

## Terraform

- [Terraform](https://www.terraform.io/) provides an alternative way to configure Worker scripts and routes. Instead of using the Cloudflare dashboard or API directly, you define scripts and routes in simple, declarative configuration files. Terraform then figures out how to make the API calls for you. This also lets you treat your Worker configuration like your code. You can check your configuration files into version control and integrate them into your normal software development workflow.

## Serverless Framework

- [Serverless Framework](https://github.com/serverless/serverless) helps you develop and deploy serverless applications using Cloudflare Workers. This CLI provides structure, automation, and best practices to allow you to focus on building sophisticated, event-driven, serverless architectures, comprised of functions and events. The Serverless Framework manages the infrastructure as a [Serverless Plugin](https://github.com/cloudflare/serverless-cloudflare-workers) that turns your version-controlled code into Workers globally deployed with one command. You only maintain [one configuration file](https://www.serverless.com/framework/docs/providers/cloudflare/guide/quick-start#config) to direct exactly where Workers live. This gives you flexibility to modify your code, rebuild, and deploy in moments - without ever touching a browser. Learn more about serverless with the [quick start guide to the plugin](https://serverless.com/framework/docs/providers/cloudflare/guide/intro/).

  {{<Aside type="note">}}

The Serverless Framework does not currently support `*.workers.dev` subdomains. Track support progress on [this GitHub issue](https://github.com/cloudflare/serverless-cloudflare-workers/issues/36).

    {{</Aside>}}