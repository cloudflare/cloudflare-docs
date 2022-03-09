---
pcx-content-type: tutorial
title: Installation Overview
weight: 6
---

# Installation Overview

## Package Repository

Railgun is available only for 64-bit systems. The best way of installing Railgun is via the [Package Repository](https://pkg.cloudflare.com/). Run the commands mentioned on the Package Repository page in order to set this up. Debian, CentOS, Red Hat Enterprise Linux, and Amazon Linux users may utilize the Railgun binary package repository. Ubuntu and Debian users will be automatically subscribed to the APT repo after installing one of the packages linked below. Other users will need to install the `cloudflare-release` RPM as described on the repository home page. Installation of that RPM will install the repository and GPG key.

Once this has been set up, run the following command as root:

### RPM-based
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">yum install railgun-stable</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### DEB-based
{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-sh" language="sh"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-command CodeBlock--token-prompt CodeBlock--token-unselectable">$ </span><span class="CodeBlock--token-command">apt-get install railgun-stable</span><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

## System Startup

Installing the package will automatically add `/etc/init.d/railgun` to be started on boot on GNU/Linux.
