### Wrangler Integration

While Wrangler primarily manages Workers, WAF configuration is typically done via:
- Dashboard UI
- Cloudflare API directly
- Terraform provider
- Pulumi provider

**Related Wrangler Operations**:
- Deploy Workers that benefit from WAF protection
- Configure zone settings that complement WAF
- Use `wrangler.toml` for environment-specific configurations

**Example: Using Cloudflare API from Worker**:
```typescript
// Worker that calls WAF API
export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const response = await fetch(
      `https://api.cloudflare.com/client/v4/zones/${env.ZONE_ID}/rulesets`,
      {
        headers: {
          'Authorization': `Bearer ${env.CF_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
      }
    );
    return response;
  },
};
```

### TypeScript SDK Usage

**Installation**:
```bash
npm install cloudflare
# or
pnpm add cloudflare
```

**Basic Setup**:
```typescript
import Cloud