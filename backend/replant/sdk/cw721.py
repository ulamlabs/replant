from typing import NotRequired, TypedDict

from cosmpy.aerial.client import LedgerClient, SubmittedTx, Wallet
from cosmpy.aerial.contract import LedgerContract
from cosmpy.crypto.address import Address

from replant.sdk.patch import patch_ParseDict

patch_ParseDict()


class MintInfo(TypedDict):
    """Minted NFT metadata"""

    token_id: str
    token_uri: NotRequired[str]


class CW721Client:
    """CW721-multi client"""

    def __init__(self, client: LedgerClient, address: str | Address):
        if not isinstance(address, Address):
            address = Address(address)

        self.contract = LedgerContract(path=None, client=client, address=address)
        self.client = client

    @staticmethod
    def instantate(
        client: LedgerClient,
        sender: Wallet,
        code_id: int,
        name: str,
        symbol: str,
        minter: str,
        label: str = "Replant World",
    ) -> "CW721Client":
        """
        Args:
            client: Ledger client
            sender: Wallet to instantiate the contract
            code_id: CW721-multi code ID
            name: NFT collection name
            symbol: NFT collection symbol
            minter: Minter address
            label: Label for the contract to display in explorer
        """
        c = LedgerContract(None, client, code_id=code_id)
        addr = c.instantiate(
            {"name": name, "symbol": symbol, "minter": minter},
            sender,
            label,
            admin_address=sender.address(),
        )
        return CW721Client(client, addr)

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
