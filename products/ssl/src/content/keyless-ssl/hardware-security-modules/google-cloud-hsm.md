---
order: 7
pcx-content-type: tutorial
---

# Google Cloud HSM

This tutorial uses [Google Cloud HSM](https://cloud.google.com/kms/docs/hsm) — a FIPS 140-2 Level 3 certified implementation.

---

## Before you start

Make sure that you have:
- Set up your [Google Cloud project](https://cloud.google.com/kms/docs/quickstart#before-you-begin)

---

## 1. Create a key ring

To set up the Google Cloud HSM, [create a key ring](https://cloud.google.com/kms/docs/hsm#kms-create-key-hsm-web) and indicate its location.

<Aside type="note" header="Note:">Only certain <a href="https://cloud.google.com/kms/docs/locations#hsm-regions">locations</a> support Google Cloud HSM.</Aside>

---

## 2. Create a key

Create a key, including the following information:

<table>
  <thead>
    <tr>
      <th width="25%">Field</th>
      <th width="25%">Value</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Key ring</td>
      <td>The key ring you created in <b>Step 2</b></td>
    </tr>
    <tr>
      <td>Protection level</td>
      <td>HSM</td>
    </tr>
    <tr>
      <td>Purpose</td>
      <td>Asymmetric Encrypt</td>
    </tr>
  </tbody>
</table>

---

## 3. Import the private key

After creating a key ring and key, [import the private key](https://cloud.google.com/kms/docs/importing-a-key).

<Aside type="note" header="Note:">You need to <a href="https://cloud.google.com/kms/docs/formatting-keys-for-import#formatting_asymmetric_keys">convert</a> your key from a PEM to DER format.</Aside>

---

## 4. Modify your gokeyless config file and restart the service

Once you’ve imported the key, copy the **Resource name** from the UI. Then, add this value to the `gokeyless` YAML file under `private_key_stores`.

With the config file saved, restart `gokeyless` and verify it started successfully.
```
$ sudo systemctl restart gokeyless.service
$ sudo systemctl status gokeyless.service -l
```