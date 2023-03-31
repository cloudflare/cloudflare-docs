import redirects from "./redirects"

const apiBase = "https://cloudflare-api-docs-frontend.pages.dev"

const rewriteStaticAssets = {
  element: (element: Element) => {
    const prefixAttribute = (attr: string) => {
      const value = element.getAttribute(attr)

      if (value.startsWith("http")) {
        return
      }

      const updatedValue = `/api/${value.startsWith('/') ? value.slice(1) : value}`
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

  let subpath = url.pathname.replace(apiPath, "")
  let normalizedSubpath = subpath.slice(-1) === "/" ? subpath.substring(0, subpath.length - 1) : subpath;
  if(normalizedSubpath in redirects) {
    url.pathname = redirects[normalizedSubpath]
    return Response.redirect(url.toString(), 301)
  }
  const proxyUrl = `${apiBase}/${subpath}`
  const proxyResponse = await fetch(proxyUrl)

  return new HTMLRewriter()
    .on("script", rewriteStaticAssets)
    .on("link", rewriteStaticAssets)
    .on("img", rewriteStaticAssets)
    .transform(proxyResponse)
}
