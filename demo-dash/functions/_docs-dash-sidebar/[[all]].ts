// TODO: make dash links open in parent
// TODO: handle deep link pickers

const host = "dash-sidebar.cloudflare-docs-7ou.pages.dev";
export const onRequest = async ({ request }) => {
  const url = new URL(request.url);
  url.host = host;
  url.port = "";

  const response = await fetch(url, { redirect: "follow" });

  class HeadHandler {
    element(element) {
      element.before(`<base href="https://${host}/" />`, { html: true });
      element.before(
        `<script>
          function open(href) {
            window.location = new URL(href, window.location.href).toString();
          }

          function openInDashboard(href) {
            window.parent.postMessage({ type: "dashboard-nav", url: href }, window.location.origin);
          }
        </script>`,
        {
          html: true,
        }
      );
      element.before(
        `<script>(() => {
          window.parent.postMessage({ type: "nav", url: window.location.href }, window.location.origin);
        })()</script>`,
        {
          html: true,
        }
      );
      element.before(
        `<style>a[data-dashboard-link] .DocsMarkdown--link-external-icon { display: none; }</style>`,
        {
          html: true,
        }
      );
    }
  }

  class LinkHandler {
    async element(element) {
      const href = element.getAttribute("href");
      if (href.startsWith("https://dash.cloudflare.com/")) {
        element.setAttribute(
          "href",
          `javascript:openInDashboard(${JSON.stringify(
            href.replace("https://dash.cloudflare.com", "")
          )});`
        );
        element.setAttribute("data-dashboard-link", true);
        element.removeAttribute("target");
        element.removeAttribute("rel");
      } else if (href.startsWith(`/_docs-dash-sidebar/`)) {
        element.setAttribute(
          "href",
          `javascript:open(${JSON.stringify(href)});`
        );
      }
    }
  }

  return new HTMLRewriter()
    .on("html", new HeadHandler())
    .on("a", new LinkHandler())
    .transform(response);
};
