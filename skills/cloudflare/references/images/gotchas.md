## Best Practices

### 1. Use Appropriate Fit Modes
- `cover`: Hero images, thumbnails, avatars (fills space, crops)
- `contain`: Product images, artwork (preserves full image)
- `scale-down`: Ensure images aren't unnecessarily enlarged

### 2. Format Selection
- Use `format=auto` for automatic AVIF/WebP/JPEG selection
- For Workers, parse `Accept` header for format negotiation
- AVIF: Best compression, use for modern browsers
- WebP: Wide support, good compression
- JPEG: Fallback for older browsers

### 3. Quality Settings
- `85`: Good default balance
- `90-95`: High-quality images (portfolios, product photos)
- `75-80`: Acceptable quality for faster loading
- WebP lossless: `quality=100`

### 4. Responsive Images
- Use `srcset` with multiple widths (400w, 800w, 1200w)
- Set appropriate 