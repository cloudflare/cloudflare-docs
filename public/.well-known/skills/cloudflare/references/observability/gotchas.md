## Troubleshooting

### Logs not appearing

**Check**:
1. `observability.enabled = true` in wrangler config
2. Worker has been redeployed after config change
3. Worker is receiving traffic
4. Sampling rate is not too low (check `head_sampling_rate`)
5. Log size under 256 KB limit

**Solution**:
```bash
# Verify config
cat wrangler.toml | grep -A 5 observability

# Check deployment
wrangler deployments list <WORKER_NAME>

# Test with curl
curl https://your-worker.workers.dev
```

### Traces not being captured

**Check**:
1. `observability.traces.enabled = true`
2. `head_sampling_rate` is appropriate (1.0 for testing)
3. Worker deployed after traces enabled
4. Check destination status in dashboard

**Solution**:
```jsonc
// Temporarily set to 100% sampling for debugging
{
  "observability": 