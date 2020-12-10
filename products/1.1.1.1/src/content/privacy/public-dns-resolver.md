---
order: 1
---

# 1.1.1.1 Public DNS Resolver

*Last updated September 30, 2020*

Cloudflare’s Commitment to Privacy: 1.1.1.1 Public DNS Resolver

The 1.1.1.1 public DNS resolver is governed by our [Privacy Policy](https://www.cloudflare.com/privacypolicy/). This document provides additional details on our collection, use, and disclosure of the information collected from the 1.1.1.1 public DNS resolver.

-----

Nearly everything on the Internet starts with a DNS request. DNS is the Internet’s directory. Click on a link, open an app, send an email, and the first thing your phone or computer does is ask its directory: where can I find this?

Unfortunately, by default, DNS is usually slow and insecure. Your ISP, and anyone else listening in on the Internet, can see every site you visit and every app you use — even if their content is encrypted. Creepily, some DNS providers sell data about your Internet activity or use it to target you with ads.

Given the current state of affairs, Cloudflare created a DNS resolver with your privacy and security in mind. Cloudflare, in partnership with APNIC, runs the 1.1.1.1 public resolver, a recursive DNS service that values user privacy and security. DNS requests sent to our public resolver are sent over a secure channel, significantly decreasing the odds of any unwanted spying or man in the middle attacks.

The 1.1.1.1 public DNS resolver was designed for privacy first, and Cloudflare commits to the following:

1. Cloudflare will not sell or share Public Resolver users’ personal data with third parties or use personal data from the Public Resolver to target any user with advertisements.
2. Cloudflare will only retain or use what is being asked, not information that will identify who is asking it. Except for randomly sampled network packets captured from at most .05% of all traffic sent to Cloudflare’s network infrastructure, Cloudflare will not retain the source IP from DNS queries to the Public Resolver in non-volatile storage. These randomly sampled packets are solely used for network troubleshooting and DoS mitigation purposes.
3. A Public Resolver user’s IP address (referred to as the client or source IP address) will not be stored in non-volatile storage. Cloudflare will anonymize source IP addresses via IP truncation methods (last octet for IPv4 and last 80 bits for IPv6). Cloudflare will delete the truncated IP address within 25 hours.
4. Cloudflare will retain only the limited transaction and debug log data (“Public Resolver Logs”) set forth below, for the legitimate operation of our Public Resolver and research purposes, and Cloudflare will delete the Public Resolver Logs within 25 hours.
5. Cloudflare will not share the Public Resolver Logs with any third parties except for APNIC pursuant to a Research Cooperative Agreement. APNIC will only have limited access to query the anonymized data in the Public Resolver Logs and conduct research related to the operation of the DNS system.

Frankly, we don’t want to know what any one person is doing on the Internet — it’s none of our business — and we’ve taken the technical steps to ensure we can’t.

We wanted to put our money where our mouth was, so we retained one of the top four accounting firms to audit our practices and publish a public report confirming we're doing what we said we would. The report is available [here](https://www.cloudflare.com/compliance/).

## LIMITED DATA SHARING WITH APNIC

Cloudflare has partnered with [APNIC Labs](https://labs.apnic.net/?p=1127), the regional Internet registry for the Asia-Pacific region to make the 1.1.1.1 IP address the home of the Cloudflare Public DNS Resolver. As part of its mission to ensure a global, open and secure Internet, APNIC conducts research about the functioning and governance of the Internet, which it makes available on its website, located at www.apnic.net.

Cloudflare has agreed to provide APNIC with access to some of the anonymized data that Cloudflare collects through the Cloudflare Public DNS Resolver. Specifically, APNIC will be permitted to access query names, query types, resolver location and other metadata via a Cloudflare API, that will allow APNIC to study topics like the volume of DDoS attacks launched on the Internet and adoption of IPv6.

APNIC Labs will use such data for non-profit operational research. As part of Cloudflare’s commitment to privacy, Cloudflare will not provide APNIC with any access to the IP address associated with a client.

Aside from APNIC, Cloudflare will not share the Public Resolver Logs with any third party.

## DATA IN PUBLIC RESOLVER LOGS

The Public Resolver Logs we store consist entirely of the following fields:

* date
* dateTime
* srcAsNum
* srcIPVersion
* dstIPVersion
* dstIPv6
* dstIPv4
* dstPort
* protocol
* queryName
* queryType
* queryClass
* queryRd
* queryDo
* querySize
* queryEdns
* ednsVersion
* ednsPayload
* ednsNsid
* responseType
* responseCode
* responseSize
* responseCount
* responseTimeMs
* responseCached
* responseMinTTL
* answerData type
* answerData
* validationState
* coloID (unique Cloudflare data center ID)
* metalId (unique Cloudflare data center ID)

Additionally, recursive resolvers perform outgoing queries to various authoritative nameservers in the DNS hierarchy that are logged in subrequest fields. These logs are used for the operation and debugging of our public DNS resolver service.

The following subrequest data is included in the Public Resolver Logs:

* subrequest.ipv6 (authoritative nameserver)
* subrequest.ipv4 (authoritative nameserver)
* subrequest.protocol
* subrequest.durationMs
* subrequest.queryName
* subrequest.queryType
* subrequest.responseCode
* subreqest.responseCount
* subreqeust.recordType
* subrequest.recordData
* subrequest.error

Except for the limited aggregated data generated using the Public Resolver Logs described below, all of the Public Resolver Logs are deleted within 25 hours of Cloudflare’s receipt of such information.

Cloudflare will only store the following aggregated data:

* Total number of queries with different protocol settings (e.g tcp/udp/dnssec) by Cloudflare PoP
* Response code/time quantiles with different protocol settings by Cloudflare PoP
* Total Number of Requests Processed by Cloudflare PoP
* Aggregate List of All Domain Names Requested, aggregate number of requests and timestamp of first time requested
* Number of unique clients, queries over IPv4, queries over IPv6, queries with the RD bit set, queries asking for DNSSEC, number of bogus, valid, and invalid DNSSEC answers, queries by type, number of answers with each response code, response time quantiles (e.g. 50 percentile), and number of cached answers per minute, per day, per protocol (HTTPS/UDP/TCP/TLS), per Cloudflare data center, and per Autonomous System Number.
* Number of queries, number of queries with EDNS, number of bytes and time in answers quantiles (e.g. 50 percentile) by day, month, Cloudflare data center, and by IPv4 vs IPv6.
* Number of queries, response codes and response code quantiles (e.g. 50 percentile) by day, region, name and type.

Cloudflare may store the aggregated data described above indefinitely in order to assist Cloudflare in improving Cloudflare services, such as, enhancing the overall performance of the Cloudflare Resolver and identifying security threats.

## WHAT ABOUT REQUESTS FOR CONTENT BLOCKING?

Cloudflare does not block or filter any content through the 1.1.1.1 Public DNS Resolver, which is designed for direct, fast DNS resolution, not for blocking or filtering content. Cloudflare does block and filter malware and adult content through 1.1.1.1 for Families, which is designed to help individuals protect their home networks.

In general, Cloudflare views government or civil requests to block content at the DNS level as ineffective, inefficient, and overboard. Because such a block would apply globally to all users of the resolver, regardless of where they are located, it would affect end users outside of the blocking government’s jurisdiction. A government request to block content through a globally available public recursive resolver like the 1.1.1.1 Public DNS Resolver and 1.1.1.1 for Families therefore should be evaluated as a request to block content globally.  

Given the broad extraterritorial effect, if Cloudflare were to receive written requests from law enforcement and government agencies to block access to domains or content through the 1.1.1.1 Public DNS Resolver or to block access to domains or content through 1.1.1.1 for Families that is outside the scope of the filtering in that product, Cloudflare would pursue its legal remedies before complying with such a request. We also commit to documenting any government request to block access in our semi-annual transparency report, unless legally prohibited from doing so.