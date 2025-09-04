import { useParams } from "react-router-dom";
import { useState } from "react";
import { Heart, MapPin, ShoppingCart, Phone, UserPlus, Minus, Plus } from "lucide-react";
import { useAppContext } from "../context/AppContext";

import product1 from "../assets/product1.jpg";
import product2 from "../assets/product2.jpg";
import product3 from "../assets/product3.jpg";
import product4 from "../assets/product4.jpg";
import product5 from "../assets/product5.jpg";
import product6 from "../assets/product6.jpg";
import product7 from "../assets/product7.jpg";
import product8 from "../assets/product8.jpg";
import product9 from "../assets/product9.jpg";
import product10 from "../assets/product10.jpg";
import product11 from "../assets/product11.jpg";
import product12 from "../assets/product12.jpg";

const images = [
  product1, product2, product3, product4, product5, product6,
  product7, product8, product9, product10, product11, product12,
];

// Dummy products
const dummyProducts = Array.from({ length: 12 }, (_, i) => ({
  _id: `${i + 1}`,
  name: `Product ${i + 1}`,
  location: ["Kangaru", "Kamiu", "Njukiri", "G-town", "Kayole", "Bagik", "Embu town"][i % 7],
  description:
    "This is a detailed product description. It explains the features, condition, and reasons why the buyer should consider this product.",
  images: [images[i % images.length], images[(i + 1) % images.length], images[(i + 2) % images.length]],
  category: ["Furniture", "Footwear", "Clothing", "Home Equipments"][i % 4],
  price: Math.floor(Math.random() * 5000) + 500,
  stock: Math.floor(Math.random() * 10) + 1,
  seller: {
    name: `Seller ${i + 1}`,
    phone: "254712345678", // Example seller phone
  },
}));

export default function ProductDetails() {
  const { id } = useParams();

  const {products, navigate, currency} = useAppContext();
  const product = products?.find((p) => p._id === id);

  const [mainImage, setMainImage] = useState(product?.images[0]);
  const [quantity, setQuantity] = useState(product?.inStock > 0 ? 1 : 0 || 0);
  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState([]);
  const [following, setFollowing] = useState(false);

  if (!product) return <div className="text-center py-10">Loading...</div>;

  {/*const handleAddToCart = () => {
    if (quantity <= product.inStock) {
      setCart([...cart, { ...product, quantity }]);
      alert(`${quantity} x ${product.name} added to cart!`);
    } else {
      alert("Not enough stock available!");
    }
  };*/}

  const handleFavorite = () => {
    if (favorites.includes(product._id)) {
      setFavorites(favorites.filter((id) => id !== product._id));
    } else {
      setFavorites([...favorites, product._id]);
    }
  };

  const handleFollowSeller = () => {
    setFollowing(!following);
  };

  const handleWhatsApp = () => {
    const message = `Hello, I'm interested in your product: ${product.name} ${`https://embuni-marketplace.vercel.app/products/${product._id}`}. Is it still available?`;
    const whatsappUrl = `https://wa.me/254${product.seller.whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, "_blank");
  };

  return (
    <div className="px-4 md:px-16 py-10">
      <div className="grid md:grid-cols-2 gap-10">
        {/* Left: Images */}
        <div>
          <img
            src={mainImage? mainImage : product.images[0]}
            alt={product.name}
            className="w-full h-96 object-cover rounded-2xl shadow-md"
          />

          <div className="flex gap-3 mt-4">
            {product?.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt="thumbnail"
                className={`w-20 h-20 object-cover rounded-lg cursor-pointer border ${
                  mainImage === img ? "border-indigo-500" : "border-gray-300"
                }`}
                onClick={() => setMainImage(img)}
              />
            ))}
          </div>
        </div>

        {/* Right: Details */}
        <div>
          <h1 className="text-3xl font-bold mb-3">{product.name}</h1>
          <p className="text-gray-600 mb-4">{product.description}</p>

          <p className="text-lg text-indigo-600 font-medium mb-2">
            Category: {product.category}
          </p>
          <p className="flex items-center gap-2 text-gray-700 mb-2">
            <MapPin className="w-5 h-5" /> {product.location}
          </p>
          <p className="text-2xl font-semibold text-green-600 mb-4">
            Ksh {product.price}
          </p>

          <p className="text-sm text-gray-500 mb-4">
            In Stock: <span className="font-medium">{product.inStock}</span>
          </p>

          {/* Quantity selector */}
          {/*<div className="flex items-center gap-4 mb-6">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="p-2 border rounded-lg"
            >
              <Minus />
            </button>
            <span className="px-4">{quantity}</span>
            <button
              onClick={() =>
                setQuantity((q) => Math.min(product.stock, q + 1))
              }
              className="p-2 border rounded-lg"
            >
              <Plus />
            </button>
          </div>*/}

          {/* Actions */}
          <div className="flex flex-wrap gap-4">
            {/*<button
              onClick={handleAddToCart}
              className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-xl shadow hover:bg-green-700"
            >
              <ShoppingCart /> Add to Cart
            </button>*/}

            <button
              onClick={handleFavorite}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow ${
                favorites.includes(product._id)
                  ? "bg-red-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <Heart /> {favorites.includes(product._id) ? "Favorited" : "Add to Favorites"}
            </button>

            <button
              onClick={handleFollowSeller}
              className={`flex items-center gap-2 px-4 py-2 rounded-xl shadow ${
                following ? "bg-indigo-600 text-white" : "bg-gray-200 text-gray-800"
              }`}
            >
              <UserPlus /> {following ? "Following Seller" : "Follow Seller"}
            </button>
            <br /><br />
            <button
              onClick={handleWhatsApp}
              className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-xl shadow hover:bg-green-600"
            >
              <Phone /> Is this available?
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
