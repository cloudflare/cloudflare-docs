---
pcx_content_type: concept
title: Diagrams

---

# Diagrams

## Definition

An image that depicts a process, architecture or some other form of technology.

## Used in

All content types

## Overview

"A picture is worth a thousand words." This well known adage holds special significace in technology, where complexity is commonplace. Including diagrams in documents helps the reader visualize a specific solution, a process or interaction of technologies. 

## Guidance for diagrams

Use the following markdown to include diagrams in your documents.

```markdown
![Alt text](/link/to/image.svg "Caption to go under the image")
```

For example...

![A simple flow diagram shows interactions between important elements of the design.](/images/firewall/simple-flow.png "An example flow diagram")

Always try to use SVG images for diagrams. Bitmap formats such as PNG and JPEG do not scale well and often people will want to zoom into a diagram and look at the detail.

For the Alt (alternative) text on an image, remember this is often used by a screen reader for people with limited vision and it's often read out as part of the surrounding content. Therefore please make the alt text make sense and flow with the preceeding and following content.
