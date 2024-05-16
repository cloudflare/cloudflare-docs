---
title: Available settings
pcx_content_type: reference
weight: 6
meta:
  title: Compression Rules settings
---

# Compression Rules settings

Compression Rules support the configuration settings covered in the following sections.

## Dashboard configuration settings

### Enable compression

Compresses the response according to the algorithms supported by the website visitor (if any). Cloudflare will define the order of preference for the compression algorithms, which may change in the future.

### Disable compression

Disables compression for matching requests. Also disables Cloudflare's [default compression behavior](/speed/optimization/content/brotli/).

### Custom

Defines a custom order for compression algorithms.

Allowed values are the following:

- **Gzip**: Use the Gzip compression algorithm, if supported by the website visitor.
- **Brotli**: Use the Brotli compression algorithm, if supported by the website visitor.
- **Auto**: Compress the response according to the algorithms supported by the website visitor (if any). Cloudflare will define the order of preference for the compression algorithms, which may change in the future. Has the same behavior of the **Enable compression** option.
- **Default**: Use Cloudflare's [default compression behavior](/speed/optimization/content/brotli/), which depends on the response content type.

If you specify only _Gzip_ and/or _Brotli_ and no algorithm matches, the response will have no compression. To configure a fallback compression mechanism, add _Auto_ to the list.

{{<Aside type="note">}}
The compression applied by the _Default_ option takes into account global configuration settings such as [Enable Brotli compression](/speed/optimization/content/brotli/).
{{</Aside>}}

---

## API configuration settings

The configuration object supported by the `compress_response` action has the following format:

```json
"action_parameters": {
  "algorithms": [
    { "name": "<VALUE1>" },
    { "name": "<VALUE2>" },
    // ...
  ]
}
```

The `algorithms` list must contain at least one item.

The supported algorithm values are:

- `gzip`: Use the Gzip compression algorithm, if supported by the website visitor.
- `brotli`: Use the Brotli compression algorithm, if supported by the website visitor.
- `none`: Do not use any compression algorithm.
- `auto`: Compress the response according to the algorithms supported by the website visitor (if any). Cloudflare will define the order of preference for the compression algorithms, which may change in the future.
- `default`: Use Cloudflare's [default compression behavior](/speed/optimization/content/brotli/), which depends on the response content type.

If you include `none`, `default`, or `auto` in the list, it must be the last value in the list.

When you specify only the `gzip` and/or `brotli` algorithms, if no algorithm matches then the response will have no compression. To configure a fallback compression mechanism, add `auto` to the list.

{{<Aside type="note">}}
The compression applied by the `default` algorithm takes into account global configuration settings such as [Enable Brotli compression](/speed/optimization/content/brotli/).
{{</Aside>}}

### Examples

The following API examples implement the same behavior as the options in the Cloudflare dashboard.

{{<details header="Enable compression">}}

To compress a response according to the algorithms supported by the visitor (if any), set the `algorithms` list to a single algorithm: `"auto"`.

```json
"action_parameters": {
  "algorithms": [
    { "name": "auto" }
  ]
}
```

The `auto` algorithm will always apply compression to the response as long as the website visitor supports compression. Cloudflare will define the order of preference for the compression algorithms, which may change in the future.

{{</details>}}

{{<details header="Disable compression">}}

To disable compression for matching requests, set the `algorithms` list to a single algorithm: `"none"`.

```json
"action_parameters": {
  "algorithms": [
    { "name": "none" }
  ]
}
```

{{</details>}}

{{<details header="Define a custom order for compression algorithms">}}

This example sets the preferred compression algorithm to Brotli, using Gzip as a fallback. If the visitor does not support any of these algorithms, try to compress the response according to the algorithms supported by the website visitor (if any).

```json
"action_parameters": {
  "algorithms": [
    { "name": "brotli" },
    { "name": "gzip" },
    { "name": "auto" }
  ]
}
```

{{</details>}}
