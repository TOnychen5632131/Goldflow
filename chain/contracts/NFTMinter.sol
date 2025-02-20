// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721Enumerable.sol";
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract NFTMinter is ERC721Enumerable, Ownable {
    IERC20 public paymentToken;
    uint256 public mintPrice;
    address public vault;
    uint256 private _tokenIdCounter;

    event Minted(address indexed user, uint256 tokenId);

    constructor(
        address _paymentToken,
        uint256 _mintPrice,
        address _vault
    ) ERC721("MyNFT", "MNFT") Ownable(msg.sender){
        paymentToken = IERC20(_paymentToken);
        mintPrice = _mintPrice;
        vault = _vault;
    }

    function mint() external {
        require(paymentToken.transferFrom(msg.sender, vault, mintPrice), "Payment failed");

        _tokenIdCounter++;
        uint256 newTokenId = _tokenIdCounter;
        _safeMint(msg.sender, newTokenId);

        emit Minted(msg.sender, newTokenId);
    }

    function setMintPrice(uint256 _price) external onlyOwner {
        mintPrice = _price;
    }

    function setVault(address _vault) external onlyOwner {
        vault = _vault;
    }
}
