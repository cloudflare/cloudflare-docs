---
pcx_content_type: troubleshooting
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

-   [Configure a Worker](/workers/get-started/quickstarts/)
-   Use the [Auth with Headers](/workers/examples/auth-with-headers/) template

{{<Aside type="warning">}}
The Auth with Headers template code contains a generic header key and
value of \'X-Custom-PS and \'mypresharedkey\'. To best protect your
resources, change the header key and value in the Workers editor prior
to saving your code.
{{</Aside>}}
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

```
test.domain.com/download/cat.jpg?verify=1484063787-9JQB8vP1z0yc5DEBnH6JGWM3mBmvIeMrnnxFi3WtJLE%3D
```

The example firewall rule looks like:

```
(http.host eq "test.domain.com" and not is\_timed\_hmac\_valid\_v0("mysecrettoken", http.request.uri,10800, http.request.timestamp.sec,8))
```

The components of this example firewall rule (using the example URL above) include:

-   Token key = _mysecrettoken_
-   Token expiration time = _10800_ seconds
-   Http.request.uri = _/download/cat.jpg_
-   Http.request.timestamp.sec = _1484063787_
-   Separator: len(?verify=) = _8_

To generate tokens for the paths using this Firewall Rule:

### Python 3.8


```python
import hmac
import base64
import urllib.parse
import time
from hashlib import sha256
message = "/download/cat.jpg"
secret = "mysecrettoken"
separator = "?verify="
timestamp = str(int(time.time()))
digest = hmac.new((secret).encode('utf8'), "{}{}".format(message,timestamp).encode('utf8'), sha256)
token = urllib.parse.quote_plus(base64.b64encode(digest.digest()))
print("{}{}{}-{}".format(message, separator, timestamp, token))
```

### Python 2.7


```python
import hmac
import base64
import time
import urllib
from hashlib import sha256
message = "/download/cat.jpg"
secret = "mysecrettoken"
separator = "verify"
timestamp = str(int(time.time()))
digest = hmac.new(secret, message + timestamp, sha256)
param  = urllib.urlencode({separator: '%s-%s' % (timestamp, base64.b64encode(digest.digest()))})
print("{}{}".format(message, param))
```

### PHP


```php
$message = "/download/cat.jpg";
$secret = "mysecrettoken";
$separator = "?verify=";
$time   = time();
$token  = $time . "-" . urlencode(base64_encode(hash_hmac("sha256", $message . $time, $secret, true)));
echo($message . $separator . $token);
```
___

## Implement token creation

Implementing the token creation requires the following code entered at your origin server:

### PHP Version


```php
<?php
// Generate valid URL token$secret = "thisisasharedsecret";
$time   = time();
$token  = $time . "-" . urlencode(base64_encode(hash_hmac("sha256", "/download/private.jpg$time", $secret, true)));param   = "verify=" . $token;
?>
```

### Python Version


```python
import hmac
import base64
import time
import urllib
from hashlib import sha256

secret = "thisisasharedsecret"
time   = str(int(time.time()))
digest = hmac.new(secret, "/download/cat.jpg" + time, sha256)
param  = urllib.urlencode({'verify': '%s-%s' % (time, base64.b64encode(digest.digest()))})
```

This will generate a URL parameter such as:


```
verify=1484063137-IaLGSmELTvlhfd0ItdN6PhhHTFhzx73EX8uy%2FcSDiIU%3D
```

Which you will then need to append to any URL under the domain.com/download/\* path. For example:


```
/download/cat.jpg?verify=1484063787-9JQB8vP1z0yc5DEBnH6JGWM3mBmvIeMrnnxFi3WtJLE%3D
```

Please note that the token parameter needs to be the last parameter in the query string. You can test if URLs are being generated correctly on the server by enabling WAF managed rules on _Simulate_ and monitoring the activity log in **Security** > **Events**.
