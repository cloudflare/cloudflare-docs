# Cloudflare Secrets Store

Account-level encrypted secret management for Workers and AI Gateway.

## Overview

**Secrets Store**: Centralized, account-level secrets, reusable across Workers
**Worker Secrets**: Per-Worker secrets (`wrangler secret put`)

### Architecture

- **Store**: Container (1/account in beta)
- **Secret**: String ≤1024 bytes
- **Scopes**: Permission boundaries (`workers`, `ai-gateway`)
- **Bindings**: Connect secrets via `env` object

### Access Control

- **Super Admin**: Full access
- **Admin**: Create/edit/delete secrets, view metadata
- **Deployer**: View metadata + bindings
- **Reporter**: View metadata only

API Token permissions: `Account Secrets Store Edit/Read`

### Limits (Beta)

- 100 secrets/account
- 1 store/account
- 1024 bytes max/secret
- Production secrets count toward limit

## When to Use

**Use Secrets Store when:**
- Multiple Workers share same credential
- Centralized management needed
- Compliance requires audit trail
- Team collaboration on secrets

**Use Worker Secrets when:**
- Secret unique to one Worker
- Simple single-Worker project
- No cross-Worker sharing needed

## Files

- [configuration.md](./configuration.md) - Wrangler commands, binding config
- [api.md](./api.md) - Binding API, get/put/delete operations
- [patterns.md](./patterns.md) - Rotation, encryption, access control
- [gotchas.md](./gotchas.md) - Security issues, limits, best practices

## References

- [Docs](https://developers.cloudflare.com/secrets-store/)
- [Workers Integration](https://developers.cloudflare.com/secrets-store/integrations/workers/)
- [API Reference](https://developers.cloudflare.com/api/resources/secrets_store/)
- [Wrangler Commands](https://developers.cloudflare.com/workers/wrangler/commands/#secrets-store)
