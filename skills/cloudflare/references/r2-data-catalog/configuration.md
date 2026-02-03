## Configuration

### Prerequisites
- Cloudflare account with R2 subscription
- R2 bucket created
- API token with both R2 Storage and R2 Data Catalog permissions

### Enable Catalog on Bucket

**Via Wrangler:**
```bash
npx wrangler r2 bucket catalog enable <BUCKET_NAME>
```

**Via Dashboard:**
1. Go to R2 → Select bucket → Settings tab
2. Scroll to "R2 Data Catalog" → Click "Enable"
3. Note the **Catalog URI** and **Warehouse name**

**Output:**
- Catalog URI: `https://<account-id>.r2.cloudflarestorage.com/iceberg/<bucket-name>`
- Warehouse: `<bucket-name>`

### API Token Creation

**Dashboard Method (Recommended):**
1. R2 → Manage API tokens → Create API token
2. Select **Admin Read & Write** or **Admin Read only**
   - Includes both R2 Data Catalog + R2 Storage permissions
3. Copy token value

**API Method (Programmatic):**
```json
{
  "policies": [{
    "effect": "allow",
    "resources": {
      "com.cloudflare.edge.r2.bucket.<account-id>_<jurisdiction>_<bucket-name>": "*"
    },
