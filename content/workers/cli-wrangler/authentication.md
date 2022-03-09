---
pcx-content-type: how-to
title: Authentication
weight: 2
---

# Authentication

## Background

In Cloudflare’s system, you have a User that can have multiple Accounts and Zones. As a result, your User is configured globally on your machine via a single Cloudflare Token. Your Account(s) and Zone(s) will be configured per project, but will use your Cloudflare Token to authenticate all API calls. A configuration file is created in a `.wrangler` directory in your computer’s home directory.

---

### Using commands

To set up `wrangler` to work with your Cloudflare user, use the following commands:

- `login`: a command that opens a Cloudflare account login page to authorize Wrangler.
- `config`: an alternative to `login` that prompts you to enter your `email` and `api` key.
- `whoami`: run this command to confirm that your configuration is appropriately set up. When successful, this command will print out your account email and your `account_id` needed for your project's `wrangler.toml` file.

### Using environment variables

You can also configure your global user with environment variables. This is the preferred method for using Wrangler in CI (continuous integration) environments.

To customize the authentication tokens that Wrangler uses, you may provide the `CF_ACCOUNT_ID` and `CF_API_TOKEN` environment variables when running any `wrangler` command. The account ID may be obtained from the Cloudflare dashboard in **Overview** and you may [create or reuse an existing API token](#generate-tokens).
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">CF_ACCOUNT_ID=accountID CF_API_TOKEN=veryLongAPIToken wrangler publish</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Alternatively, you may use the `CF_EMAIL` and `CF_API_KEY` environment variable combination instead:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">CF_EMAIL=cloudflareEmail CF_API_KEY=veryLongAPI wrangler publish</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

You can also specify or override the target Zone ID by defining the `CF_ZONE_ID` environment variable.

Defining environment variables inline will override the default credentials stored in `wrangler config` or in your `wrangler.toml` file.

---

## Generate Tokens

### API token

1.  In **Overview**, select [**Get your API token**](/api/tokens/create).
2.  After being taken to the **Profile** page, select **Create token**.
3.  Under the **API token templates** section, find the **Edit Cloudflare Workers** template and select **Use template**.
4.  Fill out the rest of the fields and then select **Continue to summary**, where you can select **Create Token** and issue your token for use.

### Global API Key

1.  In **Overview**, select **Get your API token**.
2.  After being taken to the **Profile** page, scroll to **API Keys**.
3.  Select **View** to copy your **Global API Key**.\*

{{<Aside type="warning" header="Warning">}}

\* Treat your Global API Key like a password. It should not be stored in version control or in your code – use environment variables if possible.

{{</Aside>}}

---

## Use Tokens

After getting your token or key, you can set up your default credentials on your local machine by running `wrangler config`:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ wrangler config</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Enter API token:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">superlongapitoken</span></div></span></span></span></code></pre>{{</raw>}}

Use the `--api-key` flag to instead configure with email and global API key:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ wrangler config --api-key</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Enter email:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">testuser@example.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Enter global API key:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">superlongapikey</span></div></span></span></span></code></pre>{{</raw>}}
