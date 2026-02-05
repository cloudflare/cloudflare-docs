# Cloudflare DDoS Protection

Autonomous, always-on protection against DDoS attacks across L3/4 and L7.

## Protection Types

- **HTTP DDoS (L7)**: Protects HTTP/HTTPS traffic, phase `ddos_l7`, zone/account level
- **Network DDoS (L3/4)**: UDP/SYN/DNS floods, phase `ddos_l4`, account level only
- **Adaptive DDoS**: Learns 7-day baseline, detects deviations (Enterprise)

## Key Features

- Always-on managed rulesets (cannot disable)
- Sensitivity levels: `default` (high), `medium`, `low`, `eoff` (essentially off)
- Actions: `block`, `managed_challenge`, `challenge`, `log` (Enterprise Advanced only)
- Override by category/tag or individual rule ID
- Custom expressions for traffic filtering (Enterprise Advanced)
- Alert configuration for attack notifications

## Rule Limits

- Free/Pro/Business: 1 override rule
- Enterprise Advanced: Up to 10 rules

## Scope Hierarchy

Zone overrides take precedence over account overrides.

## See Also

- [configuration.md](./configuration.md) - Dashboard & rule setup
- [api.md](./api.md) - API endpoints & management
- [patterns.md](./patterns.md) - Protection strategies
- [gotchas.md](./gotchas.md) - False positives & tuning
