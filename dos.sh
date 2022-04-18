#!/usr/bin/env sh

for i in `seq 1 10000`; do
  curl -s localhost:9999/hello > /dev/null
  printf "\r %5d / 10000" $i
done
