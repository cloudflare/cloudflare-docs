---
order:
pcx-content-type: how-to
---

# DNS in Google Sheets

1.1.1.1 works directly inside Google Sheets. If you want or need to find out some DNS records, create a [Google Function](https://developers.google.com/apps-script/guides/sheets/functions) with the following code:

```js
function NSLookup(type, domain) {

  if (typeof type == 'undefined') {
    throw new Error('Missing parameter 1 dns type');
  }

  if (typeof domain == 'undefined') {
    throw new Error('Missing parameter 2 domain name');
  }

  type = type.toUpperCase();

  var url = 'https://cloudflare-dns.com/dns-query?name=' + encodeURIComponent(domain) + '&type=' + encodeURIComponent(type);

  var options = {
    "muteHttpExceptions": true,
    "headers": {
      "accept": "application/dns-json"
    }
  };

  var result = UrlFetchApp.fetch(url, options);
  var rc = result.getResponseCode();
  var resultText = result.getContentText();

  if (rc !== 200) {
    throw new Error(rc);
  }

  var errors = [
    { "name": "NoError", "description": "No Error"}, // 0
    { "name": "FormErr", "description": "Format Error"}, // 1
    { "name": "ServFail", "description": "Server Failure"}, // 2
    { "name": "NXDomain", "description": "Non-Existent Domain"}, // 3
    { "name": "NotImp", "description": "Not Implemented"}, // 4
    { "name": "Refused", "description": "Query Refused"}, // 5
    { "name": "YXDomain", "description": "Name Exists when it should not"}, // 6
    { "name": "YXRRSet", "description": "RR Set Exists when it should not"}, // 7
    { "name": "NXRRSet", "description": "RR Set that should exist does not"}, // 8
    { "name": "NotAuth", "description": "Not Authorized"} // 9
  ];

  var response = JSON.parse(resultText);

  if (response.Status !== 0) {
    return errors[response.Status].name;
  }

  var outputData = [];

  for (var i in response.Answer) {
    outputData.push(response.Answer[i].data);
  }

  var outputString = outputData.join(',');

  return outputString;

}
```

Now, when you feed the function `NSLookup` a record type and a domain, you will get a DNS record value in the cell you called `NSLookup`.

The record types supported are:

* A
* AAAA
* CAA
* CNAME
* DS
* DNSKEY
* MX
* NS
* NSEC
* NSEC3
* RRSIG
* SOA
* TXT

For example, typing:

```txt
NSLookup(B1, B2)
```

<div class="medium-img">

![Google sheets function](../static/google-sheet-function.png)

</div>

<br/>

Returns 

```txt
198.41.214.162, 198.41.215.162
```

<div class="medium-img">

![Google sheets function](../static/google-sheet-result.png)

</div>