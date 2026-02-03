# Architecture Patterns

## Component Resources

```typescript
class WorkerApp extends pulumi.ComponentResource {
    constructor(name: string, args: WorkerAppArgs, opts?) {
        super("custom:cloudflare:WorkerApp", name, {}, opts);
        const defaultOpts = {parent: this};

        this.kv = new cloudflare.WorkersKvNamespace(`${name}-kv`, {accountId: args.accountId, title: `${name}-kv`}, defaultOpts);
        this.worker = new cloudflare.WorkerScript(`${name}-worker`, {
            accountId: args.accountId, name: `${name}-worker`, content: args.workerCode,
            module: true, kvNamespaceBindings: [{name: "KV", namespaceId: this.kv.id}],
        }, defaultOpts);
        this.domain = new cloudflare.WorkersDomain(`${name}-domain`, {
            accountId: args.accountId, hostname: args.domain, service: this.worker.name,
        }, defaultOpts);
    }
}
```

## Full-Stack Worker App

```typescript
const kv = new cloudflare.WorkersKvNamespace("cache", {accountId, title: "api-cache"});
const db = new cloudflare.D1Database("db", {accountId, name: "app-database"});
const bucket = new cloudflare.R2Bucket("assets", {accountId, name: "app-assets"});

const apiWorker = new cloudflare.WorkerScript("api", {
    accountId, name: "api-worker", content: fs.readFileSync("./dist/api.js", "utf8"),
    module: true, kvNamespaceBindings: [{name: "CACHE", namespaceId: kv.id}],
    d1DatabaseBindings: [{name: "DB", databaseId: db.id}],
    r2BucketBindings: [{name: "ASSETS", bucketName: bucket.name}],
});
```

## Multi-Environment Setup

```typescript
const stack = pulumi.getStack();
const worker = new cloudflare.WorkerScript(`worker-${stack}`, {
    accountId, name: `my-worker-${stack}`, content: code,
    plainTextBindings: [{name: "ENVIRONMENT", text: stack}],
});
```

## Queue-Based Processing

```typescript
const queue = new cloudflare.Queue("processing-queue", {accountId, name: "image-processing"});

// Producer: API receives requests
const apiWorker = new cloudflare.WorkerScript("api", {
    accountId, name: "api-worker", content: apiCode,
    queueBindings: [{name: "PROCESSING_QUEUE", queue: queue.id}],
});

// Consumer: Process async
const processorWorker = new cloudflare.WorkerScript("processor", {
    accountId, name: "processor-worker", content: processorCode,
    queueConsumers: [{queue: queue.name, maxBatchSize: 10, maxRetries: 3, maxWaitTimeMs: 5000}],
    r2BucketBindings: [{name: "OUTPUT_BUCKET", bucketName: outputBucket.name}],
});
```

## Microservices with Service Bindings

```typescript
const authWorker = new cloudflare.WorkerScript("auth", {accountId, name: "auth-service", content: authCode});
const apiWorker = new cloudflare.WorkerScript("api", {
    accountId, name: "api-service", content: apiCode,
    serviceBindings: [{name: "AUTH", service: authWorker.name}],
});
// In worker: await env.AUTH.fetch("/verify", {...});
```

## Event-Driven Architecture

```typescript
const eventQueue = new cloudflare.Queue("events", {accountId, name: "event-bus"});
const producers = ["api", "webhook"].map(name =>
    new cloudflare.WorkerScript(`${name}-producer`, {
        accountId, name: `${name}-producer`, content: producerCode,
        queueBindings: [{name: "EVENTS", queue: eventQueue.id}],
    })
);
const consumers = ["email", "analytics"].map(name =>
    new cloudflare.WorkerScript(`${name}-consumer`, {
        accountId, name: `${name}-consumer`, content: consumerCode,
        queueConsumers: [{queue: eventQueue.name, maxBatchSize: 10}],
    })
);
```

## CDN with Dynamic Content

```typescript
const staticBucket = new cloudflare.R2Bucket("static", {accountId, name: "static-assets"});
const appWorker = new cloudflare.WorkerScript("app", {
    accountId, name: "app-worker", content: appCode,
    r2BucketBindings: [{name: "STATIC", bucketName: staticBucket.name}],
});
const route = new cloudflare.WorkerRoute("route", {zoneId, pattern: `${domain}/*`, scriptName: appWorker.name});
```

## Wrangler Integration

```typescript
// Match wrangler.toml bindings in Pulumi
const worker = new cloudflare.WorkerScript("worker", {
    accountId, name: "my-worker", content: code,
    compatibilityDate: "2024-01-01", compatibilityFlags: ["nodejs_compat"],
    kvNamespaceBindings: [{name: "MY_KV", namespaceId: kv.id}], // Must match wrangler.toml
});
```

## Dynamic Worker Content

```typescript
import * as command from "@pulumi/command";
const build = new command.local.Command("build-worker", {create: "npm run build", dir: "./worker"});
const workerContent = build.stdout.apply(() => fs.readFileSync("./worker/dist/index.js", "utf8"));
const worker = new cloudflare.WorkerScript("worker", {accountId, name: "my-worker", content: workerContent}, {dependsOn: [build]});
```

## Conditional Resources

```typescript
const isProd = pulumi.getStack() === "prod";
const analytics = isProd ? new cloudflare.WorkersKvNamespace("analytics", {accountId, title: "analytics"}) : undefined;
const worker = new cloudflare.WorkerScript("worker", {
    accountId, name: "worker", content: code,
    kvNamespaceBindings: analytics ? [{name: "ANALYTICS", namespaceId: analytics.id}] : [],
});
```

---
See: [README.md](./README.md), [configuration.md](./configuration.md), [api.md](./api.md), [gotchas.md](./gotchas.md)
