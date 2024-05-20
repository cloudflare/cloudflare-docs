---
pcx_content_type: configuration
title: Block Google AI training
---

# Block Google AI training

{{<render file="_google-ai-preamble.md">}}

The rule expression uses the [`http.user_agent`](/ruleset-engine/rules-language/fields/#field-http-user-agent) field block the specific user-agent token included in [Google's AI crawling](https://developers.google.com/search/docs/crawling-indexing/overview-google-crawlers#common-crawlers).

<table>
  <thead>
    <tr>
      <th>Expression</th>
      <th style="width:20%">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>
        <code>
          (http.user_agent contains "Google-Extended")
        </code>
      </td>
      <td>
        <em>Managed Challenge</em>
      </td>
    </tr>
  </tbody>
</table>

---

## Other resources

* [Rewrite responses to Google AI](/workers/examples/rewrite-responses-google-ai/)
* [Cloudflare bot solutions](/bots/)
* [Learning Center: What is a web crawler?](https://www.cloudflare.com/learning/bots/what-is-a-web-crawler/)
