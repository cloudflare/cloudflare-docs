---
_build:
  publishResources: false
  render: never
  list: never
---

```sh
$ cat app_example_com.pem
-----BEGIN CERTIFICATE-----
MIIFJDCCBAygAwIBAgIQD0ifmj/Yi5NP/2gdUySbfzANBgkqhkiG9w0BAQsFADBN
MQswCQYDVQQGEwJVUzEVMBMGA1UEChMMRGlnaUNlcnQgSW5jMScwJQYDVQQDEx5E
...
SzSHfXp5lnu/3V08I72q1QNzOCgY1XeL4GKVcj4or6cT6tX6oJH7ePPmfrBfqI/O
OeH8gMJ+FuwtXYEPa4hBf38M5eU5xWG7
-----END CERTIFICATE-----

$ MYCERT="$(cat app_example_com.pem|perl -pe 's/\r?\n/\\n/'|sed -e 's/..$//')"
$ MYKEY="$(cat app_example_com.key|perl -pe 's/\r?\n/\\n/'|sed -e's/..$//')"
```

With the certificate and key saved to environment variables (using escaped newlines), build the payload:
