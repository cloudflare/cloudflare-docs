---
pcx-content-type: tutorial
---

# DNS over Discord

1.1.1.1 also works from a Discord server, thanks to the [@1.1.1.1 bot](https://cfl.re/3nM6VfQ).

To start using the DNS over Discord bot, invite it to your Discord server using this link: [https://cfl.re/3nM6VfQ](https://cfl.re/3nM6VfQ)

## dig command

Once the bot is in your server, type `/dig` to begin using the bot's main command — performing DNS lookups.
This will provide a native interface within Discord that allows you to specify the domain to lookup, an optional DNS record type and an optional flag for a short result.

Due to limitations in Discord, the `/dig` command can only offer 10 different DNS record types, and will default to 'A' records if none is specified.

<div class="medium-img">

![dig command](../static/dns-over-discord/dig-command.png)

![dig command types](../static/dns-over-discord/dig-command-types.png)

</div>

### Supported record types

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

For all DNS record types, use the `/multi-dig` command.

### Examples

`/dig domain: cloudflare.com`

<div class="medium-img">

![dig domain: cloudflare.com](../static/dns-over-discord/dig-command-example-1.png)

</div>

`/dig domain: cloudflare.com type: AAAA short: True`

<div class="medium-img">

![dig domain: cloudflare.com type: AAAA short: True](../static/dns-over-discord/dig-command-example-2.png)

</div>

## multi-dig command

Want to lookup multiple DNS record types at once, or record types not available in `/dig`?
The `/multi-dig` command allows you to specify any supported DNS record type, and multiple types separated by a space.

When providing DNS record types for the `/multi-dig` command, Discord will not prompt you with options.
Please provide a space-separated list of valid DNS record types to lookup. Any invalid options will be silently dropped.
'A' records will be used as the default if no valid types are given.

<div class="medium-img">

![multi-dig command](../static/dns-over-discord/multi-dig-command.png)

![multi-dig command types](../static/dns-over-discord/multi-dig-command-types.png)

</div>

### Supported record types

*   A
*   AAAA
*   CAA
*   CERT
*   CNAME
*   DNSKEY
*   DS
*   LOC
*   MX
*   NAPTR
*   NS
*   PTR
*   SMIMEA
*   SPF
*   SRV
*   SSHFP
*   TLSA
*   TXT
*   URI

Use '\*' (asterisk) in place of a record type to get DNS results for all supported types.

### Examples

`/multi-dig domain: cloudflare.com types: A AAAA`

<div class="medium-img">

![multi-dig domain: cloudflare.com types: A AAAA](../static/dns-over-discord/multi-dig-command-example-1.png)

</div>

`/multi-dig domain: cloudflare.com types: DNSKEY short: True`

<div class="medium-img">

![multi-dig domain: cloudflare.com types: DNSKEY short: True](../static/dns-over-discord/multi-dig-command-example-2.png)

</div>

## whois command

The `/whois` command allows you to perform an RDAP/WHOIS lookup right in Discord to find who is behind a given domain name, an IP address, or an ASN.

<div class="medium-img">

![whois command](../static/dns-over-discord/whois-command.png)

</div>

### Examples

<div class="medium-img">

`/whois query: cloudflare.com`

![whois query: cloudflare.com](../static/dns-over-discord/whois-command-example-1.png)

</div>

---

<div class="medium-img">

`/whois query: 104.16.132.229`

![whois query: 104.16.132.229](../static/dns-over-discord/whois-command-example-2.png)

</div>

---

`/whois query: 2606:4700::6810:84e5`

<div class="medium-img">

![whois query: 2606:4700::6810:84e5](../static/dns-over-discord/whois-command-example-3.png)

</div>

---

`/whois query: 13335`

<div class="medium-img">

![whois query: 13335](../static/dns-over-discord/whois-command-example-4.png)

</div>

## Other commands

The bot also has a set of helper commands available to get more information about the bot and quick links.

### help command

The `/help` command provides in-Discord documentation about all the commands available in the 1.1.1.1 DNS over Discord bot.

<div class="medium-img">

`/help`

![help command](../static/dns-over-discord/help-command.png)

</div>

### privacy command

The `/privacy` command displays the privacy policy notice for using the 1.1.1.1 DNS over Discord bot.
This notice can also be viewed at [https://dns-over-discord.v4.wtf/privacy](https://dns-over-discord.v4.wtf/privacy).

<div class="medium-img">

`/privacy`

![privacy command](../static/dns-over-discord/privacy-command.png)

</div>

### github command

The DNS over Discord bot is open-source, and the `/github` command provides a quick link to access the GitHub repository.
The GitHub repository can be accessed at [https://github.com/MattIPv4/DNS-over-Discord/](https://github.com/MattIPv4/DNS-over-Discord/).

<div class="medium-img">

`/github`

![github command](../static/dns-over-discord/github-command.png)

</div>

### invite command

The `/invite` command provides the user with a quick link to invite the 1.1.1.1 DNS over Discord bot to another Discord server.
The bot can be invited at any time with [https://cfl.re/3nM6VfQ](https://cfl.re/3nM6VfQ).

<div class="medium-img">

`/invite`

![invite command](../static/dns-over-discord/invite-command.png)

</div>

---

## Development

The DNS over Discord bot is deployed on [Cloudflare Workers](https://workers.cloudflare.com/).

You can find the source code for the bot on GitHub, as well as information on getting started with contributing to the project, at [https://github.com/MattIPv4/DNS-over-Discord/](https://github.com/MattIPv4/DNS-over-Discord/).