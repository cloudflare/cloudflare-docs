---
order: 3
---

# Roughtime

[Roughtime](https://roughtime.googlesource.com/roughtime) is a simple, flexible,
and secure authenticated time protocol developed by Google. This page introduces
the key concepts of the protocol and demonstrates how to use Cloudflare's
Roughtime service to ensure your clock is always (roughly) in sync.

The "Hello, world!" of Roughtime is very simple: the client sends a request over
UDP to the server and the server responds with a signed timestamp.  To run the
protocol, you just need the server's address and public key. To get started,
download and run our Go client:

```
$ go get -u github.com/cloudflare/roughtime
$ go install github.com/cloudflare/roughtime...
$ getroughtime -ping roughtime.cloudflare.com:2002 -pubkey gD63hSj3ScS+wuOeGrubXlq35N1c5Lby/S+T7MNTjxo=
ping response: 2018-09-12 16:59:39.141 -0700 PDT ±1s (in 10ms)
```

That's it &mdash; authenticated time! Why is this interesting and what is it about
the protocol that makes it "rough"?  Proceed to learn more about Roughtime and
its security features with a more in-depth look at our
[blog post](https://blog.cloudflare.com/roughtime/) about the launch of
Cloudflare Roughtime.
