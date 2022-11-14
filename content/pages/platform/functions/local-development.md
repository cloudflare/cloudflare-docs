---
pcx-content-type: how-to
title: Local Development
weight: 5
---

# Local development

You can run your entire application locally with our Wrangler Command Line Interface (CLI). To get started with Wrangler, you can install it with the following command:
```sh
$ npm install --global wrangler
```

The main command for local development on Pages is `wrangler pages dev`. This will let you run your Pages application locally which includes serving static assets and running your Functions. If you have a folder of static assets then you can run the following command to start local development:

```sh
$ wrangler pages dev <directory-of-assets>
```

This will then start serving your Pages project. You can press `B` to open the browser on your local site.
If you’re using a framework, you can pass through the framework provided dev command (i.e. npm run dev) to run development and benefit from the framework hot-reloading and any special build process around it. You can do this with:

```sh
$ wrangler pages dev -- <command>
```

If you wish to attach a binding in your local development, you can simply pass through the relevant argument to the dev command. For example, if you want to bind KV, you would run:
```
$ wrangler pages dev <directory-of-assets> --kv KV
```

Then your KV binding will be accessible through `env.KV` like usual. Read the section below for all the specific binding arguments.

{{<Aside>}}
Local development uses local storage, it cannot access data stored on Cloudflare’s servers.

By default, data in local development is not persisted. This means if you write a value into KV for example, the next time you start dev, it will no longer exist. You can enable persistence with `--persist`
{{</Aside>}}
