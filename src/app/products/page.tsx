"use client";
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useWishlist } from "../context/page";
import { Button } from "@/components/ui/button";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiFilter } from "react-icons/fi";
import { Featured } from "../componets/sidebar";

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

export default function AllProducts() {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch('https://677ff2a50476123f76a8dd73.mockapi.io/product');
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

  if (loading) {
    return <div className="text-center text-gray-600">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <>
      {/* Mobile Layout (Small Screens) */}
      <div className="block sm:hidden">
        <div className="grid grid-cols-[30%_70%]">
          {/* Sidebar (30%) */}
          <div className="p-4">
            <Featured />
          </div>

          {/* Main Content (70%) */}
          <div className="py-5">
            {/* Filter and Sort Section */}
            <section className="overflow-clip">
              <div className="flex gap-4 justify-end overflow-clip">
                <h1 className="flex items-center gap-2 font-semibold text-sm">
                  Hide Filters
                  <span>
                    <FiFilter size={14} />
                  </span>
                </h1>
                <h2 className="flex items-center gap-2 font-semibold text-sm">
                  Sort By
                  <span>
                    <RiArrowDropDownLine size={25} />
                  </span>
                </h2>
              </div>
              <div className="mb-10"></div>
            </section>

            {/* Product Grid */}
            <h1 className="text-2xl font-bold text-center text-gray-800 mb-6">
              All Products List
            </h1>
            <div className="grid grid-cols-1 gap-4 px-4">
              {products.length > 0 ? (
                products.map((item) => (
                  <div
                    key={item.id}
                    className="hover:scale-105 transform transition duration-300 relative group"
                  >
                    {/* Heart Icon (Top-Right Corner) */}
                    <button
                      onClick={() =>
                        wishlist.includes(item.id)
                          ? removeFromWishlist(item.id)
                          : addToWishlist(item.id)
                      }
                      className="absolute top-2 right-2 z-10 bg-white p-1 rounded-full"
                    >
                      {wishlist.includes(item.id) ? (
                        <FaHeart size={20} className="text-red-500" />
                      ) : (
                        <FaRegHeart size={20} className="text-gray-500" />
                      )}
                    </button>

                    {/* Product Card */}
                    <Link
                      href={`/products/product?id=${item.id}`}
                      className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="bg-[#F5F5F5] aspect-square group p-0">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full p-2 object-contain rounded-t-lg"
                        />
                      </div>
                      <div className="mx-2 mt-2">
                        <h4 className="font-semibold text-[#9E3500] text-sm">{item.title2}</h4>
                        <h1 className="font-semibold text-sm mt-2">{item.title}</h1>
                        <h4 className="text-sm text-[#757575] justify-between">
                          color: {item.color.join(", ")}
                        </h4>
                        <h2 className="font-medium text-sm mt-2">MRP: {item.price}</h2>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  No products found.
                </div>
              )}
            </div>

            {/* Related Categories Section */}
            <section className="my-8 px-4">
              <h1 className="font-semibold text-lg">Related Categories</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <Button className="bg-white hover:text-white text-black rounded-full border-[1px] shadow-none text-xs">
                  Best Selling Products
                </Button>
                <Button className="bg-white hover:text-white text-black rounded-full border-[1px] shadow-none text-xs">
                  Men&apos;s Collection
                </Button>
                <Button className="bg-white hover:text-white text-black rounded-full border-[1px] shadow-none text-xs">
                  Women&apos;s Collection
                </Button>
                <Button className="bg-white hover:text-white text-black rounded-full border-[1px] shadow-none text-xs">
                  Casual Wear
                </Button>
                <Button className="bg-white hover:text-white text-black rounded-full border-[1px] shadow-none text-xs">
                  Sports Wear
                </Button>
                <Button className="bg-white hover:text-white text-black rounded-full border-[1px] shadow-none text-xs">
                  New Arrivals
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>

      {/* Desktop Layout (Large Screens) */}
      <div className="hidden sm:block">
        <div className="grid grid-cols-[15%_85%]">
          {/* Sidebar (15%) */}
          <div className="p-4">
            <Featured />
          </div>

          {/* Main Content (85%) */}
          <div className="py-10">
            {/* Filter and Sort Section */}
            <section className="overflow-clip">
              <div className="flex gap-4 justify-end overflow-clip">
                <h1 className="flex items-center gap-2 font-semibold text-sm">
                  Hide Filters
                  <span>
                    <FiFilter size={14} />
                  </span>
                </h1>
                <h2 className="flex items-center gap-2 font-semibold text-sm">
                  Sort By
                  <span>
                    <RiArrowDropDownLine size={25} />
                  </span>
                </h2>
              </div>
              <div className="mb-20"></div>
            </section>

            {/* Product Grid */}
            <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
              All Products List
            </h1>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-2">
              {products.length > 0 ? (
                products.map((item) => (
                  <div
                    key={item.id}
                    className="hover:scale-105 transform transition duration-300 relative group"
                  >
                    {/* Heart Icon (Top-Right Corner) */}
                    <button
                      onClick={() =>
                        wishlist.includes(item.id)
                          ? removeFromWishlist(item.id)
                          : addToWishlist(item.id)
                      }
                      className="absolute top-2 right-2 z-10 bg-white p-1 rounded-full"
                    >
                      {wishlist.includes(item.id) ? (
                        <FaHeart size={20} className="text-red-500" />
                      ) : (
                        <FaRegHeart size={20} className="text-gray-500" />
                      )}
                    </button>

                    {/* Product Card */}
                    <Link
                      href={`/products/product?id=${item.id}`}
                      className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                    >
                      <div className="bg-[#F5F5F5] aspect-square group p-0">
                        <img
                          src={item.img}
                          alt={item.title}
                          className="w-full h-full p-2 object-contain rounded-t-lg"
                        />
                      </div>
                      <div className="mx-2 mt-2">
                        <h4 className="font-semibold text-[#9E3500] text-sm">{item.title2}</h4>
                        <h1 className="font-semibold text-sm mt-2">{item.title}</h1>
                        <h4 className="text-sm text-[#757575] justify-between">
                          color: {item.color.join(", ")}
                        </h4>
                        <h2 className="font-medium text-sm mt-2">MRP: {item.price}</h2>
                      </div>
                    </Link>
                  </div>
                ))
              ) : (
                <div className="col-span-full text-center text-gray-500">
                  No products found.
                </div>
              )}
            </div>

            {/* Related Categories Section */}
            <section className="my-10">
              <h1 className="font-semibold text-xl">Related Categories</h1>
              <div className="flex flex-wrap gap-2 mt-2">
                <Button className="bg-white hover:text-white text-black rounded-full border-[1px] shadow-none text-sm">
                  Best Selling Products
                </Button>
                <Button className="bg-white hover:text-white text-black rounded-full border-[1px] shadow-none text-sm">
                  Men&apos;s Collection
                </Button>
                <Button className="bg-white hover:text-white text-black rounded-full border-[1px] shadow-none text-sm">
                  Women&apos;s Collection
                </Button>
                <Button className="bg-white hover:text-white text-black rounded-full border-[1px] shadow-none text-sm">
                  Casual Wear
                </Button>
                <Button className="bg-white hover:text-white text-black rounded-full border-[1px] shadow-none text-sm">
                  Sports Wear
                </Button>
                <Button className="bg-white hover:text-white text-black rounded-full border-[1px] shadow-none text-sm">
                  New Arrivals
                </Button>
              </div>
            </section>
          </div>
        </div>
      </div>
    </>
  );
}