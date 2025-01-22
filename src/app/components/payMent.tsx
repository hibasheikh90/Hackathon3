"use client";

import { useState } from "react";

const PaymentForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  });

  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (
      !formData.name ||
      !formData.email ||
      !formData.address ||
      !formData.phone ||
      !formData.cardNumber ||
      !formData.expiryDate ||
      !formData.cvv
    ) {
      alert("Please fill out all fields.");
      return;
    }

    setIsSubmitted(true);

    // Perform payment processing (e.g., Stripe or PayPal integration)
    console.log("Payment Details:", formData);

    alert("Payment successful!");
  };

  if (isSubmitted) {
    return (
      <div className="text-center">
        <h2 className="text-xl text-green-600 font-semibold">
          Thank you for your payment!
        </h2>
        <p className="text-gray-600 mt-2">
          Your transaction has been successfully processed.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="p-6 max-w-lg mx-auto border rounded-md shadow-md bg-white">
        <h2 className="text-2xl font-bold mb-4">Payment Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Name */}
          <div className="mb-4">
            <label htmlFor="name" className="block font-medium mb-1">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          {/* Email */}
          <div className="mb-4">
            <label htmlFor="email" className="block font-medium mb-1">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          {/* Address */}
          <div className="mb-4">
            <label htmlFor="address" className="block font-medium mb-1">
              Address
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          {/* Phone */}
          <div className="mb-4">
            <label htmlFor="phone" className="block font-medium mb-1">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              required
              className="w-full border rounded p-2"
            />
          </div>

          {/* Card Number */}
          <div className="mb-4">
            <label htmlFor="cardNumber" className="block font-medium mb-1">
              Card Number
            </label>
            <input
              type="text"
              id="cardNumber"
              name="cardNumber"
              value={formData.cardNumber}
              onChange={handleInputChange}
              required
              maxLength={16}
              placeholder="1234 5678 9012 3456"
              className="w-full border rounded p-2"
            />
          </div>

          {/* Expiry Date */}
          <div className="mb-4">
            <label htmlFor="expiryDate" className="block font-medium mb-1">
              Expiry Date (MM/YY)
            </label>
            <input
              type="text"
              id="expiryDate"
              name="expiryDate"
              value={formData.expiryDate}
              onChange={handleInputChange}
              required
              placeholder="MM/YY"
              className="w-full border rounded p-2"
            />
          </div>

          {/* CVV */}
          <div className="mb-6">
            <label htmlFor="cvv" className="block font-medium mb-1">
              CVV
            </label>
            <input
              type="text"
              id="cvv"
              name="cvv"
              value={formData.cvv}
              onChange={handleInputChange}
              required
              maxLength={3}
              placeholder="123"
              className="w-full border rounded p-2"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-indigo-950 text-white py-2 rounded hover:bg-violet-900 transition-colors"
          >
            Pay Now
          </button>
        </form>
      </div>
    </>
  );
};

export default PaymentForm;
