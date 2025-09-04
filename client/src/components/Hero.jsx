import { useUser } from "@clerk/clerk-react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

export default function Hero() {

  const {user} = useUser();
  const navigate = useNavigate();
  const {isSeller, products, rentals} = useAppContext();
  console.log(products);
  console.log(rentals);

  return (
    <section className="bg-gray-50 dark:bg-gray-900 py-16 px-6 md:px-16 md:mt-[-172px] mt-[-290px]">
      <div className="max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center md:items-start justify-between gap-12">
        
        {/* Left Side - Info Text */}
        <motion.div
          initial={{ opacity: 0, x: -60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          className="flex-1 text-center md:text-left"
        >
          <h1 className="text-4xl md:text-5xl font-bold leading-tight text-gray-900 dark:text-white">
            Welcome to <span className="text-indigo-600">Embuni Marketplace</span>
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-md mx-auto md:mx-0">
            Buy and sell quality products at the University of Embu. 
            From fashion to electronics, connect with sellers you can trust.
          </p>

          <div className="mt-6 flex flex-col sm:flex-row gap-4 justify-center md:justify-start">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="px-6 py-3 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 transition"
              onClick={()=> navigate('/products')}
            >
              Get Started
            </motion.button>

            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={()=> isSeller ? navigate('/sell') : navigate('/auth/sales/register')}
              className="px-6 py-3 border border-indigo-600 text-indigo-600 dark:text-indigo-400 font-semibold rounded-lg hover:bg-indigo-50 dark:hover:bg-gray-800 transition"
            >
              {isSeller ? 'Dashboard' : 'Sell With Us'}
            </motion.button>
          </div>
        </motion.div>

        {/* Right Side - Featured Product */}
        <motion.div
          initial={{ opacity: 0, x: 60 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut", delay: 0.2 }}
          className="flex-1 flex justify-center w-full"
        >
          <div className="relative bg-white dark:bg-gray-800 shadow-lg rounded-2xl p-6 w-full max-w-sm">
            <img
              src="https://raw.githubusercontent.com/prebuiltui/prebuiltui/main/assets/card/productImage.png"
              alt="Featured Product"
              className="rounded-xl object-cover w-full h-64 sm:h-72"
            />

            {/* Discount badge */}
            <span className="absolute top-4 left-4 bg-red-500 text-white text-sm font-semibold px-3 py-1 rounded-full shadow">
              50% OFF
            </span>

            <div className="mt-4 text-center">
              <h3 className="text-xl font-semibold text-gray-800 dark:text-white">
                Trendy Sneakers
              </h3>
              <p className="text-gray-600 dark:text-gray-300 mt-1">
                Grab yours today at half price!
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="mt-4 w-full px-6 py-3 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600 transition"
              >
                Get Now
              </motion.button>
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
