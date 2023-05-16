(async () => {
  const crawler = {
    url: process.env.ALGOLIA_CRAWLER_URL,
    id: process.env.ALGOLIA_CRAWLER_ID,
    userId: process.env.ALGOLIA_CRAWLER_USER_ID,
    apiKey: process.env.ALGOLIA_CRAWLER_API_KEY,
  }

  if (!crawler.url || !crawler.id || !crawler.userId || !crawler.apiKey) {
    console.log("Missing required env vars")
    return
  }

  const reindex = async () => {
    const runResponse = await fetch(`${crawler.url}/${crawler.id}/reindex`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Basic ${Buffer.from(`${crawler.userId}:${crawler.apiKey}`).toString("base64")}`
      },
    });
    if (!runResponse.ok) console.log(runResponse);

    console.log("Running crawler")

    return {
      runOk: runResponse.ok,
    }
  }

  const resp = await reindex();
  console.log(resp)
})()
