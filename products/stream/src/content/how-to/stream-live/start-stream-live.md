---
order: 6
pcx-content-type: tutorial
---

# Start a live stream

You can start a live stream using the Stream Dashboard or the API. After you subscribe to Stream, you can create Live Inputs and begin sending your live video to Cloudflare Stream using RTMPS.

As long as your streaming software reconnects, Stream Live will continue to ingest and stream your live video. Make sure the streaming software you use to push RTMP feeds automatically reconnects if the connection breaks. Some apps, like OBS, reconnect automatically while other apps, like FFmpeg, require custom configuration.

## Use the Dashboard

1. Log in to your Cloudflare account.
1. From **Menu**, under **Products** click **Stream**.
1. Click the **Live Inputs** tab.
1. Click the **Create Live Input** button.
1. Under **Name**, enter a name for your Live Input.
1. Click **Create Live Input** when you are done.

After you create a Live Input, you can retrieve the RTMPS URL and Key.

  ![Your Live Input's RTMPS URL and key](../../static/rtmps-key.png)

A few seconds after pushing your live stream to Cloudflare Stream, the live video stream appears.

![Your live video stream](../../static/live-video-stream.png)

## Use the API

To start a live stream programmatically, make a `POST` request to the `/live_inputs` endpoint.

<TableWrap>

<table>
  <thead>
  <tr>
   <th><strong>Command</strong>
   </th>
   <th><strong>Method</strong>
   </th>
   <th><strong>Endpoint</strong>
   </th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td><a href="https://api.cloudflare.com/#stream-live-inputs-create-a-live-input">Create live input</a>
   </td>
   <td><Code>POST</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/live_inputs</Code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>

Refer to the `recording` parameter for a list of acceptable properties for this object.

## Manage live inputs

Some limits apply to the Stream Live Beta:

* You can create up to 1000 live inputs per account.
* You can configure up to 50 outputs per live input.
* You should use a maximum recommended bitrate of 12000 kbps.

If your use case requires a limit increase, contact support with your use case and need.

Refer to the API information below to update or delete live inputs.

<TableWrap>

<table>
  <thead>
  <tr>
   <th><strong>Command</strong>
   </th>
   <th><strong>Method</strong>
   </th>
   <th><strong>Endpoint</strong>
   </th>
  </tr>
  </thead>
  <tbody>
  <tr>
   <td><a href="https://api.cloudflare.com/#stream-live-inputs-update-live-input-details">Update inputs</a>
   </td>
   <td><Code>PUT</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/live_inputs/:live_input_identifier</Code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#stream-live-inputs-delete-live-input">Delete inputs</a>
   </td>
   <td><Code>DELETE</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/live_inputs/:live_input_identifier</Code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>

## Requirements and known limitations 

### Requirements

* Stream Live requires input GOP duration (keyframe interval) to be between 4 and 10 seconds.
* Closed GOPs are required. This means that if there are any B frames in the video, they should always refer to frames within the same GOP. This setting is the default in most encoder software such as OBS.
* Stream Live only supports H.264 video and AAC audio codecs as inputs. This requirement does not apply to inputs that are relayed to Stream Connect outputs.
* Clients must be configured to reconnect when a disconnection occurs. Stream Live is designed to handle reconnection gracefully by continuing the live stream.

### Known limitations 

* Watermarks cannot yet be used with live videos.
* The live videos feature does not yet work on older iOS versions, such as iOS 10, launched in 2016, and below.
* Hardware video encoding on Apple devices is not yet supported. When using encoder software such as OBS, x264 software encoding is required.
* If a live video exceeds seven days in length, the recording will be truncated to seven days and will not be viewable.