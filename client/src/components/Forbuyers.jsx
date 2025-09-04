import { Link } from "react-router-dom";

const Forbuyers = () => {
  const features = [
    {
      title: "Easy Product Browsing",
      description:
        "Discover products effortlessly with clean categories, powerful search, and smart recommendations.",
      icon: "🛍️",
    },
    {
      title: "Direct Chat with Sellers",
      description:
        "Connect with sellers instantly via WhatsApp to ask questions or negotiate before buying.",
      icon: "💬",
    },
    {
      title: "Cash on Delivery",
      description:
        "Pay when you receive your item, ensuring trust and convenience with every purchase.",
      icon: "💵",
    },
    {
      title: "Completely Free",
      description:
        "No extra charges for browsing or buying — the marketplace is free for all buyers.",
      icon: "🎉",
    },
    {
      title: "Secure & Verified Listings",
      description:
        "Shop confidently knowing that all products and rentals are reviewed and approved for quality.",
      icon: "🔒",
    },
  ];

  return (
    <div className="bg-white px-4 md:px-12 py-16">
      <div className="max-w-6xl mx-auto text-center">
        {/* Title */}
        <h1 className="text-3xl md:text-4xl font-bold text-slate-800 mb-4 font-poppins">
          Why Buy on <span className="text-indigo-600">Embuni Marketplace?</span>
        </h1>
        <p className="text-slate-600 mb-12 max-w-2xl mx-auto font-poppins">
          Get access to thousands of verified products at your fingertips.
          Shopping has never been this easy, secure, and fun!
        </p>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {features.map((feature, index) => (
            <div
              key={index}
              className="bg-gray-50 rounded-xl shadow-md p-6 hover:shadow-xl hover:-translate-y-1 transition duration-300"
            >
              <div className="text-4xl mb-3">{feature.icon}</div>
              <h3 className="text-lg font-semibold text-slate-800 mb-2">
                {feature.title}
              </h3>
              <p className="text-slate-600 text-sm">{feature.description}</p>
            </div>
          ))}
        </div>

        {/* CTA Button */}
        <Link
          to="/products"
          className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition"
        >
          Start Shopping
        </Link>
      </div>
    </div>
  );
};

export default Forbuyers;
