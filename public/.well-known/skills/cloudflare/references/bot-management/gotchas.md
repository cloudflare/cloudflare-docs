# Bot Management Gotchas

## Bot Score = 0

**Cause**: Bot Management didn't run  
**Reasons**: Internal Cloudflare request, Worker routing to zone (Orange-to-Orange), Request handled before BM (Redirect Rules, etc.)  
**Solution**: Check request flow, ensure BM runs in request lifecycle

## JavaScript Detections Not Working

**Issue**: `js_detection.passed` always false or undefined  
**Causes**:
1. CSP headers don't allow `/cdn-cgi/challenge-platform/`
2. Using on first page visit (needs HTML page first)
3. Ad blockers or disabled JS
4. JSD not enabled in dashboard
5. Using Block action (must use Managed Challenge)

**CSP Fix**:
```txt
Content-Security-Policy: script-src 'self' /cdn-cgi/challenge-platform/;
```

## False Positives

**Issue**: Legitimate users blocked  
**Solutions**:
1. Check Bot Analytics for affected IPs/paths
2. Identify detection source (ML, Heuristics, etc.)
3. Create exception rule:
```txt
(cf.bot_management.score lt 30 and http.request.uri.path eq "/problematic-path")
Action: Skip (Bot Management)
```
4. Or allowlist by IP/ASN/country

## False Negatives (Bots Not Caught)

**Issue**: Bots bypassing detection  
**Solutions**:
1. Lower score threshold (30 → 50)
2. Enable JavaScript Detections
3. Add JA3/JA4 fingerprinting rules
4. Use rate limiting as fallback

## Verified Bot Blocked

**Issue**: Search engine bot blocked  
**Causes**: WAF Managed Rules (not just Bot Management), Yandex bot during IP update (48h)  
**Solution**: Create WAF exception for specific rule ID, verify bot via reverse DNS

## JA3/JA4 Missing

**Issue**: `ja3Hash` or `ja4` is undefined  
**Causes**: Non-HTTPS traffic, Worker routing traffic, Orange-to-Orange traffic via Worker, Bot Management skipped  
**Solution**: Only available for HTTPS/TLS traffic; check request routing

## Bot Score Limitations

- Score = 0 means **not computed** (not score = 100)
- First request may not have JSD data
- Score doesn't guarantee 100% accuracy
- False positives/negatives possible

## JavaScript Detections Limitations

- Doesn't work on first HTML page visit
- Requires JavaScript-enabled browser
- Strips ETags from HTML responses
- Not compatible with some CSP configurations
- Not supported via `<meta>` CSP tags
- Websocket endpoints not supported
- Native mobile apps won't pass

## JA3/JA4 Fingerprint Limitations

- Only available for HTTPS/TLS traffic
- Missing for Worker-routed traffic
- Not unique per user (shared by clients with same browser/library)
- Can change with browser/library updates

## Plan Restrictions

| Feature | Free | Pro/Business | Enterprise |
|---------|------|--------------|------------|
| Granular scores (1-99) | No | No | Yes |
| JA3/JA4 | No | No | Yes |
| Anomaly Detection | No | No | Yes |
| Corporate Proxy detection | No | No | Yes |
| Verified bot categories | Limited | Limited | Full |
| Custom WAF rules | 5 | 20/100 | 1,000+ |

## Technical Constraints

- Max 25 WAF custom rules on Free (varies by plan)
- Workers CPU time limits apply to bot logic
- Bot Analytics sampling (1-10%)
- 30-day maximum history
- CSP requirements for JSD (must allow `/cdn-cgi/challenge-platform/`)
