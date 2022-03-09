---
updated: 2021-03-16
category: 🔐 Zero Trust
difficulty: Advanced
pcx-content-type: tutorial
title: Output an app's token to a variable with one command
---

# Output an app's token to a variable with one command

You can use [Cloudflare Tunnel](/cloudflare-one/connections/connect-apps/) to connect applications and servers to Cloudflare's network. Cloudflare Tunnel relies on a piece of software, `cloudflared`, to create those connections.

You can also secure those applications with [Cloudflare Access](/cloudflare-one/applications/configure-apps/self-hosted-apps/). With Cloudflare Access, you can build Zero Trust rules which restrict who can reach your application based on signals like identity, multifactor method, device posture, and geography.

When users authenticate to the applications secured by Cloudflare Access, Cloudflare generates a JSON Web Token (JWT) that contains the user's information and permits the user to reach the application. In web-based use cases, the browser stores the JWT as a cookie.

You can also use `cloudflared` to quickly gather the JWT from an application and use it from the command line or for programmatic use cases like scripts.

**🗺️ This tutorial covers how to:**

- Login to an application secured by Cloudflare Access from the command line using `cloudflared`
- Use Z Shell or Bash to create a time-saving command to store the JWT as an environment variable

**⏲️Time to complete:**

5 minutes

---

## Install `cloudflared`

Start by [downloading and installing](/cloudflare-one/connections/connect-apps/install-and-setup/installation/) the Cloudflare Tunnel daemon, `cloudflared`. On Mac, you can do so by running the following `brew` command. If you do not have Homebrew, follow the [documentation](https://docs.brew.sh/Installation) to install it.

`$ brew install cloudflare/cloudflare/cloudflared`

## Login to an app from the command line

Once installed, you can use the `access login` command in `cloudflared` to generate the JWT for a given application.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">cloudflared access login https://jira.company.com</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

`cloudflared` will print a URL that you can visit in a browser to authenticate to Cloudflare Access. If you are using a headless system, you can visit the URL in a different machine with a browser and the login will still return the JWT to `cloudflared`.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Please open the following URL and log in with your Cloudflare account:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&ltURL&gt</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">Leave cloudflared running to download the token automatically.</span></div></span></span></span></code></pre>{{</raw>}}

`cloudflared` will print the token and you can begin using it.

## Set as environment variable

If you have an application where you frequently need to request a token, you can save time and reduce steps by adding a command to your shell.

### Z shell

If you are using the Z shell, edit your existing `~/.zshrc` file or create one for the first time.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">vim ~/.zshrc</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

You can add the following function to your file, replacing `https://jira.company.com` with the application you need. You can also rename the function to something shorter or more applicable to your application.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">function</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function-name">login-jira</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">export</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-assign-left CodeBlock--token-variable">JIRA_TOKEN</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-variable CodeBlock--token-variable">$(</span><span class="CodeBlock--token-variable">cloudflared access login https://jira.cfops.it/ </span><span class="CodeBlock--token-variable CodeBlock--token-operator">|</span><span class="CodeBlock--token-variable"> </span><span class="CodeBlock--token-variable CodeBlock--token-function">sed</span><span class="CodeBlock--token-variable"> </span><span class="CodeBlock--token-variable CodeBlock--token-string">'/^[[:space:]]*$/d'</span><span class="CodeBlock--token-variable"> </span><span class="CodeBlock--token-variable CodeBlock--token-operator">|</span><span class="CodeBlock--token-variable"> </span><span class="CodeBlock--token-variable CodeBlock--token-function">tail</span><span class="CodeBlock--token-variable"> -n </span><span class="CodeBlock--token-variable CodeBlock--token-number">1</span><span class="CodeBlock--token-variable CodeBlock--token-variable">)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">echo</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-variable">$JIRA_TOKEN</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Next, run the following command in your shell to update your profile.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">source ~/.zshrc</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### Bash

If you are using Bash, edit your existing `~/.bashrc` file or create one for the first time.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">vim ~/.bashrc</span></div></span></span></span></code></pre>{{</raw>}}

You can add the following function to your file, replacing `https://jira.company.com` with the application you need. You can also rename the function to something shorter or more applicable to your application.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-bash" language="bash"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-keyword">function</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-function-name">login-jira</span><span class="CodeBlock--token-punctuation">(</span><span class="CodeBlock--token-punctuation">)</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-punctuation">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">export</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-assign-left CodeBlock--token-variable">JIRA_TOKEN</span><span class="CodeBlock--token-operator">=</span><span class="CodeBlock--token-variable CodeBlock--token-variable">$(</span><span class="CodeBlock--token-variable">cloudflared access login https://jira.cfops.it/ </span><span class="CodeBlock--token-variable CodeBlock--token-operator">|</span><span class="CodeBlock--token-variable"> </span><span class="CodeBlock--token-variable CodeBlock--token-function">sed</span><span class="CodeBlock--token-variable"> </span><span class="CodeBlock--token-variable CodeBlock--token-string">'/^[[:space:]]*$/d'</span><span class="CodeBlock--token-variable"> </span><span class="CodeBlock--token-variable CodeBlock--token-operator">|</span><span class="CodeBlock--token-variable"> </span><span class="CodeBlock--token-variable CodeBlock--token-function">tail</span><span class="CodeBlock--token-variable"> -n </span><span class="CodeBlock--token-variable CodeBlock--token-number">1</span><span class="CodeBlock--token-variable CodeBlock--token-variable">)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  </span><span class="CodeBlock--token-builtin CodeBlock--token-class-name">echo</span><span class="CodeBlock--token-plain"> </span><span class="CodeBlock--token-variable">$JIRA_TOKEN</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-punctuation">}</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

Next, run the following command in your shell to update your profile.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">source ~/.bashrc</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### Run command

Now, you can run the following command to login to Cloudflare Access. Instead of printing the token, the shell will store it as an environment variable that you can use.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">login-jira</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
