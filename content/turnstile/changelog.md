---
pcx_content_type: changelog
title: Changelog
weight: 10
rss: file
---

# Changelog

## 2023-03-06

- Added [`[execution]`](/turnstile/get-started/client-side-rendering/#explicitly-render-the-turnstile-widget) and [`[appearance]`](/turnstile/get-started/client-side-rendering/#explicitly-render-the-turnstile-widget).

## 2023-02-15

- Added the [`[turnstile.ready]`](/turnstile/get-started/client-side-rendering/#explicitly-render-the-turnstile-widget) callback.

## 2023-02-01

- Added the [`[data-]language`](/turnstile/get-started/client-side-rendering/#configurations) parameter.

## 2022-12-12

- [`POST /siteverify`](/turnstile/get-started/server-side-validation/) supports JSON requests now.

## 2022-11-11

- Added [`retry` and `retry-interval`](/turnstile/get-started/client-side-rendering/#configurations) for controlling retry behavior.

## 2022-10-28

- Renamed the `[data-]expired-callback` callback to [`[data-]timeout-callback`](/turnstile/get-started/client-side-rendering/#configurations) (called when the challenge times out).
- Added the [`[data-]expired-callback`](/turnstile/get-started/client-side-rendering/#configurations) callback (called when the token expires).

## 2022-10-24

- Added [`response-field` and `response-field-name`](/turnstile/get-started/client-side-rendering/#configurations) for controlling the input element created by Turnstile.
- Added option for changing the [size of the Turnstile widget](/turnstile/get-started/client-side-rendering/#widget-size).

## 2022-10-13

- Added validation for action: `/^[a-z0-9_-]{0,32}$/i`
- Added validation for cData: `/^[a-z0-9_-]{0,255}$/i`

## 2022-10-11

- Added [`turnstile.remove`](/turnstile/get-started/client-side-rendering/#remove-a-widget)
