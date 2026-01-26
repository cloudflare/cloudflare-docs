# Cloudflare Pulumi Provider

Expert guidance for Cloudflare Pulumi Provider (@pulumi/cloudflare).

## Overview

Programmatic management of Cloudflare resources: Workers, Pages, D1, KV, R2, DNS, Queues, etc.

**Packages:**
- TypeScript/JS: `@pulumi/cloudflare`
- Python: `pulumi-cloudflare`
- Go: `github.com/pulumi/pulumi-cloudflare/sdk/v6/go/cloudflare`
- .NET: `Pulumi.Cloudflare`

**Version:** v6.x

## Core Principles

1. Use API tokens (not legacy API keys)
2. Store accountId in stack config
3. Match binding names across code/config
4. Use `module: true` for ES modules
5. Set `compatibilityDate` to lock behavior

## Authentication

Three methods (mutually exclusive):

**1. API Token (Recommended)**
```typescript
import * as cloudflare from "@pulumi/cloudflare";

const provider = new cloudflare.Provider("cf", {
    apiToken: process.env.CLOUDFLARE_API_TOKEN,
});
```
Env: `CLOUDFLARE_API_TOKEN`

**2. API Key (Legacy)**
```typescript
const provider = new cloudflare.Provider("cf", {
    apiKey: process.env.CLOUDFLARE_API_KEY,
    email: process.env.CLOUDFLARE_EMAIL,
});
```
Env: `CLOUDFLARE_API_KEY`, `CLOUDFLARE_EMAIL`

**3. API User Service Key**
```typescript
const provider = new cloudflare.Provider("cf", {
    apiUserServiceKey: process.env.CLOUDFLARE_API_USER_SERVICE_KEY,
});
```
Env: `CLOUDFLARE_API_USER_SERVICE_KEY`

## Setup

**Pulumi.yaml:**
```yaml
name: my-cloudflare-app
runtime: nodejs
config:
  cloudflare:apiToken:
    value: ${CLOUDFLARE_API_TOKEN}
```

**Pulumi.<stack>.yaml:**
```yaml
config:
  cloudflare:accountId: "abc123..."
```

**index.ts:**
```typescript
import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";

const config = new pulumi.Config("cloudflare");
const accountId = config.require("accountId");
```

## Essential Imports
```typescript
import * as pulumi from "@pulumi/pulumi";
import * as cloudflare from "@pulumi/cloudflare";
```

## Common Resource Types
- `Provider` - Provider config
- `WorkerScript` - Worker
- `WorkersKvNamespace` - KV
- `R2Bucket` - R2
- `D1Database` - D1
- `Queue` - Queue
- `PagesProject` - Pages
- `DnsRecord` - DNS
- `WorkerRoute` - Worker route
- `WorkersDomain` - Custom domain

## Key Properties
- `accountId` - Required for most resources
- `zoneId` - Required for DNS/domain
- `name`/`title` - Resource identifier
- `*Bindings` - Connect resources to Workers

---
See: [configuration.md](./configuration.md), [api.md](./api.md), [patterns.md](./patterns.md), [gotchas.md](./gotchas.md)
