---
pcx_content_type: concept
title: Bots
weight: 1
---

# Bots

{{<render file="_what-is-a-bot.md">}}
<br/>

Bots can be used for good (chatbots, search engine crawlers) or for evil (inventory hoarding, credential stuffing).

{{<Aside type="note" header="More information">}}
For more background, refer to [What is a bot?](https://www.cloudflare.com/learning/bots/what-is-a-bot/).
{{</Aside>}}

## Verified bots

{{<render file="_verified-bots.md">}}

{{<Aside type="note">}}
The method for allowing or blocking verified bots depends on [your plan](/bots/get-started/).
{{</Aside>}}

## AI bots

{{<render file="_ai-bots-definition.md" >}}
<br>
<table>
  <tbody>
    <tr>
      <th>Type</th>
      <th>Description</th>
    </tr>
    <tr>
      <td>AI crawler</td>
      <td>
        <ul>
          <li>Not used for the purpose of model training</li>
          <li>Respects <code>robots.txt</code></li>
          <li>Follows all verified bot guidelines</li>
          <li>Publishes bot behavior (e.g. User Agent and IP range) and adheres to it</li>
          <li>Only retrieves information when requested by a human prompt</li>
        </ul>
      </td>
    </tr>
    <tr>
      <td>AI scraper</td>
      <td>
      <ul>
          <li>Does not respect <code>robots.txt</code></li>
          <li>Does not publish bot behavior and does not adhere to published bot behavior</li>
          <li>Gathers as much data in bulk as possible for offline training LLMs without any specific request made by an end user</li>
        </ul>
      </td>
    </tr>
  </tbody>
</table>

Refer to the [Get started guide](/bots/get-started/) based on your plan to enable the feature.