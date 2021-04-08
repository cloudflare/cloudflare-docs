---
order: 3
---

# Connecting Your Website

Cloudflare's gateway allows you to host your website on IPFS and still have it
accessible from a custom domain name. This allows an end user to access your
website without needing to memorize any hash or download any software. Plus,
Cloudflare will issue you a free SSL certificate to allow your website to be
served over HTTPS. Here's how to set that all up.

Prerequisites:

1. A domain that you own.
2. Access to your domain's DNS records.
3. All of the content for your website collected into one folder, with the
   homepage in a file called `index.html`.

A few notes about content: IPFS is currently best for static content, and this
guide assumes that all of the files for your website are static. Also, all links
within your files should be relative links -- this allows your website to be
served in all the ways that IPFS supports.

We should also emphasize that your content should be in a *folder*, even if your
website will consist of only one file. You could make that one file the
`index.html`, or create an `index.html` that redirects/displays the one file you
care about.

## Adding your Content to IPFS

The first thing you have to do is get your content onto IPFS.

Before we get into how to do that, it's important to understand what it means to
add content to IPFS. When content is uploaded to the IPFS network, it only stays
available to the network as long as some node, somewhere in the world, chooses
to host it. If you want to make sure the content you uploaded stays on the
network, you have to make a choice. You can either pay a service to upload the
content and keep it there as long as you pay your bill, or you can run your own
IPFS node.

If you opt to pay someone else, there are pinning services that charge a few
cents per month per gigabyte of storage and have a simple UI for uploading your
content. These services are arguably the simplest option, but they don’t give
you much flexibility.

Alternatively, you can run an IPFS node on a dedicated server or a VPS, and pin
your content there. We'll run through how to do that here.

First off, if you haven’t already, download IPFS by following the instructions
[here](https://docs.ipfs.io/install/).

Once you've downloaded the IPFS software, open a terminal window and connect
your IPFS node to the network by typing:
```
ipfs daemon
```

When the daemon says it’s ready, open another terminal window and add your
content, which is the IPFS address of your content.
```
ipfs add -r /path/to/folder-with-your-content
```

The `-r` tells IPFS to recursively add everything in the folder. If you’re
just uploading a single file you can ignore the `-r`.

This will add your content to IPFS and give you back the hash of the directory.

Now that your content is on the network, you have to make sure it stays there.
IPFS nodes periodically garbage collect any content that you haven't explicitly
told your node you'd like to keep. To ensure that your node doesn’t garbage
collect your content, you need to pin it to your node. This will tell your node
to cache that content permanently.

```
ipfs pin add -r /ipfs/<hash_of_folder>
```

Once you've done this your content will be officially on IPFS. However, you're
still responsible for keeping your node up and running if you want to make sure
that the IPFS network has access to it.

## Connecting to Cloudflare's Gateway

Now your content available on the IPFS network, and you have a hash with which
to request it.

Let's say your hash is `QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco`. Your
website is now available from
`cloudflare-ipfs.com/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco`.
That's pretty cool. But it's not perfect. You're probably not going to go around
telling people, "Check out my new distributed website at
`cloudflare-ipfs.com/ipfs/QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco`."
That's a mouthful. You want it served from your own domain.

We'll go over how to do that now.

First, go to the DNS settings for your domain. When you're there, add the
following two records:

1. CNAME for `your.website` pointing to `cloudflare-ipfs.com`
2. TXT record for `_dnslink.your.website` with the value `dnslink=/ipfs/<your_hash_here>`

Now any request to `your.website` will resolve to
`cloudflare-ipfs.com/ipfs/<your_hash_here>`.

When you want to update your content, just repeat the steps we've outlined
above.

1. Collect all of your updated content into a folder
2. Upload the content to a pinning service or upload it to your own node. If
   you're uploading it to your own node, remember to do both
   `ipfs add -r /path/to/folder-with-your-content` and
   `ipfs pin add -r /ipfs/<hash_of_folder>`.
3. Edit your TXT record for `_dnslink.your.website` to
   `dnslink=/ipfs/<your_NEW_hash_here>`.

If your website is on Cloudflare, the DNS settings are accessible from your
dashboard and can be managed through [our
API](https://api.cloudflare.com/#dns-records-for-a-zone-update-dns-record). If
your website is not on Cloudflare, and you need help finding the DNS records,
[look here](https://support.google.com/projectshield/answer/6358886?hl=en/).
Serving your website from Cloudflare's gateway without the domain itself being
on Cloudflare is called a *CNAME setup* (meaning that you manage the DNS records
directly with your registrar). While our gateway supports CNAME setups, there's
one significant downside that must be mentioned: You won't be able to reach our
support team, and we won't be able to reach you about possible changes to your
website. This is compounded by CNAME setups often being problematic and getting
into cases that are difficult to debug. Signing up for Cloudflare is the
recommended course.

## Make It All Secure

Now your content is on IPFS and your website is connected to Cloudflare's
gateway. There's just one more step to make this secure. If you've followed all
the steps until now, you'll notice that your website works fine when loaded over
HTTP, but is hit with a warning message when you try to load it over HTTPS.
That's because `your.website` is being redirected to `cloudflare-ipfs.com`, but
Cloudflare's gateway doesn't have an SSL certificate for `your.website`. The
good news is that Cloudflare can fix that.

Cloudflare will issue you a free SSL certificate for `your.website`, which
allows users to load `https://your.website`. All you have to do is go to
[cloudflare-ipfs.com](https://cloudflare-ipfs.com) and scroll to the bottom,
where it says "Connecting Your Website." Enter your domain into the text box and
click `Submit`. When you click `Submit` the certificate issuance will
begin. When it’s done, a message will appear indicating that the process has
been completed and your certificate is in place. These certificates will
auto-renew, so once you’ve completed this step, you’ll never need to worry about
certificates again.

With these DNS records and the certificate in place, any request to your domain,
`https://your.website` will be automatically re-routed to
`https://cloudflare-ipfs.com/ipfs/<hash_of_content>` behind the scenes. Visitors
to your website will never have to worry about the fact that your content is
stored in IPFS or deal with hashes. They just go to your domain and the content
loads.

## More with IPFS

If you're interested in learning more about IPFS, you can read the official IPFS
documentation at https://docs.ipfs.io/.
