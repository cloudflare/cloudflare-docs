## Docs instructions

Alright, we're writing docs for new, default environments for Cloudflare Workers. For this new feature, configuration is going to change a lot, especialyl in terms of Wrangler configuration and how we define environments.

So today, we define environment variables as a type of binding. we're going to invert that order though to better meet developers where they are -- where environment variables can have a value that's a plain text type, secret type, or binding. Binding are these super powerful live objects with methods you can call to interact with real cloudflare resources. Source: https://blog.cloudflare.com/workers-environment-live-object-bindings/

So we need to create a new page under src/content/docs/workers/configuration called environments.mdx.
It should appear 2nd in the navigation, right after "Bindings"

Now, here's how you configure your envionrments in a Wrangler configuration file

```jsonc
{
	"name": "my-worker",
	"compatibility_date": "$today",
	"envVars": {
		"API_BASE": [
			{
				"type": "text",
				"value": "https://api.cloudflare.com/client/v4",
				"targetEnv": ["production"],
			},
			{
				"type": "text",
				"value": "https://api.staging.cloudflare.com/client/v4",
				"targetEnv": ["preview"],
			},
		],
		"MY_KV": [
			{
				"type": "kv_namespace",
				"namespaceId": "abc123prod",
				"targetEnv": ["production"],
			},
			{
				"type": "kv_namespace",
				"namespaceId": "def456staging",
				"targetEnv": ["preview"],
			},
		],
		"DB": [
			{
				"type": "d1",
				"databaseId": "prod-db-id-123",
				"targetEnv": ["production"],
			},
			{
				"type": "d1",
				"databaseId": "staging-db-id-456",
				"targetEnv": ["preview"],
			},
		],
		"MY_BUCKET": [
			{
				"type": "r2_bucket",
				"bucketName": "prod-bucket",
				"targetEnv": ["production"],
			},
			{
				"type": "r2_bucket",
				"bucketName": "staging-bucket",
				"targetEnv": ["preview"],
			},
		],
	},
}
```

Cloudflare provides two default environments

- production -- this is what gets deployed when you run wrangler deploy, and it serves live traffic on your workers.dev / custom domain / routes
- preview - this environment config gets used for your PR previews (if you connect your git repo to Cloudflare) or wehn you run wrangler deploy --preview

as you might notice, this config strucutre is quite different than what we include for configuration

Namely, everything is included in the envVars object, including all bindings and plain text env vars. You designate which environment each binding or env var belongs to with the targetEnv array.

We'll need to update a lot of docs if we went this direction -- such as
src/content/docs/workers/configuration/environment-variables.mdx

I have a previous version of the docs that explain the default environments, but originally it was all about inheritance. this is different because you need to be explicit -- theres no implicit inheritance which is much safer. But I like the framing / style of these docs and want you to match them in terms of structure.

---

pcx_content_type: configuration
title: Environments
sidebar:
order: 10
head: []
description: Configure Production, Preview, and Development environments for your Worker using a baseline and override approach.

---

import {
Details,
LinkCard,
Render,
PackageManagers,
WranglerConfig,
InlineBadge,
CardGrid,
Card,
Type,
TypeScriptExample,
Tabs,
TabItem,
} from "~/components";

An **environment** is a collection of settings that determines how your Worker runs - such as which resources it connects to, what [environment variables](/workers/configuration/environment-variables/) it uses, and what domains it's available on.

Every Worker has three built-in **environments** that map to specific phases in your workflow:

- **[Production](#production)**: For serving your live application to real users. **Production** defines the default settings that are used by all other environments, unless explicitly overridden.

- **[Preview](#preview)**: For testing and sharing Pull Request changes before they go live. **Preview** automatically inherits all your **Production** settings, so you only need to specify what should be different for testing - like swapping your production database for a test one while keeping everything else the same.

- **[Development](#development)**: For developing and testing on your local machine. You store your settings for your **Development** environment in the Cloudflare dashboard, and you can pull them down anytime with [`wrangler env pull`](/workers/wrangler/commands/#env).

## Quick start

**Start from CLI** - scaffold a full-stack app with a React SPA, Cloudflare Workers API, and the [Cloudflare Vite plugin](/workers/vite-plugin/) with configured environments.

<PackageManagers
	type="create"
	pkg="cloudflare@latest"
	args="my-react-app --framework=react"
/>

---

**Or just deploy to Cloudflare**

[![Deploy to Workers](https://deploy.workers.cloudflare.com/button)](https://dash.cloudflare.com/?to=/:account/workers-and-pages/create/deploy-to-workers&repository=https://github.com/cloudflare/templates/tree/main/vite-react-template)

## Production

Your **Production** environment defines the default configuration for your Worker - including [bindings](/workers/runtime-apis/bindings/), the resources they connect to, and [environment variables](/workers/configuration/environment-variables/).

Your Worker uses these Production settings to serve traffic on your [`*.workers.dev` subdomain](/workers/configuration/routing/workers-dev/), [custom domain](/workers/configuration/routing/custom-domains/), or [route](/workers/configuration/routing/routes/) when you:

- Run [`wrangler deploy`](/workers/wrangler/commands/#deploy) using the Wrangler CLI.
- Merge a change into `main` (the default production branch) with [automated builds](/workers/ci-cd/builds/).

### Configuration

You define your Production environment directly in your [Wrangler configuration file](/workers/wrangler/configuration/). These settings serve as the defaults that your other environments inherit from.

<WranglerConfig>
```jsonc title="wrangler.jsonc"
{
  "name": "my-worker",
  "compatibility_date": "$today",
  // Production environment
  "vars": {
    "ENVIRONMENT": "production"
  },
  "kv_namespaces": [
    {
      "binding": "MY_KV",
      "id": "xyz789production"
    }
  ],
}
```
</WranglerConfig>

### Secrets

[Secrets](/workers/configuration/secrets/) contain sensitive data like API keys, passwords, and tokens. Unlike other configuration, you cannot define secrets in your [Wrangler configuration file](/workers/wrangler/configuration/) - you must set them using the CLI or dashboard.

Secrets are also **not inherited** between environments. You must set them separately for each environment ([Production](#production), [Preview](#preview), and [Development](#development)) to keep them secure.

Set secrets for your **Production** environment using the [Wrangler CLI](/workers/wrangler/) or dashboard:

**CLI**

<PackageManagers type="exec" pkg="wrangler" args="secret put API_SECRET" />

**Dashboard**

Go to **Settings** > **Environments** > **Production** > **Secrets**

## Preview

Your **Preview** environment lets you override [Production](#production) settings for pull requests. For example, if your **Production** environment uses your real customer [D1 database](/d1/), you can configure **Preview** to use a test database instead - keeping your production data safe while you test changes.

Cloudflare creates a **PR preview** with its own unique URL using these **Preview** settings when you:

- Push a commit to a branch that's not your production branch when you've connected your [Git repository](/workers/ci-cd/git-integration/). Cloudflare automatically posts a comment on your PR with a link to your PR preview.
- Run [`wrangler deploy --preview`](/workers/wrangler/commands/#deploy) using the Wrangler CLI.

Your Preview environment acts as a template for all your PR previews. It automatically inherits all **Production** settings, so you only need to define the overrides - like using a test database instead of your production database.

### Configuration

You define your **Preview** environment in the `preview` block. Only include what overrides you want to apply to your **PR previews** - everything else gets inherited from [**Production**](#production).

<WranglerConfig>
```jsonc title="wrangler.jsonc"
{
  "name": "my-worker",
  "compatibility_date": "$today",
  // Production defaults 
  "vars": {
    "ENVIRONMENT": "production"
  },
  "kv_namespaces": [
    {
      "binding": "MY_KV",
      "id": "xyz789production"
    }
  ],
  // Preview overrides (applies to all PR Previews)
  "preview": {
    "vars": {
      "ENVIRONMENT": "preview"
    },
    "kv_namespaces": [
      {
        "binding": "MY_KV",
        "id": "abc123preview"  // Use test KV namespace
      }
    ]
  }
}
```
</WranglerConfig>

In this example, PR previews will use the `abc123preview` [KV namespace](/kv/) instead of the **Production** namespace. The `ENVIRONMENT` [var](/workers/configuration/environment-variables/) is set to "preview", but all other settings stay the same as [Production](#production).

### Secrets

Unlike other settings, [secrets](/workers/configuration/secrets/) are not inherited from **Production**. You must set secrets separately for each environment to keep them secure.

Set secrets for your **Preview** environment using the Wrangler CLI or dashboard:

**CLI**

<PackageManagers type="exec" pkg="wrangler" args="secret put --preview" />

**Dashboard**

Go to **Settings** > **Environments** > **Secrets**

By default, all PR Previews share the same secrets.

### Override settings for a specific PR preview

If a specific PR needs different bindings, [environment variables](/workers/configuration/environment-variables/), or [secrets](/workers/configuration/secrets/) than what's supplied by the shared Preview environment, you can override them for that specific PR preview.

For example, one PR might be debugging a complex issue and needs `DEBUG_MODE=true` with verbose logging enabled, while other PRs use normal logging levels.

**To set overrides for a specific PR preview:**

1. Go to **Workers & Pages** > select your Worker
2. Go to **Deployments** > find your PR preview
3. Click **Settings** > **Variables & secrets** > toggle the **Override** button
4. Add or modify the values you want to override for this specific PR
5. Click **Save** - this redeploys the PR preview with your overrides

All future commits to that branch will automatically use these overrides. When the branch is deleted, the overrides are automatically cleaned up

## Development

Your **Development** environment defines the settings your Worker uses when running locally on your machine. You store these settings in the Cloudflare dashboard and pull them down with [`wrangler env pull`](/workers/wrangler/commands/#env).

Unlike [Production](#production) and [Preview](#preview) which run on Cloudflare's network, Development uses [Miniflare](https://miniflare.dev/) to simulate the Workers runtime on your computer. By default, Miniflare creates local simulations of your resources (like [KV namespaces](/kv/) or [D1 databases](/d1/)), letting you develop offline without costs.

### When you use Development settings

Your Worker uses your Development environment settings when you run:

- [`wrangler dev`](/workers/wrangler/commands/#dev) using the Wrangler CLI
- `vite dev` if using the [Cloudflare Vite plugin](/workers/vite-plugin/)

### Configuration

Define your Development environment in the `development` block. You can use local simulations or connect to remote resources.

<WranglerConfig>
```jsonc title="wrangler.jsonc"
{
  "name": "my-worker",
  "compatibility_date": "$today",
  // Production configuration
  "vars": {
    "ENVIRONMENT": "production"
  },
  "kv_namespaces": [
    {
      "binding": "MY_KV",
      "id": "xyz789production"
    }
  ],
  // Development (local simulations)
  "development": {
    "kv_namespaces": [
      {
        "binding": "MY_KV"
        // No ID - Miniflare creates a local simulation
      }
    ]
  }
}
```
</WranglerConfig>

**Local bindings:** When you don't specify an ID, [Miniflare](https://miniflare.dev/) creates local simulations of resources. This lets you develop offline without costs.

**Remote bindings:** You can also connect to deployed resources during development by providing an ID. For example, connecting to your [Preview](#preview) KV namespace:

<WranglerConfig>
```jsonc title="wrangler.jsonc"
{
  "development": {
    "kv_namespaces": [
      {
        "binding": "MY_KV",
        "id": "abc123preview"  // Connect to preview KV for testing
      }
    ]
  }
}
```
</WranglerConfig>

### Environment variables and secrets

Store your Development [environment variables](/workers/configuration/environment-variables/) and [secrets](/workers/configuration/secrets/) in a `.env` or `.env.local` file in your project root:

```ini title=".env"
API_KEY=your-dev-api-key
DATABASE_URL=http://localhost:5432
```

You can also pull settings from the dashboard with [`wrangler env pull`](/workers/wrangler/commands/#env):

<PackageManagers type="exec" pkg="wrangler" args="env pull" />

This pulls your Development environment variables and secrets from the dashboard into a `.env.local` file.

To pull settings from [Preview](#preview) or [Production](#production) instead:

<PackageManagers type="exec" pkg="wrangler" args="env pull --preview" />

<PackageManagers type="exec" pkg="wrangler" args="env pull --production" />

## Guides

This guide will walk you through setting up environments for your Worker application from scratch. For a quickstart that creates an application with environments already configured, use [this template](needs a template)

<Tabs syncKey="createMethod">
<TabItem label="CLI">

You can create a new Worker application using the `create-cloudflare` package:

<PackageManagers
	type="create"
	pkg="cloudflare@latest"
	args="my-app -- --framework=react --lang=ts"
/>

Move into your directory and build your application:

```sh
cd my-app && npm run build
```

#### Review configuration

Next, let's look at our [Wrangler configuration file](/workers/wrangler/configuration/). It should look like this:

<WranglerConfig>

```jsonc title="wrangler.jsonc"
{
	"name": "my-worker",
	"compatibility_date": "$today",
	"assets": {
		"not_found_handling": "single-page-application",
	},
	"development": {},
	"preview": {},
}
```

</WranglerConfig>

The main configuration (outside the `preview` and `development` blocks) contains your **[Production](#production-environment)** settings. The `preview` block holds overrides for **[Preview](#preview-environment)** deployments. The `development` block contains local settings for **[Development](#development-environment)**.

#### Add bindings and environment variables

Now add **[bindings](/workers/runtime-apis/bindings/)** and **[environment variables](/workers/configuration/environment-variables/)** to your configuration. Remember: Production settings go in the main configuration, and Preview only contains what differs.

<WranglerConfig>
```jsonc title="wrangler.jsonc"
{
  "name": "my-worker",
  "compatibility_date": "$today",
  "assets": {
    "not_found_handling": "single-page-application"
  },
  // Production configuration (top-level = default)
  "vars": {
    "ENVIRONMENT": "production"
  },
  "kv_namespaces": [
    {
      "binding": "MY_KV"
    }
  ],
  // Preview overrides
  "preview": {
    "vars": {
      "ENVIRONMENT": "preview"
    },
    "kv_namespaces": [
      {
        "binding": "MY_KV"
      }
    ]
  },
  // Development (local simulation)
  "development": {
    "kv_namespaces": [
      {
        "binding": "MY_KV"
      }
    ]
  }
}
```

</WranglerConfig>

In this example:

- **[Bindings](/workers/runtime-apis/bindings/):** We've added a [KV namespace](/kv/) binding `MY_KV` in the main configuration for **[Production](#production-environment)**. The `preview` block also includes `MY_KV` because we want a separate KV namespace for testing. The `development` block includes `MY_KV` without an ID - [Miniflare](https://miniflare.dev/) will create a local simulation.

- **[Environment variables](/workers/configuration/environment-variables/):** The `vars` in the main configuration define Production values. The `preview` block overrides the `ENVIRONMENT` variable for testing. For **[Development](#development-environment)**, you can place environment variables and [secrets](/workers/configuration/secrets/) in a `.env` file.

#### Deploy

Now, let's deploy our Worker application:

<PackageManagers type="exec" pkg="wrangler" args="deploy" />

Because there aren't any existing [KV namespaces](/kv/) for `MY_KV` to connect to, [Wrangler](/workers/wrangler/) automatically provisions separate KV namespaces for **[Production](#production-environment)** and **[Preview](#preview-environment)**.

If you look again at your Wrangler configuration file, you'll see that KV namespace IDs have been added - the Production ID is in the main configuration, and the Preview ID is in the `preview` block:

<WranglerConfig>
```jsonc title="wrangler.jsonc"
{
  "name": "my-worker",
  "compatibility_date": "$today",
  "assets": {
    "not_found_handling": "single-page-application"
  },
  // Production configuration with auto-provisioned ID
  "kv_namespaces": [
    {
      "binding": "MY_KV",
      "id": "<production-kv-namespace-id>"
    }
  ],
  // Preview overrides with auto-provisioned ID
  "preview": {
    "kv_namespaces": [
      {
        "binding": "MY_KV",
        "id": "<preview-kv-namespace-id>"
      }
    ]
  },
  // Development (local simulation)
  "development": {
    "kv_namespaces": [
      {
        "binding": "MY_KV"
      }
    ]
  }
}
```

</WranglerConfig>

And you're done! In the [Cloudflare dashboard](https://dash.cloudflare.com), you should now see in the **Overview** tab your **[production](#production-environment)** deployment, made immediately available on your [`workers.dev` domain](/workers/configuration/routing/workers-dev/).

You can automate production and preview deployments by [connecting your Git repository](/workers/ci-cd/git-integration/) to Cloudflare, making it easy to setup [preview deployments](#preview-deployments) with separate resources and configuration for your pull requests.

</TabItem>
<TabItem label="Dashboard">

1. Go to **Workers & Pages** in the [Cloudflare dashboard](https://dash.cloudflare.com).
2. Select **Create application**.
3. Choose from:
   - Gallery of production-ready templates
   - Import an existing Git repository
   - Clone a public repository
4. Connect your Git provider and configure your project.
5. Select **Deploy**.

Your Worker will be immediately deployed with all three environments setup. You can see what [bindings](/workers/runtime-apis/bindings/) each environment uses in the **Bindings** tab, as well as the [environment variables](/workers/configuration/environment-variables/) and other settings for each environment in **Settings** > **Environments**.

#### Pull down your development environment

First, clone your repository locally:

```bash
git clone <git repo URL>
cd <directory>
```

Then, run `wrangler env pull` to pull down your **[development](#development-environment)** environment settings.

<PackageManagers type="exec" pkg="wrangler" args="env pull" />

By default, `wrangler env pull` pulls down any settings stored in the dashboard (including [environment variables](/workers/configuration/environment-variables/) and [secrets](/workers/configuration/secrets/)) for your **[development](#development-environment)** environment, and populates an `env.local` file with those values. You can pull down another environment's configuration by running `wrangler env pull --preview` or `wrangler env pull --production.` When you run [`wrangler dev`](/workers/wrangler/commands/#dev) (or `vite dev` if using the [Cloudflare Vite plugin](/workers/vite-plugin/)), the development server will look for this file to use for your **[development](#development-environment)** environment's configuration.

#### Test changes with a preview deployment

Now let's make a change and create a [preview deployment](#preview-deployments) to test it:

1. Create a new branch for your changes:

```bash
git checkout -b feature/my-new-feature
```

2. Make changes to your Worker code and test locally with [`wrangler dev`](/workers/wrangler/commands/#dev).

3. Commit and push your changes to the new branch:

```bash
git add .
git commit -m "Add new feature"
git push origin feature/my-new-feature
```

4. Create a pull request in your Git repository (GitHub, GitLab, etc.).

5. Cloudflare automatically creates a **[preview deployment](#preview-deployments)** using your **[preview environment](#preview-environment)** settings. Within moments, you'll see a comment on your pull request with a unique URL to your preview deployment.

Your preview deployment uses the [bindings](/workers/runtime-apis/bindings/), [environment variables](/workers/configuration/environment-variables/), and [secrets](/workers/configuration/secrets/) defined in your [preview environment](#preview-environment), allowing you to test your changes with isolated resources before merging to production.

</TabItem>
<TabItem label="API">

This guide shows how to deploy to both your [production](#production-environment) and [preview](#preview-environment) environments using the Cloudflare API.

#### Deploy to production

Deploy to production by creating a new version and deployment for your Worker. Your Worker's top-level configuration contains the Production settings:

```bash
# Set your credentials
ACCOUNT_ID="your_account_id"
API_TOKEN="your_api_token"
WORKER_NAME="my-worker"
WORKER_ID="your_worker_id"

# Prepare your script
SCRIPT_BASE64=$(cat ./dist/index.mjs | base64)

# Create a new version
VERSION_RESPONSE=$(curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers/$WORKER_ID/versions" \
  -X POST \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "compatibility_date": "$today",
    "main_module": "index.mjs",
    "modules": [
      {
        "name": "index.mjs",
        "content_type": "application/javascript+module",
        "content_base64": "'$SCRIPT_BASE64'"
      }
    ]
  }')

VERSION_ID=$(echo "$VERSION_RESPONSE" | jq -r '.result.id')

# Deploy the new version (send 100% of traffic to it)
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/scripts/$WORKER_NAME/deployments" \
  -X POST \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "strategy": "percentage",
    "versions": [
      {
        "percentage": 100,
        "version_id": "'$VERSION_ID'"
      }
    ]
  }'
```

#### Deploy a preview for a feature branch

Create a [preview deployment](#preview-deployments) by posting to the Worker's `/previews` endpoint. The API automatically creates an ephemeral preview Worker that inherits your Production settings and applies the preview overrides from `preview_settings`:

```bash
# Set your credentials
ACCOUNT_ID="your_account_id"
API_TOKEN="your_api_token"
WORKER_ID="your_worker_id"
BRANCH_NAME="feature-xyz-123"

# Prepare your script
FEATURE_SCRIPT_BASE64=$(cat ./dist/index.mjs | base64)

# Deploy the feature branch as a preview
PREVIEW_RESPONSE=$(curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers/$WORKER_ID/previews" \
  -X POST \
  -H "Authorization: Bearer $API_TOKEN" \
  -H "Content-Type: application/json" \
  -d '{
    "annotations": {
      "workers/branch": "'$BRANCH_NAME'"
    },
    "compatibility_date": "$today",
    "main_module": "index.mjs",
    "modules": [
      {
        "name": "index.mjs",
        "content_type": "application/javascript+module",
        "content_base64": "'$FEATURE_SCRIPT_BASE64'"
      }
    ]
  }')

# Get the preview deployment info
PREVIEW_ID=$(echo "$PREVIEW_RESPONSE" | jq -r '.result.id')
PREVIEW_URL=$(echo "$PREVIEW_RESPONSE" | jq -r '.result.url')

echo "Preview deployed: $PREVIEW_URL"
echo "Preview ID: $PREVIEW_ID"
```

#### Clean up preview deployments

When your pull request is merged or closed, delete the ephemeral preview:

```bash
curl "https://api.cloudflare.com/client/v4/accounts/$ACCOUNT_ID/workers/workers/$WORKER_ID/previews/$PREVIEW_ID" \
  -X DELETE \
  -H "Authorization: Bearer $API_TOKEN"
```

</TabItem>
<TabItem label="TypeScript SDK">

This guide shows how to deploy to both your [production](#production-environment) and [preview](#preview-environment) environments using the [Cloudflare TypeScript SDK](https://github.com/cloudflare/cloudflare-typescript).

Install the SDK:

```bash
npm install cloudflare
```

#### Deploy to production

Deploy to production by creating a new version and deployment for your Worker. The Worker's top-level settings contain your Production configuration:

```typescript
import Cloudflare from "cloudflare";
import fs from "fs";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const WORKER_NAME = "my-worker";
const WORKER_ID = "your_worker_id";

const client = new Cloudflare({ apiToken: API_TOKEN });

async function deployToProduction() {
	const scriptContent = fs.readFileSync("./dist/index.mjs", "utf8");
	const scriptBase64 = Buffer.from(scriptContent).toString("base64");

	// Create a new version
	const version = await client.workers.beta.workers.versions.create(WORKER_ID, {
		account_id: ACCOUNT_ID,
		main_module: "index.mjs",
		compatibility_date: "$today",
		modules: [
			{
				name: "index.mjs",
				content_type: "application/javascript+module",
				content_base64: scriptBase64,
			},
		],
	});

	// Deploy the new version
	await client.workers.scripts.deployments.create(WORKER_NAME, {
		account_id: ACCOUNT_ID,
		strategy: "percentage",
		versions: [
			{
				percentage: 100,
				version_id: version.id,
			},
		],
	});

	console.log(`Successfully deployed version ${version.id} to production.`);
}

deployToProduction();
```

#### Deploy a preview for a feature branch

Create a [preview deployment](#preview-deployments) by calling `workers.previews.create` on the parent Worker. This automatically creates an ephemeral preview that inherits Production settings and applies preview overrides:

```typescript
import Cloudflare from "cloudflare";
import fs from "fs";

const ACCOUNT_ID = process.env.CLOUDFLARE_ACCOUNT_ID;
const API_TOKEN = process.env.CLOUDFLARE_API_TOKEN;
const WORKER_ID = process.env.CLOUDFLARE_WORKER_ID;
const BRANCH_NAME = process.env.GIT_BRANCH_NAME;

const client = new Cloudflare({ apiToken: API_TOKEN });

async function deployPreview() {
	const scriptContent = fs.readFileSync("./dist/index.mjs", "utf8");
	const scriptBase64 = Buffer.from(scriptContent).toString("base64");

	// Create a preview deployment
	const preview = await client.workers.beta.workers.previews.create(WORKER_ID, {
		account_id: ACCOUNT_ID,
		main_module: "index.mjs",
		compatibility_date: "$today",
		annotations: {
			"workers/branch": BRANCH_NAME,
		},
		modules: [
			{
				name: "index.mjs",
				content_type: "application/javascript+module",
				content_base64: scriptBase64,
			},
		],
	});

	console.log(`Preview deployed: ${preview.url}`);
	console.log(`Preview ID: ${preview.id}`);

	// Store the preview ID for cleanup when the PR is merged/closed
	return preview.id;
}

async function cleanupPreview(previewId: string) {
	// Delete the ephemeral preview when the PR is merged/closed
	await client.workers.beta.workers.previews.delete(WORKER_ID, previewId, {
		account_id: ACCOUNT_ID,
	});
	console.log(`Cleaned up preview: ${previewId}`);
}

// Example usage in your CI/CD pipeline
// const previewId = await deployPreview();
// await cleanupPreview(previewId);
```

</TabItem>
<TabItem label="Terraform">

This guide shows how to define your infrastructure using the [Cloudflare Terraform provider](https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs). With the new environments model, you manage a single Worker resource that contains both Production settings (at the top level) and Preview overrides (in `preview_settings`).

Install [Terraform](https://www.terraform.io/downloads).

Create a `main.tf` file:

```hcl
variable "account_id" {
  description = "Your Cloudflare account ID"
}

# Define the Worker with production and preview settings
resource "cloudflare_worker" "my_worker" {
  account_id = var.account_id
  name       = "my-worker"

  # Production settings (top-level = default)
  observability = {
    enabled = true
  }

  bindings = [
    {
      type = "kv_namespace"
      name = "MY_KV"
      namespace_id = "xyz789production"
    }
  ]

  vars = {
    ENVIRONMENT = "production"
    API_URL     = "https://api.example.com"
  }

  # Preview overrides (template for all preview deployments)
  preview_settings = {
    bindings = [
      {
        type = "kv_namespace"
        name = "MY_KV"
        namespace_id = "abc123preview"  # Use test KV namespace
      }
    ]

    vars = {
      ENVIRONMENT = "preview"
      # API_URL inherits from production
    }

    observability = {
      enabled = true
    }
  }
}

# (Optional) Define the production deployment
# You can manage production deployments in Terraform or via CI/CD
resource "cloudflare_worker_version" "my_worker_version" {
  account_id = var.account_id
  worker_id  = cloudflare_worker.my_worker.id

  compatibility_date = "$today"
  main_module        = "index.mjs"
  modules = [
    {
      name         = "index.mjs"
      content_type = "application/javascript+module"
      content_file = "path/to/index.mjs"
    }
  ]
}

resource "cloudflare_workers_deployment" "my_worker_deployment" {
  account_id  = var.account_id
  script_name = cloudflare_worker.my_worker.name
  strategy    = "percentage"
  versions = [{
    percentage = 100
    version_id = cloudflare_worker_version.my_worker_version.id
  }]
}
```

Deploy your infrastructure:

```bash
terraform init
terraform apply
```

**Important:** Ephemeral preview deployments created for Pull Requests are NOT managed by Terraform. Only the `preview_settings` template (which defines what settings previews should override) is managed here. The actual preview Workers are automatically created and cleaned up by your CI/CD pipeline when branches are pushed and deleted.

</TabItem>
</Tabs>

## Using environments with already deployed Workers

If you have a Worker that was deployed before environments were introduced, we recommend migrating your configuration to use the new Production as Default model.

### Migrate your existing configuration

To migrate your existing Worker to the new environments model:

1. Keep your existing configuration in the main part of your Wrangler configuration file - this becomes your **[Production](#production-environment)** baseline.
2. Add a `preview` block with only the settings that should differ from Production.
3. Add a `development` block with binding types (without IDs) for local development.

**Before (existing configuration):**

<WranglerConfig>
```jsonc title="wrangler.jsonc"
{
  "name": "my-worker",
  "compatibility_date": "$today",
  "vars": {
    "ENVIRONMENT": "production"
  },
  "kv_namespaces": [
    {
      "binding": "MY_KV",
      "id": "abc123"
    }
  ],
  "r2_buckets": [
    {
      "binding": "MY_BUCKET",
      "bucket_name": "my-bucket"
    }
  ]
}
```
</WranglerConfig>

**After (with new environments model):**

<WranglerConfig>
```jsonc title="wrangler.jsonc"
{
  "name": "my-worker",
  "compatibility_date": "$today",
  // Production configuration (top-level = baseline)
  "vars": {
    "ENVIRONMENT": "production"
  },
  "kv_namespaces": [
    {
      "binding": "MY_KV",
      "id": "abc123"
    }
  ],
  "r2_buckets": [
    {
      "binding": "MY_BUCKET",
      "bucket_name": "my-bucket"
    }
  ],
  // Preview overrides (only what differs)
  "preview": {
    "vars": {
      "ENVIRONMENT": "preview"
    }
    // MY_KV and MY_BUCKET inherit from production
  },
  // Development (local simulations)
  "development": {
    "kv_namespaces": [
      {
        "binding": "MY_KV"
      }
    ],
    "r2_buckets": [
      {
        "binding": "MY_BUCKET"
      }
    ]
  }
}
```
</WranglerConfig>

In this example:

- **[Production environment](#production-environment):** Your original configuration stays in the main configuration as the baseline.
- **[Preview environment](#preview-environment):** Only overrides the `ENVIRONMENT` variable. The KV namespace and R2 bucket inherit from Production, so preview deployments will use the same resources as production. If you want separate preview resources, specify them explicitly in the `preview` block.
- **[Development environment](#development-environment):** Only defines binding types without IDs. [Miniflare](https://miniflare.dev/) will create local simulations when you run [`wrangler dev`](/workers/wrangler/commands/#dev).

### Using separate resources for preview

If you want to use separate resources for your [preview environment](#preview-environment), specify them in the `preview` block:

<WranglerConfig>
```jsonc title="wrangler.jsonc"
{
  "name": "my-worker",
  "compatibility_date": "$today",
  // Production configuration (top-level = baseline)
  "vars": {
    "ENVIRONMENT": "production"
  },
  "kv_namespaces": [
    {
      "binding": "MY_KV",
      "id": "abc123production"
    }
  ],
  "r2_buckets": [
    {
      "binding": "MY_BUCKET",
      "bucket_name": "my-production-bucket"
    }
  ],
  // Preview overrides (separate resources for testing)
  "preview": {
    "vars": {
      "ENVIRONMENT": "preview"
    },
    "kv_namespaces": [
      {
        "binding": "MY_KV",
        "id": "abc123preview"
      }
    ],
    "r2_buckets": [
      {
        "binding": "MY_BUCKET",
        "bucket_name": "my-preview-bucket"
      }
    ]
  }
}
```
</WranglerConfig>

You can create these resources using:

- The [Cloudflare dashboard](https://dash.cloudflare.com)
- The [Wrangler CLI](/workers/wrangler/) (e.g., [`wrangler kv namespace create`](/kv/api/))
- Letting [Wrangler](/workers/wrangler/) auto-provision them on your first [`wrangler deploy`](/workers/wrangler/commands/#deploy)

## Using environments with Wrangler environments

We recommend using the environments ([`development`](#development-environment), [`preview`](#preview-environment), and [`production`](#production-environment)) instead of [Wrangler environments](/workers/wrangler/configuration/#environments). However, if you're already using Wrangler environments, you can use both together.

[Wrangler environments](/workers/wrangler/configuration/#environments) act as a template to create entirely separate copies of your Worker application as a long-lived environment. Each Wrangler environment creates a **separate Worker**, which means that each Wrangler environment Worker can have its own baseline and preview settings.

To use the new environments model with Wrangler environments, define your Production baseline settings and `preview` overrides within each Wrangler `env` block:

<WranglerConfig>
```jsonc title="wrangler.jsonc"
{
  "name": "my-worker",
  "compatibility_date": "$today",
  "env": {
    "staging": {
      // Staging production baseline (top-level)
      "vars": {
        "ENVIRONMENT": "staging-production"
      },
      "kv_namespaces": [
        {
          "binding": "MY_KV",
          "id": "staging-production-kv-id"
        }
      ],
      // Staging preview overrides
      "preview": {
        "vars": {
          "ENVIRONMENT": "staging-preview"
        },
        "kv_namespaces": [
          {
            "binding": "MY_KV",
            "id": "staging-preview-kv-id"
          }
        ]
      },
      // Staging development (local)
      "development": {
        "kv_namespaces": [
          {
            "binding": "MY_KV"
          }
        ]
      }
    },
    "production": {
      // Production baseline (top-level)
      "vars": {
        "ENVIRONMENT": "production"
      },
      "kv_namespaces": [
        {
          "binding": "MY_KV",
          "id": "production-kv-id"
        }
      ],
      // Production preview overrides
      "preview": {
        "vars": {
          "ENVIRONMENT": "production-preview"
        },
        "kv_namespaces": [
          {
            "binding": "MY_KV",
            "id": "production-preview-kv-id"
          }
        ]
      },
      // Production development (local)
      "development": {
        "kv_namespaces": [
          {
            "binding": "MY_KV"
          }
        ]
      }
    }
  }
}
```
</WranglerConfig>

In this example:

- **`staging` Wrangler environment:** Creates a separate Worker with its own Production baseline (top-level) and Preview overrides. Deploy with `wrangler deploy --env staging`.
- **`production` Wrangler environment:** Creates another separate Worker with different Production baseline and Preview settings. Deploy with `wrangler deploy --env production`.

Each Wrangler environment Worker operates independently with its own:

- Production baseline configuration
- Preview overrides for [preview deployments](#preview-deployments)
- [Development environment](#development-environment) for local testing

## API design

Created by Max Peterson, last modified on 2025-11-11
This is a re-think of Sketching a Workers Applications API that came out of in-person discussions with Brendan and Korinne at the SF office on 11/10/2025.
What we want
We want to let users configure different Workers settings for production and previews. For now, we're focusing on a CI-based workflow where PRs opened against main/master are deployed as previews, and changes merged to main/master are deployed to production. We want each preview to be a separate, fully-featured Worker, with its own independent settings and version history. That's not how previews work today. Previews are shoehorned into versions, which have significant limitations. Preview versions don't support observability, DO migrations, and other features that full Workers do. Preview versions also share settings and version history with the parent Worker, with no clear separation between unrelated preview and production changes. Versions solve two different problems today: 1) supporting gradual rollouts and rollbacks, and 2) supporting PR previews. Versions make sense for the first problem, but aren't well equipped to solve the second. This proposal separates out previews from versions and upgrades them into fully-featured Workers, improving both configurability and isolation.
What this looks like
There's a "preview_settings" property of the Worker resource that stores default values for all Workers settings (both Worker-level and version-level). These default settings can be updated by PATCHing the Worker resource. Updating these settings does not immediately change anything, as the new values will not be used until the next preview is created.
GET /workers/workers/:worker_id
{
"result": {
"id": "bdf3567828824b74aadd550004cf4913",
"name": "max-postman-test",
"tags": [],
// ...
"preview_settings": {
"bindings": [{ "name": "ENV", "type": "plain_text", "text": "PREVIEW" }],
"observability": { "enabled": true },
"compatibility_date": "2025-10-30"
},
"development_settings": {
"bindings": [{ "name": "ENV", "type": "plain_text", "text": "DEV" }],
"compatibility_date": "2025-10-30"
}
},
"success": true,
"errors": [],
"messages": []
}
The API interface for creating and updating preview Workers is nested under the existing /workers/workers/\* routes. The API interface is the exact same as the top-level Workers interface, but operations are scoped to preview Workers under the parent Worker. Here's what the API path structure would look like (update and delete operations are omitted for brevity):
Method
Endpoint
Description
Method
Endpoint
Description
GET /workers/workers/:worker_id/previews Same as top-level list Workers endpoint, but only returns preview Workers for the specified parent Worker
POST /workers/workers/:worker_id/previews Same as top-level create Worker endpoint, but uses default values from "preview_settings" property of parent Worker
GET /workers/workers/:worker_id/previews/:preview_id Same as top-level read Worker endpoint
GET /workers/workers/:worker_id/previews/:preview_id/versions Same as top-level list versions endpoint
POST /workers/workers/:worker_id/previews/:preview_id/versions Same as top-level create version endpoint, but uses default values from "preview_settings" property of parent Worker, deploy version by setting ?deploy=true
Preview Workers are not returned by top-level endpoints (e.g. list Workers with GET /workers/workers/) and can only be updated using their parent-scoped API endpoint. Preview Workers don't count against the account-level limit on total Workers (currently 500 by default), and may be automatically deleted after a period of inactivity.
What about staging?
Durable, non-production environments are a distinct problem to solve from previews. Preview is not an environment. Preview is a template. Durable environments map 1:1 with Workers, while preview configuration is used to stamp out many distinct Workers. Previews can also be used in conjunction with durable environments, e.g. creating both staging and production previews for pull requests. Durable environments are for power users with custom needs, and can continue to be served by Wrangler environments. Previews don't require Wrangler environments, since previews are an extension of a single (parent) Worker, but could be used in conjunction with Wrangler environments if desired.

API structure

- https://developers.cloudflare.com/api/resources/workers/subresources/beta/
- https://developers.cloudflare.com/api/resources/workers/subresources/beta/subresources/workers/
- https://developers.cloudflare.com/api/resources/workers/subresources/beta/subresources/workers/subresources/versions/
- https://developers.cloudflare.com/api/resources/workers/subresources/scripts/subresources/deployments/

---

title: Infrastructure as Code (IaC) · Cloudflare Workers docs
description: While Wrangler makes it easy to upload and manage Workers, there
are times when you need a more programmatic approach. This could involve using
Infrastructure as Code (IaC) tools or interacting directly with the Workers
API. Examples include build and deploy scripts, CI/CD pipelines, custom
developer tools, and automated testing.
lastUpdated: 2025-11-11T15:40:52.000Z
chatbotDeprioritize: false
source_url:
html: https://developers.cloudflare.com/workers/platform/infrastructure-as-code/
md: https://developers.cloudflare.com/workers/platform/infrastructure-as-code/index.md

---

While [Wrangler](https://developers.cloudflare.com/workers/wrangler/configuration) makes it easy to upload and manage Workers, there are times when you need a more programmatic approach. This could involve using Infrastructure as Code (IaC) tools or interacting directly with the [Workers API](https://developers.cloudflare.com/api/resources/workers/). Examples include build and deploy scripts, CI/CD pipelines, custom developer tools, and automated testing.

To make this easier, Cloudflare provides SDK libraries for popular languages such as [cloudflare-typescript](https://github.com/cloudflare/cloudflare-typescript) and [cloudflare-python](https://github.com/cloudflare/cloudflare-python). For IaC, you can use tools like HashiCorp's Terraform and the [Cloudflare Terraform Provider](https://developers.cloudflare.com/terraform) to manage Workers resources.

Below are examples of deploying a Worker using different tools and languages, along with important considerations for managing Workers with IaC.

All of these examples need an [account ID](https://developers.cloudflare.com/fundamentals/account/find-account-and-zone-ids) and [API token](https://developers.cloudflare.com/fundamentals/api/get-started/create-token) (not Global API key) to work.

## Workers Bundling

None of the examples below do [Workers Bundling](https://developers.cloudflare.com/workers/wrangler/bundling). This is usually done with Wrangler or a tool like [esbuild](https://esbuild.github.io).

Generally, you'd run this bundling step before applying your Terraform plan or using the API for script upload:

```bash
wrangler deploy --dry-run --outdir build
```

When using Wrangler for building and a different method for uploading, make sure to copy all of your config from `wrangler.json` into your Terraform config or API request. This is especially important with `compatibility_date` or flags your script relies on.

## Terraform

In this example, you need a local file named `my-script.mjs` with script content similar to the below examples. Learn more about the Cloudflare Terraform Provider [here](https://developers.cloudflare.com/terraform), and see an example with all the Workers script resource settings [here](https://github.com/cloudflare/terraform-provider-cloudflare/blob/main/examples/resources/cloudflare_workers_script/resource.tf).

```tf
variable "account_id" {
  default = "replace_me"
}


resource "cloudflare_worker" "my_worker" {
  account_id = var.account_id
  name = "my-worker"
  observability = {
    enabled = true
  }
}


resource "cloudflare_worker_version" "my_worker_version" {
  account_id = var.account_id
  worker_id = cloudflare_worker.my_worker.id
  compatibility_date = "$today"
  main_module = "my-script.mjs"
  modules = [
    {
      name = "my-script.mjs"
      content_type = "application/javascript+module"
      # Replacement (version creation) is triggered whenever this file changes
      content_file = "my-script.mjs"
    }
  ]
}


resource "cloudflare_workers_deployment" "my_worker_deployment" {
  account_id = var.account_id
  script_name = cloudflare_worker.my_worker.name
  strategy = "percentage"
  versions = [{
    percentage = 100
    version_id = cloudflare_worker_version.my_worker_version.id
  }]
}
```

Notice how you don't have to manage all of these resources in Terraform. For example, you could just the `cloudflare_worker` resource and seamlessly use Wrangler or your own deployment tools for Versions or Deployments.

## Cloudflare API Libraries

This example uses the [cloudflare-typescript](https://github.com/cloudflare/cloudflare-typescript) SDK which provides convenient access to the Cloudflare REST API from server-side JavaScript or TypeScript.

- JavaScript

  ```js
  #!/usr/bin/env -S npm run tsn -T

  /**
   * Create and deploy a Worker
   *
   * Docs:
   * - https://developers.cloudflare.com/workers/configuration/versions-and-deployments/
   * - https://developers.cloudflare.com/workers/platform/infrastructure-as-code/
   *
   * Prerequisites:
   * 1. Generate an API token: https://developers.cloudflare.com/fundamentals/api/get-started/create-token/
   * 2. Find your account ID: https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/
   * 3. Find your workers.dev subdomain: https://developers.cloudflare.com/workers/configuration/routing/workers-dev/
   *
   * Environment variables:
   *   - CLOUDFLARE_API_TOKEN (required)
   *   - CLOUDFLARE_ACCOUNT_ID (required)
   *   - CLOUDFLARE_SUBDOMAIN (optional)
   *
   * Usage:
   *   Run this script to deploy a simple "Hello World" Worker.
   *   Access it at: my-hello-world-worker.$subdomain.workers.dev
   */

  import { exit } from "node:process";

  import Cloudflare from "cloudflare";

  const WORKER_NAME = "my-hello-world-worker";
  const SCRIPT_FILENAME = `${WORKER_NAME}.mjs`;

  function loadConfig() {
  	const apiToken = process.env["CLOUDFLARE_API_TOKEN"];
  	if (!apiToken) {
  		throw new Error(
  			"Missing required environment variable: CLOUDFLARE_API_TOKEN",
  		);
  	}

  	const accountId = process.env["CLOUDFLARE_ACCOUNT_ID"];
  	if (!accountId) {
  		throw new Error(
  			"Missing required environment variable: CLOUDFLARE_ACCOUNT_ID",
  		);
  	}

  	const subdomain = process.env["CLOUDFLARE_SUBDOMAIN"];

  	return {
  		apiToken,
  		accountId,
  		subdomain: subdomain || undefined,
  		workerName: WORKER_NAME,
  	};
  }

  const config = loadConfig();
  const client = new Cloudflare({
  	apiToken: config.apiToken,
  });

  async function main() {
  	try {
  		console.log("🚀 Starting Worker creation and deployment...");

  		const scriptContent = `
        export default {
          async fetch(request, env, ctx) {
            return new Response(env.MESSAGE, { status: 200 });
          },
        }`.trim();

  		let worker;
  		try {
  			worker = await client.workers.beta.workers.get(config.workerName, {
  				account_id: config.accountId,
  			});
  			console.log(
  				`♻️  Worker ${config.workerName} already exists. Using it.`,
  			);
  		} catch (error) {
  			if (!(error instanceof Cloudflare.NotFoundError)) {
  				throw error;
  			}
  			console.log(`✏️  Creating Worker ${config.workerName}...`);
  			worker = await client.workers.beta.workers.create({
  				account_id: config.accountId,
  				name: config.workerName,
  				subdomain: {
  					enabled: config.subdomain !== undefined,
  				},
  				observability: {
  					enabled: true,
  				},
  			});
  		}

  		console.log(`⚙️  Worker id: ${worker.id}`);
  		console.log("✏️  Creating Worker version...");

  		// Create the first version of the Worker
  		const version = await client.workers.beta.workers.versions.create(
  			worker.id,
  			{
  				account_id: config.accountId,
  				main_module: SCRIPT_FILENAME,
  				compatibility_date: new Date().toISOString().split("T")[0],
  				bindings: [
  					{
  						type: "plain_text",
  						name: "MESSAGE",
  						text: "Hello World!",
  					},
  				],
  				modules: [
  					{
  						name: SCRIPT_FILENAME,
  						content_type: "application/javascript+module",
  						content_base64: Buffer.from(scriptContent).toString("base64"),
  					},
  				],
  			},
  		);

  		console.log(`⚙️  Version id: ${version.id}`);
  		console.log("🚚 Creating Worker deployment...");

  		// Create a deployment and point all traffic to the version we created
  		await client.workers.scripts.deployments.create(config.workerName, {
  			account_id: config.accountId,
  			strategy: "percentage",
  			versions: [
  				{
  					percentage: 100,
  					version_id: version.id,
  				},
  			],
  		});

  		console.log("✅ Deployment successful!");

  		if (config.subdomain) {
  			console.log(`
  🌍 Your Worker is live!
  📍 URL: https://${config.workerName}.${config.subdomain}.workers.dev/
  `);
  		} else {
  			console.log(`
  ⚠️  Set up a route, custom domain, or workers.dev subdomain to access your Worker.
  Add CLOUDFLARE_SUBDOMAIN to your environment variables to set one up automatically.
  `);
  		}
  	} catch (error) {
  		console.error("❌ Deployment failed:", error);
  		exit(1);
  	}
  }

  main();
  ```

- TypeScript

  ```ts
  #!/usr/bin/env -S npm run tsn -T

  /**
   * Create and deploy a Worker
   *
   * Docs:
   * - https://developers.cloudflare.com/workers/configuration/versions-and-deployments/
   * - https://developers.cloudflare.com/workers/platform/infrastructure-as-code/
   *
   * Prerequisites:
   * 1. Generate an API token: https://developers.cloudflare.com/fundamentals/api/get-started/create-token/
   * 2. Find your account ID: https://developers.cloudflare.com/fundamentals/setup/find-account-and-zone-ids/
   * 3. Find your workers.dev subdomain: https://developers.cloudflare.com/workers/configuration/routing/workers-dev/
   *
   * Environment variables:
   *   - CLOUDFLARE_API_TOKEN (required)
   *   - CLOUDFLARE_ACCOUNT_ID (required)
   *   - CLOUDFLARE_SUBDOMAIN (optional)
   *
   * Usage:
   *   Run this script to deploy a simple "Hello World" Worker.
   *   Access it at: my-hello-world-worker.$subdomain.workers.dev
   */

  import { exit } from "node:process";

  import Cloudflare from "cloudflare";

  interface Config {
  	apiToken: string;
  	accountId: string;
  	subdomain: string | undefined;
  	workerName: string;
  }

  const WORKER_NAME = "my-hello-world-worker";
  const SCRIPT_FILENAME = `${WORKER_NAME}.mjs`;

  function loadConfig(): Config {
  	const apiToken = process.env["CLOUDFLARE_API_TOKEN"];
  	if (!apiToken) {
  		throw new Error(
  			"Missing required environment variable: CLOUDFLARE_API_TOKEN",
  		);
  	}

  	const accountId = process.env["CLOUDFLARE_ACCOUNT_ID"];
  	if (!accountId) {
  		throw new Error(
  			"Missing required environment variable: CLOUDFLARE_ACCOUNT_ID",
  		);
  	}

  	const subdomain = process.env["CLOUDFLARE_SUBDOMAIN"];

  	return {
  		apiToken,
  		accountId,
  		subdomain: subdomain || undefined,
  		workerName: WORKER_NAME,
  	};
  }

  const config = loadConfig();
  const client = new Cloudflare({
  	apiToken: config.apiToken,
  });

  async function main(): Promise<void> {
  	try {
  		console.log("🚀 Starting Worker creation and deployment...");

  		const scriptContent = `
        export default {
          async fetch(request, env, ctx) {
            return new Response(env.MESSAGE, { status: 200 });
          },
        }`.trim();

  		let worker;
  		try {
  			worker = await client.workers.beta.workers.get(config.workerName, {
  				account_id: config.accountId,
  			});
  			console.log(
  				`♻️  Worker ${config.workerName} already exists. Using it.`,
  			);
  		} catch (error) {
  			if (!(error instanceof Cloudflare.NotFoundError)) {
  				throw error;
  			}
  			console.log(`✏️  Creating Worker ${config.workerName}...`);
  			worker = await client.workers.beta.workers.create({
  				account_id: config.accountId,
  				name: config.workerName,
  				subdomain: {
  					enabled: config.subdomain !== undefined,
  				},
  				observability: {
  					enabled: true,
  				},
  			});
  		}

  		console.log(`⚙️  Worker id: ${worker.id}`);
  		console.log("✏️  Creating Worker version...");

  		// Create the first version of the Worker
  		const version = await client.workers.beta.workers.versions.create(
  			worker.id,
  			{
  				account_id: config.accountId,
  				main_module: SCRIPT_FILENAME,
  				compatibility_date: new Date().toISOString().split("T")[0]!,
  				bindings: [
  					{
  						type: "plain_text",
  						name: "MESSAGE",
  						text: "Hello World!",
  					},
  				],
  				modules: [
  					{
  						name: SCRIPT_FILENAME,
  						content_type: "application/javascript+module",
  						content_base64: Buffer.from(scriptContent).toString("base64"),
  					},
  				],
  			},
  		);

  		console.log(`⚙️  Version id: ${version.id}`);
  		console.log("🚚 Creating Worker deployment...");

  		// Create a deployment and point all traffic to the version we created
  		await client.workers.scripts.deployments.create(config.workerName, {
  			account_id: config.accountId,
  			strategy: "percentage",
  			versions: [
  				{
  					percentage: 100,
  					version_id: version.id,
  				},
  			],
  		});

  		console.log("✅ Deployment successful!");

  		if (config.subdomain) {
  			console.log(`
  🌍 Your Worker is live!
  📍 URL: https://${config.workerName}.${config.subdomain}.workers.dev/
  `);
  		} else {
  			console.log(`
  ⚠️  Set up a route, custom domain, or workers.dev subdomain to access your Worker.
  Add CLOUDFLARE_SUBDOMAIN to your environment variables to set one up automatically.
  `);
  		}
  	} catch (error) {
  		console.error("❌ Deployment failed:", error);
  		exit(1);
  	}
  }

  main();
  ```

## Cloudflare REST API

Open a terminal or create a shell script to upload a Worker and manage versions and deployments with curl. Workers scripts are JavaScript [ES Modules](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Modules), but we also support [Python Workers](https://developers.cloudflare.com/workers/languages/python/) (open beta) and [Rust Workers](https://developers.cloudflare.com/workers/languages/rust/).

Warning

This API is in beta. See the multipart/form-data API below for the stable API.

- ES Module

  ```bash
  account_id="replace_me"
  api_token="replace_me"
  worker_name="my-hello-world-worker"


  worker_script_base64=$(echo '
  export default {
    async fetch(request, env, ctx) {
      return new Response(env.MESSAGE, { status: 200 });
    }
  };
  ' | base64)


  # Note the below will fail if the worker already exists!
  # Here's how to delete the Worker
  #
  # worker_id="replace-me"
  # curl "https://api.cloudflare.com/client/v4/accounts/$account_id/workers/workers/$worker_id" \
  #   -X DELETE \
  #   -H "Authorization: Bearer $api_token"


  # Create the Worker
  worker_id=$(curl "https://api.cloudflare.com/client/v4/accounts/$account_id/workers/workers" \
    -X POST \
    -H "Authorization: Bearer $api_token" \
    -H "Content-Type: application/json" \
    -d '{
      "name": "'$worker_name'"
    }' \
    | jq -r '.result.id')


  echo "\nWorker ID: $worker_id\n"


  # Upload the Worker's first version
  version_id=$(curl "https://api.cloudflare.com/client/v4/accounts/$account_id/workers/workers/$worker_id/versions" \
    -X POST \
    -H "Authorization: Bearer $api_token" \
    -H "Content-Type: application/json" \
    -d '{
      "compatibility_date": "2025-08-06",
      "main_module": "'$worker_name'.mjs",
      "modules": [
        {
          "name": "'$worker_name'.mjs",
          "content_type": "application/javascript+module",
          "content_base64": "'$worker_script_base64'"
        }
      ],
      "bindings": [
        {
          "type": "plain_text",
          "name": "MESSAGE",
          "text": "Hello World!"
        }
      ]
    }' \
    | jq -r '.result.id')


  echo "\nVersion ID: $version_id\n"


  # Create a deployment for the Worker
  deployment_id=$(curl "https://api.cloudflare.com/client/v4/accounts/$account_id/workers/scripts/$worker_name/deployments" \
    -X POST \
    -H "Authorization: Bearer $api_token" \
    -H "Content-Type: application/json" \
    -d '{
      "strategy": "percentage",
      "versions": [
        {
          "percentage": 100,
          "version_id": "'$version_id'"
        }
      ]
    }' \
    | jq -r '.result.id')


  echo "\nDeployment ID: $deployment_id\n"
  ```

- Python

  [Python Workers](https://developers.cloudflare.com/workers/languages/python/) have their own special `text/x-python` content type and `python_workers` compatibility flag.

  ```bash
  account_id="replace_me"
  api_token="replace_me"
  worker_name="my-hello-world-worker"


  worker_script_base64=$(echo '
  from workers import WorkerEntrypoint, Response


  class Default(WorkerEntrypoint):
      async def fetch(self, request):
          return Response(self.env.MESSAGE)
  ' | base64)


  # Note the below will fail if the worker already exists!
  # Here's how to delete the Worker
  #
  # worker_id="replace-me"
  # curl "https://api.cloudflare.com/client/v4/accounts/$account_id/workers/workers/$worker_id" \
  #   -X DELETE \
  #   -H "Authorization: Bearer $api_token"


  # Create the Worker
  worker_id=$(curl "https://api.cloudflare.com/client/v4/accounts/$account_id/workers/workers" \
    -X POST \
    -H "Authorization: Bearer $api_token" \
    -H "Content-Type: application/json" \
    -d '{
      "name": "'$worker_name'"
    }' \
    | jq -r '.result.id')


  echo "\nWorker ID: $worker_id\n"


  # Upload the Worker's first version
  version_id=$(curl "https://api.cloudflare.com/client/v4/accounts/$account_id/workers/workers/$worker_id/versions" \
    -X POST \
    -H "Authorization: Bearer $api_token" \
    -H "Content-Type: application/json" \
    -d '{
      "compatibility_date": "2025-08-06",
      "compatibility_flags": [
        "python_workers"
      ],
      "main_module": "'$worker_name'.py",
      "modules": [
        {
          "name": "'$worker_name'.py",
          "content_type": "text/x-python",
          "content_base64": "'$worker_script_base64'"
        }
      ],
      "bindings": [
        {
          "type": "plain_text",
          "name": "MESSAGE",
          "text": "Hello World!"
        }
      ]
    }' \
    | jq -r '.result.id')


  echo "\nVersion ID: $version_id\n"


  # Create a deployment for the Worker
  deployment_id=$(curl "https://api.cloudflare.com/client/v4/accounts/$account_id/workers/scripts/$worker_name/deployments" \
    -X POST \
    -H "Authorization: Bearer $api_token" \
    -H "Content-Type: application/json" \
    -d '{
      "strategy": "percentage",
      "versions": [
        {
          "percentage": 100,
          "version_id": "'$version_id'"
        }
      ]
    }' \
    | jq -r '.result.id')


  echo "\nDeployment ID: $deployment_id\n"
  ```

### multipart/form-data upload API

This API uses [multipart/form-data](https://developer.mozilla.org/en-US/docs/Web/HTTP/Reference/Methods/POST) to upload a Worker and will implicitly create a version and deployment. The above API is recommended for direct management of versions and deployments.

- Workers

  ```bash
  account_id="replace_me"
  api_token="replace_me"
  worker_name="my-hello-world-script"


  script_content='export default {
    async fetch(request, env, ctx) {
      return new Response(env.MESSAGE, { status: 200 });
    }
  };'


  # Upload the Worker
  curl "https://api.cloudflare.com/client/v4/accounts/$account_id/workers/scripts/$worker_name" \
    -X PUT \
    -H "Authorization: Bearer $api_token" \
    -F "metadata={
      'main_module': '"$worker_name".mjs',
      'bindings': [
        {
          'type': 'plain_text',
          'name': 'MESSAGE',
          'text': 'Hello World!'
        }
      ],
      'compatibility_date': '$today'
    };type=application/json" \
    -F "$worker_name.mjs=@-;filename=$worker_name.mjs;type=application/javascript+module" <<EOF
  $script_content
  EOF
  ```

- Workers for Platforms

  For [Workers for Platforms](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms), you can upload a [User Worker](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/get-started/user-workers) to a [dispatch namespace](https://developers.cloudflare.com/cloudflare-for-platforms/workers-for-platforms/reference/how-workers-for-platforms-works/#dispatch-namespace). Note the [API endpoint](https://developers.cloudflare.com/api/resources/workers_for_platforms/subresources/dispatch/subresources/namespaces/subresources/scripts/methods/update/) is on `/workers/dispatch/namespaces/$DISPATCH_NAMESPACE/scripts/$SCRIPT_NAME`.

  ```bash
  account_id="replace_me"
  api_token="replace_me"
  dispatch_namespace="replace_me"
  worker_name="my-hello-world-script"


  script_content='export default {
    async fetch(request, env, ctx) {
      return new Response(env.MESSAGE, { status: 200 });
    }
  };'


  # Create a dispatch namespace
  curl https://api.cloudflare.com/client/v4/accounts/$account_id/workers/dispatch/namespaces \
    -X POST \
    -H 'Content-Type: application/json' \
    -H "Authorization: Bearer $api_token" \
    -d '{
      "name": "'$dispatch_namespace'"
    }'


  # Upload the Worker
  curl "https://api.cloudflare.com/client/v4/accounts/$account_id/workers/dispatch/namespaces/$dispatch_namespace/scripts/$worker_name" \
    -X PUT \
    -H "Authorization: Bearer $api_token" \
    -F "metadata={
      'main_module': '"$worker_name".mjs',
      'bindings': [
        {
          'type': 'plain_text',
          'name': 'MESSAGE',
          'text': 'Hello World!'
        }
      ],
      'compatibility_date': '$today'
    };type=application/json" \
    -F "$worker_name.mjs=@-;filename=$worker_name.mjs;type=application/javascript+module" <<EOF
  $script_content
  EOF
  ```

### Python Workers

[Python Workers](https://developers.cloudflare.com/workers/languages/python/) (open beta) have their own special `text/x-python` content type and `python_workers` compatibility flag for uploading using the multipart/form-data API.

```bash
curl https://api.cloudflare.com/client/v4/accounts/<account_id>/workers/scripts/my-hello-world-script \
  -X PUT \
  -H 'Authorization: Bearer <api_token>' \
  -F 'metadata={
        "main_module": "my-hello-world-script.py",
        "bindings": [
          {
            "type": "plain_text",
            "name": "MESSAGE",
            "text": "Hello World!"
          }
        ],
        "compatibility_date": "$today",
        "compatibility_flags": [
          "python_workers"
        ]
      };type=application/json' \
  -F 'my-hello-world-script.py=@-;filename=my-hello-world-script.py;type=text/x-python' <<EOF
from workers import WorkerEntrypoint, Response


class Default(WorkerEntrypoint):
    async def fetch(self, request):
        return Response(self.env.MESSAGE)
EOF
```

## Considerations with Durable Objects

[Durable Object](https://developers.cloudflare.com/durable-objects/) migrations are applied with deployments. This means you can't bind to a Durable Object in a Version if a deployment doesn't exist i.e. migrations haven't been applied. For example, running this in Terraform will fail the first time the plan is applied:

```tf
resource "cloudflare_worker" "my_worker" {
  account_id = var.account_id
  name = "my-worker"
}


resource "cloudflare_worker_version" "my_worker_version" {
  account_id = var.account_id
  worker_id = cloudflare_worker.my_worker.id
  bindings = [
    {
      type = "durable_object"
      name = "my_durable_object"
      class_name = "MyDurableObjectClass"
    }
  ]
  migrations = {
    new_sqlite_classes = [
      "MyDurableObjectClass"
    ]
  }
  # ...version props ommitted for brevity
}


resource "cloudflare_workers_deployment" "my_worker_deployment" {
  # ...deployment props ommitted for brevity
}
```

To make this succeed, you first have to comment out the `durable_object` binding block, apply the plan, uncomment it, comment out the `migrations` block, then apply again. This time the plan will succeed. This also applies to the API or SDKs. This is an example where it makes sense to just manage the `cloudflare_worker` and/or `cloudflare_workers_deployment` resources while using Wrangler for build and Version management.
