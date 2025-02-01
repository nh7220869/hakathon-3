"use client";
import Link from "next/link";

import {   useEffect, useState } from "react";

import CheckoutPage from "../checkout/page";


function PaymentPage() {
  // Get the total amount from the query parameters


 
  // State to manage input fields and validation
 
  const [isPaymentSuccessful, ] = useState(false);

  // Handle payment method change

  // Handle form submission

  // Handle printing the payment slip

  // Handle downloading the payment slip as a PDF

  //total pricing
  type CartItem = {
    title2: string;
    img: string | undefined;
    title: string;
    id: number;
    name: string;
    price: number | string;
    description: string;
    category: string;
    quantity: number;
  };
  
  const cleanPrice = (price: string | number) =>
    parseFloat(String(price).replace(/[^0-9.-]+/g, ""));
  
   const calculateTotal = (cartItems: CartItem[]): number => {
    return cartItems.reduce(
      (total, item) => total + cleanPrice(item.price) * item.quantity,
      0
    );
  };
  const [cart, setCart] = useState<CartItem[]>([]);
  
    // Load the cart from localStorage
    useEffect(() => {
      const storedCart = localStorage.getItem("cart");
      if (storedCart) {
        setCart(JSON.parse(storedCart));
      }
    }, []);
  
    const totalPrice = calculateTotal(cart);
  
  
  
 
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 p-6">
      <div className="w-full max-w-md bg-white p-8 rounded-xl shadow-lg">
        <h1 className="text-2xl font-bold text-gray-800 mb-6 text-center">
          Payment Details
        </h1>

        {/* Display Total Amount */}
        <div className="mb-6 text-center">
          <p className="text-lg font-semibold text-gray-800">
            Total Amount: <span className="text-blue-600">₹ {(totalPrice + 200).toFixed(2)}</span>
          </p>
        </div>

        
    <CheckoutPage/>

        {/* Back to Cart Link */}
        {!isPaymentSuccessful && (
          <div className="mt-6 text-center ">
            <Link
              href="/cart"
              className="text-blue-600 hover:underline transition duration-300"
            >
              Back to Cart
            </Link>
            <br />
            <Link href={'/ShippingRatesPage'}  className="text-blue-600 hover:underline transition duration-300"> Track Your Order</Link>
          </div>
        )}
      </div>

     
    </div>
  );
}

export default PaymentPage 
