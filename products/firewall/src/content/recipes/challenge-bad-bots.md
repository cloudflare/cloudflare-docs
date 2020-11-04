# Challenge bad bots

<Aside type='warning' header='Important'>

Access to [Bot Management](https://developers.cloudflare.com/logs/tutorials/bot-management-dashboard/) requires a Cloudflare Enterprise plan.

</Aside>

Cloudflare’s Bot Management feature scores the likelihood that a request originates from a bot.

Scores range from 1 to 99. Low scores indicate the request comes from a script, API service, or an automated agent. High scores indicate that a human issued the request from a standard desktop or mobile web browser.

This example uses the `cf.bot_management.score` [dynamic field](/cf-firewall-language/fields/#dynamic-fields) to target requests from bots. It uses the `cf.bot_management.verified_bot` field to identify requests from known good bots.

When a request for `login` has a Bot Management score less than 30 and is _not_ on the list of known good bots, Cloudflare issues a CAPTCHA challenge:

<table style='table-layout:fixed; width:100%'>
  <thead>
  <tr>
    <th>Expression</th>
    <th style='width:20%'>Action</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>(cf.bot_management.score lt 30) and (http.request.uri.path eq "/login") and not (cf.bot_management.verified_bot)</code></td>
      <td><em>Challenge</em></td>
    </tr>
  </tbody>
</table>
