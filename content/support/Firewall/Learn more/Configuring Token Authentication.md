---
source: https://support.cloudflare.com/hc/en-us/articles/115001376488-Configuring-Token-Authentication
title: Configuring Token Authentication
---

# Configuring Token Authentication



## Overview

Cloudflare Token Authentication allows you to restrict access to documents, files, and media to selected users without requiring them to register. This helps protect paid/restricted content from leeching and unauthorized sharing. 

There are two options to configure Token Authentication, via Cloudflare Workers or Cloudflare Firewall Rules.

___

## Option 1: Configure using Cloudflare Workers

Review the following Cloudflare Workers documentation to configure Token Authentication:

-   [Configure a Worker](https://developers.cloudflare.com/workers/quickstart/#configure)
-   Use the [Auth with Headers](https://developers.cloudflare.com/workers/templates/snippets/auth_with_headers/#body-inner) template

___

## Option 2: Configure using firewall rules

A Pro, Business or Enterprise account is required to configure Token Authentication via firewall rules. To configure Token Authentication using firewall rules:

1.  Log in to the Cloudflare dashboard.
2.  Click the appropriate Cloudflare account for the domain where you want to enable Token Authentication.
3.  Navigate to **Security** > **WAF**.
4.  Click the **Firewall rules** tab.
5.  Click **Create a firewall rule**.
6.  Click the **Edit expression** link above the **Expression Preview** to switch to the Expression Preview editor.

The following example illustrates a rule that blocks any visitor that does not pass your HMAC key validation on a specific hostname and URL path. Details required for Token Authentication include:

-   the path you wish to authenticate (e.g. test.domain.com/download/cat.jpg),
-   the parameter name you wish the token to have (e.g. verify), and
-   the desired token expiration times if any (e.g. 5 and 20 minutes).

For the following example URL,

_test.domain.com/download/cat.jpg?verify=1484063787-9JQB8vP1z0yc5DEBnH6JGWM3mBmvIeMrnnxFi3WtJLE%3D_

The example firewall rule looks like:

_(http.host eq "test.domain.com" and not is\_timed\_hmac\_valid\_v0("mysecrettoken", http.request.uri,10800, http.request.timestamp.sec,8))_

The components of this example firewall rule (using the example URL above) include:

-   Token key = _mysecrettoken_
-   Token expiration time = _10800_ seconds
-   Http.request.uri = _/download/cat.jpg_
-   Http.request.timestamp.sec = _1484063787_
-   Separator: len(?verify=) = _8_

To generate tokens for the paths using this Firewall Rule:

### Python 3.8


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">import hmac</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">import base64</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">import urllib.parse</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">import time</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">from hashlib import sha256</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">message = &quot;/download/cat.jpg&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">secret = &quot;mysecrettoken&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">separator = &quot;?verify=&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">timestamp = str(int(time.time()))</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">digest = hmac.new((secret).encode('utf8'), &quot;{}{}&quot;.format(message,timestamp).encode('utf8'), sha256)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">token = urllib.parse.quote_plus(base64.b64encode(digest.digest()))</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">print(&quot;{}{}{}-{}&quot;.format(message, separator, timestamp, token))</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### Python 2.7


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">import hmac</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">import base64</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">import time</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">import urllib</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">from hashlib import sha256</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">message = &quot;/download/cat.jpg&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">secret = &quot;mysecrettoken&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">separator = &quot;verify&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">timestamp = str(int(time.time()))</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">digest = hmac.new(secret, message + timestamp, sha256)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">param  = urllib.urlencode({separator: '%s-%s' % (timestamp, base64.b64encode(digest.digest()))})</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">print(&quot;{}{}&quot;.format(message, param))</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

### PHP


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$message = &quot;/download/cat.jpg&quot;;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$secret = &quot;mysecrettoken&quot;;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$separator = &quot;?verify=&quot;;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$time   = time();</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$token  = $time . &quot;-&quot; . urlencode(base64_encode(hash_hmac(&quot;sha256&quot;, $message . $time, $secret, true)));</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">echo($message . $separator . $token);</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

___

## Implement token creation

Implementing the token creation requires the following code entered at your origin server:

### PHP Version


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">&lt;?php</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">// Generate valid URL token$secret = &quot;thisisasharedsecret&quot;;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$time   = time();</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$token  = $time . &quot;-&quot; . urlencode(base64_encode(hash_hmac(&quot;sha256&quot;, &quot;/download/private.jpg$time&quot;, $secret, true)));param   = &quot;verify=&quot; . $token;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">?&gt;</span></div></span></span></span></code></pre>{{</raw>}}

### Python Version


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">import hmac</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">import base64</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">import time</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">import urllib</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">from hashlib import sha256</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">secret = &quot;thisisasharedsecret&quot;</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">time   = str(int(time.time()))</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">digest = hmac.new(secret, &quot;/download/cat.jpg&quot; + time, sha256)</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">param  = urllib.urlencode({'verify': '%s-%s' % (time, base64.b64encode(digest.digest()))})</span></div></span></span></span></code></pre>{{</raw>}}

This will generate a URL parameter such as:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">verify=1484063137-IaLGSmELTvlhfd0ItdN6PhhHTFhzx73EX8uy%2FcSDiIU%3D</span></div></span></span></span></code></pre>{{</raw>}}

Which you will then need to append to any URL under the domain.com/download/\* path. For example:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">/download/cat.jpg?verify=1484063787-9JQB8vP1z0yc5DEBnH6JGWM3mBmvIeMrnnxFi3WtJLE%3D</span></div></span></span></span></code></pre>{{</raw>}}

Please note that the token parameter needs to be the last parameter in the query string. You can test if URLs are being generated correctly on the server by enabling WAF managed rules on _Simulate_ and monitoring the activity log in **Security** > **Events**.
