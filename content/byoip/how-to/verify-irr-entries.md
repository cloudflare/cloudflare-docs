---
title: Verify IRR entries
pcx_content_type: reference
---

# Verify IRR entries

Verify your Internet Routing Registry (IRR) entries to ensure that the IP prefixes Cloudflare advertises for you match the correct autonomous system numbers (ASNs).

Each IRR entry record must include the following information:

- **Route:** Each IP prefix Cloudflare advertises for you.
- **Origin ASN:** Your ASN, or if you do not have your own ASN, the Cloudflare ASN (AS209242).
- **Source:** The name of the routing registry, for example, AFRINIC, APNIC, ARIN, RADB, RIPE, or NTT.

## Add or update IRR entries

[Add or update IRR entries](/byoip/best-practices/irr-entries/) when they meet any of these criteria:

- The entry is missing.
- The entry is incomplete or inaccurate — for example, when the route object does not show the correct origin.
- The entry is complete but requires updating — for example, when they correspond to supernets but need to correspond to subnets used in Magic Transit.

### Verify IRR entries for exact prefixes

You are strongly encouraged to verify IRR entries for the exact prefixes you'll be onboarding with Cloudflare. However, IRR entries for less specific prefixes are acceptable as long as you understand and accept the following risk: if you modify your IRR entries in the future (for example, by changing your ASN) and the IRR entry for the supernet no longer matches the prefix/origin mapping in your Magic Transit configuration, the prefix will have reduced reachability due to networks Cloudflare peers with automatically filtering the prefix. Having more-specific IRR entries helps minimize (but not entirely remove) this risk.

## IRR entry verification methods

To verify your prefix and ASN route, use the tools and methods outlined in this table:

{{<table-wrap>}}<table>

  <thead>
    <tr>
      <th>Data to verify</th>
      <th>Tool</th>
      <th>Method</th>
      <th>Output</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Subnet prefix IP<br/>for the ASN</td>
      <td><a href=" http://irrexplorer.nlnog.net">IRR Explorer</a></td>
      <td>Search for the subnet prefix IP, for example, 162.211.156.0/24.</td>
      <td>List of ASN numbers, source (route registry), and any associated errors.</td>
    </tr>
    <tr>
      <td>ASN for the<br/>subnet prefix</td>
      <td><span style="white-space: nowrap"><a href=" http://irrexplorer.nlnog.net">IRR Explorer</a></span></td>
      <td><span style="white-space: nowrap">Search for the ASN, for example AS209242.</span></td>
      <td><span style="white-space: nowrap">List of prefixes, source, and any associated errors.</span></td>
    </tr>
    <tr>
      <td>Your origin ASN<br/>and routing data</td>
      <td>WHOIS lookup</td>
      <td>
        <p>In a terminal, use this {{<code>}}whois{{</code>}} command, substituting your network prefix for <em>network-prefix</em>:</p>
        <p>{{<code>}}whois -h rr.ntt.net network-prefix{{</code>}}</p>
        <p>The host {{<code>}}rr.ntt.net{{</code>}} is the primary server for the Global IP network.</p>
      </td>
      <td>IRR route, origin, and source information.</td>
    </tr>
  </tbody>
</table>{{</table-wrap>}}

### WHOIS output example

The `<IRR entry section>` in the WHOIS output shows the correct IRR entry information for the specified network. In this example, the network prefix is 1.1.1.0/24, and the output includes the route, origin ASN, and route registry, which in this example is APNIC:

```txt
user@xxt32z conduit-qs-config % whois -h rr.ntt.net 1.1.1.0/24
route:          1.1.1.0/24
<RPKI section>
descr:          RPKI ROA for 1.1.1.0/24
remarks:        This route object represents routing data retrieved from the RPKI
remarks:        The original data can be found here: https://rpki.gin.ntt.net/r/AS13335/1.1.1.0/24
remarks:        This route object is the result of an automated RPKI-to-IRR conversion process.
remarks:        maxLength 24
origin:         AS13335
mnt-by:         MAINT-NTTCOM-RPKI
changed:        job@ntt.net 20200913
source:         RPKI  # Trust Anchor: apnic

<IRR entry section>
route:          1.1.1.0/24
origin:         AS13335
descr:          APNIC Research and Development
                6 Cordelia St
mnt-by:         MAINT-AU-APNIC-GM85-AP
last-modified:  2018-03-16T16:58:06Z
source:         APNIC
```

{{<Aside type="note" header="Note:">}}

WHOIS output also shows the RPKI entry information for prefix IP addresses. When your WHOIS output only contains an RPKI entry, you must add the IRR entry.

For more information, see [best practices for IRR entry updates](/byoip/best-practices/irr-entries/).

{{</Aside>}}
