import React, { useState } from "react";
import { Trash2, MessageSquare } from "lucide-react";

const Favorites = () => {
  // Dummy data for now – later you’ll fetch from your backend
  const [favorites, setFavorites] = useState([
    {
      id: 1,
      title: "Wireless Headphones",
      description: "Noise-cancelling over-ear headphones with long battery life.",
      price: 4500,
      image: "https://via.placeholder.com/150",
      sellerContact: "https://wa.me/254712345678", // example WhatsApp link
    },
    {
      id: 2,
      title: "Gaming Laptop",
      description: "High-performance laptop with RTX graphics and 16GB RAM.",
      price: 125000,
      image: "https://via.placeholder.com/150",
      sellerContact: "mailto:seller@example.com",
    },
  ]);

  const handleRemove = (id) => {
    setFavorites(favorites.filter((item) => item.id !== id));
  };

  return (
    <div className="p-4 md:p-8 mt-[-100px]">
      <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center">
        My Favorites
      </h1>

      {favorites.length === 0 ? (
        <p className="text-center text-gray-500">No favorites yet.</p>
      ) : (
        <div className="space-y-4">
          {favorites.map((item) => (
            <div
              key={item.id}
              className="flex flex-col md:flex-row items-center md:items-stretch bg-white shadow-md rounded-2xl overflow-hidden border border-gray-100"
            >
              {/* Left - Product Image */}
              <div className="w-full md:w-1/4 h-40 md:h-auto">
                <img
                  src={item.image}
                  alt={item.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Middle - Product Info */}
              <div className="flex-1 p-4">
                <h2 className="text-lg md:text-xl font-semibold mb-1">
                  {item.title}
                </h2>
                <p className="text-gray-600 text-sm mb-2 line-clamp-2">
                  {item.description}
                </p>
                <p className="text-indigo-600 font-bold text-lg">
                  Ksh {item.price.toLocaleString()}
                </p>
              </div>

              {/* Right - Action Buttons */}
              <div className="flex gap-2 p-4 md:flex-col md:justify-center">
                <button
                  onClick={() => handleRemove(item.id)}
                  className="flex items-center justify-center gap-1 px-3 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600 transition"
                >
                  <Trash2 className="w-4 h-4" />
                  <span className="hidden md:inline">Remove</span>
                </button>

                <a
                  href={item.sellerContact}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-1 px-3 py-2 bg-indigo-500 text-white rounded-xl hover:bg-indigo-600 transition"
                >
                  <MessageSquare className="w-4 h-4" />
                  <span className="hidden md:inline">Contact Seller</span>
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Favorites;
