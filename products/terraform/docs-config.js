module.exports = {
  product: "Terraform",
  pathPrefix: "/terraform",
  productIconKey: "terraform",
  contentRepo: "cloudflare/cloudflare-docs",
  contentRepoFolder: "products/terraform",
  externalLinks: [
    {
      title: "GitHub @cloudflare/terraform-provider-cloudflare",
      url: "https://github.com/cloudflare/terraform-provider-cloudflare"
    },
    {
      title: "Cloudflare in the Terraform registry",
      url: "https://registry.terraform.io/providers/cloudflare/cloudflare/latest/docs/resources/record"
    },
    {
      title: "Hashicorp Cloudflare integration",
      url: "https://www.hashicorp.com/integrations/cloudflare/terraform"
    },
    {
      title: "Terraform homepage",
      url: "https://www.terraform.io/"
    },
    {
      title: "Cloudflare homepage",
      url: "https://cloudflare.com"
    }
  ],
  search: {
    indexName: "developers-cloudflare",
    apiKey: "b23088ab4d346409f9d3ece6606344c3",
    algoliaOptions: { 'facetFilters': '["project:terraform"]'}
  },
  siteMetadata: {
    title: "Cloudflare Terraform docs",
    description: "With Cloudflare’s Terraform provider, you can manage your edge using the same familiar tools you use to automate the rest of your infrastructure. Define and store configuration in source code repositories like GitHub, track and version changes over time, and roll back when needed—all without needing to learn the Cloudflare APIs",
    author: "@cloudflare",
    url: "https://developers.cloudflare.com/terraform",
    image: "data:image/x-icon;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAQEAYAAABPYyMiAAAABmJLR0T///////8JWPfcAAAACXBIWXMAAABIAAAASABGyWs+AAAAF0lEQVRIx2NgGAWjYBSMglEwCkbBSAcACBAAAeaR9cIAAAAASUVORK5CYII="
  }
}
