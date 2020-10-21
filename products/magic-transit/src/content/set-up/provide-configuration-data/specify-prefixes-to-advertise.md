---
title: Specify prefixes to advertise
alwaysopen: true
order: 0
hidden: false
---

## Specify prefixes to advertise

List all prefixes and the ASNs from which you want them to originate.

When specifying prefixes, observe these guidelines:

* Prefixes must support at least 256 hosts (/24 in classless inter-domain routing [CIDR] notation).
* Internet Routing Registry entries and Letters of Authorization must match the prefixes and originating prefixes you submit to Cloudflare.
* When using contiguous prefixes, specify aggregate prefixes where possible.
* When using Route Origin Authorizations (ROAs) to sign routes for [resource public key infrastructure (RPKI)](https://tools.ietf.org/html/rfc8210), the prefix and originating ASN must match the onboarding submission.
* If you do not own an ASN, you may use our Cloudflare Customer ASN (AS209242) as the originating AS.

For an example prefix configuration, refer to this table:

<table>
  <thead>
    <tr>
      <td colspan="2" ><strong>List of prefixes to advertise</strong></td>
    </tr>
    <tr>
      <td><strong>Prefix</strong></td>
      <td><strong>Originating AS</strong></td>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>103.21.244.0/23</td>
      <td>AS209242</td>
    </tr>
    <tr>
      <td>131.0.72.0/22</td>
      <td>AS395747</td>
    </tr>
    <tr>
      <td>103.21.245.0/24</td>
      <td>AS395747</td>
    </tr>
  </tbody>
</table>

<Aside>

When customers supply their own ASN, Cloudflare prepends the main Cloudflare ASN (AS13335) to the BGP AS_PATH. For example, if the customer ASN is AS64496, anyone directly peering with Cloudflare sees the path as `13335 64496`.

If you do not have an ASN or do not want to bring your ASN to Cloudflare, you can use the Cloudflare Customer ASN (AS209242). In this case, the path becomes `13335 209242`.

</Aside>
