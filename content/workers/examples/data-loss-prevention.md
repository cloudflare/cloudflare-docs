---
type: example
summary: Protect sensitive data to prevent data loss, and send alerts to a
  webhooks server in the event of a data breach.
tags:
  - Security
languages:
  - JavaScript
  - TypeScript
  - Python
pcx_content_type: example
title: Data loss prevention
weight: 1001
layout: example
---

{{<tabs labels="js | ts | py">}}
{{<tab label="js" default="true">}}

```js
export default {
  async fetch(request) {
    const DEBUG = true;
    const SOME_HOOK_SERVER = "https://webhook.flow-wolf.io/hook";

    /**
     * Alert a data breach by posting to a webhook server
     */
    async function postDataBreach(request) {
      return await fetch(SOME_HOOK_SERVER, {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          ip: request.headers.get("cf-connecting-ip"),
          time: Date.now(),
          request: request,
        }),
      });
    }

    /**
     * Define personal data with regular expressions.
     * Respond with block if credit card data, and strip
     * emails and phone numbers from the response.
     * Execution will be limited to MIME type "text/*".
     */
    const response = await fetch(request);

    // Return origin response, if response wasn’t text
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("text/")) {
      return response;
    }

    let text = await response.text();

    // When debugging replace the response
    // from the origin with an email
    text = DEBUG
      ? text.replace("You may use this", "me@example.com may use this")
      : text;
    const sensitiveRegexsMap = {
      creditCard: String.raw`\b(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})\b`,
      email: String.raw`\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b`,
      phone: String.raw`\b07\d{9}\b`,
    };

    for (const kind in sensitiveRegexsMap) {
      const sensitiveRegex = new RegExp(sensitiveRegexsMap[kind], "ig");
      const match = await sensitiveRegex.test(text);
      if (match) {
        // Alert a data breach
        await postDataBreach(request);
        // Respond with a block if credit card,
        // otherwise replace sensitive text with `*`s
        return kind === "creditCard"
          ? new Response(kind + " found\nForbidden\n", {
              status: 403,
              statusText: "Forbidden",
            })
          : new Response(text.replace(sensitiveRegex, "**********"), response);
      }
    }
    return new Response(text, response);
  },
};
```

{{</tab>}}
{{<tab label="ts">}}

```ts
export default {
  async fetch(request): Promise<Response> {
    const DEBUG = true;
    const SOME_HOOK_SERVER = "https://webhook.flow-wolf.io/hook";

    /**
     * Alert a data breach by posting to a webhook server
     */
    async function postDataBreach(request) {
      return await fetch(SOME_HOOK_SERVER, {
        method: "POST",
        headers: {
          "content-type": "application/json;charset=UTF-8",
        },
        body: JSON.stringify({
          ip: request.headers.get("cf-connecting-ip"),
          time: Date.now(),
          request: request,
        }),
      });
    }

    /**
     * Define personal data with regular expressions.
     * Respond with block if credit card data, and strip
     * emails and phone numbers from the response.
     * Execution will be limited to MIME type "text/*".
     */
    const response = await fetch(request);

    // Return origin response, if response wasn’t text
    const contentType = response.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("text/")) {
      return response;
    }

    let text = await response.text();

    // When debugging replace the response
    // from the origin with an email
    text = DEBUG
      ? text.replace("You may use this", "me@example.com may use this")
      : text;
    const sensitiveRegexsMap = {
      creditCard: String.raw`\b(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})\b`,
      email: String.raw`\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b`,
      phone: String.raw`\b07\d{9}\b`,
    };

    for (const kind in sensitiveRegexsMap) {
      const sensitiveRegex = new RegExp(sensitiveRegexsMap[kind], "ig");
      const match = await sensitiveRegex.test(text);
      if (match) {
        // Alert a data breach
        await postDataBreach(request);
        // Respond with a block if credit card,
        // otherwise replace sensitive text with `*`s
        return kind === "creditCard"
          ? new Response(kind + " found\nForbidden\n", {
              status: 403,
              statusText: "Forbidden",
            })
          : new Response(text.replace(sensitiveRegex, "**********"), response);
      }
    }
    return new Response(text, response);
  },
} satisfies ExportedHandler;
```

{{</tab>}}
{{<tab label="py">}}

```py
import re
from datetime import datetime
from js import Response, fetch, JSON, Headers

# Alert a data breach by posting to a webhook server
async def post_data_breach(request):
    some_hook_server = "https://webhook.flow-wolf.io/hook"
    headers = Headers.new({"content-type": "application/json"}.items())
    body = JSON.stringify({
      "ip": request.headers["cf-connecting-ip"],
      "time": datetime.now(),
      "request": request,
    })
    return await fetch(some_hook_server, method="POST", headers=headers, body=body)

async def on_fetch(request):
    debug = True

    # Define personal data with regular expressions.
    # Respond with block if credit card data, and strip
    # emails and phone numbers from the response.
    # Execution will be limited to MIME type "text/*".
    response = await fetch(request)

    # Return origin response, if response wasn’t text
    content_type = response.headers["content-type"] or ""
    if "text" not in content_type:
        return response

    text = await response.text()
    # When debugging replace the response from the origin with an email
    text = text.replace("You may use this", "me@example.com may use this") if debug else text

    sensitive_regex = [
      ("credit_card",
      r'\b(?:4[0-9]{12}(?:[0-9]{3})?|(?:5[1-5][0-9]{2}|222[1-9]|22[3-9][0-9]|2[3-6][0-9]{2}|27[01][0-9]|2720)[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|6(?:011|5[0-9]{2})[0-9]{12}|(?:2131|1800|35\d{3})\d{11})\b'),
      ("email", r'\b[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}\b'),
      ("phone", r'\b07\d{9}\b'),
    ]
    for (kind, regex) in sensitive_regex:
        match = re.search(regex, text, flags=re.IGNORECASE)
        if match:
            # Alert a data breach
            await post_data_breach(request)
            # Respond with a block if credit card, therwise replace sensitive text with `*`s
            card_resp = Response.new(kind + " found\nForbidden\n", status=403,statusText="Forbidden")
            sensitive_resp = Response.new(re.sub(regex, "*"*10, text, flags=re.IGNORECASE), response)
            return card_resp if kind == "credit_card" else  sensitive_resp

    return Response.new(text, response)
```

{{</tab>}}
{{</tabs>}}
