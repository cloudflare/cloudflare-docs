---
order: 3
---

# Scaling and benchmarking

Cloudflare’s Keyless SSL technology was designed to scale to accommodate any sized workload using vertical and horizontal scaling, and pre-computation techniques wherever possible, e.g., ECDSA. The goals of the architectural design of the key server are to minimize latency while maximizing signing operations per second.

Each key server uses a worker pool model, with incoming client connections handled by its own pair of reader/writer goroutines and cryptographic work done in separate worker goroutines pulled from a a global pool.

Where needed, multiple key servers can be deployed and balanced between using your preferred ingress load balancing configuration; for full HA, you should make sure to deploy sufficient key servers to handle twice the expected workload.

--------

## Key type

Key servers support both ECDSA and RSA keys, though signatures for RSA are an [order of magnitude more expensive](https://blog.cloudflare.com/ecdsa-the-digital-signature-algorithm-of-a-better-internet/) to compute and thus the type of keys used must be taken into consideration when planning the number of key servers in your deployment.  (See [Cloudflare’s blog post on ECDSA](https://blog.cloudflare.com/ecdsa-the-digital-signature-algorithm-of-a-better-internet/) for additional detail on ECDSA vs. RSA.)

Because ECDSA signing can be broken down into two steps, where the first step of generating random values (to be used later with the private key and message to be signed) represents the majority of the computational cost, we pre-generate these random values to significantly reduce latency. ECDSA signing requests are computationally isolated from RSA signing requests using separate worker pools to keep them as fast as possible.

Additional details can be found in the [gokeyless server readme file](https://github.com/cloudflare/gokeyless/blob/master/server/README.md) file.

--------

## Benchmarks

Benchmarks were conducted using [Cloudflare’s gokeyless bench tool](https://github.com/cloudflare/gokeyless/tree/master/cmd/bench) on a then current-generation, compute-optimized EC2 instance ([c5.xlarge](https://aws.amazon.com/ec2/instance-types/c5/)). This particular instance has 4 vCPUs powered by 3.0 GHz Intel Xeon processors:

```txt
c5$ cat /proc/cpuinfo|grep "model name"
model name	: Intel(R) Xeon(R) Platinum 8124M CPU @ 3.00GHz
model name	: Intel(R) Xeon(R) Platinum 8124M CPU @ 3.00GHz
model name	: Intel(R) Xeon(R) Platinum 8124M CPU @ 3.00GHz
model name	: Intel(R) Xeon(R) Platinum 8124M CPU @ 3.00GHz
```

By default, bench runs with one worker goroutine per core (4) and a maximum number of operating system threads equal to the total number of cores (i.e., `GOMAXPROCS=4`). As expected and explained above, ECDSA signature performance far exceeds that of RSA; the results below show that each core of this c5.xl machine can perform in excess of 10,000 ECDSA signing operations/second and approximately 200 RSA signing operations/second.

When planning your deployment, you should determine the maximum number of new TLS connections per second you expect to terminate using a given key server, and scale accordingly. For full HA, each data center running keyless should be able to terminate the full workload that you anticipate.

### ECDSA

```txt
c5$ bench -ski $ECDSA_SKI -op ECDSA-SHA256 -bandwidth -duration 60s
Total operations completed: 2661570
Average operation duration: 22.543µs
```

### RSA

```txt
c5$ bench -ski $RSA_SKI -op RSA-SHA256 -bandwidth -duration 60s
Total operations completed: 46560
Average operation duration: 1.288659ms.
```