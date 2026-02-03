## Troubleshooting

### Issue: Connection timeouts

**Diagnosis:**
```bash
# Test connectivity to Spectrum app
nc -zv app.example.com 22

# Check DNS resolution
dig app.example.com

# Verify origin accepts Cloudflare IPs
curl -v telnet://origin-ip:port
```

**Solutions:**
- Verify origin firewall allows Cloudflare IPs
- Check origin service is running and listening on correct port
- Ensure DNS record is CNAME (not A/AAAA unless using BYOIP)

### Issue: Client IP showing Cloudflare IP

**Solution:** Enable Proxy Protocol

```json
{
  "proxy_protocol": "v1"  // TCP: v1 or v2; UDP: simple
}
```

Ensure origin application parses proxy protocol headers.

### Issue: TLS errors

**Diagnosis:**
```bash
openssl s_client -connect app.example.com:443 -showcerts
```

**Solutions:**
- `tls: "flexible"`