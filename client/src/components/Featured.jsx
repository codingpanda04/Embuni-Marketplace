import { motion } from "framer-motion";
import { useAppContext } from "../context/AppContext";

const Featured = () => {

  const {products, currency, navigate} = useAppContext();

  const featuredProducts = [
    {
      id: 1,
      title: "Premium Sneakers",
      description: "Lightweight and comfortable sneakers perfect for all-day wear.",
      category: "Footwear",
      price: 59.99,
      image:
        "https://images.unsplash.com/photo-1606813902912-e2d5f7a2f3d2?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      title: "Classic T-Shirt",
      description: "Breathable cotton T-shirt with a timeless design.",
      category: "Clothing",
      price: 25.0,
      image:
        "https://images.unsplash.com/photo-1523381210434-271e8be1f52b?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      title: "Leather Backpack",
      description: "Stylish and durable leather backpack for work or travel.",
      category: "Accessories",
      price: 89.99,
      image:
        "https://images.unsplash.com/photo-1600185366093-dad5cf3b4f6e?q=80&w=800&auto=format&fit=crop",
    },
  ];

  return (
    <div className="px-4 md:px-12 py-12">
      <h1 className="text-3xl font-bold text-slate-800 text-center mb-4 font-poppins">
        Featured Products
      </h1>
      <p className="text-slate-600 mb-10 font-poppins text-center">
        Discover our handpicked collection of trending items.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {products.slice(0,3).map((product) => (
          <motion.div
            key={product._id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            {/* Product Image */}
            <div className="h-56 w-full overflow-hidden">
              <img
                src={product.images[1] || product.images[0]}
                alt={product.name}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Product Details */}
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-sm text-indigo-500 font-medium mb-1">
                {product.category}
              </p>
              <h2 className="text-lg font-semibold text-slate-800">
                {product.title}
              </h2>
              <p className="text-slate-600 text-sm mt-1 flex-grow">
                {product.description}
              </p>
              <p className="text-xl font-semibold text-slate-800 mt-3">
                {currency} {product.price}
              </p>

              {/* Add to Cart Button */}
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition"
                onClick={()=> {navigate(`/products/${product._id}`); scrollTo(0,0)}}
              >
                View Product
              </motion.button>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Featured;
