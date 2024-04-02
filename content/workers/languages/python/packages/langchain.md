---
pcx_content_type: content
title: Langchain
meta:
  title: Langchain
---

# LangChain

[LangChain](https://www.langchain.com/) is the most popular framework for building AI applications powered by large language models (LLMs).

LangChain publishes multiple Python packages. The following are provided by the Workers runtime:

- [`langchain`](https://pypi.org/project/langchain/) (version `0.1.8`)
- [`langchain-core`](https://pypi.org/project/langchain-core/) (version `0.1.25`)
- [`langchain-openai`](https://pypi.org/project/langchain-openai/) (version `0.0.6`)

## Get Started

{{<render file="_python-workers-beta-packages.md" productFolder="workers">}}

Clone the `cloudflare/python-workers-examples` repository and run the LangChain example:

```bash
git clone https://github.com/cloudflare/python-workers-examples
cd 04-langchain
npx wrangler@latest dev
```

### Example code

```python
---
filename: index.py
---
from js import Response
from langchain_core.prompts import PromptTemplate
from langchain_openai import OpenAI

async def on_fetch(request, env):
  prompt = PromptTemplate.from_template("Complete the following sentence: I am a {profession} and ")
  llm = OpenAI(api_key=env.API_KEY)
  chain = prompt | llm

  res = await chain.ainvoke({"profession": "electrician"})
  return Response.new(res.split(".")[0].strip())
```