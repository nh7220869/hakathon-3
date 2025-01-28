"use client"; // Mark as Client Component

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

// Define the Product type
type Product = {
  id: number;
  img: string;
  title: string;
  title2: string;
  price: string;
  description: string;
  color: string[];
  producttype: string;
  type: string;
};

const PopularProducts = ({ products }: { products: Product[] }) => {
  const router = useRouter();

  const handleViewProduct = (productId: number) => {
    router.push(`/product?id=${productId}`);
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-6 text-gray-700">Popular Products</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => handleViewProduct(product.id)}
          >
            <Link href={`/products/product?id=${product.id}`}>
            <img
              src={product.img}
              alt={product.title}
              className="w-full h-48 object-cover rounded-lg mb-4"
            />
            <h3 className="font-semibold text-lg text-gray-800">{product.title}</h3>
            <p className="text-sm text-gray-600 mb-2">{product.title2}</p>
            <p className="text-lg font-medium text-gray-900">{product.price}</p>
            <div className="flex space-x-2 mt-2">
              {product.color.map((color, index) => (
                <div
                  key={index}
                  className="w-4 h-4 rounded-full"
                  style={{ backgroundColor: color }}
                ></div>
              ))}
            </div>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default PopularProducts;