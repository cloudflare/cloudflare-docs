---
pcx-content-type: how-to
title: Getting started
weight: 1
---

## Getting started with 🤠 Wrangler

`wrangler` is a command line tool for building [Cloudflare Workers](https://workers.cloudflare.com/).

## Quick Start

```sh
# Make a javascript file
$ echo "export default { fetch() { return new Response('hello world') } }" > index.js
# try it out
$ npx wrangler@beta dev index.js
# and then publish it
$ npx wrangler@beta publish index.js --name my-worker
# visit https://my-worker.<your workers subdomain>.workers.dev
```

## Installation:

```bash
$ npm install wrangler@beta
```
