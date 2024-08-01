---
pcx_content_type: concept
title: Changelog
---

# Changelog

## Purpose

The purpose of a changelog is to log or record notable changes.

## Tone

instructional, straightforward

## content_type

`changelog`

## Ownership

Developers and engineers maintain changelogs manually or via an automated process that their team owns. PCX provides a review but should not own creating or writing changelogs.

The structure of the page can differ depending on the frequency or type of page.

{{<Aside type="note">}}
Do not use the following terms: change log (two words), release notes, what's new, or README.

"What's New" is a specific [content type](https://www.cloudflare.com/whats-new/) for marketing communication.
{{</Aside>}}

## Structure (single-page)

When creating a changelog, you need a Markdown page file and a corresponding YAML file in the [`/data/changelogs` folder](https://github.com/cloudflare/cloudflare-docs/tree/production/data/changelogs).

The combination of these files allows us to:

- Render traditional changelog content on an [HTML page](/stream/platform/changelog/).
- Programmatically create an [RSS feed](/stream/platform/changelog/index.xml) with the changelog content.
- Pull all our changelog content into a [Cloudflare-wide changelog](/changelog/).

### Markdown file

Your Markdown file needs to have several special values to pull in the changelog information. These values are highlighted in the sample page.

```
---
header: /queues/changelog.md
highlight: [5-9, 14]
---

---
pcx_content_type: changelog
title: Changelog
weight: 11
layout: changelog
changelog_file_name: [<YAML_FILE_NAME>] (for example, [queues])
outputs:
    - html
    - rss
---

# Changelog

{{</*product-changelog*/>}}
```

### YAML file

The `product-changelog` component renders data that lives in a file within the [`/data/changelogs` folder](https://github.com/cloudflare/cloudflare-docs/tree/production/data/changelogs).

{{<definitions>}}

- `link` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - Relative path to the changelog page, such as `"/queues/changelog/"`.

- `productName` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - Product name to display on the [changelog](/changelog/) product filter list, as well as other areas of the template.

- `productLink` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - Link to top-level docs for your product (helpful for context if someone is landing on the top-level changelog page)

- `productArea` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - Rollup grouping to surface related products together in context.

- `productAreaLink` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

  - Rollup grouping to surface related products together in context. Helps pull together related RSS feeds.

- `entries` {{<type>}}object{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}
    - `publish_date` {{<type>}}date{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

        - Date of published change, formatted as `YYYY-MM-DD`.

     - `title` {{<type>}}string{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

        - Name of published change. Optional, but highly encouraged.

     - `description` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

        - Markdown string that also follows YAML conventions. For multi-line strings, start the entry with `|-` and then type on an indented new line.

{{</definitions>}}

```yml
---
header: /data/changelogs/queues.yaml
---
---
link: "/queues/changelog/"
productName: Queues
productLink: "/queues/"
productArea: Developer platform
productAreaLink: /workers/platform/changelog/platform/
entries:
- publish_date: '2023-03-28'
  title: Consumer concurrency (enabled)
  description: Queue consumers will now [automatically scale up](/queues/learning/consumer-concurrency/)
    based on the number of messages being written to the queue. To control or limit
    concurrency, you can explicitly define a [`max_concurrency`](/queues/platform/configuration/#consumer)
    for your consumer.
- publish_date: '2023-03-15'
  title: Consumer concurrency (upcoming)
  description: |-
    Queue consumers will soon automatically scale up concurrently as a queues' backlog grows in order to keep overall message processing latency down. Concurrency will be enabled on all existing queues by 2023-03-28.

    **To opt-out, or to configure a fixed maximum concurrency**, set `max_concurrency = 1` in your `wrangler.toml` file or via [the queues dashboard](https://dash.cloudflare.com/?to=/:account/queues).

    **To opt-in, you do not need to take any action**: your consumer will begin to scale out as needed to keep up with your message backlog. It will scale back down as the backlog shrinks, and/or if a consumer starts to generate a higher rate of errors. To learn more about how consumers scale, refer to the [consumer concurrency](/queues/learning/consumer-concurrency/) documentation.
- publish_date: '2023-03-02'
  title: Explicit acknowledgement (new feature)
  description: |-
    You can now [acknowledge individual messages with a batch](/queues/learning/batching-retries/#explicit-acknowledgement) by calling `.ack()` on a message.

    This allows you to mark a message as delivered as you process it within a batch, and avoids the entire batch from being redelivered if your consumer throws an error during batch processing. This can be particularly useful when you are calling external APIs, writing messages to a database, or otherwise performing non-idempotent actions on individual messages within a batch.
- publish_date: '2023-03-01'
  title: Higher per-queue throughput
  description: The per-queue throughput limit has now been [raised to 400 messages
    per second](/queues/platform/limits/).
- publish_date: '2022-12-12'
  title: Increased per-account limits
  description: Queues now allows developers to create up to 100 queues per account,
    up from the initial beta limit of 10 per account. This limit will continue to
    increase over time.
- publish_date: '2022-12-13'
  title: sendBatch support
  description: The JavaScript API for Queue producers now includes a `sendBatch` method
    which supports sending up to 100 messages at a time.
```

---

## Structure (multi-page)

In some cases, your changelog may have a separate page for each entry. The general structure is the same as the [single-page changelog](#structure-single-page), but with a few small differences.

### Markdown files

#### Top-level pages

For the top-level pages, you need the same frontmatter as the [single-page example](#markdown-file), but do not include any shortcodes in the body of the page.

#### Individual entries

For each entry page, create a regular markdown page. These do not require a separate style of page or any adjustments.

### YAML file

Each individual entry needs an abbreviated entry in the changelog `.yaml` file.

```yml
---
header: /data/changelogs/waf.yaml
---
---
link: "/waf/change-log/"
productName: WAF
productLink: "/waf/"
productArea: Application security
productAreaLink: /fundamentals/reference/changelog/security/
entries:
- publish_date: '2023-09-18'
  scheduled_date: '2023-09-25'
  individual_page: true
  scheduled: true
  link: '/waf/change-log/scheduled-changes/'
- publish_date: '2023-09-18'
  individual_page: true
  link: '/waf/change-log/2023-09-18/'
...
```

{{<definitions>}}
- `publish_date` {{<type>}}date{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

    - Date when the page was published, formatted as `YYYY-MM-DD`. For pages with scheduled changes, you should update this field when adding/updating entries, so that the changelog item gets placed at the top of the changelog list (and feed). You should _not_ update this date when clearing all scheduled changes due to a release, since this change is not as relevant.

- `individual_page` {{<type>}}boolean{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

    - Used to pull in the content from the page itself, as opposed to structured data in YAML.

- `link` {{<type>}}string{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

   - Link to the individual page.

- `scheduled` {{<type>}}boolean{{</type>}} {{<prop-meta>}}optional{{</prop-meta>}}

   - Should be included for scheduled pages. Because this component renders content on the underlying page, you should only have a) one scheduled entry per scheduled entry page and b) only a scheduled entry when the scheduled entry page has content.

- `scheduled_date` {{<type>}}date{{</type>}} {{<prop-meta>}}required{{</prop-meta>}}

   - Should be included for pages with scheduled changes. Helps render the date of the upcoming change in the title, which provides more actionable information to folks scanning titles or the associated RSS feeds.

{{</definitions>}}

{{<Aside type="note">}}

If the scheduled date gets pushed for a change, update the `publish_date` and `scheduled_date` fields of the changelog entry. This process makes sure customers will receive notifications via their RSS feeds.

{{</Aside>}}

## Examples

- [Stream Changelog](/stream/platform/changelog/)
- [Pages Changelog](/pages/platform/changelog/)
- [WAF Changelog](/waf/change-log/)