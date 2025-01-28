"use client"; // Add this line at the top
import Link from "next/link";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useState, useEffect } from "react";
import { useWishlist } from "../context/page";
import { Featured } from "../componets/sidebar";
import { Button } from "@/components/ui/button";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiFilter } from "react-icons/fi";
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

export default function JumpsuitsAndRompers() {
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch products from API
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
        setError(
          error instanceof Error ? error.message : "Failed to fetch products"
        );
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Filter products for jumpsuits and rompers
  const filteredData = products.filter(
    (product) =>
      product.type?.toLowerCase() === "jumpsuit" ||
      product.type?.toLowerCase() === "romper"
  );

  if (loading) {
    return <div className="text-center text-gray-600">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="grid grid-cols-[20%_80%]">
      <div>
        <Featured />
      </div>
      <div className="py-10">
        <section className="max-w-[1000px] mx-auto overflow-clip">
          <div className="flex gap-4 ml-10 md:ml-[400px] lg:ml-[620px] xl:ml-[800px] overflow-clip">
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
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Jumpsuits & Rompers
        </h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-4">
          {filteredData.length > 0 ? (
            filteredData.map((item) => (
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

                <Link
                  href={`/products/product?id=${item.id}`}
                  className="bg-white shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                >
                  <div className="bg-[#F5F5F5] aspect-square group p-0">
                    <Image
                      src={item.img}
                      alt={item.title}
                      width={300} // Adjust width as needed
                      height={300} // Adjust height as needed
                      className="w-full p-4 h-72 object-cover rounded-t-lg"
                    />
                  </div>
                  <div className="mx-2 mt-2">
                    <h4 className="font-semibold text-[#9E3500] text-sm">
                      {item.title2}
                    </h4>
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
              No jumpsuits or rompers found.
            </div>
          )}
        </div>
        <section className="my-10">
          <h1 className="font-semibold text-xl">Related Categories</h1>
          <div className="space-x-2 space-y-2">
            <Button className="bg-white hover:text-white text-black rounded-full border-[1px] shadow-none">
              Women&apos;s Jumpsuits
            </Button>
            <Button className="bg-white hover:text-white text-black rounded-full border-[1px] shadow-none">
              Men&apos;s Rompers
            </Button>
            <Button className="bg-white hover:text-white text-black rounded-full border-[1px] shadow-none">
              Casual Jumpsuits
            </Button>
            <Button className="bg-white hover:text-white text-black rounded-full border-[1px] shadow-none">
              Formal Rompers
            </Button>
            <Button className="bg-white hover:text-white text-black rounded-full border-[1px] shadow-none">
              New Arrivals
            </Button>
          </div>
        </section>
      </div>
    </div>
  );
}