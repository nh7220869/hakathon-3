"use client";
import * as React from "react";
import Image from "next/image";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Link from "next/link";
import { useState, useEffect } from "react";

interface Product {
  id: number;
  img: string;
  title: string;
  title2: string;
  price: string;
  description: string;
  color: string[];
  producttype: string;
  type?: string; // Optional type property
}

export function GearCarousel2() {
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

  // Filter products for women and exclude shoes
  const filteredData = products.filter(
    (product) =>
      product.producttype?.toLowerCase() === "women" &&
      product.type?.toLowerCase() !== "shoes"
  );

  if (loading) {
    return <div className="text-center text-gray-600">Loading products...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">{error}</div>;
  }

  return (
    <Carousel
      opts={{
        align: "start",
      }}
      className="w-full relative"
    >
      <Link href={"/Womans"}>
        <h1 className="ml-12 hidden md:block lg:block hover:text-gray-600 hover:scale-105 transition-all duration-300">
          Shop Womens
        </h1>
      </Link>

      {/* Carousel Controls - Moved to Top with mb-2 */}
      <div className="absolute top-0 right-0 flex gap-2 mt-4 mr-4 z-10">
        <CarouselPrevious className="static mb-2" />
        <CarouselNext className="static mb-2" />
      </div>

      <CarouselContent>
        {filteredData.map((item) => (
          <CarouselItem key={item.id} className="lg:basis-1/2 sm:basis-full">
            <Link href={`/products/product?id=${item.id}`}>
              <div className="p-1 relative mt-2">
                <Card>
                  <CardContent className="bg-[#F5F5F5] aspect-square group">
                  <Image
                      src={item.img}
                      alt={item.title}
                      width={440} 
                      height={440}
                      className="object-cover w-full h-auto p-2 sm:w-full sm:h-auto lg:w-full lg:h-96"
                    />
                  </CardContent>
                </Card>
              </div>
              <div className="flex justify-between mx-2 mt-2">
                <h1 className="font-semibold text-sm">{item.title}</h1>
                <h2 className="font-semibold text-sm">{item.price}</h2>
              </div>
              <h3 className="ml-2 text-sm">{item.title2}</h3>
            </Link>
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  );
}
