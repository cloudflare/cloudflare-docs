# DDoS API

## Endpoints

### HTTP DDoS (L7)

```typescript
// Zone-level
PUT /zones/{zoneId}/rulesets/phases/ddos_l7/entrypoint
GET /zones/{zoneId}/rulesets/phases/ddos_l7/entrypoint

// Account-level (Enterprise Advanced)
PUT /accounts/{accountId}/rulesets/phases/ddos_l7/entrypoint
GET /accounts/{accountId}/rulesets/phases/ddos_l7/entrypoint
```

### Network DDoS (L3/4)

```typescript
// Account-level only
PUT /accounts/{accountId}/rulesets/phases/ddos_l4/entrypoint
GET /accounts/{accountId}/rulesets/phases/ddos_l4/entrypoint
```

## TypeScript SDK

```typescript
import Cloudflare from "cloudflare";

const client = new Cloudflare({ apiToken: process.env.CLOUDFLARE_API_TOKEN });

// Get HTTP DDoS ruleset
const ruleset = await client.zones.rulesets.phases.entrypoint.get("ddos_l7", {
  zone_id: zoneId,
});

// Update HTTP DDoS ruleset
await client.zones.rulesets.phases.entrypoint.update("ddos_l7", {
  zone_id: zoneId,
  rules: [
    {
      action: "execute",
      expression: "true",
      action_parameters: {
        id: managedRulesetId,
        overrides: {
          sensitivity_level: "medium",
          action: "managed_challenge",
        },
      },
    },
  ],
});

// Network DDoS (account level)
const l4Ruleset = await client.accounts.rulesets.phases.entrypoint.get("ddos_l4", {
  account_id: accountId,
});
```

## Alert Configuration

```typescript
interface DDoSAlertConfig {
  name: string;
  enabled: boolean;
  alert_type: "http_ddos_attack_alert" | "layer_3_4_ddos_attack_alert" 
    | "advanced_http_ddos_attack_alert" | "advanced_layer_3_4_ddos_attack_alert";
  filters?: {
    zones?: string[];
    hostnames?: string[];
    requests_per_second?: number;
    packets_per_second?: number;
    megabits_per_second?: number;
    ip_prefixes?: string[]; // CIDR
    ip_addresses?: string[];
    protocols?: string[];
  };
  mechanisms: {
    email?: Array<{ id: string }>;
    webhooks?: Array<{ id: string }>;
    pagerduty?: Array<{ id: string }>;
  };
}

// Create alert
await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${accountId}/alerting/v3/policies`,
  {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiToken}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(alertConfig),
  }
);
```

## Worker Integration

```typescript
// DDoS config management worker
interface Env {
  CLOUDFLARE_API_TOKEN: string;
  ZONE_ID: string;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === "/configure") {
      const response = await fetch(
        `https://api.cloudflare.com/client/v4/zones/${env.ZONE_ID}/rulesets/phases/ddos_l7/entrypoint`,
        {
          method: "PUT",
          headers: {
            Authorization: `Bearer ${env.CLOUDFLARE_API_TOKEN}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            description: "Dynamic DDoS config",
            rules: [/* ... */],
          }),
        }
      );
      return response;
    }

    return new Response("Not found", { status: 404 });
  },
};
```

See [patterns.md](./patterns.md) for complete worker examples.
