"use client"; // Mark this component as a Client Component

import React from 'react';

type Product = {
  id: number;
  name: string;
  description: string;
  price: number;
  adminId: number;
  createdAt: string;
};

type ProductListProps = {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (productId: number) => void;
};

const ProductList: React.FC<ProductListProps> = ({ products, onEdit, onDelete }) => {
  return (
    <ul>
      {products.map((product) => (
        <li key={product.id} className="mb-4 p-4 border rounded-lg">
          <h2 className="text-xl font-semibold">{product.name}</h2>
          <p>{product.description}</p>
          <p>Price: ${product.price}</p>
          <p>Date Added: {new Date(product.createdAt).toLocaleDateString()}</p>
          <div className="mt-2">
            <button
              onClick={() => onEdit(product)}
              className="mr-2 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
            >
              Edit
            </button>
            <button
              onClick={() => onDelete(product.id)}
              className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600"
            >
              Delete
            </button>
          </div>
        </li>
      ))}
    </ul>
  );
};

export default ProductList;