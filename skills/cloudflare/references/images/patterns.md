#### Common Options

```
width=<PIXELS>         # w=<PIXELS> (alias)
height=<PIXELS>        # h=<PIXELS> (alias)
fit=scale-down         # scale-down|contain|cover|crop|pad|squeeze
quality=85             # q=85 (1-100)
format=auto            # f=auto (auto|webp|avif|jpeg|png)
dpr=2                  # Device Pixel Ratio (1-3)
gravity=auto           # auto|left|right|top|bottom|face|0.5x0.5
sharpen=2              # 0-10
blur=10                # 1-250
rotate=90              # 90|180|270
background=white       # CSS color for pad fit mode
metadata=none          # none|copyright|keep
```

### Transform via Workers

Use Cloudflare Workers for programmatic control:

```typescript
export default {
  async fetch(request: Request): Promise<Response> {
    const url = new URL(request.url);
    
    // Parse Accept header for format negotiation
    const accept = request.headers.get('Accept') || '';
    let format: 'avif' | 'webp' | undefined;
    if (/image\/avif/.test(accept)) {
      format = 'a