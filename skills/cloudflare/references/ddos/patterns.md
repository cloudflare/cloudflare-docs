# DDoS Protection Patterns

## Allowlist Trusted IPs

```typescript
// Account-level override with custom expression
const config = {
  description: "Allowlist trusted IPs",
  rules: [{
    expression: "ip.src in { 203.0.113.0/24 192.0.2.1 }",
    action: "execute",
    action_parameters: {
      id: managedRulesetId,
      overrides: { sensitivity_level: "eoff" }, // Effectively off
    },
  }],
};

await fetch(
  `https://api.cloudflare.com/client/v4/accounts/${accountId}/rulesets/phases/ddos_l7/entrypoint`,
  { method: "PUT", headers: { Authorization: `Bearer ${apiToken}`, "Content-Type": "application/json" }, body: JSON.stringify(config) }
);
```

## Route-specific Sensitivity

```typescript
// Lower sensitivity for bursty API endpoints
const config = {
  description: "Route-specific protection",
  rules: [
    {
      expression: "not http.request.uri.path matches \"^/api/\"",
      action: "execute",
      action_parameters: {
        id: managedRulesetId,
        overrides: { sensitivity_level: "default", action: "block" },
      },
    },
    {
      expression: "http.request.uri.path matches \"^/api/\"",
      action: "execute",
      action_parameters: {
        id: managedRulesetId,
        overrides: { sensitivity_level: "low", action: "managed_challenge" },
      },
    },
  ],
};
```

## Progressive Enhancement

```typescript
enum ProtectionLevel { MONITORING = "monitoring", LOW = "low", MEDIUM = "medium", HIGH = "high" }

async function setProtectionLevel(zoneId: string, level: ProtectionLevel, managedRulesetId: string, apiToken: string) {
  const levelConfig = {
    [ProtectionLevel.MONITORING]: { action: "log", sensitivity: "eoff" },
    [ProtectionLevel.LOW]: { action: "managed_challenge", sensitivity: "low" },
    [ProtectionLevel.MEDIUM]: { action: "managed_challenge", sensitivity: "medium" },
    [ProtectionLevel.HIGH]: { action: "block", sensitivity: "default" },
  } as const;

  const settings = levelConfig[level];
  const config = {
    description: `DDoS protection level: ${level}`,
    rules: [{
      expression: "true",
      action: "execute",
      action_parameters: {
        id: managedRulesetId,
        overrides: { action: settings.action, sensitivity_level: settings.sensitivity },
      },
    }],
  };

  return fetch(/* ... */);
}

// Gradual rollout: Week 1 MONITORING → Week 2 LOW → Week 3 MEDIUM → Week 4 HIGH
```

## Dynamic Response to Attacks

```typescript
// Worker adjusts settings based on attack patterns
interface Env {
  CLOUDFLARE_API_TOKEN: string;
  ZONE_ID: string;
  KV_NAMESPACE: KVNamespace;
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    if (request.url.includes("/attack-detected")) {
      const attackData = await request.json();
      await env.KV_NAMESPACE.put(`attack:${Date.now()}`, JSON.stringify(attackData), { expirationTtl: 86400 });

      const recentAttacks = await getRecentAttacks(env.KV_NAMESPACE);
      if (recentAttacks.length > 5) {
        await increaseProtection(env.ZONE_ID, "managed-ruleset-id", env.CLOUDFLARE_API_TOKEN);
        return new Response("Protection increased", { status: 200 });
      }
    }
    return new Response("OK");
  },

  // Cron: auto-decrease after quiet period
  async scheduled(event: ScheduledEvent, env: Env): Promise<void> {
    const recentAttacks = await getRecentAttacks(env.KV_NAMESPACE);
    if (recentAttacks.length === 0) {
      await normalizeProtection(env.ZONE_ID, "managed-ruleset-id", env.CLOUDFLARE_API_TOKEN);
    }
  },
};
```

## Multi-rule Tiered Protection (Enterprise Advanced)

```typescript
// Up to 10 rules with different conditions
const config = {
  description: "Multi-tier DDoS protection",
  rules: [
    { // Strictest for unknown traffic
      expression: "not ip.src in $known_ips and not cf.bot_management.score gt 30",
      action: "execute",
      action_parameters: {
        id: managedRulesetId,
        overrides: { sensitivity_level: "default", action: "block" },
      },
    },
    { // Medium for verified bots
      expression: "cf.bot_management.verified_bot",
      action: "execute",
      action_parameters: {
        id: managedRulesetId,
        overrides: { sensitivity_level: "medium", action: "managed_challenge" },
      },
    },
    { // Low for trusted IPs
      expression: "ip.src in $trusted_ips",
      action: "execute",
      action_parameters: {
        id: managedRulesetId,
        overrides: { sensitivity_level: "low" },
      },
    },
  ],
};
```

## Defense in Depth

Combine DDoS with WAF, Rate Limiting, Bot Management. Layer protections at different levels.

See [configuration.md](./configuration.md) for rule structure details.
