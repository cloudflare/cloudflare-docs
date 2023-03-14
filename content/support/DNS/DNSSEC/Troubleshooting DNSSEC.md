---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/360021111972-Troubleshooting-DNSSEC
title: Troubleshooting DNSSEC
---

# Troubleshooting DNSSEC



## Testing DNSSEC with Dig

_Dig_ is a command-line tool to query a nameserver for DNS records. For instance, _dig_ can ask a DNS resolver for the IP address of _www.cloudflare.com_ (The option _+short_ outputs the result only)_:_


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com +short</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">198.41.215.162</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">198.41.214.162</span></div></span></span></span></code></pre>{{</raw>}}

Use _dig_ to verify DNSSEC records.  In the example below, the last line of output is the _RRSIG record_.  _RRSIG_ is the DNSSEC signature attached to the record. With the _RRSIG_, a DNS resolver determines whether a DNS response is trusted.


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com +dnssec +short</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">198.41.214.162</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">198.41.215.162</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">A 13 3 300 20180927180434 20180925160434 35273 cloudflare.com. DYYZ/bhHSAIlpvu/HEUsxlzkC9NsswbCQ7dcfcuiNBrbhYV7k3AI8t46 QMnOlfhwT6jqsfN7ePV6Fwpym3B0pg==</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

_Dig_ also retrieves the public key used to verify the DNS record.  A domain's DNS records are all signed with the same public key.  Therefore, query for the root domain's public key, not the subdomain's public key: 


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig DNSKEY cloudflare.com +short</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">257 3 13 mdsswUyr3DPW132mOi8V9xESWE8jTo0dxCjjnopKl+GqJxpVXckHAeF+ KkxLbxILfDLUT0rAK9iUzy1L53eKGQ==</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">256 3 13 koPbw9wmYZ7ggcjnQ6ayHyhHaDNMYELKTqT+qRGrZpWSccr/lBcrm10Z 1PuQHB3Azhii+sb0PYFkH1ruxLhe5g==</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

The DNS response includes two records:

-   _DNSKEY record_ **256** is the public key called Zone-signing-key, used to verify the DNS record signatures for _A, MX, CNAME, SRV_, etc.
-   _DNSKEY record_ **257** is called the Key-Signing Key, used to verify the signatures of the _DNSKEY, CDS, and CDNSKEY records._

{{<Aside type="note">}}
Details on how to verify the signatures with the public key are beyond
the scope of this article.
{{</Aside>}}

When not using the _+short_ option with _dig_, a DNS response is DNSSEC authenticated if the **ad** flag appears in the response header:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig www.cloudflare.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[...]</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: NOERROR, id: 65326</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; flags: qr rd ra ad; QUERY: 1, ANSWER: 2, AUTHORITY: 0, ADDITIONAL: 1</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[...]</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; QUESTION SECTION:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;www.cloudflare.com.        IN  A</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[...]</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; ANSWER SECTION:</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www.cloudflare.com. 15  IN  A   198.41.215.162</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">www.cloudflare.com. 15  IN  A   198.41.214.162</span></div></span></span></span></code></pre>{{</raw>}}

___

## Troubleshooting DNSSEC Validation using DNSViz

{{<Aside type="info">}}
DNSViz is a public, free online tool to visualize and help discover
issues with your DNSSEC configuration. It is **not** associated
Cloudflare. Only [contact Cloudflare
Support](https://support.cloudflare.com/hc/articles/200172476) if you
have issues with your DNSSEC configuration.
{{</Aside>}}

To visualize and discover potential issues with DNSSEC:

1.  Browse to [http://dnsviz.net/](http://dnsviz.net/)
2.  Enter a domain name in the text field that appears.
3.  If DNSViz has never analyzed the site before, click the **Analyze** button that appears.
4.  If the site has been analyzed by DNSViz before, click the **Update Now** button that appears.

### Example without DNSSEC

Below is an example of a working domain without DNSSEC as diagrammed by dnsviz.net:

![Working domain without DNSSEC](/support/static/troubleshoot_dnssec-example_no_dnssec.png)

### Example with correct DNSSEC

Below is an example of a domain with functioning DNSSEC records between the TLD nameservers and the authoritative nameservers for _cloudflare.com:_

![Domain with functioning DNSSEC records](/support/static/troubleshoot_dnssec-example_correct_dnssec.png)

### Example with missing or incorrect RRSIG record on authoritative nameserver

Below is an example of how dnsviz.net will display incorrect delegation when no valid DNSKEY records are provided by the authoritative nameserver to match the DS record published by the TLD nameserver: 

![Incorrect delegation when no valid DNSKEY records are provided](/support/static/troubleshoot_dnssec-example_no_rrsig.png)

___

## Viewing the DNSSEC Chain of Trust with Dig

Full verification of domain signatures (for example: _cloudflare.com_) involves verifying the key-signing key at the top-level-domain (for example: _.com_).  Similar verification is then performed by checking the key-signing key of _.com_ at the root server level. DNSSEC root keys are distributed to DNS clients to complete the trust chain.

When DNSSEC is enabled, a _DS record_ is required at the registrar's DNS. The _DS record_ contains a hash of the public key-signing key as well as metadata about the key.

Use _dig_ to find a _DS record_:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig +short DS cloudflare.com</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9</span></div></span></span></span></code></pre>{{</raw>}}

When using the _+trace_ option, _dig_ confirms whether an answer is returned by the nameserver for _cloudflare.com_ or the nameserver for _.com_.  In this example, the _DS record_ for _cloudflare.com_ is returned by e.gtld-servers.net:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig DS cloudflare.com +trace</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[...]</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">cloudflare.com.     86400   IN  DS  2371 13 2 32996839A6D808AFE3EB4A795A0E6A7A39A76FC52FF228B22B76F6D6 3826F2B9</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[...]</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">com.            172800  IN  NS  e.gtld-servers.net.</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">[...]</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; Received 1213 bytes from 2001:502:1ca1::30#53(e.gtld-servers.net) in 37 ms</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">
</span></div></span></span></span></code></pre>{{</raw>}}

An easier alternative to manually running all the steps above is to use the third-party [DNSViz online tool](http://dnsviz.net/). Refer to further details on [troubleshooting DNSSEC Validation using DNSViz](https://support.cloudflare.com/hc/en-us/articles/360021111972#TroubleshootingDNSSEC-TroubleshootingDNSSECValidationusingDNSViz) or an example of [DNSSEC results of cloudflare.com via DNSViz](http://dnsviz.net/d/cloudflare.com/dnssec/).

___

## Troubleshooting DNSSEC Validation with Dig

Issues occur if authoritative DNS providers are changed without updating or removing old DNSSEC records at the registrar:


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig A brokendnssec.net @1.0.0.1</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; flags: qr rd ra; QUERY: 1, ANSWER: 0, AUTHORITY: 0, ADDITIONAL: 0</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">;; -&gt;&gt;HEADER&lt;&lt;- opcode: QUERY, status: SERVFAIL, id: 10663</span></div></span></span></span></code></pre>{{</raw>}}

Confirm whether a _SERVFAIL_ response is related to DNSSEC by running _dig_ with the _+cd_ option. The _+cd_ option provides DNS results without any DNSSEC validation in place.  


{{<raw>}}<pre class="CodeBlock CodeBlock-with-rows CodeBlock-scrolls-horizontally CodeBlock-is-light-in-light-theme CodeBlock--language-txt" language="txt"><code><span class="CodeBlock--rows"><span class="CodeBlock--rows-content"><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">$ dig A brokendnssec.net @1.0.0.1 +dnssec +cd +short</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">104.20.49.61</span></div></span><span class="CodeBlock--row"><span class="CodeBlock--row-indicator"></span><div class="CodeBlock--row-content"><span class="CodeBlock--token-plain">104.20.48.61</span></div></span></span></span></code></pre>{{</raw>}}

In the above example, DNSSEC is misconfigured if a proper DNS response is received when using the _+cd_ option but queries using DNSSEC return a _SERVFAIL_ response_._ This issue often happens when authoritative nameservers are changed but _DS records_ are not updated.  The issue can also occur if an attacker attempts to forge a response to a query. 

___

## Next steps

If a problem is discovered with DNSSEC implementation, contact the domain's registrar and confirm the _DS record_ matches what the authoritative DNS provider has specified. If Cloudflare is the authoritative DNS provider, follow the instructions for [configuring DNSSEC with Cloudflare](https://support.cloudflare.com/hc/articles/360006660072).

___

## Related resources

-   [How DNSSEC works](https://www.cloudflare.com/dns/dnssec/how-dnssec-works/)
-   [DNS security](https://www.cloudflare.com/learning/dns/dns-security/)
-   [Configuring DNSSEC with Cloudflare](/dns/additional-options/dnssec)
