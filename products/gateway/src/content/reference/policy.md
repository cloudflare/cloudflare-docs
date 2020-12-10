---
order: 2
---

# Policies

<Aside>

For instructions on how to set up policies in the Teams dash, visit our [Getting started section](../getting-started).
</Aside>

Gateway policies allow you to grant or deny your users access to specific domains or domain categories. If the WARP client is configured to send DNS requests over DoH to Gateway, the DNS queries are evaluated against content and security policies configured for the organization. If the domain is allowed, the client receives the DNS resolution and initiates an HTTP connection.

Cloudflare Gateway currently filters HTTP traffic over port 80 and 443. If the HTTP connection is within a TLS connection, the TLS connection will be terminated at Cloudflare Gateway so the HTTP traffic can be inspected (unless an administrator configures a bypass rule). If the HTTP connection does not violate any policies configured by an administrator, the traffic is allowed through to the origin server.

### DNS policies

When a user makes a DNS request to Gateway, Gateway matches the request against the content or security categories you have set up for your organization. If the domain does not belong to any blocked categories, or if it matches an override rule, the user's client receives the DNS resolution and initiates an HTTP connection. 

DNS policies can be built by doing one or more of the following:

1. Selecting security threat categories you want to block.
1. Enabling SafeSearch.
1. Enabling YouTube Restricted Mode.
1. Selecting content categories you want to block.
1. Adding custom domains you want to block, allow, or override.

#### Security threat categories

When creating a DNS policy, you can select as many security threat categories as you want to block with the policy. This allows you to block known and potential security threats on the public Internet.

#### Content categories

<Aside>

Sites that are classified as belonging to the **Child Abuse** category are blocked by default.
</Aside>

When creating a DNS policy, you can select as many content categories as you want to block with the policy.

#### Destinations

Setting a **destination** for a policy allows you to have manual control on what action to take on requests for **specific domains**.
When setting a domain as a destination, you have the option to allow, block or override that domain.
* **Allow**. This action forces resolving this destination and all its sub-destinations, and takes precedence over any blocked destinations.
* **Block**. This action will block a destination and all its sub-destinations.
* **Override**. This action will forward all requests to a given destination to another destination you can set.

##### Blocking a subdomain

When you manually block a domain, you automatically block all of its subdomains. For example, if you are blocking `example.com`, our policy engine will also block `a.example.com`, `a.b.example.com`.

If you only want to block a subdomain `a.example.com`, then instead of adding `example.com` to the list, you will add `a.example.com`. Note that once you add `a.example.com` to the block list, Cloudflare Gateway will also block all subdomains of `a.example.com`.

##### Blocking a top-level domain

Just like you can choose to block a domain and all subdomains, you can block an entire top-level domain (TLD) by specifying it in a custom list. For example, if you wish to block all domains and subdomains registered as a `.net`, you would input `net` in a custom list with the *Block* action selected. 

<Aside>

Blocking a popular TLD like `.com` will prevent users from connecting to significant portions of the internet.
</Aside>

#### Order of operations

When a DNS query matches with a DNS policy, Gateway follows this order of operations:

| Step |          Check If           |                           If Matches                      |     Else    |
|:----:|:---------------------------:|:---------------------------------------------------------:|:-----------:|
|  1   |  Domain is in Child Abuse category | Block domain, return REFUSED                              |Go to step 2 |
|  2   |    Domain in Allow list     | Allow domain, return NOERROR with IP address of the domain|Go to step 3 |
|  3   |    Domain in Block list     | Block domain, return REFUSED                              |Go to step 4 |
|  4   |    Domain in SafeSearch     | Override domain, return NOERROR with safe CNAME           |Go to step 5 |
|  5   | Domain blocked by category  | Block domain, return REFUSED                              |Go to step 6 |
|  6   |            N/A              | Allow domain, return NOERROR with IP address of the domain|     N/A     |

### HTTP policies

<Aside>

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
