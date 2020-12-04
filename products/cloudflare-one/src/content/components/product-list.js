import React from "react"

import "../css/product-list.css"

const $ = {}
$["access"] = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/access.js").pathD
$["argo-tunnel"] = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/argo-tunnel.js").pathD
$["gateway"] = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/gateway.js").pathD
$["warp-client"] = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/warp-client.js").pathD

const products = [
  {
    title: "Access",
    path: "access",
    icon: "access",
  },
  {
    title: "Argo Tunnel",
    path: "argo-tunnel",
    icon: "argo-tunnel",
  },
  {
    title: "Gateway",
    path: "gateway",
    icon: "gateway",
  },
  {
    title: "WARP Client",
    path: "warp-client",
    icon: "warp-client",
  },
]

const ProductList = () => (
  <div className="ProductList">
    {products.map((product, j) => (
      <a className="ProductList--link" key={j} data-wrap-title={product.wrap} href={product.href || `http://developers.cloudflare.com/${product.path}`}>
        <svg viewBox="0 0 48 48"><path d={$[product.icon]}/></svg>
        <span>{product.title}</span>
      </a>
    ))}
  </div>
)

export default ProductList
