---
pcx_content_type: how-to
title: E-commerce
weight: 3
meta:
  title: zaraz.ecommerce
---

# E-commerce

You can use `zaraz.ecommerce()` anywhere inside the `<body>` tag of a page.

`zaraz.ecommerce()` allows you to track common events of the e-commerce user journey, such as when a user adds a product to cart, starts the checkout funnel or completes an order on your website. It is an `async` function, so you can choose to `await` it if you would like to make sure it completed before running other code.

To start using `zaraz.ecommerce()`, you first need to enable it in your Zaraz account and on the tool you plan to send e-commerce data to. Then, add `zaraz.ecommerce()` to the `<body>` element of your website.

Right now, Zaraz is compatible with Google Analytics 3 (Universal Analytics), Google Analytics 4, Bing and Facebook Pixel.

{{<Aside type="note" header="Note">}}It is crucial you follow the guidelines set by third-party tools, such as Google Analytics 3 and Google Analytics 4, to ensure compliance with their limitations on payload size and length. For instance, if your `Order Completed` call includes a large number of products, it may exceed the limitations of the selected tool.{{</Aside>}}

## Enable e-commerce tracking

You do not need to map e-commerce events to triggers. Zaraz will automatically forward data using the right format to the tools with e-commerce support.

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/login) and select your account and domain.
2. Select **Zaraz** > **Settings**.
3. Enable **E-commerce tracking**.
4. Select **Save**.
5. Go to **Zaraz** > **Tools Configuration** > **Third-party tools**.
6. Locate the tool you want to use with e-commerce tracking and select **Edit**.
7. Select **Settings**.
8. Under **Advanced**, enable **E-commerce tracking**.
9. Select **Save**.

E-commerce tracking is now enabled. If you add additional tools to your website that you want to use with `zaraz.ecommerce()`, you will need to repeat steps 6-9 for that tool.

## Add e-commerce tracking to your website

After enabling e-commerce tracking on your Zaraz dashboard, you need to add `zaraz.ecommerce()` to the `<body>` element of your website:

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
- `Shipping Info Entered`

## List of supported parameters:

{{<table-wrap>}}

Parameter | Type | Description |
--- | --- | --- 
`product_id`             | String | Product ID.
`sku`                    | String | Product SKU number.
`category`               | String | Product category.
`name`                   | String | Product name.
`brand`                  | String | Product brand name.
`variant`                | String | Product variant (depending on the product, it could be product color, size, etc.).
`price`                  | Number | Product price.
`quantity`               | Number | Product number of units.
`coupon`                 | String | Name or serial number of coupon code associated with product.
`position`               | Number | Product position in the product list (for example, `2`).
`products`               | Array  | List of products displayed in the product list.
`products.[].product_id` | String | Product ID displayed on the product list.
`products.[].sku`        | String | Product SKU displayed on the product list.
`products.[].category`   | String | Product category displayed on the product list.
`products.[].name`       | String | Product name displayed on the product list.
`products.[].brand`      | String | Product brand displayed on the product list.
`products.[].variant`    | String | Product variant displayed on the product list.
`products.[].price`      | Number | Price of the product displayed on the product list.
`products.[].quantity`   | Number | Quantity of a product displayed on the product list.
`products.[].coupon`     | String | Name or serial number of coupon code associated with product displayed on the product list.
`products.[].position`   | Number | Product position in the product list (for example, `2`).
`checkout_id`            | String | Checkout ID.
`order_id`               | String | Internal ID of order/transaction/purchase.
`affiliation`            | String | Name of affiliate from which the order occurred.
`total`                  | Number | Revenue with discounts and coupons added in.
`revenue`                | Number | Revenue excluding shipping and tax.
`shipping`               | Number | Cost of shipping for transaction.
`tax`                    | Number | Total tax for transaction.
`discount`               | Number | Total discount for transaction.
`coupon`                 | String | Name or serial number of coupon redeemed on the transaction-level.
`currency`               | String | Currency code for the transaction.
`value`                  | Number | Total value of the product after quantity.
`creative`               | String | Label for creative asset of promotion being tracked.
`query`                  | String | Product search term.
`step`                   | Number | The Number of the checkout step in the checkout process.
`payment_type`           | String | The type of payment used.

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

### Product List Viewed

```js
zaraz.ecommerce('Product List Viewed', 
  {  products: 
    [
    { 
      product_id: '999555321',
      sku: '2671033',
      category: 'T-shirts',
      name: 'V-neck T-shirt',
      brand: 'Cool Brand',
      variant: 'White',
      price: 14.99,
      currency: 'usd',
      value: 18.99, 
      position: 1, 
    },{ 
      product_id: '999555322',
      sku: '2671034',
      category: 'T-shirts',
      name: 'T-shirt',
      brand: 'Cool Brand',
      variant: 'Pink',
      price: 10.99,
      currency: 'usd',
      value: 16.99, 
      position: 2, 
    },
    ], 
  }
);
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

### Checkout Step Viewed

```js
zaraz.ecommerce('Checkout Step Viewed', {
  step: 1,
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
