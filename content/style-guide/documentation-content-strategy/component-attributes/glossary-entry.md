---
pcx_content_type: concept
title: Glossary entry

---

# Glossary entry

## Definition

A single term and corresponding definition in the glossary.

## Used in

Glossary, documentation pages, tooltips.

## Structure

### Data

The data underlying our glossary lives with YAML files in the [`/data/glossary/*`](https://github.com/cloudflare/cloudflare-docs/tree/production/data/glossary) folder.

Each file should be structured similar to the following:

```yaml
---
header: dns.yaml
---
---
productName: DNS
entries:
- term: active zone
  general_definition: |-
    a DNS zone that is active on Cloudflare requires changing its nameservers to Cloudflare's for management.
  associated_products:
    - Cloudflare One

- term: apex domain
  general_definition: |-
    apex domain is used to refer to a domain that does not contain a subdomain part, such as `example.com` (without `www.`). It is also known as "root domain" or "naked domain".

- term: DNS over HTTPS
  general_definition: |-
    DNS over HTTPS (DoH) is a standard for encrypting DNS traffic, preventing tracking and spoofing of DNS queries.
  associated_products:
    - 1.1.1.1
    - Cloudflare One

- term: DNS over TLS
  general_definition: |-
    DNS over TLS (DoT) is a standard for encrypting DNS traffic using its own port (853) and TLS encryption.
  associated_products:
    - 1.1.1.1
    - Cloudflare One
```

Relevant values include the following:

{{<definitions>}}
- `productName` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

    - Core product associated with this file. Should always match the same formatting / styling used in `associated_products`.

- `entries` {{<type>}}object{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
    - `term` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

        - The glossary term itself.

     - `general_definition` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

        - Definition of the term. Should be general enough to apply to multiple products. Should also start with a lowercase letter unless starting with a proper noun.

     - `associated_products` {{<type>}}array{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

        - If the term is associated with other products. Any names used should correspond to the `productName` of that associated file.

{{</definitions>}}

### Usage

Because of the [structured data](#data) associated with our glossaries, we can pull these terms into multiple places.

#### Product-level glossary

A product-level glossary includes all terms associated with a particular product, which will pull in terms directly in that product's glossary file and any terms that include the product in its `associated_products`.

```md
---
header: /dns/glossary.md
---

---
title: Glossary
pcx_content_type: glossary
layout: wide
---

# Glossary

Review the definitions for terms used across Cloudflare's DNS documentation.

{{</*glossary product="DNS"*/>}}

```

#### Glossary definition

Pull glossary definitions directly into your Markdown by using the `{{</*glossary-definition*/>}}` component.

> {{<glossary-definition term_id="active zone" prepend="An active zone is ">}}

Is a quoted definition that comes from:

```md
{{</*glossary-definition term_id="active zone" prepend="An active zone is "*/>}}
```

Properties are:

{{<definitions>}}
- `term_id` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

    - Should match a term within an existing glossary YAML file.

- `prepend` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    - Text to add before a definition.

- `length` {{<type>}}string{{</type>}} {{<prop-meta>}}default: `long`{{</prop-meta>}}

    - If specified as `short`, will only pull the definition text before the first line break in the definition.

{{</definitions>}}

#### Glossary tooltip

Pull component definitions into a focusable tooltip for a specific phrase by using the `{{</*glossary-tooltip*/>}}` component.

Here's a {{<glossary-tooltip term_id="active zone">}}tooltip{{</glossary-tooltip>}} example.

```md
Here's a {{</*glossary-tooltip term_id="active zone">}}tooltip{{</glossary-tooltip*/>}} example.
```

Properties are:

{{<definitions>}}
- `term_id` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

    - Should match a term within an existing glossary YAML file.

- `prepend` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    - Text to add before a definition.

- `link` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

    - Wraps the inner text in a markdown link, similar to normal markdown formatting.

{{</definitions>}}

Because of space limitations, the tooltip will always default to the short definition of a term, meaning the definition text before the first line break.