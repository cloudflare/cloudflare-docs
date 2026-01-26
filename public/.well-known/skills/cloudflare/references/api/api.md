### API Token (Recommended)

**Create token**: Dashboard → My Profile → API Tokens → Create Token

```bash
# Environment variable
export CLOUDFLARE_API_TOKEN='your-token-here'

# curl
curl "https://api.cloudflare.com/client/v4/zones" \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN"
```

**Token scopes**: Always use minimal permissions
- Zone-specific vs account-level
- Read vs edit permissions
- Time-limited tokens for CI/CD

### API Key (Legacy - Not Recommended)

```bash
curl "https://api.cloudflare.com/client/v4/zones" \
  --header "X-Auth-Email: user@example.com" \
  --header "X-Auth-Key: $CLOUDFLARE_API_KEY"
```

**Limitations**:
- Full account access (insecure)
- Cannot scope permissions
- No expiration
- Use tokens instead