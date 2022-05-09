---
pcx-content-type: how-to
title: Ecommerce
weight: 6
meta:
  title: zaraz.ecommerce
---

# Ecommerce

You can use `zaraz.ecommerce()` anywhere inside the `<body>` tag of a page.

`zaraz.ecommerce()` allows you to track common events of the ecommerce user journey, such as when a user adds a product to cart, starts the checkout funnel or completes an order on your website.

To start using `zaraz.ecommerce()`, you first need to enable it in your Zaraz account and on the tool you plan to send ecommerce data to. Then, add `zaraz.ecommerce()` to the `<body>` element of your website.

Right now, Zaraz is compatible with Google Analytics 3 (Universal Analytics), Google Analytics 4, Bing and Facebook Pixel.

## Enable ecommerce tracking

You do not need to map ecommerce events to triggers. Zaraz will automatically forward data using the right format to the tools with ecommerce support.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and website.
2. Click **Zaraz** > **Settings**.
3. Enable **Ecommerce tracking**.
4. Click **Save**.
5. Go to **Zaraz** > **Tools**.
6. Locate the tool you want to use with ecommerce tracking and click **Edit**.
7. Click **Settings**.
8. Under **Advanced**, enable **Ecommerce tracking**.
9. Click **Save**.

## Add ecommerce tracking to your website

After enabling ecommerce tracking on your Zaraz dashboard, you need to add `zaraz.ecommerce()` to the `<body>` element of your website:

```js
zaraz.ecommerce('Event Name', { parameters });
```

To create a complete tracking event, you need to add an event and one or more parameters. Below you will find a list of events and parameters Zaraz supports, as well as code examples for different types of events.

## List of supported events

- `Product List Viewed`
- `Products Searched`
- `Product Clicked`
- `Product Added`
- `Product Added to Wishlist`
- `Product Removed`
- `Product Viewed`
- `Cart Viewed`
- `Checkout Started`
- `Checkout Step Viewed`
- `Checkout Step Completed`
- `Payment Info Entered`
- `Order Completed`
- `Order Updated`
- `Order Refunded`
- `Order Cancelled`
- `Clicked Promotion`
- `Viewed Promotion`

## List of supported parameters:

{{<table-wrap>}}

| Parameter                | Type   | Description                                                                                 |
| ------------------------ | ------ | ------------------------------------------------------------------------------------------- |
| `product_id`             | String | Product ID.                                                                                 |
| `sku`                    | String | Product SKU number.                                                                         |
| `category`               | String | Product category.                                                                           |
| `name`                   | String | Product name.                                                                               |
| `brand`                  | String | Product brand name.                                                                         |
| `variant`                | String | Product variant (depending on the product, it could be product color, size, etc.).          |
| `price`                  | Number | Product price.                                                                              |
| `quantity`               | Number | Product number of units.                                                                    |
| `coupon`                 | String | Name or serial number of coupon code associated with product.                               |
| `position`               | Number | Product position in the product list (for example, `2`).                                    |
| `products`               | Array  | List of products displayed in the product list.                                             |
| `products.[].product_id` | String | Product ID displayed on the product list.                                                   |
| `products.[].sku`        | String | Product SKU displayed on the product list.                                                  |
| `products.[].category`   | String | Product category displayed on the product list.                                             |
| `products.[].name`       | String | Product name displayed on the product list.                                                 |
| `products.[].brand`      | String | Product brand displayed on the product list.                                                |
| `products.[].variant`    | String | Product variant displayed on the product list.                                              |
| `products.[].price`      | Number | Price of the product displayed on the product list.                                         |
| `products.[].quantity`   | Number | Quantity of a product displayed on the product list.                                        |
| `products.[].coupon`     | String | Name or serial number of coupon code associated with product displayed on the product list. |
| `products.[].position`   | Number | Product position in the product list (for example, `2`).                                    |
| `checkout_id`            | String | Checkout ID.                                                                                |
| `order_id`               | String | Internal ID of order/transaction/purchase.                                                  |
| `affiliation`            | String | Name of affiliate from which the order occurred.                                            |
| `subtotal`               | Number | Order total after discounts but before deducting taxes and shipping.                        |
| `total`                  | Number | Revenue with discounts and coupons added in.                                                |
| `revenue`                | Number | Revenue excluding shipping and tax.                                                         |
| `shipping`               | Number | Cost of shipping for transaction.                                                           |
| `tax`                    | Number | Total tax for transaction.                                                                  |
| `discount`               | Number | Total discount for transaction.                                                             |
| `coupon`                 | String | Name or serial number of coupon redeemed on the transaction-level.                          |
| `currency`               | String | Currency code for the transaction.                                                          |
| `value`                  | Number | Total value of the product after quantity.                                                  |
| `creative`               | String | Label for creative asset of promotion being tracked.                                        |

{{</table-wrap>}}

## Event code examples

### Product viewed

```js
zaraz.ecommerce('Product Viewed', {
  product_id: '999555321',
  sku: '2671033',
  category: 'T-shirts',
  name: 'V-neck T-shirt',
  brand: 'Cool Brand',
  variant: 'White',
  price: 14.99,
  currency: 'usd',
  value: 18.99,
});
```

### Product added

```js
zaraz.ecommerce('Product Added', {
  product_id: '999555321',
  sku: '2671033',
  category: 'T-shirts',
  name: 'V-neck T-shirt',
  brand: 'Cool Brand',
  variant: 'White',
  price: 14.99,
  currency: 'usd',
  quantity: 1,
  coupon: 'SUMMER-SALE',
  position: 2,
});
```

### Order completed

```js
zaraz.ecommerce('Order Completed', {
  checkout_id: '616727740',
  order_id: '817286897056801',
  affiliation: 'affiliate.com',
  total: 30.0,
  revenue: 25.0,
  shipping: 3,
  tax: 2,
  discount: 5,
  coupon: 'winter-sale',
  currency: 'USD',
  products: [
    {
      product_id: '999666321',
      sku: '8251511',
      name: 'Boy’s shorts',
      price: 10,
      quantity: 2,
      category: 'shorts',
    },
    {
      product_id: '742566131',
      sku: '7251567',
      name: 'Blank T-shirt',
      price: 5,
      quantity: 2,
      category: 'T-shirts',
    },
  ],
});
```
