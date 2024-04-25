---
_build:
  publishResources: false
  render: never
  list: never
---

{{<render file="/_framework-guides/_create-github-repository-prefix.md">}}

```sh
$ git remote add origin https://github.com/<your-gh-username>/<repository-name>
$ git branch -M main
$ git push -u origin main
```
