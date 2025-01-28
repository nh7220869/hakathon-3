"use client";

import Link from "next/link";
import { useSearchParams, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useWishlist } from "../../context/page";
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
}

interface Review {
  id: number;
  name: string;
  rating: number;
  comment: string;
  date: string;
}

interface CartItem extends Product {
  quantity: number;
}

export default function ProductDetails() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const id = searchParams.get("id");
  const { wishlist, addToWishlist, removeFromWishlist } = useWishlist();

  const [product, setProduct] = useState<Product | null>(null);
  const [relatedProducts, setRelatedProducts] = useState<Product[]>([]);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newReview, setNewReview] = useState({ name: "", rating: 0, comment: "" });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
 

  // Fetch product details and related products
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch("https://677ff2a50476123f76a8dd73.mockapi.io/product");
        if (!response.ok) {
          throw new Error("Failed to fetch product details");
        }
        const data: Product[] = await response.json();
        const selectedProduct = data.find((item: Product) => item.id === parseInt(id!, 10));
        if (selectedProduct) {
          setProduct(selectedProduct);
          const related = data.filter(
            (item: Product) =>
              item.producttype === selectedProduct.producttype && item.id !== selectedProduct.id
          );
          setRelatedProducts(related.slice(0, 4)); // Show up to 4 related products
        } else {
          setError("Product not found.");
        }
      } catch (error) {
        setError(error instanceof Error ? error.message : "Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchProduct();
    } else {
      setError("No product ID provided.");
    }
  }, [id]);

  // Load cart, wishlist, and reviews from localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }

      const storedReviews = localStorage.getItem(`reviews_${id}`);
      if (storedReviews) {
        setReviews(JSON.parse(storedReviews));
      }
    }
  }, [id]);

  // Save cart, wishlist, and reviews to localStorage
  useEffect(() => {
    if (typeof window !== "undefined") {
      if (cart.length > 0) {
        localStorage.setItem("cart", JSON.stringify(cart));
      }
      if (wishlist.length > 0) {
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      }
      if (reviews.length > 0) {
        localStorage.setItem(`reviews_${id}`, JSON.stringify(reviews));
      }
    }
  }, [cart, wishlist, reviews, id]);

  // Add to cart function
  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProductIndex = prevCart.findIndex(
        (item) => item.id === product.id
      );
      if (existingProductIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingProductIndex].quantity += 1;
        return updatedCart;
      } else {
        const updatedCart = [...prevCart, { ...product, quantity: 1 }];
        return updatedCart;
      }
    });
   
  };

  // Handle review submission
  const handleReviewSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const review: Review = {
      id: reviews.length + 1,
      name: newReview.name,
      rating: newReview.rating,
      comment: newReview.comment,
      date: new Date().toLocaleDateString(),
    };
    const updatedReviews = [...reviews, review];
    setReviews(updatedReviews);
    localStorage.setItem(`reviews_${id}`, JSON.stringify(updatedReviews));
    setNewReview({ name: "", rating: 0, comment: "" });
  };

  // Handle star rating click
  const handleStarClick = (rating: number) => {
    setNewReview({ ...newReview, rating });
  };

  if (loading) {
    return <div className="text-center text-gray-600 py-10">Loading product details...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 py-10">{error}</div>;
  }

  if (!product) {
    return <div className="text-center text-gray-500 py-10">Product not found.</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Product Details Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 p-6 bg-white rounded-lg shadow-lg">
        {/* Product Image */}
        <div className="flex justify-center items-center">
          <img
            src={product.img}
            alt={product.title}
            className="w-full h-auto max-h-[500px] object-contain rounded-lg"
          />
        </div>

        {/* Product Information */}
        <div className="flex flex-col justify-center space-y-6">
          <h1 className="font-bold text-3xl md:text-4xl text-gray-900">{product.title}</h1>
          <h2 className="text-sm md:text-base text-gray-500">{product.title2}</h2>
          <p className="text-sm text-[#9E3500]">Color: {product.color.join(", ")}</p>
          <p className="text-lg md:text-xl text-gray-700">{product.description}</p>
          <p className="text-2xl md:text-3xl font-bold text-gray-900">{product.price}</p>

          {/* Wishlist and Add to Cart Buttons */}
          <div className="flex flex-col md:flex-row gap-3 md:gap-5">
            {/* Wishlist Button */}
            <button
              onClick={() =>
                wishlist.includes(product.id)
                  ? removeFromWishlist(product.id)
                  : addToWishlist(product.id)
              }
              className="flex items-center justify-center space-x-2 px-6 py-2 bg-gray-200 text-gray-700 font-semibold rounded-lg hover:bg-gray-300 transition-colors duration-300 w-full md:w-auto"
            >
              {wishlist.includes(product.id) ? (
                <FaHeart size={20} className="text-red-500" />
              ) : (
                <FaRegHeart size={20} />
              )}
              <span>{wishlist.includes(product.id) ? "Remove from Wishlist" : "Add to Wishlist"}</span>
            </button>

            {/* Add to Cart Button */}
            <button
              onClick={() => addToCart(product)}
              className="px-6 py-2 bg-black text-white font-semibold rounded-lg hover:bg-gray-800 transition-colors duration-300 w-full md:w-auto"
            >
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      {/* Customer Reviews Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Customer Reviews</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.length > 0 ? (
            reviews.map((review) => (
              <div
                key={review.id}
                className="p-6 bg-white rounded-lg shadow-md border border-gray-100"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                      <span className="text-gray-700 font-semibold text-lg">
                        {review.name.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900">{review.name}</h3>
                  </div>
                  <p className="text-sm text-gray-500">{review.date}</p>
                </div>
                <p className="mt-4 text-gray-700">{review.comment}</p>
                <div className="flex items-center justify-between mt-4">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <span
                        key={i}
                        className={`text-xl ${
                          i < review.rating ? "text-yellow-400" : "text-gray-300"
                        }`}
                      >
                        ★
                      </span>
                    ))}
                  </div>
                  <div className="flex items-center space-x-4">
                    <button className="text-sm text-gray-600 hover:text-blue-600">Like</button>
                    <button className="text-sm text-gray-600 hover:text-blue-600">Reply</button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="col-span-3 text-center py-8 bg-gray-50 rounded-lg">
              <p className="text-gray-600">No reviews yet. Be the first to review!</p>
            </div>
          )}
        </div>
      </div>

      {/* Add Review Section */}
      <div className="mt-12 flex justify-center">
        <div className="w-full max-w-2xl p-6 bg-white rounded-lg shadow-md border border-gray-100">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Add a Review</h2>
          <form onSubmit={handleReviewSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                value={newReview.name}
                onChange={(e) => setNewReview({ ...newReview, name: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Rating</label>
              <div className="flex space-x-2">
                {[...Array(5)].map((_, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => handleStarClick(i + 1)}
                    className={`text-2xl ${
                      i < newReview.rating ? "text-yellow-400" : "text-gray-300"
                    } hover:text-yellow-500 transition-colors duration-200`}
                  >
                    ★
                  </button>
                ))}
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Comment</label>
              <textarea
                value={newReview.comment}
                onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
                className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                rows={4}
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-4 py-2 bg-gray-950 text-white font-semibold rounded-lg hover:bg-gray-200 hover:text-black transition-colors duration-300"
            >
              Submit Review
            </button>
          </form>
        </div>
      </div>

      {/* Related Products Section */}
      <div className="mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Related Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {relatedProducts.map((item) => (
            <div
              key={item.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              <div className="relative w-full h-64">
                <Image
                  src={item.img}
                  alt={item.title}
                  fill
                  className="object-cover h-72 p-2 hover:scale-105 transition-transform duration-300"
                />
              </div>
              <div className="p-4">
                <h3 className="text-xl font-bold text-gray-900 mb-2">{item.title}</h3>
                <p className="text-sm text-gray-600 mb-2">{item.title2}</p>
                <p className="text-sm text-gray-600 mb-2">Color: {item.color.join(", ")}</p>
                <p className="text-lg font-semibold mb-4">MRP: {item.price}</p>
                <Link href={`/products/product?id=${item.id}`}>
                  <button
                    onClick={() => router.push(`/product?id=${item.id}`)}
                    className="w-full px-4 py-2  bg-gray-950 text-white font-semibold rounded-lg hover:bg-gray-200 transition-colors duration-300 hover:text-black"
                  >
                    View Product
                  </button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}