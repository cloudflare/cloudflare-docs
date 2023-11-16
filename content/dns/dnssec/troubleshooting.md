---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360021111972-Troubleshooting-DNSSEC
title: Troubleshooting
weight: 6
meta:
    title: Troubleshooting DNSSEC
---

# Troubleshooting DNSSEC

Learn more about how to troubleshoot issues with DNSSEC.

## Test DNSSEC with Dig

`Dig` is a command-line tool to query a nameserver for DNS records.

For instance, `dig` can ask a DNS resolver for the IP address of `www.cloudflare.com`:

{{<example>}}

```sh
$ dig www.cloudflare.com +short
198.41.215.162
198.41.214.162
```
The option `+short` outputs the result only.

{{</example>}}

Use `+dnssec` to verify that the DNS records are signed:

{{<example>}}

```sh
$ dig www.cloudflare.com +dnssec +short
198.41.214.162
198.41.215.162
A 13 3 300 20180927180434 20180925160434 35273 cloudflare.com. DYYZ/bhHSAIlpvu/HEUsxlzkC9NsswbCQ7dcfcuiNBrbhYV7k3AI8t46 QMnOlfhwT6jqsfN7ePV6Fwpym3B0pg==
```

In this example, the last line of output is the `RRSIG` record. `RRSIG` is the DNSSEC signature attached to the record. With the `RRSIG`, a DNS resolver determines whether a DNS response is trusted.

{{</example>}}

`Dig` can also retrieve the public key used to verify the DNS record, `DNSKEY`:

{{<example>}}

```sh
$ dig DNSKEY cloudflare.com +short
257 3 13 mdsswUyr3DPW132mOi8V9xESWE8jTo0dxCjjnopKl+GqJxpVXckHAeF+ KkxLbxILfDLUT0rAK9iUzy1L53eKGQ==
256 3 13 koPbw9wmYZ7ggcjnQ6ayHyhHaDNMYELKTqT+qRGrZpWSccr/lBcrm10Z 1PuQHB3Azhii+sb0PYFkH1ruxLhe5g==
```

A domain's DNS records are all signed with the same public key. Therefore, query for the apex domain (`cloudflare.com`) public key, not the subdomain (`www.cloudflare.com`) public key.

The DNS response includes two records:

-   `DNSKEY` record **256** is the public key called zone signing key (ZSK). ZSKs are used to verify the DNS record signatures for `A`, `MX`, `CNAME`, `SRV`, etc.
-   `DNSKEY` record **257** is called the key signing key (KSK). KSKs are used to verify the signatures of the `DNSKEY`, `CDS`, and `CDNSKEY` records.

{{</example>}}

{{<Aside type="note">}}
Details on how to verify the signatures with the public key are beyond the scope of this article.
{{</Aside>}}

When not using the `+short` option with `dig`, a DNS response is DNSSEC authenticated if the `ad` flag appears in the response header:

{{<example>}}
```sh
$ dig www.cloudflare.com
[...]
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 65326
;; flags: qr rd ra ad; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1
[...]
;; QUESTION SECTION:
;www.cloudflare.com.        IN  A
[...]
;; ANSWER SECTION:
www.cloudflare.com. 15  IN  A   198.41.215.162
www.cloudflare.com. 15  IN  A   198.41.214.162
```
{{</example>}}
___

## Troubleshoot DNSSEC validation using DNSViz

{{<Aside type="note">}}
DNSViz is a public, free online tool to visualize and help discover issues with your DNSSEC configuration and is **not** associated Cloudflare.
{{</Aside>}}

To visualize and discover potential issues with DNSSEC:

1.  Browse to [http://dnsviz.net/](http://dnsviz.net/)
2.  Enter a domain name in the text field that appears.
3.  If DNSViz has never analyzed the site before, click the **Analyze** button that appears.
4.  If the site has been analyzed by DNSViz before, click the **Update Now** button that appears.

### Example with missing or incorrect RRSIG record on authoritative nameserver

Below is an example of how dnsviz.net will display incorrect delegation when no valid DNSKEY records are provided by the authoritative nameserver to match the DS record published by the TLD nameserver: 

![Incorrect delegation when no valid DNSKEY records are provided](/images/support/troubleshoot_dnssec-example_no_rrsig.png)

___

## View the DNSSEC chain of trust with Dig

Full verification of domain signatures (for example, `cloudflare.com`) involves verifying the key signing key at the top-level domain (for example, `.com`).  

Similar verification is then performed by checking the key-signing key of `.com` at the root server level. DNSSEC root keys are distributed to DNS clients to complete the chain of trust.

When DNSSEC is enabled, a `DS` record is required at the registrar's DNS. The `DS` record contains a hash of the public key signing key as well as metadata about the key.

{{<example>}}

Use `dig` to find a `DS` record:

```sh
$ dig +short DS cloudflare.com
2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9
```

When using the `+trace` option, `dig` confirms whether an answer is returned by the nameserver for `cloudflare.com` or the nameserver for `.com`.  In this example, the `DS` record for `cloudflare.com` is returned by `e.gtld-servers.net`:

```sh
$ dig DS cloudflare.com +trace
[...]
cloudflare.com.     86400   IN  DS  2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9
[...]
com.            172800  IN  NS  e.gtld-servers.net.
[...]
;; Received 1213 bytes from 2001:502:1ca1::30#53(e.gtld-servers.net) in 37 ms

```
{{</example>}}

An easier alternative to manually running the steps above is to use the third-party tool [DNSViz](#troubleshoot-dnssec-validation-using-dnsviz).

___

## Troubleshoot DNSSEC validation with Dig

Issues occur if authoritative DNS providers are changed without updating or removing old DNSSEC records at the registrar:

{{<example>}}

```sh
$ dig A brokendnssec.net @1.0.0.1
;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 0
;; ->>HEADER<<- opcode: QUERY, status: SERVFAIL, id: 10663
```

Confirm whether a `SERVFAIL` response is related to DNSSEC by running `dig` with the `+cd` option. The `+cd` option provides DNS results without any DNSSEC validation in place.  

```sh
$ dig A brokendnssec.net @1.0.0.1 +dnssec +cd +short
104.20.49.61
104.20.48.61
```

In this example, DNSSEC is misconfigured if a proper DNS response is received when using the `+cd` option but queries using DNSSEC return a `SERVFAIL` response. This issue often happens when authoritative nameservers are changed but `DS` records are not updated. The issue can also occur if an attacker attempts to forge a response to a query.

{{</example>}}
___

## Next steps

If a problem is discovered with DNSSEC implementation, contact the domain's registrar and confirm the `DS` record matches what the authoritative DNS provider has specified. If Cloudflare is the authoritative DNS provider, follow the instructions for [configuring DNSSEC with Cloudflare](/dns/dnssec/).