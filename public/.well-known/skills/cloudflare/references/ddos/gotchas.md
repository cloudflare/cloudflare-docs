# DDoS Gotchas

## False Positives

**Symptom**: Legitimate traffic blocked/challenged

**Diagnosis**:
```typescript
// Query GraphQL API for flagged requests
const query = `
  query {
    viewer {
      zones(filter: { zoneTag: "${zoneId}" }) {
        httpRequestsAdaptiveGroups(
          filter: { ruleId: "${ruleId}", action: "log" }
          limit: 100
          orderBy: [datetime_DESC]
        ) {
          dimensions {
            clientCountryName
            clientRequestHTTPHost
            clientRequestPath
            userAgent
          }
          count
        }
      }
    }
  }
`;
```

**Fix**:
1. Lower sensitivity for specific rule/category
2. Use `log` action first to validate (Enterprise Advanced)
3. Add exception with custom expression (e.g., allowlist IPs)
4. Reduce category sensitivity: `{ category: "http-flood", sensitivity_level: "low" }`

## Attacks Getting Through

**Cause**: Sensitivity too low, wrong action

**Fix**:
```typescript
// Increase to default (high) sensitivity
const config = {
  rules: [{
    expression: "true",
    action: "execute",
    action_parameters: {
      id: managedRulesetId,
      overrides: { sensitivity_level: "default", action: "block" },
    },
  }],
};
```

## Adaptive Rules Not Working

**Cause**: Insufficient traffic history (needs 7 days)

**Fix**: Wait for baseline to establish, check dashboard for adaptive rule status

## Zone vs Account Override Conflict

**Issue**: Account overrides ignored when zone has overrides

**Solution**: Configure at zone level OR remove zone overrides to use account-level

## Log Action Not Available

**Cause**: Not on Enterprise Advanced DDoS plan

**Workaround**: Use `managed_challenge` with low sensitivity for testing

## Rule Limit Exceeded

**Plans**:
- Free/Pro/Business: 1 override rule only
- Enterprise Advanced: Up to 10 rules

**Workaround**: Combine conditions in single expression using `and`/`or`

## Read-only Managed Rules

**Issue**: Some rules cannot be overridden

**Check**: API response indicates if rule is read-only

## Always-on Protection

**Reality**: DDoS managed rulesets cannot be fully disabled

**Minimum**: Set `sensitivity_level: "eoff"` for minimal mitigation

## Tuning Strategy

1. Start with `log` action + `medium` sensitivity
2. Monitor for 24-48 hours
3. Identify false positives, add exceptions
4. Gradually increase to `default` sensitivity
5. Change action from `log` → `managed_challenge` → `block`
6. Document all adjustments

## Best Practices

- Test during low-traffic periods
- Use zone-level for per-site tuning
- Reference IP lists for easier management
- Set appropriate alert thresholds (avoid noise)
- Combine with WAF for layered defense
- Avoid over-tuning (keep config simple)

See [patterns.md](./patterns.md) for progressive rollout examples.
