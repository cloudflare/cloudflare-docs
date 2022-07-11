---
pcx-content-type: how-to
title: Local Development
weight: 7
---

# Develop and preview locally

You can run your entire application locally with [Wrangler](https://github.com/cloudflare/wrangler2), which supports secrets, environment variables, KV and Durable Objects. Point Wrangler at a directory of static assets, or seamlessly connect to your existing tools:

```sh
# Install wrangler
$ npm install wrangler

# Show help message
$ npx wrangler pages dev --help

# Serve a folder of static assets
$ npx wrangler pages dev ./dist

# Bind to a KV store
$ npx wrangler pages dev ./dist --kv KV_NAMESPACE

# Bind to a Durable Object
$ npx wrangler pages dev ./dist --do ENV_NAME=CLASS_NAME

# Or automatically proxy your existing tools
$ npx wrangler pages dev -- npx react-scripts start

# Bind variable/secret (KEY=VALUE)
$ npx wrangler pages dev dist --binding ENV_NAME=\"ENV_VALUE\"
```

Developing locally does not deploy your changes. It is only a means to preview and test. To deploy your changes to your Pages site, you will need to `git commit` and `git push` as normal.