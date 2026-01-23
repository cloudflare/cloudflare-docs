## Best Practices

1. **Verify destinations first**: Rules auto-disabled until destination verified
2. **Use Email Workers for complex logic**: Don't create dozens of rules; use Workers
3. **Monitor spam scores**: Check `X-Cf-Spamh-Score` header for filtering
4. **Handle auth failures**: Enforce SPF/DKIM/DMARC at sender domain
5. **Use subaddressing strategically**: Track where emails come from (`user+service@`)
6. **Consider Worker limits**: Upgrade to Paid plan for heavy processing
7. **Store raw emails carefully**: R2 for archival, KV for metadata
8. **Implement proper error handling**: Always handle `setReject` cases
9. **Test locally with wrangler dev**: Use curl to simulate email delivery
10. **Use priority for rule ordering**: Lower priority = evaluated first

## Debugging

### Chec