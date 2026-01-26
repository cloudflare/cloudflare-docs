# DDoS Configuration

## Dashboard Setup

1. Navigate to Security > DDoS
2. Select HTTP DDoS or Network-layer DDoS
3. Configure sensitivity & action per ruleset/category/rule
4. Apply overrides with optional expressions (Enterprise Advanced)

## Rule Structure

```typescript
interface DDoSOverride {
  description: string;
  rules: Array<{
    action: "execute";
    expression: string; // Filter traffic, "true" for all
    action_parameters: {
      id: string; // Managed ruleset ID
      overrides: {
        sensitivity_level?: "default" | "medium" | "low" | "eoff";
        action?: "block" | "managed_challenge" | "challenge" | "log";
        categories?: Array<{ // Override by category
          category: string; // e.g., "http-flood", "udp-flood"
          sensitivity_level?: string;
        }>;
        rules?: Array<{ // Override by rule ID
          id: string;
          action?: string;
          sensitivity_level?: string;
        }>;
      };
    };
  }>;
}
```

## Sensitivity Mapping

| UI | API | Threshold |
|----|-----|-----------|
| High | `default` | Most aggressive |
| Medium | `medium` | Balanced |
| Low | `low` | Less aggressive |
| Essentially Off | `eoff` | Minimal mitigation |

## Common Categories

- `http-flood`, `http-anomaly` (L7)
- `udp-flood`, `syn-flood`, `dns-flood` (L3/4)

## Adaptive Rules

Configure by targeting specific rule IDs. Check dashboard for IDs:
- HTTP: origins, user-agents, locations
- L4: protocols

Requires 7 days of traffic history to learn baseline.

## Alerting

Configure via Notifications:
- Alert types: `http_ddos_attack_alert`, `layer_3_4_ddos_attack_alert`, `advanced_*` variants
- Filters: zones, hostnames, RPS/PPS/Mbps thresholds, IPs, protocols
- Mechanisms: email, webhooks, PagerDuty

See [api.md](./api.md#alert-configuration) for API examples.
