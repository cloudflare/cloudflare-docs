---
pcx-content-type: configuration
title: Configuration
weight: 4
---

# Configuration

## Background

Your project will need some configuration before you can publish your Worker. Configuration is done through changes to keys and values stored in a `wrangler.toml` file located in the root of your project directory. You must manually edit this file to edit your keys and values before you can publish.

---

## Environments

The top-level configuration is the collection of values you specify at the top of your `wrangler.toml` file. These values will be inherited by all environments, unless otherwise defined in the environment.

The layout of a top-level configuration in a `wrangler.toml` file is displayed below:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">name</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;your-worker&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">type</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;javascript&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">account_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;your-account-id&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># This field specifies that the Worker</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># will be deployed to a *.workers.dev domain</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">workers_dev</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">true</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># -- OR --</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># These fields specify that the Worker</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># will deploy to a custom domain</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">zone_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;your-zone-id&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">routes</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-string">&quot;example.com/*&quot;</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Environment configuration {{<prop-meta>}}(optional){{</prop-meta>}}: the configuration values you specify under an `[env.name]` in your `wrangler.toml` file.

Environments allow you to deploy the same project to multiple places under multiple names. These environments are utilized with the `--env` or `-e` flag on the [commands](/workers/cli-wrangler/commands/) that are deploying live Worker scripts:

- `build`
- `dev`
- `preview`
- `publish`
- `secret`

Some environment properties can be [_inherited_](#keys) from the top-level configuration, but if new values are configured in an environment, they will always override those at the top level.

An example of an `[env.name]` configuration looks like this:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">name</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;your-worker&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">type</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;javascript&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">account_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;your-account-id&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">env.helloworld</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># These new values will override the top level configuration.</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">name</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;your-worker-helloworld&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">account_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;your-other-account-id&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># Any additional keys, like environment variables, will be placed here.</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">vars</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">FOO</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;some value&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">BAR</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;some other string&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">kv_namespaces</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">binding</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;FOO&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;1a2b3c4d5e&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">preview_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;6e7f8g9h10i&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

To deploy this example Worker to the `helloworld` environment, you would run `wrangler publish --env helloworld`.

---

## Keys

There are three types of keys in a `wrangler.toml` file:

- Top level only keys are required to be configured at the top level of your `wrangler.toml` file only; multiple environments on the same project must share this key's value.

- Inherited keys can be configured at the top level and/or environment. If the key is defined only at the top level, the environment will use the key's value from the top level. If the key is defined in the environment, the environment value will override the top-level value.

- Non-inherited keys must be defined for every environment individually.

{{<definitions>}}

- `name` {{<type>}}inherited{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - The name of your Worker script. If inherited, your environment name will be appended to the top level.

- `type` {{<type>}}top level{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - Specifies how `wrangler build` will build your project. There are three options: `javascript`, `webpack`, and `rust`. `javascript` checks for a build command specified in the `[build]` section, `webpack` builds your project using webpack v4, and `rust` compiles the Rust in your project to WebAssembly.

{{<Aside type="note">}}

Cloudflare will continue to support `rust` and `webpack` project types, but recommends using the `javascript` project type and specifying a custom [`build`](#build) section.

{{</Aside>}}

- `account_id` {{<type>}}inherited{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - This is the ID of the account associated with your zone. You might have more than one account, so make sure to use the ID of the account associated with the `zone_id` you provide, if you provide one. It can also be specified through the `CF_ACCOUNT_ID` environment variable.

- `zone_id` {{<type>}}inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - This is the ID of the zone or domain you want to run your script on. It can also be specified through the `CF_ZONE_ID` environment variable. This key is optional if you are using only a `*.workers.dev` subdomain.

- `workers_dev` {{<type>}}inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - This is a boolean flag that specifies if your Worker will be deployed to your [`*.workers.dev`](https://workers.dev) subdomain. If omitted, it defaults to false.

- `route` {{<type>}}not inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A route, specified by URL pattern, on your zone that you would like to run your Worker on. <br />`route = "http://example.com/*"`. A `route` OR `routes` key is only required if you are not using a [`*.workers.dev`](https://workers.dev) subdomain.

- `routes` {{<type>}}not inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of routes you would like to use your Worker on. These follow exactly the same rules a `route`, but you can specify a list of them.<br />`routes = ["http://example.com/hello", "http://example.com/goodbye"]`. A `route` OR `routes` key is only required if you are not using a `*.workers.dev` subdomain.

- `webpack_config` {{<type>}}inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - This is the path to a custom webpack configuration file for your Worker. You must specify this field to use a custom webpack configuration, otherwise Wrangler will use a default configuration for you. Refer to the [Wrangler webpack page](/workers/cli-wrangler/webpack/) for more information.

- `vars` {{<type>}}not inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - An object containing text variables that can be directly accessed in a Worker script.

- `kv_namespaces` {{<type>}}not inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - These specify any [Workers KV](#kv_namespaces) Namespaces you want to access from inside your Worker.

- `site` {{<type>}}inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Determines the local folder to upload and serve from a Worker.

- `dev` {{<type>}}not inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Arguments for `wrangler dev` that configure local server.

- `triggers` {{<type>}}inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Configures cron triggers for running a Worker on a schedule.

- `usage_model` {{<type>}}inherited{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Specifies the [Usage Model](/workers/platform/pricing/#usage-models) for your Worker. There are two options - [`bundled`](/workers/platform/limits/#bundled-usage-model) and [`unbound`](/workers/platform/limits/#unbound-usage-model). For newly created Workers, if the Usage Model is omitted it will be set to the [default Usage Model set on the account](https://dash.cloudflare.com/?account=workers/default-usage-model). For existing Workers, if the Usage Model is omitted, it will be set to the Usage Model configured in the dashboard for that Worker.

- `build` {{<type>}}top level{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

  - Configures a custom build step to be run by Wrangler when building your Worker. Refer to the [custom builds documentation](#build) for more details.

{{</definitions>}}

### vars

The `vars` key defines a table of [environment variables](/workers/platform/environment-variables/) provided to your Worker script. All values are plaintext values.

Usage:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">vars</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">FOO</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;some value&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">BAR</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;some other string&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

The table keys are available to your script as global variables, which will contain their associated values.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment">// Worker code:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">console</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">log</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-constant">FOO</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment">//=&gt &quot;some value&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">console</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">log</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-constant">BAR</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment">//=&gt &quot;some other string&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Alternatively, you can define `vars` using an inline table format. This style should not include any new lines to be considered a valid TOML configuration:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">vars</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">FOO</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;some value&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">BAR</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;some other string&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

{{<Aside type="note">}}

Secrets should be handled using the [`wrangler secret`](/workers/cli-wrangler/commands/#secret) command.

{{</Aside>}}

### kv_namespaces

`kv_namespaces` defines a list of KV namespace bindings for your Worker.

Usage:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">kv_namespaces</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">binding</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;FOO&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;0f2ac74b498b48028cb68387c421e279&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">preview_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;6a1ddb03f3ec250963f0a1e46820076f&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">binding</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;BAR&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;068c101e168d03c65bddf4ba75150fb0&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">preview_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;fb69528dbc7336525313f2e8c3b17db0&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Alternatively, you can define `kv namespaces` like so:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">kv_namespaces</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">binding</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;FOO&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">preview_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;abc456&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;abc123&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">kv_namespaces</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">binding</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;BAR&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">preview_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;xyz456&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;xyz123&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Much like environment variables and secrets, the `binding` names are available to your Worker as global variables.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment">// Worker script:</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">let</span><span class="CodeBlock--token-plain"> value </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">await</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-constant">FOO</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">get</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'keyname'</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment">//=&gt gets the value for &quot;keyname&quot; from</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment">//=&gt the FOO variable, which points to</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment">//=&gt the &quot;0f2ac...e279&quot; KV namespace</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

{{<definitions>}}

- `binding` {{<prop-meta>}}required{{</prop-meta>}}

  - The name of the global variable your code will reference. It will be provided as a [KV runtime instance](/workers/runtime-apis/kv/).

- `id` {{<prop-meta>}}required{{</prop-meta>}}

  - The ID of the KV namespace that your `binding` should represent. Required for `wrangler publish`.

- `preview_id` {{<prop-meta>}}required{{</prop-meta>}}

  - The ID of the KV namespace that your `binding` should represent during `wrangler dev` or `wrangler preview`. Required for `wrangler dev` and `wrangler preview`.

{{</definitions>}}

{{<Aside type="note">}}

Creating your KV namespaces can be handled using Wrangler’s [KV Commands](/workers/cli-wrangler/commands/#kv).

You can also define your `kv_namespaces` using an [alternative TOML syntax](https://github.com/toml-lang/toml/blob/master/toml.md#user-content-table).

{{</Aside>}}

### site

A [Workers Site](/workers/platform/sites/) generated with [`wrangler generate --site`](/workers/cli-wrangler/commands/#generate) or [`wrangler init --site`](/workers/cli-wrangler/commands/#init).

Usage:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">site</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">bucket</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;./public&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">entry-point</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;workers-site&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

{{<definitions>}}

- `bucket` {{<prop-meta>}}required{{</prop-meta>}}

  - The directory containing your static assets. It must be a path relative to your `wrangler.toml` file. Example: `bucket = "./public"`

- `entry-point` {{<prop-meta>}}optional{{</prop-meta>}}

  - The location of your Worker script. The default location is `workers-site`. Example: `entry-point = "./workers-site"`

- `include` {{<prop-meta>}}optional{{</prop-meta>}}

  - An exclusive list of `.gitignore`-style patterns that match file or directory names from your `bucket` location. Only matched items will be uploaded. Example: `include = ["upload_dir"]`

- `exclude` {{<prop-meta>}}optional{{</prop-meta>}}

  - A list of `.gitignore`-style patterns that match files or directories in your `bucket` that should be excluded from uploads. Example: `exclude = ["ignore_dir"]`

{{</definitions>}}

You can also define your `site` using an [alternative TOML syntax](https://github.com/toml-lang/toml/blob/master/toml.md#user-content-inline-table).

#### Storage Limits

For exceptionally large pages, Workers Sites may not be ideal. There is a 25 MiB limit per page or file. Additionally, Wrangler will create an asset manifest for your files that will count towards your script’s size limit. If you have too many files, you may not be able to use Workers Sites.

#### Exclusively including files/directories

If you want to include only a certain set of files or directories in your `bucket`, add an `include` field to your
`[site]` section of your `wrangler.toml` file:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">site</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">bucket</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;./public&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">entry-point</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;workers-site&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">include</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-string">&quot;included_dir&quot;</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-comment"># must be an array.</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Wrangler will only upload files or directories matching the patterns in the `include` array.

#### Excluding files/directories

If you want to exclude files or directories in your `bucket`, add an `exclude` field to your `[site]` section of your `wrangler.toml` file:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">site</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">bucket</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;./public&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">entry-point</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;workers-site&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">exclude</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-string">&quot;excluded_dir&quot;</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-comment"># must be an array.</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Wrangler will ignore files or directories matching the patterns in the `exclude` array when uploading assets to Workers KV.

#### Include > Exclude

If you provide both `include` and `exclude` fields, the `include` field will be used and the `exclude` field will be ignored.

#### Default ignored entries

Wrangler will always ignore:

- `node_modules`
- Hidden files and directories
- Symlinks

#### More about include/exclude patterns

Refer to the [gitignore documentation](https://git-scm.com/docs/gitignore) to learn more about the standard matching patterns.

#### Customizing your Sites Build

Workers Sites projects use webpack by default. Though you can [bring your own webpack configuration](/workers/cli-wrangler/webpack/#using-with-workers-sites), be aware of your `entry` and `context` settings.

You can also use the `[build]` section with Workers Sites, as long as your build step will resolve dependencies in `node_modules`. Refer to the [custom builds](#build) section for more information.

### triggers

A set of cron triggers used to call a Worker on a schedule.

Usage:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">triggers</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">crons</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-string">&quot;0 0 * JAN-JUN FRI&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;0 0 LW JUL-DEC *&quot;</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

{{<definitions>}}

- `crons` {{<prop-meta>}}optional{{</prop-meta>}}
  - A set of [cron expressions](https://crontab.guru/), where each expression is a separate schedule to run the Worker on.

{{</definitions>}}

### dev

Arguments for `wrangler dev` can be configured here so you do not have to repeatedly pass them.

Usage:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">dev</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">port</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-number">9000</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">local_protocol</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;https&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

{{<definitions>}}

- `ip` {{<prop-meta>}}optional{{</prop-meta>}}

  - IP address for the local `wrangler dev` server to listen on, defaults to `127.0.0.1`.

- `port` {{<prop-meta>}}optional{{</prop-meta>}}

  - Port for local `wrangler dev` server to listen on, defaults to `8787`.

- `local_protocol` {{<prop-meta>}}optional{{</prop-meta>}}

  - Protocol that local `wrangler dev` server listen to requests on, defaults to `http`.

- `upstream_protocol` {{<prop-meta>}}optional{{</prop-meta>}}

  - Protocol that `wrangler dev` forwards requests on, defaults to `https`.

{{</definitions>}}

### build

A custom build command for your project. There are two configurations based on the format of your Worker: `service-worker` and `modules` (beta).

#### Service Workers

This section is for customizing Workers with the `service-worker` format. These Workers use `addEventListener` and look like the following:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-function">addEventListener</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">'fetch'</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-parameter">event</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-operator">=&gt</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  event</span><span class="CodeBlock--token-punctuation">.</span><span class="CodeBlock--token-function">respondWith</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-keyword">new</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-class-name">Response</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-string">&quot;I'm a service Worker!&quot;</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Usage:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">build</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">command</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;npm install &amp;&amp; npm run build&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">build.upload</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">format</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;service-worker&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

##### `[build]`

{{<definitions>}}

- `command` {{<prop-meta>}}optional{{</prop-meta>}}

  - The command used to build your Worker. On Linux and macOS, the command is executed in the `sh` shell and the `cmd` shell for Windows. The `&&` and `||` shell operators may be used.

- `cwd` {{<prop-meta>}}optional{{</prop-meta>}}

  - The working directory for commands, defaults to the project root directory.

- `watch_dir` {{<prop-meta>}}optional{{</prop-meta>}}

  - The directory to watch for changes while using `wrangler dev`, defaults to the `src` relative to the project root directory.

{{</definitions>}}

##### `[build.upload]`

{{<definitions>}}

- `format` {{<prop-meta>}}required{{</prop-meta>}}

  - The format of the Worker script, must be `"service-worker"`.

{{</definitions>}}

{{<Aside type="note">}}

Ensure the `main` field in your `package.json` references the Worker script you want to publish.

{{</Aside>}}

#### Modules

Workers now supports the ES Modules syntax. Modules support in Cloudflare Workers is currently in beta. This format allows you to export a collection of files and/or modules, unlike the Service Worker format which requires a single file to be uploaded.

Module Workers `export` their event handlers instead of using `addEventListener` calls.

Modules receive all bindings (KV Namespaces, Environment Variables, and Secrets) as arguments to the exported handlers. With the Service Worker format, these bindings are available as global variables.

{{<Aside type="note">}}

Refer to the [`FetchEvent` documentation](/workers/runtime-apis/fetch-event) to learn more about the differences between the Service Worker and Module worker formats.

{{</Aside>}}

An uploaded module may `import` other uploaded ES Modules. If using the CommonJS format, you may `require` other uploaded CommonJS modules.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-js" language="js"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">import</span><span class="CodeBlock--token-plain"> html </span><span class="CodeBlock--token-keyword">from</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">'./index.html'</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">export</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">default</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment">// * request is the same as `event.request` from the service worker format</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment">// * waitUntil() and passThroughOnException() are accessible from `ctx` instead of `event` from the service worker format</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment">// * env is where bindings like KV namespaces, Durable Object namespaces, Config variables, and Secrets</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-comment">// are exposed, instead of them being placed in global scope.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-keyword">async</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function">fetch</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-parameter">request</span><span class="CodeBlock--token-parameter CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-parameter"> env</span><span class="CodeBlock--token-parameter CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-parameter"> ctx</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-keyword">const</span><span class="CodeBlock--token-plain"> headers </span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string-property">'Content-Type'</span><span class="CodeBlock--token-operator">:</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">'text/html;charset=UTF-8'</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    </span><span class="CodeBlock--token-keyword">return</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-keyword">new</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-class-name">Response</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-plain">html</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> headers </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-punctuation">;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

To create a Workers project using Wrangler and Modules, add a `[build]` section:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">build</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">command</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;npm install &amp;&amp; npm run build&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">build.upload</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">format</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;modules&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">main</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;./worker.mjs&quot;</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

##### `[build]`

{{<definitions>}}

- `command` {{<prop-meta>}}optional{{</prop-meta>}}

  - The command used to build your Worker. On Linux and macOS system, the command is executed in the `sh` shell and the `cmd` shell for Windows. The `&&` and `||` shell operators may be used.

- `cwd` {{<prop-meta>}}optional{{</prop-meta>}}

  - The working directory for commands, defaults to the project root directory.

- `watch_dir` {{<prop-meta>}}optional{{</prop-meta>}}

  - The directory to watch for changes while using `wrangler dev`, defaults to the `src` relative to the project root directory.

{{</definitions>}}

##### `[build.upload]`

{{<definitions>}}

- `format` {{<prop-meta>}}required{{</prop-meta>}}

  - The format of the Workers script, must be `"modules"`.

- `dir` {{<prop-meta>}}optional{{</prop-meta>}}

  - The directory you wish to upload your modules from, defaults to the `dist` relative to the project root directory.

- `main` {{<prop-meta>}}required{{</prop-meta>}}

  - The relative path of the main module from `dir`, including the `./` prefix. The main module must be an ES module. For projects with a build script, this usually refers to the output of your JavaScript bundler.

{{<Aside type="note">}}

If your project is written using CommonJS modules, you will need to re-export your handlers and Durable Object classes using an ES module shim. Refer to the [modules-webpack-commonjs](https://github.com/cloudflare/modules-webpack-commonjs) template as an example.

{{</Aside>}}

- `rules` {{<prop-meta>}}optional{{</prop-meta>}}

  - An ordered list of rules that define which modules to import, and what type to import them as.
    You will need to specify rules to use Text, Data, and CompiledWasm modules, or when you wish to
    have a `.js` file be treated as an `ESModule` instead of `CommonJS`.

  - Defaults:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">build.upload</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">format</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;modules&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">main</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;./worker.mjs&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># You do not need to include these default rules in your `wrangler.toml`, they are implicit.</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># The default rules are treated as the last two rules in the list.</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">build.upload.rules</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">type</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;ESModule&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">globs</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-string">&quot;**/*.mjs&quot;</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">build.upload.rules</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">type</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;CommonJS&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">globs</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-string">&quot;**/*.js&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;**/*.cjs&quot;</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

  - `type` {{<prop-meta>}}required{{</prop-meta>}}

    - The module type, see the table below for acceptable options:
      <div class="DocsMarkdown--table-wrap">
        <div class="DocsMarkdown--table-wrap-inner">
          <table>
            <thead>
              <tr>
                <th>
                  <code>type</code>
                </th>
                <th>JavaScript type</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>ESModule</td>
                <td>-</td>
              </tr>
              <tr>
                <td>CommonJS</td>
                <td>-</td>
              </tr>
              <tr>
                <td>Text</td>
                <td>
                  <code>String</code>
                </td>
              </tr>
              <tr>
                <td>Data</td>
                <td>
                  <code>ArrayBuffer</code>
                </td>
              </tr>
              <tr>
                <td>CompiledWasm</td>
                <td>
                  <code>WebAssembly.Module</code>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

  - `globs` {{<prop-meta>}}required{{</prop-meta>}}

    - Unix-style [glob rules](https://docs.rs/globset/0.4.6/globset/#syntax) that are used to determine the module type to use for a given file in `dir`. Globs are matched against the module's relative path from `build.upload.dir` without the `./` prefix. Rules are evaluated in order, starting at the top.

  - `fallthrough` {{<prop-meta>}}optional{{</prop-meta>}}

    - This option allows further rules for this module type to be considered if set to true. If not specified or set to false, further rules for this module type will be ignored.

{{</definitions>}}

---

## Example

To illustrate how these levels are applied, here is a `wrangler.toml` file using multiple environments:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-toml" language="toml"><span class="CodeBlock--filename">wrangler.toml</span><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># top level configuration</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">type</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;javascript&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">name</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;my-worker-dev&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">account_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;12345678901234567890&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">zone_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;09876543210987654321&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">route</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;dev.example.com/*&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">usage_model</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;unbound&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">kv_namespaces</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">binding</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;FOO&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;b941aabb520e61dcaaeaa64b4d8f8358&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">preview_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;03c8c8dd3b032b0528f6547d0e1a83f3&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">binding</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;BAR&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;90e6f6abd5b4f981c748c532844461ae&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">preview_id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;e5011a026c5032c09af62c55ecc3f438&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">build</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">command</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;webpack&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">build.upload</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">format</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;service-worker&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">site</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">bucket</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;./public&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">entry-point</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;workers-site&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">dev</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">ip</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;0.0.0.0&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">port</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-number">9000</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">local_protocol</span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-string">&quot;http&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">upstream_protocol</span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-string">&quot;https&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># environment configuration</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">env.staging</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">name</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;my-worker-staging&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">route</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;staging.example.com/*&quot;</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">kv_namespaces</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">binding</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;FOO&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;0f2ac74b498b48028cb68387c421e279&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">binding</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;BAR&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;068c101e168d03c65bddf4ba75150fb0&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-comment"># environment configuration</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">[</span><span class="CodeBlock--token-table CodeBlock--token-class-name">env.production</span><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">workers_dev</span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-boolean">true</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-key CodeBlock--token-property">kv_namespaces</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">[</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">binding</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;FOO&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;0d2ac74b498b48028cb68387c421e233&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-punctuation">,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-punctuation">{</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">binding</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;BAR&quot;</span><span class="CodeBlock--token-punctuation">,</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-key CodeBlock--token-property">id</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">=</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-string">&quot;0d8c101e168d03c65bddf4ba75150f33&quot;</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">]</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
