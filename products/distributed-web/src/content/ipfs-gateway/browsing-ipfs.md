---
order: 1
---

# Browsing Content on IPFS

Browsing IPFS using Cloudflare's gateway requires two things: a browser
connected to the Internet, and the address of something on IPFS that you want to
view.

As mentioned on the [introduction](/ipfs-gateway/) page, every file added to the
IPFS network is given a unique address based on its contents which is called a
Content Identifier, or CID. So if you have an image stored on IPFS, its CID
would be based on the hash of the bits that compose that image.

The job of an *IPFS Gateway* like Cloudflare's is to take requests for CIDs and
return the content corresponding to the given CID. Each time you access a piece
of content through a gateway, you provide a URL with two parts:

1. The hostname of the gateway, or essentially, who you want to answer the
   request. Cloudflare's gateway is accessible at `cloudflare-ipfs.com`, while
   the makers of IPFS run a gateway at `ipfs.io`, and if you run your own node
   you may even have a gateway at `localhost:8080`!
2. The request path, which comes after the hostname. The request path either
   starts with `/ipfs/<hash>` or `/ipns/<domain>`. If the request starts with
   `/ipfs/`, that tells the gateway that you want the content with the CID that
   immediately follows. Because the content is addressed by CID, the gateway's
   response is *immutable* and will *never change*. If the request starts with
   `/ipns/`, that tells the gateway that you want it to lookup the CID
   associated with a given domain in DNS and then serve whatever content
   corresponds to the CID it happens to find. Because DNS can change over time,
   so will the gateway's response.

   That's generally going to look like:
   `/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco`. The `/ipfs/` tells
   the gateway that you're providing the address of a piece of content stored on
   IPFS. The `QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco` is the address
   itself.

Put those two components all together and the URL you provide will look like
this:

- https://cloudflare-ipfs.com/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco/wiki/
- or this: https://cloudflare-ipfs.com/ipns/ipfs.io/

The first link is a mirror of Wikipedia, and I can say that with confidence
because it is an /ipfs/ link and therefore immutable. The second link is IPFS's
marketing site, and they can update it at any time by modifying the DNS records
associated with the ipfs.io domain.
