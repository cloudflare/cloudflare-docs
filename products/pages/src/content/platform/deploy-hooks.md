---
order: 3
pcx-content-type: concept
---

# Deploy Hooks

With Deploy Hooks, you can trigger deployments using event sources beyond commits in your source repository. Each event source may obtain its own unique URL, which will receive HTTP POST requests in order to initiate new deployments. This feature allows you to integrate Pages with new or existing workflows. For example, you may:

- Automatically deploy new builds whenever content in a Headless CMS system changes
- Implement a fully customized CI/CD pipeline, deploying only under desired conditions 
- Schedule a CRON trigger to update your website on a fixed timeline

To create a Deploy Hook select your desired Pages project, navigate to **Settings** and **Builds & deployments** and click “Add deploy hook” to start configuration.

![deploy hooks](deploy-hooks-add.png)

## Parameters needed
To configure your Deploy Hook, you must enter two key parameters:
   1. **Deploy Hook Name:** a unique identifier for your Deploy Hook (e.g. “contentful-site”)
   2. **Branch to Build:** the repository branch your Deploy Hook should build

![deploy hooks](deploy-hooks-configure.png)

## Using your deploy hook
Once your configuration is complete, the Deploy Hook’s unique URL is ready to be used. You will see both the URL as well as the POST request snippet available to copy. 
![deploy hooks](deploy-hooks-details.png)

Every time a request is sent to your deploy hook, a new build will be triggered. Looking at your deployment log, you’ll notice that any deployment triggered by a deploy hook will specify this in the source column.  

![deploy hooks](deploy-hooks-deployment-logs.png)

## Security Considerations
Deploy Hooks are uniquely linked to your project and do not require additional authentication to be used. While this does allow for complete flexibility, it’s crucial that you protect these URLs in the same way you’d safeguard any proprietary information or application secret. 

If you suspect unauthorized usage of a Deploy Hook, you should delete the Deploy Hook and generate a new one in its place.

## Integrating Deploy Hooks with common CMS platforms
Every CMS provider is different and will offer different pathways in integrating with Pages' Deploy Hooks. We've included a few step-by-step instructions for popular platforms for your convenience.

### Contentful
Contentful supports integration with Cloudflare Pages via its **Webhooks** feature. In your Contentful project settings, go to **Webhooks**, create a new Webhook, and paste in your unique Deploy Hook URL in the **URL** field. Optionally, you can specify events that the Contentful Webhook should forward. By default, Contentful will trigger a Pages deployment on all project activity, which may be a bit too frequent. You can filter for specific events, such as Create, Publish, and many others. 
![deploy hooks](https://kmf.lol/2021/08/chrome_f3M3RGdA5l.png)

### Ghost 
You can configure your Ghost website to trigger Pages deployments by creating a new **Custom Integration**. In your Ghost website’s settings, create a new Custom Integration in the **Integrations** page.

Each custom integration you’ve created can have multiple **webhooks** attached to it. Create a new webhook with the **Add webhook** button and select **Site changed (rebuild)** as the **Event**. Then paste your unique Deploy Hook URL as the **Target URL** value. After creating this webhook, your Cloudflare Pages application will redeploy whenever your Ghost site changes.
![deploy hooks](https://kmf.lol/2021/08/chrome_4ZV42UvOtd.png)

### Sanity
In your Sanity project's Settings page, find the **Webhooks** section, and add the Deploy Hook URL, as seen below. By default, the Webhook will trigger your Pages Deploy Hook for all datasets inside of your Sanity project. You can filter notifications to  individual datasets, such as production, using the **Dataset** field:
![deploy hooks](https://kmf.lol/2021/08/chrome_NQcxeDO2mp.png)

### Wordpress
You can configure WordPress to trigger a Pages Deploy Hook by installing the free **WP Webhooks** plugin. The plugin includes a number of triggers, such as **Send Data on New Post, Send Data on Post Update** and **Send Data on Post Deletion**, all of which allow you to trigger new Pages deployments as your WordPress data changes. Select a trigger on the sidebar of the plugin settings and then [**Add Webhook URL**](https://wordpress.org/plugins/wp-webhooks/), pasting in your unique Deploy Hook URL.
![deploy hooks](https://kmf.lol/2021/08/chrome_gUiCCaNe1D.png)