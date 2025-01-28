"use client";
import * as React from "react";
import { Card, CardContent } from "@/components/ui/card";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Link from "next/link";
import { useState, useEffect } from "react";
import Image from "next/image";

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

export function CarouselSize() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch("https://677ff2a50476123f76a8dd73.mockapi.io/product");
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

  const filteredData = products.filter((product) => product.type?.toLowerCase() === "shoes");

  if (loading) {
    return <div className="text-center text-gray-600">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <div className="mt-10 p-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="font-bold text-2xl">Best of Air Max</h1>
        <Link href="/allproducts">
          <button className="px-6 py-2 text-white bg-black rounded-lg hover:bg-gray-800 transition-colors">
            View All Products
          </button>
        </Link>
      </div>

      <Carousel
        opts={{
          align: "start",
        }}
        className="w-full relative"
      >
        <CarouselContent>
          {filteredData.map((item) => (
            <CarouselItem key={item.id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/3">
              <Link href={`/products/id?id=${item.id}`}>
                <div className="p-2">
                  <Card>
                    <CardContent className="bg-[#F5F5F5] aspect-square flex items-center justify-center">
                      <Image
                        src={item.img}
                        alt={item.title}
                        width={300}
                        height={300}
                        className="object-cover"
                      />
                    </CardContent>
                  </Card>
                  <div className="flex justify-between mt-3">
                    <h1 className="font-semibold text-base">{item.title}</h1>
                    <h2 className="font-semibold text-base">{item.price}</h2>
                  </div>
                  <h3 className="text-sm text-gray-600">{item.title2}</h3>
                </div>
              </Link>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Move arrows inside the Carousel component */}
        <div className="absolute top-[60px] right-4 flex gap-4">
          <CarouselPrevious className="bg-white border border-gray-300 hover:bg-gray-100" />
          <CarouselNext className="bg-white border border-gray-300 hover:bg-gray-100" />
        </div>
      </Carousel>
    </div>
  );
}