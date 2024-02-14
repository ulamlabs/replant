import pytest

from .scripts import validate_sei_address


def test_validate_sei_address():
    validate_sei_address("sei1f8ey877q8x84972dhhcd4jddrk46pxn7wua7yl")
    validate_sei_address(
        "sei13hxtue98v4vzs25r8j5l0n3wukj6h05k73syguy8gs49jexhx2hqxslrx6"
    )

    with pytest.raises(ValueError):
        assert not validate_sei_address("sei1f8ey877q8x84972dhhcd4jddrk46pxn7wua7ym")
    with pytest.raises(ValueError):
        assert not validate_sei_address("cosm1f8ey877q8x84972dhhcd4jddrk46pxn7wua7yl")
    with pytest.raises(ValueError):
        assert not validate_sei_address("sei1y0g")
