---
pcx_content_type: configuration
title: Secrets
meta:
  description: Store sensitive information, like API keys and auth tokens, in your Worker.
---

# Secrets

## Background

Secrets are a type of binding that allow you to attach encrypted text values to your Worker. You cannot see secrets after you set them and can only access secrets via [Wrangler](/workers/wrangler/commands/#secret) or programmatically via the [`env` parameter](/workers/runtime-apis/handlers/fetch/#parameters). Secrets are used for storing sensitive information like API keys and auth tokens. Secrets are available on the [`env` parameter](/workers/runtime-apis/handlers/fetch/#parameters) passed to your Worker's [`fetch` event handler](/workers/runtime-apis/handlers/fetch/).

## Local Development with Secrets

{{<render file="_secrets-in-dev.md">}}

## Secrets on deployed Workers

### Adding secrets to your project

#### Via Wrangler

Secrets can be added through [`wrangler secret put`](/workers/wrangler/commands/#secret) or [`wrangler versions secret put`](/workers/wrangler/commands/#secret-put) commands.

`wrangler secret put` creates a new version of the Worker and deploys it immediately.

```sh
---
filename: wrangler secret put
---
$ npx wrangler secret put <KEY>
```


If using [gradual deployments](/workers/configuration/versions-and-deployments/gradual-deployments/), instead use the `wrangler versions secret put` command. This will only create a new version of the Worker, that can then be deploying using [`wrangler versions deploy`](/workers/wrangler/commands/#deploy-2). 

```sh
$ npx wrangler versions secret put <KEY> --x-versions
```

#### Via the dashboard

To add a secret via the dashboard:

1. Log in to [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Select **Workers & Pages**.
3. In **Overview**, select your Worker > **Settings**.
4. Under **Environment Variables**, select **Add variable**.
5. Input a **Variable name** and its **value**, which will be made available to your Worker.
6. Select **Encrypt** to protect the secret's value. This will prevent the value from being visible via Wrangler and the dashboard.
7. (Optional) To add multiple secrets, select **Add variable**.
8. **Save** or **Save and Deploy** your changes.


### Delete secrets from your project

#### Via Wrangler

Secrets can be deleted through [`wrangler secret delete`](/workers/wrangler/commands/#delete-7) or [`wrangler versions secret delete`](/workers/wrangler/commands/#secret-delete) commands.

`wrangler secret delete` creates a new version of the Worker and deploys it immediately.

```sh
---
filename: wrangler secret delete
---
$ npx wrangler secret delete <KEY>
```

If using [gradual deployments](/workers/configuration/versions-and-deployments/gradual-deployments/), instead use the `wrangler versions secret delete` command. This will only create a new version of the Worker, that can then be deploying using [`wrangler versions deploy`](/workers/wrangler/commands/#deploy-2). 

```sh
$ npx wrangler versions secret delete <KEY> --x-versions
```

#### Via the dashboard

To delete a secret from your Worker project via the dashboard:

1. Log in to [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Select **Workers & Pages**.
3. In **Overview**, select your Worker > **Settings**.
4. Under **Environment Variables**, select **Edit variables**.
5. Select **X** next to the secret you want to delete.
6. **Save** or **Save and Deploy** your changes.

{{<render file="_env_and_secrets.md">}}

## Related resources

* [Wrangler secret commands](/workers/wrangler/commands/#secret) - Review the Wrangler commands to create, delete and list secrets.