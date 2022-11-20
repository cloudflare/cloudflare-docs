const apiBase = "https://cloudflare-api-docs-frontend.pages.dev"

const rewriteStaticAssets = {
  element: (element: Element) => {
    const prefixAttribute = (attr: string) => {
      const value = element.getAttribute(attr)
      const updatedValue = `${apiBase}/${value}`
      element.setAttribute(attr, updatedValue)
    }

    const attrs = ['href', 'src']
    attrs.forEach(attr => {
      if (element.getAttribute(attr)) prefixAttribute(attr)
    })
  }
}

export const onRequestGet: PagesFunction<{}> = async ({ request }) => {
  const apiPath = "/api"

  const url = new URL(request.url)

  if (url.pathname.startsWith(apiPath)) {
    const subpath = url.pathname.replace(apiPath, "")
    const proxyUrl = `${apiBase}/${subpath}`
    const proxyResponse = await fetch(proxyUrl)

    return new HTMLRewriter()
      .on("script", rewriteStaticAssets)
      .on("link", rewriteStaticAssets)
      .transform(proxyResponse)
  }

  return fetch(request)
}
