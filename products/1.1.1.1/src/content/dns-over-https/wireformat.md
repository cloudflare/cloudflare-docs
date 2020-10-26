---
order: 11
---

# Using DNS Wireformat

Cloudflare respects DNS wireformat as is defined in RFC1035.

To send queries using DNS wire format, set the header 'accept: application/dns-message', or 'content-type: application/dns-message' if using POST to signalize the media type of the query.

Queries using DNS wireformat can be sent using POST or GET.

## Using POST

When making requests using POST, the DNS query is included as the message body of the HTTP request, and the MIME type (see below) is included in the Content-Type request header. Cloudflare will use the message body of the HTTP request as sent by the client, so the message body should not be encoded.

Example request:

The same DNS query for www.example.com, using the POST method would be:

    :method = POST
    :scheme = https
    :authority = cloudflare-dns.com
    :path = /dns-query
    accept = application/dns-message
    content-type = application/dns-message
    content-length = 33

    <33 bytes represented by the following hex encoding>
    00 00 01 00 00 01 00 00  00 00 00 00 03 77 77 77
    07 65 78 61 6d 70 6c 65  03 63 6f 6d 00 00 01 00
    01

And would return the answer in wireformat:

    :status = 200
    content-type = application/dns-message
    content-length = 64
    cache-control = max-age=128

    <64 bytes represented by the following hex encoding>
    00 00 81 80 00 01 00 01  00 00 00 00 03 77 77 77
    07 65 78 61 6d 70 6c 65  03 63 6f 6d 00 00 01 00
    01 03 77 77 77 07 65 78  61 6d 70 6c 65 03 63 6f
    6d 00 00 01 00 01 00 00  00 80 00 04 C0 00 02 01

To try using cURL you can do:

    echo -n 'q80BAAABAAAAAAAAA3d3dwdleGFtcGxlA2NvbQAAAQAB' | base64 -D | curl -H 'content-type: application/dns-message' --data-binary @- https://cloudflare-dns.com/dns-query -o - | hexdump

## Using GET

When making requests using GET, the DNS query is encoded into the URL. The 'accept' header can be used to indicate the MIME type (default: 'application/dns-message').

Example request:

    $ curl -H 'accept: application/dns-message' -v 'https://cloudflare-dns.com/dns-query?dns=q80BAAABAAAAAAAAA3d3dwdleGFtcGxlA2NvbQAAAQAB' | hexdump
    * Using HTTP2, server supports multi-use
    * Connection state changed (HTTP/2 confirmed)
    * Copying HTTP/2 data in stream buffer to connection buffer after upgrade: len=0
    * Using Stream ID: 1 (easy handle 0x7f968700a400)
    GET /dns-query?dns=q80BAAABAAAAAAAAA3d3dwdleGFtcGxlA2NvbQAAAQAB HTTP/2
    Host: cloudflare-dns.com
    User-Agent: curl/7.54.0
    accept: application/dns-message

    * Connection state changed (MAX_CONCURRENT_STREAMS updated)!
    HTTP/2 200
    date: Fri, 23 Mar 2018 05:14:02 GMT
    content-type: application/dns-message
    content-length: 49
    cache-control: max-age=0
    set-cookie: \__cfduid=dd1fb65f0185fadf50bbb6cd14ecbc5b01521782042; expires=Sat, 23-Mar-19 05:14:02 GMT; path=/; domain=.cloudflare.com; HttpOnly
    server: cloudflare-nginx
    cf-ray: 3ffe69838a418c4c-SFO-DOG

    { [49 bytes data]
    100    49  100    49    0     0    493      0 --:--:-- --:--:-- --:--:--   494
    * Connection #0 to host cloudflare-dns.com left intact
    0000000 ab cd 81 80 00 01 00 01 00 00 00 00 03 77 77 77
    0000010 07 65 78 61 6d 70 6c 65 03 63 6f 6d 00 00 01 00
    0000020 01 c0 0c 00 01 00 01 00 00 0a 8b 00 04 5d b8 d8
    0000030 22
    0000031
