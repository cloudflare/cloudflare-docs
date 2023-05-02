---
pcx_content_type: reference
title: Logs
weight: 1
---

# Tunnel logs

Tunnel logs record all activity between a `cloudflared` instance and Cloudflare's global network. These logs allow you to investigate connectivity or performance issues with a Cloudflare Tunnel. You can stream real-time logs for a tunnel from any client machine, or you can configure your server to store persistent logs.

## View logs on a client

You can view real-time logs for a Cloudflare Tunnel from any machine that has `cloudflared` installed. With this method, you do not need to SSH into the server that is running the tunnel.

### CLI

The `cloudflared` daemon can stream logs from any tunnel in your account to the local command line.

#### Prerequisites

- `cloudflared` version 2023.4.2 or higher is installed on both your local machine and the origin server.
- The tunnel is active and able to receive requests.

#### View logs

1. On your local machine, authenticate `cloudflared` to your Zero Trust account:
    ```sh
    $ cloudflared tunnel login
    ```

2. Run `cloudflared tail` for a specific tunnel:
    ```sh
    $ cloudflared tail <UUID>
    ```

    For a more structured view of the JSON message, you can pipe the output to tools like [jq](https://stedolan.github.io/jq/):

    ```sh
    $ cloudflared tail --output=json <UUID> | jq .
    ```

#### Filter logs

You can filter logs by event type (`--event`), event level (`--level`), or sampling rate (`-sampling`) to reduce the volume of logs streamed from the origin. This helps mitigate the performance impact on the origin, especially when the origin is normally under high load. For example:

```sh
$ cloudflared tail --level debug <UUID>
```

| Flag   | Description | Allowed values | Default value |
| ------ | ----------- | -------| --------|
| `--event` | Filter by the type of event / request. | `cloudflared`, `http`, `tcp`, `udp` | All events |
| `--level` | Return logs at this level and above. Works independently of the [`--loglevel`](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/local-management/arguments/#loglevel) setting on the server. | `debug`, `info`, `warn`, `error`, `fatal` | `debug` |
| `--sampling` | Sample a fraction of the total logs. | Number from `0.0` to `1.0` | `1.0` |

#### View logs for a replica

If you are running multiple `cloudflared` instances for the same tunnel (also known as [replicas](/cloudflare-one/connections/connect-apps/install-and-setup/deploy-cloudflared-replicas/)), you can specify an individual instance to stream logs from:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Access** > **Tunnels** and select your tunnel.
2. Find the **Connector ID** for the `cloudflared` instance you want to view.
3. Specify the Connector ID in `cloudflared tail`:
    ```sh
    $ cloudflared tail --connector-id <CONNECTOR ID> <UUID>
    ```

### Limitations

- The logging session will only be held open for one hour. All logging systems introduce some level of performance overhead, and this limitation helps prevent longterm impact to your tunnel's end-to-end latencies.
- If you are streaming logs for a high throughput tunnel, log events may be dropped to avoid overloading the server. To work around the issue, try [filtering your logs](#filter-logs).

## View logs on the server

If you have access to the server that is running the tunnel, you can view logs without the [limitations of remote streaming](#limitations):

```sh
$ cloudflared tunnel --loglevel debug run <UUID>
```

The [`--loglevel` flag](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/local-management/arguments/#loglevel) indicates the logging level for the local `cloudflared` instance, which can be one of {`debug`, `info`, `warn`, `error`, `fatal`} (default: `info`). At the `debug` level, `cloudflared` will log and display the request URL, method, protocol, content length, as well as all request and response headers. However, note that this can expose sensitive information in your logs.

### Write logs to file

By default, `cloudflared` prints logs to stdout and does not store logs on the server. You can use the [`--logfile` flag](/cloudflare-one/connections/connect-apps/install-and-setup/tunnel-guide/local/local-management/arguments/#logfile) to save your logs to a file:

```sh
$ cloudflared tunnel --logfile mytunnel.log run <UUID>
```