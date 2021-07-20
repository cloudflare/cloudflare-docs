---
order: 2
pcx-content: tutorial
---

# DNS over Discord

Ever wanted to make DNS requests from the comfort of your Discord server? Well now you can, thanks to the [@1.1.1.1 bot](https://cfl.re/3nM6VfQ).

To start using the DNS over Discord bot, invite it to your Discord server using this link: [https://cfl.re/3nM6VfQ](https://cfl.re/3nM6VfQ)


## dig command

Once the bot is in your server, type `/dig` to begin using the bot's main command — performing DNS lookups.
This will provide a native interface within Discord that allows you to specify the domain to lookup, an optional DNS record type and an optional flag for a short result.

If only a domain is given for the command, the bot will default to looking for 'A' DNS records, and will return the full format result, not the short form.

![dig command](../static/dns-over-discord/dig-command.png)

![dig domain: cloudflare.com](../static/dns-over-discord/dig-command-example-1.png)

_`/dig domain: cloudflare.com`_


### Supported record types

Discord has a limit of 25 options in slash commands, so DNS over Discord offers the 25 most common DNS record types to choose from:

*   A
*   AAAA
*   CAA
*   CERT
*   CNAME
*   MX
*   NS
*   SPF
*   SRV
*   TXT
*   DNSKEY
*   DS
*   LOC
*   URI
*   HTTPS
*   NAPTR
*   PTR
*   SMIMEA
*   SOA
*   SSHFP
*   SVCB
*   TLSA
*   HINFO
*   CDS
*   CDNSKEY

*To query other DNS record types, or multiple record types at once, use the `/multi-dig` command.*

![dig command types](../static/dns-over-discord/dig-command-types.png)


### Short form response

Much like the dig command itself, DNS over Discord has an optional flag in the dig command that allows the user to request that the response be in the short form.

When this is requested, the name and TTL columns will be excluded, with just the data column returned without the table formatting, similar to the equivalent dig command response.

![dig domain: cloudflare.com type: AAAA short: true](../static/dns-over-discord/dig-command-example-2.png)

_`/dig domain: cloudflare.com type: AAAA short: true`_


### Refreshing existing results

As part of the response that the DNS over Discord bot returns for dig commands there is a button to refresh the results.

Any user can press this button, triggering the bot to re-request the DNS query in the message and update the results in the message.

The refresh button is available on all responses to the dig command, including those that resulted in an error, such as an unknown domain or no records found.

![Refreshing dig domain: cloudflare.com](../static/dns-over-discord/dig-command-refresh.gif)

_`/dig domain: cloudflare.com`_


## multi-dig command

Want to lookup multiple DNS record types at once?
The `/multi-dig` command allows you to specify any supported DNS record type, and multiple types separated by a space.

![multi-dig command](../static/dns-over-discord/multi-dig-command.png)

![multi-dig domain: cloudflare.com types: A AAAA](../static/dns-over-discord/multi-dig-command-example-1.png)

_`/multi-dig domain: cloudflare.com types: A AAAA`_


### Supported record types

When providing DNS record types for the `/multi-dig` command, Discord will not prompt you with options.

Please provide a space-separated list of valid DNS record types to lookup, any invalid options will be silently dropped.
'A' records will be used as the default if no valid types are given.

The following DNS record types are supported and considered valid by the bot:

*   A
*   AAAA
*   CAA
*   CERT
*   CNAME
*   MX
*   NS
*   SPF
*   SRV
*   TXT
*   DNSKEY
*   DS
*   LOC
*   URI
*   HTTPS
*   NAPTR
*   PTR
*   SMIMEA
*   SOA
*   SSHFP
*   SVCB
*   TLSA
*   HINFO
*   CDS
*   CDNSKEY
*   AFSDB
*   APL
*   CSYNC
*   DHCID
*   DLV
*   DNAME
*   EUI48
*   EUI64
*   HIP
*   IPSECKEY
*   KEY
*   KX
*   NSEC
*   NSEC3
*   NSEC3PARAM
*   OPENPGPKEY
*   RP
*   TA
*   TKEY
*   ZONEMD

*Use '\*' (asterisk) in place of a record type to get DNS results for all supported types.*

![multi-dig command types](../static/dns-over-discord/multi-dig-command-types.png)


### Short form response

Like the main dig command, the multi-dig command also supports the optional short flag after the types have been specified in the slash command.

![multi-dig domain: cloudflare.com types: CDS CDNSKEY short: true](../static/dns-over-discord/multi-dig-command-example-2.png)

_`/multi-dig domain: cloudflare.com types: CDS CDNSKEY short: true`_


### Refreshing existing results

The multi-dig command also provides a refresh button below each set of DNS results requested (or after each block of 10 DNS record types if more than 10 were requested).

As with the dig command, any user can press the refresh button to refresh the displayed DNS results, including for DNS queries that had previously failed.

![Refreshing multi-dig domain: cloudflare.com types: A AAAA](../static/dns-over-discord/multi-dig-command-refresh.gif)

_`/multi-dig domain: cloudflare.com types: A AAAA`_


## whois command

Curious about who's behind a domain name, an IP address or even an ASN?
The `/whois` command allows you to perform an RDAP/WHOIS lookup right in Discord for a given domain, IP or ASN.

![whois command](../static/dns-over-discord/whois-command.png)

### Examples

![whois query: cloudflare.com](../static/dns-over-discord/whois-command-example-1.png)

_`/whois query: cloudflare.com`_

![whois query: 104.16.132.229](../static/dns-over-discord/whois-command-example-2.png)

_`/whois query: 104.16.132.229`_

![whois query: 2606:4700::6810:84e5](../static/dns-over-discord/whois-command-example-3.png)

_`/whois query: 2606:4700::6810:84e5`_

![whois query: 13335](../static/dns-over-discord/whois-command-example-4.png)

_`/whois query: 13335`_

## Other commands

The bot also has a set of helper commands available to get more information about the bot and quick links.

### help command

The `/help` command provides in-Discord documentation about all the commands available in the 1.1.1.1 DNS over Discord bot.

![help command](../static/dns-over-discord/help-command.png)

_`/help`_

### privacy command

The `/privacy` command displays the privacy policy notice for using the 1.1.1.1 DNS over Discord bot.
This notice can also be viewed at [https://dns-over-discord.v4.wtf/privacy](https://dns-over-discord.v4.wtf/privacy).

![privacy command](../static/dns-over-discord/privacy-command.png)

_`/privacy`_

### github command

The DNS over Discord bot is open-source, and the `/github` command provides a quick link to access the GitHub repository.
The GitHub repository can be accessed at [https://github.com/MattIPv4/DNS-over-Discord/](https://github.com/MattIPv4/DNS-over-Discord/).

![github command](../static/dns-over-discord/github-command.png)

_`/github`_

### invite command

The `/invite` command provides the user with a quick link to invite the 1.1.1.1 DNS over Discord bot to another Discord server.
The bot can be invited at any time with [https://cfl.re/3nM6VfQ](https://cfl.re/3nM6VfQ).

![invite command](../static/dns-over-discord/invite-command.png)

_`/invite`_

---

## Development

The DNS over Discord bot is deployed on [Cloudflare Workers](https://workers.cloudflare.com/).

You can find the source code for the bot on GitHub, as well as information on getting started with contributing to the project, at [https://github.com/MattIPv4/DNS-over-Discord/](https://github.com/MattIPv4/DNS-over-Discord/).
