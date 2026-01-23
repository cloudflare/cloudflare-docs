# Gotchas & Troubleshooting

## Schema Blocking Valid Reqs

Firewall Events show violations? 1) Check details 2) Review schema (Settings) 3) Test Swagger Editor 4) Log mode 5) Update schema

Validated: date-time,time,date,email,hostname,ipv4/6,uri(-reference),iri(-reference),int32/64,float,double,password,uuid,byte,uint64

oneOf: Zero matches (missing discriminator), Multiple (ambiguous)

## JWT Failing

1) JWKS match IdP? 2) `exp` valid? 3) Header/cookie name? 4) Test jwt.io 5) Clock skew?

## Discovery Missing

Needs 500+ reqs/10d, 2xx from edge, not Workers direct. Check threshold, codes, session ID config. ML updates daily. Path norm: `/profile/238` → `/profile/{var1}`

## Sequence False Positives

Lookback: 10 reqs to managed endpoints, 10min (contact for adjust). Check session ID uniqueness, neg vs pos model

## Perf

Schema: ~1-2ms, JWT: ~0.5-1ms, mTLS: ~2-5ms, Sequence: ~0.5ms

## Best Practices

1. Discovery first (map before enforce)
2. Progressive: Log → Block critical → Full
3. Session IDs unique per user
4. Validate schema (Swagger Editor)
5. Automate JWKS rotation (Worker cron)
6. Fallthrough rules (zombie APIs)
7. Logpush + alerts
8. Rate limit w/JWT claims
9. Layer Bot Management
10. Test staging

## Limits

Schema: OpenAPI v3.0.x only, no ext refs/non-basic paths, 10K ops, need `type`+`schema`, default `style`/`explode`, no `content` in params, no obj param validation, no `anyOf` in params
JWT: Headers/cookies only, validates managed endpoints only
Sequence (Beta): Needs endpoints+session ID, contact team

## Errors

"Token invalid": Config wrong, JWKS mismatch, expired
"Schema violation": Missing fields, wrong types, spec mismatch
"Fallthrough": Unknown endpoint, pattern mismatch
"mTLS failed": Cert untrusted/expired, wrong CA
