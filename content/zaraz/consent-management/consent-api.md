---
pcx_content_type: reference
title: Consent API
weight: 3
meta:
  title: Consent API Reference
---

# Consent API

The Consent API allows you to use a custom UI for gathering and managing
consent. The API exposes methods that let you read and write consent settings so
they can be taken processed by the Zaraz worker.

## Read the consent choices

### Get all consent choices

```js
zaraz.getConsentChoices();
```

Returns an object that maps purpose ids to a boolean. `true` means that the user
expressed consent for the given purpose and the consent is has not been revoked.

### Get consent status for specific purpose

```js
zaraz.getPurposeChoice("purpose_id");
```

Returns a boolean value. `true` means that the user expressed consent for the
given purpose and the consent is has not been revoked.

## Set consent choices

### Set choices for all purposes

```js
zaraz.setConsentChoices({ b87016: true, a7c4: false });
```

Sets multiple consent choices. Takes an object mapping purpose id to a boolean
as an argument. Setting `false` or omitting a value for a purpose means that the
user does not currently give consent for the given purpose.

### Toggle choice for a specific purpose

```js
zaraz.togglePurposeConsent("purpose_id");
```

Toggles the consent choice for a given purpose. Useful for implementing custom
checkboxes.

## Consent modal

### Open the consent modal

```js
zaraz.showConsentModal();

// or

zaraz.showConsentModal(true);
```

Opens the default Consent modal that's built into Zaraz. Invoking with `true`
makes all the checkboxes within the modal unchecked -- regardless of the status
of consent. This is useful only when displaying the modal when you know that the
user haven't yet made any choices and want the function to do less DOM
manipulation involved with loading the status for each checkbox.

### Close the consent modal

```js
zaraz.hideConsentModal();

// or

zaraz.hideConsentModal(true);
```

Closes the default Consent modal that's build into Zaraz. Invoking with `true` will have an additional side-effect of sending a `__zarazConsentedPageview` event, which makes Zaraz propagate the pageview event to tools that were disabled before the Consent modal was shown.
