---
pcx_content_type: configuration
title: Client API
weight: 40
---

# Constellation client API

The Constellation client API allows developers to interact with the inference engine using the models configured for each project. Inference is the process of running data inputs on a machine-learning model and generating an output, or otherwise known as a prediction.

Before you use the Constellation client API, you need to:

* Have a Cloudflare account with Constellation enabled.
* Create a Constellation project and configure the binding.
* Import the <code>@cloudflare/constellation</code> library in your code:

```javascript
   import { Tensor, run } from "@cloudflare/constellation";
```

## Tensor class

Tensors are essentially multidimensional numerical arrays used to represent any kind of data, like a piece of text, an image, or a time series. TensorFlow popularized the use of [Tensors](https://www.tensorflow.org/guide/tensor) in machine learning (hence the name). Other frameworks and runtimes have since followed the same concept.

Not surprisingly, Constellation also uses Tensors for model input.

Tensors have a data type, a shape, the data, and a name.

```typescript
export type TensorTypes = "float32" | "float64" | "int32" | "int64" | "string" | "bool";

export type Tensor = {
    type: TensorTypes;
    shape: Array<number>;
    value: Array<any> | Array<Array<any>>;
    name?: string;
};
```

**type**

Defines the type of data represented in the Tensor. Options are: <code>float32</code>, <code>float64</code>, <code>int32</code>, <code>int64</code>, <code>string</code> or <code>bool</code>

**shape**

Tensors store multidimensional data. The shape of the data can be a scalar, a vector, a 2D matrix or multiple-axes matrixes. Some examples:

* [] - scalar data
* [3] - vector with 3 elements
* [3, 2] - two-axes 3x2 matrix
* [3, 2, 2] - three-axis 3x2 matrix

Click [here](https://www.tensorflow.org/guide/tensor) to know more about shapes.

**value**

This is tensor's data. See examples:

* scalar: 4
* vector: [1, 2, 3]
* two-axes 3x2 matrix: [[1,2], [2,4], [5,6]]
* three-axes 3x2 matrix [ [[1, 2], [3, 4]], [[5, 6], [7, 8]], [[9, 10], [11, 12]] ]

**name**

Naming a tensor is optional, it can be a useful key for mapping operations when building the tensor inputs.

### Tensor examples:

**A single string of text**

```javascript
   new Tensor(
       "string",
       [1, 1],
       ["_You Could Qualify For A Exclusive Offer."]
   );
```

**A two-element vector**

```javascript
   new Tensor("int32", [2], [1, 2]);
```

**A 3x2 float64 matrix***

```javascript
   new Tensor("float64", [3, 2], [ [0.1, 0.2], [0.3, 0.4], [0.5, 0.6] ]);
```

## Methods

### await project.run( model, input )

Runs the inference engine on a model and input.

```javascript

import { Tensor, run } from '@cloudflare/constellation';

const input = [
    new Tensor("int32", [2], [1, 2]),
    new Tensor("float64", [3, 2], [0.1, 0.2, 0.3, 0.4, 0.5, 0.6]),
    new Tensor("string", [1, 2], []),
]

const output = await run(env.PROJECT, modelId, input)
```

* **input** is a list of tensors.
* **modelId** is the model Id inside the project, you can use [wrangler](constellation/platform/wrangler/#manage-models) to list them.


