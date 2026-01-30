# Durable Objects Configuration

## Basic Setup

```jsonc
{
  "name": "my-worker",
  "main": "src/index.ts",
  "compatibility_date": "2024-04-03",
  "durable_objects": {
    "bindings": [
      { "name": "MY_DO", "class_name": "MyDO" },
      { "name": "EXTERNAL", "class_name": "ExternalDO", "script_name": "other-worker" }
    ]
  },
  "migrations": [
    { "tag": "v1", "new_sqlite_classes": ["MyDO"] }
  ]
}
```

## Migrations

```jsonc
{
  "migrations": [
    // Create new SQLite-backed class (recommended for new classes)
    { "tag": "v1", "new_sqlite_classes": ["MyDO"] },
    
    // Create new KV-backed class (legacy, paid only)
    // { "tag": "v1", "new_classes": ["MyDO"] },
    
    // Rename class - preserves all data and object IDs
    { "tag": "v2", "renamed_classes": [{ "from": "OldName", "to": "NewName" }] },
    
    // Transfer between scripts - requires coordination
    { "tag": "v3", "transferred_classes": [{ "from": "Src", "from_script": "old-worker", "to": "Dest" }] },
    
    // DELETE - DESTROYS ALL DATA PERMANENTLY, NO RECOVERY
    { "tag": "v4", "deleted_classes": ["Obsolete"] }
  ]
}
```

**Migration rules:**
- Tags must be unique and sequential
- No rollback mechanism—test with `--dry-run` first
- Auto-applied on deploy
- `renamed_classes` preserves data and IDs
- `deleted_classes` is irreversible—all storage gone
- Transfers between scripts require both scripts deployed with coordinated migrations

## Advanced

```jsonc
{
  "limits": { "cpu_ms": 300000 },  // Default 30s, max 300s
  "env": {
    "production": {
      "durable_objects": {
        "bindings": [{ "name": "MY_DO", "class_name": "MyDO", "environment": "production" }]
      }
    }
  }
}
```

## Types

```typescript
import { DurableObject } from "cloudflare:workers";

interface Env {
  MY_DO: DurableObjectNamespace<MyDO>;
}

export class MyDO extends DurableObject<Env> {}

type DurableObjectNamespace<T> = {
  newUniqueId(options?: { jurisdiction?: string }): DurableObjectId;
  idFromName(name: string): DurableObjectId;
  idFromString(id: string): DurableObjectId;
  get(id: DurableObjectId): DurableObjectStub<T>;
};
```

## Testing with Vitest

```typescript
// vitest.config.ts
import { defineWorkersConfig } from "@cloudflare/vitest-pool-workers/config";

export default defineWorkersConfig({
  test: {
    poolOptions: {
      workers: { wrangler: { configPath: "./wrangler.toml" } },
    },
  },
});
```

```typescript
// test/my-do.test.ts
import { env, runInDurableObject, runDurableObjectAlarm } from "cloudflare:test";
import { describe, it, expect } from "vitest";

describe("MyDO", () => {
  it("handles RPC methods", async () => {
    const id = env.MY_DO.idFromName("test");
    const stub = env.MY_DO.get(id);
    
    const result = await stub.myMethod("test-arg");
    expect(result).toBe("test-arg");
  });

  it("can access storage directly", async () => {
    const id = env.MY_DO.idFromName("test");
    const stub = env.MY_DO.get(id);
    
    await runInDurableObject(stub, async (instance, state) => {
      const count = state.storage.sql
        .exec<{ count: number }>("SELECT COUNT(*) as count FROM data")
        .one();
      expect(count.count).toBe(0);
    });
  });

  it("can trigger alarms", async () => {
    const id = env.MY_DO.idFromName("test");
    const stub = env.MY_DO.get(id);
    
    const alarmRan = await runDurableObjectAlarm(stub);
    expect(alarmRan).toBe(false); // No alarm scheduled
  });
});
```

## Commands

```bash
npx wrangler dev                                       # Local dev
npx wrangler dev --remote                              # Test prod DOs
npx wrangler deploy                                    # Deploy + migrations
npx wrangler deploy --dry-run                          # Validate only
npx wrangler durable-objects list                      # List namespaces
npx wrangler durable-objects info <namespace> <id>     # Object info
npx wrangler durable-objects delete <namespace> <id>   # Delete object
```
