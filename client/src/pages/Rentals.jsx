import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Heart, Search, MapPin } from "lucide-react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";


// Import local rental images
const rental1 = assets.room1;
const rental2 = assets.room2;
const rental3 = assets.room3;
const rental4 = assets.room4;
const rental5 = assets.room5;
const rental6 = assets.room6;

const images = [rental1, rental2, rental3, rental4, rental5, rental6];

// Dummy rentals
const dummyRentals = Array.from({ length: 15 }, (_, i) => ({
  _id: `${i + 1}`,
  name: `Rental House ${i + 1}`,
  location: ["Kangaru", "Kamiu", "Njukiri", "G-town", "Kayole"][i % 5],
  description: "This is a sample rental description for demo purposes.",
  image: images[i % images.length],
  category: ["Bedsitter", "1 Bedroom", "2 Bedroom", "Single Room"][i % 4],
  price: Math.floor(Math.random() * 15000) + 3000,
}));

export default function Rentals() {
  const [locationFilter, setLocationFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [placeholder, setPlaceholder] = useState("Search rentals...");
  const [showFilters, setShowFilters] = useState(false); // mobile filters toggle

  const { rentals } = useAppContext();

  // Cycling placeholders
  const placeholders = [
    "Looking for bedsitters?",
    "Find a 1 Bedroom...",
    "Need a 2 Bedroom?",
    "Try single rooms...",
    "Check Kangaru rentals...",
    "Search in G-town...",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(placeholders[index]);
      index = (index + 1) % placeholders.length;
    }, 20000);
    return () => clearInterval(interval);
  }, []);

  // Filtering logic
  const filteredRentals = rentals
    .filter((r) =>
      search ? r.name.toLowerCase().includes(search.toLowerCase()) : true
    )
    .filter((r) =>
      locationFilter.length > 0 ? locationFilter.includes(r.location) : true
    )
    .filter((r) =>
      categoryFilter.length > 0 ? categoryFilter.includes(r.roomType) : true
    )
    .sort((a, b) => {
      if (priceFilter === "low-high") return a.pricePerMonth - b.pricePerMonth;
      if (priceFilter === "high-low") return b.pricePerMonth - a.pricePerMonth;
      return 0;
    });

  const handleCheckbox = (setFn, value) => {
    setFn((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };
  

  return (
    <div className="px-4 md:px-10 py-8 mt-[-30px] overflow-x-hidden">
      {/* Search bar */}
      <div className="flex justify-center mb-6">
        <div className="relative w-full max-w-2xl">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder={placeholder}
            className="w-full rounded-full border border-gray-300 px-5 py-3 pl-12 shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
          />
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" size={20} />
        </div>
      </div>

      {/* Toggle Filters Button (Mobile Only) */}
      <div className="md:hidden flex justify-end mb-4">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="px-4 py-2 border rounded-lg shadow-sm bg-white text-gray-700"
        >
          {showFilters ? "Hide Filters" : "Show Filters"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        {/* Filters */}
        {(showFilters || window.innerWidth >= 768) && (
          <aside className="md:col-span-1 border border-gray-200 rounded-2xl p-6 shadow-sm h-fit">
            <h2 className="text-xl font-semibold mb-6">Filters</h2>

            {/* Location Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Location</h3>
              {["Kangaru", "Kamiu", "Spring Valley", "Njukiri", "G-Town", "Kayole"].map((loc) => (
                <label key={loc} className="block text-sm text-gray-600 mb-1">
                  <input
                    type="checkbox"
                    checked={locationFilter.includes(loc)}
                    onChange={() => handleCheckbox(setLocationFilter, loc)}
                    className="mr-2"
                  />
                  {loc}
                </label>
              ))}
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Category</h3>
              {["Bedsitter", "1 Bedroom", "2 Bedroom", "Single"].map((cat) => (
                <label key={cat} className="block text-sm text-gray-600 mb-1">
                  <input
                    type="checkbox"
                    checked={categoryFilter.includes(cat)}
                    onChange={() => handleCheckbox(setCategoryFilter, cat)}
                    className="mr-2"
                  />
                  {cat}
                </label>
              ))}
            </div>

            {/* Price Filter */}
            <div>
              <h3 className="font-medium mb-2">Price</h3>
              <label className="block text-sm text-gray-600 mb-1">
                <input
                  type="radio"
                  name="price"
                  value="low-high"
                  checked={priceFilter === "low-high"}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="mr-2"
                />
                Lowest to Highest
              </label>
              <label className="block text-sm text-gray-600">
                <input
                  type="radio"
                  name="price"
                  value="high-low"
                  checked={priceFilter === "high-low"}
                  onChange={(e) => setPriceFilter(e.target.value)}
                  className="mr-2"
                />
                Highest to Lowest
              </label>
            </div>
          </aside>
        )}

        {/* Rentals */}
        <main className="md:col-span-3">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredRentals.map((rental) => (
              <div
                key={rental._id}
                className="border rounded-2xl p-4 shadow-sm hover:shadow-lg transition relative bg-white w-90 md:w-full"
              >
                {/* Heart icon */}
                <button className="absolute top-3 right-3 bg-white p-1 rounded-full shadow hover:scale-110 transition">
                  <Heart size={18} className="text-gray-600 hover:text-red-500 transition" />
                </button>

                {/* Rental Image */}
                <Link to={`/rentals/${rental._id}`}>
                <div className="w-full aspect-ratio-4/3 overflow-hidden rounded-xl">
                  <img
                    src={rental.images[0]}
                    alt={rental.name}
                    className="w-full h-48 object-cover rounded-xl"
                    loading="lazy"
                  />
                </div>
                </Link>

                {/* Details */}
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-slate-900 truncate">{rental.name}</h3>
                  <p className="text-sm text-indigo-600 font-medium mt-2">{rental.roomType}</p>
                  <p className="text-sm text-gray-600 flex gap-2"><MapPin className="w-4"/> {rental.location}</p>
                  <p className="text-lg font-semibold text-green-600 mt-2">Ksh {rental.pricePerMonth} /month</p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
