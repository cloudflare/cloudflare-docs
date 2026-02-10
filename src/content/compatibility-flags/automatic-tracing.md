---
_build:
  publishResources: false
  render: never
  list: never

name: "Automatic tracing"
sort_date: "2025-11-05"
enable_flag: "enable_workers_observability_tracing"
---

This flag will enable [Workers Tracing](/workers/observability/traces/) by default if you have the following configured in your Wrangler configuration file:

```json
{
	"observability": {
		"enabled": true
	}
}
```

You can also explictly turn on automatic tracing without the flag and with older compatibility dates by setting the following:

```json
{
	"observability": {
		"traces": {
			"enabled": true
		}
	}
}
```
