---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/115001376488-Configuring-Token-Authentication
title: Configure token authentication
---

# Configure token authentication

Token authentication allows you to restrict access to documents, files, and media to select users without requiring them to register. This helps protect paid/restricted content from leeching and unauthorized sharing. 

There are two options to configure token authentication: via Cloudflare Workers or via WAF custom rules.

## Option 1: Configure using Cloudflare Workers

Refer to the following Cloudflare Workers resources for two different implementations of token authentication:

- The [Sign requests](/workers/examples/signing-requests/) example.
- The [Auth with headers](/workers/examples/auth-with-headers/) template.

To get started with Workers, refer to [Configure a Worker](/workers/get-started/quickstarts/).

## Option 2: Configure using WAF custom rules

Use the Rules language [`is_timed_hmac_valid_v0()`](/ruleset-engine/rules-language/functions/#hmac-validation) HMAC validation function to validate hash-based message authentication code (HMAC) tokens in a custom rule expression.

{{<Aside type="note">}}
Access to the `is_timed_hmac_valid_v0()` HMAC validation function requires a Cloudflare Pro, Business, or Enterprise plan.
{{</Aside>}}

To validate token authentication:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com), and select your account and domain.
2. Go to **Security** > **WAF** > **Custom rules**.
3. Select **Create rule**.
4. Select **Edit expression** to switch to the [Expression Editor](/ruleset-engine/rules-language/expressions/edit-expressions/#expression-editor).
5. Enter the rule expression, making sure you include a call to the `is_timed_hmac_valid_v0()` function.
6. Under **Then take action**, select an action such as _Block_.
7. To save and deploy your rule, select **Deploy**.

### Example rule

This example illustrates a rule that blocks any visitor that does not pass HMAC key validation on a specific hostname and URL path. Details required for token authentication include:

- The secret key for generating and validating the HMAC (for example, `mysecrettoken`)
- The path you wish to authenticate (for example, `downloads.example.com/images/cat.jpg`)
- The name of the query string parameter containing the token (for example, `verify`)
- The token lifetime in seconds (for example, 3 hours = 10,800 seconds)

Consider the following example URL:

```txt
downloads.example.com/images/cat.jpg?verify=1484063787-9JQB8vP1z0yc5DEBnH6JGWM3mBmvIeMrnnxFi3WtJLE%3D
```

Where:

- `/images/cat.jpg` represents the path to the asset — the HMAC message to authenticate.
- `?verify=` is the separator between the path to the asset and the timestamp when the HMAC token was issued.
- `1484063787` represents the timestamp when the token was issued, expressed as Unix time in seconds.
- `9JQB8vP1z0yc5DEBnH6JGWM3mBmvIeMrnnxFi3WtJLE%3D` is a Base64-encoded MAC.

{{<Aside type="warning">}}
When you do not use the optional `flags` argument for `is_timed_hmac_valid_v0()`, you must URL encode the Base64-encoded MAC value. For more information, refer to [HMAC Validation](/ruleset-engine/rules-language/functions/#hmac-validation).
{{</Aside>}}

The expression for the custom rule would be similar to the following:

```txt
(http.host eq "downloads.example.com" and not is_timed_hmac_valid_v0("mysecrettoken", http.request.uri, 10800, http.request.timestamp.sec, 8))
```

The components of this example custom rule (using the previous example URL) include:

- Token secret key = `mysecrettoken`
- Token lifetime = `10800` (10,800 seconds = 3 hours)
- `http.request.uri` = `/images/cat.jpg?verify=1484063787-9JQB8vP1z0yc5DEBnH6JGWM3mBmvIeMrnnxFi3WtJLE%3D`
- `http.request.timestamp.sec` = `1484071925` (for example)
- Separator length: `len("?verify=")` = `8`

The [`is_timed_hmac_valid_v0()`](/ruleset-engine/rules-language/functions/#hmac-validation) function compares the value of a MAC generated using the `mysecrettoken` secret key to the value encoded in `http.request.uri`.

If the MAC values match and if the token has not expired yet, according to the following formula:

```txt
http.request.timestamp.sec < (<TIMESTAMP_ISSUED> + 10800)
```

Then the token is valid and the `is_timed_hmac_valid_v0()` function returns `true`.

---

## HMAC token generation

The following examples show how you could generate tokens at your origin server for the path validated using the WAF custom rule described in the previous section:

{{<tabs labels="Python 3.8 | Python 2.7 | PHP | Workers">}}
{{<tab label="python 3.8">}}

```python
import hmac
import base64
import time
import urllib.parse
from hashlib import sha256

message = "/images/cat.jpg"
secret = "mysecrettoken"
separator = "verify"
timestamp = str(int(time.time()))
digest = hmac.new((secret).encode('utf8'), "{}{}".format(message, timestamp).encode('utf8'), sha256)
token = urllib.parse.quote_plus(base64.b64encode(digest.digest()))
print("{}={}-{}".format(separator, timestamp, token))
```

{{</tab>}}
{{<tab label="python 2.7">}}

```python
import hmac
import base64
import time
import urllib
from hashlib import sha256

message = "/images/cat.jpg"
secret = "mysecrettoken"
separator = "verify"
timestamp = str(int(time.time()))
digest = hmac.new(secret, message + timestamp, sha256)
param = urllib.urlencode({separator: '%s-%s' % (timestamp, base64.b64encode(digest.digest()))})
print(param)
```

{{</tab>}}
{{<tab label="php">}}

```php
<?php
$message = "/images/cat.jpg";
$secret = "mysecrettoken";
$separator = "verify";
$timestamp = time();
$token = urlencode(base64_encode(hash_hmac("sha256", $message . $timestamp, $secret, true)));
echo("{$separator}={$timestamp}-{$token}");
```

{{</tab>}}
{{<tab label="workers" no-code="true">}}

For a full example in JavaScript (JS) or TypeScript (TS), refer to the [Sign requests](/workers/examples/signing-requests/) example in the Workers documentation.

Since the example JS/TS implementation is compatible with `is_timed_hmac_valid_v0()` function, requests authenticated using the provided source code can be verified with a WAF custom rule and the `is_timed_hmac_valid_v0()` function.

{{</tab>}}
{{</tabs>}}

This will generate a URL parameter such as the following:

```txt
verify=1484063787-9JQB8vP1z0yc5DEBnH6JGWM3mBmvIeMrnnxFi3WtJLE%3D
```

You will need to append this parameter to the URL you are protecting:

```txt
/images/cat.jpg?verify=1484063787-9JQB8vP1z0yc5DEBnH6JGWM3mBmvIeMrnnxFi3WtJLE%3D
```

{{<Aside type="warning">}}
The authentication token parameter (`verify=<VALUE>` in the example) must be the last parameter in the query string.
{{</Aside>}}

### Testing the generated token parameter

If you are on an Enterprise plan, you can test if URLs are being generated correctly on the origin server by doing the following:

1. Set the WAF custom rule action to _Log_.
2. Check the activity log in **Security** > **Events**.

---

## Protecting several paths using the same secret

You can use the same secret key to protect several URI paths.

This is illustrated in the previous example, where `http.request.uri` is passed as the [`MessageMAC`](/ruleset-engine/rules-language/functions/#messagemac) argument to the validation function.

Since `http.request.uri` includes the path to the asset and that value is extracted for each request, the validation function evaluates all request URIs to `downloads.example.com` using the same secret key.

Note that while you can use the same secret key to authenticate several paths, you must generate an HMAC token for each unique message you want to authenticate.
