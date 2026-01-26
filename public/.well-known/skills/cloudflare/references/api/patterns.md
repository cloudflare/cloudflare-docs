## Common API Categories

### Zone Management

```typescript
// List zones (with filtering)
const zones = await client.zones.list({
  account: { id: 'account-id' },
  status: 'active',
});

// Create zone
const zone = await client.zones.create({
  account: { id: 'account-id' },
  name: 'example.com',
  type: 'full', // or 'partial'
});

// Update zone
await client.zones.edit('zone-id', {
  paused: false,
  vanity_name_servers: ['ns1.example.com', 'ns2.example.com'],
});

// Delete zone
await client.zones.delete('zone-id');
```

### DNS Management

```typescript
// Create record
await client.dns.records.create({
  zone_id: 'zone-id',
  type: 'A' | 'AAAA' | 'CNAME' | 'TXT' | 'MX' | 'SRV',
  name: 'subdomain.example.com',
  content: '192.0.2.1',
  ttl: 1, // 1 = auto, or specific seconds
  proxied: true, // Orange cloud
  priority: 10, // For MX/SRV records
});

// List records (with filtering)
const records = await client.dns.records.list({
  zone_id: 'zone-id',
  type: 'A',
  name: 'exa