---
order: 115
pcx-content-type: concept
---

# Instant Logs

Instant Logs allows Cloudflare Enterprise customers to access a live stream of the traffic for their domain on the Cloudflare dashboard. Seeing data in real time allows you to investigate an attack, troubleshoot, debug or test out changes made to your network. Instant Logs is lightweight, simple to use and does not require any additional setup.

## How to use Instant Logs

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).

1. Select the Enterprise domain you want to use with Instant Logs.

1. Go to **Analytics** > **Instant Logs**.

1. Click **Start streaming**.

1. Click **Add filters** to narrow down the events shown.

The filters you can add are **Firewall action matches**, **Country**, **Path**, **Status code**, **Client IP**, **Host**, **HTTP method** and **Firewall rule ID matches**. If you would like to see filtering on additional criteria, leave us feedback on the form linked on the Instant Logs page.

Once a filter is selected and the stream has started, only log lines that match the filter criteria will appear. Filters are not applied retroactively to logs already showing in the dash.

## Datasets available

For the moment, HTTP requests is the only dataset available. In the future, we will expand to other datasets.  

## Exporting

You can download the table of logs that appears in your dash using the **Export** button. The data will be downloaded in JSON format.

## Limits

Instant Logs has two limits set in place:

* Only one active Instant Logs session per zone.
* Maximum session time is 60 minutes.

If either of these limits are reached, the logs stream will automatically stop.

## Connect with us

If you have any feature requests or notice any bugs, share your feedback directly with us by joining the [Cloudflare Developers community on Discord](https://discord.gg/h35x2dkuq8).