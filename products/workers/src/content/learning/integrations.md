---
order: 12
---

# Integrations

Integrate Workers to your existing services and platforms to optimize your continuous integration and continuous deployment flow. The integrations officially supported for Cloudflare Workers are:

## GitHub

- __[Wrangler GitHub Action](https://github.com/cloudflare/wrangler-action)__ offer a reliable and convenient way to deploy Workers projects automatically when you push.

## Lerna

- __[Lerna](https://lerna.js.org/)__ allows you to easily [manage multiple Workers projects in one repository](/tutorials/manage-projects-with-lerna).

## Terraform

- __[Terraform](https://www.terraform.io/)__ provides an alternative way to configure Worker scripts and routes. Instead of using the Cloudflare dashboard or API directly, you define scripts and routes in simple, declarative configuration files. Terraform then figures out how to make the API calls for you. This also lets you treat your Worker configuration like your code. You can check your configuration files into version control and integrate them into your normal software development workflow.

## Serverless Framework

- __[Serverless Framework](https://github.com/serverless/serverless)__ helps you develop and deploy serverless applications using Cloudflare Workers. This CLI provides structure, automation, and best practices to allow you to focus on building sophisticated, event-driven, serverless architectures, comprised of functions and events. The Serverless Framework manages the infrastructure as a [Serverless Plugin](https://github.com/cloudflare/serverless-cloudflare-workers) that turns your version-controlled code into Workers globally deployed with one command. You only maintain [one config file](https://serverless.com/framework/docs/providers/cloudflare/guide/quick-start#config) to direct exactly where Workers live. This gives you flexibility to modify your code, rebuild, and deploy in moments - without ever touching a browser. Go serverless with Cloudflare Workers. Quickly get up to speed with this [quick start guide to the plugin](https://serverless.com/framework/docs/providers/cloudflare/guide/intro/).

  <Aside>

  __Note:__ The Serverless Framework does not currently support `workers.dev`. Track our progress on [this GitHub issue](https://github.com/cloudflare/serverless-cloudflare-workers/issues/36).

  </Aside>
