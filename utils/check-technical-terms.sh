#!/usr/bin/env bash

cd .. || exit
# print first
grep -EHInr --exclude-dir="./utils" "(Github|Gitlab|Javascript|Typescript|Wordpress)" ./*

var=$(grep -EHInr --exclude-dir="./utils" "(Github|Gitlab|Javascript|Typescript|Wordpress)" ./*)
# then exit with fail if found
if test -z "$var"; then
  exit 0
else
  exit 1
fi