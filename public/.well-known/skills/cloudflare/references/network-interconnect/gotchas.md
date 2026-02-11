# CNI Gotchas & Troubleshooting

See [README.md](./README.md) for overview.

## Limitations

**General:**
- No formal SLA (free service)
- No dashboard config visibility
- Recovery may take days
- 10km max optical distance
- Backup Internet required

**v1:**
- Asymmetric MTU (1500↓/1476↑)
- GRE overhead for Magic Transit/WAN
- 1 Gbps/GRE tunnel limit

**v2:**
- No VLAN (yet)
- No BFD (yet)
- No LACP (use ECMP)
- No peering support
- Beta status

**Cloud:**
- AWS Hosted Direct Connect unsupported
- Magic WAN only
- GCP BGP routes ignored
- AWS requires manual coordination

## Troubleshooting

### Status: Pending

**Symptoms:** Stuck in pending.

**Causes:**
- Cross-connect not installed
- RX/TX fibers reversed
- Wrong fiber type
- Low light levels

**Fix:**
1. Verify cross-connect installed
2. Check fiber at patch panel
3. Swap RX/TX
4. Check light with optical power meter
5. Contact account team

### Status: Unhealthy

**Symptoms:** Shows unhealthy.

**Causes:**
- Physical issue
- Light <-20 dBm
- Optic mismatch
- Dirty connectors

**Fix:**
1. Check physical connections
2. Clean fiber connectors
3. Verify optic types (10GBASE-LR/100GBASE-LR4)
4. Test with known-good optics
5. Check patch panel
6. Contact account team

### BGP Session Down

**Symptoms:** Link up, BGP down.

**Causes:**
- Wrong IP addressing
- Wrong ASN
- Password mismatch
- Firewall blocking TCP/179

**Fix:**
1. Verify IPs match CNI object
2. Confirm ASN correct
3. Check BGP password
4. Verify no firewall on TCP/179
5. Check BGP logs
6. Review BGP timers

### Low Throughput

**Symptoms:** Traffic flows, below expected.

**Causes:**
- MTU mismatch
- Fragmentation
- Single GRE tunnel (v1)
- Routing inefficiency

**Fix:**
1. Check MTU (1500↓/1476↑ for v1, 1500 both for v2)
2. Test various packet sizes
3. Add more GRE tunnels (v1)
4. Consider upgrading to v2
5. Review routing tables
6. Use LACP for bundling (v1)

## Common Mistakes

**Ordering:**
- ❌ Wrong facility code on LOA
- ❌ Multi-mode fiber (need single-mode)
- ❌ Wrong optic type
- ❌ Forgetting to track cross-connect order

**Configuration:**
- ❌ Not using /31 subnets
- ❌ Skipping BGP passwords
- ❌ Wrong ASN
- ❌ Firewall blocking BGP (TCP/179)

**Production:**
- ❌ No maintenance notifications
- ❌ Not testing backup connectivity
- ❌ Missing runbooks
- ❌ No failover testing
- ❌ Ignoring capacity planning

## Quick Reference

**Status Guide:**
- **Active**: Working normally → Monitor
- **Unhealthy**: Down → Check physical
- **Pending**: In progress → Complete cross-connect

**Contact Account Team For:**
- CNI eligibility
- Config assistance
- LOA generation
- Unhealthy interconnects
- Location availability
- Device diversity options

**Key Commands:**
```bash
# List interconnects
curl "https://api.cloudflare.com/client/v4/accounts/${ID}/cni/interconnects" \
  -H "Authorization: Bearer ${TOKEN}"

# Get status
curl "https://api.cloudflare.com/client/v4/accounts/${ID}/cni/interconnects/${ICON}/status" \
  -H "Authorization: Bearer ${TOKEN}"

# Download LOA
curl "https://api.cloudflare.com/client/v4/accounts/${ID}/cni/interconnects/${ICON}/loa" \
  -H "Authorization: Bearer ${TOKEN}" \
  --output loa.pdf

# List CNI objects
curl "https://api.cloudflare.com/client/v4/accounts/${ID}/cni/cnis" \
  -H "Authorization: Bearer ${TOKEN}"

# List available slots
curl "https://api.cloudflare.com/client/v4/accounts/${ID}/cni/slots?occupied=false" \
  -H "Authorization: Bearer ${TOKEN}"
```

## Resources

- [CNI Overview](https://developers.cloudflare.com/network-interconnect/)
- [Get Started](https://developers.cloudflare.com/network-interconnect/get-started/)
- [Monitoring](https://developers.cloudflare.com/network-interconnect/monitoring-and-alerts/)
- [Locations PDF](https://developers.cloudflare.com/network-interconnect/static/cni-locations-30-10-2025.pdf)
- [API Docs](https://developers.cloudflare.com/api/resources/network_interconnects/)
