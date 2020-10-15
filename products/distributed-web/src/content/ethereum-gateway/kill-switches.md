---
order: 5
---

# Kill Switches

## DAO example: Kill Switches

When writing contracts, be especially careful to write secure code and include a
kill switch to ensure that if any bugs do reside in the code, they can be
squashed. If you don't include a kill switch and there are vulnerabilities in
the smart contract that can be exploited, this can lead to the theft of
resources from the smart contract or from other individuals.

This was brought into sharp focus during the [infamous DAO
incident](https://en.wikipedia.org/wiki/The_DAO_(organization)). The DAO smart
contract acted as a complex, decentralized venture capital fund and held Ether
worth $250 million at its peak collected from a group of investors. Hackers
exploited vulnerabilities in the smart contract, stealing $50 million worth of
Ether.

Because there is no way to undo transactions in Ether, there was a highly
controversial “hard fork," where the majority of the community agreed to accept
a block that contained an *irregular state change* that essentially drained all
DAO funds into a special “WithdrawDAO” recovery contract. By convincing enough
miners to accept this irregular block as valid, the DAO was able to return
investors funds. However, not everyone agreed with the chain, with those who
disagreed rejecting the irregular block and forming the Ethereum Classic
network, each blockchain grew independently.

## Be-all end-all solution?

Hardly. Kill switches can cause their own problems. Like if a contract that's a
library has its kill switch flipped. All contracts relying on this contract
can't operate as intended even though the underlying library code is immutable.
Recently, an attacker triggered a kill switch in an underlying library function
that caused over 500,000 Ether to get [stuck in multi-signature
wallets](https://www.parity.io/security-alert-2/). Users of the multi-signature
library assumed the immutability of the code meant that the library would always
operate as anticipated, and accepted the block. In the wake of this, there are
many tools that check smart contracts for bugs or enable bug bounties.

> Smart contracts interacting with the blockchain are only deterministic when
> accounting for the state of the blockchain.

## How is this different?

This is a radically different approach for providing transparency and
accountability. Because all contracts and transactions are public and verified
by **consensus**, trust is distributed amongst the people, rather than
centralized in a few big institutions.

The trust given to institutions is historic. This history builds
trustworthiness.

The trust placed in consensus-based algorithms is based on the assumption that
most people are honest, or more accurately that no sufficiently large subset of
people can be made to collude to produce a malicious outcome. This is the
_democratisation of trust_. In the DAO attack, a majority of nodes agreed to
accept an irregular state transition. This effectively undid the damage of the
attack, and shows how, at least in the world of blockchain, perception is
reality. Because most people “believed" -- accepted this irregular block, it
became a “real” -- valid block.
