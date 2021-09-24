---
order: 4
pcx-content-type: concept
---

# Profiling Workers

For long-running or complex Workers, you need to understand where your code is spending the most time.

That's why we're launching a beta version of `wrangler inspect`. We're beginning to integrate the Workers platform with the Chrome Developer Tools, and starting today, you can use `wrangler dev --inspect` to get a CPU profile of your Worker.

<StreamVideo id="f11809a382160334e9be9a2aedf13d1d" />

To do this, first, make sure you're on Wrangler version v1.19.3 or later. Here is a guide to [upgrading Wrangler](https://developers.cloudflare.com/workers/cli-wrangler/install-update)

## Profiling an example project

You can create a new Workers project with the `wrangler generate` command:

```sh
$ wrangler generate my-worker
```

Open `index.js` in your IDE and replace the contents with:

```javascript
addEventListener("fetch", (event) => {
  event.respondWith(handleRequest(event.request));
});

/**
 * Respond with hello worker text
 * @param {Request} request
 */
const timer = (ms) => new Promise((res) => setTimeout(res, ms));

async function sleepBetween() {
  let result = 0;

  for (let i = 0; i < 100; i++) {
    result += i;
    await timer(100);
  }

  return result;
}

async function handleRequest(request) {
  await sleepBetween();

  return new Response("Hello worker!", {
    headers: { "content-type": "text/plain" },
  });
}
```

This is a basic example where our request handler calls an async function `sleepBetween`. The function iterates from 0 to 100, but after each iteration, it calls `timer(100)`, which will sleep for 100 milliseconds. This function will simulate slow code, which you can use to test out the profiler.

### Profiling our Worker

With this function saved, go to your terminal and run `wrangler dev --inspect`. You'll see some new instructions for configuring Chrome DevTools.

```sh
$ wrangler dev --inspect
💁  watching "./"
🕵️  Open chrome://inspect, click 'Configure', and add localhost:9230
👂  Listening on http://127.0.0.1:8787
```

Open a new tab in Chrome, type in `chrome://inspect` and hit enter. Click on "Configure" and add `localhost:9230`. Now you should see the Wrangler inspect process showing up under "Remote Target."

![Chrome Inspect](./media/chrome-inspect.png)

Clicking inspect opens up the DevTools.

<Aside>

Currently, Wrangler only supports the Console, Sources and Profiler tabs.

</Aside>

### Capturing a CPU profile

With the DevTools open, click the Profile tab and then click "start." Now open a new tab with your Worker running locally `http://127.0.0.1:8787`. Accessing the Worker causes it to run again, this time captured by the DevTools. When it finishes loading, go back to our DevTools window and click "stop."

There are three ways to view the CPU profiling data:

1. "Tree" - a top-down view of all functions called. Starting with top level functions and nesting subsequent calls under each one.
2. "Heavy" - a bottom up view of all functions called. Starting with the final functions in the stack and nesting parent calls under each one.
3. "Chart" - a flame chart which will show all function calls and how much time was spent in each function execution.

To find slow functions, enter the "Chart" view and search for the last long function in a stack.

![CPU Flame chart](./media/devtools-chart.png)

A function's total run time is determined by the runtime of all the functions it calls. You will want to find the one with the longest self runtime, or the last big one before it finishes or splits into smaller calls. For more information on using the DevTools, check out their [official docs](https://developer.chrome.com/docs/devtools/).

Here you can see that `sleepBetween` is our culprit. Another quick way of spotting the slowest function in a Worker is to use the Heavy view. This lets you sort by self run time or total run time. Sorting by self run time and ignoring any items in parenthesis will get you your answer.
