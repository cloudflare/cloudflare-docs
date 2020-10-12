---
order: 2
---

# Cloudflare Resolver for Firefox

## FREQUENTLY ASKED QUESTIONS ABOUT THE CLOUDFLARE RESOLVER FOR FIREFOX

WHAT IS THE CLOUDFLARE RESOLVER FOR FIREFOX?

Every time you type a web address, such as www.mozilla.org or www.firefox.com, into a web browser the web browser sends a query to a DNS resolver. If DNS is like the card catalog of the Internet, then a DNS resolver is like a helpful librarian that knows how to use the information from that catalog to track down the exact location of a website. Whenever a resolver receives your query it looks up the IP address associated with the web address that you entered and relays that information to your web browser. “DNS resolution” as this process is referred to, is a crucial component of your Internet experience because without it your web browser would be unable to communicate with the servers that host your favorite websites since communication requires knowing the IP addresses of those websites.

For most Internet users the DNS resolver that they use is either the one that comes with the operating system running on their machines or the one that is set by their network provider. In some cases, these resolvers leave a lot to be desired because of their susceptibility to unwanted spying and other security threats.

To counter such threats, Mozilla has partnered with Cloudflare to provide direct DNS resolution from within the Firefox browser using the Cloudflare Resolver for Firefox. What this means is that whenever you click on or type a web address in the Firefox browser your DNS lookup request will be sent over a secure channel to the Cloudflare Resolver for Firefox rather than to an unknown DNS resolver, significantly decreasing the odds of any unwanted spying or man in the middle attacks.

WHAT INFORMATION DOES THE CLOUDFLARE RESOLVER FOR FIREFOX COLLECT?

Any data Cloudflare handles as a result of its resolver for Firefox is as a data processor acting pursuant to Firefox’s data processing instructions. Therefore, the data Cloudflare collects and processes pursuant to its agreement with Firefox is not covered by the [Cloudflare Privacy Policy](https://www.cloudflare.com/privacypolicy/). As part of its agreement with Firefox, Cloudflare has agreed to collect only a limited amount of data about the DNS requests that are sent to the Cloudflare Resolver for Firefox via the Firefox browser. Cloudflare will collect only the following information from Firefox users:

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

All of the above information will be stored briefly as part of Cloudflare’s temporary logs, and then permanently deleted within 24 hours of Cloudflare’s receipt of such information. In addition to the above information, Cloudflare will also collect and store the following information as part of its permanent logs.

- Total number of requests processed by each Cloudflare co-location facility
- Aggregate list of all domain names requested
- Samples of domain names queried along with the times of such queries

Information stored in Cloudflare’s permanent logs will be anonymized and may be held indefinitely by Cloudflare for its own internal research and development purposes.

WHAT IS THE CLOUDFLARE PROMISE?

Cloudflare understands how important your data is to you which is why we promise to use the information that we collect from the Cloudflare Resolver for Firefox solely to improve the performance of Cloudflare Resolver for Firefox and to assist us in debugging efforts if an issue arises. In addition to limiting our collection and use of your data, Cloudflare also promises:

Cloudflare will not retain or sell or transfer to any third party (except as may be required by law) any personal information, IP addresses or other user identifiers from the DNS queries sent from the Firefox browser to the Cloudflare Resolver for Firefox;

Cloudflare will not combine the data that it collects from such queries, with any other Cloudflare or third party data in any way that can be used to identify individual end users; and

Cloudflare will not sell, license, sublicense, or grant any rights to your data to any other person or entity without Mozilla’s explicit written permission.

WHAT ABOUT GOVERNMENT REQUESTS FOR CONTENT BLOCKING?

Cloudflare does not block or filter content through the Cloudflare Resolver for Firefox. As part of its agreement with Mozilla, Cloudflare is providing only direct DNS resolution. If Cloudflare were to receive written requests from law enforcement and government agencies to block access to domains or content through the Cloudflare resolver for Firefox, Cloudflare would, in consultation with Mozilla, exhaust our legal remedies before complying with such a request. We also commit to documenting any government request to block access in our semi-annual transparency report, unless legally prohibited from doing so.
