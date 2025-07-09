// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract ProductAuth {
    address public admin;

    constructor() {
        admin = msg.sender;
    }

    struct Product {
        string productId;
        address creator;
        string metadataURI;
        bool isVerified;
    }

    mapping(string => Product) public products;
    string[] public productIds; // ✅ New: stores all product IDs

    event ProductCreated(string productId, address creator, string metadataURI);
    event ProductVerified(string productId);

    function registerProduct(string memory _productId, string memory _metadataURI) public {
        require(products[_productId].creator == address(0), "Product already exists");
        products[_productId] = Product(_productId, msg.sender, _metadataURI, false);
        productIds.push(_productId); // ✅ Track product ID
        emit ProductCreated(_productId, msg.sender, _metadataURI);
    }

    function verifyProduct(string memory _productId) public {
        require(msg.sender == admin, "Only admin can verify");
        require(products[_productId].creator != address(0), "Product does not exist");
        products[_productId].isVerified = true;
        emit ProductVerified(_productId);
    }

    function getProduct(string memory _productId) public view returns (Product memory) {
        return products[_productId];
    }

    function getAllProductIds() public view returns (string[] memory) {
        return productIds; // ✅ New: fetch list of product IDs
    }
}
