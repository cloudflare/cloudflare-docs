---
order: 2
---

# HTTP policies

HTTP policies allow you to filter HTTP traffic on the L7 firewall. Gateway will intercept all HTTP and HTTPS traffic and apply the rules you have configured in your policy to either block, allow, or override specific elements such as websites, IP addresses, and file types.

![Gateway flow HTTP](../../../static/documentation/policies/gateway-flow-3.jpg)

Build an HTTP policy by configuring the following elements:

* **Actions**
* **Expressions**
* **Selectors**
* **Operators**

## Actions

Just like actions on destinations in DNS policies, actions in HTTP policies allow you to choose what to do with a given set of elements (domains, IP addresses, file types, and so on). You can assign one action per policy.

These are the action types you can choose from:

* **Allow** 
* **Block** 
* **Do Not Inspect**

### Do Not Inspect

<Aside type='Warning' header='Warning'>

When a *Do Not Inspect* rule is created for a given hostname, application, or app type, no traffic will be inspected.

</Aside>

*Do Not Inspect* lets administrators bypass certain elements from inspection. Administrators who wish to bypass a site must match against the host in order to prevent HTTP inspection from occuring on both encrypted and plaintext traffic.

The *Do Not Inspect* action is only available when matching against the host criteria.

The L7 firewall will evaluate *Do Not Inspect* rules before any subsequent Allow or Block rules. For encrypted traffic, Gateway uses the Server Name Indicator (SNI) in the TLS header to determine whether to decrypt the traffic for further HTTP inspection against Allow or Block rules. All *Do Not Inspect* rules are evaluated first to determine if decryption should occur. This means regardless of precedence in a customer's list of rules, all *Do Not Inspect* rules will take precedence over Allow or Block rules.


## Selectors
Gateway matches HTTP traffic against the following selectors, or criteria:
* **Host**
* **URL**
* **URL Query**
* **URL Path**
* **URL Path and Query**
* **HTTP Method**
* **HTTP Response**
* **Uploaded and Downloaded File Extension**
* **Uploaded and Downloaded Mime Type**
* **Content categories**
* **Applications**

List of file extensions Gateway can match against:

<TableWrap>

| Image | Executable | Audio | Documents | Data | Compressed | System | Video |
|------|------|-------|------|--------|--------|--------|-----|
| avif | apk | m4a | doc | avro | 7z | bak | avi |
| bmp | bat | mid | docx | csv | arj | cab | flv |
| gif | bin | mp3 | odp | dat | bz2 | cpl | h264 |
| ico | cgi | mpa | ods | dmg | deb | cur | m4v |
| jpeg | com | wav | odt | iso | gz | emu | mkv |
| png | dll | wma | pdf | json | lz | ini | mov |
| psd | exe | ppt | | log | lz4 | scr | mp4 |
| svg | hta | pptx | | mdb | lzh | sys | mpeg |
| tif | jar | rtf | | nzb | lzma | tmp | wmv |
| webp | moo | txt | | orc | pak
|  | pif | xls | | parquet | rar
|  | pl | xlsx | | rc | rpm
|  | prg | | | sav | sz
|  | | | | wasm | xz | | 
|  |      | | | sql lite | z
|  |      | | | tar | zip
|  |      | | | toml | zlib |
|  |      | | | torrent | zst |
|  |      | | | xml |  |
|  |      | | | yaml | | 

</TableWrap>

## Operators
Operators are the way Gateway matches traffic to a selector. Matching happens as follows:

| Operator              |          Meaning
|:---------------------:|:---------------------------:|
|  is                   |  exact match, equals        |
|  is not               |  all except exact match     |
|  in                   |  in any of defined entries  |
|  not in               |  not in defined entries     |
|  matches regex        | regex evaluates to true         |
|  does not match regex |  all except when regex evals to true   |

## Expressions
Expressions are sets of conditions with which you can combine [selectors](#selectors) and [operators](#operators). By configuring one or more expressions, you can define the scope of your HTTP policy. 

## Example scenarios

| Action | Selector | Operator | 
| ------ | ---- | -------- | 
| Block  | Content categories | in: `Gaming` | 

**Result**: this configuration blocks any traffic to domains categorized as `Gaming`. 

## FAQ

### **How can I bypass the L7 firewall for a website?**

Cloudflare Gateway uses the hostname in the HTTP CONNECT header to identify the destination of the request. Administrators who wish to bypass a site must match against the host in order to prevent HTTP inspection from occurring on both encrypted and plaintext traffic. The **bypass** action is only available when matching against the **host** criteria.
Bypassing the L7 firewall results in no HTTP traffic inspection and logging is disabled for that HTTP session.

### **In what order are rules evaluated?**

The L7 firewall evaluates rules starting with the rule containing the lowest precedence (e.g., rule number one). Rules with a higher value precedence are evaluated after those with a lower value.

### **I see an error when browsing Google-related pages. What's the problem?**

If you are using the Gateway proxy, you need to disable the QUIC protocol within the Google Chrome settings. This will prevent you from encountering issues such as users who are able to connect to Google-related sites and services (like YouTube) that are explicitly blocked by a Gateway policy. 

Google Chrome uses QUIC to connect to all google services by default. This means all requests to google services via the Google Chrome browser use UDP instead of TCP. **At this time, Gateway does not support inspection of QUIC traffic and requests using QUIC will bypass Gateway HTTP policies**. Gateway does prevent standard HTTP requests from negotiating to using QUIC with the `Alt-Svc` header by removing this header from HTTP requests.

Gateway will support inspection of QUIC traffic in the future. 

#### Disabling QUIC in Google Chrome

For more information on disabling QUIC on a managed device, see [these instructions](https://support.google.com/chrome/a/answer/7649838?hl=en). You can manually disable QUIC in Google Chrome using the Experimental QUIC protocol (`#enable-quic`) flag:

1. In the address bar, type:  `chrome://flags#enable-quic`.
1. Set the Experimental QUIC protocol flag to `Disabled`.
1. Relaunch Chrome for the setting to take effect.

The following Windows registry key (or Mac/Linux preference) can be used to disable QUIC in Chrome, and can be enforced via GPO or equivalent:

* **Data type:** `Boolean [Windows:REG_DWORD]`
* **Windows registry location for Windows clients:** `Software\Policies\Google\Chrome\QuicAllowed`
* **Windows registry location for Google Chrome OS clients:** `Software\Policies\Google\ChromeOS\QuicAllowed`
* **Mac/Linux preference name:** `QuicAllowed`
* **Description:** If this policy is set to true (or not set), usage of QUIC is allowed. If the policy is set to false, usage of QUIC is not allowed.
* **Recommended value:** `Windows: 0x00000000`, `Linux: false`, `Mac: <false />`
