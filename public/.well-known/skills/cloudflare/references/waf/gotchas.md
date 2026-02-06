### Common Issues & Solutions

**Issue**: False positives blocking legitimate traffic
**Solution**: 
- Start with `log` action to monitor
- Use WAF exceptions for specific endpoints
- Override managed ruleset rules to less aggressive actions
- Combine attack score with path filters

**Issue**: Rate limiting blocking legitimate users behind NAT
**Solution**:
- Use "IP with NAT support" characteristic (Business+)
- Add additional characteristics (headers, cookies)
- Increase rate limits for shared IPs
- Use counting expressions to filter what counts

**Issue**: Rules not applying as expected
**Solution**:
- Check rule order and priority
- Verify expression syntax with Security Events
- Ensure ruleset is deployed to correct phase
- Check for conflicting skip or allow rules

**Issue**: Managed