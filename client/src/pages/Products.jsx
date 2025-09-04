import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Heart, Search, MapPin, Filter } from "lucide-react";
import { useAppContext } from "../context/AppContext";

// Import your local product images
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
import { toast } from "react-toastify";

const images = [
  product1, product2, product3, product4, product5, product6,
  product7, product8, product9, product10, product11, product12,
];

// Dummy products (20 items)
const dummyProducts = Array.from({ length: 20 }, (_, i) => ({
  _id: `${i + 1}`,
  name: `Product ${i + 1}`,
  location: ["Kangaru", "Kamiu", "Njukiri", "G-town", "Kayole", "Bagik", "Embu town"][i % 7],
  description: "This is a sample product description for demo purposes.",
  image: images[i % images.length],
  category: ["Furniture", "Footwear", "Clothing", "Home Equipments"][i % 4],
  price: Math.floor(Math.random() * 5000) + 500,
}));



export default function Products() {
  const [locationFilter, setLocationFilter] = useState([]);
  const [priceFilter, setPriceFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState([]);
  const [search, setSearch] = useState("");
  const [placeholder, setPlaceholder] = useState("Search for products...");
  const [showFilters, setShowFilters] = useState(false);


  const {products, navigate, currency, axios, getToken} = useAppContext();
  console.log(products);

  // Cycling placeholders
  const placeholders = [
    "Search for furniture...",
    "Looking for shoes?",
    "Try clothing...",
    "Maybe home equipments?",
    "Find something in Kangaru...",
    "What’s hot in Embu town?",
  ];

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setPlaceholder(placeholders[index]);
      index = (index + 1) % placeholders.length;
    }, 20000); // change every 20s
    return () => clearInterval(interval);
  }, []);

  // Filtering logic
  const filteredProducts = products
    .filter((p) =>
      search ? p.name.toLowerCase().includes(search.toLowerCase()) : true
    )
    .filter((p) =>
      locationFilter.length > 0 ? locationFilter.includes(p.location) : true
    )
    .filter((p) =>
      categoryFilter.length > 0 ? categoryFilter.includes(p.category) : true
    )
    .sort((a, b) => {
      if (priceFilter === "low-high") return a.price - b.price;
      if (priceFilter === "high-low") return b.price - a.price;
      return 0;
    });

  const handleCheckbox = (setFn, value) => {
    setFn((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  };


  const addToFavorites = async(productId)=>{
    try{
      const {data} = await axios.post(`/api/favorites/add/${productId}`, {headers: {
        Authorization: `Bearer ${await getToken()}`
      }});

      if(data.success){
        toast.success(data.message);
      }else{
        toast.error(data.message);  
      }
    } catch(error){
      toast.error(error.message);
    }
  }

  return (
    <div className="px-4 md:px-10 py-8 mt-[-30px]">
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
          <Search
            className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
            size={20}
          />
        </div>
      </div>

      {/* Filter toggle button for small screens */}
      <div className="flex justify-end mb-6 md:hidden">
        <button
          onClick={() => setShowFilters(!showFilters)}
          className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 bg-white shadow-sm"
        >
          <Filter size={18} />
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
              {["Kangaru", "Kamiu", "Njukiri", "G-Town", "Kayole", "Bagik", "Embu town"].map(
                (loc) => (
                  <label key={loc} className="block text-sm text-gray-600 mb-1">
                    <input
                      type="checkbox"
                      checked={locationFilter.includes(loc)}
                      onChange={() => handleCheckbox(setLocationFilter, loc)}
                      className="mr-2"
                    />
                    {loc}
                  </label>
                )
              )}
            </div>

            {/* Category Filter */}
            <div className="mb-6">
              <h3 className="font-medium mb-2">Category</h3>
              {["Furniture", "Footwear", "Clothing", "Household Items", "Electronics"].map((cat) => (
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

        {/* Products */}
        <main className="md:col-span-3">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {filteredProducts.map((product) => (
              <div
                key={product._id}
                className="border rounded-2xl p-4 shadow-sm hover:shadow-lg transition relative bg-white"
              >
                {/* Heart icon */}
                <button className="absolute top-3 right-3 bg-white p-1 rounded-full shadow hover:scale-110 transition">
                  <Heart
                    size={18}
                    className="text-gray-600 hover:text-red-500 transition"
                    onClick={()=> addToFavorites(product._id)}
                  />
                </button>

                {/* Product Image */}
                <Link to={`/products/${product._id}`}>
                  <img
                    src={product.images ? product.images[0] : product.image}
                    alt={product.name}
                    className="w-full h-48 object-cover rounded-xl"
                  />
                </Link>

                {/* Details */}
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-slate-900 truncate">
                    {product.name}
                  </h3>
                  <p className="text-sm text-gray-500 mt-1 line-clamp-2">
                    {product.description}
                  </p>
                  <p className="text-sm text-indigo-600 font-medium mt-2">
                    {product.category}
                  </p>
                  <p className="text-sm text-gray-600 flex gap-2">
                    <MapPin className="w-4" /> {product.location}
                  </p>
                  <p className="text-lg font-semibold text-green-600 mt-2">
                    Ksh {product.price}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
