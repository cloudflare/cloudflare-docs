## Configuration Methods

### 1. Dashboard (GUI)
```
1. Go to zone → Rules → Snippets
2. Create Snippet or select template
3. Enter snippet name (a-z, 0-9, _ only, cannot change later)
4. Write JavaScript code (32KB max)
5. Configure snippet rule:
   - Expression Builder or Expression Editor
   - Use Ruleset Engine filter expressions
6. Deploy or Save as Draft
```

### 2. API
```bash
# Create/update snippet
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets/$SNIPPET_NAME" \
  --request PUT \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --form "files=@example.js" \
  --form "metadata={\"main_module\": \"example.js\"}"

# Create snippet rule
curl "https://api.cloudflare.com/client/v4/zones/$ZONE_ID/snippets/snippet_rules" \
  --request PUT \
  --header "Authorization: Bearer $CLOUDFLARE_API_TOKEN" \
  --json '{
    "rules": [
      {
        "description": "Trigger snippet on specific cookie",
        "enabled": true,
        "expression": "http.cookie eq 