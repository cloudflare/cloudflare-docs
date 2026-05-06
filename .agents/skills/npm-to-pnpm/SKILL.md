---
name: npm-to-pnpm
description: "Migrate contributors from npm to pnpm in this repo, upgrading Node.js to v24 via nvm or volta if needed. Use when a contributor asks about switching to pnpm, migrating from npm, or encounters npm-related errors in this repository."
---

Use when a contributor needs to switch from npm to pnpm, asks about package manager setup, or encounters npm-related errors in this repository.

## Step 0: Check if pnpm is already installed

```bash
pnpm -v
```

If major version is **10+**, pnpm is ready — inform the user and stop. If below 10, continue to upgrade.

## Step 1: Check Node version

```bash
node -v
```

If major version is **24+**, skip to Step 2. Otherwise, upgrade via a version manager:

### nvm

```bash
nvm -v          # check availability
nvm install     # .nvmrc is set to 24
nvm use
```

### volta (if nvm unavailable)

```bash
volta -v
volta install node@24
volta install corepack
```

### Neither found

Tell the user to install nvm from https://www.nvmnode.com/guide/installation.html#nvm-install and re-run. Stop here.

## Step 2: Enable pnpm via corepack

```bash
corepack enable pnpm
```

## Step 3: Install dependencies

```bash
rm -f package-lock.json
pnpm install --frozen-lockfile
```

## Step 4: Inform the user

Confirm pnpm is active. They should use `pnpm` commands going forward (`pnpm install`, `pnpm run dev`, `pnpm run build`). `package-lock.json` has been replaced by `pnpm-lock.yaml`.
