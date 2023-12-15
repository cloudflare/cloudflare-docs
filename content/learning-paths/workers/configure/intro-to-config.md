---
title: Routing, Cron Triggers and deployments
pcx_content_type: learning-unit
weight: 1
layout: learning-unit
---

## Routing, Cron Triggers and deployments

After creating your first Worker, explore some available features. All available Workers features are documented under [Configuration](/workers/configuration/) in the Workers developer documentation.

### Routing

Set your Worker to run on a specific path by learning which routing option is right for you in [Routes and domains](/workers/configuration/routing/).

### Cron Triggers

Configure your Worker to run on a schedule with [Cron Triggers](/workers/configuration/cron-triggers/). As you read in module 1, Workers execute when a request invokes the `fetch()` handler defined in your Worker code. Cron Triggers allows your Worker to execute on a schedule set by you, rather than being invoked by a web request. This is ideal for running periodic jobs, such as maintenance windows or calling third-party APIs to collect up-to-date data.

### Deployments

Review your deployments and rollback to a previous version of your Worker with [Deployments](/workers/configuration/deployments/).