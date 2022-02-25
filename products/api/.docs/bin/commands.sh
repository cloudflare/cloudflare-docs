#!/bin/bash
set -e

realpath() {
  [[ $1 = /* ]] && echo "$1" || echo "$PWD/${1#./}"
}

echo "Docs Engine Version: 0.1.5"

docs_engine_path=$(dirname $(dirname $(realpath "$0")))
parent_path=$(dirname $docs_engine_path)
parent_folder_name=$(basename $parent_path)

if [ "$parent_folder_name" != "node_modules" ]; then
  echo "Failed: expected the Cloudflare docs enginee to be inside node_modules"
  exit
fi

project_path=$(dirname $(dirname $docs_engine_path))


if [ "$1" = "ghactionsbootstrap" ]; then
  cd $project_path

  echo "Deleting .docs"
  rm -rf .docs

  echo "Creating .docs directory"
  mkdir .docs

  echo "Moving cloudflare-docs-engine files into .docs"
  cp -r node_modules/cloudflare-docs-engine/* .docs

  echo "Entering .docs"
  cd .docs

  echo "Running yarn install inside .docs"
  yarn install --pure-lockfile
fi


if [ "$1" = "bootstrap" ]; then
  cd $project_path

  echo "Deleting .docs"
  rm -rf .docs

  echo "Moving cloudflare-docs-engine files into .docs"
  cp -r node_modules/cloudflare-docs-engine/ .docs

  echo "Entering .docs"
  cd .docs

  echo "Removing existing node_modules (local yarn link case)"
  rm -rf node_modules/

  echo "Running yarn install inside .docs"
  yarn install --pure-lockfile
fi


copysrc() {
  cd $project_path

  echo "Entering .docs"
  cd .docs

  echo "Copying docs-config.js into .docs"
  cp -r ../docs-config.js ./

  if [ -e ../static ]; then
      echo "Copying static into .docs"
      cp -r ../static ./
  fi

  echo "Entering .docs/src/"
  cd src

  echo "Copying content into .docs/src/"
  cp -r ../../src/content ./
}


if [ "$1" = "develop" ]; then
  copysrc

  cd $project_path

  echo "Entering .docs"
  cd .docs

  echo "Running yarn clean"
  yarn clean

  echo "Running yarn develop"
  yarn develop "${@:2}"
fi


if [ "$1" = "build" ]; then
  copysrc

  cd $project_path

  echo "Entering .docs"
  cd .docs

  echo "Running yarn build"
  yarn build "${@:2}"

  # We must run from inside `.docs/`
  echo "Running bin/postbuild.js"
  node bin/postbuild.js
fi


if [ "$1" = "serve" ]; then
  cd $project_path

  echo "Entering .docs"
  cd .docs

  echo "Running yarn serve"
  yarn serve "${@:2}"
fi


if [ "$1" = "savechanges" ]; then
  cd $project_path

  cp -r .docs/src/content/ src/content/
fi
