---
pcx-content-type: how-to
title: Getting started
weight: 1
---

## Getting started with Wrangler

`wrangler` is a command line tool for building [Cloudflare Workers](https://workers.cloudflare.com/).

## Quick Start

```sh
# Generate a new project
npx wrangler init my-worker
# try it out
cd my-worker && npx wrangler dev
# and then publish it
npx wrangler publish
# visit https://my-worker.<your workers subdomain>.workers.dev
```

## Installation

```bash
$ npm install wrangler --save-dev
```
