import React from "react"

import "../css/components/product-grid.css"

const $ = {}
$["1.1.1.1"]              = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/1.1.1.1.js").pathD
$["access"]               = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/access.js").pathD
$["analytics"]            = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/analytics.js").pathD
$["api"]                  = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/api.js").pathD
$["argo-tunnel"]          = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/argo-tunnel.js").pathD
$["byoip"]                = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/byoip.js").pathD
$["cloudflare-for-teams"] = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/cloudflare-for-teams.js").pathD
$["cloudflare-one"]       = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/cloudflare-one.js").pathD
$["distributed-web"]      = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/distributed-web.js").pathD
$["firewall"]             = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/firewall.js").pathD
$["gateway"]              = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/gateway.js").pathD
$["http3"]                = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/http3.js").pathD
$["images"]               = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/images.js").pathD
$["internet"]             = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/internet.js").pathD
$["load-balancing"]       = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/load-balancing.js").pathD
$["logs"]                 = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/logs.js").pathD
$["magic-transit"]        = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/magic-transit.js").pathD
$["mobile-sdk"]           = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/mobile-sdk.js").pathD
$["network-interconnect"] = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/network-interconnect.js").pathD
$["randomness-beacon"]    = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/randomness-beacon.js").pathD
$["registrar"]            = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/registrar.js").pathD
$["spectrum"]             = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/spectrum.js").pathD
$["ssl"]                  = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/ssl.js").pathD
$["stream"]               = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/stream.js").pathD
$["terraform"]            = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/terraform.js").pathD
$["time-services"]        = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/time-services.js").pathD
$["waf"]                  = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/waf.js").pathD
$["warp-client"]          = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/warp-client.js").pathD
$["workers"]              = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/workers.js").pathD

const products = [
  {
    title: "API",
    path: "api",
    icon: "api",
  },
  {
    title: "Access",
    path: "access",
    icon: "access",
  },
  {
    title: "Analytics",
    path: "analytics",
    icon: "analytics",
  },
  {
    title: "Apps",
    href: "https://www.cloudflare.com/apps/docs",
    icon: "api", // TODO: add `apps` icon to https://github.com/cloudflare/cloudflare-brand-assets
  },
  {
    title: "Argo Tunnel",
    path: "argo-tunnel",
    icon: "argo-tunnel",
  },
  // {
  //   title: "Cloudflare One",
  //   path: "cloudflare-one",
  //   icon: "cloudflare-one",
  // },
  {
    title: "BYOIP",
    path: "byoip",
    icon: "byoip",
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
    title: "Gateway",
    path: "gateway",
    icon: "gateway",
  },
  {
    title: "HTTP/3",
    path: "http3",
    icon: "http3",
  },
  {
    title: "Image Resizing",
    path: "images",
    icon: "images",
  },
  {
    title: "Internet",
    path: "internet",
    icon: "internet",
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
    title: "Mobile SDK",
    path: "mobile-sdk",
    icon: "mobile-sdk",
  },
  {
    title: "Network Interconnect",
    path: "network-interconnect",
    icon: "network-interconnect",
    wrap: true,
  },
  {
    title: "Railgun",
    href: "https://www.cloudflare.com/docs/railgun/",
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
  <a className="ProductGrid--link" data-wrap-title={product.wrap} href={product.href || `http://developers.cloudflare.com/${product.path}`}>
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
