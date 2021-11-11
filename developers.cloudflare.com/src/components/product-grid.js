import React from "react"
import {useStaticQuery, graphql} from "gatsby"

import "../css/components/product-grid.css"

// Query to get all the products that are sourced from the current-products-list.js file

const useProducts = () => {

  const result = useStaticQuery(graphql`
    query {
      allProduct(sort: { fields: [title], order: ASC }) {
        nodes {
          title
          path
          logoSVGContent
          wrap
          href
        }
      }
    }
    `
    )
 return result
}


// Current implementation of displaying icons - to be deleted in later PR

// const $ = {}
// $["1.1.1.1"]              = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/1.1.1.1.js").pathD
// $["analytics"]            = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/analytics.js").pathD
// $["api"]                  = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/api.js").pathD
// $["api-security"]         = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/page-shield.js").pathD
// $["automatic-platform-optimization"]   = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/automatic-platform-optimization.js").pathD
// $["bots"]                 = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/bots.js").pathD
// $["byoip"]                = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/byoip.js").pathD
// $["cache"]                = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/cache.js").pathD
// $["cloudflare-for-teams"] = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/cloudflare-for-teams.js").pathD
// $["cloudflare-one"]       = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/cloudflare-one.js").pathD
// $["ddos-protection"]      = require("../../../products/ddos-protection/src/content/icons/ddos-protection").pathD
// $["distributed-web"]      = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/distributed-web.js").pathD
// $["firewall"]             = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/firewall.js").pathD
// $["fundamentals"]         = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/fundamentals.js").pathD
// $["http3"]                = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/http3.js").pathD
// $["images"]               = require("../../../products/images/src/content/icons/images").pathD
// $["load-balancing"]       = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/load-balancing.js").pathD
// $["logs"]                 = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/logs.js").pathD
// $["magic-transit"]        = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/magic-transit.js").pathD
// $["magic-firewall"]       = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/firewall.js").pathD
// $["magic-wan"]            = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/magic-wan.js").pathD
// $["network-error-logging"] = require("../../../products/network-error-logging/src/content/icons/network-error-logging.js").pathD
// $["network-interconnect"] = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/network-interconnect.js").pathD
// $["pages"]                = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/pages.js").pathD
// $["page-shield"]          = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/page-shield.js").pathD
// $["partners"]             = require("../../../products/partners/src/content/icons/partners.js").pathD
// $["railgun"]              = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/railgun.js").pathD
// $["randomness-beacon"]    = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/randomness-beacon.js").pathD
// $["registrar"]            = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/registrar.js").pathD
// $["rules"]                = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/rules.js").pathD
// $["ruleset-engine"]       = require("../../../products/ruleset-engine/src/content/icons/ruleset-engine").pathD
// $["spectrum"]             = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/spectrum.js").pathD
// $["ssl"]                  = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/ssl.js").pathD
// $["stream"]               = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/stream.js").pathD
// $["tenant"]               = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/tenant.js").pathD
// $["terraform"]            = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/terraform.js").pathD
// $["time-services"]        = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/time-services.js").pathD
// $["waf"]                  = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/waf.js").pathD
// $["waiting-room"]         = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/waiting-room.js").pathD
// $["warp-client"]          = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/warp-client.js").pathD
// $["workers"]              = require("@cloudflare/cloudflare-brand-assets/resources/product-icons/workers.js").pathD


const ProductGridLink = ({ product }) => (
  <a className="ProductGrid--link" data-wrap-title={product.wrap} href={product.href || `https://developers.cloudflare.com/${product.path}`}>
    {/* TODO: Old way of dispplaying icons - to be deleted in later PR */}
        {/* <svg viewBox="0 0 48 48"><path d={$[product.icon]}/></svg> */}
    <div dangerouslySetInnerHTML={{__html: product.logoSVGContent}} />
    <span>{product.title}</span>
  </a>
)

const ProductGridColumns = ({ numColumns }) => {
  // TODO: uncomment this useProducts when ready for step 2 of using new svg icons
  const productsData = useProducts()
  // TODO: uncomment products to use new way of displaying SVG
  let products = productsData.allProduct.nodes

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
