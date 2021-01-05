---
order: 2
---

# HTTP policies

<Aside type='warning' header='Important'>

This feature is only available for Gateway and Teams paid plans. For more information, see the Cloudflare for Teams [pricing page](https://www.cloudflare.com/teams-pricing/).

</Aside>

You can decide to add a policy to filter HTTP traffic on the L7 firewall. Gateway will intercept all HTTP and HTTPS traffic and apply the rules you have configured in your policy to either block, allow, or override specific elements such as websites, IP addresses, and file types.

You can build an HTTP policy by configuring the following elements:

* **Actions**
* **Expressions**
* **Selectors**
* **Operators**

#### Actions

Just like actions on destinations in DNS policies, actions in HTTP policies allow you to choose what to do with a given set of elements (domains, IP addresses, file types, and so on). You can assign one action per policy.

These are the action types you can choose from:

* **Allow** 
* **Block** 
* **Bypass**

*Bypass* lets administrators bypass certain elements from inspection. Administrators who wish to bypass a site must match against the host in order to prevent HTTP inspection from occuring on both encrypted and plaintext traffic. The bypass action is only available when matching against the host criteria.

#### Selectors
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

#### Operators
Operators are the way Gateway matches traffic to a selector. Matching happens as follows:

| Operator              |          Meaning
|:---------------------:|:---------------------------:|
|  is                   |  exact match, equals        |
|  is not               |  all except exact match     |
|  in                   |  in any of defined entries  |
|  not in               |  not in defined entries     |
|  matches regex        | regex evaluates to true         |
|  does not match regex |  all except when regex evals to true   |

#### Expressions
Expressions are sets of conditions with which you can combine [selectors](#selectors) and [operators](#operators). By configuring one or more expressions, you can define the scope of your HTTP policy. 

#### Example scenarios

| Action | Selector | Operator | 
| ------ | ---- | -------- | 
| Block  | Content categories | in: `Gaming` | 

**Result**: this configuration blocks any traffic to domains categorized as `Gaming`. 

#### FAQ

* **How can I bypass the L7 firewall for a website?**

Cloudflare Gateway uses the hostname in the HTTP CONNECT header to identify the destination of the request. Administrators who wish to bypass a site must match against the host in order to prevent HTTP inspection from occurring on both encrypted and plaintext traffic. The **bypass** action is only available when matching against the **host** criteria.
Bypassing the L7 firewall results in no HTTP traffic inspection and logging is disabled for that HTTP session.

* **In what order are rules evaluated?**

The L7 firewall evaluates rules starting with the rule containing the lowest precedence (e.g., rule number one). Rules with a higher value precedence are evaluated after those with a lower value.
