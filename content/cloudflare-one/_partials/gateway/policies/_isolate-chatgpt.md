---
_build:
  publishResources: false
  render: never
  list: never
---

| Selector    | Operator | Value                                                                | Logic | Action  |
| ----------- | -------- | -------------------------------------------------------------------- | ----- | ------- |
| Application | in       | `ChatGPT`                                                            | Or    | Isolate |
| Host        | in       | `chat.openai.com`, `auth0.openai.com`, `openai.com`, `cdn.auth0.com` |       |         |

In **Configure policy settings**, you can customize restrictions for ChatGPT. For example, to prevent your users from inputting sensitive information, you can select **Disable copy / paste** and **Disable file uploads**.
