import React from "react"

import "../css/components/product-grid.css"

const $ = {}
$["1.1.1.1"]              = require("../../../products/1.1.1.1/src/content/icons/1111.js").pathD
$["analytics"]            = require("../../../products/analytics/src/content/icons/analytics.js").pathD
$["api"]                  = require("../../../products/api/src/content/icons/api.js").pathD
$["apps"]                  = require("../../../products/apps.js").pathD
$["api-security"]         = require("../../../products/api-security/src/content/icons/api-security.js").pathD
$["automatic-platform-optimization"]   = require("../../../products/automatic-platform-optimization/src/content/icons/automatic-platform-optimization.js").pathD
$["bots"]                 = require("../../../products/bots/src/content/icons/bots.js").pathD
$["byoip"]                = require("../../../products/byoip/src/content/icons/byoip.js").pathD
$["cache"]                = require("../../../products/cache/src/content/icons/cache.js").pathD
$["cloudflare-for-teams"] = require("../../../products/cloudflare-one/src/content/icons/cloudflare-teams.js").pathD
$["cloudflare-one"]       = require("../../../products/cloudflare-one/src/content/icons/cloudflare-teams.js").pathD
$["distributed-web"]      = require("../../../products/distributed-web/src/content/icons/distributed-web.js").pathD
$["firewall"]             = require("../../../products/firewall/src/content/icons/firewall.js").pathD
$["http3"]                = require("../../../products/http3/src/content/icons/http3.js").pathD
$["images"]               = require("../../../products/images/src/content/icons/images.js").pathD
$["fundamentals"]         = require("../../../products/fundamentals/src/content/icons/cloudflare-fundamentals.js").pathD
$["load-balancing"]       = require("../../../products/load-balancing/src/content/icons/load-balancing.js").pathD
$["logs"]                 = require("../../../products/logs/src/content/icons/logs.js").pathD
$["magic-transit"]        = require("../../../products/magic-transit/src/content/icons/magic-transit.js").pathD
$["magic-firewall"]       = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/firewall.js").pathD
$["magic-wan"]            = require("../../../products/magic-wan/src/content/icons/magic-wan.js").pathD
$["network-interconnect"] = require("../../../products/network-interconnect/src/content/icons/network-interconnect.js").pathD
$["pages"]                = require("../../../products/pages/src/content/icons/pages.js").pathD
$["page-shield"]          = require("../../../products/page-shield/src/content/icons/page-shield.js").pathD
$["partners"]             = require("../../../products/partners/src/content/icons/partners.js").pathD
$["railgun"]              = require("../../../products/railgun/src/content/icons/railgun.js").pathD
$["randomness-beacon"]    = require("../../../products/randomness-beacon/src/content/icons/randomness-beacon.js").pathD
$["registrar"]            = require("../../../products/registrar/src/content/icons/registrar.js").pathD
$["rules"]                = require("../../../products/rules/src/content/icons/rules.js").pathD
$["spectrum"]             = require("../../../products/spectrum/src/content/icons/spectrum.js").pathD
$["ssl"]                  = require("../../../products/ssl/src/content/icons/ssl.js").pathD
$["stream"]               = require("../../../products/stream/src/content/icons/stream.js").pathD
$["tenant"]               = require("../../../products/tenant/src/content/icons/tenant.js").pathD
$["terraform"]            = require("../../../products/terraform/src/content/icons/terraform.js").pathD
$["time-services"]        = require("../../../products/time-services/src/content/icons/time-services.js").pathD
$["waf"]                  = require("../../../products/waf/src/content/icons/waf.js").pathD
$["waiting-room"]         = require("../../../products/waiting-room/src/content/icons/waiting-room.js").pathD
$["warp-client"]          = require("../../../products/warp-client/src/content/icons/warp-client.js").pathD
$["workers"]              = require("../../../products/workers/src/content/icons/workers.js").pathD

const products = [
  {
    title: "API",
    path: "api",
    icon: "api",
  },
  {
    title: "API Security",
    path: "api-security",
    icon: "api-security",
  },
  {
    title: "Analytics",
    path: "analytics",
    icon: "analytics",
  },
  {
    title: "Apps",
    href: "https://www.cloudflare.com/apps/docs",
    icon: "apps",
  },
  {
    title: "Automatic Platform Optimization",
    path: "automatic-platform-optimization",
    icon: "automatic-platform-optimization",
    wrap: true,
  },
  // {
  //   title: "Cloudflare One",
  //   path: "cloudflare-one",
  //   icon: "cloudflare-one",
  // },
  {
    title: "Bots",
    path: "bots",
    icon: "bots",
  },
  {
    title: "BYOIP",
    path: "byoip",
    icon: "byoip",
  },
  {
    title: "Cache",
    path: "cache",
    icon: "cache",
  },
  {
    title: "Cloudflare for Teams",
    path: "cloudflare-one",
    icon: "cloudflare-for-teams",
    wrap: true,
  },
  {
    title: "DNS Resolver",
    path: "1.1.1.1",
    icon: "1.1.1.1",
  },
  {
    title: "Distributed Web Gateway",
    path: "distributed-web",
    icon: "distributed-web",
    wrap: true,
  },
  {
    title: "Firewall Rules",
    path: "firewall",
    icon: "firewall",
  },
  {
    title: "HTTP/3",
    path: "http3",
    icon: "http3",
  },
  {
    title: "Image Resizing",
    path: "image-resizing",
    icon: "images",
  },
  {
    title: "Cloudflare Fundamentals",
    path: "fundamentals",
    icon: "fundamentals",
    wrap: true
  },
  {
    title: "Load Balancing",
    path: "load-balancing",
    icon: "load-balancing",
  },
  {
    title: "Logs",
    path: "logs",
    icon: "logs",
  },
  {
    title: "Magic Transit",
    path: "magic-transit",
    icon: "magic-transit",
  },
  {
    title: "Magic Firewall",
    path: "magic-firewall",
    icon: "magic-firewall",
  },
  {
    title: "Magic WAN",
    path: "magic-wan",
    icon: "magic-wan",
  },
  {
    title: "Network Interconnect",
    path: "network-interconnect",
    icon: "network-interconnect",
    wrap: true,
  },
  {
    title: "Pages",
    path: "pages",
    icon: "pages",
  },
  {
    title: "Page Shield",
    path: "page-shield",
    icon: "page-shield",
  },
  {
    title: "Partners",
    path: "partners",
    icon: "partners",
  },
  {
    title: "Railgun",
    path: "railgun",
    icon: "railgun",
  },
  {
    title: "Randomness Beacon",
    path: "randomness-beacon",
    icon: "randomness-beacon",
    wrap: true,
  },
  {
    title: "Registrar",
    path: "registrar",
    icon: "registrar",
  },
  {
    title: "Rules",
    path: "rules",
    icon: "rules",
  },
  {
    title: "Spectrum",
    path: "spectrum",
    icon: "spectrum",
  },
  {
    title: "SSL",
    path: "ssl",
    icon: "ssl",
  },
  {
    title: "Stream",
    path: "stream",
    icon: "stream",
  },
  {
    title: "Tenant",
    path: "tenant",
    icon: "tenant",
  },
  {
    title: "Terraform",
    path: "terraform",
    icon: "terraform",
  },
  {
    title: "Time Services",
    path: "time-services",
    icon: "time-services",
  },
  {
    title: "WAF",
    path: "waf",
    icon: "waf",
  },
  {
    title: "Waiting Room",
    path: "waiting-room",
    icon: "waiting-room",
  },
  {
    title: "WARP Client",
    path: "warp-client",
    icon: "warp-client",
  },
  {
    title: "Workers",
    path: "workers",
    icon: "workers",
  },
]

const ProductGridLink = ({ product }) => (
  <a className="ProductGrid--link" data-wrap-title={product.wrap} href={product.href || `https://developers.cloudflare.com/${product.path}`}>
    <svg viewBox="0 0 48 48"><path d={$[product.icon]}/></svg>
    <span>{product.title}</span>
  </a>
)

const ProductGridColumns = ({ numColumns }) => {
  const itemsPerColumn = Math.ceil(products.length / numColumns)

  const columns = []
  let n = 0
  for (let i = 0; i < numColumns; i += 1) {
    columns.push([])

    for (let j = 0; j < itemsPerColumn; j += 1) {
      if (n >= products.length) {
        break;
      }
      columns[i].push(products[n])
      n += 1
    }
  }

  return (
    <React.Fragment>
      {columns.map((products, i) => (
        <div key={i} className="ProductGrid--column">
          {products.map((product, j) => (
            <ProductGridLink key={j} product={product}/>
          ))}
        </div>
      ))}
    </React.Fragment>
  )
}

const ProductGrid = () => (
  <div className="ProductGrid">
    <div className="ProductGrid--content" data-columns="4">
      <ProductGridColumns numColumns={4}/>
    </div>
    <div className="ProductGrid--content" data-columns="3">
      <ProductGridColumns numColumns={3}/>
    </div>
    <div className="ProductGrid--content" data-columns="2">
      <ProductGridColumns numColumns={2}/>
    </div>
    <div className="ProductGrid--content" data-columns="1">
      <ProductGridColumns numColumns={1}/>
    </div>
  </div>
)

export default ProductGrid
