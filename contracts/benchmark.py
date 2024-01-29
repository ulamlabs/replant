

print("#!/bin/bash")
print("source .env")
print("PAYLOAD='{\"extension\":{\"msg\":{\"mint_multi\":{\"owner\":\"sei1plzv3m26n68hrdgzehum4m3l5ejed4tng6xf5x\",\"messages\":[", end="")

for i in range(0, 100):
    print("{\"token_id\":\"123asd123asdf123tret" + str(i) + "\"}", end="")
    if i != 99:
        print(",", end="")

print("]}}}}'")
print()

print("seid tx wasm execute sei18glh4zetf3nkdu724dxqvlw2gw6fdwnhrycazt32dgysq5gvyj4s50jrsh \"$PAYLOAD\" \\")
print("    --from $KEYNAME --fees=10000000usei --gas 10000000 --chain-id=sei-chain --broadcast-mode=block")