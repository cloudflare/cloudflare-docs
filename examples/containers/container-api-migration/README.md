# Container API migration workbench

This executable reference migrates one container-enabled Durable Object through three releases:

1. **Container class** — uses `@cloudflare/containers` helpers.
2. **Bridge** — keeps extending `Container`, but exposes helper and direct `ctx.container` routes on the same Durable Object and container instance.
3. **Durable Object API** — changes the base class to `DurableObject` and replaces the remaining helpers.

All stages keep the Worker name, exported `MigrationWorkbench` class, `MIGRATION_WORKBENCH` binding, `v1` migration tag, and container image unchanged. Changing the TypeScript base class does not require a new Durable Object migration.

## Coverage

The lab exercises two-port readiness, request proxying, `switchPort()`, `getTcpPort()`, environment variables, lifecycle hooks, `monitor()`, `exec()`, inactivity, signals, destruction, outbound interception, scheduling, alarms, and Durable Object storage retained across deployments.

The E2E run found an important direct-API responsibility: a new instance may be temporarily unavailable immediately after `destroy()`. The direct implementations use a bounded startup retry before checking port readiness.

## Install and run locally

```sh
pnpm install --ignore-workspace --frozen-lockfile
pnpm dev:legacy
pnpm dev:bridge
pnpm dev:direct
```

Docker must be running. Stop each dev server before starting the next stage so all stages reuse `.wrangler/state`.

## Deploy and verify

Deploy each stage over the same Worker and use the URL printed by Wrangler:

```sh
pnpm deploy:legacy
pnpm test:e2e https://container-api-migration-workbench.<SUBDOMAIN>.workers.dev legacy

pnpm deploy:bridge
pnpm test:e2e https://container-api-migration-workbench.<SUBDOMAIN>.workers.dev bridge
```

Create an alarm through the bridge before the cutover:

```sh
curl -X POST "https://container-api-migration-workbench.<SUBDOMAIN>.workers.dev/api/schedule-cutover?instance=reference-e2e&mode=helper&delay=120"
```

Then replace the base class without changing any Durable Object identifiers:

```sh
pnpm deploy:direct
pnpm test:e2e https://container-api-migration-workbench.<SUBDOMAIN>.workers.dev direct
```

The final suite requires legacy and bridge events to remain in the same Durable Object storage. It also verifies that the direct `alarm()` handler processed the marker created before cutover.

## Bridge limitation

The bridge does not install a Durable Object `alarm()` handler. The `Container` class owns that handler until the final cutover. Direct scheduling therefore moves last; other `ctx.container` operations migrate incrementally first.
