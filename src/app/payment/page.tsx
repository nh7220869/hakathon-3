"use client";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import {  SetStateAction, useEffect, useState } from "react";
import { jsPDF } from "jspdf";


function PaymentPage() {
  // Get the total amount from the query parameters
  const searchParams = useSearchParams();
  const totalAmount = searchParams.get("total") || "0.00";

  // State to manage selected payment method
  const [paymentMethod, setPaymentMethod] = useState("");

  // State to manage input fields and validation
  const [accountHolderName, setAccountHolderName] = useState("");
  const [email, setEmail] = useState("");
  const [mobileWalletNumber, setMobileWalletNumber] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [isFormValid, setIsFormValid] = useState(true);
  const [isPaymentSuccessful, setIsPaymentSuccessful] = useState(false);

  // Handle payment method change
  const handlePaymentMethodChange = (method: SetStateAction<string>) => {
    setPaymentMethod(method);
    setIsFormValid(true); // Reset validation errors when payment method changes
  };

  // Handle form submission
  const handleSubmit = (e: { preventDefault: () => void; }) => {
    e.preventDefault();

    // Validate form based on payment method
    let isValid = true;

    // Validate account holder name and email for all payment methods
    if (!accountHolderName || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      isValid = false;
    }

    if (paymentMethod === "easypaisa" || paymentMethod === "jazzcash") {
      // Validate mobile wallet number (must be exactly 11 digits)
      if (!/^\d{11}$/.test(mobileWalletNumber)) {
        isValid = false;
      }
    } else if (paymentMethod === "bankTransfer") {
      // Validate account number (must be exactly 16 digits)
      if (!/^\d{16}$/.test(accountNumber)) {
        isValid = false;
      }
    } else if (paymentMethod === "creditCard") {
      // Validate card number (must be 16 digits), expiry date (MM/YY), and CVV (3 digits)
      if (
        !/^\d{16}$/.test(cardNumber) ||
        !/^\d{2}\/\d{2}$/.test(expiryDate) ||
        !/^\d{3}$/.test(cvv)
      ) {
        isValid = false;
      }
    }

    if (!isValid) {
      setIsFormValid(false);
      alert("Please fill out all fields correctly.");
      return;
    }

    // Simulate payment processing
    setIsPaymentSuccessful(true);

    // Simulate sending the payment slip to the client's email
    console.log("Sending payment slip to:", email);
    alert(`Payment slip will be sent to ${email}`);
  };

  // Handle printing the payment slip
  const handlePrintSlip = () => {
   
    const originalContent = document.body.innerHTML;



    // Trigger the print dialog
    window.print();

    // Restore the original page content
    document.body.innerHTML = originalContent;

    // Reinitialize the page (optional, if needed)
    window.location.reload();
  };

  // Handle downloading the payment slip as a PDF
  const handleDownloadPDF = () => {
    const doc = new jsPDF();

    // Set font and size for the title
    doc.setFontSize(18);
    doc.setFont("helvetica", "bold");
    doc.text("Payment Receipt", 105, 20, { align: "center" });

    // Set font and size for the subtitle
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");
    doc.text("Thank you for your payment!", 105, 30, { align: "center" });

    // Add a line separator
    doc.setLineWidth(0.5);
    doc.line(20, 35, 190, 35);

    // Set font and size for the details
    doc.setFontSize(12);
    doc.setFont("helvetica", "normal");

    // Payment Method
    doc.text("Payment Method:", 20, 45);
    doc.text(paymentMethod, 70, 45);

    // Amount Paid
    doc.text("Amount Paid:", 20, 55);
    doc.text(`₹ ${totalAmount}`, 70, 55);

    // Customer Name
    doc.text("Customer Name:", 20, 65);
    doc.text(accountHolderName, 70, 65);

    // Customer Email
    doc.text("Customer Email:", 20, 75);
    doc.text(email, 70, 75);

    // Transaction ID
    doc.text("Transaction ID:", 20, 85);
    doc.text("1234567890", 70, 85);

    // Date
    doc.text("Date:", 20, 95);
    doc.text(new Date().toLocaleDateString(), 70, 95);

    // Add another line separator
    doc.line(20, 100, 190, 100);

    // Footer text
    doc.setFontSize(10);
    doc.text(
      "If you have any questions, please contact our support team at support@example.com",
      105,
      110,
      { align: "center" }
    );

    // Save the PDF
    doc.save("payment_receipt.pdf");
  };

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

        {/* Payment Options at the Top */}
        <div className="mb-6">
          <h2 className="text-lg font-semibold text-gray-800 mb-4">
            Choose Payment Method
          </h2>
          <div className="space-y-3">
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="creditCard"
                checked={paymentMethod === "creditCard"}
                onChange={() => handlePaymentMethodChange("creditCard")}
                className="mr-2"
              />
              Credit/Debit Card
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="easypaisa"
                checked={paymentMethod === "easypaisa"}
                onChange={() => handlePaymentMethodChange("easypaisa")}
                className="mr-2"
              />
              Easypaisa
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="jazzcash"
                checked={paymentMethod === "jazzcash"}
                onChange={() => handlePaymentMethodChange("jazzcash")}
                className="mr-2"
              />
              JazzCash
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="paymentMethod"
                value="bankTransfer"
                checked={paymentMethod === "bankTransfer"}
                onChange={() => handlePaymentMethodChange("bankTransfer")}
                className="mr-2"
              />
              Bank Transfer
            </label>
          </div>
        </div>

        {/* Payment Form */}
        {!isPaymentSuccessful ? (
          <form className="space-y-6" onSubmit={handleSubmit}>
            {/* Account Holder Name (Common for all payment methods) */}
            <div className="flex flex-col">
              <label
                htmlFor="accountHolderName"
                className="text-gray-700 font-medium mb-2"
              >
                Account Holder Name
              </label>
              <input
                type="text"
                id="accountHolderName"
                name="accountHolderName"
                value={accountHolderName}
                onChange={(e) => setAccountHolderName(e.target.value)}
                className={`p-3 border ${
                  isFormValid ? "border-gray-300" : "border-red-500"
                } rounded-lg focus:outline-none focus:ring-2 ${
                  isFormValid ? "focus:ring-gray-950" : "focus:ring-red-500"
                }`}
                placeholder="Enter account holder name"
                required
              />
              {!isFormValid && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter the account holder name.
                </p>
              )}
            </div>

            {/* Email (Common for all payment methods) */}
            <div className="flex flex-col">
              <label
                htmlFor="email"
                className="text-gray-700 font-medium mb-2"
              >
                Email Address
              </label>
              <input
                type="email"
                id="email"
                name="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={`p-3 border ${
                  isFormValid ? "border-gray-300" : "border-red-500"
                } rounded-lg focus:outline-none focus:ring-2 ${
                  isFormValid ? "focus:ring-gray-950" : "focus:ring-red-500"
                }`}
                placeholder="Enter your email address"
                required
              />
              {!isFormValid && (
                <p className="text-red-500 text-sm mt-1">
                  Please enter a valid email address.
                </p>
              )}
            </div>

            {/* Mobile Wallet Number (Conditional Field for Easypaisa/JazzCash) */}
            {(paymentMethod === "easypaisa" || paymentMethod === "jazzcash") && (
              <div className="flex flex-col">
                <label
                  htmlFor="mobileWalletNumber"
                  className="text-gray-700 font-medium mb-2"
                >
                  Mobile Wallet Number
                </label>
                <input
                  type="text"
                  id="mobileWalletNumber"
                  name="mobileWalletNumber"
                  value={mobileWalletNumber}
                  onChange={(e) => setMobileWalletNumber(e.target.value)}
                  maxLength={11} // Strictly 11 digits
                  className={`p-3 border ${
                    isFormValid ? "border-gray-300" : "border-red-500"
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    isFormValid ? "focus:ring-gray-950" : "focus:ring-red-500"
                  }`}
                  placeholder="Enter 11-digit mobile wallet number"
                  required
                />
                {!isFormValid && (
                  <p className="text-red-500 text-sm mt-1">
                    Mobile wallet number must be exactly 11 digits.
                  </p>
                )}
              </div>
            )}

            {/* Bank Transfer Fields (Conditional) */}
            {paymentMethod === "bankTransfer" && (
              <div className="flex flex-col">
                <label
                  htmlFor="accountNumber"
                  className="text-gray-700 font-medium mb-2"
                >
                  Account Number
                </label>
                <input
                  type="text"
                  id="accountNumber"
                  name="accountNumber"
                  value={accountNumber}
                  onChange={(e) => setAccountNumber(e.target.value)}
                  maxLength={16} // Strictly 16 digits
                  className={`p-3 border ${
                    isFormValid ? "border-gray-300" : "border-red-500"
                  } rounded-lg focus:outline-none focus:ring-2 ${
                    isFormValid ? "focus:ring-gray-950" : "focus:ring-red-500"
                  }`}
                  placeholder="Enter 16-digit account number"
                  required
                />
                {!isFormValid && (
                  <p className="text-red-500 text-sm mt-1">
                    Account number must be exactly 16 digits.
                  </p>
                )}
              </div>
            )}

            {/* Credit/Debit Card Fields (Conditional) */}
            {paymentMethod === "creditCard" && (
              <>
                <div className="flex flex-col">
                  <label
                    htmlFor="cardNumber"
                    className="text-gray-700 font-medium mb-2"
                  >
                    Card Number
                  </label>
                  <input
                    type="text"
                    id="cardNumber"
                    name="cardNumber"
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    maxLength={16} // Strictly 16 digits
                    className={`p-3 border ${
                      isFormValid ? "border-gray-300" : "border-red-500"
                    } rounded-lg focus:outline-none focus:ring-2 ${
                      isFormValid ? "focus:ring-gray-950" : "focus:ring-red-500"
                    }`}
                    placeholder="Enter 16-digit card number"
                    required
                  />
                  {!isFormValid && (
                    <p className="text-red-500 text-sm mt-1">
                      Card number must be exactly 16 digits.
                    </p>
                  )}
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col">
                    <label
                      htmlFor="expiryDate"
                      className="text-gray-700 font-medium mb-2"
                    >
                      Expiry Date
                    </label>
                    <input
                      type="text"
                      id="expiryDate"
                      name="expiryDate"
                      value={expiryDate}
                      onChange={(e) => setExpiryDate(e.target.value)}
                      maxLength={5} // Strictly 5 characters (MM/YY)
                      className={`p-3 border ${
                        isFormValid ? "border-gray-300" : "border-red-500"
                      } rounded-lg focus:outline-none focus:ring-2 ${
                        isFormValid ? "focus:ring-gray-950" : "focus:ring-red-500"
                      }`}
                      placeholder="MM/YY"
                      required
                    />
                    {!isFormValid && (
                      <p className="text-red-500 text-sm mt-1">
                        Expiry date must be in MM/YY format.
                      </p>
                    )}
                  </div>
                  <div className="flex flex-col">
                    <label
                      htmlFor="cvv"
                      className="text-gray-700 font-medium mb-2"
                    >
                      CVV
                    </label>
                    <input
                      type="text"
                      id="cvv"
                      name="cvv"
                      value={cvv}
                      onChange={(e) => setCvv(e.target.value)}
                      maxLength={3} // Strictly 3 digits
                      className={`p-3 border ${
                        isFormValid ? "border-gray-300" : "border-red-500"
                      } rounded-lg focus:outline-none focus:ring-2 ${
                        isFormValid ? "focus:ring-gray-950" : "focus:ring-red-500"
                      }`}
                      placeholder="CVV"
                      required
                    />
                    {!isFormValid && (
                      <p className="text-red-500 text-sm mt-1">
                        CVV must be exactly 3 digits.
                      </p>
                    )}
                  </div>
                </div>
              </>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full bg-gray-950 text-white p-3 rounded-lg font-semibold hover:bg-gray-300 hover:text-black transition duration-300"
            >
              Pay Now
            </button>
          </form>
        ) : (
          // Payment Success Section
          <div className="text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-4">
              Payment Successful!
            </h2>
            <p className="text-gray-700 mb-6">
              Your payment of ₹ {totalAmount} has been processed successfully.
            </p>
            <div className="flex gap-4 justify-center">
           
              <button
                onClick={handleDownloadPDF}
                className="bg-gray-950 text-white p-3 rounded-lg font-semibold hover:bg-gray-300 hover:text-black  transition duration-300"
              >
                Download PDF
              </button>
            
              <Link href={'/ShippingRatesPage'}>
            <button className="bg-gray-950 text-white p-3 rounded-lg font-semibold hover:bg-gray-300 hover:text-black  transition duration-300">Shipping & Tracking Order</button></Link>
            </div>
          </div>
        )}

        {/* Back to Cart Link */}
        {!isPaymentSuccessful && (
          <div className="mt-6 text-center">
            <Link
              href="/cart"
              className="text-blue-600 hover:underline transition duration-300"
            >
              Back to Cart
            </Link>
          </div>
        )}
      </div>

      {/* Printable Payment Slip (Hidden by Default) */}
      {isPaymentSuccessful && (
        <div id="printable-slip" className="hidden">
          <div className="bg-white p-8 rounded-xl shadow-lg max-w-md mx-auto">
            {/* Header Section */}
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold text-gray-800 mb-2">Payment Receipt</h2>
              <p className="text-gray-600">Thank you for your payment!</p>
            </div>

            {/* Divider */}
            <div className="border-b border-gray-200 mb-6"></div>

            {/* Payment Details Section */}
            <div className="space-y-4 mb-6">
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Payment Method:</span>
                <span className="text-gray-900">{paymentMethod}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Amount Paid:</span>
                <span className="text-blue-600 font-semibold">₹ {totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Customer Name:</span>
                <span className="text-gray-900">{accountHolderName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Customer Email:</span>
                <span className="text-gray-900">{email}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Transaction ID:</span>
                <span className="text-gray-900">1234567890</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-700 font-medium">Date:</span>
                <span className="text-gray-900">{new Date().toLocaleDateString()}</span>
              </div>
            </div>

            {/* Divider */}
            <div className="border-b border-gray-200 mb-6"></div>

            {/* Footer Section */}
            <div className="text-center">
              <p className="text-gray-600 text-sm">
                If you have any questions, please contact our support team at{" "}
                <a href="mailto:support@example.com" className="text-blue-600 hover:underline">
                  support@example.com
                </a>
                .
              </p>
            </div>

            {/* Company Logo (Optional) */}
            <div className="mt-6 flex justify-center">
              <img
                src="/logo.png" // Replace with your company logo
                alt="Company Logo"
                className="h-12"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentPage 