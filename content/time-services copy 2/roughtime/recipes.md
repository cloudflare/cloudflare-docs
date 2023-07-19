---
pcx_content_type: tutorial
title: Use Roughtime
weight: 3
---

# Use Roughtime

There are various ways you can use Roughtime to keep your clock in sync. These recipes use [Cloudflare's Go package](https://github.com/cloudflare/roughtime), which is based on Google's [Go
client](https://roughtime.googlesource.com/roughtime/+/master/go/client/).

The protocol is also implemented in [C++](https://roughtime.googlesource.com/roughtime/+/master), [Rust](https://github.com/int08h/roughenough), and
[Java](https://github.com/int08h/nearenough).

## Client configuration

The client configuration consists of a list of named Roughtime servers
formatted as a JSON object. For example:

```json
{
  "servers": [
    {
      "name": "Cloudflare-Roughtime",
      "publicKeyType": "ed25519",
      "publicKey": "gD63hSj3ScS+wuOeGrubXlq35N1c5Lby/S+T7MNTjxo=",
      "addresses": [
        {
          "protocol": "udp",
          "address": "roughtime.cloudflare.com:2002"
        }
      ]
    }
  ]
}
```

It includes each server's _root public key_. When the server starts, it
generates an _online_ public/secret key pair. The root secret key is used to create a _delegation_ for the online public key and the online secret key is used to sign the response. 

The delegation serves the same function as a traditional [X.509 certificate](https://en.wikipedia.org/wiki/X.509) on the web. The client first uses the root public key to verify the delegation, then uses the online public key to verify the response.

Because the response is _auditable_, the protocol makes each client accountable to provide accurate time.

The configuration also encodes the type of signature algorithm used by the
server (currently only [Ed25519](https://en.wikipedia.org/wiki/EdDSA) is supported). Lastly, the configuration contains a list of addresses where the service can be reached and which transport protocol to use to reach them (currently only UDP is supported).

## TLS

A good starting example would be to sync a TLS client or server using a single Roughtime server. That would involve computing the time difference between our clock and the Roughtime sever's. 

The first step is to load the configuration file (be sure to
import `github.com/cloudflare/roughtime`):

```go
servers, skipped, err := roughtime.LoadConfig("roughtime.config")
```

In this example, the variable `servers` is the list of valid server configurations parsed from the input file. The variable `skipped` indicates the number of servers that were skipped, for example, if the signature algorithm or transport protocol was not supported.

Next, we would get the system time and query the first server in the list:

```go
t0 := time.Now()
rt, err := roughtime.Get(&servers[0], attempts, timeout, nil)
```

This sends a request to the server and verifies the response. The variable `rt` is of type `*roughtime.Roughtime` and represents the result of the query. The inputs are:

1.  The server's configuration.
2.  The number of attempts to dial the server.
3.  The time to wait for each dial attempt.
4.  An optional `*roughtime.Roughtime`, the result of a prior query.

If the last parameter is provided, then it's used generate the nonce for the
request (more on this later).

The `crypto/tls` package allows the user to
[specify a callback](https://golang.org/pkg/crypto/tls/#Config) for the current time to use when validating certificates, session tickets, etc. You can compute this callback as follows:

```go
t1, radius := rt.Now()
delta := t1.Sub(t0.Now())
now := func() time.Time {
  return time.Now().Add(delta)
}
```

The variable `t1` is the time reported by the server and `radius` is the server's uncertainty radius.

For a full working example, check out our
[GitHub](https://github.com/cloudflare/roughtime/blob/master/recipes/tls.go).

## Desktop alerts

A more general way to use Roughtime is to create desktop alerts that warn you when your clock is skewed. 

On Ubuntu GNU/Linux, you can do something like this:

```go
skew := time.Duration(math.Abs(float64(delta)))
if skew > 10*time.Second {
  summary := "Check your clock!"
  body := fmt.Sprintf("%s says it's off by %v.", servers[0].Name, skew)
  cmd := exec.Command("notify-send", "-i", "clock", summary, body)
  if err := cmd.Run(); err != nil {
    // error handling ...
  }
}
```

For a full working example, check out our [GitHub](https://github.com/cloudflare/roughtime/tree/master/recipes/alerter.go) (tested on Ubuntu 18.04). You would run this program as a cron job to periodically check that your clock is in sync.

## Using multiple sources

Using multiple sources for Roughtime is easy (and highly recommended):

```go
t0 := time.Now()
res := roughtime.Do(servers, attempts, timeout, nil)
```

The first parameter is a sequence of servers and the remaining parameters are the same as in `roughtime.Get()`. This queries each server in the sequence `servers` in order. The output `res` is a slice the same length as `servers`.

Each element represents the result of the query to the server. If the query was successful, then the result contains the server's time. If unsuccessful, then the result contains the error that occurred. To compute the average difference between your clock and the valid responses:

```go
thresh := 10 * time.Second
delta, err := roughtime.AvgDeltaWithRadiusThresh(res, t0, thresh)
```

This rejects responses whose uncertainty radii exceed 10 seconds. An error will be returned if there were no valid responses.

### Auditing Your Sources

Function `roughtime.Do()` chains together valid responses, generating each nonce using the server's response in the last successful query. As we discuss in more detail in the [blog](https://blog.cloudflare.com/roughtime/), linking queries together in this manner results in cryptographic proof that the queries were made in order. To verify that the results have this property, you can do the following:

```go
chain := roughtime.NewChain(results)
ok, err := chain.Verify(nil)
if err != nil || !ok {
  // error handling ...
}
```

The variable `chain` is a structure that contains the first successful query in `results`. It has a field, `chain.Next`, that points to the next successful query. The input parameter to `Verify()` allows you to use a previous result as a starting point for verifying the chain. For example, if `chain.Verify(nil)` is valid, then `chain.Next.Verify(chain.Roughtime)` will be valid, too.

### Being Verbose

It is possible to have `roughtime.Do()` output useful information as it executes its queries. To do so, invoke `roughtime.SetLogger()` to set a logger. For example:

```go
roughtime.SetLogger(log.New(os.Stdout, "", 0))
```