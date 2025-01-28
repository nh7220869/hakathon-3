"use client";
import Link from 'next/link';
import React, { useState, useEffect } from 'react';

// Define the type for a product
interface Product {
  title: string;
  id: string;
  type: string;
}

const SearchBar: React.FC = () => {
  const [searchInput, setSearchInput] = useState<string>("");
  const [isFocused, setIsFocused] = useState<boolean>(false);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from the API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          "https://677ff2a50476123f76a8dd73.mockapi.io/product"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        setProducts(data);
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to fetch products");
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchInput(e.target.value);
  };

  const handleFocus = () => {
    setIsFocused(true);
  };

  const handleBlur = () => {
    setTimeout(() => setIsFocused(false), 200); // Delay to allow click on list items
  };

  // Filter products based on search input
  const filteredProducts = products.filter((product) =>
    product.type.toLowerCase().includes(searchInput.toLowerCase()) ||
    product.title.toLowerCase().includes(searchInput.toLowerCase())
  );

  // Handle product selection
  const handleProductClick = (productTitle: string) => {
    setSearchInput(productTitle); // Set the selected product title in the input
    setIsFocused(false); // Close the dropdown
  };

  return (
    <div className="relative w-full max-w-md mx-auto">
      {/* Search Input */}
      <input
        type="search"
        placeholder="Search products..."
        onChange={handleChange}
        onFocus={handleFocus}
        onBlur={handleBlur}
        value={searchInput}
        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
      />

      {/* Dropdown List */}
      {isFocused && (
        <div className="absolute z-10 w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {loading ? (
            <div className="px-4 py-2 text-gray-500">Loading...</div>
          ) : error ? (
            <div className="px-4 py-2 text-red-500">{error}</div>
          ) : filteredProducts.length === 0 ? (
            <div className="px-4 py-2 text-gray-500">No products found.</div>
          ) : (
            <ul>
              {filteredProducts.map((product) => (
                <li
                  key={product.id}
                  className="px-4 py-2 hover:bg-gray-50 cursor-pointer"
                  onClick={() => handleProductClick(product.title)} // Update search input with product title
                >
                  <Link
                    href={`/products/product?id=${product.id}`}
                    className="block w-full h-full"
                  >
                    {product.type} ({product.title})
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchBar;