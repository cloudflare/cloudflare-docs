---
pcx_content_type: concept
title: Security model
weight: 2
layout: single
---

# Security model

This article includes an overview of Cloudflare security architecture, and then addresses two frequently asked about issues: V8 bugs and Spectre.

Since the very start of the Workers project, security has been a high priority — there was a concern early on that when hosting a large number of tenants on shared infrastructure, side channels of various kinds would pose a threat. The Cloudflare Workers runtime is carefully designed to defend against side channel attacks.

To this end, Workers is designed to make it impossible for code to measure its own execution time locally. For example, the value returned by `Date.now()` is locked in place while code is executing. No other timers are provided. Moreover, Cloudflare provides no access to concurrency (for example, multi-threading), as it could allow attackers to construct ad hoc timers. These design choices cannot be introduced retroactively into other platforms — such as web browsers — because they remove APIs that existing applications depend on. They were possible in Workers only because of runtime design choices from the start.

While these early design decisions have proven effective, Cloudflare is continuing to add defense-in-depth, including techniques to disrupt attacks by rescheduling Workers to create additional layers of isolation between suspicious Workers and high-value Workers.

The Workers approach is very different from the approach taken by most of the industry. It is resistant to the entire range of [Spectre-style attacks](https://www.cloudflare.com/learning/security/threats/meltdown-spectre/), without requiring special attention paid to each one and without needing to block speculation in general. However, because the Workers approach is different, it requires careful study. Cloudflare is currently working with researchers at Graz University of Technology (TU Graz) to study what has been done. These researchers include some of the people who originally discovered Spectre. Cloudflare will publish the results of this research as they becomes available.

For more details, refer to [this talk](https://www.infoq.com/presentations/cloudflare-v8/) by Kenton Varda, architect of Cloudflare Workers. Spectre is covered near the end.

## Architectural overview

Beginning with a quick overview of the Workers runtime architecture:

<div class="security-page-workers-architecture-diagram">
  <img alt="Workers runtime architecture demonstrating design of Cloudflare's HTTP proxy and V8 isolates. Read below for more information." src="./media/Workers-architecture.svg">
</div>

<style>
  [theme="dark"] .security-page-workers-architecture-diagram {
    filter: invert(1);
    -webkit-filter: invert(1);
  }
</style>

There are two fundamental parts of designing a code sandbox: secure isolation and API design.

### Isolation

First, a secure execution environment needed to be created wherein code cannot access anything it is not supposed to.

For this, the primary tool is V8, the JavaScript engine developed by Google for use in Chrome. V8 executes code inside isolates, which prevent that code from accessing memory outside the isolate — even within the same process. Importantly, this means Cloudflare can run many isolates within a single process. This is essential for an edge compute platform like Workers where Cloudflare must host many thousands of guest applications on every machine and rapidly switch between these guests thousands of times per second with minimal overhead. If Cloudflare had to run a separate process for every guest, the number of tenants Cloudflare could support would be drastically reduced, and Cloudflare would have to limit edge compute to a small number of big Enterprise customers. With isolate technology, Cloudflare can make edge compute available to everyone.

Sometimes, though, Cloudflare does decide to schedule a Worker in its own private process. Cloudflare does this if the Worker uses certain features that needs an extra layer of isolation. For example, when a developer uses the devtools debugger to inspect their Worker, Cloudflare runs that Worker in a separate process. This is because historically, in the browser, the inspector protocol has only been usable by the browser’s trusted operator, and therefore has not received as much security scrutiny as the rest of V8. In order to hedge against the increased risk of bugs in the inspector protocol, Cloudflare moves inspected Workers into a separate process with a process-level sandbox. Cloudflare also uses process isolation as an extra defense against Spectre.

Additionally, even for isolates that run in a shared process with other isolates, Cloudflare runs multiple instances of the whole runtime on each machine, which is called cordons. Workers are distributed among cordons by assigning each Worker a level of trust and separating low-trusted Workers from those trusted more highly. As one example of this in operation: a customer who signs up for the Free plan will not be scheduled in the same process as an Enterprise customer. This provides some defense-in-depth in the case a zero-day security vulnerability is found in V8.

At the whole-process level, Cloudflare applies another layer of sandboxing for defense in depth. The layer 2 sandbox uses Linux namespaces and `seccomp` to prohibit all access to the filesystem and network. Namespaces and `seccomp` are commonly used to implement containers. However, Cloudflare's use of these technologies is much stricter than what is usually possible in container engines, because Cloudflare configures namespaces and `seccomp` after the process has started but before any isolates have been loaded. This means, for example, Cloudflare can (and does) use a totally empty filesystem (mount namespace) and uses `seccomp` to block absolutely all filesystem-related system calls. Container engines cannot normally prohibit all filesystem access because doing so would make it impossible to use `exec()` to start the guest program from disk. In the Workers case, Cloudflare's guest programs are not native binaries and the Workers runtime itself has already finished loading before Cloudflare blocks filesystem access.

The layer 2 sandbox also totally prohibits network access. Instead, the process is limited to communicating only over local Unix domain sockets to talk to other processes on the same system. Any communication to the outside world must be mediated by some other local process outside the sandbox.

One such process in particular, which is called the supervisor, is responsible for fetching Worker code and configuration from disk or from other internal services. The supervisor ensures that the sandbox process cannot read any configuration except that which is relevant to the Workers that it should be running.

For example, when the sandbox process receives a request for a Worker it has not seen before, that request includes the encryption key for that Worker’s code, including attached secrets. The sandbox can then pass that key to the supervisor in order to request the code. The sandbox cannot request any Worker for which it has not received the appropriate key. It cannot enumerate known Workers. It also cannot request configuration it does not need; for example, it cannot request the TLS key used for HTTPS traffic to the Worker.

Aside from reading configuration, the other reason for the sandbox to talk to other processes on the system is to implement APIs exposed to Workers.

### API design

There is a saying: If a tree falls in the forest, but no one is there to hear it, does it make a sound? A Cloudflare saying: If a Worker executes in a fully-isolated environment in which it is totally prevented from communicating with the outside world, does it actually run?

Complete code isolation is, in fact, useless. In order for Workers to do anything useful, they have to be allowed to communicate with users. At the very least, a Worker needs to be able to receive requests and respond to them. For Workers to send requests to the world safely, APIs are needed.

In the context of sandboxing, API design takes on a new level of responsibility. Cloudflare APIs define exactly what a Worker can and cannot do. Cloudflare must be very careful to design each API so that it can only express allowed operations and no more. For example, Cloudflare wants to allow Workers to make and receive HTTP requests, while not allowing them to be able to access the local filesystem or internal network services.

Currently, Workers does not allow any access to the local filesystem. Therefore, Cloudflare does not expose a filesystem API at all. No API means no access.

But, imagine if Workers did want to support local filesystem access in the future. How can that be done? Workers should not see the whole filesystem. Imagine, though, if each Worker had its own private directory on the filesystem where it can store whatever it wants.

To do this, Workers would use a design based on [capability-based security](https://en.wikipedia.org/wiki/Capability-based_security). Capabilities are a big topic, but in this case, what it would mean is that Cloudflare would give the Worker an object of type `Directory`, representing a directory on the filesystem. This object would have an API that allows creating and opening files and subdirectories, but does not permit traversing up the parent directory. Effectively, each Worker would see its private `Directory` as if it were the root of their own filesystem.

How would such an API be implemented? As described above, the sandbox process cannot access the real filesystem. Instead, file access would be mediated by the supervisor process. The sandbox talks to the supervisor using [Cap’n Proto RPC](https://capnproto.org/rpc.html), a capability-based RPC protocol. (Cap’n Proto is an open source project currently maintained by the Cloudflare Workers team.) This protocol makes it very easy to implement capability-based APIs, so that Cloudflare can strictly limit the sandbox to accessing only the files that belong to the Workers it is running.

Now what about network access? Today, Workers are allowed to talk to the rest of the world only via HTTP — both incoming and outgoing. There is no API for other forms of network access, therefore it is prohibited; although, Cloudflare plans to support other protocols in the future.

As mentioned before, the sandbox process cannot connect directly to the network. Instead, all outbound HTTP requests are sent over a Unix domain socket to a local proxy service. That service implements restrictions on the request. For example, it verifies that the request is either addressed to a public Internet service or to the Worker’s zone’s own origin server, not to internal services that might be visible on the local machine or network. It also adds a header to every request identifying the Worker from which it originates, so that abusive requests can be traced and blocked. Once everything is in order, the request is sent on to the Cloudflare network's HTTP caching layer and then out to the Internet.

Similarly, inbound HTTP requests do not go directly to the Workers runtime. They are first received by an inbound proxy service. That service is responsible for TLS termination (the Workers runtime never sees TLS keys), as well as identifying the correct Worker script to run for a particular request URL. Once everything is in order, the request is passed over a Unix domain socket to the sandbox process.

## V8 bugs and the patch gap

Every non-trivial piece of software has bugs and sandboxing technologies are no exception. Virtual machines, containers, and isolates — which Workers use — also have bugs.

Workers rely heavily on isolation provided by V8, the JavaScript engine built by Google for use in Chrome. This has pros and cons. On one hand, V8 is an extraordinarily complicated piece of technology, creating a wider attack surface than virtual machines. More complexity means more opportunities for something to go wrong. However, an extraordinary amount of effort goes into finding and fixing V8 bugs, owing to its position as arguably the most popular sandboxing technology in the world. Google regularly pays out 5-figure bounties to anyone finding a V8 sandbox escape. Google also operates fuzzing infrastructure that automatically finds bugs faster than most humans can. Google’s investment does a lot to minimize the danger of V8 zero-days — bugs that are found by malicious actors and not known to Google.

But, what happens after a bug is found and reported? V8 is open source, so fixes for security bugs are developed in the open and released to everyone at the same time. It is important that any patch be rolled out to production as fast as possible, before malicious actors can develop an exploit.

The time between publishing the fix and deploying it is known as the patch gap. Google previously [announced that Chrome’s patch gap had been reduced from 33 days to 15 days](https://www.zdnet.com/article/google-cuts-chrome-patch-gap-in-half-from-33-to-15-days/).

Fortunately, Cloudflare directly controls the machines on which the Workers runtime operates. Nearly the entire build and release process has been automated, so the moment a V8 patch is published, Cloudflare systems automatically build a new release of the Workers runtime and, after one-click sign-off from the necessary (human) reviewers, automatically push that release out to production.

As a result, the Workers patch gap is now under 24 hours. A patch published by V8’s team in Munich during their work day will usually be in production before the end of the US work day.

## Spectre: Introduction

The V8 team at Google has stated that [V8 itself cannot defend against Spectre](https://arxiv.org/abs/1902.05178). Workers does not need to depend on V8 for this. The Workers environment presents many alternative approaches to mitigating Spectre.

### What is it?

Spectre is a class of attacks in which a malicious program can trick the CPU into speculatively performing computation using data that the program is not supposed to have access to. The CPU eventually realizes the problem and does not allow the program to see the results of the speculative computation. However, the program may be able to derive bits of the secret data by looking at subtle side effects of the computation, such as the effects on the cache.

For more information about Spectre, refer to the [Learning Center page on the topic](https://www.cloudflare.com/learning/security/threats/meltdown-spectre/).

### Why does it matter for Workers?

Spectre encompasses a wide variety of vulnerabilities present in modern CPUs. The specific vulnerabilities vary by architecture and model and it is likely that many vulnerabilities exist which have not yet been discovered.

These vulnerabilities are a problem for every cloud compute platform. Any time you have more than one tenant running code on the same machine, Spectre attacks are possible. However, the closer together the tenants are, the more difficult it can be to mitigate specific vulnerabilities. Many of the known issues can be mitigated at the kernel level (protecting processes from each other) or at the hypervisor level (protecting VMs), often with the help of CPU microcode updates and various defenses (many of which can come with serious performance impact).

In Cloudflare Workers, tenants are isolated from each other using V8 isolates — not processes nor VMs. This means that Workers cannot necessarily rely on OS or hypervisor patches to prevent Spectre. Workers need its own strategy.

### Why not use process isolation?

Cloudflare Workers is designed to run your code in every single Cloudflare location.

Workers is designed to be a platform accessible to everyone. It needs to handle a huge number of tenants, where many tenants get very little traffic.

Combine these two points and planning becomes difficult.

A typical, non-edge serverless provider could handle a low-traffic tenant by sending all of that tenant’s traffic to a single machine, so that only one copy of the application needs to be loaded. If the machine can handle, say, a dozen tenants, that is plenty. That machine can be hosted in a massive data center with millions of machines, achieving economies of scale. However, this centralization incurs latency and worldwide bandwidth costs when the users are not nearby.

With Workers, on the other hand, every tenant, regardless of traffic level, currently runs in every Cloudflare location. And in the quest to get as close to the end user as possible, Cloudflare sometimes chooses locations that only have space for a limited number of machines. The net result is that Cloudflare needs to be able to host thousands of active tenants per machine, with the ability to rapidly spin up inactive ones on-demand. That means that each guest cannot take more than a couple megabytes of memory — hardly enough space for a call stack, much less everything else that a process needs.

Moreover, Cloudflare need context switching to be computationally efficient. Many Workers resident in memory will only handle an event every now and then, and many Workers spend less than a fraction of a millisecond on any particular event. In this environment, a single core can easily find itself switching between thousands of different tenants every second. To handle one event, a significant amount of communication needs to happen between the guest application and its host, meaning still more switching and communications overhead. If each tenant lives in its own process, all this overhead is orders of magnitude larger than if many tenants live in a single process. When using strict process isolation in Workers, the CPU cost can easily be 10x what it is with a shared process.

In order to keep Workers inexpensive, fast, and accessible to everyone, Cloudflare needed to find a way to host multiple tenants in a single process.

### There is no fix for Spectre

Spectre does not have an official solution. Not even when using heavyweight virtual machines. Everyone is still vulnerable.

The industry encounters new Spectre attacks. Every couple months, researchers uncover a new Spectre vulnerability, CPU vendors release new microcode, and OS vendors release kernel patches. Everyone must continue updating.

But is it enough to merely deploy the latest patches?

More vulnerabilities exist but have not yet been publicized. To defend against Spectre, Cloudflare needed to take a different approach. It is not enough to block individual known vulnerabilities. Instead, entire classes of vulnerabilities must be addressed at once.

### Building a defense

It is unlikely that any all-encompassing fix for Spectre will be found. However, the following thought experiment raises points to consider:

Fundamentally, all Spectre vulnerabilities use side channels to detect hidden processor state. Side channels, by definition, involve observing some non-deterministic behavior of a system. Conveniently, most software execution environments try hard to eliminate non-determinism, because non-deterministic execution makes applications unreliable.

However, there are a few sorts of non-determinism that are still common. The most obvious among these is timing. The industry long ago gave up on the idea that a program should take the same amount of time every time it runs, because deterministic timing is fundamentally at odds with heuristic performance optimization. Most Spectre attacks focus on timing as a way to detect the hidden microarchitectural state of the CPU.

Some have proposed that this can be solved by making timers inaccurate or adding random noise. However, it turns out that this does not stop attacks; it only makes them slower. If the timer tracks real time at all, then anything you can do to make it inaccurate can be overcome by running an attack multiple times and using statistics to filter out inconsistencies.

Many security researchers see this as the end of the story. What good is slowing down an attack if the attack is still possible?

### Cascading slow-downs

However, measures that slow down an attack can be powerful.

The key insight is this: as an attack becomes slower, new techniques become practical to make it even slower still. The goal, then, is to chain together enough techniques that an attack becomes so slow as to be uninteresting.

Much of cryptography, after all, is technically vulnerable to brute force attacks — technically, with enough time, you can break it. But when the time required is thousands (or even billions) of years, this is a sufficient defense.

What can be done to slow down Spectre attacks to the point of meaninglessness?

## Freezing a Spectre attack

### Step 0: Do not allow native code

Workers does not allow our customers to upload native-code binaries to run on the Cloudflare network — only JavaScript and WebAssembly. Many other languages, like Python, Rust, or even Cobol, can be compiled or transpiled to one of these two formats. Both are passed through V8 to convert these formats into true native code.

This, in itself, does not necessarily make Spectre attacks harder. However, this is presented as step 0 because it is fundamental to enabling the following steps.

Accepting native code programs implies being beholden to an existing CPU architecture (typically, x86). In order to execute code with reasonable performance, it is usually necessary to run the code directly on real hardware, severely limiting the host’s control over how that execution plays out. For example, a kernel or hypervisor has no ability to prohibit applications from invoking the `CLFLUSH` instruction, an instruction [which is useful in side channel attacks](https://gruss.cc/files/flushflush.pdf) and almost nothing else.

Moreover, supporting native code typically implies supporting whole existing operating systems and software stacks, which bring with them decades of expectations about how the architecture works under them. For example, x86 CPUs allow a kernel or hypervisor to disable the RDTSC instruction, which reads a high-precision timer. Realistically, though, disabling it will break many programs because they are implemented to use RDTSC any time they want to know the current time.

Supporting native code would limit choice in future mitigation techniques. There is greater freedom in using an abstract intermediate format.

### Step 1: Disallow timers and multi-threading

In Workers, you can get the current time using the JavaScript Date API, for example by calling `Date.now()`. However, the time value returned by this is not really the current time. Instead, it is the time at which the network message was received which caused the application to begin executing. While the application executes, time is frozen. For example, if an attacker writes:

```js
let start = Date.now();
for (let i = 0; i < 1e6; i++) {
  doSpectreAttack();
}
let end = Date.now();
```

The values of `start` and `end` will always be exactly the same. The attacker cannot use `Date` to measure the execution time of their code, which they would need to do to carry out an attack.

{{<Aside type="note">}}
This measure was implemented in mid-2017, before Spectre was announced. This measure was implemented because Cloudflare was already concerned about side channel timing attacks. The Workers team has designed the system with side channels in mind.
{{</Aside>}}

Similarly, multi-threading and shared memory are not permitted in Workers. Everything related to the processing of one event happens on the same thread. Otherwise, one would be able to race threads in order to guess and check the underlying timer. Multiple Workers are not allowed to operate on the same request concurrently. For example, if you have installed a Cloudflare App on your zone which is implemented using Workers, and your zone itself also uses Workers, then a request to your zone may actually be processed by two Workers in sequence. These run in the same thread.

At this point, measuring code execution time locally is prevented. However, it can still be measured remotely. For example, the HTTP client that is sending a request to trigger the execution of the Worker can measure how long it takes for the Worker to respond. Such a measurement is likely to be very noisy, as it would have to traverse the Internet and incur general networking costs. Such noise can be overcome, in theory, by executing the attack many times and taking an average.

{{<Aside type="note">}}
It has been suggested that if Workers reset its execution environment on every request, that Workers would be in a much safer position against timing attacks. Unfortunately, it is not so simple. The execution state could be stored in a client — not the Worker itself — allowing a Worker to resume its previous state on every new request.
{{</Aside>}}

In adversarial testing and with help from leading Spectre experts, Cloudflare has not been able to develop a remote timing attack that works in production. However, the lack of a working attack does not mean that Workers should stop building defenses. Instead, the Workers team is currently testing some more advanced measures.

### Step 2: Dynamic process isolation

If an attack is possible at all, it would take a long time to run — hours at the very least, maybe as long as weeks. But once an attack has been running even for a second, there is a large amount of new data that can be used to trigger further measures.

Spectre attacks exhibit abnormal behavior that would not usually be seen in a normal program. These attacks intentionally try to create pathological performance scenarios in order to amplify microarchitectural effects. This is especially true when the attack has already been forced to run billions of times in a loop in order to overcome other mitigations, like those discussed above. This tends to show up in metrics like CPU performance counters.

Now, the usual problem with using performance metrics to detect Spectre attacks is that there are sometimes false positives. Sometimes, a legitimate program behaves poorly. The runtime cannot shut down every application that has poor performance.

Instead, the runtime chooses to reschedule any Worker with suspicious performance metrics into its own process. As described above, the runtime cannot do this with every Worker because the overhead would be too high. However, it is acceptable to isolate a few Worker processes as a defense mechanism. If the Worker is legitimate, it will keep operating, with a little more overhead. Fortunately, Cloudflare can relocate a Worker into its own process at basically any time.

In fact, elaborate performance-counter based triggering may not even be necessary here. If a Worker uses a large amount of CPU time per event, then the overhead of isolating it in its own process is relatively less because it switches context less often. So, the runtime might as well use process isolation for any Worker that is CPU-hungry.

Once a Worker is isolated, Cloudflare can rely on the operating system’s Spectre defenses, as most desktop web browsers do.

Cloudflare has been working with the experts at Graz Technical University to develop this approach. TU Graz’s team co-discovered Spectre itself and has been responsible for a huge number of the follow-on discoveries since then. Cloudflare has developed the ability to dynamically isolate Workers and has identified metrics which reliably detect attacks.

As mentioned previously, process isolation is not a complete defense. Over time, Spectre attacks tend to be slower to carry out which means Cloudflare has the ability to reasonably guess and identify malicious actors. Isolating the process further slows down the potential attack.

### Step 3: Periodic whole-memory shuffling

At this point, all known attacks have been prevented. This leaves Workers susceptible to unknown attacks in the future, as with all other CPU-based systems. However, all new attacks will generally be very slow, taking days or longer, leaving Cloudflare with time to prepare a defense.

For example, it is within reason to restart the entire Workers runtime on a daily basis. This will reset the locations of everything in memory, forcing attacks to restart the process of discovering the locations of secrets. Cloudflare can also reschedule Workers across physical machines or cordons, so that the window to attack any particular neighbor is limited.

In general, because Workers are fundamentally preemptible (unlike containers or VMs), Cloudflare has a lot of freedom to frustrate attacks.

Cloudflare sees this as an ongoing investment — not something that will ever be done.
