---
title: User Guide
pcx-content-type: reference
order: 0
---

# Using Cloudflare's Secure Time Service

[Chrony](https://chrony.tuxfamily.org/doc/devel/chrony.conf.html) and [NTPSec](https://www.ntpsec.org/) have support for NTS. Please read the relevant documentation for guidance on setting them up to point to our time service, `time.cloudflare.com`.

## Chrony

To use NTS with Chrony, the "nts" option should be provided to the server in `chrony.conf`, as well as an option to save the NTS cookie for faster startup.

```
server time.cloudflare.com iburst nts
ntsdumpdir /var/lib/chrony
```

These two lines have been integrated into a complete example below. Your distribution may use more options or differing paths.

```
server time.cloudflare.com iburst nts
ntsdumpdir /var/lib/chrony

initstepslew 1000 time.cloudflare.com
driftfile /var/lib/chrony/chrony.drift
keyfile /var/lib/chrony/chrony.keys

rtconutc
```

The status can be confirmed with `chronyc authdata`.

```
$ sudo chronyc authdata
Name/IP address             Mode KeyID Type KLen Last Atmp  NAK Cook CLen
=========================================================================
time.cloudflare.com          NTS     1   15  256  268    0    0    8  100
```

## Time Services Mailing List

If you would like to hear about the development of additional clients,
updates on our service, or would like to announce that your client
supports NTS, please email `time-services@cloudflare.com` to be added
to our distribution list.
