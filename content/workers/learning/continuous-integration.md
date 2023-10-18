---
pcx_content_type: concept
title: Continuous integration
---

# Continuous integration

Integrate Workers to your existing services and platforms to optimize your continuous integration and continuous deployment flow. On this page, review some of the integrations supported for Cloudflare Workers.

## GitHub

- [Wrangler GitHub Action](https://github.com/cloudflare/wrangler-action) offers a reliable and convenient way to deploy Workers projects automatically when you push.

## GitLab Pipelines

- [GitLab Pipelines](https://docs.gitlab.com/ee/ci/pipelines/index.html) allow you to set up a continuous integration flow with Cloudflare Workers.

## Other resources

### Terraform

- [Terraform](https://www.terraform.io/) provides an alternative way to configure Worker scripts and routes. Instead of using the Cloudflare dashboard or API directly, you define scripts and routes in declarative configuration files. Terraform then figures out how to make the API calls for you. This also lets you treat your Worker configuration like your code. You can check your configuration files into version control and integrate them into your normal software development workflow.
