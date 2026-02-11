### API Endpoints

```
GET    /zones/{zone_id}/spectrum/apps                    # List apps
POST   /zones/{zone_id}/spectrum/apps                    # Create app
GET    /zones/{zone_id}/spectrum/apps/{app_id}           # Get app
PUT    /zones/{zone_id}/spectrum/apps/{app_id}           # Update app
DELETE /zones/{zone_id}/spectrum/apps/{app_id}           # Delete app

GET    /zones/{zone_id}/spectrum/analytics/aggregate/current
GET    /zones/{zone_id}/spectrum/analytics/events/bytime
GET    /zones/{zone_id}/spectrum/analytics/events/summary
```

### Supported Protocols

**Pro/Business Plans:**
- Selected protocols only (check Cloudflare docs for current list)

**Enterprise Plans:**
- All TCP ports (1-65535)
- All UDP ports (1-65535)
- Port ranges
- Custom protocols