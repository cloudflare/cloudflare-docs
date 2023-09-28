---
pcx_content_type: concept
title: Deploy a Browser Rendering Worker with Durable Objects
weight: 2
---

# Deploy a Browser Rendering Worker with Durable Objects

By following this guide, you will create a Worker that uses the Browser Rendering API along with [Durable Objects](/durable-objects/) to take screenshots from web pages and store them in [R2](/r2/). 

Using Durable Objects to persist browser sessions improves performance by eliminating the time that it takes to spin up a new browser session. Since Durable Objects re-uses sessions, it reduces the number of concurrent sessions needed.

{{<render file="_prereqs.md" productFolder="workers" >}}

## 1. Create a Worker project

[Cloudflare Workers](/workers/) provides a serverless execution environment that allows you to create new applications or augment existing ones without configuring or maintaining infrastructure. Your Worker application is a container to interact with a headless browser to do actions, such as taking screenshots.

Create a new Worker project named `browser-worker` by running:

{{<tabs labels="npm | yarn">}}
{{<tab label="npm" default="true">}}

```sh
$ npm create cloudflare@latest
```

{{</tab>}}
{{<tab label="yarn">}}

```sh
$ yarn create cloudflare@latest
```

{{</tab>}}
{{</tabs>}}

You can choose to use either JavaScript or TypeScript for this guide.

## 2. Enable Durable Objects in the dashboard

To enable Durable Objects, you will need to purchase the Workers Paid plan:

 1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account.
 2. Go to **Workers & Pages** > **Plans**. 
 3. Select **Purchase Workers Paid** and complete the payment process to enable Durable Objects.

## 3. Install Puppeteer

In your `browser-worker` directory, install Cloudflare’s [fork of Puppeteer](/browser-rendering/platform/puppeteer/):

```sh
$ npm install @cloudflare/puppeteer --save-dev
```

## 4. Create a R2 bucket

Create two R2 buckets, one for production, and one for development.

```sh
$ wrangler r2 bucket create SCREENSHOTS
$ wrangler r2 bucket create SCREENSHOTS-TEST
```

To check that your buckets were created, run:

```sh
$ wrangler r2 bucket list
```

After running the `list` command, you will see all bucket names, including the ones you have just created.


## 5. Configure `wrangler.toml`

Configure your `browser-worker` project's [`wrangler.toml`](/workers/wrangler/configuration/) file by adding a browser [binding](/workers/configuration/bindings/) and a [Node.js compatibility flag](/workers/configuration/compatibility-dates/#nodejs-compatibility-flag). Browser bindings allow for communication between a Worker and a headless browser which allows you to do actions such as taking a screenshot, generating a PDF and more.

Update your `wrangler.toml` configuration file with the Browser Rendering API binding, the R2 bucket you created and a Durable Object:

```toml
name = "rendering-api-demo"
main = "src/index.js"
compatibility_date = "2023-09-04"
compatibility_flags = [ "nodejs_compat"]
account_id = <ACCOUNT_ID>


# Browser Rendering API binding
browser = { binding = "MYBROWSER" }

# Bind an R2 Bucket
[[r2_buckets]]
binding = "BUCKET"
bucket_name = "SCREENSHOTS"
preview_bucket_name = "SCREENSHOTS-TEST"

# Binding to a Durable Object
[[durable_objects.bindings]]
name = "BROWSER"
class_name = "Browser"

[[migrations]]
tag = "v1" # Should be unique for each entry
new_classes = ["Browser"] # Array of new classes

```

## 6. Code

The code below uses Durable Object to instantiate a browser using Puppeteer. It then opens a series of web pages with different resolutions, takes a screenshot of each, and uploads it to R2.

The Durable Object keeps a browser session open for 60 seconds after last use. If a browser session is open, any requests will re-use the existing session rather than creating a new one. Update your Worker code by copy and pasting the following:


```js
---
filename: index.js
---
import puppeteer from '@cloudflare/puppeteer';

export default {
	async fetch(request, env) {

		let id = env.BROWSER.idFromName("browser");
		let obj = env.BROWSER.get(id);

		// Send a request to the Durable Object, then await its response.
		let resp = await obj.fetch(request.url);
		let count = await resp.text();

		return new Response("success");
	}
};

const KEEP_BROWSER_ALIVE_IN_SECONDS = 60;

export class Browser {
	constructor(state, env) {
		this.state = state;
		this.env = env;
		this.keptAliveInSeconds = 0;
		this.storage = this.state.storage;
	}

	async fetch(request) {
		// screen resolutions to test out
		const width = [1920, 1366, 1536, 360, 414]
		const height = [1080, 768, 864, 640, 896]

		// use the current date and time to create a folder structure for R2
		const nowDate = new Date()
		var coeff = 1000 * 60 * 5
		var roundedDate = (new Date(Math.round(nowDate.getTime() / coeff) * coeff)).toString();
		var folder = roundedDate.split(" GMT")[0]

		//if there's a browser session open, re-use it
		if (!this.browser) {
			console.log(`Browser DO: Starting new instance`);
			try {
			  this.browser = await puppeteer.launch(this.env.MYBROWSER);
			} catch (e) {
			  console.log(`Browser DO: Could not start browser instance. Error: ${e}`);
			}
		  }

		// Reset keptAlive after each call to the DO
		this.keptAliveInSeconds = 0;

		const page = await this.browser.newPage();

		// take screenshots of each screen size 
		for (let i = 0; i < width.length; i++) {
			await page.setViewport({ width: width[i], height: height[i] });
			await page.goto("https://workers.cloudflare.com/");
			const fileName = "screenshot_" + width[i] + "x" + height[i]
			const sc = await page.screenshot({
				path: fileName + ".jpg"
			}
			);

			this.env.BUCKET.put(folder + "/"+ fileName + ".jpg", sc);
		  }

		// Reset keptAlive after performing tasks to the DO.
		this.keptAliveInSeconds = 0;

		// set the first alarm to keep DO alive
		let currentAlarm = await this.storage.getAlarm();
		if (currentAlarm == null) {
		console.log(`Browser DO: setting alarm`);
		const TEN_SECONDS = 10 * 1000;
		this.storage.setAlarm(Date.now() + TEN_SECONDS);
		}

		await this.browser.close();
		return new Response("success");
	}

	async alarm() {
		this.keptAliveInSeconds += 10;

		// Extend browser DO life
		if (this.keptAliveInSeconds < KEEP_BROWSER_ALIVE_IN_SECONDS) {
		  console.log(`Browser DO: has been kept alive for ${this.keptAliveInSeconds} seconds. Extending lifespan.`);
		  this.storage.setAlarm(Date.now() + 10 * 1000);
		} else console.log(`Browser DO: cxceeded life of ${KEEP_BROWSER_ALIVE_IN_SECONDS}. Browser DO will be shut down in 10 seconds.`);
	  }

  }
```

## 7. Test

Run [`npx wrangler dev --remote`](/workers/wrangler/commands/#dev) to test your Worker locally before deploying to Cloudflare's global network.

## 8. Deploy

Run [`npx wrangler deploy`](/workers/wrangler/commands/#deploy) to deploy your Worker to the Cloudflare global network.

## Related resources

* Other [Puppeteer examples](https://github.com/cloudflare/puppeteer/tree/main/examples)
* Get started with [Durable Objects](/durable-objects/get-started/)
* [Using R2 from Workers](/r2/api/workers/workers-api-usage/)