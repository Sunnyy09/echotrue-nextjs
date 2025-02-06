"use client";

import { useState } from "react";

const FeedbackSection = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setName("");
    setEmail("");
    setMessage("");
    setSubmitted(true);
  };

  return (
    <div className="bg-[#F5F5DC] p-6 rounded-lg max-w-lg mx-auto mt-16 shadow-md">
      <h2 className="text-2xl font-bold font-poppins mt-2 mb-4 sm:mb-6 text-center">
        We Value Your Feedback
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4 px-4">
        <div>
          <label
            htmlFor="name"
            className="block text-md font-medium text-gray-800"
          >
            Name:
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="email"
            className="block text-md font-medium text-gray-800"
          >
            Email:
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <div>
          <label
            htmlFor="message"
            className="block text-md font-medium text-gray-800"
          >
            Your Feedback:
          </label>
          <textarea
            id="message"
            name="message"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            rows={4}
            className="mt-1 p-2 block w-full border border-gray-300 rounded-md shadow-sm"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full py-2 bg-black text-white font-semibold rounded-lg hover:bg-black/80"
        >
          Submit
        </button>
      </form>
      {submitted && (
        <p className="text-green-500 text-center mt-4">
          Thank you for your feedback!
        </p>
      )}
    </div>
  );
};

export default FeedbackSection;
