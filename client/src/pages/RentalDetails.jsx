import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MapPin, Phone, Wifi, Car, Shield, ShowerHead } from "lucide-react";
import { assets } from "../assets/assets";
import { useAppContext } from "../context/AppContext";


// Local rental images
const imgs = [assets.room1, assets.room2, assets.room3, assets.room4, assets.room5, assets.room6];

// Dummy rentals (IDs 1..15 to match Rentals.jsx)
const dummyRentals = Array.from({ length: 15 }, (_, i) => {
  const a = imgs[i % imgs.length];
  const b = imgs[(i + 1) % imgs.length];
  const c = imgs[(i + 2) % imgs.length];
  return {
    _id: `${i + 1}`,
    name: `Rental House ${i + 1}`,
    location: ["Kangaru", "Kamiu", "Njukiri", "G-town", "Kayole"][i % 5],
    description:
      "Spacious, well-lit, and close to essential amenities. Perfect for students and young professionals. Water available, secure compound, and easy access to transport.",
    images: [a, b, c],
    category: ["Bedsitter", "1 Bedroom", "2 Bedroom", "Single Room"][i % 4],
    price: Math.floor(Math.random() * 15000) + 3000,
    amenities: (
      [
        ["wifi", "security"],
        ["wifi", "parking", "security"],
        ["wifi", "shower", "security"],
        ["security"],
        ["wifi", "parking", "security", "shower"],
      ][i % 5]
    ),
    whatsapp: "254700123456", // demo phone without +
  };
});

const AMENITY_META = {
  'Free Wifi': { label: "Wifi", Icon: Wifi },
  'parking': { label: "Parking", Icon: Car },
  'Secure': { label: "Secure", Icon: Shield },
  'Cold Shower': { label: "Cold Shower", Icon: ShowerHead },
  'Hot Shower': { label: "Hot Shower", Icon: ShowerHead },
};

export default function RentalDetails() {
  const { id } = useParams();
  const [rental, setRental] = useState(null);
  const [mainImage, setMainImage] = useState(null);
  const [recommended, setRecommended] = useState([]);

  const {rentals} = useAppContext();

  useEffect(() => {
    const found = rentals.find((r) => r._id === id);
    if (found) {
      setRental(found);
      setMainImage(found.images[0]);
      setRecommended(
        rentals.filter((r) => r.location === found.location && r._id !== found._id)
      );
    } else {
      setRental(null);
    }
  }, [id]);

  if (!rental) {
    return <div className="px-4 md:px-10 py-16 text-center text-gray-600">Rental not found.</div>;
  }

  const handleWhatsApp = () => {
    const msg = `Hello! I'm interested in ${rental.name} in ${rental.location}. Is it still available?`;
    const url = `https://wa.me/${rental.owner.whatsappNumber}?text=${encodeURIComponent(msg)}`;
    window.open(url, "_blank");
  };

  return (
    <div className="px-4 md:px-10 py-8">
      <div className="grid md:grid-cols-2 gap-8">
        {/* Image Gallery */}
        <div>
          <img
            src={mainImage? mainImage : rental.images[0]}
            alt={rental.name}
            className="w-full h-96 object-cover rounded-2xl shadow"
          />
          <div className="mt-4 flex gap-3 overflow-x-auto">
            {rental.images.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setMainImage(img)}
                className={`relative rounded-xl overflow-hidden border ${
                  mainImage === img ? "border-indigo-500" : "border-gray-200"
                }`}
              >
                <img src={img} alt={`thumb-${idx}`} className="w-24 h-24 object-cover" />
              </button>
            ))}
          </div>
        </div>

        {/* Details */}
        <div>
          <h1 className="text-3xl font-bold text-slate-900">{rental.name}</h1>
          <p className="text-lg text-green-600 font-semibold mt-2">
            Ksh {rental.pricePerMonth} / month
          </p>
          <p className="text-gray-700 flex items-center gap-2 mt-2">
            <MapPin className="w-5 h-5" /> {rental.location}
          </p>

          {/* Amenities with icons */}
          <div className="mt-6">
            <h3 className="font-semibold text-lg mb-2">Amenities</h3>
            <div className="flex flex-wrap gap-3 text-sm text-gray-700">
              {rental.amenities.map((key) => {
                const meta = AMENITY_META[key];
                if (!meta) return null;
                const Icon = meta.Icon;
                return (
                  <span
                    key={key}
                    className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-gray-200"
                  >
                    <Icon className="w-4 h-4" />
                    {meta.label}
                  </span>
                );
              })}
            </div>
          </div>

          {/* WhatsApp Contact */}
          <button
            onClick={handleWhatsApp}
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 bg-green-500 text-white rounded-xl shadow hover:bg-green-600 transition"
          >
            <Phone className="w-5 h-5" />
            Contact via WhatsApp
          </button>
        </div>
      </div>

      {/* Recommended Rentals */}
      {recommended.length > 0 && (
        <section className="mt-12">
          <h2 className="text-2xl font-semibold mb-6">
            More rentals in {rental.location}
          </h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {recommended.map((rec) => (
              <div
                key={rec._id}
                className="border rounded-2xl p-4 shadow-sm hover:shadow-lg transition bg-white"
              >
                <Link to={`/rentals/${rec._id}`}>
                  <img
                    src={rec.images[0]}
                    alt={rec.name}
                    className="w-full h-40 object-cover rounded-lg"
                  />
                  <h3 className="mt-3 text-lg font-semibold text-slate-900 truncate">
                    {rec.name}
                  </h3>
                  <p className="text-sm text-gray-500">{rec.category}</p>
                  <p className="text-sm text-gray-600 flex items-center gap-1 mt-1">
                    <MapPin className="w-4 h-4" /> {rec.location}
                  </p>
                  <p className="text-lg font-semibold text-green-600 mt-2">
                    Ksh {rec.pricePerMonth} /month
                  </p>
                </Link>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
}
