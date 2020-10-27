---
order: 6
---

# Enable SafeSearch

SafeSearch is a feature of search engines that can help you filter explicit or offensive content. When you enable SafeSearch, the search engine filters explicit or offensive content and returns search results that are safe for children, you or at work.

You can use Cloudflare Gateway to enable SafeSearch on search engines like Google, Bing, Yandex, YouTube and DuckDuckGo.

## Enable SafeSearch
You can enable SafeSearch for Gateway by following the steps below:
![SafeSearch Card](../static/safesearch-card.png)

1. Visit 'Policies'. If you don't have a policy, create one.

2. Visit 'Overview' tab in the policy.

3. Scroll down to see the 'SafeSearch' card

4. Enable the switch inside the 'SafeSearch' card

5. Hit 'Save'

## Test SafeSearch
You can test if SafeSearch is working by performing dig on the search engines. Instead of returning the regular IP address, you should see the CNAMEs returned like below:

### Google
Google will return `forcesafesearch.google.com`.
![SafeSearch Google](../static/google-safesearch.png)

### YouTube
YouTube will return `restrict.youtube.com`.
![SafeSearch Youtube](../static/youtube-safesearch.png)

### Bing
Bing will return `strict.bing.com`.
![SafeSearch Bing](../static/bing-safesearch.png)

### DuckDuckGo
DuckDuckGo will return `safe.duckduckgo.com`.
![SafeSearch DuckDuckGo](../static/duckduckgo-safesearch.png)
