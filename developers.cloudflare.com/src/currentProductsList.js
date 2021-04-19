
 // Current list of the products that are live on the developer docs 

 // When adding a new product and to have that product tile icon show up, need to add the path information for your product here.
 
 
 const products = [
    {
      title: "API",
      path: "api",
      icon: "api",
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

module.exports = {
  products
}