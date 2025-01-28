// app/page.tsx
import Link from 'next/link';
import React from 'react';

interface Product {
  id: number;
  img: string;
  title: string;
  title2: string;
  price: string;
  description: string;
  color: string[];
  producttype: string;
  type: string;
}

const fetchProducts = async (): Promise<Product[]> => {
  const res = await fetch('https://677ff2a50476123f76a8dd73.mockapi.io/product');
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }
  return res.json();
};

const filterByPrice = (products: Product[], minPrice: number, maxPrice: number): Product[] => {
  return products.filter((product) => {
    const price = parseFloat(product.price.replace(/[^0-9.-]+/g, ''));
    return price >= minPrice && price <= maxPrice;
  });
};

export default async function Home() {
  const products = await fetchProducts();

  const under2500 = filterByPrice(products, 0, 2500);
  const between2501And7500 = filterByPrice(products, 2501, 7500);

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-center mb-8">Filtered Products</h1>

      {/* Under ₹2,500.00 */}
      <div className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Under ₹2,500.00</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {under2500.map((product) => (
            <Link
              key={product.id}
              href={`/products/product?id=${product.id}`}
              className="flex-shrink-0 w-64 border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl font-bold mt-2">{product.title}</h3>
              <p className="text-gray-600">{product.title2}</p>
              <p className="text-lg font-semibold">{product.price}</p>
              <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
            </Link>
          ))}
        </div>
      </div>

      {/* ₹2,501.00 - ₹7,500.00 */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">₹2,501.00 - ₹7,500.00</h2>
        <div className="flex overflow-x-auto space-x-4 pb-4">
          {between2501And7500.map((product) => (
            <Link
              key={product.id}
              href={`/products/product?id=${product.id}`}
              className="flex-shrink-0 w-64 border p-4 rounded-lg shadow-sm hover:shadow-md transition-shadow"
            >
              <img
                src={product.img}
                alt={product.title}
                className="w-full h-48 object-cover rounded-lg"
              />
              <h3 className="text-xl font-bold mt-2">{product.title}</h3>
              <p className="text-gray-600">{product.title2}</p>
              <p className="text-lg font-semibold">{product.price}</p>
              <p className="text-sm text-gray-500 line-clamp-2">{product.description}</p>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}