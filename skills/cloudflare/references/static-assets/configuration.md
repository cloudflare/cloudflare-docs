## Configuration

### Basic Setup

Minimal configuration requires only `assets.directory`:

```jsonc
{
  "name": "my-worker",
  "compatibility_date": "2025-01-01",
  "assets": {
    "directory": "./dist"
  }
}
```

```toml
name = "my-worker"
compatibility_date = "2025-01-01"

[assets]
directory = "./dist"
```

### Full Configuration Options

```jsonc
{
  "name": "my-worker",
  "main": "src/index.ts",
  "compatibility_date": "2025-01-01",
  "assets": {
    "directory": "./dist",
    "binding": "ASSETS",
    "not_found_handling": "single-page-application",
    "html_handling": "auto-trailing-slash",
    "run_worker_first": ["/api/*", "!/api/docs/*"]
  }
}
```

**Configuration keys:**

- `directory` (string, required): Path to assets folder (e.g. `./dist`, `./public`, `./build`)
- `binding` (string, optional): Name to access assets in Worker code (e.g. `env.ASSETS`)
- `not_found_handling` (string, optional): Behavior when asset not found
  - `"single-page-application"`: Serve `/index.html