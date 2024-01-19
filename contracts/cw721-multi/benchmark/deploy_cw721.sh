#!/bin/bash
# run from root (replant) directory

code_id=$(seid tx wasm store artifacts/cw721.wasm \
    -y --from=$KEYNAME --chain-id=sei-chain --gas=10000000 --fees=10000000usei --broadcast-mode=block \
    | grep -A 1 "code_id" \
    | sed -n 's/.*value: "//p' \
    | sed -n 's/"//p')
