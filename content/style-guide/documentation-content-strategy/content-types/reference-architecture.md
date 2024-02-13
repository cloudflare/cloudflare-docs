---
pcx_content_type: concept
title: Reference architecture

---

# Reference architecture

## Purpose

The purpose of a reference architecture is to provide a high-level view, including visual representation of, how all or part of the Cloudflare platform is built and how Cloudflare products would fit into a customer's existing infrastructure. Reference architectures are designed to show where our platform fits in with a customer's current environment and describe key aspects of a Cloudflare feature/service. Reference architectures should also map to customer use cases to Cloudflare solutions.

They are typically long documents, if you need to describe a single architecture without a great deal of content, please use a [Reference architecture diagram](/style-guide/documentation-content-strategy/content-types/reference-architecture-diagram/)

## Tone

guiding, straightforward

## content_type

`reference-architecture`

## Examples

[Cloudflare Load Balancing Reference Architecture](/reference-architecture/architectures/load-balancing/)

[Magic Transit Reference Architecture](/reference-architecture/architectures/magic-transit/)

[Evolving to a SASE architecture with Cloudflare](/reference-architecture/architectures/sase/)

## Structure

### Required components

[**Title**](/style-guide/documentation-content-strategy/component-attributes/titles/): Short verb phrase in second-person imperative. Do not use gerund phrases. 

[**Introduction**](/style-guide/documentation-content-strategy/component-attributes/introduction/): Two to three paragraphs describing the document subject matter.

[**Intended audience**](/style-guide/documentation-content-strategy/component-attributes/intended-audience/): Description of who the document is written for and what they will learn.

[**Reference diagram**](/style-guide/documentation-content-strategy/component-attributes/reference-diagram/): A single diagram that reflects the overall reference architecture.

### Optional components

[**Notes/warnings**](/style-guide/documentation-content-strategy/component-attributes/notes-tips-warnings/)

[**Examples**](/style-guide/documentation-content-strategy/component-attributes/examples/)

[**Diagrams**](/style-guide/documentation-content-strategy/component-attributes/diagrams/)

**Screenshots**

[**Related links**](/style-guide/documentation-content-strategy/component-attributes/links/): Bulleted list of links to associated resources.

## Template

```

---
title: Cloudflare Reference Architecture
pcx_content_type: reference-architecture
weight: 1
meta:
    title: "Reference Architecture: An example Cloudflare solution"
---
 
# Cloudflare Reference Architecture
 
## Introduction
Cloudflare provides software as a service solutions (SaaS) solutions for performance, security, reliability, and developer services. This reference architecture focuses on the security of the platform and the network these services are built on, as well as the broad security capabilities the services offer for both public facing and internal facing assets.  

### Who is this document for and what will you learn?
This reference architecture is designed for IT or security professionals with some responsibility over or familiarity with their organization’s existing infrastructure. It is useful to have some experience with technologies important to securing hybrid work, including identity providers (IdPs), user directories, single sign on (SSO), endpoint security or management (EPP, XDR, UEM, MDM), firewalls, routers, and point solutions like packet or content inspection hardware, threat prevention, and data loss prevention technologies.

## Heading 1
### Subheading 1
Start by describing the technology which this architecture refers to. Ideally you open with a diagram that either describes the final architecture, or is a base diagram from which the document will build.

![Example reference architecture diagram](/images/reference-architecture/cloudflare-one-reference-architecture-images/cf1-ref-arch-14.svg "The above is an example reference architecture diagram")

## Heading 2
### Subheading 2
Then introduce how Cloudflare fits in

## Heading 3
### Subheading 4
Start to dig into the details of the technology

## Heading 5
### Subheading 5
End with mapping the architecture to real world use cases. Important to connect the reader to how this architecture is used in their own organization.

## Summary
End the document by summarizing everything so far and provide a list of further reading


```
