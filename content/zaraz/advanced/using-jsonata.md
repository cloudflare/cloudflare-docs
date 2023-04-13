---
pcx_content_type: how-to
title: Using JSONata
weight: 10
---

# Using JSONata

For advanced use cases, it is sometimes useful to be able to retrieve a value in a particular way. For instance, you might be using `zaraz.track` to send a list of products to Zaraz, but the third-party tool you want to send this data to requires the total cost of the products. Alternatively, you may want to manipulate a value, such as converting it to lowercase.

Cloudflare Zaraz uses JSONata to enable you to perform complex operations on your data. With JSONata, you can evaluate expressions against the [Zaraz Context](/zaraz/reference/context/), allowing you to access and manipulate a wide range of values. To learn more about the values available and how to access them, consult the [full reference](/zaraz/reference/context/). You can also refer to the [complete JSONata documentation](https://docs.jsonata.org/) for more information about JSONata's capabilities.

To use JSONata inside Zaraz, follow these steps:

1. Log in to the [Cloudflare dashboard](https://dash.cloudflare.com/), and select your account and domain.
2. Go to **Zaraz** > **Tools configuration** > **Tools**.
3. Select **Edit** next to a tool that you have already configured.
4. Select an action or add a new one.
5. Choose the field you want to use JSONata in, and wrap your JSONata expression with double curly brackets, like `{{ expression }}`.

JSONata can also be used inside Triggers, Tool Settings, and String Variables.

## Examples

### Converting a string to lowercase

Converting a string to lowercase is useful if you want to compare it to something else, for example a regular expression. Assuming the original string comes from a cookie named `myCookie`, turning the value lowercase can be done using `{{ $lowercase(system.cookies.myCookie) }}`.

### Sending a sum of all products in the cart

Assuming you are using `zaraz.ecommerce()` to send the cart content like this:

```js
zaraz.track('Product List Viewed',
  {  products:
    [
    {
      sku: '2671033',
      name: 'V-neck T-shirt',
      price: 14.99,
      quantity: 3
    },{
      sku: '2671034',
      name: 'T-shirt',
      price: 10.99,
      quantity: 2
    },
    ],
  }
);
```

If the field in which you want to show the sum, you will enter `{{ $sum(client.products.(price * quantity)) }}`. This will multiply the price of each product by its quantity, and then sum up the total.