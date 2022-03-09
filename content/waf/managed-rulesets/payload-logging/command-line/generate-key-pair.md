---
title: Generate a key pair
pcx-content-type: how-to
type: overview
weight: 2
layout: list
meta:
  title: Generate a key pair in the command line
---

# Generate a key pair in the command line

Generate a public/private key pair using the Cloudflare [`matched-data-cli`](https://github.com/cloudflare/matched-data-cli) command-line tool. After generating a key pair, enter the generated public key in the payload logging configuration.

Do the following:

1.  [Download](https://github.com/cloudflare/matched-data-cli/releases) the `matched-data-cli` tool for your platform from the **Releases** page on GitHub, under **Assets**.

2.  Extract the content of the downloaded `.tar.gz` file to a local folder.

3.  Open a terminal and navigate to the local folder containing the `matched-data-cli` tool.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-directory CodeBlock--token-unselectable">~ </span><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">cd matched-data-cli</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

4.  Run the following command:
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-directory CodeBlock--token-unselectable">~/matched-data-cli </span><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">./matched-data-cli generate-key-pair</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">{</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;private_key&quot;: &quot;uBS5eBttHrqkdY41kbZPdvYnNz8Vj0TvKIUpjB1y/GA=&quot;,</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">  &quot;public_key&quot;: &quot;Ycig/Zr/pZmklmFUN99nr+taURlYItL91g+NcHGYpB8=&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">}</span></div></span></span></span></code></pre>{{</raw>}}

After generating the key pair, copy the public key value and enter it in the [payload logging configuration](/waf/managed-rulesets/payload-logging/configure/).
