---
name: npm-to-pnpm
description: Helps contributors switch from npm to pnpm in this repo, including upgrading Node.js to v24 via nvm or volta if needed.
---

Use this skill when a contributor needs to switch from npm to pnpm in this repository.

## Step 0: Check if pnpm is already installed

Run:

```bash
pnpm -v
```

If this succeeds and the major version is **10 or above**, pnpm is already set up. Inform the user and stop — nothing else is needed.

If pnpm is installed but the major version is **below 10**, tell the user their version is too old and continue to [Step 1](#step-1-check-node-version) to upgrade Node and reinstall pnpm via corepack.

## Step 1: Check Node version

Run:

```bash
node -v
```

Parse the major version from the output (e.g. `v22.1.0` → `22`).

- If the major version is **24 or above**, skip to [Step 2](#step-2-enable-pnpm-via-corepack).
- If the major version is **below 24**, continue to the version manager branch below.

## Step 1a: Upgrade Node to v24

Try each version manager in order.

### nvm

Check if nvm is available:

```bash
nvm -v
```

If it succeeds, run:

```bash
nvm install
nvm use
```

The repo has an `.nvmrc` set to `24`, so these commands will install and activate the correct version automatically. Then continue to [Step 2](#step-2-enable-pnpm-via-corepack).

### volta

If `nvm -v` failed, check if volta is available:

```bash
volta -v
```

If it succeeds, run:

```bash
volta install node@24
volta install corepack
```

Then continue to [Step 2](#step-2-enable-pnpm-via-corepack).

### Neither found

If both `nvm -v` and `volta -v` failed, tell the user:

> Neither nvm nor volta was found. Install nvm by following the instructions at https://www.nvmnode.com/guide/installation.html#nvm-install, then come back and run this again.

Stop here. Do not proceed until the user has a version manager installed.

## Step 2: Enable pnpm via corepack

Run:

```bash
corepack enable pnpm
```

## Step 3: Install dependencies with pnpm

This repo uses pnpm. Delete the old npm lockfile and install with pnpm:

```bash
rm -f package-lock.json
pnpm install --frozen-lockfile
```

## Step 4: Inform the user

Let the user know that pnpm is now set up and they should use `pnpm` commands going forward (e.g. `pnpm install`, `pnpm run dev`, `pnpm run build`). The `package-lock.json` file has been removed — the repo uses `pnpm-lock.yaml` instead.
