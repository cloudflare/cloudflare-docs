# Patterns & Use Cases

## Protect API with Schema + JWT

```bash
# 1. Upload OpenAPI schema
POST /zones/{zone_id}/api_gateway/user_schemas

# 2. Configure JWT validation
POST /zones/{zone_id}/api_gateway/token_validation
{
  "name": "Auth0",
  "location": {"header": "Authorization"},
  "jwks": "{...}"
}

# 3. Create JWT rule
POST /zones/{zone_id}/api_gateway/jwt_validation_rules

# 4. Set schema validation action
PUT /zones/{zone_id}/api_gateway/settings/schema_validation
{"validation_default_mitigation_action": "block"}
```

## Progressive Rollout

```
1. Log mode: Observe false positives
   - Schema: Action = Log
   - JWT: Action = Log

2. Block subset: Protect critical endpoints
   - Change specific endpoint actions to Block
   - Monitor firewall events

3. Full enforcement: Block all violations
   - Change default action to Block
   - Handle fallthrough with custom rule
```

## Fallthrough Detection (Zombie APIs)

```javascript
// WAF Custom Rule
(cf.api_gateway.fallthrough_triggered and http.host eq "api.example.com")
// Action: Log (discover unknown) or Block (strict)
```

## Rate Limiting by User

```javascript
// Rate Limiting Rule
(http.host eq "api.example.com" and
 lookup_json_string(http.request.jwt.claims["{config_id}"][0], "sub") ne "")

// Rate: 100 req/60s
// Counting: lookup_json_string(http.request.jwt.claims["{config_id}"][0], "sub")
```

## Architecture Patterns

### Public API (High Security)
```
Cloudflare Edge
├── API Discovery (identify endpoints)
├── Schema Validation (enforce OpenAPI)
├── JWT Validation (verify tokens)
├── Rate Limiting (per-user)
├── Bot Management (filter abuse)
└── Origin → API server
```

### Partner API (mTLS + Schema)
```
Cloudflare Edge
├── mTLS (verify client certs)
├── Schema Validation (validate payloads)
├── Sequence Mitigation (enforce order)
└── Origin → API server
```

### Internal API (Discovery + Monitoring)
```
Cloudflare Edge
├── API Discovery (map shadow APIs)
├── Schema Learning (auto-generate specs)
├── Authentication Posture (audit coverage)
└── Origin → API server
```

## OWASP API Security Top 10 Mapping

| OWASP Issue | API Shield Solutions |
|-------------|---------------------|
| Broken Object Level Authorization | BOLA detection, Sequence mitigation, Schema, JWT, Rate Limiting |
| Broken Authentication | Auth Posture, mTLS, JWT, Credential Checks, Bot Management |
| Broken Object Property Auth | Schema validation, JWT validation |
| Unrestricted Resource | Rate Limiting, Sequence, Bot Management, GraphQL protection |
| Broken Function Level Auth | Schema validation, JWT validation |
| Unrestricted Business Flows | Sequence mitigation, Bot Management, GraphQL |
| SSRF | Schema, WAF managed rules, WAF custom |
| Security Misconfiguration | Sequence, Schema, WAF managed, GraphQL |
| Improper Inventory | Discovery, Schema learning |
| Unsafe API Consumption | JWT validation, WAF managed |

## Monitoring

**Security Events:**
```
Security > Events
Filter: Action = block, Service = API Shield
```

**Firewall Analytics:**
```
Analytics > Security
Filter by cf.api_gateway.* fields
```

**Logpush fields:**
```json
{
  "APIGatewayAuthIDPresent": true,
  "APIGatewayRequestViolatesSchema": false,
  "APIGatewayFallthroughDetected": false,
  "JWTValidationResult": "valid",
  "ClientCertFingerprint": "abc123..."
}
```

## Availability

| Feature | Availability |
|---------|-------------|
| mTLS (CF-managed CA) | All plans |
| Endpoint Management | All plans (limited ops) |
| Schema Validation | All plans (limited ops) |
| API Discovery | Enterprise only |
| JWT Validation | Enterprise (add-on) |
| Sequence Mitigation | Enterprise (closed beta) |
| BOLA Detection | Enterprise (add-on) |
| Volumetric Abuse | Enterprise (add-on) |
| Full Suite | Enterprise add-on |

Enterprise: 10K ops (contact for higher), non-contract preview available.
