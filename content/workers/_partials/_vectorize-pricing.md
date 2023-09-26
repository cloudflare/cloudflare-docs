---
_build:
  publishResources: false
  render: never
  list: never
---

|                                 | [Workers Paid](/workers/platform/pricing/#workers) | [Workers Free](/workers/platform/pricing/#workers) <sup>1</sup> |
| ------------------------------- | -------------------------------------------------- | -------------------------------------------------- |
| **Total queried vector dimensions** | First 50 million queried vector dimensions / month included + $0.040 per million | 30 million queried vector dimensions / month |
| **Total stored vector dimensions** | First 10 million stored vector dimensions + $0.040 per million | 5 million stored vector dimensions |

<sup>1</sup> Vectorize will be available to developers on the Workers Free plan in the future.
### Calculating vector dimensions

To calculate your potential usage, calculate the sum of your stored + queried vectors, multiply by the dimension size, and multiply by the unit price (divided by 1 million). The formula is defined as `(stored vectors + queried vectors) * dimensions * ($0.040 / 1000000)`

* For example, inserting 10,000 vectors of 768 dimensions each, and querying those 1,000 times per day (30,000 times per month) would be calculated as `(30000 * 768) = 23,040,000` queried dimensions and `(10000 * 768) = 7,680,000` stored dimensions (within the included monthly allocation)
* Separately, and excluding the included monthly allocation, this would be calculated as `(30,000+10,000) * 768 * ($0.040 / 1,000,000)` and sum to $1.23 per month. 
