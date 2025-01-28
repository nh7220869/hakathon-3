// 


"use client";

import Image from "next/image";

import  {useRouter } from "next/navigation";
import { useEffect, useState } from "react";


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

function Card() {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Load the cart from localStorage
  useEffect(() => {
    const storedCart = localStorage.getItem("cart");
    if (storedCart) {
      setCart(JSON.parse(storedCart));
    }
  }, []);

  const totalPrice = calculateTotal(cart);

  // Handle form submission
  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);

    // Format cart items into a human-readable string with image links
    const cartItemsString = cart
      .map(
        (item) =>
          `- ${item.title} (Quantity: ${item.quantity}, Price: ₹ ${cleanPrice(
            item.price
          ).toFixed(2)})\n  Product: http://localhost:3001/products/product?id=${item.id}` // Include image URL
      )
      .join("\n");

    // Extract form data
    const data = {
      address: formData.get("address1") as string,
      city: formData.get("locality") as string,
      postalCode: formData.get("postalCode") as string,
      phone: formData.get("phone") as string,
      cartItems: cartItemsString, // Send cart items as a formatted string with image links
    };

    console.log("Form Data:", data);

    // Submit to API (example)
    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json",
        },
        body: JSON.stringify({
          access_key: "c2fb6e2e-1a04-4190-9aab-3e853b4604e1", // Replace with your actual access key
          ...data,
        }),
      });

      const result = await response.json();
      if (result.success) {
        console.log("Form submitted successfully:", result);
        alert("Form submitted successfully!");
      } else {
        console.error("Form submission failed:", result);
        alert("Form submission failed. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again.");
    }
  }
  const router = useRouter()
  const nextpage= ()=>{
    router.push('/payment')
  }

  return (
    <div className="flex flex-col md:flex-row p-6 gap-6">
      {/* Left Section: Form (60%) */}
      <div className="w-full md:w-[60%] p-6 rounded-lg">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          How would you like to get your order?
        </h2>
        <p className="text-gray-600 mb-6">
          Customs regulation for India require a copy of the recipient&apos;s KYC. The
          address on the KYC needs to match the shipping address. Our courier
          will contact you via SMS/email to obtain a copy of your KYC. The KYC
          will be stored securely and used solely for the purpose of clearing
          customs (including sharing it with customs officials) for all orders
          and returns. If your KYC does not match your shipping address, please
          click the link for more information.
          <a href="#" className="underline text-gray-900">
            Learn More
          </a>
        </p>

        {/* Rectangle Image with "Deliver It" */}
        <Image
          src="/hori.png"
          alt="Hori Image"
          width={720}
          height={24}
          className="h-24 w-full md:w-[15cm] mx-auto"
        />

        {/* Form for Name and Address */}
        <div className="mt-8">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            Enter your name and address:
          </h2>
       <form className="space-y-4" onSubmit={handleSubmit}>
  {/* Name and Address Fields */}
  <div className="flex flex-col">
    <label htmlFor="firstName" className="text-gray-700 font-medium">
      First Name <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      id="firstName"
      name="firstName"
      placeholder="First Name"
      className="p-2 border border-gray-300 rounded-md"
      required // Required field
    />
  </div>
  <div className="flex flex-col">
    <label htmlFor="lastName" className="text-gray-700 font-medium">
      Last Name <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      id="lastName"
      name="lastName"
      placeholder="Last Name"
      className="p-2 border border-gray-300 rounded-md"
      required // Required field
    />
  </div>
  <div className="flex flex-col">
    <label htmlFor="address" className="text-gray-700 font-medium">
      Address Line 1 <span className="text-red-500">*</span>
    </label>
    <input
      type="text"
      id="address"
      name="address"
      placeholder="Address Line 1"
      className="p-2 border border-gray-300 rounded-md"
      required // Required field
    />
    <p className="ml-2 text-gray-400 mt-2">We do not ship to P.O. boxes</p>
  </div>
  <div className="flex flex-col">
    <label htmlFor="address2" className="text-gray-700 font-medium">
      Address Line 2
    </label>
    <input
      type="text"
      id="address2"
      name="address2"
      placeholder="Address Line 2"
      className="p-2 border border-gray-300 rounded-md"
    />
  </div>
  <div className="flex flex-col">
    <label htmlFor="address3" className="text-gray-700 font-medium">
      Address Line 3
    </label>
    <input
      type="text"
      id="address3"
      name="address3"
      placeholder="Address Line 3"
      className="p-2 border border-gray-300 rounded-md"
    />
  </div>

  {/* City and Zip Code Fields */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="flex flex-col">
      <label htmlFor="postalCode" className="text-gray-700 font-medium">
        Postal Code <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="postalCode"
        name="postalCode"
        placeholder="Postal Code"
        className="p-2 border border-gray-300 rounded-md"
        required // Required field
      />
    </div>
    <div className="flex flex-col">
      <label htmlFor="locality" className="text-gray-700 font-medium">
        Locality <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="locality"
        name="locality"
        placeholder="Locality"
        className="p-2 border border-gray-300 rounded-md"
        required // Required field
      />
    </div>
  </div>

  {/* State and Country Fields */}
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
    <div className="relative flex flex-col">
      <label htmlFor="state" className="text-gray-700 font-medium">
        State/Territory <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="state"
        name="state"
        placeholder="State/Territory"
        className="p-2 border border-gray-300 rounded-md pl-10"
        required // Required field
      />
      <div className="absolute top-8 ml-72 left-2 transform -translate-y-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-600"></div>
    </div>
    <div className="relative flex flex-col">
      <label htmlFor="country" className="text-gray-700 font-medium">
        Country <span className="text-red-500">*</span>
      </label>
      <input
        type="text"
        id="country"
        name="country"
        placeholder="Country"
        className="p-2 border border-gray-300 rounded-md pl-10"
        required // Required field
      />
      <div className="absolute top-8 right-2 transform -translate-y-1/2 w-3 h-3 bg-green-500 rounded-full"></div>
    </div>
  </div>

  {/* Save Address Checkboxes */}
  <div className="flex flex-col space-y-6">
    <p className="flex items-center space-x-2 mt-3">
      <input type="checkbox" id="saveAddress" name="saveAddress" className="form-checkbox" />
      <label htmlFor="saveAddress" className="text-gray-600">
        Save this address to my profile
      </label>
    </p>
    <p className="flex items-center space-x-2 mb-6">
      <input
        type="checkbox"
        id="preferredAddress"
        name="preferredAddress"
        className="form-checkbox"
      />
      <label htmlFor="preferredAddress" className="text-gray-600">
        Make this my preferred address
      </label>
    </p>
  </div>

  {/* Contact Information */}
  <div className="flex flex-col">
    <h1 className="text-2xl font-semibold">
      What&apos;s your contact information? <span className="text-red-500">*</span>
    </h1>
    <input
      type="email"
      id="email"
      name="email"
      placeholder="Email"
      className="p-2 border border-gray-300 rounded-md mt-4"
      required // Required field
    />
    <p className="text-gray-400 ml-2 mt-2">
      A confirmation email will be sent after checkout.
    </p>
  </div>
  <div className="flex flex-col">
    <label htmlFor="phone" className="text-gray-700 font-medium">
      Phone Number <span className="text-red-500">*</span>
    </label>
    <input
      type="tel"
      id="phone"
      name="phone"
      placeholder="Phone Number"
      className="p-2 border border-gray-300 rounded-md mt-4"
      required // Required field
    />
    <p className="ml-2 text-gray-400 mt-2">
      A carrier might contact you to confirm delivery.
    </p>
  </div>

  {/* PAN Information */}
  <div className="flex flex-col">
    <h1 className="text-2xl font-semibold mt-6">What&apos;s your PAN?</h1>
    <input
      type="text"
      id="pan"
      name="pan"
      placeholder="PAN"
      className="p-2 border border-gray-300 rounded-md mt-4"
    />
    <p className="text-gray-400 ml-2 mt-2">
      Enter your PAN to enable payment with UPI, Net Banking, or local card methods.
    </p>
  </div>

  {/* Consent Checkbox */}
  <div className="flex flex-col space-y-6 mt-6">
    <p className="flex items-center space-x-2">
      <input type="checkbox" id="savePAN" name="savePAN" className="form-checkbox" required /> {/* Required field */}
      <label htmlFor="savePAN" className="text-gray-400">
        Save PAN details to Nike Profile <span className="text-red-500">*</span>
      </label>
    </p>
    <p className="flex items-center space-x-2">
      <input type="checkbox" id="consent" name="consent" className="form-checkbox" required /> {/* Required field */}
      <label htmlFor="consent" className="text-gray-400">
        I have read and consent to eShopWorld processing my information in accordance with
        the Privacy Statement and Cookie Policy. eShopWorld is a trusted Nike partner. <span className="text-red-500">*</span>
      </label>
    </p>
  </div>

  {/* Submit Button */}

  <button
    type="submit"
    onClick={nextpage}
    className="w-full text-gray-500 bg-gray-200 p-4 hover:bg-black hover:text-white rounded-full font-medium shadow-md mt-6"
  >
    Continue
  </button>

</form>
        </div>
      </div>

      {/* Right Section: Cart Items (40%) */}
      <div className="w-full md:w-[40%] p-6 rounded-lg">
        {/* Cart Details */}
        <div className="text-left mb-6 bg-gray-100 p-4">
          <h2 className="text-xl font-bold text-gray-800 mb-3">Free Delivery</h2>
          <p className="text-gray-600">
            Applies to orders of ₹ 14,000.00 or more.{" "}
            <a href="#" className="underline text-gray-900">
              View Details
            </a>
          </p>
        </div>

        <h2 className="text-2xl font-bold text-gray-800 mb-4">Bag</h2>

        {/* Display Cart Items */}
        {cart.map((item) => (
          <div
            key={item.id}
            className="p-4 bg-white shadow-md rounded-lg mb-4 flex flex-col sm:flex-row items-start"
          >
            <img
              src={item.img || "/default-image.png"}
              alt={item.title}
              width={200}
              height={200}
              className="rounded-md object-cover mb-4 sm:mb-0 sm:w-1/3"
            />
            <div className="ml-4 flex flex-col justify-between sm:w-2/3">
              <div className="flex justify-between items-center text-base">
                <h3 className="font-semibold text-gray-800">{item.title}</h3>
              </div>
              <div className="text-sm">
                <p className="text-gray-600 mb-2">{item.title2}</p>
                <p className="text-gray-600">Size: {item.category}</p>
                <p className="text-gray-600">Quantity: {item.quantity}</p>
                <p className="text-gray-900 font-medium">
                  MRP: ₹ {cleanPrice(item.price).toFixed(2)}
                </p>
              </div>
              <div className="flex space-x-4 mt-2">
                <Image
                  src="/Vector.png"
                  alt="Heart Icon"
                  width={18}
                  height={10}
                  className="cursor-pointer"
                />
                <Image
                  src="/Vector (1).png"
                  alt="Delete Icon"
                  width={18}
                  height={10}
                  className="cursor-pointer"
                />
              </div>
            </div>
          </div>
        ))}

        {/* Summary Section */}
        <div className="mt-6">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">Summary</h2>

          {/* Item-wise Subtotal */}
          <div className="mb-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Item-wise Subtotal
            </h3>
            {cart.map((item) => {
              const itemSubtotal = cleanPrice(item.price) * item.quantity;
              return (
                <div key={item.id} className="flex justify-between text-gray-800 mb-2">
                  <p>
                    {item.title} (x{item.quantity})
                  </p>
                  <p>₹ {itemSubtotal.toFixed(2)}</p>
                </div>
              );
            })}
          </div>

          <hr />

          {/* Total Subtotal */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">Subtotal</h3>
            <div className="flex justify-between text-gray-800">
              <p>Total Price of Items</p>
              <p>₹ {totalPrice.toFixed(2)}</p>
            </div>
          </div>

          {/* Delivery Charges */}
          <div className="mb-4">
            <h3 className="text-lg font-semibold text-gray-800 mb-2">
              Delivery Charges
            </h3>
            <div className="flex justify-between text-gray-800">
              <p>Standard Delivery</p>
              <p>₹ 200.00</p>
            </div>
          </div>
          <hr />

          {/* Total Amount */}
          <div className="mb-4">
            <div className="flex justify-between text-gray-800 font-semibold text-lg">
              <p>Total to Pay</p>
              <p>₹ {(totalPrice + 200).toFixed(2)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Card;