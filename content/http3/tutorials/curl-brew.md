---
pcx-content-type: how-to
title: Curl + Quiche
---

# Curl + Quiche

Follow the guidelines below to build and test HTTP/3 on MacOS.

## Requirements

Install homebrew from [brew.sh](https://brew.sh).

## Build

This process replaces your current curl installation. Run the following commands to install required dependencies and build curl with quiche support.

### Uninstall curl
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">brew remove -f curl</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### Build curl with quiche
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">curl -O https://raw.githubusercontent.com/cloudflare/homebrew-cloudflare/master/curl.rb</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">brew install --HEAD -s curl.rb</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

When the build is finished, curl binary will be installed on `/usr/local/opt/curl/bin`. You will need to add to your `$PATH`.

### Verify curl with H3 support built properly
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">curl --help all | egrep 'alt-svc|http3'</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    --alt-svc &ltfile name&gt Enable alt-svc with this cache file</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">    --http3         Use HTTP v3</span></div></span></span></span></code></pre>{{</raw>}}

Try curl on any HTTP/3 enabled sites using the commands below.
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">curl --http3 https://cloudflare-quic.com</span><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">curl --http3 https://blog.cloudflare.com</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}
