// components/ProductCard.tsx
"use client";

import { useState, useEffect } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import Image from "next/image";
type Product = {
  id: number;
  title: string;
  price: number | string;
  img: string;
};

const ProductCard = ({ product }: { product: Product }) => {
  const [isInWishlist, setIsInWishlist] = useState(false);

  // Check if product is in wishlist
  useEffect(() => {
    const checkWishlist = async () => {
      try {
        const response = await fetch(`/api/wishlist/check?productId=${product.id}`);
        const data = await response.json();
        setIsInWishlist(data.isInWishlist);
      } catch (error) {
        console.error("Error checking wishlist:", error);
      }
    };
    checkWishlist();
  }, [product.id]);

  // Add/Remove product from wishlist
  const handleWishlist = async () => {
    try {
      if (isInWishlist) {
        // Remove from wishlist
        await fetch(`/api/wishlist/remove?productId=${product.id}`, {
          method: "DELETE",
        });
        setIsInWishlist(false);
        alert("Removed from wishlist!");
      } else {
        // Add to wishlist
        await fetch("/api/wishlist/add", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(product),
        });
        setIsInWishlist(true);
        alert("Added to wishlist!");
      }
    } catch (error) {
      console.error("Error updating wishlist:", error);
    }
  };

  return (
    <div className="border rounded-lg p-4 shadow-md relative">
      {/* Heart Icon (Top-Right Corner) */}
      <button
        onClick={handleWishlist}
        className="absolute top-2 right-2 text-red-500 bg-white p-1 rounded-full"
      >
        {isInWishlist ? <FaHeart size={20} /> : <FaRegHeart size={20} />}
      </button>

      {/* Product Image */}
      <Image
        src={product.img} 
        alt={"shoes"}    
        height={48}
        width={45}
        className="w-full h-48 object-cover rounded-lg"
      />
     

      {/* Product Details */}
      <div className="mt-4">
        <p className="font-semibold truncate">{product.title}</p>
        <p className="text-gray-600">₹{product.price}</p>
      </div>
    </div>
  );
};

export default ProductCard;