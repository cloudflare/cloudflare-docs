# Resource Configuration

## Workers (cloudflare.WorkerScript)

```typescript
import * as cloudflare from "@pulumi/cloudflare";
import * as fs from "fs";

const worker = new cloudflare.WorkerScript("my-worker", {
    accountId: accountId,
    name: "my-worker",
    content: fs.readFileSync("./dist/worker.js", "utf8"),
    module: true, // ES modules
    compatibilityDate: "2024-01-01",
    compatibilityFlags: ["nodejs_compat"],
    
    // Bindings
    kvNamespaceBindings: [{name: "MY_KV", namespaceId: kv.id}],
    r2BucketBindings: [{name: "MY_BUCKET", bucketName: bucket.name}],
    d1DatabaseBindings: [{name: "DB", databaseId: db.id}],
    queueBindings: [{name: "MY_QUEUE", queue: queue.id}],
    serviceBindings: [{name: "OTHER_SERVICE", service: other.name}],
    plainTextBindings: [{name: "ENV_VAR", text: "value"}],
    secretTextBindings: [{name: "API_KEY", text: secret}],
});
```

## Workers KV (cloudflare.WorkersKvNamespace)

```typescript
const kv = new cloudflare.WorkersKvNamespace("my-kv", {
    accountId: accountId,
    title: "my-kv-namespace",
});

// Write values
const kvValue = new cloudflare.WorkersKvValue("config", {
    accountId: accountId,
    namespaceId: kv.id,
    key: "config",
    value: JSON.stringify({foo: "bar"}),
});
```

## R2 Buckets (cloudflare.R2Bucket)

```typescript
const bucket = new cloudflare.R2Bucket("my-bucket", {
    accountId: accountId,
    name: "my-bucket",
    location: "auto", // or "wnam", etc.
});
```

## D1 Databases (cloudflare.D1Database)

```typescript
const db = new cloudflare.D1Database("my-db", {
    accountId: accountId,
    name: "my-database",
});

// Migrations: use command or wrangler
import * as command from "@pulumi/command";

const migration = new command.local.Command("d1-migration", {
    create: pulumi.interpolate`wrangler d1 execute ${db.name} --command "CREATE TABLE users (id INT PRIMARY KEY, name TEXT)"`,
}, {dependsOn: [db]});
```

## Queues (cloudflare.Queue)

```typescript
const queue = new cloudflare.Queue("my-queue", {
    accountId: accountId,
    name: "my-queue",
});

// Producer
const producer = new cloudflare.WorkerScript("producer", {
    accountId: accountId,
    name: "producer",
    content: code,
    queueBindings: [{name: "MY_QUEUE", queue: queue.id}],
});

// Consumer
const consumer = new cloudflare.WorkerScript("consumer", {
    accountId: accountId,
    name: "consumer",
    content: code,
    queueConsumers: [{
        queue: queue.name,
        maxBatchSize: 10,
        maxRetries: 3,
        maxWaitTimeMs: 5000,
    }],
});
```

## Pages Projects (cloudflare.PagesProject)

```typescript
const pages = new cloudflare.PagesProject("my-site", {
    accountId: accountId,
    name: "my-site",
    productionBranch: "main",
    buildConfig: {
        buildCommand: "npm run build",
        destinationDir: "dist",
        rootDir: "",
    },
    source: {
        type: "github",
        config: {
            owner: "my-org",
            repoName: "my-repo",
            productionBranch: "main",
            prCommentsEnabled: true,
            deploymentsEnabled: true,
        },
    },
    deploymentConfigs: {
        production: {
            environmentVariables: {NODE_VERSION: "18"},
            kvNamespaces: {MY_KV: kv.id},
            d1Databases: {DB: db.id},
            r2Buckets: {MY_BUCKET: bucket.name},
        },
    },
});
```

## DNS Records (cloudflare.DnsRecord)

```typescript
const zone = cloudflare.getZone({name: "example.com"});

const record = new cloudflare.DnsRecord("www", {
    zoneId: zone.then(z => z.id),
    name: "www",
    type: "A",
    content: "192.0.2.1",
    ttl: 3600,
    proxied: true,
});

// CNAME
const cname = new cloudflare.DnsRecord("api", {
    zoneId: zone.then(z => z.id),
    name: "api",
    type: "CNAME",
    content: worker.subdomain,
    proxied: true,
});
```

## Workers Domains/Routes

```typescript
// Route (pattern-based)
const route = new cloudflare.WorkerRoute("my-route", {
    zoneId: zoneId,
    pattern: "example.com/api/*",
    scriptName: worker.name,
});

// Domain (dedicated subdomain)
const domain = new cloudflare.WorkersDomain("my-domain", {
    accountId: accountId,
    hostname: "api.example.com",
    service: worker.name,
    zoneId: zoneId,
});
```

## Multi-Language Examples

**Python:**
```python
import pulumi
import pulumi_cloudflare as cloudflare

config = pulumi.Config()
account_id = config.require("accountId")

kv = cloudflare.WorkersKvNamespace("my-kv", account_id=account_id, title="my-kv")
worker = cloudflare.WorkerScript("my-worker", account_id=account_id, name="my-worker", 
    content=open("./dist/worker.js").read(), module=True,
    kv_namespace_bindings=[cloudflare.WorkerScriptKvNamespaceBindingArgs(name="MY_KV", namespace_id=kv.id)])
```

**Go:**
```go
import (
    "github.com/pulumi/pulumi-cloudflare/sdk/v6/go/cloudflare"
    "github.com/pulumi/pulumi/sdk/v3/go/pulumi"
    "github.com/pulumi/pulumi/sdk/v3/go/pulumi/config"
)

func main() {
    pulumi.Run(func(ctx *pulumi.Context) error {
        cfg := config.New(ctx, "")
        accountId := cfg.Require("accountId")
        
        kv, _ := cloudflare.NewWorkersKvNamespace(ctx, "my-kv", &cloudflare.WorkersKvNamespaceArgs{
            AccountId: pulumi.String(accountId),
            Title: pulumi.String("my-kv"),
        })
        return nil
    })
}
```

---
See: [README.md](./README.md), [api.md](./api.md), [patterns.md](./patterns.md), [gotchas.md](./gotchas.md)
