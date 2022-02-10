---
order: 5
pcx-content-type: how-to
---

# E-commerce API

`zaraz.ecommerce()` allows you to track common events of the ecommerce user journey, such as when a user adds a product to cart, starts the checkout funnel or completes an order on your website. 

To start using `zaraz-ecommerce()` you first need to enable it in your Zaraz account, and on the tool you plan to send ecommerce data to. Then, you need to add `zaraz.ecommerce()` to the `<body>` element of your website.

## Enable E-commerce tracking

You do not need to map e-commerce events to triggers. Zaraz will automatically forward data using the right format to the tools with ecommerce support.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login), and select your account and website.
1. Click **Zaraz** > **Settings**.
1. Enable **E-commerce tracking**.
1. Click **Save**.
1. Locate the tool you want to use with e-commerce tracking, and click **Edit**.
1. Click **Settings**.
1. Under **Advanced**, enable **E-commerce tracking**.

## Add e-commerce tracking to your website

After enabling e-commerce tracking on your Zaraz dashboard, you need to add `zaraz.ecommerce()` to the `<body>` element of your website:

```js
zaraz.ecommerce('Event Name', {parameters})
```

Below you will find a list of events and parameters Zaraz supports.

## List of supported events

* `Product List Viewed`
* `Products Searched`
* `Product Clicked`
* `Product Added`
* `Product Added to Wishlist`
* `Product Removed`
* `Cart Viewed`
* `Checkout Started`
* `Checkout Step Viewed`
* `Checkout Step Completed`
* `Payment Info Entered`
* `Order Completed`
* `Order Updated`
* `Order Refunded`
* `Order Cancelled`
* `Clicked Promotion`
* `Viewed Promotion`

## List of supported parameters:

Parameter | Type | Description
--- | --- | ---
`product_id` | `string` | Product ID.
`sku` | `string` | Product SKU number.
`category` | `string` | Product category.





