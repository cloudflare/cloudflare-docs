---
title: Build AI Agents with Example Prompts
description: Build applications on Workers with our prompt examples.
products:
  - agents
  - workers
  - workflows
date: 2025-02-14T19:00:00Z
---

We've added an [example prompt](/agents/build/prompts/) to help you get started with building AI agents and applications on Cloudflare [Workers](/workers/), including [Workflows](/workflows/), [Durable Objects](/durable-objects/), and [Workers KV](/kv/).

You can use this prompt with your favorite AI model, including Claude 3.5 Sonnet, OpenAI's o3-mini, Gemini 2.0 Flash, or Llama 3.3 on Workers AI. Models with large context windows will allow you to paste the prompt directly: provide your own prompt within the `<user_prompt></user_prompt>` tags.

```sh
{paste_prompt_here}
<user_prompt>
user: Build an AI agent using Cloudflare Workflows. The Workflow should run when a new GitHub issue is opened on a specific project with the label 'help' or 'bug', and attempt to help the user troubleshoot the issue by calling the OpenAI API with the issue title and description, and a clear, structured prompt that asks the model to suggest 1-3 possible solutions to the issue. Any code snippets should be formatted in Markdown code blocks. Documentation and sources should be referenced at the bottom of the response. The agent should then post the response to the GitHub issue. The agent should run as the provided GitHub bot account.
</user_prompt>
```

This prompt is still experimental, but we encourage you to try it out and [provide feedback](https://github.com/cloudflare/cloudflare-docs/issues/new?template=content.edit.yml).
