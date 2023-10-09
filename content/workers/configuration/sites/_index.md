---
pcx_content_type: navigation
title: Workers Sites
layout: single
---

# Workers Sites

{{<render file="_workers_sites.md">}}

Workers Sites enables developers to deploy static applications directly to Workers. It can be used for deploying applications built with static site generators like [Hugo](https://gohugo.io) and [Gatsby](https://www.gatsbyjs.org), or front-end frameworks like [Vue](https://vuejs.org) and [React](https://reactjs.org).

To deploy with Workers Sites, select from one of these three approaches depending on the state of your target project:

---

## 1. Start from scratch

If you are ready to start a brand new project, this quick start guide will help you set up the infrastructure to deploy a HTML website to Workers.

<p>{{<button type="primary" href="/workers/configuration/sites/start-from-scratch/">}}Start from scratch{{</button>}}</p>

---

## 2. Deploy an existing static site

If you have an existing project or static assets that you want to deploy with Workers, this quick start guide will help you install Wrangler and configure Workers Sites for your project.

<p>{{<button type="primary" href="/workers/configuration/sites/start-from-existing/">}}Start from an existing static site{{</button>}}</p>

---

## 3. Add static assets to an existing Workers project

If you already have a Worker deployed to Cloudflare, this quick start guide will show you how to configure the existing codebase to use Workers Sites.

<p>{{<button type="primary" href="/workers/configuration/sites/start-from-worker/">}}Start from an existing Worker{{</button>}}</p>

{{<Aside type="note">}}

Workers Sites is built on Workers KV, and usage rates may apply. Refer to [Pricing](/workers/platform/pricing/) to learn more.

{{</Aside>}}
