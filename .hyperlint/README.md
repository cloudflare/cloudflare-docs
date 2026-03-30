## Hyperlint

Hyperlint is a tool that enables us to automatically check if contributions to the docs adhere to our style guide. More info on how the tool works is available on the Hyperlint site: https://hyperlint.com/

#### Custom Vale rules
We have several custom Vale rules that trigger Hyperlint suggestions located in our [custom Vale styles](https://github.com/cloudflare/cloudflare-docs/tree/production/.github/styles/cloudflare).

To report issues with them (or a new one entirely), open an issue in our repo.

#### Specific vocabularies

Instead of creating a long blocklist, we instead opted for an allowlist that can be expanded as use cases arise. New terms can be added to the allowlist file: .github/styles/config/vocabularies/cloudflare/accept.txt

If you resolve all Hyperlint comments, your PR checks will automatically pass. If the checks are especially noisy and unhelpful, add a `hyperlint-ignore` label to your PR and alert PCX to the flag.

