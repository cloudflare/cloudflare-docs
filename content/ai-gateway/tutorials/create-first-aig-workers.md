---
pcx_content_type: tutorial
content_type: 📝 Tutorial
difficulty: Beginner
updated: '2024-08-01'
title: 'Create your first AI Gateway using Workers AI'
---

# Create your first AI Gateway using Workers AI

{{<tutorial-date-info>}}

This tutorial guides you through creating your first AI Gateway using Workers AI on the Cloudflare dashboard. The intended audience is beginners who are new to AI Gateway and Workers AI. Creating an AI Gateway enables the user to efficiently manage and secure AI requests, allowing them to utilize AI models for tasks such as content generation, data processing, or predictive analysis with enhanced control and performance.

{{<tutorial>}}

{{<tutorial-prereqs>}}

Before you start, make sure you have:

- A Cloudflare account
- Access to the Cloudflare dashboard
- A basic understanding of API requests

{{</tutorial-prereqs>}}

{{<tutorial-step title="Sign up and log in">}}


1. **Sign up**: If you do not have a Cloudflare account, [sign up](https:/cloudflare.com/sign-up).
2. **Log in**: Access the Cloudflare dashboard by logging in to the [Cloudflare dashboard](https://dash.cloudflare.com/login).

{{</tutorial-step>}}

{{<tutorial-step title="Create an AI Gateway">}}


1. Go to **AI** > **AI Gateway** in the[ Cloudflare dashboard](https://dash.cloudflare.com/).
2. **Select Create Gateway**:
3. Enter a name for your gateway (up to 64 characters).
4. Select **Create**.

{{</tutorial-step>}}

{{<tutorial-step title="Connect Your AI Provider">}}

1. In the AI Gateway section, select the gateway you created.
2. Select **Workers AI** as your provider to set up an endpoint specific to Workers AI.
You will receive an endpoint URL for sending requests.



{{</tutorial-step>}}

{{<tutorial-step title="Configure Your Workers AI">}}

1. Go to **AI** > **Workers AI** in the Cloudflare dashboard.
2. Select **Use REST API** and follow the steps to create and copy the API token and Account ID.
3. **Send Requests to Workers AI**: Use the provided API endpoint. For example, you can run a model via the API using a curl command.  Replace `{account_id}`, `{gateway_id}` and `{cf_api_token}` with your actual account ID and API token:

    ```bash
    curl https://gateway.ai.cloudflare.com/v1/{account_id}/{gateway_id}/workers-ai/@cf/meta/llama-3.1-8b-instruct \
    --header 'Authorization: Bearer {cf_api_token}' \
    --header 'Content-Type: application/json' \
    --data '{"prompt": "What is Cloudflare?"}'
    ```


{{</tutorial-step>}}

{{<tutorial-step title="View Analytics">}}

Monitor your AI Gateway to view usage metrics.

1. Go to **AI** > **AI Gateway** in the dashboard.
2. Select your gateway to view metrics such as request counts, token usage, caching efficiency, errors, and estimated costs. You can also turn on additional configurations like logging and rate limiting.

{{</tutorial-step>}}

{{<tutorial-step title="Next steps" optional="true">}}

To build more with Workers, refer to [Tutorials](/workers/tutorials/).

If you have any questions, need assistance, or would like to share your project, join the Cloudflare Developer community on [Discord](https://discord.cloudflare.com) to connect with other developers and the Cloudflare team.

{{</tutorial-step>}}

{{</tutorial>}}
