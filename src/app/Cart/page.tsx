"use client";
import Link from "next/link";
import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";

type CartItem = {
  img: string | undefined;
  title: string;
  id: number;
  name: string;
  price: number | string;
  description: string;
  category: string;
  quantity: number;
};

// Helper function to clean price strings
const cleanPrice = (price: string | number) =>
  parseFloat(String(price).replace(/[^0-9.-]+/g, ""));

// Function to calculate the total price
const calculateTotal = (cartItems: CartItem[]): number => {
  return cartItems.reduce(
    (total, item) => total + cleanPrice(item.price) * item.quantity,
    0
  );
};

const CartPage = () => {
  const [cart, setCart] = useState<CartItem[]>([]);
  // const [] = useState(0.1); // 10% tax rate
  // const [] = useState(99); // Example pickup fee
  // const [] = useState(299); // Example savings
  const [showMessage, setShowMessage] = useState(false); // State to manage message visibility
  const [itemToDelete, setItemToDelete] = useState<number | null>(null); // State to store the item ID to delete

  // Load the cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  // Update cart in localStorage
  useEffect(() => {
    if (cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
      localStorage.removeItem("cart"); // Clear localStorage if cart is empty
    }
  }, [cart]);

  // Handle quantity change
  const handleQuantityChange = (id: number, action: "increase" | "decrease") => {
    setCart((prevCart) => {
      return prevCart.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(item.quantity + (action === "increase" ? 1 : -1), 1) }
          : item
      );
    });
  };

  // Handle item deletion from the cart with confirmation
  const handleDeleteItem = (id: number) => {
    setItemToDelete(id);
  };

  // Confirm deletion
  const confirmDelete = () => {
    if (itemToDelete !== null) {
      setCart((prevCart) => {
        const updatedCart = prevCart.filter((item) => item.id !== itemToDelete);
        if (updatedCart.length === 0) {
          localStorage.removeItem("cart"); // Clear localStorage if cart is empty
        }
        return updatedCart;
      });
      setItemToDelete(null);
    }
  };

  // Cancel deletion
  const cancelDelete = () => {
    setItemToDelete(null);
  };

  // Handle adding item to favorites
  const handleAddToFavorites = (item: CartItem) => {
    setShowMessage(true);
    setTimeout(() => {
      setShowMessage(false);
    }, 3000); // Hide the message after 3 seconds
    // Here you can add logic to actually add the item to favorites
    console.log("Added to favorites:", item);
  };

  const totalPrice = calculateTotal(cart);

  return (
    <div className="p-6 md:flex md:space-x-6 mt-11 bg-white text-black">
      {/* Cart Items Section */}
      <div className="flex-1">
        <h1 className="text-2xl font-bold mb-6">Shopping Cart</h1>
        {cart.length === 0 ? (
          <p>Your cart is empty!</p>
        ) : (
          <>
            {/* Desktop View */}
            <div className="hidden md:block">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="grid grid-cols-[40%_20%_20%_20%] items-center border-b border-gray-300 py-4"
                >
                  {/* Column 1: Image and Title */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-24 h-24 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold truncate">{item.title}</p>
                      <button
                        onClick={() => handleAddToFavorites(item)}
                        className="text-sm text-gray-600 hover:text-gray-800"
                      >
                        Add to Favorites
                      </button>
                    </div>
                  </div>

                  {/* Column 2: Quantity Section */}
                  <div className="flex items-center justify-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, "decrease")}
                      className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
                    >
                      -
                    </button>
                    <p className="w-6 text-center">{item.quantity}</p>
                    <button
                      onClick={() => handleQuantityChange(item.id, "increase")}
                      className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
                    >
                      +
                    </button>
                  </div>

                  {/* Column 3: Price */}
                  <div className="text-center">
                    <p className="font-semibold">
                      ${cleanPrice(item.price)} <span className="text-sm text-gray-500">(Original: ${cleanPrice(item.price)})</span>
                    </p>
                    <p className="text-sm text-gray-500">
                      Total: ${(cleanPrice(item.price) * item.quantity).toFixed(2)}
                    </p>
                  </div>

                  {/* Column 4: Remove Button and Confirmation Dialog */}
                  <div className="text-center relative">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-gray-600 text-lg hover:text-red-600 lg:text-3xl underline group"
                    >
                      <AiOutlineDelete />
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity text-xl">Remove</span>
                    </button>
                    {itemToDelete === item.id && (
                      <div className="absolute top-0 right-0 bg-white border border-gray-300 shadow-lg p-2 rounded-lg flex space-x-2 z-10">
                        <p className="text-sm">Are you sure?</p>
                        <button
                          onClick={confirmDelete}
                          className="text-sm bg-black text-white px-2 py-1 rounded hover:bg-gray-800"
                        >
                          Yes
                        </button>
                        <button
                          onClick={cancelDelete}
                          className="text-sm bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-300"
                        >
                          No
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>

            {/* Mobile View */}
            <div className="block md:hidden">
              {cart.map((item) => (
                <div
                  key={item.id}
                  className="border-b border-gray-300 py-4 space-y-4"
                >
                  {/* Product Image and Title */}
                  <div className="flex items-center space-x-4">
                    <img
                      src={item.img}
                      alt={item.title}
                      className="w-20 h-20 object-cover rounded-lg"
                    />
                    <div>
                      <p className="font-semibold truncate">{item.title}</p>
                      <button
                        onClick={() => handleAddToFavorites(item)}
                        className="text-sm text-gray-600 hover:text-gray-800"
                      >
                        Add to Favorites
                      </button>
                    </div>
                  </div>

                  {/* Quantity Section */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => handleQuantityChange(item.id, "decrease")}
                        className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
                      >
                        -
                      </button>
                      <p className="w-6 text-center">{item.quantity}</p>
                      <button
                        onClick={() => handleQuantityChange(item.id, "increase")}
                        className="px-3 py-1 bg-gray-200 text-sm rounded hover:bg-gray-300"
                      >
                        +
                      </button>
                    </div>

                    {/* Price Section */}
                    <p className="font-semibold text-lg">
                      ${cleanPrice(item.price)} <span className="text-sm text-gray-500">(Original: ${cleanPrice(item.price)})</span>
                    </p>
                  </div>

                  {/* Remove Button and Confirmation Dialog */}
                  <div className="text-center relative">
                    <button
                      onClick={() => handleDeleteItem(item.id)}
                      className="text-gray-600 text-sm hover:text-gray-800 underline group"
                    >
                      <AiOutlineDelete />
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity">Remove</span>
                    </button>
                    {itemToDelete === item.id && (
                      <div className="absolute top-0 right-0 bg-white border border-gray-300 shadow-lg p-2 rounded-lg flex space-x-2 z-10">
                        <p className="text-sm">Are you sure?</p>
                        <button
                          onClick={confirmDelete}
                          className="text-sm bg-black text-white px-2 py-1 rounded hover:bg-gray-800"
                        >
                          Yes
                        </button>
                        <button
                          onClick={cancelDelete}
                          className="text-sm bg-gray-200 text-black px-2 py-1 rounded hover:bg-gray-300"
                        >
                          No
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
        
      </div>


      {/* Order Summary Section */}
      <div className="w-full md:w-1/3 p-4 border border-gray-300 rounded-lg shadow-md bg-gray-50 mt-6 md:mt-0">
        <h2 className="text-xl font-bold mb-4">Order Summary</h2>
        <div className="space-y-4">
          {/* Item-wise Subtotal */}
          {cart.map((item) => (
            <div key={item.id} className="flex justify-between">
              <span>
                {item.title} (x{item.quantity})
              </span>
              <span>₹ {(cleanPrice(item.price) * item.quantity).toFixed(2)}</span>
            </div>
          ))}

          {/* Subtotal */}
          <div className="flex justify-between border-t border-gray-300 pt-4">
            <span>Subtotal</span>
            <span>₹ {totalPrice.toFixed(2)}</span>
          </div>

          {/* Delivery Charges */}
          <div className="flex justify-between">
            <span>Delivery Charges</span>
            <span>₹ 200.00</span>
          </div>

          {/* Total to Pay */}
          <div className="flex justify-between border-t border-gray-300 pt-4 font-bold text-lg">
            <span>Total to Pay</span>
            <span>₹ {(totalPrice + 200).toFixed(2)}</span>
          </div>
        </div>
        <Link href={'/Order'}>
          <button
            className="mt-4 w-full bg-black text-white py-2 rounded-lg hover:bg-gray-800"
          >
            Proceed to Checkout
          </button>
        </Link>
        <Link href="/allproducts">
          <button className="mt-2 w-full text-gray-600 hover:text-gray-800 hover:underline">
            Continue Shopping →
          </button>
        </Link>
      </div>

      {/* Message for adding to favorites */}
      {showMessage && (
        <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
          Item added to favorites!
        </div>
      )}
    </div>
  );
};

export default CartPage;