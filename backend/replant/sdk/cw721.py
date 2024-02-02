from typing import NotRequired, TypedDict

from cosmpy.aerial.client import LedgerClient, SubmittedTx, Wallet
from cosmpy.aerial.contract import LedgerContract


class MintInfo(TypedDict):
    """Minted NFT metadata"""

    token_id: str
    token_uri: NotRequired[str]


class CW721Client:
    """CW721-multi client"""

    def __init__(self, client: LedgerClient, address: str):
        self.contract = LedgerContract(path=None, client=client, address=address)
        self.client = client

    def multi_mint(
        self, admin: Wallet, owner: str, tokens: list[MintInfo]
    ) -> SubmittedTx:
        """
        Args:
            admin: admin account
            owner: Address to mint to
            tokens: list of NFTs to mint
        """
        return self.contract.execute(
            {
                "extension": {
                    "msg": {"multi_mint": {"owner": owner, "messages": tokens}}
                }
            },
            admin,
        )

    def multi_transfer(
        self, sender: Wallet, recipient: str, tokens: list[str]
    ) -> SubmittedTx:
        """
        Args:
            sender: sender account
            recipient: Address to transfer to
            tokens: list of NFTs to transfer
        """
        return self.contract.execute(
            {
                "extension": {
                    "msg": {
                        "multi_transfer": {"recipient": recipient, "token_ids": tokens}
                    }
                }
            },
            sender,
        )
