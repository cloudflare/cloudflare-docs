---
pcx_content_type: troubleshooting
source: https://support.cloudflare.com/hc/en-us/articles/218344877-Troubleshooting-failed-payments
title: Troubleshooting failed payments
---

# Troubleshooting failed payments

## Overview

If payment for a new Cloudflare plan or add-on/subscription fails, you may need to ask your bank to remove a hold, update your Cloudflare billing information, or confirm that your account has sufficient funds

If payment for a recurring charge for a Cloudflare plan or add-on/subscription is unsuccessful after five (5) days, your account is automatically downgraded to a Free plan. Downgrading to a Free plan does not suspend your website, but you will lose any subscriptions or add-on services associated with the Pro, Business, or Enterprise plan.

{{<Aside type="warning">}}
The five-day grace period for failed payments on recurring Cloudflare
charges includes weekends and holidays. For example, if your payment
fails on a Monday, your account will automatically downgrade to a Free
plan without additional add-ons or subscriptions the following Friday.
{{</Aside>}}

After confirming your payment method information, we suggest [manually updating your plan type](https://support.cloudflare.com/hc/en-us/articles/360033922371) and subscriptions using the Cloudflare dashboard.

___

## Payment Method Validation

All changes to payment methods must now pass validation before being accepted. An error will result if the payment details are incorrect.

Below are common validation methods as well as next steps to rectify the issue:

**Address validation -** The address entered is checked against a database to verify if it is correct. If there is a mismatch the verification will fail.

**Card address validation -** The address entered on the Cloudflare Dashboard is validated against the address that the card is registered with at the card provider. If there is a mismatch the verification will fail.

**CVC validation -** The CVC code is verified against the card entered. If there is a mismatch, the verification will fail. If the card is not accepted for use on our website it will be rejected.

**Card type validation -** The card type is being validated, which means that card types that we do not support will fail. Not all card types are supported by us, this means that some Visa and Mastercard methods may not be supported.

**Address validation** \- The address entered is checked against a database to verify if it is correct. If there is a mismatch the verification will fail.

**Email validation** \- A verification email is sent to the address on file for your PayPal account.

___

## Common reasons for failed payments

### Bank hold

The bank or card issuer has placed a hold or other similar measure that prevents Cloudflare from charging the card on file. The email you received alerting you about the failed payment lists the specific reason for the decline.

Contact your bank to check for any restriction that would prevent Cloudflare from successfully processing your payment.

### Incorrect billing information

The billing information that Cloudflare has on file is inaccurate or incomplete. Also, the credit card on file might have expired.

{{<Aside type="note">}}
Gift cards and pre-payment cards may not be accepted for payment as they
are not associated with a billing address.
{{</Aside>}}

To ensure all billing information is current and accurate, refer to [Updating your Cloudflare billing information](https://support.cloudflare.com/hc/en-us/articles/200170236-How-do-I-update-my-billing-information-).

### Insufficient funds

Cloudflare was unable to collect payment due to insufficient funds in the account on file. Contact your financial institution to ensure fund availability.

### Cloudflare Registrar domain purchases

Cloudflare processes payments for Registrar domain transfers one at a time, which may trigger a failed payment for users that purchase multiple domains at a time.

For example, if you register five (5) domains in one day, you will be charged five times. This may be flagged as fraud by your credit card company.

Contact your financial institution to ensure that this payment will be processed.

___

## Related resources

-   [Cloudflare billing policy](https://support.cloudflare.com/hc/en-us/articles/200170286)
-   [Understanding Cloudflare invoices](https://support.cloudflare.com/hc/en-us/articles/205610698)
-   [Updating your Cloudflare billing information](https://support.cloudflare.com/hc/en-us/articles/200170236)
