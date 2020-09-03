---
title: Secure Time Service
weight: 10
---

## NTS Client

You can use time.cloudflare.com as the source of time for all your devices today with NTP, while NTS clients are still under development. 

Cloudflare is working on an NTS client. If you would like to get updates about our NTS client development, email us at `time-services@cloudflare.com` to join the mailing list. 

There are currently a few organizations working on NTS Client [implementations](https://tools.ietf.org/html/draft-ietf-ntp-using-nts-for-ntp-19#page-30). [NTPsec](https://www.ntpsec.org/) is one of the organizations that includes experimental support for NTS; go to https://docs.ntpsec.org/latest/NTS-QuickStart.html for more information on NTPsec's implementation of an NTS client. 

## NTS Server 

Cloudflare's time service allows users to connect to our NTP server that supports Network Time Security, enabling users to obtain time in an authenticated manner. Anyone with an NTS supported client can obtain secure time by pointing their client to time.cloudflare.com:1234. Our NTS server supports both NTP and NTS, so while you can use any NTP client to get unauthenticated time, you can also use publicly available NTS clients to get secure time. 

Cloudflare’s time service will allow users to connect to our Network Time Protocol (NTP) server that supports Network Time Security (NTS), enabling users to obtain time in an authenticated manner. Anyone with an NTS supported client can obtain secure time by pointing their client to `time.cloudflare.com:1234`. 

