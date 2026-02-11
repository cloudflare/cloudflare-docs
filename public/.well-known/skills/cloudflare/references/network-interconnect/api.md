# CNI API Reference

See [README.md](./README.md) for overview.

## Base

```
https://api.cloudflare.com/client/v4
Auth: Authorization: Bearer <token>
```

## Interconnects

### List
```http
GET /accounts/{account_id}/cni/interconnects
```
Query: `page`, `per_page`

### Create
```http
POST /accounts/{account_id}/cni/interconnects
```
Body: `account`, `slot_id`, `type`, `facility`, `speed`, `name`, `description`

### Get
```http
GET /accounts/{account_id}/cni/interconnects/{icon}
```

### Status
```http
GET /accounts/{account_id}/cni/interconnects/{icon}/status
```
Returns: `active` | `unhealthy` | `pending`

### LOA
```http
GET /accounts/{account_id}/cni/interconnects/{icon}/loa
```
Returns PDF.

### Delete
```http
DELETE /accounts/{account_id}/cni/interconnects/{icon}
```

## CNI Objects (BGP config)

### List
```http
GET /accounts/{account_id}/cni/cnis
```

### Create
```http
POST /accounts/{account_id}/cni/cnis
```
Body: `account`, `cust_ip`, `cf_ip`, `bgp_asn`, `bgp_password`, `vlan`

### Get/Update/Delete
```http
GET /accounts/{account_id}/cni/cnis/{cni}
PUT /accounts/{account_id}/cni/cnis/{cni}
DELETE /accounts/{account_id}/cni/cnis/{cni}
```

## Slots

### List
```http
GET /accounts/{account_id}/cni/slots
```
Query: `facility`, `occupied`

### Get
```http
GET /accounts/{account_id}/cni/slots/{slot}
```

## Settings

### Get/Update
```http
GET /accounts/{account_id}/cni/settings
PUT /accounts/{account_id}/cni/settings
```
Body: `default_asn`

## TypeScript SDK

```typescript
import Cloudflare from 'cloudflare';

const client = new Cloudflare({ apiToken: process.env.CF_TOKEN });

// List
await client.networkInterconnects.interconnects.list({ account_id: id });

// Create
await client.networkInterconnects.interconnects.create({
  account_id: id,
  account: id,
  slot_id: 'slot_abc',
  type: 'direct',
  facility: 'EWR1',
  speed: '10G',
  name: 'prod-interconnect',
});

// Status
await client.networkInterconnects.interconnects.get(accountId, iconId);

// LOA (use fetch)
const res = await fetch(`https://api.cloudflare.com/client/v4/accounts/${id}/cni/interconnects/${iconId}/loa`, {
  headers: { Authorization: `Bearer ${token}` },
});
await fs.writeFile('loa.pdf', Buffer.from(await res.arrayBuffer()));

// CNI object
await client.networkInterconnects.cnis.create({
  account_id: id,
  account: id,
  cust_ip: '192.0.2.1/31',
  cf_ip: '192.0.2.0/31',
  bgp_asn: 65000,
  vlan: 100,
});

// Slots
await client.networkInterconnects.slots.list({
  account_id: id,
  occupied: false,
});
```

## Python SDK

```python
from cloudflare import Cloudflare

client = Cloudflare(api_token=os.environ["CF_TOKEN"])

# List
client.network_interconnects.interconnects.list(account_id=id)

# Create
client.network_interconnects.interconnects.create(
    account_id=id,
    account=id,
    slot_id="slot_abc",
    type="direct",
    facility="EWR1",
    speed="10G",
    name="prod-interconnect",
)

# Status
client.network_interconnects.interconnects.get(account_id=id, icon=icon_id)

# LOA
import requests
res = requests.get(
    f"https://api.cloudflare.com/client/v4/accounts/{id}/cni/interconnects/{icon_id}/loa",
    headers={"Authorization": f"Bearer {token}"}
)
with open("loa.pdf", "wb") as f:
    f.write(res.content)

# CNI object
client.network_interconnects.cnis.create(
    account_id=id,
    account=id,
    cust_ip="192.0.2.1/31",
    cf_ip="192.0.2.0/31",
    bgp_asn=65000,
    vlan=100,
)

# Slots
client.network_interconnects.slots.list(
    account_id=id,
    occupied=False,
)
```

## cURL

```bash
export CF_TOKEN="token"
export ACCOUNT_ID="id"

# List
curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cni/interconnects" \
  -H "Authorization: Bearer ${CF_TOKEN}"

# Create
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cni/interconnects" \
  -H "Authorization: Bearer ${CF_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "account": "'${ACCOUNT_ID}'",
    "slot_id": "slot_abc",
    "type": "direct",
    "facility": "EWR1",
    "speed": "10G",
    "name": "prod-interconnect"
  }'

# Status
curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cni/interconnects/${ICON_ID}/status" \
  -H "Authorization: Bearer ${CF_TOKEN}"

# LOA
curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cni/interconnects/${ICON_ID}/loa" \
  -H "Authorization: Bearer ${CF_TOKEN}" \
  --output loa.pdf

# CNI object
curl -X POST "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cni/cnis" \
  -H "Authorization: Bearer ${CF_TOKEN}" \
  -H "Content-Type: application/json" \
  -d '{
    "account": "'${ACCOUNT_ID}'",
    "cust_ip": "192.0.2.1/31",
    "cf_ip": "192.0.2.0/31",
    "bgp_asn": 65000,
    "vlan": 100
  }'

# Slots
curl "https://api.cloudflare.com/client/v4/accounts/${ACCOUNT_ID}/cni/slots?occupied=false" \
  -H "Authorization: Bearer ${CF_TOKEN}"
```

## Resources

- [API Docs](https://developers.cloudflare.com/api/resources/network_interconnects/)
- [TypeScript SDK](https://github.com/cloudflare/cloudflare-typescript)
- [Python SDK](https://github.com/cloudflare/cloudflare-python)
