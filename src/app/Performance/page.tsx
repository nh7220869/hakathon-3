import React from 'react';
import SalesChart from '../componets/salesChart';
import TrafficChart from '../componets/TrafficChart';
import PopularProducts from '../componets/PopularProducts';

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

// Fetch popular products from the API
const fetchPopularProducts = async (): Promise<Product[]> => {
  const response = await fetch('https://677ff2a50476123f76a8dd73.mockapi.io/product');
  const data = await response.json();
  return data.slice(0, 6); // Display top 6 popular products
};

const DashboardPage = async () => {
  const popularProducts = await fetchPopularProducts();

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Our Performance</h1>

      {/* Sales Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Sales</h2>
        <div className="h-96">
          <SalesChart />
        </div>
      </div>

      {/* User Traffic Section */}
      <div className="bg-white p-6 rounded-lg shadow-md mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">User Traffic</h2>
        <div className="h-96">
          <TrafficChart />
        </div>
      </div>

      {/* Popular Products Section */}
      
      <PopularProducts products={popularProducts} />
    </div>
  );
};

export default DashboardPage;