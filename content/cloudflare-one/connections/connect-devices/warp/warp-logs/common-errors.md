---
pcx_content_type: reference
title: Common errors
weight: 3
---

# Common errors

## daemon.log

How to read daemon logs:

The last connection event is likely not the correct one in the daemon.log file
Because people frequently turn off/on the toggle, the reported bug is likely further up in the log. When looking through the daemon.log file, a good rule of thumb is to find the last occurrence of "warp::warp: WARP status: Connecting" and if it looks like this is after they recovered, go to the previous entry (2nd to last) and start reading down the log file.

#### Happy eyeballs error

```txt
ERROR warp::warp::happy_eyeballs: Happy eyeballs error Custom { kind: NotConnected, error: "" }
```

#### Numerous route changes

```txt
DEBUG warp::warp_service] Routes changed:
    Added; Interface: 8; Destination: 10.133.39.169/32; Next hop: 100.64.0.2;
    Added; Interface: 8; Destination: 10.133.51.38/32; Next hop: 100.64.0.2;
```

#### Invalid peer certificate

```txt
WARN main_loop: warp::warp_api::common: Couldn't fetch defaults from API e=ReqwestError(reqwest::Error { kind: Request, url: Url { scheme: "https", cannot_be_a_base: false, username: "", password: None, host: Some(Domain("zero-trust-client.cloudflareclient.com.")), port: None, path: "/v0/client_config", query: None, fragment: None }, source: hyper::Error(Connect, Custom { kind: Other, error: Custom { kind: InvalidData, error: InvalidCertificateData("invalid peer certificate: UnknownIssuer") } }) })
```

#### Broken pipe

```txt
WARN warp::dns::doh] DoH request failed: hyper::Error(Io, Kind(BrokenPipe)),
```

#### TCP connect error

```txt
WARN warp::dns::doh] DoH request failed: hyper::Error(Connect, ConnectError("tcp connect error",
```

### ps.txt

### route.txt
