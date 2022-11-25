---
pcx_content_type: reference
title: Extended DNS error codes
layout: list
---

# Extended DNS error codes

{{<content-column>}}

[Extended DNS Error Codes](https://www.rfc-editor.org/rfc/rfc8914.html) is a method to return additional information about the cause of DNS errors. As there are many reasons why a DNS query might fail, it became necessary to provide additional information on the exact cause of an error.

1.1.1.1 supports Extended DNS Error Codes. Below is a list of error codes 1.1.1.1 returns, what they mean, and steps you may want to take to resolve the issue.

{{</content-column>}}

{{<table-wrap>}}

<table>
    <thead>
        <tr>
            <th style="width:5%">Code number</th>
            <th style="width:20%">Code name</th>
            <th style="width:35%">Example output</th>
            <th style="width:40%">Next steps</th>
        </tr>
    </thead>
    <tbody>
        <tr>
            <td>1</td>
            <td><p>Unsupported DNSKEY Algorithm</p></td>
            <td><code>EDE: 1 (Unsupported DNSKEY Algorithm): (failed to verify example.com. A: unsupported key size, DNSKEY example.com., id = 12345)</code></td>
            <td>The domain did not pass DNSSEC validation. Check which <a href="/1.1.1.1/encryption/dnskey/">signature key algorithm</a> your website uses and confirm it is supported by 1.1.1.1.</td>
        </tr>
        <tr>
            <td>2</td>
            <td>Unsupported DS Digest Type</td>
            <td><code>EDE: 2 (Unsupported DS Digest Type): (no supported DS digest type for example.com.)</code></td>
            <td>The domain did not pass DNSSEC validation due to an unsupported digest type on the DS record. If none of the provided DS records are supported, the domain will fail to resolve. Make sure to <a href="/dns/additional-options/dnssec/">add a supported DS record</a> with your registrar.</td>
        </tr>
        <tr>
            <td>3</td>
            <td>Stale Answer</td>
            <td><code>EDE: 3 (Stale Answer)</code></td>
            <td>This is a silent error. It notifies that the DNS resolver could only return stale data. If the issue persists reach out on the 1.1.1.1 <a href="https://community.cloudflare.com/c/reliability/dns-1111/47">community forum</a>.</td>
        </tr>
        <tr>
            <td>6</td>
            <td>DNSSEC Bogus</td>
            <td>
                <code>EDE: 6 (DNSSEC Bogus): (proof of non-existence of example.com. A)</code>
                <br/><br/>
                <code>EDE: 6 (DNSSEC Bogus): (found duplicate CNAME records for example.com. (1 duplicate RRs))</code>
            </td>
            <td>This domain did not pass DNSSEC validation. The signatures for the target record, or the proof of non-existence of the target records, are invalid. Check your <a href="/dns/">DNS configuration</a>.</td>
        </tr>
        <tr>
            <td>7</td>
            <td>Signature Expired</td>
            <td><code>EDE: 7 (Signature Expired): (for DNSKEY example.com., id = 12345: RRSIG example.com., expiration = 123456)</code></td>
            <td>This domain did not pass DNSSEC validation due to an expired signature. Make sure your zone is signed with valid <a href="https://support.cloudflare.com/hc/articles/360021111972">DNSSEC signatures</a>.</td>
        </tr>
        <tr>
            <td>8</td>
            <td>Signature Not Yet Valid</td>
            <td><code>EDE: 8 (Signature Not Yet Valid): (for DNSKEY example.com., id = 12345: RRSIG example.com., inception = 12345)</code></td>
            <td>This domain did not pass DNSSEC validation. Make sure your zone is signed with valid <a href="https://support.cloudflare.com/hc/articles/360021111972">DNSSEC signatures</a>.</td>
        </tr>
        <tr>
            <td>9</td>
            <td>DNSKEY Missing</td>
            <td><code>EDE: 9 (DNSKEY Missing): (no SEP matching the DS found for example.com.)</code></td>
            <td>This domain did not pass DNSSEC validation. It does not have a SEP DNSKEY that matches the set of DS records at the registry. Make sure to either sign the zone using keys that match the current DS set, or <a href="/dns/additional-options/dnssec/">add the missing DS records</a> with your registrar.</td>
        </tr>
        <tr>
            <td>10</td>
            <td>RRSIGs Missing</td>
            <td><code>EDE: 10 (RRSIGs Missing): (for DNSKEY example.com., id = 12345)</code></td>
            <td>1.1.1.1 was unable to retrieve Resource Record Signatures (RRSigs) to verify the authenticity of the records. Check your <a href="/dns/">DNS configuration</a> and the response code. If the response code is not <code>SERVFAIL</code> this error indicates that there is a key rollover at the zone, or a key that is only used to sign the Zone Signing Key (ZSK).</td>
        </tr>
        <tr>
            <td>11</td>
            <td>No Zone Key Bit Set</td>
            <td><code>EDE: 11 (No Zone Key Bit Set): (for DNSKEY example.com., id = 12345)</code></td>
            <td>This domain did not pass DNSSEC validation. The zone's SEP DNSKEY must <a href="https://datatracker.ietf.org/doc/html/rfc4035#section-5.3.1">set a Zone Key flag</a>. Check your <a href="/dns/additional-options/dnssec/">DNSSEC configuration</a> or DNSSEC's <a href="https://support.cloudflare.com/hc/articles/360021111972">troubleshooting guide</a>.</td>
        </tr>
        <tr>
            <td>12</td>
            <td>NSEC Missing</td>
            <td><code>EDE: 12 (NSEC Missing): failed to verify an insecure referral proof for example.com</code></td>
            <td>This domain did not pass DNSSEC validation. The upstream nameserver did not include a valid proof of non-existence for the target name. Make sure the zone is <a href="https://support.cloudflare.com/hc/articles/360021111972">signed with DNSSEC</a> and has valid <a href="https://www.cloudflare.com/dns/dnssec/dnssec-complexities-and-considerations/">NSEC/NSEC3 records</a>.</td>
        </tr>
        <tr>
            <td>13</td>
            <td>Cached Error</td>
            <td><code>EDE: 13 (Cached Error)</code></td>
            <td>1.1.1.1 returned a cached error. If this issue persists, reach out to the <a href="https://community.cloudflare.com/c/reliability/dns-1111/47">community forum</a>.</td>
        </tr>
        <tr>
            <td>22</td>
            <td>No Reachable Authority</td>
            <td><code>EDE: 22 (No Reachable Authority): (at delegation example.com.)</code></td>
            <td>1.1.1.1 could not reach some or all of the authoritative nameservers (or they potentially refused to resolve). This can occur if the authoritative nameservers are overloaded or temporarily unavailable. If this issue persists, reach out to the <a href="https://community.cloudflare.com/c/reliability/dns-1111/47">community forum</a>.</td>
        </tr>
        <tr>
            <td>23</td>
            <td>Network Error</td>
            <td><code>EDE: 23 (Network Error): (1.1.1.1:53 rcode=SERVFAIL for example.com. A)</code></td>
            <td>1.1.1.1 could not determine a network path to the upstream nameservers, or the nameserver did not respond. If this issue persists, reach out to the <a href="https://community.cloudflare.com/c/reliability/dns-1111/47">community forum</a>.</td>
        </tr>
    </tbody>
</table>

{{</table-wrap>}}