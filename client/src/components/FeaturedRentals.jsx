import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { useAppContext } from "../context/AppContext";


const Featuredrentals = () => {
  {/*const rentals = [
    {
      id: 1,
      location: "Nairobi, Kilimani",
      type: "Bedsitter",
      wifi: true,
      parking: true,
      secure: true,
      price: 12000,
      image:
        "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 2,
      location: "Thika, Town Center",
      type: "Single Room",
      wifi: false,
      parking: false,
      secure: true,
      price: 6000,
      image:
        "https://images.unsplash.com/photo-1600573472591-ee6b68b9c619?q=80&w=800&auto=format&fit=crop",
    },
    {
      id: 3,
      location: "Embu, Kangaru",
      type: "Self-contained",
      wifi: true,
      parking: false,
      secure: true,
      price: 15000,
      image:
        "https://images.unsplash.com/photo-1600607687939-ce8a6c25118d?q=80&w=800&auto=format&fit=crop",
    },
  ];*/}

  const {rentals}= useAppContext();

  return (
    <div className="px-4 md:px-12 py-12">
      <h1 className="text-3xl font-bold text-slate-800 text-center mb-4 font-poppins">
        Featured Rentals
      </h1>
      <p className="text-slate-600 mb-10 font-poppins text-center">
        Explore our top rental houses with modern features and secure living.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {rentals?.slice(0, 3).map((rental) => (
          <motion.div
            key={rental._id}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 flex flex-col"
          >
            {/* Image */}
            <div className="h-56 w-full overflow-hidden">
              <img
                src={rental.images[0]}
                alt={rental.roomType}
                className="h-full w-full object-cover hover:scale-105 transition-transform duration-500"
              />
            </div>

            {/* Details */}
            <div className="p-4 flex flex-col flex-grow">
              <p className="text-sm text-indigo-500 font-medium mb-1">
                {rental.location}
              </p>
              <h2 className="text-lg font-semibold text-slate-800">
                {rental.roomType}
              </h2>

              <ul className="text-sm text-slate-600 mt-2 space-y-1">
                {rental.amenities.map((amenity, index) => (
                  <li key={index}>{amenity}</li>
                ))} 
              </ul>

              <p className="text-xl font-semibold text-slate-800 mt-3">
                Ksh {rental.pricePerMonth} / month
              </p>

              {/* View Button */}
              <Link to={`/rentals/${rental._id}`}>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="mt-4 w-full px-4 py-2 bg-indigo-600 text-white font-medium rounded-lg shadow-md hover:bg-indigo-700 transition"
                >
                  View
                </motion.button>
              </Link>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default Featuredrentals;
