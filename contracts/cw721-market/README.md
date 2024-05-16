# CW721-multi marketplace

## Current issues
- frontrunning NFT sales (buying one from the batch cancells the order)
- if allow_partial is true, the frontrunning seller can:
    - offer 100 NFTS for $1 each
    - see order for 100 come in
    - change price of 1 NFT to $100 and withdraw the rest
    - the order passes
