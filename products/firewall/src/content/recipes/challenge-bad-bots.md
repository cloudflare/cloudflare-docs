# Challenge bad bots

<Aside type='warning' header='Important'>

Access to [Bot Management](https://developers.cloudflare.com/bots/get-started/bm-subscription) requires a Cloudflare Enterprise plan with Bot Management enabled.

</Aside>

Cloudflare’s Bot Management feature scores the likelihood that a request originates from a bot.

Scores range from 1 through 99. Low scores indicate the request comes from a script, API service, or an automated agent. High scores indicate that a human issued the request from a standard desktop or mobile web browser.

These examples use:
- `cf.bot_management.score` [dynamic field](/cf-firewall-language/fields/#dynamic-fields) to target requests from bots
- `cf.bot_management.verified_bot` to identify requests from [known good bots](/known-issues-and-faq#bots-currently-detected/)

## Suggested rules

For best results:
- Use [Bot Analytics](https://developers.cloudflare.com/bots/get-started/bm-subscription#enable-bot-management-for-enterprise) to learn about your traffic before applying rules
- Start small and increase your bot threshold over time

Your rules may also vary based on the [nature of your site](https://developers.cloudflare.com/bots/get-started/bm-subscription#5-create-additional-firewall-rules) and your tolerance for false positives.

### Protect browser endpoints

When a request is definitely automated (score of 1) or likely automated (scores 2 through 29) and is _not_ on the list of known good bots, Cloudflare **blocks** the request.

<table style='table-layout:fixed; width:100%'>
  <thead>
  <tr>
    <th>Expression</th>
    <th style='width:20%'>Action</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>(cf.bot_management.score lt 30) and not (cf.bot_management.verified_bot)</code></td>
      <td><em>Block</em></td>
    </tr>
  </tbody>
</table>

### Exempt API traffic

Since Bot Management detects automated users, you need to explicitly allow your **good** automated traffic⁠ — this includes your APIs and partner APIs.

This example offers the same protection as the browser-only rule, but allows automated traffic to your API.

<table style='table-layout:fixed; width:100%'>
  <thead>
  <tr>
    <th>Expression</th>
    <th style='width:20%'>Action</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>(cf.bot_management.score lt 30) and not (cf.bot_management.verified_bot) and not (http.request.uri.path contains "/api")</code></td>
      <td><em>Block</em></td>
    </tr>
  </tbody>
</table>


### Adjust for mobile traffic

Since Bot Management can be more sensitive to mobile traffic, you might want to set lower thresholds if your domain has a high volume of mobile traffic.

The following rules would block definitely automated mobile traffic, but only challenge likely automated traffic.

<table style='table-layout:fixed; width:100%'>
  <thead>
  <tr>
    <th>Expression</th>
    <th style='width:20%'>Action</th>
  </tr>
  </thead>
  <tbody>
    <tr>
      <td><code>(cf.bot_management.score lt 2) and (http.user_agent contains "App_Name 2.0")</code></td>
      <td><em>Block</em></td>
    </tr>
    <tr>
      <td><code>(cf.bot_management.score lt 30) and (http.user_agent contains "App_Name 2.0")</code></td>
      <td><em>Challenge</em></td>
    </tr>
  </tbody>
</table>

### Layer rules

If your domain saw mobile, browser, and API traffic, you would want to arrange these example rules in the following order:
- API
- Mobile - Block
- Mobile - Challenge
- Browser - Block

### Static resource protection

Static resources are protected by default when you create **Firewall Rules** using `cf.bot_management.score`.

To exclude static resources, include <code class="InlineCode">not (cf.botManagement.staticResource)</code> as part of your Firewall Rule. For more details, see [Static resource protection](https://developers.cloudflare.com/bots/about/static-resources).

### Additional considerations

From there, you could customize your Firewall Rules based on specific request paths(`/login` or `/signup`), common traffic patterns, or many other characteristics.

Just make sure to set aside time to review [Bot Analytics](https://developers.cloudflare.com/bots/bot-analytics/bm-subscription) and [Firewall Events](https://support.cloudflare.com/hc/articles/360024520152) to see if your rules need additional tuning.