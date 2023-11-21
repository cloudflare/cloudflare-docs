---
pcx_content_type: how-to
title: Reverse zones and PTR records
weight: 0
---

# Reverse zones and PTR records

If you control your own IP prefix(es), you can set up reverse zones with PTR records to allow reverse DNS lookups.

## PTR records

PTR records specify the allowed hosts for a given IP address. They are the opposite of [A records](https://www.cloudflare.com/learning/dns/dns-records/dns-a-record) and used for reverse DNS lookups.

Historically, PTR records prevented outbound SMTP servers from being blocked by spam filters. However, more modern DNS records — [SPF, DKIM, and DMARC](/dns/manage-dns-records/how-to/email-records/#prevent-domain-spoofing) — provide better verifications of domain ownership.

Now, PTR records are primarily useful for those who own a dedicated IP space. They can help populate trace routes and security tools with human-readable domain names.

As PTR records are mainly used for reverse DNS lookups, they should preferably be added to reverse zones.

## Availability

The following Cloudflare customers can create reverse zones.

- Customers with an IPv4 or IPv6 address space can add the IPv4 or IPv6 reverse zone for their IP space to their account, and create the required PTR records for forward resolution.
- DNS Firewall customers need to contact their account team to add PTR records for the IPs used for their DNS Firewall clusters.

If your account does not meet these qualifications and you do not own the IP prefix you want to add PTR records on, contact the owner of the IP address based on a [whois lookup](https://whois.icann.org/en).

## Set up a reverse zone

To set up a reverse zone, you need to create a reverse DNS zone and add PTR records for forward resolution.

### Step 1 - Create a reverse DNS zone

1. Within your account, click **Add site**.

2. For your site name, use the reverse IP address:

    - For IPv4 /24 prefixes, the pattern is:
        - **IP prefix**: `<octet_1>.<octet_2>.<octet_3>.0/24`
        - **Reverse zone address**: `<octet_3>.<octet_2>.<octet_1>.in-addr.arpa`
    - For IPv4 /16 prefixes, the pattern is:
        - **IP prefix**: `<octet_1>.<octet_2>.0.0/16`
        - **Reverse zone address**: `<octet_2>.<octet_1>.in-addr.arpa`

        {{<details header="Example">}}

- **IPv4 prefix**: `198.51.100.0/24`
- **Reverse zone**: `100.51.198.in-addr.arpa`

        {{</details>}}
    - For IPv6, consider the following examples:
        {{<example>}}
- **IPv6 prefix**: `2001:DB8::0/32`
- **Reverse zone**: `8.b.d.0.1.0.0.2.ip6.arpa`
        {{</example>}}
        {{<example>}}
- **IPv6 prefix**: `2001:DB8::0/48`
- **Reverse zone**: `0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa`
        {{</example>}}

3. If you are adding less than 200 PTR records, select the **Free** plan. If you are adding more, select a paid plan.

4. Skip the rest of the onboarding process.

### Step 2 - Add PTR records

1. Go to **DNS** > **Records**.

2. For each IP within the prefix, add a PTR record using the least significant octet(s) as the subdomain.

    {{<details header="IPv4 example">}}

    Suppose you have the following configuration:

- **Reverse zone**: `100.51.198.in-addr.arpa`
- **IP address**: `198.51.100.123`

The subdomain for the PTR record would be `123`, making the full domain for forward lookup `123.100.51.198.in-addr.arpa`.

    {{</details>}}

    {{<details header="IPv6 example">}}

    Suppose you have the following configuration:

- **Reverse zone**: `0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa`
- **IP address**: `2001:DB8::5`

The subdomain for the PTR record would be `5.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0`, making the full domain for forward lookup `5.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.0.8.b.d.0.1.0.0.2.ip6.arpa`.

    {{</details>}}

3. Add the two Cloudflare nameservers provided for the zone at your Regional Internet Registry (RIR).

After this process, your reverse zone will be activated and you can perform reverse DNS lookups.

## Other resources

While setting up reverse zones, the following third-party tools may be useful:

- [Reverse DNS record generator](https://www.whatsmydns.net/reverse-dns-generator)
- [IPv6 subnet calculator](https://www.internex.at/de/toolbox/ipv6)