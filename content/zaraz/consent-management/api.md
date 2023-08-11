---
pcx_content_type: how-to
title: Consent API
weight: 3
---

# Consent API

## Background

The Consent API allows you to programmatically control all aspects of the Consent Management program. This includes managing the modal, the consent status, and obtaining information about your configured purposes.

Using the Consent API, you can integrate Zaraz Consent preferences with an external Consent Management Platform, customize your consent modal, or restrict consent management to users in specific regions.

{{<Aside type="note">}}
Consent API is only available for accounts on a [Workers Paid plan](/workers/platform/pricing/).
{{</Aside>}}

---

## Events

### `Zaraz Consent API Ready`
It can be useful to know when the Consent API is fully loaded on the page so that code interacting with its methods and properties is not called prematurely.

```js
document.addEventListener("zarazConsentAPIReady", () => {
  // do things with the Consent API
});

```

---

## Properties

The following are properties of the `zaraz.consent` object.

{{<definitions>}}

- `modal` {{<type>}}boolean{{</type>}}

  - Get or set the current visibility status of the consent modal dialog.

- `purposes` {{<type>}}object{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

  - An object containing all configured purposes, with their ID, name, description, and order.

- `APIReady` {{<type>}}boolean{{</type>}} {{<prop-meta>}}read-only{{</prop-meta>}}

  - Indicates whether the Consent API is currently available on the page.

{{</definitions>}}

---

## Methods

### `Get`

```js
zaraz.consent.get(purposeId);
```

{{<definitions>}}

- {{<code>}}get(purposeId){{</code>}} : `boolean | undefined`

{{</definitions>}}

Get the current consent status for a purpose using the purpose ID.

- `true`: The consent was granted.
- `false`: The consent was not granted.
- `undefined`: The purpose does not exist.

#### Parameters

{{<definitions>}}

- `purposeId` {{<type>}}string{{</type>}}

  - The ID representing the Purpose.

{{</definitions>}}

### `Set`

```js
zaraz.consent.set(consentPreferences);
```

{{<definitions>}}

- {{<code>}}set(consentPreferences){{</code>}} : `undefined`

{{</definitions>}}

Set the consent status for some purposes using the purpose ID.

#### Parameters

{{<definitions>}}

- `consentPreferences` {{<type>}}object{{</type>}}

  - a `{ purposeId: boolean }` object describing the purposes you want to set and their respective consent status.

{{</definitions>}}

### `Get All`

```js
zaraz.consent.getAll();
```

{{<definitions>}}

- {{<code>}}getAll(){{</code>}} : `{ purposeId: boolean }`

{{</definitions>}}

Returns an object with the consent status of all purposes.

### `Set All`

```js
zaraz.consent.setAll(consentStatus);
```

{{<definitions>}}

- {{<code>}}setAll(consentStatus){{</code>}} : `undefined`

{{</definitions>}}

Set the consent status for all purposes at once.

#### Parameters

{{<definitions>}}

- `consentStatus` {{<type>}}boolean{{</type>}}

  - Indicates whether the consent was granted or not.

{{</definitions>}}

### `Get All Checkboxes`

```js
zaraz.consent.getAllCheckboxes();
```

{{<definitions>}}

- {{<code>}}getAllCheckboxes(){{</code>}} : `{ purposeId: boolean }`

{{</definitions>}}

Returns an object with the checkbox status of all purposes.

### `Set Checkboxes`

```js
zaraz.consent.setCheckboxes(checkboxesStatus);
```

{{<definitions>}}

- {{<code>}}setCheckboxes(checkboxesStatus){{</code>}} : `undefined`

{{</definitions>}}

Set the consent status for some purposes using the purpose ID.

#### Parameters

{{<definitions>}}

- `checkboxesStatus` {{<type>}}object{{</type>}}

  - a `{ purposeId: boolean }` object describing the checkboxes you want to set and their respective checked status.

{{</definitions>}}

### `Set All Checkboxes`

```js
zaraz.consent.setAllCheckboxes(checkboxStatus);
```

{{<definitions>}}

- {{<code>}}setAllCheckboxes(checkboxStatus){{</code>}} : `undefined`

{{</definitions>}}

Set the `checkboxStatus` status for all purposes in the consent modal at once.

#### Parameters

{{<definitions>}}

- `checkboxStatus` {{<type>}}boolean{{</type>}}

  - Indicates whether the purposes should be marked as checked or not.

{{</definitions>}}

### `Send queued events`

```js
zaraz.consent.sendQueuedEvents();
```

{{<definitions>}}

- {{<code>}}sendQueuedEvents(){{</code>}} : `undefined`

{{</definitions>}}

If some Pageview-based events were not sent due to a lack of consent, they can be sent using this method after consent was granted.

## Examples

### Restricting consent checks based on location

You can combine multiple features of Zaraz to effectively disable Consent Management for some visitors. For example, if you would like to use it only for visitors from the EU, you can disable the automatic showing of the consent modal and add a Custom HTML tool with the following script:

```html
<script>
document.addEventListener("zarazConsentAPIReady", () => {
  if ({{system.device.location.isEUCountry}} === 1) {
    zaraz.consent.modal = true
  } else { 
    zaraz.consent.setAll(true)
    zaraz.consent.sendQueuedEvents()
  }
});

</script>
```

By letting this Custom HTML tool to run without consent requirements, the modal will appear to all EU consent, while for other visitors consent will be automatically granted. The `{{ system.device.location.isEUCountry }}` property will be `1` if the visitor is from an EU country and `0` otherwise. You can use any other property or variable to customize the Consent Management behavior in a similar manner, such as `{{ system.device.location.country }}` to restrict consent checks based on country code.
