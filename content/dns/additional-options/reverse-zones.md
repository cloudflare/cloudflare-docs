---
pcx-content-type: how-to
title: Reverse zones and PTR records
weight: 0
---

# Reverse zones and PTR records

Enterprise customers who control their own IP prefix(es) can set up reverse zones with PTR records to allow reverse DNS lookups.

## PTR records

PTR records specify the allowed hosts for a given IP address. They are the opposite of [**A** records](https://www.cloudflare.com/learning/dns/dns-records/dns-a-record) and used for reverse DNS lookups.

Historically, PTR records prevented outbound SMTP servers from being blocked by spam filters. However, more modern DNS records — [SPF, DKIM, and DMARC](/dns/manage-dns-records/how-to/email-records/#prevent-domain-spoofing) — provide better verifications of domain ownership.

Now, PTR records are primarily useful for those who own a dedicated IP space. They can help populate trace routes and security tools with human-readable domain names.

As PTR records are mainly used for reverse DNS lookups, they should preferably be added to reverse zones.

### Availability

Any customer can create PTR records, but only Enterprise customers can create reverse zones.

## Create a reverse zone and add a PTR record

### Availability

The following Cloudflare customers can create reverse zones (for example, `2.0.192.in-addr.arpa`):

- Enterprise customers with an IPv4 address space can add the IPv4 reverse zone for their IP space to their account, and create the required PTR records for forward resolution.
- Enterprise customers with an IPv6 address space need to contact their account team to get the IPv6 reverse zone added to their account.
- DNS Firewall customers need to contact their account team to add PTR records for the IPs used for their DNS Firewall clusters.

If your account does not meet these qualifications and you do not own the IP prefix you want to add PTR records on, contact the owner of the IP address based on a [whois lookup](https://whois.icann.org/en).

### How to

To use PTR records, you need to create a reverse DNS zone and add a PTR record for forward resolution:

1.  Within your enterprise account, click **Add site**.

2.  For your site name, use the reverse IP address:

    *   For IPv4 /24 prefixes, the pattern is:
        *   **IP prefix**: `<octet_1>.<octet_2>.<octet_3>.0/24`
        *   **Reverse zone address**: `<octet_3>.<octet_2>.<octet_1>.in-addr.arpa`
    *   For IPv4 /16 prefixes, the pattern is:
        *   **IP prefix**: `<octet_1>.<octet_2>.0.0/16`
        *   **Reverse zone address**: `<octet_2>.<octet_1>.in-addr.arpa`

         <details>
         <summary>Example</summary>
         <div>

        *   **IPv4 prefix**: `198.51.100.0/24`
        *   **Reverse zone**: `100.51.198.in-addr.arpa`

         </div>
         </details>

         {{<Aside type="warning">}}Enterprise customers can only add reverse zones for IPv4 addresses. If you want to add zones for IPv6 addresses, contact your account team.{{</Aside>}}

3.  If you are adding less than 200 PTR records, select the **Free** plan. If you are adding more, select a paid plan.

4.  Skip the rest of the onboarding process.

5.  Once finished with onboarding, go to **DNS**.

6.  For each IP within the prefix, add a PTR record using the least significant octet(s) as the subdomain.

    <details>
    <summary>Example</summary>
    <div>

    For example, you might have the following configuration:

    - **Reverse zone**: `100.51.198.in-addr.arpa`
    - **IP address**: `198.51.100.123`

    The PTR record on the subdomain would be `123`, making the full domain for forward lookup `123.100.51.198.in-addr.arpa`.

    </div>
    </details>

7.  Add the two Cloudflare nameservers provided for the zone at your Regional Internet Registry (RIR).

After this process, your reverse zone will be activated and you can perform reverse DNS lookups.
