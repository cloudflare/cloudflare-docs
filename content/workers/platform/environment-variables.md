---
pcx-content-type: concept
title: Environment variables
---

# Environment variables

In the Workers platform, environment variables, secrets, and KV namespaces are known as bindings. Regardless of type, bindings are always available as global variables within your Worker script.

## Environmental variables with module workers

When deploying a Module Worker, any [bindings](/workers/platform/environment-variables/) will not be available as global runtime variables. Instead, they are passed to the handler as a [parameter](#parameters) – refer to the `FetchEvent` [documentation for further comparisons and examples](/workers/runtime-apis/fetch-event/#bindings-1).

## Environment variables via wrangler

### Adding environment variables via wrangler

Environment variables are defined via the `[vars]` configuration in your `wrangler.toml` file and are always plaintext values.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><span class="CodeBlock--filename">wrangler.toml</span><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">name</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;my-worker-dev&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">type</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;javascript&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">account_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;&ltYOUR ACCOUNTID&gt&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">workers_dev</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">true</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># Define top-level environment variables</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># under the `[vars]` block using</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># the `key = &quot;value&quot;` format</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">vars</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">API_TOKEN</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;example_dev_token&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">STRIPE_TOKEN</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;pk_xyz1234_test&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># Override values for `--env production` usage</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">env.production</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">name</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;my-worker-production&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">env.production.vars</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">API_TOKEN</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;example_production_token&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">STRIPE_TOKEN</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;pk_xyz1234&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

These environment variables can then be accessed within your Worker script as global variables. They will be plaintext strings.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment">// Worker code:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">console</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">log</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-constant">API_TOKEN</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment">//=&gt (default) &quot;example_dev_token&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment">//=&gt (env.production) &quot;example_production_token&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">console</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">log</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-constant">STRIPE_TOKEN</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment">//=&gt (default) &quot;pk_xyz1234_test&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment">//=&gt (env.production) &quot;pk_xyz1234&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### Adding secrets via wrangler

Secrets are defined by running [`wrangler secret put <NAME>`](/workers/cli-wrangler/commands/#secret) in your terminal, where `<NAME>` is the name of your binding. You may assign environment-specific secrets by re-running the command `wrangler secret put <NAME> -e` or `wrangler secret put <NAME> --env`. Keep a list of the secrets used in your code in your `wrangler.toml` file, like the example under `[secrets]`:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><span class="CodeBlock--filename">wrangler.toml</span><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">name</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;my-worker-dev&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">type</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;javascript&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">account_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;&ltYOUR ACCOUNTID&gt&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">workers_dev</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">true</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># [secrets]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># SPARKPOST_KEY</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># GTOKEN_PRIVKEY</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># GTOKEN_KID</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="warning">}}

\* **Warning:** Do not use plaintext environment variables to store sensitive information. Use [`wrangler secret put`](/workers/cli-wrangler/commands/#secret) instead.

{{</Aside>}}

### Adding KV namespaces via wrangler

KV namespaces are defined via the [`kv_namespaces`](/workers/cli-wrangler/configuration/#kv_namespaces) configuration in your `wrangler.toml` and are always provided as [KV runtime instances](/workers/runtime-apis/kv/).
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><span class="CodeBlock--filename">wrangler.toml</span><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">name</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;my-worker-dev&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">type</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;javascript&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">account_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;&ltYOUR ACCOUNTID&gt&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">workers_dev</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">true</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">kv_namespaces</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">binding</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;Customers&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">preview_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;&ltPREVIEW KV NAMESPACEID&gt&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;&ltDEV KV NAMESPACEID&gt&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">env.production</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">name</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;my-worker-production&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">kv_namespaces</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">binding</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;Customers&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;&ltPRODUCTION KV NAMESPACEID&gt&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

## Environment variables via the dashboard

### Adding environment variables via the dashboard

Add environment variables by logging into [Cloudflare dashboard](https://dash.cloudflare.com/) > **Account Home** > **Workers** and select your **Workers script**.

To add environment variables, such as `vars` and `secret`:

1.  Go to your **Workers script** > **Settings** > **Add variable** under **Environment Variables**.
2.  Input a **Variable name** and its **value**, which will be made available to your Worker.
3.  If your variable is a secret, select **Encrypt** to protect its value. This will prevent the value from being visible via `wrangler` and the dashboard.
4.  (Optional) To add multiple environment variables, select **Add variable**.
5.  Select **Save** to implement your changes.

![env variables dash](../media/env_variables_dash.png)

{{<Aside type="warning" header="Plaintext strings and secrets">}}

Do not select **Encrypt** when adding environment variables if your variable is not a secret. Skip step 3 if your variable's value is a plaintext string and does not need to be encrypted.

{{</Aside>}}

### Adding KV namespace bindings via the dashboard

To add KV namespace bindings:

1.  Go to your **Workers script** > **Settings** > **Add binding** under **KV Namespace Bindings**.
2.  Choose a **Variable name**. This will be the way the variable name will be referenced in your Worker script.
3.  Next, select a **KV namespace** from the dropdown.
4.  Select **Add binding** to add multiple bindings.
5.  When you are finished, select **Save** to implement your changes.

![kv namespace bindings](../media/kv_namespace_bindings.png)

Your completed Workers dashboard, with environment variables and KV namespace bindings added, will look like the following example reference.

![env vars secret](../media/envvarssecret-detail-page.jpeg)

## Comparing secrets and environment variables

Secrets are environment variables. The difference is secret values are not visible within `wrangler` or dashboard interfaces after you define them. This means that sensitive data, including passwords or API tokens, should always be encrypted to prevent data leaks. To your Worker, there is no difference between an environment variable and a secret. The secret's value is passed through as defined.
