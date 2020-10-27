---
title: Background
order: 1
---

# Where did it all begin?

Over the years, a generation of public randomness (often referred to as _common coins_) has attracted continuous interest from the cryptography research community. Many distributed systems, including various consensus mechanisms, anonymity networks such as Tor, or blockchain systems, assume access to such public randomness. However, it remained a major unsolved issue to generate public randomness in a distributed, scalable, and robust way. Currently, there is no service deployed to produce this type of randomness. The only choice is a centralized, prototype-only randomness beacon run by [NIST](https://www.nist.gov/).



Realizing this, [Ewa Syta](http://ewa.syta.us/) started a project on [Scalable Bias-Resistant Distributed Randomness](https://eprint.iacr.org/2016/1067) during her PhD studies under the supervision of [Michael J. Fischer](http://www.cs.yale.edu/homes/fischer/) and [Bryan Ford](https://bford.info/) at Yale University. After Bryan moved to EPFL in 2015, the new members of the DEDIS team at EPFL ([Nicolas Gailly](https://github.com/nikkolasg/), [Linus Gasser](https://people.epfl.ch/linus.gasser), [Philipp Jovanovic](https://jovanovic.io/), [Ismail Khoffi](https://ismailkhoffi.com/), [Eleftherios Kokoris Kogias](https://lefteriskk.github.io/)) joined the project and together published a research paper at the [2017 IEEE Symposium on Security and Privacy](https://ieeexplore.ieee.org/abstract/document/7958592).

The paper explored the use of key pairings instead of classical elliptic curve cryptography to generate public randomness as a way to simplify the proposed protocol designs and improve performance in terms of randomness generation and verification.

In early 2017, the [DEDIS](https://dedis.epfl.ch/) team at [EPFL](https://www.epfl.ch/en/) started collaborating with [DFINITY](https://dfinity.org/) on various research topics, inlcuding public randomness. The DFINITY architecture is built around a pairing-based randomness beacon sharing similarities to the constructs described in the DEDIS paper. Additionally, DFINITY has already implemented an optimized pairing library in C++. After integrating this implementation into the DEDIS’ crypto library [Kyber](https://github.com/dedis/kyber), all major cryptographic components were ready to implement an efficient, distributed randomness generation protocol using pairings.

In September 2017, Nicolas, a PhD student at DEDIS, started coding drand with the help of Philipp to deploy, for the first time, a distributed service providing public randomness in an application-agnostic, secure, and efficient way. A short time later, Cloudflare released an optimized Golang implementation of the BN256 pairing curve, which is now integrated in both Kyber and drand to simplify development and deployment.



As drand has gained maturity, an increasing number of organizations (including NIST, Cloudflare, Kudelski Security, the University of Chile, and Protocol Labs) started taking interest, and decided to collectively work on setting up a [drand](https://github.com/dedis/drand) network spanning these organizations. To support the use of public randomness in web applications, [Mathilde Raynal](https://people.epfl.ch/mathilde.raynal?lang=en), a master student at DEDIS, started developing a JavaScript proof-of-concept frontend, called [_drandjs_](https://github.com/PizzaWhisperer/drandjs), to interact with drand servers.

In spring 2020, a team at Protocol Labs led efforts to take drand from an experimental to production-ready network. These efforts included significant protocol upgrades, establishment of a governance model for the distributed network, and increased operational security of node operators. Check out the [drand blog](https://drand.love/blog/2020/08/10/drand-launches-v1-0/) for more details.