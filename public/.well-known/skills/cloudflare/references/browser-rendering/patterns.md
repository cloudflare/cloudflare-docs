## Integration Methods

### 1. REST API
**Best for**: Simple, stateless, one-off tasks

**Authentication**: Requires API Token with `Browser Rendering - Edit` permissions

**Base URL**: `https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/`

**Available endpoints**:
- `/content` - Fetch rendered HTML
- `/screenshot` - Capture screenshots (PNG/JPEG)
- `/pdf` - Generate PDFs
- `/snapshot` - Webpage snapshots
- `/scrape` - Extract HTML elements with selectors
- `/json` - Extract structured data using AI
- `/links` - Retrieve all links from page
- `/markdown` - Convert page to markdown

**Usage monitoring**: Response header `X-Browser-Ms-Used` reports browser time (milliseconds)

**Example - Take screenshot**:
```bash
curl -X POST 'https://api.cloudflare.com/client/v4/accounts/<accountId>/browser-rendering/screenshot' \
  -H 'Authorization: Bearer <apiToken>' \
  -H 'Content-Type: application/json' \
  -d '{
    "url": "https://example.com",
    "screenshotOptions":