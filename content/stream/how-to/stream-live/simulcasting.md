---
title: Simulcasting
pcx-content-type: how-to
weight: 3
meta:
  title: Simulcasting
---

# Simulcasting

Simulcasting lets you forward your live stream to third-party platforms such as YouTube Live and Facebook Live. To begin simulcasting, select an input and add one or more Outputs.

![Simulcasting](/stream/static/simulcasting.png)


## Create an Output via the Dashboard

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/) and select your account.
2. Click **Stream**.
3. Click the **Live Inputs** tab.
4. On the **Live Inputs** page, click a live input from the list.
5. On the live input page, under **Outputs** click **Create Output**.
6. Enter the information for your output.
7. When you are done, click **Create Output**.

## Outputs via the API

Refer to the API information below to manage outputs.

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
   <td><a href="https://api.cloudflare.com/#stream-live-inputs-add-an-output-to-a-live-input">Add outputs</a>
   </td>
   <td><Code>POST</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/live_inputs/:live_input_identifier/outputs</Code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#stream-live-inputs-remove-an-output-from-a-live-input">Delete outputs</a>
   </td>
   <td><Code>DELETE</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/live_inputs/:live_input_identifier/outputs/:output_identifier</Code>
   </td>
  </tr>
  <tr>
   <td><a href="https://api.cloudflare.com/#stream-live-inputs-list-outputs-associated-with-a-live-input">List outputs</a>
   </td>
   <td><Code>GET</Code>
   </td>
   <td><Code>accounts/:account_identifier/stream/live_inputs/:live_input_identifier/outputs</Code>
   </td>
  </tr>
  </tbody>
</table>

</TableWrap>


- Add an Output to start retransmitting live video. You can add or remove Outputs at any time during a broadcast to start and stop retransmitting.

- If the associated live input is already retransmitting to this output when you make the `DELETE` request, that output will be disconnected within 30 seconds.