# Developing

## Publishing to NPM

First run:

```txt
npm version minor
```

You’ll be returned the new version, call it `vX.X.X`. Then run:

```txt
git push origin vX.X.X --tags
```

Finally, run:

```txt
npm publish
```

And:

```txt
git push origin master
```
