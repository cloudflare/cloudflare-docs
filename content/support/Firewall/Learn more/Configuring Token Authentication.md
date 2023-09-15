---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115001376488-Configuring-Token-Authentication
title: Configuring Token Authentication
---

# Configuring Token Authentication

Cloudflare Token Authentication allows you to restrict access to documents, files, and media to selected users without requiring them to register. This helps protect paid/restricted content from leeching and unauthorized sharing. 

There are two options to configure Token Authentication, via Cloudflare Workers or WAF custom rules.

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

## Option 2: Configure using WAF custom rules

To configure Token Authentication:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** > **WAF** > **Custom rules**.
5. Select **Create rule**.
6. Select **Edit expression** above **Expression Preview** to switch to the Expression Preview editor.

The following example illustrates a rule that blocks any visitor that does not pass your HMAC key validation on a specific hostname and URL path. Details required for Token Authentication include:

- The path you wish to authenticate (for example, `test.domain.com/download/cat.jpg`)
- The parameter name you wish the token to have (for example, `verify`)
- The desired token expiration times, if any (for example, five and 20 minutes)

For the following example URL:

```txt
test.domain.com/download/cat.jpg?verify=1484063787-9JQB8vP1z0yc5DEBnH6JGWM3mBmvIeMrnnxFi3WtJLE%3D
```

The expression for the custom rule would be similar to the following:

```txt
(http.host eq "test.domain.com" and not is_timed_hmac_valid_v0("mysecrettoken", http.request.uri, 10800, http.request.timestamp.sec, 8))
```

The components of this example custom rule (using the previous example URL) include:

- Token key = `mysecrettoken`
- Token expiration time = `10800` seconds
- Http.request.uri = `/download/cat.jpg`
- Http.request.timestamp.sec = `1484063787`
- Separator: len(?verify=) = `8`

To generate tokens for the paths using this custom rule:

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

```txt
verify=1484063137-IaLGSmELTvlhfd0ItdN6PhhHTFhzx73EX8uy%2FcSDiIU%3D
```

Which you will then need to append to any URL under the domain.com/download/\* path. For example:

```txt
/download/cat.jpg?verify=1484063787-9JQB8vP1z0yc5DEBnH6JGWM3mBmvIeMrnnxFi3WtJLE%3D
```

The token parameter must be the last parameter in the query string.

If you are on an Enterprise plan, you can test if URLs are being generated correctly on the server by:
1. Setting the WAF custom rule action to _Log_.
2. Monitoring the activity log in **Security** > **Events**.
