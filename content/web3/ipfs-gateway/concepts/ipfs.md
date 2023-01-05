---
pcx_content_type: concept
title: Interplanetary File System (IPFS)
weight: 1
---

# Interplanetary File System (IPFS)

The Interplanetary File System (IPFS) is a distributed file storage protocol that allows computers all over the globe to store and serve files as part of a giant peer-to-peer network.

Any computer, anywhere in the world, can download the IPFS software and start hosting and serving files.

If someone runs IPFS on their computer and uploads a file to the IPFS network, that file can be viewed and downloaded by anyone else in the world who is also running IPFS.

## Content Identifiers

Every file added to IPFS is given a unique address derived from a hash of the file's content. This address is called a Content Identifier (CID) and it combines the hash of the file and a unique identifier for the hash algorithm used into a single string.

IPFS currently uses [SHA-256](https://en.wikipedia.org/wiki/SHA-2) by default, which produces a 256 bit (32 byte) output, and that output is encoded with [Base58](https://en.wikipedia.org/wiki/Base58). Base58 is a binary-to-text encoding scheme originally developed for Bitcoin and has the advantage that letters that might be mistaken for each other in certain fonts (like zero and the capital letter O) are not included.

A CID will typically look something like `QmXoypizjW3WknFiJnKLwHCnL72vedxjQkDDP1mXWo6uco`.

However, the same hash could be encoded with [Base32](https://en.wikipedia.org/wiki/Base32) or other supported hash algorithms including [SHA-3](https://en.wikipedia.org/wiki/SHA-3) and [BLAKE2](https://en.wikipedia.org/wiki/BLAKE_(hash_function)).

## Uploading to IPFS

IPFS is fundamentally a [Distributed Hash Table
(DHT)](https://en.wikipedia.org/wiki/Distributed_hash_table) which maps from CIDs to people who have the content addressed by that CID. The hash
table is distributed because no single node in the network holds the entire
table. Instead, each node stores a subset of the hash table, as well as
information about which nodes are storing other relevant sections.

When someone talks about 'uploading' content to IPFS, what they really mean
(usually) is that they are announcing to the network that they have some content by adding an entry to the DHT that maps from CID to their IP address. Somebody else who wants to download their data would look up the CID in the DHT, find the person's IP address, and download the data directly from them.

The speed and reliability advantages of IPFS come from the fact that many people can upload the same data, and then downloads will be spread between all of them. If any one of them goes offline or decides to stop hosting the data, the others can pick up the slack.

## Directories

You can upload more than just individual files. For example, consider a folder called `example`, which has exactly one file, `example_text.txt`, containing the string `I'm trying out IPFS`.

If that folder were uploaded with the command `ipfs add -r ./example`, both the folder and the file it contains would have their own CID. In this case, the folder would have the CID `QmdbaSQbGU6Wo9i5LyWWVLuU8g6WrYpWh2K4Li4QuuE8Fr` while the file would have the CID `QmXnnyufdzAWL5CqZ2RnSNgPbvCc1ALT73s6epPrRnZ1Xy`.

You could then access the file in two ways:

* Requesting the file directly:<br />
    `https://cloudflare-ipfs.com/ipfs/QmXnnyufdzAWL5CqZ2RnSNgPbvCc1ALT73s6epPrRnZ1Xy`
* Requesting the file by name, from the directory:<br />
    `https://cloudflare-ipfs.com/ipfs/QmdbaSQbGU6Wo9i5LyWWVLuU8g6WrYpWh2K4Li4QuuE8Fr/example_text.txt`

While the CID of a file will only change if the file itself changes, the CID of a directory changes any time **any** of the files in it change, or if any files are added/removed.

Directories make it possible to address an entire static website with a single CID and access different pages of the website by requesting different files in the directory.

## Related resources

For help with additional concepts, refer to the [IPFS](https://docs.ipfs.tech/concepts/) documentation.
