---
order: 2
---

# Policies

Internet-bound traffic from a client is evaluated in the following way:

If the WARP client is configured to send DNS requests over DoH to Gateway, the DNS queries are evaluated against content and security policies configured for the organization. If the domain is allowed, the client receives the DNS resolution and initiates an HTTP connection.

Cloudflare Gateway currently filters HTTP traffic over port 80 and 443. If the HTTP connection is within a TLS connection, the TLS connection will be terminated at Cloudflare Gateway so the HTTP traffic can be inspected (unless an administrator configures a bypass rule). If the HTTP connection does not violate any policies configured by an administrator, the traffic is allowed through to the origin server.


## DNS

### What is a Policy?

A policy is a set of rules you can set up for one specific location or for multiple locations. Through Cloudflare Gateway's policy engine, you can filter domains by categories, manually block domains by specifying them in a list, and override domains to allow them even if those domains are getting blocked by a category.

When setting up a policy, you can also enable features such as SafeSearch or YouTube Restricted Mode.

### Blocking a subdomain

When you manually block a domain, you automatically block all of its subdomains. For example, if you are blocking `example.com`, our policy engine will also block `a.example.com`, `a.b.example.com`.

If you only want to block a subdomain `a.example.com`, then instead of adding `example.com` to the list, you will add `a.example.com`. Note that once you add `a.example.com` to the block list, Cloudflare Gateway will also block all subdomains of `a.example.com`.

### Blocking a top-level domain

Just like you can choose to block a domain and all subdomains, you can block an entire top-level domain (TLD) by specifying it in a custom list. For example, if you wish to block all domains and subdomains registered as a `.net`, you would input `.net` in a custom list with the *Block* action selected. 

<Aside>

Blocking a popular TLD like `.com` will prevent users from connecting to significant portions of the internet.
</Aside>

### Order of operations when applying a policy

When Gateway receives a DNS query and the query matches with a policy, the policy follows the order outlined below:

| Step |          Check If           |                           If Matches                      |     Else    |
|:----:|:---------------------------:|:---------------------------------------------------------:|:-----------:|
|  1   |  Domain is in CSAM category | Block domain, return REFUSED                              |Go to step 2 |
|  2   |    Domain in Allow list     | Allow domain, return NOERROR with IP address of the domain|Go to step 3 |
|  3   |    Domain in Block list     | Block domain, return REFUSED                              |Go to step 4 |
|  4   |    Domain in SafeSearch     | Override domain, return NOERROR with safe CNAME           |Go to step 5 |
|  5   | Domain blocked by category  | Block domain, return REFUSED                              |Go to step 6 |
|  6   |            N/A              | Allow domain, return NOERROR with IP address of the domain|     N/A     |
In each step, Gateway checks if the domain matches with the rule stated in the `Check If` column. If it matches with the rule, Gateway triggers the action in the `If Matches` column. If it does not match the check moves to the next step outlined in the `Else` column.

## L7 Firewall

### What criteria can be matched against in a rule for HTTP traffic filtering?

Cloudflare Gateway allows users to match against the following HTTP traffic criteria:
* Host
* URL
* URL Query
* URL Path
* URL Path and Query
* HTTP Method
* HTTP Response
* Uploaded and Downloaded File Extension
* Uploaded and Downloaded Mime Type

Like with DNS filtering, Cloudflare also maintains URLs associated with content categories and security threats. Organizations can choose to match against some or all of these categories to complement filtering at the DNS layer.

### How can a match be configured?

Depending on the criteria selected, administrators can choose to match in a variety of ways:

| Operator              |          Meaning
|:---------------------:|:---------------------------:|
|  is                   |  exact match, equals        |
|  is not               |  all except exact match     |
|  in                   |  in any of defined entries  |
|  not in               |  not in defined entries     |
|  matches regex        | regex evaluates to true         |
|  does not match regex |  all except when regex evals to true   |


### What actions can be taken when a match is made?

All rules support **allow** and **block** actions. However, administrators may wish to bypass certain sites from inspection. Cloudflare Gateway uses the hostname in the HTTP CONNECT header to identify the destination of the request. Administrators who wish to bypass a site must match against the host in order to prevent HTTP inspection from occuring on both encrypted and plaintext traffic. The **bypass** action is only available when matching against the **host** criteria.

### How can I bypass the L7 firewall for a website?

Cloudflare Gateway uses the hostname in the HTTP CONNECT header to identify the destination of the request. Administrators who wish to bypass a site must match against the host in order to prevent HTTP inspection from occuring on both encrypted and plaintext traffic. The **bypass** action is only available when matching against the **host** criteria.

Bypassing the L7 firewall results in no HTTP traffic inspection and logging is disabled for that HTTP session.

### In what order are rules evaluated?

The L7 firewall evaluates rules starting with the rule containing the lowest precedence (e.g., rule number one). Rules with a higher value precedence are evaluated after those with a lower value.

### What file extensions can I match against?

Cloudflare Gateway currently supports the following file extensions to match against to control files from passing through Gateway:

Image:
- avif
- bmp
- gif
- ico
- jpeg
- png
- psd
- svg
- tif
- webp

Executable:
- apk
- bat
- bin
- cgi
- com
- dll
- exe
- hta
- jar
- moo
- msi
- pif
- pl
- prg
- wasm

Audio:
- m4a
- mid
- mp3
- mpa
- wav
- wma

Documents:
- doc
- docx
- odp
- ods
- odt
- pdf
- ppt
- pptx
- rtf
- txt
- xls
- xlsx

Data:
- avro
- csv
- dat
- dmg
- iso
- json
- log
- mdb
- nzb
- orc
- parquet
- rc
- sav
- sql
- sqlite
- tar
- toml
- torrent
- xml
- yaml

Compressed:
- 7z
- arj
- bz2
- deb
- gz
- lz
- lz4
- lzh
- lzma
- pak
- rar
- rpm
- sz
- xz
- z
- zip
- zlib
- zst

System:
- bak
- cab
- cpl
- cur
- emu
- ini
- scr
- sys
- tmp

Video:
- avi
- flv
- h264
- m4v
- mkv
- mov
- mp4
- mpeg
- wmv
