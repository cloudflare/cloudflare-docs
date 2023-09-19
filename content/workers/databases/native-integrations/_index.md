---
pcx_content_type: navigation
layout: single
title: Database Integrations (beta)
---

{{<heading-pill style="beta">}} Database Integrations {{</heading-pill>}}

## Background

Connect to databases using the new Database Integrations (beta) experience. Enable Database Integrations in the [Cloudflare dashboard](https://dash.cloudflare.com). With Database Integrations, Cloudflare automatically handles the process of creating a connection string and adding it as secrets to your Worker.

{{<Aside type="note" header="Making multiple round trip calls to a centralized database from a Worker?">}}

If your Worker is making multiple round trip calls to a centralized database, your Worker may be a good fit for Smart Placement. Smart Placement speeds up applications by automatically running your Worker closer to your back-end infrastructure rather than the end user. Learn more about [how Smart Placement works](/workers/configuration/smart-placement/).
{{</Aside>}}

## Database credentials

If you rotate or delete database credentials, you must delete the integration and go through the setup flow again. 

## Database limits

At this time, Database Integrations only support access to one database per provider. To add multiple, you must manually configure [secrets](/workers/configuration/environment-variables/).

## Supported platforms

{{<directory-listing>}}