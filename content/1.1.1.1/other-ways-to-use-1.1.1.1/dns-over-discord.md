---
pcx_content_type: tutorial
title: DNS over Discord
---

# DNS over Discord

1.1.1.1 works from a Discord server, thanks to the 1.1.1.1 bot. [Invite the bot to your Discord server](https://cfl.re/3nM6VfQ) to start using DNS over Discord.

## Perform DNS lookups

Once the bot is in your server, type `/dig` to start performing DNS lookups. This will provide a native interface within Discord that allows you to specify the domain to lookup, an optional DNS record type and an optional flag for a short result.

If only a domain is given for the command, the bot will default to looking for `A` DNS records, and will return the full format result, not the short form.

Example:

```txt
/dig domain: cloudflare.com
```

### Supported record types

Discord has a limit of 25 options in slash commands, so DNS over Discord offers the 25 most common DNS record types to choose from.

<details>
<summary>Supported DNS record types</summary>
<div>

* `A`
* `AAAA`
* `CAA`
* `CDNSKEY`
* `CDS`
* `CERT`
* `CNAME`
* `DNSKEY`
* `DS`
* `HINFO`
* `HTTPS`
* `LOC`
* `MX`
* `NAPTR`
* `NS`
* `PTR`
* `SMIMEA`
* `SOA`
* `SPF`
* `SRV`
* `SSHFP`
* `SVCB`
* `TLSA`
* `TXT`
* `URI`

</div>
</details>

To query other DNS record types, or multiple record types at once, use the `/multi-dig` command.

### Short form response

DNS over Discord has an optional flag in the `/dig` command that allows the user to request a response in the short form.

When you request a response in the short form, the name and TTL columns will be excluded. The command only returns the data column without formatting, similar to the equivalent `dig` command-line interface response.

Example:

```txt
/dig domain: cloudflare.com type: AAAA records short: True
```

### Refreshing existing results

You can refresh the DNS lookup results by selecting the Refresh button. Selecting it will trigger the bot to re-request the DNS query in the message, and update the results in the message. Any user can select this button.

The refresh button is available on all responses to the `/dig` command, including those that resulted in an error, such as an unknown domain or no records found.

### Changing DNS provider

By default, the DNS over Discord bot uses Cloudflare's 1.1.1.1 DNS service. You can run the DNS lookup with alternate DNS providers by selecting the dropdown below the result. This shows you a list of available providers. Selecting a new provider updates the results in the message. Any user can change the DNS provider.

## `multi-dig` command

If you want to look up multiple DNS record types at once, use the `/multi-dig` command. This allows you to specify any supported DNS record type, and multiple types separated by a space.

Example:

```txt
/multi-dig domain: cloudflare.com types: A AAAA
```

### Supported record types

When providing DNS record types for the `/multi-dig` command, Discord will not prompt you with options. You have to provide a space-separated list of valid DNS record types to lookup, as any invalid options will be silently dropped. `A` records will be used as the default if no valid types are given.

<details>
<summary>DNS record types supported and considered valid by the bot</summary>
<div>

Use a `*` (asterisk) in place of a record type to get DNS results for all supported types.

* `A`
* `AAAA`
* `AFSDB`
* `APL`
* `CAA`
* `CDNSKEY`
* `CDS`
* `CERT`
* `CNAME`
* `CSYNC`
* `DHCID`
* `DLV`
* `DNAME`
* `DNSKEY`
* `DS`
* `EUI48`
* `EUI64`
* `HINFO`
* `HIP`
* `HTTPS`
* `IPSECKEY`
* `KEY`
* `KX`
* `LOC`
* `MX`
* `NAPTR`
* `NS`
* `NSEC`
* `NSEC3`
* `NSEC3PARAM`
* `OPENPGPKEY`
* `PTR`
* `RP`
* `SMIMEA`
* `SOA`
* `SPF`
* `SRV`
* `SSHFP`
* `SVCB`
* `TA`
* `TKEY`
* `TLSA`
* `TXT`
* `URI`
* `ZONEMD`

</div>
</details>

### Short form response

Like the main `/dig` command, the `/multi-dig` command also supports the optional short flag after the types have been specified in the slash command.

Example:

```txt
/multi-dig domain: cloudflare.com types: CDS CDNSKEY short: True
```

### Refreshing existing results

The `/multi-dig` command also provides a refresh button below each set of DNS results requested (or after each block of 10 DNS record types, if you requested more than 10).

As with the `/dig` command, any user can press the refresh button to refresh the displayed DNS results, including for DNS queries that had previously failed.

### Changing DNS provider

Like the `/dig` command, you can change the DNS provider when using the `/multi-dig` command. The menu appears after each set of DNS results (or after each block of results if more than 10 record types are requested).

This menu can be used be any user to change the DNS provider used for the lookup.

## `whois` command

The `/whois` command allows you to perform a RDAP/WHOIS lookup right in Discord for a given domain, IP or ASN.

Examples:

```txt
/whois query: cloudflare.com
/whois query: 104.16.132.229
/whois query: 2606:4700::6810:84e5
/whois query: 13335
```

## Other commands

The bot also has a set of helper commands available to get more information about the bot and quick links.

### `help` command

The `/help` command provides in-Discord documentation about all the commands available in the 1.1.1.1 DNS over Discord bot.

Example:

```txt
/help
```

### `privacy` command

The `/privacy` command displays the Privacy Policy notice for using the 1.1.1.1 DNS over Discord bot. You can also [refer to the Privacy Policy page](https://dns-over-discord.v4.wtf/privacy) to access it.

Example:

```txt
/privacy
```

### `terms` command

The `/terms` command displays the Terms of Service notice for using the 1.1.1.1 DNS over Discord bot. You can also [refer to the Terms of Service page](https://dns-over-discord.v4.wtf/terms) to access it.

Example:

```txt
/terms
```

### `github` command

The DNS over Discord bot is open-source, and the `/github` command provides a quick link to access the GitHub repository. The GitHub repository can be accessed at [https://github.com/MattIPv4/DNS-over-Discord/](https://github.com/MattIPv4/DNS-over-Discord/).

Example:

```txt
/github
```

### `invite` command

The `/invite` command provides the user with a quick link to invite the 1.1.1.1 DNS over Discord bot to another Discord server.
The bot can be invited at any time with [https://cfl.re/3nM6VfQ](https://cfl.re/3nM6VfQ).

```txt
/invite
```

---

## Development

The DNS over Discord bot is deployed on [Cloudflare Workers](https://workers.cloudflare.com/).

You can find the source code for the bot on GitHub, as well as information on getting started with contributing to the project, at [https://github.com/MattIPv4/DNS-over-Discord/](https://github.com/MattIPv4/DNS-over-Discord/).