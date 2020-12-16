---
order: 1
---

# Authentication

## Background

In Cloudflare’s system, you have a User that can have multiple Accounts and Zones. As a result, your User is configured globally on your machine via a single Cloudflare Token. Your Account(s) and Zone(s) will be configured per project, but will use your Cloudflare Token to authenticate all API calls. A config file is created in a `.wrangler`
directory in your computer’s home directory.

--------------------------------

### Using commands

To set up `wrangler` to work with your Cloudflare user, use the following commands:

- 🔓`login`: a command that opens a Cloudflare account login page to authenticate Wrangler.
- 🔧 `config`: an alternative to `login` that prompts you to enter your `email` and `api` key.
- 🕵️‍♀️ `whoami`: run this command to confirm that your configuration is appropriately set up. When successful, this command will print out your account email and your `account_id` needed for your project's `wrangler.toml`.

### Using environment variables

You can also configure your global user with environment variables. This is the preferred method for using Wrangler in CI.

You can deploy with authentication tokens (recommended). Obtain `CF_ACCOUNT_ID` and `CF_API_TOKEN` from the Cloudflare dashboard and run:

```sh
$ CF_ACCOUNT_ID=accountID CF_API_TOKEN=veryLongAPIToken wrangler publish
```

Or you can deploy with your email and your global API key. Obtain `CF_EMAIL` and `CF_API_KEY` from the Cloudflare dashboard and run:

```sh
$ CF_EMAIL=cloudflareEmail CF_API_KEY=veryLongAPI wrangler publish
```

Note environment variables will override whatever credentials you configured in `wrangler config` or in your `wrangler.toml`.

You can also specify or override the Zone ID used by `wrangler publish` with the `CF_ZONE_ID` environment variable.

--------------------------------

## Generate Tokens

### API token

1. Continuing, also on the right side, click **Get your API token**.
2. You’ll be taken to your **Profile** page.
3. Click **Create token**.
4. Under the **API token templates** section, find the **Edit Cloudflare Workers** template and click **Use template**.
5. Fill out the rest of the fields and then click **Continue to summary**, where you can click **Create Token** and issue your token for use.

### Global API Key

1. Continuing, also on the right side, click **Get your API token**.
2. You’ll be taken to your **Profile** page.
3. Scroll to **API Keys**, and click **View** to copy your **Global API Key**.\*

<Aside type="warning">

\* __Warning:__ Treat your Global API Key like a password. It should not be stored in version control or in your code, use environment variables if possible.

</Aside>

--------------------------------

## Use Tokens

After getting your token or key, you can set up your default credentials on your local machine by running `wrangler config`

```bash
$ wrangler config
Enter API token:
superlongapitoken
```

Use the `--api-key` flag to instead configure with email and global API key:

```bash
$ wrangler config --api-key
Enter email:
testuser@example.com
Enter global API key:
superlongapikey
```
