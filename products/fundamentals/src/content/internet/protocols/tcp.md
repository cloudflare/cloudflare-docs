---
order: 72
---

# TCP

Once you know where the server is located (using DNS) you need to establish a connection with the server (using TCP). The following is taken from a series of blog posts by [JGC](https://twitter.com/jgrahamc) and [Matthew](https://twitter.com/eastdakota). ([Optimizing TLS over TCP to reduce latency](https://blog.cloudflare.com/optimizing-tls-over-tcp-to-reduce-latency/), [Mobile Web Performance: Optimizing TCP Congestion Control Algorithms](https://blog.cloudflare.com/mobile-web-performance-optimizing-tcp-congest/), [Why mobile performance is difficult](https://blog.cloudflare.com/why-mobile-performance-is-difficult/), [The bandwidth of a Boeing 747 and its impact on web browsing](https://blog.cloudflare.com/the-bandwidth-of-a-boeing-747-and-its-impact/)).

Transmission Control Protocol (TCP) is one of the primary protocols of the Internet. When you request a web page, the server responds with the data that makes up that page. The data is subdivided into discrete packets of data as they are sent across the Internet from the server back to your browser. This splitting up the packets, making sure they all arrive, and reordering them so that the packets make sense is all done by TCP.

Protocols like TLS divide the data being transmitted into records of a fixed (maximum) size and then hands those records to TCP for transmission. TCP promptly divides those records up into segments which are then transmitted. Ultimately, those segments are sent inside IP packets which traverse the Internet.

TCP guarantees that segments are delivered in order to the application. Thus if a packet is dropped somewhere between sender and receiver it’s possible for a whole bunch of segments to be held in a buffer waiting for the missing segment to be retransmitted before the buffer can be released to the application.

One of TCP’s main job is to ensure the reliable delivery of packets. TCP is designed to send packets reliably even when there is congestion in the network (think of it like a virtual traffic jam where too many packets are trying to get through). The TCP Congestion Control Algorithm on servers adjust the size of the packets and also the number of packets that are "in-flight" across the network (known as the Congestion Window) depending on whether loss is detected. To ensure reliability, TCP breaks data to be sent up into chunks (which are further broken down into packets) and sends chunks of data and then waits for an acknowledgement that the chunk was successfully received. The amount of data that TCP can send in a single chunk is controlled by the Receive Window of the receiver machine.

At the start of a connection, TCP uses a method called Slow Start to find out what is the maximum possible speed it can transmit at. It does this by sending packets slowly at first and watching for signs of congestion as it ramps up speed.

To establish a TCP handshake, first, the client sends a SYN “initial request” packet to the target server in order to start the dialogue. Then the server then sends a SYN-ACK packet to agree to the process. Lastly, the client sends an ACK packet to the target to confirm the process, after which the message contents can be sent.

When the TCP connection is ready to close, the server sends a FIN packet, which the client acknowledges by sending an ACK packet.
