---

title: Setup Phase


---

In the drand setup phase, you create a collective private and public key pair shared among _𝑛_ participants. This is done through a `𝑡-of-𝑛` Distributed Key Generation (DKG) process and results in each participant recieving a copy of the collective public key plus a private key share of the collective private key &mdash; no individual node knows the collective **private** key. Each private key share can then be used to perform cryptographic threshold computations, such as generating threshold signatures, where at least `𝑡` contributions produced using the individual private key shares are required to successfully finish the collective operation.

A DKG is performed in a fully distributed manner, avoiding any single points of failure. This is an overview of the different sub-components of the drand DKG implementation.




##
Secret Sharing


Secret sharing is an important technique many advanced threshold cryptography mechanisms rely on.

Secret sharing allows you to split a secret value `𝑠` into `𝑛` shares `𝑠1,…,𝑠𝑛` so that `𝑠` can only be reconstructed if a threshold of `𝑡` shares is available.


###
Shamir’s Secret Sharing (SSS)

The SSS scheme is one of the most well-known and widely used secret sharing approaches, and a core component of drand. SSS works over an arbitrary finite field, but a simplistic approach uses the integers modulo `𝑝`, denoted by `ℤ𝑝`. Let `𝑠∈ℤ𝑝` denote the secret to share.


**
Share Distribution**
To share `𝑠`, a dealer first creates a polynomial, `𝑞(𝑥)=𝑎0+𝑎1𝑥+⋯+𝑎𝑡−1𝑥𝑡−1` with `𝑎0=𝑠` and (random) `𝑎𝑖∈ℤ𝑝` for `𝑖=1,…,𝑡−1` and then creates one share 𝑠𝑖 for each participant 𝑖 by evaluating 𝑞(𝑥) at the integer 𝑖 and setting 𝑠𝑖=(𝑖,𝑞(𝑖)).



**Secret Reconstruction**

To recover the secret `𝑠`, collect at least `𝑡` shares, then uniquely reconstruct `𝑞(𝑥)` using Lagrange interpolation and obtain `𝑠` as `𝑠=𝑎0=𝑞(0)`.

Note that you can use any subset of `𝑡-of-𝑛` shares to perform Lagrange interpolation and uniquely determine `𝑠`; however, having a subset of less than `𝑡` shares does not allow to learn anything about `𝑠`.

###

Verifiable Secret Sharing


SSS scheme assumes that the dealer is honest, but this may not always hold in practice. A Verifiable Secret Sharing (VSS) scheme protects against malicious dealers by enabling participants to verify that their shares are consistent with those dealt to other nodes, ensuring that the shared secret can be correctly reconstructed later.




drand uses Feldman’s VSS scheme, an extension of SSS. Let `𝔾` denote a cyclic group of prime order `𝑝` in which computing discrete logarithms is intractable. A _cyclic group_ means there exists a generator, `𝑔`, so that any element `𝑥∈𝔾` can be written as `𝑥=𝑔𝑎` for some `𝑎∈{0,…,𝑝−1}`.



**Share Distribution**

In addition to distributing shares of the secret to participants, the dealer also broadcasts commitments to the coefficients of the polynomial `𝑞(𝑥)` of the form `(𝐴0,𝐴1,…,𝐴𝑡−1)=(𝑔𝑠,𝑔𝑎1,…,𝑔𝑎𝑡−1)`. These commitments enable individual participants, `𝑖`, to verify that their share `𝑠𝑖=(𝑖,𝑞(𝑖))` is consistent with respect to the polynomial `𝑞(𝑥)` by checking that `𝑔𝑞(𝑖)=∏𝑡−1𝑗=0(𝐴𝑗)𝑖𝑗` holds.



**Secret Reconstruction**

The recovery of secret `𝑠` works the same as regular SSS, except that verified to be valid shares are used.



## Distributed Key Generation
 (DKG)

Although VSS schemes protect against a malicious dealer, the dealer still knows the secret. To create a collectively shared secret `𝑠` so no individual node gets any information about it, participants can use a DKG protocol. drand uses Pedersen’s DKG scheme, which runs `𝑛` instances of Feldman’s VSS in parallel and on top of additional verification steps.


**
Share Distribution**

Individual participants, `𝑖`, create a (random) secret, `𝑠𝑖∈ℤ𝑝`, and share it all participants using VSS, sending a share, `𝑠𝑖,𝑗` to each `𝑗` and broadcasts the list of commitments `(𝐴𝑖,0,𝐴𝑖,1,…,𝐴𝑖,𝑡−1)` to everyone.



**Share Verification**

`𝑗` verifies the shares received as prescribed by Feldman’s VSS scheme. If `𝑗` receives an invalid share, `𝑠𝑖,𝑗`, from `𝑖`, then `𝑗` broadcasts a complaint. `𝑖` must reveal the correct share `𝑠𝑖,𝑗` or they are considered an invalid dealer.



**Share Finalization**

At the end of the protocol, the final share of `𝑖` is `𝑠𝑖=∑𝑗𝑠𝑗,𝑖` for all valid participants `𝑗` , that is, for all `𝑗`s not excluded during the verification phase.

The collective public key associated with the valid shares can be computed as `𝑆=∑𝑗𝐴𝑗,0` for all valid `𝑗`s.


>**
Note:** Even though the secret created using Pedersen’s DKG can be biased, it is safe to use for threshold signing as shown by Rabin et al.


In this section, we describe how to use this collective key pair to generate publicly-verifiable, unbiasable, and unpredictable randomness in a distributed manner.

First, we explain pairing-based cryptography (PBC), which has become quite popular, and is used in many modern consensus protocols or zero-knowledge proofs, such as zk-SNARKs. We'll then show how drand uses PBC for the randomness beacon generation phase for threshold Boneh-Lynn-Shacham (BLS) signatures. Finally, we'll discuss how drand links the generated threshold BLS signatures into a randomness chain.



# Pairing-based Cryptography


Pairing-based cryptography is based on bilinear groups `(𝔾1,𝔾2,𝔾𝑡)`, where `𝔾1`, `𝔾2`, and `𝔾𝑡` are cyclic groups of prime order `𝑝` with generators `𝑔1`, `𝑔2`, and `𝑔𝑡`, respectively, and a pairing operation `𝑒:𝔾1×𝔾2→𝔾𝑡` with these properties:

- **Bilinearity:** `∀𝑎,𝑏∈ℤ∗𝑝,∀𝑃∈𝔾1,∀𝑄∈𝔾2,` we have `𝑒(𝑎𝑃,𝑏𝑄)=𝑒(𝑃,𝑄)𝑎𝑏`

- **Non-degeneracy:** `𝑒≠1`
- **Computability:** There exists an efficient algorithm to compute `𝑒`.
	drand currently uses the Barreto-Naehrig curve BN256.


# Randomness Generation


To generate publicly-verifiable, unbiasable, distributed randomness, drand utilizes threshold Boneh-Lynn-Shacham (BLS) signatures. First we'll describe regular BLS signatures and then the threshold variant.

## BLS Signature



BLS signatures are short signatures that rely on bilinear pairings and consist only of a single element in `𝔾1`. They are deterministic in the sense they depend only on the message and the signer’s key, unlike other signature schemes, such as ECDSA, that require a fresh random value for each signed message to be secure. Put differently, any two BLS signatures on a given message produced with the same key are identical. In drand, we utilize this property to achieve unbiasability for randomness generation.

The BLS signature scheme consists of the these sub-procedures.

**Key Generation**

To generate a key pair, a signer first chooses a private key, `𝑥∈ℤ∗𝑝`, at random, and then computes the corresponding public key as `𝑋=𝑔𝑥2∈𝔾2`.



**Signature Generation**

Let `𝐻:{0,1}∗→𝔾1` denote a cryptographic hash function that maps arbitrary bit strings to elements of `𝔾1`. To compute a BLS signature `𝜎` on a message `𝑚`, the signer simply computes `𝜎=𝑥𝐻(𝑚)∈𝔾1`.



**Signature Verification**

To verify that a BLS signature `𝜎` on a message `𝑚` is valid, the verifier checks if `𝑒(𝐻(𝑚),𝑋)=𝑒(𝜎,𝑔2)` holds using the signer’s public key `𝑋`.

It's easy to see that this equation holds for valid signatures since `𝑒(𝐻(𝑚),𝑋)=𝑒(𝐻(𝑚),𝑔𝑥2)=𝑒(𝐻(𝑚),𝑔2)𝑥=𝑒(𝑥𝐻(𝑚),𝑔2)=𝑒(𝜎,𝑔2)`.

### Threshold BLS Signature

The goal of a threshold signature scheme is to collectively compute a signature by combining individual partial signatures independently generated by the participants. A threshold BLS signature scheme has the following sub-procedures.


**Key Generation**

The `𝑛` participants execute a `𝑡-of-𝑛` DKG to setup a collective public key, `𝑆∈𝔾2`, and private key shares `𝑠𝑖∈ℤ∗𝑝` of the unknown collective private key, `𝑠`, as described above.



**Partial Signature Generation**

To sign a message, `𝑚`, each `𝑖` uses their private key share, `𝑠𝑖`, to create a partial BLS signature, `𝜎𝑖=𝑠𝑖𝐻(𝑚)`.


**Partial Signature Verification**

To verify the correctness of a partial signature, `𝜎𝑖`, on `𝑚`, a verifier uses the public key share, `𝑆𝑖`, generated during the DKG, and verifies that `𝑒(𝐻(𝑚),𝑆𝑖)=𝑒(𝜎𝑖,𝑔2)` holds.



**Signature Reconstruction**

To reconstruct the collective BLS signature, `𝜎` on `𝑚`, a verifier first gathers `𝑡` different and valid partial BLS signatures, `𝜎𝑖`, on `𝑚` followed by a Lagrange interpolation.



**Signature Verification**

To verify a collective BLS signature, `𝜎`, a verifier simply checks that `𝑒(𝐻(𝑚),𝑆)=𝑒(𝜎,𝑔2)` holds, where `𝑆` is the collective public key.



Thanks to the properties of Lagrange interpolation, the value of `𝜎` is independent of the subset of `𝑡` valid partial signatures, `𝜎𝑖`, chosen during signature reconstruction. Additionally, Lagrange interpolation also guarantees that no set of less than `𝑡` signers can predict or bias `𝜎`.

In summary, a threshold BLS signature, `𝜎`, exhibits all properties required for publicly-verifiable, unbiasable, unpredictable, and distributed randomness.



## Chained Randomness


The drand randomness beacon operates in discrete rounds, `𝑟`. In every round, drand producess a new random value using threshold BLS signatures linked together into a chain of randomness. To extend this chain of randomness, each drand participant, `𝑖`, creates in round `𝑟` the partial BLS signature, `𝜎𝑟𝑖` on the message `𝑚=𝐻(𝑟∥𝜎𝑟−1)` where, `𝜎𝑟−1` denotes the (full) BLS threshold signature from round `𝑟−1` and `𝐻`, a cryptographic hash function.

Once at least `𝑡` participants have broadcasted their partial signatures, `𝜎𝑟𝑖`, on `𝑚`, anyone can recover the full BLS threshold signature, `𝜎𝑟` that corresponds to the random value of round `𝑟`. After this, drand nodes move to round `𝑟+1` and reiterate the process.

For round `𝑟=0`, drand participants sign a seed fixed during drand setup. This process ensures that every new random value depends on all previously generated signatures. Since the signature is deterministic, there is also no possibility for an adversary forking the chain and presenting two distinct signatures `𝜎𝑟` and `𝜎′𝑟` in a given round `𝑟` to generate inconsistencies in the systems relying on public randomness.