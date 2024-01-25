---
pcx_content_type: tutorial
title: DNS in Google Sheets
---

# DNS in Google Sheets

## Create a function

1.1.1.1 works directly inside Google Sheets. To get started, create a [Google Function](https://developers.google.com/apps-script/guides/sheets/functions) with the following code:

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
    muteHttpExceptions: true,
    headers: {
      accept: "application/dns-json"
    }
  };

  var result = UrlFetchApp.fetch(url, options);
  var rc = result.getResponseCode();
  var resultText = result.getContentText();

  if (rc !== 200) {
    throw new Error(rc);
  }

  var errors = [
    { name: "NoError", description: "No Error"}, // 0
    { name: "FormErr", description: "Format Error"}, // 1
    { name: "ServFail", description: "Server Failure"}, // 2
    { name: "NXDomain", description: "Non-Existent Domain"}, // 3
    { name: "NotImp", description: "Not Implemented"}, // 4
    { name: "Refused", description: "Query Refused"}, // 5
    { name: "YXDomain", description: "Name Exists when it should not"}, // 6
    { name: "YXRRSet", description: "RR Set Exists when it should not"}, // 7
    { name: "NXRRSet", description: "RR Set that should exist does not"}, // 8
    { name: "NotAuth", description: "Not Authorized"} // 9
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

## Using 1.1.1.1

When you feed the function `NSLookup` a record type and a domain, you will get a DNS record value in the cell you called `NSLookup`.

{{<details header="Supported DNS record types">}}

* `A`
* `AAAA`
* `CAA`
* `CNAME`
* `DS`
* `DNSKEY`
* `MX`
* `NS`
* `NSEC`
* `NSEC3`
* `RRSIG`
* `SOA`
* `TXT`

{{</details>}}

For example, typing:

```txt
NSLookup(B1, B2)
```

Or - depending on your regional settings - you may have to use this formula:

```txt
NSLookup(B1; B2)
```

<div class="medium-img">

![Google sheets function](/images/1.1.1.1/google-sheet-function.png)

</div>

<br/>

Returns

```txt
198.41.214.162, 198.41.215.162
```

<div class="medium-img">

![Google sheets function](/images/1.1.1.1/google-sheet-result.png)

</div>
