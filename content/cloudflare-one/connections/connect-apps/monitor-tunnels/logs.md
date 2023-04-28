---
pcx_content_type: reference
title: Logs
weight: 1
---

# Remote tunnel logs

You can view realtime logs for a Cloudflare Tunnel from any machine that has `cloudflared` installed. This allows you to investigate connectivity issues without needing to SSH into the machine that is running the tunnel.

## Stream logs using `cloudflared`

You can use the `cloudflared` daemon to stream logs to the local command line.

### Prerequisites

- Requires `cloudflared` version 2023.4.2 or higher on both your local machine and the origin server.
- The tunnel is active and able to receive requests.

### View logs

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

### Change log level

????? 
- What does `cloudflared tail --loglevel warn <UUID>` do? 
- How is it different from `cloudflared tail --level warn <UUID>` and `cloudflared tunnel --loglevel warn run <UUID>`? (not sure if syntax is correct)

You do not need to set `--loglevel debug` on the origin.

### Filter logs

You can filter logs by event type (`--event`), event level (`--level`), or sampling rate (`-sampling`) to reduce the volume of logs streamed from the origin. This helps mitigate the performance impact on the origin, especially when the origin is normally under high load.

For example, the following command will only request logs with level `WARN` or higher.
```sh
$ cloudflared tail --level warn <UUID>
```

### View logs for a replica

If you are running multiple `cloudflared` instances for the same tunnel (also known as [replicas](/cloudflare-one/connections/connect-apps/install-and-setup/deploy-cloudflared-replicas/)), you can specify an individual instance to stream logs from:

1. In [Zero Trust](https://one.dash.cloudflare.com/), go to **Access** > **Tunnels** and select your tunnel.
2. Find the **Connector Id** for the `cloudflared` instance you want to view.
3. Specify the Connector ID in `cloudflared tail`:
    ```sh
    $ cloudflared tail --connector-id <CONNECTOR ID> <UUID>
    ```

### Write logs to file

I think this requires you SSH to into the origin.

```sh
cloudflared tunnel --logfile mytunnel.log run <UUID>
```

## Stream logs from the dashboard

## Limitations

- The logging session will only be held open for one hour. All logging systems introduce some level of performance overhead, and this limitation helps prevent longterm impact to your Cloudflare Tunnel’s end-to-end latencies.
- If you are streaming logs for a high throughput tunnel, log events may be dropped to avoid overloading the origin. To work around the issue, try [filtering your logs](#filter-logs).
