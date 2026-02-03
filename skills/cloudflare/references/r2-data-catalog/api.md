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
    "permission_groups": [
      {
        "id": "d229766a2f7f4d299f20eaa8c9b1fde9",
        "name": "Workers R2 Data Catalog Write"
      },
      {
        "id": "2efd5506f9c8494dacb1fa10a3e7d5b6",
        "name": "Workers R2 Storage Bucket Item Write"
      }
    ]
  }]
}
```