# Troubleshooting & Best Practices

## Common Errors

**1. Account ID Missing**
```
error: Missing required property 'accountId'
```
Solution: Add to config or pass explicitly.

**2. Binding Name Mismatch**
Worker expects `MY_KV` but binding uses different name.
Solution: Match binding names in Pulumi and worker code.

**3. Resource Not Found**
```
error: resource 'abc123' not found
```
Solution: Ensure resources exist in correct account/zone.

**4. API Token Permissions**
Solution: Verify token has required permissions (Workers, KV, R2, etc.).

## Debugging

**Enable verbose logging:**
```bash
pulumi up --logtostderr -v=9
```

**Preview changes:**
```bash
pulumi preview
```

**View resource state:**
```bash
pulumi stack export
```

**Inspect specific resource:**
```bash
pulumi stack --show-urns
pulumi state delete <urn> # Use with caution
```

## Best Practices

### 1. Use Stack Configuration
```yaml
# Pulumi.<stack>.yaml
config:
  cloudflare:accountId: "abc123"
  cloudflare:apiToken:
    secure: "encrypted-value"
  app:domain: "example.com"
  app:zoneId: "xyz789"
```

### 2. Explicit Provider Configuration
```typescript
const devProvider = new cloudflare.Provider("dev", {apiToken: devToken});
const prodProvider = new cloudflare.Provider("prod", {apiToken: prodToken});

const devWorker = new cloudflare.WorkerScript("dev-worker", {
    accountId: devAccountId, name: "worker", content: code,
}, {provider: devProvider});

const prodWorker = new cloudflare.WorkerScript("prod-worker", {
    accountId: prodAccountId, name: "worker", content: code,
}, {provider: prodProvider});
```

### 3. Resource Naming Conventions
```typescript
const stack = pulumi.getStack();
const kv = new cloudflare.WorkersKvNamespace(`${stack}-kv`, {accountId, title: `${stack}-my-kv`});
```

### 4. Protect Production Resources
```typescript
const prodDb = new cloudflare.D1Database("prod-db", {accountId, name: "production-database"}, 
    {protect: true}); // Cannot delete without removing protect
```

### 5. Use dependsOn for Ordering
```typescript
const migration = new command.local.Command("migration", {
    create: pulumi.interpolate`wrangler d1 execute ${db.name} --file ./schema.sql`,
}, {dependsOn: [db]});

const worker = new cloudflare.WorkerScript("worker", {
    accountId, name: "worker", content: code,
    d1DatabaseBindings: [{name: "DB", databaseId: db.id}],
}, {dependsOn: [migration]}); // Ensure migrations run first
```

### 6. Resource Tagging Pattern
```typescript
function createResource(name: string, type: string) {
    const stack = pulumi.getStack();
    const fullName = `${stack}-${type}-${name}`;
    return new cloudflare.WorkersKvNamespace(fullName, {accountId, title: fullName});
}

const userCache = createResource("user-cache", "kv");
const sessionCache = createResource("session-cache", "kv");
```

## Security

### Secrets Management
```typescript
const config = new pulumi.Config();
const apiKey = config.requireSecret("apiKey"); // Encrypted in state

const worker = new cloudflare.WorkerScript("worker", {
    accountId, name: "my-worker", content: code,
    secretTextBindings: [{name: "API_KEY", text: apiKey}],
});
```

**Store secrets:**
```bash
pulumi config set --secret apiKey "secret-value"
```

**Use environment variables:**
```bash
export CLOUDFLARE_API_TOKEN="..."
pulumi up
```

### API Token Scopes
Create tokens with minimal permissions:
- Workers: `Workers Routes:Edit`, `Workers Scripts:Edit`
- KV: `Workers KV Storage:Edit`
- R2: `R2:Edit`
- D1: `D1:Edit`
- DNS: `Zone:Edit`, `DNS:Edit`
- Pages: `Pages:Edit`

### State Security
- Use Pulumi Cloud or S3 backend with encryption
- Never commit state files to VCS
- Use RBAC to control stack access

## Performance

### Reduce State Size
- Avoid storing large files in state
- Use `ignoreChanges` for frequently changing properties
- Use external build processes

### Parallel Updates
Pulumi automatically parallelizes independent resource updates.

### Refresh Strategy
```bash
pulumi refresh --yes # Sync state with actual infrastructure
```

## Migration

### Import Existing Resources
```bash
pulumi import cloudflare:index/workerScript:WorkerScript my-worker <account_id>/<worker_name>
pulumi import cloudflare:index/workersKvNamespace:WorkersKvNamespace my-kv <namespace_id>
pulumi import cloudflare:index/r2Bucket:R2Bucket my-bucket <account_id>/<bucket_name>
```

### From Terraform
Use `pulumi import` and rewrite configs in Pulumi DSL.

### From Wrangler
1. Create Pulumi resources matching wrangler.toml
2. Import existing resources
3. Verify with `pulumi preview`
4. Switch to Pulumi for deployments

## CI/CD

**GitHub Actions:**
```yaml
name: Deploy
on: [push]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v3
      - uses: pulumi/actions@v4
        with:
          command: up
          stack-name: prod
        env:
          PULUMI_ACCESS_TOKEN: ${{ secrets.PULUMI_ACCESS_TOKEN }}
          CLOUDFLARE_API_TOKEN: ${{ secrets.CLOUDFLARE_API_TOKEN }}
```

**GitLab CI:**
```yaml
deploy:
  image: pulumi/pulumi:latest
  script:
    - pulumi stack select prod
    - pulumi up --yes
  only:
    - main
  variables:
    CLOUDFLARE_API_TOKEN: $CLOUDFLARE_API_TOKEN
```

## Resources

- **Pulumi Registry:** https://www.pulumi.com/registry/packages/cloudflare/
- **API Docs:** https://www.pulumi.com/registry/packages/cloudflare/api-docs/
- **GitHub:** https://github.com/pulumi/pulumi-cloudflare
- **Cloudflare Docs:** https://developers.cloudflare.com/
- **Workers Docs:** https://developers.cloudflare.com/workers/

---
See: [README.md](./README.md), [configuration.md](./configuration.md), [api.md](./api.md), [patterns.md](./patterns.md)
