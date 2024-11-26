from google.protobuf import json_format
from google.protobuf.json_format import _Parser  # type: ignore


def ParseDictPatched(
    js_dict,
    message,
    ignore_unknown_fields=False,
    descriptor_pool=None,
    max_recursion_depth=100,
):
    """
    It's a patched version of google.protobuf.json_format.ParseDict.
    We have to drop the evmError field from the response because it's not defined in the descriptor.
    """
    parser = _Parser(ignore_unknown_fields, descriptor_pool, max_recursion_depth)
    if "result" in js_dict and "evmError" in js_dict["result"]:
        js_dict["result"].pop("evmError")
    parser.ConvertMessage(js_dict, message, "")
    return message


def patch_ParseDict() -> None:
    json_format.ParseDict = ParseDictPatched
