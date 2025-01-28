"use client"; // Add this line at the top
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../context/page"; // Ensure this path is correct
import Image from "next/image"; // Import the Image component

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

const SNKRS: React.FC = () => {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [shoes, setShoes] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "https://677ff2a50476123f76a8dd73.mockapi.io/product"
        );
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const result: Product[] = await response.json();
        console.log("API Response:", result);

        const filteredData = result.filter(
          (product) =>
            (product.producttype?.toLowerCase() === "men" ||
              product.producttype?.toLowerCase() === "women") &&
            product.type === "shoes"
        );
        console.log("Filtered Data:", filteredData);

        setShoes(filteredData);
      } catch (error) {
        setError(
          error instanceof Error ? error.message : "Failed to fetch products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const calculateSalePrice = (price: string): string => {
    const numericPrice = parseFloat(price.replace(/[^0-9.]/g, ""));
    const salePrice = numericPrice * 0.7;
    return `₹ ${salePrice.toFixed(2)}`;
  };

  if (loading) {
    return <div className="text-center text-gray-600">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="py-10">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
        SNKRS Sale
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
        {shoes.length > 0 ? (
          shoes.map((shoe) => {
            const salePrice = calculateSalePrice(shoe.price);
            return (
              <div
                key={shoe.id}
                className="hover:scale-105 transform transition duration-300 relative group"
              >
                {/* Heart Icon (Top-Right Corner) */}
                <button
                  onClick={() =>
                    wishlist.includes(shoe.id)
                      ? removeFromWishlist(shoe.id)
                      : addToWishlist(shoe.id)
                  }
                  className="absolute top-2 right-2 z-10 bg-white p-1 rounded-full"
                >
                  {wishlist.includes(shoe.id) ? (
                    <FaHeart size={20} className="text-red-500" />
                  ) : (
                    <FaRegHeart size={20} className="text-gray-500" />
                  )}
                </button>

                <Link
                  href={`/products/product?id=${shoe.id}`}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="bg-[#F5F5F5] aspect-square group p-0">
                    <Image
                      src={shoe.img}
                      alt={shoe.title}
                      width={384} // Adjust width as needed
                      height={384} // Adjust height as needed
                      className="w-full object-cover rounded-t-lg h-96 p-10"
                    />
                  </div>
                  <div className="mx-2 mt-2">
                    <h4 className="font-semibold text-[#9E3500] text-sm">
                      {shoe.title2}
                    </h4>
                    <h1 className="font-semibold text-sm mt-2">{shoe.title}</h1>
                    <h4 className="text-sm text-[#757575] justify-between">
                      color: {shoe.color.join(", ")}
                    </h4>
                    <p className="text-sm text-gray-500 line-through">
                      {shoe.price}
                    </p>
                    <p className="text-xl font-bold text-green-600">
                      {salePrice}
                    </p>
                  </div>
                </Link>
              </div>
            );
          })
        ) : (
          <div className="col-span-full text-center text-gray-500">
            No products found.
          </div>
        )}
      </div>
    </div>
  );
};

export default SNKRS;